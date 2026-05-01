import { useState } from 'react'

const EMPTY = { firstName:'', lastName:'', email:'', phone:'', subject:"I'm interested in leasing a vehicle", message:'' }

const CONTACT_BLOCKS = [
  { icon:'📍', title:'Our Location', text:'14310 Victory Blvd\nLos Angeles, CA 90094' },
  { icon:'📞', title:'Phone',        text:'(818) 666-6066' },
  { icon:'✉️', title:'Email',        text:'info@elitla.com' },
]

const HOURS = [
  ['Monday – Friday', '10:00 AM – 7:00 PM'],
  ['Saturday & Sunday', 'By Appointment'],
]

export default function Contact() {
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
        <p className="form-hero-sub">We'd love to hear from you. Reach out and we'll respond quickly.</p>
      </div>

      <br /> <br />

      <div className="contact-wrap">
        <div className="contact-info-section">
          {CONTACT_BLOCKS.map(b => (
            <div key={b.title} className="contact-block">
              <div className="contact-icon">{b.icon}</div>
              <div>
                <h4 className="contact-block-title">{b.title}</h4>
                <p className="contact-block-text">{b.text}</p>
              </div>
            </div>
          ))}

          <br />

          <div className="hours-section">
            <div className="section-label" style={{marginBottom:16}}>Business Hours</div>

            <br /> <br />

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
        </div>

        <div className="form-card contact-form-card">
          <div className="form-section-title">Send Us a Message</div>

          <div className="form-row">
            <div className="form-group"><label>First Name</label><input value={form.firstName} onChange={set('firstName')} placeholder="John" /></div>
            <div className="form-group"><label>Last Name</label><input value={form.lastName} onChange={set('lastName')} placeholder="Smith" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" /></div>
            <div className="form-group"><label>Phone</label><input type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" /></div>
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

          {error && <p style={{color:'var(--blue-light)',fontSize:13,marginBottom:12}}>{error}</p>}

          <br /> 

          <div style={{marginTop:8}}>
            <button
              className="btn btn-primary"
              style={{width:'100%',justifyContent:'center',padding:15}}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message →'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .contact-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Contact info blocks */
        .contact-block {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .contact-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          flex-shrink: 0;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(37,99,235,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .contact-block-title { font-size: 14px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
        .contact-block-text  { font-size: 14px; color: var(--off-white); line-height: 1.6; }

        /* Hours */
        .hours-section { margin-top: 32px; padding-top: 28px; border-top: 1px solid var(--border); }
        .hours-table { width: 100%; border-collapse: collapse; }
        .hours-day  { padding: 10px 0; font-size: 14px; color: var(--white); font-weight: 500; border-bottom: 1px solid var(--border); }
        .hours-time { padding: 10px 0; font-size: 14px; color: var(--muted); text-align: right; border-bottom: 1px solid var(--border); }
        .hours-table tr:last-child td { border-bottom: none; }

        /* Form card */
        .contact-form-card { margin-bottom: 0; }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .contact-wrap { padding: 40px 24px 64px; gap: 40px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .contact-wrap {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0 0 56px;
          }

          /* Info section — full width, no side padding card feel */
          .contact-info-section {
            padding: 28px 20px 0;
          }

          /* Form card — flush to edges, no border-radius on sides */
          .contact-form-card {
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-top: none;
            margin-top: 32px;
            padding: 28px 20px 32px;
          }

          /* Tighten contact blocks */
          .contact-block { margin-bottom: 20px; }
          .contact-icon  { width: 40px; height: 40px; font-size: 16px; }

          /* Hours */
          .hours-section { margin-top: 24px; padding-top: 24px; }
          .hours-day, .hours-time { font-size: 14px; padding: 10px 0; }
        }
      `}</style>
    </div>
  )
}