import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Menu, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl, PageRoute, S08_CONTACT } from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenCatalogModal: () => void;
}

const NAV_PAGES: { page: PageRoute; id: string; en: string }[] = [
  { page: 'home', id: 'Beranda', en: 'Home' },
  { page: 'produk', id: 'Katalog', en: 'Catalog' },
  { page: 'bahan', id: 'Bahan', en: 'Fabrics' },
  { page: 'cutting-size', id: 'Cutting & Size', en: 'Cutting & Size' },
  { page: 'cara-order', id: 'Alur Order', en: 'Process & FAQ' },
  { page: 'order', id: 'Order', en: 'Order' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenCatalogModal,
}) => {
  const { lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [glassSheenX, setGlassSheenX] = useState<number | null>(null);

  const isHome = currentPage === 'home';

  useEffect(() => {
    if (!isHome) {
      setPastHero(true);
      return;
    }

    const handleScroll = () => {
      const heroEl = document.getElementById('home-hero');
      const threshold = heroEl
        ? heroEl.offsetHeight - 48
        : window.innerHeight - 48;
      setPastHero(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHome]);

  const handleNavClick = (page: PageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlassSheenX(((e.clientX - rect.left) / rect.width) * 100);
  };

  const waMessage =
    lang === 'id'
      ? 'Halo S08 Konveksi Bandung, saya ingin berkonsultasi mengenai produksi pakaian.'
      : 'Hello S08 Konveksi Bandung, I would like to inquire about garment manufacturing.';

  const isVisible = !isHome || pastHero;

  return (
    <>
      {/* Transparent floating top dock so Apple Liquid Glass capsules refract live scrolling content beneath them! */}
      <motion.header
        initial={false}
        animate={
          isVisible
            ? { y: 0, opacity: 1 }
            : { y: '-120%', opacity: 0 }
        }
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className={`no-print z-40 w-full py-3.5 ${
          isHome ? 'fixed top-0 inset-x-0' : 'sticky top-0'
        } ${isVisible ? 'pointer-events-none' : 'pointer-events-none'}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 md:px-8">
          {/* Left: Floating Liquid Glass Brand Capsule */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`apple-liquid-glass group flex items-center gap-3 rounded-full px-4 py-2 text-left transition-transform duration-300 hover:scale-[1.02] cursor-pointer ${
              isVisible ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <img
              src="/brand/s08-logo-dark.png"
              alt="S08 Konveksi"
              className="relative z-10 h-5 w-auto object-contain md:h-6"
            />
            <span className="relative z-10 hidden h-3.5 w-px bg-[#1B1B16]/18 sm:block" />
            <span className="relative z-10 hidden font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#35352E] sm:inline">
              Bandung · 2008
            </span>
          </button>

          {/* Center: APPLE LIQUID GLASS Floating Segmented Navigation Pill */}
          <nav
            aria-label="Primary Navigation"
            onMouseMove={handleNavMouseMove}
            onMouseLeave={() => setGlassSheenX(null)}
            className={`apple-liquid-glass relative hidden items-center gap-0.5 overflow-hidden rounded-full p-1.5 lg:flex ${
              isVisible ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Dynamic specular refraction light glide following cursor inside Liquid Glass */}
            {glassSheenX !== null && (
              <span
                style={{
                  background: `radial-gradient(120px circle at ${glassSheenX}% 50%, rgba(255,255,255,0.62), transparent 72%)`,
                }}
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
              />
            )}

            {NAV_PAGES.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] tracking-[-0.01em] transition-colors cursor-pointer xl:px-4 ${
                    isActive
                      ? 'font-semibold text-[#11110E]'
                      : 'font-medium text-[#2A2A24]/80 hover:text-[#11110E]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 28,
                        mass: 0.85,
                      }}
                      className="apple-liquid-active absolute inset-0 rounded-full"
                    />
                  )}
                  <span className="relative z-10">{lang === 'id' ? item.id : item.en}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Matching Liquid Glass Controls + WhatsApp */}
          <div
            className={`flex items-center gap-2 ${
              isVisible ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div
              role="group"
              aria-label="Language switcher"
              className="apple-liquid-glass inline-flex items-center rounded-full p-1 font-mono text-[10.5px]"
            >
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`relative z-10 rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'apple-liquid-active font-semibold text-[#11110E]'
                    : 'text-[#3A3A32]/80 hover:text-[#11110E]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`relative z-10 rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'apple-liquid-active font-semibold text-[#11110E]'
                    : 'text-[#3A3A32]/80 hover:text-[#11110E]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenCatalogModal}
              className="apple-liquid-glass hidden items-center gap-1.5 rounded-full px-3.5 py-2 font-mono text-[11px] font-medium text-[#22221C] transition-transform hover:scale-[1.03] md:inline-flex cursor-pointer"
            >
              <FileText className="relative z-10 h-3.5 w-3.5 stroke-[1.6]" />
              <span className="relative z-10">PDF</span>
            </button>

            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="soma-pill-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium tracking-[-0.01em]"
            >
              <MessageCircle className="h-3.5 w-3.5 stroke-[1.65]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="apple-liquid-glass inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1B1B16] lg:hidden cursor-pointer"
            >
              <Menu className="relative z-10 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-50 bg-[#080A09]/65 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col justify-between border-l border-white/10 bg-[#080A09] p-6 text-white"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <img
                    src="/brand/s08-logo-light.png"
                    alt="S08 Konveksi"
                    className="h-6 w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1">
                  {NAV_PAGES.map((item, idx) => {
                    const active = currentPage === item.page;
                    return (
                      <button
                        key={item.page}
                        type="button"
                        onClick={() => handleNavClick(item.page)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[16px] font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-white text-[#080A09]'
                            : 'text-white/85 hover:bg-white/[0.07]'
                        }`}
                      >
                        <span>{lang === 'id' ? item.id : item.en}</span>
                        <span
                          className={`font-mono text-[11px] ${
                            active ? 'text-[#080A09]/60' : 'text-[#7D8585]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenCatalogModal();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-3 font-mono text-[12px] text-white cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Company Profile PDF</span>
                </button>
                <a
                  href={buildWhatsAppUrl(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[13.5px] font-semibold text-[#080A09]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{S08_CONTACT.whatsappDisplay}</span>
                </a>
                <p className="text-center font-mono text-[10px] text-[#7D8585]">
                  {S08_CONTACT.shortAddress}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
