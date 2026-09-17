import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import CheckOutForm, { CheckOutReceipt } from "../components/CheckOutForm";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { checkOutVehicle, searchVehicles } from "../services/parking.service";

export default function CheckOut() {
  const [plate, setPlate] = useState("");
  const [searching, setSearching] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!plate.trim()) {
      setError("Please enter a license plate number.");
      return;
    }

    setSearching(true);
    setError("");
    setActiveSession(null);
    setReceipt(null);
    setHasSearched(true);

    try {
      const res = await searchVehicles(plate.trim());
      // search returns array or object. If array, filter for active session or pick first active
      const list = Array.isArray(res) ? res : res?.sessions || (res?.data ? [res.data] : res ? [res] : []);
      const active = list.find((s) => (s.status || "").toLowerCase() === "active") || (list[0]?.status === "active" ? list[0] : null);

      if (!active) {
        setError(`No active parking session found for plate "${plate.trim().toUpperCase()}".`);
      } else {
        setActiveSession(active);
      }
    } catch (err) {
      setError(err.message || "Failed to search vehicle.");
    } finally {
      setSearching(false);
    }
  };

  const handleConfirmCheckOut = async () => {
    if (!activeSession) return;
    const targetPlate = activeSession.plateNumber || activeSession.plate || plate.trim();

    setCheckoutLoading(true);
    setError("");

    try {
      const res = await checkOutVehicle(targetPlate);
      // res contains updated session or receipt object
      const result = res.session || res.receipt || res.data || res;
      setReceipt(result);
      setActiveSession(null);
    } catch (err) {
      setError(err.message || "Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleReset = () => {
    setPlate("");
    setActiveSession(null);
    setReceipt(null);
    setError("");
    setHasSearched(false);
  };

  return (
    <DashboardLayout title="Vehicle Check-Out">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Check Out Vehicle</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search for an active vehicle by license plate to process checkout and calculate parking fee.
          </p>
        </div>

        {receipt ? (
          <div className="space-y-4">
            <CheckOutReceipt receipt={receipt} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Process Another Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="surface p-5">
              <SearchBar
                value={plate}
                onChange={setPlate}
                onSubmit={handleSearch}
                loading={searching}
                placeholder="Enter license plate (e.g. RJ14 AB 1234)"
                buttonLabel="Find Vehicle"
              />
            </div>

            {error && <ErrorMessage message={error} />}

            {searching && <LoadingSpinner label="Searching for active vehicle..." />}

            {activeSession && (
              <div className="space-y-4">
                <VehicleCard
                  session={activeSession}
                  action={
                    <CheckOutForm onConfirm={handleConfirmCheckOut} loading={checkoutLoading} />
                  }
                />
              </div>
            )}

            {!searching && !activeSession && !error && hasSearched && (
              <EmptyState
                title="No Active Vehicle Found"
                description="Double-check the plate number or check the parking history."
              />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
