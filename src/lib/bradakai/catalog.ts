/** Set false to disable shop, collections, and product links across the marketing site. */
export const PRODUCT_LINKS_ENABLED = false;

export function isCommerceHref(href: string): boolean {
  return (
    href === '/shop' ||
    href.startsWith('/shop/') ||
    href === '/collections' ||
    href.startsWith('/collections/') ||
    href.startsWith('/products/')
  );
}

/** @deprecated Use isCommerceHref */
export const isShopOrProductHref = isCommerceHref;
