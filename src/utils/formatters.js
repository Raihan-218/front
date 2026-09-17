export function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(from, to) {
  if (!from) return "—";
  const start = new Date(from).getTime();
  const end = to ? new Date(to).getTime() : Date.now();
  if (Number.isNaN(start) || Number.isNaN(end)) return "—";
  const mins = Math.max(0, Math.round((end - start) / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  return `${h}h ${m}m`;
}

export function formatFee(value) {
  if (value === null || value === undefined || value === "") return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatVehicleType(type) {
  if (!type) return "—";
  const t = String(type).toLowerCase();
  if (t === "ev") return "EV";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function formatSpot(session) {
  if (!session) return "—";
  const spot = session.spot || session.parkingSpot || {};
  const number = session.spotNumber || spot.spotNumber || spot.number || spot.code;
  const level = session.level ?? spot.level ?? spot.floor;
  if (!number && level === undefined) return "—";
  return level !== undefined && level !== null
    ? `Level ${level} · ${number ?? "—"}`
    : String(number);
}

export function formatStatus(status) {
  if (!status) return "—";
  const s = String(status).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
