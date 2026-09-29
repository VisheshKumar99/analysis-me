import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/chat", label: "Chat" },
];

export default function Navbar() {
  return (
    <motion.header
      className="navbar glass"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <NavLink to="/" className="brand">
        <span className="brand__mark">
          <Sparkles size={18} />
        </span>
        <span className="brand__text">
          analysis<span className="gradient-text">.me</span>
        </span>
      </NavLink>

      <nav className="navbar__links">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `nav-link${isActive ? " nav-link--active" : ""}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__right">
        <span className="pill">
          <span className="dot-live" /> AI online
        </span>
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
