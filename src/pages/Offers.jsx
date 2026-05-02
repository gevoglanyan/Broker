import { useNavigate } from 'react-router-dom'

export default function Offers() {
  const navigate = useNavigate()

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Updated Monthly</div>
        <h1 className="form-hero-title">MONTHLY LEASE SPECIALS</h1>
        <br />
        <p className="form-hero-sub">Exclusive Deals Updated Monthly — Contact Us to Lock in Your Rate</p>
      </div>

      <div className="form-container" style={{maxWidth: 760}}>
        <div style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--red)',
          borderRadius: 12,
          padding: '28px 32px',
          marginBottom: 24,
        }}>
          <p style={{fontSize: 15, color: 'var(--off-white)', lineHeight: 1.7}}>
            Please contact our sales team during business hours at{' '}
            <a href="tel:4424484848<" style={{color: 'var(--white)', fontWeight: 600, textDecoration: 'none'}}>
              (442) 448-4848
            </a>
          </p>
        </div>

        <br /> <br />

        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '28px 32px',
          marginBottom: 40,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: 'var(--red-light)',
            marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{display:'block', width:16, height:2, background:'var(--red-light)', borderRadius:2}} />
            Important Terms
          </div>
          <br />
          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            {[
              'All Special Offers are based on approved, well-established credit history, with a Tier-1+ Credit Approval.',
              'Consumers that have an insufficient credit history or lower FICO scores will qualify for different credit tiers which may affect the final payment and/or down-payment.',
              'Prices are also based on availability and may be limited on inventory.',
              'Some leases require a "lease conquest/loyalty" — contact us for more details on this.',
            ].map((line, i) => (
              <div key={i} style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                <span style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: 'var(--red-light)', flexShrink: 0, marginTop: 8,
                  display: 'block',
                }} />
                <p style={{fontSize: 14, color: 'var(--off-white)', lineHeight: 1.7}}>{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginBottom: 48,
          flexWrap: 'wrap',
        }}>
          <div style={{flex: 1, minWidth: 200}}>
            <div style={{fontSize: 14, fontWeight: 600, color: 'var(--white)', marginBottom: 4}}>
              Looking for the most up-to-date information?
            </div>
            <div style={{fontSize: 14, color: 'var(--muted)'}}>
              Give us a call and we'll walk you through current specials.
            </div>
          </div>
          <a
            href="tel:4424484848"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--red)', color: '#fff',
              padding: '12px 24px', borderRadius: 10,
              fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 600,
              textDecoration: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(232,32,42,0.4)',
              flexShrink: 0,
            }}
          >
            📞  (442) 448-4848
          </a>
        </div>
      </div>
    </div>
  )
}