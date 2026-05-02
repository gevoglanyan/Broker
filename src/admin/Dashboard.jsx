import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats]     = useState({ applications: 0, contacts: 0 })
  const [recent, setRecent]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { count: appCount },
        { count: conCount },
        { data: recentApps },
      ] = await Promise.all([
        supabase.from('credit_applications').select('*', { count:'exact', head:true }),
        supabase.from('contact_submissions').select('*', { count:'exact', head:true }),
        supabase.from('credit_applications')
          .select('id,first_name,last_name,email,vehicle_make,vehicle_model,created_at')
          .order('created_at', { ascending:false })
          .limit(5),
      ])
      setStats({ applications: appCount || 0, contacts: conCount || 0 })
      setRecent(recentApps || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>DASHBOARD</h1>
        </div>

        {loading ? (
          <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p>
        ) : (
          <>
            {/* Stats */}
            <div className="admin-stats-grid">
              {[
                { label:'Credit Applications', value: stats.applications,                    action: () => navigate('/admin/clients') },
                { label:'Contact Submissions',  value: stats.contacts,                        action: () => navigate('/admin/contacts') },
                { label:'Total Leads',          value: stats.applications + stats.contacts,   action: null },
                { label:'Manage Vehicle Inventory',     value: '→',                                   action: () => navigate('/admin/inventory') },
              ].map(stat => (
                <div key={stat.label} className="admin-stat-card" style={{cursor: stat.action ? 'pointer' : 'default'}} onClick={stat.action || undefined}>
                  <div style={{fontSize:44,fontFamily:'Bebas Neue',letterSpacing:1,color:'#fff',lineHeight:1}}>{stat.value}</div>
                  <div style={{fontSize:13,color:'var(--off-white)',marginTop:6}}>{stat.label}</div>
                  {stat.action && <div style={{fontSize:12,color:'var(--red)',marginTop:8,fontWeight:600}}>View all →</div>}
                </div>
              ))}
            </div>

            {/* Recent applications */}
            <div className="admin-card">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12}}>
                <h2 style={{fontFamily:'Bebas Neue',fontSize:26,letterSpacing:1}}>RECENT APPLICATIONS</h2>
                <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,minHeight:'unset'}} onClick={() => navigate('/admin/clients')}>View All</button>
              </div>

              {recent.length === 0 ? (
                <p style={{color:'var(--muted)',fontSize:14}}>No applications yet.</p>
              ) : (
                <>
                  <div className="admin-table-wrap">
                    <table style={{width:'100%',borderCollapse:'collapse'}}>
                      <thead>
                        <tr>{['Name','Email','Vehicle','Submitted'].map(h => (
                          <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',padding:'0 0 16px',borderBottom:'1px solid var(--border)'}}>
                            {h}
                          </th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {recent.map(r => (
                          <tr key={r.id} style={{cursor:'pointer'}}
                            onMouseEnter={e => e.currentTarget.style.background='var(--card)'}
                            onMouseLeave={e => e.currentTarget.style.background=''}
                            onClick={() => navigate(`/admin/clients/${r.id}`)}>
                            <td style={{padding:'13px 0',fontSize:14,color:'#fff',borderBottom:'1px solid var(--border)'}}>{r.first_name} {r.last_name}</td>
                            <td style={{padding:'13px 0',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{r.email}</td>
                            <td style={{padding:'13px 0',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{r.vehicle_make} {r.vehicle_model}</td>
                            <td style={{padding:'13px 0',fontSize:14,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{new Date(r.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="admin-mobile-cards">
                    {recent.map(r => (
                      <div key={r.id} className="admin-mobile-card" onClick={() => navigate(`/admin/clients/${r.id}`)}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                          <div>
                            <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{r.first_name} {r.last_name}</div>
                            <div style={{fontSize:13,color:'var(--muted)',marginTop:2}}>{r.email}</div>
                          </div>
                          <span style={{fontSize:12,color:'var(--red)',fontWeight:600,flexShrink:0}}>View →</span>
                        </div>
                        <div style={{marginTop:12,display:'flex',gap:16,flexWrap:'wrap'}}>
                          <span style={{fontSize:12,color:'var(--off-white)'}}>{r.vehicle_make} {r.vehicle_model}</span>
                          <span style={{fontSize:12,color:'var(--muted)'}}>{new Date(r.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

      </div>

      <style>{`
        .admin-wrap { max-width:1100px; margin:0 auto; padding:40px 48px 80px; }
        .admin-stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:32px; }
        .admin-stat-card { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:28px; transition:border-color 0.2s; }
        .admin-stat-card:hover { border-color:var(--red); }
        .admin-card { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:28px; }
        .admin-table-wrap { display:block; overflow-x:auto; }
        .admin-mobile-cards { display:none; flex-direction:column; gap:0; }
        .admin-mobile-card { padding:16px 0; border-bottom:1px solid var(--border); cursor:pointer; }
        .admin-mobile-card:last-child { border-bottom:none; }
        .admin-mobile-card:active { background:var(--card); }
        @media (max-width:768px) {
          .admin-wrap { padding:28px 20px 60px; }
          .admin-stats-grid { grid-template-columns:1fr 1fr; gap:12px; }
          .admin-card { padding:20px; }
          .admin-table-wrap { display:none; }
          .admin-mobile-cards { display:flex; }
        }
        @media (max-width:400px) { .admin-stats-grid { grid-template-columns:1fr; } }
      `}</style>
    </div>
  )
}