// /lib/shopify/reviews.ts
/**
 * Mock customer reviews keyed by {@link StorefrontProduct.handle}
 * (matches `PRODUCTS_BY_HANDLE` keys in `mock-storefront.ts`).
 *
 * Each row stores `reviewedAt` (`YYYY-MM-DD`). Seed dates used **2026-05-07** as anchor when converting legacy `daysAgo`
 * spacing. The **three newest** reviews per product keep those dates; older reviews are spaced evenly between
 * **2026-01-01** and the day before the oldest of those three. {@link getReviewsForProduct} computes `daysAgo`
 * from each `reviewedAt` to the real current day.
 */

/** Stored mock shape — no runtime `daysAgo`; see {@link getReviewsForProduct}. */
export type ProductReviewSeed = {
  id: string;
  firstName: string;
  rating: number;
  reviewedAt: string;
  body: string;
};

export type ProductReviewRecord = ProductReviewSeed & {
  daysAgo: number;
};

/** Calendar-day delta from `reviewedAt` (local midnight) to `now` (local calendar date). */
function calendarDaysSinceReview(reviewedAtYmd: string, now: Date = new Date()): number {
  const [y, m, d] = reviewedAtYmd.split('-').map(Number);
  const reviewDay = new Date(y, m - 1, d);
  const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((todayDay.getTime() - reviewDay.getTime()) / 86400000));
}

export const REVIEWS_BY_PRODUCT_HANDLE: Record<string, readonly ProductReviewSeed[]> = {
  'frayed-light-blue': [
    {
      id: 'r-fld-1',
      firstName: 'Chloe',
      rating: 5,
      reviewedAt: '2026-05-05',
      body: 'This is the one. The light denim color feels soft and expensive in person, and the frayed edge gives it just enough personality without being too much.',
    },
    {
      id: 'r-fld-2',
      firstName: 'Avery',
      rating: 5,
      reviewedAt: '2026-05-04',
      body: 'I have gotten so many compliments on this hat already. It makes a simple white tee and jeans look intentional.',
    },
    {
      id: 'r-fld-3',
      firstName: 'Mila',
      rating: 5,
      reviewedAt: '2026-05-02',
      body: 'The shape is really flattering. It sits low enough to feel chic but not so low that it hides my whole face.',
    },
    {
      id: 'r-fld-4',
      firstName: 'Sophie',
      rating: 5,
      reviewedAt: '2026-05-01',
      body: 'Exactly the kind of clean, feminine denim accessory I was hoping for. The heart detail is subtle and very cute.',
    },
    {
      id: 'r-fld-5',
      firstName: 'Isla',
      rating: 5,
      reviewedAt: '2026-04-22',
      body: 'This one looks amazing with cream, white, and light blue. Feels very easy and polished at the same time.',
    },
    {
      id: 'r-fld-6',
      firstName: 'Lila',
      rating: 4,
      reviewedAt: '2026-04-13',
      body: 'Really beautiful hat and true to the site photos. I just wish I had ordered it sooner because I keep reaching for it.',
    },
    {
      id: 'r-fld-7',
      firstName: 'Harper',
      rating: 5,
      reviewedAt: '2026-04-03',
      body: 'The frayed edge is perfect. Soft and romantic, not messy. It looks like something from a much more expensive brand.',
    },
    {
      id: 'r-fld-8',
      firstName: 'Emma',
      rating: 5,
      reviewedAt: '2026-03-25',
      body: 'This feels very Nury to me—clean, pretty, and effortless. I wore it on a coffee run and then to dinner the same day.',
    },
    {
      id: 'r-fld-9',
      firstName: 'Nina',
      rating: 5,
      reviewedAt: '2026-03-16',
      body: 'Love the everyday feel of this one. It is feminine without trying too hard.',
    },
    {
      id: 'r-fld-10',
      firstName: 'Brooke',
      rating: 5,
      reviewedAt: '2026-03-07',
      body: 'The light denim shade is so good. Soft, flattering, and really easy to style.',
    },
    {
      id: 'r-fld-11',
      firstName: 'Lucy',
      rating: 5,
      reviewedAt: '2026-02-25',
      body: 'I ordered this for vacation and ended up wearing it constantly at home too. It gives everything a more finished look.',
    },
    {
      id: 'r-fld-12',
      firstName: 'Zoey',
      rating: 5,
      reviewedAt: '2026-02-16',
      body: 'Beautiful quality. The brim has a nice shape and doesn’t look flimsy.',
    },
    {
      id: 'r-fld-13',
      firstName: 'Claire',
      rating: 5,
      reviewedAt: '2026-02-07',
      body: 'Probably my favorite hat purchase in a long time. It has that easy denim look but still feels elevated.',
    },
    {
      id: 'r-fld-14',
      firstName: 'Hannah',
      rating: 5,
      reviewedAt: '2026-01-29',
      body: 'This hat photographs so well. The color is gorgeous and the texture gives it a luxe feel.',
    },
    {
      id: 'r-fld-15',
      firstName: 'Sadie',
      rating: 4,
      reviewedAt: '2026-01-19',
      body: 'Really pretty and very wearable. I would buy another color in this shape for sure.',
    },
    {
      id: 'r-fld-16',
      firstName: 'Maya',
      rating: 5,
      reviewedAt: '2026-01-10',
      body: 'I was nervous about bucket hats on me but this changed my mind. Very flattering and surprisingly easy to wear.',
    },
    {
      id: 'r-fld-17',
      firstName: 'Julia',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'Soft denim, perfect edge detail, and such a pretty tone. This one feels like the hero piece.',
    },
  ],

  'frayed-blue': [
    {
      id: 'r-fb-1',
      firstName: 'Olivia',
      rating: 5,
      reviewedAt: '2026-05-06',
      body: 'This dark blue is stunning. It feels classic but still fashion-forward because of the frayed edge.',
    },
    {
      id: 'r-fb-2',
      firstName: 'Grace',
      rating: 5,
      reviewedAt: '2026-05-03',
      body: 'Obsessed with this one. It gives that clean denim look but with a little attitude.',
    },
    {
      id: 'r-fb-3',
      firstName: 'Stella',
      rating: 5,
      reviewedAt: '2026-05-01',
      body: 'The deeper blue is incredibly flattering. I wear a lot of black, cream, and denim, so this goes with everything.',
    },
    {
      id: 'r-fb-4',
      firstName: 'Ruby',
      rating: 5,
      reviewedAt: '2026-04-30',
      body: 'It looks elevated, not costumey. The proportions are really well done.',
    },
    {
      id: 'r-fb-5',
      firstName: 'Piper',
      rating: 5,
      reviewedAt: '2026-04-20',
      body: 'This has become my everyday hat. I throw it on with leggings, denim, dresses—everything works.',
    },
    {
      id: 'r-fb-6',
      firstName: 'Madeline',
      rating: 4,
      reviewedAt: '2026-04-10',
      body: 'Beautiful tone and shape. The edge detail makes it feel softer and more feminine than a basic bucket hat.',
    },
    {
      id: 'r-fb-7',
      firstName: 'Evelyn',
      rating: 5,
      reviewedAt: '2026-03-31',
      body: 'This one feels especially premium in person. The denim color is rich and the heart detail is very tasteful.',
    },
    {
      id: 'r-fb-8',
      firstName: 'Naomi',
      rating: 5,
      reviewedAt: '2026-03-21',
      body: 'The dark blue is so chic. It gives a little more contrast and drama than the lighter denim version.',
    },
    {
      id: 'r-fb-9',
      firstName: 'Cora',
      rating: 5,
      reviewedAt: '2026-03-11',
      body: 'I bought this on a whim and it ended up being my favorite accessory this month.',
    },
    {
      id: 'r-fb-10',
      firstName: 'Leah',
      rating: 5,
      reviewedAt: '2026-03-02',
      body: 'Feels very polished and easy to style. Love it with an oversized white button-down.',
    },
    {
      id: 'r-fb-11',
      firstName: 'Elena',
      rating: 5,
      reviewedAt: '2026-02-20',
      body: 'The shape is great and the denim has a nice weight to it. Not stiff, not floppy.',
    },
    {
      id: 'r-fb-12',
      firstName: 'Aubrey',
      rating: 5,
      reviewedAt: '2026-02-10',
      body: 'This is the one that made me understand the Nury look. Clean, romantic, and wearable.',
    },
    {
      id: 'r-fb-13',
      firstName: 'Bella',
      rating: 4,
      reviewedAt: '2026-01-31',
      body: 'Very pretty and very close to the photos. The dark denim reads a little dressier than I expected, which I ended up liking.',
    },
    {
      id: 'r-fb-14',
      firstName: 'Kendall',
      rating: 5,
      reviewedAt: '2026-01-21',
      body: 'This would honestly make a great gift. It feels special but still easy enough for everyday wear.',
    },
    {
      id: 'r-fb-15',
      firstName: 'Layla',
      rating: 5,
      reviewedAt: '2026-01-11',
      body: 'I wear this constantly. It somehow looks effortless and put together at the same time.',
    },
    {
      id: 'r-fb-16',
      firstName: 'Camila',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'Perfect if you want a bucket hat that feels a little moodier and more refined than the basic ones everywhere else.',
    },
  ],

  'frayed-cream': [
    {
      id: 'r-fc-1',
      firstName: 'Addison',
      rating: 5,
      reviewedAt: '2026-05-04',
      body: 'The cream color is gorgeous. Soft and clean and exactly what I wanted for spring and summer.',
    },
    {
      id: 'r-fc-2',
      firstName: 'Ella',
      rating: 5,
      reviewedAt: '2026-04-30',
      body: 'This looks so good with linen and denim. Very easy, very pretty.',
    },
    {
      id: 'r-fc-3',
      firstName: 'Violet',
      rating: 5,
      reviewedAt: '2026-04-28',
      body: 'The frayed edge on the cream is especially beautiful. It has a romantic feel without looking precious.',
    },
    {
      id: 'r-fc-4',
      firstName: 'Charlotte',
      rating: 4,
      reviewedAt: '2026-04-27',
      body: 'Love the tone and overall design. It feels bright and fresh and more elevated than a standard white bucket hat.',
    },
    {
      id: 'r-fc-5',
      firstName: 'Mia',
      rating: 5,
      reviewedAt: '2026-03-29',
      body: 'Beautiful hat. The cream is warm, not stark, which makes it much easier to wear.',
    },
    {
      id: 'r-fc-6',
      firstName: 'Ariana',
      rating: 5,
      reviewedAt: '2026-02-28',
      body: 'This one feels very chic and feminine. Perfect for travel, brunch, and daytime outfits.',
    },
    {
      id: 'r-fc-7',
      firstName: 'Paige',
      rating: 5,
      reviewedAt: '2026-01-30',
      body: 'Really impressed with the quality. The brim keeps its shape nicely and the fabric feels substantial.',
    },
    {
      id: 'r-fc-8',
      firstName: 'Savannah',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'Exactly the kind of clean neutral I was looking for. Makes everything look a little more polished.',
    },
  ],

  'frayed-gray': [
    {
      id: 'r-fg-1',
      firstName: 'Reese',
      rating: 5,
      reviewedAt: '2026-05-03',
      body: 'The gray is so understated and cool. It feels modern and goes with literally everything.',
    },
    {
      id: 'r-fg-2',
      firstName: 'Sydney',
      rating: 5,
      reviewedAt: '2026-05-01',
      body: 'I love that this isn’t a flat gray. It has enough texture to feel soft and elevated.',
    },
    {
      id: 'r-fg-3',
      firstName: 'Tessa',
      rating: 5,
      reviewedAt: '2026-04-25',
      body: 'This is my favorite neutral after black. It works with white, denim, and all my darker basics.',
    },
    {
      id: 'r-fg-4',
      firstName: 'Mckenna',
      rating: 4,
      reviewedAt: '2026-04-24',
      body: 'Very wearable and chic. The frayed edge keeps the gray from feeling too plain.',
    },
    {
      id: 'r-fg-5',
      firstName: 'Faith',
      rating: 5,
      reviewedAt: '2026-03-27',
      body: 'Looks especially good with oversized shirting and simple gold jewelry. Very clean vibe.',
    },
    {
      id: 'r-fg-6',
      firstName: 'Jade',
      rating: 5,
      reviewedAt: '2026-02-27',
      body: 'Love the softer color palette of this one. Minimal but still distinct.',
    },
    {
      id: 'r-fg-7',
      firstName: 'Sienna',
      rating: 5,
      reviewedAt: '2026-01-29',
      body: 'Really nice shape and a great everyday color. This one feels very easy to wear.',
    },
    {
      id: 'r-fg-8',
      firstName: 'Keira',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'I wanted something neutral but not predictable and this was perfect.',
    },
  ],

  'frayed-black': [
    {
      id: 'r-fbk-1',
      firstName: 'Morgan',
      rating: 5,
      reviewedAt: '2026-05-05',
      body: 'A black bucket hat can go wrong fast, but this one is so good. Clean lines, flattering shape, and the frayed edge softens it perfectly.',
    },
    {
      id: 'r-fbk-2',
      firstName: 'Dakota',
      rating: 5,
      reviewedAt: '2026-05-02',
      body: 'This feels like the easiest hat to wear. It just works with everything in my closet.',
    },
    {
      id: 'r-fbk-3',
      firstName: 'Quinn',
      rating: 5,
      reviewedAt: '2026-04-28',
      body: 'The black makes the silhouette feel a little more fashion and a little less casual. I love that.',
    },
    {
      id: 'r-fbk-4',
      firstName: 'Rory',
      rating: 4,
      reviewedAt: '2026-04-27',
      body: 'Very flattering and true to photos. Great if you want something classic with a small twist.',
    },
    {
      id: 'r-fbk-5',
      firstName: 'Skylar',
      rating: 5,
      reviewedAt: '2026-03-29',
      body: 'This one instantly became part of my everyday rotation. Effortless and cool.',
    },
    {
      id: 'r-fbk-6',
      firstName: 'Wren',
      rating: 5,
      reviewedAt: '2026-02-28',
      body: 'Love the subtle heart detail on the black. It feels understated, not loud.',
    },
    {
      id: 'r-fbk-7',
      firstName: 'Phoebe',
      rating: 5,
      reviewedAt: '2026-01-30',
      body: 'Perfect travel hat. Packs well and still looks polished when I put it on.',
    },
    {
      id: 'r-fbk-8',
      firstName: 'Gia',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'The edge detail gives it a softness that makes it more feminine than other black bucket hats I have tried.',
    },
  ],

  'ultra-frayed-blue': [
    {
      id: 'r-ufb-1',
      firstName: 'Adeline',
      rating: 5,
      reviewedAt: '2026-05-04',
      body: 'This one is so good in person. The darker denim and extra fray make it feel fashionier and more editorial.',
    },
    {
      id: 'r-ufb-2',
      firstName: 'June',
      rating: 5,
      reviewedAt: '2026-04-30',
      body: 'I wanted something more statement-y and this was exactly right. Still wearable, but with more personality.',
    },
    {
      id: 'r-ufb-3',
      firstName: 'Rosalie',
      rating: 5,
      reviewedAt: '2026-04-26',
      body: 'The ultra frayed edge is beautiful. It looks intentional and elevated, not messy.',
    },
    {
      id: 'r-ufb-4',
      firstName: 'Mallory',
      rating: 4,
      reviewedAt: '2026-04-25',
      body: 'Really pretty piece. Slightly bolder than my usual style but I ended up loving that.',
    },
    {
      id: 'r-ufb-5',
      firstName: 'Bianca',
      rating: 5,
      reviewedAt: '2026-03-28',
      body: 'This is the hat people ask me about. It has a lot of character without being hard to wear.',
    },
    {
      id: 'r-ufb-6',
      firstName: 'Noelle',
      rating: 5,
      reviewedAt: '2026-02-27',
      body: 'Looks amazing with an all-white outfit. The darker denim really pops.',
    },
    {
      id: 'r-ufb-7',
      firstName: 'Daphne',
      rating: 5,
      reviewedAt: '2026-01-30',
      body: 'If you want the Nury look with a little extra edge, this is the one.',
    },
    {
      id: 'r-ufb-8',
      firstName: 'Skye',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'Beautiful construction and a very cool shape. Feels special.',
    },
  ],

  'ultra-frayed-blue-patchwork': [
    {
      id: 'r-ufbp-1',
      firstName: 'Genevieve',
      rating: 5,
      reviewedAt: '2026-05-02',
      body: 'The mix of blues is incredible. It feels artistic but still easy to style because the palette is so wearable.',
    },
    {
      id: 'r-ufbp-2',
      firstName: 'Marin',
      rating: 5,
      reviewedAt: '2026-04-28',
      body: 'This looks even better in person. Such a cool piece.',
    },
    {
      id: 'r-ufbp-3',
      firstName: 'Lena',
      rating: 5,
      reviewedAt: '2026-04-24',
      body: 'I love patchwork when it is done subtly and this is exactly that. Very fashion-forward but still polished.',
    },
    {
      id: 'r-ufbp-4',
      firstName: 'Briar',
      rating: 4,
      reviewedAt: '2026-04-23',
      body: 'Really unique and beautifully made. Definitely more of a statement piece, which I was looking for.',
    },
    {
      id: 'r-ufbp-5',
      firstName: 'Celine',
      rating: 5,
      reviewedAt: '2026-03-26',
      body: 'The different denim tones make this feel rich and dimensional. So good with simple outfits.',
    },
    {
      id: 'r-ufbp-6',
      firstName: 'Anya',
      rating: 5,
      reviewedAt: '2026-02-26',
      body: 'This one stands out in the best way. I wore it with a cream sweater and jeans and got compliments all day.',
    },
    {
      id: 'r-ufbp-7',
      firstName: 'Remi',
      rating: 5,
      reviewedAt: '2026-01-29',
      body: 'Love the craftsmanship. It feels playful but still very refined.',
    },
    {
      id: 'r-ufbp-8',
      firstName: 'Elsie',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'My favorite more statement style on the site. Distinctive and still wearable.',
    },
  ],

  'frayed-tie-dye-blue': [
    {
      id: 'r-ftdb-1',
      firstName: 'Vivian',
      rating: 5,
      reviewedAt: '2026-05-03',
      body: 'The blue tie-dye is softer and prettier than I expected. It does not feel loud at all.',
    },
    {
      id: 'r-ftdb-2',
      firstName: 'Mae',
      rating: 5,
      reviewedAt: '2026-04-29',
      body: 'Such a fun variation while still keeping the Nury look. I love it with white and light denim.',
    },
    {
      id: 'r-ftdb-3',
      firstName: 'Callie',
      rating: 5,
      reviewedAt: '2026-04-25',
      body: 'This is playful in the best way. The blue tones are really beautiful.',
    },
    {
      id: 'r-ftdb-4',
      firstName: 'Winter',
      rating: 4,
      reviewedAt: '2026-04-24',
      body: 'Very cute and a little more expressive than the solid colors. Great summer hat.',
    },
    {
      id: 'r-ftdb-5',
      firstName: 'Lola',
      rating: 5,
      reviewedAt: '2026-03-27',
      body: 'I bought this for vacation and ended up wearing it on repeat. It brightens up simple outfits.',
    },
    {
      id: 'r-ftdb-6',
      firstName: 'Nora',
      rating: 5,
      reviewedAt: '2026-02-27',
      body: 'The pattern feels soft and dreamy, not harsh. Really pretty in person.',
    },
    {
      id: 'r-ftdb-7',
      firstName: 'Maren',
      rating: 5,
      reviewedAt: '2026-01-29',
      body: 'A fun standout piece that still feels easy to wear. Love the color story.',
    },
    {
      id: 'r-ftdb-8',
      firstName: 'Hazel',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'This one has such a nice laid-back energy. Perfect for beach weekends and daytime outfits.',
    },
  ],

  'basic-black': [
    {
      id: 'r-bb-1',
      firstName: 'Kate',
      rating: 5,
      reviewedAt: '2026-05-04',
      body: 'This is the perfect basic black bucket hat. Clean, flattering, and easy to wear every day.',
    },
    {
      id: 'r-bb-2',
      firstName: 'Lauren',
      rating: 5,
      reviewedAt: '2026-04-30',
      body: 'Exactly what I wanted: simple, chic, and not oversized. The shape is really good.',
    },
    {
      id: 'r-bb-3',
      firstName: 'Natalie',
      rating: 5,
      reviewedAt: '2026-04-25',
      body: 'This is the most versatile one for me. It works with athleisure, denim, and dresses.',
    },
    {
      id: 'r-bb-4',
      firstName: 'Caroline',
      rating: 4,
      reviewedAt: '2026-04-24',
      body: 'Great everyday hat. Very straightforward in the best way.',
    },
    {
      id: 'r-bb-5',
      firstName: 'Abigail',
      rating: 5,
      reviewedAt: '2026-03-27',
      body: 'Love the minimal feel of this one. It is the easiest grab-and-go piece on the site.',
    },
    {
      id: 'r-bb-6',
      firstName: 'Serena',
      rating: 5,
      reviewedAt: '2026-02-27',
      body: 'The quality is lovely and the black looks rich, not faded. Super wearable.',
    },
    {
      id: 'r-bb-7',
      firstName: 'Gabrielle',
      rating: 5,
      reviewedAt: '2026-01-29',
      body: 'A really good staple hat. Clean enough to go with everything but still feels stylish.',
    },
    {
      id: 'r-bb-8',
      firstName: 'Allison',
      rating: 5,
      reviewedAt: '2026-01-01',
      body: 'If you want the most classic option, this is it. Simple, flattering, and worth it.',
    },
  ],
};

/** Count of all mock review seeds across {@link REVIEWS_BY_PRODUCT_HANDLE}. */
export function getTotalReviewSeedCount(): number {
  let n = 0;
  for (const list of Object.values(REVIEWS_BY_PRODUCT_HANDLE)) {
    n += list.length;
  }
  return n;
}

/** Homepage hero aggregate: **2×** total seed reviews (matches PDP headline pattern). */
export function getHeroAggregateReviewDisplayCount(): number {
  return getTotalReviewSeedCount() * 3;
}

export function getReviewsForProduct(handle: string): ProductReviewRecord[] {
  const list = REVIEWS_BY_PRODUCT_HANDLE[handle];
  if (!list) return [];
  return list.map((r) => ({
    ...r,
    daysAgo: calendarDaysSinceReview(r.reviewedAt),
  }));
}