import { Receipt } from "lucide-react";
import { formatDateTime, formatDuration, formatFee, formatSpot } from "../utils/formatters";

export function CheckOutReceipt({ receipt }) {
  if (!receipt) return null;
  const checkIn = receipt.checkInTime || receipt.checkIn || receipt.entryTime;
  const checkOut = receipt.checkOutTime || receipt.checkOut || receipt.exitTime;

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-5 py-3">
        <Receipt className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-wide">Parking Receipt</p>
      </div>

      <dl className="divide-y divide-border px-5">
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-muted-foreground">Plate Number</dt>
          <dd className="font-mono font-semibold tracking-wider">
            {receipt.plateNumber || receipt.plate || "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-muted-foreground">Spot</dt>
          <dd className="font-medium">{formatSpot(receipt)}</dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-muted-foreground">Check-in Time</dt>
          <dd className="font-medium">{formatDateTime(checkIn)}</dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-muted-foreground">Check-out Time</dt>
          <dd className="font-medium">{formatDateTime(checkOut)}</dd>
        </div>
        <div className="flex items-center justify-between py-3">
          <dt className="text-sm text-muted-foreground">Duration</dt>
          <dd className="font-medium">
            {receipt.duration ?? formatDuration(checkIn, checkOut)}
          </dd>
        </div>
      </dl>

      <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
        <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
          Total Fee
        </span>
        <span className="text-3xl font-bold tabular-nums">
          {formatFee(receipt.fee ?? receipt.amount ?? receipt.totalFee)}
        </span>
      </div>
    </div>
  );
}

export default function CheckOutForm({ onConfirm, loading }) {
  return (
    <button
      type="button"
      onClick={onConfirm}
      disabled={loading}
      className="w-full rounded-lg bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-60"
    >
      {loading ? "Processing checkout..." : "Check Out"}
    </button>
  );
}
