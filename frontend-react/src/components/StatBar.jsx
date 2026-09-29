import { motion } from "framer-motion";

export default function StatBar({ label, value, delay = 0 }) {
  return (
    <div className="stat-bar">
      <div className="stat-bar__head">
        <span>{label}</span>
        <span className="stat-bar__val">{value}%</span>
      </div>
      <div className="stat-bar__track">
        <motion.div
          className="stat-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}
