import React from 'react';
import {
  ORDER_STEPS,
  S08_CONTACT,
  SIZE_CHARTS_BOTTOMS,
  SIZE_CHARTS_TOPS,
} from '../data/s08Data';
import { Lang, useLang } from '../i18n/LanguageContext';
import { DyedFabricSurface } from '../components/DyedFabricSurface';
import {
  BOTTOM_CUT_OPTIONS,
  CODED_FABRICS,
  CODED_PRODUCTS,
  DECORATION_CODES,
  OEM_CODES,
  TOP_CUT_OPTIONS,
} from './printData';
import {
  CheckBox,
  FieldLine,
  MonoLabel,
  QrSvg,
  Sheet,
  StaticAsciiS08,
  WA_DEFAULT_URL,
  WriteBox,
} from './printKit';

const TOTAL_PAGES = 10;
const DOC_TITLE = 'ORDERBOOK';

/** Thin-stroke 0.3mm technical garment flats for handwriting position marks */
const GarmentSketchGrid: React.FC<{ lang: Lang }> = ({ lang }) => (
  <div
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(27,27,22,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,27,22,0.06) 1px, transparent 1px)',
      backgroundSize: '5mm 5mm',
    }}
    className="border border-[#1B1B16]/25 bg-white/70 p-[3mm]"
  >
    <div className="mb-[2mm] flex items-center justify-between font-mono text-[6.8pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
      <span>
        {lang === 'id'
          ? 'Tandai posisi logo / aplikasi pada sketsa'
          : 'Mark logo / graphic placement on technical flats'}
      </span>
      <span>5MM GRID</span>
    </div>

    <div className="grid grid-cols-4 items-center gap-[3mm]">
      {/* 1. Atasan Depan */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 100 92" className="h-[31mm] w-full" fill="none">
          <path
            d="M36 10 Q50 18 64 10 L82 18 L92 48 L80 51 L75 30 V82 H25 V30 L20 51 L8 48 L18 18 Z"
            stroke="#1B1B16"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path d="M40 12 Q50 22 60 12" stroke="#1B1B16" strokeWidth="0.7" />
          <line x1="50" y1="19" x2="50" y2="82" stroke="#1B1B16" strokeWidth="0.45" strokeDasharray="2 2" />
        </svg>
        <span className="font-mono text-[6.2pt] uppercase text-[#7C7B6E]">
          {lang === 'id' ? 'Atasan Depan' : 'Top Front'}
        </span>
      </div>

      {/* 2. Atasan Belakang */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 100 92" className="h-[31mm] w-full" fill="none">
          <path
            d="M36 10 Q50 13 64 10 L82 18 L92 48 L80 51 L75 30 V82 H25 V30 L20 51 L8 48 L18 18 Z"
            stroke="#1B1B16"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <line x1="25" y1="24" x2="75" y2="24" stroke="#1B1B16" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
        <span className="font-mono text-[6.2pt] uppercase text-[#7C7B6E]">
          {lang === 'id' ? 'Atasan Belakang' : 'Top Back'}
        </span>
      </div>

      {/* 3. Bawahan Depan */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 90 92" className="h-[31mm] w-full" fill="none">
          <path
            d="M22 10 H68 L74 84 H52 L45 40 L38 84 H16 Z"
            stroke="#1B1B16"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <line x1="21" y1="17" x2="69" y2="17" stroke="#1B1B16" strokeWidth="0.6" />
          <line x1="45" y1="17" x2="45" y2="34" stroke="#1B1B16" strokeWidth="0.6" />
        </svg>
        <span className="font-mono text-[6.2pt] uppercase text-[#7C7B6E]">
          {lang === 'id' ? 'Bawahan Depan' : 'Bottom Front'}
        </span>
      </div>

      {/* 4. Bawahan Belakang */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 90 92" className="h-[31mm] w-full" fill="none">
          <path
            d="M22 10 H68 L74 84 H52 L45 40 L38 84 H16 Z"
            stroke="#1B1B16"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <line x1="21" y1="17" x2="69" y2="17" stroke="#1B1B16" strokeWidth="0.6" />
          <rect x="26" y="25" width="13" height="2" stroke="#1B1B16" strokeWidth="0.55" />
          <rect x="51" y="25" width="13" height="2" stroke="#1B1B16" strokeWidth="0.55" />
        </svg>
        <span className="font-mono text-[6.2pt] uppercase text-[#7C7B6E]">
          {lang === 'id' ? 'Bawahan Belakang' : 'Bottom Back'}
        </span>
      </div>
    </div>
  </div>
);

interface ArticleSpecSheetProps {
  articleNo: number;
  page: number;
  lang: Lang;
}

const ArticleSpecSheet: React.FC<ArticleSpecSheetProps> = ({
  articleNo,
  page,
  lang,
}) => {
  const numStr = String(articleNo).padStart(2, '0');

  return (
    <Sheet
      tone="paper"
      doc={DOC_TITLE}
      section={`04 // SPESIFIKASI ARTIKEL ${numStr}`}
      page={page}
      total={TOTAL_PAGES}
    >
      <div className="flex h-full flex-col justify-between gap-[3mm]">
        {/* Article Header + Basic Identifiers */}
        <div>
          <div className="flex items-end justify-between border-b border-[#1B1B16]/20 pb-[2.5mm]">
            <div className="flex items-baseline gap-[3mm]">
              <span className="font-mono text-[10pt] font-semibold text-[#1B1B16]">
                ARTIKEL {numStr}
              </span>
              <span className="font-mono text-[7.5pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
                {lang === 'id' ? 'Lembar Spesifikasi Produksi' : 'Style Specification Sheet'}
              </span>
            </div>
            <span className="font-mono text-[7pt] text-[#7C7B6E]">
              {lang === 'id' ? 'Ref: P01–P14 / F01–F27' : 'Ref: P01–P14 / F01–F27'}
            </span>
          </div>

          <div className="mt-[2.5mm] grid grid-cols-12 gap-[4mm]">
            <div className="col-span-3">
              <FieldLine label={lang === 'id' ? 'Kode Produk' : 'Product Code'} />
            </div>
            <div className="col-span-6">
              <FieldLine label={lang === 'id' ? 'Nama Artikel' : 'Style Name'} />
            </div>
            <div className="col-span-3">
              <FieldLine label="Target Qty (pcs)" />
            </div>
          </div>
        </div>

        {/* Cutting Checkboxes */}
        <div className="border-y border-[#1B1B16]/12 py-[2.5mm]">
          <div className="grid grid-cols-2 gap-[4mm]">
            <div>
              <MonoLabel className="mb-[1.5mm]">
                {lang === 'id' ? 'Cutting Atasan' : 'Tops Cutting'}
              </MonoLabel>
              <div className="grid grid-cols-2 gap-y-[1.4mm]">
                {TOP_CUT_OPTIONS.map((c) => (
                  <CheckBox key={c.code} label={`${c.code} · ${c.label}`} />
                ))}
              </div>
            </div>
            <div>
              <MonoLabel className="mb-[1.5mm]">
                {lang === 'id' ? 'Cutting Bawahan' : 'Bottoms Cutting'}
              </MonoLabel>
              <div className="grid grid-cols-2 gap-y-[1.4mm]">
                {BOTTOM_CUT_OPTIONS.map((c) => (
                  <CheckBox key={c.code} label={`${c.code} · ${c.label}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fabric Fields + Swatch Paste Box */}
        <div className="grid grid-cols-12 items-start gap-[4mm]">
          <div className="col-span-7 space-y-[2mm]">
            <MonoLabel>{lang === 'id' ? 'Spesifikasi Bahan' : 'Fabric Specification'}</MonoLabel>
            <div className="grid grid-cols-2 gap-[3mm]">
              <FieldLine label={lang === 'id' ? 'Kode Bahan (F01–F27)' : 'Fabric Code (F01–F27)'} />
              <FieldLine label={lang === 'id' ? 'Warna Kain' : 'Fabric Color'} />
            </div>
            <FieldLine label={lang === 'id' ? 'Gramasi / Furing / Catatan Bahan' : 'Weight / Lining / Material Notes'} />
          </div>
          <div className="col-span-5">
            <WriteBox
              label={lang === 'id' ? 'Swatch Kain Fisik' : 'Physical Swatch'}
              heightMm={28}
              hint={lang === 'id' ? 'Tempel swatch kain di sini' : 'Attach fabric swatch here'}
            />
          </div>
        </div>

        {/* Technical Sketch Grid */}
        <GarmentSketchGrid lang={lang} />

        {/* Decoration & OEM Checkboxes */}
        <div className="grid grid-cols-12 gap-[4mm] border-y border-[#1B1B16]/12 py-[2.5mm]">
          <div className="col-span-7">
            <MonoLabel className="mb-[1.5mm]">
              {lang === 'id' ? 'Dekorasi / Aplikasi' : 'Decoration / Print & Stitch'}
            </MonoLabel>
            <div className="grid grid-cols-2 gap-y-[1.3mm]">
              {DECORATION_CODES.map((d) => (
                <CheckBox key={d.code} label={`${d.code} · ${d.label[lang]}`} />
              ))}
            </div>
            <div className="mt-[2mm]">
              <FieldLine
                label={lang === 'id' ? 'Posisi & Ukuran Aplikasi (cm)' : 'Placement & Dimensions (cm)'}
              />
            </div>
          </div>
          <div className="col-span-5">
            <MonoLabel className="mb-[1.5mm]">
              {lang === 'id' ? 'Kelengkapan OEM' : 'OEM Brand Kit'}
            </MonoLabel>
            <div className="flex flex-col gap-[1.3mm]">
              {OEM_CODES.map((o) => (
                <CheckBox key={o.code} label={`${o.code} · ${o.label[lang]}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Size Breakdown Table */}
        <div>
          <MonoLabel className="mb-[1.5mm]">
            {lang === 'id' ? 'Rincian Jumlah Per Ukuran (pcs)' : 'Size Breakdown (pcs)'}
          </MonoLabel>
          <table className="w-full border-collapse border border-[#1B1B16]/25 bg-white font-mono text-[7.5pt]">
            <thead>
              <tr className="border-b border-[#1B1B16]/25 bg-[#EFECE4] text-center text-[7pt] text-[#1B1B16]">
                {['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Custom', 'Total'].map((sz) => (
                  <th
                    key={sz}
                    className="w-[12.5%] border-r border-[#1B1B16]/15 py-[1.6mm] last:border-r-0"
                  >
                    {sz}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Array.from({ length: 8 }).map((_, i) => (
                  <td
                    key={i}
                    style={{ height: '8.5mm' }}
                    className="border-r border-[#1B1B16]/15 last:border-r-0"
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes WriteBox */}
        <WriteBox
          label={lang === 'id' ? 'Catatan Konstruksi / Jahitan / Referensi' : 'Construction & Stitching Notes'}
          heightMm={16}
        />
      </div>
    </Sheet>
  );
};

export const OrderbookDoc: React.FC = () => {
  const { lang, t } = useLang();

  return (
    <div>
      {/* =================================================================== */}
      {/* PAGE 01: COVER (OLED + STATIC ASCII S08 + HANDWRITTEN ORDER INFO)   */}
      {/* =================================================================== */}
      <Sheet tone="oled" doc={DOC_TITLE} page={1} total={TOTAL_PAGES} bleed>
        <div
          style={{ padding: '14mm 14mm 12mm' }}
          className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#000000] text-white"
        >
          <StaticAsciiS08
            cols={108}
            rows={52}
            tone="oled"
            centerYRatio={0.58}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-60"
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

          {/* Monumental Title */}
          <div
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.98), 0 1px 6px rgba(0,0,0,0.95)' }}
            className="relative z-10 pt-[14mm]"
          >
            <div className="font-mono text-[8pt] uppercase tracking-[0.16em] text-white/60">
              PRODUCTION SPECIFICATION &amp; ORDER BOOK
            </div>
            <h1 className="mt-[4mm] text-[52pt] font-light leading-[0.98] tracking-[-0.04em] text-white">
              Orderbook
            </h1>
            <p className="mt-[3mm] font-serif text-[21pt] italic text-white/90">
              {lang === 'id' ? 'Buku Order Produksi' : 'Garment Production Order Book'}
            </p>
            <p className="mt-[5mm] max-w-[130mm] text-[10pt] leading-relaxed text-white/80">
              {lang === 'id'
                ? 'Dokumen kerja resmi untuk pencatatan spesifikasi artikel, pemilihan bahan, rincian ukuran, serta pemantauan progres produksi di workshop Bandung.'
                : 'Working production docket for recording garment specifications, textile codes, size distributions, and workshop sign-offs in Bandung.'}
            </p>
          </div>

          {/* Bottom White-Hairline Handwritten Order Identification Fields */}
          <div className="relative z-10 space-y-[5mm]">
            <div className="oled-liquid-glass rounded-[14px] p-[6mm]">
              <div className="mb-[3mm] font-mono text-[7pt] uppercase tracking-[0.14em] text-white/60">
                {lang === 'id' ? 'IDENTITAS ORDER' : 'ORDER IDENTIFICATION'}
              </div>
              <div className="grid grid-cols-2 gap-x-[8mm] gap-y-[4mm]">
                <FieldLine label={lang === 'id' ? 'No. Order / SPK' : 'Order / SPK No.'} dark />
                <FieldLine label={lang === 'id' ? 'Tanggal Masuk' : 'Date'} dark />
                <FieldLine label={lang === 'id' ? 'Merek / Instansi' : 'Brand / Client'} dark />
                <FieldLine label={lang === 'id' ? 'PIC / WhatsApp' : 'Contact Person'} dark />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-[3.5mm] font-mono text-[7.5pt] uppercase tracking-[0.14em] text-white/45">
              <span>{S08_CONTACT.shortAddress} · WA {S08_CONTACT.whatsappDisplay}</span>
              <span>01 / 10</span>
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 02: PANDUAN PENGISIAN                                          */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="01 // PANDUAN PENGISIAN"
        page={2}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[4mm]">
          <div>
            <MonoLabel>
              {lang === 'id' ? 'Petunjuk Penggunaan Buku Order' : 'How To Complete This Orderbook'}
            </MonoLabel>
            <h2 className="mt-[1mm] text-[22pt] font-light tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Panduan Pengisian' : 'Filling Guide'}
            </h2>

            {/* 5-Step Fill Guide */}
            <div className="mt-[4mm] grid grid-cols-5 gap-[2.5mm]">
              {(lang === 'id'
                ? [
                    { n: '01', t: 'Pilih Kode', d: 'Catat kode produk (P01–P14) dari halaman referensi.' },
                    { n: '02', t: 'Kain & Cut', d: 'Isi kode bahan (F01–F27) serta centang cutting.' },
                    { n: '03', t: 'Sketsa & OEM', d: 'Tandai posisi grafis serta pilih kode D1–D5 & O1–O5.' },
                    { n: '04', t: 'Komposisi Size', d: 'Lengkapi rincian S–XXXL atau tabel ukuran custom.' },
                    { n: '05', t: 'Kirim / Bawa', d: 'Kirim foto lembar ke WA atau bawa saat kunjungan.' },
                  ]
                : [
                    { n: '01', t: 'Product Code', d: 'Select style codes (P01–P14) on page 03.' },
                    { n: '02', t: 'Fabric & Cut', d: 'Enter fabric code (F01–F27) and check silhouette.' },
                    { n: '03', t: 'Flats & OEM', d: 'Mark artwork placement and select D1–D5 / O1–O5.' },
                    { n: '04', t: 'Size Ratio', d: 'Fill S–XXXL quantities or custom measurements.' },
                    { n: '05', t: 'Submit Brief', d: 'Send photos via WhatsApp or bring to workshop.' },
                  ]
              ).map((step) => (
                <div key={step.n} className="border border-[#1B1B16]/12 bg-white p-[3mm]">
                  <div className="font-mono text-[8pt] font-semibold text-[#FF2E00]">
                    {step.n}
                  </div>
                  <div className="mt-[1mm] text-[9pt] font-medium text-[#1B1B16]">
                    {step.t}
                  </div>
                  <p className="mt-[1mm] text-[7.5pt] leading-snug text-[#59594E]">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Step Compact Timeline */}
          <div className="border-y border-[#1B1B16]/12 py-[3.5mm]">
            <MonoLabel className="mb-[2.5mm]">
              {lang === 'id' ? 'Alur Produksi S08 Konveksi (7 Tahap)' : 'S08 Production Workflow (7 Stages)'}
            </MonoLabel>
            <div className="divide-y divide-[#1B1B16]/10">
              {ORDER_STEPS.map((st) => (
                <div
                  key={st.number}
                  className="grid grid-cols-12 items-baseline gap-[2mm] py-[1.8mm]"
                >
                  <span className="col-span-1 font-mono text-[7.5pt] text-[#8B8A7D]">
                    {st.number}
                  </span>
                  <span className="col-span-4 text-[8.8pt] font-medium text-[#1B1B16]">
                    {t(st.title)}
                  </span>
                  <span className="col-span-7 text-[7.8pt] text-[#59594E]">
                    {t(st.description)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Terms + Contact QR */}
          <div className="grid grid-cols-12 items-stretch gap-[4mm]">
            <div className="col-span-8 grid grid-cols-2 gap-[2.5mm]">
              {[
                { k: 'MINIMUM ORDER', v: lang === 'id' ? '24 pcs / artikel' : '24 pcs / style' },
                { k: lang === 'id' ? 'PEMBAYARAN' : 'PAYMENT', v: 'DP 50% · Balance 50%' },
                { k: lang === 'id' ? 'ESTIMASI MASSAL' : 'LEAD TIME', v: lang === 'id' ? '14–21 Hari Kerja' : '14–21 Working Days' },
                { k: lang === 'id' ? 'SAMPEL FISIK' : 'SAMPLE', v: lang === 'id' ? '5–7 Hari Kerja' : '5–7 Working Days' },
              ].map((item) => (
                <div key={item.k} className="border border-[#1B1B16]/12 bg-white p-[3mm]">
                  <div className="font-mono text-[6.5pt] uppercase tracking-[0.12em] text-[#8B8A7D]">
                    {item.k}
                  </div>
                  <div className="mt-[1mm] font-serif text-[11pt] text-[#1B1B16]">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-4 flex items-center gap-[3.5mm] border border-[#1B1B16]/15 bg-white p-[3.5mm]">
              <QrSvg text={WA_DEFAULT_URL} sizeMm={22} />
              <div className="min-w-0">
                <div className="font-mono text-[7pt] uppercase tracking-[0.1em] text-[#7C7B6E]">
                  WHATSAPP
                </div>
                <div className="mt-[0.5mm] font-mono text-[8.5pt] font-semibold text-[#1B1B16]">
                  {S08_CONTACT.whatsappDisplay}
                </div>
                <div className="mt-[1mm] text-[7pt] leading-tight text-[#59594E]">
                  {S08_CONTACT.shortAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 03: KODE REFERENSI (P01-P14, F01-F27, D1-D5, O1-O5)            */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="02 // KODE REFERENSI"
        page={3}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[2.5mm]">
            <h2 className="text-[19pt] font-light tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Indeks Kode Referensi' : 'Reference Code Directory'}
            </h2>
            <span className="font-mono text-[7pt] uppercase tracking-[0.12em] text-[#7C7B6E]">
              P01–P14 · F01–F27 · D1–D5 · O1–O5
            </span>
          </div>

          <div className="grid flex-1 grid-cols-12 gap-[6mm] pt-[3.5mm]">
            {/* Left Column: Products P01-P14 + Decorations + OEM */}
            <div className="col-span-6 flex flex-col justify-between">
              <div>
                <MonoLabel className="mb-[1.5mm] font-semibold text-[#1B1B16]">
                  {lang === 'id' ? 'Kode Artikel Produk (P01–P14)' : 'Product Style Codes (P01–P14)'}
                </MonoLabel>
                <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white text-[7.5pt]">
                  <tbody className="divide-y divide-[#1B1B16]/10">
                    {CODED_PRODUCTS.map((p) => (
                      <tr key={p.code}>
                        <td className="w-[10mm] px-[2mm] py-[1.45mm] font-mono text-[7pt] font-semibold text-[#1B1B16]">
                          {p.code}
                        </td>
                        <td className="px-[2mm] py-[1.45mm] font-medium text-[#1B1B16]">
                          {t(p.name)}
                        </td>
                        <td className="px-[2mm] py-[1.45mm] text-right font-mono text-[6.3pt] text-[#7C7B6E]">
                          {p.sizeRange}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Decoration D1-D5 & OEM O1-O5 */}
              <div className="grid grid-cols-2 gap-[3mm]">
                <div className="border border-[#1B1B16]/15 bg-white p-[2.5mm]">
                  <MonoLabel className="mb-[1.5mm] font-semibold text-[#1B1B16]">
                    {lang === 'id' ? 'Dekorasi (D1–D5)' : 'Decoration (D1–D5)'}
                  </MonoLabel>
                  <div className="space-y-[1mm] text-[7.3pt] text-[#3B3B33]">
                    {DECORATION_CODES.map((d) => (
                      <div key={d.code}>
                        <span className="font-mono font-semibold text-[#1B1B16]">
                          {d.code}
                        </span>{' '}
                        {d.label[lang]}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#1B1B16]/15 bg-white p-[2.5mm]">
                  <MonoLabel className="mb-[1.5mm] font-semibold text-[#1B1B16]">
                    {lang === 'id' ? 'Label OEM (O1–O5)' : 'OEM Trims (O1–O5)'}
                  </MonoLabel>
                  <div className="space-y-[1mm] text-[7.3pt] text-[#3B3B33]">
                    {OEM_CODES.map((o) => (
                      <div key={o.code}>
                        <span className="font-mono font-semibold text-[#1B1B16]">
                          {o.code}
                        </span>{' '}
                        {o.label[lang]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cutting C1-C8 Compact */}
              <div className="border border-[#1B1B16]/15 bg-[#EFECE4] p-[2.5mm]">
                <MonoLabel className="mb-[1mm] font-semibold text-[#1B1B16]">
                  {lang === 'id' ? 'Kode Cutting' : 'Cutting Codes'}
                </MonoLabel>
                <div className="grid grid-cols-2 gap-x-[3mm] gap-y-[0.8mm] font-mono text-[6.8pt] text-[#3B3B33]">
                  {TOP_CUT_OPTIONS.map((c) => (
                    <div key={c.code}>
                      <strong>{c.code}</strong> {c.label}
                    </div>
                  ))}
                  {BOTTOM_CUT_OPTIONS.map((c) => (
                    <div key={c.code}>
                      <strong>{c.code}</strong> {c.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: All 27 Fabrics F01-F27 with Sharp Swatch */}
            <div className="col-span-6">
              <MonoLabel className="mb-[1.5mm] font-semibold text-[#1B1B16]">
                {lang === 'id' ? 'Kode Bahan & Finishing (F01–F27)' : 'Fabric & Trim Codes (F01–F27)'}
              </MonoLabel>
              <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white text-[7pt]">
                <tbody className="divide-y divide-[#1B1B16]/10">
                  {CODED_FABRICS.map((f) => (
                    <tr key={f.code}>
                      <td className="w-[8.5mm] px-[1.5mm] py-[1.05mm] font-mono text-[6.8pt] font-semibold text-[#1B1B16]">
                        {f.code}
                      </td>
                      <td className="w-[7mm] py-[1.05mm]">
                        <DyedFabricSurface
                          textureImg={f.textureImg}
                          hex={f.colorOptions[0]?.hex ?? f.swatch}
                          alt={f.name}
                          className="h-[5.5mm] w-[5.5mm] rounded-none border border-black/15"
                        />
                      </td>
                      <td className="px-[1.5mm] py-[1.05mm] font-medium text-[#1B1B16]">
                        {f.name}
                      </td>
                      <td className="px-[1.8mm] py-[1.05mm] text-right font-mono text-[6pt] text-[#7C7B6E]">
                        {f.spec}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 04: DATA KLIEN & RINGKASAN ORDER                               */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="03 // DATA KLIEN & RINGKASAN"
        page={4}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[4mm]">
          {/* Client Metadata Fields */}
          <div>
            <h2 className="border-b border-[#1B1B16]/15 pb-[2mm] text-[18pt] font-light tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Data Klien & Ringkasan Order' : 'Client Details & Order Summary'}
            </h2>

            <div className="mt-[3.5mm] grid grid-cols-2 gap-x-[6mm] gap-y-[3mm]">
              <FieldLine label={lang === 'id' ? 'Nama Merek / Instansi' : 'Brand / Organization'} />
              <FieldLine label={lang === 'id' ? 'Nama Penanggung Jawab (PIC)' : 'Contact Person'} />
              <FieldLine label="No. WhatsApp" />
              <FieldLine label="Email" />
              <div className="col-span-2">
                <FieldLine
                  label={lang === 'id' ? 'Alamat Pengiriman Lengkap' : 'Full Shipping Address'}
                  lines={2}
                />
              </div>
              <FieldLine label={lang === 'id' ? 'Kota / Provinsi' : 'City / Province'} />
              <FieldLine label={lang === 'id' ? 'Target Tanggal Selesai' : 'Target Completion Date'} />
              <FieldLine label={lang === 'id' ? 'Ekspedisi / Ambil di Workshop' : 'Freight / Workshop Pickup'} />
              <div className="flex flex-col justify-end pb-[1mm]">
                <MonoLabel className="mb-[1.5mm]">
                  {lang === 'id' ? 'Opsi Sampel Fisik' : 'Sample Prototype Option'}
                </MonoLabel>
                <div className="flex items-center gap-[5mm]">
                  <CheckBox label={lang === 'id' ? 'Dengan Sampel' : 'With Sample'} />
                  <CheckBox label={lang === 'id' ? 'Langsung Massal' : 'Direct Bulk'} />
                </div>
              </div>
            </div>
          </div>

          {/* 8-Row Order Summary Table */}
          <div>
            <MonoLabel className="mb-[2mm] text-[#1B1B16]">
              {lang === 'id' ? 'Daftar Ringkasan Artikel Order' : 'Order Items Summary'}
            </MonoLabel>
            <table className="w-full border-collapse border border-[#1B1B16]/25 bg-white font-mono text-[7pt]">
              <thead>
                <tr className="border-b border-[#1B1B16]/25 bg-[#EFECE4] text-left uppercase text-[#59594E]">
                  <th className="w-[8mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm] text-center">No</th>
                  <th className="w-[24mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm]">
                    {lang === 'id' ? 'Kode Produk' : 'Style Code'}
                  </th>
                  <th className="w-[24mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm]">
                    {lang === 'id' ? 'Kode Bahan' : 'Fabric Code'}
                  </th>
                  <th className="w-[28mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm]">
                    {lang === 'id' ? 'Warna' : 'Color'}
                  </th>
                  <th className="w-[26mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm]">
                    Cutting
                  </th>
                  <th className="w-[16mm] border-r border-[#1B1B16]/15 px-[2mm] py-[2mm] text-center">
                    Qty
                  </th>
                  <th className="px-[2mm] py-[2mm]">
                    {lang === 'id' ? 'Catatan' : 'Notes'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1B16]/15">
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td
                      style={{ height: '9mm' }}
                      className="border-r border-[#1B1B16]/15 text-center text-[#8B8A7D]"
                    >
                      {i + 1}
                    </td>
                    <td className="border-r border-[#1B1B16]/15" />
                    <td className="border-r border-[#1B1B16]/15" />
                    <td className="border-r border-[#1B1B16]/15" />
                    <td className="border-r border-[#1B1B16]/15" />
                    <td className="border-r border-[#1B1B16]/15" />
                    <td />
                  </tr>
                ))}
                <tr className="border-t-2 border-[#1B1B16]/30 bg-[#EFECE4]">
                  <td
                    colSpan={5}
                    className="border-r border-[#1B1B16]/15 px-[3mm] py-[2.5mm] text-right font-semibold uppercase text-[#1B1B16]"
                  >
                    {lang === 'id' ? 'Total Kuantitas (pcs)' : 'Total Quantity (pcs)'}
                  </td>
                  <td className="border-r border-[#1B1B16]/15" />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Tracking Block */}
          <div className="border border-[#1B1B16]/20 bg-white p-[4mm]">
            <MonoLabel className="mb-[2.5mm] text-[#1B1B16]">
              {lang === 'id' ? 'Status Pembayaran (DP 50% / Pelunasan 50%)' : 'Payment Milestones (50% DP / 50% Balance)'}
            </MonoLabel>
            <div className="grid grid-cols-2 gap-[6mm] font-mono text-[8pt] text-[#1B1B16]">
              <div>
                DP 50% {lang === 'id' ? 'diterima' : 'received'}: _______________ &nbsp; tgl: _________
              </div>
              <div>
                {lang === 'id' ? 'Pelunasan 50%' : 'Balance 50%'}: _______________ &nbsp; tgl: _________
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGES 05–08: LEMBAR SPESIFIKASI ARTIKEL 01–04                       */}
      {/* =================================================================== */}
      {[1, 2, 3, 4].map((n) => (
        <ArticleSpecSheet key={n} articleNo={n} page={4 + n} lang={lang} />
      ))}

      {/* =================================================================== */}
      {/* PAGE 09: SIZE CHART & UKURAN CUSTOM                                 */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="05 // SIZE CHART & CUSTOM"
        page={9}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[3.5mm]">
          <div>
            <div className="flex items-end justify-between border-b border-[#1B1B16]/12 pb-[2mm]">
              <h2 className="text-[19pt] font-light tracking-[-0.03em] text-[#1B1B16]">
                {lang === 'id' ? 'Standar Size Chart & Ukuran Custom' : 'Standard Size Charts & Custom Grading'}
              </h2>
              <span className="font-mono text-[7pt] text-[#7C7B6E]">UNIT: CM · TOL ± 1–1.5 CM</span>
            </div>

            {/* 6 Standard Size Tables in 2 columns (Tops left, Bottoms right) */}
            <div className="mt-[3mm] grid grid-cols-2 gap-[4mm]">
              {/* Left: Tops 3 blocks */}
              <div className="space-y-[2.8mm]">
                {(['regular', 'oversized', 'boxy'] as const).map((key) => (
                  <div key={key}>
                    <MonoLabel className="mb-[1mm] text-[#1B1B16]">
                      {lang === 'id' ? 'Atasan' : 'Tops'} — {key.toUpperCase()}
                    </MonoLabel>
                    <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white font-mono text-[6.8pt]">
                      <thead>
                        <tr className="border-b border-[#1B1B16]/15 bg-[#EFECE4] text-left text-[6.2pt] uppercase text-[#59594E]">
                          <th className="px-[1.8mm] py-[1.1mm]">Sz</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Dada' : 'Chest'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Pjg' : 'Len'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Lgn' : 'Slv'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Bahu' : 'Shldr'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1B1B16]/10">
                        {SIZE_CHARTS_TOPS[key].map((r) => (
                          <tr key={r.size}>
                            <td className="px-[1.8mm] py-[0.95mm] font-semibold">{r.size}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.chest}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.length}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.sleeve}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.shoulder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* Right: Bottoms 3 blocks */}
              <div className="space-y-[2.8mm]">
                {(['straight', 'baggy', 'tapered'] as const).map((key) => (
                  <div key={key}>
                    <MonoLabel className="mb-[1mm] text-[#1B1B16]">
                      {lang === 'id' ? 'Bawahan' : 'Bottoms'} — {key.toUpperCase()}
                    </MonoLabel>
                    <table className="w-full border-collapse border border-[#1B1B16]/15 bg-white font-mono text-[6.8pt]">
                      <thead>
                        <tr className="border-b border-[#1B1B16]/15 bg-[#EFECE4] text-left text-[6.2pt] uppercase text-[#59594E]">
                          <th className="px-[1.8mm] py-[1.1mm]">Sz</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Pinggang' : 'Waist'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Pjg' : 'Len'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Paha' : 'Thigh'}</th>
                          <th className="px-[1.8mm] py-[1.1mm]">{lang === 'id' ? 'Bukaan' : 'Hem'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1B1B16]/10">
                        {SIZE_CHARTS_BOTTOMS[key].map((r) => (
                          <tr key={r.size}>
                            <td className="px-[1.8mm] py-[0.95mm] font-semibold">{r.size}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.waist}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.length}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.thigh}</td>
                            <td className="px-[1.8mm] py-[0.95mm]">{r.opening}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blank Custom Measurement Table (6 empty rows) */}
          <div className="border-t border-[#1B1B16]/15 pt-[3mm]">
            <div className="mb-[1.8mm] flex items-baseline justify-between">
              <MonoLabel className="font-semibold text-[#1B1B16]">
                {lang === 'id'
                  ? 'Tabel Ukuran Custom Klien (Isi jika menggunakan size chart sendiri)'
                  : 'Custom Brand Grading Table (Complete if supplying bespoke specs)'}
              </MonoLabel>
              <span className="font-mono text-[6.5pt] text-[#7C7B6E]">CM</span>
            </div>

            <table className="w-full border-collapse border border-[#1B1B16]/25 bg-white font-mono text-[6.5pt]">
              <thead>
                <tr className="border-b border-[#1B1B16]/25 bg-[#EFECE4] text-center uppercase text-[#59594E]">
                  {[
                    lang === 'id' ? 'Ukuran' : 'Size',
                    lang === 'id' ? 'L. Dada' : 'Chest',
                    lang === 'id' ? 'P. Badan' : 'Body Len',
                    lang === 'id' ? 'P. Lengan' : 'Sleeve',
                    lang === 'id' ? 'L. Bahu' : 'Shoulder',
                    lang === 'id' ? 'L. Pinggang' : 'Waist',
                    lang === 'id' ? 'P. Celana' : 'Outseam',
                    lang === 'id' ? 'L. Paha' : 'Thigh',
                    lang === 'id' ? 'Bukaan' : 'Opening',
                  ].map((col) => (
                    <th
                      key={col}
                      className="border-r border-[#1B1B16]/15 px-[1.2mm] py-[1.8mm] last:border-r-0"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1B16]/15">
                {Array.from({ length: 6 }).map((_, rIdx) => (
                  <tr key={rIdx}>
                    {Array.from({ length: 9 }).map((__, cIdx) => (
                      <td
                        key={cIdx}
                        style={{ height: '8.5mm' }}
                        className="border-r border-[#1B1B16]/15 last:border-r-0"
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Sheet>

      {/* =================================================================== */}
      {/* PAGE 10: TRACKING PRODUKSI & PERSETUJUAN                            */}
      {/* =================================================================== */}
      <Sheet
        tone="paper"
        doc={DOC_TITLE}
        section="06 // TRACKING & PERSETUJUAN"
        page={10}
        total={TOTAL_PAGES}
      >
        <div className="flex h-full flex-col justify-between gap-[4mm]">
          <div>
            <h2 className="border-b border-[#1B1B16]/12 pb-[2.5mm] text-[19pt] font-light tracking-[-0.03em] text-[#1B1B16]">
              {lang === 'id' ? 'Tracking Produksi & Persetujuan' : 'Production Tracking & Sign-Off'}
            </h2>

            {/* 9-Stage Tracking Table */}
            <table className="mt-[4mm] w-full border-collapse border border-[#1B1B16]/25 bg-white font-mono text-[7.5pt]">
              <thead>
                <tr className="border-b border-[#1B1B16]/25 bg-[#EFECE4] text-left uppercase text-[#59594E]">
                  <th className="w-[44mm] border-r border-[#1B1B16]/15 px-[2.5mm] py-[2.2mm]">
                    {lang === 'id' ? 'Tahap Produksi' : 'Stage'}
                  </th>
                  <th className="w-[26mm] border-r border-[#1B1B16]/15 px-[2.5mm] py-[2.2mm]">
                    {lang === 'id' ? 'Tanggal' : 'Date'}
                  </th>
                  <th className="w-[24mm] border-r border-[#1B1B16]/15 px-[2.5mm] py-[2.2mm]">
                    Paraf
                  </th>
                  <th className="px-[2.5mm] py-[2.2mm]">
                    {lang === 'id' ? 'Catatan' : 'Notes'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B1B16]/15">
                {(lang === 'id'
                  ? [
                      '01 · Brief & Referensi Desain',
                      '02 · Spesifikasi Kerja (SPK)',
                      '03 · Penawaran Harga (Quotation)',
                      '04 · Pembuatan & Cek Sampel',
                      '05 · Pembayaran DP 50%',
                      '06 · Potong, Jahit & Aplikasi',
                      '07 · Quality Control & Packing',
                      '08 · Pelunasan 50%',
                      '09 · Pengiriman / Serah Terima',
                    ]
                  : [
                      '01 · Design Brief & References',
                      '02 · Production Spec Sheet (SPK)',
                      '03 · Formal Quotation',
                      '04 · Sample Prototype Review',
                      '05 · 50% Deposit Received',
                      '06 · Cutting, Sewing & Decoration',
                      '07 · Final QC & Size Packing',
                      '08 · 50% Balance Settlement',
                      '09 · Dispatch / Handover',
                    ]
                ).map((stage) => (
                  <tr key={stage}>
                    <td
                      style={{ height: '10mm' }}
                      className="border-r border-[#1B1B16]/15 px-[2.5mm] font-sans text-[8.5pt] font-medium text-[#1B1B16]"
                    >
                      {stage}
                    </td>
                    <td className="border-r border-[#1B1B16]/15" />
                    <td className="border-r border-[#1B1B16]/15" />
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sample Approval Checkboxes & Revisi Box */}
          <div className="border border-[#1B1B16]/20 bg-white p-[4mm]">
            <MonoLabel className="mb-[2.5mm] text-[#1B1B16]">
              {lang === 'id' ? 'Persetujuan Sampel Pra-Produksi' : 'Pre-Production Sample Sign-Off'}
            </MonoLabel>
            <div className="mb-[3mm] flex flex-wrap items-center gap-[8mm]">
              <CheckBox
                label={
                  lang === 'id'
                    ? 'Disetujui — Lanjut Produksi Massal'
                    : 'Approved — Proceed to Bulk Production'
                }
              />
              <CheckBox
                label={
                  lang === 'id'
                    ? 'Perlu Revisi (detail dicatat di bawah)'
                    : 'Revision Required (specify below)'
                }
              />
            </div>
            <WriteBox
              label={lang === 'id' ? 'Catatan Revisi / Penyesuaian' : 'Revision Notes'}
              heightMm={30}
            />
          </div>

          {/* Two Signature Blocks */}
          <div className="grid grid-cols-2 gap-[8mm]">
            {[
              {
                role: lang === 'id' ? 'Disetujui Oleh (Klien)' : 'Approved By (Client)',
                org: lang === 'id' ? 'Merek / Instansi Pemesan' : 'Ordering Brand / Organization',
              },
              {
                role: lang === 'id' ? 'Diterima Oleh (Workshop)' : 'Received By (Workshop)',
                org: 'S08 Konveksi Bandung · Jl. Segar Dalam D 16',
              },
            ].map((sig) => (
              <div
                key={sig.role}
                className="flex flex-col justify-between border border-[#1B1B16]/20 bg-white p-[4mm]"
              >
                <div>
                  <div className="font-mono text-[7.5pt] font-semibold uppercase tracking-[0.12em] text-[#1B1B16]">
                    {sig.role}
                  </div>
                  <div className="mt-[0.5mm] text-[7.5pt] text-[#7C7B6E]">{sig.org}</div>
                </div>
                <div style={{ height: '24mm' }} />
                <div className="grid grid-cols-12 gap-[3mm] border-t border-[#1B1B16]/20 pt-[2mm] font-mono text-[7pt] text-[#7C7B6E]">
                  <span className="col-span-7">
                    {lang === 'id' ? 'Nama: ________________' : 'Name: ________________'}
                  </span>
                  <span className="col-span-5 text-right">
                    {lang === 'id' ? 'Tgl: ________' : 'Date: ________'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sheet>
    </div>
  );
};
