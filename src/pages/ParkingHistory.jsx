import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/DashboardLayout";
import SortControls from "../components/SortControls";
import ParkingTable from "../components/ParkingTable";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { listSessions } from "../services/parking.service";

export default function ParkingHistory() {
  const [sessions, setSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("checkInTime");
  const [order, setOrder] = useState("desc");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {
        page,
        limit,
        sort,
        order,
      };
      if (status) params.status = status;

      const res = await listSessions(params);

      // Handle various pagination responses from backend
      let list = [];
      let total = 1;

      if (Array.isArray(res)) {
        list = res;
        total = 1;
      } else if (res && typeof res === "object") {
        list = res.sessions || res.data || res.docs || [];
        total = res.totalPages || res.pages || Math.ceil((res.total || res.count || list.length) / limit) || 1;
      }

      setSessions(list);
      setTotalPages(Math.max(1, total));
    } catch (err) {
      setError(err.message || "Unable to load parking session history.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, sort, order, status]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleFilterChange = (updates) => {
    if (updates.sort !== undefined) setSort(updates.sort);
    if (updates.order !== undefined) setOrder(updates.order);
    if (updates.status !== undefined) setStatus(updates.status);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <DashboardLayout title="Parking History">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Parking History</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete log of active and completed parking sessions.
            </p>
          </div>

          <SortControls
            sort={sort}
            order={order}
            status={status}
            onChange={handleFilterChange}
          />
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchHistory} />}

        {loading ? (
          <LoadingSpinner label="Loading parking history..." />
        ) : sessions.length === 0 ? (
          <EmptyState
            title="No Parking Sessions"
            description={
              status
                ? `No ${status} parking sessions found.`
                : "No parking session records available yet."
            }
          />
        ) : (
          <div className="surface overflow-hidden">
            <ParkingTable sessions={sessions} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
