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
  avantGardeStack,
  bgCream,
  bgWhite,
  bodyColor,
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
  FASHION_FIT_IMAGES,
  HAT_SIZE_CONVERSION_ROWS,
  HAT_SIZES_HERO_IMAGE,
  MEASURE_HEAD_STEPS,
  NURY_PROPORTION_TABLE_ROWS,
  NURY_FIT_NOTES_ROWS,
} from '@/lib/hat-sizes/page-content';
import { getProductCanonicalSlug } from '@/lib/shopify/mock-storefront';
import { HatSizesFaqSection } from './HatSizesFaqSection';

function SectionShell({
  id,
  bg,
  children,
  narrow = false,
}: {
  id?: string;
  bg: typeof bgCream | typeof bgWhite;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <Box component="section" id={id} sx={{ bgcolor: bg, py: { xs: 6, md: 9 } }}>
      <Container maxWidth={narrow ? 'md' : 'lg'}>{children}</Container>
    </Box>
  );
}

function DataTable({
  headers,
  rows,
  minWidth = 640,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  minWidth?: number;
}) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e8e0d4', borderRadius: 0 }}>
      <Table size="small" sx={{ minWidth }}>
        <TableHead sx={{ bgcolor: bgCream }}>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} sx={{ fontWeight: 700 }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              {row.map((cell, index) => (
                <TableCell
                  key={`${row[0]}-${cell}-${index}`}
                  sx={{ color: bodyColor, fontWeight: index === 0 ? 600 : 400, verticalAlign: 'top' }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const pullQuoteSx = {
  fontFamily: avantGardeStack,
  fontSize: { xs: '1.15rem', md: '1.35rem' },
  lineHeight: 1.35,
  letterSpacing: '0.02em',
  color: '#111827',
  fontWeight: 500,
  borderLeft: '3px solid #a06b5f',
  pl: 2.5,
  my: 3,
} as const;

const sizingCardSx = {
  p: 2.5,
  height: '100%',
  border: '1px solid #e8e0d4',
  borderRadius: 0,
  bgcolor: bgWhite,
} as const;

const INTERNAL_PRODUCT_LINKS = [
  { label: 'Shop Cream Denim Frayed Bucket Hat', handle: 'frayed-cream' },
  { label: 'Shop Light Blue Denim Frayed Bucket Hat', handle: 'frayed-light-blue' },
  { label: 'Shop Black Denim Frayed Bucket Hat', handle: 'frayed-black' },
] as const;

export const HatSizesPage: FC = () => {
  const heroImg = HAT_SIZES_HERO_IMAGE;

  const heroLead = (
    <Box>
      <Typography component="p" sx={{ ...labelSx, mb: 2 }}>
        Nury fit guide
      </Typography>
      <Typography component="h1" sx={h1Sx}>
        Bucket hat sizes:<br />fit vs. silhouette
      </Typography>
      <Typography sx={{ ...bodySx, color: '#111827', fontWeight: 500, mb: 2 }}>
        Most hat-size charts tell you whether a hat fits. Nury goes further — showing how a bucket hat will actually
        look when worn.
      </Typography>
      <Typography sx={{ ...bodySx, mb: 2 }}>
        A bucket hat can fit your head perfectly and still look too big. Standard hat sizing measures the inside of the
        hat, but it does not explain the crown height, brim width, brim angle, or total outside silhouette. Nury bucket
        hats are designed around The Nury Proportion: a 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, and balanced outer
        silhouette.
      </Typography>
      <Typography sx={{ ...bodySx, mb: 2 }}>
        Most hat-size charts only answer one question: will the hat fit your head? That matters, but for bucket hats it is
        not the whole story.
      </Typography>
      <Typography sx={{ ...bodySx, mb: 2 }}>
        Two bucket hats can fit the same head circumference and still look completely different when worn. One can look
        clean, flattering, and fashion-forward. Another can look oversized, floppy, and more like a sun hat.
      </Typography>
      <Typography sx={{ ...bodySx, mb: 3 }}>
        That is why Nury looks at two kinds of sizing: fit size and silhouette size.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button component={Link} href="/frayed-bucket-hats" variant="contained" disableElevation sx={filledCtaSx}>
          Shop Nury bucket hats
        </Button>
        <Button component={Link} href="/bucket-hat" variant="outlined" sx={outlinedButtonSx}>
          Read the bucket hat guide
        </Button>
      </Box>
    </Box>
  );

  const heroImage = (
    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
      <Image
        src={heroImg.src}
        width={heroImg.w}
        height={heroImg.h}
        alt={heroImg.alt}
        priority
        sizes="(max-width: 900px) 100vw, 45vw"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  );

  return (
    <>
      <GuidePageHero breadcrumbLabel="Hat sizes" lead={heroLead} image={heroImage} />

      <SectionShell id="fit-vs-silhouette" bg={bgWhite}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 4 }}>
          Fit size tells you one thing. Silhouette tells you everything else.
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={sizingCardSx}>
              <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1.5, fontSize: '1.05rem' }}>Fit Size</Typography>
              <Typography sx={{ ...bodySx, mb: 2 }}>
                Fit size measures the inside of the hat — usually the head circumference. This tells you whether the hat
                will sit comfortably on your head.
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: bodyColor, fontSize: '0.9rem', lineHeight: 1.7 }}>
                <li>Typical women’s fit: 56–58 cm</li>
                <li>Measured around the head</li>
                <li>Used for standard hat-size charts</li>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ ...sizingCardSx, bgcolor: bgCream }}>
              <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1.5, fontSize: '1.05rem' }}>
                Silhouette Size
              </Typography>
              <Typography sx={{ ...bodySx, mb: 2 }}>
                Silhouette size describes the outside of the hat — how wide, deep, structured, or floppy it looks when
                worn.
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: bodyColor, fontSize: '0.9rem', lineHeight: 1.7 }}>
                <li>Affected by crown height</li>
                <li>Affected by brim width</li>
                <li>Affected by brim angle and crown flare</li>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Typography component="p" sx={{ ...pullQuoteSx, mb: 0, textAlign: 'center', borderLeft: 'none', pl: 0 }}>
          Fit tells you whether the hat goes on. Silhouette tells you whether it looks good.
        </Typography>
      </SectionShell>

      <SectionShell id="nury-proportion" bg={bgCream}>
        <Box sx={{ maxWidth: 820, mx: 'auto' }}>
          <Typography component="h2" sx={h2Sx}>
            The Nury Proportion
          </Typography>
          <Typography sx={{ ...bodySx, mb: 3 }}>
            The Nury Proportion is our fashion-first interpretation of a classic bucket hat: a clean 9 cm / 3.5 in
            crown, 7 cm / 2.75 in brim, and approximately 29 cm / 11.4 in outer silhouette. We consider this the largest
            silhouette we want to offer because larger proportions often start to look less polished and less wearable.
            The goal is not to make the biggest bucket hat possible. The goal is to make the most wearable one.
          </Typography>
          <DataTable
            headers={['Measurement', 'Nury Proportion', 'Why It Matters']}
            rows={NURY_PROPORTION_TABLE_ROWS}
            minWidth={560}
          />
          <Typography component="p" sx={{ ...pullQuoteSx, mb: 0, mt: 3 }}>
            The goal is not to make the biggest bucket hat possible. The goal is to make the most wearable one.
          </Typography>
        </Box>
      </SectionShell>

      <SectionShell id="bucket-silhouette-diameter" bg={bgWhite}>
        <Box sx={{ maxWidth: 960, mx: 'auto' }}>
          <Typography component="h2" sx={{ ...h2Sx, mb: 4 }}>
            What Is Bucket Silhouette Diameter?
          </Typography>
          <Grid container spacing={{ xs: 4, md: 5 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography sx={{ ...bodySx, mb: 2 }}>
                Bucket Silhouette Diameter is the technical measurement behind The Nury Proportion. It is the full
                outside width of the hat from one outer brim edge to the opposite outer brim edge. It helps explain how
                large the bucket hat actually looks when worn.
              </Typography>
              <Typography sx={{ ...bodySx, mb: 3 }}>
                Most brands only publish head circumference, if they publish measurements at all. But head circumference
                does not tell you how much visual space the hat takes up. A taller crown or wider brim can make a bucket
                hat look much larger, even when the inside fit is the same.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  border: '1px solid #e8e0d4',
                  borderRadius: 0,
                  bgcolor: bgCream,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: '#111827', fontWeight: 600, fontSize: '0.95rem', mb: 1 }}>
                  Outer brim edge → outer brim edge = Bucket Silhouette Diameter
                </Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.875rem', fontStyle: 'italic' }}>
                  Lower crown diameter + brim projection on both sides = Bucket Silhouette Diameter
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Image
                src="/bucket-hat-parts2.png"
                width={934}
                height={626}
                alt="Top-down bucket hat diagram showing head opening, brim width, and Bucket Silhouette Diameter"
                sizes="(max-width: 899px) 100vw, 42vw"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Box>
      </SectionShell>

      <SectionShell id="why-bucket-hats-look-too-big" bg={bgCream}>
        <Box sx={{ maxWidth: 920, mx: 'auto' }}>
          <Typography component="h2" sx={h2Sx}>
            Why some bucket hats look too big
          </Typography>
          <Typography sx={{ ...bodySx, mb: 3 }}>
            A bucket hat can be oversized in more than one way. A taller crown adds depth. A wider brim adds spread. A
            flared crown increases the lower ring of the hat. Softer fabric can make the brim collapse or wave.
          </Typography>
          <Typography sx={{ ...bodySx, mb: 4 }}>
            That combination creates more visual volume. The hat may offer more sun coverage, but it can also start to look
            floppy, oversized, or less styled.
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ ...sizingCardSx, bgcolor: bgWhite }}>
                <Typography sx={{ ...cardTitleSx, mb: 1.5 }}>The Nury Proportion</Typography>
                <Box component="ul" sx={{ pl: 2, m: 0, color: bodyColor, fontSize: '0.92rem', lineHeight: 1.75 }}>
                  <li>9 cm / 3.5 in crown</li>
                  <li>7 cm / 2.75 in brim</li>
                  <li>29 cm / 11.5 in outer silhouette</li>
                  <li>Clean, flattering, styled</li>
                  <li>Easy to dress up or down</li>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ ...sizingCardSx, bgcolor: bgWhite }}>
                <Typography sx={{ ...cardTitleSx, color: '#78716c', mb: 1.5 }}>Oversized Sun Bucket</Typography>
                <Box component="ul" sx={{ pl: 2, m: 0, color: bodyColor, fontSize: '0.92rem', lineHeight: 1.75 }}>
                  <li>10.5 cm / 4.1 in crown</li>
                  <li>8.5 cm / 3.35 in brim</li>
                  <li>Larger outer silhouette</li>
                  <li>More shade</li>
                  <li>More floppy, beach-only, or sun-hat-like</li>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Typography sx={{ ...bodySx, mb: 0 }}>
            Neither proportion is “wrong.” They are just different. Nury chooses the fashion bucket proportion because it
            works better with everyday outfits, denim, dresses, swimsuits, linen, knits, and travel looks.
          </Typography>
        </Box>
      </SectionShell>

      <SectionShell id="measure-your-head" bg={bgWhite}>
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography component="h2" sx={h2Sx}>
            How to measure your head for a bucket hat
          </Typography>
          <Box
            component="ol"
            sx={{
              pl: 2.5,
              m: 0,
              mb: 3,
              color: bodyColor,
              fontSize: { xs: '0.95rem', md: '1rem' },
              lineHeight: 1.75,
            }}
          >
            {MEASURE_HEAD_STEPS.map((step) => (
              <li key={step} style={{ marginBottom: '0.5rem' }}>
                {step}
              </li>
            ))}
          </Box>
          <Typography sx={{ ...bodySx, mb: 0, fontStyle: 'italic' }}>
            If you are between sizes, bucket hats with soft cotton or denim construction may feel more forgiving than stiff
            structured hats. The fit should feel secure but not tight.
          </Typography>
        </Box>
      </SectionShell>

      <SectionShell id="nury-fit-notes" bg={bgCream}>
        <Box sx={{ maxWidth: 820, mx: 'auto' }}>
          <Typography component="h2" sx={h2Sx}>
            Nury bucket hat fit notes
          </Typography>
          <Typography sx={{ ...bodySx, mb: 3 }}>
            Most current Nury bucket hats are designed as one-size women’s fashion bucket hats and fit approximately 56–58
            cm head circumference.
          </Typography>
          <DataTable headers={['Style Group', 'Approximate Fit', 'Notes']} rows={NURY_FIT_NOTES_ROWS} minWidth={520} />
          <Typography sx={{ ...bodySx, mb: 0, mt: 2, fontSize: '0.875rem' }}>
            Final fit notes should match the individual product page. If a product varies, the PDP overrides this general
            guide.
          </Typography>
        </Box>
      </SectionShell>

      <SectionShell id="hat-size-chart" bg={bgWhite}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center' }}>
          Hat Size Chart
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 1 }}>
          Use the chart below to compare common hat sizes. For Nury bucket hats, the most important number is your head
          circumference in centimeters.
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 4, fontSize: '0.9rem' }}>
          Most Nury styles are designed around the 56–58 cm range.
        </Typography>
        <DataTable
          headers={['Head Circumference', 'US Hat Size', 'General Size']}
          rows={HAT_SIZE_CONVERSION_ROWS}
          minWidth={480}
        />
      </SectionShell>

      <SectionShell id="fashion-fit-images" bg={bgCream}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 2 }}>
          Designed to look styled, not oversized
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 5 }}>
          The Nury Proportion is intentionally restrained. The roughly 29 cm / 11.4 in outer silhouette gives the hat enough
          presence to feel iconic, but not so much volume that it overwhelms the face or outfit.
        </Typography>
        <Grid container spacing={2}>
          {FASHION_FIT_IMAGES.map((img) => (
            <Grid item xs={12} md={4} key={img.src}>
              <Box sx={{ lineHeight: 0, mb: 1.5 }}>
                <Image
                  src={img.src}
                  width={img.w}
                  height={img.h}
                  alt={img.alt}
                  sizes="(max-width: 899px) 100vw, 30vw"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                />
              </Box>
              <Typography sx={{ ...cardTitleSx, textAlign: 'center' }}>
                {img.caption}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      <SectionShell bg={bgWhite} narrow>
        <Typography component="h2" sx={h2Sx}>
          Find your Nury bucket
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
          Once you know the difference between fit and silhouette, choosing a bucket hat becomes easier. Start with Nury’s
          frayed bucket hats — designed with a clean fashion proportion and soft everyday attitude.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, color: bodyColor, lineHeight: 2 }}>
          <li>
            <MuiLink component={Link} href="/frayed-bucket-hats" sx={guideInlineLinkSx}>
              Shop frayed bucket hats
            </MuiLink>
          </li>
          <li>
            <MuiLink component={Link} href="/bucket-hat" sx={guideInlineLinkSx}>
              Read the ultimate bucket hat guide
            </MuiLink>
          </li>
          <li>
            <MuiLink component={Link} href="/bucket-hat-care" sx={guideInlineLinkSx}>
              Bucket hat care: cleaning and storage
            </MuiLink>
          </li>
          {INTERNAL_PRODUCT_LINKS.map(({ label, handle }) => (
            <li key={handle}>
              <MuiLink component={Link} href={`/products/${getProductCanonicalSlug(handle)}`} sx={guideInlineLinkSx}>
                {label}
              </MuiLink>
            </li>
          ))}
        </Box>
      </SectionShell>

      <HatSizesFaqSection />
    </>
  );
};
