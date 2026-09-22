import CountUp from "./CountUp.jsx";

export default function Hero({ t, lang }) {
  const rows =
    lang === "ar"
      ? [
          { tt: "تذكرة صيانة #204", sub: "متوزعة · جاري التنفيذ", pill: "شغالة", cls: "wait" },
          { tt: "جولة أمن — برج B", sub: "خلصت 09:40", pill: "تمت", cls: "ok" },
          { tt: "إعلان للسكان", sub: "اتبعت لـ 1,240 وحدة", pill: "اتبعت", cls: "ok" },
        ]
      : [
          { tt: "Maintenance ticket #204", sub: "Assigned · in progress", pill: "Active", cls: "wait" },
          { tt: "Security round — Tower B", sub: "Completed 09:40", pill: "Done", cls: "ok" },
          { tt: "Resident announcement", sub: "Sent to 1,240 units", pill: "Sent", cls: "ok" },
        ];

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="kicker">{t.hero.kicker}</div>
          <h1 className="h-hero">
            {t.hero.h1a}
            <br />
            {t.hero.h1b}
            <br />
            <span className="accent">{t.hero.h1c}</span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="hero-ctas">
            <a href="#contact" className="cta-btn lg">
              {t.hero.ctaPrimary}
            </a>
            <a href="#solution" className="cta-btn lg ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="hero-stats">
            {t.hero.stats.map((s, i) => (
              <div className="stat" key={i}>
                {s.target != null ? <CountUp target={s.target} suffix={s.suffix} /> : <b>{s.n}</b>}
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="device">
            <div className="device-bar">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="toggle-mini">
                <i></i>
              </div>
            </div>
            <div className="bars">
              {[38, 62, 48, 80, 56, 70, 44, 90].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }}></i>
              ))}
            </div>
            {rows.map((r, i) => (
              <div className="row-card" key={i} style={i === rows.length - 1 ? { marginBottom: 0 } : undefined}>
                <div className="rc-l">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00B383" strokeWidth="2">
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                  </div>
                  <div>
                    <div className="tt">{r.tt}</div>
                    <div className="sub">{r.sub}</div>
                  </div>
                </div>
                <span className={`pill ${r.cls}`}>{r.pill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
