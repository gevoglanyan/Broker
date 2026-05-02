import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function ContactSubmissions() {
  const navigate              = useNavigate()
  const [items, setItems]     = useState([])
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setItems(data || []); setLoading(false) })
  }, [])

  const filtered = items.filter(c => {
    const q = search.toLowerCase()
    return `${c.first_name} ${c.last_name} ${c.email} ${c.subject}`.toLowerCase().includes(q)
  })

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">
        <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:24,minHeight:'unset'}} onClick={() => navigate('/admin')}>
          Back to Staff Dashboard
        </button>

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>CONTACT SUBMISSIONS</h1>
        </div>

        <div style={{marginBottom:24}}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Name, Email, or Subject..." style={{maxWidth:420,width:'100%'}} />
        </div>

        {loading ? (
          <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{color:'var(--muted)',fontSize:14,padding:'20px 0'}}>No Submissions Found.</p>
        ) : (
          <div style={{display:'grid',gridTemplateColumns: selected ? '1fr 1fr' : '1fr',gap:20}} className="contact-sub-grid">

            {/* List */}
            <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              {filtered.map((c, i) => (
                <div key={c.id}
                  style={{padding:'18px 20px',borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',cursor:'pointer',background:selected?.id===c.id?'var(--card)':'',transition:'background 0.15s',WebkitTapHighlightColor:'transparent'}}
                  onClick={() => setSelected(selected?.id === c.id ? null : c)}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                    <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{c.first_name} {c.last_name}</div>
                    <span style={{fontSize:11,color:'var(--muted)',flexShrink:0,marginLeft:12}}>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{fontSize:13,color:'var(--muted)',marginBottom:4}}>{c.email} {c.phone ? `· ${c.phone}` : ''}</div>
                  <div style={{fontSize:13,color:'var(--off-white)',fontStyle:'italic'}}>{c.subject}</div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,padding:28,alignSelf:'start'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
                  <h2 style={{fontFamily:'Bebas Neue',fontSize:22,letterSpacing:2,color:'var(--white)'}}>{selected.first_name} {selected.last_name}</h2>
                  <button onClick={() => setSelected(null)} style={{background:'none',border:'none',color:'var(--muted)',fontSize:18,cursor:'pointer',lineHeight:1}}>✕</button>
                </div>
                {[
                  ['Email',    selected.email],
                  ['Phone',    selected.phone],
                  ['Subject',  selected.subject],
                  ['Submitted',new Date(selected.created_at).toLocaleString()],
                ].map(([label, value]) => value ? (
                  <div key={label} style={{marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',marginBottom:4}}>{label}</div>
                    <div style={{fontSize:14,color:'#fff'}}>{value}</div>
                  </div>
                ) : null)}
                <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Message</div>
                  <p style={{fontSize:14,color:'var(--off-white)',lineHeight:1.7}}>{selected.message || '—'}</p>
                </div>
                <a href={`mailto:${selected.email}`} className="btn btn-primary" style={{display:'inline-flex',marginTop:24,padding:'10px 22px',fontSize:14}}>
                  Reply via Email →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .admin-wrap { max-width:1100px; margin:0 auto; padding:40px 48px 80px; }
        @media (max-width:768px) {
          .admin-wrap { padding:28px 20px 60px; }
          .contact-sub-grid { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  )
}