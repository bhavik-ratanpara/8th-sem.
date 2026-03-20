'use client'

import { Player } from '@lottiefiles/react-lottie-player'

export function RadarFeatures() {
  return (
    <div
      style={{
        width: 'min(420px, 85vw)',
        height: 'min(420px, 85vw)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      {/* ── OUTER ROTATING RING ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          animation: 'spinRing 8s linear infinite',
        }}
      >
        {/* Dashed decorative ring */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Outer dashed circle */}
          <circle
            cx="210"
            cy="210"
            r="200"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            opacity="0.4"
          />
          {/* Inner thin circle */}
          <circle
            cx="210"
            cy="210"
            r="185"
            stroke="#2563eb"
            strokeWidth="0.5"
            opacity="0.15"
          />
          {/* Dot markers on ring */}
          <circle cx="210" cy="10" r="4" fill="#2563eb" opacity="0.8"/>
          <circle cx="410" cy="210" r="4" fill="#2563eb" opacity="0.8"/>
          <circle cx="210" cy="410" r="4" fill="#2563eb" opacity="0.8"/>
          <circle cx="10" cy="210" r="4" fill="#2563eb" opacity="0.8"/>
          {/* Small dots between */}
          <circle cx="353" cy="67" r="2.5" fill="#60a5fa" opacity="0.5"/>
          <circle cx="353" cy="353" r="2.5" fill="#60a5fa" opacity="0.5"/>
          <circle cx="67" cy="353" r="2.5" fill="#60a5fa" opacity="0.5"/>
          <circle cx="67" cy="67" r="2.5" fill="#60a5fa" opacity="0.5"/>
        </svg>
      </div>

      {/* ── SECOND COUNTER ROTATING RING ── */}
      <div
        style={{
          position: 'absolute',
          inset: '30px',
          borderRadius: '50%',
          animation: 'spinRingReverse 12s linear infinite',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0 }}
        >
          <circle
            cx="180"
            cy="180"
            r="170"
            stroke="#60a5fa"
            strokeWidth="0.8"
            strokeDasharray="4 12"
            strokeLinecap="round"
            opacity="0.2"
          />
          <circle cx="180" cy="10" r="3" fill="#60a5fa" opacity="0.4"/>
          <circle cx="350" cy="180" r="3" fill="#60a5fa" opacity="0.4"/>
          <circle cx="180" cy="350" r="3" fill="#60a5fa" opacity="0.4"/>
          <circle cx="10" cy="180" r="3" fill="#60a5fa" opacity="0.4"/>
        </svg>
      </div>

      {/* ── CHEF ANIMATION IN CENTER ── */}
      {/* Chef does NOT rotate — stays fixed */}
      <div
        className="lottie-blend"
        style={{
          width: '92%',
          height: '92%',
          position: 'relative',
          zIndex: 2,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <Player
          autoplay
          loop
          src="/chef-making-pizza.json"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* ── EDGE FADES ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle, 
            transparent 45%, 
            var(--page-bg) 72%)
        `,
        pointerEvents: 'none',
        zIndex: 3,
        borderRadius: '50%',
      }} />

    </div>
  )
}