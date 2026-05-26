'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';

import type { StorefrontProduct } from '@/lib/shopify/types';
import { getReviewsForProduct } from '@/lib/shopify/reviews';
import { WriteReviewModal } from '@/components/product/product-write-review-modal';
import styles from './product-pdp.module.css';

const STAR = '#c7b299';
const STAR_EMPTY = 'rgba(199, 178, 153, 0.35)';
const PAGE_SIZE = 3;

/** Through 30 days: granular days; older reviews use approximate calendar months (~30-day buckets). */
function formatReviewAge(days: number): string {
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days <= 30) return `${days} days ago`;
  const months = Math.max(1, Math.floor(days / 30));
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

function StarRow({ value, idPrefix }: { value: number; idPrefix: string }) {
  const stars: ReactNode[] = [];
  for (let i = 0; i < 5; i++) {
    const v = value - i;
    const fill = v >= 1 ? 'full' : v >= 0.5 ? 'half' : 'empty';
    const gid = `${idPrefix}-rv-star-${i}`;
    stars.push(
      <svg
        key={gid}
        width={16}
        height={16}
        viewBox="0 0 24 24"
        aria-hidden
        className={styles.reviewStarSvg}
      >
        {fill === 'half' ? (
          <defs>
            <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor={STAR} />
              <stop offset="50%" stopColor={STAR_EMPTY} />
            </linearGradient>
          </defs>
        ) : null}
        <path
          fill={fill === 'full' ? STAR : fill === 'half' ? `url(#${gid})` : STAR_EMPTY}
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>,
    );
  }
  return <span className={styles.reviewStarsRow}>{stars}</span>;
}

export function ProductReviewsSection({ product }: { product: StorefrontProduct }): React.JSX.Element {
  const reviews = useMemo(() => getReviewsForProduct(product.handle), [product.handle]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  useEffect(() => {
    setVisibleCount(Math.min(PAGE_SIZE, reviews.length));
  }, [product.handle, reviews.length]);

  const shown = Math.min(visibleCount, reviews.length);
  const visible = reviews.slice(0, shown);
  const hasMore = reviews.length > shown;

  const thumb = product.productImages?.[0]?.url ?? product.images[0]?.url ?? '';

  return (
    <>
      <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
        <div className={styles.reviewsHeading}>
          <div className={styles.reviewsHeadingLine} />
          <h2 id="reviews-heading" className={styles.reviewsTitle}>
            What customers think
          </h2>
          <div className={styles.reviewsHeadingLine} />
        </div>

        {reviews.length === 0 ? (
          <div className={styles.reviewsEmptyRow}>
            <p className={styles.reviewsEmpty}>No reviews yet.</p>
            <button
              type="button"
              className={styles.reviewsWriteReview}
              onClick={() => setWriteReviewOpen(true)}
            >
              Write a review
            </button>
          </div>
        ) : (
          <>
            <div className={styles.reviewsSubhead}>
              <div className={styles.reviewsSubheadLeft}>
                <StarRow value={product.rating.value} idPrefix={`${product.handle}-agg`} />
                <span className={styles.reviewsSubheadCount}>{reviews.length} reviews</span>
              </div>
              <button
                type="button"
                className={styles.reviewsWriteReview}
                onClick={() => setWriteReviewOpen(true)}
              >
                Write a review
              </button>
            </div>

            <ul className={styles.reviewList}>
              {visible.map((r) => (
                <li key={r.id} className={styles.reviewItem}>
                  <div className={styles.reviewColMeta}>
                    <p className={styles.reviewAuthor}>{r.firstName}</p>
                    <p className={styles.reviewVerified}>Verified buyer</p>
                    {thumb ? (
                      <div className={styles.reviewProductRow}>
                        <span className={styles.reviewThumb}>
                          <Image src={thumb} alt="" width={56} height={56} style={{ objectFit: 'cover' }} />
                        </span>
                        <span className={styles.reviewProductLabel}>
                          Reviewing <span className={styles.reviewProductName}>{product.title}</span>
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.reviewColBody}>
                    <div className={styles.reviewRatingRow}>
                      <StarRow value={r.rating} idPrefix={r.id} />
                      <span className={styles.reviewDate}>{formatReviewAge(r.daysAgo)}</span>
                    </div>
                    <p className={styles.reviewText}>{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            {hasMore ? (
              <button
                type="button"
                className={styles.reviewsShowMore}
                onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, reviews.length))}
              >
                Show more
              </button>
            ) : null}
          </>
        )}
      </section>

      <WriteReviewModal open={writeReviewOpen} onClose={() => setWriteReviewOpen(false)} product={product} />
    </>
  );
}
