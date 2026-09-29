import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  Briefcase,
  ArrowRight,
  Save,
  Cpu,
  Zap,
  Lock,
  Check,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge.jsx";
import { resumes } from "../data/mock.js";
import "./home.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 },
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [jd, setJd] = useState("");
  const [jdSaved, setJdSaved] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Resume upload is gated: a job description must be saved first.
  const uploadLocked = !jdSaved;
  const canSaveJd = jd.trim().length > 0;

  const addFiles = (list) => {
    if (uploadLocked) return;
    const pdfs = Array.from(list)
      .filter((f) => f.type === "application/pdf")
      .map((f) => ({ name: f.name, size: (f.size / 1024).toFixed(0) + " KB" }));
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const saveJd = () => {
    if (!canSaveJd) return;
    setJdSaved(true);
  };

  return (
    <motion.div
      className="home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* <motion.header className="home__hero" variants={item}>
     
      </motion.header> */}

      <div className="home__grid">
        {/* Left column: inputs */}
        <div className="home__col">
          {/* Step 1 — Job description (required first) */}
          <motion.section className="glass panel" variants={item}>
            <div className="panel__head">
              <span className="panel__icon">
                <Briefcase size={18} />
              </span>
              <div>
                <h2>
                  <span className="step-num">1</span> Job description
                </h2>
                <p className="panel__sub">Add this before uploading resumes</p>
              </div>
              {jdSaved && (
                <span className="pill panel__badge status--completed">
                  <Check size={12} /> Saved
                </span>
              )}
            </div>
            <textarea
              className="jd-input"
              rows={6}
              placeholder="Paste the role, responsibilities and must-have skills…"
              value={jd}
              onChange={(e) => {
                setJd(e.target.value);
                if (jdSaved) setJdSaved(false); // re-confirm after edits
              }}
            />
            <div className="panel__foot">
              <span className="jd-count">{jd.length} chars</span>
              <button
                className="btn btn-primary"
                onClick={saveJd}
                disabled={!canSaveJd}
              >
                {jdSaved ? <Check size={16} /> : <Save size={16} />}
                {jdSaved ? "Saved" : "Save & analyse"}
              </button>
            </div>
          </motion.section>

          {/* Step 2 — Upload resumes (locked until JD saved) */}
          <motion.section
            className={`glass panel${uploadLocked ? " panel--locked" : ""}`}
            variants={item}
          >
            <div className="panel__head">
              <span className="panel__icon">
                {uploadLocked ? <Lock size={18} /> : <UploadCloud size={18} />}
              </span>
              <div>
                <h2>
                  <span className="step-num">2</span> Upload resumes
                </h2>
                <p className="panel__sub">
                  {uploadLocked
                    ? "Locked — save a job description first"
                    : "PDF files, drag or browse"}
                </p>
              </div>
            </div>

            <label
              className={`dropzone${dragging ? " dropzone--active" : ""}${
                uploadLocked ? " dropzone--locked" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                if (uploadLocked) return;
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                addFiles(e.dataTransfer.files);
              }}
              aria-disabled={uploadLocked}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                multiple
                hidden
                disabled={uploadLocked}
                onChange={(e) => addFiles(e.target.files)}
              />
              {uploadLocked ? (
                <>
                  <div className="dropzone__ring dropzone__ring--locked">
                    <Lock size={24} />
                  </div>
                  <p className="dropzone__title">Upload locked</p>
                  <p className="dropzone__hint">
                    Add a job description above to unlock
                  </p>
                </>
              ) : (
                <>
                  <div className="dropzone__ring">
                    <UploadCloud size={26} />
                  </div>
                  <p className="dropzone__title">
                    Drop PDFs here or <span className="gradient-text">browse</span>
                  </p>
                  <p className="dropzone__hint">Multiple resumes supported</p>
                </>
              )}
            </label>

            {files.length > 0 && (
              <ul className="filelist">
                {files.map((f, i) => (
                  <motion.li
                    key={f.name + i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <FileText size={15} />
                    <span className="filelist__name">{f.name}</span>
                    <span className="filelist__size">{f.size}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.section>
        </div>

        {/* Right column: pipeline */}
        <motion.section className="glass panel panel--fill" variants={item}>
          <div className="panel__head">
            <span className="panel__icon">
              <Cpu size={18} />
            </span>
            <div>
              <h2>Analysis pipeline</h2>
              <p className="panel__sub">{resumes.length} resumes in queue</p>
            </div>
            <span className="pill panel__badge">
              <Zap size={12} /> Live
            </span>
          </div>

          <ul className="pipeline">
            {resumes.map((r, i) => (
              <motion.li
                key={r.id}
                className="pipeline__row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 4 }}
                onClick={() => navigate("/chat")}
              >
                <div className="pipeline__avatar">{r.name.charAt(0)}</div>
                <div className="pipeline__info">
                  <span className="pipeline__name">{r.name}</span>
                  <span className="pipeline__role">{r.role}</span>
                </div>
                <div className="pipeline__meta">
                  <StatusBadge status={r.status} />
                  <span className="pipeline__match">{r.match}%</span>
                </div>
                <ArrowRight size={16} className="pipeline__arrow" />
              </motion.li>
            ))}
          </ul>

          <button className="btn btn-ghost pipeline__cta" onClick={() => navigate("/chat")}>
            Open analysis workspace <ArrowRight size={16} />
          </button>
        </motion.section>
      </div>
    </motion.div>
  );
}
