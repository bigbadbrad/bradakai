'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBag } from '@/contexts/bag-context';
import type { ProductColorLink, ProductFeatureIcon, ProductVariant, StorefrontProduct } from '@/lib/shopify/types';
import { buildProductUrl } from '@/lib/shopify/pdp-url';
import { isFrayedEdgeBucketHat } from '@/lib/shopify/mock-storefront';
import { getReviewsForProduct } from '@/lib/shopify/reviews';
import { VARIATION_DISCLAIMER_MICROCOPY } from '@/lib/legal/site';
// import { ProductReviewsSection } from './product-reviews-section';
import styles from './product-pdp.module.css';

const STAR = '#c7b299';
const STAR_EMPTY = 'rgba(199, 178, 153, 0.35)';

function formatUsd(amount: string): string {
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

function StarRating({ value, reviewCount, idPrefix }: { value: number; reviewCount: number; idPrefix: string }) {
  const stars: ReactNode[] = [];
  for (let i = 0; i < 5; i++) {
    const v = value - i;
    let fill: 'full' | 'half' | 'empty' = 'empty';
    if (v >= 1) fill = 'full';
    else if (v >= 0.5) fill = 'half';
    const gid = `${idPrefix}-star-${i}`;
    stars.push(
      <svg
        key={gid}
        width={18}
        height={18}
        viewBox="0 0 24 24"
        aria-hidden
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
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
  return (
    <span className={styles.starsRow}>
      {stars}
      <span className={styles.reviewCount}>({reviewCount})</span>
    </span>
  );
}

function TruckIcon() {
  return (
    <svg className={styles.policyIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M1 4h12v10H1V4zm12 3h3l3 3v4h-6V7zM5 20a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg className={styles.policyIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 1.5v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureGlyph({ kind }: { kind: ProductFeatureIcon }) {
  const common = { className: styles.featureGlyph, viewBox: '0 0 24 24', fill: 'none' as const, 'aria-hidden': true };
  switch (kind) {
    case 'soft-canvas':
      return (
        <svg {...common}>
          <path
            d="M6 7h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 18 19H6a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 6 7Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M4.5 11h15M4.5 15h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'breathable':
      return (
        <svg {...common}>
          <path
            d="M4 10c2.2-1.2 4.8-1.2 7 0s4.8 1.2 7 0M4 14c2.2-1.2 4.8-1.2 7 0s4.8 1.2 7 0M4 18c1.8-1 4.2-1.2 6-0.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'washable':
      return (
        <svg {...common}>
          <path
            d="M12 21.2c-3.8-3.2-6.5-7-6.5-10.7a6.5 6.5 0 1 1 13 0c0 3.7-2.7 7.5-6.5 10.7Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M12 6.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export interface ProductDetailViewProps {
  product: StorefrontProduct;
  activeVariant: ProductVariant;
  imageIndex: number;
  colorId: string;
  sizeCode: 'sm' | 'ml';
}

export function ProductDetailView({
  product,
  activeVariant,
  imageIndex,
  colorId,
  sizeCode,
}: ProductDetailViewProps) {
  const { addToBag, openBag } = useBag();
  const { handle } = product;
  const reviewsInBlock = useMemo(() => getReviewsForProduct(handle).length, [handle]);
  const headlineReviewCount = reviewsInBlock * 2;
  const colorOption = product.options.find((o) => o.name === 'Color');
  const sizeOption = product.options.find((o) => o.name === 'Size');
  const relatedColor = product.relatedColors?.find((c) => c.handle === product.handle);
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId) ?? product.variants[0];
  const defaultColorValue = defaultVariant?.selectedOptions.find((o) => o.name === 'Color')?.value;
  const defaultColorName =
    (defaultColorValue &&
      (colorOption?.optionValues.find((v) => v.name === defaultColorValue)?.name ?? defaultColorValue)) ??
    '';
  const colorLabel = relatedColor?.name ?? defaultColorName;
  const pdpTitle =
    isFrayedEdgeBucketHat(product.handle) && colorLabel
      ? `${colorLabel} Frayed Bucket Hat`
      : product.title;
  const breadcrumbTitle = `${colorLabel} ${product.title}`.trim();
  const colorChoices: ProductColorLink[] =
    product.relatedColors && product.relatedColors.length > 0
      ? product.relatedColors
      : (colorOption?.optionValues ?? []).map((v) => ({
          id: v.id,
          name: v.name,
          swatchHex: v.swatchHex ?? '#ccc',
          handle,
        }));

  /** Preserve gallery index when changing color/size unless thumb explicitly sets `img`. */
  const buildLink = (partial: { color?: string; size?: 'sm' | 'ml'; img?: number }) => {
    const imgVal = partial.img !== undefined ? partial.img : imageIndex;
    return buildProductUrl(handle, {
      color: partial.color ?? colorId,
      ...(sizeOption ? { size: partial.size ?? sizeCode } : {}),
      img: imgVal,
    });
  };

  const selectedColorName = colorOption?.optionValues.find((v) => v.id === colorId)?.name ?? '';
  const materialSummary = product.detailBullets[0] ?? 'See Details for fabric and construction.';
  const lifestylePool = product.lifestyleImages && product.lifestyleImages.length > 0
    ? product.lifestyleImages
    : product.images;
  const pickLifestyleImage = (idx: number, fallbackIdx = 0) =>
    lifestylePool[idx] ?? product.images[idx] ?? lifestylePool[fallbackIdx] ?? product.images[fallbackIdx];
  const lifestyleSet = [pickLifestyleImage(0), pickLifestyleImage(1), pickLifestyleImage(2)];
  const canRenderLifestyle = lifestyleSet.every(Boolean);
  const extraLifestyleImages = product.extraLifestyleImages?.filter(Boolean) ?? [];
  const extraLifestyleTitle = product.extraLifestyleTitle ?? 'More to love';
  const extraLifestyleBase =
    extraLifestyleImages.length >= 4 ? extraLifestyleImages.slice(0, 2) : extraLifestyleImages;
  const extraLifestyleHover =
    extraLifestyleImages.length >= 4 ? extraLifestyleImages.slice(2, 4) : [];
  const [activeLifestyleIndex, setActiveLifestyleIndex] = useState(0);
  const safeLifestyleIndex = activeLifestyleIndex >= 0 && activeLifestyleIndex < lifestyleSet.length ? activeLifestyleIndex : 0;
  const lifeHero = lifestyleSet[safeLifestyleIndex];
  const lifeThumbs = lifestyleSet
    .map((img, idx) => ({ img, idx }))
    .filter((item) => item.idx !== safeLifestyleIndex);

  /**
   * Merged `product.images` order is [product[0], gallery[0], gallery[1], product[1]] when slices exist.
   * Mobile hero must be **galleryImages[0]** (first lifestyle tile), not `images[0]` packshot.
   */
  const lastIdx = Math.max(0, product.images.length - 1);
  const mobileHeroFromGallery = (): { idx: number; slot: number } => {
    const g0 = product.galleryImages?.[0];
    if (!g0) {
      return { idx: 0, slot: 0 };
    }
    const idx = product.images.findIndex((img) => img.url === g0.url);
    const heroIdx = idx >= 0 ? idx : 1;
    const heroSlot =
      ([0, 1, 2, 3] as const).find((s) => Math.min(s, lastIdx) === heroIdx) ?? (heroIdx <= 3 ? heroIdx : 0);
    return { idx: heroIdx, slot: heroSlot };
  };
  const mobileHero = mobileHeroFromGallery();

  const renderGalleryCell = (idx: number, slot: number, keySuffix: string) => {
    const img = product.images[idx];
    if (!img) return null;
    const galleryInset = idx === 0 || Boolean(img.desktopInset);
    const shouldCover = !galleryInset && (idx === 1 || idx === 2);
    return (
      <Link
        key={`${handle}-grid-${keySuffix}-${slot}-${idx}`}
        href={buildLink({ img: idx })}
        scroll={false}
        className={styles.galleryCell}
        data-gallery-slot={slot}
        data-pdp-gallery-inset={galleryInset ? '' : undefined}
        aria-label={`View image ${idx + 1}`}
        aria-current={imageIndex === idx ? 'true' : undefined}
      >
        <span className={styles.galleryImgMount}>
          <span className={styles.galleryImgInner}>
            <Image
              src={img.url}
              alt={img.altText}
              fill
              sizes="(max-width: 900px) 44vw, 32vw"
              priority={idx <= 1}
              style={{ objectFit: shouldCover ? 'cover' : 'contain' }}
            />
          </span>
        </span>
      </Link>
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {/* Desktop only — above gallery + column. Mobile breadcrumb sits in `.infoLead` after hero (`grid-area: lead`). */}
        <nav className={`${styles.breadcrumbs} ${styles.breadcrumbsDesktop}`} aria-label="Breadcrumb">
          <Link href="/">Nury</Link>
          <span aria-hidden> &gt; </span>
          <span>{breadcrumbTitle}</span>
        </nav>

        <div className={styles.grid}>
          <div className={styles.infoStack}>
            <div className={styles.infoLead}>
              <nav className={`${styles.breadcrumbs} ${styles.breadcrumbsMobile}`} aria-label="Breadcrumb">
                <Link href="/">Nury</Link>
                <span aria-hidden> &gt; </span>
                <span>{breadcrumbTitle}</span>
              </nav>
              <h1 className={styles.title}>{pdpTitle}</h1>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatUsd(activeVariant.price.amount)}</span>
                <StarRating
                  value={product.rating.value}
                  reviewCount={headlineReviewCount}
                  idPrefix={handle}
                />
              </div>

              {colorOption ? (
                <>
                  <p className={styles.optionLabel}>Color: {selectedColorName}</p>
                  <div className={styles.swatches}>
                    {colorChoices.map((v) => {
                      const href =
                        v.handle === handle
                          ? buildLink({ color: v.id })
                          : buildProductUrl(v.handle, {
                              ...(sizeOption ? { size: sizeCode } : {}),
                              img: imageIndex,
                            });
                      const swatchStyle = v.swatchHexSecondary
                        ? ({
                            /* Vertical split: denim left, cream right */
                            background: `linear-gradient(90deg, ${v.swatchHex} 50%, ${v.swatchHexSecondary} 50%)`,
                          } as const)
                        : { backgroundColor: v.swatchHex };
                      return (
                        <Link
                          key={v.id}
                          href={href}
                          scroll={false}
                          className={`${styles.swatch} ${v.swatchHexSecondary ? styles.swatchSplit : ''} ${v.id === colorId ? styles.swatchActive : ''}`}
                          style={swatchStyle}
                          title={v.name}
                          aria-label={`Color ${v.name}`}
                          aria-current={v.id === colorId ? 'true' : undefined}
                        />
                      );
                    })}
                  </div>
                  {product.headCircumferenceLabel ? (
                    <p className={`${styles.optionLabel} ${styles.oneSizeLead}`}>
                      One size — {product.headCircumferenceLabel} head circumference.{' '}
                      <Link href="/hat-sizes" className={styles.pdpComplianceLink}>
                        Size guide
                      </Link>
                    </p>
                  ) : null}
                </>
              ) : null}

              <div className={styles.purchaseStack}>
                {/* Size picker + guide — uncomment to restore
              {sizeOption ? (
                <>
                  <p className={styles.optionLabel}>Size</p>
                  <div className={styles.sizeRow}>
                    {(['sm', 'ml'] as const).map((code) => {
                      const label = code === 'sm' ? 'S/M' : 'M/L';
                      return (
                        <Link
                          key={code}
                          href={buildLink({ size: code })}
                          scroll={false}
                          className={`${styles.sizeBtn} ${sizeCode === code ? styles.sizeBtnActive : ''}`}
                          aria-current={sizeCode === code ? 'true' : undefined}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                  <p className={styles.sizeGuide}>
                    <Link href="/hat-sizes">Size Guide</Link>
                  </p>
                </>
              ) : null}
              */}

                {activeVariant.availableForSale ? (
                  <button
                    type="button"
                    className={styles.cta}
                    onClick={() => {
                      addToBag(product, activeVariant, 1);
                      openBag();
                    }}
                  >
                    Add To Bag
                  </button>
                ) : null}
              </div>

              <div className={styles.policies}>
                <div className={styles.policy}>
                  <TruckIcon />
                  <span>{product.shippingNote}</span>
                </div>
                <div className={styles.policy}>
                  <ReturnIcon />
                  <span>{product.returnsNote}</span>
                </div>
              </div>
              {isFrayedEdgeBucketHat(product.handle) ? (
                <p className={styles.frayedHubTease}>
                  Designed around the Nury Fashion Bucket Standard: a 9 cm crown, 7 cm brim, and 29 cm
                  Bucket Silhouette Diameter. Nury frayed bucket hats are made to look clean, flattering, and
                  never floppy.
                </p>
              ) : null}
            </div>

            <div className={styles.infoRest}>
            <section className={styles.detailsSection} aria-labelledby="details-heading">
              <div className={styles.detailsHeading}>
                <div className={styles.detailsHeadingLine} />
                <h2 id="details-heading" className={styles.detailsTitle}>
                  Details
                </h2>
                <div className={styles.detailsHeadingLine} />
              </div>
              <ul className={styles.detailsList}>
                {product.detailBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className={styles.featureRow}>
                {product.features.map((f) => (
                  <div key={f.label} className={styles.featureItem}>
                    {f.icon ? (
                      <span className={styles.featureIconWrap}>
                        <FeatureGlyph kind={f.icon} />
                      </span>
                    ) : null}
                    <span className={styles.featureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <details className={styles.pdpComplianceDetails}>
              <summary className={styles.pdpComplianceSummary}>
                <span className={styles.pdpComplianceSummaryTrack}>
                  <span className={styles.detailsHeadingLine} aria-hidden />
                  <h2 className={`${styles.detailsTitle} ${styles.pdpComplianceSummaryTitle}`}>
                    Product information
                  </h2>
                  <span className={styles.detailsHeadingLine} aria-hidden />
                </span>
              </summary>
              <div className={styles.pdpComplianceBody}>
                <dl className={styles.pdpComplianceGrid}>
                  <dt>Material</dt>
                  <dd>{materialSummary}</dd>
                  <dt>Color</dt>
                  <dd>{selectedColorName || '—'}</dd>
                  {product.headCircumferenceLabel ? (
                    <>
                      <dt>Fit / size</dt>
                      <dd>
                        One size — {product.headCircumferenceLabel} head circumference.{' '}
                        <Link href="/hat-sizes" className={styles.pdpComplianceLink}>
                          Size guide
                        </Link>
                      </dd>
                    </>
                  ) : sizeOption ? (
                    <>
                      <dt>Fit / size</dt>
                      <dd>
                        Unisex S/M and M/L.{' '}
                        <Link href="/hat-sizes" className={styles.pdpComplianceLink}>
                          Size guide
                        </Link>
                      </dd>
                    </>
                  ) : null}
                  <dt>Care</dt>
                  <dd>
                    Follow the care label inside the hat.{' '}
                    <Link href="/bucket-hat-care" className={styles.pdpComplianceLink}>
                      Care guide
                    </Link>
                  </dd>
                  <dt>Shipping</dt>
                  <dd>
                    {product.shippingNote}{' '}
                    <Link href="/shipping" className={styles.pdpComplianceLink}>
                      Shipping policy
                    </Link>
                  </dd>
                  <dt>Returns</dt>
                  <dd>
                    {product.returnsNote}{' '}
                    <Link href="/returns" className={styles.pdpComplianceLink}>
                      Returns policy
                    </Link>
                  </dd>
                </dl>
                <p className={styles.pdpVariationNote}>{VARIATION_DISCLAIMER_MICROCOPY}</p>
              </div>
            </details>
            </div>
          </div>

          <div className={styles.galleryStack}>
            <div className={styles.galleryHeroMobile}>
              {renderGalleryCell(mobileHero.idx, mobileHero.slot, 'hero')}
            </div>
            <div className={`${styles.galleryGrid} ${styles.galleryGridDesktop}`}>
              {[0, 1, 2, 3].map((slot) => renderGalleryCell(Math.min(slot, lastIdx), slot, 'd'))}
            </div>
            <div className={`${styles.galleryGrid} ${styles.galleryGridMobileMore}`}>
              {([0, 1, 2, 3] as const)
                .filter((slot) => slot !== mobileHero.slot)
                .map((slot) => renderGalleryCell(Math.min(slot, lastIdx), slot, 'm'))}
            </div>
          </div>
        </div>

        <section className={styles.lifestyle} aria-labelledby="lifestyle-heading">
          {canRenderLifestyle ? (
            <div className={styles.lifestyleLayout}>
              <div className={styles.lifeHeroCol}>
                <div className={styles.lifeHero}>
                  <Image
                    src={lifeHero!.url}
                    alt={lifeHero!.altText}
                    fill
                    sizes="(max-width: 899px) 100vw, 22vw"
                    className={styles.lifestyleHeroImg}
                  />
                </div>
              </div>
              <div className={styles.lifeRight}>
                <div className={styles.lifeText}>
                  <div className={styles.lifestyleHeading}>
                    <div className={styles.lifestyleHeadingLine} />
                    <h2 id="lifestyle-heading" className={styles.lifestyleTitle}>
                      The perfect bucket hat
                    </h2>
                    <div className={styles.lifestyleHeadingLine} />
                  </div>
                  <p className={styles.lifestyleSub}>
                    Clean, effortless, and made to fall in love with. The
                    <br />
                    Heart Bucket is the everyday hat tailored just for you.
                  </p>
                </div>
                <div className={styles.lifeThumbRow}>
                  {lifeThumbs.map(({ img, idx }) => (
                    <button
                      key={`${img!.url}-${idx}`}
                      type="button"
                      className={styles.lifeTileButton}
                      onClick={() => setActiveLifestyleIndex(idx)}
                      aria-label={`Show lifestyle image ${idx + 1}`}
                    >
                      <div className={styles.lifeTile}>
                        <Image
                          src={img!.url}
                          alt={img!.altText}
                          fill
                          sizes="(max-width: 899px) 100vw, 18vw"
                          className={styles.lifestyleThumbImg}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>
        {extraLifestyleBase.length > 0 ? (
          <section className={styles.extraLifestyleSection} aria-label="More lifestyle images">
            <div className={styles.extraLifestyleHeading}>
              <div className={styles.extraLifestyleHeadingLine} aria-hidden />
              <h2 className={styles.extraLifestyleTitle}>{extraLifestyleTitle}</h2>
              <div className={styles.extraLifestyleHeadingLine} aria-hidden />
            </div>
            <div
              className={`${styles.extraLifestyleGrid} ${extraLifestyleBase.length === 1 ? styles.extraLifestyleGridOne : ''}`}
            >
              {extraLifestyleBase.map((img, slotIndex) => {
                const hoverImg = extraLifestyleHover[slotIndex];
                return (
                  <div
                    key={`${img.url}-extra-${slotIndex}`}
                    className={`${styles.extraLifestyleTile} ${hoverImg ? styles.extraLifestyleTileHasHover : ''}`}
                  >
                    <span className={styles.extraLifestyleImgLayer}>
                      <Image
                        src={img.url}
                        alt={img.altText}
                        fill
                        sizes="(max-width: 899px) 100vw, 22vw"
                        className={styles.lifestyleThumbImg}
                      />
                    </span>
                    {hoverImg ? (
                      <span className={`${styles.extraLifestyleImgLayer} ${styles.extraLifestyleImgLayerHover}`}>
                        <Image
                          src={hoverImg.url}
                          alt={hoverImg.altText}
                          fill
                          sizes="(max-width: 899px) 100vw, 22vw"
                          className={styles.lifestyleThumbImg}
                        />
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* <ProductReviewsSection product={product} /> */}
      </div>
    </div>
  );
}
