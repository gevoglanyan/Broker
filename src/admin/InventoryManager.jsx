import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const EMPTY_FORM = { type:'new', make:'', model:'', year:'', label:'', price:'', mileage:'', meta:'', available:true }

function Badge({ type }) {
  return (
    <span style={{fontSize:10,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',padding:'3px 8px',borderRadius:20,background:type==='new'?'rgba(232,32,42,0.12)':'rgba(255,255,255,0.07)',border:type==='new'?'1px solid rgba(232,32,42,0.3)':'1px solid rgba(255,255,255,0.12)',color:type==='new'?'var(--red-light)':'var(--off-white)'}}>
      {type === 'new' ? 'New' : 'Pre-Owned'}
    </span>
  )
}

function AvailablePill({ available }) {
  return (
    <span style={{fontSize:10,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',padding:'3px 8px',borderRadius:20,background:available?'rgba(52,211,153,0.1)':'rgba(255,255,255,0.05)',border:available?'1px solid rgba(52,211,153,0.3)':'1px solid var(--border)',color:available?'#34d399':'var(--muted)'}}>
      {available ? 'Listed' : 'Hidden'}
    </span>
  )
}

export default function InventoryManager() {
  const navigate = useNavigate()
  const [inventory, setInventory]         = useState([])
  const [loading, setLoading]             = useState(true)
  const [showForm, setShowForm]           = useState(false)
  const [editId, setEditId]               = useState(null)
  const [form, setForm]                   = useState(EMPTY_FORM)
  const [saving, setSaving]               = useState(false)
  const [filter, setFilter]               = useState('all')
  const [search, setSearch]               = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => { loadInventory() }, [])

  async function loadInventory() {
    setLoading(true)
    const { data } = await supabase.from('inventory').select('*').order('created_at', { ascending:false })
    setInventory(data || [])
    setLoading(false)
  }

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(f => ({...f, [field]: val}))
  }

  const filtered = inventory.filter(v => {
    const matchType   = filter === 'all' || v.type === filter
    const matchSearch = `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true) }

  const openEdit = (v) => {
    setForm({ type:v.type, make:v.make, model:v.model, year:v.year, label:v.label, price:v.price, mileage:v.mileage||'', meta:v.meta||'', available:v.available })
    setEditId(v.id)
    setShowForm(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const handleSave = async () => {
    if (!form.make || !form.model || !form.price) return
    setSaving(true)
    if (editId) {
      await supabase.from('inventory').update(form).eq('id', editId)
    } else {
      await supabase.from('inventory').insert([form])
    }
    setSaving(false)
    setShowForm(false)
    setEditId(null)
    setForm(EMPTY_FORM)
    loadInventory()
  }

  const handleToggleAvailable = async (v) => {
    await supabase.from('inventory').update({ available: !v.available }).eq('id', v.id)
    setInventory(prev => prev.map(item => item.id === v.id ? {...item, available: !v.available} : item))
  }

  const handleDelete = async (id) => {
    await supabase.from('inventory').delete().eq('id', id)
    setInventory(prev => prev.filter(v => v.id !== id))
    setDeleteConfirm(null)
  }

  const listed = inventory.filter(v => v.available).length
  const hidden = inventory.filter(v => !v.available).length

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:32,flexWrap:'wrap',gap:16}}>
          <div>
            <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:16,minHeight:'unset'}} onClick={() => navigate('/admin')}>
              Back to Staff Dashboard
            </button>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:6}}>Admin</div>
            <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>INVENTORY MANAGER</h1>
          </div>
          <button className="btn btn-primary" style={{alignSelf:'flex-end'}} onClick={openAdd}>+ Add Vehicle</button>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:32}} className="inv-stats-grid">
          {[{label:'Total Listings',value:inventory.length},{label:'Currently Listed',value:listed},{label:'Hidden',value:hidden}].map(s => (
            <div key={s.label} style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:12,padding:20}}>
              <div style={{fontSize:36,fontFamily:'Bebas Neue',color:'#fff',lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add / Edit form */}
        {showForm && (
          <div style={{background:'var(--card2)',border:'1px solid var(--red)',borderRadius:14,padding:28,marginBottom:32}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:'Bebas Neue',fontSize:24,letterSpacing:2,color:'var(--white)'}}>{editId ? 'EDIT VEHICLE' : 'ADD VEHICLE'}</h2>
              <button onClick={() => {setShowForm(false);setEditId(null)}} style={{background:'none',border:'none',color:'var(--muted)',fontSize:20,cursor:'pointer',lineHeight:1}}>✕</button>
            </div>
            <div className="inv-form-grid">
              <div className="form-group"><label>Type *</label><select value={form.type} onChange={set('type')}><option value="new">New</option><option value="used">Pre-Owned</option></select></div>
              <div className="form-group"><label>Year</label><input value={form.year} onChange={set('year')} placeholder="2025" inputMode="numeric" maxLength={4} /></div>
              <div className="form-group"><label>Make *</label><input value={form.make} onChange={set('make')} placeholder="Toyota" /></div>
              <div className="form-group"><label>Model *</label><input value={form.model} onChange={set('model')} placeholder="Camry XSE" /></div>
              <div className="form-group"><label>Badge Label</label><input value={form.label} onChange={set('label')} placeholder="2025, EV, Luxury..." /></div>
              <div className="form-group"><label>Monthly Price * (numbers only)</label><input value={form.price} onChange={set('price')} placeholder="329" inputMode="numeric" /></div>
              {form.type === 'used' && <div className="form-group"><label>Mileage</label><input value={form.mileage} onChange={set('mileage')} placeholder="18,400 mi" /></div>}
              <div className="form-group" style={{gridColumn:'1 / -1'}}><label>Meta Tags (comma separated)</label><input value={form.meta} onChange={set('meta')} placeholder="36 mo, 10K mi, $0 down" /></div>
              <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,paddingTop:8}}>
                <input type="checkbox" id="available" checked={form.available} onChange={set('available')} style={{width:18,height:18,flexShrink:0}} />
                <label htmlFor="available" style={{textTransform:'none',letterSpacing:0,fontSize:14,cursor:'pointer'}}>Show on public inventory page</label>
              </div>
            </div>
            <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving||!form.make||!form.model||!form.price} style={{opacity:(!form.make||!form.model||!form.price)?0.5:1}}>
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add to Inventory'}
              </button>
              <button className="btn btn-outline" style={{minHeight:'unset'}} onClick={() => {setShowForm(false);setEditId(null)}}>Cancel</button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
          {['all','new','used'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{background:filter===f?'var(--red)':'var(--card2)',border:`1px solid ${filter===f?'var(--red)':'var(--border)'}`,color:filter===f?'#fff':'var(--muted)',padding:'7px 16px',borderRadius:8,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'Outfit, sans-serif',transition:'all 0.15s'}}>
              {f==='all'?'All':f==='new'?'New':'Pre-Owned'}
            </button>
          ))}
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Make or Model..." style={{flex:1,minWidth:180,maxWidth:300}} />
        </div>

        {loading ? <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p> : (
          <>
            {/* Desktop table */}
            <div className="admin-table-wrap" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--card)'}}>
                    {['Vehicle','Type','Price /mo','Mileage','Status',''].map(h => (
                      <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} style={{padding:'28px 20px',color:'var(--muted)',fontSize:14}}>No vehicles found.</td></tr>
                  ) : filtered.map(v => (
                    <tr key={v.id} style={{opacity:v.available?1:0.5}}>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                        <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{v.year} {v.make} {v.model}</div>
                        <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{v.meta}</div>
                      </td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}><Badge type={v.type} /></td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--white)',fontFamily:'Bebas Neue',letterSpacing:1,borderBottom:'1px solid var(--border)'}}>
                        ${v.price}
                      </td>
                      <td style={{padding:'14px 20px',fontSize:13,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{v.mileage||'—'}</td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                        <button onClick={() => handleToggleAvailable(v)} style={{background:'none',border:'none',cursor:'pointer',padding:0}}><AvailablePill available={v.available} /></button>
                      </td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                        <div style={{display:'flex',gap:12,alignItems:'center'}}>
                          <button onClick={() => openEdit(v)} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--off-white)',fontFamily:'Outfit',fontWeight:600}}>Edit</button>
                          {deleteConfirm === v.id ? (
                            <div style={{display:'flex',gap:8,alignItems:'center'}}>
                              <span style={{fontSize:12,color:'var(--muted)'}}>Sure?</span>
                              <button onClick={() => handleDelete(v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--red)',fontFamily:'Outfit',fontWeight:700}}>Yes</button>
                              <button onClick={() => setDeleteConfirm(null)} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--muted)',fontFamily:'Outfit'}}>No</button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:12,color:'var(--muted)',fontFamily:'Outfit',fontWeight:600}}>Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="admin-mobile-cards" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              {filtered.length === 0 ? (
                <p style={{padding:'24px 20px',color:'var(--muted)',fontSize:14}}>No vehicles found.</p>
              ) : filtered.map((v, i) => (
                <div key={v.id} style={{padding:'18px 20px',borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',opacity:v.available?1:0.5}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                    <div>
                      <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{v.year} {v.make} {v.model}</div>
                      <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{v.meta}</div>
                    </div>
                    <div style={{fontFamily:'Bebas Neue',fontSize:22,color:'var(--white)',flexShrink:0,marginLeft:12}}>${v.price}/mo</div>
                  </div>
                  <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                    <Badge type={v.type} />
                    <button onClick={() => handleToggleAvailable(v)} style={{background:'none',border:'none',cursor:'pointer',padding:0}}><AvailablePill available={v.available} /></button>
                    {v.mileage && <span style={{fontSize:12,color:'var(--off-white)'}}>{v.mileage}</span>}
                  </div>
                  <div style={{display:'flex',gap:16,marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)'}}>
                    <button onClick={() => openEdit(v)} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,color:'var(--off-white)',fontFamily:'Outfit',fontWeight:600,padding:0}}>Edit</button>
                    {deleteConfirm === v.id ? (
                      <div style={{display:'flex',gap:10,alignItems:'center'}}>
                        <span style={{fontSize:13,color:'var(--muted)'}}>Delete?</span>
                        <button onClick={() => handleDelete(v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,color:'var(--red)',fontFamily:'Outfit',fontWeight:700,padding:0}}>Yes</button>
                        <button onClick={() => setDeleteConfirm(null)} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,color:'var(--muted)',fontFamily:'Outfit',padding:0}}>No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(v.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:13,color:'var(--muted)',fontFamily:'Outfit',fontWeight:600,padding:0}}>Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .admin-wrap { max-width:1100px; margin:0 auto; padding:40px 48px 80px; }
        .inv-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .inv-stats-grid { grid-template-columns:repeat(3,1fr); }
        .admin-table-wrap { display:block; }
        .admin-mobile-cards { display:none; }
        @media (max-width:768px) {
          .admin-wrap { padding:24px 20px 60px; }
          .inv-form-grid { grid-template-columns:1fr; }
          .inv-stats-grid { grid-template-columns:1fr 1fr !important; }
          .admin-table-wrap { display:none; }
          .admin-mobile-cards { display:block; }
        }
      `}</style>
    </div>
  )
}