import StatusBadge from "./StatusBadge";
import {
  formatDateTime,
  formatDuration,
  formatFee,
  formatSpot,
  formatVehicleType,
} from "../utils/formatters";

export default function VehicleCard({ session, action }) {
  if (!session) return null;
  const plate = session.plateNumber || session.plate || "—";
  const checkIn = session.checkInTime || session.checkIn || session.entryTime;
  const checkOut = session.checkOutTime || session.checkOut || session.exitTime;

  return (
    <div className="surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xl font-bold tracking-wider text-foreground">
            {plate}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatVehicleType(session.vehicleType)}
          </p>
        </div>
        <StatusBadge status={session.status || (checkOut ? "completed" : "active")} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">Spot</dt>
          <dd className="font-semibold">{formatSpot(session)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Check-in</dt>
          <dd className="font-medium">{formatDateTime(checkIn)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Check-out</dt>
          <dd className="font-medium">{checkOut ? formatDateTime(checkOut) : "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-medium">{formatDuration(checkIn, checkOut)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Fee</dt>
          <dd className="font-semibold">{formatFee(session.fee ?? session.amount)}</dd>
        </div>
      </dl>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
