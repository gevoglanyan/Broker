import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './Home.css'

const BRANDS = [
  'Toyota','Honda','BMW','Mercedes-Benz','Lexus','Audi','Hyundai','Kia',
  'Volkswagen','Subaru','Jeep','Acura','Infiniti','Cadillac','Chevrolet',
  'Ford','GMC','Dodge','Ram','Nissan','Mazda','Buick','Lincoln','Volvo',
  'Genesis','Porsche','Land Rover','Jaguar','Alfa Romeo','Maserati',
  'Ferrari','Lamborghini','Bentley','Rolls-Royce','McLaren','Aston Martin',
]

const FEATURES = [
  { icon:'⚡', title:'Fast Approvals',                desc:'Get pre-approved in minutes, not days. Our streamlined process means you\'re driving sooner.' },
  { icon:'🔍', title:'100% Transparent Pricing',      desc:'No hidden fees. No surprise markups. The price you see is the price you pay — period.' },
  { icon:'🤝', title:'Dedicated Lease Advisor',       desc:'You get a real person in your corner. Our advisors guide you from first inquiry to keys in hand.' },
  { icon:'🚗', title:'All Credit Situations Welcome', desc:'Excellent credit or rebuilding — we work with lenders across the spectrum to find you a deal.' },
]

const TESTIMONIALS = [
  { name:'Michael R.', location:'Burbank, CA', stars:5, text:'Crystal Auto Leasing got me into my dream car at a price I couldn\'t believe. The whole process took less than 48 hours. No pressure, no hidden fees — just a great deal.' },
  { name:'Sandra L.',  location:'Los Angeles, CA', stars:5, text:'I had no idea leasing could be this easy. My advisor walked me through everything step by step. I\'ll never go back to a traditional dealership again.' },
  { name:'David K.',   location:'Glendale, CA', stars:5, text:'They consistently beat every other quote I get. Trustworthy, fast, and genuinely care about getting you the best deal. I highly recommend them.' },
]

const YEAR = new Date().getFullYear()

export default function Home() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    supabase
      .from('inventory')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setFeatured(data || []))
  }, [])

  return (
    <div>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow fade-up">Premium Auto Leasing</div>
            <h1 className="hero-title fade-up-1">DRIVE<br /><span>YOUR</span><br />DREAM</h1>
            <p className="hero-subtitle fade-up-1">
              <br />
              <strong><span style={{color:'var(--gold)'}}>Crystal Auto Leasing</span></strong> is your trusted luxury auto broker in Los Angeles. We connect you with the best lease deals across all major brands — from everyday commuters to exotic supercars.
            </p>
            <br />
            <div className="hero-btns fade-up-2">
              <button className="btn btn-primary" onClick={() => navigate('/credit')}>Credit Application</button>
              <button className="btn btn-outline" onClick={() => navigate('/contact')}>Contact Us</button>
            </div>
          
            {/*
            
            <div className="hero-stats fade-up-3">
              <div>
                <div className="stat-num">500<span>+</span></div>
                <div className="stat-label">Vehicles Available</div>
              </div>
              <div>
                <div className="stat-num">12<span>K+</span></div>
                <div className="stat-label">Happy Customers</div>
              </div>
              
              <div>
                <div className="stat-num">10<span>+</span></div>
                <div className="stat-label">Years in Business</div>
              </div>
            </div>
            
            */}

          </div>

          <div className="hero-statement fade-up-1">
            <div className="hero-statement-inner">
              <div className="hero-statement-line">ANY</div>
              <div className="hero-statement-line accent">MAKE</div>
              <div className="hero-statement-line">ANY</div>
              <div className="hero-statement-line accent">MODEL</div>
              <p className="hero-statement-sub">We source any vehicle from our network of dealers and deliver it to you at the best possible price.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="brands-section">
        <div className="brands-inner">
          <div className="brands-label">Top Makes We Carry</div>
          <div className="brands-grid">
            {BRANDS.map(b => <div key={b} className="brand-pill">{b}</div>)}
          </div>
        </div>
      </div>

      {/*

      {featured.length > 0 && (
        <div className="inventory-strip">
          <div className="section-header">
            <div>
              <div className="section-label">Hot Deals</div>
              <div className="section-title">FEATURED LEASES</div>
            </div>
            <button className="btn btn-outline" style={{padding:'9px 20px',fontSize:13}} onClick={() => navigate('/inventory')}>
              View All
            </button>
          </div>
          <div className="cars-grid">
            {featured.map(car => {
              const meta     = car.meta ? car.meta.split(',').map(m => m.trim()) : []
              const hasImage = car.images && car.images.length > 0
              return (
                <div key={car.id} className="car-card" onClick={() => navigate('/inventory')} style={{cursor:'pointer'}}>
                  <div className="car-img-placeholder" style={{position:'relative', overflow:'hidden'}}>
                    {hasImage ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.make} ${car.model}`}
                        style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                      />
                    ) : (
                      <>
                        <div className="car-img-make">{car.make}</div>
                        <div className="car-img-model">{car.model}</div>
                      </>
                    )}
                    <div className="car-img-label">{car.label || car.year}</div>
                  </div>
                  <div className="car-info">
                    <div className="car-make">{car.make}</div>
                    <div className="car-model">{car.model}</div>
                    <div className="car-price-row">
                      <span className="price-from">from</span>
                      <span className="price-num">${car.price}</span>
                      <span className="price-mo">/mo</span>
                    </div>
                    <div className="car-meta">{meta.map(m => <span key={m}>{m}</span>)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      */}

      <section className="why-section">
        <div className="why-inner">
          <div className="section-label">Why Us</div>
          <div className="section-title">THE <strong><span style={{color:'var(--gold)'}}>CRYSTAL AUTO LEASING</span></strong> DIFFERENCE</div>
          <div className="why-grid">
            <div className="why-features">
              {FEATURES.map(f => (
                <div key={f.title} className="feature-item">
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/*

            <br />
            <div className="why-image">
              <div className="big-number">10</div>
              <br /> <br />
              <p className="why-quote">Over <strong>10 years</strong> putting customers in the driver's seat at prices they can feel good about.</p>
              <p className="why-attribution"><strong>CRYSTAL AUTO LEASING</strong> — Est. 2015</p>
            </div>
            
            */}

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{padding:'80px 0',background:'var(--black)',borderTop:'1px solid var(--border)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 48px'}} className="testimonials-inner">
          <div className="section-label" style={{marginBottom:8}}>What Clients Say</div>
          <div className="section-title" style={{marginBottom:48}}>REAL PEOPLE. REAL DEALS.</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}} className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:16,padding:'28px 24px',display:'flex',flexDirection:'column',gap:16,transition:'border-color 0.2s'}}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}
              >
                <div style={{display:'flex',gap:3}}>
                  {Array.from({length:t.stars}).map((_,i) => (
                    <span key={i} style={{color:'var(--gold)',fontSize:15}}>★</span>
                  ))}
                </div>
                <p style={{fontSize:14,color:'var(--off-white)',lineHeight:1.75,flex:1}}>"{t.text}"</p>
                <div style={{borderTop:'1px solid var(--border)',paddingTop:16}}>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--white)'}}>{t.name}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{t.location}</div>
                  <div style={{fontSize:12,color:'var(--gold-light)',marginTop:4,fontStyle:'italic'}}>{t.vehicle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'80px 0',background:'var(--dark)',borderTop:'1px solid var(--border)'}}>
        <div style={{maxWidth:700,margin:'0 auto',padding:'0 48px',textAlign:'center'}} className="cta-inner">
          <div style={{fontFamily:'Bebas Neue,sans-serif',fontSize:'clamp(36px,5vw,64px)',letterSpacing:2,lineHeight:1,marginBottom:20}}>
            READY TO DRIVE YOUR <span style={{color:'var(--gold)'}}>DREAM CAR?</span>
          </div>
          <p style={{fontSize:16,color:'var(--off-white)',lineHeight:1.7,maxWidth:500,margin:'0 auto 36px'}}>
            It starts with a simple application. No pressure, no obligation — just a real advisor working to get you the best possible deal.
          </p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary" style={{padding:'15px 36px',fontSize:16}} onClick={() => navigate('/credit')}>
              Apply for Credit
            </button>
            <button className="btn btn-outline" style={{padding:'15px 36px',fontSize:16}} onClick={() => navigate('/contact')}>
              Contact Us
            </button>
          </div>
          <p style={{fontSize:13,color:'var(--muted)',marginTop:20}}>
            Or call us at{' '}
            <a href="tel:4424484848" style={{color:'var(--gold-light)',textDecoration:'none',fontWeight:600}}>(442) 448-4848</a>
          </p>
        </div>
      </section>

      <br />

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <strong><span style={{color:'var(--gold)'}}>CRYSTAL AUTO LEASING</span></strong>
              </div>
              <p className="footer-tagline" style={{maxWidth:'100%'}}>
                Your trusted auto leasing partner. We make driving your dream car simple, affordable, and stress-free.
              </p>
              <p className="footer-tagline" style={{marginTop:10, maxWidth:'100%'}}>
                From everyday commuters to exotic supercars — we source any vehicle, new or pre-owned, and deliver the best deal straight to you.
              </p>
              <p className="footer-tagline" style={{marginTop:10, maxWidth:'100%'}}>
                No hidden fees. No runaround. Just real people who care.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')}>Home</button></li>

                {/* <li><button onClick={() => navigate('/inventory')}>Vehicle Inventory</button></li> */}

                <li><button onClick={() => navigate('/offers')}>Monthly Offers</button></li>
                <li><button onClick={() => navigate('/faqs')}>FAQs</button></li>
                <li><button onClick={() => navigate('/credit')}>Credit Application</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><button onClick={() => navigate('/about')}>About Us</button></li>
                <li><button onClick={() => navigate('/contact')}>Contact Us</button></li>
                <li><button onClick={() => navigate('/privacy')}>Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')}>Terms of Use</button></li>
                <br />
                <li><button onClick={() => navigate('/admin/login')}>Staff Portal</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><span>(442) 448-4848</span></li>
                <li><span>crystalautoleasing@gmail.com</span></li>
                <br />
                <li><span>1907 W Burbank Blvd Unit B</span></li>
                <li><span>Burbank, CA 91506</span></li>
                <br />
                <li><span>Mon – Fri: 10 AM – 6 PM</span></li>
                <li><span>Sat & Sun: Appointment Only</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© {YEAR} Crystal Auto Leasing. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}