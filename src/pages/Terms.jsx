export default function Terms() {
  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Legal</div>
        <h1 className="form-hero-title">TERMS OF USE</h1>
        <p className="form-hero-sub">Last updated: January 1, 2025</p>
      </div>

      <div className="form-container" style={{maxWidth: 760}}>
        <div style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px 40px',
        }}>

          <Section title="1. Acceptance of Terms">
            <p>By accessing or using the website and services of Elit Los Angeles ("we," "our," or "us"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services. We reserve the right to update these terms at any time, and your continued use of our services constitutes acceptance of any changes.</p>
          </Section>

          <Section title="2. Services Provided">
            <p>Elit Los Angeles is an independent auto brokerage that assists customers in leasing and financing vehicles through a network of licensed dealerships and lending institutions. We do not sell vehicles directly. Our services include:</p>
            <ul>
              <li>Locating and negotiating vehicle leases and purchases on behalf of clients.</li>
              <li>Submitting credit applications to lenders on your behalf.</li>
              <li>Providing information and guidance throughout the vehicle acquisition process.</li>
            </ul>
            <p>All lease and financing agreements are ultimately between you and the applicable dealership or lender. Elit Los Angeles is not a party to those agreements.</p>
          </Section>

          <Section title="3. Eligibility">
            <p>You must be at least 18 years of age to use our services or submit a credit application. By using our services, you represent and warrant that you meet this requirement and that all information you provide is accurate, complete, and current.</p>
          </Section>

          <Section title="4. Credit Applications and Financial Information">
            <p>When you submit a credit application through Elit Los Angeles, you authorize us to share your personal and financial information with lenders, banks, and dealerships as necessary to process your application. Submitting an application does not guarantee approval. Approval decisions are made solely by the applicable lender and are subject to creditworthiness, income verification, and other factors.</p>
          </Section>

          <Section title="5. No Guarantee of Pricing or Availability">
            <p>All lease specials, pricing, and vehicle availability displayed on our website are subject to change without notice and are contingent on:</p>
            <ul>
              <li>Credit tier approval and creditworthiness.</li>
              <li>Vehicle availability at the time of transaction.</li>
              <li>Applicable manufacturer incentives and dealer participation.</li>
              <li>Lender terms and conditions in effect at the time of signing.</li>
            </ul>
            <p>Advertised payments are estimates only and may vary based on your credit profile, down payment, and other factors.</p>
          </Section>

          <Section title="6. Broker Fee Disclosure">
            <p>Elit Los Angeles does not charge a broker fee to consumers on top of the agreed-upon down payment. Any fees associated with your transaction will be disclosed to you prior to signing any documents.</p>
          </Section>

          <Section title="7. Accuracy of Information">
            <p>We strive to ensure the information on our website is accurate and up to date. However, we make no warranties or representations regarding the accuracy, completeness, or timeliness of any content on our site. We encourage you to contact us directly at <a href="tel:8186666066" style={{color:'var(--red-light)'}}>
              (818) 666-6066</a> to confirm current offers and details.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>All content on this website, including text, graphics, logos, and design, is the property of Elit Los Angeles or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this site without our express written permission.</p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the fullest extent permitted by law, Elit Los Angeles shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services, including but not limited to loss of data, loss of profits, or any errors or omissions in any content. Our total liability to you for any claim arising from your use of our services shall not exceed the amount, if any, paid by you to Elit Los Angeles in connection with the transaction giving rise to the claim.</p>
          </Section>

          <Section title="10. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless Elit Los Angeles, its officers, employees, and agents from and against any claims, liabilities, damages, losses, or expenses — including reasonable attorneys' fees — arising out of your use of our services, your violation of these Terms, or your violation of any rights of another person or entity.</p>
          </Section>

          <Section title="11. Third-Party Services">
            <p>Our website may contain links to third-party websites or services. Elit Los Angeles does not endorse and is not responsible for the content, privacy practices, or terms of any third-party sites. Your use of such sites is at your own risk.</p>
          </Section>

          <Section title="12. Governing Law">
            <p>These Terms of Use shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising from these terms or your use of our services shall be resolved in the state or federal courts located in Los Angeles County, California.</p>
          </Section>

          <Section title="13. Entire Agreement">
            <p>These Terms of Use, together with our Privacy Policy, constitute the entire agreement between you and Elit Los Angeles regarding your use of our website and services and supersede any prior agreements.</p>
          </Section>

          <Section title="14. Contact Us" last>
            <p>If you have any questions about these Terms of Use, please contact us:</p>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <p><strong style={{color:'var(--white)'}}>Elit Los Angeles</strong></p>
              <p>📞 <a href="tel:8186666066" style={{color:'var(--red-light)', textDecoration:'none'}}>
                (818) 666-6066</a></p>
              <p>✉️ <span style={{color:'var(--off-white)'}}>
                info@elitla.com</span></p>
              <p>📍 <span style={{color:'var(--off-white)'}}>
                14310 Victory Blvd, Los Angeles, CA 90049</span></p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children, last }) {
  return (
    <div style={{
      marginBottom: last ? 0 : 36,
      paddingBottom: last ? 0 : 36,
      borderBottom: last ? 'none' : '1px solid var(--border)',
    }}>
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: 22, letterSpacing: 1.5,
        color: 'var(--white)', marginBottom: 14,
      }}>{title}</h2>
      <div style={{
        fontSize: 15, color: 'var(--off-white)', lineHeight: 1.8,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {children}
      </div>
    </div>
  )
}