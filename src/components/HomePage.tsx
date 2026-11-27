import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PageRoute, ProductCategoryId, S08_CONTACT } from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onNavigateCategory: (category: ProductCategoryId) => void;
}

const ScrollDarkenWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.26em] text-[#11110E]">
      {word}
    </motion.span>
  );
};

const KINETIC_LETTERS: {
  char: string;
  tag: { id: string; en: string };
  note: { id: string; en: string };
  target: PageRoute;
}[] = [
  { char: 'S', tag: { id: 'Sampel Fisik', en: 'Prototyping' }, note: { id: 'Opsi sampel sebelum produksi massal.', en: 'Pre-production sample available.' }, target: 'cara-order' },
  { char: '0', tag: { id: 'Est. 2008', en: 'Est. 2008' }, note: { id: 'Beroperasi di Bandung sejak 2008.', en: 'Operating in Bandung since 2008.' }, target: 'home' },
  { char: '8', tag: { id: 'Multi-Kategori', en: 'Multi-Line' }, note: { id: 'Jaket, celana bahan, sweatpants, knitwear.', en: 'Outerwear, trousers, sweatpants, knitwear.' }, target: 'produk' },
  { char: ' ', tag: { id: 'Bandung', en: 'Bandung' }, note: { id: 'Jl. Segar Dalam D 16, Bandung.', en: 'Jl. Segar Dalam D 16, Bandung.' }, target: 'cara-order' },
  { char: 'K', tag: { id: 'Kain & Material', en: 'Textiles' }, note: { id: 'Kanvas, semi-wool, fleece 330 gsm, drill.', en: 'Canvas, semi-wool, 330 gsm fleece, drill.' }, target: 'bahan' },
  { char: 'O', tag: { id: 'Outerwear', en: 'Outerwear' }, note: { id: 'Work jacket, varsity, coach, bomber, denim.', en: 'Work jacket, varsity, coach, bomber, denim.' }, target: 'produk' },
  { char: 'N', tag: { id: 'Distribusi', en: 'Dispatch' }, note: { id: 'Pengambilan workshop & kargo nasional.', en: 'Workshop pickup & nationwide cargo.' }, target: 'cara-order' },
  { char: 'V', tag: { id: 'Variasi Cutting', en: 'Silhouettes' }, note: { id: 'Regular, oversized, boxy, baggy, custom.', en: 'Regular, oversized, boxy, baggy, custom.' }, target: 'cutting-size' },
  { char: 'E', tag: { id: 'Private Label', en: 'Private Label' }, note: { id: 'Woven label, care label, hangtag, kemasan.', en: 'Woven label, care tag, hangtag, packing.' }, target: 'bahan' },
  { char: 'K', tag: { id: 'Quality Control', en: 'Quality Control' }, note: { id: 'Pemeriksaan ukuran dan benang per potong.', en: 'Piece-by-piece inspection before packing.' }, target: 'cara-order' },
  { char: 'S', tag: { id: 'Bawahan', en: 'Bottoms' }, note: { id: 'Spesialisasi celana bahan & sweatpants.', en: 'Tailored trousers & heavyweight sweatpants.' }, target: 'produk' },
  { char: 'I', tag: { id: 'Order Studio', en: 'Order Studio' }, note: { id: 'Pilih produk, bahan, warna, dan ukuran langsung.', en: 'Configure garment, fabric, color, and sizes directly.' }, target: 'order' },
];

const SHOWCASE_LINES: {
  id: string;
  code: string;
  category: ProductCategoryId;
  title: { id: string; en: string };
  meta: { id: string; en: string };
  garmentImg: string;
  backdropImg: string;
  backdropTint: string;
}[] = [
  {
    id: 'showcase-outer',
    code: '01',
    category: 'outerwear',
    title: { id: 'Outerwear & Jaket', en: 'Outerwear & Jackets' },
    meta: { id: 'Work Jacket · Varsity · Coach · Denim', en: 'Work Jacket · Varsity · Coach · Denim' },
    garmentImg: '/images/cat-outerwear.jpg',
    backdropImg: '/images/hero-workshop.jpg',
    backdropTint: 'from-[#181713]/75 to-[#181713]/55',
  },
  {
    id: 'showcase-bottoms',
    code: '02',
    category: 'bottoms',
    title: { id: 'Celana Bahan & Sweatpants', en: 'Tailored Bottoms & Sweatpants' },
    meta: { id: 'Semi-Wool · Twill · Fleece 330 gsm', en: 'Semi-Wool · Twill · 330 gsm Fleece' },
    garmentImg: '/images/cat-bottoms.jpg',
    backdropImg: '/images/workshop-cutting-qc.jpg',
    backdropTint: 'from-[#1E211E]/72 to-[#1E211E]/52',
  },
  {
    id: 'showcase-knit',
    code: '03',
    category: 'knitwear',
    title: { id: 'Hoodie & Knitwear', en: 'Heavyweight Knitwear' },
    meta: { id: 'Hoodie · Crewneck · Boxy Heavy Tee', en: 'Hoodie · Crewneck · Boxy Heavy Tee' },
    garmentImg: '/images/cat-knitwear.jpg',
    backdropImg: '/images/simeon-mono-craft.jpg',
    backdropTint: 'from-[#141412]/78 to-[#141412]/58',
  },
  {
    id: 'showcase-work',
    code: '04',
    category: 'workwear',
    title: { id: 'Workshirt & Seragam', en: 'Workwear & Uniforms' },
    meta: { id: 'Nagata Drill · Oxford · Bordir Komputer', en: 'Nagata Drill · Oxford · Embroidery' },
    garmentImg: '/images/cat-workshirt.jpg',
    backdropImg: '/images/hero-workshop.jpg',
    backdropTint: 'from-[#182026]/75 to-[#182026]/55',
  },
  {
    id: 'showcase-oem',
    code: '05',
    category: 'custom',
    title: { id: 'Private Label & OEM', en: 'Private Label & OEM' },
    meta: { id: 'Pola Custom · Woven Label · Hangtag', en: 'Custom Block · Woven Label · Hangtag' },
    garmentImg: '/images/cat-custom-oem.jpg',
    backdropImg: '/images/workshop-cutting-qc.jpg',
    backdropTint: 'from-[#181816]/76 to-[#181816]/58',
  },
];

const DIRECTORY_INDEX: {
  code: string;
  page: PageRoute;
  title: { id: string; en: string };
  sub: { id: string; en: string };
  preview: string;
}[] = [
  {
    code: 'Index01',
    page: 'produk',
    title: { id: 'Katalog Produk', en: 'Product Catalog' },
    sub: { id: '14 Artikel · 5 Lini', en: '14 Styles · 5 Categories' },
    preview: '/images/cat-outerwear.jpg',
  },
  {
    code: 'Index02',
    page: 'bahan',
    title: { id: 'Bahan & Finishing', en: 'Fabrics & Finishing' },
    sub: { id: 'Zoom Tekstur · Pilihan Warna', en: '4x Textile Loupe · Dye Swatches' },
    preview: '/images/workshop-cutting-qc.jpg',
  },
  {
    code: 'Index03',
    page: 'cutting-size',
    title: { id: 'Cutting & Size Chart', en: 'Cutting & Size Chart' },
    sub: { id: 'Pola Atasan · Bawahan · S–XXL', en: 'Silhouettes · S–XXL Reference' },
    preview: '/images/cat-bottoms.jpg',
  },
  {
    code: 'Index04',
    page: 'cara-order',
    title: { id: 'Alur Pemesanan', en: 'Order Process & FAQ' },
    sub: { id: '7 Tahap · Workshop Bandung', en: '7 Stages · Bandung Workshop' },
    preview: '/images/simeon-mono-craft.jpg',
  },
  {
    code: 'Index05',
    page: 'order',
    title: { id: 'Order Produksi', en: 'Order Studio' },
    sub: { id: 'Pilih Produk · Bahan · Ukuran S–XXL', en: 'Visual Configurator · S–XXL Breakdown' },
    preview: '/images/cat-custom-oem.jpg',
  },
];

const FILMSTRIP_IMAGES = [
  { src: '/images/hero-workshop.jpg', alt: 'Bandung Workshop' },
  { src: '/images/cat-outerwear.jpg', alt: 'Work Jacket' },
  { src: '/images/simeon-mono-craft.jpg', alt: 'Precision Sewing' },
  { src: '/images/cat-bottoms.jpg', alt: 'Tailored Bottoms' },
  { src: '/images/workshop-cutting-qc.jpg', alt: 'Pattern Desk' },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onNavigateCategory,
}) => {
  const { lang, setLang, t } = useLang();

  // Act 1: Full-bleed Hero parallax + subtle 3D calling card tilt
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroProgress, [0, 1], ['0%', '14%']);
  const heroImgScale = useTransform(heroProgress, [0, 1], [1.03, 1.12]);
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });

  // Act 2A: Scroll-linked word-by-word darkening manifesto
  const manifestoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 0.85', 'end 0.36'],
  });

  // Act 2B: Scroll-reactive + hover-reactive Kern Society kinetic S08 KONVEKSI + scroll-scrubbed ticker
  const kineticBandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: kineticScroll } = useScroll({
    target: kineticBandRef,
    offset: ['start 0.95', 'end 0.08'],
  });
  const tickerScrollX = useTransform(kineticScroll, [0, 1], ['0%', '-18%']);

  const scrollNormRef = useRef<number>(0.12);
  const hoverNormRef = useRef<number>(0.12);
  const [pointerNorm, setPointerNorm] = useState<number>(0.12);
  const [scrollEnergy, setScrollEnergy] = useState<number>(0);
  const [isHoveringKinetic, setIsHoveringKinetic] = useState(false);
  const [pressedIdx, setPressedIdx] = useState<number>(0);

  // Act 3: Ayush Sticky Index Rail active item
  const [activeShowcaseId, setActiveShowcaseId] = useState<string>(SHOWCASE_LINES[0].id);

  // Act 4: Stolaze live-dimming directory index
  const [hoveredDirIdx, setHoveredDirIdx] = useState<number | null>(null);

  // Directly map scroll progress to needle sweep & kinetic letter swell (Kern Society scroll reaction!)
  useMotionValueEvent(kineticScroll, 'change', (latest) => {
    const prev = scrollNormRef.current;
    const clamped = Math.max(0.02, Math.min(0.98, latest));
    scrollNormRef.current = clamped;
    const velocity = Math.min(1, Math.abs(clamped - prev) * 28);
    setScrollEnergy(velocity);

    // Sync active letter readout while scrolling when not hovering
    if (!isHoveringKinetic) {
      const idx = Math.min(
        KINETIC_LETTERS.length - 1,
        Math.max(0, Math.round(clamped * (KINETIC_LETTERS.length - 1)))
      );
      if (KINETIC_LETTERS[idx].char !== ' ') {
        setPressedIdx(idx);
      }
    }
  });

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const desired = isHoveringKinetic ? hoverNormRef.current : scrollNormRef.current;
      setPointerNorm((prev) => prev + (desired - prev) * 0.16);
      setScrollEnergy((prev) => (prev > 0.005 ? prev * 0.9 : 0));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isHoveringKinetic]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.48;
      let closestId = SHOWCASE_LINES[0].id;
      let closestDist = Number.POSITIVE_INFINITY;
      for (const line of SHOWCASE_LINES) {
        const el = document.getElementById(line.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - mid);
        if (dist < closestDist) {
          closestDist = dist;
          closestId = line.id;
        }
      }
      setActiveShowcaseId(closestId);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ rx: -ny * 6, ry: nx * 8 });
  };

  const handleKineticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    hoverNormRef.current = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const activeLetter = KINETIC_LETTERS[pressedIdx] ?? KINETIC_LETTERS[0];
  const cmReading = Math.round(pointerNorm * 100);

  const manifestoLine1 = (
    lang === 'id'
      ? 'Produksi pakaian untuk merek, ritel, dan instansi.'
      : 'Apparel manufacturing for labels, retail, and institutions.'
  ).split(' ');
  const manifestoLine2 = (
    lang === 'id'
      ? 'Berbasis di Bandung — beroperasi sejak 2008.'
      : 'Based in Bandung — operating since 2008.'
  ).split(' ');
  const totalManifestoWords = manifestoLine1.length + manifestoLine2.length;

  return (
    <div className="bg-[#F7F5F0] text-[#1B1B16]">
      {/* ===================================================================== */}
      {/* ACT 1: FULL 100VH CINEMA HERO — NO TOP NAVBAR UNTIL PAST HERO         */}
      {/* ===================================================================== */}
      <section
        id="home-hero"
        ref={heroRef}
        style={{ minHeight: '100vh', height: '100vh' }}
        className="relative flex flex-col justify-between overflow-hidden bg-[#14120F] text-white"
      >
        {/* Full-bleed atmospheric Bandung workshop photograph — richly toned so EVERY transparent cutout letter glows cleanly! */}
        <motion.div
          style={{ y: heroImgY, scale: heroImgScale }}
          className="pointer-events-none absolute inset-0"
        >
          <img
            src="/images/hero-workshop.jpg"
            alt="Workshop S08 Konveksi Bandung"
            style={{ objectPosition: '50% 68%' }}
            className="h-full w-full object-cover brightness-[0.66] contrast-[1.15] sepia-[0.16]"
          />
          {/* Rich warm editorial wash ensures no blown-out white window washes out cutout letters */}
          <div
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(44, 32, 20, 0.32) 0%, rgba(18, 15, 11, 0.62) 100%)',
            }}
            className="absolute inset-0"
          />
          <div
            style={{
              background:
                'linear-gradient(to top, rgba(14, 12, 10, 0.88) 0%, rgba(14, 12, 10, 0.45) 34%, transparent 62%)',
            }}
            className="absolute inset-0"
          />
        </motion.div>

        {/* Quiet Edge-Pinned Hero Micro Header (NO navbar box — pure cinema) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 pt-7 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/75 md:px-10">
          <span>Bandung, Indonesia · Est. 2008</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="text-white/80 transition-colors hover:text-white cursor-pointer"
            >
              <span className={lang === 'id' ? 'text-white font-semibold' : 'text-white/45'}>ID</span>
              <span className="mx-1 text-white/35">/</span>
              <span className={lang === 'en' ? 'text-white font-semibold' : 'text-white/45'}>EN</span>
            </button>
          </div>
        </div>

        {/* CENTERPIECE: TRUE TRANSPARENT CUTOUT CALLING CARD (SVG MASK KNOCKOUT — EXACT AYUSH HALDER EFFECT!) */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleCardMove}
            onMouseLeave={() => setCardTilt({ rx: 0, ry: 0 })}
            style={{
              transform: `perspective(1100px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="w-full max-w-[540px] drop-shadow-[0_34px_65px_rgba(0,0,0,0.52)]"
          >
            {/* Pure SVG <mask> punches TRUE ALPHA=0 transparent letters & square right through the white card! */}
            <svg
              viewBox="0 0 540 315"
              className="block h-auto w-full select-none"
              role="img"
              aria-label="S08 Konveksi — Manufaktur Pakaian & Private Label OEM Bandung"
            >
              <defs>
                <mask id="s08-calling-card-mask">
                  {/* Solid white = opaque white card */}
                  <rect width="540" height="315" rx="3" fill="white" />

                  {/* Pure black = 100% transparent stencil cutout letting the live workshop photo shine right through! */}
                  <text
                    x="32"
                    y="62"
                    fill="black"
                    fontFamily="Newsreader, Georgia, serif"
                    fontStyle="italic"
                    fontSize="31"
                  >
                    {lang === 'id' ? 'Konveksi' : 'We are a'}
                  </text>

                  {/* Left big cutout column */}
                  <text
                    x="32"
                    y="112"
                    fill="black"
                    fontFamily="Geist, sans-serif"
                    fontWeight="600"
                    fontSize="38"
                    letterSpacing="-1.4"
                  >
                    {lang === 'id' ? 'Manufaktur' : 'Garment'}
                  </text>
                  <text
                    x="32"
                    y="153"
                    fill="black"
                    fontFamily="Geist, sans-serif"
                    fontWeight="600"
                    fontSize="38"
                    letterSpacing="-1.4"
                  >
                    {lang === 'id' ? 'Pakaian' : 'Atelier'}
                  </text>

                  {/* Diagonal slash cutout */}
                  <line
                    x1="274"
                    y1="82"
                    x2="253"
                    y2="160"
                    stroke="black"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />

                  {/* Right big cutout column */}
                  <text
                    x="296"
                    y="112"
                    fill="black"
                    fontFamily="Geist, sans-serif"
                    fontWeight="600"
                    fontSize="38"
                    letterSpacing="-1.4"
                  >
                    {lang === 'id' ? 'Private' : 'Private'}
                  </text>
                  <text
                    x="296"
                    y="153"
                    fill="black"
                    fontFamily="Geist, sans-serif"
                    fontWeight="600"
                    fontSize="38"
                    letterSpacing="-1.4"
                  >
                    {lang === 'id' ? 'Label OEM' : 'Label OEM'}
                  </text>

                  {/* Ayush signature transparent bottom-left square window */}
                  <rect x="32" y="256" width="26" height="26" rx="1.5" fill="black" />

                  {/* Bottom-right transparent brand lockup (matching Ayush Halder corner lockup) */}
                  <text
                    x="508"
                    y="258"
                    textAnchor="end"
                    fill="black"
                    fontFamily="Geist, sans-serif"
                    fontWeight="600"
                    fontSize="24"
                    letterSpacing="-0.7"
                  >
                    S08 Konveksi
                  </text>
                  <text
                    x="508"
                    y="281"
                    textAnchor="end"
                    fill="black"
                    fontFamily="Geist Mono, monospace"
                    fontWeight="500"
                    fontSize="13.5"
                    letterSpacing="0.8"
                  >
                    BANDUNG · EST. 2008
                  </text>
                </mask>
              </defs>

              {/* Opaque off-white card surface masked with transparent typography cutouts */}
              <rect
                width="540"
                height="315"
                rx="3"
                fill="#FFFFFF"
                mask="url(#s08-calling-card-mask)"
              />
            </svg>
          </motion.div>

          {/* Editorial Italic-Accented Statement Beneath Card */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-2xl text-[22px] font-normal leading-[1.3] tracking-[-0.02em] text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-[29px]"
          >
            {lang === 'id' ? (
              <>
                Konveksi Bandung <span className="font-serif italic text-white">sejak 2008</span>{' '}
                untuk <span className="font-serif italic text-white">merek pakaian</span>, ritel,
                dan instansi.
              </>
            ) : (
              <>
                A Bandung garment studio <span className="font-serif italic text-white">since 2008</span>{' '}
                built for <span className="font-serif italic text-white">clothing labels</span>,
                retail, and institutions.
              </>
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => onNavigate('produk')}
              className="rounded-full bg-[#FCFCFA] px-5 py-2.5 text-[13px] font-medium text-[#1B1B16] transition-transform hover:scale-[1.02] cursor-pointer"
            >
              {lang === 'id' ? 'Lihat Katalog' : 'Explore Catalog'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('bahan')}
              className="soma-glass-dark rounded-full px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/15 cursor-pointer"
            >
              {lang === 'id' ? 'Eksplorasi Bahan' : 'Inspect Fabrics'}
            </button>
          </motion.div>
        </div>

        {/* Bottom Tailor's Ruler Edge */}
        <div className="relative z-10 w-full border-t border-white/15 bg-[#0E0E0C]/35 px-4 py-2.5 backdrop-blur-xs">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between font-mono text-[10px] text-white/65">
            {['10 cm', '20 cm', '30 cm', '40 cm', '50 cm', '60 cm', '70 cm', '80 cm', '90 cm', '100 cm'].map(
              (mark, i) => (
                <div
                  key={mark}
                  className={`flex flex-col items-center gap-1 ${
                    i % 2 === 1 ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <span className="h-2 w-px bg-white/45" />
                  <span>{mark}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ACT 2: SCROLL-DARKENING MANIFESTO + SCROLL-REACTIVE S08 KONVEKSI      */}
      {/* ===================================================================== */}
      <section className="relative bg-[#F2EFE9] pt-28 pb-0 md:pt-40">
        {/* Scroll-linked word-by-word darkening reveal ("pas di scroll menghitam") */}
        <div ref={manifestoRef} className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 md:py-14">
          <div className="max-w-5xl">
            <h1 className="text-[clamp(34px,5.3vw,76px)] font-light leading-[1.06] tracking-[-0.04em]">
              {manifestoLine1.map((word, idx) => {
                const start = idx / totalManifestoWords;
                const end = Math.min(1, (idx + 1.4) / totalManifestoWords);
                return (
                  <ScrollDarkenWord
                    key={`l1-${idx}-${lang}`}
                    word={word}
                    progress={manifestoProgress}
                    range={[start, end]}
                  />
                );
              })}
            </h1>
            <p className="mt-3 text-[clamp(34px,5.3vw,76px)] font-light leading-[1.06] tracking-[-0.04em]">
              {manifestoLine2.map((word, idx) => {
                const globalIdx = manifestoLine1.length + idx;
                const start = globalIdx / totalManifestoWords;
                const end = Math.min(1, (globalIdx + 1.4) / totalManifestoWords);
                return (
                  <ScrollDarkenWord
                    key={`l2-${idx}-${lang}`}
                    word={word}
                    progress={manifestoProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
          </div>
        </div>

        {/* FULL-BLEED SCROLL-REACTIVE + HOVER-REACTIVE GIANT S08 KONVEKSI (KERN SOCIETY) */}
        <div ref={kineticBandRef} className="mt-20 w-full px-3 md:mt-28 md:px-6">
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6D6C60]">
            <span>
              {lang === 'id'
                ? 'Precision Index · Scroll, Geser, atau Tekan Huruf'
                : 'Precision Index · Scroll, Hover, or Press Letters'}
            </span>
            <span className="font-medium text-[#111111]">
              [{activeLetter.char}] {t(activeLetter.tag)} · {cmReading} CM
            </span>
          </div>

          {/* Crisp Black Ruler + Scroll/Cursor Driven Vermilion Needle */}
          <div className="relative mt-2.5 h-5 w-full border-b border-[#111111]">
            <div className="flex h-full w-full items-end justify-between">
              {Array.from({ length: 49 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-px bg-[#111111]/35 ${
                    idx % 12 === 0 ? 'h-4 bg-[#111111]' : idx % 6 === 0 ? 'h-2.5 bg-[#111111]/60' : 'h-1.5'
                  }`}
                />
              ))}
            </div>
            <div
              style={{ left: `${pointerNorm * 100}%`, backgroundColor: '#FF2E00' }}
              className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2"
            />
          </div>

          {/* MASSIVE FULL-WIDTH HEAVY MONUMENTAL KINETIC LETTERS REACTING DIRECTLY TO SCROLL & CURSOR */}
          <div
            onMouseEnter={() => setIsHoveringKinetic(true)}
            onMouseLeave={() => setIsHoveringKinetic(false)}
            onMouseMove={handleKineticMove}
            className="w-full select-none overflow-hidden py-4 md:py-6"
          >
            <div className="font-kinetic flex w-full items-baseline justify-between text-[#0B0B0B]">
              {KINETIC_LETTERS.map((item, idx) => {
                if (item.char === ' ') {
                  return <span key={idx} style={{ width: '2.4vw' }} className="shrink-0" />;
                }
                const pos = idx / (KINETIC_LETTERS.length - 1);
                const dist = Math.abs(pointerNorm - pos);
                const influence = Math.max(0, 1 - dist * 4.0);
                const eased = influence * influence * (3 - 2 * influence);
                const factor = Math.min(1, eased + scrollEnergy * 0.22);

                const wght = Math.round(780 + factor * 220);
                const wdth = Math.round(25 + factor * 96);
                const slnt = Math.round(-factor * 8);

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPressedIdx(idx);
                      hoverNormRef.current = pos;
                      scrollNormRef.current = pos;
                    }}
                    whileTap={{ scale: 0.94, y: 4 }}
                    style={{
                      fontSize: 'clamp(64px, 17.2vw, 285px)',
                      lineHeight: 0.84,
                      letterSpacing: '-0.025em',
                      fontWeight: wght,
                      fontVariationSettings: `"wght" ${wght}, "wdth" ${wdth}, "opsz" 144, "slnt" ${slnt}`,
                    }}
                    className="inline-block shrink-0 cursor-pointer will-change-[font-variation-settings]"
                  >
                    {item.char}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Interactive 1-Line Readout Above Vermilion Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/15 py-3 font-mono text-[11px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={pressedIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 text-[#4E4E45]"
              >
                <span className="font-semibold uppercase text-[#0B0B0B]">
                  [{activeLetter.char}] {t(activeLetter.tag)}
                </span>
                <span>— {t(activeLetter.note)}</span>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => onNavigate(activeLetter.target)}
              className="font-medium text-[#0B0B0B] underline decoration-[#0B0B0B]/35 underline-offset-4 hover:decoration-[#0B0B0B] cursor-pointer"
            >
              {lang === 'id' ? 'Buka Halaman ↗' : 'Open Section ↗'}
            </button>
          </div>
        </div>

        {/* KERN SOCIETY SIGNATURE FULL-BLEED SCROLL-SCRUBBED VERMILION MARQUEE TICKER */}
        <div
          style={{ backgroundColor: '#FF2E00', color: '#0B0B0B' }}
          className="marquee-track mt-2 w-full overflow-hidden py-3.5"
        >
          <motion.div style={{ x: tickerScrollX }} className="w-max">
            <div className="flex w-max items-center gap-8 animate-marquee-slow">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 'clamp(22px, 3vw, 42px)',
                    lineHeight: 1.05,
                    fontWeight: 850,
                    fontVariationSettings: '"wght" 850, "wdth" 88, "opsz" 144',
                  }}
                  className="font-kinetic whitespace-nowrap uppercase tracking-[0.02em]"
                >
                  S08 KONVEKSI &nbsp;•&nbsp; BANDUNG GARMENT HOUSE &nbsp;•&nbsp; EST. 2008 &nbsp;•&nbsp; OUTERWEAR · BOTTOMS · KNITWEAR · OEM &nbsp;•&nbsp;
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ACT 3: AYUSH STICKY INDEX RAIL + PICTURE-IN-PICTURE EDITORIAL GALLERY */}
      {/* ===================================================================== */}
      <section className="relative bg-[#F5F3EF] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-[28px] font-medium tracking-[-0.035em] text-[#1B1B16] sm:text-[36px]">
              {lang === 'id' ? 'Lini Produksi Pilihan' : 'Selected Production'}
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('produk')}
              className="font-mono text-[11.5px] text-[#59594E] hover:text-[#1B1B16] cursor-pointer"
            >
              {lang === 'id' ? 'Semua Katalog ↗' : 'Full Catalog ↗'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Sticky Left Index Rail */}
            <div className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 flex flex-col gap-3">
                {SHOWCASE_LINES.map((line, i) => {
                  const active = activeShowcaseId === line.id;
                  return (
                    <React.Fragment key={line.id}>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(line.id);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={`text-left text-[15px] tracking-[-0.015em] transition-colors cursor-pointer ${
                          active
                            ? 'font-medium text-[#1B1B16]'
                            : 'text-[#A2A198] hover:text-[#1B1B16]'
                        }`}
                      >
                        {t(line.title)}
                      </button>
                      {i < SHOWCASE_LINES.length - 1 && (
                        <span className="font-mono text-[11px] text-[#C8C6BC]">—</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Picture-in-Picture Editorial Plates */}
            <div className="space-y-10 lg:col-span-9 md:space-y-14">
              {SHOWCASE_LINES.map((line) => (
                <motion.article
                  key={line.id}
                  id={line.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onNavigateCategory(line.category)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-none bg-[#1A1A17] p-6 sm:p-10 md:p-14">
                    <img
                      src={line.backdropImg}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${line.backdropTint}`}
                    />

                    <div className="relative z-10 mx-auto max-w-[540px] overflow-hidden rounded-none bg-[#EAE7DF] shadow-[0_32px_70px_-20px_rgba(0,0,0,0.62)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                      <img
                        src={line.garmentImg}
                        alt={t(line.title)}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 px-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-[#9A998E]">{line.code}</span>
                      <h3 className="text-[17px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                        {t(line.title)}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#7C7B6E]">
                      <span>{t(line.meta)}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#1B1B16] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ACT 4: STOLAZE MONUMENTAL LIVE-DIMMING DIRECTORY INDEX                */}
      {/* ===================================================================== */}
      <section className="relative border-t border-[#1B1B16]/10 bg-[#FFFFFF] py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-[#8E8D84]">
            <span>{lang === 'id' ? 'Indeks Halaman // S08' : 'Directory // S08'}</span>
            <span>{lang === 'id' ? 'Pilih Halaman' : 'Select Section'}</span>
          </div>

          <div
            onMouseLeave={() => setHoveredDirIdx(null)}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
          >
            <div className="divide-y divide-[#1B1B16]/10 lg:col-span-8">
              {DIRECTORY_INDEX.map((row, idx) => {
                const isDimmed = hoveredDirIdx !== null && hoveredDirIdx !== idx;
                return (
                  <button
                    key={row.code}
                    type="button"
                    onMouseEnter={() => setHoveredDirIdx(idx)}
                    onClick={() => onNavigate(row.page)}
                    className={`group flex w-full flex-col justify-between gap-1 py-6 text-left transition-opacity duration-300 sm:flex-row sm:items-baseline cursor-pointer ${
                      isDimmed ? 'opacity-20' : 'opacity-100'
                    }`}
                  >
                    <span className="text-[clamp(26px,4.2vw,58px)] font-light leading-[1.06] tracking-[-0.035em] text-[#1B1B16]">
                      <span className="text-[#9E9D94]">{row.code}—</span>
                      {t(row.title)}
                    </span>
                    <span className="font-mono text-[11.5px] text-[#7C7B6E] group-hover:text-[#1B1B16]">
                      {t(row.sub)} ↗
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-[#EAE7DF]">
                {DIRECTORY_INDEX.map((row, idx) => {
                  const isVisible = (hoveredDirIdx ?? 0) === idx;
                  return (
                    <img
                      key={row.code}
                      src={row.preview}
                      alt={t(row.title)}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                    />
                  );
                })}
                <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-full bg-white/90 px-3.5 py-2 font-mono text-[10.5px] text-[#1B1B16] backdrop-blur-md">
                  <span>{DIRECTORY_INDEX[hoveredDirIdx ?? 0].code}</span>
                  <span>{t(DIRECTORY_INDEX[hoveredDirIdx ?? 0].title)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* ACT 5: AYUSH 5-PHOTO FILMSTRIP + QUIET TWO-TONE STUDIO BIO            */}
      {/* ===================================================================== */}
      <section className="relative border-t border-[#1B1B16]/10 bg-[#F5F3EF] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {FILMSTRIP_IMAGES.map((img, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden rounded-none bg-[#EAE7DF]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <p className="text-[22px] font-normal leading-[1.42] tracking-[-0.02em] text-[#8E8D84] sm:text-[28px]">
              {lang === 'id' ? (
                <>
                  <span className="text-[#1B1B16]">S08 Konveksi</span> adalah rumah produksi
                  pakaian di Bandung sejak 2008 yang menangani pengembangan pola, sampel,
                  hingga produksi massal untuk merek pakaian, ritel, komunitas, dan instansi.
                </>
              ) : (
                <>
                  <span className="text-[#1B1B16]">S08 Konveksi</span> is a Bandung garment
                  manufacturer operating since 2008, supporting clothing labels, retailers,
                  and institutions from pattern development through bulk production.
                </>
              )}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1B1B16]/12 pt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#7C7B6E]">
              <div className="flex flex-wrap items-center gap-6">
                <span>{lang === 'id' ? 'Klien:' : 'Selected Clients:'}</span>
                <span className="font-medium text-[#1B1B16]">Kapuyuwak</span>
                <span className="font-medium text-[#1B1B16]">Redwear</span>
                <span>OEM Private Label</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[#1B1B16]">
                <ArrowDown className="h-3.5 w-3.5" />
                {S08_CONTACT.shortAddress}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
