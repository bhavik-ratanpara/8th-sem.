'use client'

import { Player } from '@lottiefiles/react-lottie-player'

export function RadarFeatures() {
  return (
    <div
      style={{
        width: 'min(420px, 85vw)',
        height: 'min(420px, 85vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0',
      }}
    >
      {/* Animation with blend mode */}
      <div
        className="lottie-blend"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
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

      {/* Smoke overlays */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '35%',
        background: 'radial-gradient(ellipse at top, var(--smoke-color) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '35%',
        background: 'radial-gradient(ellipse at bottom, var(--smoke-color) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '30%',
        background: 'radial-gradient(ellipse at left, var(--smoke-color) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '30%',
        background: 'radial-gradient(ellipse at right, var(--smoke-color) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </div>
  )
}
