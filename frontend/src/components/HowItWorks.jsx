export default function HowItWorks({ t }) {
  return (
    <section className="how">
      <div className="wrap">
        <div className="section-head">
          <div className="tag">{t.how.tag}</div>
          <h2 className="h-sec">
            {t.how.titleA}
            <br />
            {t.how.titleB}
          </h2>
        </div>
        <div className="how-grid">
          {t.how.steps.map((s, i) => (
            <div className="how-card" key={i}>
              <div className="how-num">{i + 1}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
