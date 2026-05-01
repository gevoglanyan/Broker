import { useNavigate } from 'react-router-dom'
import './Home.css'

const BRANDS = [
  'Toyota','Honda','Ford','Chevrolet','Nissan','BMW','Mercedes-Benz','Lexus','Audi',
  'Hyundai','Kia','Volkswagen','Subaru','Jeep','Acura','Infiniti','Cadillac',
  'GMC','Ram','Dodge','Chrysler','Mazda','Mitsubishi','Buick','Lincoln',
  'Volvo','Porsche','Jaguar','Land Rover','Mini','Alfa Romeo','Genesis',
  'Tesla','Rivian','Lucid','Polestar','Fisker'
]

const FEATURED = [
  { make:'Toyota', model:'Camry XSE',     price:'$329', label:'2025',    meta:['36 months','10K mi/yr','$0 down'],            bg:'linear-gradient(145deg,#0d1220,#080a14)', headlight:'#2563eb' },
  { make:'BMW',    model:'3 Series 330i', price:'$489', label:'2025',    meta:['36 months','10K mi/yr','$2,999 DAS'],         bg:'linear-gradient(145deg,#141420,#0a0a14)', headlight:'#c0c0d0' },
  { make:'Hyundai',model:'IONIQ 6 SE',   price:'$279', label:'2025 EV', meta:['36 months','12K mi/yr','Tax credit eligible'], bg:'linear-gradient(145deg,#0d1a18,#080e0e)', headlight:'#34d399' },
]

const FEATURES = [
  { icon:'⚡', title:'Fast Approvals',               desc:'Get pre-approved in minutes, not days. Our streamlined process means you\'re driving sooner.' },
  { icon:'🔍', title:'100% Transparent Pricing',     desc:'No hidden fees. No surprise markups. The price you see is the price you pay — period.' },
  { icon:'🤝', title:'Dedicated Lease Advisor',      desc:'You get a real person in your corner. Our advisors guide you from first inquiry to keys in hand.' },
  { icon:'🚗', title:'All Credit Situations Welcome', desc:'Excellent credit or rebuilding — we work with lenders across the spectrum to find you a deal.' },
]

function CarSVG({ headlight }) {
  return (
    <svg viewBox="0 0 300 140" width="86%" fill="none">
      <ellipse cx="150" cy="122" rx="105" ry="9" fill="#000" opacity="0.5"/>
      <rect x="30" y="85" width="240" height="30" rx="7" fill="#1a1d28"/>
      <path d="M80 85 C88 60 108 45 150 43 C192 45 212 60 220 85Z" fill="#20243a"/>
      <path d="M93 84 C96 65 109 54 130 52L130 84Z" fill="#1a3a5c" opacity="0.8"/>
      <path d="M135 52C165 52 175 61 180 84L135 84Z" fill="#1a3a5c" opacity="0.8"/>
      <rect x="132" y="53" width="2" height="31" rx="1" fill="#080a10"/>
      <rect x="34" y="91" width="26" height="11" rx="3" fill={headlight} opacity="0.9"/>
      <rect x="240" y="91" width="26" height="11" rx="3" fill={headlight} opacity="0.9"/>
      <circle cx="85" cy="114" r="19" fill="#0d0f14" stroke="#2a2d38" strokeWidth="1.5"/>
      <circle cx="85" cy="114" r="12" fill="#161820" stroke="#333"/>
      <circle cx="85" cy="114" r="5" fill={headlight} opacity="0.7"/>
      <circle cx="215" cy="114" r="19" fill="#0d0f14" stroke="#2a2d38" strokeWidth="1.5"/>
      <circle cx="215" cy="114" r="12" fill="#161820" stroke="#333"/>
      <circle cx="215" cy="114" r="5" fill={headlight} opacity="0.7"/>
      <rect x="34" y="84" width="232" height="2" rx="1" fill={headlight} opacity="0.5"/>
    </svg>
  )
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow fade-up">Premium Auto Leasing</div>
            <h1 className="hero-title fade-up-1">DRIVE<br /><span>YOUR</span><br />DREAM</h1>

            <br /> <br />

            <p className="hero-subtitle fade-up-1">PLACEHOLDER connects you with the best lease deals across all major brands — transparent pricing, fast approvals, and white-glove service from start to finish.</p>
            
            <br /> <br />
            
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
          <div className="hero-visual fade-up-1">
            <div className="car-showcase">
              <div className="car-badge">2025 Models</div>
              <svg className="car-svg-wrap" viewBox="0 0 600 280" fill="none">
                <ellipse cx="300" cy="245" rx="210" ry="18" fill="#000" opacity="0.5"/>
                <rect x="60" y="170" width="480" height="60" rx="14" fill="#1a1d28"/>
                <path d="M160 170 C175 120 215 90 300 85 C385 90 425 120 440 170Z" fill="#20243a"/>
                <path d="M185 168 C192 130 218 108 260 105 L260 168Z" fill="#1a3a5c" opacity="0.85"/>
                <path d="M270 105 C330 104 350 122 360 168 L270 168Z" fill="#1a3a5c" opacity="0.85"/>
                <rect x="263" y="106" width="4" height="62" rx="2" fill="#080a10"/>
                <rect x="68" y="182" width="52" height="22" rx="6" fill="#2563eb" opacity="0.9"/>
                <rect x="72" y="186" width="18" height="14" rx="3" fill="#93c5fd" opacity="0.8"/>
                <rect x="480" y="182" width="52" height="22" rx="6" fill="#2563eb" opacity="0.9"/>
                <rect x="510" y="186" width="18" height="14" rx="3" fill="#93c5fd" opacity="0.8"/>
                <line x1="270" y1="175" x2="270" y2="228" stroke="#2a2d38" strokeWidth="1.5"/>
                <circle cx="170" cy="228" r="38" fill="#0d0f14" stroke="#2a2d38" strokeWidth="2"/>
                <circle cx="170" cy="228" r="24" fill="#161820" stroke="#333" strokeWidth="1.5"/>
                <circle cx="170" cy="228" r="10" fill="#2563eb" opacity="0.7"/>
                <circle cx="430" cy="228" r="38" fill="#0d0f14" stroke="#2a2d38" strokeWidth="2"/>
                <circle cx="430" cy="228" r="24" fill="#161820" stroke="#333" strokeWidth="1.5"/>
                <circle cx="430" cy="228" r="10" fill="#2563eb" opacity="0.7"/>
                <rect x="68" y="168" width="464" height="4" rx="2" fill="#2563eb" opacity="0.5"/>
              </svg>
              <div className="car-glow" />
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
              <div className="car-img" style={{background: car.bg}}>
                <CarSVG headlight={car.headlight} />
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

      <section className="why-section">
        <div className="why-inner">
          <div className="section-label">Why Us</div>
          <div className="section-title">THE PLACEHOLDER DIFFERENCE</div>
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
              <p className="why-attribution">PLACEHOLDER — Est. [Year]</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">PLACEHOLDER</div>
              <p className="footer-tagline">Your trusted auto leasing partner. We make driving your dream car simple, affordable, and stress-free.</p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => navigate('/')}>Home</button></li>
                <li><button onClick={() => navigate('/inventory')}>Inventory</button></li>
                <li><button onClick={() => navigate('/credit')}>Credit Application</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><button onClick={() => navigate('/about')}>About Us</button></li>
                <li><button onClick={() => navigate('/contact')}>Contact Us</button></li>
                <li><button onClick={() => navigate('/admin/login')}>Staff Login</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><span>[Phone]</span></li>
                <li><span>[email@domain.com]</span></li>
                <li><span>[Address]</span></li>
                <li><span>Mon–Sat: 9AM–6PM</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2025 PLACEHOLDER. All Rights Reserved.</p>
            <p className="footer-copy">Privacy Policy · Terms of Use</p>
          </div>
        </div>
      </footer>

    </div>
  )
}