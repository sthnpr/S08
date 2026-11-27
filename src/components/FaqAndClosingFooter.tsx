import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, FileText, MapPin, Phone, Plus } from 'lucide-react';
import { buildWhatsAppUrl, FAQ_ITEMS, PageRoute, S08_CONTACT } from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';
import { InteractiveAsciiWeave } from './InteractiveAsciiWeave';

export const FaqSection: React.FC = () => {
  const { lang, t } = useLang();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-[#1B1B16]/10 bg-[#F5F3EF] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[780px] px-5 md:px-10">
        <h2 className="text-center text-[28px] font-light tracking-[-0.03em] text-[#1B1B16] sm:text-[36px]">
          {lang === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
        </h2>

        <div className="mt-12 border-t border-[#9D9C8F]/50">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.question.id} className="border-b border-[#9D9C8F]/50">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors cursor-pointer"
                >
                  <span className="text-[15.5px] font-normal leading-snug text-[#2E2E27] group-hover:text-black sm:text-[16.5px]">
                    {t(item.question)}
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-[#7C7B6E] stroke-[1.5] transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-[#1B1B16]' : 'group-hover:text-[#1B1B16]'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-8 text-[14px] leading-[1.7] text-[#59594E]">
                        {t(item.answer)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface ClosingFooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenCatalogModal: () => void;
}

export const ClosingFooter: React.FC<ClosingFooterProps> = ({
  onNavigate,
  onOpenCatalogModal,
}) => {
  const { lang, t } = useLang();
  const [closingPrompt, setClosingPrompt] = useState('');
  const [bandungTime, setBandungTime] = useState('');
  const footerRef = useRef<HTMLElement | null>(null);

  // Subtle cursor-following optical specular highlight on each dark Liquid Glass bento card
  const handleGlassMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setBandungTime(`${formatted} WIB`);
      } catch {
        setBandungTime('WIB · UTC+7');
      }
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  const handleClosingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message =
      lang === 'id'
        ? closingPrompt.trim()
          ? `Halo S08 Konveksi Bandung, saya ingin berkonsultasi mengenai produksi: ${closingPrompt.trim()}.`
          : `Halo S08 Konveksi Bandung, saya ingin berkonsultasi mengenai produksi pakaian.`
        : closingPrompt.trim()
          ? `Hello S08 Konveksi Bandung, I would like to inquire about manufacturing: ${closingPrompt.trim()}.`
          : `Hello S08 Konveksi Bandung, I would like to inquire about garment manufacturing.`;
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    /* Curtain-reveal pure OLED #000000 footer: Interactive ASCII S08 Weave layered BEHIND expensive dark Liquid Glass cards */
    <footer
      ref={footerRef}
      id="kontak"
      className="relative z-0 min-h-[540px] overflow-hidden bg-[#000000] text-white md:sticky md:bottom-0 md:min-h-[590px]"
    >
      {/* FULL-BLEED INTERACTIVE OLED ASCII S08 WEAVE BACKDROP */}
      <InteractiveAsciiWeave pointerHostRef={footerRef} />

      {/* Top 1px hairline border + subtle ambient overhead studio sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div
        style={{
          background:
            'radial-gradient(ellipse 65% 32% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 72%)',
        }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-56"
      />

      {/* FOREGROUND EDITORIAL + DARK APPLE LIQUID GLASS LAYER */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
        {/* Top Metadata Rail with + Registration Marks */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.12] pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
          <div className="flex items-center gap-3">
            <span className="text-white/30">+</span>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src="/brand/s08-logo-light.png"
                alt="S08 Konveksi"
                className="h-5 w-auto opacity-95"
              />
              <span className="text-white/90">S08 KONVEKSI</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#91CFB5] animate-pulse" />
              <span>BANDUNG · {bandungTime || 'WIB'}</span>
            </span>
            <span>EST. 2008</span>
            <span className="text-white/30">+</span>
          </div>
        </div>

        {/* Editorial Sans + Italic Serif Statement floating directly above the live ASCII S08 Weave */}
        <div className="grid grid-cols-1 items-end gap-8 border-b border-white/[0.12] py-10 lg:grid-cols-12 md:py-12">
          <div className="lg:col-span-7">
            <h2
              style={{ textShadow: '0 6px 36px rgba(0, 0, 0, 0.92)' }}
              className="text-[clamp(28px,3.8vw,50px)] font-light leading-[1.08] tracking-[-0.035em] text-white"
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

          <div className="lg:col-span-5">
            <form onSubmit={handleClosingSubmit} className="w-full">
              <div className="oled-liquid-pill flex items-center rounded-full p-1 pl-4 transition-all">
                <input
                  type="text"
                  value={closingPrompt}
                  onChange={(e) => setClosingPrompt(e.target.value)}
                  placeholder={
                    lang === 'id'
                      ? 'Artikel atau nama merek Anda...'
                      : 'Garment style or brand name...'
                  }
                  className="w-full bg-transparent py-2 pr-3 text-[13px] text-white placeholder:text-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-black shadow-[0_4px_14px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>{lang === 'id' ? 'WhatsApp' : 'Inquire'}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3-COLUMN TRANSLUCENT DARK APPLE LIQUID GLASS BENTO CARDS OVER LIVE ASCII S08 */}
        <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-3 md:gap-5">
          {/* Bento 01: Workshop Location */}
          <div
            onMouseMove={handleGlassMove}
            className="oled-liquid-glass flex flex-col justify-between rounded-[20px] p-6"
          >
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              <span>01 // WORKSHOP</span>
              <MapPin className="h-3.5 w-3.5 text-white/65 stroke-[1.4]" />
            </div>

            <div className="relative z-10 mt-6">
              <div className="text-[15.5px] font-medium tracking-[-0.015em] text-white">
                {S08_CONTACT.address}
              </div>
              <div className="mt-1 font-mono text-[11px] text-white/65">
                {t(S08_CONTACT.operationalHours)}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.12] pt-3.5 font-mono text-[10.5px]">
              <a
                href={S08_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 transition-colors hover:text-white"
              >
                Google Maps ↗
              </a>
              <span className="text-white/45">IDN · 40000</span>
            </div>
          </div>

          {/* Bento 02: Direct Contact & PDF */}
          <div
            onMouseMove={handleGlassMove}
            className="oled-liquid-glass flex flex-col justify-between rounded-[20px] p-6"
          >
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              <span>02 // DIRECT LINE</span>
              <Phone className="h-3.5 w-3.5 text-white/65 stroke-[1.4]" />
            </div>

            <div className="relative z-10 mt-6">
              <a
                href={buildWhatsAppUrl(
                  lang === 'id'
                    ? 'Halo S08 Konveksi Bandung, saya ingin berkonsultasi mengenai produksi.'
                    : 'Hello S08 Konveksi Bandung, I would like to inquire about production.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[20px] font-medium tracking-[-0.02em] text-white transition-colors hover:text-[#FF2E00]"
              >
                {S08_CONTACT.whatsappDisplay}
              </a>
              <div className="mt-1 font-mono text-[11px] text-white/65">
                {lang === 'id'
                  ? 'Konsultasi pola, kain & quotation resmi'
                  : 'Pattern, textile & quotation desk'}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.12] pt-3.5 font-mono text-[10.5px]">
              <button
                type="button"
                onClick={onOpenCatalogModal}
                className="inline-flex items-center gap-1.5 text-white/85 transition-colors hover:text-white cursor-pointer"
              >
                <FileText className="h-3 w-3" />
                <span>Company Profile PDF</span>
              </button>
              <span className="text-[#91CFB5]">ACTIVE</span>
            </div>
          </div>

          {/* Bento 03: Site Index */}
          <div
            onMouseMove={handleGlassMove}
            className="oled-liquid-glass flex flex-col justify-between rounded-[20px] p-6"
          >
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
              <span>03 // INDEX</span>
              <span className="text-white/45">MOQ 24</span>
            </div>

            <div className="relative z-10 mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 font-mono text-[11.5px] text-white/80">
              <button type="button" onClick={() => onNavigate('home')} className="text-left hover:text-white cursor-pointer">
                00 {lang === 'id' ? 'Beranda' : 'Home'}
              </button>
              <button type="button" onClick={() => onNavigate('produk')} className="text-left hover:text-white cursor-pointer">
                01 {lang === 'id' ? 'Katalog' : 'Catalog'}
              </button>
              <button type="button" onClick={() => onNavigate('bahan')} className="text-left hover:text-white cursor-pointer">
                02 {lang === 'id' ? 'Bahan' : 'Fabrics'}
              </button>
              <button type="button" onClick={() => onNavigate('cutting-size')} className="text-left hover:text-white cursor-pointer">
                03 Cutting &amp; Size
              </button>
              <button type="button" onClick={() => onNavigate('cara-order')} className="text-left hover:text-white cursor-pointer">
                04 {lang === 'id' ? 'Alur Order' : 'Process'}
              </button>
              <button type="button" onClick={() => onNavigate('order')} className="text-left text-white hover:text-[#FF2E00] cursor-pointer">
                05 Order Studio ↗
              </button>
            </div>

            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/[0.12] pt-3.5 font-mono text-[10px] text-white/50">
              <span>© 2008 – {new Date().getFullYear()} S08 KONVEKSI</span>
              <span>OEM · BANDUNG</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
