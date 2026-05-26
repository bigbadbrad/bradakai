import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { getAllProductHandles, getProductByHandle } from '@/lib/shopify/mock-storefront';
import { resolvePdpState } from '@/lib/shopify/pdp-url';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  return getAllProductHandles().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) {
    return { title: { absolute: 'Product' } };
  }
  const related = product.relatedColors?.find((c) => c.handle === product.handle);
  const colorOpt = product.options.find((o) => o.name === 'Color');
  const def = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const selectedColorValue = def?.selectedOptions.find((o) => o.name === 'Color')?.value;
  const colorName =
    related?.name ??
    (selectedColorValue &&
      (colorOpt?.optionValues.find((v) => v.name === selectedColorValue)?.name ?? selectedColorValue)) ??
    'Frayed';
  const lineTitle = product.title;
  const title = `${colorName} ${lineTitle} | Nury`;
  const description = `${colorName} ${lineTitle.toLowerCase()} for women, defined by Nury’s signature heart icon and relaxed frayed-edge style designed to stand out.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://nury.love/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://nury.love/products/${slug}`,
      siteName: 'nury',
      type: 'website',
    },
  };
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const raw = (await searchParams) ?? {};
  const product = await getProductByHandle(slug);
  if (!product) notFound();

  const state = resolvePdpState(product, raw);

  return (
    <ProductDetailView
      product={product}
      activeVariant={state.activeVariant}
      imageIndex={state.imageIndex}
      colorId={state.colorId}
      sizeCode={state.sizeCode}
    />
  );
}
