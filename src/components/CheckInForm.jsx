import { useState } from "react";
import { useGarages } from "../context/GarageContext";

const VEHICLE_TYPES = [
  { value: "compact", label: "Compact" },
  { value: "standard", label: "Standard" },
  { value: "ev", label: "EV" },
];

const fieldClass =
  "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export default function CheckInForm({ onSubmit, loading }) {
  const { garages, garageId, selectGarage } = useGarages();
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("standard");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!garageId) return setLocalError("Please select a garage first.");
    if (!plateNumber.trim()) return setLocalError("Please enter a valid license plate.");
    setLocalError("");
    onSubmit({ garageId, plateNumber: plateNumber.trim().toUpperCase(), vehicleType });
  };

  return (
    <form onSubmit={handleSubmit} className="surface space-y-5 p-5 sm:p-6">
      <div>
        <label htmlFor="garage" className="mb-1.5 block text-sm font-medium">
          Garage
        </label>
        <select
          id="garage"
          value={garageId ?? ""}
          onChange={(e) => selectGarage(e.target.value)}
          className={fieldClass}
        >
          {garages.length === 0 && <option value="">No garages available</option>}
          {garages.map((g) => (
            <option key={g._id ?? g.id} value={g._id ?? g.id}>
              {g.name ?? "Garage"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="plate" className="mb-1.5 block text-sm font-medium">
          License Plate
        </label>
        <input
          id="plate"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
          placeholder="RJ14 AB 1234"
          className={`${fieldClass} font-mono uppercase tracking-wider placeholder:font-sans placeholder:tracking-normal`}
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium">Vehicle Type</span>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLE_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setVehicleType(t.value)}
              aria-pressed={vehicleType === t.value}
              className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                vehicleType === t.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {localError && <p className="text-sm font-medium text-destructive">{localError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Checking vehicle in..." : "Check In Vehicle"}
      </button>
    </form>
  );
}
