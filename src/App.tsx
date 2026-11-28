import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CatalogProfileModal } from './components/CatalogProfileModal';
import { CuttingSizeSection } from './components/CuttingSizeSection';
import { ClosingFooter, FaqSection } from './components/FaqAndClosingFooter';
import { HomePage } from './components/HomePage';
import { MaterialsLoupeSection } from './components/MaterialsLoupeSection';
import { Navbar } from './components/Navbar';
import { OrderFlowSection } from './components/OrderFlowAndPortfolioSection';
import { OrderPage } from './components/OrderPage';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { PageRoute, ProductCategoryId, ProductItem } from './data/s08Data';
import { LanguageProvider } from './i18n/LanguageContext';
import { PrintDocKind, PrintDocument } from './print/PrintDocument';

const VALID_PAGES: PageRoute[] = [
  'home',
  'produk',
  'bahan',
  'cutting-size',
  'cara-order',
  'order',
];

function getPrintDocFromHash(): PrintDocKind | null {
  const pathOnly = window.location.hash.split('?')[0].replace(/^#\/?/, '').trim();
  if (pathOnly === 'print/company-profile') return 'company-profile';
  if (pathOnly === 'print/orderbook') return 'orderbook';
  return null;
}

function getPageFromHash(): PageRoute {
  const raw = window.location.hash.split('?')[0].replace(/^#\/?/, '').trim();
  if (raw === 'brief') return 'order';
  if (VALID_PAGES.includes(raw as PageRoute)) {
    return raw as PageRoute;
  }
  return 'home';
}

function AppShell() {
  const [printDoc, setPrintDoc] = useState<PrintDocKind | null>(() => getPrintDocFromHash());
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => getPageFromHash());
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>('all');
  const [orderProduct, setOrderProduct] = useState<ProductItem | null>(null);
  const [orderFabric, setOrderFabric] = useState<string | null>(null);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setPrintDoc(getPrintDocFromHash());
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (printDoc) {
    return <PrintDocument doc={printDoc} />;
  }

  const navigateTo = (page: PageRoute) => {
    const nextHash = page === 'home' ? '#/' : `#/${page}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCategory = (category: ProductCategoryId) => {
    setActiveCategory(category);
    navigateTo('produk');
  };

  const handleLoadIntoOrder = (product: ProductItem) => {
    setOrderProduct(product);
    navigateTo('order');
  };

  const handleUseFabricInOrder = (fabricName: string) => {
    setOrderFabric(fabricName);
    navigateTo('order');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1B1B16]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenCatalogModal={() => setCatalogModalOpen(true)}
      />

      {/* z-10 opaque curtain sheet peeling upward to unveil the sticky OLED #000000 footer beneath */}
      <main className="relative z-10 bg-[#F7F5F0] shadow-[0_32px_90px_rgba(0,0,0,0.55)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                onNavigateCategory={handleNavigateCategory}
              />
            )}

            {currentPage === 'produk' && (
              <ProductCatalogSection
                activeCategory={activeCategory}
                onChangeCategory={setActiveCategory}
                onLoadIntoBrief={handleLoadIntoOrder}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'bahan' && (
              <MaterialsLoupeSection
                onUseFabricInBrief={handleUseFabricInOrder}
              />
            )}

            {currentPage === 'cutting-size' && (
              <CuttingSizeSection onNavigate={navigateTo} />
            )}

            {currentPage === 'cara-order' && (
              <>
                <OrderFlowSection onNavigate={navigateTo} />
                <FaqSection />
              </>
            )}

            {currentPage === 'order' && (
              <OrderPage
                preselectedProduct={orderProduct}
                preselectedFabric={orderFabric}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ClosingFooter
        onNavigate={navigateTo}
        onOpenCatalogModal={() => setCatalogModalOpen(true)}
      />

      <CatalogProfileModal
        open={catalogModalOpen}
        onClose={() => setCatalogModalOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

export default App;
