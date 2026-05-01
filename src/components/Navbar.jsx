import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
  { path: '/',            label: 'Home' },
  { path: '/inventory',   label: 'Inventory' },
  { path: '/credit',      label: 'Credit Application' },
  { path: '/about',       label: 'About Us' },
  { path: '/contact',     label: 'Contact Us' },
  { path: '/admin/login', label: 'Staff Login', cta: true },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { staff, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.nav-toggle')) {
        setOpen(false)
      }
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
          PLACEHOLDER <span className="admin-badge">ADMIN</span>
        </button>
        <div className="admin-nav-links">
          <button className="nav-link" onClick={() => go('/admin')}>Dashboard</button>
          <button className="nav-link" onClick={() => go('/admin/clients')}>Clients</button>
          <button className="nav-link" onClick={() => go('/')}>Public Site</button>
          <button className="nav-link nav-cta" onClick={logout}>Sign Out</button>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="navbar">
        <button className="logo" onClick={() => go('/')}>PLACEHOLDER</button>
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
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ path, label, cta }) => (
            <button
              key={path}
              className={`mobile-link${cta ? ' mobile-link-cta' : ''}${location.pathname === path ? ' mobile-link-active' : ''}`}
              onClick={() => go(path)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}