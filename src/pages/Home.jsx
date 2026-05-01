import { useNavigate } from 'react-router-dom'
import './Home.css'

const BRANDS = ['Toyota','Honda','BMW','Mercedes-Benz','Lexus','Audi','Hyundai','Kia','Volkswagen','Subaru','Jeep','Acura','Infiniti','Cadillac']

const FEATURED = [
  { make:'Toyota',  model:'Camry XSE',     price:'$329', label:'2025',    meta:['36 months','10K mi/yr','$0 down'] },
  { make:'BMW',     model:'3 Series 330i', price:'$489', label:'2025',    meta:['36 months','10K mi/yr','$2,999 DAS'] },
  { make:'Hyundai', model:'IONIQ 6 SE',    price:'$279', label:'2025 EV', meta:['36 months','12K mi/yr','Tax credit eligible'] },
]

const FEATURES = [
  { icon:'⚡', title:'Fast Approvals',               desc:'Get pre-approved in minutes, not days. Our streamlined process means you\'re driving sooner.' },
  { icon:'🔍', title:'100% Transparent Pricing',     desc:'No hidden fees. No surprise markups. The price you see is the price you pay — period.' },
  { icon:'🤝', title:'Dedicated Lease Advisor',      desc:'You get a real person in your corner. Our advisors guide you from first inquiry to keys in hand.' },
  { icon:'🚗', title:'All Credit Situations Welcome', desc:'Excellent credit or rebuilding — we work with lenders across the spectrum to find you a deal.' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow fade-up">Premium Auto Leasing</div>
            <h1 className="hero-title fade-up-1">DRIVE<br /><span>YOUR</span><br />DREAM</h1>
            <p className="hero-subtitle fade-up-1">ELIT Los Angeles connects you with the best lease deals across all major brands — transparent pricing, fast approvals, and white-glove service from start to finish.</p>
            <div className="hero-btns fade-up-2">
              <button className="btn btn-primary" onClick={() => navigate('/inventory')}>Browse Inventory ›</button>
              <button className="btn btn-outline" onClick={() => navigate('/credit')}>Apply for Credit</button>
            </div>
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
                <div className="stat-num">15<span>+</span></div>
                <div className="stat-label">Years in Business</div>
              </div>
            </div>
          </div>

          {/* Hero right side — text-based statement instead of car image */}
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

      {/* ── BRANDS ── */}
      <div className="brands-section">
        <div className="brands-inner">
          <div className="brands-label">Top Makes We Carry</div>
          <div className="brands-grid">
            {BRANDS.map(b => <div key={b} className="brand-pill">{b}</div>)}
          </div>
        </div>
      </div>

      {/* ── FEATURED ── */}
      <div className="inventory-strip">
        <div className="section-header">
          <div>
            <div className="section-label">Hot Deals</div>
            <div className="section-title">FEATURED LEASES</div>
          </div>
          <button className="btn btn-outline" style={{padding:'9px 20px',fontSize:13}} onClick={() => navigate('/inventory')}>View All →</button>
        </div>
        <div className="cars-grid">
          {FEATURED.map(car => (
            <div key={car.model} className="car-card">
              <div className="car-img-placeholder">
                <div className="car-img-make">{car.make}</div>
                <div className="car-img-model">{car.model}</div>
                <div className="car-img-label">{car.label}</div>
              </div>
              <div className="car-info">
                <div className="car-make">{car.make}</div>
                <div className="car-model">{car.model}</div>
                <div className="car-price-row">
                  <span className="price-from">from</span>
                  <span className="price-num">{car.price}</span>
                  <span className="price-mo">/mo</span>
                </div>
                <div className="car-meta">{car.meta.map(m => <span key={m}>{m}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY US ── */}
      <section className="why-section">
        <div className="why-inner">
          <div className="section-label">Why Us</div>
          <div className="section-title">THE ELIT LOS ANGELES DIFFERENCE</div>
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
            <div className="why-image">
              <div className="big-number">10</div>
              <p className="why-quote">Over <strong>10 years</strong> putting customers in the driver's seat at prices they can feel good about.</p>
              <p className="why-attribution">ELIT Los Angeles — Est. [2015]</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">ELIT Los Angeles</div>
              <p className="footer-tagline">Your trusted auto leasing partner.</p>
              <br/>
              <p className="footer-tagline">We make driving your dream car simple, affordable, and stress-free.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')}>Home</button></li>
                <li><button onClick={() => navigate('/inventory')}>Inventory</button></li>
                <li><button onClick={() => navigate('/faqs')}>FAQs</button></li>
                <li><button onClick={() => navigate('/offers')}>Monthly Offers</button></li>
                <li><button onClick={() => navigate('/credit')}>Credit Application</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><button onClick={() => navigate('/about')}>About Us</button></li>
                <li><button onClick={() => navigate('/contact')}>Contact Us</button></li>
                <li><button onClick={() => navigate('/admin/login')}>Staff Login</button></li>
                <li><button onClick={() => navigate('/privacy')}>Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')}>Terms of Use</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><span>(818) 666-6066</span></li>
                <li><span>info@elitla.com</span></li>
                <br/> 
                <li><span>14310 Victory Blvd,</span></li>
                <li><span>Los Angeles, CA 91401</span></li>
                <br/> 
                <li><span>Mon–Fri: 10AM–6PM</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 ELIT Los Angeles. All Rights Reserved.</p>
            <p className="footer-copy">Privacy Policy · Terms of Use</p>
          </div>
        </div>
      </footer>

    </div>
  )
}