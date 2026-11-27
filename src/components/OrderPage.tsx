import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  MATERIAL_GROUPS,
  MaterialItem,
  PRODUCT_CATEGORIES,
  ProductCategoryId,
  ProductItem,
  PRODUCTS,
  S08_CONTACT,
} from '../data/s08Data';
import { useLang } from '../i18n/LanguageContext';
import { DyedFabricSurface } from './DyedFabricSurface';

interface OrderPageProps {
  preselectedProduct: ProductItem | null;
  preselectedFabric?: string | null;
}

type SizeKey = 'S' | 'M' | 'L' | 'XL' | 'XXL';
const SIZE_KEYS: SizeKey[] = ['S', 'M', 'L', 'XL', 'XXL'];

interface OrderBagItem {
  uid: string;
  productName: string;
  productImage: string;
  cut: string;
  fabricName: string;
  colorLabel: string;
  colorHex: string;
  decoration: string;
  brandKit: string[];
  sizes: Record<SizeKey, number>;
  totalQty: number;
  needSample: boolean;
}

const TOP_CUTS = [
  { id: 'Boxy / Cropped Fit', label: 'Boxy / Cropped', desc: { id: 'Lebar dada lega, panjang pinggang', en: 'Wide chest, waist-line crop' } },
  { id: 'Oversized / Drop Shoulder', label: 'Oversized', desc: { id: 'Bahu turun, siluet relaks', en: 'Dropped shoulder, relaxed drape' } },
  { id: 'Regular Fit', label: 'Regular Fit', desc: { id: 'Proporsional harian & semi-formal', en: 'Balanced daily proportions' } },
  { id: 'Custom Pattern', label: 'Custom Pattern', desc: { id: 'Mengikuti sampel fisik / tech pack', en: 'Drafted from sample or tech pack' } },
];

const BOTTOM_CUTS = [
  { id: 'Relaxed / Baggy Fit', label: 'Relaxed / Baggy', desc: { id: 'Longgar dari paha ke bukaan kaki', en: 'Full relaxed volume to hem' } },
  { id: 'Straight / Regular Fit', label: 'Straight Fit', desc: { id: 'Lurus rapi & klasik', en: 'Clean straight tailored leg' } },
  { id: 'Tapered / Jogger Fit', label: 'Tapered / Jogger', desc: { id: 'Lega di paha, mengecil di bawah', en: 'Tapered ankle with or without rib' } },
  { id: 'Custom Pattern', label: 'Custom Pattern', desc: { id: 'Mengikuti celana contoh / tech pack', en: 'Drafted from reference trousers' } },
];

const DECORATIONS = [
  { id: 'Polos', label: { id: 'Polos (Tanpa Grafis)', en: 'Blank (No Graphic)' }, tag: 'CLEAN' },
  { id: 'Bordir Komputer', label: { id: 'Bordir Komputer', en: 'Computer Embroidery' }, tag: 'STITCH' },
  { id: 'Sablon Plastisol / Puff', label: { id: 'Sablon Plastisol / Puff', en: 'Plastisol / Puff Print' }, tag: 'INK' },
  { id: 'Sablon DTF / Discharge', label: { id: 'Sablon DTF / Discharge', en: 'DTF / Discharge Print' }, tag: 'SOFT' },
  { id: 'Bordir Chenille / Patch', label: { id: 'Chenille / Patch Emblem', en: 'Chenille / Patch' }, tag: '3D' },
];

const OEM_KITS = [
  { id: 'Woven Neck Label', label: { id: 'Woven Label', en: 'Woven Label' } },
  { id: 'Care Label & Size Tab', label: { id: 'Care Label & Size', en: 'Care & Size Tab' } },
  { id: 'Hangtag Brand', label: { id: 'Hangtag', en: 'Hangtag' } },
  { id: 'Custom Zipper / Kancing', label: { id: 'Custom Hardware', en: 'Custom Hardware' } },
  { id: 'Packaging Zip-Lock', label: { id: 'Zip-Lock Packing', en: 'Zip-Lock Packing' } },
];

const QTY_PRESETS = [24, 50, 100, 250, 500];

function distributeQty(total: number): Record<SizeKey, number> {
  const weights = [0.12, 0.28, 0.32, 0.2, 0.08];
  const raw = weights.map((w) => Math.floor(total * w));
  let diff = total - raw.reduce((a, b) => a + b, 0);
  const order = [2, 1, 3, 0, 4];
  let i = 0;
  while (diff > 0) {
    raw[order[i % order.length]] += 1;
    diff -= 1;
    i += 1;
  }
  return { S: raw[0], M: raw[1], L: raw[2], XL: raw[3], XXL: raw[4] };
}

const CutMiniIcon: React.FC<{ cutId: string; isBottom: boolean }> = ({ cutId, isBottom }) => {
  if (isBottom) {
    const wide = cutId.includes('Baggy');
    const tapered = cutId.includes('Tapered');
    return (
      <svg viewBox="0 0 36 36" className="h-6 w-6 shrink-0" fill="none">
        <path
          d={
            wide
              ? 'M10 6H26L30 31H21L18 16L15 31H6L10 6Z'
              : tapered
                ? 'M11 6H25L27 16L23 31H19L18 16L17 31H13L9 16L11 6Z'
                : 'M11 6H25L27 31H20L18 16L16 31H9L11 6Z'
          }
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  const boxy = cutId.includes('Boxy');
  const over = cutId.includes('Oversized');
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6 shrink-0" fill="none">
      <path
        d={
          boxy
            ? 'M14 7Q18 10 22 7L30 11L32 23L27 24L26 15V26H10V15L9 24L4 23L6 11L14 7Z'
            : over
              ? 'M14 7Q18 10 22 7L31 12L33 26L28 27L26 16V30H10V16L8 27L3 26L5 12L14 7Z'
              : 'M14 7Q18 10 22 7L28 11L30 24L26 25L24 15V29H12V15L10 25L6 24L8 11L14 7Z'
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OrderPage: React.FC<OrderPageProps> = ({
  preselectedProduct,
  preselectedFabric,
}) => {
  const { lang, t } = useLang();

  // Ordered showcase products (featured unique photos first)
  const orderedProducts = useMemo(
    () => [
      ...PRODUCTS.filter((p) => p.featured),
      ...PRODUCTS.filter((p) => !p.featured),
    ],
    []
  );

  const [catFilter, setCatFilter] = useState<ProductCategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(
    preselectedProduct ?? orderedProducts[0]
  );

  const isBottoms = selectedProduct.category === 'bottoms';
  const availableCuts = isBottoms ? BOTTOM_CUTS : TOP_CUTS;
  const [selectedCut, setSelectedCut] = useState<string>(availableCuts[0].id);

  // Pull matching fabrics from MATERIAL_GROUPS for the chosen product category
  const fabricChoices: MaterialItem[] = useMemo(() => {
    const groupMap: Record<Exclude<ProductCategoryId, 'all'>, string[]> = {
      outerwear: ['outerwear-fabric'],
      bottoms: ['bottoms-fabric', 'fleece-terry'],
      knitwear: ['fleece-terry', 'tops-fabric'],
      workwear: ['tops-fabric', 'outerwear-fabric'],
      custom: ['outerwear-fabric', 'bottoms-fabric', 'fleece-terry'],
    };
    const ids = groupMap[selectedProduct.category];
    const collected: MaterialItem[] = [];
    const seen = new Set<string>();
    for (const gid of ids) {
      const grp = MATERIAL_GROUPS.find((g) => g.id === gid);
      if (!grp) continue;
      for (const item of grp.items) {
        if (!seen.has(item.name)) {
          seen.add(item.name);
          collected.push(item);
        }
      }
    }
    return collected.slice(0, 6);
  }, [selectedProduct.category]);

  const [selectedFabric, setSelectedFabric] = useState<MaterialItem>(fabricChoices[0]);
  const [selectedColor, setSelectedColor] = useState<{ label: string; hex: string }>(
    fabricChoices[0].colorOptions[0]
  );
  const [customFabricNote, setCustomFabricNote] = useState<string | null>(null);
  const [decoration, setDecoration] = useState<string>(DECORATIONS[1].id);
  const [brandKit, setBrandKit] = useState<string[]>(['Woven Neck Label', 'Hangtag Brand']);
  const [sizes, setSizes] = useState<Record<SizeKey, number>>(() => distributeQty(50));
  const [needSample, setNeedSample] = useState<boolean>(true);

  // Multi-item Order Bag
  const [orderBag, setOrderBag] = useState<OrderBagItem[]>([]);
  const [addedToast, setAddedToast] = useState(false);

  // Client Details
  const [brandName, setBrandName] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync preselectedProduct when arriving from Catalog
  useEffect(() => {
    if (!preselectedProduct) return;
    setSelectedProduct(preselectedProduct);
    setCatFilter('all');
  }, [preselectedProduct]);

  // Sync preselectedFabric when arriving from Fabrics Studio
  useEffect(() => {
    if (!preselectedFabric) return;
    setCustomFabricNote(preselectedFabric);
    // Try matching against all fabric groups
    for (const grp of MATERIAL_GROUPS) {
      for (const item of grp.items) {
        if (preselectedFabric.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])) {
          setSelectedFabric(item);
          const matchedColor = item.colorOptions.find((c) =>
            preselectedFabric.toLowerCase().includes(c.label.toLowerCase())
          );
          setSelectedColor(matchedColor ?? item.colorOptions[0]);
          return;
        }
      }
    }
  }, [preselectedFabric]);

  // Keep cut & fabric aligned when product category switches
  useEffect(() => {
    const nextCuts = selectedProduct.category === 'bottoms' ? BOTTOM_CUTS : TOP_CUTS;
    if (!nextCuts.some((c) => c.id === selectedCut)) {
      setSelectedCut(nextCuts[0].id);
    }
    if (!fabricChoices.some((f) => f.name === selectedFabric.name)) {
      setSelectedFabric(fabricChoices[0]);
      setSelectedColor(fabricChoices[0].colorOptions[0]);
    }
  }, [selectedProduct, fabricChoices, selectedCut, selectedFabric.name]);

  const visibleProducts =
    catFilter === 'all'
      ? orderedProducts.slice(0, 8)
      : orderedProducts.filter((p) => p.category === catFilter);

  const currentQty = SIZE_KEYS.reduce((sum, k) => sum + sizes[k], 0);
  const bagQty = orderBag.reduce((sum, item) => sum + item.totalQty, 0);
  const grandTotalQty = orderBag.length > 0 ? bagQty : currentQty;

  const updateSize = (k: SizeKey, delta: number) => {
    setSizes((prev) => ({ ...prev, [k]: Math.max(0, prev[k] + delta) }));
  };

  const toggleKit = (id: string) => {
    setBrandKit((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const buildCurrentItem = (): OrderBagItem => ({
    uid: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    productName: t(selectedProduct.name),
    productImage: selectedProduct.image,
    cut: selectedCut,
    fabricName: customFabricNote ?? selectedFabric.name,
    colorLabel: selectedColor.label,
    colorHex: selectedColor.hex,
    decoration,
    brandKit: [...brandKit],
    sizes: { ...sizes },
    totalQty: Math.max(1, currentQty),
    needSample,
  });

  const handleAddToBag = () => {
    const item = buildCurrentItem();
    setOrderBag((prev) => [...prev, item]);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const removeBagItem = (uid: string) => {
    setOrderBag((prev) => prev.filter((item) => item.uid !== uid));
  };

  const activeItemsForSubmit = orderBag.length > 0 ? orderBag : [buildCurrentItem()];

  const leadTimeLabel =
    lang === 'id'
      ? grandTotalQty >= 250
        ? needSample ? '21 – 28 hari kerja' : '18 – 24 hari kerja'
        : needSample ? '16 – 22 hari kerja' : '12 – 18 hari kerja'
      : grandTotalQty >= 250
        ? needSample ? '21 – 28 working days' : '18 – 24 working days'
        : needSample ? '16 – 22 working days' : '12 – 18 working days';

  const formattedOrderText = useMemo(() => {
    const header =
      lang === 'id'
        ? `Halo S08 Konveksi Bandung, saya ingin mengajukan pesanan produksi berikut:`
        : `Hello S08 Konveksi Bandung, I would like to submit the following production order:`;

    const clientMeta = [
      brandName.trim() ? `• ${lang === 'id' ? 'Merek / Instansi' : 'Brand / Org'}: ${brandName.trim()}` : null,
      city.trim() ? `• ${lang === 'id' ? 'Kota Pengiriman' : 'Shipping City'}: ${city.trim()}` : null,
    ].filter(Boolean);

    const itemsBlock = activeItemsForSubmit.map((it, idx) => {
      const sizeStr = SIZE_KEYS.filter((k) => it.sizes[k] > 0)
        .map((k) => `${k}:${it.sizes[k]}`)
        .join(', ');
      return [
        `${idx + 1}. *${it.productName}* — ${it.totalQty} pcs`,
        `   - Cutting: ${it.cut}`,
        `   - ${lang === 'id' ? 'Bahan & Warna' : 'Fabric & Color'}: ${it.fabricName} (${it.colorLabel})`,
        `   - ${lang === 'id' ? 'Aplikasi' : 'Decoration'}: ${it.decoration}`,
        `   - ${lang === 'id' ? 'Ukuran' : 'Sizes'}: ${sizeStr || `${it.totalQty} pcs`}`,
        `   - OEM: ${it.brandKit.length > 0 ? it.brandKit.join(', ') : 'Standard'}`,
        `   - ${lang === 'id' ? 'Sampel' : 'Sample'}: ${it.needSample ? (lang === 'id' ? 'Ya' : 'Yes') : (lang === 'id' ? 'Langsung Massal' : 'Direct Bulk')}`,
      ].join('\n');
    });

    const footer = [
      notes.trim() ? `\n${lang === 'id' ? 'Catatan' : 'Notes'}: ${notes.trim()}` : null,
      `\n${lang === 'id' ? 'Total Estimasi' : 'Total Quantity'}: *${grandTotalQty} pcs*`,
      lang === 'id'
        ? `Mohon informasi penawaran harga dan ketersediaan slot produksi. Terima kasih.`
        : `Please advise quotation and workshop production schedule. Thank you.`,
    ].filter(Boolean);

    return [header, '', ...clientMeta, clientMeta.length ? '' : null, ...itemsBlock, ...footer]
      .filter((x) => x !== null)
      .join('\n');
  }, [activeItemsForSubmit, brandName, city, grandTotalQty, lang, notes]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedOrderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative bg-[#F7F5F0] pt-10 pb-24 text-[#1B1B16] md:pt-14 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Clean Editorial Order Studio Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#1B1B16]/10 pb-7 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#8B8A7D]">
              {lang === 'id' ? 'Index05 // Order Studio' : 'Index05 // Order Studio'}
            </div>
            <h1 className="mt-2 text-[clamp(34px,4.8vw,60px)] font-light leading-[1.04] tracking-[-0.04em] text-[#1B1B16]">
              {lang === 'id' ? 'Order Produksi' : 'Configure Your Order'}
            </h1>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-[#6D6C60]">
            <span>MOQ 24 pcs / {lang === 'id' ? 'artikel' : 'style'}</span>
            <span className="text-[#C8C6BC]">·</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1B1B16]/12 bg-white px-3 py-1 text-[#1B1B16]">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>
                {orderBag.length > 0
                  ? `${orderBag.length} ${lang === 'id' ? 'artikel' : 'styles'} · ${bagQty} pcs`
                  : `${currentQty} pcs`}
              </span>
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* IMMERSIVE SPLIT-SCREEN VISUAL CONFIGURATOR                          */}
        {/* =================================================================== */}
        <div className="mt-9 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: STICKY LIVE VISUAL GARMENT STAGE (5 COLS) */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="overflow-hidden rounded-t-none rounded-b-[20px] border border-[#1B1B16]/12 bg-white shadow-[0_24px_55px_-30px_rgba(27,27,22,0.22)]">
              {/* Large Live Product Studio Preview */}
              <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-none bg-[#EAE7DF]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProduct.id}
                    src={selectedProduct.image}
                    alt={t(selectedProduct.name)}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* Top Floating Apple Liquid Glass Spec Chips */}
                <div className="absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="apple-liquid-glass rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#11110E]">
                    {selectedCut}
                  </span>
                  <span className="rounded-full bg-[#1B1B16]/85 px-3 py-1 font-mono text-[10px] text-[#F7F5F0] backdrop-blur-md">
                    {currentQty} PCS
                  </span>
                </div>

                {/* Bottom Floating Live Tactile Fabric & Color Swatch Card */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <DyedFabricSurface
                      textureImg={selectedFabric.textureImg}
                      hex={selectedColor.hex}
                      className="h-9 w-9 shrink-0 rounded-none border border-black/15 shadow-xs"
                    />
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-[#1B1B16]">
                        {customFabricNote ?? selectedFabric.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#7C7B6E]">
                        {selectedColor.label} · {selectedFabric.spec}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-[#59594E]">
                    {decoration.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Compact Stage Summary + Add Another Style Button */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B8A7D]">
                      {t(selectedProduct.categoryLabel)}
                    </div>
                    <h2 className="mt-0.5 font-serif text-[25px] leading-tight text-[#1B1B16]">
                      {t(selectedProduct.name)}
                    </h2>
                  </div>
                  <div className="text-right font-mono text-[10.5px] text-[#59594E]">
                    <div>{lang === 'id' ? 'Estimasi' : 'Lead time'}</div>
                    <div className="font-medium text-[#1B1B16]">{leadTimeLabel}</div>
                  </div>
                </div>

                {/* Live Size Breakdown Preview Bar */}
                <div className="mt-4 grid grid-cols-5 gap-1.5 rounded-xl bg-[#F7F5F0] p-2 text-center font-mono text-[11px]">
                  {SIZE_KEYS.map((sz) => (
                    <div key={sz} className="rounded-lg bg-white py-1.5">
                      <div className="text-[9.5px] text-[#8B8A7D]">{sz}</div>
                      <div className="font-semibold text-[#1B1B16]">{sizes[sz]}</div>
                    </div>
                  ))}
                </div>

                {/* Add to multi-item order bag */}
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#1B1B16]/18 bg-[#F7F5F0] py-2.5 text-[12.5px] font-medium text-[#1B1B16] transition-colors hover:border-[#1B1B16] hover:bg-[#EFECE4] cursor-pointer"
                >
                  {addedToast ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#4F7D56]" />
                      <span>
                        {lang === 'id' ? 'Ditambahkan ke Daftar Order' : 'Added to Order List'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" />
                      <span>
                        {lang === 'id'
                          ? 'Simpan & Tambah Artikel Lain'
                          : 'Save & Add Another Style'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: TACTILE VISUAL CONFIGURATOR STEPS (7 COLS) */}
          <div className="space-y-10 lg:col-span-7">
            {/* STEP 01: VISUAL GARMENT PICKER (NO DROPDOWN!) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-[#8B8A7D]">01</span>
                  <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                    {lang === 'id' ? 'Pilih Produk' : 'Select Garment'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  {PRODUCT_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCatFilter(c.id)}
                      className={`rounded-full px-2.5 py-1 font-mono text-[10px] transition-colors cursor-pointer ${
                        catFilter === c.id
                          ? 'bg-[#1B1B16] text-white'
                          : 'bg-[#EFECE4] text-[#59594E] hover:text-[#1B1B16]'
                      }`}
                    >
                      {t(c.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {visibleProducts.map((prod) => {
                  const active = prod.id === selectedProduct.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        setSelectedProduct(prod);
                        setCustomFabricNote(null);
                      }}
                      className={`group overflow-hidden rounded-none border text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white shadow-md'
                          : 'border-[#1B1B16]/10 bg-white text-[#1B1B16] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <div className="aspect-[4/3.6] w-full overflow-hidden rounded-none bg-[#EAE7DF]">
                        <img
                          src={prod.image}
                          alt={t(prod.name)}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2.5">
                        <div className="line-clamp-1 text-[12px] font-medium">
                          {t(prod.name)}
                        </div>
                        <div
                          className={`mt-0.5 font-mono text-[9.5px] ${
                            active ? 'text-white/65' : 'text-[#8B8A7D]'
                          }`}
                        >
                          {t(prod.categoryLabel)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 02: VISUAL SILHOUETTE / CUTTING PICKER */}
            <div className="border-t border-[#1B1B16]/10 pt-8">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] text-[#8B8A7D]">02</span>
                <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                  {lang === 'id' ? 'Pilih Cutting & Siluet' : 'Select Silhouette'}
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {availableCuts.map((c) => {
                  const active = selectedCut === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCut(c.id)}
                      className={`flex items-center gap-3.5 rounded-[16px] border p-4 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-white text-[#1B1B16] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          active ? 'bg-white/12 text-[#F3FFC9]' : 'bg-[#F7F5F0] text-[#1B1B16]'
                        }`}
                      >
                        <CutMiniIcon cutId={c.id} isBottom={isBottoms} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium">{c.label}</div>
                        <div
                          className={`mt-0.5 text-[11.5px] ${
                            active ? 'text-white/70' : 'text-[#7C7B6E]'
                          }`}
                        >
                          {t(c.desc)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 03: TACTILE FABRIC & DYE COLOR PICKER */}
            <div className="border-t border-[#1B1B16]/10 pt-8">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-[#8B8A7D]">03</span>
                  <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                    {lang === 'id' ? 'Pilih Bahan & Warna' : 'Select Fabric & Colorway'}
                  </h3>
                </div>
                <span className="font-mono text-[10.5px] text-[#7C7B6E]">
                  {selectedColor.label}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3">
                {fabricChoices.map((fab) => {
                  const active = fab.name === selectedFabric.name && !customFabricNote;
                  return (
                    <button
                      key={fab.name}
                      type="button"
                      onClick={() => {
                        setCustomFabricNote(null);
                        setSelectedFabric(fab);
                        setSelectedColor(fab.colorOptions[0]);
                      }}
                      className={`flex items-center gap-3 rounded-[14px] border p-3 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-white text-[#1B1B16] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <DyedFabricSurface
                        textureImg={fab.textureImg}
                        hex={active ? selectedColor.hex : fab.swatch}
                        className={`h-9 w-9 shrink-0 rounded-none border ${
                          active ? 'border-white/30' : 'border-black/15'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium">{fab.name}</div>
                        <div
                          className={`font-mono text-[10px] ${
                            active ? 'text-[#D4B144]' : 'text-[#8B8A7D]'
                          }`}
                        >
                          {fab.spec}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Dye Color Swatches */}
              <div className="mt-3.5 flex flex-wrap items-center gap-2 rounded-2xl border border-[#1B1B16]/10 bg-white p-3">
                <span className="px-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8B8A7D]">
                  {lang === 'id' ? 'Warna:' : 'Color:'}
                </span>
                {selectedFabric.colorOptions.map((c) => {
                  const active = c.hex === selectedColor.hex;
                  return (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-[#F7F5F0] text-[#4E4E45] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 04: DECORATION & OEM BRAND KIT */}
            <div className="border-t border-[#1B1B16]/10 pt-8">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] text-[#8B8A7D]">04</span>
                <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                  {lang === 'id' ? 'Sablon, Bordir & Label Merek' : 'Decoration & OEM Labels'}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {DECORATIONS.map((dec) => {
                  const active = decoration === dec.id;
                  return (
                    <button
                      key={dec.id}
                      type="button"
                      onClick={() => setDecoration(dec.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition-all cursor-pointer ${
                        active
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-white text-[#4E4E45] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      <span
                        className={`font-mono text-[9.5px] ${
                          active ? 'text-[#D4B144]' : 'text-[#8B8A7D]'
                        }`}
                      >
                        {dec.tag}
                      </span>
                      <span>{t(dec.label)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {OEM_KITS.map((kit) => {
                  const selected = brandKit.includes(kit.id);
                  return (
                    <button
                      key={kit.id}
                      type="button"
                      onClick={() => toggleKit(kit.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-all cursor-pointer ${
                        selected
                          ? 'border-[#1B1B16] bg-[#EFECE4] text-[#1B1B16]'
                          : 'border-[#1B1B16]/12 bg-white text-[#7C7B6E] hover:text-[#1B1B16]'
                      }`}
                    >
                      {selected && <Check className="h-3 w-3 text-[#1B1B16]" />}
                      <span>{t(kit.label)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 05: INTERACTIVE QUANTITY & S–XXL SIZE BREAKDOWN */}
            <div className="border-t border-[#1B1B16]/10 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-[#8B8A7D]">05</span>
                  <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                    {lang === 'id' ? 'Jumlah & Pembagian Ukuran' : 'Quantity & Size Breakdown'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QTY_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSizes(distributeQty(preset))}
                      className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-all cursor-pointer ${
                        currentQty === preset
                          ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                          : 'border-[#1B1B16]/12 bg-white text-[#59594E] hover:border-[#1B1B16]/35'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                {SIZE_KEYS.map((sz) => (
                  <div
                    key={sz}
                    className="flex flex-col items-center rounded-[16px] border border-[#1B1B16]/12 bg-white p-3"
                  >
                    <span className="font-mono text-[11px] font-semibold text-[#1B1B16]">
                      {sz}
                    </span>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateSize(sz, -1)}
                        aria-label={`Kurangi ukuran ${sz}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1B1B16]/15 text-[#1B1B16] hover:bg-[#F7F5F0] cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-[13.5px] font-semibold">
                        {sizes[sz]}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateSize(sz, 1)}
                        aria-label={`Tambah ukuran ${sz}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1B1B16]/15 text-[#1B1B16] hover:bg-[#F7F5F0] cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 06: SAMPLE, CLIENT INFO & OBSIDIAN ORDER DOCKET */}
            <div className="border-t border-[#1B1B16]/10 pt-8">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] text-[#8B8A7D]">06</span>
                <h3 className="text-[19px] font-medium tracking-[-0.02em] text-[#1B1B16]">
                  {lang === 'id' ? 'Sampel & Informasi Pemesan' : 'Sample & Order Details'}
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setNeedSample(true)}
                  className={`rounded-[14px] border p-3.5 text-left transition-all cursor-pointer ${
                    needSample
                      ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                      : 'border-[#1B1B16]/12 bg-white text-[#1B1B16]'
                  }`}
                >
                  <div className="text-[13.5px] font-medium">
                    {lang === 'id' ? 'Dengan Sampel Fisik' : 'With Physical Sample'}
                  </div>
                  <div className={`mt-0.5 font-mono text-[10.5px] ${needSample ? 'text-white/65' : 'text-[#8B8A7D]'}`}>
                    {lang === 'id' ? '5–7 hari kerja sebelum massal' : '5–7 days prior to bulk'}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setNeedSample(false)}
                  className={`rounded-[14px] border p-3.5 text-left transition-all cursor-pointer ${
                    !needSample
                      ? 'border-[#1B1B16] bg-[#1B1B16] text-white'
                      : 'border-[#1B1B16]/12 bg-white text-[#1B1B16]'
                  }`}
                >
                  <div className="text-[13.5px] font-medium">
                    {lang === 'id' ? 'Langsung Produksi Massal' : 'Direct Bulk Production'}
                  </div>
                  <div className={`mt-0.5 font-mono text-[10.5px] ${!needSample ? 'text-white/65' : 'text-[#8B8A7D]'}`}>
                    {lang === 'id' ? 'Untuk repeat order / pola baku' : 'For repeat runs or standard blocks'}
                  </div>
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder={lang === 'id' ? 'Nama Merek / Instansi' : 'Brand / Organization Name'}
                  className="rounded-[12px] border border-[#1B1B16]/15 bg-white px-4 py-3 text-[13.5px] text-[#1B1B16] placeholder:text-[#8B8A7D] focus:border-[#1B1B16] focus:outline-none"
                />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={lang === 'id' ? 'Kota Pengiriman (mis. Jakarta)' : 'Shipping Destination'}
                  className="rounded-[12px] border border-[#1B1B16]/15 bg-white px-4 py-3 text-[13.5px] text-[#1B1B16] placeholder:text-[#8B8A7D] focus:border-[#1B1B16] focus:outline-none"
                />
              </div>

              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === 'id'
                    ? 'Catatan tambahan, target tanggal selesai, atau link mockup / tech pack...'
                    : 'Additional notes, target deadline, or mockup / tech pack link...'
                }
                className="mt-3 w-full rounded-[12px] border border-[#1B1B16]/15 bg-white px-4 py-3 text-[13.5px] text-[#1B1B16] placeholder:text-[#8B8A7D] focus:border-[#1B1B16] focus:outline-none"
              />

              {/* OBSIDIAN ORDER SUMMARY DOCKET */}
              <div className="mt-6 rounded-[22px] bg-[#111210] p-6 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 font-mono text-[11px]">
                  <span className="text-[#F3FFC9]">
                    {lang === 'id' ? 'RINGKASAN ORDER S08' : 'S08 ORDER DOCKET'}
                  </span>
                  <span className="text-white/55">
                    {grandTotalQty} PCS · {leadTimeLabel}
                  </span>
                </div>

                {/* Multi-Item List if bag has items, otherwise current item */}
                <div className="mt-4 space-y-3">
                  {activeItemsForSubmit.map((item) => (
                    <div
                      key={item.uid}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="h-12 w-12 shrink-0 rounded-none object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-medium text-white">
                            {item.productName}
                          </div>
                          <div className="truncate font-mono text-[10.5px] text-white/60">
                            {item.cut} · {item.fabricName} ({item.colorLabel})
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono text-[12px] font-semibold text-[#F3FFC9]">
                          {item.totalQty} pcs
                        </span>
                        {orderBag.length > 0 && (
                          <button
                            type="button"
                            onClick={() => removeBagItem(item.uid)}
                            aria-label="Hapus artikel"
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={buildWhatsAppUrl(formattedOrderText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FCFCFA] px-5 py-3.5 text-[13px] font-semibold text-[#111210] transition-transform hover:scale-[1.01]"
                  >
                    <span>
                      {lang === 'id'
                        ? `Kirim Order ke WhatsApp (${S08_CONTACT.whatsappDisplay})`
                        : `Submit Order via WhatsApp (${S08_CONTACT.whatsappDisplay})`}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3.5 font-mono text-[12px] text-white/85 hover:bg-white/12 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#91CFB5]" />
                        <span className="text-[#91CFB5]">{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
