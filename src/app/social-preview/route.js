import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export async function GET() {
  const logo = await readFile(join(process.cwd(), 'src/app/icon.png'))

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        padding: '62px 72px 60px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#183a33',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: '14px',
          display: 'flex',
          background: '#c6e79e',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-92px',
          bottom: '-110px',
          width: '390px',
          height: '390px',
          display: 'flex',
          background: '#22483f',
          transform: 'rotate(16deg)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div
          style={{
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            background: '#f1f7e8',
          }}
        >
          <img
            src={Uint8Array.from(logo).buffer}
            alt=""
            width={56}
            height={56}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div style={{ display: 'flex', fontSize: '34px', letterSpacing: '-0.02em' }}>pawlystudios.</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
        <div
          style={{
            maxWidth: '910px',
            display: 'flex',
            fontSize: '76px',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
          }}
        >
          Web Development
        </div>
        <div style={{ display: 'flex', fontSize: '28px', color: '#c6e79e' }}>
          Niño Paul Cabiles / pawlystudios.
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
