import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Info, Scissors } from 'lucide-react';
import {
  CUTTING_OPTIONS,
  CuttingOption,
  PageRoute,
  SIZE_CHARTS_BOTTOMS,
  SIZE_CHARTS_TOPS,
} from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

interface CuttingSizeSectionProps {
  onNavigate: (page: PageRoute) => void;
}

const TechnicalPatternSVG: React.FC<{ cut: CuttingOption }> = ({ cut }) => {
  const isTop = cut.group === 'tops';

  if (isTop) {
    const isOversized = cut.id === 'top-oversized';
    const isBoxy = cut.id === 'top-boxy';
    const isCustom = cut.id === 'top-custom';

    const torsoHalfW = isBoxy ? 76 : isOversized ? 74 : isCustom ? 70 : 58;
    const hemY = isBoxy ? 236 : isOversized ? 268 : 254;
    const shoulderDrop = isOversized ? 96 : isBoxy ? 86 : 82;
    const sleeveEndX = isOversized ? 148 : isBoxy ? 142 : 132;
    const sleeveEndY = isOversized ? 228 : isBoxy ? 214 : 216;
    const leftX = 160 - torsoHalfW;
    const rightX = 160 + torsoHalfW;

    const garmentPath = `M 136 68 Q 160 84 184 68 L ${160 + torsoHalfW + 14} ${shoulderDrop} L ${160 + sleeveEndX} ${sleeveEndY} L ${160 + sleeveEndX - 24} ${sleeveEndY + 14} L ${rightX} 142 L ${rightX} ${hemY} L ${leftX} ${hemY} L ${leftX} 142 L ${160 - sleeveEndX + 24} ${sleeveEndY + 14} L ${160 - sleeveEndX} ${sleeveEndY} L ${160 - torsoHalfW - 14} ${shoulderDrop} Z`;

    return (
      <svg viewBox="0 0 344 310" className="h-full w-full max-h-[340px]" fill="none">
        <line x1="160" y1="24" x2="160" y2="292" stroke="#FFFFFF" strokeOpacity="0.14" strokeDasharray="4 4" />
        <line x1={leftX} y1="158" x2={rightX} y2="158" stroke="#D4B144" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx={leftX} cy="158" r="3" fill="#D4B144" />
        <circle cx={rightX} cy="158" r="3" fill="#D4B144" />
        <text x="160" y="151" textAnchor="middle" fill="#D4B144" fontSize="9.5" fontFamily="Geist Mono, monospace">
          CHEST ({isBoxy ? 'WIDE BOXY' : isOversized ? 'OVERSIZED' : isCustom ? 'CUSTOM' : 'REGULAR'})
        </text>

        <line x1="318" y1="68" x2="318" y2={hemY} stroke="#91CFB5" strokeWidth="1.2" />
        <line x1="312" y1="68" x2="324" y2="68" stroke="#91CFB5" strokeWidth="1.2" />
        <line x1="312" y1={hemY} x2="324" y2={hemY} stroke="#91CFB5" strokeWidth="1.2" />
        <text
          x="332"
          y={(68 + hemY) / 2}
          fill="#91CFB5"
          fontSize="9"
          fontFamily="Geist Mono, monospace"
          transform={`rotate(90, 332, ${(68 + hemY) / 2})`}
          textAnchor="middle"
        >
          BODY LENGTH
        </text>

        <motion.path
          key="top-garment-silhouette"
          initial={{ d: garmentPath }}
          animate={{ d: garmentPath }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          fill="rgba(255,255,255,0.05)"
          stroke="#FCFCFA"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />

        <path d="M 136 68 Q 160 92 184 68" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.2" />
        <line x1={leftX} y1={hemY - 12} x2={rightX} y2={hemY - 12} stroke="#FFFFFF" strokeOpacity="0.25" strokeDasharray="3 3" />

        {isCustom && (
          <g stroke="#E04F26" strokeWidth="1" strokeDasharray="4 3" opacity="0.8">
            <rect x={leftX - 8} y="58" width={torsoHalfW * 2 + 16} height={hemY - 48} rx="3" />
            <text x="160" y="48" textAnchor="middle" fill="#E04F26" fontSize="9.5" fontFamily="Geist Mono, monospace">
              CLIENT TECH PACK BLOCK
            </text>
          </g>
        )}
      </svg>
    );
  }

  const isBaggy = cut.id === 'bot-baggy';
  const isTapered = cut.id === 'bot-tapered';
  const isCustom = cut.id === 'bot-custom';

  const waistHalf = isBaggy ? 54 : 48;
  const thighOuter = isBaggy ? 74 : isTapered ? 66 : 60;
  const hemOuter = isBaggy ? 69 : isTapered ? 40 : 54;
  const hemInner = isBaggy ? 16 : isTapered ? 18 : 16;

  const pantsPath = `M ${160 - waistHalf} 48 L ${160 + waistHalf} 48 L ${160 + thighOuter} 126 L ${160 + hemOuter} 266 L ${160 + hemInner} 266 L 160 138 L ${160 - hemInner} 266 L ${160 - hemOuter} 266 L ${160 - thighOuter} 126 Z`;

  return (
    <svg viewBox="0 0 344 310" className="h-full w-full max-h-[340px]" fill="none">
      <line x1="160" y1="22" x2="160" y2="292" stroke="#FFFFFF" strokeOpacity="0.14" strokeDasharray="4 4" />
      <line x1={160 - waistHalf} y1="62" x2={160 + waistHalf} y2="62" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.2" />

      <line x1={160 - thighOuter} y1="126" x2={160} y2="126" stroke="#D4B144" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx={160 - thighOuter} cy="126" r="3" fill="#D4B144" />
      <text x="115" y="118" textAnchor="middle" fill="#D4B144" fontSize="9" fontFamily="Geist Mono, monospace">
        THIGH
      </text>

      <line x1={160 + hemInner} y1="280" x2={160 + hemOuter} y2="280" stroke="#91CFB5" strokeWidth="1.3" />
      <text x={160 + (hemInner + hemOuter) / 2} y="294" textAnchor="middle" fill="#91CFB5" fontSize="9" fontFamily="Geist Mono, monospace">
        {isTapered ? 'TAPERED' : isBaggy ? 'WIDE HEM' : 'STRAIGHT'}
      </text>

      <motion.path
        key="bottom-garment-silhouette"
        initial={{ d: pantsPath }}
        animate={{ d: pantsPath }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        fill="rgba(255,255,255,0.05)"
        stroke="#FCFCFA"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {isTapered && (
        <g stroke="#91CFB5" strokeWidth="1.2" strokeOpacity="0.7">
          <line x1={160 - hemOuter} y1="255" x2={160 - hemInner} y2="255" />
          <line x1={160 + hemInner} y1="255" x2={160 + hemOuter} y2="255" />
        </g>
      )}

      {(isBaggy || cut.id === 'bot-straight') && (
        <g stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.1">
          <line x1="138" y1="62" x2="134" y2="100" />
          <line x1="182" y1="62" x2="186" y2="100" />
        </g>
      )}

      {isCustom && (
        <g stroke="#E04F26" strokeWidth="1" strokeDasharray="4 3" opacity="0.8">
          <rect x="78" y="38" width="164" height="238" rx="3" />
          <text x="160" y="31" textAnchor="middle" fill="#E04F26" fontSize="9.5" fontFamily="Geist Mono, monospace">
            CUSTOM CLIENT PATTERN
          </text>
        </g>
      )}
    </svg>
  );
};

export const CuttingSizeSection: React.FC<CuttingSizeSectionProps> = ({ onNavigate }) => {
  const { lang, t } = useLang();
  const [cutGroup, setCutGroup] = useState<'tops' | 'bottoms'>('tops');
  const [selectedCutId, setSelectedCutId] = useState<string>('top-boxy');

  const [sizeTab, setSizeTab] = useState<'tops' | 'bottoms'>('tops');
  const [topProfile, setTopProfile] = useState<'regular' | 'oversized' | 'boxy'>('boxy');
  const [bottomProfile, setBottomProfile] = useState<'straight' | 'baggy' | 'tapered'>('baggy');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [highlightSize, setHighlightSize] = useState<string>('L');

  const groupCuts = CUTTING_OPTIONS.filter((c) => c.group === cutGroup);
  const activeCut = groupCuts.find((c) => c.id === selectedCutId) ?? groupCuts[0];

  const handleGroupSwitch = (group: 'tops' | 'bottoms') => {
    setCutGroup(group);
    const first = CUTTING_OPTIONS.find((c) => c.group === group);
    if (first) setSelectedCutId(first.id);
  };

  const formatNum = (cm: number) => (unit === 'cm' ? `${cm}` : (cm / 2.54).toFixed(1));
  const formatWaist = (range: string) => {
    if (unit === 'cm') return range;
    return range
      .split('–')
      .map((s) => (parseFloat(s.trim()) / 2.54).toFixed(1))
      .join(' – ');
  };

  return (
    <section className="relative bg-[#F7F5F0] pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Clean Minimalist Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#1B1B16]/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
              {lang === 'id' ? 'Index03 // Pola & Ukuran' : 'Index03 // Pattern & Grading'}
            </div>
            <h1 className="mt-2 text-[clamp(34px,4.8vw,62px)] font-light leading-[1.04] tracking-[-0.04em] text-[#1B1B16]">
              {lang === 'id' ? 'Cutting & Size Chart' : 'Cutting & Size Chart'}
            </h1>
          </div>

          <div className="inline-flex rounded-full border border-[#1B1B16]/12 bg-[#EFECE4] p-1">
            <button
              type="button"
              onClick={() => handleGroupSwitch('tops')}
              className={`rounded-full px-4 py-2 font-mono text-[11.5px] transition-all cursor-pointer ${
                cutGroup === 'tops' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
              }`}
            >
              {lang === 'id' ? 'Atasan & Jaket' : 'Tops & Outerwear'}
            </button>
            <button
              type="button"
              onClick={() => handleGroupSwitch('bottoms')}
              className={`rounded-full px-4 py-2 font-mono text-[11.5px] transition-all cursor-pointer ${
                cutGroup === 'bottoms' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
              }`}
            >
              {lang === 'id' ? 'Bawahan' : 'Bottoms'}
            </button>
          </div>
        </div>

        {/* Silhouette Selector + Blueprint */}
        <div className="mt-9 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-6">
            {groupCuts.map((option) => {
              const isSelected = option.id === activeCut.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedCutId(option.id)}
                  className={`rounded-[16px] border p-5 text-left transition-all duration-250 cursor-pointer ${
                    isSelected
                      ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                      : 'border-[#1B1B16]/12 bg-white text-[#1B1B16] hover:border-[#1B1B16]/35'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif text-[21px] font-normal">
                      {t(option.name)}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                        isSelected ? 'text-[#D4B144]' : 'text-[#8B8A7D]'
                      }`}
                    >
                      {t(option.status)}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-[13.5px] leading-[1.55] ${
                      isSelected ? 'text-white/75' : 'text-[#59594E]'
                    }`}
                  >
                    {t(option.silhouette)}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#222625] bg-[#0B0D0C] p-6 text-white blueprint-grid lg:col-span-6 md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-[#D4B144]">
                <Scissors className="h-3.5 w-3.5" />
                <span>PATTERN · {activeCut.shortName.toUpperCase()}</span>
              </div>
              <span className="text-[#889090]">
                {activeCut.group === 'tops' ? 'TOP BLOCK' : 'BOTTOM BLOCK'}
              </span>
            </div>

            <div className="my-4 flex flex-1 items-center justify-center">
              <TechnicalPatternSVG cut={activeCut} />
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4 font-mono text-[11px] sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[9.5px] uppercase text-[#7E8686]">
                  {activeCut.group === 'tops' ? (lang === 'id' ? 'Bahu' : 'Shoulder') : (lang === 'id' ? 'Pinggang' : 'Waist')}
                </div>
                <div className="mt-1 text-white/95">{t(activeCut.fitMetrics.shoulder)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[9.5px] uppercase text-[#7E8686]">
                  {activeCut.group === 'tops' ? (lang === 'id' ? 'Badan' : 'Torso') : (lang === 'id' ? 'Paha' : 'Thigh')}
                </div>
                <div className="mt-1 text-white/95">{t(activeCut.fitMetrics.body)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="text-[9.5px] uppercase text-[#7E8686]">
                  {activeCut.group === 'tops' ? (lang === 'id' ? 'Panjang' : 'Length') : (lang === 'id' ? 'Bukaan' : 'Opening')}
                </div>
                <div className="mt-1 text-white/95">{t(activeCut.fitMetrics.length)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIZE CHART TABLE */}
        <div className="mt-20 border-t border-[#1B1B16]/10 pt-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-[28px] font-light tracking-[-0.03em] text-[#1B1B16] sm:text-[36px]">
                {lang === 'id' ? 'Standar Ukuran S – XXL' : 'Standard Sizing S – XXL'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex rounded-full border border-[#1B1B16]/12 bg-[#EFECE4] p-1">
                <button
                  type="button"
                  onClick={() => setSizeTab('tops')}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] cursor-pointer ${
                    sizeTab === 'tops' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
                  }`}
                >
                  {lang === 'id' ? 'Atasan' : 'Tops'}
                </button>
                <button
                  type="button"
                  onClick={() => setSizeTab('bottoms')}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] cursor-pointer ${
                    sizeTab === 'bottoms' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
                  }`}
                >
                  {lang === 'id' ? 'Bawahan' : 'Bottoms'}
                </button>
              </div>

              <div className="inline-flex rounded-full border border-[#1B1B16]/12 bg-white p-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setUnit('cm')}
                  className={`rounded-full px-3 py-1 cursor-pointer ${
                    unit === 'cm' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
                  }`}
                >
                  CM
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={`rounded-full px-3 py-1 cursor-pointer ${
                    unit === 'in' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
                  }`}
                >
                  IN
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {sizeTab === 'tops'
              ? (['regular', 'oversized', 'boxy'] as const).map((prof) => (
                  <button
                    key={prof}
                    type="button"
                    onClick={() => setTopProfile(prof)}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] cursor-pointer ${
                      topProfile === prof
                        ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                        : 'border-[#1B1B16]/12 bg-white text-[#59594E]'
                    }`}
                  >
                    {prof === 'boxy' ? 'Boxy / Cropped' : prof === 'oversized' ? 'Oversized' : 'Regular Fit'}
                  </button>
                ))
              : (['straight', 'baggy', 'tapered'] as const).map((prof) => (
                  <button
                    key={prof}
                    type="button"
                    onClick={() => setBottomProfile(prof)}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] cursor-pointer ${
                      bottomProfile === prof
                        ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                        : 'border-[#1B1B16]/12 bg-white text-[#59594E]'
                    }`}
                  >
                    {prof === 'baggy' ? 'Relaxed / Baggy' : prof === 'tapered' ? 'Tapered / Jogger' : 'Straight Fit'}
                  </button>
                ))}
          </div>

          <div className="mt-5 overflow-x-auto rounded-[18px] border border-[#1B1B16]/12 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#1B1B16]/10 bg-[#1B1B16] font-mono text-[10.5px] uppercase tracking-[0.08em] text-white">
                  <th className="px-6 py-4">{lang === 'id' ? 'Ukuran' : 'Size'}</th>
                  {sizeTab === 'tops' ? (
                    <>
                      <th className="px-6 py-4">{lang === 'id' ? `Lebar Dada (${unit})` : `Chest (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Panjang (${unit})` : `Length (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Lengan (${unit})` : `Sleeve (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Bahu (${unit})` : `Shoulder (${unit})`}</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">{lang === 'id' ? `Pinggang (${unit})` : `Waist (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Panjang (${unit})` : `Outseam (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Paha (${unit})` : `Thigh (${unit})`}</th>
                      <th className="px-6 py-4">{lang === 'id' ? `Bukaan (${unit})` : `Opening (${unit})`}</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1B16]/10 font-mono text-[13px]">
                {sizeTab === 'tops'
                  ? SIZE_CHARTS_TOPS[topProfile].map((row) => {
                      const active = highlightSize === row.size;
                      return (
                        <tr
                          key={row.size}
                          onClick={() => setHighlightSize(row.size)}
                          className={`cursor-pointer transition-colors ${
                            active ? 'bg-[#EFECE4] font-semibold text-[#1B1B16]' : 'text-[#3B3B33] hover:bg-[#F7F5F0]'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2">
                              <span className="font-sans text-[15px] font-semibold">{row.size}</span>
                              {active && <Check className="h-3.5 w-3.5 text-[#E04F26]" />}
                            </span>
                          </td>
                          <td className="px-6 py-4">{formatNum(row.chest)}</td>
                          <td className="px-6 py-4">{formatNum(row.length)}</td>
                          <td className="px-6 py-4">{formatNum(row.sleeve)}</td>
                          <td className="px-6 py-4">{formatNum(row.shoulder)}</td>
                        </tr>
                      );
                    })
                  : SIZE_CHARTS_BOTTOMS[bottomProfile].map((row) => {
                      const active = highlightSize === row.size;
                      return (
                        <tr
                          key={row.size}
                          onClick={() => setHighlightSize(row.size)}
                          className={`cursor-pointer transition-colors ${
                            active ? 'bg-[#EFECE4] font-semibold text-[#1B1B16]' : 'text-[#3B3B33] hover:bg-[#F7F5F0]'
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-2">
                              <span className="font-sans text-[15px] font-semibold">{row.size}</span>
                              {active && <Check className="h-3.5 w-3.5 text-[#E04F26]" />}
                            </span>
                          </td>
                          <td className="px-6 py-4">{formatWaist(row.waist)}</td>
                          <td className="px-6 py-4">{formatNum(row.length)}</td>
                          <td className="px-6 py-4">{formatNum(row.thigh)}</td>
                          <td className="px-6 py-4">{formatNum(row.opening)}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border-l-[3px] border-[#1B1B16] bg-[#EFECE4]/70 px-5 py-4 text-[13px] text-[#45453C] sm:flex-row sm:items-center">
            <div className="flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#1B1B16]" />
              <p>
                {lang === 'id'
                  ? 'Toleransi jahit standar ± 1–1.5 cm. Klien dapat menggunakan size chart atau tech pack milik merek sendiri.'
                  : 'Standard sewing tolerance ± 1–1.5 cm. Client-supplied size charts and tech packs are fully supported.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('order')}
              className="soma-pill-dark inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium cursor-pointer"
            >
              <span>{lang === 'id' ? 'Lanjut ke Order' : 'Configure Order'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
