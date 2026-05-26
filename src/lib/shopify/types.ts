/**
 * Storefront-shaped types — align with Shopify Storefront API for a smooth swap later.
 * @see https://shopify.dev/docs/api/storefront
 */

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ProductImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
  /** Mock / metafield: PDP desktop tile uses inset framing (contain + padding). */
  desktopInset?: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  /** e.g. "Color", "Size" */
  optionValues: { id: string; name: string; swatchHex?: string }[];
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  /** Shopify ProductVariant GID used for Storefront Cart API checkout. */
  shopifyVariantId: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
  image?: ProductImage | null;
}

export interface ProductRating {
  value: number;
  reviewCount: number;
}

/** Keys map to PDP icons — extend when adding products/metafields. */
export type ProductFeatureIcon = 'soft-canvas' | 'breathable' | 'washable';

export interface ProductFeature {
  label: string;
  icon?: ProductFeatureIcon;
}

export interface ProductColorLink {
  id: string;
  name: string;
  /** Left half of swatch (or full fill when {@link swatchHexSecondary} is omitted). */
  swatchHex: string;
  /** Right half — tie-dye colourways (e.g. denim + cream). */
  swatchHexSecondary?: string;
  handle: string;
}

/** Normalized product for PDP — maps cleanly from Storefront `Product` + metafields later. */
export interface StorefrontProduct {
  id: string;
  handle: string;
  /** Catalogue SKU (mock: `'1'`…`'n'`); variant rows keep fulfillment SKUs (e.g. `HB-BLK-ML`). */
  sku: string;
  title: string;
  description: string;
  /** Plain bullets for the Details section */
  detailBullets: string[];
  features: ProductFeature[];
  rating: ProductRating;
  /** PDP grid order: [product[0], gallery[0], gallery[1], product[1]] when `productImages` + `galleryImages` are set. */
  images: ProductImage[];
  /** Slots 1 & 4 on the PDP image grid (hero + detail); `desktopInset` for inset framing. */
  productImages?: readonly [ProductImage, ProductImage];
  /** Slots 2 & 3 on the PDP image grid (lifestyle tiles). */
  galleryImages?: readonly [ProductImage, ProductImage];
  /** Optional dedicated image set for "The perfect bucket hat" block on PDP. */
  lifestyleImages?: ProductImage[];
  /**
   * Optional extra strip under "The perfect bucket hat" (0 = hidden, 1 = single, 2+ = grid).
   * When length ≥ 4: [0–1] are the default left/right tiles; [2–3] swap in on hover.
   */
  extraLifestyleImages?: ProductImage[];
  /** Heading for {@link extraLifestyleImages}; defaults to "More to love". */
  extraLifestyleTitle?: string;
  options: ProductOption[];
  variants: ProductVariant[];
  /** Cross-product color swatches for PDP (maps each color to a product handle). */
  relatedColors?: ProductColorLink[];
  /** Default variant id when no query params */
  defaultVariantId: string;
  shippingNote: string;
  returnsNote: string;
  /** When set, product is one-size; shown on PDP (e.g. `56–58 cm`). */
  headCircumferenceLabel?: string;
}
