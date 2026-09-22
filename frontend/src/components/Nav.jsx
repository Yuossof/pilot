import logo from "../assets/logo.png";

export default function Nav({ t, lang, onToggleLang }) {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <div className="brand">
          <img className="logo" src={logo} alt="pilot"/>
        </div>
        <div className="nav-right">
          <span className="nav-phone">📞 {t.nav.phone}</span>
          <button className="lang-btn" onClick={onToggleLang} type="button">
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <a href="#contact" className="cta-btn">
            {t.nav.demo}
          </a>
        </div>
      </div>
    </header>
  );
}
