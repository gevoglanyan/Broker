import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

function Field({ label, value }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',marginBottom:4}}>{label}</div>
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
  const [client, setClient]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('credit_applications')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => { setClient(data); setLoading(false) })
  }, [id])

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
        <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:28,minHeight:'unset'}} onClick={() => navigate('/admin/clients')}>
          Back to Clients
        </button>

        <div style={{marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Credit Application</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:40,letterSpacing:2,lineHeight:1}}>{client.first_name} {client.last_name}</h1>
          <p style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Submitted {new Date(client.created_at).toLocaleString()}</p>
        </div>

        <Section title="Personal Information">
          <Field label="Full Name"       value={`${client.first_name} ${client.last_name}`} />
          <Field label="Date of Birth"   value={client.date_of_birth} />
          <Field label="SSN"             value={client.ssn} />
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
          <Field label="Preferred Payment" value={client.preferred_payment} />
          <Field label="Down Payment"      value={client.down_payment} />
        </Section>

        {client.notes && (
          <div className="detail-section">
            <h3 className="detail-section-title">Notes</h3>
            <p style={{fontSize:15,color:'var(--off-white)',lineHeight:1.7}}>{client.notes}</p>
          </div>
        )}
      </div>

      <style>{`
        .admin-wrap { max-width:900px; margin:0 auto; padding:40px 48px 80px; }
        .detail-section { background:var(--card2); border:1px solid var(--border); border-radius:14px; padding:28px; margin-bottom:20px; }
        .detail-section-title { font-family:'Bebas Neue'; font-size:20px; letter-spacing:2px; color:var(--red); margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid var(--border); text-transform:uppercase; }
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