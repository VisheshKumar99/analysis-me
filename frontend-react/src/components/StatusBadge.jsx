import { CheckCircle2, Loader2, Clock } from "lucide-react";

const MAP = {
  analysing: { label: "Analysing", cls: "status--analysing", Icon: Loader2, spin: true },
  queued: { label: "Queued", cls: "status--queued", Icon: Clock, spin: false },
  completed: { label: "Completed", cls: "status--completed", Icon: CheckCircle2, spin: false },
};

export default function StatusBadge({ status = "queued" }) {
  const { label, cls, Icon, spin } = MAP[status] ?? MAP.queued;
  return (
    <span className={`status-badge ${cls}`}>
      <Icon size={13} className={spin ? "spin" : ""} />
      {label}
    </span>
  );
}
