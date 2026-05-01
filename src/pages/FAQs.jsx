import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FAQS = [
  {
    q: 'What are the advantages to leasing?',
    a: 'When you lease a car, depending on your credit rating and history, you have the option of not putting a down-payment (if you desire a higher payment) or you can put a down-payment if you want a lower payment. Should you wish to not purchase the car at the residual value when the lease is completed, you can turn in the car and walk away — or lease a brand-new car.',
  },
  {
    q: 'Who owns the car when I lease?',
    a: 'You do not own a car when you lease. The car belongs to the lienholder, which is normally the bank. When the lease is completed, you have the option to purchase your leased car at its residual value, plus tax and any applicable fees. Once your car is fully paid off, you will own the car.',
  },
  {
    q: 'What does 7.5k, 10k, or 12k miles per year mean?',
    a: 'When you lease a brand new car, you are limited on the number of miles that can be driven throughout the lease term. You are entitled to drive only that said amount of miles per year to ensure you do not go over your limit. Further details will be discussed prior to the signing of the final lease paperwork.',
  },
  {
    q: 'I was asked to be a co-signer for a friend or family member — what does this mean?',
    a: 'You are being asked to be a co-signer on a lease or purchase for someone who probably does not have a well-established credit history or has a low credit score. If you know that individual personally and know they have a stable monthly income, you should co-sign only at your own discretion.',
  },
  {
    q: 'I have a limited credit history and I am not employed — can I still lease a car?',
    a: 'You will need to be employed in order to lease a car. In some situations, depending on your credit rating, the bank may also request proof of income. If you are retired and are receiving social security benefits, please note this on your credit application.',
  },
  {
    q: 'Do I have to pay an additional broker fee?',
    a: 'No. We do not charge a broker fee on top of your down payment. The price you agree to is the price you pay.',
  },
  {
    q: 'I have a limited credit history but I have a job — how can I get approved?',
    a: 'If you have a limited credit history but are currently employed, we recommend obtaining a co-signer with a better credit rating. The co-signer becomes joint on the lease or purchase, and if you make on-time payments you will rebuild your credit as well. Keep in mind — the co-signer is equally responsible for on-time payments. If you are late on a payment, it will reflect on both your and your co-signer\'s credit report.',
  },
  
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '22px 0',
          textAlign: 'left',
          fontFamily: 'Outfit, sans-serif',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: 'var(--red-light)',
            letterSpacing: 1, fontFamily: 'Bebas Neue, sans-serif',
            minWidth: 24, paddingTop: 2,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontSize: 16, fontWeight: 600,
            color: open ? 'var(--white)' : 'var(--off-white)',
            lineHeight: 1.5,
            transition: 'color 0.2s',
          }}>
            {faq.q}
          </span>
        </div>
        <span style={{
          fontSize: 20,
          color: open ? 'var(--red-light)' : 'var(--muted)',
          flexShrink: 0,
          transition: 'transform 0.25s ease, color 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'block',
          lineHeight: 1,
        }}>+</span>
      </button>

      {open && (
        <div style={{
          paddingLeft: 40,
          paddingBottom: 24,
          paddingRight: 8,
        }}>
          <p style={{
            fontSize: 15,
            color: 'var(--off-white)',
            lineHeight: 1.8,
          }}>
            {faq.a}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQs() {
  const navigate = useNavigate()

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Got Questions?</div>
        <h1 className="form-hero-title">FREQUENTLY ASKED QUESTIONS</h1>
        <br />
        <p className="form-hero-sub">Everything you Need to Know.</p>
      </div>

      <div className="form-container" style={{maxWidth: 760}}>

        {/* FAQ accordion */}
        <div style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '8px 32px',
          marginBottom: 40,
        }}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <br />

        {/* Still have questions CTA */}
        <div style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--red)',
          borderRadius: 12,
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 48,
        }}>
          <div>
            <div style={{fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 4}}>
              Still have Questions?
            </div>

            <br />
            
            <div style={{fontSize: 14, color: 'var(--muted)'}}>
              Our team is available Mon–Fri 10AM–6PM.
            </div>
          </div>

          <br /> <br /> <br /> <br />
          
          <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
            <a
              href="tel:8186666066"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--red)', color: '#fff',
                padding: '11px 22px', borderRadius: 10,
                fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600,
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px rgba(232,32,42,0.4)',
              }}
            >
              📞 (818) 666-6066
            </a>
            <button
              className="btn btn-outline"
              style={{padding: '11px 22px', fontSize: 14, minHeight: 'unset'}}
              onClick={() => navigate('/contact')}
            >
              Send a Message
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}