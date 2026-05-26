import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { bgWhite, bodyColor, h2Sx } from '@/components/bucket-hats/constants';
import { FRAYED_BUCKET_HATS_FAQ } from './frayed-faq-items';

export function FrayedBucketHatsFaqSection() {
  const textColor = '#111827';
  const borderColor = '#cccccc';

  return (
    <Box id="frayed-bucket-hat-faq" component="section" sx={{ bgcolor: bgWhite, py: { xs: 6, md: 9 } }}>
      <Container maxWidth="md">
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', mb: 4 }}>
          Common questions about frayed bucket hats
        </Typography>
        {FRAYED_BUCKET_HATS_FAQ.map((item, index) => (
          <Box
            key={item.question}
            component="details"
            sx={{
              width: '100%',
              maxWidth: 520,
              mx: 'auto',
              bgcolor: bgWhite,
              color: textColor,
              borderTop: index === 0 ? `1px solid ${borderColor}` : 'none',
              borderBottom: `1px solid ${borderColor}`,
              '&:not(:last-of-type)': { borderBottom: 'none' },
              '&[open] summary .MuiSvgIcon-root': { transform: 'rotate(180deg)' },
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
              <ExpandMoreIcon sx={{ color: textColor, flexShrink: 0, transition: 'transform 0.2s' }} aria-hidden />
            </Box>
            <Box sx={{ px: 2, py: 2 }}>
              <Typography sx={{ mb: 0, color: bodyColor, fontSize: '0.95rem', lineHeight: 1.7 }}>
                {item.answer}
              </Typography>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
