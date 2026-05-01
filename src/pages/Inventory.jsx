import { useNavigate } from 'react-router-dom'

const NEW_CARS = [
  { make:'Toyota',  model:'Camry XSE',     price:'$329', label:'2025',    meta:['36 mo','10K mi','$0 down'] },
  { make:'BMW',     model:'3 Series 330i', price:'$489', label:'2025',    meta:['36 mo','10K mi','$2,999 DAS'] },
  { make:'Hyundai', model:'IONIQ 6 SE',    price:'$279', label:'2025 EV', meta:['36 mo','12K mi','Tax credit'] },
  { make:'Lexus',   model:'ES 350',        price:'$549', label:'2025',    meta:['36 mo','10K mi','$3,500 DAS'] },
  { make:'Audi',    model:'A4 Premium',    price:'$519', label:'2025',    meta:['36 mo','10K mi','$2,500 DAS'] },
  { make:'Honda',   model:'CR-V Sport',    price:'$359', label:'2025',    meta:['36 mo','12K mi','$1,999 DAS'] },
]

const USED_CARS = [
  { make:'Toyota',  model:'Camry SE',       price:'$289', label:'2022', mileage:'18,400 mi', meta:['48 mo','15K mi/yr','$1,500 down'] },
  { make:'Honda',   model:'Accord Sport',   price:'$259', label:'2021', mileage:'24,100 mi', meta:['48 mo','15K mi/yr','$2,000 down'] },
  { make:'BMW',     model:'3 Series 330i',  price:'$379', label:'2022', mileage:'21,800 mi', meta:['48 mo','12K mi/yr','$2,500 down'] },
  { make:'Lexus',   model:'RX 350',         price:'$449', label:'2021', mileage:'19,600 mi', meta:['48 mo','12K mi/yr','$3,000 down'] },
  { make:'Audi',    model:'A3 Premium',     price:'$319', label:'2022', mileage:'16,200 mi', meta:['48 mo','12K mi/yr','$2,000 down'] },
  { make:'Hyundai', model:'Tucson SEL',     price:'$249', label:'2023', mileage:'11,900 mi', meta:['48 mo','15K mi/yr','$1,000 down'] },
]

function CarCard({ car, mobile, used }) {
  return (
    <div style={{
      background: 'var(--card2)',
      border: mobile ? 'none' : '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      borderRadius: mobile ? 0 : 16,
      overflow: 'hidden',
    }}>
      <div style={{
        height: mobile ? 110 : 130,
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', gap: 4,
      }}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--red-light)', letterSpacing:'3px', textTransform:'uppercase'}}>
          {car.make}
        </div>
        <div style={{fontFamily:'Bebas Neue, sans-serif', fontSize: mobile ? 26 : 22, letterSpacing:'2px', color:'var(--white)'}}>
          {car.model}
        </div>
        {used && car.mileage && (
          <div style={{fontSize:11, color:'var(--muted)', marginTop:2}}>{car.mileage}</div>
        )}

        {/* Year badge */}
        <div style={{
          position:'absolute', top:10, left:12,
          background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)',
          fontSize:10, fontWeight:700, letterSpacing:'1.5px',
          color:'var(--off-white)', padding:'3px 9px', borderRadius:20,
          textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.08)',
        }}>{car.label}</div>

        {/* New badge */}
        {!used && (
          <div style={{
            position:'absolute', top:10, right:12,
            background:'rgba(232,32,42,0.12)', border:'1px solid rgba(232,32,42,0.25)',
            fontSize:10, fontWeight:700, letterSpacing:'1.5px',
            color:'var(--red-light)', padding:'3px 9px', borderRadius:20, textTransform:'uppercase',
          }}>New</div>
        )}

        {/* Pre-owned badge */}
        {used && (
          <div style={{
            position:'absolute', top:10, right:12,
            background:'rgba(232,32,42,0.12)', border:'1px solid rgba(232,32,42,0.25)',
            fontSize:10, fontWeight:700, letterSpacing:'1.5px',
            color:'var(--red-light)', padding:'3px 9px', borderRadius:20, textTransform:'uppercase',
          }}>Pre-Owned</div>
        )}
      </div>

      {/* Info */}
      <div style={{padding: mobile ? '16px 20px 20px' : '15px 18px 18px'}}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--red-light)', letterSpacing:'2.5px', textTransform:'uppercase'}}>
          {car.make}
        </div>
        <div style={{fontSize: mobile ? 21 : 18, fontWeight:700, margin:'4px 0 10px', color:'var(--white)', lineHeight:1.2}}>
          {car.model}
        </div>
        <div style={{display:'flex', alignItems:'baseline', gap:5}}>
          <span style={{fontSize:12, color:'var(--muted)'}}>from</span>
          <span style={{fontFamily:'Bebas Neue', fontSize: mobile ? 36 : 32, color:'var(--white)', lineHeight:1}}>{car.price}</span>
          <span style={{fontSize:13, color:'var(--muted)'}}>/mo</span>
        </div>
        <div style={{display:'flex', gap:10, marginTop:10, paddingTop:10, borderTop:'1px solid var(--border)', flexWrap:'wrap'}}>
          {car.meta.map(m => (
            <span key={m} style={{fontSize:12, color:'var(--off-white)', display:'flex', alignItems:'center', gap:5}}>
              <span style={{width:4, height:4, borderRadius:'50%', background:'var(--red-light)', display:'inline-block', flexShrink:0}} />
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{marginBottom:28}}>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:8,
        fontSize:11, fontWeight:700, letterSpacing:'3px',
        textTransform:'uppercase', color:'var(--red-light)', marginBottom:10,
      }}>
        <span style={{display:'block', width:20, height:2, background:'var(--red-light)', borderRadius:2}} />
        {eyebrow}
      </div>
      <div style={{fontFamily:'Bebas Neue, sans-serif', fontSize:36, letterSpacing:2, color:'var(--white)'}}>
        {title}
      </div>
    </div>
  )
}

export default function Inventory() {
  const navigate = useNavigate()

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Available Now</div>
        <h1 className="form-hero-title">OUR INVENTORY</h1>
        <br/>
        <p className="form-hero-sub">Browse our New and Pre-Owned Lease Specials — Updated Daily.</p>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'48px 20px 80px'}}>

        {/* ── NEW VEHICLES ── */}
        <SectionHeader eyebrow="Brand New" title="NEW VEHICLES" />

        <div className="inv-grid-desktop" style={{marginBottom:64}}>
          {NEW_CARS.map(car => <CarCard key={car.make + car.model} car={car} />)}
        </div>
        <div className="inv-stack-mobile" style={{marginBottom:48}}>
          {NEW_CARS.map(car => <CarCard key={car.make + car.model} car={car} mobile />)}
        </div>

        <br/> <br/> <br/> <br/>

        {/* ── PRE-OWNED VEHICLES ── */}
        <SectionHeader eyebrow="Pre-Owned" title="PRE-OWNED VEHICLES" />

        <div className="inv-grid-desktop">
          {USED_CARS.map(car => <CarCard key={car.make + car.model} car={car} used />)}
        </div>
        <div className="inv-stack-mobile">
          {USED_CARS.map(car => <CarCard key={car.make + car.model} car={car} mobile used />)}
        </div>

        {/* ── CTA ── */}
        <div style={{textAlign:'center', marginTop:56, paddingTop:40, borderTop:'1px solid var(--border)'}}>
          <p style={{color:'var(--muted)', fontSize:14, marginBottom:20, lineHeight:1.6}}>
            Don't see what you're looking for?<br/>We can source any make or model — New or Pre-Owned.
          </p>
          <br />
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Contact Us for Custom Requests
          </button>
        </div>
      </div>

      <style>{`
        .inv-grid-desktop { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .inv-stack-mobile { display: none; }

        @media (max-width: 768px) {
          .inv-grid-desktop { display: none; }
          .inv-stack-mobile { display: flex; flex-direction: column; gap: 0; }
        }
      `}</style>
    </div>
  )
}