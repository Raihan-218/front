import { CheckCircle2, MapPin } from "lucide-react";
import { formatDateTime, formatVehicleType } from "../utils/formatters";

export default function ParkingSpotCard({ session }) {
  if (!session) return null;
  const spot = session.spot || session.parkingSpot || {};
  const spotNumber = session.spotNumber || spot.spotNumber || spot.number || spot.code || "—";
  const level = session.level ?? spot.level ?? spot.floor;
  const plate = session.plateNumber || session.plate || "—";
  const checkIn = session.checkInTime || session.checkIn || session.entryTime;

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-success/10 px-5 py-3">
        <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-wide text-success">
          Check-in successful
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Vehicle
          </p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider">{plate}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatVehicleType(session.vehicleType)}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Check-in time</dt>
              <dd className="font-medium">{formatDateTime(checkIn)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-semibold text-warning-foreground">Active</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl bg-primary px-6 py-5 text-center text-primary-foreground">
          <MapPin className="mx-auto h-5 w-5 opacity-80" aria-hidden="true" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide opacity-80">
            Assigned spot
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{spotNumber}</p>
          {level !== undefined && level !== null && (
            <p className="mt-1 text-sm font-medium opacity-90">Level {level}</p>
          )}
        </div>
      </div>
    </div>
  );
}
