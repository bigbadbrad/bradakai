import { NextResponse } from 'next/server';

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function parseAndValidateLines(body: unknown): CartLineInput[] {
  if (!body || typeof body !== 'object' || !('lines' in body)) {
    throw new Error('Request body must include a lines array.');
  }
  const lines = (body as { lines: unknown }).lines;
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error('lines must be a non-empty array.');
  }
  return lines.map((line, idx) => {
    const item = line as Partial<CartLineInput>;
    if (typeof item?.merchandiseId !== 'string' || item.merchandiseId.trim().length === 0) {
      throw new Error(`lines[${idx}].merchandiseId must be a non-empty string.`);
    }
    const qty = item.quantity;
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty <= 0) {
      throw new Error(`lines[${idx}].quantity must be a positive integer.`);
    }
    return { merchandiseId: item.merchandiseId.trim(), quantity: qty };
  });
}

export async function POST(req: Request) {
  try {
    const shopDomain =
      process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2026-01';

    if (!shopDomain || !token) {
      return NextResponse.json(
        { error: 'Missing Shopify server environment variables.' },
        { status: 500 },
      );
    }

    const lines = parseAndValidateLines(await req.json());

    const endpoint = `https://${shopDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '')}/api/${apiVersion}/graphql.json`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Private Storefront token header. Public storefront tokens use X-Shopify-Storefront-Access-Token.
        'Shopify-Storefront-Private-Token': token,
      },
      body: JSON.stringify({
        query: CART_CREATE_MUTATION,
        variables: {
          input: { lines },
        },
      }),
      cache: 'no-store',
    });

    const payload = await res.json();

    if (!res.ok) {
      console.error('Shopify cartCreate HTTP error', {
        status: res.status,
        statusText: res.statusText,
        body: payload,
      });
      return NextResponse.json(
        { error: 'Shopify checkout request failed.', details: payload?.errors ?? null },
        { status: 502 },
      );
    }

    const gqlErrors = payload?.errors;
    if (Array.isArray(gqlErrors) && gqlErrors.length > 0) {
      console.error('Shopify cartCreate GraphQL errors', gqlErrors);
      return NextResponse.json(
        { error: 'Shopify checkout GraphQL error.', details: gqlErrors },
        { status: 502 },
      );
    }

    const userErrors = payload?.data?.cartCreate?.userErrors ?? [];
    if (Array.isArray(userErrors) && userErrors.length > 0) {
      return NextResponse.json(
        { error: 'Shopify cartCreate userErrors', details: userErrors },
        { status: 400 },
      );
    }

    const cartId = payload?.data?.cartCreate?.cart?.id;
    const checkoutUrl = payload?.data?.cartCreate?.cart?.checkoutUrl;
    if (!cartId || !checkoutUrl) {
      console.error('Shopify cartCreate missing checkoutUrl/cartId', payload?.data?.cartCreate ?? null);
      return NextResponse.json(
        { error: 'Failed to create checkout session.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ cartId, checkoutUrl });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
    }
    if (error instanceof Error && error.message.includes('lines')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Unexpected create-cart route error', error);
    return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 });
  }
}
