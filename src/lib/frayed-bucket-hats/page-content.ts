/** Catalogue SKUs for Frayed Edge line (matches homepage Explore Icons). */
export const FRAYED_BUCKET_HAT_PAGE_SKUS = ['1', '2', '3', '4', '5', '6', '8', '7'] as const;

/** Card title + mood one-liner per SKU. */
export const FRAYED_BUCKET_HAT_CARD_COPY: Record<
  string,
  { cardTitle: string; mood: string }
> = {
  '1': {
    cardTitle: 'Cream Denim Frayed Bucket Hat',
    mood: 'Soft, clean, and quietly romantic.',
  },
  '2': {
    cardTitle: 'Light Blue Denim Frayed Bucket Hat',
    mood: 'Easy summer denim with a lighter mood.',
  },
  '3': {
    cardTitle: 'Gray Denim Frayed Bucket Hat',
    mood: 'Neutral, cool, and effortless.',
  },
  '4': {
    cardTitle: 'Black Denim Frayed Bucket Hat',
    mood: 'A sharper everyday bucket with city energy.',
  },
  '5': {
    cardTitle: 'Blue Denim Frayed Bucket Hat',
    mood: 'Classic denim, softened by the heart mark.',
  },
  '6': {
    cardTitle: 'Dark Blue Denim Frayed Bucket Hat',
    mood: 'Deeper denim for a more polished casual look.',
  },
  '8': {
    cardTitle: 'Tie Dye Light Blue Denim Frayed Bucket Hat',
    mood: 'Beachy, playful, and still unmistakably Nury.',
  },
  '7': {
    cardTitle: 'Tie Dye Blue Denim Frayed Bucket Hat',
    mood: 'A statement wash with a soft California feel.',
  },
};

export const FRAYED_PAGE_IMAGES = {
  hero: {
    src: '/palm-springs-light-blue6.png',
    w: 1086,
    h: 1448,
    alt: 'Woman wearing a Nury tie dye light blue denim frayed bucket hat after surfing in Malibu',
  },
  detail: {
    src: '/farmers-market3.png',
    w: 1086,
    h: 1448,
    alt: 'Model wearing a blue denim frayed bucket hat for women at a farmers market',
  },
  lifestyle: {
    src: '/malibu-brunette-driving2.png',
    w: 1086,
    h: 1448,
    alt: 'Model wearing a cream denim frayed bucket hat with Nury heart mark in a California lifestyle scene',
  },
} as const;

export { NURY_PROPORTION_TABLE_ROWS } from '@/lib/nury-proportion/table-rows';

export const STYLING_TILES = [
  { heading: 'Beach Morning', copy: 'Swimsuit, linen shirt, sandals, salt air.' },
  { heading: 'Coffee Run', copy: 'White tank, denim, sneakers, no overthinking.' },
  { heading: 'Golden Hour', copy: 'Soft dress, vintage sunglasses, warm light.' },
  { heading: 'City Weekend', copy: 'Black denim, knit layers, clean accessories.' },
] as const;

export const FRAYED_INTERNAL_PRODUCT_LINKS = [
  { label: 'Shop Cream Denim', handle: 'frayed-cream' },
  { label: 'Shop Light Blue Denim', handle: 'frayed-light-blue' },
  { label: 'Shop Black Denim', handle: 'frayed-black' },
  { label: 'Shop Tie Dye Light Blue Denim', handle: 'frayed-tie-dye-light-blue' },
] as const;
