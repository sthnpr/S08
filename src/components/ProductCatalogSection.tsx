import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Layers, Scissors, Sparkles, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  PageRoute,
  PRODUCT_CATEGORIES,
  ProductCategoryId,
  ProductItem,
  PRODUCTS,
} from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

interface ProductCatalogSectionProps {
  activeCategory: ProductCategoryId;
  onChangeCategory: (cat: ProductCategoryId) => void;
  onLoadIntoBrief: (product: ProductItem) => void;
  onNavigate: (page: PageRoute) => void;
}

const CATEGORY_MOOD_BG: Record<Exclude<ProductCategoryId, 'all'>, { backdrop: string; code: string; accent: string }> = {
  outerwear: { backdrop: 'rgba(246, 240, 228, 0.88)', code: '01—OUTER', accent: '#C8672B' },
  bottoms: { backdrop: 'rgba(232, 239, 235, 0.88)', code: '02—BOTTOMS', accent: '#4C7A63' },
  knitwear: { backdrop: 'rgba(241, 237, 231, 0.88)', code: '03—KNIT', accent: '#8E6B47' },
  workwear: { backdrop: 'rgba(233, 237, 242, 0.88)', code: '04—SHIRT', accent: '#365470' },
  custom: { backdrop: 'rgba(239, 236, 229, 0.88)', code: '05—OEM', accent: '#1B1B16' },
};

export const ProductCatalogSection: React.FC<ProductCatalogSectionProps> = ({
  activeCategory,
  onChangeCategory,
  onLoadIntoBrief,
  onNavigate,
}) => {
  const { lang, t } = useLang();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts =
    activeCategory === 'all'
      ? [
          ...PRODUCTS.filter((p) => p.featured),
          ...PRODUCTS.filter((p) => !p.featured),
        ]
      : PRODUCTS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const selectedMood = selectedProduct
    ? CATEGORY_MOOD_BG[selectedProduct.category]
    : CATEGORY_MOOD_BG.outerwear;

  return (
    <section className="relative bg-[#F7F5F0] pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Minimalist Gallery Header — zero paragraph bloat */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#1B1B16]/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
              {lang === 'id' ? 'Index01 // Katalog Produksi' : 'Index01 // Production Catalog'}
            </div>
            <h1 className="mt-2 text-[clamp(34px,4.8vw,62px)] font-light leading-[1.04] tracking-[-0.04em] text-[#1B1B16]">
              {lang === 'id' ? 'Katalog Produk' : 'Product Catalog'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-[#7C7B6E]">
            <span>
              {filteredProducts.length} {lang === 'id' ? 'artikel' : 'styles'} · MOQ 24 pcs
            </span>
            <button
              type="button"
              onClick={() => onNavigate('bahan')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1B1B16]/15 bg-white px-4 py-2 text-[#1B1B16] transition-colors hover:border-[#1B1B16]/40 cursor-pointer"
            >
              <span>{lang === 'id' ? 'Bahan & Finishing' : 'Fabrics & Finishing'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Clean Filter Bar */}
        <div className="mt-7 flex flex-wrap items-center gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChangeCategory(cat.id)}
                className={`relative rounded-full px-4 py-2 text-[12.5px] font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-[#FCFCFA]' : 'text-[#59594E] hover:text-[#1B1B16]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="catalogCategoryPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#1B1B16]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{t(cat.label)}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? 'text-white/60' : 'text-[#9A998E]'
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Ultra-Clean Visual-First Product Grid (no paragraphs on cards!) */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedProduct(item)}
                className="group cursor-pointer"
              >
                <div className="crop-frame relative aspect-[4/4.3] w-full overflow-hidden rounded-none bg-[#EAE7DF]">
                  <img
                    src={item.image}
                    alt={t(item.name)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {item.tag && (
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-[#1B1B16]/85 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#F7F5F0] backdrop-blur-md">
                      {t(item.tag)}
                    </span>
                  )}
                  <span className="absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1B1B16] opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Minimal 2-Line Typography Below Image */}
                <div className="mt-3.5 flex items-baseline justify-between gap-3 px-0.5">
                  <h2 className="text-[16.5px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                    {t(item.name)}
                  </h2>
                  <span className="shrink-0 font-mono text-[10.5px] text-[#8B8A7D]">
                    {item.sizeRange}
                  </span>
                </div>
                <p className="mt-1 px-0.5 font-mono text-[11px] text-[#7C7B6E]">
                  {t(item.specLine)}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quiet Custom OEM Strip */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#1B1B16]/12 pt-8 sm:flex-row sm:items-center">
          <div className="text-[18px] font-normal tracking-[-0.02em] text-[#1B1B16]">
            {lang === 'id'
              ? 'Membutuhkan pola atau artikel di luar katalog standar?'
              : 'Developing a custom pattern outside the standard catalog?'}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('order')}
            className="soma-pill-dark inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium cursor-pointer"
          >
            <span>{lang === 'id' ? 'Mulai Order Custom' : 'Start Custom Order'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* MELIKE MOOD-SHIFTING RIGHT-HAND EDITORIAL SPEC SHEET */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setSelectedProduct(null)}
            style={{ backgroundColor: selectedMood.backdrop }}
            className="fixed inset-0 z-50 flex justify-end backdrop-blur-md transition-colors duration-500"
          >
            {/* Left Desktop Thumbnail Switcher */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="hidden h-full flex-1 flex-col items-center justify-center px-8 lg:flex"
            >
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#59594E]">
                {lang === 'id' ? 'Ganti Artikel' : 'Switch Style'}
              </div>

              <div className="grid max-w-md grid-cols-3 gap-3">
                {PRODUCTS.filter((p) => p.featured).slice(0, 9).map((p) => {
                  const active = p.id === selectedProduct.id;
                  const shortChip = t(p.name)
                    .split(/[(&,/]/)[0]
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .join(' ');
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className={`group flex flex-col items-center rounded-2xl p-2 transition-all duration-300 cursor-pointer ${
                        active
                          ? 'scale-105 bg-white shadow-[0_18px_36px_-14px_rgba(27,27,22,0.28)] ring-1 ring-[#1B1B16]/15'
                          : 'opacity-70 hover:opacity-100 hover:bg-white/60'
                      }`}
                    >
                      <div className="aspect-square w-20 overflow-hidden rounded-none bg-[#EAE7DF]">
                        <img
                          src={p.image}
                          alt={t(p.name)}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="mt-2 line-clamp-1 max-w-[90px] text-center font-mono text-[9.5px] text-[#1B1B16]">
                        {shortChip}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Editorial Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-full w-full max-w-[580px] flex-col overflow-y-auto bg-white shadow-[-24px_0_70px_-20px_rgba(27,27,22,0.22)] sm:rounded-l-[28px]"
            >
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1B1B16]/10 bg-white/95 px-6 py-4 backdrop-blur-md sm:px-8">
                <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: selectedMood.accent }}
                  />
                  <span>{t(selectedProduct.categoryLabel)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1B1B16]/15 text-[#1B1B16] hover:bg-[#F7F5F0] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 px-6 py-7 sm:px-9">
                <div className="text-center">
                  <div className="font-serif text-[42px] font-light leading-none tracking-[-0.03em] text-[#1B1B16] sm:text-[50px]">
                    {selectedMood.code}
                  </div>
                  <h3 className="mt-2.5 font-serif text-[26px] font-normal leading-tight text-[#1B1B16]">
                    {t(selectedProduct.name)}
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5 border-y border-[#1B1B16]/10 py-4 text-[12.5px]">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8B8A7D]">
                      {lang === 'id' ? 'Produksi' : 'Production'}
                    </div>
                    <div className="mt-1 font-medium text-[#1B1B16]">{t(selectedProduct.moq)}</div>
                    <div className="text-[#59594E]">
                      {selectedProduct.sizeRange} · {t(selectedProduct.leadTime)}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8B8A7D]">
                      Cutting
                    </div>
                    <div className="mt-1 leading-snug text-[#1B1B16]">
                      {selectedProduct.cuts.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-none bg-[#EAE7DF]">
                  <img
                    src={selectedProduct.image}
                    alt={t(selectedProduct.name)}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>

                <div className="mt-6 space-y-5">
                  <p className="text-[14px] leading-[1.65] text-[#3A3A32]">
                    {t(selectedProduct.shortDesc)}
                  </p>

                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                      <Layers className="h-3.5 w-3.5 text-[#1B1B16]" />
                      <span>{lang === 'id' ? 'Opsi Material' : 'Recommended Fabrics'}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedProduct.materials.map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-[#1B1B16]/12 bg-[#F7F5F0] px-3 py-1 font-mono text-[11px] text-[#1B1B16]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#1B1B16]/10 bg-[#F7F5F0]/80 p-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                      <Sparkles className="h-3.5 w-3.5 text-[#1B1B16]" />
                      <span>{lang === 'id' ? 'Opsi Custom' : 'Customization'}</span>
                    </div>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selectedProduct.customOptions.map((opt) => (
                        <li
                          key={opt.id}
                          className="flex items-center gap-2 text-[12.5px] text-[#2F2F28]"
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#1B1B16]" />
                          <span>{t(opt)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-[#111312] p-4.5 text-white">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#D4B144]">
                      <Scissors className="h-3.5 w-3.5" />
                      <span>{lang === 'id' ? 'Standar Workshop S08' : 'Workshop Standard'}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-[11px] text-white/80">
                      <div>
                        <div className="text-[#889090]">{lang === 'id' ? 'Toleransi Jahit' : 'Tolerance'}</div>
                        <div className="mt-0.5 text-white">± 1.0 – 1.5 cm</div>
                      </div>
                      <div>
                        <div className="text-[#889090]">{lang === 'id' ? 'Sampel Fisik' : 'Prototype'}</div>
                        <div className="mt-0.5 text-white">
                          {lang === 'id' ? '5–7 hari kerja' : '5–7 working days'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex flex-col gap-2.5 border-t border-[#1B1B16]/10 bg-white/95 px-6 py-4 backdrop-blur-md sm:flex-row sm:px-8">
                <button
                  type="button"
                  onClick={() => {
                    const chosen = selectedProduct;
                    setSelectedProduct(null);
                    onLoadIntoBrief(chosen);
                  }}
                  className="flex-1 rounded-full border border-[#1B1B16]/20 bg-[#F7F5F0] px-5 py-2.5 text-[13px] font-medium text-[#1B1B16] hover:bg-[#EAE7DF] cursor-pointer"
                >
                  {lang === 'id' ? 'Pilih untuk Order' : 'Configure Order'}
                </button>
                <a
                  href={buildWhatsAppUrl(
                    lang === 'id'
                      ? `Halo S08 Konveksi Bandung, saya ingin menanyakan penawaran produksi untuk artikel *${selectedProduct.name.id}*.`
                      : `Hello S08 Konveksi Bandung, I would like to request a quotation for *${selectedProduct.name.en}*.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="soma-pill-dark inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
