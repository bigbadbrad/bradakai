#!/usr/bin/env node

/**
 * Temporary utility: print Shopify product + variant IDs from Storefront API.
 *
 * Required env:
 * - NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN (e.g. "your-store.myshopify.com")
 * - SHOPIFY_STOREFRONT_ACCESS_TOKEN (or SHOPIFY_STOREFRONT_PRIVATE_TOKEN)
 *
 * Optional env:
 * - SHOPIFY_STOREFRONT_API_VERSION (default: 2025-01)
 * - SHOPIFY_PRODUCT_COUNT (default: 8)
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx <= 0) continue;
    const key = line.slice(0, eqIdx).trim();
    let value = line.slice(eqIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const cwd = process.cwd();
loadEnvFile(path.join(cwd, '.env.local'));
loadEnvFile(path.join(cwd, '.env'));

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-01';
const productCount = Number(process.env.SHOPIFY_PRODUCT_COUNT || '8');

if (!domain || !token) {
  console.error('Missing required environment variables.');
  console.error(
    'Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN (or SHOPIFY_STOREFRONT_PRIVATE_TOKEN), then rerun.',
  );
  process.exit(1);
}

if (!Number.isFinite(productCount) || productCount < 1) {
  console.error('SHOPIFY_PRODUCT_COUNT must be a positive number.');
  process.exit(1);
}

const normalizedDomain = String(domain).trim().replace(/^https?:\/\//, '').replace(/\/+$/, '');
const normalizedApiVersion = String(apiVersion).trim().replace(/^\/+|\/+$/g, '');
const tokenTrimmed = String(token).trim().replace(/^['"]|['"]$/g, '');
const endpoint = `https://${normalizedDomain}/api/${normalizedApiVersion}/graphql.json`;

const query = `
  query GetProductsWithVariantIds($first: Int!) {
    products(first: $first, sortKey: TITLE) {
      nodes {
        id
        handle
        title
        variants(first: 100) {
          nodes {
            id
            title
            sku
          }
        }
      }
    }
  }
`;

async function main() {
  const authHeaders = [
    {
      label: 'X-Shopify-Storefront-Access-Token',
      header: { 'X-Shopify-Storefront-Access-Token': tokenTrimmed },
    },
    {
      label: 'Shopify-Storefront-Private-Token',
      header: { 'Shopify-Storefront-Private-Token': tokenTrimmed },
    },
  ];

  let res;
  let authLabel = authHeaders[0].label;
  for (const candidate of authHeaders) {
    authLabel = candidate.label;
    const attempt = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...candidate.header,
      },
      body: JSON.stringify({
        query,
        variables: { first: productCount },
      }),
    });
    if (attempt.status !== 401) {
      res = attempt;
      break;
    }
    res = attempt;
  }

  if (!res) {
    throw new Error('No response received from Shopify.');
  }

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401) {
      console.error('Unauthorized from Shopify Storefront API.');
      console.error(`Endpoint: ${endpoint}`);
      console.error(`Auth header tried last: ${authLabel}`);
      console.error(`Token length: ${tokenTrimmed.length} (value hidden)`);
      console.error('Check token type (public vs private), token scopes, and exact shop domain.');
    }
    throw new Error(`Storefront request failed (${res.status} ${res.statusText}): ${body}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GraphQL errors:\n${JSON.stringify(json.errors, null, 2)}`);
  }

  const products = json?.data?.products?.nodes ?? [];

  console.log(`Fetched ${products.length} product(s) from ${domain} (${apiVersion})`);
  console.log('');

  for (const product of products) {
    const variants = product?.variants?.nodes ?? [];
    console.log(`${product.title} (${product.handle})`);
    console.log(`  productId: ${product.id}`);
    for (const variant of variants) {
      const skuLabel = variant.sku ? ` | sku: ${variant.sku}` : '';
      console.log(`  - ${variant.title}: ${variant.id}${skuLabel}`);
    }
    console.log('');
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
