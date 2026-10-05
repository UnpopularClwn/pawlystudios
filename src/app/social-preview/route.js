import { ImageResponse } from 'next/og'
import { SOCIAL_IMAGE } from '../../lib/seo-config.js'

export const dynamic = 'force-static'

const BLUE = '#2A3F73'
const CREAM = '#FEEEA6'
const RED = '#D82C31'

// Flat pawn silhouette, the same visual language as the hero. Decorative only.
function pawn(fill) {
  return (
    <g fill={fill}>
      <circle cx="100" cy="70" r="46" />
      <rect x="56" y="108" width="88" height="16" rx="8" />
      <path d="M78 122 L122 122 C124 170 140 205 162 247 L38 247 C60 205 76 170 78 122 Z" />
      <rect x="28" y="244" width="144" height="26" rx="9" />
      <rect x="16" y="266" width="168" height="24" rx="9" />
    </g>
  )
}

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: BLUE,
        color: CREAM,
      }}
    >
      {/* Cream tile, bleeding off the bottom-right corner */}
      <div
        style={{
          position: 'absolute',
          right: '-60px',
          bottom: '-60px',
          width: '420px',
          height: '420px',
          display: 'flex',
          background: CREAM,
        }}
      />
      <svg
        width="220"
        height="330"
        viewBox="0 0 200 300"
        style={{ position: 'absolute', right: '92px', bottom: '48px' }}
      >
        <g transform="translate(14 10)">
          {pawn(BLUE)}
        </g>
        {pawn(RED)}
      </svg>
      <div
        style={{
          position: 'absolute',
          left: '72px',
          top: '0px',
          width: '88px',
          height: '14px',
          display: 'flex',
          background: RED,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '72px',
          top: '96px',
          display: 'flex',
          fontSize: '146px',
          lineHeight: 1,
          // The default card font ships one weight; a stroke gives the wordmark heft.
          WebkitTextStroke: `4px ${CREAM}`,
          letterSpacing: '-0.04em',
        }}
      >
        pawlystudios.
      </div>

      <div
        style={{
          position: 'absolute',
          left: '72px',
          bottom: '66px',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        <div style={{ display: 'flex', fontSize: '52px', WebkitTextStroke: `1.5px ${CREAM}`, letterSpacing: '-0.02em' }}>
          Niño Paul Cabiles
        </div>
        <div style={{ display: 'flex', width: '56px', height: '4px', background: RED }} />
        <div style={{ display: 'flex', fontSize: '27px', letterSpacing: '0.01em' }}>
          Business Websites · Website Rebuilds · Landing Pages
        </div>
      </div>
    </div>,
    {
      width: SOCIAL_IMAGE.width,
      height: SOCIAL_IMAGE.height,
    },
  )
}
