import { useState } from "react";

const initialForm = { name: "", company: "", phone: "", email: "", message: "" };

export default function ContactForm({ t, lang }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang, source: "landing-page" }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <form className="leadform">
        <div className="success-box">
          <div className="tick">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#00B383" strokeWidth="2.4">
              <path d="M4 12l6 6L20 6" />
            </svg>
          </div>
          <h3>{t.contact.form.successTitle}</h3>
          <p>{t.contact.form.successBody}</p>
        </div>
      </form>
    );
  }

  return (
    <form className="leadform" onSubmit={handleSubmit}>
      <div className="f-two">
        <div className="f-row">
          <label>{t.contact.form.name}</label>
          <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="f-row">
          <label>{t.contact.form.company}</label>
          <input type="text" required value={form.company} onChange={(e) => update("company", e.target.value)} />
        </div>
      </div>
      <div className="f-two">
        <div className="f-row">
          <label>{t.contact.form.phone}</label>
          <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="f-row">
          <label>{t.contact.form.email}</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>
      <div className="f-row">
        <label>{t.contact.form.message}</label>
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} />
      </div>
      <button type="submit" className="submit-btn" disabled={status === "sending"}>
        {status === "sending" ? "…" : t.contact.form.submit}
      </button>
      {status === "error" && <div className="form-error">{t.contact.form.error}</div>}
      <div className="form-note">{t.contact.form.note}</div>
    </form>
  );
}
