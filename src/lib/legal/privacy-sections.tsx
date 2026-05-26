import type { ReactNode } from 'react';
import { CONTACT_EMAIL, LEGAL_ENTITY, SITE_DOMAIN } from '@/lib/legal/site';

/** Privacy Policy — source: `docs/nury_legal_policies_spec.md` §PRIVACY POLICY. */
export function PrivacyPolicySections(): ReactNode {
  return (
    <>
      <p>
        This Privacy Policy explains how <strong>{LEGAL_ENTITY}</strong> (&quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) collects, uses, discloses, and protects personal information when you visit {SITE_DOMAIN}, place an
        order, contact us, subscribe to our emails, interact with our advertising or social media, or otherwise use our
        websites, online store, or related services that link to this Privacy Policy (collectively, the
        &quot;Site&quot;).
      </p>
      <p>By using the Site, you acknowledge that you have read this Privacy Policy.</p>

      <h2 id="collect">1. Personal Information We Collect</h2>
      <p>We may collect the following categories of personal information:</p>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.5rem' }}>
        1.1 Information You Provide
      </h3>
      <ul>
        <li>Contact information, such as name, email address, phone number, billing address, and shipping address</li>
        <li>
          Order information, such as products purchased, size/color/style selections, order history, delivery
          information, returns, exchanges, and customer service records
        </li>
        <li>
          Payment-related information, such as payment method details processed by our payment providers; we generally
          do not store full payment card numbers ourselves
        </li>
        <li>Account information, if account creation is available, such as username, password, preferences, and saved addresses</li>
        <li>
          Communications, such as emails, support requests, return requests, survey responses, reviews, testimonials,
          social media messages, and feedback
        </li>
        <li>Marketing preferences, such as email subscription status, opt-in/opt-out choices, and communication preferences</li>
        <li>User Content, such as product reviews, photos, videos, comments, social tags, or testimonials you submit or make available to us</li>
      </ul>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.5rem' }}>
        1.2 Information Collected Automatically
      </h3>
      <ul>
        <li>Device information, such as IP address, browser type, operating system, device type, language settings, and referring URLs</li>
        <li>
          Usage information, such as pages viewed, products viewed, search terms, clicks, cart activity, checkout activity,
          session duration, and interactions with emails or ads
        </li>
        <li>Approximate location information inferred from IP address</li>
        <li>Cookie, pixel, tag, SDK, and similar tracking information</li>
        <li>Fraud prevention and security signals</li>
      </ul>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.5rem' }}>
        1.3 Information From Third Parties
      </h3>
      <ul>
        <li>Ecommerce platforms and checkout providers</li>
        <li>Payment processors</li>
        <li>Shipping and fulfillment providers</li>
        <li>Fraud prevention vendors</li>
        <li>Analytics providers</li>
        <li>Advertising platforms</li>
        <li>Email and marketing platforms</li>
        <li>Social media platforms</li>
        <li>Review or customer support tools</li>
        <li>Public sources or information you make public, such as public social media posts tagging Nury</li>
      </ul>

      <h2 id="use">2. How We Use Personal Information</h2>
      <p>We may use personal information to:</p>
      <ul>
        <li>Operate the Site and online store</li>
        <li>Process, confirm, fulfill, ship, deliver, return, exchange, or refund orders</li>
        <li>Process payments and prevent fraud</li>
        <li>Provide customer support</li>
        <li>Communicate about orders, shipping, returns, policy changes, security, or service updates</li>
        <li>Send marketing emails or promotional messages where permitted</li>
        <li>Personalize content, product recommendations, offers, and advertising</li>
        <li>Measure and improve the Site, products, marketing, and customer experience</li>
        <li>Analyze traffic, attribution, campaign performance, and conversion data</li>
        <li>Maintain security, detect fraud, prevent abuse, and enforce our Terms</li>
        <li>Manage reviews, testimonials, UGC, creator/influencer campaigns, and social media engagement</li>
        <li>Comply with legal, tax, accounting, regulatory, and recordkeeping obligations</li>
        <li>Protect our rights, property, customers, business, and others</li>
      </ul>

      <h2 id="cookies">3. Cookies, Analytics, and Advertising</h2>
      <p>
        We may use cookies, pixels, tags, local storage, and similar technologies to operate the Site, remember
        preferences, keep items in your cart, understand Site performance, measure marketing, personalize content,
        prevent fraud, and deliver or measure advertising.
      </p>
      <p>
        Depending on the tools installed, these technologies may be provided by ecommerce, analytics, advertising,
        social media, email, or customer experience partners, such as Shopify, Google, Meta, Pinterest, TikTok, Klaviyo,
        Mailchimp, PostHog, or similar services.
      </p>
      <p>You can usually control cookies through your browser settings. Some features of the Site may not work properly if cookies are disabled.</p>
      <p>
        If we use targeted advertising or cross-context behavioral advertising, applicable laws may give you rights to
        opt out of certain sharing or targeted advertising. We will provide applicable opt-out mechanisms where required.
      </p>

      <h2 id="disclose">4. How We Disclose Personal Information</h2>
      <p>We may disclose personal information to:</p>
      <ul>
        <li>Ecommerce and hosting providers that operate the store</li>
        <li>Payment processors and fraud prevention providers</li>
        <li>Shipping carriers, fulfillment partners, warehouses, and return processors</li>
        <li>Email, SMS, customer support, CRM, and marketing providers</li>
        <li>Analytics, attribution, and advertising partners</li>
        <li>Review, loyalty, referral, or UGC tools</li>
        <li>Professional advisors, such as attorneys, accountants, insurers, and auditors</li>
        <li>Government authorities, regulators, law enforcement, courts, or others when required or permitted by law</li>
        <li>Business transaction parties in connection with a merger, acquisition, financing, restructuring, sale of assets, bankruptcy, or similar transaction</li>
        <li>Other parties with your consent or at your direction</li>
      </ul>
      <p>
        We do not sell personal information for money. However, some privacy laws define &quot;sale,&quot;
        &quot;sharing,&quot; or &quot;targeted advertising&quot; broadly and may treat certain advertising or analytics
        disclosures as a sale or sharing. If applicable, we will provide required notices and opt-out choices.
      </p>

      <h2 id="shopify">5. Shopify and Ecommerce Platform Notice</h2>
      <p>
        If our store is powered by Shopify or another ecommerce platform, that provider may process personal information
        to operate checkout, payments, fraud prevention, hosting, analytics, and related ecommerce services. Your
        information may also be subject to that provider&apos;s privacy practices.
      </p>
      <p>
        If Nury uses Shopify, see Shopify&apos;s consumer privacy notice:{' '}
        <a href="https://www.shopify.com/legal/privacy/customers" target="_blank" rel="noopener noreferrer">
          shopify.com/legal/privacy/customers
        </a>
        .
      </p>

      <h2 id="email">6. Email and Marketing Communications</h2>
      <p>
        If you subscribe to our email list or otherwise opt in, we may send you marketing emails about Nury products,
        launches, promotions, stories, and events. You can unsubscribe at any time by clicking the unsubscribe link in
        our emails or contacting us.
      </p>
      <p>
        We may still send non-marketing messages, such as order confirmations, shipping updates, return communications,
        customer support responses, legal notices, or security messages.
      </p>

      <h2 id="sms">7. SMS/Text Messaging</h2>
      <p>
        Nury does not send marketing text messages unless you provide express consent through a compliant opt-in
        process. If we offer SMS marketing, the opt-in language will disclose message frequency, possible carrier
        charges, opt-out instructions, help instructions, and a link to applicable SMS terms.
      </p>

      <h2 id="ugc">8. User Content, Reviews, and Social Media</h2>
      <p>
        If you submit reviews, photos, videos, comments, testimonials, or social media content, we may use that content
        as described in our Terms. Public posts may be visible to others. Do not submit content that you do not want
        used publicly.
      </p>
      <p>
        If you receive a free product, discount, payment, affiliate commission, or other benefit from Nury, you must
        clearly disclose that connection when posting about Nury, as required by law and platform rules.
      </p>

      <h2 id="retention">9. Data Retention</h2>
      <p>
        We retain personal information for as long as reasonably necessary for the purposes described in this Privacy
        Policy, including order fulfillment, customer service, tax and accounting records, fraud prevention, legal
        compliance, dispute resolution, security, and business operations.
      </p>
      <p>Retention periods may vary based on the type of information, the reason it was collected, legal requirements, and business needs.</p>

      <h2 id="security">10. Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational measures designed to protect personal information.
        However, no website, system, transmission, or storage method is completely secure. We cannot guarantee absolute security.
      </p>

      <h2 id="children">11. Children&apos;s Privacy</h2>
      <p>
        The Site is not intended for children under 13, and we do not knowingly collect personal information from children
        under 13. If you believe a child under 13 has provided us with personal information, contact us and we will take
        appropriate steps to delete it.
      </p>

      <h2 id="ca">12. California Privacy Notice</h2>
      <p>This section applies to California residents to the extent required by applicable law.</p>
      <p>
        Nury may collect the categories of personal information described above, including identifiers, commercial
        information, internet or electronic network activity information, approximate location information, payment-related
        information processed through payment providers, and inferences related to shopping preferences.
      </p>
      <p>
        We use and disclose those categories for the purposes described in this Privacy Policy, including ecommerce
        operations, fulfillment, customer support, analytics, marketing, advertising, fraud prevention, legal compliance,
        and business operations.
      </p>
      <p>
        Nury likely does not meet the thresholds of the California Consumer Privacy Act/California Privacy Rights Act at
        launch. If Nury becomes subject to CCPA/CPRA, California residents may have rights such as:
      </p>
      <ul>
        <li>Right to know/access personal information</li>
        <li>Right to delete personal information</li>
        <li>Right to correct inaccurate personal information</li>
        <li>Right to opt out of sale or sharing of personal information</li>
        <li>Right to limit use and disclosure of sensitive personal information, where applicable</li>
        <li>Right not to be discriminated against for exercising privacy rights</li>
      </ul>
      <p>
        To submit a privacy request, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may need to verify
        your identity before responding. We will update this Privacy Policy and provide additional mechanisms if and when
        required by applicable law.
      </p>

      <h2 id="other-states">13. Other U.S. State Privacy Rights</h2>
      <p>
        Residents of certain states may have privacy rights under state consumer privacy laws. If such laws apply to Nury,
        you may have rights to access, correct, delete, obtain a copy of, or opt out of certain processing of your personal
        information. You may contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to submit a request.
      </p>

      <h2 id="international">14. International Users</h2>
      <p>
        The Site is operated from the United States and is intended primarily for U.S. customers unless otherwise stated.
        If you access the Site from outside the United States, you understand that your information may be processed in
        the United States and other jurisdictions where privacy laws may differ from those in your location.
      </p>

      <h2 id="changes-privacy">15. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version will be posted on this page with a new
        &quot;Last Updated&quot; date. Your continued use of the Site after changes are posted means you acknowledge the
        updated Privacy Policy.
      </p>

      <h2 id="contact-privacy">16. Contact</h2>
      <p>
        <strong>Nury LLC</strong>
        <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <br />
        Mailing address: provided upon request at the email above.
      </p>
    </>
  );
}
