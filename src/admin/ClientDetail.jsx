import { useParams, useNavigate } from 'react-router-dom'

const MOCK = {
  '1': { id:'1', first_name:'John', last_name:'Smith', email:'john@example.com', phone:'(555) 100-0001', date_of_birth:'1990-05-14', ssn:'XXX-XX-1234', address:'123 Main St, Los Angeles, CA 90001', time_at_address:'3 years', housing_status:'Rent', monthly_housing:'$1,800', employment_status:'Full-Time Employed', employer:'Acme Corp', job_title:'Manager', time_at_job:'4 years', gross_income:'$6,500', other_income:'$0', work_phone:'(555) 100-0010', employer_address:'Los Angeles, CA', vehicle_year:'2025', vehicle_make:'Toyota', vehicle_model:'Camry', preferred_payment:'$350/mo', down_payment:'$0', notes:'Interested in the XSE trim. Has a trade-in 2019 Honda Civic.', created_at: new Date().toISOString() },
  '2': { id:'2', first_name:'Maria', last_name:'Garcia', email:'maria@example.com', phone:'(555) 100-0002', date_of_birth:'1985-11-22', ssn:'XXX-XX-5678', address:'456 Oak Ave, Glendale, CA 91201', time_at_address:'5 years', housing_status:'Own', monthly_housing:'$2,400', employment_status:'Self-Employed', employer:'Garcia Consulting', job_title:'Owner', time_at_job:'6 years', gross_income:'$9,000', other_income:'$1,500', work_phone:'(555) 100-0020', employer_address:'Glendale, CA', vehicle_year:'2025', vehicle_make:'BMW', vehicle_model:'3 Series', preferred_payment:'$500/mo', down_payment:'$3,000', notes:'', created_at: new Date().toISOString() },
  '3': { id:'3', first_name:'David', last_name:'Lee', email:'david@example.com', phone:'(555) 100-0003', date_of_birth:'1978-03-08', ssn:'XXX-XX-9012', address:'789 Pine Rd, Burbank, CA 91502', time_at_address:'8 years', housing_status:'Own', monthly_housing:'$3,200', employment_status:'Full-Time Employed', employer:'TechCorp', job_title:'Engineer', time_at_job:'7 years', gross_income:'$12,000', other_income:'$0', work_phone:'(555) 100-0030', employer_address:'Burbank, CA', vehicle_year:'2025', vehicle_make:'Lexus', vehicle_model:'ES 350', preferred_payment:'$550/mo', down_payment:'$5,000', notes:'Wants premium package.', created_at: new Date().toISOString() },
}

export default function ClientDetail() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const client   = MOCK[id]

  if (!client) return <div style={{minHeight:'100vh',background:'var(--dark)',padding:'120px 48px'}}><p style={{color:'var(--muted)'}}>Client not found.</p></div>

  const Field = ({ label, value }) => (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:'uppercase',color:'var(--red)',marginBottom:4}}>{label}</div>
      <div style={{fontSize:15,color: value ? '#fff' : 'var(--muted)'}}>{value || '—'}</div>
    </div>
  )

  const Section = ({ title, children }) => (
    <div style={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:14,padding:32,marginBottom:24}}>
      <h3 style={{fontFamily:'Bebas Neue',fontSize:22,letterSpacing:2,color:'var(--red)',marginBottom:24,paddingBottom:12,borderBottom:'1px solid var(--border)'}}>{title}</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 32px'}}>{children}</div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'72px 0 0'}}>
      <div style={{maxWidth:900,margin:'0 auto',padding:'48px 48px'}}>
        <button className="btn btn-outline" style={{padding:'8px 18px',fontSize:13,marginBottom:32}} onClick={() => navigate('/admin/clients')}>← Back to Clients</button>

        <div style={{marginBottom:40}}>
          <div style={{fontSize:12,fontWeight:600,letterSpacing:3,textTransform:'uppercase',color:'var(--red)',marginBottom:8}}>Credit Application</div>
          <h1 style={{fontFamily:'Bebas Neue',fontSize:48,letterSpacing:2}}>{client.first_name} {client.last_name}</h1>
          <p style={{fontSize:13,color:'var(--muted)',marginTop:6}}>Submitted {new Date(client.created_at).toLocaleString()}</p>
        </div>

        <Section title="Personal Information">
          <Field label="Full Name"    value={`${client.first_name} ${client.last_name}`} />
          <Field label="Date of Birth" value={client.date_of_birth} />
          <Field label="Email"         value={client.email} />
          <Field label="Phone"         value={client.phone} />
          <Field label="Address"       value={client.address} />
          <Field label="Time at Address" value={client.time_at_address} />
          <Field label="Housing Status"  value={client.housing_status} />
          <Field label="Monthly Housing" value={client.monthly_housing} />
        </Section>

        <Section title="Employment & Income">
          <Field label="Employment Status" value={client.employment_status} />
          <Field label="Employer"          value={client.employer} />
          <Field label="Job Title"         value={client.job_title} />
          <Field label="Time at Job"       value={client.time_at_job} />
          <Field label="Gross Monthly Income" value={client.gross_income} />
          <Field label="Other Income"      value={client.other_income} />
          <Field label="Work Phone"        value={client.work_phone} />
          <Field label="Employer Address"  value={client.employer_address} />
        </Section>

        <Section title="Vehicle of Interest">
          <Field label="Year"               value={client.vehicle_year} />
          <Field label="Make"               value={client.vehicle_make} />
          <Field label="Model"              value={client.vehicle_model} />
          <Field label="Preferred Payment"  value={client.preferred_payment} />
          <Field label="Down Payment"       value={client.down_payment} />
        </Section>

        {client.notes && (
          <div style={{background:'var(--card2)',border:'1px solid var(--border2)',borderRadius:14,padding:32,marginBottom:24}}>
            <h3 style={{fontFamily:'Bebas Neue',fontSize:22,letterSpacing:2,color:'var(--red)',marginBottom:16}}>NOTES</h3>
            <p style={{fontSize:15,color:'var(--off-white)',lineHeight:1.7}}>{client.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
