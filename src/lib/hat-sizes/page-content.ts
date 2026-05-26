export { NURY_PROPORTION_TABLE_ROWS_HAT_SIZES as NURY_PROPORTION_TABLE_ROWS } from '@/lib/nury-proportion/table-rows';

export const NURY_FIT_NOTES_ROWS = [
  ['Frayed Bucket Hats', '56–58 cm', 'Standard Nury fit'],
  ['Classic Bucket Hats', '56–58 cm', 'Standard Nury fit if offered'],
  ['Terry Bucket Hats', '56–58 cm', 'Softer fabric feel'],
] as const;

export const HAT_SIZE_CONVERSION_ROWS = [
  ['54 cm', '6 3/4', 'XS'],
  ['55 cm', '6 7/8', 'S'],
  ['56 cm', '7', 'S'],
  ['57 cm', '7 1/8', 'M'],
  ['58 cm', '7 1/4', 'M'],
  ['59 cm', '7 3/8', 'L'],
  ['60 cm', '7 1/2', 'L'],
  ['61 cm', '7 5/8', 'XL'],
  ['62 cm', '7 3/4', 'XL'],
] as const;

export const MEASURE_HEAD_STEPS = [
  'Use a soft measuring tape.',
  'Wrap it around your head where the hat naturally sits — above your eyebrows and around the widest part of the back of your head.',
  'Keep the tape snug but not tight.',
  'Record the measurement in centimeters.',
  'Compare it to the chart below.',
] as const;

export const FASHION_FIT_IMAGES = [
  {
    src: '/products/frayed-cream-clear.png',
    w: 800,
    h: 800,
    alt: 'Nury frayed bucket hat showing 9 cm crown and 7 cm brim proportion',
    caption: 'Clean crown height',
  },
  {
    src: '/farmers-market3.png',
    w: 1086,
    h: 1448,
    alt: 'Woman wearing a Nury frayed bucket hat with a clean fashion silhouette',
    caption: 'Balanced brim width',
  },
  {
    src: '/malibu-brunette-driving2.png',
    w: 1086,
    h: 1448,
    alt: 'Model wearing a cream denim frayed bucket hat with Nury heart mark in a California lifestyle scene',
    caption: 'Fashion-first silhouette',
  },
] as const;

export const HAT_SIZES_HERO_IMAGE = {
  src: '/products/frayed-light-blue-clear.png',
  w: 800,
  h: 800,
  alt: 'Nury light blue denim frayed bucket hat showing crown and brim proportion',
} as const;
