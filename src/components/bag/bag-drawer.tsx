'use client';

import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBag } from '@/contexts/bag-context';

function formatMoney(amount: string, currencyCode: string): string {
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode || 'USD' }).format(n);
}

export function BagDrawer(): React.JSX.Element | null {
  const theme = useTheme();
  const { lines, totalQuantity, drawerOpen, closeBag, setQuantity, removeLine } = useBag();
  const [mounted, setMounted] = React.useState(false);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBag();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, closeBag]);

  React.useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const subtotal = React.useMemo(() => {
    let sum = 0;
    for (const line of lines) {
      const n = Number(line.unitPriceAmount);
      if (Number.isFinite(n)) sum += n * line.quantity;
    }
    return sum;
  }, [lines]);

  const currency = lines[0]?.currencyCode ?? 'USD';
  const zModal = theme.zIndex.modal;
  const canCheckout = lines.length > 0 && !isCheckingOut;

  const handleCheckout = React.useCallback(async () => {
    if (!canCheckout) return;

    const missingShopifyVariant = lines.find((line) => !line.shopifyVariantId);
    if (missingShopifyVariant) {
      console.warn('Cannot checkout: missing shopifyVariantId for bag item', missingShopifyVariant);
      setCheckoutError('Checkout is not ready for one or more items yet.');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const payload = {
        lines: lines.map((line) => ({
          merchandiseId: line.shopifyVariantId,
          quantity: line.quantity,
        })),
      };

      const res = await fetch('/api/shopify/create-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || typeof data?.checkoutUrl !== 'string' || data.checkoutUrl.length === 0) {
        console.error('Shopify checkout error', data);
        setCheckoutError('There was a problem starting checkout. Please try again.');
        return;
      }

      closeBag();
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Checkout request failed', error);
      setCheckoutError('There was a problem starting checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  }, [canCheckout, lines, closeBag]);

  if (!mounted || !drawerOpen) return null;

  return (
    <>
      {/* Backdrop — plain box, avoids MUI Modal/Drawer (React 19 ref warning) */}
      <Box
        component="button"
        type="button"
        aria-label="Close bag"
        onClick={closeBag}
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: zModal,
          bgcolor: 'rgba(15,15,17,0.45)',
          border: 'none',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          p: 0,
          appearance: 'none',
        }}
      />
      <Box
        component="aside"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: { xs: '100%', sm: 'min(440px, 100vw)' },
          zIndex: zModal + 1,
          bgcolor: '#fafafc',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.75,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            bgcolor: '#fff',
            flexShrink: 0,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, letterSpacing: '0.06em' }}>
            BAG:&nbsp;{totalQuantity}
          </Typography>
          <IconButton aria-label="Close bag" onClick={closeBag} edge="end" size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: '1 1 auto', overflow: 'auto', px: 2, py: 2, minHeight: 0 }}>
          {lines.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              Your bag is empty.
            </Typography>
          ) : (
            <Stack spacing={2} divider={<Divider flexItem sx={{ opacity: 0.6 }} />}>
              {lines.map((line) => (
                <Stack key={line.variantId} direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      position: 'relative',
                      flex: '0 0 72px',
                      width: 72,
                      height: 72,
                      borderRadius: 1,
                      overflow: 'hidden',
                      bgcolor: 'rgba(0,0,0,0.04)',
                      flexShrink: 0,
                    }}
                  >
                    {line.imageUrl ? (
                      <Image
                        src={line.imageUrl}
                        alt={line.imageAlt}
                        width={72}
                        height={72}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                  </Box>
                  <Stack spacing={1} sx={{ flex: '1 1 auto', minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.35 }}>
                      {line.productTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {line.variantTitle}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatMoney(line.unitPriceAmount, line.currencyCode)}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography component="span" variant="caption" color="text.secondary">
                          Qty
                        </Typography>
                        <Stack direction="row" alignItems="center" sx={{ border: '1px solid rgba(0,0,0,0.12)', borderRadius: 1 }}>
                          <IconButton
                            size="small"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                            sx={{ borderRadius: 0.5 }}
                          >
                            −
                          </IconButton>
                          <Typography variant="body2" sx={{ minWidth: 28, textAlign: 'center', px: 0.5 }}>
                            {line.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                            sx={{ borderRadius: 0.5 }}
                          >
                            +
                          </IconButton>
                        </Stack>
                      </Stack>
                      <Button
                        size="small"
                        variant="text"
                        sx={{ fontSize: '0.72rem', letterSpacing: '0.08em', minWidth: 0 }}
                        onClick={() => removeLine(line.variantId)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>

        {lines.length > 0 ? (
          <Box
            sx={{
              flexShrink: 0,
              borderTop: '1px solid rgba(0,0,0,0.08)',
              bgcolor: '#fff',
              px: 2,
              py: 2,
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle2" sx={{ letterSpacing: '0.08em', fontWeight: 600 }}>
                  SUBTOTAL
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {formatMoney(String(subtotal), currency)}
                </Typography>
              </Stack>
              {checkoutError ? (
                <Typography variant="caption" sx={{ color: '#b91c1c', lineHeight: 1.5 }}>
                  {checkoutError}
                </Typography>
              ) : null}
              <Typography
                component="div"
                variant="caption"
                sx={{
                  color: '#78716c',
                  lineHeight: 1.65,
                  textAlign: 'center',
                  fontSize: '0.68rem',
                  letterSpacing: '0.02em',
                }}
              >
                By checking out you agree to our{' '}
                <Box component={Link} href="/terms" sx={{ color: 'inherit', fontWeight: 600 }}>
                  Terms
                </Box>
                ,{' '}
                <Box component={Link} href="/privacy" sx={{ color: 'inherit', fontWeight: 600 }}>
                  Privacy Policy
                </Box>
                ,{' '}
                <Box component={Link} href="/returns" sx={{ color: 'inherit', fontWeight: 600 }}>
                  Returns &amp; Exchanges
                </Box>
                , and{' '}
                <Box component={Link} href="/shipping" sx={{ color: 'inherit', fontWeight: 600 }}>
                  Shipping Policy
                </Box>
                .
              </Typography>
              <Button
                fullWidth
                variant="contained"
                disableElevation
                disabled={!canCheckout}
                onClick={handleCheckout}
                sx={{
                  bgcolor: '#1d1d1f',
                  color: '#fafafc',
                  py: 1.25,
                  borderRadius: 0,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  '&.Mui-disabled': { bgcolor: '#1d1d1f', color: '#9ca3af' },
                }}
              >
                {isCheckingOut ? 'Starting checkout...' : 'Checkout'}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
