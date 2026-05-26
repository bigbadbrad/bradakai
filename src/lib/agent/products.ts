import type { StorefrontProduct, ProductVariant, ProductImage } from '@/lib/shopify/types';
import { getProductByHandle, getProductCanonicalSlug } from '@/lib/shopify/mock-storefront';

export interface AgentProductVariant {
  id: string;
  shopifyVariantId: string;
  sku: string;
  title: string;
  available: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  options: { name: string; value: string }[];
  image?: {
    url: string;
    altText: string;
  };
}

export interface AgentProductImage {
  url: string;
  altText: string;
  role: 'hero' | 'gallery' | 'lifestyle' | 'detail';
}

export interface AgentProductRating {
  value: number;
  count: number;
}

export interface AgentProduct {
  id: string;
  handle: string;
  slug: string;
  title: string;
  description: string;
  detailBullets: string[];
  rating: AgentProductRating | null;
  images: AgentProductImage[];
  variants: AgentProductVariant[];
  attributes: {
    shippingNote?: string;
    returnsNote?: string;
    lineTitle?: string;
  };
}

function firstNonEmpty<T>(arr: readonly T[] | undefined): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr[0];
}

function mapImages(product: StorefrontProduct): AgentProductImage[] {
  const images: AgentProductImage[] = [];

  const pushAll = (items: readonly ProductImage[] | undefined, role: AgentProductImage['role']) => {
    if (!items) return;
    for (const img of items) {
      images.push({ url: img.url, altText: img.altText, role });
    }
  };

  if (product.productImages) {
    pushAll(product.productImages, 'hero');
  }
  if (product.galleryImages) {
    pushAll(product.galleryImages, 'gallery');
  }
  if (product.lifestyleImages) {
    pushAll(product.lifestyleImages, 'lifestyle');
  }
  if (!product.productImages && !product.galleryImages && !product.lifestyleImages) {
    pushAll(product.images, 'detail');
  }

  return images;
}

function mapVariant(v: ProductVariant): AgentProductVariant {
  const img = v.image;
  return {
    id: v.id,
    shopifyVariantId: v.shopifyVariantId,
    sku: v.sku,
    title: v.title,
    available: v.availableForSale,
    price: {
      amount: v.price.amount,
      currencyCode: v.price.currencyCode,
    },
    options: v.selectedOptions.map((o) => ({ name: o.name, value: o.value })),
    image: img
      ? {
          url: img.url,
          altText: img.altText,
        }
      : undefined,
  };
}

export function toAgentProduct(product: StorefrontProduct): AgentProduct {
  const heroImage = firstNonEmpty(product.productImages ?? product.images);
  const images = mapImages(product);

  const rating: AgentProductRating | null =
    product.rating && product.rating.value > 0 && product.rating.reviewCount > 0
      ? { value: product.rating.value, count: product.rating.reviewCount }
      : null;

  return {
    id: product.id,
    handle: product.handle,
    slug: getProductCanonicalSlug(product),
    title: product.title,
    description: product.description,
    detailBullets: product.detailBullets,
    rating,
    images:
      images.length > 0 && heroImage
        ? images
        : heroImage
          ? [{ url: heroImage.url, altText: heroImage.altText, role: 'hero' }]
          : [],
    variants: product.variants.map(mapVariant),
    attributes: {
      shippingNote: product.shippingNote,
      returnsNote: product.returnsNote,
      lineTitle: product.title,
    },
  };
}

export async function getAgentProductBySlug(slug: string): Promise<AgentProduct | null> {
  const product = await getProductByHandle(slug);
  if (!product) return null;
  return toAgentProduct(product);
}

