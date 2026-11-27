import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import {
  buildWhatsAppUrl,
  ORDER_STEPS,
  PageRoute,
  PRODUCTION_TERMS,
  S08_CONTACT,
} from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';

export const OrderFlowSection: React.FC<{ onNavigate?: (page: PageRoute) => void }> = ({
  onNavigate,
}) => {
  const { lang, t } = useLang();

  return (
    <section
      id="alur-order"
      className="relative bg-[#F7F5F0] pt-12 pb-20 md:pt-16 md:pb-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Header */}
          <div className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
                {lang === 'id' ? 'Index04 // Alur Pemesanan' : 'Index04 // Order Process'}
              </div>

              <h1 className="text-[clamp(34px,4.4vw,56px)] font-light leading-[1.06] tracking-[-0.04em] text-[#1B1B16]">
                {lang === 'id' ? 'Alur Pemesanan' : 'Production Process'}
              </h1>

              <p className="max-w-md text-[15px] leading-[1.68] text-[#59594E]">
                {lang === 'id'
                  ? 'Tujuh tahap terstruktur dari konsultasi desain hingga serah terima produksi di workshop Bandung.'
                  : 'Seven structured stages from initial design brief through final quality inspection and dispatch.'}
              </p>

              {/* Quiet Workshop Visit Block */}
              <div className="rounded-[18px] border border-[#1B1B16]/10 bg-white p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B8A7D]">
                  <MapPin className="h-3.5 w-3.5 text-[#1B1B16]" />
                  <span>{lang === 'id' ? 'Kunjungan Workshop' : 'Workshop Visit'}</span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#3E3E36]">
                  {S08_CONTACT.address}
                  <br />
                  <span className="text-[#7C7B6E]">{t(S08_CONTACT.operationalHours)}</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      lang === 'id'
                        ? 'Halo S08 Konveksi Bandung, saya ingin menjadwalkan kunjungan ke workshop Jl. Segar Dalam D 16.'
                        : 'Hello S08 Konveksi Bandung, I would like to schedule a workshop visit at Jl. Segar Dalam D 16.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soma-pill-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-medium"
                  >
                    <span>{lang === 'id' ? 'Jadwalkan Kunjungan' : 'Schedule Visit'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={S08_CONTACT.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-[#59594E] underline decoration-[#9D9C8F] underline-offset-4 hover:text-[#1B1B16]"
                  >
                    Google Maps
                  </a>
                </div>
              </div>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('order')}
                  className="font-mono text-[11.5px] text-[#1B1B16] underline decoration-[#1B1B16]/30 underline-offset-4 hover:decoration-[#1B1B16] cursor-pointer"
                >
                  {lang === 'id' ? '↳ Mulai Order Produksi' : '↳ Open Order Studio'}
                </button>
              )}
            </div>
          </div>

          {/* Right: 7 Concise Hairline Steps */}
          <div className="divide-y divide-[#1B1B16]/12 border-y border-[#1B1B16]/12 lg:col-span-7">
            {ORDER_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:gap-6"
              >
                <span className="w-8 shrink-0 font-mono text-[12px] text-[#8B8A7D]">
                  {step.number}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                      {t(step.title)}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9A998E]">
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[#59594E]">
                    {t(step.description)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Production Terms Grid */}
        <div className="mt-20 border-t border-[#1B1B16]/10 pt-14">
          <div className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
            {lang === 'id' ? 'Ketentuan Umum Produksi' : 'Production Terms'}
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-[#1B1B16]/12 bg-[#1B1B16]/10 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTION_TERMS.map((term) => (
              <div key={term.label.id} className="bg-white p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B8A7D]">
                  {t(term.label)}
                </div>
                <div className="mt-2 font-serif text-[21px] text-[#1B1B16]">
                  {t(term.value)}
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#59594E]">
                  {t(term.note)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
