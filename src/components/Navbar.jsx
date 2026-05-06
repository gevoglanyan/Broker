import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
  { path: '/',         label: 'Home' },
  { path: '/offers',   label: 'Monthly Offers' },
  { path: '/faqs',     label: 'FAQs' },
  { path: '/about',    label: 'About Us' },
  { path: '/contact',  label: 'Contact Us' },
  { path: '/credit',   label: 'Credit Application', cta: true },
]

/* { path: '/inventory', label: 'Vehicle Inventory' }, */

export default function Navbar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { staff, logout } = useAuth()
  const [open, setOpen]   = useState(false)
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-toggle')) setOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  const go = (path) => {
    navigate(path)
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (isAdmin && staff) {
    return (
      <nav className="navbar">
        <button className="logo" onClick={() => go('/admin')}>
          <span style={{color:'var(--gold)'}}>CRYSTAL</span>
          <span style={{color:'var(--white)'}}> AUTO LEASING</span>
          <span className="admin-badge">ADMIN</span>
        </button>
        <div className="admin-nav-links">
          <button className="nav-link" onClick={() => go('/admin')}>Staff Dashboard</button>
          <button className="nav-link" onClick={() => go('/admin/clients')}>View Clients</button>
          <button className="nav-link" onClick={() => go('/admin/contacts')}>Contact Submissions</button>

          {/* <button className="nav-link" onClick={() => go('/admin/inventory')}>Manage Inventory</button> */}

          <button className="nav-link nav-cta" onClick={logout}>Sign Out</button>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="navbar">
        <button className="logo" onClick={() => go('/')}>
          <span style={{color:'var(--gold)'}}>CRYSTAL</span>
          <span style={{color:'var(--white)'}}> AUTO LEASING</span>
        </button>
        <ul className="nav-links">
          {NAV_LINKS.map(({ path, label, cta }) => (
            <li key={path}>
              <button
                className={`nav-link${cta ? ' nav-cta' : ''}${location.pathname === path ? ' active' : ''}`}
                onClick={() => go(path)}
              >{label}</button>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen(p => !p)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /> <span /> <span />
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            <br /> <br /> <br />
            {NAV_LINKS.map(({ path, label, cta }, i) => (
              <button
                key={path}
                className={`mobile-link${cta ? ' mobile-link-cta' : ''}${location.pathname === path ? ' mobile-link-active' : ''}`}
                onClick={() => go(path)}
                style={{animationDelay: `${i * 40}ms`}}
              >
                <span className="mobile-link-label">{label}</span>
                {!cta && <span className="mobile-link-arrow"></span>}
              </button>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-divider" />
            <div className="mobile-menu-contact">
              <a href="tel:4424484848" className="mobile-contact-item">
                <span className="mobile-contact-icon">📞</span>
                <span>(442) 448-4848</span>
              </a>
              <a href="mailto:crystalautoleasing@gmail.com" className="mobile-contact-item">
                <span className="mobile-contact-icon">✉️</span>
                <span>crystalautoleasing@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}