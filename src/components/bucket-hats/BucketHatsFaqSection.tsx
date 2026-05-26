import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BUCKET_HATS_FAQ } from './faq-items';
import { bodyColor, h2Sx } from './constants';

/**
 * Server-rendered FAQ using native `<details>` / `<summary>` (same interaction model as 650dog `StaticFaqSection`).
 * No `use client` — expand/collapse is handled by the browser; copy stays in HTML for SEO.
 */
export function BucketHatsFaqSection() {
  const textColor = '#111827';
  const borderColor = '#cccccc';
  const backgroundStyle = '#ffffff';

  return (
    <Box
      id="common-questions"
      sx={{
        pt: { xs: 6, md: 8 },
        pb: { xs: 10, md: 12 },
        background: backgroundStyle,
        color: textColor,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          py: { xs: 2, md: 3 },
        }}
      >
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', pb: 1, mb: 0 }}>
          Common questions about bucket hats
        </Typography>
      </Container>
      <Container
        maxWidth="md"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {BUCKET_HATS_FAQ.map((item, index) => (
          <Box
            key={item.question}
            component="details"
            sx={{
              width: '100%',
              maxWidth: '520px',
              margin: 'auto',
              bgcolor: 'white',
              color: textColor,
              borderTop: index === 0 ? `1px solid ${borderColor}` : 'none',
              borderBottom: `1px solid ${borderColor}`,
              borderRadius: 0,
              boxShadow: 'none',
              '&:not(:last-of-type)': {
                borderBottom: 'none',
              },
              '&[open] summary .MuiSvgIcon-root': {
                transform: 'rotate(180deg)',
              },
            }}
          >
            <Box
              component="summary"
              sx={{
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                borderBottom: `1px solid ${borderColor}`,
                minHeight: 56,
                px: 2,
                '&::-webkit-details-marker': { display: 'none' },
              }}
            >
              <Typography sx={{ fontSize: '0.95rem', pr: 1 }}>{item.question}</Typography>
              <ExpandMoreIcon
                sx={{ color: textColor, flexShrink: 0, transition: 'transform 0.2s' }}
                aria-hidden
              />
            </Box>
            <Box
              sx={{
                px: 2,
                py: 2,
                flexDirection: 'column',
              }}
            >
              <Typography paragraph sx={{ mb: 0, color: bodyColor, fontSize: '0.95rem', lineHeight: 1.7 }}>
                {item.answer}
              </Typography>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
