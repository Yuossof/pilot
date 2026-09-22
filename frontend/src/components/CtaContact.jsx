import ContactForm from "./ContactForm.jsx";

export default function CtaContact({ t, lang }) {
  return (
    <section className="cta-section" id="contact">
      <div className="wrap cta-grid">
        <div className="cta-left">
          <div className="kicker">{t.contact.kicker}</div>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.lead}</p>
          <div className="contact-line">
            <div className="ic">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00B383" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z" />
              </svg>
            </div>
            <a href="tel:+201149811263" dir="ltr">
              {t.contact.phone}
            </a>
          </div>
          <div className="contact-line">
            <div className="ic">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00B383" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M4 6l8 7 8-7" />
              </svg>
            </div>
            <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
          </div>
          <div className="contact-line">
            <div className="ic">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#00B383" strokeWidth="2">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <span>{t.contact.address}</span>
          </div>
        </div>

        <div>
          <ContactForm t={t} lang={lang} />
        </div>
      </div>
    </section>
  );
}
