import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import SearchBar from "../components/SearchBar";
import ParkingTable from "../components/ParkingTable";
import VehicleCard from "../components/VehicleCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { searchVehicles } from "../services/parking.service";

export default function ParkingSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a plate number to search.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const res = await searchVehicles(query.trim());
      const list = Array.isArray(res)
        ? res
        : res?.sessions || (res?.data ? (Array.isArray(res.data) ? res.data : [res.data]) : []);
      setResults(list);
    } catch (err) {
      setError(err.message || "Failed to search vehicles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Vehicle Search">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Search Vehicle</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search active and past parking records by full or partial license plate.
          </p>
        </div>

        <div className="surface p-5">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            loading={loading}
            placeholder="Search vehicle by plate number (e.g. RJ14)"
            buttonLabel="Search"
          />
        </div>

        {error && <ErrorMessage message={error} />}

        {loading && <LoadingSpinner label="Searching parking records..." />}

        {!loading && searched && results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Found {results.length} matching {results.length === 1 ? "record" : "records"}
              </p>
              <div className="flex gap-1.5 rounded-lg border border-input bg-card p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`rounded px-2.5 py-1 font-medium ${
                    viewMode === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Table View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={`rounded px-2.5 py-1 font-medium ${
                    viewMode === "cards" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Card View
                </button>
              </div>
            </div>

            {viewMode === "table" ? (
              <div className="surface overflow-hidden">
                <ParkingTable sessions={results} />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((session, idx) => (
                  <VehicleCard key={session._id || session.id || idx} session={session} />
                ))}
              </div>
            )}
          </div>
        )}

        {!loading && searched && results.length === 0 && !error && (
          <EmptyState
            title="No Matching Vehicles"
            description={`No parking sessions found matching license plate "${query.toUpperCase()}".`}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
