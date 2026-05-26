import type { ReactNode } from 'react';
import { CONTACT_EMAIL, LEGAL_ENTITY, SITE_DOMAIN } from '@/lib/legal/site';

/** Returns & Exchanges Policy + return workflow — source: `docs/nury_legal_policies_spec.md`. */
export function ReturnsPolicySections(): ReactNode {
  return (
    <>
      <p>
        This Returns &amp; Exchanges Policy explains how <strong>{LEGAL_ENTITY}</strong> (&quot;we,&quot; &quot;us,&quot;
        or &quot;our&quot;) handles returns and exchanges for products purchased through {SITE_DOMAIN}.
      </p>

      <h2 id="window">1. Return Window</h2>
      <p>We accept eligible returns within <strong>14 days of delivery</strong>.</p>
      <p>
        To start a return, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number and
        reason for return. Returns must be authorized before being shipped back. We may refuse returns sent without
        authorization.
      </p>

      <h2 id="eligibility-returns">2. Return Eligibility</h2>
      <p>To be eligible for return, hats and accessories must be:</p>
      <ul>
        <li>Unworn</li>
        <li>Unwashed</li>
        <li>Unused</li>
        <li>Undamaged</li>
        <li>Free of stains, makeup, sweat, fragrance, hair products, deodorant, smoke, pet hair, or other odor</li>
        <li>In original condition</li>
        <li>With tags, labels, and original packaging included, where applicable</li>
      </ul>
      <p>
        Because hats are worn on the head and can be affected by hair products, makeup, sweat, fragrance, and shaping,
        we reserve the right to reject returns that do not meet these conditions.
      </p>

      <h2 id="non-returnable-items">3. Non-returnable items</h2>
      <p>The following items are final sale and not eligible for return unless defective or required by law:</p>
      <ul>
        <li>Items marked &quot;Final Sale&quot;</li>
        <li>Gift cards</li>
        <li>Customized, personalized, embroidered-to-order, or made-to-order products</li>
        <li>Products damaged by misuse, washing, drying, reshaping, alteration, improper care, or normal wear</li>
        <li>Products returned outside the return window</li>
        <li>Products missing tags, labels, or packaging where required</li>
      </ul>

      <h2 id="exchanges">4. Exchanges</h2>
      <p>
        We may offer exchanges for eligible items depending on inventory availability. If the requested exchange item is
        unavailable, we may offer a refund, store credit, or a different replacement option.
      </p>
      <p>
        To request an exchange, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> within 14 days of delivery.
      </p>

      <h2 id="return-shipping">5. Return Shipping</h2>
      <p>Unless the return is due to our error or a defective item, the customer is responsible for return shipping costs.</p>
      <p>Original shipping charges are non-refundable unless required by law or unless the return is due to our error.</p>
      <p>We recommend using a trackable shipping method. We are not responsible for return packages lost or damaged in transit.</p>

      <h2 id="refunds">6. Refunds</h2>
      <p>
        After we receive and inspect the returned item, we will notify you whether the return is approved. If approved, we
        will issue a refund to the original payment method, less any applicable shipping charges, return shipping fees, or
        other amounts disclosed at the time of return.
      </p>
      <p>Refund timing depends on your payment provider and financial institution.</p>

      <h2 id="defective">7. Damaged, Defective, or Incorrect Items</h2>
      <p>
        If you receive a damaged, defective, or incorrect item, contact us within <strong>7 days of delivery</strong> at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with:
      </p>
      <ul>
        <li>Order number</li>
        <li>Description of the issue</li>
        <li>Photos of the product</li>
        <li>Photos of the packaging, if damaged in transit</li>
      </ul>
      <p>
        If we confirm that the item is defective, damaged before delivery, or incorrect, we may offer a replacement,
        exchange, refund, or other remedy at our discretion and as required by law.
      </p>
      <p>
        Minor variations in color, texture, stitching, embroidery placement, distressing, brim shape, fabric grain, or
        screen display are not necessarily defects.
      </p>

      <h2 id="late-refunds">8. Late or Missing Refunds</h2>
      <p>
        If you have not received an approved refund, first check your payment account and contact your card issuer or bank.
        Processing times vary. If you still need help, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2 id="abuse">9. Abuse of Return Policy</h2>
      <p>
        We reserve the right to refuse returns, exchanges, refunds, discounts, or service where we suspect fraud, excessive
        returns, wardrobing, product switching, abuse of promotions, chargeback abuse, or violation of our Terms.
      </p>

      <h2 id="contact-returns">10. Contact</h2>
      <p>
        For returns and exchanges, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number.
      </p>

      <h2 id="return-workflow">How to request a return (process)</h2>
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Customer emails {CONTACT_EMAIL}</li>
        <li style={{ marginBottom: '0.5rem' }}>Customer provides order number and reason</li>
        <li style={{ marginBottom: '0.5rem' }}>Nury approves or denies return request</li>
        <li style={{ marginBottom: '0.5rem' }}>Nury provides return instructions</li>
        <li style={{ marginBottom: '0.5rem' }}>Nury receives item</li>
        <li style={{ marginBottom: '0.5rem' }}>Nury inspects condition</li>
        <li style={{ marginBottom: '0.5rem' }}>Nury approves refund/exchange/store credit or rejects return</li>
      </ol>
    </>
  );
}
