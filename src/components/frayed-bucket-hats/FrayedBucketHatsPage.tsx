import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { GuidePageHero } from '@/components/bucket-hats/GuidePageHero';
import {
  accentMuted,
  avantGardeStack,
  bgCream,
  bgWhite,
  bodySx,
  cardTitleSx,
  filledCtaSx,
  guideInlineLinkSx,
  h1Sx,
  h2Sx,
  labelSx,
  outlinedButtonSx,
} from '@/components/bucket-hats/constants';
import {
  FRAYED_INTERNAL_PRODUCT_LINKS,
  FRAYED_PAGE_IMAGES,
  NURY_PROPORTION_TABLE_ROWS,
  STYLING_TILES,
} from '@/lib/frayed-bucket-hats/page-content';
import { getProductCanonicalSlug } from '@/lib/shopify/mock-storefront';
import { PRODUCT_LINKS_ENABLED } from '@/lib/bradakai/catalog';
import { FrayedBucketHatProductGrid } from './FrayedBucketHatProductGrid';
import { FrayedBucketHatsFaqSection } from './FrayedBucketHatsFaqSection';

const mobileFullBleedImageWrapSx = {
  width: { xs: '100vw', md: '100%' },
  maxWidth: { xs: '100vw', md: '100%' },
  position: 'relative',
  left: { xs: '50%', md: 0 },
  marginLeft: { xs: '-50vw', md: 0 },
  marginRight: { xs: '-50vw', md: 0 },
  lineHeight: 0,
} as const;

function SectionShell({
  id,
  bg,
  children,
  py = { xs: 6, md: 9 },
  overflowXHidden,
}: {
  id?: string;
  bg: typeof bgCream | typeof bgWhite;
  children: ReactNode;
  py?: { xs: number; md: number };
  overflowXHidden?: boolean;
}) {
  return (
    <Box
      component="section"
      id={id}
      sx={{ bgcolor: bg, py, ...(overflowXHidden ? { overflowX: 'hidden' } : {}) }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

function EditorialSplit({
  id,
  bg,
  imageFirstOnMobile,
  image,
  children,
  py = { xs: 6, md: 9 },
  mobileFullBleedImage,
}: {
  id?: string;
  bg: typeof bgCream | typeof bgWhite;
  imageFirstOnMobile?: boolean;
  image: ReactNode;
  children: ReactNode;
  py?: { xs: number; md: number };
  /** Below `md`, image spans viewport width (homepage editorial style). */
  mobileFullBleedImage?: boolean;
}) {
  return (
    <SectionShell id={id} bg={bg} py={py} overflowXHidden={mobileFullBleedImage}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: mobileFullBleedImage ? 0 : 4, md: 6 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            order: { xs: imageFirstOnMobile ? 0 : 1, md: 0 },
            ...(mobileFullBleedImage ? mobileFullBleedImageWrapSx : {}),
          }}
        >
          {image}
        </Box>
        <Box
          sx={{
            order: { xs: imageFirstOnMobile ? 1 : 0, md: 1 },
            ...(mobileFullBleedImage ? { mt: { xs: 4, md: 0 }, minWidth: 0 } : {}),
          }}
        >
          {children}
        </Box>
      </Box>
    </SectionShell>
  );
}

const pullQuoteSx = {
  fontFamily: avantGardeStack,
  fontSize: { xs: '1.15rem', md: '1.35rem' },
  lineHeight: 1.35,
  letterSpacing: '0.02em',
  color: '#111827',
  fontWeight: 500,
  borderLeft: `3px solid ${accentMuted}`,
  pl: 2.5,
  my: 3,
};

export const FrayedBucketHatsPage: FC = () => {
  const heroImg = FRAYED_PAGE_IMAGES.hero;

  const heroLead = (
    <Box>
      <Typography component="p" sx={{ ...labelSx, mb: 2 }}>
        Seen in Malibu. Worn everywhere.
      </Typography>
      <Typography component="h1" sx={h1Sx}>
        Frayed Bucket Hats for Women
      </Typography>
      <Typography sx={{ ...bodySx, color: '#111827', fontWeight: 500, mb: 2 }}>
        Soft canvas. Raw edges. A clean fashion silhouette. Nury frayed bucket hats are made for the everyday icon —
        relaxed enough for coffee runs, polished enough for golden hour, and designed never to feel oversized or floppy.
      </Typography>
      <Typography sx={{ ...bodySx, mb: 3 }}>
        Every Nury bucket is built around The Nury Proportion: a 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, and balanced
        outer silhouette — enough shade to feel useful, enough structure to look styled, and never so oversized that it
        turns floppy.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button component={Link} href="#shop-frayed-bucket-hats" variant="contained" disableElevation sx={filledCtaSx}>
          Shop frayed bucket hats
        </Button>
        <Button component={Link} href="#nury-proportion" variant="outlined" sx={outlinedButtonSx}>
          See The Nury Proportion
        </Button>
      </Box>
    </Box>
  );

  const heroImage = (
    <Box sx={{ display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' }, width: '100%' }}>
      <Image
        src={heroImg.src}
        width={heroImg.w}
        height={heroImg.h}
        alt={heroImg.alt}
        priority
        sizes="(max-width: 900px) 100vw, 45vw"
        style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%' }}
      />
    </Box>
  );

  const internalProductLinks = FRAYED_INTERNAL_PRODUCT_LINKS.map(({ label, handle }) => ({
    label,
    href: `/products/${getProductCanonicalSlug(handle)}`,
  }));

  return (
    <>
      <GuidePageHero
        breadcrumbLabel="Frayed bucket hats"
        lead={heroLead}
        image={heroImage}
        pb={{ xs: 12, md: 16 }}
        mobileFlushHero
      />

      <FrayedBucketHatProductGrid />

      <EditorialSplit
        id="what-is-a-frayed-bucket-hat"
        bg={bgCream}
        py={{ xs: 8, md: 12 }}
        mobileFullBleedImage
        image={
          <Image
            src={FRAYED_PAGE_IMAGES.detail.src}
            width={FRAYED_PAGE_IMAGES.detail.w}
            height={FRAYED_PAGE_IMAGES.detail.h}
            alt={FRAYED_PAGE_IMAGES.detail.alt}
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        }
      >
        <Typography component="h2" sx={h2Sx}>
          What is a frayed bucket hat?
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          A frayed bucket hat is a bucket hat finished with a raw, softened, or intentionally imperfect edge — usually
          along the brim. That small detail changes the whole mood. It makes the hat feel less stiff, less sporty, and
          more lived-in.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          For Nury, the frayed edge is not just decoration. It is part of the attitude: relaxed, feminine, slightly
          undone, and easy to wear with the pieces you already love.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 0, fontStyle: 'italic' }}>
          Think denim shorts, white tanks, linen, swimsuits, soft knits, vintage sunglasses, and the kind of outfit that
          looks better when it is not overthought.
        </Typography>
      </EditorialSplit>

      <SectionShell bg={bgWhite} py={{ xs: 8, md: 16 }}>
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Typography component="h2" sx={h2Sx}>
            Most bucket hats only tell you if they fit. Not how they look.
          </Typography>
          <Typography sx={{ ...bodySx, mb: 2 }}>
            Most bucket hats are sold as “one size,” and most size charts only measure head circumference. That tells you
            whether the hat will go on your head. It does not tell you whether the hat will look clean, oversized, floppy,
            or flattering.
          </Typography>
          <Typography sx={{ ...bodySx, mb: 0 }}>
            Two bucket hats can fit the same head size and still look completely different. A taller crown, wider brim,
            more crown flare, or softer construction can increase the outer silhouette — making the hat feel bigger even
            when the inside fit is the same.
          </Typography>
          <Typography component="p" sx={pullQuoteSx}>
            Fit tells you whether the hat goes on. The Nury Proportion tells you why it looks right.
          </Typography>
        </Box>
      </SectionShell>

      <SectionShell id="nury-proportion" bg={bgCream} py={{ xs: 8, md: 12 }} overflowXHidden>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
            width: '100%',
            minWidth: 0,
            maxWidth: { xs: 640, md: 'none' },
            mx: { xs: 'auto', md: 0 },
          }}
        >
          <Box sx={{ minWidth: 0, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Image
              src="/bucket-hat-parts2.png"
              width={934}
              height={626}
              alt="Bucket hat diagram of crown, brim, and balanced outer silhouette."
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          </Box>
          <Box sx={{ minWidth: 0, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography component="h2" sx={{ ...h2Sx, textAlign: { xs: 'center', md: 'left' } }}>
              The Nury Proportion
            </Typography>
            <Typography sx={{ ...bodySx, mb: 2 }}>
              The Nury Proportion is our fashion-first interpretation of a classic bucket hat: a clean 9 cm / 3.5 in
              crown, 7 cm / 2.75 in brim, and balanced outer silhouette.
            </Typography>
            <Typography sx={{ ...bodySx, mb: 3 }}>
              It is not the smallest bucket hat, and it is not an oversized sun hat. It sits in the sweet spot — enough
              brim to feel useful, enough structure to look styled, and never so much volume that the shape turns floppy.
            </Typography>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: '1px solid #e8e0d4',
                borderRadius: 0,
                maxWidth: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <Table size="small" sx={{ width: '100%', minWidth: { xs: 0, md: 480 } }}>
                <TableHead sx={{ bgcolor: bgWhite }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Measurement</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Nury Proportion</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Why It Matters</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {NURY_PROPORTION_TABLE_ROWS.map((row) => (
                    <TableRow key={row[0]}>
                      <TableCell sx={{ fontWeight: 600 }}>{row[0]}</TableCell>
                      <TableCell>{row[1]}</TableCell>
                      <TableCell sx={{ color: '#4b5563' }}>{row[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ ...bodySx, mb: 0, mt: 3 }}>
              The Nury Proportion keeps the hat in the fashion bucket zone: enough brim to feel practical, enough
              structure to look intentional, and a silhouette that works with everyday outfits instead of taking them
              over.{' '}
              <MuiLink component={Link} href="/hat-sizes" sx={guideInlineLinkSx}>
                See the full hat size chart
              </MuiLink>
              .
            </Typography>
          </Box>
        </Box>
      </SectionShell>

      <EditorialSplit
        id="not-oversized-not-floppy"
        bg={bgWhite}
        py={{ xs: 8, md: 12 }}
        imageFirstOnMobile
        mobileFullBleedImage
        image={
          <Image
            src={FRAYED_PAGE_IMAGES.lifestyle.src}
            width={FRAYED_PAGE_IMAGES.lifestyle.w}
            height={FRAYED_PAGE_IMAGES.lifestyle.h}
            alt={FRAYED_PAGE_IMAGES.lifestyle.alt}
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        }
      >
        <Typography component="h2" sx={h2Sx}>
          Not oversized. Not floppy. Just enough.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          A bigger bucket hat can shield more sun, but it can also overwhelm the face, soften the shape too much, and
          make the whole look feel less considered. Nury is designed differently.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          The brim falls with ease. The crown stays clean. The frayed edge adds softness without making the hat collapse
          into a floppy sun-hat shape. It is the bucket you throw on without thinking — and somehow it pulls everything
          together.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 0, fontWeight: 600, color: '#111827' }}>
          The goal is not maximum size. The goal is maximum wearability.
        </Typography>
      </EditorialSplit>

      <SectionShell id="dress-it-down-dress-it-up" bg={bgCream} py={{ xs: 8, md: 12 }}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center' }}>
          Dress it up.  Dress it down.
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 4 }}>
          That is the point of the Nury bucket. It works after the beach, on a coffee run, with denim, with a white dress,
          with a swimsuit, with soft knits, with sunglasses, with almost nothing planned.
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 5 }}>
          The frayed edge keeps it relaxed. The heart mark keeps it recognizable. The silhouette keeps it polished.
        </Typography>
        <Grid container spacing={2}>
          {STYLING_TILES.map((tile) => (
            <Grid item xs={12} sm={6} md={3} key={tile.heading}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: '100%',
                  border: '1px solid #e8e0d4',
                  borderRadius: 0,
                  bgcolor: bgWhite,
                }}
              >
                <Typography sx={cardTitleSx}>
                  {tile.heading}
                </Typography>
                <Typography sx={{ color: '#4b5563', fontSize: '0.92rem', lineHeight: 1.65 }}>{tile.copy}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      <EditorialSplit
        bg={bgWhite}
        py={{ xs: 8, md: 12 }}
        image={
          <Image
            src="/products/frayed-tie-dye-light-blue-clear.png"
            width={800}
            height={800}
            alt="Close-up of Nury tie dye light blue denim frayed bucket hat brim and heart embroidery"
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
        }
      >
        <Typography component="h2" sx={h2Sx}>
          The beauty of the raw edge
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          A frayed edge makes a bucket hat feel less perfect in the best way. It softens the outline, catches the light,
          and gives the hat a little movement. It feels like something already in your rotation — not something you are
          trying too hard to style.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 0 }}>
          That is why Nury starts here. The frayed bucket is our first icon: feminine, casual, recognizable, and just
          undone enough.
        </Typography>
      </EditorialSplit>

      <SectionShell bg={bgCream} py={{ xs: 8, md: 12 }}>
        <Typography component="h2" sx={h2Sx}>
          Find your Nury bucket
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
          New to bucket hats? Start with our guide to bucket hat styles, fit, fabrics, and silhouettes. Already know your
          color? Shop the frayed bucket collection and find the shade that feels like yours.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, color: '#4b5563', lineHeight: 2 }}>
          <li>
            <MuiLink component={Link} href="/bucket-hat" sx={guideInlineLinkSx}>
              Read the ultimate bucket hat guide
            </MuiLink>
          </li>
          <li>
            <MuiLink component={Link} href="/hat-sizes" sx={guideInlineLinkSx}>
              See the Nury bucket hat size guide
            </MuiLink>
          </li>
          <li>
            <MuiLink component={Link} href="/" sx={guideInlineLinkSx}>
              Explore the world of Nury
            </MuiLink>
          </li>
          {PRODUCT_LINKS_ENABLED
            ? internalProductLinks.map((link) => (
                <li key={link.href}>
                  <MuiLink component={Link} href={link.href} sx={guideInlineLinkSx}>
                    {link.label}
                  </MuiLink>
                </li>
              ))
            : null}
        </Box>
      </SectionShell>

      <FrayedBucketHatsFaqSection />

      <SectionShell bg={bgCream}>
        <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}>
          <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center' }}>
            The frayed bucket, refined
          </Typography>
          <Typography sx={{ ...bodySx, textAlign: 'center', mb: 3 }}>
            Soft enough for everyday. Structured enough to style. Finished with the Nury heart and designed in the
            silhouette we believe makes a bucket hat feel right.
          </Typography>
          <Button
            component={Link}
            href="#shop-frayed-bucket-hats"
            variant="contained"
            disableElevation
            sx={filledCtaSx}
          >
            Shop frayed bucket hats
          </Button>
          <Typography component="p" sx={{ ...labelSx, mt: 4, mb: 0, textAlign: 'center' }}>
            Seen in Malibu. Worn everywhere.
          </Typography>
        </Box>
      </SectionShell>
    </>
  );
};
