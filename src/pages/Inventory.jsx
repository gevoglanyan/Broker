import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

function CarCard({ car, mobile }) {
  const used = car.type === 'used'
  const meta = car.meta ? car.meta.split(',').map(m => m.trim()) : []

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
        <div style={{fontSize:10, fontWeight:700, color:'var(--red-light)', letterSpacing:'3px', textTransform:'uppercase'}}>{car.make}</div>
        <div style={{fontFamily:'Bebas Neue, sans-serif', fontSize: mobile ? 26 : 22, letterSpacing:'2px', color:'var(--white)'}}>{car.model}</div>
        {used && car.mileage && <div style={{fontSize:11, color:'var(--muted)', marginTop:2}}>{car.mileage}</div>}

        <div style={{position:'absolute', top:10, left:12, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)', fontSize:10, fontWeight:700, letterSpacing:'1.5px', color:'var(--off-white)', padding:'3px 9px', borderRadius:20, textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.08)'}}>
          {car.label || car.year}
        </div>
        <div style={{position:'absolute', top:10, right:12, background:'rgba(232,32,42,0.12)', border:'1px solid rgba(232,32,42,0.25)', fontSize:10, fontWeight:700, letterSpacing:'1.5px', color:'var(--red-light)', padding:'3px 9px', borderRadius:20, textTransform:'uppercase'}}>
          {used ? 'Pre-Owned' : 'New'}
        </div>
      </div>

      <div style={{padding: mobile ? '16px 20px 20px' : '15px 18px 18px'}}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--red-light)', letterSpacing:'2.5px', textTransform:'uppercase'}}>{car.make}</div>
        <div style={{fontSize: mobile ? 21 : 18, fontWeight:700, margin:'4px 0 10px', color:'var(--white)', lineHeight:1.2}}>{car.model}</div>
        <div style={{display:'flex', alignItems:'baseline', gap:5}}>
          <span style={{fontSize:12, color:'var(--muted)'}}>from</span>
          <span style={{fontFamily:'Bebas Neue', fontSize: mobile ? 36 : 32, color:'var(--white)', lineHeight:1}}>${car.price}</span>
          <span style={{fontSize:13, color:'var(--muted)'}}>/mo</span>
        </div>
        <div style={{display:'flex', gap:10, marginTop:10, paddingTop:10, borderTop:'1px solid var(--border)', flexWrap:'wrap'}}>
          {meta.map(m => (
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
      <div style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--red-light)', marginBottom:10}}>
        <span style={{display:'block', width:20, height:2, background:'var(--red-light)', borderRadius:2}} />
        {eyebrow}
      </div>
      <div style={{fontFamily:'Bebas Neue, sans-serif', fontSize:36, letterSpacing:2, color:'var(--white)'}}>{title}</div>
    </div>
  )
}

export default function Inventory() {
  const navigate = useNavigate()
  const [newCars,  setNewCars]  = useState([])
  const [usedCars, setUsedCars] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    supabase
      .from('inventory')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        const all = data || []
        setNewCars(all.filter(v => v.type === 'new'))
        setUsedCars(all.filter(v => v.type === 'used'))
        setLoading(false)
      })
  }, [])

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Available Now</div>
        <h1 className="form-hero-title">OUR INVENTORY</h1>
        <br/>
        <p className="form-hero-sub">Browse our New and Pre-Owned Lease Specials — Updated Daily</p>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'48px 20px 80px'}}>
        {loading ? (
          <p style={{color:'var(--muted)', fontSize:14, textAlign:'center', padding:'40px 0'}}>Loading inventory...</p>
        ) : (
          <>
            {/* New Vehicles */}
            {newCars.length > 0 && (
              <>
                <SectionHeader eyebrow="Brand New" title="NEW VEHICLES" />
                <div className="inv-grid-desktop" style={{marginBottom:64}}>
                  {newCars.map(car => <CarCard key={car.id} car={car} />)}
                </div>
                <div className="inv-stack-mobile" style={{marginBottom:48}}>
                  {newCars.map(car => <CarCard key={car.id} car={car} mobile />)}
                </div>
              </>
            )}

            {/* Pre-Owned */}
            {usedCars.length > 0 && (
              <>
                <SectionHeader eyebrow="Pre-Owned" title="PRE-OWNED VEHICLES" />
                <div className="inv-grid-desktop">
                  {usedCars.map(car => <CarCard key={car.id} car={car} />)}
                </div>
                <div className="inv-stack-mobile">
                  {usedCars.map(car => <CarCard key={car.id} car={car} mobile />)}
                </div>
              </>
            )}

            {newCars.length === 0 && usedCars.length === 0 && (
              <p style={{color:'var(--muted)', fontSize:14, textAlign:'center', padding:'40px 0'}}>No inventory available right now. Check back soon.</p>
            )}
          </>
        )}

        <div style={{textAlign:'center', marginTop:56, paddingTop:40, borderTop:'1px solid var(--border)'}}>
          <p style={{color:'var(--muted)', fontSize:14, marginBottom:20, lineHeight:1.6}}>
            Don't see what you're looking for?<br/>We can source any make or model — New or Pre-Owned.
          </p>
          <br/>
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