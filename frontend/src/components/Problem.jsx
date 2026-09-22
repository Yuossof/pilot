export default function Problem({ t }) {
  return (
    <section className="problem">
      <div className="wrap">
        <div className="section-head">
          <div className="tag">{t.problem.tag}</div>
          <h2 className="h-sec">{t.problem.title}</h2>
        </div>
        <div className="problem-grid">
          {t.problem.items.map((item, i) => (
            <div className="prob-card" key={i}>
              <div className="x">✕</div>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
