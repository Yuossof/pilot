const WHATSAPP_NUMBER = "201149811263"; // international format, no leading zero/plus
const PHONE_TEL = "+201149811263";

export default function FloatingDock({ lang, chatOpen, onToggleChat }) {
  const waText =
    lang === "ar" ? "عايز أعرف أكتر عن Pilot" : "I'd like to know more about Pilot";

  return (
    <div className="dock">
      <button className="dock-btn chat" type="button" onClick={onToggleChat} aria-label="Chat">
        <span className="dock-label">{lang === "ar" ? "كلم مستر ليفو" : "Chat with Mr. Livo"}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="#04120D" strokeWidth="2">
          <path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4A9 9 0 0 1 8 19l-5 1 1.4-4.2A8.4 8.4 0 1 1 21 11.5z" />
        </svg>
      </button>

      <a
        className="dock-btn wa"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <span className="dock-label">{lang === "ar" ? "كلمنا واتساب" : "WhatsApp us"}</span>
        <svg viewBox="0 0 24 24" fill="#04120D">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4a.5.5 0 0 0 0-.4c-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 1.9 2.9 4.6 4a15.6 15.6 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1c.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3z" />
        </svg>
      </a>

      <a className="dock-btn call" href={`tel:${PHONE_TEL}`} aria-label="Call">
        <span className="dock-label">{lang === "ar" ? "اتصل دلوقتي" : "Call now"}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.8 2.1z" />
        </svg>
      </a>
    </div>
  );
}
