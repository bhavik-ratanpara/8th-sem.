'use client'

import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

export function RadarFeatures() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    // Fetch the animation data from the public folder at runtime
    // to avoid import errors in Next.js
    async function loadAnm() {
      try {
        const response = await fetch('/chef-making-pizza.json')
        if (!response.ok) throw new Error('Failed to fetch animation data')
        const data = await response.json()
        setAnimationData(data)
      } catch (err) {
        console.error('Lottie load error:', err)
      }
    }
    loadAnm()
  }, [])

  return (
    <div
      style={{
        width: 'min(420px, 44vw)',
        height: 'min(420px, 44vw)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── CHEF ANIMATION IN CENTER ── */}
      <div
        className="lottie-blend"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </div>
    </div>
  )
}
