function IconHome() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00B383" strokeWidth="2">
      <path d="M3 10l9-7 9 7" />
      <path d="M5 9v10h14V9" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#00B383" strokeWidth="2">
      <path d="M12 2l3 5 5 1-4 4 1 5-5-3-5 3 1-5-4-4 5-1z" />
    </svg>
  );
}

export default function Solution({ t }) {
  const cards = [
    { icon: <IconHome />, name: t.solution.community.name, desc: t.solution.community.desc, points: t.solution.community.points },
    { icon: <IconGear />, name: t.solution.fm.name, desc: t.solution.fm.desc, points: t.solution.fm.points },
  ];

  return (
    <section className="solution" id="solution">
      <div className="wrap">
        <div className="section-head">
          <div className="tag">{t.solution.tag}</div>
          <h2 className="h-sec">
            {t.solution.titleA}
            <br />
            {t.solution.titleB}
          </h2>
        </div>
        <div className="sol-grid">
          {cards.map((c, i) => (
            <div className="sol-card" key={i}>
              <div className="sol-icon">{c.icon}</div>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <ul>
                {c.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
