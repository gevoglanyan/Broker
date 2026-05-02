import { useState } from 'react'
import { supabase } from '../services/supabase'

const EMPTY = {
  firstName:'', lastName:'', dob:'', ssn:'', email:'', phone:'',
  address:'', timeAtAddress:'', housingStatus:'Own', monthlyHousing:'',
  employmentStatus:'Full-Time Employed', employer:'', jobTitle:'', timeAtJob:'',
  grossIncome:'', otherIncome:'', workPhone:'', employerAddress:'',
  year:'', make:'', model:'', preferredPayment:'', downPayment:'', notes:''
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
const isValidPhone = (v) => { const d = v.replace(/\D/g,''); return d.length===10||(d.length===11&&d[0]==='1') }
const isValidSSN   = (v) => v.replace(/\D/g,'').length === 9

// ── Moved outside component so it doesn't recreate on every render ──
function F({ id, label, full, errors, children }) {
  return (
    <div className={`form-group${full ? ' full' : ''}`} id={`field-${id}`}>
      <label>{label}</label>
      {children}
      {errors[id] && (
        <span style={{fontSize:12,color:'#f87171',marginTop:3,display:'block'}}>
          {errors[id]}
        </span>
      )}
    </div>
  )
}

export default function CreditApplication() {
  const [form, setForm]           = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)

  const set = (field) => (e) => {
    setForm(f => ({...f, [field]: e.target.value}))
    if (errors[field]) setErrors(prev => ({...prev, [field]: ''}))
  }

  const errStyle = (id) => errors[id]
    ? { borderColor:'#f87171', boxShadow:'0 0 0 3px rgba(248,113,113,0.15)' }
    : {}

  const validate = () => {
    const e = {}
    if (!form.firstName.trim())         e.firstName   = 'Required'
    if (!form.lastName.trim())          e.lastName    = 'Required'
    if (!form.dob)                      e.dob         = 'Required'
    if (!form.ssn.trim())               e.ssn         = 'Required'
    else if (!isValidSSN(form.ssn))     e.ssn         = 'Must be 9 digits'
    if (!form.email.trim())             e.email       = 'Required'
    else if (!isValidEmail(form.email)) e.email       = 'Enter a valid email address'
    if (!form.phone.trim())             e.phone       = 'Required'
    else if (!isValidPhone(form.phone)) e.phone       = 'Enter a valid 10-digit number'
    if (!form.address.trim())           e.address     = 'Required'
    if (!form.grossIncome.trim())       e.grossIncome = 'Required'
    if (form.workPhone && !isValidPhone(form.workPhone))
      e.workPhone = 'Enter a valid 10-digit number'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      const first = Object.keys(e)[0]
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior:'smooth', block:'center' })
      return
    }
    setLoading(true)
    const { error } = await supabase.from('credit_applications').insert([{
      first_name:        form.firstName,
      last_name:         form.lastName,
      date_of_birth:     form.dob || null,
      ssn:               form.ssn,
      email:             form.email,
      phone:             form.phone,
      address:           form.address,
      time_at_address:   form.timeAtAddress,
      housing_status:    form.housingStatus,
      monthly_housing:   form.monthlyHousing,
      employment_status: form.employmentStatus,
      employer:          form.employer,
      job_title:         form.jobTitle,
      time_at_job:       form.timeAtJob,
      gross_income:      form.grossIncome,
      other_income:      form.otherIncome,
      work_phone:        form.workPhone,
      employer_address:  form.employerAddress,
      vehicle_year:      form.year,
      vehicle_make:      form.make,
      vehicle_model:     form.model,
      preferred_payment: form.preferredPayment,
      down_payment:      form.downPayment,
      notes:             form.notes,
    }])
    setLoading(false)
    if (error) { setErrors({ submit: 'Something went wrong. Please try again.' }); return }
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
        <p className="form-hero-sub">Complete this Form and a Lease Advisor Will Contact You</p>
      </div>

      <div className="form-container">

        {/* ── Personal Information ── */}
        <div className="form-card">
          <div className="form-section-title">Personal Information</div>

          <div className="form-row">
            <F id="firstName" label="First Name *" errors={errors}>
              <input value={form.firstName} onChange={set('firstName')}
                placeholder="John" autoComplete="given-name" style={errStyle('firstName')} />
            </F>
            <F id="lastName" label="Last Name *" errors={errors}>
              <input value={form.lastName} onChange={set('lastName')}
                placeholder="Smith" autoComplete="family-name" style={errStyle('lastName')} />
            </F>
          </div>

          <div className="form-row">
            <F id="dob" label="Date of Birth *" errors={errors}>
              <input type="date" value={form.dob} onChange={set('dob')} style={errStyle('dob')} />
            </F>
            <F id="ssn" label="Social Security Number *" errors={errors}>
              <input value={form.ssn} onChange={set('ssn')}
                placeholder="XXX-XX-XXXX" style={errStyle('ssn')} />
            </F>
          </div>

          <div className="form-row">
            <F id="email" label="Email Address *" errors={errors}>
              <input type="email" value={form.email} onChange={set('email')}
                placeholder="john@example.com" autoComplete="email" style={errStyle('email')} />
            </F>
            <F id="phone" label="Phone Number *" errors={errors}>
              <input type="tel" value={form.phone} onChange={set('phone')}
                placeholder="(555) 000-0000" autoComplete="tel" style={errStyle('phone')} />
            </F>
          </div>

          <div className="form-row">
            <F id="address" label="Current Address *" full errors={errors}>
              <input value={form.address} onChange={set('address')}
                placeholder="123 Main St, City, State, ZIP"
                autoComplete="street-address" style={errStyle('address')} />
            </F>
          </div>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label>Time at Address</label>
              <input value={form.timeAtAddress} onChange={set('timeAtAddress')} placeholder="2 years" />
            </div>
            <div className="form-group">
              <label>Housing Status</label>
              <select value={form.housingStatus} onChange={set('housingStatus')}>
                <option>Own</option><option>Rent</option><option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monthly Housing Payment</label>
              <input value={form.monthlyHousing} onChange={set('monthlyHousing')} placeholder="$1,200" />
            </div>
          </div>
        </div>

        {/* ── Employment & Income ── */}
        <div className="form-card">
          <div className="form-section-title">Employment & Income</div>

          <div className="form-row">
            <div className="form-group">
              <label>Employment Status</label>
              <select value={form.employmentStatus} onChange={set('employmentStatus')}>
                <option>Full-Time Employed</option>
                <option>Part-Time Employed</option>
                <option>Self-Employed</option>
                <option>Retired</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Employer Name</label>
              <input value={form.employer} onChange={set('employer')} placeholder="ABC Company" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title / Occupation</label>
              <input value={form.jobTitle} onChange={set('jobTitle')} placeholder="Manager" />
            </div>
            <div className="form-group">
              <label>Time at Current Job</label>
              <input value={form.timeAtJob} onChange={set('timeAtJob')} placeholder="3 years" />
            </div>
          </div>

          <div className="form-row">
            <F id="grossIncome" label="Gross Monthly Income *" errors={errors}>
              <input value={form.grossIncome} onChange={set('grossIncome')}
                placeholder="$5,000" style={errStyle('grossIncome')} />
            </F>
            <div className="form-group">
              <label>Other Monthly Income</label>
              <input value={form.otherIncome} onChange={set('otherIncome')} placeholder="$0" />
            </div>
          </div>

          <div className="form-row">
            <F id="workPhone" label="Work Phone" errors={errors}>
              <input type="tel" value={form.workPhone} onChange={set('workPhone')}
                placeholder="(555) 000-0000" style={errStyle('workPhone')} />
            </F>
            <div className="form-group">
              <label>Employer Address</label>
              <input value={form.employerAddress} onChange={set('employerAddress')} placeholder="City, State" />
            </div>
          </div>
        </div>

        {/* ── Vehicle of Interest ── */}
        <div className="form-card">
          <div className="form-section-title">Vehicle of Interest</div>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label>Year</label>
              <input value={form.year} onChange={set('year')}
                placeholder={String(new Date().getFullYear())} />
            </div>
            <div className="form-group">
              <label>Make</label>
              <input value={form.make} onChange={set('make')} placeholder="Toyota" />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input value={form.model} onChange={set('model')} placeholder="Camry" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Monthly Payment</label>
              <input value={form.preferredPayment} onChange={set('preferredPayment')} placeholder="$350/mo" />
            </div>
            <div className="form-group">
              <label>Down Payment Available</label>
              <input value={form.downPayment} onChange={set('downPayment')} placeholder="$0 – $3,000" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label>Additional Notes</label>
              <textarea value={form.notes} onChange={set('notes')}
                placeholder="Any special requests, trade-in vehicle info, or questions..." />
            </div>
          </div>
        </div>

        {errors.submit && (
          <p style={{color:'#f87171',textAlign:'center',marginBottom:16,fontSize:14}}>
            {errors.submit}
          </p>
        )}
        {Object.keys(errors).filter(k => k !== 'submit').length > 0 && (
          <p style={{color:'#f87171',textAlign:'center',marginBottom:16,fontSize:14}}>
            Please fix {Object.keys(errors).filter(k => k !== 'submit').length} error{Object.keys(errors).filter(k => k !== 'submit').length > 1 ? 's' : ''} above before submitting.
          </p>
        )}

        <div className="form-submit">
          <button className="btn btn-primary" style={{padding:'14px 52px',fontSize:15}}
            onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>
          <br /><br />
          <p className="form-note">Your information is encrypted and secure. We do not share personal data with third parties.</p>
        </div>

      </div>
    </div>
  )
}