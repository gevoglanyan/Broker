import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FAQS = [
  {
    q: 'What is an auto broker and how is Crystal Auto Leasing different from a dealership?',
    a: 'An auto broker works for you — not the manufacturer or dealer. At Crystal Auto Leasing, we shop our entire dealer network to find you the best price on any make or model. Unlike dealerships, we have no inventory to push and no quotas to hit. Our only goal is to get you the best possible deal.',
  },
  {
    q: 'What are the advantages to leasing?',
    a: 'Leasing gives you access to a brand new car with lower monthly payments compared to financing. You can choose to put no money down (resulting in a higher payment) or put money down to lower your monthly cost. At the end of the lease, you simply return the car and move into something new — no trade-in hassles, no worrying about depreciation.',
  },
  {
    q: 'Who owns the car when I lease?',
    a: 'The lienholder (typically the bank or finance company) owns the vehicle during the lease term. At the end of your lease, you have three options: return the car and walk away, lease a brand-new vehicle, or purchase the car at its predetermined residual value plus applicable taxes and fees.',
  },
  {
    q: 'What does 7.5k, 10k, or 12k miles per year mean?',
    a: 'Lease agreements include an annual mileage limit — typically 7,500, 10,000, or 12,000 miles per year. Going over this limit results in a per-mile overage fee at the end of the lease. We will walk you through which mileage package makes the most sense for your driving habits before you sign anything.',
  },
  {
    q: 'Do you charge a broker fee?',
    a: 'No. We do not charge a broker fee on top of your deal. The price you agree to is the price you pay. Our compensation comes from the dealer, not from you.',
  },
  {
    q: 'What credit score do I need to lease a car?',
    a: 'Most Tier-1 lease offers require a 700+ FICO score. However, we work with lenders across all credit tiers. If your score is lower, we can explore options including co-signers, larger down payments, or used vehicle leases that have more flexible approval criteria. We welcome all credit situations.',
  },
  {
    q: 'I have limited credit history but I have a job — can I still get approved?',
    a: 'Yes, in many cases. If you are employed with verifiable income, we can often get you approved — sometimes with a co-signer or a slightly higher down payment. A co-signer with good credit can significantly improve your approval odds and your rate. Consistent on-time payments will also help build your credit over the lease term.',
  },
  {
    q: 'What does it mean to be a co-signer?',
    a: 'A co-signer is equally responsible for the lease payments. If the primary driver misses a payment, it affects both the primary and co-signer\'s credit. Only co-sign for someone you personally trust to make on-time payments. We will fully explain co-signer responsibilities before any paperwork is signed.',
  },
  {
    q: 'Can I lease a car if I am self-employed or retired?',
    a: 'Yes. Self-employed applicants will typically need to provide recent tax returns or bank statements as proof of income. If you are retired and receiving Social Security, pension, or investment income, note this on your credit application — most lenders will count it toward your qualifying income.',
  },
  {
    q: 'What happens at the end of my lease?',
    a: 'You have three options: (1) Return the vehicle and walk away with no further obligation beyond any excess mileage or wear-and-tear charges. (2) Lease or purchase a new vehicle — we make this process seamless. (3) Purchase your current leased vehicle at its residual value. We will contact you 3–4 months before your lease ends to help you plan.',
  },
  {
    q: 'Can I lease any make or model — including exotic or luxury cars?',
    a: 'Yes. We have access to virtually every make and model through our dealer network — from everyday brands like Toyota and Honda to exotic manufacturers like Ferrari, Lamborghini, Bentley, and Rolls-Royce. If you can dream it, we can source it.',
  },
  {
    q: 'How long does the process take?',
    a: 'From application to driving away, the process typically takes 24–72 hours for standard approvals. Exotic or specialty vehicles may take slightly longer depending on availability. We move fast and keep you updated every step of the way.',
  },
  {
    q: 'Is my personal information secure?',
    a: 'Yes. All personal and financial information submitted through our website is encrypted using AES-256 encryption before it is stored. Your SSN is never stored in plain text. We do not sell or share your personal information with third parties outside of the lenders and dealers necessary to process your application.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{borderBottom:'1px solid var(--border)',overflow:'hidden'}}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', background:'none', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          gap:20, padding:'22px 0', textAlign:'left',
          fontFamily:'Outfit, sans-serif', WebkitTapHighlightColor:'transparent',
        }}
      >
        <div style={{display:'flex',alignItems:'flex-start',gap:16}}>
          <span style={{fontSize:11,fontWeight:700,color:'var(--gold-light)',letterSpacing:1,fontFamily:'Bebas Neue, sans-serif',minWidth:24,paddingTop:2}}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{fontSize:16,fontWeight:600,color:open?'var(--white)':'var(--off-white)',lineHeight:1.5,transition:'color 0.2s'}}>
            {faq.q}
          </span>
        </div>
        <span style={{fontSize:20,color:open?'var(--gold-light)':'var(--muted)',flexShrink:0,transition:'transform 0.25s ease, color 0.2s',transform:open?'rotate(45deg)':'rotate(0deg)',display:'block',lineHeight:1}}>
          +
        </span>
      </button>

      {open && (
        <div style={{paddingLeft:40,paddingBottom:24,paddingRight:8}}>
          <p style={{fontSize:15,color:'var(--off-white)',lineHeight:1.8}}>{faq.a}</p>
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
        <p className="form-hero-sub">Everything You Need to Know About Leasing with Crystal Auto</p>
      </div>

      <div className="form-container" style={{maxWidth:760}}>
        <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:16,padding:'8px 32px',marginBottom:40}}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderLeft:'3px solid var(--gold)',borderRadius:12,padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap',marginBottom:48}}>
          <div>
            <div style={{fontSize:16,fontWeight:600,color:'var(--white)',marginBottom:8}}>Still have questions?</div>
            <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.6}}>
              Our advisors are available Mon–Fri 10AM–6PM.<br />
              Sat & Sun by appointment.
            </div>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="tel:4424484848" style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--gold)',color:'#000',padding:'11px 22px',borderRadius:10,fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>
              📞 (442) 448-4848
            </a>
            <button className="btn btn-outline" style={{padding:'11px 22px',fontSize:14,minHeight:'unset'}} onClick={() => navigate('/contact')}>
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}