import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

function ImageCarousel({ images, make, model }) {
  const [idx, setIdx] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: '100%', background: 'var(--card)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 4,
      }}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--gold-light)', letterSpacing:'3px', textTransform:'uppercase'}}>{make}</div>
        <div style={{fontFamily:'Bebas Neue, sans-serif', fontSize:22, letterSpacing:'2px', color:'var(--white)'}}>{model}</div>
      </div>
    )
  }

  return (
    <div style={{position:'relative', width:'100%', height:'100%'}}>
      <img
        src={images[idx]}
        alt={`${make} ${model}`}
        style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length) }}
            style={{
              position:'absolute', left:8, top:'50%', transform:'translateY(-50%)',
              background:'rgba(0,0,0,0.6)', border:'none', color:'#fff',
              borderRadius:'50%', width:28, height:28, cursor:'pointer',
              fontSize:14, display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(4px)', WebkitTapHighlightColor:'transparent',
            }}
          >‹</button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length) }}
            style={{
              position:'absolute', right:8, top:'50%', transform:'translateY(-50%)',
              background:'rgba(0,0,0,0.6)', border:'none', color:'#fff',
              borderRadius:'50%', width:28, height:28, cursor:'pointer',
              fontSize:14, display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(4px)', WebkitTapHighlightColor:'transparent',
            }}
          >›</button>
          <div style={{position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', display:'flex', gap:5}}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                style={{
                  width: i === idx ? 16 : 6, height:6,
                  borderRadius:3, border:'none', cursor:'pointer',
                  background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                  padding:0, transition:'all 0.2s',
                  WebkitTapHighlightColor:'transparent',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function CarCard({ car, mobile }) {
  const used = car.type === 'used'
  const meta = car.meta ? car.meta.split(',').map(m => m.trim()) : []
  const imgHeight = mobile ? 200 : 180

  return (
    <div style={{
      background: 'var(--card2)',
      border: mobile ? 'none' : '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      borderRadius: mobile ? 0 : 16,
      overflow: 'hidden',
    }}>
      <div style={{height: imgHeight, position:'relative', overflow:'hidden'}}>
        <ImageCarousel images={car.images} make={car.make} model={car.model} />

        <div style={{
          position:'absolute', top:10, left:12, zIndex:2,
          background:'rgba(0,0,0,0.65)', backdropFilter:'blur(6px)',
          fontSize:10, fontWeight:700, letterSpacing:'1.5px',
          color:'var(--off-white)', padding:'3px 9px', borderRadius:20,
          textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.08)',
        }}>{car.label || car.year}</div>

        <div style={{
          position:'absolute', top:10, right:12, zIndex:2,
          background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)',
          fontSize:10, fontWeight:700, letterSpacing:'1.5px',
          color:'var(--gold-light)', padding:'3px 9px', borderRadius:20, textTransform:'uppercase',
        }}>{used ? 'Pre-Owned' : 'New'}</div>
      </div>

      <div style={{padding: mobile ? '16px 20px 20px' : '15px 18px 18px'}}>
        <div style={{fontSize:10, fontWeight:700, color:'var(--gold-light)', letterSpacing:'2.5px', textTransform:'uppercase'}}>
          {car.make}
        </div>
        <div style={{fontSize: mobile ? 21 : 18, fontWeight:700, margin:'4px 0 10px', color:'var(--white)', lineHeight:1.2}}>
          {car.model}
        </div>
        {used && car.mileage && (
          <div style={{fontSize:12, color:'var(--muted)', marginBottom:8}}>{car.mileage}</div>
        )}
        <div style={{display:'flex', alignItems:'baseline', gap:5}}>
          <span style={{fontSize:12, color:'var(--muted)'}}>from</span>
          <span style={{fontFamily:'Bebas Neue', fontSize: mobile ? 36 : 32, color:'var(--white)', lineHeight:1}}>
            ${car.price}
          </span>
          <span style={{fontSize:13, color:'var(--muted)'}}>/mo</span>
        </div>
        <div style={{display:'flex', gap:10, marginTop:10, paddingTop:10, borderTop:'1px solid var(--border)', flexWrap:'wrap'}}>
          {meta.map(m => (
            <span key={m} style={{fontSize:12, color:'var(--off-white)', display:'flex', alignItems:'center', gap:5}}>
              <span style={{width:4, height:4, borderRadius:'50%', background:'var(--gold-light)', display:'inline-block', flexShrink:0}} />
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
      <div style={{display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold-light)', marginBottom:10}}>
        <span style={{display:'block', width:20, height:2, background:'var(--gold-light)', borderRadius:2}} />
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
        <p className="form-hero-sub">Browse our New and Pre-Owned Lease Specials — Updated Daily.</p>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'48px 20px 80px'}}>
        {loading ? (
          <p style={{color:'var(--muted)', fontSize:14, textAlign:'center', padding:'40px 0'}}>Loading inventory...</p>
        ) : (
          <>
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
              <p style={{color:'var(--muted)', fontSize:14, textAlign:'center', padding:'40px 0'}}>
                No Inventory Available Right Now. Check Back Soon
              </p>
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