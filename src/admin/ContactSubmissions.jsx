import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const STATUSES = [
  { value:'all',      label:'All' },
  { value:'unread',   label:'Unread',    color:'#facc15', bg:'rgba(250,204,21,0.1)',  border:'rgba(250,204,21,0.3)'  },
  { value:'read',     label:'Read',      color:'#60a5fa', bg:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.3)'  },
  { value:'replied',  label:'Replied',   color:'#34d399', bg:'rgba(52,211,153,0.1)',  border:'rgba(52,211,153,0.3)'  },
  { value:'archived', label:'Archived',  color:'var(--muted)', bg:'rgba(255,255,255,0.04)', border:'var(--border)' },
]

function StatusBadge({ status }) {
  const s = STATUSES.find(s => s.value === status)
  if (!s || s.value === 'all') return null
  return (
    <span style={{
      fontSize:10, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
      padding:'3px 10px', borderRadius:20, flexShrink:0,
      background:s.bg, border:`1px solid ${s.border}`, color:s.color,
    }}>{s.label}</span>
  )
}

export default function ContactSubmissions() {
  const navigate                    = useNavigate()
  const [items, setItems]           = useState([])
  const [search, setSearch]         = useState('')
  const [filter, setFilter]         = useState('all')
  const [loading, setLoading]       = useState(true)
  const [selected, setSelected]     = useState(null)
  const [updating, setUpdating]     = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setItems(data || []); setLoading(false) })
  }, [])

  const handleSelect = async (c) => {
    if (selected?.id === c.id) { setSelected(null); return }
    setSelected(c)
    if ((c.status || 'unread') === 'unread') {
      await supabase.from('contact_submissions').update({ status: 'read' }).eq('id', c.id)
      setItems(prev => prev.map(item => item.id === c.id ? {...item, status:'read'} : item))
      setSelected({...c, status:'read'})
    }
  }

  const handleStatusChange = async (newStatus) => {
    if (!selected) return
    setUpdating(true)
    await supabase.from('contact_submissions').update({ status: newStatus }).eq('id', selected.id)
    setItems(prev => prev.map(item => item.id === selected.id ? {...item, status: newStatus} : item))
    setSelected(s => ({...s, status: newStatus}))
    setUpdating(false)
  }

  const handleDelete = async () => {
    if (!selected) return
    await supabase.from('contact_submissions').delete().eq('id', selected.id)
    setItems(prev => prev.filter(item => item.id !== selected.id))
    setSelected(null)
    setDeleteConfirm(false)
  }

  const filtered = items.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = `${c.first_name} ${c.last_name} ${c.email} ${c.subject}`.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || (c.status || 'unread') === filter
    return matchSearch && matchFilter
  })

  const counts = {}
  items.forEach(c => {
    const s = c.status || 'unread'
    counts[s] = (counts[s] || 0) + 1
  })

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">
        <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:24,minHeight:'unset'}} onClick={() => navigate('/admin')}>
          Back to Dashboard
        </button>

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>Admin</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>CONTACT SUBMISSIONS</h1>
        </div>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
          {STATUSES.map(s => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              style={{
                padding:'6px 14px', borderRadius:20, fontSize:12, fontWeight:600,
                cursor:'pointer', fontFamily:'Outfit,sans-serif',
                border: filter===s.value ? `1px solid ${s.border||'var(--gold)'}` : '1px solid var(--border)',
                background: filter===s.value ? (s.bg||'rgba(201,168,76,0.1)') : 'var(--card2)',
                color: filter===s.value ? (s.color||'var(--gold-light)') : 'var(--muted)',
                transition:'all 0.15s',
              }}
            >
              {s.label}
              {s.value === 'all' ? (
                <span style={{marginLeft:6,opacity:0.7}}>({items.length})</span>
              ) : counts[s.value] ? (
                <span style={{marginLeft:6,opacity:0.7}}>({counts[s.value]})</span>
              ) : null}
            </button>
          ))}
        </div>

        <div style={{marginBottom:24}}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Name, Email, or Subject..." style={{maxWidth:420,width:'100%'}} />
        </div>

        {loading ? (
          <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{color:'var(--muted)',fontSize:14,padding:'20px 0'}}>No submissions found.</p>
        ) : (
          <div style={{display:'grid',gridTemplateColumns: selected ? '1fr 1fr' : '1fr',gap:20}} className="contact-sub-grid">

            {/* ── List ── */}
            <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              {filtered.map((c, i) => (
                <div key={c.id}
                  style={{
                    padding:'18px 20px',
                    borderBottom: i<filtered.length-1 ? '1px solid var(--border)' : 'none',
                    cursor:'pointer',
                    background: selected?.id===c.id ? 'var(--card)' : '',
                    transition:'background 0.15s',
                    WebkitTapHighlightColor:'transparent',
                  }}
                  onClick={() => handleSelect(c)}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                    <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                      <div style={{fontSize:15,fontWeight:700,color: (c.status||'unread')==='unread' ? '#fff' : 'var(--off-white)'}}>{c.first_name} {c.last_name}</div>
                      <StatusBadge status={c.status || 'unread'} />
                    </div>
                    <span style={{fontSize:11,color:'var(--muted)',flexShrink:0,marginLeft:12}}>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{fontSize:13,color:'var(--muted)',marginBottom:4}}>{c.email}{c.phone ? ` · ${c.phone}` : ''}</div>
                  <div style={{fontSize:13,color:'var(--off-white)',fontStyle:'italic'}}>{c.subject}</div>
                </div>
              ))}
            </div>

            {selected && (
              <div style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,padding:28,alignSelf:'start'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                  <div>
                    <h2 style={{fontFamily:'Bebas Neue',fontSize:22,letterSpacing:2,color:'var(--white)',marginBottom:6}}>{selected.first_name} {selected.last_name}</h2>
                    <StatusBadge status={selected.status || 'unread'} />
                  </div>
                  <button onClick={() => { setSelected(null); setDeleteConfirm(false) }} style={{background:'none',border:'none',color:'var(--muted)',fontSize:18,cursor:'pointer',lineHeight:1}}>✕</button>
                </div>

                <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--muted)',marginBottom:10}}>Move to</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                    {STATUSES.filter(s => s.value !== 'all').map(s => (
                      <button
                        key={s.value}
                        onClick={() => handleStatusChange(s.value)}
                        disabled={updating}
                        style={{
                          padding:'5px 14px', borderRadius:20, fontSize:12, fontWeight:600,
                          cursor:'pointer', fontFamily:'Outfit,sans-serif',
                          border:`1px solid ${s.border}`,
                          background: (selected.status||'unread')===s.value ? s.bg : 'transparent',
                          color: (selected.status||'unread')===s.value ? s.color : 'var(--muted)',
                          opacity: updating ? 0.6 : 1,
                          transition:'all 0.15s',
                        }}
                      >{s.label}</button>
                    ))}
                  </div>
                </div>

                {[
                  ['Email',     selected.email],
                  ['Phone',     selected.phone],
                  ['Subject',   selected.subject],
                  ['Submitted', new Date(selected.created_at).toLocaleString()],
                ].map(([label, value]) => value ? (
                  <div key={label} style={{marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--gold)',marginBottom:4}}>{label}</div>
                    <div style={{fontSize:14,color:'#fff'}}>{value}</div>
                  </div>
                ) : null)}

                <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>Message</div>
                  <p style={{fontSize:14,color:'var(--off-white)',lineHeight:1.7}}>{selected.message || '—'}</p>
                </div>

                <div style={{display:'flex',gap:10,marginTop:24,flexWrap:'wrap',alignItems:'center'}}>
                  <a href={`mailto:${selected.email}`} className="btn btn-primary" style={{display:'inline-flex',padding:'10px 22px',fontSize:14}}
                    onClick={() => handleStatusChange('replied')}>
                    Reply via Email
                  </a>
                  {deleteConfirm ? (
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <span style={{fontSize:13,color:'var(--muted)'}}>Delete?</span>
                      <button onClick={handleDelete} style={{background:'#f87171',border:'none',color:'#000',borderRadius:8,padding:'8px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Yes</button>
                      <button onClick={() => setDeleteConfirm(false)} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',borderRadius:8,padding:'8px 14px',fontSize:13,cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(true)} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',borderRadius:8,padding:'10px 16px',fontSize:13,cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
                      Delete
                    </button>
                  )}
                </div>

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