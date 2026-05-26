import type { ReactNode } from 'react';
import { CONTACT_EMAIL } from '@/lib/legal/site';

/** Shipping Policy — source: `docs/nury_legal_policies_spec.md` §SHIPPING POLICY. */
export function ShippingPolicySections(): ReactNode {
  return (
    <>
      <p>
        This Shipping Policy explains how <strong>Nury LLC</strong> (&quot;Nury,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) handles shipping for orders placed through nury.love.
      </p>

      <h2 id="processing">1. Order Processing</h2>
      <p>
        Orders usually ship within <strong>2-5 business days</strong> after we receive a properly completed order,
        unless a different timeframe is stated on the product page, at checkout, or in your order confirmation.
      </p>
      <p>
        Business days are Monday through Friday, excluding weekends and holidays. Processing times may be longer during
        product launches, holidays, promotions, inventory restocks, pre-orders, or periods of high demand.
      </p>

      <h2 id="destinations">2. Shipping Destinations</h2>
      <p>We currently ship to addresses within the United States, unless otherwise stated at checkout.</p>
      <p>
        We do not ship to every location. We may be unable to ship to certain P.O. boxes, APO/FPO/DPO addresses, freight
        forwarders, hotels, temporary addresses, or restricted locations.
      </p>
      <p>International shipping is not available unless expressly offered at checkout.</p>

      <h2 id="rates">3. Shipping Rates and Delivery Estimates</h2>
      <p>
        Shipping options, rates, and estimated delivery windows are shown at checkout when available. Delivery estimates
        are provided by carriers and are not guaranteed unless expressly stated.
      </p>
      <p>Shipping charges are non-refundable unless required by law or unless the return is due to our error.</p>

      <h2 id="ftc">4. FTC Shipping Compliance / Delays</h2>
      <p>
        When we state a shipping timeframe, we aim to have a reasonable basis for that timeframe. If no shipping timeframe
        is stated, we aim to ship within 30 days of receiving a properly completed order.
      </p>
      <p>
        If we cannot ship your order within the stated timeframe or within 30 days where no timeframe was stated, we may
        contact you with a revised shipping estimate and your options. Your options may include waiting for the delayed
        shipment or canceling the unshipped item for a refund.
      </p>
      <p>If we determine that we cannot ship an item, we will cancel the item and issue a refund.</p>

      <h2 id="preorders">5. Pre-Orders and Backorders</h2>
      <p>
        If we offer pre-orders or backorders, the product page or checkout should state the expected shipping window.
        Pre-order and backorder dates are estimates and may change due to production, supplier, customs, shipping, or
        fulfillment delays.
      </p>
      <p>If a pre-order or backorder is delayed beyond the promised timeframe, we will provide an update and available options as required by law.</p>

      <h2 id="address">6. Address Accuracy</h2>
      <p>
        You are responsible for providing a complete and accurate shipping address. We are not responsible for orders
        delayed, lost, returned, or misdelivered because of incorrect, incomplete, or outdated shipping information provided
        by the customer.
      </p>
      <p>
        If a package is returned to us due to an incorrect address, failed delivery, refusal, or non-pickup, we may contact
        you to arrange reshipment. Additional shipping charges may apply.
      </p>

      <h2 id="tracking">7. Tracking</h2>
      <p>When available, we will send tracking information after your order ships. Tracking may take time to update after the carrier receives the package.</p>

      <h2 id="lost">8. Lost, Stolen, or Damaged Packages</h2>
      <p>
        If tracking shows that a package was delivered but you did not receive it, check the delivery location, household
        members, neighbors, building office, mailroom, and carrier notices first.
      </p>
      <p>
        Nury is not responsible for theft or loss after confirmed delivery to the address provided. However, contact us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will try to help you work with the carrier.
      </p>
      <p>
        If your package arrives damaged, contact us within <strong>7 days of delivery</strong> with your order number and
        photos of the packaging and product.
      </p>

      <h2 id="split">9. Split Shipments</h2>
      <p>
        We may ship items in separate packages depending on inventory, fulfillment location, or product availability. You
        will not be charged extra shipping for split shipments unless disclosed.
      </p>

      <h2 id="contact-shipping">10. Contact</h2>
      <p>
        For shipping questions, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number.
      </p>
    </>
  );
}
