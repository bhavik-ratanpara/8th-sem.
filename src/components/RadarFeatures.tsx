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
      {/* Blob shaped container */}
      <div
        className="lottie-blend"
        style={{
          width: '90%',
          height: '90%',
          position: 'relative',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          overflow: 'hidden',
          zIndex: 1,
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

      {/* Smoke fading edges — all 4 sides */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 50% 0%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 60% 40% at 50% 100%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 40% 60% at 0% 50%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 40% 60% at 100% 50%, 
            var(--smoke-color) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* Corner smoke blobs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 35% 35% at 0% 0%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 35% 35% at 100% 0%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 35% 35% at 0% 100%, 
            var(--smoke-color) 0%, transparent 100%),
          radial-gradient(ellipse 35% 35% at 100% 100%, 
            var(--smoke-color) 0%, transparent 100%)
        `,
        pointerEvents: 'none',
        zIndex: 3,
      }} />
    </div>
  )
}
