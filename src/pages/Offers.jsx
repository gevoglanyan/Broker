import { useNavigate } from 'react-router-dom'

const OFFER_HIGHLIGHTS = [
  { icon:'🚗', title:'New Vehicle Leases',     desc:'Brand new models from Toyota, BMW, Mercedes-Benz, Lexus, Audi, Hyundai and more — updated every month with the latest manufacturer incentives.' },
  { icon:'🏆', title:'Pre-Owned Lease Deals',  desc:'Certified pre-owned vehicles with low mileage and full inspection — a premium driving experience at a lower monthly rate.' },
  { icon:'⚡', title:'Electric & Hybrid',       desc:'Take advantage of federal tax credits and manufacturer rebates on EV and hybrid leases. We find every dollar you\'re entitled to.' },
  { icon:'💎', title:'Luxury & Exotic Deals',  desc:'Access to Porsche, Bentley, Rolls-Royce, Ferrari, and Lamborghini at broker pricing — not retail. Private deals available by request.' },
]

const TERMS = [
  'All special offers are based on approved, well-established credit history with a Tier-1+ credit approval.',
  'Consumers with insufficient credit history or lower FICO scores will qualify for different credit tiers which may affect the final payment and/or down payment.',
  'Prices are based on availability and may be limited on inventory.',
  'Some leases require a "lease conquest/loyalty" — contact us for more details.',
  'All advertised prices are per month plus tax, title, and applicable fees.',
  'Offers are subject to change without notice and cannot be combined with other promotions.',
  'Down payment or drive-off amount may be required at signing depending on credit tier.',
]

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

      <div className="form-container" style={{maxWidth:800}}>
        <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderLeft:'3px solid var(--gold)',borderRadius:12,padding:'24px 28px',marginBottom:32}}>
          <p style={{fontSize:15,color:'var(--off-white)',lineHeight:1.7}}>
            Our lease specials change every month based on manufacturer incentives and available inventory. For the most current deals, contact our team directly at{' '}
            <a href="tel:4424484848" style={{color:'var(--gold-light)',fontWeight:700,textDecoration:'none'}}>(442) 448-4848</a>
            {' '}or{' '}
            <a href="mailto:crystalautoleasing@gmail.com" style={{color:'var(--gold-light)',fontWeight:700,textDecoration:'none'}}>crystalautoleasing@gmail.com</a>.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:40}} className="offers-grid">
          {OFFER_HIGHLIGHTS.map(o => (
            <div key={o.title} style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,padding:24,transition:'border-color 0.2s'}}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
            >
              <div style={{fontSize:28,marginBottom:12}}>{o.icon}</div>
              <div style={{fontSize:15,fontWeight:700,color:'var(--white)',marginBottom:8}}>{o.title}</div>
              <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65}}>{o.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:14,padding:'28px 32px',marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--gold-light)',marginBottom:20,display:'flex',alignItems:'center',gap:8}}>
            <span style={{display:'block',width:16,height:2,background:'var(--gold-light)',borderRadius:2}} />
            How Our Monthly Offers Work
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[
              ['01', 'Browse or call us', 'Each month we source the best available lease deals from our dealer network across all major brands.'],
              ['02', 'We match you',      'Tell us what you\'re looking for — make, model, budget, term — and we find the best current offer for your situation.'],
              ['03', 'Lock in your rate', 'Once you\'re approved, we lock in your rate before incentives expire. Deals move fast — first come, first served.'],
              ['04', 'Drive away',        'We handle all the paperwork and delivery. You just show up and drive away in your new car.'],
            ].map(([num, title, desc]) => (
              <div key={num} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                <span style={{fontFamily:'Bebas Neue,sans-serif',fontSize:22,color:'var(--gold)',letterSpacing:1,flexShrink:0,lineHeight:1,marginTop:2}}>{num}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--white)',marginBottom:3}}>{title}</div>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'28px 32px',marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--gold-light)',marginBottom:20,display:'flex',alignItems:'center',gap:8}}>
            <span style={{display:'block',width:16,height:2,background:'var(--gold-light)',borderRadius:2}} />
            Important Terms & Conditions
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {TERMS.map((line, i) => (
              <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <span style={{width:4,height:4,borderRadius:'50%',background:'var(--gold-light)',flexShrink:0,marginTop:8,display:'block'}} />
                <p style={{fontSize:13,color:'var(--off-white)',lineHeight:1.7}}>{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:12,padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap',marginBottom:48}}>
          <div>
            <div style={{fontSize:15,fontWeight:600,color:'var(--white)',marginBottom:4}}>Ready to find your deal?</div>
            <div style={{fontSize:13,color:'var(--muted)'}}>Our advisors are available Mon–Fri 10AM–6PM.</div>
          </div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <a href="tel:4424484848" style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--gold)',color:'#000',padding:'11px 22px',borderRadius:10,fontFamily:'Outfit,sans-serif',fontSize:14,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>
              📞 (442) 448-4848
            </a>
            <button className="btn btn-outline" style={{padding:'11px 22px',fontSize:14,minHeight:'unset'}} onClick={() => navigate('/credit')}>
              Apply for Credit
            </button>
            <button className="btn btn-outline" style={{padding:'11px 22px',fontSize:14,minHeight:'unset'}} onClick={() => navigate('/contact')}>
              Send a Message
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width:600px) {
          .offers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}