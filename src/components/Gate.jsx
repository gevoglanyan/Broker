import { useState } from 'react'

const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD

export default function SiteGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem('site_unlocked') === 'true'
  )
  const [input, setInput]   = useState('')
  const [error, setError]   = useState(false)
  const [shake, setShake]   = useState(false)

  const handleUnlock = () => {
    if (input === SITE_PASSWORD) {
      localStorage.setItem('site_unlocked', 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleUnlock()
  }

  if (unlocked) return children

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      flexDirection: 'column',
      gap: 0,
    }}>
      <div style={{
        background: 'var(--card2)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 28,
          letterSpacing: 4,
          color: 'var(--white)',
          marginBottom: 8,
        }}>
            CRYSTAL AUTO LEASING
        </div>

        <br />
        
        <p style={{fontSize:13, color:'var(--muted)', marginBottom:36, lineHeight:1.5}}>
          This site is currently private.<br />Enter the access code to continue.
        </p>

        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          onKeyDown={handleKey}
          placeholder="Enter Access Code"
          autoFocus
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 18,
            letterSpacing: 4,
            borderColor: error ? '#f87171' : undefined,
            boxShadow: error ? '0 0 0 3px rgba(248,113,113,0.15)' : undefined,
            marginBottom: 16,
          }}
        />
        {error && (
          <p style={{fontSize:13, color:'#f87171', marginBottom:16}}>Incorrect code. Try again.</p>
        )}

        <br />

        <button
          className="btn btn-primary"
          style={{width:'100%', justifyContent:'center', fontSize:15}}
          onClick={handleUnlock}
        >
          Enter Site 
        </button>
      </div>

      <p style={{fontSize:12, color:'var(--muted2)', marginTop:24}}>
        © {new Date().getFullYear()} Crystal Auto Leasing. All Rights Reserved.
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}