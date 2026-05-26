'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const bodyColor = '#374151';
const eyebrowColor = '#CD7A66';

/** Images in /public */
const STEVENSON_IMAGE = '/Robert_Louis_Stevenson.jpg';
const SILVERADO_IMAGE = '/Silverado-squatters.jpg';

const rowSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: { xs: 3, md: 4 },
  alignItems: 'start',
  mb: { xs: 10, md: 20 },
  '&:last-of-type': { mb: 0 },
};

const imageWrapSx = {
  position: 'relative' as const,
  width: '100%',
  aspectRatio: '2/3',
  maxHeight: { xs: '75vh', md: '85vh' },
  borderRadius: 1,
  overflow: 'hidden',
  '& img': {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: 'center',
    display: 'block',
    transform: 'scale(1.05)',
  },
};

export const HistorySectionBlock: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 10, md: 20 }, borderTop: '1px solid #e5e7eb' }}>
      <Container maxWidth="lg">
        {/* Row 1: Stevenson — Text Left | Image Right */}
        <Box sx={rowSx}>
          <Box sx={{ order: { xs: 1, md: 1 } }}>
            <Typography
              component="p"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: eyebrowColor,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                mb: 1,
              }}
            >
              HISTORY &amp; LORE
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: ultra.style.fontFamily,
                fontSize: '2rem',
                fontWeight: 600,
                color: '#111827',
                mb: 2,
              }}
            >
              Robert Louis Stevenson &amp; Montesol Ranch
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: bodyColor,
                textAlign: 'left',
                mb: 2,
              }}
            >
              Freshly married in San Francisco on May 19, 1880, Robert Louis Stevenson and Fanny
              Van de Grift Osbourne headed north looking for clean air and a cheap place to recover
              his health—friends had suggested Calistoga and the upper Napa Valley&apos;s hot springs
              and mountain climate. They traveled the very 19th-century way: ferries across the Bay
              and then rail up-valley toward Calistoga (Stevenson later described the double
              bay-crossing and the rail journey in The Silverado Squatters). The couple spent the
              rest of May in Calistoga in one of the Hot Springs Hotel cottages, then—joined by
              Fanny&apos;s son Lloyd—went up the grade of Mount St. Helena to the toll road area and
              ultimately &quot;squatted&quot; in an abandoned bunkhouse at the old Silverado mining
              settlement until late July.
            </Typography>
            <Typography
              component="blockquote"
              sx={{
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                lineHeight: 1.45,
                fontStyle: 'italic',
                color: '#444',
                textAlign: 'center',
                mx: 0,
                my: 3,
                px: { xs: 1, md: 3 },
                borderLeft: 'none',
                display: 'block',
              }}
            >
              Turning a broken-down building into a makeshift honeymoon home—cloth for windows,
              hauling water, foggy nights, rattlesnakes—classic Stevenson humor about hard travel
              and improvised comfort.
            </Typography>
          </Box>
          <Box sx={{ ...imageWrapSx, order: { xs: 2, md: 2 } }}>
            <img
              src={STEVENSON_IMAGE}
              alt="Robert Louis Stevenson and The Silverado Squatters"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Box>
        </Box>

        {/* Row 2: Silverado — Image Left | Text Right */}
        <Box sx={rowSx}>
          <Box sx={{ ...imageWrapSx, order: { xs: 1, md: 1 } }}>
            <img
              src={SILVERADO_IMAGE}
              alt="Silverado Mine and Mount St. Helena"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Box>
          <Box sx={{ order: { xs: 2, md: 2 } }}>
            <Typography
              component="p"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: eyebrowColor,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                mb: 1,
              }}
            >
              OLD MINING TOWN
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: ultra.style.fontFamily,
                fontSize: '2rem',
                fontWeight: 600,
                color: '#111827',
                mb: 2,
              }}
            >
              The History of Silverado
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: bodyColor,
                textAlign: 'left',
                mb: 2,
              }}
            >
              &quot;Silverado&quot; (the place Stevenson wrote about) was a short-lived mining
              camp/townsite on the shoulder of Mount St. Helena above Calistoga, built up around the
              Silverado Mine and its associated works—shafts, tunnels, ore chutes, and a
              mill—during the valley&apos;s brief hard-rock mining moment before wine country became
              dominant. Stevenson describes arriving to a spot that had recently been busy and
              expensive with &quot;wreck of that great enterprise&quot; all around—forge, dump,
              chutes, rails, windlass, tunnels, and a deep shaft—
            </Typography>
            <Typography
              component="blockquote"
              sx={{
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                lineHeight: 1.45,
                fontStyle: 'italic',
                color: '#444',
                textAlign: 'center',
                mx: 0,
                my: 3,
                px: { xs: 1, md: 3 },
                borderLeft: 'none',
                display: 'block',
              }}
            >
              yet already fallen into sunny silence and desertion.
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: bodyColor,
                textAlign: 'left',
                mb: 2,
              }}
            >
              By the time he and Fanny went up there in 1880, the &quot;town&quot; itself had largely
              vanished: in an early-1900s California account of Stevenson&apos;s visit, the old
              townsite is described as reduced to essentially one remaining building still showing
              the sign &quot;Silverado Hotel,&quot; occupied by Rufe Hanson and family, with most
              other buildings moved away for reuse elsewhere.
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.7,
                color: bodyColor,
                textAlign: 'left',
              }}
            >
              On the mining side, the Silverado Mine opened in 1872 and had enough capital behind it
              to run a 10-stamp mill (reported production in 1874 and later intermittent activity),
              which matches the scale of industrial remnants Stevenson saw scattered across the
              slope. In The Silverado Squatters, he also records the camp&apos;s own &quot;story of a
              mine&quot; lore: one version claimed substantial money came out of the seam until the
              ledge &quot;pinched out,&quot; followed by costly tunneling in all directions; another
              version (told &quot;with much secrecy&quot;) insisted the whole mine-town-mill was
              essentially a grand swindle—a perfect snapshot of how speculative many 19th-century
              western camps felt even to contemporaries. Today, the Montesol Ranch that held the camp and
              mine workings sits within/adjacent to Robert Louis Stevenson State Park, and the
              Stevenson Museum explicitly ties the 1880 honeymoon stay to the route up Mount St.
              Helena and the abandoned Silverado Mine bunkhouse site.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
