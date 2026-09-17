import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import CheckInForm from "../components/CheckInForm";
import ParkingSpotCard from "../components/ParkingSpotCard";
import ErrorMessage from "../components/ErrorMessage";
import { checkInVehicle } from "../services/parking.service";

export default function CheckIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionData, setSessionData] = useState(null);

  const handleCheckIn = async (data) => {
    setLoading(true);
    setError("");
    setSessionData(null);

    try {
      const res = await checkInVehicle(data);
      // Backend may return session object directly or nested under res.data or res.session
      const session = res.session || res.data || res;
      setSessionData(session);
    } catch (err) {
      setError(err.message || "Failed to check in vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSessionData(null);
    setError("");
  };

  return (
    <DashboardLayout title="Vehicle Check-In">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Check In Vehicle</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Register a new vehicle arriving at the garage and assign a parking spot.
          </p>
        </div>

        {error && <ErrorMessage message={error} />}

        {sessionData ? (
          <div className="space-y-4">
            <ParkingSpotCard session={sessionData} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Check In Another Vehicle
              </button>
            </div>
          </div>
        ) : (
          <CheckInForm onSubmit={handleCheckIn} loading={loading} />
        )}
      </div>
    </DashboardLayout>
  );
}
