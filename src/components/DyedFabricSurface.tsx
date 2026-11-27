import React from 'react';

function getHexLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return 0.5;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

interface DyedFabricSurfaceProps {
  textureImg: string;
  hex: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Render crisp studio vignette lighting for large fabric viewers */
  studioLighting?: boolean;
}

/**
 * Physically-inspired textile dye renderer over neutral high-resolution macro weave photography.
 * Preserves deep woven shadows on light tones (Bone / Ecru) AND crisp raking-light thread sheen
 * on deep obsidian tones (Charcoal / Black / Raw Indigo).
 */
export const DyedFabricSurface: React.FC<DyedFabricSurfaceProps> = ({
  textureImg,
  hex,
  alt = '',
  className = '',
  style,
  studioLighting = false,
}) => {
  const lum = getHexLuminance(hex);
  const isDark = lum < 0.24;

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ backgroundColor: hex, ...style }}
    >
      {/* Layer 1: Multiply weave shadows directly into the dye color */}
      <img
        src={textureImg}
        alt={alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          mixBlendMode: 'multiply',
          filter: isDark
            ? 'contrast(1.22) brightness(1.24)'
            : 'contrast(1.16) brightness(1.15)',
        }}
      />

      {/* Layer 2: Soft-light micro-relief so yarn twists catch natural light */}
      <img
        src={textureImg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          mixBlendMode: 'soft-light',
          opacity: isDark ? 0.72 : 0.44,
          filter: isDark
            ? 'contrast(1.65) brightness(1.18)'
            : 'contrast(1.25) brightness(1.04)',
        }}
      />

      {/* Layer 3: Subtle raking specular fiber highlights for very dark dyes */}
      {isDark && (
        <img
          src={textureImg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.16,
            filter: 'contrast(2.15) brightness(0.66)',
          }}
        />
      )}

      {/* Subtle directional Bandung atelier table lighting */}
      {studioLighting && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 32% 24%, rgba(255,255,255,0.11) 0%, transparent 56%, rgba(0,0,0,0.24) 100%)',
          }}
        />
      )}
    </div>
  );
};
