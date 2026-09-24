import Logo from "./Logo.jsx";
import logo from "../assets/logo.png";

// Placeholder profile URLs — replace with the real Pilot social links.
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/PilotEstate",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/pilotestate/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" />
      </svg>
    ),
  },
  // {
  //   label: "LinkedIn",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2 3.76-2 4 0 4.75 2.6 4.75 6.1V21H17v-5.6c0-1.34-.02-3.07-1.88-3.07-1.88 0-2.17 1.46-2.17 2.97V21H9z" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "TikTok",
  //   href: "#",
  //   icon: (
  //     <svg viewBox="0 0 24 24" fill="currentColor">
  //       <path d="M16.5 3c.4 2.2 1.8 3.6 4 3.9v2.6c-1.4 0-2.7-.4-3.9-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.2 2.9V3h2.5z" />
  //     </svg>
  //   ),
  // },
];

export default function Footer({ t }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img className="logo" src={logo} alt="pilot" />

          </div>
          <div className="foot-tag">{t.footer.tag}</div>
          <div className="social-row">
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t.footer.copyright}</span>
          <span dir="ltr">01149811263 · Info@pilot.estate</span>
        </div>
      </div>
    </footer>
  );
}
