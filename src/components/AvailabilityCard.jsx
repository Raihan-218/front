export default function AvailabilityCard({ type, total = 0, available = 0, occupied = 0 }) {
  const isEv = String(type).toLowerCase() === "ev";
  const label = isEv ? "EV Parking" : `${type} Parking`;
  const pct = total > 0 ? Math.round((available / total) * 100) : 0;

  return (
    <div
      className={`surface p-5 ${isEv ? "ring-1 ring-ev/30" : ""}`}
      aria-label={`${label} availability`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </h3>
        {isEv && (
          <span className="rounded-full bg-ev/12 px-2 py-0.5 text-xs font-semibold text-ev">
            EV
          </span>
        )}
      </div>

      <p
        className={`mt-3 text-3xl font-bold tabular-nums ${isEv ? "text-ev" : "text-foreground"}`}
      >
        {available}
        <span className="ml-1.5 text-sm font-medium text-muted-foreground">available</span>
      </p>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${isEv ? "bg-ev" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-muted-foreground">Occupied</dt>
          <dd className="font-semibold tabular-nums">{occupied}</dd>
        </div>
        <div className="text-right">
          <dt className="text-muted-foreground">Total</dt>
          <dd className="font-semibold tabular-nums">{total}</dd>
        </div>
      </dl>

      {available === 0 && total > 0 && (
        <p className="mt-3 rounded-md bg-destructive/8 px-2.5 py-1.5 text-xs font-medium text-destructive">
          No {isEv ? "EV" : String(type).toLowerCase()} spots currently available.
        </p>
      )}
    </div>
  );
}
