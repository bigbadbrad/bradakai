import type { FC, ReactNode } from 'react';
import Link from 'next/link';
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
import Image from 'next/image';
import {
  accentMuted,
  bgCream,
  bgWhite,
  bodyColor,
  bodySx,
  cardTitleSx,
  filledCtaSx,
  h1Sx,
  h2Sx,
  h3SectionSx,
  labelSx,
  guideInlineLinkSx,
  outlinedButtonSx,
} from './constants';
import { BucketHatsFaqSection } from './BucketHatsFaqSection';
import { GuideBreadcrumbs } from './GuideBreadcrumbs';

const jumpLinks: { id: string; label: string }[] = [
  { id: 'what-is-a-bucket-hat', label: 'What is a bucket hat?' },
  { id: 'bucket-hat-anatomy', label: 'The anatomy of a bucket hat ' },
  { id: 'history-of-the-bucket-hat', label: 'The history of the bucket hat' },
  { id: 'typical-bucket-hat-measurements', label: 'Typical bucket hat measurements' },
  { id: 'main-types-of-bucket-hats', label: 'Main bucket hat styles' },
  { id: 'bucket-hat-fabrics', label: 'Bucket hat fabrics explained' },
  { id: 'best-colors-womens-bucket-hats', label: 'Best colors for women’s bucket hats' },
  { id: 'how-should-a-bucket-hat-fit', label: 'How should a bucket hat fit?' },
  { id: 'when-to-wear-a-bucket-hat', label: 'When should you wear a bucket hat?' },
  { id: 'bucket-hat-vs-boonie-vs-sun-hat', label: 'Bucket hat vs boonie hat vs sun hat' },
  { id: 'why-women-love-bucket-hats', label: 'Why women love bucket hats' },
  { id: 'why-nury-bucket-hats', label: 'Why Nury bucket hats stand out' },
  { id: 'shop-nury-bucket-hats', label: 'Shop Nury bucket hats' },
  { id: 'common-questions', label: 'Common questions about bucket hats' },
];

function SectionShell({
  id,
  bg,
  children,
}: {
  id?: string;
  bg: typeof bgCream | typeof bgWhite;
  children: ReactNode;
}) {
  return (
    <Box component="section" id={id} sx={{ bgcolor: bg, py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

export const BucketHatsGuidePage: FC = () => {
  return (
    <>
      {/* 1 Hero */}
      <Box id="bucket-hats-hero" component="section" sx={{ bgcolor: bgCream, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <GuideBreadcrumbs currentLabel="Bucket hat guide" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'start',
              mt: 3,
            }}
          >
            <Box>
              <Typography component="p" sx={{ ...labelSx, mb: 2 }}>
                Ultimate guide
              </Typography>
              <Typography component="h1" sx={{ ...h1Sx, fontSize: { xs: '2.25rem', sm: '2.85rem', md: '3.5rem' } }}>
                What Is a Bucket Hat?
              </Typography>
              <Typography sx={{ ...bodySx, mb: 2, color: '#111827', fontWeight: 500 }}>
                A bucket hat is a soft, round hat with a downward-sloping brim that wraps all the way around the head.
                Classic bucket hats are typically made from cotton, canvas, denim, or other soft fabrics—and they are
                known for being casual, packable, easy to wear, and versatile across everyday style, travel, and
                light sun coverage.
              </Typography>
              <Typography sx={{ ...bodySx, mb: 3 }}>
                This guide answers the questions people ask most—what it looks like, how it should fit, which fabrics
                and colors work best, and how a bucket hat compares to similar hats—then helps you shop signature Nury
                bucket hats with confidence.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button component={Link} href="#shop-nury-bucket-hats" variant="contained" disableElevation sx={filledCtaSx}>
                  Shop bucket hats
                </Button>
                <Button component={Link} href="#main-types-of-bucket-hats" variant="outlined" sx={outlinedButtonSx}>
                  Explore styles
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Image
                src="/bucket-hat.png"
                width={800}
                height={600}
                alt="basic bucket hat"
                priority
                style={{ display: 'block', maxWidth: '90%', height: 'auto' }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 2 Quick answer */}
      <SectionShell bg={bgWhite}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 4 }}>
          Quick answer
        </Typography>
        <Grid container spacing={2}>
          {[
            { k: 'Definition', v: 'Soft hat with a downward-sloping brim all around.' },
            { k: 'Typical brim', v: 'About 2–3 inches / 5–7.5 cm (varies by brand).' },
            { k: 'Typical crown depth', v: 'About 3.25–3.75 inches / 8.25–9.5 cm (varies by brand).' },
            { k: 'Common fabrics', v: 'Cotton, canvas, denim, nylon, wool blends, raffia/straw.' },
            { k: 'Best for', v: 'Casual wear, travel, beach, festivals, everyday style, light sun coverage.' },
            { k: 'Women’s fit range', v: 'Often ~55–59 cm depending on sizing and model.' },
          ].map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.k}>
              <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0, height: '100%', bgcolor: bgCream }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: accentMuted, mb: 1 }}>
                  {row.k.toUpperCase()}
                </Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.9375rem', lineHeight: 1.6 }}>{row.v}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 3 Jump links */}
      <SectionShell bg={bgCream}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 1 }}>
          In this guide
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 640, mx: 'auto', mb: 4 }}>
          Jump to a section—each opens with a short answer, then goes deeper.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 1.5,
          }}
        >
          {jumpLinks.map((j) => (
            <Button
              key={j.id}
              component={Link}
              href={`#${j.id}`}
              variant="text"
              sx={{
                justifyContent: { xs: 'center', sm: 'flex-start' },
                color: '#111827',
                textTransform: 'none',
                fontSize: '0.9rem',
                py: 1,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 0,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' },
              }}
            >
              {j.label}
            </Button>
          ))}
        </Box>
      </SectionShell>

      {/* 4 What is */}
      <SectionShell id="what-is-a-bucket-hat" bg={bgWhite}>
        <Typography component="h2" sx={h2Sx}>
          What is a bucket hat?
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          A bucket hat is a soft hat with a rounded crown and a brim that slopes downward around the full circumference
          of the hat. It is usually made from fabric rather than stiff felt or structured straw, which makes it more
          casual, packable, and easy to style than many traditional hat silhouettes.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, color: bodyColor, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.75 }}>
          <li>Soft or lightly structured shape (depending on fabric)</li>
          <li>Brim goes all the way around—not a front-only visor</li>
          <li>More relaxed than many fedoras or dress sun hats</li>
          <li>Easier to pack than stiff, structured hats</li>
          <li>Balances function (coverage, comfort) with casual style</li>
        </Box>
      </SectionShell>

      {/* 7 Anatomy */}
      <SectionShell id="bucket-hat-anatomy" bg={bgCream}>
        <Typography component="h2" sx={h2Sx}>
          The anatomy of a bucket hat
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ ...bodySx, mb: 0 }}>
              Structurally, “bucket hat” describes a silhouette: a round crown plus a circular brim that angles downward. Details like
              stitching, panels, and eyelets change the look and breathability, but the core shape stays consistent.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 0,
              width: '100%',
            }}
          >
            <Image
              src="/bucket-hat-parts.png"
              width={934}
              height={542}
              alt="Labeled diagram of bucket hat parts: crown, brim, stitching, and more"
              style={{ display: 'block', width: '100%', maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Box>
        <Grid container spacing={2}>
          {[
            { t: 'Crown', d: 'Usually soft and rounded, medium depth—where the hat sits on your head.' },
            { t: 'Brim', d: 'Slopes downward around the entire hat to frame the face.' },
            { t: 'Brim stitching', d: 'Circular rows that add structure and a classic visual rhythm.' },
            { t: 'Panels', d: 'Some hats are paneled; others look more seamless depending on construction.' },
            { t: 'Eyelets', d: 'Optional ventilation details on the sides of the crown.' },
            { t: 'Lining', d: 'Some styles include a lining for comfort, structure, or seasonal warmth.' },
          ].map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.t}>
              <Paper elevation={0} sx={{ p: 2.5, height: '100%', border: '1px solid #e8e0d4', borderRadius: 0, bgcolor: bgWhite }}>
                <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>{c.t}</Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.92rem', lineHeight: 1.65 }}>{c.d}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          id="typical-bucket-hat-measurements"
          sx={{ scrollMarginTop: { xs: 88, md: 96 }, pt: { xs: 5, md: 6 }, mt: { xs: 1, md: 2 } }}
        >
          <Typography component="h3" sx={h3SectionSx}>
            Typical bucket hat measurements
          </Typography>
          <Typography sx={{ ...bodySx, mb: 2 }}>
            Exact dimensions vary by brand, crown height, and brim width—but these ranges are useful when comparing styles
            online or shopping across silhouettes.
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {[
              { t: 'Brim width', d: 'Often about 2–3 inches / 5–7.5 cm' },
              { t: 'Crown depth', d: 'Often about 3.25–3.75 inches / 8.25–9.5 cm' },
              { t: 'Head circumference', d: 'Many women’s styles land around ~55–59 cm / 21.7–23.2 in' },
            ].map((m) => (
              <Grid item xs={12} md={4} key={m.t}>
                <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0, bgcolor: bgWhite, height: '100%' }}>
                  <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>{m.t}</Typography>
                  <Typography sx={{ color: bodyColor }}>{m.d}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ ...bodySx, mb: 2 }}>
            Nury’s own fashion bucket proportion sits inside this classic range: a 9 cm / 3.5 in crown and 7 cm / 2.75 in
            brim, designed to feel polished rather than oversized.
          </Typography>
          <Typography sx={{ ...bodySx, fontSize: '0.9rem', mb: 0 }}>
            If you are between sizes, prioritize comfort: the brim should frame your face without sitting so low that it
            blocks vision, and the crown should feel secure without pressure.
          </Typography>
        </Box>
      </SectionShell>

      {/* 6 History */}
      <SectionShell id="history-of-the-bucket-hat" bg={bgWhite}>
        <Typography component="h2" sx={h2Sx}>
          The history of the bucket hat
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
        The bucket hat began as a practical outdoor hat, not a fashion trend. Most fashion historians trace its roots to the early 1900s, when Irish farmers and fishermen wore soft wool felt or tweed hats with a downward-sloping brim to keep rain off the face and neck. Those early versions were valued because they were durable, easy to fold, and naturally water-resistant thanks to the lanolin in raw wool.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
        Over time, the silhouette spread beyond rural workwear. By the mid-20th century, bucket-style hats had moved into casual outdoor use and women’s fashion, and by the 1960s the shape was clearly present in mod-era style. A related branch of the design also appeared in military tropical hats and the Vietnam-era boonie hat, which helped popularize lightweight cotton versions with ventilation eyelets and a more relaxed everyday feel.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
        The bucket hat became a true fashion icon in the 1980s, when hip-hop artists such as LL Cool J and Run-D.M.C. made it part of streetwear history. Since then, it has continued to cycle back into fashion because the shape is both functional and unmistakable: soft, packable, flattering, and easy to reinterpret in cotton, denim, quilted nylon, faux fur, straw, and luxury fabrics.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
          {[
            { t: 'Utility roots', d: 'Outdoor work + protection from glare and light weather.' },
            { t: 'Streetwear era', d: 'Casual culture adopts the silhouette as an everyday staple.' },
            { t: 'Fashion crossover', d: 'Designers remix materials, brim widths, and finishes.' },
            { t: 'Today', d: 'A modern women’s staple: easy, packable, expressive.' },
          ].map((x) => (
            <Paper key={x.t} elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0 }}>
              <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1, fontSize: '0.95rem' }}>{x.t}</Typography>
              <Typography sx={{ color: bodyColor, fontSize: '0.9rem', lineHeight: 1.65 }}>{x.d}</Typography>
            </Paper>
          ))}
        </Box>
      </SectionShell>

      {/* 9 Types */}
      <SectionShell id="main-types-of-bucket-hats" bg={bgCream}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 4 }}>
          The main types of bucket hats
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: 'Classic cotton',
              look: 'Clean, soft, everyday.',
              vibe: 'Warm weather, errands, easy styling.',
              img: '/variety/basic.png',
            },
            {
              title: 'Denim',
              look: 'Casual structure with iconic texture.',
              vibe: 'Streetwear-leaning, great with denim-on-denim.',
              img: '/variety/denim.png',
            },
            {
              title: 'Frayed edge',
              look: 'Raw brim detail with personality.',
              vibe: 'Statement without trying too hard.',
              img: '/variety/frayed.png',
            },
            {
              title: 'Wide brim',
              look: 'More coverage around the face.',
              vibe: 'Sunny days, travel, resort.',
              img: '/variety/wide.png',
            },
            {
              title: 'Reversible',
              look: 'Two looks in one (when offered).',
              vibe: 'Packing light, switching moods.',
              img: '/variety/reversible.png',
            },
            {
              title: 'Fuzzy / faux fur',
              look: 'Soft texture-forward drama.',
              vibe: 'Cooler weather, playful outfits.',
              img: '/variety/fuzzy.png',
            },
            {
              title: 'Quilted',
              look: 'Sportier, lightweight utility.',
              vibe: 'Rainy-day casual, outdoor walks.',
              img: '/variety/quilted.png',
            },
            {
              title: 'Straw / raffia',
              look: 'Airy warm-weather energy.',
              vibe: 'Beach, vacation, sundresses.',
              img: '/variety/straw.png',
            },
          ].map((s) => (
            <Grid item xs={12} sm={6} md={3} key={s.title}>
              <Paper elevation={0} sx={{ border: '1px solid #e8e0d4', borderRadius: 0, overflow: 'hidden', height: '100%', bgcolor: bgWhite }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#faf8f4', py: 2 }}>
                  <Image src={s.img} width={320} height={255} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ ...cardTitleSx, fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ color: bodyColor, fontSize: '0.88rem', lineHeight: 1.6, mb: 1 }}>{s.look}</Typography>
                  <Typography sx={{ color: bodyColor, fontSize: '0.88rem', lineHeight: 1.6, mb: 2 }}>{s.vibe}</Typography>
                  <Button component={Link} href="#shop-nury-bucket-hats" size="small" sx={{ textTransform: 'none', p: 0, minWidth: 0, color: accentMuted, fontWeight: 700 }}>
                    Shop bucket hats →
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 10 Fabrics */}
      <SectionShell id="bucket-hat-fabrics" bg={bgWhite}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 4 }}>
          Bucket hat fabrics explained
        </Typography>
        <Grid container spacing={2}>
          {[
            { n: 'Cotton', d: 'Breathable and soft—an everyday staple with relaxed structure.' },
            { n: 'Canvas', d: 'Durable with a slightly sturdier shape than basic cotton.' },
            { n: 'Denim', d: 'Heavier handfeel; casual, iconic, and easy to pair.' },
            { n: 'Wool / tweed', d: 'Cooler-weather texture with a more heritage mood.' },
            { n: 'Corduroy', d: 'Seasonal ribbed texture; great for fall styling.' },
            { n: 'Nylon', d: 'Lightweight and packable; sportier energy.' },
            { n: 'Raffia / straw', d: 'Airy warm-weather option with resort-ready vibes.' },
          ].map((f) => (
            <Grid item xs={12} sm={6} md={4} key={f.n}>
              <Paper elevation={0} sx={{ p: 2.5, height: '100%', border: '1px solid #e8e0d4', borderRadius: 0 }}>
                <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>{f.n}</Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.92rem', lineHeight: 1.65 }}>{f.d}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 11 Colors */}
      <SectionShell id="best-colors-womens-bucket-hats" bg={bgCream}>
        <Typography component="h2" sx={h2Sx}>
          Best colors for women’s bucket hats
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
          Color is less about “rules” and more about wardrobe chemistry: neutrals anchor outfits, soft tones feel romantic,
          and statement colors add punch—especially when the silhouette is already easy to wear.
        </Typography>
        <Grid container spacing={2}>
          {[
            { t: 'Core neutrals', d: 'Black, white, cream, camel, khaki, denim blue—maximum versatility.' },
            { t: 'Soft feminine tones', d: 'Blush, lipstick red, powder blue, sage—pretty without feeling costumey.' },
            { t: 'Statement colors', d: 'Cobalt, cherry red, hot pink, sunflower—high impact, still casual.' },
            { t: 'Texture-first colorways', d: 'Washed denim, faded black, frayed ivory—color through texture.' },
          ].map((c) => (
            <Grid item xs={12} sm={6} key={c.t}>
              <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0, bgcolor: bgWhite, height: '100%' }}>
                <Typography sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>{c.t}</Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.92rem', lineHeight: 1.65 }}>{c.d}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 12 Fit */}
      <SectionShell id="how-should-a-bucket-hat-fit" bg={bgWhite}>
        <Typography component="h2" sx={h2Sx}>
          How should a bucket hat fit?
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          A bucket hat should feel secure without pinching: the crown sits comfortably, the brim frames your face, and the
          hat stays put when you move—without leaving red marks or sliding forward over your eyes.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 3 }}>
          Head circumference is only part of the story. See our{' '}
          <MuiLink component={Link} href="/hat-sizes" sx={guideInlineLinkSx}>
            hat size chart
          </MuiLink>{' '}
          for how Nury separates fit size from silhouette, including the technical measurement behind The Nury
          Proportion: Bucket Silhouette Diameter.
        </Typography>
        <Grid container spacing={2}>
          {[
            { t: 'Too tight', d: 'Headache pressure, red forehead line, brim sits too high or feels rigid.' },
            { t: 'Ideal', d: 'Comfortable contact, brim frames the face, easy to wear for hours.' },
            { t: 'Too loose', d: 'Shifts with wind, sits too low, needs constant adjusting.' },
          ].map((f) => (
            <Grid item xs={12} md={4} key={f.t}>
              <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0, bgcolor: bgCream, height: '100%' }}>
                <Typography sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>{f.t}</Typography>
                <Typography sx={{ color: bodyColor, fontSize: '0.92rem', lineHeight: 1.65 }}>{f.d}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 13 When to wear */}
      <SectionShell id="when-to-wear-a-bucket-hat" bg={bgCream}>
        <Typography component="h2" sx={h2Sx}>
          When should you wear a bucket hat?
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          Bucket hats shine anywhere you want easy polish: they read casual by default, but the right fabric can shift the
          vibe toward streetwear, resort, or weekend-chic.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, color: bodyColor, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.75 }}>
          <li>Everyday casual: errands, coffee, walking the dog</li>
          <li>City styling: denim, minimal layers, sneakers</li>
          <li>Travel: packable, low-drama, outfit-repeating friendly</li>
          <li>Beach & resort: straw/raffia or breezy cotton moods</li>
          <li>Festivals & weekends: expressive textures and frayed details</li>
          <li>Cooler weather: wool blends, corduroy, heavier cotton</li>
        </Box>
      </SectionShell>

      {/* 14 Comparison table */}
      <SectionShell id="bucket-hat-vs-boonie-vs-sun-hat" bg={bgWhite}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 2 }}>
          Bucket hat vs boonie hat vs sun hat
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 4 }}>
          Same “hat family” conversations—different silhouettes and use cases. This table keeps comparisons concrete.
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e8e0d4', borderRadius: 0 }}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: bgCream }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Style</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Silhouette</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Brim</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Typical vibe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['Bucket hat', 'Soft crown + circular downward brim', 'All-around brim, moderate width', 'Casual, fashion-forward, packable'],
                ['Boonie hat', 'Utility outdoor profile', 'Often wider; functional details', 'Outdoor / utility / trekking mood'],
                ['Sun hat', 'Varies (often wider brim)', 'Often larger brim for coverage', 'Resort / sun-first styling'],
                ['Baseball cap', 'Rounded crown + visor', 'Front brim only', 'Sport / everyday casual'],
              ].map((row) => (
                <TableRow key={row[0]}>
                  <TableCell sx={{ fontWeight: 600 }}>{row[0]}</TableCell>
                  <TableCell sx={{ color: bodyColor }}>{row[1]}</TableCell>
                  <TableCell sx={{ color: bodyColor }}>{row[2]}</TableCell>
                  <TableCell sx={{ color: bodyColor }}>{row[3]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionShell>

      {/* 15 Why women */}
      <SectionShell id="why-women-love-bucket-hats" bg={bgCream}>
        <Typography component="h2" sx={h2Sx}>
          Why women love bucket hats
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          The bucket hat wins because it is flattering without feeling fussy: it adds shape and personality to simple
          outfits, while staying practical enough for real life.
        </Typography>
        <Grid container spacing={2}>
          {[
            'Easy to wear—no complicated styling rules',
            'Relaxed, but still intentional',
            'Works across casual, resort, and streetwear moods',
            'Great canvas for texture: denim, frayed edges, quilting',
            'Women-first styling can emphasize softness, edge, or minimalism',
          ].map((t) => (
            <Grid item xs={12} sm={6} key={t}>
              <Paper elevation={0} sx={{ p: 2.5, border: '1px solid #e8e0d4', borderRadius: 0, bgcolor: bgWhite, height: '100%' }}>
                <Typography sx={{ color: bodyColor, fontSize: '0.95rem', lineHeight: 1.65 }}>{t}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </SectionShell>

      {/* 16 Nury */}
      <SectionShell id="why-nury-bucket-hats" bg={bgWhite}>
        <Typography component="h2" sx={h2Sx}>
          Why Nury bucket hats stand out
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          Nury bucket hats are designed around The Nury Proportion: our fashion-first interpretation of a classic bucket
          hat. It starts with a clean 9 cm / 3.5 in crown, a 7 cm / 2.75 in brim, and a balanced outer silhouette that
          gives shade without pushing the hat into oversized sun-hat territory.
        </Typography>
        <Typography sx={{ ...bodySx, mb: 2 }}>
          Most brands only tell you whether a hat fits your head. Nury also thinks about how the hat looks when worn. A
          larger crown or wider brim can add coverage, but it can also add visual volume. Nury stays in the sweet spot:
          practical enough for sun, structured enough to frame the face, and soft enough to feel effortless.
        </Typography>
        <Box component="ul" sx={{ pl: 2.5, m: 0, color: bodyColor, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.75 }}>
          <li>The Nury Proportion: 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, balanced outer silhouette</li>
          <li>Women-first shape: flattering, wearable, and not oversized</li>
          <li>Signature heart icon: subtle branding you can spot across colors</li>
          <li>Cotton, denim, canvas, and frayed-edge personality</li>
          <li>Fashion-forward, but still practical for daily rotation</li>
        </Box>
        <Typography sx={{ ...bodySx, mb: 0, mt: 2 }}>
          For the full Nury Proportion, current style fit ranges, and size conversion chart, visit the{' '}
          <MuiLink component={Link} href="/hat-sizes" sx={guideInlineLinkSx}>
            hat size chart
          </MuiLink>
          . Shop{' '}
          <MuiLink component={Link} href="/frayed-bucket-hats" sx={guideInlineLinkSx}>
            Nury frayed bucket hats
          </MuiLink>
          .
        </Typography>
      </SectionShell>

      {/* 17 Shop */}
      <SectionShell id="shop-nury-bucket-hats" bg={bgCream}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 2 }}>
          Shop Nury bucket hats
        </Typography>
        <Typography sx={{ ...bodySx, textAlign: 'center', maxWidth: 720, mx: 'auto', mb: 4 }}>
          Start with the silhouettes you will wear most, then explore texture and color. (More category pages can slot in
          here as your catalog grows.)
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: 'Shop all bucket hats', href: '/' },
            { label: 'Denim bucket hats', href: '/' },
            { label: 'Frayed bucket hats', href: '/frayed-bucket-hats' },
            { label: 'Black bucket hats', href: '/' },
            { label: 'White bucket hats', href: '/' },
            { label: 'How to style', href: '/' },
          ].map((l) => (
            <Grid item xs={12} sm={6} md={4} key={l.label}>
              <Button component={Link} href={l.href} fullWidth variant="outlined" sx={{ ...outlinedButtonSx, py: 2 }}>
                {l.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={Link} href="/" variant="contained" disableElevation sx={filledCtaSx}>
            Back to home
          </Button>
        </Box>
      </SectionShell>

      {/* 18 FAQ — native <details> accordion (same pattern as 650dog mobile-grooming StaticFaqSection) */}
      <BucketHatsFaqSection />
    </>
  );
};
