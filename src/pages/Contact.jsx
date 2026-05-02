import { useState } from 'react'
import { supabase } from '../services/supabase'

const EMPTY = { firstName:'', lastName:'', email:'', phone:'', subject:"I'm interested in Leasing a Vehicle", message:'' }

const CONTACT_BLOCKS = [
  { icon:'📍', title:'Our Location', text:'1907 W Burbank Blvd Unit B\nBurbank, CA 91506' },
  { icon:'📞', title:'Phone',        text:'(442) 448-4848' },
  { icon:'✉️', title:'Email',        text:'crystalautoleasing@gmail.com' },
]

const HOURS = [
  ['Monday – Friday', '10:00 AM – 6:00 PM'],
  ['Saturday',        'By Appointment'],
  ['Sunday',          'By Appointment'],
]

const fmtPhone = (v) => {
  const d = v.replace(/\D/g,'').slice(0,10)
  if (d.length <= 3) return d
  if (d.length <= 6) return '(' + d.slice(0,3) + ') ' + d.slice(3)
  return '(' + d.slice(0,3) + ') ' + d.slice(3,6) + '-' + d.slice(6)
}

export default function Contact() {
  const [form, setForm]           = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')
  const [loading, setLoading]     = useState(false)

  const set = (field, fmt) => (e) => {
    const val = fmt ? fmt(e.target.value) : e.target.value
    setForm(f => ({...f, [field]: val}))
  }

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setLoading(true)
    setError('')
    const { error: err } = await supabase.from('contact_submissions').insert([{
      first_name: form.firstName,
      last_name:  form.lastName,
      email:      form.email,
      phone:      form.phone,
      subject:    form.subject,
      message:    form.message,
    }])
    setLoading(false)
    if (err) { setError('Something went wrong. Please try again.'); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="form-page">
      <div style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16,padding:'0 24px',textAlign:'center'}}>
        <div style={{fontSize:52}}>📬</div>
        <h2 style={{fontFamily:'Bebas Neue',fontSize:40,letterSpacing:2,marginTop:8}}>Message Sent!</h2>
        <p style={{color:'var(--off-white)',fontSize:16,maxWidth:400,lineHeight:1.6,marginTop:4}}>
          Thanks for reaching out! We'll get back to you as soon as possible, usually within a few hours.
        </p>
      </div>
    </div>
  )

  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Get in Touch</div>
        <h1 className="form-hero-title">CONTACT US</h1>
        <br />
        <p className="form-hero-sub">We'd Love to Hear From You. Reach Out and We'll Respond Quickly</p>
      </div>

      <br />

      <div className="contact-wrap">
        <div className="contact-info-section">

          {CONTACT_BLOCKS.map(b => (
            <div key={b.title} className="contact-block">
              <div className="contact-icon">{b.icon}</div>
              <div>
                <h4 className="contact-block-title">{b.title}</h4>
                <p className="contact-block-text" style={{whiteSpace:'pre-line'}}>{b.text}</p>
              </div>
            </div>
          ))}

          <br />

          <div className="hours-section">
            <div className="section-label" style={{marginBottom:16}}>Business Hours</div>
            <br /><br />
            <table className="hours-table">
              <tbody>
                {HOURS.map(([day, hrs]) => (
                  <tr key={day}>
                    <td className="hours-day">{day}</td>
                    <td className="hours-time">{hrs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br /> <br />

          <div style={{marginTop:32}}>
            <div style={{borderRadius:12,overflow:'hidden',border:'1px solid var(--border)',height:220}}>
              <iframe
                title="Crystal Auto Leasing Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.4763563305!2d-118.34248492428638!3d34.178220000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c295c6b8f7a5e7%3A0xa4f3c0e1b2d94c6a!2s1907+W+Burbank+Blvd%2C+Burbank%2C+CA+91506!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{border:0, display:'block', filter:'invert(90%) hue-rotate(180deg)'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div> 

            <br />

            <p style={{fontSize:12,color:'var(--muted)',marginTop:8,textAlign:'center'}}>
              <a
                href="https://maps.google.com/?q=1907+W+Burbank+Blvd+Unit+B+Burbank+CA+91506"
                target="_blank"
                rel="noopener noreferrer"
                style={{color:'var(--gold-light)',textDecoration:'none',fontWeight:600}}
              >
                Open in Google Maps
              </a>
            </p>
          </div>

        </div>

        <div className="form-card contact-form-card">
          <div className="form-section-title">Send Us a Message</div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input value={form.firstName} onChange={set('firstName')} placeholder="John" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={set('phone', fmtPhone)}
                placeholder="(555) 000-0000"
                inputMode="numeric"
                maxLength={14}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full">
              <label>How Can We Help?</label>
              <select value={form.subject} onChange={set('subject')}>
                <option>I'm interested in Leasing a Vehicle</option>
                <option>Credit Application Question</option>
                <option>Trade/Sell my Car</option>
                <option>Lease Return</option>
                <option>General Inquiry</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full">
              <label>Message</label>
              <textarea value={form.message} onChange={set('message')} placeholder="Tell us more about what you're looking for..." />
            </div>
          </div>

          {error && <p style={{color:'#f87171',fontSize:13,marginBottom:12}}>{error}</p>}

          <br />

          <div style={{marginTop:8}}>
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:15}} onClick={handleSubmit} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .contact-wrap {
          max-width: 1200px; margin: 0 auto; padding: 48px 48px 80px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;
        }
        .contact-block { display:flex; gap:16px; align-items:flex-start; margin-bottom:28px; }
        .contact-icon {
          width:44px; height:44px; border-radius:10px; flex-shrink:0;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          display:flex; align-items:center; justify-content:center; font-size:18px;
        }
        .contact-block-title { font-size:14px; font-weight:700; color:var(--white); margin-bottom:4px; }
        .contact-block-text  { font-size:14px; color:var(--off-white); line-height:1.6; }
        .hours-section { margin-top:32px; padding-top:28px; border-top:1px solid var(--border); }
        .hours-table { width:100%; border-collapse:collapse; }
        .hours-day  { padding:10px 0; font-size:14px; color:var(--white); font-weight:500; border-bottom:1px solid var(--border); }
        .hours-time { padding:10px 0; font-size:14px; color:var(--muted); text-align:right; border-bottom:1px solid var(--border); }
        .hours-table tr:last-child td { border-bottom:none; }
        .contact-form-card { margin-bottom:0; }

        @media (max-width:900px) { .contact-wrap { padding:40px 24px 64px; gap:40px; } }

        @media (max-width:768px) {
          .contact-wrap { grid-template-columns:1fr; gap:0; padding:0 0 56px; }
          .contact-info-section { padding:28px 20px 0; }
          .contact-form-card { border-radius:0; border-left:none; border-right:none; border-top:none; margin-top:32px; padding:28px 20px 32px; }
          .contact-block { margin-bottom:20px; }
          .contact-icon { width:40px; height:40px; font-size:16px; }
          .hours-section { margin-top:24px; padding-top:24px; }
          .hours-day, .hours-time { font-size:14px; padding:10px 0; }
        }
      `}</style>
    </div>
  )
}