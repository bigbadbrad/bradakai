import { SITE_URL } from '@/lib/legal/site';

export function getSiteURL(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set to https://bradakai.com in production.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    (process.env.NODE_ENV === 'production' ? `${SITE_URL}/` : 'http://localhost:3000/');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}
