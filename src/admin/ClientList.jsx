import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MOCK = [
  { id:'1', first_name:'John',  last_name:'Smith',  email:'john@example.com',  phone:'(555) 100-0001', vehicle_make:'Toyota', vehicle_model:'Camry',    employment_status:'Full-Time Employed', created_at: new Date().toISOString() },
  { id:'2', first_name:'Maria', last_name:'Garcia', email:'maria@example.com', phone:'(555) 100-0002', vehicle_make:'BMW',    vehicle_model:'3 Series', employment_status:'Self-Employed',      created_at: new Date().toISOString() },
  { id:'3', first_name:'David', last_name:'Lee',    email:'david@example.com', phone:'(555) 100-0003', vehicle_make:'Lexus',  vehicle_model:'ES 350',   employment_status:'Full-Time Employed', created_at: new Date().toISOString() },
]

export default function ClientList() {
  const navigate        = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = MOCK.filter(c => {
    const q = search.toLowerCase()
    return `${c.first_name} ${c.last_name} ${c.email} ${c.vehicle_make} ${c.vehicle_model}`.toLowerCase().includes(q)
  })

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'72px 0 0'}}>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'48px 48px'}}>
        <div style={{marginBottom:40}}>
          <div style={{fontSize:12,fontWeight:600,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:48,letterSpacing:2}}>ALL CLIENTS</h1>
        </div>

        <div style={{marginBottom:28}}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or vehicle..."
            style={{maxWidth:420}}
          />
        </div>

        <div style={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:14,overflow:'hidden'}}>
            {filtered.length === 0 ? (
              <p style={{color:'var(--muted)',fontSize:14,padding:32}}>No clients found.</p>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--card)'}}>
                    {['Name','Email','Phone','Vehicle','Submitted',''].map(h => (
                      <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',padding:'16px 20px',borderBottom:'1px solid var(--border2)'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c.id} style={{cursor:'pointer',transition:'background 0.15s'}}
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
            )}
          </div>
      </div>
    </div>
  )
}
