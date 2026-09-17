export default function StatusBadge({ status }) {
  const value = String(status || "").toLowerCase();
  const isActive = value === "active" || value === "parked" || value === "occupied";
  const styles = isActive
    ? "bg-warning/20 text-warning-foreground ring-warning/40"
    : "bg-success/15 text-success ring-success/30";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-warning" : "bg-success"}`}
        aria-hidden="true"
      />
      {isActive ? "Active" : "Completed"}
    </span>
  );
}
