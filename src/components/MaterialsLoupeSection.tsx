import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Move, ZoomIn } from 'lucide-react';
import { MATERIAL_GROUPS } from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';
import { DyedFabricSurface } from './DyedFabricSurface';

interface MaterialsLoupeSectionProps {
  onUseFabricInBrief?: (fabricName: string) => void;
}

const LOUPE_SIZE = 176;
const LOUPE_RADIUS = LOUPE_SIZE / 2;

const MeterBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-[#7C7B6E]">
      <span>{label}</span>
      <span className="text-[#1B1B16]">{value}/5</span>
    </div>
    <div className="grid grid-cols-5 gap-1">
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={`h-1 rounded-full ${
            step <= value ? 'bg-[#1B1B16]' : 'bg-[#1B1B16]/12'
          }`}
        />
      ))}
    </div>
  </div>
);

export const MaterialsLoupeSection: React.FC<MaterialsLoupeSectionProps> = ({
  onUseFabricInBrief,
}) => {
  const { lang, t } = useLang();
  const [activeGroupId, setActiveGroupId] = useState(MATERIAL_GROUPS[0].id);
  const activeGroup =
    MATERIAL_GROUPS.find((g) => g.id === activeGroupId) ?? MATERIAL_GROUPS[0];
  const [inspectedIndex, setInspectedIndex] = useState(0);
  const [selectedColorHex, setSelectedColorHex] = useState<string>(
    MATERIAL_GROUPS[0].items[0].swatch
  );
  const [selectedColorLabel, setSelectedColorLabel] = useState<string>(
    MATERIAL_GROUPS[0].items[0].colorOptions[0]?.label ?? 'Charcoal'
  );
  const [zoomLevel, setZoomLevel] = useState<1 | 2 | 4>(2);
  const [isHovering, setIsHovering] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const fabricLayerRef = useRef<HTMLDivElement | null>(null);
  const loupeShellRef = useRef<HTMLDivElement | null>(null);
  const loupeInnerRef = useRef<HTMLDivElement | null>(null);
  const coordsLabelRef = useRef<HTMLSpanElement | null>(null);

  // Smooth spring-damped pan & optical loupe physics (zero React re-render lag)
  const motionRef = useRef({
    active: false,
    targetNx: 0.5,
    targetNy: 0.5,
    smoothNx: 0.5,
    smoothNy: 0.5,
    cx: 0,
    cy: 0,
    smoothCx: 0,
    smoothCy: 0,
    smoothScale: 1.55,
    zoomLevel: 2 as 1 | 2 | 4,
  });

  useEffect(() => {
    motionRef.current.zoomLevel = zoomLevel;
  }, [zoomLevel]);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const stage = stageRef.current;
      const fabricLayer = fabricLayerRef.current;
      const loupeShell = loupeShellRef.current;
      const loupeInner = loupeInnerRef.current;
      if (!stage || !fabricLayer) return;

      const W = stage.clientWidth;
      const H = stage.clientHeight;
      if (W === 0 || H === 0) return;

      const m = motionRef.current;
      const z = m.zoomLevel;

      // Resting zoom vs active hover-pan zoom (ensures smooth movement even on 1x!)
      const targetScale = m.active
        ? z === 1
          ? 1.35
          : z === 2
            ? 1.95
            : 3.1
        : z === 1
          ? 1.0
          : z === 2
            ? 1.5
            : 2.35;

      const goalNx = m.active ? m.targetNx : 0.5;
      const goalNy = m.active ? m.targetNy : 0.5;

      // Silky physical damping
      m.smoothNx += (goalNx - m.smoothNx) * 0.12;
      m.smoothNy += (goalNy - m.smoothNy) * 0.12;
      m.smoothScale += (targetScale - m.smoothScale) * 0.14;
      m.smoothCx += (m.cx - m.smoothCx) * 0.24;
      m.smoothCy += (m.cy - m.smoothCy) * 0.24;

      // 1. Pan & zoom main macro fabric smoothly towards cursor region
      fabricLayer.style.transformOrigin = `${(m.smoothNx * 100).toFixed(3)}% ${(m.smoothNy * 100).toFixed(3)}%`;
      fabricLayer.style.transform = `scale(${m.smoothScale.toFixed(4)})`;

      // 2. Keep circular optical glass Loupe 1:1 pixel-aligned to threads beneath crosshair
      if (loupeShell && loupeInner) {
        const lx = m.smoothCx;
        const ly = m.smoothCy;
        loupeShell.style.transform = `translate3d(${(lx - LOUPE_RADIUS).toFixed(1)}px, ${(ly - LOUPE_RADIUS).toFixed(1)}px, 0) scale(${m.active ? 1 : 0.82})`;

        const originX = m.smoothNx * W;
        const originY = m.smoothNy * H;
        const u = (originX + (lx - originX) / m.smoothScale) / W;
        const v = (originY + (ly - originY) / m.smoothScale) / H;

        const loupeScale = m.smoothScale * 1.85;
        const innerW = W * loupeScale;
        const innerH = H * loupeScale;
        const offsetX = LOUPE_RADIUS - u * innerW;
        const offsetY = LOUPE_RADIUS - v * innerH;

        loupeInner.style.width = `${innerW.toFixed(1)}px`;
        loupeInner.style.height = `${innerH.toFixed(1)}px`;
        loupeInner.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;

        if (coordsLabelRef.current && m.active) {
          coordsLabelRef.current.textContent = `${Math.round(u * 100)}%, ${Math.round(v * 100)}% · ${(loupeScale).toFixed(1)}x`;
        }
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const inspectedItem =
    activeGroup.items[inspectedIndex] ?? activeGroup.items[0];

  const selectGroup = (id: string) => {
    const nextGroup = MATERIAL_GROUPS.find((g) => g.id === id) ?? MATERIAL_GROUPS[0];
    setActiveGroupId(id);
    setInspectedIndex(0);
    setSelectedColorHex(nextGroup.items[0].colorOptions[0]?.hex ?? nextGroup.items[0].swatch);
    setSelectedColorLabel(nextGroup.items[0].colorOptions[0]?.label ?? 'Standard');
  };

  const selectMaterial = (idx: number) => {
    const item = activeGroup.items[idx];
    if (!item) return;
    setInspectedIndex(idx);
    setSelectedColorHex(item.colorOptions[0]?.hex ?? item.swatch);
    setSelectedColorLabel(item.colorOptions[0]?.label ?? 'Standard');
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const cy = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    const m = motionRef.current;

    if (!m.active) {
      m.smoothCx = cx;
      m.smoothCy = cy;
      setIsHovering(true);
    }

    m.active = true;
    m.cx = cx;
    m.cy = cy;
    m.targetNx = cx / rect.width;
    m.targetNy = cy / rect.height;
  };

  const handleStagePointerLeave = () => {
    motionRef.current.active = false;
    setIsHovering(false);
  };

  return (
    <section className="relative bg-[#F7F5F0] pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Whisper-Quiet Luxury Header — zero filler paragraphs */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#1B1B16]/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
              {lang === 'id' ? 'Index02 // Studio Tekstil' : 'Index02 // Textile Loupe'}
            </div>
            <h1 className="mt-2 text-[clamp(34px,4.8vw,62px)] font-light leading-[1.04] tracking-[-0.04em] text-[#1B1B16]">
              {lang === 'id' ? 'Bahan & Finishing' : 'Fabrics & Finishing'}
            </h1>
          </div>

          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[#7C7B6E]">
            <Move className="h-3.5 w-3.5 text-[#E04F26]" />
            <span>
              {lang === 'id'
                ? 'Arahkan kursor untuk pan & loupe serat asli'
                : 'Hover fabric to pan & inspect real weave'}
            </span>
          </span>
        </div>

        {/* Minimal Category Pills */}
        <div className="mt-7 flex flex-wrap gap-2">
          {MATERIAL_GROUPS.map((group) => {
            const active = group.id === activeGroup.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => selectGroup(group.id)}
                className={`rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all cursor-pointer ${
                  active
                    ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                    : 'border-[#1B1B16]/12 bg-white text-[#59594E] hover:border-[#1B1B16]/35 hover:text-[#1B1B16]'
                }`}
              >
                {t(group.category)}
              </button>
            );
          })}
        </div>

        {/* MASSIVE PHOTOREALISTIC TEXTILE STUDIO */}
        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#1B1B16]/15 bg-white lg:grid-cols-12">
          {/* LEFT (8 COLS — GIANT REAL MACRO FABRIC VIEWER WITH SMOOTH CURSOR PAN & OPTICAL LOUPE) */}
          <div className="flex flex-col justify-between border-b border-[#1B1B16]/12 p-6 lg:col-span-8 lg:border-b-0 lg:border-r md:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                <span className="h-2 w-2 rounded-full bg-[#E04F26]" />
                <span>
                  {activeGroup.mono} · 0{inspectedIndex + 1}/0{activeGroup.items.length}
                </span>
              </div>

              {/* Zoom Switcher */}
              <div className="inline-flex items-center gap-1 rounded-full border border-[#1B1B16]/12 bg-[#F7F5F0] p-1 font-mono text-[11px]">
                <ZoomIn className="ml-2 mr-1 h-3.5 w-3.5 text-[#59594E]" />
                {([1, 2, 4] as const).map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZoomLevel(z)}
                    className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                      zoomLevel === z
                        ? 'bg-[#1B1B16] text-white'
                        : 'text-[#59594E] hover:text-[#1B1B16]'
                    }`}
                  >
                    {z}x
                  </button>
                ))}
              </div>
            </div>

            {/* HUGE INTERACTIVE MACRO FABRIC CANVAS + PIXEL-ALIGNED LIQUID GLASS LOUPE */}
            <div
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={handleStagePointerLeave}
              className="relative my-5 h-[360px] w-full overflow-hidden rounded-none border border-[#1B1B16]/15 bg-[#1B1B16] cursor-crosshair touch-none sm:h-[450px]"
            >
              {/* Smoothly Panning & Zooming Real Photorealistic Macro Weave */}
              <div
                ref={fabricLayerRef}
                className="absolute inset-0 will-change-transform"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeGroup.id}-${inspectedItem.name}`}
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.25 }}
                    className="h-full w-full"
                  >
                    <DyedFabricSurface
                      textureImg={inspectedItem.textureImg}
                      hex={selectedColorHex}
                      alt={`${inspectedItem.name} ${selectedColorLabel}`}
                      className="h-full w-full"
                      studioLighting
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Subtle Swiss Architectural Optical Guides */}
              <div className="pointer-events-none absolute inset-y-0 left-1/3 border-l border-dashed border-white/15" />
              <div className="pointer-events-none absolute inset-y-0 right-1/3 border-l border-dashed border-white/15" />
              <div className="pointer-events-none absolute inset-x-0 bottom-10 border-t border-[#FF2E00]/75" />

              {/* Top Left Liquid-Glass Specimen Badges */}
              <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-black/55 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white backdrop-blur-md">
                  {inspectedItem.spec}
                </span>
                <span className="rounded-full border border-white/60 bg-white/80 px-3 py-1 font-mono text-[10.5px] text-[#1B1B16] backdrop-blur-md">
                  {selectedColorLabel}
                </span>
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="pointer-events-none absolute inset-x-4 bottom-2.5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                <span>
                  MACRO WEAVE · {zoomLevel}X {isHovering ? '· PAN ACTIVE' : ''}
                </span>
                <span ref={coordsLabelRef}>
                  {lang === 'id' ? 'GESER KURSOR DI ATAS KAIN' : 'MOVE CURSOR TO INSPECT'}
                </span>
              </div>

              {/* 1:1 Pixel-Aligned Circular Optical Liquid Glass Loupe */}
              <div
                ref={loupeShellRef}
                style={{
                  width: LOUPE_SIZE,
                  height: LOUPE_SIZE,
                  left: 0,
                  top: 0,
                  opacity: isHovering ? 1 : 0,
                  transition: 'opacity 180ms ease-out',
                }}
                className="pointer-events-none absolute z-20 overflow-hidden rounded-full border-[1.5px] border-white/85 shadow-[0_24px_55px_rgba(0,0,0,0.62),0_0_0_1px_rgba(0,0,0,0.35),inset_0_2px_6px_rgba(255,255,255,0.65)] will-change-transform"
              >
                {/* Exact magnified macro texture locked 1:1 beneath cursor */}
                <div
                  ref={loupeInnerRef}
                  className="absolute left-0 top-0 will-change-transform"
                >
                  <DyedFabricSurface
                    textureImg={inspectedItem.textureImg}
                    hex={selectedColorHex}
                    className="h-full w-full"
                  />
                </div>

                {/* Curved Zeiss / Apple Liquid Glass Lens Specular Glint */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 24%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.06) 36%, transparent 62%, rgba(0,0,0,0.22) 100%)',
                    boxShadow:
                      'inset 0 2px 3px rgba(255,255,255,0.75), inset 0 -3px 8px rgba(0,0,0,0.38)',
                  }}
                />

                {/* Precision Thread-Counter Crosshair */}
                <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#FF2E00]/65" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-[#FF2E00]/65" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF2E00] bg-white/20" />
              </div>
            </div>

            {/* Dye Swatches Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B1B16]/10 pb-5">
              <div className="flex flex-wrap items-center gap-2">
                {inspectedItem.colorOptions.map((c) => {
                  const active = c.hex === selectedColorHex;
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => {
                        setSelectedColorHex(c.hex);
                        setSelectedColorLabel(c.label);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-[#F7F5F0] text-[#4E4E45] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>

              {onUseFabricInBrief && (
                <button
                  type="button"
                  onClick={() =>
                    onUseFabricInBrief(`${inspectedItem.name} (${selectedColorLabel})`)
                  }
                  className="soma-pill-dark inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-medium cursor-pointer"
                >
                  <span>{lang === 'id' ? 'Gunakan untuk Order' : 'Use in Order'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Concise Bottom Technical Strip */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6">
                <h2 className="font-serif text-[28px] font-normal leading-tight text-[#1B1B16]">
                  {inspectedItem.name}
                </h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#59594E]">
                  {t(inspectedItem.feel)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-6">
                <MeterBar
                  label={lang === 'id' ? 'Ketebalan' : 'Weight'}
                  value={inspectedItem.thickness}
                />
                <MeterBar
                  label={lang === 'id' ? 'Sirkulasi' : 'Breathability'}
                  value={inspectedItem.breathability}
                />
              </div>
            </div>
          </div>

          {/* RIGHT (4 COLS — ULTRA-CLEAN REAL MACRO SWATCH LIST) */}
          <div className="flex flex-col justify-between bg-[#F7F5F0]/45 lg:col-span-4">
            <div className="divide-y divide-[#1B1B16]/10">
              {activeGroup.items.map((item, idx) => {
                const isSelected = idx === inspectedIndex;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => selectMaterial(idx)}
                    className={`group flex w-full items-center gap-4 px-5 py-4.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B1B16] text-[#F7F5F0]'
                        : 'text-[#1B1B16] hover:bg-[#EFECE4]'
                    }`}
                  >
                    <DyedFabricSurface
                      textureImg={item.textureImg}
                      hex={isSelected ? selectedColorHex : item.swatch}
                      className={`h-11 w-11 shrink-0 rounded-none border shadow-xs ${
                        isSelected ? 'border-white/35' : 'border-black/15'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14.5px] font-medium">{item.name}</div>
                      <div
                        className={`mt-0.5 font-mono text-[10.5px] ${
                          isSelected ? 'text-[#D4B144]' : 'text-[#8B8A7D]'
                        }`}
                      >
                        {item.spec}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#1B1B16]/10 px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B8A7D]">
                {lang === 'id' ? 'Rekomendasi Artikel' : 'Ideal For'}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {inspectedItem.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1B1B16]/12 bg-white px-2.5 py-0.5 font-mono text-[10.5px] text-[#1B1B16]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
