'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Box, Container } from '@mui/material';
import Image from 'next/image';
import { EditorialFrame } from '@/components/home/EditorialFrame';

/** Full-bleed image below `md` while staying in one DOM tree (no duplicate copy). */
const fullBleedImageWrapSx = {
  width: { xs: '100vw', md: '100%' },
  maxWidth: { xs: '100vw', md: '100%' },
  position: 'relative',
  left: { xs: '50%', md: 0 },
  marginLeft: { xs: '-50vw', md: 0 },
  marginRight: { xs: '-50vw', md: 0 },
  lineHeight: 0,
} as const;

export type HomepageEditorialSectionProps = {
  bgcolor: string;
  desktopImageSide: 'left' | 'right';
  gridTemplateColumns?: { xs?: string; md: string };
  pt?: { xs?: number; md?: number };
  pb?: { xs?: number; md?: number };
  py?: { xs?: number; md?: number };
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    href?: string;
    linkAriaLabel?: string;
    priority?: boolean;
    sizes?: string;
  };
  /** Wrap image in double-mat editorial frame (homepage experiment). */
  editorialFrame?: boolean;
  children: ReactNode;
};

/** One copy + one image; responsive order and full-bleed via CSS only. */
export function HomepageEditorialSection({
  bgcolor,
  desktopImageSide,
  gridTemplateColumns,
  pt,
  pb,
  py,
  image,
  editorialFrame = false,
  children,
}: HomepageEditorialSectionProps) {
  const imageOrderMd = desktopImageSide === 'left' ? 1 : 2;
  const copyOrderMd = desktopImageSide === 'left' ? 2 : 1;
  const justifyMd = desktopImageSide === 'right' ? 'flex-end' : 'flex-start';

  const imageEl = (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      priority={image.priority}
      sizes={image.sizes ?? '(max-width: 900px) 100vw, 48vw'}
      style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%' }}
    />
  );

  return (
    <Box
      component="section"
      sx={{
        bgcolor,
        ...(py != null ? { py } : {}),
        ...(pt != null ? { pt } : {}),
        ...(pb != null ? { pb } : {}),
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns ?? { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 0, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ order: { xs: 1, md: imageOrderMd }, ...fullBleedImageWrapSx }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: justifyMd }, width: '100%' }}>
              <EditorialFrame enabled={editorialFrame}>
                {image.href ? (
                  <Link
                    href={image.href}
                    aria-label={image.linkAriaLabel}
                    style={{ display: 'block', lineHeight: 0, maxWidth: '100%' }}
                  >
                    {imageEl}
                  </Link>
                ) : (
                  <Box sx={{ display: 'block', lineHeight: 0, maxWidth: '100%' }}>{imageEl}</Box>
                )}
              </EditorialFrame>
            </Box>
          </Box>
          <Box sx={{ order: { xs: 2, md: copyOrderMd }, mt: { xs: 4, md: 0 }, minWidth: 0 }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}
