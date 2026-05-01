import { useState } from 'react'

const EMPTY = {
  firstName:'', lastName:'', dob:'', ssn:'', email:'', phone:'',
  address:'', timeAtAddress:'', housingStatus:'Own', monthlyHousing:'',
  employmentStatus:'Full-Time Employed', employer:'', jobTitle:'', timeAtJob:'',
  grossIncome:'', otherIncome:'', workPhone:'', employerAddress:'',
  year:'', make:'', model:'', preferredPayment:'', downPayment:'', notes:''
}

export default function CreditApplication() {
  const [form, setForm]           = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const set = (field) => (e) => setForm(f => ({...f, [field]: e.target.value}))

  const handleSubmit = async () => {
    setLoading(true)

    // Connect Supabase

    await new Promise(r => setTimeout(r, 600))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="form-page">
      <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:'0 24px',textAlign:'center'}}>
        <div style={{fontSize:52}}>✅</div>
        <h2 style={{fontFamily:'Bebas Neue',fontSize:42,letterSpacing:2,marginTop:8}}>Submitted!</h2>
        <p style={{color:'var(--off-white)',fontSize:16,maxWidth:440,lineHeight:1.6,marginTop:4}}>
          Thank you for your credit application. A lease advisor will review your information and contact you within 1 business day.
        </p>
      </div>
    </div>
  )

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Get Pre-Approved</div>
        <h1 className="form-hero-title">CREDIT APPLICATION</h1>

        <br />  

        <p className="form-hero-sub">Complete this form and a lease advisor will contact you.</p>
      </div>

      <div className="form-container">

        <div className="form-card">
          <div className="form-section-title">Personal Information</div>
          <div className="form-row">
            <div className="form-group"><label>First Name *</label><input value={form.firstName} onChange={set('firstName')} placeholder="John" /></div>
            <div className="form-group"><label>Last Name *</label><input value={form.lastName} onChange={set('lastName')} placeholder="Smith" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Date of Birth *</label><input type="date" value={form.dob} onChange={set('dob')} /></div>
            <div className="form-group"><label>Social Security Number *</label><input value={form.ssn} onChange={set('ssn')} placeholder="XXX-XX-XXXX" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Email Address *</label><input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" /></div>
            <div className="form-group"><label>Phone Number *</label><input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" /></div>
          </div>
          <div className="form-row">
            <div className="form-group full"><label>Current Address *</label><input value={form.address} onChange={set('address')} placeholder="123 Main St, City, State, ZIP" /></div>
          </div>
          <div className="form-row form-row-3">
            <div className="form-group"><label>Time at Address</label><input value={form.timeAtAddress} onChange={set('timeAtAddress')} placeholder="2 years" /></div>
            <div className="form-group">
              <label>Housing Status</label>
              <select value={form.housingStatus} onChange={set('housingStatus')}>
                <option>Own</option><option>Rent</option><option>Other</option>
              </select>
            </div>
            <div className="form-group"><label>Monthly Housing Payment</label><input value={form.monthlyHousing} onChange={set('monthlyHousing')} placeholder="$1,200" /></div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-section-title">Employment & Income</div>
          <div className="form-row">
            <div className="form-group">
              <label>Employment Status</label>
              <select value={form.employmentStatus} onChange={set('employmentStatus')}>
                <option>Full-Time Employed</option><option>Part-Time Employed</option>
                <option>Self-Employed</option><option>Retired</option><option>Other</option>
              </select>
            </div>
            <div className="form-group"><label>Employer Name</label><input value={form.employer} onChange={set('employer')} placeholder="ABC Company" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Job Title / Occupation</label><input value={form.jobTitle} onChange={set('jobTitle')} placeholder="Manager" /></div>
            <div className="form-group"><label>Time at Current Job</label><input value={form.timeAtJob} onChange={set('timeAtJob')} placeholder="3 years" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Gross Monthly Income *</label><input value={form.grossIncome} onChange={set('grossIncome')} placeholder="$5,000" /></div>
            <div className="form-group"><label>Other Monthly Income</label><input value={form.otherIncome} onChange={set('otherIncome')} placeholder="$0" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Work Phone</label><input type="tel" value={form.workPhone} onChange={set('workPhone')} placeholder="(555) 000-0000" /></div>
            <div className="form-group"><label>Employer Address</label><input value={form.employerAddress} onChange={set('employerAddress')} placeholder="City, State" /></div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-section-title">Vehicle of Interest</div>
          <div className="form-row form-row-3">
            <div className="form-group"><label>Year</label><input value={form.year} onChange={set('year')} placeholder="2025" /></div>
            <div className="form-group"><label>Make</label><input value={form.make} onChange={set('make')} placeholder="Toyota" /></div>
            <div className="form-group"><label>Model</label><input value={form.model} onChange={set('model')} placeholder="Camry" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Preferred Monthly Payment</label><input value={form.preferredPayment} onChange={set('preferredPayment')} placeholder="$350 /mo" /></div>
            <div className="form-group"><label>Down Payment Available</label><input value={form.downPayment} onChange={set('downPayment')} placeholder="$0 – $3,000" /></div>
          </div>
          <div className="form-row">
            <div className="form-group full">
              <label>Additional Notes</label>
              <textarea value={form.notes} onChange={set('notes')} placeholder="Any special requests, trade-in vehicle info, or questions..." />
            </div>
          </div>
        </div>

        {error && <p style={{color:'var(--blue-light)',textAlign:'center',marginBottom:16,fontSize:14}}>{error}</p>}
        

        <div className="form-submit">
          <button className="btn btn-primary" style={{padding:'14px 52px',fontSize:15}} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>

          <br /> <br /> 

          <p className="form-note">Your information is encrypted and secure. We do not share personal data with third parties.</p>
        </div>

      </div>
    </div>
  )
}