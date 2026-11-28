import { BiText } from '../i18n/LanguageContext';

export const S08_CONTACT = {
  brandName: 'S08 Konveksi',
  established: 2008,
  address: 'Jl. Segar Dalam D 16, Bandung, Jawa Barat',
  shortAddress: 'Jl. Segar Dalam D 16, Bandung',
  whatsappDisplay: '0813-2227-5719',
  whatsappNumber: '6281322275719',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Segar+Dalam+D+16,+Bandung',
  operationalHours: {
    id: 'Senin – Sabtu · 08.30 – 17.00 WIB',
    en: 'Monday – Saturday · 08.30 – 17.00 WIB',
  },
};

export type PageRoute =
  | 'home'
  | 'produk'
  | 'bahan'
  | 'cutting-size'
  | 'cara-order'
  | 'order';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${S08_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type ProductCategoryId =
  | 'all'
  | 'outerwear'
  | 'bottoms'
  | 'knitwear'
  | 'workwear'
  | 'custom';

export interface ProductItem {
  id: string;
  name: BiText;
  category: Exclude<ProductCategoryId, 'all'>;
  categoryLabel: BiText;
  image: string;
  specLine: BiText;
  shortDesc: BiText;
  cuts: string[];
  materials: string[];
  customOptions: BiText[];
  moq: BiText;
  leadTime: BiText;
  sizeRange: string;
  featured?: boolean;
  tag?: BiText;
}

export const PRODUCT_CATEGORIES: { id: ProductCategoryId; label: BiText; code: string }[] = [
  { id: 'all', label: { id: 'Semua', en: 'All' }, code: '00' },
  { id: 'outerwear', label: { id: 'Outerwear & Jaket', en: 'Outerwear' }, code: '01' },
  { id: 'bottoms', label: { id: 'Bawahan', en: 'Bottoms' }, code: '02' },
  { id: 'knitwear', label: { id: 'Atasan & Knitwear', en: 'Knitwear & Tees' }, code: '03' },
  { id: 'workwear', label: { id: 'Kemeja & Seragam', en: 'Shirts & Uniforms' }, code: '04' },
  { id: 'custom', label: { id: 'Custom OEM', en: 'Private Label' }, code: '05' },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'work-jacket',
    name: { id: 'Work Jacket Kanvas', en: 'Canvas Work Jacket' },
    category: 'outerwear',
    categoryLabel: { id: 'Outerwear & Jaket', en: 'Outerwear' },
    image: '/images/cat-outerwear.jpg',
    specLine: { id: 'Kanvas 10–14 oz · Boxy / Regular · Min. 24 pcs', en: '10–14 oz Canvas · Boxy / Regular · MOQ 24' },
    shortDesc: {
      id: 'Jaket kerja berstruktur dengan opsi kerah corduroy, furing pilihan, dan jahitan double-needle.',
      en: 'Structured canvas work jacket with optional corduroy collar, lining, and double-needle seams.',
    },
    cuts: ['Boxy / Cropped Fit', 'Regular Fit', 'Custom Pattern'],
    materials: ['Kanvas Marsoto', 'Baby Canvas', 'American Drill', 'Corduroy'],
    customOptions: [
      { id: 'Furing katun atau quilting', en: 'Cotton or quilted lining' },
      { id: 'Resleting YKK / metal', en: 'YKK / metal zipper' },
      { id: 'Bordir komputer', en: 'Precision embroidery' },
      { id: 'Woven label & hangtag', en: 'Woven label & hangtag' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
    tag: { id: 'Utama', en: 'Core' },
  },
  {
    id: 'varsity-jacket',
    name: { id: 'Varsity Jacket', en: 'Varsity Jacket' },
    category: 'outerwear',
    categoryLabel: { id: 'Outerwear & Jaket', en: 'Outerwear' },
    image: '/images/cat-varsity-coach.jpg',
    specLine: { id: 'Wool Melton / Fleece · Chenille Ready · Min. 24 pcs', en: 'Melton Wool / Fleece · Chenille Ready · MOQ 24' },
    shortDesc: {
      id: 'Kombinasi badan wool atau fleece dengan lengan kulit sintetis, rib tebal, dan aplikasi chenille.',
      en: 'Wool or heavy fleece body paired with contrast sleeves, dense knit trim, and chenille work.',
    },
    cuts: ['Boxy / Cropped Fit', 'Oversized', 'Regular Fit'],
    materials: ['Cotton Fleece Heavy', 'Wool Melton', 'Faux Leather', 'Kanvas'],
    customOptions: [
      { id: 'Bordir handuk / chenille', en: 'Chenille / towel embroidery' },
      { id: 'Kancing snap custom', en: 'Custom snap buttons' },
      { id: 'Furing quilting dakron', en: 'Quilted interior lining' },
      { id: 'Rib garis custom', en: 'Custom stripe knit rib' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
  },
  {
    id: 'coach-jacket',
    name: { id: 'Coach Jacket', en: 'Coach Jacket' },
    category: 'outerwear',
    categoryLabel: { id: 'Outerwear & Jaket', en: 'Outerwear' },
    image: '/images/cat-outerwear.jpg',
    specLine: { id: 'Taslan / Parasut · Snap Button · Min. 24 pcs', en: 'Taslan / Nylon · Snap Closure · MOQ 24' },
    shortDesc: {
      id: 'Outerwear ringan tahan angin dengan kancing snap, tali serut bawah, dan furing breathable.',
      en: 'Lightweight wind-resistant outer with snap closure, hem drawcord, and breathable lining.',
    },
    cuts: ['Oversized / Drop Shoulder', 'Regular Fit'],
    materials: ['Taslan', 'Parasut Crinkle', 'Despo', 'Kanvas Ringan'],
    customOptions: [
      { id: 'Sablon plastisol / DTF', en: 'Plastisol / DTF print' },
      { id: 'Furing jaring / katun', en: 'Mesh or cotton lining' },
      { id: 'Stopper tali custom', en: 'Custom cord stoppers' },
      { id: 'Woven neck label', en: 'Woven neck label' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '12–18 hari kerja', en: '12–18 working days' },
    sizeRange: 'S – XXL / Custom',
  },
  {
    id: 'bomber-parka',
    name: { id: 'Bomber, Parka & Windbreaker', en: 'Bomber, Parka & Windbreaker' },
    category: 'outerwear',
    categoryLabel: { id: 'Outerwear & Jaket', en: 'Outerwear' },
    image: '/images/cat-varsity-coach.jpg',
    specLine: { id: 'Taslan Waterproof / Drill · Utility · Min. 24 pcs', en: 'Water-Repellent Taslan / Drill · MOQ 24' },
    shortDesc: {
      id: 'Jaket harian dan cuaca dingin dengan saku lengan utilitas, furing dakron opsional, dan patch.',
      en: 'Everyday and weatherproof silhouettes with sleeve utility pockets and optional insulation.',
    },
    cuts: ['Regular Fit', 'Boxy Fit', 'Custom Pattern'],
    materials: ['Taslan Waterproof', 'Parasut Micro', 'Drill', 'Fleece'],
    customOptions: [
      { id: 'Lapisan anti-air ringan', en: 'Water-repellent finish' },
      { id: 'Saku lengan resleting', en: 'Zipped sleeve pocket' },
      { id: 'Patch emblem bordir', en: 'Embroidered patch emblem' },
      { id: 'Resleting waterproof', en: 'Waterproof zipper' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXL / Custom',
  },
  {
    id: 'denim-daily-jacket',
    name: { id: 'Jaket Denim & Jaket Harian', en: 'Denim & Daily Jacket' },
    category: 'outerwear',
    categoryLabel: { id: 'Outerwear & Jaket', en: 'Outerwear' },
    image: '/images/cat-outerwear.jpg',
    specLine: { id: 'Denim 12–14 oz / Corduroy · Bartack · Min. 24 pcs', en: '12–14 oz Denim / Corduroy · MOQ 24' },
    shortDesc: {
      id: 'Jaket denim raw atau washed dengan penguat bartack, jahitan kontras, dan kancing rivet.',
      en: 'Raw or enzyme-washed denim outerwear with bartack reinforcement and metal hardware.',
    },
    cuts: ['Boxy / Cropped Fit', 'Regular Fit', 'Custom Pattern'],
    materials: ['Denim 12–14 oz', 'Corduroy', 'Kanvas', 'Twill'],
    customOptions: [
      { id: 'Bio-wash / garment wash', en: 'Bio-wash / garment wash' },
      { id: 'Kancing rivet custom', en: 'Custom metal tack buttons' },
      { id: 'Benang kontras', en: 'Contrast topstitching' },
      { id: 'Patch kulit / woven', en: 'Leather / woven patch' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–24 hari kerja', en: '14–24 working days' },
    sizeRange: 'S – XXL / Custom',
  },
  {
    id: 'celana-bahan-trousers',
    name: { id: 'Celana Bahan (Trousers / Chino)', en: 'Tailored Trousers & Chinos' },
    category: 'bottoms',
    categoryLabel: { id: 'Bawahan', en: 'Bottoms' },
    image: '/images/cat-bottoms.jpg',
    specLine: { id: 'Semi-Wool / Twill · Straight / Baggy · Min. 24 pcs', en: 'Semi-Wool / Twill · Straight / Baggy · MOQ 24' },
    shortDesc: {
      id: 'Celana bahan dengan drape jatuh rapi, opsi lipit depan (pleats), saku bobok bersih, dan obras halus.',
      en: 'Clean-draping trousers with optional front pleats, welt pockets, and refined internal overlock.',
    },
    cuts: ['Straight / Regular Fit', 'Relaxed / Baggy Fit', 'Tapered Fit'],
    materials: ['Semi-Wool', 'Cotton Twill', 'American / Nagata Drill'],
    customOptions: [
      { id: 'Lipit tunggal / ganda (pleats)', en: 'Single or double front pleats' },
      { id: 'Pinggang karet atau kancing', en: 'Elasticated or tailored waistband' },
      { id: 'Saku bobok belakang', en: 'Back welt pockets' },
      { id: 'Resleting YKK', en: 'YKK fly zipper' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXL / 28–38',
    featured: true,
    tag: { id: 'Spesialisasi', en: 'Specialty' },
  },
  {
    id: 'sweatpants',
    name: { id: 'Sweatpants Heavyweight', en: 'Heavyweight Sweatpants' },
    category: 'bottoms',
    categoryLabel: { id: 'Bawahan', en: 'Bottoms' },
    image: '/images/cat-bottoms.jpg',
    specLine: { id: 'Fleece 280–330 gsm · Baggy / Jogger · Min. 24 pcs', en: '280–330 gsm Fleece · Baggy / Jogger · MOQ 24' },
    shortDesc: {
      id: 'Potongan baggy open-hem maupun jogger rib dengan pinggang elastis kokoh dan tali katun.',
      en: 'Wide open-hem or ribbed-cuff silhouettes with structured elastic waistband and cotton drawcord.',
    },
    cuts: ['Relaxed / Baggy Fit', 'Tapered / Jogger Fit', 'Straight Fit'],
    materials: ['Cotton Fleece 280–330 gsm', 'Baby Terry', 'CVC Fleece'],
    customOptions: [
      { id: 'Open hem atau karet rib', en: 'Open hem or ribbed cuff' },
      { id: 'Eyelet & aglet metal', en: 'Metal eyelets & aglets' },
      { id: 'Bordir / sablon puff', en: 'Embroidery or puff print' },
      { id: 'Saku resleting tersembunyi', en: 'Concealed zip pockets' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '12–18 hari kerja', en: '12–18 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
  },
  {
    id: 'cargo-shorts',
    name: { id: 'Cargo Pants & Celana Pendek', en: 'Cargo Pants & Shorts' },
    category: 'bottoms',
    categoryLabel: { id: 'Bawahan', en: 'Bottoms' },
    image: '/images/cat-bottoms.jpg',
    specLine: { id: 'Ripstop / Twill · Saku 3D · Min. 24 pcs', en: 'Ripstop / Twill · Utility Pockets · MOQ 24' },
    shortDesc: {
      id: 'Celana cargo berkonstruksi bartack dan celana pendek harian dengan saku utilitas proporsional.',
      en: 'Reinforced utility cargo trousers and casual shorts with gusseted pockets.',
    },
    cuts: ['Relaxed / Baggy Fit', 'Straight / Regular Fit', 'Custom Pattern'],
    materials: ['Ripstop', 'Twill Cotton', 'American Drill', 'Baby Terry'],
    customOptions: [
      { id: 'Saku cargo 3D', en: '3D gusset cargo pockets' },
      { id: 'Drawstring bukaan kaki', en: 'Hem cinch drawcord' },
      { id: 'Penguat jahitan bartack', en: 'Bartack stress reinforcement' },
      { id: 'Woven label pinggang', en: 'Waistband woven label' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXL / Custom',
  },
  {
    id: 'hoodie-heavyweight',
    name: { id: 'Hoodie & Zip-Up Hoodie', en: 'Heavyweight & Zip-Up Hoodie' },
    category: 'knitwear',
    categoryLabel: { id: 'Atasan & Knitwear', en: 'Knitwear & Tees' },
    image: '/images/cat-knitwear.jpg',
    specLine: { id: 'Cotton Fleece 280–330 gsm · Drop Shoulder · Min. 24 pcs', en: '280–330 gsm Fleece · Drop Shoulder · MOQ 24' },
    shortDesc: {
      id: 'Hoodie pullover dan zip-up dengan tudung dua lapis, bahu jatuh, dan rib elastis rapat.',
      en: 'Pullover and two-way zip hoodies with double-lined hood, dropped shoulder, and dense rib trim.',
    },
    cuts: ['Oversized / Drop Shoulder', 'Boxy / Cropped Fit', 'Regular Fit'],
    materials: ['Cotton Fleece 330 gsm', 'Cotton Fleece 280 gsm', 'Baby Terry', 'CVC Fleece'],
    customOptions: [
      { id: 'Tudung double-layer', en: 'Double-layered hood' },
      { id: 'Resleting metal dua arah', en: 'Two-way metal zipper' },
      { id: 'Sablon plastisol / puff', en: 'Plastisol / puff print' },
      { id: 'Bordir komputer', en: 'Computer embroidery' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '12–18 hari kerja', en: '12–18 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
    tag: { id: '330 GSM', en: '330 GSM' },
  },
  {
    id: 'crewneck-sweater',
    name: { id: 'Crewneck / Sweater', en: 'Crewneck Sweatshirt' },
    category: 'knitwear',
    categoryLabel: { id: 'Atasan & Knitwear', en: 'Knitwear & Tees' },
    image: '/images/cat-knitwear.jpg',
    specLine: { id: 'Fleece / Baby Terry · Boxy / Oversized · Min. 24 pcs', en: 'Fleece / Baby Terry · Boxy / Oversized · MOQ 24' },
    shortDesc: {
      id: 'Sweater crewneck berproporsi rapi dengan rib leher tebal dan jahitan overdeck bersih.',
      en: 'Clean-proportioned crewneck with dense collar rib and neat flatlock or overdeck seams.',
    },
    cuts: ['Oversized / Drop Shoulder', 'Boxy Fit', 'Regular Fit'],
    materials: ['Cotton Fleece', 'Baby Terry', 'CVC Fleece'],
    customOptions: [
      { id: 'Rib leher 2.5–3 cm', en: '2.5–3 cm structured neck rib' },
      { id: 'Jahitan overdeck / flatlock', en: 'Overdeck / flatlock seams' },
      { id: 'Bordir komputer / chenille', en: 'Embroidery or chenille' },
      { id: 'Care label & size tab', en: 'Care label & size tab' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '12–18 hari kerja', en: '12–18 working days' },
    sizeRange: 'S – XXL / Custom',
  },
  {
    id: 'kaos-tshirt-polo',
    name: { id: 'Kaos (T-Shirt) & Polo Shirt', en: 'T-Shirts & Polo Shirts' },
    category: 'knitwear',
    categoryLabel: { id: 'Atasan & Knitwear', en: 'Knitwear & Tees' },
    image: '/images/cat-tshirt-heavy.jpg',
    specLine: { id: 'Combed 20s/24s/30s · Heavyweight 235+ gsm · Min. 24 pcs', en: '20s/24s/30s Combed · 235+ gsm Heavy · MOQ 24' },
    shortDesc: {
      id: 'Kaos katun combed murni, heavyweight boxy tee, hingga polo pique berkerah stabil.',
      en: 'Pure combed cotton tees, heavyweight boxy silhouettes, and cotton pique polo shirts.',
    },
    cuts: ['Boxy / Heavyweight', 'Oversized / Drop Shoulder', 'Regular Fit'],
    materials: ['Cotton Combed 20s/24s/30s', 'Cotton Heavyweight 235+ gsm', 'Lacoste Pique'],
    customOptions: [
      { id: 'Sablon plastisol / discharge / DTF', en: 'Plastisol / discharge / DTF' },
      { id: 'Rib kerah tinggi 2.5 cm', en: '2.5 cm mock-neck rib' },
      { id: 'Bordir dada presisi', en: 'Chest logo embroidery' },
      { id: 'Label leher satin / woven', en: 'Satin / woven neck label' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '10–14 hari kerja', en: '10–14 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
  },
  {
    id: 'workshirt',
    name: { id: 'Kemeja Kerja (Workshirt) & Flanel', en: 'Workshirts & Flannels' },
    category: 'workwear',
    categoryLabel: { id: 'Kemeja & Seragam', en: 'Shirts & Uniforms' },
    image: '/images/cat-workshirt.jpg',
    specLine: { id: 'Nagata Drill / Oxford / Flanel · Boxy / Regular · Min. 24 pcs', en: 'Drill / Oxford / Flannel · MOQ 24' },
    shortDesc: {
      id: 'Kemeja kerja utilitas dan flanel dengan konstruksi yoke rapi, saku dada, dan bordir tajam.',
      en: 'Utilitarian workshirts and brushed flannels with reinforced yoke, chest pockets, and clean embroidery.',
    },
    cuts: ['Boxy Fit', 'Regular Fit', 'Custom Pattern'],
    materials: ['American / Nagata Drill', 'Cotton Oxford', 'Flanel Katun', 'Kanvas Ringan'],
    customOptions: [
      { id: 'Saku dada + slot pena', en: 'Twin chest pockets + pen slot' },
      { id: 'Bordir logo presisi', en: 'Precision logo embroidery' },
      { id: 'Kancing matte / horn', en: 'Matte or horn buttons' },
      { id: 'Jahitan rantai samping', en: 'Side chainstitching' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–18 hari kerja', en: '14–18 working days' },
    sizeRange: 'S – XXL / Custom',
    featured: true,
  },
  {
    id: 'pdh-pdl-seragam',
    name: { id: 'Kemeja PDH / PDL & Jaket Komunitas', en: 'Corporate Uniforms & Field Shirts' },
    category: 'workwear',
    categoryLabel: { id: 'Kemeja & Seragam', en: 'Shirts & Uniforms' },
    image: '/images/cat-workshirt.jpg',
    specLine: { id: 'Drill / Ripstop · Bordir Instansi · S–XXXL', en: 'Drill / Ripstop · Custom Embroidery · S–XXXL' },
    shortDesc: {
      id: 'Seragam kantor, instansi, lapangan, dan jaket organisasi dengan penomoran ukuran lengkap.',
      en: 'Corporate shirts, field uniforms, and organization outerwear with extended sizing.',
    },
    cuts: ['Regular Fit', 'Custom Pattern'],
    materials: ['Nagata Drill', 'American Drill', 'Ripstop', 'Taslan / Fleece'],
    customOptions: [
      { id: 'Bordir logo instansi & nama', en: 'Institutional emblem & name stitch' },
      { id: 'Ventilasi punggung / skotlet', en: 'Back vent / reflective tape' },
      { id: 'Patch velcro', en: 'Velcro patch panel' },
      { id: 'Sortir & kemas per ukuran', en: 'Sorted packing by size' },
    ],
    moq: { id: 'Min. 24 pcs / artikel', en: 'MOQ 24 pcs / style' },
    leadTime: { id: '14–21 hari kerja', en: '14–21 working days' },
    sizeRange: 'S – XXXL / Custom',
  },
  {
    id: 'custom-vest-oem',
    name: { id: 'Vest, Tote Bag & Private Label OEM', en: 'Utility Vest & Private Label OEM' },
    category: 'custom',
    categoryLabel: { id: 'Custom OEM', en: 'Private Label' },
    image: '/images/cat-custom-oem.jpg',
    specLine: { id: 'Pengembangan Pola Baru · Tech Pack · Full Label Kit', en: 'Bespoke Pattern · Tech Pack · Full Label Kit' },
    shortDesc: {
      id: 'Produksi artikel khusus di luar katalog standar berdasarkan sampel fisik atau tech pack Anda.',
      en: 'Bespoke garment manufacturing developed directly from physical samples or technical packs.',
    },
    cuts: ['Custom Pattern', 'Boxy Fit', 'Regular Fit'],
    materials: ['Ripstop', 'Kanvas Heavy', 'Taslan', 'Custom Sourcing'],
    customOptions: [
      { id: 'Pembuatan pola baru', en: 'New pattern & grading' },
      { id: 'Woven label, care label, hangtag', en: 'Woven label, care label & hangtag' },
      { id: 'Hardware & zipper custom', en: 'Custom hardware & pullers' },
      { id: 'Kemasan khusus brand', en: 'Branded packaging' },
    ],
    moq: { id: 'Sesuai spesifikasi artikel', en: 'Tailored per style' },
    leadTime: { id: '14–24 hari kerja', en: '14–24 working days' },
    sizeRange: 'Custom Grading',
    featured: true,
    tag: { id: 'OEM', en: 'OEM' },
  },
];

export interface CuttingOption {
  id: string;
  group: 'tops' | 'bottoms';
  name: BiText;
  shortName: string;
  status: BiText;
  silhouette: BiText;
  recommended: string[];
  fitMetrics: {
    shoulder: BiText;
    body: BiText;
    length: BiText;
  };
}

export const CUTTING_OPTIONS: CuttingOption[] = [
  {
    id: 'top-regular',
    group: 'tops',
    name: { id: 'Regular Fit', en: 'Regular Fit' },
    shortName: 'Regular',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Potongan proporsional mengikuti garis tubuh untuk pemakaian harian maupun semi-formal.',
      en: 'Balanced proportions following natural body lines for daily and semi-formal wear.',
    },
    recommended: ['Jaket', 'Kemeja', 'Kaos', 'Sweater'],
    fitMetrics: {
      shoulder: { id: 'Garis bahu standar', en: 'Natural shoulder seam' },
      body: { id: 'Proporsional', en: 'Balanced torso' },
      length: { id: 'Garis pinggul', en: 'Standard hip length' },
    },
  },
  {
    id: 'top-oversized',
    group: 'tops',
    name: { id: 'Oversized / Drop Shoulder', en: 'Oversized / Drop Shoulder' },
    shortName: 'Oversized',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Garis bahu lebih turun dengan lingkar dada dan lengan lebih lega untuk siluet kasual.',
      en: 'Dropped shoulder seam with generous chest volume and relaxed sleeve drape.',
    },
    recommended: ['Hoodie', 'Crewneck', 'Kaos', 'Coach Jacket'],
    fitMetrics: {
      shoulder: { id: 'Drop shoulder (+4–6 cm)', en: 'Dropped (+4–6 cm)' },
      body: { id: 'Lega & relaks', en: 'Generous drape' },
      length: { id: 'Sedikit lebih panjang', en: 'Slightly extended' },
    },
  },
  {
    id: 'top-boxy',
    group: 'tops',
    name: { id: 'Boxy / Cropped Fit', en: 'Boxy / Cropped Fit' },
    shortName: 'Boxy Crop',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Lebar dada lebih luas dengan panjang badan sedikit lebih pendek di garis pinggang.',
      en: 'Wider chest block paired with a cleaner, slightly cropped waist hem.',
    },
    recommended: ['Work Jacket', 'Varsity', 'Heavyweight Tee'],
    fitMetrics: {
      shoulder: { id: 'Bahu lebar tegas', en: 'Wide structured shoulder' },
      body: { id: 'Lebar kotak', en: 'Wide boxy chest' },
      length: { id: 'Cropped garis pinggang', en: 'Waist-line crop' },
    },
  },
  {
    id: 'top-custom',
    group: 'tops',
    name: { id: 'Custom Pattern', en: 'Custom Pattern' },
    shortName: 'Custom',
    status: { id: 'Custom', en: 'Bespoke' },
    silhouette: {
      id: 'Pola dibuat khusus mengikuti sampel fisik atau lembar spesifikasi teknis (tech pack) klien.',
      en: 'Dedicated pattern block drafted from your physical sample or technical pack.',
    },
    recommended: ['Seluruh Kategori Atasan'],
    fitMetrics: {
      shoulder: { id: 'Sesuai tech pack', en: 'Per tech pack' },
      body: { id: 'Grading khusus merek', en: 'Brand-exclusive block' },
      length: { id: 'Sesuai spesifikasi', en: 'Custom length' },
    },
  },
  {
    id: 'bot-straight',
    group: 'bottoms',
    name: { id: 'Straight / Regular Fit', en: 'Straight / Regular Fit' },
    shortName: 'Straight',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Potongan lurus dari paha hingga bukaan kaki untuk tampilan klasik dan rapi.',
      en: 'Consistent straight leg from thigh to hem for a classic, tailored drape.',
    },
    recommended: ['Celana Bahan', 'Chino', 'Cargo'],
    fitMetrics: {
      shoulder: { id: 'Mid / high waist', en: 'Mid to high rise' },
      body: { id: 'Paha proporsional', en: 'Balanced thigh' },
      length: { id: 'Bukaan lurus (20–22 cm)', en: 'Straight hem (20–22 cm)' },
    },
  },
  {
    id: 'bot-baggy',
    group: 'bottoms',
    name: { id: 'Relaxed / Baggy Fit', en: 'Relaxed / Baggy Fit' },
    shortName: 'Baggy',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Ruang gerak lebih longgar dari paha sampai ujung kaki dengan jatuhan kain natural.',
      en: 'Full volume from thigh to hem with unhurried, fluid fabric drape.',
    },
    recommended: ['Sweatpants', 'Trousers Pleats', 'Cargo'],
    fitMetrics: {
      shoulder: { id: 'Opsi pleats depan', en: 'Pleat-ready waist' },
      body: { id: 'Paha lega', en: 'Full relaxed thigh' },
      length: { id: 'Bukaan lebar (23–26 cm)', en: 'Wide opening (23–26 cm)' },
    },
  },
  {
    id: 'bot-tapered',
    group: 'bottoms',
    name: { id: 'Tapered / Jogger Fit', en: 'Tapered / Jogger Fit' },
    shortName: 'Tapered',
    status: { id: 'Tersedia', en: 'Available' },
    silhouette: {
      id: 'Lega pada bagian paha dan mengecil rapi ke arah pergelangan, dengan atau tanpa rib.',
      en: 'Comfortable thigh volume tapering cleanly toward the ankle, with or without rib.',
    },
    recommended: ['Sweatpants Jogger', 'Modern Trousers'],
    fitMetrics: {
      shoulder: { id: 'Pinggang karet / kancing', en: 'Elastic or tailored' },
      body: { id: 'Mengecil ke betis', en: 'Tapered lower leg' },
      length: { id: 'Cuff / tapered (14–17 cm)', en: 'Tapered / rib (14–17 cm)' },
    },
  },
  {
    id: 'bot-custom',
    group: 'bottoms',
    name: { id: 'Custom Pattern', en: 'Custom Pattern' },
    shortName: 'Custom',
    status: { id: 'Custom', en: 'Bespoke' },
    silhouette: {
      id: 'Menyesuaikan contoh celana fisik atau spesifikasi pola khusus dari klien.',
      en: 'Drafted directly from your reference trousers or custom measurement sheet.',
    },
    recommended: ['Seluruh Kategori Bawahan'],
    fitMetrics: {
      shoulder: { id: 'Pinggang & rise custom', en: 'Custom waist & rise' },
      body: { id: 'Sesuai sampel fisik', en: 'Per physical sample' },
      length: { id: 'Bukaan kaki custom', en: 'Custom opening' },
    },
  },
];

export interface SizeRowTop {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  chest: number;
  length: number;
  sleeve: number;
  shoulder: number;
}

export interface SizeRowBottom {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  waist: string;
  length: number;
  thigh: number;
  opening: number;
}

export const SIZE_CHARTS_TOPS: Record<'regular' | 'oversized' | 'boxy', SizeRowTop[]> = {
  regular: [
    { size: 'S', chest: 50, length: 67, sleeve: 60, shoulder: 44 },
    { size: 'M', chest: 53, length: 70, sleeve: 62, shoulder: 46 },
    { size: 'L', chest: 56, length: 72, sleeve: 64, shoulder: 48 },
    { size: 'XL', chest: 59, length: 75, sleeve: 65, shoulder: 50 },
    { size: 'XXL', chest: 62, length: 77, sleeve: 66, shoulder: 52 },
  ],
  oversized: [
    { size: 'S', chest: 56, length: 70, sleeve: 58, shoulder: 52 },
    { size: 'M', chest: 59, length: 72, sleeve: 60, shoulder: 55 },
    { size: 'L', chest: 62, length: 75, sleeve: 61, shoulder: 58 },
    { size: 'XL', chest: 65, length: 77, sleeve: 63, shoulder: 60 },
    { size: 'XXL', chest: 68, length: 80, sleeve: 64, shoulder: 62 },
  ],
  boxy: [
    { size: 'S', chest: 57, length: 63, sleeve: 59, shoulder: 51 },
    { size: 'M', chest: 60, length: 65, sleeve: 61, shoulder: 53 },
    { size: 'L', chest: 63, length: 67, sleeve: 62, shoulder: 56 },
    { size: 'XL', chest: 66, length: 69, sleeve: 64, shoulder: 58 },
    { size: 'XXL', chest: 69, length: 71, sleeve: 65, shoulder: 60 },
  ],
};

export const SIZE_CHARTS_BOTTOMS: Record<'straight' | 'baggy' | 'tapered', SizeRowBottom[]> = {
  straight: [
    { size: 'S', waist: '74 – 78', length: 99, thigh: 60, opening: 20 },
    { size: 'M', waist: '78 – 82', length: 101, thigh: 63, opening: 21 },
    { size: 'L', waist: '83 – 87', length: 103, thigh: 66, opening: 22 },
    { size: 'XL', waist: '88 – 92', length: 105, thigh: 69, opening: 22.5 },
    { size: 'XXL', waist: '93 – 98', length: 107, thigh: 72, opening: 23.5 },
  ],
  baggy: [
    { size: 'S', waist: '74 – 80', length: 101, thigh: 66, opening: 23.5 },
    { size: 'M', waist: '79 – 85', length: 103, thigh: 69, opening: 24.5 },
    { size: 'L', waist: '84 – 90', length: 105, thigh: 72, opening: 25.5 },
    { size: 'XL', waist: '89 – 95', length: 107, thigh: 75, opening: 26.5 },
    { size: 'XXL', waist: '94 – 100', length: 109, thigh: 78, opening: 27.5 },
  ],
  tapered: [
    { size: 'S', waist: '72 – 78', length: 96, thigh: 60, opening: 14.5 },
    { size: 'M', waist: '77 – 83', length: 98, thigh: 63, opening: 15.5 },
    { size: 'L', waist: '82 – 88', length: 100, thigh: 66, opening: 16.5 },
    { size: 'XL', waist: '87 – 93', length: 102, thigh: 69, opening: 17.5 },
    { size: 'XXL', waist: '92 – 98', length: 104, thigh: 72, opening: 18.5 },
  ],
};

export interface MaterialItem {
  name: string;
  spec: string;
  feel: BiText;
  bestFor: string[];
  thickness: number;
  breathability: number;
  swatch: string;
  colorOptions: { label: string; hex: string }[];
  pattern: 'twill' | 'knit' | 'rib' | 'woven' | 'dots';
  textureImg: string;
}

export interface MaterialGroup {
  id: string;
  category: BiText;
  mono: string;
  items: MaterialItem[];
}

export const MATERIAL_GROUPS: MaterialGroup[] = [
  {
    id: 'outerwear-fabric',
    category: { id: 'Jaket & Outerwear', en: 'Outerwear' },
    mono: 'OUTER',
    items: [
      {
        name: 'Kanvas (Marsoto / Baby)',
        spec: '10 – 14 oz',
        feel: {
          id: 'Tenunan rapat dan kokoh untuk struktur jaket yang tegas.',
          en: 'Dense, structured weave suited for crisp outerwear lines.',
        },
        bestFor: ['Work Jacket', 'Daily Jacket', 'Tote Bag'],
        thickness: 5,
        breathability: 3,
        swatch: '#34332E',
        colorOptions: [
          { label: 'Charcoal', hex: '#34332E' },
          { label: 'Olive', hex: '#4B5240' },
          { label: 'Khaki', hex: '#A99B7F' },
          { label: 'Bone', hex: '#DCD6C6' },
          { label: 'Navy', hex: '#263240' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-canvas.jpg',
      },
      {
        name: 'American / Nagata Drill',
        spec: 'Twill Diagonal',
        feel: {
          id: 'Permukaan rapi, kuat, dan stabil setelah pencucian berulang.',
          en: 'Clean diagonal twill with high durability and color retention.',
        },
        bestFor: ['Work Jacket', 'Workshirt', 'PDH / PDL', 'Chino'],
        thickness: 4,
        breathability: 4,
        swatch: '#2B3947',
        colorOptions: [
          { label: 'Slate Navy', hex: '#2B3947' },
          { label: 'Black', hex: '#1E1F1D' },
          { label: 'Forest', hex: '#3D483C' },
          { label: 'Stone', hex: '#7C7F7C' },
          { label: 'Sand', hex: '#B9AC93' },
        ],
        pattern: 'twill',
        textureImg: '/textures/mat-drill.jpg',
      },
      {
        name: 'Taslan / Parasut',
        spec: 'Water-Repellent',
        feel: {
          id: 'Ringan, tahan angin, dan cepat kering untuk mobilitas luar ruang.',
          en: 'Lightweight wind-blocking weave for outdoor mobility.',
        },
        bestFor: ['Coach Jacket', 'Windbreaker', 'Bomber', 'Parka'],
        thickness: 2,
        breathability: 3,
        swatch: '#46524B',
        colorOptions: [
          { label: 'Pine', hex: '#46524B' },
          { label: 'Matte Black', hex: '#212322' },
          { label: 'Steel', hex: '#3A4B5C' },
          { label: 'Mist', hex: '#989C96' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-taslan.jpg',
      },
      {
        name: 'Corduroy',
        spec: '8 – 14 Wale',
        feel: {
          id: 'Tekstur alur vertikal hangat untuk badan jaket maupun aksen kerah.',
          en: 'Tactile vertical wale texture for full jackets or collar trim.',
        },
        bestFor: ['Kerah Work Jacket', 'Corduroy Jacket', 'Trousers'],
        thickness: 4,
        breathability: 3,
        swatch: '#6E5540',
        colorOptions: [
          { label: 'Espresso', hex: '#594232' },
          { label: 'Tobacco', hex: '#7A5B3E' },
          { label: 'Moss', hex: '#3F4A3B' },
          { label: 'Off-Black', hex: '#252422' },
        ],
        pattern: 'rib',
        textureImg: '/textures/mat-corduroy.jpg',
      },
      {
        name: 'Denim (Raw / Washed)',
        spec: '12 – 14.5 oz',
        feel: {
          id: 'Karakter serat kuat dengan opsi bio-wash untuk sentuhan lebih lembut.',
          en: 'Heavyweight twill available raw or enzyme-washed for softer handfeel.',
        },
        bestFor: ['Denim Jacket', 'Work Jacket', 'Denim Pants'],
        thickness: 5,
        breathability: 3,
        swatch: '#27354A',
        colorOptions: [
          { label: 'Raw Indigo', hex: '#27354A' },
          { label: 'Black', hex: '#242527' },
          { label: 'Washed Blue', hex: '#566C85' },
          { label: 'Ecru', hex: '#DFD9C9' },
        ],
        pattern: 'twill',
        textureImg: '/textures/mat-denim.jpg',
      },
      {
        name: 'Heavy Fleece',
        spec: '280 – 330 gsm',
        feel: {
          id: 'Tebal dan lembut di bagian dalam, ideal untuk varsity dan outerwear kasual.',
          en: 'Substantial brushed fleece suited for varsity and structured knitwear.',
        },
        bestFor: ['Varsity Jacket', 'Boxy Hoodie', 'Sweatpants'],
        thickness: 5,
        breathability: 3,
        swatch: '#4C4C46',
        colorOptions: [
          { label: 'Graphite', hex: '#4C4C46' },
          { label: 'Forest', hex: '#2D3E32' },
          { label: 'Bone', hex: '#E3DED2' },
          { label: 'Burgundy', hex: '#5A2B31' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-heavy-fleece.jpg',
      },
    ],
  },
  {
    id: 'fleece-terry',
    category: { id: 'Hoodie & Sweatpants', en: 'Fleece & Terry' },
    mono: 'KNIT',
    items: [
      {
        name: 'Cotton Fleece Heavyweight',
        spec: '300 – 330 gsm',
        feel: {
          id: 'Berbobot tinggi, menjaga bentuk tudung dan siluet boxy tetap berdiri.',
          en: 'High-grammage brushed cotton that holds structured boxy volume.',
        },
        bestFor: ['Boxy Hoodie', 'Zip-Up', 'Baggy Sweatpants'],
        thickness: 5,
        breathability: 3,
        swatch: '#DED9CD',
        colorOptions: [
          { label: 'Bone', hex: '#DED9CD' },
          { label: 'Misty Grey', hex: '#A9AAA6' },
          { label: 'Washed Black', hex: '#292927' },
          { label: 'Dark Olive', hex: '#42473A' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-fleece-heavyweight.jpg',
      },
      {
        name: 'Cotton Fleece Standar',
        spec: '260 – 280 gsm',
        feel: {
          id: 'Ketebalan seimbang dan nyaman digunakan pada iklim tropis.',
          en: 'Balanced mid-heavy weight calibrated for tropical climates.',
        },
        bestFor: ['Hoodie', 'Crewneck', 'Sweatpants'],
        thickness: 4,
        breathability: 4,
        swatch: '#B4B1A6',
        colorOptions: [
          { label: 'Heather Ash', hex: '#B4B1A6' },
          { label: 'Black', hex: '#1F1F1D' },
          { label: 'Navy', hex: '#253142' },
          { label: 'Taupe', hex: '#8A8172' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-fleece-standard.jpg',
      },
      {
        name: 'Baby Terry Katun',
        spec: '240 – 280 gsm',
        feel: {
          id: 'Permukaan dalam ber-loop halus tanpa bulu dengan sirkulasi udara baik.',
          en: 'Unbrushed loopback interior with high breathability for daily wear.',
        },
        bestFor: ['Crewneck', 'Sweatpants', 'Shorts'],
        thickness: 3,
        breathability: 5,
        swatch: '#8B897F',
        colorOptions: [
          { label: 'Stone', hex: '#8B897F' },
          { label: 'Charcoal', hex: '#373835' },
          { label: 'Cream', hex: '#E6E0D0' },
          { label: 'Sage', hex: '#768478' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-baby-terry.jpg',
      },
      {
        name: 'CVC Fleece',
        spec: 'Cotton-Poly Blend',
        feel: {
          id: 'Stabil, minim penyusutan, dan efisien untuk produksi skala besar.',
          en: 'Low-shrinkage cotton blend suited for high-volume runs.',
        },
        bestFor: ['Merchandise', 'Komunitas', 'Event Hoodie'],
        thickness: 4,
        breathability: 3,
        swatch: '#3E403D',
        colorOptions: [
          { label: 'Dark Slate', hex: '#3E403D' },
          { label: 'Maroon', hex: '#5D292F' },
          { label: 'Navy', hex: '#222F42' },
          { label: 'Oatmeal', hex: '#CFC9B8' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-cvc-fleece.jpg',
      },
    ],
  },
  {
    id: 'bottoms-fabric',
    category: { id: 'Celana Bahan', en: 'Bottoms' },
    mono: 'BOTTOMS',
    items: [
      {
        name: 'Semi-Wool',
        spec: 'Tailored Drape',
        feel: {
          id: 'Jatuh kain halus dan bersih untuk celana bahan lurus maupun pleats.',
          en: 'Fluid tailored drape suited for pleated and straight trousers.',
        },
        bestFor: ['Pleated Trousers', 'Baggy Trousers', 'Semi-Formal'],
        thickness: 3,
        breathability: 4,
        swatch: '#4E4D45',
        colorOptions: [
          { label: 'Olive Taupe', hex: '#4E4D45' },
          { label: 'Charcoal', hex: '#2D2E2C' },
          { label: 'Warm Grey', hex: '#7E7D76' },
          { label: 'Espresso', hex: '#413731' },
          { label: 'Sand', hex: '#B9AE97' },
        ],
        pattern: 'twill',
        textureImg: '/textures/mat-semiwool.jpg',
      },
      {
        name: 'Cotton Twill',
        spec: 'Stretch / Non-Stretch',
        feel: {
          id: 'Padat, halus, dan fleksibel untuk chino maupun celana kasual.',
          en: 'Compact woven cotton available in rigid or comfort-stretch.',
        },
        bestFor: ['Chino', 'Casual Trousers', 'Shorts'],
        thickness: 4,
        breathability: 4,
        swatch: '#8E846E',
        colorOptions: [
          { label: 'Khaki', hex: '#8E846E' },
          { label: 'Black', hex: '#1E1F1D' },
          { label: 'Olive', hex: '#4E5643' },
          { label: 'Cream', hex: '#DDD5C3' },
        ],
        pattern: 'twill',
        textureImg: '/textures/mat-cotton-twill.jpg',
      },
      {
        name: 'American / Nagata Drill',
        spec: 'Medium – Heavy',
        feel: {
          id: 'Tahan gesekan dan berstruktur rapi untuk celana kerja.',
          en: 'Abrasion-resistant twill built for work pants and utility cuts.',
        },
        bestFor: ['Work Pants', 'Carpenter', 'Field Pants'],
        thickness: 4,
        breathability: 4,
        swatch: '#353C38',
        colorOptions: [
          { label: 'Deep Pine', hex: '#353C38' },
          { label: 'Charcoal', hex: '#2B2C2B' },
          { label: 'Navy', hex: '#253242' },
          { label: 'Tan', hex: '#A59173' },
        ],
        pattern: 'twill',
        textureImg: '/textures/mat-drill-pine.jpg',
      },
      {
        name: 'Ripstop',
        spec: 'Grid Anti-Robek',
        feel: {
          id: 'Anyaman kotak penguat yang ringan namun tahan sobek.',
          en: 'Reinforced crosshatch grid resisting tears under heavy use.',
        },
        bestFor: ['Cargo Pants', 'PDL', 'Utility Vest'],
        thickness: 3,
        breathability: 4,
        swatch: '#535849',
        colorOptions: [
          { label: 'Olive', hex: '#535849' },
          { label: 'Black', hex: '#202120' },
          { label: 'Khaki', hex: '#A3967C' },
          { label: 'Ash', hex: '#6B6E6B' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-ripstop.jpg',
      },
    ],
  },
  {
    id: 'tops-fabric',
    category: { id: 'Kaos & Kemeja', en: 'Tees & Shirts' },
    mono: 'SHIRT',
    items: [
      {
        name: 'Cotton Combed 20s / 24s / 30s',
        spec: '150 – 210 gsm',
        feel: {
          id: '100% katun combed halus dan menyerap keringat dengan baik.',
          en: '100% combed cotton jersey across three calibrated weights.',
        },
        bestFor: ['T-Shirt', 'Oversized Tee', 'Merchandise'],
        thickness: 3,
        breathability: 5,
        swatch: '#22221F',
        colorOptions: [
          { label: 'Black', hex: '#22221F' },
          { label: 'Broken White', hex: '#EBE7DC' },
          { label: 'Slate', hex: '#4B5054' },
          { label: 'Sage', hex: '#6F7968' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-combed.jpg',
      },
      {
        name: 'Cotton Heavyweight',
        spec: '235 – 260 gsm',
        feel: {
          id: 'Tebal, tidak menerawang, dan membentuk siluet boxy yang tegas.',
          en: 'Dense opaque jersey engineered for architectural boxy tees.',
        },
        bestFor: ['Heavyweight Tee', 'Longsleeve'],
        thickness: 4,
        breathability: 4,
        swatch: '#E5E0D4',
        colorOptions: [
          { label: 'Ecru', hex: '#E5E0D4' },
          { label: 'Charcoal', hex: '#383836' },
          { label: 'Earth', hex: '#5B4B3F' },
          { label: 'Navy', hex: '#232F3E' },
        ],
        pattern: 'knit',
        textureImg: '/textures/mat-heavyweight-tee.jpg',
      },
      {
        name: 'Cotton Oxford',
        spec: 'Basketweave',
        feel: {
          id: 'Tenunan halus klasik yang rapi untuk kemeja harian maupun kerja.',
          en: 'Classic breathable basketweave for tailored casual shirting.',
        },
        bestFor: ['Oxford Shirt', 'Workshirt'],
        thickness: 3,
        breathability: 5,
        swatch: '#9FAAB6',
        colorOptions: [
          { label: 'Oxford Blue', hex: '#9FAAB6' },
          { label: 'White', hex: '#ECEAE4' },
          { label: 'Sage', hex: '#94A194' },
          { label: 'Charcoal', hex: '#3E4142' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-oxford.jpg',
      },
      {
        name: 'Flanel Katun',
        spec: 'Brushed Cotton',
        feel: {
          id: 'Permukaan lembut dan hangat untuk kemeja flanel maupun overshirt.',
          en: 'Soft brushed cotton suited for shirting and mid-weight overshirts.',
        },
        bestFor: ['Kemeja Flanel', 'Overshirt'],
        thickness: 4,
        breathability: 4,
        swatch: '#5E3D36',
        colorOptions: [
          { label: 'Rust', hex: '#5E3D36' },
          { label: 'Forest', hex: '#2F4035' },
          { label: 'Indigo', hex: '#2E3A4D' },
          { label: 'Charcoal', hex: '#363634' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-flanel.jpg',
      },
    ],
  },
  {
    id: 'print-embroidery',
    category: { id: 'Sablon & Bordir', en: 'Print & Embroidery' },
    mono: 'CRAFT',
    items: [
      {
        name: 'Sablon Plastisol & Puff',
        spec: 'High Opacity / 3D',
        feel: {
          id: 'Warna pekat, detail tajam, serta opsi efek timbul pada puff print.',
          en: 'Opaque matte ink with optional raised 3D puff expansion.',
        },
        bestFor: ['T-Shirt', 'Hoodie', 'Coach Jacket'],
        thickness: 4,
        breathability: 3,
        swatch: '#1E1F1C',
        colorOptions: [
          { label: 'Cream Puff', hex: '#E3DCCB' },
          { label: 'Black Ink', hex: '#1E1F1C' },
          { label: 'Vermilion', hex: '#C84727' },
          { label: 'Ochre', hex: '#C59D3B' },
        ],
        pattern: 'dots',
        textureImg: '/textures/mat-plastisol-puff.jpg',
      },
      {
        name: 'Sablon DTF & Rubber',
        spec: 'Full Color',
        feel: {
          id: 'Mendukung grafis banyak warna dan gradasi dengan fleksibilitas baik.',
          en: 'Full-spectrum color transfer for multi-tone graphics.',
        },
        bestFor: ['T-Shirt', 'Merchandise', 'Outerwear'],
        thickness: 3,
        breathability: 3,
        swatch: '#3B4856',
        colorOptions: [
          { label: 'Full Color', hex: '#3B4856' },
          { label: 'White Base', hex: '#E7E4DC' },
          { label: 'Charcoal', hex: '#2C2D2B' },
        ],
        pattern: 'dots',
        textureImg: '/textures/mat-dtf-rubber.jpg',
      },
      {
        name: 'Sablon Discharge',
        spec: 'Soft Handfeel',
        feel: {
          id: 'Menyerap ke serat kain gelap tanpa lapisan tinta tebal di permukaan.',
          en: 'Water-based dye absorption leaving zero surface handfeel.',
        },
        bestFor: ['Dark Combed Tee', 'Vintage Tee'],
        thickness: 1,
        breathability: 5,
        swatch: '#4D4942',
        colorOptions: [
          { label: 'Off-White', hex: '#D7D0BE' },
          { label: 'Charcoal', hex: '#4D4942' },
          { label: 'Ochre', hex: '#B49354' },
        ],
        pattern: 'dots',
        textureImg: '/textures/mat-discharge.jpg',
      },
      {
        name: 'Bordir Komputer',
        spec: 'High Density',
        feel: {
          id: 'Kerapatan benang presisi untuk logo dada, punggung, maupun seragam.',
          en: 'High-density stitch registration for chest marks and back artwork.',
        },
        bestFor: ['Work Jacket', 'Workshirt', 'Polo', 'Hoodie'],
        thickness: 4,
        breathability: 4,
        swatch: '#2C362E',
        colorOptions: [
          { label: 'Ivory on Forest', hex: '#2C362E' },
          { label: 'Gold', hex: '#C4A042' },
          { label: 'Ivory', hex: '#E7E2D5' },
          { label: 'Tonal Black', hex: '#1D1E1C' },
        ],
        pattern: 'rib',
        textureImg: '/textures/mat-embroidery-computer.jpg',
      },
      {
        name: 'Bordir Chenille & Patch',
        spec: 'Towel Texture / Emblem',
        feel: {
          id: 'Tekstur handuk bervolume dan patch emblem untuk varsity serta outerwear.',
          en: 'Textured chenille lettering and woven or embroidered patches.',
        },
        bestFor: ['Varsity', 'Crewneck', 'Work Jacket'],
        thickness: 5,
        breathability: 3,
        swatch: '#7B633A',
        colorOptions: [
          { label: 'Cream & Gold', hex: '#7B633A' },
          { label: 'Cream', hex: '#E4DDD0' },
          { label: 'Burgundy', hex: '#632C32' },
          { label: 'Navy', hex: '#263448' },
        ],
        pattern: 'rib',
        textureImg: '/textures/mat-embroidery-chenille.jpg',
      },
    ],
  },
  {
    id: 'brand-finishing',
    category: { id: 'Label & Finishing OEM', en: 'Labels & Finishing' },
    mono: 'OEM',
    items: [
      {
        name: 'Woven & Satin Label',
        spec: 'Damask High-Def',
        feel: {
          id: 'Label merek berdetail halus pada bagian leher maupun pinggang.',
          en: 'High-definition damask neck and waistband brand labels.',
        },
        bestFor: ['Private Label OEM'],
        thickness: 2,
        breathability: 5,
        swatch: '#1F201E',
        colorOptions: [
          { label: 'Black Woven', hex: '#1F201E' },
          { label: 'Cream Satin', hex: '#E8E3D6' },
          { label: 'Olive', hex: '#4B5142' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-woven-label.jpg',
      },
      {
        name: 'Care Label & Size Tab',
        spec: 'Detail Internal',
        feel: {
          id: 'Instruksi perawatan dan penanda ukuran yang dijahit rapi di sisi dalam.',
          en: 'Care instructions and woven size tabs sewn cleanly into side seams.',
        },
        bestFor: ['Private Label OEM'],
        thickness: 1,
        breathability: 5,
        swatch: '#EAE6DC',
        colorOptions: [
          { label: 'White Satin', hex: '#EAE6DC' },
          { label: 'Black', hex: '#232422' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-care-label.jpg',
      },
      {
        name: 'Hangtag & Hardware Custom',
        spec: 'Art Carton · Metal Hardware',
        feel: {
          id: 'Pemasangan hangtag, tali katun, resleting YKK, serta kancing custom.',
          en: 'Hangtags, cotton strings, YKK zippers, and custom buttons.',
        },
        bestFor: ['Outerwear', 'Bottoms', 'Knitwear'],
        thickness: 3,
        breathability: 4,
        swatch: '#C7BDA8',
        colorOptions: [
          { label: 'Kraft', hex: '#C7BDA8' },
          { label: 'Gunmetal', hex: '#4F5252' },
          { label: 'Brass', hex: '#947B4B' },
        ],
        pattern: 'dots',
        textureImg: '/textures/mat-hangtag-hardware.jpg',
      },
      {
        name: 'Steam, QC & Packaging',
        spec: 'Polybag / Zip-Lock',
        feel: {
          id: 'Pembersihan benang, steam, sortir ukuran, dan pengemasan siap distribusi.',
          en: 'Thread trimming, steaming, size sorting, and retail-ready packing.',
        },
        bestFor: ['Seluruh Pesanan'],
        thickness: 2,
        breathability: 4,
        swatch: '#8A938E',
        colorOptions: [
          { label: 'Frosted Zip-Lock', hex: '#8A938E' },
          { label: 'Clear Polybag', hex: '#C6CCC8' },
        ],
        pattern: 'woven',
        textureImg: '/textures/mat-packaging-qc.jpg',
      },
    ],
  },
];

export interface OrderStep {
  number: string;
  title: BiText;
  subtitle: string;
  description: BiText;
  deliverable: BiText;
}

export const ORDER_STEPS: OrderStep[] = [
  {
    number: '01',
    title: { id: 'Konsultasi & Brief Desain', en: 'Consultation & Design Brief' },
    subtitle: 'BRIEF',
    description: {
      id: 'Kirim referensi desain, mockup, jenis produk, perkiraan jumlah pesanan, dan target jadwal selesai.',
      en: 'Share your design references or mockups, garment category, quantity estimate, and target delivery window.',
    },
    deliverable: { id: 'Evaluasi teknis & arahan material', en: 'Technical review & fabric guidance' },
  },
  {
    number: '02',
    title: { id: 'Penentuan Spesifikasi', en: 'Specification Lock' },
    subtitle: 'SPEC',
    description: {
      id: 'Penetapan jenis kain, warna, cutting, size chart (standar S08 atau custom), serta detail sablon, bordir, dan aksesoris.',
      en: 'Confirm fabric, colorway, silhouette, size chart (S08 standard or custom), decoration, and trims.',
    },
    deliverable: { id: 'Lembar Spesifikasi Kerja (SPK)', en: 'Production Spec Sheet (SPK)' },
  },
  {
    number: '03',
    title: { id: 'Penawaran Harga (Quotation)', en: 'Quotation & Timeline' },
    subtitle: 'QUOTE',
    description: {
      id: 'S08 mengirimkan rincian estimasi biaya produksi per potong serta perkiraan durasi pengerjaan.',
      en: 'Receive a clear per-unit cost breakdown and estimated production schedule.',
    },
    deliverable: { id: 'Quotation resmi & estimasi jadwal', en: 'Formal quotation & schedule' },
  },
  {
    number: '04',
    title: { id: 'Pembuatan Sampel (Opsional)', en: 'Prototype Sample (Optional)' },
    subtitle: 'SAMPLE',
    description: {
      id: 'Pembuatan satu unit contoh fisik sebelum produksi massal untuk memverifikasi pola, bahan, dan ukuran.',
      en: 'Single physical prototype produced prior to bulk cutting to verify fit, handfeel, and construction.',
    },
    deliverable: { id: 'Persetujuan sampel pra-produksi', en: 'Pre-production sample approval' },
  },
  {
    number: '05',
    title: { id: 'Uang Muka (DP) & Produksi', en: 'Deposit & Bulk Production' },
    subtitle: 'PRODUCTION',
    description: {
      id: 'Setelah spesifikasi atau sampel disetujui dan DP diterima, pesanan masuk tahap potong, jahit, aplikasi grafis, dan finishing.',
      en: 'Once approved and deposit is received, garments enter cutting, sewing, printing/embroidery, and finishing.',
    },
    deliverable: { id: 'Laporan progres workshop', en: 'Workshop progress updates' },
  },
  {
    number: '06',
    title: { id: 'Quality Control & Pengemasan', en: 'Quality Control & Packing' },
    subtitle: 'FINAL QC',
    description: {
      id: 'Pemeriksaan kebersihan benang, ukuran, dan kerapian jahitan akhir sebelum steam dan pengemasan per ukuran.',
      en: 'Piece-by-piece thread trimming, measurement verification, steaming, and size-sorted packaging.',
    },
    deliverable: { id: 'Lolos inspeksi QC siap kirim', en: 'QC clearance & packed batch' },
  },
  {
    number: '07',
    title: { id: 'Pelunasan & Pengiriman', en: 'Balance & Dispatch' },
    subtitle: 'DISPATCH',
    description: {
      id: 'Setelah pelunasan, pesanan dapat diambil di workshop Jl. Segar Dalam D 16, Bandung atau dikirim via kargo ke seluruh Indonesia.',
      en: 'Following final balance, collect directly at our Bandung workshop or ship via domestic cargo.',
    },
    deliverable: { id: 'Serah terima / resi ekspedisi', en: 'Handover or cargo tracking' },
  },
];

export const PRODUCTION_TERMS: { label: BiText; value: BiText; note: BiText }[] = [
  {
    label: { id: 'Minimum Order (MOQ)', en: 'Minimum Order (MOQ)' },
    value: { id: 'Mulai 24 pcs / artikel', en: 'From 24 pcs / style' },
    note: { id: 'Campur ukuran S–XXL sesuai kesepakatan', en: 'Mixed S–XXL sizing available' },
  },
  {
    label: { id: 'Estimasi Produksi', en: 'Production Lead Time' },
    value: { id: '14 – 21 Hari Kerja', en: '14 – 21 Working Days' },
    note: { id: 'Setelah DP dan persetujuan SPK / sampel', en: 'After deposit and SPK / sample sign-off' },
  },
  {
    label: { id: 'Pembuatan Sampel', en: 'Sample Prototype' },
    value: { id: '5 – 7 Hari Kerja', en: '5 – 7 Working Days' },
    note: { id: 'Opsional untuk validasi pola & bahan baru', en: 'Optional validation for new blocks' },
  },
  {
    label: { id: 'Skema Pembayaran', en: 'Payment Terms' },
    value: { id: 'DP 50% · Pelunasan 50%', en: '50% Deposit · 50% Balance' },
    note: { id: 'Pelunasan dilakukan sebelum pengiriman', en: 'Balance settled prior to dispatch' },
  },
  {
    label: { id: 'Skala Produksi', en: 'Production Capacity' },
    value: { id: 'Brand hingga Massal', en: 'Boutique to Bulk' },
    note: { id: 'Mendukung rilis rutin maupun pengadaan instansi', en: 'Monthly brand drops and institutional runs' },
  },
  {
    label: { id: 'Pengiriman', en: 'Logistics' },
    value: { id: 'Workshop / Kargo Nasional', en: 'Bandung Pickup / Cargo' },
    note: { id: 'Pengiriman darat dan udara seluruh Indonesia', en: 'Nationwide land & air freight coverage' },
  },
];

export interface FaqItem {
  question: BiText;
  answer: BiText;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: {
      id: 'Berapa minimum pemesanan (MOQ) di S08 Konveksi?',
      en: 'What is the minimum order quantity (MOQ)?',
    },
    answer: {
      id: 'Minimum pemesanan standar dimulai dari 24 pcs per desain dengan ukuran campur (S–XXL). Untuk artikel dengan kain khusus, ketentuan dapat didiskusikan bersama tim kami.',
      en: 'Standard production starts at 24 pieces per style across mixed sizes (S–XXL). Specialized fabrics or complex constructions can be discussed directly.',
    },
  },
  {
    question: {
      id: 'Apakah tersedia layanan pembuatan sampel sebelum produksi massal?',
      en: 'Can I request a physical sample before bulk production?',
    },
    answer: {
      id: 'Ya. Pembuatan sampel fisik memerlukan sekitar 5–7 hari kerja dan direkomendasikan untuk artikel baru atau pola custom guna memastikan kesesuaian siluet dan bahan.',
      en: 'Yes. Physical prototyping takes roughly 5–7 working days and is recommended for new styles or custom pattern blocks prior to bulk cutting.',
    },
  },
  {
    question: {
      id: 'Apakah S08 melayani produksi OEM dengan pola dan label merek sendiri?',
      en: 'Do you support full OEM / private-label production?',
    },
    answer: {
      id: 'Ya. Klien dapat menggunakan pola, size chart, tech pack, woven label, care label, hangtag, hingga kemasan milik merek sendiri.',
      en: 'Yes. Clients may supply their own tech packs, physical samples, size charts, woven labels, care tags, hangtags, and custom packaging.',
    },
  },
  {
    question: {
      id: 'Berapa lama estimasi pengerjaan produksi massal?',
      en: 'What is the typical production lead time?',
    },
    answer: {
      id: 'Estimasi standar berkisar 14 hingga 21 hari kerja setelah DP diterima dan spesifikasi atau sampel disetujui, bergantung pada kuantitas dan kerumitan konstruksi.',
      en: 'Typically 14 to 21 working days after deposit and final approval, depending on order volume and construction complexity.',
    },
  },
  {
    question: {
      id: 'Apakah pengadaan kain disediakan oleh S08 atau dapat dikirim oleh klien?',
      en: 'Does S08 source fabrics or accept client-supplied materials?',
    },
    answer: {
      id: 'Keduanya dapat dilakukan. Berlokasi di ekosistem tekstil Bandung, kami menyediakan sourcing kain sesuai spesifikasi Anda, atau menerima kain kiriman klien sesuai kesepakatan.',
      en: 'Both options are available. Located within Bandung’s textile ecosystem, we source fabrics to specification or work with client-supplied rolls.',
    },
  },
  {
    question: {
      id: 'Bagaimana prosedur kunjungan ke workshop S08 di Bandung?',
      en: 'Can I schedule a visit to the Bandung workshop?',
    },
    answer: {
      id: 'Kunjungan ke workshop di Jl. Segar Dalam D 16, Bandung dapat dilakukan pada jam operasional (Senin–Sabtu, 08.30–17.00 WIB) dengan konfirmasi jadwal terlebih dahulu via WhatsApp 0813-2227-5719.',
      en: 'Visits to Jl. Segar Dalam D 16, Bandung are welcome Monday through Saturday (08.30–17.00 WIB) with prior confirmation via WhatsApp at 0813-2227-5719.',
    },
  },
  {
    question: {
      id: 'Bagaimana pengiriman untuk klien di luar Bandung?',
      en: 'How is shipping handled outside Bandung?',
    },
    answer: {
      id: 'Kami melayani pengiriman ke seluruh Indonesia menggunakan ekspedisi darat, kargo, maupun udara yang disepakati dengan pengemasan rapi per ukuran.',
      en: 'We ship nationwide via trusted land, sea, and air freight carriers, packed cleanly and sorted by size.',
    },
  },
];
