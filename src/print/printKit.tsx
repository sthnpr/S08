import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { buildWhatsAppUrl, S08_CONTACT } from '../data/s08Data';
import { Lang } from '../i18n/LanguageContext';

export const WA_DEFAULT_URL = buildWhatsAppUrl(
  'Halo S08 Konveksi Bandung, saya ingin berkonsultasi mengenai produksi.'
);

interface SheetProps {
  tone?: 'paper' | 'stone' | 'oled';
  doc: string;
  section?: string;
  page: number;
  total: number;
  bleed?: boolean;
  children: React.ReactNode;
}

const SHEET_BG: Record<NonNullable<SheetProps['tone']>, string> = {
  paper: 'bg-[#F7F5F0] text-[#1B1B16]',
  stone: 'bg-[#EAE7DF] text-[#1B1B16]',
  oled: 'bg-[#000000] text-[#FFFFFF]',
};

export const Sheet: React.FC<SheetProps> = ({
  tone = 'paper',
  doc,
  section,
  page,
  total,
  bleed = false,
  children,
}) => {
  const isOled = tone === 'oled';
  const railBorder = isOled ? 'border-white/15' : 'border-[#1B1B16]/12';
  const railText = isOled ? 'text-white/55' : 'text-[#7C7B6E]';
  const plusText = isOled ? 'text-white/30' : 'text-[#9D9C8F]';

  if (bleed) {
    return (
      <section className={`print-sheet ${SHEET_BG[tone]}`}>{children}</section>
    );
  }

  return (
    <section className={`print-sheet flex flex-col ${SHEET_BG[tone]}`}>
      <div
        className="flex h-full w-full flex-col"
        style={{ padding: '14mm 14mm 12mm' }}
      >
        {/* Top Metadata Rail */}
        <header
          className={`flex shrink-0 items-center justify-between border-b pb-[3mm] font-mono text-[7.5pt] uppercase tracking-[0.14em] ${railBorder} ${railText}`}
        >
          <div className="flex items-center gap-[3mm]">
            <span className={plusText}>+</span>
            <span>S08 KONVEKSI — {doc}</span>
          </div>
          <div className="flex items-center gap-[3mm]">
            {section && <span>{section}</span>}
            <span className={plusText}>+</span>
          </div>
        </header>

        {/* Body Content */}
        <div className="flex min-h-0 flex-1 flex-col py-[4.5mm]">{children}</div>

        {/* Bottom Footer Rail */}
        <footer
          className={`flex shrink-0 items-center justify-between border-t pt-[3mm] font-mono text-[7.5pt] uppercase tracking-[0.12em] ${railBorder} ${railText}`}
        >
          <span>
            {S08_CONTACT.shortAddress} · WA {S08_CONTACT.whatsappDisplay}
          </span>
          <span className={isOled ? 'text-white/80' : 'text-[#1B1B16]'}>
            {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </footer>
      </div>
    </section>
  );
};

export const MonoLabel: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`font-mono text-[7.5pt] uppercase tracking-[0.14em] text-[#7C7B6E] ${className}`}
  >
    {children}
  </div>
);

export const Hairline: React.FC<{ dark?: boolean; className?: string }> = ({
  dark = false,
  className = '',
}) => (
  <div
    className={`w-full border-t ${
      dark ? 'border-white/15' : 'border-[#1B1B16]/12'
    } ${className}`}
  />
);

export const FieldLine: React.FC<{
  label: string;
  width?: string;
  lines?: number;
  dark?: boolean;
}> = ({ label, width = 'w-full', lines = 1, dark = false }) => (
  <div className={width}>
    <div
      className={`font-mono text-[7pt] uppercase tracking-[0.12em] ${
        dark ? 'text-white/55' : 'text-[#7C7B6E]'
      }`}
    >
      {label}
    </div>
    {Array.from({ length: lines }).map((_, idx) => (
      <div
        key={idx}
        style={{ height: '7.5mm' }}
        className={`w-full border-b ${
          dark ? 'border-white/35' : 'border-[#1B1B16]/35'
        }`}
      />
    ))}
  </div>
);

export const CheckBox: React.FC<{
  label: string;
  dark?: boolean;
  sub?: string;
}> = ({ label, dark = false, sub }) => (
  <div className="inline-flex items-start gap-[2mm]">
    <span
      style={{ width: '3.4mm', height: '3.4mm', marginTop: '0.5mm' }}
      className={`inline-block shrink-0 border ${
        dark ? 'border-white/60' : 'border-[#1B1B16]/55'
      }`}
    />
    <span className="leading-tight">
      <span
        className={`block text-[8.5pt] ${
          dark ? 'text-white/90' : 'text-[#1B1B16]'
        }`}
      >
        {label}
      </span>
      {sub && (
        <span
          className={`block font-mono text-[6.5pt] ${
            dark ? 'text-white/45' : 'text-[#7C7B6E]'
          }`}
        >
          {sub}
        </span>
      )}
    </span>
  </div>
);

export const WriteBox: React.FC<{
  label?: string;
  heightMm: number;
  hint?: string;
  className?: string;
}> = ({ label, heightMm, hint, className = '' }) => (
  <div className={className}>
    {label && (
      <div className="mb-[1.2mm] font-mono text-[7pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
        {label}
      </div>
    )}
    <div
      style={{ height: `${heightMm}mm` }}
      className="relative flex w-full items-center justify-center border border-[#1B1B16]/25 bg-white/45"
    >
      {hint && (
        <span className="px-3 text-center font-mono text-[7pt] uppercase tracking-[0.1em] text-[#8B8A7D]">
          {hint}
        </span>
      )}
    </div>
  </div>
);

export const QrSvg: React.FC<{
  text?: string;
  sizeMm?: number;
  dark?: boolean;
}> = ({ text = WA_DEFAULT_URL, sizeMm = 24, dark = false }) => {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toString(text, {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: {
        dark: dark ? '#FFFFFF' : '#1B1B16',
        light: '#00000000',
      },
    })
      .then((res) => {
        if (active) setSvg(res);
      })
      .catch(() => {
        if (active) setSvg('<svg viewBox="0 0 1 1"></svg>');
      });
    return () => {
      active = false;
    };
  }, [text, dark]);

  return (
    <div
      data-qr-ready={svg ? '1' : undefined}
      data-qr-pending={svg ? undefined : '1'}
      style={{ width: `${sizeMm}mm`, height: `${sizeMm}mm` }}
      className="shrink-0 [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

interface AsciiRun {
  tone: 0 | 1 | 2;
  text: string;
}

const ASCII_GLYPHS = ' .·:-=+*x#%@';

export const StaticAsciiS08: React.FC<{
  cols?: number;
  rows?: number;
  tone?: 'oled' | 'paper';
  className?: string;
  centerYRatio?: number;
}> = ({
  cols = 108,
  rows = 46,
  tone = 'oled',
  className = '',
  centerYRatio = 0.56,
}) => {
  const [lines, setLines] = useState<AsciiRun[][] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      try {
        await document.fonts.load('900 100px Geist');
      } catch {
        // Fallback to available sans font
      }
      if (cancelled) return;

      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = cols;
      maskCanvas.height = rows;
      const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      const maskData = new Float32Array(cols * rows);

      if (maskCtx) {
        maskCtx.clearRect(0, 0, cols, rows);
        maskCtx.fillStyle = '#FFFFFF';
        maskCtx.textAlign = 'center';
        maskCtx.textBaseline = 'middle';
        const fontSize = Math.min(rows * 0.86, cols * 0.42);
        maskCtx.font = `900 ${fontSize}px "Geist", -apple-system, sans-serif`;
        maskCtx.fillText('S08', cols * 0.5, rows * centerYRatio);
        const img = maskCtx.getImageData(0, 0, cols, rows).data;
        for (let i = 0; i < cols * rows; i++) {
          maskData[i] = img[i * 4 + 3] / 255;
        }
      }

      const t = 1.3;
      const computed: AsciiRun[][] = [];

      for (let r = 0; r < rows; r++) {
        const ny = r / rows;
        const rowRuns: AsciiRun[] = [];
        let curTone: 0 | 1 | 2 = 0;
        let curText = '';

        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const twillA = Math.sin(c * 0.22 + r * 0.34 - t * 1.15);
          const twillB = Math.cos(c * 0.13 - r * 0.26 + t * 0.72);
          const warp =
            Math.sin((nx * 5.0 + ny * 2.2) * Math.PI + t * 0.55) * 0.5 + 0.5;
          let energy =
            0.16 +
            ((twillA * 0.5 + 0.5) * 0.22 + (twillB * 0.5 + 0.5) * 0.16) *
              (0.48 + warp * 0.52);

          const s08Relief = maskData[r * cols + c] || 0;
          if (s08Relief > 0.08) {
            const shimmer = Math.sin(c * 0.32 - r * 0.22 - t * 2.1) * 0.11;
            energy += s08Relief * (0.56 + shimmer);
          }

          const edgeX = Math.min(nx, 1 - nx) * 8.0;
          const edgeY = Math.min(ny, 1 - ny) * 6.0;
          const edgeMask = Math.min(1, Math.min(edgeX, edgeY));
          energy *= 0.38 + edgeMask * 0.62;

          const clamped = Math.max(0, Math.min(0.999, energy));
          const glyphIdx = Math.floor(clamped * ASCII_GLYPHS.length);
          const ch = ASCII_GLYPHS[glyphIdx];

          let runTone: 0 | 1 | 2 = 0;
          if (s08Relief > 0.22) {
            runTone = clamped > 0.62 ? 2 : 1;
          } else if (clamped > 0.42) {
            runTone = 1;
          }

          if (c === 0) {
            curTone = runTone;
            curText = ch;
          } else if (runTone === curTone) {
            curText += ch;
          } else {
            rowRuns.push({ tone: curTone, text: curText });
            curTone = runTone;
            curText = ch;
          }
        }
        if (curText) rowRuns.push({ tone: curTone, text: curText });
        computed.push(rowRuns);
      }

      if (!cancelled) setLines(computed);
    };

    compute();
    return () => {
      cancelled = true;
    };
  }, [cols, rows, centerYRatio]);

  const toneColors =
    tone === 'oled'
      ? ['#3A3A3A', '#8A8A8A', '#E8E8E8']
      : ['#D4D1C7', '#9D9C8F', '#4E4E45'];

  return (
    <pre
      data-ascii-ready={lines ? '1' : undefined}
      data-ascii-pending={lines ? undefined : '1'}
      aria-hidden="true"
      style={{ fontSize: '6.1pt', lineHeight: 1.18 }}
      className={`pointer-events-none select-none overflow-hidden font-mono ${className}`}
    >
      {lines?.map((runs, rIdx) => (
        <div key={rIdx}>
          {runs.map((run, i) => (
            <span key={i} style={{ color: toneColors[run.tone] }}>
              {run.text}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
};

export const CutoutCallingCard: React.FC<{
  maskId: string;
  lang: Lang;
  className?: string;
}> = ({ maskId, lang, className = '' }) => (
  <svg
    viewBox="0 0 540 315"
    className={`block h-auto w-full select-none ${className}`}
    role="img"
    aria-label="S08 Konveksi — Manufaktur Pakaian & Private Label OEM Bandung"
  >
    <defs>
      <mask id={maskId}>
        <rect width="540" height="315" rx="3" fill="white" />

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

        <line
          x1="274"
          y1="82"
          x2="253"
          y2="160"
          stroke="black"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

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

        <rect x="32" y="256" width="26" height="26" rx="1.5" fill="black" />

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

    <rect
      width="540"
      height="315"
      rx="3"
      fill="#FFFFFF"
      mask={`url(#${maskId})`}
    />
  </svg>
);
