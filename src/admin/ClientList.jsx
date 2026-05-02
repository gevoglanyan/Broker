import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function ClientList() {
  const navigate              = useNavigate()
  const [clients, setClients] = useState([])
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('credit_applications')
      .select('id,first_name,last_name,email,phone,vehicle_make,vehicle_model,created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setClients(data || []); setLoading(false) })
  }, [])

  const filtered = clients.filter(c => {
    const q = search.toLowerCase()
    return `${c.first_name} ${c.last_name} ${c.email} ${c.vehicle_make} ${c.vehicle_model}`.toLowerCase().includes(q)
  })

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">
        <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:24,minHeight:'unset'}} onClick={() => navigate('/admin')}>
          Back to Staff Dashboard
        </button>

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>ALL CLIENTS</h1>
        </div>

        <div style={{marginBottom:24}}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Name, Email, or Vehicle..." style={{maxWidth:420,width:'100%'}} />
        </div>

        {loading ? (
          <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{color:'var(--muted)',fontSize:14,padding:'20px 0'}}>No Clients Found.</p>
        ) : (
          <>
            <div className="admin-table-wrap" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--card)'}}>
                    {['Name','Email','Phone','Vehicle','Submitted',''].map(h => (
                      <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id} style={{cursor:'pointer'}}
                      onMouseEnter={e => e.currentTarget.style.background='var(--card)'}
                      onMouseLeave={e => e.currentTarget.style.background=''}
                      onClick={() => navigate(`/admin/clients/${c.id}`)}>
                      <td style={{padding:'14px 20px',fontSize:14,color:'#fff',borderBottom:'1px solid var(--border)'}}>{c.first_name} {c.last_name}</td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{c.email}</td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{c.phone}</td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{c.vehicle_make} {c.vehicle_model}</td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{new Date(c.created_at).toLocaleDateString()}</td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}><span style={{fontSize:12,color:'var(--red)',fontWeight:600}}>View →</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-mobile-cards" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              {filtered.map((c, i) => (
                <div key={c.id} style={{padding:'18px 20px',borderBottom: i < filtered.length-1 ? '1px solid var(--border)' : 'none',cursor:'pointer',WebkitTapHighlightColor:'transparent'}}
                  onClick={() => navigate(`/admin/clients/${c.id}`)}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{c.first_name} {c.last_name}</div>
                    <span style={{fontSize:12,color:'var(--red)',fontWeight:600,flexShrink:0,marginLeft:12}}>View →</span>
                  </div>
                  <div style={{fontSize:13,color:'var(--muted)',marginBottom:8}}>{c.email}</div>
                  <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
                    <span style={{fontSize:12,color:'var(--off-white)'}}>{c.phone}</span>
                    <span style={{fontSize:12,color:'var(--off-white)'}}>{c.vehicle_make} {c.vehicle_model}</span>
                    <span style={{fontSize:12,color:'var(--muted)'}}>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-wrap { max-width:1100px; margin:0 auto; padding:40px 48px 80px; }
        .admin-table-wrap { display:block; }
        .admin-mobile-cards { display:none; }
        @media (max-width:768px) {
          .admin-wrap { padding:28px 20px 60px; }
          .admin-table-wrap { display:none; }
          .admin-mobile-cards { display:block; }
        }
      `}</style>
    </div>
  )
}