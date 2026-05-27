// /components/main-navbar.tsx — BradaKai (navbar grid matches nury)
'use client';

import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { BradaKaiLogo } from '@/components/bradakai-logo';
import { UserPopover } from './auth/user-popover';
import { useBag } from '@/contexts/bag-context';
import { usePathname, useRouter } from 'next/navigation';
import { BRADAKAI_CREAM, BRADAKAI_NAVY, BRADAKAI_ORANGE } from '@/lib/bradakai/brand';

const DESKTOP_GLYPH_PX = 20;
const MOBILE_MENU_GLYPH_PX = 22;

function NavGlyph({
  src,
  size = MOBILE_MENU_GLYPH_PX,
}: {
  src: string;
  size?: number;
}) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden
      sx={{
        width: size,
        height: size,
        display: 'block',
        filter: `brightness(0) saturate(100%) invert(18%) sepia(28%) saturate(1200%) hue-rotate(176deg) brightness(95%) contrast(95%)`,
      }}
    />
  );
}

const mobileMenuItemSx = {
  all: 'unset',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 1.5,
  py: 1.15,
  boxSizing: 'border-box',
  cursor: 'pointer',
} as const;

export const MainNavbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalQuantity, toggleBag } = useBag();
  const pathname = usePathname();
  const router = useRouter();
  const [accountAnchorEl, setAccountAnchorEl] = React.useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setAccountAnchorEl(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (hamburgerRef.current?.contains(target)) return;
      if (mobileMenuPanelRef.current?.contains(target)) return;
      setMobileMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const iconButtonSx = {
    color: BRADAKAI_NAVY,
    p: 0.75,
    '&:hover': { backgroundColor: 'rgba(30, 58, 95, 0.06)' },
  } as const;

  const bagBadgeSx = {
    '& .MuiBadge-badge': {
      fontSize: '0.65rem',
      minWidth: 18,
      height: 18,
      fontWeight: 700,
      bgcolor: BRADAKAI_ORANGE,
      color: '#fff',
      transform: 'scale(1) translate(calc(50% + 6px), -50%)',
    },
  } as const;

  const openAccountFromMenu = () => {
    closeMobileMenu();
    queueMicrotask(() => setAccountAnchorEl(hamburgerRef.current));
  };

  const desktopIcons = (
    <>
      <Tooltip title="Account">
        <IconButton
          aria-label="Account"
          size="small"
          sx={iconButtonSx}
          onClick={(e) => setAccountAnchorEl(e.currentTarget)}
        >
          <NavGlyph src="/icons/account.svg" size={DESKTOP_GLYPH_PX} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Search">
        <IconButton component={Link} href="/search" aria-label="Search" size="small" sx={iconButtonSx}>
          <NavGlyph src="/icons/search2.svg" size={DESKTOP_GLYPH_PX} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Bag">
        <IconButton
          aria-label={totalQuantity > 0 ? `Open bag, ${totalQuantity} items` : 'Open bag'}
          size="small"
          sx={iconButtonSx}
          onClick={() => toggleBag()}
        >
          <Badge badgeContent={totalQuantity} invisible={totalQuantity === 0} overlap="circular" sx={bagBadgeSx}>
            <NavGlyph src="/icons/bag3.svg" size={DESKTOP_GLYPH_PX} />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: BRADAKAI_CREAM,
          color: BRADAKAI_NAVY,
          borderBottom: '1px solid rgba(30, 58, 95, 0.1)',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: '100%',
            minHeight: { xs: 80, md: 104 },
            py: { xs: 0.75, md: 1.5 },
            px: { xs: 2, md: 3, lg: 4 },
            display: 'grid',
            /** Mobile: `1fr auto 1fr` keeps the logo at true viewport center while the menu stays right (nury). */
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ minWidth: 0, gridColumn: '1 / 2' }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gridColumn: '2 / 3',
            }}
          >
            <Link href="/" aria-label="BradaKai home">
              <BradaKaiLogo width={{ xs: 220, sm: 260, md: 360 }} priority />
            </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 0.5,
              minWidth: 0,
              gridColumn: '3 / 4',
            }}
          >
            {isMobile ? (
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  ref={hamburgerRef}
                  aria-label="Open menu"
                  aria-controls={mobileMenuOpen ? 'main-nav-mobile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={mobileMenuOpen}
                  size="medium"
                  sx={{ ...iconButtonSx, p: 0.5 }}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <Box
                    aria-hidden
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: BRADAKAI_NAVY,
                      WebkitMask: 'url(/icons/list.svg) center / contain no-repeat',
                      mask: 'url(/icons/list.svg) center / contain no-repeat',
                    }}
                  />
                </IconButton>

                {mobileMenuOpen ? (
                  <Box
                    id="main-nav-mobile-menu"
                    ref={mobileMenuPanelRef}
                    role="menu"
                    sx={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      zIndex: 1400,
                      minWidth: 200,
                      py: 0.5,
                      borderRadius: 1,
                      boxShadow: '0 10px 30px rgba(30,58,95,0.18)',
                      bgcolor: BRADAKAI_CREAM,
                      color: BRADAKAI_NAVY,
                      border: '1px solid rgba(30, 58, 95, 0.12)',
                    }}
                  >
                    <Box
                      component="button"
                      role="menuitem"
                      onClick={() => {
                        closeMobileMenu();
                        router.push('/search');
                      }}
                      sx={mobileMenuItemSx}
                    >
                      <NavGlyph src="/icons/search2.svg" />
                      <Box component="span" sx={{ fontSize: '0.95rem' }}>
                        Search
                      </Box>
                    </Box>
                    <Box component="button" role="menuitem" onClick={openAccountFromMenu} sx={mobileMenuItemSx}>
                      <NavGlyph src="/icons/account.svg" />
                      <Box component="span" sx={{ fontSize: '0.95rem' }}>
                        Account
                      </Box>
                    </Box>
                    <Box
                      component="button"
                      role="menuitem"
                      onClick={() => {
                        closeMobileMenu();
                        toggleBag();
                      }}
                      sx={mobileMenuItemSx}
                    >
                      <Badge badgeContent={totalQuantity} invisible={totalQuantity === 0} overlap="circular" sx={bagBadgeSx}>
                        <NavGlyph src="/icons/bag3.svg" />
                      </Badge>
                      <Box component="span" sx={{ fontSize: '0.95rem' }}>
                        Bag
                      </Box>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            ) : (
              desktopIcons
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <UserPopover
        anchorEl={accountAnchorEl}
        open={Boolean(accountAnchorEl)}
        onClose={() => setAccountAnchorEl(null)}
      />
    </>
  );
};
