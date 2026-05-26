'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Rating, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import type { StorefrontProduct } from '@/lib/shopify/types';

const STAR = '#c7b299';

/** Must match `name` / hidden `form-name` in public/netlify-forms-product-review.html */
const NETLIFY_FORM_NAME = 'product-review';

/**
 * POST must target this static path — not `/`. Next.js handles POST / and Netlify Forms never sees it.
 * @see https://opennext.js.org/netlify/forms
 */
const NETLIFY_FORM_ACTION = '/netlify-forms-product-review.html';

export interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  product: StorefrontProduct;
}

/** Plain backdrop + panel — avoids MUI Dialog/Modal (React 19 `element.ref` warning). */
export function WriteReviewModal({ open, onClose, product }: WriteReviewModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: false });
  const zModal = theme.zIndex.modal;

  const [firstName, setFirstName] = useState('');
  const [rating, setRating] = useState<number | null>(5);
  const [body, setBody] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setFirstName('');
      setRating(5);
      setBody('');
      setSubmitSuccess(false);
      setSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const thumbUrl = product.productImages?.[0]?.url ?? product.images[0]?.url ?? '';
  const thumbAlt = product.productImages?.[0]?.altText ?? product.images[0]?.altText ?? product.title;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || rating === null || rating < 1 || !body.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    const params = new URLSearchParams();
    params.append('form-name', NETLIFY_FORM_NAME);
    params.append('bot-field', '');
    params.append('first-name', firstName.trim());
    params.append('rating', String(rating));
    params.append('body', body.trim());
    params.append('product-title', product.title);
    params.append('product-handle', product.handle);
    params.append('product-id', product.id);

    try {
      const res = await fetch(NETLIFY_FORM_ACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: params.toString(),
      });

      const raw = await res.text();
      let ok = res.ok;
      let apiError: string | undefined;
      if (raw) {
        try {
          const data = JSON.parse(raw) as { success?: boolean; error?: string };
          if (typeof data.success === 'boolean') ok = data.success;
          if (!ok && data.error) apiError = data.error;
        } catch {
          /* Netlify may return HTML on some setups */
        }
      }

      if (!ok) {
        setSubmitError(apiError ?? 'Something went wrong. Please try again.');
        return;
      }
      setSubmitSuccess(true);
    } catch {
      setSubmitError('Could not reach the server. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-label="Close review form"
        onClick={onClose}
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-dialog-title"
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'fixed',
          zIndex: zModal + 1,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f9f7f2',
          borderRadius: 0,
          overflow: 'hidden',
          boxShadow: fullScreen ? 'none' : '0 24px 48px rgba(0,0,0,0.18)',
          ...(fullScreen
            ? {
                inset: 0,
                width: '100%',
                height: '100%',
                maxHeight: '100%',
                border: 'none',
                pt: 'env(safe-area-inset-top, 0px)',
              }
            : {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(600px, calc(100vw - 32px))',
                maxHeight: 'min(calc(100vh - 32px), 90vh)',
                border: '1px solid #e8e0d4',
              }),
        }}
      >
        <Box
          component="header"
          id="write-review-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pr: 1,
            pl: 3,
            py: 2,
            flexShrink: 0,
            fontFamily: 'Georgia, "Iowan Old Style", Palatino, serif',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontSize: '0.95rem',
            color: '#1a1816',
            borderBottom: '1px solid #e8e0d4',
            bgcolor: fullScreen ? '#fff' : 'transparent',
          }}
        >
          Write a review
          <IconButton type="button" onClick={onClose} aria-label="Close" size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: '1 1 auto',
            minHeight: 0,
            overflow: 'auto',
            px: fullScreen ? 2 : 3,
            pt: 3,
            pb: 2,
          }}
        >
          <Typography
            sx={{
              mb: 2,
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              color: '#57534e',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            You must be a <strong style={{ color: '#111827' }}>verified customer</strong> who purchased this product
            through bradakai.com for your review to be published.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
            {thumbUrl ? (
              <Box
                sx={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid #e0d6c8',
                  bgcolor: '#f9f5ee',
                  position: 'relative',
                }}
              >
                <Image src={thumbUrl} alt={thumbAlt} width={72} height={72} style={{ objectFit: 'cover' }} />
              </Box>
            ) : null}
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', color: '#6b6560', mb: 0.5 }}>
                Reviewing
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#111827', lineHeight: 1.35 }}>
                {product.title}
              </Typography>
            </Box>
          </Box>

          {submitSuccess ? (
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#3f3a36' }}>
              Thank you. If your purchase qualifies, your review will appear after a quick verification.
            </Typography>
          ) : (
            <Box component="form" id="write-review-form" onSubmit={handleSubmit} noValidate>
              {submitError ? (
                <Typography role="alert" sx={{ mb: 2, fontSize: '0.875rem', color: '#b91c1c', lineHeight: 1.5 }}>
                  {submitError}
                </Typography>
              ) : null}
              <Typography
                component="label"
                htmlFor="review-rating"
                sx={{
                  display: 'block',
                  mb: 0.75,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#57534e',
                  textTransform: 'uppercase',
                }}
              >
                Rating
              </Typography>
              <Rating
                id="review-rating"
                name="rating"
                value={rating}
                precision={1}
                onChange={(_, v) => setRating(v)}
                sx={{
                  mb: 2,
                  color: STAR,
                  '& .MuiRating-iconFilled': { color: STAR },
                  '& .MuiRating-iconHover': { color: STAR },
                }}
              />

              <TextField
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 60 }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 0, bgcolor: '#fff' },
                }}
              />

              <TextField
                label="Your review"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                required
                multiline
                minRows={4}
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 2000 }}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 0, bgcolor: '#fff' },
                }}
              />
            </Box>
          )}
        </Box>

        <Box
          component="footer"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            px: 3,
            pt: 0,
            pb: fullScreen ? 'max(12px, env(safe-area-inset-bottom, 0px))' : 2.5,
            flexShrink: 0,
            ...(fullScreen && !submitSuccess
              ? { borderTop: '1px solid #e8e0d4', bgcolor: '#fff' }
              : {}),
          }}
        >
          {submitSuccess ? (
            <Button onClick={onClose} variant="contained" disableElevation sx={{ borderRadius: 0, bgcolor: '#111827', '&:hover': { bgcolor: '#000' } }}>
              Done
            </Button>
          ) : (
            <>
              <Button type="button" onClick={onClose} disabled={submitting} sx={{ borderRadius: 0, color: '#57534e' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="write-review-form"
                variant="contained"
                disableElevation
                disabled={submitting}
                sx={{ borderRadius: 0, bgcolor: '#c7b299', color: '#111827', '&:hover': { bgcolor: '#b8a388' } }}
              >
                {submitting ? 'Submitting…' : 'Submit review'}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
