import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  MapPin,
  Mail,
  Clock,
  BadgeCheck,
  BarChart3,
  Globe,
  ThumbsUp,
} from "lucide-react";
import ScoreRing from "../components/ScoreRing.jsx";
import StatBar from "../components/StatBar.jsx";
import { candidate, chatSeed, resumes } from "../data/mock.js";
import "./chat.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export default function Chat() {
  const [active, setActive] = useState(resumes[2].id);
  const [messages, setMessages] = useState(chatSeed);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const next = [...messages, { id: Date.now(), role: "user", text }];
    setMessages(next);
    setDraft("");
    // Simulated AI reply (UI-only phase).
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Analysing the resume against your question… (this will be answered by the RAG backend once connected).",
        },
      ]);
      requestAnimationFrame(() =>
        scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" })
      );
    }, 500);
  };

  return (
    <motion.div
      className="chat"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Resume sidebar */}
      <aside className="glass chat__sidebar">
        <span className="eyebrow">Candidates</span>
        <ul className="reslist">
          {resumes.map((r) => (
            <li key={r.id}>
              <button
                className={`reslist__item${active === r.id ? " reslist__item--active" : ""}`}
                onClick={() => setActive(r.id)}
              >
                <span className="reslist__avatar">{r.name.charAt(0)}</span>
                <span className="reslist__body">
                  <span className="reslist__name">{r.name}</span>
                  <span className="reslist__role">{r.role}</span>
                </span>
                <span className="reslist__match">{r.match}%</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Center: details + chat */}
      <section className="chat__center">
        <div className="glass card-details">
          <div className="card-details__top">
            <div className="card-details__avatar">{candidate.name.charAt(0)}</div>
            <div className="card-details__id">
              <h2>{candidate.name}</h2>
              <p>{candidate.role}</p>
            </div>
            <span className="globe" aria-hidden="true">
              <Globe size={26} />
            </span>
          </div>
          <div className="card-details__meta">
            <span><MapPin size={14} /> {candidate.location}</span>
            <span><Clock size={14} /> {candidate.experience}</span>
            <span><Mail size={14} /> {candidate.email}</span>
          </div>
          <div className="chips">
            {candidate.skills.map((s) => (
              <span key={s} className="pill">{s}</span>
            ))}
          </div>
        </div>

        <div className="glass card-chat">
          <div className="card-chat__head">
            <span className="panel__icon"><Sparkles size={16} /></span>
            <div>
              <h2>Chat on resume</h2>
              <p className="panel__sub">Ask anything about this candidate</p>
            </div>
          </div>

          <div className="messages" ref={scrollRef}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                className={`msg msg--${m.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {m.role === "ai" && (
                  <span className="msg__avatar"><Sparkles size={13} /></span>
                )}
                <p className="msg__bubble">{m.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="composer">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about skills, experience, red flags…"
            />
            <button className="composer__send" onClick={send} aria-label="Send">
              <Send size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Right: analytics */}
      <aside className="glass chat__analytics">
        <div className="analytics__ring">
          <ScoreRing value={candidate.match} label="matching" />
        </div>

        <div className="analytics__breakdown">
          <div className="analytics__head">
            <BarChart3 size={15} /> <span>Fit breakdown</span>
          </div>
          {candidate.breakdown.map((b, i) => (
            <StatBar key={b.label} label={b.label} value={b.value} delay={0.2 + i * 0.1} />
          ))}
        </div>

        <div className="suggestion">
          <span className="suggestion__label">
            <ThumbsUp size={14} /> My suggestion
          </span>
          <span className="suggestion__verdict">
            <BadgeCheck size={16} /> {candidate.verdict}
          </span>
        </div>
      </aside>
    </motion.div>
  );
}
