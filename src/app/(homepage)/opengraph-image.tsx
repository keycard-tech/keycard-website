import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export default async function Image() {
  const image = await readFile(join(process.cwd(), 'public/assets/og/home.png'))
  const imageSrc = `data:image/png;base64,${image.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={imageSrc} height="630" width="1200" />
      </div>
    ),
  )
}
