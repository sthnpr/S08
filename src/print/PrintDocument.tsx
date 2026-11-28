import React, { useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { CompanyProfileDoc } from './CompanyProfileDoc';
import { OrderbookDoc } from './OrderbookDoc';

export type PrintDocKind = 'company-profile' | 'orderbook';

interface PrintDocumentProps {
  doc: PrintDocKind;
}

export const PrintDocument: React.FC<PrintDocumentProps> = ({ doc }) => {
  const { lang, setLang } = useLang();

  useEffect(() => {
    const hash = window.location.hash;
    const queryIdx = hash.indexOf('?');
    if (queryIdx !== -1) {
      const params = new URLSearchParams(hash.slice(queryIdx + 1));
      if (params.get('lang') === 'en') {
        setLang('en');
      } else if (params.get('lang') === 'id') {
        setLang('id');
      }
    }
  }, [setLang]);

  const switchDoc = (next: PrintDocKind) => {
    const suffix = lang === 'en' ? '?lang=en' : '';
    window.location.hash = `#/print/${next}${suffix}`;
  };

  return (
    <div className="min-h-screen bg-[#D8D5CC]">
      {/* Fixed Floating Toolbar (hidden on print) */}
      <div className="no-print fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="apple-liquid-glass flex flex-wrap items-center gap-2 rounded-full px-3 py-1.5 text-[#1B1B16]">
          <a
            href="#/"
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium text-[#1B1B16] transition-colors hover:bg-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Website</span>
          </a>

          <span className="relative z-10 h-4 w-px bg-[#1B1B16]/15" />

          <div className="relative z-10 flex items-center gap-1">
            <button
              type="button"
              onClick={() => switchDoc('company-profile')}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer ${
                doc === 'company-profile'
                  ? 'apple-liquid-active text-[#1B1B16]'
                  : 'text-[#4E4E45] hover:text-[#1B1B16]'
              }`}
            >
              Company Profile
            </button>
            <button
              type="button"
              onClick={() => switchDoc('orderbook')}
              className={`rounded-full px-3 py-1 text-[12px] font-medium transition-all cursor-pointer ${
                doc === 'orderbook'
                  ? 'apple-liquid-active text-[#1B1B16]'
                  : 'text-[#4E4E45] hover:text-[#1B1B16]'
              }`}
            >
              Orderbook
            </button>
          </div>

          <span className="relative z-10 h-4 w-px bg-[#1B1B16]/15" />

          {/* ID | EN Switch */}
          <div className="relative z-10 flex items-center gap-0.5 rounded-full bg-white/40 p-0.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`rounded-full px-2.5 py-1 cursor-pointer ${
                lang === 'id' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-full px-2.5 py-1 cursor-pointer ${
                lang === 'en' ? 'bg-[#1B1B16] text-white' : 'text-[#59594E]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="soma-pill-dark relative z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-medium cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>{lang === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}</span>
          </button>
        </div>
      </div>

      {/* Print Sheets Root */}
      <div className="print-root pt-20">
        {doc === 'company-profile' ? <CompanyProfileDoc /> : <OrderbookDoc />}
      </div>
    </div>
  );
};
