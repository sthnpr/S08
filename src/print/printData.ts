import {
  MATERIAL_GROUPS,
  MaterialItem,
  ProductCategoryId,
  ProductItem,
  PRODUCTS,
} from '../data/s08Data';
import { BiText } from '../i18n/LanguageContext';

export interface ShowcaseLine {
  id: string;
  code: string;
  category: ProductCategoryId;
  title: BiText;
  meta: BiText;
  garmentImg: string;
  backdropImg: string;
  backdropTint: string;
}

export const SHOWCASE_LINES: ShowcaseLine[] = [
  {
    id: 'showcase-outer',
    code: '01',
    category: 'outerwear',
    title: { id: 'Outerwear & Jaket', en: 'Outerwear & Jackets' },
    meta: { id: 'Work Jacket · Varsity · Coach · Denim', en: 'Work Jacket · Varsity · Coach · Denim' },
    garmentImg: '/images/cat-outerwear.jpg',
    backdropImg: '/images/hero-workshop.jpg',
    backdropTint: 'from-[#181713]/78 to-[#181713]/58',
  },
  {
    id: 'showcase-bottoms',
    code: '02',
    category: 'bottoms',
    title: { id: 'Celana Bahan & Sweatpants', en: 'Tailored Bottoms & Sweatpants' },
    meta: { id: 'Semi-Wool · Twill · Fleece 330 gsm', en: 'Semi-Wool · Twill · 330 gsm Fleece' },
    garmentImg: '/images/cat-bottoms.jpg',
    backdropImg: '/images/workshop-cutting-qc.jpg',
    backdropTint: 'from-[#1E211E]/74 to-[#1E211E]/54',
  },
  {
    id: 'showcase-knit',
    code: '03',
    category: 'knitwear',
    title: { id: 'Hoodie & Knitwear', en: 'Heavyweight Knitwear' },
    meta: { id: 'Hoodie · Crewneck · Boxy Heavy Tee', en: 'Hoodie · Crewneck · Boxy Heavy Tee' },
    garmentImg: '/images/cat-knitwear.jpg',
    backdropImg: '/images/simeon-mono-craft.jpg',
    backdropTint: 'from-[#141412]/80 to-[#141412]/60',
  },
  {
    id: 'showcase-work',
    code: '04',
    category: 'workwear',
    title: { id: 'Workshirt & Seragam', en: 'Workwear & Uniforms' },
    meta: { id: 'Nagata Drill · Oxford · Bordir Komputer', en: 'Nagata Drill · Oxford · Embroidery' },
    garmentImg: '/images/cat-workshirt.jpg',
    backdropImg: '/images/hero-workshop.jpg',
    backdropTint: 'from-[#182026]/78 to-[#182026]/58',
  },
  {
    id: 'showcase-oem',
    code: '05',
    category: 'custom',
    title: { id: 'Private Label & OEM', en: 'Private Label & OEM' },
    meta: { id: 'Pola Custom · Woven Label · Hangtag', en: 'Custom Block · Woven Label · Hangtag' },
    garmentImg: '/images/cat-custom-oem.jpg',
    backdropImg: '/images/workshop-cutting-qc.jpg',
    backdropTint: 'from-[#181816]/78 to-[#181816]/60',
  },
];

export interface CodedProduct extends ProductItem {
  code: string;
}

export const CODED_PRODUCTS: CodedProduct[] = PRODUCTS.map((p, idx) => ({
  ...p,
  code: `P${String(idx + 1).padStart(2, '0')}`,
}));

export interface CodedFabric extends MaterialItem {
  code: string;
  groupId: string;
  groupMono: string;
  groupCategory: BiText;
}

export const CODED_FABRICS: CodedFabric[] = (() => {
  const list: CodedFabric[] = [];
  let count = 0;
  for (const grp of MATERIAL_GROUPS) {
    for (const item of grp.items) {
      count += 1;
      list.push({
        ...item,
        code: `F${String(count).padStart(2, '0')}`,
        groupId: grp.id,
        groupMono: grp.mono,
        groupCategory: grp.category,
      });
    }
  }
  return list;
})();

export const DECORATION_CODES: { code: string; label: BiText }[] = [
  { code: 'D1', label: { id: 'Polos', en: 'Blank (No Graphic)' } },
  { code: 'D2', label: { id: 'Bordir Komputer', en: 'Computer Embroidery' } },
  { code: 'D3', label: { id: 'Sablon Plastisol / Puff', en: 'Plastisol / Puff Print' } },
  { code: 'D4', label: { id: 'Sablon DTF / Discharge', en: 'DTF / Discharge Print' } },
  { code: 'D5', label: { id: 'Chenille / Patch Emblem', en: 'Chenille / Patch Emblem' } },
];

export const OEM_CODES: { code: string; label: BiText }[] = [
  { code: 'O1', label: { id: 'Woven Neck Label', en: 'Woven Neck Label' } },
  { code: 'O2', label: { id: 'Care Label & Size Tab', en: 'Care & Size Tab' } },
  { code: 'O3', label: { id: 'Hangtag Brand', en: 'Hangtag' } },
  { code: 'O4', label: { id: 'Custom Zipper / Kancing', en: 'Custom Hardware' } },
  { code: 'O5', label: { id: 'Packaging Zip-Lock', en: 'Zip-Lock Packing' } },
];

export const TOP_CUT_OPTIONS: { code: string; label: string }[] = [
  { code: 'C1', label: 'Regular Fit' },
  { code: 'C2', label: 'Oversized / Drop Shoulder' },
  { code: 'C3', label: 'Boxy / Cropped' },
  { code: 'C4', label: 'Custom Pattern' },
];

export const BOTTOM_CUT_OPTIONS: { code: string; label: string }[] = [
  { code: 'C5', label: 'Straight Fit' },
  { code: 'C6', label: 'Relaxed / Baggy' },
  { code: 'C7', label: 'Tapered / Jogger' },
  { code: 'C8', label: 'Custom Pattern' },
];

export const MACRO_SHOWCASE_TILES: { label: BiText; textureImg: string; hex: string; spec: string }[] = [
  {
    label: { id: 'Kanvas 10–14 oz', en: '10–14 oz Canvas' },
    textureImg: '/textures/mat-canvas.jpg',
    hex: '#34332E',
    spec: 'F01 · WOVEN',
  },
  {
    label: { id: 'Raw Indigo Denim', en: 'Raw Indigo Denim' },
    textureImg: '/textures/mat-denim.jpg',
    hex: '#27354A',
    spec: 'F05 · TWILL',
  },
  {
    label: { id: 'Corduroy 8–14 Wale', en: '8–14 Wale Corduroy' },
    textureImg: '/textures/mat-corduroy.jpg',
    hex: '#7A5B3E',
    spec: 'F04 · RIB',
  },
  {
    label: { id: 'Sablon Puff S08', en: 'S08 Puff Print' },
    textureImg: '/textures/mat-plastisol-puff.jpg',
    hex: '#1E1F1C',
    spec: 'F19 · PRINT',
  },
  {
    label: { id: 'Bordir Komputer S08', en: 'S08 Embroidery' },
    textureImg: '/textures/mat-embroidery-computer.jpg',
    hex: '#2C362E',
    spec: 'F22 · STITCH',
  },
];
