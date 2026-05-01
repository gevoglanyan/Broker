const VALUES = [
  { icon:'🔒', title:'Integrity First', desc:'We never charge hidden fees or push vehicles that aren\'t right for your situation.' },
  { icon:'💡', title:'Education',       desc:'We explain every line item so you understand exactly what you\'re signing.' },
  { icon:'⭐', title:'Excellence',      desc:'From first contact to final delivery, we hold ourselves to the highest standard.' },
  { icon:'🤝', title:'Community',       desc:'We\'re locally rooted and deeply invested in the communities we serve.' },
  { icon:'🔄', title:'Loyalty',         desc:'85% of our business comes from repeat customers and referrals — we earn your trust for life.' },
  { icon:'📞', title:'Accessibility',   desc:'A real advisor is always available — no bots, no runaround, no waiting on hold.' },
]

const TEAM = [
  { avatar:'👨‍💼', name:'[Name]', role:'Founder & CEO' },
  { avatar:'👩‍💼', name:'[Name]', role:'Head of Finance' },
  { avatar:'👨‍🔧', name:'[Name]', role:'Senior Lease Advisor' },
  { avatar:'👩‍💻', name:'[Name]', role:'Customer Relations' },
  { avatar:'🧑‍🤝‍🧑', name:'[Names]', role:'Lease Consultants' },
  { avatar:'👩‍🏫', name:'[Name]', role:'Compliance & Title' },
]

export default function About() {
  return (
    <div className="form-page">
      <div className="form-hero">
        <div className="form-hero-eyebrow">Our Story</div>
        <h1 className="form-hero-title">ABOUT US</h1>
        <br />
        <p className="form-hero-sub">Driven by Integrity. Built on Relationships.</p>
      </div>

      <div className="about-wrap">
        <div className="about-story">
          <div className="about-body">
            <p>Elit Los Angeles is a <strong>family-owned and operated</strong> auto brokerage built on a foundation of trust, transparency, and genuine care for every customer we serve.</p>
            <p>Founded by a family that has been passionate about cars for generations, we started Elit Los Angeles with one goal in mind: bring the same honesty and dedication we'd want for our own family to every single deal we make.</p>
            <p>We're not a traditional dealership. As independent auto brokers, we work <strong>for you</strong> — not the manufacturer. That means we shop across our network of dealers to find you the best possible deal on any make or model, new or pre-owned.</p>
            <p>When you work with Elit Los Angeles, you're not just a number. You're working directly with people who take pride in what they do and genuinely want to see you drive away happy. That's the Elit difference — and it's been that way since day one.</p>
          </div>
          <div className="why-image">
            <div style={{fontSize:52,marginBottom:14}}>🏆</div>
            <p className="why-quote" style={{fontSize:17}}>Voted <strong>#1 Auto Broker</strong> in our region three years running by our customers.</p>
            <p className="why-attribution" style={{marginTop:18}}>ELIT Los Angeles · Est. [Year]</p>
          </div>
        </div>

        <div className="section-label" style={{marginBottom:20}}>Our Values</div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div key={v.title} className="value-card" data-first={i===0} data-last={i===VALUES.length-1}>
              <div className="value-icon">{v.icon}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>

        <div className="section-label" style={{marginBottom:20,marginTop:56}}>The Team</div>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div key={m.role} className="team-card" data-first={i===0} data-last={i===TEAM.length-1}>
              <div className="team-avatar">{m.avatar}</div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .about-wrap {
          max-width: 1000px;
          margin: 0 auto;
          padding: 48px 48px 80px;
        }

        /* ── Story ── */
        .about-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 64px;
        }
        .about-body { font-size: 15px; line-height: 1.85; color: var(--off-white); }
        .about-body p { margin-bottom: 18px; }
        .about-body p:last-child { margin-bottom: 0; }
        .about-body strong { color: var(--white); }

        /* ── Values ── */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 0;
        }
        .value-card {
          background: var(--card2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 22px;
          transition: border-color 0.2s;
        }
        .value-card:hover { border-color: var(--blue); }
        .value-icon { font-size: 22px; margin-bottom: 10px; }
        .value-title { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 6px; }
        .value-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* ── Team ── */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 0;
        }
        .team-card {
          background: var(--card2);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          text-align: center;
          transition: border-color 0.2s;
        }
        .team-card:hover { border-color: var(--blue); }
        .team-avatar {
          height: 110px;
          background: linear-gradient(145deg, var(--card3), var(--card));
          display: flex; align-items: center; justify-content: center;
          font-size: 40px;
        }
        .team-info { padding: 14px 16px 18px; }
        .team-name { font-size: 15px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
        .team-role { font-size: 11px; font-weight: 600; color: var(--blue-light); letter-spacing: 0.5px; text-transform: uppercase; }

        @media (max-width: 900px) {
          .about-wrap { padding: 40px 24px 64px; }
          .about-story { grid-template-columns: 1fr; gap: 32px; margin-bottom: 48px; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
          .team-grid   { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .about-wrap { padding: 28px 20px 56px; }
          .about-story { gap: 24px; margin-bottom: 40px; }

          /* Values — stacked list */
          .values-grid { grid-template-columns: 1fr; gap: 0; }
          .value-card {
            border-radius: 0;
            border-bottom: none;
            padding: 18px 20px;
            display: flex;
            align-items: flex-start;
            gap: 14px;
          }
          .value-card:first-child { border-radius: 12px 12px 0 0; }
          .value-card:last-child  { border-radius: 0 0 12px 12px; border-bottom: 1px solid var(--border); }
          .value-icon { font-size: 22px; margin-bottom: 0; flex-shrink: 0; margin-top: 2px; }
          .value-title { margin-bottom: 3px; }

          /* Team — stacked list with avatar on left */
          .team-grid { grid-template-columns: 1fr; gap: 0; }
          .team-card {
            border-radius: 0;
            border-bottom: none;
            text-align: left;
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .team-card:first-child { border-radius: 12px 12px 0 0; }
          .team-card:last-child  { border-radius: 0 0 12px 12px; border-bottom: 1px solid var(--border); }
          .team-avatar {
            height: 72px;
            width: 72px;
            min-width: 72px;
            font-size: 30px;
            border-radius: 0;
          }
          .team-info { padding: 0 16px; text-align: left; }
          .team-name { font-size: 15px; }
        }
      `}</style>
    </div>
  )
}