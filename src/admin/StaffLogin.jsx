import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function StaffLogin() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--dark)', padding: '24px 20px',
    }}>
      <div style={{width: '100%', maxWidth: 420}}>

        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div style={{fontFamily:'Bebas Neue', fontSize:30, letterSpacing:3, color:'var(--white)', marginBottom:6}}>
            Crystal Auto Leasing
          </div>
          <div style={{fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase', color:'var(--red)'}}>
            Staff Portal
          </div>
        </div>

        <form onSubmit={handleLogin} style={{
          background: 'var(--card2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '32px 28px',
        }}>
          <h2 style={{fontFamily:'Bebas Neue', fontSize:28, letterSpacing:2, marginBottom:6}}>Sign In</h2>
          <p style={{fontSize:14, color:'var(--muted)', marginBottom:28}}>Staff Accounts Only</p>

          <div className="form-group" style={{marginBottom:16}}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="crystal@autoleasing.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{marginBottom:24}}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p style={{color:'var(--red)', fontSize:13, marginBottom:16, textAlign:'center'}}>
              {error}
            </p>
          )}

          <br />

          <button
            type="submit"
            className="btn btn-primary"
            style={{width:'100%', justifyContent:'center', padding:14, fontSize:15}}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  )
}