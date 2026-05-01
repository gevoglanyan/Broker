import { useNavigate } from 'react-router-dom'

const MOCK = [
  { id:'1', first_name:'John',  last_name:'Smith',  email:'john@example.com', vehicle_make:'Toyota', vehicle_model:'Camry',      created_at: new Date().toISOString() },
  { id:'2', first_name:'Maria', last_name:'Garcia', email:'maria@example.com',vehicle_make:'BMW',    vehicle_model:'3 Series',   created_at: new Date().toISOString() },
  { id:'3', first_name:'David', last_name:'Lee',    email:'david@example.com',vehicle_make:'Lexus',  vehicle_model:'ES 350',     created_at: new Date().toISOString() },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const stats  = { applications: MOCK.length, contacts: 2 }
  const recent = MOCK

  const s = { card: { background:'var(--card2)', border:'1px solid var(--border2)', borderRadius:14, padding:32 } }

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'72px 0 0'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'48px 48px'}}>
        <div style={{marginBottom:40}}>
          <div style={{fontSize:12,fontWeight:600,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:48,letterSpacing:2}}>DASHBOARD</h1>
        </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginBottom:40}}>
            {[
              { label:'Credit Applications', value: stats.applications, action: () => navigate('/admin/clients') },
              { label:'Contact Submissions',  value: stats.contacts,     action: null },
              { label:'Total Leads',          value: stats.applications + stats.contacts, action: null },
            ].map(stat => (
              <div key={stat.label} style={{...s.card, cursor: stat.action ? 'pointer' : 'default'}} onClick={stat.action || undefined}>
                <div style={{fontSize:48,fontFamily:'Bebas Neue',letterSpacing:1,color:'#fff',lineHeight:1}}>{stat.value}</div>
                <div style={{fontSize:13,color:'var(--off-white)',marginTop:6}}>{stat.label}</div>
                {stat.action && <div style={{fontSize:12,color:'var(--red)',marginTop:8,fontWeight:600}}>View all →</div>}
              </div>
            ))}
          </div>

          <div style={s.card}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:'Bebas Neue',fontSize:28,letterSpacing:1}}>RECENT APPLICATIONS</h2>
              <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13}} onClick={() => navigate('/admin/clients')}>View All</button>
            </div>
            {recent.length === 0 ? (
              <p style={{color:'var(--muted)',fontSize:14}}>No applications yet.</p>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr>{['Name','Email','Vehicle','Submitted'].map(h => (
                    <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',padding:'0 0 16px',borderBottom:'1px solid var(--border2)'}}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {recent.map(r => (
                    <tr key={r.id} style={{cursor:'pointer'}} onClick={() => navigate(`/admin/clients/${r.id}`)}>
                      <td style={{padding:'14px 0',fontSize:14,color:'#fff',borderBottom:'1px solid var(--border)'}}>{r.first_name} {r.last_name}</td>
                      <td style={{padding:'14px 0',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{r.email}</td>
                      <td style={{padding:'14px 0',fontSize:14,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{r.vehicle_make} {r.vehicle_model}</td>
                      <td style={{padding:'14px 0',fontSize:14,color:'var(--muted)',borderBottom:'1px solid var(--border)'}}>{new Date(r.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
      </div>
    </div>
  )
}
