import React from 'react';

interface DyedFabricSurfaceProps {
  textureImg: string;
  hex?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Subtle directional studio vignette framing for large textile viewers */
  studioLighting?: boolean;
}

/**
 * Pure, unedited photorealistic studio close-up textile & craft renderer.
 * Displays each material's true natural color, weave structure, sheen, and print/embroidery detail
 * without artificial monochrome tint overlays.
 */
export const DyedFabricSurface: React.FC<DyedFabricSurfaceProps> = ({
  textureImg,
  hex = '#1B1B16',
  alt = '',
  className = '',
  style,
  studioLighting = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{ backgroundColor: hex, ...style }}
    >
      <img
        src={textureImg}
        alt={alt}
        loading="eager"
        decoding="sync"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {studioLighting && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 72% at 50% 45%, transparent 58%, rgba(0,0,0,0.22) 100%)',
          }}
        />
      )}
    </div>
  );
};
