// /components/main-navbar.tsx — BradaKai surf wear header (see /docs/mockup.png)
'use client';

import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BradaKaiLogo } from '@/components/bradakai-logo';
import { UserPopover } from './auth/user-popover';
import { useBag } from '@/contexts/bag-context';
import { usePathname, useRouter } from 'next/navigation';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_ORANGE,
  bradakaiNavLinkSx,
} from '@/lib/bradakai/brand';

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

const NAV_LINKS = [
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Lookbook', href: '/lookbook' },
] as const;

const SHOP_LINKS = [
  { label: 'T-Shirts', href: '/shop' },
  { label: 'All styles', href: '/frayed-bucket-hats' },
] as const;

export const MainNavbar: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { totalQuantity, toggleBag } = useBag();

  const pathname = usePathname();
  const router = useRouter();
  const [accountAnchorEl, setAccountAnchorEl] = React.useState<HTMLElement | null>(null);
  const [shopAnchorEl, setShopAnchorEl] = React.useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const mobileMenuPanelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setAccountAnchorEl(null);
    setShopAnchorEl(null);
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

  const desktopNavLinks = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { md: 2.5, lg: 3.5 } }}>
      <Button
        onClick={(e) => setShopAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1.1rem !important', color: BRADAKAI_NAVY }} />}
        sx={{
          ...bradakaiNavLinkSx,
          minWidth: 0,
          p: 0,
          '&:hover': { bgcolor: 'transparent' },
        }}
      >
        Shop
      </Button>
      <Menu
        anchorEl={shopAnchorEl}
        open={Boolean(shopAnchorEl)}
        onClose={() => setShopAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              bgcolor: BRADAKAI_CREAM,
              border: `1px solid rgba(30, 58, 95, 0.12)`,
              boxShadow: '0 8px 24px rgba(30, 58, 95, 0.12)',
            },
          },
        }}
      >
        {SHOP_LINKS.map((item) => (
          <MenuItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={() => setShopAnchorEl(null)}
            sx={{ ...bradakaiNavLinkSx, fontSize: '0.85rem', py: 1.25 }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
      {NAV_LINKS.map((item) => (
        <Box key={item.href} component={Link} href={item.href} sx={bradakaiNavLinkSx}>
          {item.label}
        </Box>
      ))}
    </Box>
  );

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
            minHeight: { xs: 64, md: 72 },
            py: { xs: 0.5, md: 1 },
            px: { xs: 2, md: 3, lg: 4 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr auto 1fr', md: '1fr auto 1fr' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', minWidth: 0 }}>
            {isMobile ? null : desktopNavLinks}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" aria-label="BradaKai home">
              <BradaKaiLogo width={{ xs: 120, sm: 140, md: 180 }} priority />
            </Link>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: { xs: 0, md: 0.5 } }}>
            {isMobile ? (
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  ref={hamburgerRef}
                  aria-label="Open menu"
                  aria-controls={mobileMenuOpen ? 'main-nav-mobile-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={mobileMenuOpen}
                  size="medium"
                  sx={iconButtonSx}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                  <Box
                    aria-hidden
                    sx={{
                      width: 28,
                      height: 28,
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
                      minWidth: 220,
                      py: 0.5,
                      borderRadius: 0.5,
                      boxShadow: '0 10px 30px rgba(30,58,95,0.18)',
                      bgcolor: BRADAKAI_CREAM,
                      color: BRADAKAI_NAVY,
                      border: '1px solid rgba(30, 58, 95, 0.12)',
                    }}
                  >
                    {SHOP_LINKS.map((item) => (
                      <Box
                        key={item.href}
                        component="button"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          router.push(item.href);
                        }}
                        sx={{
                          all: 'unset',
                          width: '100%',
                          display: 'block',
                          px: 2,
                          py: 1.15,
                          ...bradakaiNavLinkSx,
                          fontSize: '0.85rem',
                          boxSizing: 'border-box',
                        }}
                      >
                        {item.label}
                      </Box>
                    ))}
                    {NAV_LINKS.map((item) => (
                      <Box
                        key={item.href}
                        component="button"
                        role="menuitem"
                        onClick={() => {
                          closeMobileMenu();
                          router.push(item.href);
                        }}
                        sx={{
                          all: 'unset',
                          width: '100%',
                          display: 'block',
                          px: 2,
                          py: 1.15,
                          ...bradakaiNavLinkSx,
                          fontSize: '0.85rem',
                          boxSizing: 'border-box',
                        }}
                      >
                        {item.label}
                      </Box>
                    ))}
                    <Box
                      component="button"
                      role="menuitem"
                      onClick={() => {
                        closeMobileMenu();
                        router.push('/search');
                      }}
                      sx={{
                        all: 'unset',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.15,
                        boxSizing: 'border-box',
                      }}
                    >
                      <NavGlyph src="/icons/search2.svg" />
                      <Box component="span" sx={{ fontSize: '0.9rem' }}>
                        Search
                      </Box>
                    </Box>
                    <Box
                      component="button"
                      role="menuitem"
                      onClick={() => {
                        closeMobileMenu();
                        setAccountAnchorEl(hamburgerRef.current);
                      }}
                      sx={{
                        all: 'unset',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.15,
                        boxSizing: 'border-box',
                      }}
                    >
                      <NavGlyph src="/icons/account.svg" />
                      <Box component="span" sx={{ fontSize: '0.9rem' }}>
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
                      sx={{
                        all: 'unset',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.15,
                        boxSizing: 'border-box',
                      }}
                    >
                      <Badge badgeContent={totalQuantity} invisible={totalQuantity === 0} overlap="circular" sx={bagBadgeSx}>
                        <NavGlyph src="/icons/bag3.svg" />
                      </Badge>
                      <Box component="span" sx={{ fontSize: '0.9rem' }}>
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
