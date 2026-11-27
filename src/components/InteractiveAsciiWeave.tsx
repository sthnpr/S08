import React, { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';

// Crisp textile-inspired ASCII density ramp (sparse thread -> dense woven knot)
const GLYPHS = ' .·:-=+*x#%@';

interface Ripple {
  x: number;
  y: number;
  born: number;
}

interface InteractiveAsciiWeaveProps {
  /** Host element (e.g. <footer>) whose pointer moves & clicks drive the ASCII weave even beneath Liquid Glass overlays */
  pointerHostRef?: React.RefObject<HTMLElement | null>;
}

export const InteractiveAsciiWeave: React.FC<InteractiveAsciiWeaveProps> = ({
  pointerHostRef,
}) => {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const ripplesRef = useRef<Ripple[]>([]);
  const startClockRef = useRef<number>(performance.now());
  const [coords, setCoords] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Bind mouse & click listeners to the outer footer host so hovering over Liquid Glass cards still ripples the weave!
  useEffect(() => {
    const host = pointerHostRef?.current ?? containerRef.current;
    const container = containerRef.current;
    if (!host || !container) return;

    const handleMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };
      setCoords({ x: Math.round(x), y: Math.round(y), active: true });
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
      setCoords((prev) => ({ ...prev, active: false }));
    };

    const handleDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        born: (performance.now() - startClockRef.current) * 0.001,
      });
    };

    host.addEventListener('pointermove', handleMove, { passive: true });
    host.addEventListener('pointerleave', handleLeave, { passive: true });
    host.addEventListener('pointerdown', handleDown, { passive: true });

    return () => {
      host.removeEventListener('pointermove', handleMove);
      host.removeEventListener('pointerleave', handleLeave);
      host.removeEventListener('pointerdown', handleDown);
    };
  }, [pointerHostRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const cellW = 12;
    const cellH = 17;

    // Offscreen mask canvas to stamp monumental crisp "S08" sculpture into the ASCII density field
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
    let maskData: Float32Array = new Float32Array(0);

    const buildGrid = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width));
      height = Math.max(360, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      // Stamp bold monumental "S08" typographic relief across the lower-center behind the Liquid Glass bento cards
      maskCanvas.width = cols;
      maskCanvas.height = rows;
      maskData = new Float32Array(cols * rows);
      if (maskCtx && cols > 10 && rows > 4) {
        maskCtx.clearRect(0, 0, cols, rows);
        maskCtx.fillStyle = '#FFFFFF';
        maskCtx.textAlign = 'center';
        maskCtx.textBaseline = 'middle';
        const fontSize = Math.min(rows * 0.86, cols * 0.42);
        maskCtx.font = `900 ${fontSize}px "Geist", -apple-system, sans-serif`;
        maskCtx.fillText('S08', cols * 0.5, rows * 0.58);

        const img = maskCtx.getImageData(0, 0, cols, rows).data;
        for (let i = 0; i < cols * rows; i++) {
          maskData[i] = img[i * 4 + 3] / 255;
        }
      }
    };

    buildGrid();

    const resizeObserver = new ResizeObserver(() => buildGrid());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const startTime = performance.now();
    startClockRef.current = startTime;

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (!isVisible || cols === 0 || rows === 0) return;

      const t = (now - startTime) * 0.001;
      const mouse = mouseRef.current;

      // Pure OLED black clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Soft ambient silver glow strictly behind the S08 sculpture so Liquid Glass cards catch real optical depth
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.58,
        20,
        width * 0.5,
        height * 0.58,
        Math.max(width * 0.48, 320)
      );
      ambientGlow.addColorStop(0, 'rgba(255, 255, 255, 0.085)');
      ambientGlow.addColorStop(0.45, 'rgba(255, 255, 255, 0.028)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm vermilion cursor aura behind the glass when hovering
      if (mouse.active) {
        const cursorAura = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          8,
          mouse.x,
          mouse.y,
          200
        );
        cursorAura.addColorStop(0, 'rgba(255, 78, 36, 0.16)');
        cursorAura.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
        cursorAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorAura;
        ctx.fillRect(0, 0, width, height);
      }

      // Prune expired ripples
      ripplesRef.current = ripplesRef.current.filter((r) => t - r.born < 2.4);
      const ripples = ripplesRef.current;

      ctx.font = '500 12.5px "Geist Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        const py = r * cellH + cellH * 0.5;
        const ny = r / rows;

        for (let c = 0; c < cols; c++) {
          const px = c * cellW + cellW * 0.5;
          const nx = c / cols;

          // Diagonal woven twill interference wave across the full OLED backdrop
          const twillA = Math.sin(c * 0.22 + r * 0.34 - t * 1.15);
          const twillB = Math.cos(c * 0.13 - r * 0.26 + t * 0.72);
          const warp = Math.sin((nx * 5.0 + ny * 2.2) * Math.PI + t * 0.55) * 0.5 + 0.5;
          let energy =
            0.16 +
            ((twillA * 0.5 + 0.5) * 0.22 + (twillB * 0.5 + 0.5) * 0.16) * (0.48 + warp * 0.52);

          // Monumental luminous "S08" ASCII density sculpture shining cleanly through the Liquid Glass cards
          const s08Relief = maskData[r * cols + c] || 0;
          if (s08Relief > 0.08) {
            const shimmer = Math.sin(c * 0.32 - r * 0.22 - t * 2.1) * 0.11;
            energy += s08Relief * (0.56 + shimmer);
          }

          // Pointer optical tension halo & thread ripple right under the glass
          let pointerBoost = 0;
          if (mouse.active) {
            const dx = px - mouse.x;
            const dy = py - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 175;
            if (dist < radius) {
              const norm = 1 - dist / radius;
              const ring = Math.sin(dist * 0.08 - t * 5.4) * 0.5 + 0.5;
              pointerBoost = norm * norm * (0.72 + ring * 0.28);
              energy += pointerBoost * 0.78;
            }
          }

          // Click shockwaves propagating through the woven fabric
          let rippleBoost = 0;
          for (let i = 0; i < ripples.length; i++) {
            const rp = ripples[i];
            const age = t - rp.born;
            const dx = px - rp.x;
            const dy = py - rp.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waveFront = age * 290;
            const band = Math.abs(dist - waveFront);
            if (band < 56) {
              const decay = Math.max(0, 1 - age / 2.4);
              const crest = (1 - band / 56) * decay;
              rippleBoost = Math.max(rippleBoost, crest);
              energy += crest * 0.72;
            }
          }

          // Soft outer perimeter fade into pure OLED black
          const edgeX = Math.min(nx, 1 - nx) * 8.0;
          const edgeY = Math.min(ny, 1 - ny) * 6.0;
          const edgeMask = Math.min(1, Math.min(edgeX, edgeY));
          energy *= 0.38 + edgeMask * 0.62;

          const clamped = Math.max(0, Math.min(0.999, energy));
          const glyphIdx = Math.floor(clamped * GLYPHS.length);
          const ch = GLYPHS[glyphIdx];
          if (ch === ' ') continue;

          const highlight = Math.max(pointerBoost, rippleBoost);
          if (highlight > 0.52 && (c + r) % 3 === 0) {
            ctx.fillStyle = `rgba(255, 78, 36, ${Math.min(0.98, 0.52 + highlight * 0.55)})`;
          } else if (highlight > 0.32) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.98, 0.48 + highlight * 0.58)})`;
          } else if (s08Relief > 0.22) {
            const lum = Math.round(150 + clamped * 105);
            ctx.fillStyle = `rgba(${lum}, ${lum}, ${Math.min(255, lum + 6)}, ${0.48 + clamped * 0.44})`;
          } else {
            const lum = Math.round(78 + clamped * 112);
            ctx.fillStyle = `rgba(${lum}, ${lum}, ${lum}, ${0.24 + clamped * 0.38})`;
          }

          ctx.fillText(ch, px, py);
        }
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden bg-black"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {/* Bottom micro telemetry HUD along lower edge of OLED footer */}
      <div className="pointer-events-none absolute inset-x-4 bottom-3.5 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40 md:inset-x-8">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2E00]" />
          {lang === 'id'
            ? 'ASCII WEAVE FIELD // GESER ATAU KLIK'
            : 'ASCII WEAVE FIELD // MOVE OR CLICK'}
        </span>
        <span className="text-white/50">
          {coords.active
            ? `X:${String(coords.x).padStart(4, '0')} · Y:${String(coords.y).padStart(3, '0')}`
            : 'S08 · 6.9175°S 107.6191°E'}
        </span>
      </div>
    </div>
  );
};
