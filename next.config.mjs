import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.mpsmc.org', pathname: '/**' },
      { protocol: 'https', hostname: 'assets.ranch.dog', pathname: '/**' },
    ],
  },
};

export default config;
