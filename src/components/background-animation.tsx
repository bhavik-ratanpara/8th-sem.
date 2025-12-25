
'use client';

import React from 'react';

export function BackgroundAnimation() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient overlay */}
      <div className="background-glow"></div>

      {/* Floating ingredients */}
      <div className="ingredient">🍅</div>
      <div className="ingredient">🥕</div>
      <div className="ingredient">🧄</div>
      <div className="ingredient">🌿</div>
      <div className="ingredient">🧅</div>
      <div className="ingredient">🫑</div>
      <div className="ingredient">🥔</div>
      <div className="ingredient">🌶️</div>

      {/* Rising smoke/steam */}
      <div className="smoke"></div>
      <div className="smoke"></div>
      <div className="smoke"></div>
      <div className="smoke"></div>
      <div className="smoke"></div>

      {/* Sparkles */}
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
    </div>
  );
}
