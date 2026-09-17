import StatusBadge from "./StatusBadge";
import {
  formatDateTime,
  formatFee,
  formatSpot,
  formatVehicleType,
} from "../utils/formatters";

const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground";
const td = "px-4 py-3 text-sm whitespace-nowrap";

export default function ParkingTable({ sessions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] border-collapse">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            <th className={th}>Plate</th>
            <th className={th}>Vehicle Type</th>
            <th className={th}>Spot</th>
            <th className={th}>Status</th>
            <th className={th}>Check-in</th>
            <th className={th}>Check-out</th>
            <th className={`${th} text-right`}>Fee</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s, i) => {
            const checkIn = s.checkInTime || s.checkIn || s.entryTime;
            const checkOut = s.checkOutTime || s.checkOut || s.exitTime;
            return (
              <tr
                key={s._id ?? s.id ?? i}
                className="border-b border-border last:border-0 hover:bg-muted/40"
              >
                <td className={`${td} font-mono font-semibold tracking-wide`}>
                  {s.plateNumber || s.plate || "—"}
                </td>
                <td className={td}>{formatVehicleType(s.vehicleType)}</td>
                <td className={td}>{formatSpot(s)}</td>
                <td className={td}>
                  <StatusBadge status={s.status || (checkOut ? "completed" : "active")} />
                </td>
                <td className={`${td} text-muted-foreground`}>{formatDateTime(checkIn)}</td>
                <td className={`${td} text-muted-foreground`}>
                  {checkOut ? formatDateTime(checkOut) : "—"}
                </td>
                <td className={`${td} text-right font-semibold tabular-nums`}>
                  {formatFee(s.fee ?? s.amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
