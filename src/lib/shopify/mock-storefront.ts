import type { ProductColorLink, ProductImage, ProductVariant, StorefrontProduct } from './types';

const money = (amount: string): { amount: string; currencyCode: string } => ({
  amount,
  currencyCode: 'USD',
});

/** @deprecated Replace with Storefront API fetch — keep the same return shape. */
export async function getProductByHandle(handle: string): Promise<StorefrontProduct | null> {
  // Simulate network / GraphQL latency (remove or set to 0 when wiring Shopify)
  await Promise.resolve();
  return getProductByHandleSync(handle);
}

export function getProductByHandleSync(handle: string): StorefrontProduct | null {
  const byKey = PRODUCTS_BY_HANDLE[handle];
  if (byKey) return byKey;
  const byHandle = Object.values(PRODUCTS_BY_HANDLE).find((p) => p.handle === handle);
  if (byHandle) return byHandle;
  return PRODUCTS_BY_SLUG[handle] ?? null;
}

/** URL slugs for `/products/[slug]` — canonical format: `[line-title]-[color]` (lowercase, dashed). */
export function getAllProductHandles(): string[] {
  return Array.from(new Set(Object.values(PRODUCTS_BY_HANDLE).map((p) => getProductCanonicalSlug(p))));
}

function slugifySegment(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getProductColorLabel(product: StorefrontProduct): string {
  const related = product.relatedColors?.find((c) => c.handle === product.handle);
  if (related?.name) return related.name;
  const colorOpt = product.options.find((o) => o.name === 'Color');
  const def = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const val = def?.selectedOptions.find((o) => o.name === 'Color')?.value;
  if (!colorOpt || !val) return '';
  const byName = colorOpt.optionValues.find((v) => v.name === val);
  if (byName) return byName.name;
  return val;
}

/** Frayed Edge line PDPs (excludes Ultra Frayed). */
export function isFrayedEdgeBucketHat(handle: string): boolean {
  return handle.startsWith('frayed-');
}

/** Stable `/products/[slug]` segment for Frayed Edge — not derived from display `title`. */
const FRAYED_EDGE_LINE_SLUG = 'frayed-edge-bucket-hat';

export function getProductCanonicalSlug(productOrHandle: StorefrontProduct | string): string {
  const product =
    typeof productOrHandle === 'string' ? getProductByHandleSync(productOrHandle) : productOrHandle;
  if (!product) return typeof productOrHandle === 'string' ? productOrHandle : productOrHandle.handle;
  const color = slugifySegment(getProductColorLabel(product));
  if (isFrayedEdgeBucketHat(product.handle)) {
    return color ? `${FRAYED_EDGE_LINE_SLUG}-${color}` : FRAYED_EDGE_LINE_SLUG;
  }
  const line = slugifySegment(product.title);
  return color ? `${line}-${color}` : line;
}

type MockImageRef = { src: string; alt: string };

function imgs(...paths: MockImageRef[]): ProductImage[] {
  return paths.map((p) => ({
    url: p.src,
    altText: p.alt,
    width: 800,
    height: 800,
  }));
}

/** Slots 1 & 4 on the PDP grid — `desktopInset` drives PDP framing (mobile + desktop). */
export function productImage(ref: MockImageRef): ProductImage {
  const [img] = imgs(ref);
  return { ...img, desktopInset: true };
}

/** Slots 2 & 3 on the PDP grid — full-bleed treatment on desktop. */
export function galleryImage(ref: MockImageRef): ProductImage {
  const [img] = imgs(ref);
  return img;
}

/** PDP grid order: product (1) → gallery (2–3) → product (4). Use with `productImages` + `galleryImages` slices. */
export function mergePdpGridImages(
  productImages: readonly [ProductImage, ProductImage],
  galleryImages: readonly [ProductImage, ProductImage],
): ProductImage[] {
  return [productImages[0], galleryImages[0], galleryImages[1], productImages[1]];
}

/** PDP product line titles */
const TITLE_CLASSIC = 'Classic Bucket Hat';
const TITLE_FRAYED = 'Frayed Bucket Hat';
const TITLE_ULTRA_FRAYED = 'Ultra Frayed Bucket Hat';

/** Swatches on PDP = same line only (cross-links by handle). */
const RELATED_CLASSIC: ProductColorLink[] = [
  { id: 'black', name: 'Classic Black', swatchHex: '#1a1a1a', handle: 'basic-black' },
  { id: 'cream', name: 'Classic Cream', swatchHex: '#f0e6d8', handle: 'basic-cream' },
];

/** Frayed Edge line — all colourways (SKUs 1–8); order matches {@link POPULAR_BUCKET_HAT_HOMEPAGE_SKUS}. */
const RELATED_FRAYED: ProductColorLink[] = [
  { id: 'white-fringe', name: 'Cream Denim', swatchHex: '#f5f0e8', handle: 'frayed-cream' },
  { id: 'denim', name: 'Light Blue Denim', swatchHex: '#8fa8c4', handle: 'frayed-light-blue' },
  { id: 'gray', name: 'Gray Denim', swatchHex: '#9ca3af', handle: 'frayed-gray' },
  { id: 'black-frayed', name: 'Black Denim', swatchHex: '#1f2937', handle: 'frayed-black' },
  { id: 'blue-frayed', name: 'Blue Denim', swatchHex: '#4f72b8', handle: 'frayed-blue' },
  { id: 'dark-blue-frayed', name: 'Dark Blue Denim', swatchHex: '#3d5a8c', handle: 'frayed-dark-blue' },
  {
    id: 'tie-dye-light-blue',
    name: 'Tie Dye Light Blue Denim',
    swatchHex: '#9bb0d4',
    swatchHexSecondary: '#f5f0e8',
    handle: 'frayed-tie-dye-light-blue',
  },
  {
    id: 'tie-dye-blue',
    name: 'Tie Dye Blue Denim',
    swatchHex: '#6a84ad',
    swatchHexSecondary: '#f5f0e8',
    handle: 'frayed-tie-dye-blue',
  },
];

const RELATED_ULTRA_FRAYED: ProductColorLink[] = [
  {
    id: 'very-frayed-blue',
    name: 'Dark Blue Denim',
    swatchHex: '#5b7aa2',
    handle: 'ultra-frayed-blue',
  },
  {
    id: 'three-blues',
    name: 'Blue Patchwork Denim',
    swatchHex: '#5b7aa2',
    handle: 'ultra-frayed-blue-patchwork',
  },
];

type MockStorefrontProductSeed = Omit<StorefrontProduct, 'variants'> & {
  variants: Array<Omit<ProductVariant, 'shopifyVariantId'>>;
};

const PRODUCTS_BY_HANDLE_SEED: Record<string, MockStorefrontProductSeed> = {



  // 1) FRAYED EDGE CREAM
  'frayed-cream': {
    id: 'gid://mock/Product/1',
    handle: 'frayed-cream',
    sku: '1',
    title: TITLE_FRAYED,
    description: 'White canvas with a frayed brim for extra personality — still easy to wear every day.',
    detailBullets: [
      'White canvas with a frayed brim edge.',
      'Signature heart logo in red.',
      'Lightweight and packable.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.7, reviewCount: 76 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-cream.png', alt: 'Frayed Edge Bucket Hat in Cream Denim with red heart embroidery' }),
        productImage({ src: '/products/frayed-cream.png', alt: 'Cream denim frayed edge bucket hat, front view' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/malibu-brunette-white-frayed-hat3.png', alt: 'Model wearing cream denim frayed edge bucket hat' }),
        galleryImage({ src: '/malibu-brunette2.png', alt: 'Cream denim frayed edge bucket hat detail' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/malibu-brunette-driving2.png', alt: 'Model wearing cream denim frayed edge bucket hat in a car' },
        { src: '/malibu-brunette3.png', alt: 'Cream denim frayed edge bucket hat lifestyle photo' },
        // { src: '/malibu-brunette-driving-away.png', alt: 'White fringe bucket hat lifestyle' },
        { src: '/malibu-brunette4.png', alt: 'Cream denim frayed edge bucket hat close-up detail' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [
          { id: 'white-fringe', name: 'Cream Denim', swatchHex: '#f5f0e8' },
        ],
      },
    ],
    variants: [
      {
        id: 'hb-white-fringe-ml',
        title: 'Cream Denim',
        sku: 'HB-WF-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Cream Denim' }],
      },
    ],
    defaultVariantId: 'hb-white-fringe-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },
  
  
  // 2) FRAYED EDGE LIGHT BLUE
  'frayed-light-blue': {
    id: 'gid://mock/Product/2',
    handle: 'frayed-light-blue',
    sku: '2',
    title: TITLE_FRAYED,
    description: 'Light denim with texture and heart detail — casual structure with an easy, relaxed drape.',
    detailBullets: [
      'Light denim with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 98 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-light-blue.png', alt: 'Frayed Edge Bucket Hat in Light Blue Denim with heart embroidery' }),
        productImage({ src: '/products/frayed-light-blue-clear.png', alt: 'Light blue denim frayed edge bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/barcelona-blonde1.png', alt: 'Model wearing light blue denim frayed edge bucket hat' }),
        galleryImage({ src: '/barcelona-blonde8.png', alt: 'Light blue denim frayed edge bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/barcelona-blonde7.png', alt: 'Model wearing light blue denim frayed edge bucket hat' },
        { src: '/barcelona-blonde5.png', alt: 'Light blue denim frayed edge bucket hat lifestyle photo' },
        { src: '/barcelona-blonde9.png', alt: 'Light blue denim frayed edge bucket hat, outdoor lifestyle photo' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'denim', name: 'Light Blue Denim', swatchHex: '#8fa8c4' }],
      },
    ],
    variants: [
      {
        id: 'hb-denim-ml',
        title: 'Light Blue Denim',
        sku: 'HB-DNM-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Light Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-denim-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },


  // 3) FRAYED EDGE GRAY
  'frayed-gray': {
    id: 'gid://mock/Product/3',
    handle: 'frayed-gray',
    sku: '3',
    title: TITLE_FRAYED,
    description: 'Soft gray canvas with signature heart embroidery for an easy everyday neutral.',
    detailBullets: [
      'Soft gray canvas with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable fit for all-day wear.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.5, reviewCount: 37 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-gray.png', alt: 'Frayed Edge Bucket Hat in Gray Denim with heart embroidery' }),
        productImage({ src: '/products/frayed-gray.png', alt: 'Gray denim frayed edge bucket hat, side view' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/blonde-beach-model-gray-hat.png', alt: 'Model wearing gray denim frayed edge bucket hat' }),
        galleryImage({ src: '/blonde-beach-model-gray-hat2.png', alt: 'Gray denim frayed edge bucket hat detail' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/beach-gray4.png', alt: 'Model wearing gray denim frayed edge bucket hat' },
        { src: '/beach-gray3.png', alt: 'Gray denim frayed edge bucket hat lifestyle photo' },
        { src: '/beach-gray5.png', alt: 'Gray denim frayed edge bucket hat close-up detail' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'gray', name: 'Gray Denim', swatchHex: '#9ca3af' }],
      },
    ],
    variants: [
      {
        id: 'hb-gray-ml',
        title: 'Gray Denim',
        sku: 'HB-GRY-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Gray Denim' }],
      },
    ],
    defaultVariantId: 'hb-gray-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 4) FRAYED EDGE BLACK
  'frayed-black': {
    id: 'gid://mock/Product/4',
    handle: 'frayed-black',
    sku: '4',
    title: TITLE_FRAYED,
    description: 'Black frayed canvas edge with Nury heart embroidery — a little extra texture, still clean.',
    detailBullets: [
      'Black canvas with a frayed brim edge.',
      'Signature heart embroidery in red.',
      'Lightweight and easy to style.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 51 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-black.png', alt: 'Frayed Edge Bucket Hat in Black Denim with red heart embroidery' }),
        productImage({ src: '/products/frayed-black.png', alt: 'Black denim frayed edge bucket hat, side view' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/paris-model-black-frayed-hat2.png', alt: 'Model wearing black denim frayed edge bucket hat' }),
        galleryImage({ src: '/paris-model-black-frayed-hat.png', alt: 'Black denim frayed edge bucket hat detail' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/paris-brunette5.png', alt: 'Model wearing black denim frayed edge bucket hat' },
        { src: '/paris-brunette3.png', alt: 'Black denim frayed edge bucket hat lifestyle photo' },
        { src: '/paris-brunette6.png', alt: 'Black denim frayed edge bucket hat close-up detail' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'black-frayed', name: 'Black Denim', swatchHex: '#1f2937' }],
      },
    ],
    variants: [
      {
        id: 'hb-black-frayed-ml',
        title: 'Black Denim',
        sku: 'HB-BFR-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Black Denim' }],
      },
    ],
    defaultVariantId: 'hb-black-frayed-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },


  // 5) FRAYED EDGE BLUE
  'frayed-blue': {
    id: 'gid://mock/Product/5',
    handle: 'frayed-blue',
    sku: '5',
    title: TITLE_FRAYED,
    description:
      'Blue frayed denim with texture and heart detail — structured like Light Denim, in a bolder blue tone.',
    detailBullets: [
      'Blue denim-style fabric with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.55, reviewCount: 96 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-blue.png', alt: 'Frayed Edge Bucket Hat in Blue Denim with heart embroidery' }),
        productImage({ src: '/products/frayed-blue.png', alt: 'Blue denim frayed edge bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/farmers-market-model-blue-hat1.png', alt: 'Model wearing blue denim frayed edge bucket hat' }),
        galleryImage({ src: '/farmers-market3.png', alt: 'Blue denim frayed edge bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/farmers-market5.png', alt: 'Model wearing blue denim frayed edge bucket hat' },
        { src: '/farmers-market4.png', alt: 'Blue denim frayed edge bucket hat lifestyle photo' },
        { src: '/farmers-market-model-blue-hat3.png', alt: 'Model wearing blue denim frayed edge bucket hat, lifestyle photo' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'blue-frayed', name: 'Blue Denim', swatchHex: '#4f72b8' }],
      },
    ],
    variants: [
      {
        id: 'hb-frayed-blue-ml',
        title: 'Blue Denim',
        sku: 'HB-FRB-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-frayed-blue-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 6) FRAYED EDGE DARK BLUE
  'frayed-dark-blue': {
    id: 'gid://mock/Product/6',
    handle: 'frayed-dark-blue',
    sku: '6',
    title: TITLE_FRAYED,
    description:
      'Dark blue frayed denim with texture and heart detail — structured like Light Denim, in a bolder blue tone.',
    detailBullets: [
      'Blue denim-style fabric with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.55, reviewCount: 96 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-dark-blue.png', alt: 'Frayed Edge Bucket Hat in Dark Blue Denim with heart embroidery' }),
        productImage({ src: '/products/frayed-dark-blue.png', alt: 'Blue denim frayed edge bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/portofino-blue1a.png', alt: 'Model wearing blue denim frayed edge bucket hat' }),
        galleryImage({ src: '/portofino-blue2a.png', alt: 'Blue denim frayed edge bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/portofino-blue3a.png', alt: 'Model wearing blue denim frayed edge bucket hat' },
        { src: '/portofino-blue4a.png', alt: 'Blue denim frayed edge bucket hat lifestyle photo' },
        { src: '/portofino-blue5b.png', alt: 'Model wearing blue denim frayed edge bucket hat, lifestyle photo' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'dark-blue-frayed', name: 'Dark Blue Denim', swatchHex: '#4f72b8' }],
      },
    ],
    variants: [
      {
        id: 'hb-frayed-dark-blue-ml',
        title: 'Dark Blue Denim',
        sku: 'HB-FRB-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Dark Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-frayed-dark-blue-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 7) FRAYED EDGE TIE DYE BLUE
  'frayed-tie-dye-blue': {
    id: 'gid://mock/Product/7',
    handle: 'frayed-tie-dye-blue',
    sku: '7',
    title: TITLE_FRAYED,
    description: 'Light denim with texture and heart detail — casual structure with an easy, relaxed drape.',
    detailBullets: [
      'Light denim with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 98 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-tie-dye-blue.png', alt: 'Frayed Edge Bucket Hat in Tie Dye Blue Denim with heart embroidery' }),
        productImage({ src: '/hat-tie-dye2.png', alt: 'Tie dye blue denim frayed edge bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/hollywood-hills4.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' }),
        galleryImage({ src: '/hollywood-hills2.png', alt: 'Tie dye blue denim frayed edge bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/hollywood-hills6.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/hollywood-hills16.png', alt: 'Tie dye blue denim frayed edge bucket hat lifestyle photo' },
        // { src: '/hollywood-hills14.png', alt: 'Denim bucket hat' },
        { src: '/hollywood-hills13.png', alt: 'Tie dye blue denim frayed edge bucket hat, outdoor lifestyle photo' },
        // { src: '/hollywood-hills1.png', alt: 'Denim bucket hat lifestyle' },
      );
      const extraLifestyleImages = imgs(
        { src: '/malibu-surfer1.png', alt: 'Just finished surfing in Malibu wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/hollywood-hills8.png', alt: 'Tie dye blue denim frayed edge bucket hat close-up detail' },
        // the hover overs
        { src: '/malibu-surfer2.png', alt: 'Just finished surfing in Malibu, drying off, wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/hollywood-hills5.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        extraLifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'tie-dye-blue', name: 'Tie Dye Blue Denim', swatchHex: '#6a84ad' }],
      },
    ],
    variants: [
      {
        id: 'hb-tie-dye-blue-ml',
        title: 'Tie Dye Blue Denim',
        sku: 'HB-TDB-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Tie Dye Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-tie-dye-blue-ml',
    extraLifestyleTitle: 'Dress it down. Dress it up.',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 8) FRAYED EDGE TIE DYE LIGHT BLUE
  'frayed-tie-dye-light-blue': {
    id: 'gid://mock/Product/8',
    handle: 'frayed-tie-dye-light-blue',
    sku: '8',
    title: TITLE_FRAYED,
    description: 'Light denim with texture and heart detail — casual structure with an easy, relaxed drape.',
    detailBullets: [
      'Light denim with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 98 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/frayed-tie-dye-light-blue.png', alt: 'Frayed Edge Bucket Hat in Tie Dye Blue Denim with heart embroidery' }),
        productImage({ src: '/products/frayed-tie-dye-light-blue2.png', alt: 'Tie dye blue denim frayed edge bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/palm-springs-light-blue1a.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' }),
        galleryImage({ src: '/palm-springs-light-blue2.png', alt: 'Tie dye blue denim frayed edge bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/palm-springs-light-blue3a.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/palm-springs-light-blue4.png', alt: 'Tie dye blue denim frayed edge bucket hat lifestyle photo' },
        // { src: '/hollywood-hills14.png', alt: 'Denim bucket hat' },
        { src: '/palm-springs-light-blue5.png', alt: 'Tie dye blue denim frayed edge bucket hat, outdoor lifestyle photo' },
        // { src: '/hollywood-hills1.png', alt: 'Denim bucket hat lifestyle' },
      );
      const extraLifestyleImages = imgs(
        { src: '/palm-springs-light-blue6.png', alt: 'Just finished surfing in Malibu wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/palm-springs-light-blue7a.png', alt: 'Tie dye blue denim frayed edge bucket hat close-up detail' },
        // the hover overs
        { src: '/palm-springs-light-blue6.png', alt: 'Just finished surfing in Malibu, drying off, wearing tie dye blue denim frayed edge bucket hat' },
        { src: '/palm-springs-light-blue7.png', alt: 'Model wearing tie dye blue denim frayed edge bucket hat' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        extraLifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'tie-dye-light-blue', name: 'Tie Dye Light Blue Denim', swatchHex: '#6a84ad' }],
      },
    ],
    variants: [
      {
        id: 'hb-tie-dye-light-blue-ml',
        title: 'Tie Dye Light Blue Denim',
        sku: 'HB-TDB-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Tie Dye Light Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-tie-dye-light-blue-ml',
    extraLifestyleTitle: 'Dress it down. Dress it up.',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 12) ULTRA FRAYED BLUE
  'ultra-frayed-blue': {
    id: 'gid://mock/Product/12',
    handle: 'ultra-frayed-blue',
    sku: '12',
    title: TITLE_ULTRA_FRAYED,
    description: 'Denim-blue canvas with an extra frayed brim — bold texture with the same Heart Bucket silhouette.',
    detailBullets: [
      'Blue canvas with a heavily frayed brim edge.',
      'Signature heart embroidery.',
      'Statement texture for everyday wear.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 44 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/ultra-frayed-dark-blue.png', alt: 'Ultra Frayed Bucket Hat in Dark Blue Denim with heart embroidery' }),
        productImage({ src: '/products/ultra-frayed-dark-blue.png', alt: 'Dark blue denim ultra frayed bucket hat, side view' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/portofino0.png', alt: 'Dark blue denim ultra frayed bucket hat detail' }),
        galleryImage({ src: '/portofino2.png', alt: 'Model wearing dark blue denim ultra frayed bucket hat' }),
      ] as const;
      // product slot 2 alternative: { src: '/hat-blue-frayed-asian1.png', alt: 'Blue very frayed bucket hat detail' }
      const lifestyleImages = imgs(
        { src: '/portofino4.png', alt: 'Dark blue denim ultra frayed bucket hat close-up detail' },
        { src: '/portofino5.png', alt: 'Model wearing dark blue denim ultra frayed bucket hat' },
        { src: '/portofino3.png', alt: 'Dark blue denim ultra frayed bucket hat with heart embroidery' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_ULTRA_FRAYED,
    headCircumferenceLabel: '58–60 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'very-frayed-blue', name: 'Dark Blue Denim', swatchHex: '#5b7aa2' }],
      },
    ],
    variants: [
      {
        id: 'hb-very-frayed-blue-ml',
        title: 'Dark Blue Denim',
        sku: 'HB-VFB-ONE',
        availableForSale: false,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Dark Blue Denim' }],
      },
    ],
    defaultVariantId: 'hb-very-frayed-blue-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // 13) ULTRA FRAYED BLUE PATCHWORK
  'ultra-frayed-blue-patchwork': {
    id: 'gid://mock/Product/13',
    handle: 'ultra-frayed-blue-patchwork',
    sku: '13',
    title: TITLE_ULTRA_FRAYED,
    description: 'Light denim with texture and heart detail — casual structure with an easy, relaxed drape.',
    detailBullets: [
      'Light denim with a stitched brim.',
      'Embroidered with Nury’s signature heart logo.',
      'Comfortable for warm days and travel.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.6, reviewCount: 98 },
    ...(() => {
      const productImages = [
        productImage({ src: '/products/ultra-frayed-blue-patchwork.png', alt: 'Ultra Frayed Bucket Hat in Blue Patchwork Denim with heart embroidery' }),
        productImage({ src: '/three-blues2.png', alt: 'Blue patchwork denim ultra frayed bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/palm-springs10.png', alt: 'Model wearing blue patchwork denim ultra frayed bucket hat' }),
        galleryImage({ src: '/palm-springs3.png', alt: 'Blue patchwork denim ultra frayed bucket hat lifestyle photo' }),
      ] as const;
      const lifestyleImages = imgs(
        { src: '/palm-springs6.png', alt: 'Model wearing blue patchwork denim ultra frayed bucket hat' },
        { src: '/palm-springs4.png', alt: 'Blue patchwork denim ultra frayed bucket hat lifestyle photo' },
        { src: '/palm-springs7.png', alt: 'Blue patchwork denim ultra frayed bucket hat, outdoor lifestyle photo' },
      );
      const extraLifestyleImages = imgs(
        { src: '/palm-springs9.png', alt: 'Model wearing blue patchwork denim ultra frayed bucket hat' },
        { src: '/palm-springs12.png', alt: 'Blue patchwork denim ultra frayed bucket hat close-up detail' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        extraLifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_ULTRA_FRAYED,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'three-blues', name: 'Blue Patchwork Denim', swatchHex: '#5b7aa2' }],
      },
    ],
    variants: [
      {
        id: 'hb-three-blues-ml',
        title: 'Blue Patchwork Denim',
        sku: 'HB-3BL-ONE',
        availableForSale: false,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Blue Patchwork Denim' }],
      },
    ],
    defaultVariantId: 'hb-three-blues-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },



  // CLASSIC BLACK
  'basic-black': {
    id: 'gid://mock/Product/9',
    handle: 'basic-black',
    sku: '9',
    title: TITLE_CLASSIC,
    description:
      'Soft black canvas with a clean brim and Nury’s signature heart. Built for everyday wear.',
    detailBullets: [
      'Soft black canvas with a stitched brim.',
      'Embroidered with Nury’s signature heart logo in red.',
      'Adjustable inner sweatband for the perfect fit.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.5, reviewCount: 129 },
    ...(() => {
      const productImages = [
        productImage({ src: '/hat-stitched-black.png', alt: 'Black Heart Bucket hat' }),
        productImage({ src: '/hat-black-top.png', alt: 'Black bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/hat-black-blonde-beach.png', alt: 'Black bucket hat lifestyle' }),
        galleryImage({ src: '/hat-black-blonde-beach2.png', alt: 'Black bucket hat lifestyle' }),
      ] as const;
      // gallery slot 2 alternative: { src: '/asian-girl.png', alt: 'Black bucket hat product' }
      const lifestyleImages = imgs(
        { src: '/hat-black-blonde-beach3.png', alt: 'Black Heart Bucket hat' },
        { src: '/hat-black-blonde-beach.png', alt: 'Black bucket hat lifestyle' },
        { src: '/hat-black-blonde-beach2.png', alt: 'Black bucket hat lifestyle' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_CLASSIC,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'black', name: 'Black', swatchHex: '#1a1a1a' }],
      },
    ],
    variants: [
      {
        id: 'hb-black-ml',
        title: 'Black',
        sku: 'HB-BLK-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Black' }],
      },
    ],
    defaultVariantId: 'hb-black-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },

  // CLASSIC CREAM
  'basic-cream': {
    id: 'gid://mock/Product/10',
    handle: 'basic-cream',
    sku: '10',
    title: TITLE_CLASSIC,
    description:
      'Soft cream canvas with a frayed brim and Nury’s signature heart. Clean, effortless, everyday.',
    detailBullets: [
      'Soft cream canvas with a frayed brim.',
      'Embroidered with Nury’s signature heart logo in red.',
      'Adjustable inner sweatband for the perfect fit.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.5, reviewCount: 129 },
    ...(() => {
      const productImages = [
        productImage({ src: '/hat-stitched-white.png', alt: 'Cream Heart Bucket hat' }),
        productImage({ src: '/bucket-hat-white-stitched.png', alt: 'Cream bucket hat detail' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/hamptons-model-white-hat.png', alt: 'Cream Heart Bucket hat — lifestyle' }),
        galleryImage({ src: '/hero-new.png', alt: 'Cream bucket hat on model' }),
      ] as const;
      // gallery slot 2 alternative: { src: '/hat-white-blonde.png', alt: 'Cream Heart Bucket hat — lifestyle' }
      const lifestyleImages = imgs(
        { src: '/hat-stitched-white.png', alt: 'Cream Heart Bucket hat' },
        { src: '/hamptons-model-white-hat.png', alt: 'Cream Heart Bucket hat — lifestyle' },
        { src: '/hero-new.png', alt: 'Cream bucket hat on model' },
        { src: '/bucket-hat-white-stitched.png', alt: 'Cream bucket hat detail' },
      );
      return {
        productImages,
        galleryImages,
        lifestyleImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: RELATED_CLASSIC,
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'cream', name: 'Cream', swatchHex: '#f0e6d8' }],
      },
    ],
    variants: [
      {
        id: 'hb-cream-ml',
        title: 'Cream',
        sku: 'HB-CRM-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Cream' }],
      },
    ],
    defaultVariantId: 'hb-cream-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },

  // TERRY PINK
  'terry-pink': {
    id: 'gid://mock/Product/11',
    handle: 'terry-pink',
    sku: '11',
    title: 'Terry Bucket Hat',
    description: 'Soft pink terry with Nury’s heart — cozy texture for relaxed days.',
    detailBullets: [
      'Plush terry with a relaxed brim.',
      'Embroidered with Nury’s signature heart logo in red.',
      'Easy to pair with casual looks.',
    ],
    features: [
      { label: 'SOFT CANVAS', icon: 'soft-canvas' },
      { label: 'BREATHABLE', icon: 'breathable' },
      { label: 'WASHABLE', icon: 'washable' },
    ],
    rating: { value: 4.5, reviewCount: 42 },
    ...(() => {
      const productImages = [
        productImage({ src: '/terry-pink3.png', alt: 'Pink terry Heart Bucket hat' }),
        productImage({ src: '/terry-pink3.png', alt: 'Pink terry bucket hat side view' }),
      ] as const;
      const galleryImages = [
        galleryImage({ src: '/terry-pink3.png', alt: 'Pink terry bucket hat' }),
        galleryImage({ src: '/terry-pink3.png', alt: 'Pink terry bucket hat detail' }),
      ] as const;
      return {
        productImages,
        galleryImages,
        images: mergePdpGridImages(productImages, galleryImages),
      };
    })(),
    relatedColors: [
      {
        id: 'pink-terry',
        name: 'Pink Terry',
        swatchHex: '#d9aeb8',
        handle: 'terry-pink',
      },
    ],
    headCircumferenceLabel: '56–58 cm',
    options: [
      {
        id: 'opt-color',
        name: 'Color',
        optionValues: [{ id: 'pink-terry', name: 'Pink', swatchHex: '#d9aeb8' }],
      },
    ],
    variants: [
      {
        id: 'hb-terry-ml',
        title: 'Pink',
        sku: 'HB-TRY-ONE',
        availableForSale: true,
        price: money('45.00'),
        selectedOptions: [{ name: 'Color', value: 'Pink' }],
      },
    ],
    defaultVariantId: 'hb-terry-ml',
    shippingNote: 'US shipping · Usually ships in 2–5 business days. See Shipping Policy.',
    returnsNote: 'Eligible returns within 14 days of delivery (unworn, with tags). See Returns & Exchanges.',
  },

};

/**
 * TODO: Replace placeholder values with real ProductVariant GIDs from Shopify.
 * Keep the `gid://shopify/ProductVariant/...` format.
 */
const SHOPIFY_VARIANT_ID_BY_HANDLE: Partial<Record<string, string>> = {
  'frayed-cream': 'gid://shopify/ProductVariant/53303120298349',
  'frayed-light-blue': 'gid://shopify/ProductVariant/53303127540077',
  'frayed-gray': 'gid://shopify/ProductVariant/53303135928685',
  'frayed-black': 'gid://shopify/ProductVariant/53303143465325',
  'frayed-blue': 'gid://shopify/ProductVariant/53303156212077',
  'frayed-tie-dye-blue': 'gid://shopify/ProductVariant/53303168532845',
  'frayed-tie-dye-light-blue': 'gid://shopify/ProductVariant/53303208477037',
  'frayed-dark-blue': 'gid://shopify/ProductVariant/53303201399149',
};

function placeholderVariantIdForHandle(handle: string): string {
  const explicit = SHOPIFY_VARIANT_ID_BY_HANDLE[handle];
  if (explicit) return explicit;
  const normalized = handle.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  return `gid://shopify/ProductVariant/PASTE_${normalized}_VARIANT_ID`;
}

const PRODUCTS_BY_HANDLE: Record<string, StorefrontProduct> = Object.fromEntries(
  Object.entries(PRODUCTS_BY_HANDLE_SEED).map(([handle, product]) => [
    handle,
    {
      ...product,
      variants: product.variants.map((variant) => ({
        ...variant,
        // One ProductVariant GID per purchasable item; replace placeholders before live checkout.
        shopifyVariantId: placeholderVariantIdForHandle(handle),
      })),
    },
  ]),
);

const PRODUCTS_BY_SKU: Record<string, StorefrontProduct> = Object.fromEntries(
  Object.values(PRODUCTS_BY_HANDLE).map((p) => [p.sku, p]),
);

const PRODUCTS_BY_SLUG: Record<string, StorefrontProduct> = Object.fromEntries(
  Object.values(PRODUCTS_BY_HANDLE).map((p) => [getProductCanonicalSlug(p), p]),
);

// ——— Homepage: Explore Icons (`PopularBucketHatsBlock`) ———

export const POPULAR_BUCKET_HATS_SECTION_TITLE = 'The Frayed Edit';

/** Explore Icons tile order — numbered catalogue SKUs (`StorefrontProduct.sku`), 1…n. */
export const POPULAR_BUCKET_HAT_HOMEPAGE_SKUS: readonly string[] = ['1', '2', '3', '4', '5', '6' ,'8', '7'];

/** @deprecated Use {@link POPULAR_BUCKET_HAT_HOMEPAGE_SKUS} */
export const POPULAR_BUCKET_HAT_HOMEPAGE_HANDLES: readonly string[] = POPULAR_BUCKET_HAT_HOMEPAGE_SKUS.map((sku) => {
  const p = PRODUCTS_BY_SKU[sku];
  if (!p) throw new Error(`POPULAR_BUCKET_HAT_HOMEPAGE_SKUS: unknown SKU "${sku}"`);
  return p.handle;
});

function formatUsdHome(amount: string): string {
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

function popularHatColorLabel(product: StorefrontProduct): string {
  return getProductColorLabel(product);
}

export type PopularBucketHatHomeRow = {
  sku: string;
  handle: string;
  slug: string;
  title: string;
  colorName: string;
  heroSrc: string;
  heroAlt: string;
  /** First `galleryImages` slot — shown on tile hover (desktop). */
  galleryHoverSrc?: string;
  galleryHoverAlt?: string;
  priceFormatted: string;
};

/** `/play` — Ultra Frayed tiles (PDP links). */
export const PLAY_PAGE_BUCKET_HAT_SKUS: readonly string[] = ['12', '13'];

function popularBucketHatHomeRowForSku(sku: string): PopularBucketHatHomeRow {
  const product = PRODUCTS_BY_SKU[sku];
  if (!product) {
    throw new Error(`getPopularBucketHatHomeRowsForSkus: missing mock product for SKU "${sku}"`);
  }
  const hero = product.productImages?.[0] ?? product.images[0];
  const galleryFirst = product.galleryImages?.[0];
  const def = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const priceFormatted = def ? formatUsdHome(def.price.amount) : '$45.00';
  return {
    sku,
    handle: product.handle,
    slug: getProductCanonicalSlug(product),
    title: product.title,
    colorName: popularHatColorLabel(product),
    heroSrc: hero?.url ?? '',
    heroAlt: hero?.altText ?? product.title,
    ...(galleryFirst?.url
      ? { galleryHoverSrc: galleryFirst.url, galleryHoverAlt: galleryFirst.altText ?? product.title }
      : {}),
    priceFormatted,
  };
}

/** Rows for `PopularBucketHatsBlock` — pass catalogue SKUs (`'1'`…`'n'`). */
export function getPopularBucketHatHomeRowsForSkus(skus: readonly string[]): PopularBucketHatHomeRow[] {
  return skus.map((sku) => popularBucketHatHomeRowForSku(sku));
}

/** Rows for `PopularBucketHatsBlock` — driven by {@link POPULAR_BUCKET_HAT_HOMEPAGE_SKUS}. */
export function getPopularBucketHatHomeRows(): PopularBucketHatHomeRow[] {
  return getPopularBucketHatHomeRowsForSkus(POPULAR_BUCKET_HAT_HOMEPAGE_SKUS);
}
