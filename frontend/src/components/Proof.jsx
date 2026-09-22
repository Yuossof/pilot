import CountUp from "./CountUp.jsx";

export default function Proof({ t }) {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof-top">
          <div className="tag">{t.proof.tag}</div>
          <div className="logos-row">
            {t.proof.clients.map((c, i) => (
              <div className="logo-chip" key={i}>
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className="proof-stats">
          {t.proof.stats.map((s, i) => (
            <div className="pstat" key={i}>
              {s.target != null ? <CountUp target={s.target} suffix={s.suffix} /> : <b>{s.n}</b>}
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
