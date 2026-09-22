const ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M9 12h6M12 9v6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21c0-4-3.6-6-8-6s-8 2-8 6" /><circle cx="12" cy="7" r="4" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12l6 6L20 6" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20V10M12 20V4M20 20v-7" /></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /></svg>,
];

export default function Benefits({ t }) {
  return (
    <section className="benefits">
      <div className="wrap">
        <div className="section-head">
          <div className="tag">{t.benefits.tag}</div>
          <h2 className="h-sec">
            {t.benefits.titleA}
            <br />
            {t.benefits.titleB}
          </h2>
        </div>
        <div className="benefits-grid">
          {t.benefits.items.map((b, i) => (
            <div className="ben-card" key={i}>
              <div className="ben-icon">{ICONS[i]}</div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
