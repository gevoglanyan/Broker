import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const EMPTY_FORM = {
  type:'new', make:'', model:'', year:'', label:'',
  price:'', mileage:'', meta:'', available:true, images:[]
}

const fmtPrice = (v) => {
  const d = v.replace(/[^0-9]/g, '')
  if (!d) return ''
  return '$' + d.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function Badge({ type }) {
  return (
    <span style={{fontSize:10,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',padding:'3px 8px',borderRadius:20,background:type==='new'?'rgba(201,168,76,0.12)':'rgba(255,255,255,0.07)',border:type==='new'?'1px solid rgba(201,168,76,0.3)':'1px solid rgba(255,255,255,0.12)',color:type==='new'?'var(--gold-light)':'var(--off-white)'}}>
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
  const navigate     = useNavigate()
  const fileInputRef = useRef(null)
  const dragItem     = useRef(null)
  const dragOverItem = useRef(null)

  const [inventory, setInventory]         = useState([])
  const [loading, setLoading]             = useState(true)
  const [showForm, setShowForm]           = useState(false)
  const [editId, setEditId]               = useState(null)
  const [form, setForm]                   = useState(EMPTY_FORM)
  const [saving, setSaving]               = useState(false)
  const [uploading, setUploading]         = useState(false)
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

  const setPrice = (e) => {
    setForm(f => ({...f, price: fmtPrice(e.target.value)}))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    const uploadedUrls = []
    for (const file of files) {
      const ext      = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('inventory-images')
        .upload(fileName, file, { cacheControl:'3600', upsert:false })
      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('inventory-images')
          .getPublicUrl(fileName)
        uploadedUrls.push(publicUrl)
      }
    }
    setForm(f => ({...f, images: [...(f.images || []), ...uploadedUrls]}))
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeImage = (url) => {
    setForm(f => ({...f, images: f.images.filter(u => u !== url)}))
  }

  const onDragStart = (i) => { dragItem.current = i }
  const onDragEnter = (i) => { dragOverItem.current = i }
  const onDragEnd   = () => {
    const imgs = [...form.images]
    const dragged = imgs.splice(dragItem.current, 1)[0]
    imgs.splice(dragOverItem.current, 0, dragged)
    dragItem.current     = null
    dragOverItem.current = null
    setForm(f => ({...f, images: imgs}))
  }

  const filtered = inventory.filter(v => {
    const matchType   = filter === 'all' || v.type === filter
    const matchSearch = `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true) }

  const openEdit = (v) => {
    setForm({
      type: v.type, make: v.make, model: v.model, year: v.year,
      label: v.label,
      price: v.price ? fmtPrice(v.price) : '',
      mileage: v.mileage || '', meta: v.meta || '',
      available: v.available, images: v.images || []
    })
    setEditId(v.id)
    setShowForm(true)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const handleSave = async () => {
    if (!form.make || !form.model || !form.price) return
    setSaving(true)
    const rawPrice = form.price.replace(/[^0-9]/g, '')
    const payload = {
      type: form.type, make: form.make, model: form.model,
      year: form.year, label: form.label, price: rawPrice,
      mileage: form.mileage, meta: form.meta,
      available: form.available, images: form.images || []
    }
    if (editId) {
      await supabase.from('inventory').update(payload).eq('id', editId)
    } else {
      await supabase.from('inventory').insert([payload])
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
              Back to Dashboard
            </button>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--gold)',marginBottom:6}}>Admin</div>
            <h1 style={{fontFamily:'Bebas Neue',fontSize:44,letterSpacing:2}}>INVENTORY MANAGER</h1>
          </div>
          <button className="btn btn-primary" style={{alignSelf:'flex-end'}} onClick={openAdd}>+ Add Vehicle</button>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:32}} className="inv-stats-grid">
          {[{label:'Total Listings',value:inventory.length},{label:'Currently Listed',value:listed},{label:'Hidden',value:hidden}].map(s => (
            <div key={s.label} style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:12,padding:20}}>
              <div style={{fontSize:36,fontFamily:'Bebas Neue',color:'#fff',lineHeight:1}}>{s.value}</div>
              <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>

        {showForm && (
          <div style={{background:'var(--card2)',border:'1px solid var(--gold)',borderRadius:14,padding:28,marginBottom:32}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
              <h2 style={{fontFamily:'Bebas Neue',fontSize:24,letterSpacing:2,color:'var(--white)'}}>
                {editId ? 'EDIT VEHICLE' : 'ADD VEHICLE'}
              </h2>
              <button onClick={() => {setShowForm(false);setEditId(null)}}
                style={{background:'none',border:'none',color:'var(--muted)',fontSize:20,cursor:'pointer',lineHeight:1}}>✕</button>
            </div>

            <div className="inv-form-grid">
              <div className="form-group"><label>Type *</label>
                <select value={form.type} onChange={set('type')}>
                  <option value="new">New</option>
                  <option value="used">Pre-Owned</option>
                </select>
              </div>
              <div className="form-group"><label>Year</label>
                <input value={form.year} onChange={set('year')} placeholder="2025" inputMode="numeric" maxLength={4} />
              </div>
              <div className="form-group"><label>Make *</label>
                <input value={form.make} onChange={set('make')} placeholder="Toyota" />
              </div>
              <div className="form-group"><label>Model *</label>
                <input value={form.model} onChange={set('model')} placeholder="Camry XSE" />
              </div>
              <div className="form-group"><label>Badge Label</label>
                <input value={form.label} onChange={set('label')} placeholder="2025, EV, Luxury..." />
              </div>
              <div className="form-group">
                <label>Monthly Price *</label>
                <input
                  value={form.price}
                  onChange={setPrice}
                  placeholder="$329"
                  inputMode="numeric"
                />
              </div>
              {form.type === 'used' && (
                <div className="form-group"><label>Mileage</label>
                  <input value={form.mileage} onChange={set('mileage')} placeholder="18,400 mi" />
                </div>
              )}
              <div className="form-group" style={{gridColumn:'1 / -1'}}>
                <label>Meta Tags (comma separated)</label>
                <input value={form.meta} onChange={set('meta')} placeholder="36 Months, 10k Miles, $0 Down" />
              </div>

              <div className="form-group" style={{gridColumn:'1 / -1'}}>
                <label>Photos</label>
                <div
                  style={{border:'2px dashed var(--border2)',borderRadius:10,padding:'20px',textAlign:'center',cursor:'pointer',transition:'border-color 0.2s'}}
                  onClick={() => fileInputRef.current?.click()}
                  onMouseEnter={e => e.currentTarget.style.borderColor='var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border2)'}
                >
                  <input ref={fileInputRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={handleImageUpload} />
                  {uploading ? (
                    <p style={{color:'var(--gold-light)',fontSize:14}}>Uploading...</p>
                  ) : (
                    <>
                      <p style={{fontSize:14,color:'var(--off-white)',marginBottom:4}}>Click to Upload Photos</p>
                      <p style={{fontSize:12,color:'var(--muted)'}}>JPG, PNG, WEBP — multiple allowed</p>
                    </>
                  )}
                </div>

                {form.images && form.images.length > 0 && (
                  <>
                    <p style={{fontSize:12,color:'var(--gold)',marginTop:12,marginBottom:8,fontWeight:600}}>
                      Drag Images to Reorder — First Image is the Main Photo
                    </p>
                    <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
                      {form.images.map((url, i) => (
                        <div
                          key={url}
                          draggable
                          onDragStart={() => onDragStart(i)}
                          onDragEnter={() => onDragEnter(i)}
                          onDragEnd={onDragEnd}
                          onDragOver={e => e.preventDefault()}
                          style={{
                            position:'relative', width:100, height:78,
                            borderRadius:8, overflow:'hidden',
                            border: i === 0 ? '2px solid var(--gold)' : '1px solid var(--border2)',
                            cursor:'grab', userSelect:'none',
                            boxShadow: i === 0 ? '0 0 10px rgba(201,168,76,0.3)' : 'none',
                            transition:'border 0.15s, box-shadow 0.15s',
                          }}
                        >
                          <img src={url} alt={`Photo ${i+1}`} style={{width:'100%',height:'100%',objectFit:'cover',pointerEvents:'none'}} />
                          <button
                            onClick={() => removeImage(url)}
                            style={{position:'absolute',top:4,right:4,background:'rgba(0,0,0,0.75)',border:'none',color:'#fff',borderRadius:'50%',width:20,height:20,cursor:'pointer',fontSize:11,display:'flex',alignItems:'center',justifyContent:'center',padding:0}}
                          >✕</button>
                          {i === 0 && (
                            <div style={{position:'absolute',bottom:0,left:0,right:0,background:'rgba(201,168,76,0.85)',fontSize:9,color:'#000',textAlign:'center',padding:'3px 0',fontWeight:700,letterSpacing:1}}>
                              MAIN
                            </div>
                          )}
                          <div style={{position:'absolute',top:4,left:4,color:'rgba(255,255,255,0.6)',fontSize:12,lineHeight:1,pointerEvents:'none'}}>⠿</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <p style={{fontSize:11,color:'var(--muted)',marginTop:8}}>
                  {form.images && form.images.length > 1 ? `${form.images.length} Photos — Drag to Reorder` : 'First image will be the main photo shown on listings.'}
                </p>
              </div>

              <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',gap:12,paddingTop:8}}>
                <input type="checkbox" id="available" checked={form.available} onChange={set('available')} style={{width:18,height:18,flexShrink:0}} />
                <label htmlFor="available" style={{textTransform:'none',letterSpacing:0,fontSize:14,cursor:'pointer'}}>
                  Show on Public Inventory Page
                </label>
              </div>
            </div>

            <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
              <button className="btn btn-primary" onClick={handleSave}
                disabled={saving||!form.make||!form.model||!form.price}
                style={{opacity:(!form.make||!form.model||!form.price)?0.5:1}}>
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add to Inventory'}
              </button>
              <button className="btn btn-outline" style={{minHeight:'unset'}}
                onClick={() => {setShowForm(false);setEditId(null)}}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
          {['all','new','used'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background:filter===f?'var(--gold)':'var(--card2)',
              border:`1px solid ${filter===f?'var(--gold)':'var(--border)'}`,
              color:filter===f?'#000':'var(--muted)',
              padding:'7px 16px',borderRadius:8,fontSize:13,fontWeight:600,
              cursor:'pointer',fontFamily:'Outfit, sans-serif',transition:'all 0.15s',
            }}>
              {f==='all'?'All':f==='new'?'New':'Pre-Owned'}
            </button>
          ))}
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search Make or Model..."
            style={{flex:1,minWidth:180,maxWidth:300}} />
        </div>

        {loading ? <p style={{color:'var(--muted)',fontSize:14}}>Loading...</p> : (
          <>
            <div className="admin-table-wrap" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--card)'}}>
                    {['Photo','Vehicle','Type','Price /mo','Mileage','Status',''].map(h => (
                      <th key={h} style={{textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--gold)',padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{padding:'28px 20px',color:'var(--muted)',fontSize:14}}>No Vehicles Found.</td></tr>
                  ) : filtered.map(v => (
                    <tr key={v.id} style={{opacity:v.available?1:0.5}}>
                      <td style={{padding:'10px 20px',borderBottom:'1px solid var(--border)'}}>
                        {v.images && v.images.length > 0 ? (
                          <img src={v.images[0]} alt={v.model}
                            style={{width:64,height:48,objectFit:'cover',borderRadius:6,display:'block',border:'1px solid var(--border2)'}} />
                        ) : (
                          <div style={{width:64,height:48,background:'var(--card)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--border2)'}}>
                            <span style={{fontSize:18}}>🚗</span>
                          </div>
                        )}
                      </td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                        <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{v.year} {v.make} {v.model}</div>
                        <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{v.meta}</div>
                        {v.images && v.images.length > 0 && (
                          <div style={{fontSize:11,color:'var(--gold)',marginTop:3}}>{v.images.length} photo{v.images.length > 1 ? 's' : ''}</div>
                        )}
                      </td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}><Badge type={v.type} /></td>
                      <td style={{padding:'14px 20px',fontSize:14,color:'var(--white)',fontFamily:'Bebas Neue',letterSpacing:1,borderBottom:'1px solid var(--border)'}}>
                        ${v.price ? Number(v.price).toLocaleString('en-US') : '—'}
                      </td>
                      <td style={{padding:'14px 20px',fontSize:13,color:'var(--off-white)',borderBottom:'1px solid var(--border)'}}>{v.mileage||'—'}</td>
                      <td style={{padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                        <button onClick={() => handleToggleAvailable(v)} style={{background:'none',border:'none',cursor:'pointer',padding:0}}>
                          <AvailablePill available={v.available} />
                        </button>
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

            <div className="admin-mobile-cards" style={{background:'var(--card2)',border:'1px solid var(--border)',borderRadius:14,overflow:'hidden'}}>
              {filtered.length === 0 ? (
                <p style={{padding:'24px 20px',color:'var(--muted)',fontSize:14}}>No vehicles found.</p>
              ) : filtered.map((v, i) => (
                <div key={v.id} style={{padding:'18px 20px',borderBottom:i<filtered.length-1?'1px solid var(--border)':'none',opacity:v.available?1:0.5}}>
                  <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:10}}>
                    {v.images && v.images.length > 0 ? (
                      <img src={v.images[0]} alt={v.model}
                        style={{width:72,height:54,objectFit:'cover',borderRadius:8,flexShrink:0,border:'1px solid var(--border2)'}} />
                    ) : (
                      <div style={{width:72,height:54,background:'var(--card)',borderRadius:8,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid var(--border2)'}}>
                        <span style={{fontSize:22}}>🚗</span>
                      </div>
                    )}
                    <div style={{flex:1}}>
                      <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{v.year} {v.make} {v.model}</div>
                      <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{v.meta}</div>
                      <div style={{fontFamily:'Bebas Neue',fontSize:20,color:'var(--white)',marginTop:4}}>
                        ${v.price ? Number(v.price).toLocaleString('en-US') : '—'}/mo
                      </div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                    <Badge type={v.type} />
                    <button onClick={() => handleToggleAvailable(v)} style={{background:'none',border:'none',cursor:'pointer',padding:0}}>
                      <AvailablePill available={v.available} />
                    </button>
                    {v.mileage && <span style={{fontSize:12,color:'var(--off-white)'}}>{v.mileage}</span>}
                    {v.images && v.images.length > 0 && <span style={{fontSize:11,color:'var(--gold)'}}>{v.images.length} photo{v.images.length>1?'s':''}</span>}
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