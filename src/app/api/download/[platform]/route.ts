import { fetchLatestRelease } from '~server/services/github'
import { NextResponse } from 'next/server'
import { match } from 'ts-pattern'
import { z } from 'zod'

const querySchema = z.object({
  platform: z.enum([
    'macos-silicon',
    'macos-intel',
    'linux',
    'windows',
    'android',
  ]),
  source: z.enum(['instructions', 'sharing', 'connector']).optional(),
})

export async function GET(
  request: Request,
  { params }: { params: { platform: string } },
) {
  const { searchParams } = new URL(request.url)

  const result = querySchema.safeParse({
    platform: params.platform,
    source: searchParams.get('source') ?? undefined,
  })

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
  }

  const { platform } = result.data

  if (platform === 'android') {
    const release = await fetchLatestRelease({ repo: 'status-mobile' })

    // await track('Download', {
    //   platform: 'android',
    //   version: release.data.tag_name,
    // })

    const { browser_download_url: downloadUrl } = release.data.assets.find(
      asset => asset.name.endsWith('universal.apk'),
    )!

    return NextResponse.redirect(downloadUrl)
  }

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

    // await track('Download', {
    //   platform,
    //   version: release.data.tag_name,
    //   source,
    // })

    return NextResponse.redirect(downloadUrl)
  } catch (error) {
    console.error('Error occurred:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
