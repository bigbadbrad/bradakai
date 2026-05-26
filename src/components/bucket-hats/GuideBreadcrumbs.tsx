import Link from 'next/link';
import { Box } from '@mui/material';

const navSx = {
  fontSize: '0.8125rem',
  color: '#78716c',
  mb: 2.25,
} as const;

const linkSx = {
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
} as const;

const sepSx = { mx: 0.45, opacity: 0.7 } as const;

type GuideBreadcrumbsProps = {
  currentLabel: string;
};

/** Matches PDP cream-page breadcrumb style; first crumb is nury → home. */
export function GuideBreadcrumbs({ currentLabel }: GuideBreadcrumbsProps) {
  return (
    <Box component="nav" aria-label="Breadcrumb" sx={navSx}>
      <Box component={Link} href="/" sx={linkSx}>
        Nury
      </Box>
      <Box component="span" sx={sepSx} aria-hidden>
        /
      </Box>
      <Box component="span" sx={{ color: '#57534e' }} aria-current="page">
        {currentLabel}
      </Box>
    </Box>
  );
}
