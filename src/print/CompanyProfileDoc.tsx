import React from 'react';
import {
  CUTTING_OPTIONS,
  MATERIAL_GROUPS,
  ORDER_STEPS,
  PRODUCTION_TERMS,
  PRODUCTS,
  S08_CONTACT,
  SIZE_CHARTS_BOTTOMS,
  SIZE_CHARTS_TOPS,
} from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';
import { DyedFabricSurface } from '../components/DyedFabricSurface';
import { MACRO_SHOWCASE_TILES, SHOWCASE_LINES } from './printData';
import {
  CutoutCallingCard,
  Hairline,
  MonoLabel,
  QrSvg,
  Sheet,
  StaticAsciiS08,
  WA_DEFAULT_URL,
} from './printKit';

const TOTAL_PAGES = 11;
const DOC_TITLE = 'COMPANY PROFILE';

export const CompanyProfileDoc: React.FC = () => {
  const { lang, t } = useLang();

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const extraProducts = PRODUCTS.filter((p) => !p.featured);

  const leftFabricGroups = MATERIAL_GROUPS.filter((g) =>
    ['outerwear-fabric', 'bottoms-fabric'].includes(g.id)
  );
  const rightFabricGroups = MATERIAL_GROUPS.filter((g) =>
    ['fleece-terry', 'tops-fabric'].includes(g.id)
  );
  const craftGroups = MATERIAL_GROUPS.filter((g) =>
    ['print-embroidery', 'brand-finishing'].includes(g.id)
  );

  const topCuts = CUTTING_OPTIONS.filter((c) => c.group === 'tops');
  const bottomCuts = CUTTING_OPTIONS.filter((c) => c.group === 'bottoms');

  return (
    <div>
      {/* =================================================================== */}
      {/* PAGE 01: COVER (BLEED OLED HERO)                                    */}
      {/* =================================================================== */}
      <Sheet tone="oled" doc={DOC_TITLE} page={1} total={TOTAL_PAGES} bleed>
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#14120F] text-white">
          <img
            src="/images/hero-workshop.jpg"
            alt="Workshop S08 Konveksi Bandung"
            loading="eager"
            decoding="sync"
            style={{ objectPosition: '50% 68%' }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover brightness-[0.62] contrast-[1.15] sepia-[0.16]"
          />
          <div
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(44, 32, 20, 0.34) 0%, rgba(18, 15, 11, 0.68) 100%)',
            }}
            className="pointer-events-none absolute inset-0"
          />
          <div
            style={{
              background:
                'linear-gradient(to top, rgba(14, 12, 10, 0.92) 0%, rgba(14, 12, 10, 0.45) 34%, transparent 62%)',
            }}
            className="pointer-events-none absolute inset-0"
          />

          {/* Top Mono Rail */}
          <div
            style={{ padding: '14mm 14mm 0' }}
            className="relative z-10 flex items-center justify-between font-mono text-[8pt] uppercase tracking-[0.16em] text-white/75"
          >
            <span>BANDUNG, INDONESIA · EST. 2008</span>
            <span>COMPANY PROFILE · 2026</span>
          </div>

          {/* Center Calling Card + Statement */}
          <div className="relative z-10 mx-auto flex w-full flex-col items-center px-[16mm] text-center">
            <div className="w-[140mm] shadow-[0_34px_65px_rgba(0,0,0,0.55)]">
              <CutoutCallingCard maskId="cp-cover-mask" lang={lang} />
            </div>

            <p className="mt-[12mm] max-w-[145mm] text-[18pt] font-normal leading-[1.32] tracking-[-0.02em] text-white/95">
              {lang === 'id' ? (
                <>
                  Konveksi Bandung{' '}
                  <span className="font-serif italic text-white">sejak 2008</span>{' '}
                  untuk{' '}
                  <span className="font-serif italic text-white">merek pakaian</span>,
                  ritel, dan instansi.
                </>
              ) : (
                <>
                  A Bandung garment studio{' '}
                  <span className="font-serif italic text-white">since 2008</span>{' '}
                  built for{' '}
                  <span className="font-serif italic text-white">clothing labels</span>,
                  retail, and institutions.
                </>
              )}
            </p>
          </div>

          {/* Bottom Ruler Edge */}
          <div className="relative z-10 w-full border-t border-white/15 bg-[#0E0E0C]/45 px-[14mm] py-[3.5mm]">
            <div className="flex items-center justify-between font-mono text-[7pt] text-white/65">
              {[
                '10 cm',
                '20 cm',
                '30 cm',
                '40 cm',
                '50 cm',
                '60 cm',
                '70 cm',
                '80 cm',
                '90 cm',
                '100 cm',
              ].map((mark) => (
                <div key={mark} className="flex flex-col items-center gap-[1.5mm]">
                  <span className="h-[2mm] w-px bg-white/45" />
                  <span>{mark}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 02: PROFIL & FAKTA PRODUKSI                                    */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX00 // PROFIL"
        page={2}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <MonoLabel>
              {lang === 'id' ? '00 // Tentang Workshop' : '00 // About Workshop'}
            </MonoLabel>

            <h1 className="mt-[4mm] text-[31pt] font-light leading-[1.06] tracking-[-0.035em] text-[#1B1B16]">
              {lang === 'id'
                ? 'Produksi pakaian untuk merek, ritel, dan instansi.'
                : 'Apparel manufacturing for labels, retail, and institutions.'}
            </h1>
            <p className="mt-[2mm] text-[31pt] font-light leading-[1.06] tracking-[-0.035em] text-[#A2A198]">
              {lang === 'id'
                ? 'Berbasis di Bandung — beroperasi sejak 2008.'
                : 'Based in Bandung — operating since 2008.'}
            </p>

            <p className="mt-[7mm] max-w-[155mm] text-[10.5pt] leading-[1.6] text-[#4E4E45]">
              {lang === 'id'
                ? 'S08 Konveksi adalah rumah produksi pakaian di Bandung sejak 2008 yang menangani pengembangan pola, sampel, hingga produksi massal untuk merek pakaian, ritel, komunitas, dan instansi dengan pengawasan mutu per potong.'
                : 'S08 Konveksi is a Bandung garment manufacturer operating since 2008, supporting clothing labels, retailers, communities, and institutions from pattern development through piece-by-piece quality-controlled bulk production.'}
            </p>
          </div>

          {/* Sharp Editorial Workshop Image */}
          <div className="my-[6mm]">
            <div className="h-[92mm] w-full overflow-hidden rounded-none bg-[#EAE7DF]">
              <img
                src="/images/simeon-mono-craft.jpg"
                alt="Workshop S08 Konveksi"
                loading="eager"
                decoding="sync"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-[2mm] flex items-center justify-between font-mono text-[7pt] uppercase tracking-[0.12em] text-[#8B8A7D]">
              <span>WORKSHOP JL. SEGAR DALAM D 16 · BANDUNG</span>
              <span>PATTERN · SEWING · QC</span>
            </div>
          </div>

          {/* 4-Cell Hairline Facts Grid + Clients */}
          <div>
            <div className="grid grid-cols-4 divide-x divide-[#1B1B16]/12 border-y border-[#1B1B16]/12">
              {[
                {
                  k: 'EST.',
                  v: '2008',
                  sub: lang === 'id' ? 'Bandung, Jawa Barat' : 'Bandung, West Java',
                },
                {
                  k: 'MOQ',
                  v: '24 pcs',
                  sub: lang === 'id' ? 'Per artikel / campur size' : 'Per style / mixed sizes',
                },
                {
                  k: lang === 'id' ? 'PRODUKSI' : 'LEAD TIME',
                  v: lang === 'id' ? '14–21 Hari' : '14–21 Days',
                  sub: lang === 'id' ? 'Hari kerja setelah DP' : 'Working days post-DP',
                },
                {
                  k: lang === 'id' ? 'SAMPEL' : 'PROTOTYPE',
                  v: lang === 'id' ? '5–7 Hari' : '5–7 Days',
                  sub: lang === 'id' ? 'Validasi pola & kain' : 'Optional block validation',
                },
              ].map((cell) => (
                <div key={cell.k} className="px-[4mm] py-[4.5mm] first:pl-0 last:pr-0">
                  <div className="font-mono text-[7pt] uppercase tracking-[0.14em] text-[#8B8A7D]">
                    {cell.k}
                  </div>
                  <div className="mt-[1.5mm] font-serif text-[16pt] text-[#1B1B16]">
                    {cell.v}
                  </div>
                  <div className="mt-[1mm] text-[8pt] text-[#59594E]">{cell.sub}</div>
                </div>
              ))}
            </div>

            <div className="mt-[5mm] flex items-center justify-between font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
              <div>
                <span>{lang === 'id' ? 'KLIEN: ' : 'SELECTED CLIENTS: '}</span>
                <span className="font-semibold text-[#1B1B16]">
                  KAPUYUWAK · REDWEAR · OEM PRIVATE LABEL
                </span>
              </div>
              <span>IDN · 40000</span>
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 03: PRECISION INDEX + VERMILION TICKER + DIRECTORY             */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX00 // INDEKS"
        page={3}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            {/* Precision Index Ruler */}
            <div className="flex items-center justify-between font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#6D6C60]">
              <span>PRECISION INDEX · WORKSHOP CALIBRATION</span>
              <span className="font-semibold text-[#1B1B16]">[S08] · 62 CM</span>
            </div>

            <div className="relative mt-[2.5mm] h-[5mm] w-full border-b border-[#111111]">
              <div className="flex h-full w-full items-end justify-between">
                {Array.from({ length: 49 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-px bg-[#111111]/35 ${
                      idx % 12 === 0
                        ? 'h-[4mm] bg-[#111111]'
                        : idx % 6 === 0
                          ? 'h-[2.5mm] bg-[#111111]/65'
                          : 'h-[1.3mm]'
                    }`}
                  />
                ))}
              </div>
              <div
                style={{ left: '62%', backgroundColor: '#FF2E00' }}
                className="absolute inset-y-0 w-[2.5px] -translate-x-1/2"
              />
            </div>

            {/* Giant Condensed S08 KONVEKSI */}
            <div className="my-[4mm] w-full overflow-hidden">
              <div
                style={{
                  fontSize: '56pt',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  fontWeight: 900,
                  fontVariationSettings: '"wght" 900, "wdth" 56, "opsz" 144',
                }}
                className="font-kinetic w-full whitespace-nowrap text-center uppercase text-[#0B0B0B]"
              >
                S08 KONVEKSI
              </div>
            </div>

            {/* Vermilion Ticker Band */}
            <div
              style={{
                backgroundColor: '#FF2E00',
                color: '#0B0B0B',
                fontWeight: 850,
                fontVariationSettings: '"wght" 850, "wdth" 78, "opsz" 144',
              }}
              className="font-kinetic w-full whitespace-nowrap px-[3mm] py-[2.6mm] text-center text-[8.8pt] uppercase tracking-[0.02em]"
            >
              S08 KONVEKSI • BANDUNG GARMENT HOUSE • EST. 2008 • OUTERWEAR · BOTTOMS · KNITWEAR · OEM
            </div>
          </div>

          {/* Stolaze-Style Directory List */}
          <div className="my-auto py-[4mm]">
            <div className="mb-[3mm] flex items-center justify-between font-mono text-[7.5pt] uppercase tracking-[0.14em] text-[#8E8D84]">
              <span>{lang === 'id' ? 'Daftar Isi // Dokumen' : 'Contents // Document'}</span>
              <span>{lang === 'id' ? 'Halaman' : 'Page'}</span>
            </div>

            <div className="divide-y divide-[#1B1B16]/12 border-y border-[#1B1B16]/12">
              {[
                {
                  code: '01—',
                  title: lang === 'id' ? 'Lini Produksi' : 'Production Lines',
                  sub: lang === 'id' ? '5 Kategori Utama Workshop' : '5 Core Manufacturing Lines',
                  pg: '04–05',
                },
                {
                  code: '02—',
                  title: lang === 'id' ? 'Katalog Artikel' : 'Product Catalog',
                  sub: lang === 'id' ? '14 Artikel · MOQ 24 pcs' : '14 Styles · MOQ 24 pcs',
                  pg: '06',
                },
                {
                  code: '03—',
                  title: lang === 'id' ? 'Bahan & Finishing' : 'Fabrics & Finishing',
                  sub: lang === 'id' ? 'Kain, Sablon, Bordir & Label' : 'Textiles, Print, Stitch & OEM',
                  pg: '07–08',
                },
                {
                  code: '04—',
                  title: 'Cutting & Size Chart',
                  sub: lang === 'id' ? 'Atasan, Bawahan & S–XXL' : 'Silhouettes & S–XXL Tables',
                  pg: '09',
                },
                {
                  code: '05—',
                  title: lang === 'id' ? 'Alur Pemesanan' : 'Order Process',
                  sub: lang === 'id' ? '7 Tahap & Ketentuan Produksi' : '7 Stages & Terms',
                  pg: '10',
                },
                {
                  code: '06—',
                  title: lang === 'id' ? 'Kontak Workshop' : 'Workshop Contact',
                  sub: 'Jl. Segar Dalam D 16 · QR WhatsApp',
                  pg: '11',
                },
              ].map((row) => (
                <div
                  key={row.code}
                  className="flex items-baseline justify-between py-[4.5mm]"
                >
                  <div className="text-[20pt] font-light leading-none tracking-[-0.03em] text-[#1B1B16]">
                    <span className="text-[#9E9D94]">{row.code}</span>
                    {row.title}
                  </div>
                  <div className="flex items-baseline gap-[5mm] font-mono text-[8pt]">
                    <span className="text-[#7C7B6E]">{row.sub}</span>
                    <span className="font-semibold text-[#1B1B16]">{row.pg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="font-mono text-[7.5pt] text-[#7C7B6E]">
            {lang === 'id'
              ? 'Semua lini tersedia dalam opsi pengembangan pola custom & OEM private label.'
              : 'All product lines support custom pattern blocks and full private-label OEM finishing.'}
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 04: LINI PRODUKSI I (2 LARGE EDITORIAL PLATES)                 */}
      {/* =================================================================== */}
      <Sheet
        tone="stone"
        doc={DOC_TITLE}
        section="INDEX01 // LINI PRODUKSI I"
        page={4}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[5mm]">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[19pt] font-medium tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Lini Produksi Pilihan' : 'Selected Production Lines'}
            </h2>
            <MonoLabel>01 — 02 / 05</MonoLabel>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-[6mm]">
            {SHOWCASE_LINES.slice(0, 2).map((line) => (
              <div key={line.id} className="flex flex-col">
                <div className="relative flex h-[100mm] items-center justify-center overflow-hidden rounded-none bg-[#1A1A17] p-[7mm]">
                  <img
                    src={line.backdropImg}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    decoding="sync"
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${line.backdropTint}`}
                  />
                  <div className="relative z-10 h-[80mm] w-[108mm] overflow-hidden rounded-none bg-[#EAE7DF] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                    <img
                      src={line.garmentImg}
                      alt={t(line.title)}
                      loading="eager"
                      decoding="sync"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-[2.5mm] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-[3mm]">
                    <span className="font-mono text-[8pt] text-[#7C7B6E]">
                      {line.code}
                    </span>
                    <span className="text-[12pt] font-medium tracking-[-0.02em] text-[#1B1B16]">
                      {t(line.title)}
                    </span>
                  </div>
                  <span className="font-mono text-[7.5pt] text-[#59594E]">
                    {t(line.meta)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 05: LINI PRODUKSI II (3 PLATES)                                */}
      {/* =================================================================== */}
      <Sheet
        tone="stone"
        doc={DOC_TITLE}
        section="INDEX01 // LINI PRODUKSI II"
        page={5}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[5mm]">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[19pt] font-medium tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Knitwear, Seragam & OEM' : 'Knitwear, Uniforms & OEM'}
            </h2>
            <MonoLabel>03 — 05 / 05</MonoLabel>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-[6mm]">
            {/* Wide Feature Plate 03 */}
            {(() => {
              const line = SHOWCASE_LINES[2];
              return (
                <div>
                  <div className="relative flex h-[106mm] items-center justify-center overflow-hidden rounded-none bg-[#1A1A17] p-[7mm]">
                    <img
                      src={line.backdropImg}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      decoding="sync"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${line.backdropTint}`}
                    />
                    <div className="relative z-10 h-[86mm] w-[114mm] overflow-hidden rounded-none bg-[#EAE7DF] shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                      <img
                        src={line.garmentImg}
                        alt={t(line.title)}
                        loading="eager"
                        decoding="sync"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-[2.5mm] flex items-baseline justify-between">
                    <div className="flex items-baseline gap-[3mm]">
                      <span className="font-mono text-[8pt] text-[#7C7B6E]">
                        {line.code}
                      </span>
                      <span className="text-[12pt] font-medium tracking-[-0.02em] text-[#1B1B16]">
                        {t(line.title)}
                      </span>
                    </div>
                    <span className="font-mono text-[7.5pt] text-[#59594E]">
                      {t(line.meta)}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* 2-Column Plates 04 & 05 */}
            <div className="grid grid-cols-2 gap-[5mm]">
              {SHOWCASE_LINES.slice(3, 5).map((line) => (
                <div key={line.id}>
                  <div className="relative flex h-[92mm] items-center justify-center overflow-hidden rounded-none bg-[#1A1A17] p-[5mm]">
                    <img
                      src={line.backdropImg}
                      alt=""
                      aria-hidden="true"
                      loading="eager"
                      decoding="sync"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${line.backdropTint}`}
                    />
                    <div className="relative z-10 h-[72mm] w-[66mm] overflow-hidden rounded-none bg-[#EAE7DF] shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
                      <img
                        src={line.garmentImg}
                        alt={t(line.title)}
                        loading="eager"
                        decoding="sync"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-[2.5mm] flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-[2mm]">
                      <span className="font-mono text-[7.5pt] text-[#7C7B6E]">
                        {line.code}
                      </span>
                      <span className="text-[10.5pt] font-medium tracking-[-0.015em] text-[#1B1B16]">
                        {t(line.title)}
                      </span>
                    </div>
                    <span className="truncate font-mono text-[6.5pt] text-[#59594E]">
                      {t(line.meta)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 06: KATALOG ARTIKEL (4x2 FEATURED GRID + EXTRA LIST)           */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX02 // KATALOG"
        page={6}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[3.5mm]">
            <div>
              <MonoLabel>
                {lang === 'id' ? 'Katalog Produksi Utama' : 'Core Production Catalog'}
              </MonoLabel>
              <h2 className="mt-[1mm] text-[22pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                {lang === 'id' ? 'Katalog Artikel' : 'Featured Styles'}
              </h2>
            </div>
            <span className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
              {PRODUCTS.length} {lang === 'id' ? 'ARTIKEL' : 'STYLES'} · MOQ 24 PCS
            </span>
          </div>

          {/* 4x2 Grid of 8 Featured Products */}
          <div className="my-auto grid grid-cols-4 gap-x-[4mm] gap-y-[6mm] py-[4mm]">
            {featuredProducts.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-none bg-[#EAE7DF]">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    loading="eager"
                    decoding="sync"
                    className="h-full w-full object-cover"
                  />
                  {item.tag && (
                    <span className="absolute left-[2.5mm] top-[2.5mm] rounded-full bg-[#1B1B16]/85 px-[2.2mm] py-[0.8mm] font-mono text-[6pt] uppercase tracking-[0.1em] text-[#F7F5F0]">
                      {t(item.tag)}
                    </span>
                  )}
                </div>
                <div className="mt-[2mm] flex items-baseline justify-between gap-[1.5mm]">
                  <h3 className="text-[9.2pt] font-medium leading-tight tracking-[-0.015em] text-[#1B1B16]">
                    {t(item.name)}
                  </h3>
                  <span className="shrink-0 font-mono text-[6.3pt] text-[#8B8A7D]">
                    {item.sizeRange}
                  </span>
                </div>
                <p className="mt-[1mm] font-mono text-[6.8pt] leading-snug text-[#7C7B6E]">
                  {t(item.specLine)}
                </p>
              </div>
            ))}
          </div>

          {/* Additional 6 Catalog Items + Footnote */}
          <div className="border-t border-[#1B1B16]/12 pt-[3.5mm]">
            <div className="font-mono text-[7pt] uppercase tracking-[0.12em] text-[#8B8A7D]">
              {lang === 'id'
                ? 'Artikel Tambahan dalam Katalog Standar'
                : 'Additional Standard Catalog Styles'}
            </div>
            <div className="mt-[2mm] grid grid-cols-3 gap-x-[4mm] gap-y-[1.5mm] text-[8pt] text-[#3B3B33]">
              {extraProducts.map((item) => (
                <div key={item.id} className="truncate font-medium">
                  · {t(item.name)}{' '}
                  <span className="font-mono text-[6.5pt] font-normal text-[#7C7B6E]">
                    ({item.sizeRange})
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[2.5mm] font-mono text-[7pt] text-[#7C7B6E]">
              {lang === 'id'
                ? `Total ${PRODUCTS.length} artikel standar · Artikel lain & pengembangan pola custom tersedia atas permintaan.`
                : `${PRODUCTS.length} standard styles total · Additional styles and custom pattern blocks available upon request.`}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 07: BAHAN I (4 TEXTILE GROUPS IN 2 COLUMNS)                    */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX03 // BAHAN I"
        page={7}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[3mm]">
            <div>
              <MonoLabel>
                {lang === 'id' ? 'Spesifikasi Tekstil Workshop' : 'Workshop Textile Library'}
              </MonoLabel>
              <h2 className="mt-[1mm] text-[21pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                {lang === 'id' ? 'Bahan Kain Utama' : 'Core Fabrics'}
              </h2>
            </div>
            <span className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
              18 {lang === 'id' ? 'MATERIAL TEKSTIL' : 'TEXTILE QUALITIES'}
            </span>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-[7mm] pt-[4mm]">
            {[leftFabricGroups, rightFabricGroups].map((colGroups, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[5mm]">
                {colGroups.map((group) => (
                  <div key={group.id}>
                    <div className="flex items-center justify-between border-b border-[#1B1B16]/20 pb-[1.5mm]">
                      <span className="font-mono text-[7.5pt] font-semibold uppercase tracking-[0.12em] text-[#1B1B16]">
                        {group.mono} · {t(group.category)}
                      </span>
                      <span className="font-mono text-[7pt] text-[#8B8A7D]">
                        {group.items.length}
                      </span>
                    </div>
                    <div className="divide-y divide-[#1B1B16]/10">
                      {group.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-start gap-[3mm] py-[2.4mm]"
                        >
                          <DyedFabricSurface
                            textureImg={item.textureImg}
                            hex={item.colorOptions[0]?.hex ?? item.swatch}
                            alt={item.name}
                            className="h-[13mm] w-[13mm] shrink-0 rounded-none border border-black/15"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-[2mm]">
                              <span className="truncate text-[8.8pt] font-medium text-[#1B1B16]">
                                {item.name}
                              </span>
                              <span className="shrink-0 font-mono text-[6.8pt] text-[#7C7B6E]">
                                {item.spec}
                              </span>
                            </div>
                            <p className="mt-[0.5mm] line-clamp-2 text-[7.4pt] leading-[1.35] text-[#59594E]">
                              {t(item.feel)}
                            </p>
                            <div className="mt-[1.2mm] flex items-center gap-[1.2mm]">
                              {item.colorOptions.map((c) => (
                                <span
                                  key={c.label}
                                  title={c.label}
                                  style={{ backgroundColor: c.hex }}
                                  className="h-[2.4mm] w-[2.4mm] rounded-full border border-black/20"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 08: BAHAN II (SABLON, BORDIR & LABEL + 5 MACRO TEXTILES)       */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX03 // BAHAN II"
        page={8}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[3mm]">
            <div>
              <MonoLabel>
                {lang === 'id' ? 'Aplikasi Grafis & Kelengkapan' : 'Decoration & Private Label'}
              </MonoLabel>
              <h2 className="mt-[1mm] text-[21pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                {lang === 'id' ? 'Sablon, Bordir & Label OEM' : 'Print, Embroidery & OEM'}
              </h2>
            </div>
            <span className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
              FINISHING · TRIMS · PACKAGING
            </span>
          </div>

          {/* 2-Column Print & OEM Lists */}
          <div className="grid grid-cols-2 gap-x-[7mm] pt-[4mm]">
            {craftGroups.map((group) => (
              <div key={group.id}>
                <div className="flex items-center justify-between border-b border-[#1B1B16]/20 pb-[1.5mm]">
                  <span className="font-mono text-[7.5pt] font-semibold uppercase tracking-[0.12em] text-[#1B1B16]">
                    {group.mono} · {t(group.category)}
                  </span>
                  <span className="font-mono text-[7pt] text-[#8B8A7D]">
                    {group.items.length}
                  </span>
                </div>
                <div className="divide-y divide-[#1B1B16]/10">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-[3mm] py-[3mm]"
                    >
                      <DyedFabricSurface
                        textureImg={item.textureImg}
                        hex={item.colorOptions[0]?.hex ?? item.swatch}
                        alt={item.name}
                        className="h-[14mm] w-[14mm] shrink-0 rounded-none border border-black/15"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-[2mm]">
                          <span className="truncate text-[9pt] font-medium text-[#1B1B16]">
                            {item.name}
                          </span>
                          <span className="shrink-0 font-mono text-[6.8pt] text-[#7C7B6E]">
                            {item.spec}
                          </span>
                        </div>
                        <p className="mt-[0.8mm] text-[7.6pt] leading-[1.4] text-[#59594E]">
                          {t(item.feel)}
                        </p>
                        <div className="mt-[1.4mm] flex items-center gap-[1.3mm]">
                          {item.colorOptions.map((c) => (
                            <span
                              key={c.label}
                              style={{ backgroundColor: c.hex }}
                              className="h-[2.4mm] w-[2.4mm] rounded-full border border-black/20"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 5 Large Sharp Macro Texture Tiles */}
          <div className="mt-auto border-t border-[#1B1B16]/12 pt-[5mm]">
            <div className="mb-[3mm] flex items-center justify-between font-mono text-[7.5pt] uppercase tracking-[0.14em] text-[#7C7B6E]">
              <span>
                {lang === 'id'
                  ? 'Referensi Serat Makro Pilihan'
                  : 'Macro Textile Texture Reference'}
              </span>
              <span>S08 ARCHIVE</span>
            </div>
            <div className="grid grid-cols-5 gap-[3mm]">
              {MACRO_SHOWCASE_TILES.map((tile) => (
                <div key={tile.spec}>
                  <DyedFabricSurface
                    textureImg={tile.textureImg}
                    hex={tile.hex}
                    alt={t(tile.label)}
                    className="h-[46mm] w-full rounded-none border border-[#1B1B16]/15"
                    studioLighting
                  />
                  <div className="mt-[1.8mm] font-mono text-[6.8pt] uppercase tracking-[0.08em] text-[#8B8A7D]">
                    {tile.spec}
                  </div>
                  <div className="text-[8pt] font-medium text-[#1B1B16]">
                    {t(tile.label)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 09: CUTTING & SIZE CHART                                       */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX04 // CUTTING & SIZE"
        page={9}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[3mm]">
              <div>
                <MonoLabel>
                  {lang === 'id' ? 'Panduan Pola & Siluet' : 'Pattern & Silhouette Guide'}
                </MonoLabel>
                <h2 className="mt-[1mm] text-[20pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                  Cutting &amp; Size Chart
                </h2>
              </div>
              <span className="font-mono text-[7.5pt] text-[#7C7B6E]">CM · S–XXL / CUSTOM</span>
            </div>

            {/* Tops Cutting */}
            <div className="mt-[4mm]">
              <MonoLabel className="mb-[2mm] text-[#1B1B16]">
                {lang === 'id' ? 'A. Cutting Atasan (Tops)' : 'A. Upper Garment Cuts (Tops)'}
              </MonoLabel>
              <div className="grid grid-cols-2 gap-[3mm]">
                {topCuts.map((c) => (
                  <div
                    key={c.id}
                    className="border border-[#1B1B16]/12 bg-white p-[3.2mm]"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-[9.2pt] font-medium text-[#1B1B16]">
                        {t(c.name)}
                      </span>
                      <span className="font-mono text-[6.5pt] uppercase text-[#8B8A7D]">
                        {t(c.status)}
                      </span>
                    </div>
                    <p className="mt-[1mm] text-[7.5pt] leading-snug text-[#59594E]">
                      {t(c.silhouette)}
                    </p>
                    <div className="mt-[1.8mm] grid grid-cols-3 gap-1 border-t border-[#1B1B16]/10 pt-[1.5mm] font-mono text-[6.5pt] text-[#6D6C60]">
                      <span>{t(c.fitMetrics.shoulder)}</span>
                      <span>{t(c.fitMetrics.body)}</span>
                      <span>{t(c.fitMetrics.length)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottoms Cutting */}
            <div className="mt-[4mm]">
              <MonoLabel className="mb-[2mm] text-[#1B1B16]">
                {lang === 'id' ? 'B. Cutting Bawahan (Bottoms)' : 'B. Lower Garment Cuts (Bottoms)'}
              </MonoLabel>
              <div className="grid grid-cols-2 gap-[3mm]">
                {bottomCuts.map((c) => (
                  <div
                    key={c.id}
                    className="border border-[#1B1B16]/12 bg-white p-[3.2mm]"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-[9.2pt] font-medium text-[#1B1B16]">
                        {t(c.name)}
                      </span>
                      <span className="font-mono text-[6.5pt] uppercase text-[#8B8A7D]">
                        {t(c.status)}
                      </span>
                    </div>
                    <p className="mt-[1mm] text-[7.5pt] leading-snug text-[#59594E]">
                      {t(c.silhouette)}
                    </p>
                    <div className="mt-[1.8mm] grid grid-cols-3 gap-1 border-t border-[#1B1B16]/10 pt-[1.5mm] font-mono text-[6.5pt] text-[#6D6C60]">
                      <span>{t(c.fitMetrics.shoulder)}</span>
                      <span>{t(c.fitMetrics.body)}</span>
                      <span>{t(c.fitMetrics.length)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Standard Size Chart Tables */}
          <div className="border-t border-[#1B1B16]/12 pt-[4mm]">
            <div className="grid grid-cols-2 gap-[5mm]">
              {/* Tops Regular */}
              <div>
                <MonoLabel className="mb-[2mm] text-[#1B1B16]">
                  {lang === 'id'
                    ? 'Size Chart Atasan — Regular Fit (cm)'
                    : 'Tops Size Chart — Regular Fit (cm)'}
                </MonoLabel>
                <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white font-mono text-[7.5pt]">
                  <thead>
                    <tr className="border-b border-[#1B1B16]/15 bg-[#EFECE4] text-left text-[6.8pt] uppercase text-[#59594E]">
                      <th className="px-[2.5mm] py-[1.8mm]">Size</th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Dada' : 'Chest'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Panjang' : 'Length'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Lengan' : 'Sleeve'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Bahu' : 'Shldr'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1B1B16]/10">
                    {SIZE_CHARTS_TOPS.regular.map((row) => (
                      <tr key={row.size}>
                        <td className="px-[2.5mm] py-[1.6mm] font-semibold">{row.size}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.chest}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.length}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.sleeve}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottoms Straight */}
              <div>
                <MonoLabel className="mb-[2mm] text-[#1B1B16]">
                  {lang === 'id'
                    ? 'Size Chart Bawahan — Straight Fit (cm)'
                    : 'Bottoms Size Chart — Straight Fit (cm)'}
                </MonoLabel>
                <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white font-mono text-[7.5pt]">
                  <thead>
                    <tr className="border-b border-[#1B1B16]/15 bg-[#EFECE4] text-left text-[6.8pt] uppercase text-[#59594E]">
                      <th className="px-[2.5mm] py-[1.8mm]">Size</th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Pinggang' : 'Waist'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Panjang' : 'Length'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Paha' : 'Thigh'}
                      </th>
                      <th className="px-[2.5mm] py-[1.8mm]">
                        {lang === 'id' ? 'Bukaan' : 'Hem'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1B1B16]/10">
                    {SIZE_CHARTS_BOTTOMS.straight.map((row) => (
                      <tr key={row.size}>
                        <td className="px-[2.5mm] py-[1.6mm] font-semibold">{row.size}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.waist}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.length}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.thigh}</td>
                        <td className="px-[2.5mm] py-[1.6mm]">{row.opening}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-[2.5mm] font-mono text-[7.2pt] text-[#7C7B6E]">
              {lang === 'id'
                ? 'Toleransi ukuran ± 1–1,5 cm. Size chart custom tersedia sesuai spesifikasi merek.'
                : 'Standard manufacturing tolerance ± 1–1.5 cm. Custom brand grading available.'}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 10: ALUR PEMESANAN & KETENTUAN                                 */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="INDEX05 // ALUR PEMESANAN"
        page={10}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[3mm]">
              <div>
                <MonoLabel>
                  {lang === 'id' ? 'Standar Operasional' : 'Standard Workflow'}
                </MonoLabel>
                <h2 className="mt-[1mm] text-[21pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                  {lang === 'id' ? 'Alur Pemesanan' : 'Order Process'}
                </h2>
              </div>
              <span className="font-mono text-[7.5pt] text-[#7C7B6E]">
                07 {lang === 'id' ? 'TAHAP TERSTRUKTUR' : 'STAGES'}
              </span>
            </div>

            <div className="mt-[3mm] divide-y divide-[#1B1B16]/12 border-b border-[#1B1B16]/12">
              {ORDER_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-12 items-start gap-[3mm] py-[3.4mm]"
                >
                  <div className="col-span-1 font-mono text-[9pt] text-[#8B8A7D]">
                    {step.number}
                  </div>
                  <div className="col-span-7">
                    <div className="text-[11.5pt] font-medium tracking-[-0.015em] text-[#1B1B16]">
                      {t(step.title)}
                    </div>
                    <p className="mt-[0.8mm] text-[8.2pt] leading-[1.48] text-[#59594E]">
                      {t(step.description)}
                    </p>
                  </div>
                  <div className="col-span-4 text-right font-mono text-[7pt] uppercase tracking-[0.08em] text-[#6D6C60]">
                    <div className="text-[#9D9C8F]">{step.subtitle}</div>
                    <div className="mt-[0.5mm] text-[#1B1B16]">{t(step.deliverable)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Terms 3x2 Hairline Grid */}
          <div className="mt-[4mm]">
            <MonoLabel className="mb-[2.5mm]">
              {lang === 'id' ? 'Ketentuan Umum Produksi' : 'Production Terms'}
            </MonoLabel>
            <div className="grid grid-cols-3 gap-px border border-[#1B1B16]/15 bg-[#1B1B16]/12">
              {PRODUCTION_TERMS.map((term) => (
                <div key={term.label.id} className="bg-white p-[3.8mm]">
                  <div className="font-mono text-[6.8pt] uppercase tracking-[0.12em] text-[#8B8A7D]">
                    {t(term.label)}
                  </div>
                  <div className="mt-[1.2mm] font-serif text-[12.5pt] text-[#1B1B16]">
                    {t(term.value)}
                  </div>
                  <p className="mt-[0.8mm] text-[7.5pt] leading-snug text-[#59594E]">
                    {t(term.note)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 11: KONTAK / BACK COVER (OLED + STATIC ASCII S08 + QR)         */}
      {/* =================================================================== */}
      <Sheet tone="oled" doc={DOC_TITLE} page={11} total={TOTAL_PAGES} bleed>
        <div
          style={{ padding: '14mm 14mm 12mm' }}
          className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#000000] text-white"
        >
          {/* Vector Static ASCII S08 Weave Backdrop */}
          <StaticAsciiS08
            cols={108}
            rows={52}
            tone="oled"
            centerYRatio={0.62}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-70"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-[4mm] font-mono text-[8pt] uppercase tracking-[0.16em] text-white/60">
            <div className="flex items-center gap-[3mm]">
              <img
                src="/brand/s08-logo-light.png"
                alt="S08 Konveksi"
                loading="eager"
                decoding="sync"
                className="h-[5.5mm] w-auto"
              />
              <span className="text-white/90">S08 KONVEKSI</span>
            </div>
            <span>BANDUNG · EST. 2008</span>
          </div>

          {/* Editorial Headline */}
          <div className="relative z-10 pt-[12mm] pb-[4mm]">
            <div className="font-mono text-[8pt] uppercase tracking-[0.16em] text-white/60">
              {lang === 'id' ? 'KONSULTASI & PRODUKSI' : 'INQUIRIES & PRODUCTION'}
            </div>
            <h2
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.98), 0 1px 6px rgba(0,0,0,0.95)' }}
              className="mt-[4mm] max-w-[162mm] text-[30pt] font-light leading-[1.1] tracking-[-0.035em] text-white"
            >
              {lang === 'id' ? (
                <>
                  Produksi koleksi{' '}
                  <span className="font-serif italic text-white/95">berikutnya</span>{' '}
                  langsung bersama workshop{' '}
                  <span className="font-serif italic text-white/95">S08 Bandung.</span>
                </>
              ) : (
                <>
                  Manufacture your{' '}
                  <span className="font-serif italic text-white/95">next collection</span>{' '}
                  at our{' '}
                  <span className="font-serif italic text-white/95">Bandung workshop.</span>
                </>
              )}
            </h2>
          </div>

          {/* 3 Dark Glass Cards (Workshop, Direct Line, QR) */}
          <div className="relative z-10 space-y-[6mm]">
            <div className="grid grid-cols-3 gap-[4mm]">
              {/* Card 01: Workshop */}
              <div className="oled-liquid-glass flex flex-col justify-between rounded-[14px] p-[5mm]">
                <div className="font-mono text-[7pt] uppercase tracking-[0.14em] text-white/60">
                  01 // WORKSHOP
                </div>
                <div className="my-[4mm]">
                  <div className="text-[10.5pt] font-medium leading-snug text-white">
                    {S08_CONTACT.address}
                  </div>
                  <div className="mt-[1.5mm] font-mono text-[7.5pt] text-white/65">
                    {t(S08_CONTACT.operationalHours)}
                  </div>
                </div>
                <div className="border-t border-white/12 pt-[2.5mm] font-mono text-[7pt] text-white/50">
                  IDN · BANDUNG 40000
                </div>
              </div>

              {/* Card 02: Direct Line */}
              <div className="oled-liquid-glass flex flex-col justify-between rounded-[14px] p-[5mm]">
                <div className="font-mono text-[7pt] uppercase tracking-[0.14em] text-white/60">
                  02 // DIRECT LINE
                </div>
                <div className="my-[4mm]">
                  <div className="font-mono text-[14pt] font-medium tracking-[-0.02em] text-white">
                    {S08_CONTACT.whatsappDisplay}
                  </div>
                  <div className="mt-[1.5mm] font-mono text-[7.5pt] text-white/65">
                    {lang === 'id'
                      ? 'Konsultasi pola, kain & quotation resmi'
                      : 'Pattern, textile & quotation desk'}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/12 pt-[2.5mm] font-mono text-[7pt]">
                  <span className="text-white/65">WHATSAPP DESK</span>
                  <span className="text-[#91CFB5]">ACTIVE</span>
                </div>
              </div>

              {/* Card 03: Scan QR */}
              <div className="oled-liquid-glass flex flex-col justify-between rounded-[14px] p-[5mm]">
                <div className="font-mono text-[7pt] uppercase tracking-[0.14em] text-white/60">
                  03 // SCAN
                </div>
                <div className="my-[2mm] flex items-center gap-[3.5mm]">
                  <QrSvg text={WA_DEFAULT_URL} sizeMm={22} dark />
                  <div className="font-mono text-[7.5pt] leading-snug text-white/80">
                    {lang === 'id' ? 'Scan untuk WhatsApp' : 'Scan for WhatsApp'}
                  </div>
                </div>
                <div className="border-t border-white/12 pt-[2.5mm] font-mono text-[7pt] text-white/50">
                  MOQ 24 PCS · OEM READY
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-[3.5mm] font-mono text-[7.5pt] uppercase tracking-[0.14em] text-white/45">
              <span>© 2008 – 2026 S08 KONVEKSI · OEM PRIVATE LABEL BANDUNG</span>
              <span>11 / 11</span>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
};
