'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const bodyColor = '#374151';

 export const SilveradoHistoryBlock: FC = () => {
   return (
     <Box sx={{ backgroundColor: '#f5f5f5', py: { xs: 10, md: 20 }, borderTop: '1px solid #e5e7eb' }}>
       <Container maxWidth="sm">
        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mb: 1,
          }}
        >
          Old Mining Town
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
           &quot;Silverado&quot; (the place Stevenson wrote about) was a short-lived mining camp/townsite on
           the shoulder of Mount St. Helena above Calistoga, built up around the Silverado Mine and
           its associated works—shafts, tunnels, ore chutes, and a mill—during the valley&apos;s brief
           hard-rock mining moment before wine country became dominant. Stevenson describes arriving
           to a spot that had recently been busy and expensive with &quot;wreck of that great
           enterprise&quot; all around—forge, dump, chutes, rails, windlass, tunnels, and a deep
           shaft—yet already fallen into &quot;sunny silence and desertion.&quot; By the time he and
           Fanny went up there in 1880, the &quot;town&quot; itself had largely vanished: in an
           early-1900s California account of Stevenson&apos;s visit, the old townsite is described as
           reduced to essentially one remaining building still showing the sign &quot;Silverado
           Hotel,&quot; occupied by Rufe Hanson and family, with most other buildings moved away for
           reuse elsewhere.
         </Typography>
         <Typography
           sx={{
             fontSize: '1.125rem',
             lineHeight: 1.7,
             color: bodyColor,
             textAlign: 'left',
           }}
         >
           On the mining side, the Silverado Mine opened in 1872 and had enough capital behind it to
           run a 10-stamp mill (reported production in 1874 and later intermittent activity), which
           matches the scale of industrial remnants Stevenson saw scattered across the slope. In The
           Silverado Squatters, he also records the camp&apos;s own &quot;story of a mine&quot; lore: one
           version claimed substantial money came out of the seam until the ledge &quot;pinched
           out,&quot; followed by costly tunneling in all directions; another version (told &quot;with
           much secrecy&quot;) insisted the whole mine-town-mill was essentially a grand swindle—a
           perfect snapshot of how speculative many 19th-century western camps felt even to
           contemporaries. Today, the landscape that held the camp and mine workings sits
           within/adjacent to Robert Louis Stevenson State Park, and the Stevenson Museum explicitly
           ties the 1880 honeymoon stay to the route up Mount St. Helena and the abandoned Silverado
           Mine bunkhouse site.
         </Typography>
       </Container>
     </Box>
   );
 };

