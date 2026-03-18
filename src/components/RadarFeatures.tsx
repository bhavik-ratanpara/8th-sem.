'use client'
import { useEffect, useRef, useState } from 'react'

const features = [
  { name: "AI Recipe Generator", angle: 0, distance: 0.55 },
  { name: "Exact Quantities", angle: 60, distance: 0.65 },
  { name: "Save Recipes", angle: 120, distance: 0.55 },
  { name: "Indian Cuisines", angle: 180, distance: 0.65 },
  { name: "Veg & Non-Veg", angle: 240, distance: 0.55 },
  { name: "History", angle: 300, distance: 0.65 },
]

export function RadarFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0)
  const animRef = useRef<number>()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [size, setSize] = useState(0)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize(containerRef.current.offsetWidth)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark'
      setTheme(currentTheme || 'light')
    })
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    setTheme((document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light')

    return () => {
      window.removeEventListener('resize', updateSize)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (size === 0) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    const cx = size / 2
    const cy = size / 2
    const maxR = size / 2 - 20

    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      // Draw circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2)
        ctx.strokeStyle = theme === 'light' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.15)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw cross lines
      ctx.beginPath()
      ctx.moveTo(cx - maxR, cy)
      ctx.lineTo(cx + maxR, cy)
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(cx, cy - maxR)
      ctx.lineTo(cx, cy + maxR)
      ctx.stroke()

      // Draw radar sweep
      const sweepAngle = (angleRef.current * Math.PI) / 180
      
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, maxR, sweepAngle - Math.PI / 4, sweepAngle)
      ctx.closePath()
      ctx.fillStyle = theme === 'light' ? 'rgba(37, 99, 235, 0.04)' : 'rgba(37, 99, 235, 0.08)'
      ctx.fill()

      // Draw sweep line
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * maxR,
        cy + Math.sin(sweepAngle) * maxR
      )
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.6)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#2563eb'
      ctx.fill()

      // Draw feature dots
      features.forEach((feature) => {
        const angle = (feature.angle * Math.PI) / 180
        const r = maxR * feature.distance
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 10)
        glow.addColorStop(0, 'rgba(96, 165, 250, 0.3)')
        glow.addColorStop(1, 'rgba(96, 165, 250, 0)')
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#60a5fa'
        ctx.fill()
      })

      angleRef.current = (angleRef.current + 0.8) % 360
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [size, theme])

  const labelStyle = theme === 'light' ? {
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#2563eb',
    border: '1px solid rgba(37, 99, 235, 0.2)',
  } : {
    background: 'rgba(15, 15, 15, 0.85)',
    color: '#93c5fd',
    border: '1px solid rgba(37, 99, 235, 0.3)',
  }

  const cx = size / 2
  const cy = size / 2

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square flex items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {size > 0 && features.map((feature) => {
        const angle = (feature.angle * Math.PI) / 180
        const r = (size / 2) * feature.distance
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r

        return (
          <div
            key={feature.name}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              borderRadius: '999px',
              padding: size < 300 ? '3px 8px' : '4px 10px',
              fontSize: size < 300 ? '9px' : '11px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              backdropFilter: 'blur(4px)',
              zIndex: 2,
              ...labelStyle
            }}
          >
            {feature.name}
          </div>
        )
      })}

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 2,
        pointerEvents: 'none',
        marginTop: size < 300 ? '20px' : '30px',
      }}>
        <div style={{
          fontSize: size < 300 ? '9px' : '11px',
          color: '#2563eb',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Cooking Lab
        </div>
      </div>
    </div>
  )
}
