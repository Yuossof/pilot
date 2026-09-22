import { useEffect, useState } from "react";
import { dict } from "./i18n.js";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Problem from "./components/Problem.jsx";
import Solution from "./components/Solution.jsx";
import Benefits from "./components/Benefits.jsx";
import Proof from "./components/Proof.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import CtaContact from "./components/CtaContact.jsx";
import Footer from "./components/Footer.jsx";
import FloatingDock from "./components/FloatingDock.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App() {
  const [lang, setLang] = useState("ar");
  const [chatOpen, setChatOpen] = useState(false);
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.body.className = lang === "ar" ? "lang-ar" : "lang-en";
  }, [lang, t.dir]);

  function toggleLang() {
    setLang((l) => (l === "ar" ? "en" : "ar"));
  }

  return (
    <>
      <Nav t={t} lang={lang} onToggleLang={toggleLang} />
      <Hero t={t} lang={lang} />
      <Problem t={t} />
      <Solution t={t} />
      <Benefits t={t} />
      <Proof t={t} />
      <HowItWorks t={t} />
      <CtaContact t={t} lang={lang} />
      <Footer t={t} />

      <ChatWidget lang={lang} open={chatOpen} onClose={() => setChatOpen(false)} />
      <FloatingDock lang={lang} chatOpen={chatOpen} onToggleChat={() => setChatOpen((o) => !o)} />
    </>
  );
}
