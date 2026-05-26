import type { ProductVariant, StorefrontProduct } from './types';
import { getProductCanonicalSlug } from './mock-storefront';

export type PdpSearchParams = {
  color?: string;
  size?: 'sm' | 'ml';
  img?: string;
};

const SIZE_CODE_TO_LABEL: Record<'sm' | 'ml', string> = {
  sm: 'S/M',
  ml: 'M/L',
};

export function sizeCodeToLabel(code: string | undefined): 'S/M' | 'M/L' {
  if (code === 'sm') return 'S/M';
  return 'M/L';
}

export function labelToSizeCode(label: string): 'sm' | 'ml' {
  return label === 'S/M' ? 'sm' : 'ml';
}

/** Build `/products/[slug]?color=&size=&img=` — `size` omitted for one-size products. */
export function buildProductUrl(handle: string, opts: { color?: string; size?: 'sm' | 'ml'; img?: number }): string {
  const sp = new URLSearchParams();
  if (opts.color) sp.set('color', opts.color);
  if (opts.size != null) sp.set('size', opts.size);
  if (opts.img != null && opts.img > 0) sp.set('img', String(opts.img));
  const q = sp.toString();
  const slug = getProductCanonicalSlug(handle);
  return `/products/${slug}${q ? `?${q}` : ''}`;
}

export function resolvePdpState(
  product: StorefrontProduct,
  raw: Record<string, string | string[] | undefined>,
): {
  activeVariant: ProductVariant;
  imageIndex: number;
  colorId: string;
  sizeCode: 'sm' | 'ml';
} {
  const defaultVariant =
    product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];

  const defaultColor =
    defaultVariant.selectedOptions.find((o) => o.name === 'Color')?.value ?? '';
  const defaultSizeLabel =
    defaultVariant.selectedOptions.find((o) => o.name === 'Size')?.value ?? 'M/L';

  const colorOpt = product.options.find((o) => o.name === 'Color');
  const sizeOpt = product.options.find((o) => o.name === 'Size');
  const defaultColorId =
    colorOpt?.optionValues.find((v) => v.name === defaultColor)?.id ??
    colorOpt?.optionValues[0]?.id ??
    '';

  const colorParam = typeof raw.color === 'string' ? raw.color : undefined;
  const sizeParam = typeof raw.size === 'string' ? raw.size : undefined;
  const imgParam = typeof raw.img === 'string' ? raw.img : undefined;

  const colorId =
    colorParam && colorOpt?.optionValues.some((v) => v.id === colorParam)
      ? colorParam
      : defaultColorId;

  const colorName = colorOpt?.optionValues.find((v) => v.id === colorId)?.name ?? defaultColor;

  const sizeCode: 'sm' | 'ml' =
    sizeParam === 'sm' || sizeParam === 'ml' ? sizeParam : labelToSizeCode(defaultSizeLabel);

  const sizeName = SIZE_CODE_TO_LABEL[sizeCode];

  const activeVariant = !sizeOpt
    ? (product.variants.find((v) =>
        v.selectedOptions.some((o) => o.name === 'Color' && o.value === colorName),
      ) ?? defaultVariant)
    : (product.variants.find(
        (v) =>
          v.selectedOptions.some((o) => o.name === 'Color' && o.value === colorName) &&
          v.selectedOptions.some((o) => o.name === 'Size' && o.value === sizeName),
      ) ?? defaultVariant);

  const parsedImg = imgParam != null ? Number.parseInt(imgParam, 10) : 0;
  const imageIndex = Number.isFinite(parsedImg)
    ? Math.min(Math.max(parsedImg, 0), Math.max(0, product.images.length - 1))
    : 0;

  return { activeVariant, imageIndex, colorId, sizeCode };
}
