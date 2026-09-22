import { useEffect, useRef, useState } from "react";

const GREET = {
  ar: "أهلاً بيك! أنا مستر ليفو 👋 مساعد Pilot الذكي. تحب تعرف إيه عن نظامنا لإدارة العقارات؟",
  en: "Hey there! I'm Mr. Livo 👋 Pilot's AI assistant. What would you like to know about our real-estate operating system?",
};
const QUICK = {
  ar: ["إيه هو Pilot؟", "الأسعار كام؟", "عايز أحجز عرض"],
  en: ["What is Pilot?", "How much does it cost?", "Book a demo"],
};

export default function ChatWidget({ lang, open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);
  const greeted = useRef(false);

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true;
      setMessages([{ role: "assistant", content: GREET[lang] }]);
    }
  }, [open, lang]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, sending]);

  async function send(text) {
    const clean = text.trim();
    if (!clean || sending) return;
    const next = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "…" }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            lang === "ar"
              ? "حصل خطأ بسيط، جرب تاني أو كلمنا على واتساب."
              : "Something went wrong — please try again or message us on WhatsApp.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`chat-panel${open ? " open" : ""}`}>
      <div className="chat-head">
        <div className="chat-avatar">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00B383" strokeWidth="2">
            <path d="M12 2l3 5 5 1-4 4 1 5-5-3-5 3 1-5-4-4 5-1z" />
          </svg>
          <span className="dot"></span>
        </div>
        <div>
          <b>{lang === "ar" ? "مستر ليفو — مساعد ذكي" : "Mr. Livo — AI Assistant"}</b>
          <small>{lang === "ar" ? "اسألني أي حاجة عن Pilot" : "Ask me anything about Pilot"}</small>
        </div>
        <button className="chat-close" onClick={onClose} type="button" aria-label="Close">
          ✕
        </button>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div className={`msg ${m.role === "user" ? "user" : "bot"}`} key={i}>
            {m.content}
          </div>
        ))}
        {sending && (
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="chat-quick">
          {QUICK[lang].map((q) => (
            <button key={q} type="button" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" aria-label="Send" disabled={sending}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#04120D" strokeWidth="2.4">
            <path d="M4 12l16-8-6 16-3-6-7-2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
