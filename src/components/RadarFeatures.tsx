
'use client'

import { Player } from '@lottiefiles/react-lottie-player'

export function RadarFeatures() {
  return (
    <div
      className="lottie-container"
      style={{
        width: 'min(420px, 85vw)',
        height: 'min(420px, 85vw)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Player
        autoplay
        loop
        src="/chef-making-pizza.json"
        background="transparent"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
