import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Phone, Printer, X } from 'lucide-react';
import { buildWhatsAppUrl, ORDER_STEPS, PRODUCTION_TERMS, S08_CONTACT } from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

interface CatalogProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const CatalogProfileModal: React.FC<CatalogProfileModalProps> = ({ open, onClose }) => {
  const { lang, t } = useLang();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#080A09]/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[22px] border border-[#1B1B16]/15 bg-[#F7F5F0] text-[#1B1B16] shadow-2xl"
          >
            <div className="no-print flex items-center justify-between border-b border-[#1B1B16]/10 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <img src="/brand/s08-logo-dark.png" alt="S08 Konveksi" className="h-5 w-auto" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                  Company Profile · S08 Konveksi
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1B1B16]/15 hover:bg-[#EFECE4] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-[#1B1B16]/12 pb-5 sm:flex-row sm:items-end">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8B8A7D]">
                    Company Profile &amp; Production Catalog
                  </div>
                  <h3 className="mt-1 font-serif text-[32px] leading-tight text-[#1B1B16]">
                    S08 Konveksi
                  </h3>
                  <p className="text-[13px] text-[#59594E]">
                    Garment &amp; Apparel Manufacturing — Bandung · Est. {S08_CONTACT.established}
                  </p>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-[#3B3B33]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{S08_CONTACT.shortAddress}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <span>WA {S08_CONTACT.whatsappDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#1B1B16]/10 bg-white p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                    {lang === 'id' ? 'Lini Produk' : 'Product Lines'}
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-[#2F2F28]">
                    <li>• Outerwear: Work Jacket, Varsity, Coach, Bomber, Parka, Denim</li>
                    <li>• Bottoms: Tailored Trousers, Chino, Sweatpants, Cargo</li>
                    <li>• Knitwear: Hoodie, Crewneck, Zip-Up, T-Shirt, Polo</li>
                    <li>• Shirts &amp; Uniforms: Workshirt, Flanel, PDH/PDL</li>
                    <li>• Private Label OEM: Custom Pattern &amp; Brand Kit</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-[#1B1B16]/10 bg-white p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                    {lang === 'id' ? 'Cutting, Material & Finishing' : 'Cutting, Fabrics & Trims'}
                  </div>
                  <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-[#2F2F28]">
                    <li>• Tops: Regular, Oversized, Boxy/Cropped, Custom</li>
                    <li>• Bottoms: Straight, Relaxed/Baggy, Tapered/Jogger, Custom</li>
                    <li>• Fabrics: Canvas, Semi-Wool, 330 gsm Fleece, Twill, Drill, Combed</li>
                    <li>• Craft: Plastisol, DTF, Discharge, Puff, Embroidery, Chenille</li>
                    <li>• OEM: Woven Label, Care Tag, Hangtag, Packaging</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-[#1B1B16]/10 bg-white p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#7C7B6E]">
                  {lang === 'id' ? 'Tahapan & Ketentuan' : 'Workflow & Terms'}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {ORDER_STEPS.map((st) => (
                    <span
                      key={st.number}
                      className="rounded-full bg-[#F7F5F0] px-2.5 py-1 font-mono text-[10px] text-[#1B1B16]"
                    >
                      {st.number}. {t(st.title)}
                    </span>
                  ))}
                </div>
                <div className="mt-3.5 grid grid-cols-2 gap-2.5 border-t border-[#1B1B16]/10 pt-3 font-mono text-[11px] sm:grid-cols-3">
                  {PRODUCTION_TERMS.slice(0, 3).map((term) => (
                    <div key={term.label.id}>
                      <div className="text-[9.5px] uppercase text-[#8B8A7D]">{t(term.label)}</div>
                      <div className="font-medium text-[#1B1B16]">{t(term.value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-mono text-[11px] text-[#6D6C60]">
                {lang === 'id' ? 'Klien:' : 'Selected Clients:'} <strong>Kapuyuwak</strong>,{' '}
                <strong>Redwear</strong>, &amp; Private Label Partners (2008–Present).
              </div>
            </div>

            <div className="no-print flex flex-col gap-2.5 border-t border-[#1B1B16]/10 bg-white px-6 py-4 sm:flex-row">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1B1B16]/20 bg-[#F7F5F0] px-5 py-2.5 text-[12.5px] font-medium text-[#1B1B16] hover:bg-[#EAE7DF] cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>{lang === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}</span>
              </button>
              <a
                href={buildWhatsAppUrl(
                  lang === 'id'
                    ? 'Halo S08 Konveksi Bandung, saya ingin meminta penawaran harga berdasarkan Company Profile S08.'
                    : 'Hello S08 Konveksi Bandung, I would like to request a quotation based on the S08 Company Profile.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="soma-pill-dark inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-medium"
              >
                <span>{lang === 'id' ? 'Minta Penawaran via WA' : 'Request Quotation'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
