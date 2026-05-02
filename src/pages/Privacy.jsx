export default function Privacy() {
  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Legal</div>
        <h1 className="form-hero-title">PRIVACY POLICY</h1>
        <p className="form-hero-sub">Last updated: January 1, 2026</p>
      </div>

      <div className="form-container" style={{maxWidth: 760}}>
        <div style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px 40px',
        }}>

          <Section title="1. Introduction">
            <p>Crystal Auto Leasing ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li><strong>Personal Identifiers:</strong> Name, date of birth, Social Security number, driver's license number.</li>
              <li><strong>Contact Information:</strong> Email address, phone number, mailing address.</li>
              <li><strong>Financial Information:</strong> Income, employment details, credit history, and housing information submitted through our credit application.</li>
              <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your lease or credit application and communicate with you about it.</li>
              <li>Verify your identity and assess creditworthiness.</li>
              <li>Connect you with our network of dealers and lending institutions.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Send you updates about lease specials and promotional offers (you may opt out at any time).</li>
              <li>Comply with applicable laws and regulations.</li>
            </ul>
          </Section>

          <Section title="4. How We Share Your Information">
            <p>We do not sell your personal information to third parties. We may share your information with:</p>
            <ul>
              <li><strong>Lending Institutions and Banks:</strong> To process credit applications and secure financing or lease approvals.</li>
              <li><strong>Dealerships:</strong> As necessary to facilitate vehicle acquisition on your behalf.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website or conducting our business, subject to confidentiality agreements.</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or governmental regulation.</li>
            </ul>
          </Section>

          <Section title="5. Data Security">
            <p>We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Financial and credit application data may be retained for a minimum of seven (7) years in accordance with applicable regulations.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your personal information, subject to legal retention requirements.</li>
              <li>Opt out of marketing communications.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at the information listed below.</p>
          </Section>

          <Section title="8. California Privacy Rights (CCPA)">
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To submit a request, contact us at <a href="tel:8186666066" style={{color:'var(--red-light)'}}>
              (818) 666-6066</a>.</p>
          </Section>

          <Section title="9. Cookies">
            <p>Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You may disable cookies through your browser settings, though this may affect some functionality of our site.</p>
          </Section>

          <Section title="10. Third-Party Links">
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their privacy policies separately.</p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us immediately.</p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of our website after any changes constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="13. Contact Us" last>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
            <div style={{marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
              <p><strong style={{color:'var(--white)'}}>Crystal Auto Leasing</strong></p>
              <p>📞 <a href="tel:4424484848" style={{color:'var(--red-light)', textDecoration:'none'}}>
                (442) 448-4848</a></p>
              <p>✉️ <span style={{color:'var(--off-white)'}}>
                crystalautoleasing@gmail.com</span></p>
              <p>📍 <span style={{color:'var(--off-white)'}}>
                1907 W Burbank Blvd Unit B, Burbank, CA 91506</span></p>
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
      <style>{`
        .privacy-section ul {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .privacy-section li { font-size: 15px; color: var(--off-white); line-height: 1.7; }
        .privacy-section strong { color: var(--white); }
      `}</style>
    </div>
  )
}