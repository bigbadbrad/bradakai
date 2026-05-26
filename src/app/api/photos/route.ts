import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PHOTOS_DIR = path.join(process.cwd(), 'public', 'photos-lucky-ranch');
const IMAGE_EXT = /\.(jpg|jpeg|png|webp|gif)$/i;

export async function GET() {
  try {
    if (!fs.existsSync(PHOTOS_DIR)) {
      return NextResponse.json([]);
    }
    const files = fs.readdirSync(PHOTOS_DIR).filter((f) => IMAGE_EXT.test(f));
    const paths = files.map((f) => `/photos-lucky-ranch/${f}`);
    return NextResponse.json(paths);
  } catch {
    return NextResponse.json([]);
  }
}
