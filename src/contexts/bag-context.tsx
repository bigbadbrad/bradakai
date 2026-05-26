'use client';

import * as React from 'react';

import type { ProductVariant, StorefrontProduct } from '@/lib/shopify/types';

/** Persisted bag — also removed on `/checkout/complete` after Shopify purchase. */
export const BAG_STORAGE_KEY = 'nury-shop-bag-v1';

export interface BagLineItem {
  variantId: string;
  productId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  shopifyVariantId: string;
  quantity: number;
  unitPriceAmount: string;
  currencyCode: string;
  imageUrl: string;
  imageAlt: string;
}

/** Legacy mock variant ids before one-size catalog (S/M removed). */
const LEGACY_ONE_SIZE_VARIANT_IDS: Record<string, string> = {
  'hb-white-fringe-sm': 'hb-white-fringe-ml',
  'hb-denim-sm': 'hb-denim-ml',
  'hb-gray-sm': 'hb-gray-ml',
  'hb-black-frayed-sm': 'hb-black-frayed-ml',
  'hb-frayed-blue-sm': 'hb-frayed-blue-ml',
  'hb-tie-dye-blue-sm': 'hb-tie-dye-blue-ml',
  'hb-very-frayed-blue-sm': 'hb-very-frayed-blue-ml',
  'hb-three-blues-sm': 'hb-three-blues-ml',
  'hb-black-sm': 'hb-black-ml',
  'hb-cream-sm': 'hb-cream-ml',
  'hb-terry-sm': 'hb-terry-ml',
};

function mergeBagLinesByVariantId(lines: BagLineItem[]): BagLineItem[] {
  const byId = new Map<string, BagLineItem>();
  for (const line of lines) {
    const existing = byId.get(line.variantId);
    if (existing) {
      byId.set(line.variantId, {
        ...existing,
        quantity: existing.quantity + line.quantity,
      });
    } else {
      byId.set(line.variantId, line);
    }
  }
  return Array.from(byId.values());
}

function loadFromStorage(): BagLineItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(BAG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return mergeBagLinesByVariantId(
      parsed
        .filter(
          (x): x is BagLineItem =>
            typeof x === 'object' &&
            x !== null &&
            typeof (x as BagLineItem).variantId === 'string' &&
            typeof (x as BagLineItem).quantity === 'number',
        )
        .map((line) => {
          const mappedId = LEGACY_ONE_SIZE_VARIANT_IDS[line.variantId] ?? line.variantId;
          return {
            ...line,
            variantId: mappedId,
            // Backward compatibility for older localStorage payloads created before Shopify checkout wiring.
            shopifyVariantId: typeof line.shopifyVariantId === 'string' ? line.shopifyVariantId : '',
          };
        }),
    );
  } catch {
    return [];
  }
}

interface BagContextValue {
  lines: BagLineItem[];
  totalQuantity: number;
  drawerOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  /** Empty bag in state and localStorage (e.g. after successful checkout on `/checkout/complete`). */
  clearBag: () => void;
  addToBag: (product: StorefrontProduct, variant: ProductVariant, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeLine: (variantId: string) => void;
}

export const BagContext = React.createContext<BagContextValue | undefined>(undefined);

export function useBag(): BagContextValue {
  const ctx = React.useContext(BagContext);
  if (!ctx) {
    throw new Error('useBag must be used within a BagProvider');
  }
  return ctx;
}

function lineFromProduct(product: StorefrontProduct, variant: ProductVariant): BagLineItem {
  const imageUrl =
    variant.image?.url ?? product.images[0]?.url ?? product.productImages?.[0]?.url ?? '';
  const imageAlt = variant.image?.altText ?? product.images[0]?.altText ?? product.title;
  return {
    variantId: variant.id,
    productId: product.id,
    productHandle: product.handle,
    productTitle: product.title,
    variantTitle: variant.title,
    sku: variant.sku,
    shopifyVariantId: variant.shopifyVariantId,
    quantity: 1,
    unitPriceAmount: variant.price.amount,
    currencyCode: variant.price.currencyCode,
    imageUrl,
    imageAlt,
  };
}

export function BagProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [lines, setLines] = React.useState<BagLineItem[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setLines(loadFromStorage());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    try {
      if (lines.length === 0) {
        window.localStorage.removeItem(BAG_STORAGE_KEY);
      } else {
        window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(lines));
      }
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const totalQuantity = React.useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const openBag = React.useCallback(() => setDrawerOpen(true), []);
  const closeBag = React.useCallback(() => setDrawerOpen(false), []);
  const toggleBag = React.useCallback(() => setDrawerOpen((o) => !o), []);

  const clearBag = React.useCallback(() => {
    setLines([]);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(BAG_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const addToBag = React.useCallback((product: StorefrontProduct, variant: ProductVariant, quantity = 1) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.variantId === variant.id);
      if (idx >= 0) {
        const next = [...prev];
        const row = next[idx];
        if (!row) return prev;
        next[idx] = { ...row, quantity: row.quantity + quantity };
        return next;
      }
      const base = lineFromProduct(product, variant);
      base.quantity = quantity;
      return [...prev, base];
    });
  }, []);

  const setQuantity = React.useCallback((variantId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((l) => l.variantId !== variantId);
      }
      return prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l));
    });
  }, []);

  const removeLine = React.useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const value = React.useMemo<BagContextValue>(
    () => ({
      lines,
      totalQuantity,
      drawerOpen,
      openBag,
      closeBag,
      toggleBag,
      clearBag,
      addToBag,
      setQuantity,
      removeLine,
    }),
    [lines, totalQuantity, drawerOpen, openBag, closeBag, toggleBag, clearBag, addToBag, setQuantity, removeLine],
  );

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
