import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const STATUSES = [
  { value:'new',         label:'New',          color:'#facc15', bg:'rgba(250,204,21,0.1)',  border:'rgba(250,204,21,0.3)'  },
  { value:'in_review',  label:'In Review',    color:'#60a5fa', bg:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.3)'  },
  { value:'approved',   label:'Approved',     color:'#34d399', bg:'rgba(52,211,153,0.1)',  border:'rgba(52,211,153,0.3)'  },
  { value:'denied',     label:'Denied',       color:'#f87171', bg:'rgba(248,113,113,0.1)', border:'rgba(248,113,113,0.3)' },
  { value:'funded',     label:'Funded',       color:'var(--gold-light)', bg:'rgba(201,168,76,0.1)', border:'rgba(201,168,76,0.3)' },
  { value:'archived',   label:'Archived',     color:'var(--muted)', bg:'rgba(255,255,255,0.04)', border:'var(--border)' },
]

function StatusBadge({ status }) {
  const s = STATUSES.find(s => s.value === status) || STATUSES[0]
  return (
    <span style={{
      fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
      padding:'4px 12px', borderRadius:20,
      background:s.bg, border:`1px solid ${s.border}`, color:s.color,
    }}>{s.label}</span>
  )
}

function Field({ label, value }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--gold)',marginBottom:4}}>{label}</div>
      <div style={{fontSize:15,color: value ? '#fff' : 'var(--muted)'}}>{value || '—'}</div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="detail-section">
      <h3 className="detail-section-title">{title}</h3>
      <div className="detail-fields">{children}</div>
    </div>
  )
}

export default function ClientDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const [client, setClient]         = useState(null)
  const [loading, setLoading]       = useState(true)
  const [updating, setUpdating]     = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    supabase
      .from('credit_applications')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => { setClient(data); setLoading(false) })
  }, [id])

  const handleStatusChange = async (newStatus) => {
    setUpdating(true)
    await supabase.from('credit_applications').update({ status: newStatus }).eq('id', id)
    setClient(c => ({...c, status: newStatus}))
    setUpdating(false)
  }

  const handleDelete = async () => {
    await supabase.from('credit_applications').delete().eq('id', id)
    navigate('/admin/clients')
  }

  if (loading) return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'120px 24px'}}>
      <p style={{color:'var(--muted)'}}>Loading...</p>
    </div>
  )

  if (!client) return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'120px 24px'}}>
      <p style={{color:'var(--muted)'}}>Client not found.</p>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'var(--dark)', padding:'68px 0 0'}}>
      <div className="admin-wrap">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12,marginBottom:28}}>
          <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,minHeight:'unset'}}
            onClick={() => navigate('/admin/clients')}>
            Back to Clients
          </button>
          {deleteConfirm ? (
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <span style={{fontSize:13,color:'var(--muted)'}}>Delete this application?</span>
              <button onClick={handleDelete} style={{background:'#f87171',border:'none',color:'#000',borderRadius:8,padding:'8px 16px',fontSize:13,fontWeight:700,cursor:'pointer'}}>Yes, Delete</button>
              <button onClick={() => setDeleteConfirm(false)} className="btn btn-outline" style={{padding:'8px 16px',fontSize:13,minHeight:'unset'}}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setDeleteConfirm(true)} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',borderRadius:8,padding:'8px 16px',fontSize:13,cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
              Delete Application
            </button>
          )}
        </div>

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>
            Credit Application
          </div>
          <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',marginBottom:8}}>
            <h1 style={{fontFamily:'Bebas Neue',fontSize:40,letterSpacing:2,lineHeight:1}}>
              {client.first_name} {client.last_name}
            </h1>
            <StatusBadge status={client.status || 'new'} />
          </div>
          <p style={{fontSize:13,color:'var(--muted)'}}>
            Submitted {new Date(client.created_at).toLocaleString()}
          </p>
        </div>

        <div className="detail-section" style={{marginBottom:20}}>
          <h3 className="detail-section-title">Application Status</h3>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {STATUSES.map(s => (
              <button
                key={s.value}
                onClick={() => handleStatusChange(s.value)}
                disabled={updating}
                style={{
                  padding:'8px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                  cursor:'pointer', fontFamily:'Outfit,sans-serif', border:`1px solid ${s.border}`,
                  background: (client.status || 'new') === s.value ? s.bg : 'transparent',
                  color: (client.status || 'new') === s.value ? s.color : 'var(--muted)',
                  opacity: updating ? 0.6 : 1,
                  transition:'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          <br />
          <p style={{fontSize:12,color:'var(--muted)',marginTop:12}}>
            Click a Status to Update this Application
          </p>
        </div>

        <Section title="Personal Information">
          <Field label="Full Name"       value={`${client.first_name} ${client.last_name}`} />
          <Field label="Date of Birth"   value={client.date_of_birth} />
          <Field label="SSN (Last 4)"    value={client.ssn_last4 ? `XXX-XX-${client.ssn_last4}` : '•••-••-••••'} />
          <Field label="Email"           value={client.email} />
          <Field label="Phone"           value={client.phone} />
          <Field label="Address"         value={client.address} />
          <Field label="Time at Address" value={client.time_at_address} />
          <Field label="Housing Status"  value={client.housing_status} />
          <Field label="Monthly Housing" value={client.monthly_housing} />
        </Section>

        <Section title="Employment & Income">
          <Field label="Employment Status"    value={client.employment_status} />
          <Field label="Employer"             value={client.employer} />
          <Field label="Job Title"            value={client.job_title} />
          <Field label="Time at Job"          value={client.time_at_job} />
          <Field label="Gross Monthly Income" value={client.gross_income} />
          <Field label="Other Income"         value={client.other_income} />
          <Field label="Work Phone"           value={client.work_phone} />
          <Field label="Employer Address"     value={client.employer_address} />
        </Section>

        <Section title="Vehicle of Interest">
          <Field label="Year"              value={client.vehicle_year} />
          <Field label="Make"              value={client.vehicle_make} />
          <Field label="Model"             value={client.vehicle_model} />
          <Field label="Agent Name"        value={client.agent_name} />
          <Field label="Preferred Payment" value={client.preferred_payment} />
          <Field label="Down Payment"      value={client.down_payment} />
        </Section>

        {client.notes && (
          <div className="detail-section">
            <h3 className="detail-section-title">Notes</h3>
            <p style={{fontSize:15,color:'var(--off-white)',lineHeight:1.7}}>{client.notes}</p>
          </div>
        )}

        <div className="detail-section">
          <h3 className="detail-section-title">Authorization</h3>
          <div className="detail-fields">
            <Field label="Credit Authorization" value={client.consent_given ? '✅ Authorized' : '❌ Not authorized'} />
            <Field label="Electronic Signature" value={client.signature || '—'} />
          </div>
          {client.signature && (
            <div style={{marginTop:16,padding:'14px 20px',background:'var(--card)',borderRadius:8,border:'1px solid var(--border)'}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--muted)',marginBottom:8}}>Signed As</div>
              <div style={{fontFamily:'Georgia, serif',fontSize:22,fontStyle:'italic',color:'var(--gold-light)'}}>
                {client.signature}
              </div>
            </div>
          )}
        </div>

      </div>

      <style>{`
        .admin-wrap { max-width:900px; margin:0 auto; padding:40px 48px 80px; }
        .detail-section { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:28px; margin-bottom:20px; }
        .detail-section-title { font-family:'Bebas Neue'; font-size:20px; letter-spacing:2px; color:var(--gold); margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--border); text-transform:uppercase; }
        .detail-fields { display:grid; grid-template-columns:1fr 1fr; gap:0 32px; }
        @media (max-width:768px) {
          .admin-wrap { padding:24px 20px 60px; }
          .detail-section { padding:20px; }
          .detail-fields { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  )
}