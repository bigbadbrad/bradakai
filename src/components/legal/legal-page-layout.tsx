import type { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { LegalBreadcrumb } from '@/components/legal/legal-breadcrumb';
import { pageH1Sx } from '@/components/bucket-hats/constants';
import { IVY_PRESTO_FAMILY } from '@/lib/typography/ivy-presto';
import { LEGAL_LAST_UPDATED_DISPLAY } from '@/lib/legal/site';

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

export function LegalPageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Box component="article" sx={{ bgcolor: '#f4efe6', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
          <LegalBreadcrumb currentLabel={title} />
          <Typography component="h1" sx={{ ...pageH1Sx, mb: 1 }}>
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: sans,
              fontSize: '0.875rem',
              color: '#6b6560',
              mb: { xs: 4, md: 5 },
            }}
          >
            Last updated: {LEGAL_LAST_UPDATED_DISPLAY}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontFamily: sans,
              fontSize: '0.9375rem',
              color: '#4b5563',
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            {description}
          </Typography>
          <Box
            sx={{
              fontFamily: sans,
              color: '#3f3a36',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
              '& h2': {
                fontFamily: IVY_PRESTO_FAMILY,
                fontSize: '1.125rem',
                fontWeight: 400,
                color: '#1a1816',
                mt: 4,
                mb: 1.5,
                letterSpacing: '0.01em',
              },
              '& h2:first-of-type': { mt: 0 },
              '& p': { mb: 1.5 },
              '& ul': { pl: 2.5, mb: 2 },
              '& ol': { pl: 2.5, mb: 2 },
              '& li': { mb: 0.75 },
              '& a': { color: '#5c4d3d', textUnderlineOffset: 3 },
              '& blockquote': {
                my: 2,
                pl: 2,
                borderLeft: '3px solid #d6cbbd',
                color: '#57534e',
                fontStyle: 'italic',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
