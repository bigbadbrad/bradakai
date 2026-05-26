import Link from 'next/link';
import { Box } from '@mui/material';

/** Breadcrumb: Nury (home) → current legal page label. */
export function LegalBreadcrumb({ currentLabel }: { currentLabel: string }) {
  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      sx={{
        fontSize: '0.8125rem',
        color: '#78716c',
        mb: { xs: 2.5, md: 3 },
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      }}
    >
      <Box
        component={Link}
        href="/"
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        Nury
      </Box>
      <Box component="span" aria-hidden sx={{ mx: 0.5 }}>
        &gt;
      </Box>
      <Box component="span" sx={{ color: '#57534e' }}>
        {currentLabel}
      </Box>
    </Box>
  );
}
