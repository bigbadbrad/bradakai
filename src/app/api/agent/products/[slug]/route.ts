import { NextResponse } from 'next/server';

import { getAgentProductBySlug } from '@/lib/agent/products';

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: Request, { params }: RouteParams) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Missing product slug.' }, { status: 400 });
  }

  const product = await getAgentProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  return NextResponse.json(product, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
    },
  });
}

