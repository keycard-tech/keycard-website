import { fetchLatestRelease } from '~server/services/github'
import { NextRequest, NextResponse } from 'next/server'
import { match } from 'ts-pattern'
import { z } from 'zod'

const querySchema = z.object({
  platform: z.enum(['macos-silicon', 'macos-intel', 'linux', 'windows']),
  source: z.enum(['instructions', 'sharing', 'connector']).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ platform: string }> },
) {
  const { searchParams } = new URL(request.url)
  const platformFromParams = (await params).platform

  const result = querySchema.safeParse({
    platform: platformFromParams,
    source: searchParams.get('source') ?? undefined,
  })

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  const { platform } = result.data

  try {
    const release = await fetchLatestRelease({ repo: 'status-desktop' })

    // @see https://github.com/status-im/status-desktop/releases
    const { browser_download_url: downloadUrl } = match(platform)
      .with(
        'macos-silicon',
        () =>
          release.data.assets.find(asset =>
            asset.name.endsWith('aarch64.dmg'),
          )!,
      )
      .with(
        'macos-intel',
        () =>
          release.data.assets.find(asset => asset.name.endsWith('x86_64.dmg'))!,
      )
      .with(
        'windows',
        () => release.data.assets.find(asset => asset.name.endsWith('.exe'))!,
      )
      .with(
        'linux',
        () =>
          release.data.assets.find(asset =>
            asset.name.endsWith('x86_64.tar.gz'),
          )!,
      )
      .exhaustive()

    return NextResponse.redirect(downloadUrl)
  } catch (error) {
    console.error('Error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
