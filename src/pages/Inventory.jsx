import { useNavigate } from 'react-router-dom'

const CARS = [
  { make:'Toyota',  model:'Camry XSE',     price:'$329', label:'2025',   meta:['36 mo','10K mi','$0 down'],     bg:'linear-gradient(145deg,#0d1220,#080a14)', hl:'#2563eb' },
  { make:'BMW',     model:'3 Series 330i', price:'$489', label:'2025',   meta:['36 mo','10K mi','$2,999 DAS'],  bg:'linear-gradient(145deg,#141420,#0a0a14)', hl:'#d1d5db' },
  { make:'Hyundai', model:'IONIQ 6 SE',    price:'$279', label:'EV',     meta:['36 mo','12K mi','Tax credit'],  bg:'linear-gradient(145deg,#0d1a18,#080e0e)', hl:'#34d399' },
  { make:'Lexus',   model:'ES 350',        price:'$549', label:'Luxury', meta:['36 mo','10K mi','$3,500 DAS'],  bg:'linear-gradient(145deg,#1a1510,#0e0c08)', hl:'#fbbf24' },
  { make:'Audi',    model:'A4 Premium',    price:'$519', label:'2025',   meta:['36 mo','10K mi','$2,500 DAS'],  bg:'linear-gradient(145deg,#10101a,#080810)', hl:'#a78bfa' },
  { make:'Honda',   model:'CR-V Sport',    price:'$359', label:'SUV',    meta:['36 mo','12K mi','$1,999 DAS'],  bg:'linear-gradient(145deg,#0d1810,#080e08)', hl:'#4ade80' },
]

function CarSVG({ hl }) {
  return (
    <svg viewBox="0 0 300 140" width="80%" fill="none">
      <ellipse cx="150" cy="122" rx="100" ry="8" fill="#000" opacity="0.45"/>
      <rect x="30" y="85" width="240" height="30" rx="7" fill="#1a1d28"/>
      <path d="M80 85 C88 60 108 45 150 43 C192 45 212 60 220 85Z" fill="#20243a"/>
      <path d="M93 84 C96 65 109 54 130 52L130 84Z" fill="#1a3a5c" opacity="0.8"/>
      <path d="M135 52C165 52 175 61 180 84L135 84Z" fill="#1a3a5c" opacity="0.8"/>
      <rect x="34" y="91" width="26" height="11" rx="3" fill={hl} opacity="0.9"/>
      <rect x="240" y="91" width="26" height="11" rx="3" fill={hl} opacity="0.9"/>
      <circle cx="85" cy="114" r="19" fill="#0d0f14" stroke="#2a2d38" strokeWidth="1.5"/>
      <circle cx="85" cy="114" r="12" fill="#161820" stroke="#333"/>
      <circle cx="85" cy="114" r="5" fill={hl} opacity="0.7"/>
      <circle cx="215" cy="114" r="19" fill="#0d0f14" stroke="#2a2d38" strokeWidth="1.5"/>
      <circle cx="215" cy="114" r="12" fill="#161820" stroke="#333"/>
      <circle cx="215" cy="114" r="5" fill={hl} opacity="0.7"/>
      <rect x="34" y="84" width="232" height="2" rx="1" fill={hl} opacity="0.5"/>
    </svg>
  )
}

export default function Inventory() {
  const navigate = useNavigate()

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Available Now</div>
        <h1 className="form-hero-title">OUR INVENTORY</h1>

        <br />

        <p className="form-hero-sub">Browse our Current Lease Specials — Updated Daily.</p>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'40px 20px 80px'}}>
        <div className="inv-grid-desktop">
          {CARS.map(car => <CarCard key={car.model} car={car} />)}
        </div>

        <div className="inv-stack-mobile">
          {CARS.map(car => <CarCard key={car.model} car={car} mobile />)}
        </div>

        <div style={{textAlign:'center', marginTop:48, paddingTop:40, borderTop:'1px solid var(--border)'}}>
          <p style={{color:'var(--muted)', fontSize:14, marginBottom:20, lineHeight:1.6}}>
            Don't see what you're looking for?<br/>We can source any make or model.
          </p>

          <br /> <br />
          
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Contact Us for Custom Requests
          </button>
        </div>
      </div>

      <style>{`
        .inv-grid-desktop {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .inv-stack-mobile { display: none; }

        @media (max-width: 768px) {
          .inv-grid-desktop { display: none; }
          .inv-stack-mobile {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  )
}

function CarCard({ car, mobile }) {
  return (
    <div style={{
      background: 'var(--card2)',
      border: mobile ? 'none' : '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      borderRadius: mobile ? 0 : 16,
      overflow: 'hidden',
    }}>
      <div style={{
        height: mobile ? 220 : 170,
        background: car.bg || 'linear-gradient(145deg,#101420,#080a14)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <CarSVG hl={car.hl} />
        <div style={{
          position:'absolute', top:14, left:14,
          background:'rgba(0,0,0,0.65)',
          backdropFilter:'blur(6px)',
          fontSize:10, fontWeight:700, letterSpacing:'1.5px',
          color:'var(--off-white)', padding:'4px 10px',
          borderRadius:20, textTransform:'uppercase',
          border:'1px solid rgba(255,255,255,0.08)',
        }}>{car.label}</div>
      </div>

      <div style={{padding: mobile ? '20px 20px 24px' : '18px 20px 20px'}}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--blue-light)', letterSpacing:'2.5px', textTransform:'uppercase'}}>
          {car.make}
        </div>
        <div style={{fontSize: mobile ? 24 : 20, fontWeight:700, margin:'5px 0 14px', color:'var(--white)'}}>
          {car.model}
        </div>
        <div style={{display:'flex', alignItems:'baseline', gap:5}}>
          <span style={{fontSize:12, color:'var(--muted)'}}>from</span>
          <span style={{fontFamily:'Bebas Neue', fontSize: mobile ? 40 : 34, color:'var(--white)', lineHeight:1}}>
            {car.price}
          </span>
          <span style={{fontSize:13, color:'var(--muted)'}}>/mo</span>
        </div>
        <div style={{display:'flex', gap:10, marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)', flexWrap:'wrap'}}>
          {car.meta.map(m => (
            <span key={m} style={{fontSize:13, color:'var(--off-white)', display:'flex', alignItems:'center', gap:5}}>
              <span style={{width:4, height:4, borderRadius:'50%', background:'var(--blue-light)', display:'inline-block', flexShrink:0}} />
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}