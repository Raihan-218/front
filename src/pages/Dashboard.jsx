import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  LogIn,
  LogOut,
  Search,
  History,
  CircleParking,
  CheckCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import AvailabilityCard from "../components/AvailabilityCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import { useGarages } from "../context/GarageContext";
import { getAvailability } from "../services/spot.service";

export default function Dashboard() {
  const { garageId, garages, loading: garagesLoading } = useGarages();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailability = useCallback(async () => {
    if (!garageId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getAvailability(garageId);
      // res can be array of spot types or an object { total, available, occupied, breakdown: [...] } or { compact: {...}, standard: {...}, ev: {...} }
      setData(res);
    } catch (err) {
      setError(err.message || "Unable to load parking spot availability.");
    } finally {
      setLoading(false);
    }
  }, [garageId]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Helper to normalize data format from backend
  const getSummary = () => {
    if (!data) return { total: 0, available: 0, occupied: 0, evTotal: 0, evAvailable: 0, breakdown: [] };

    // If backend returns breakdown array like [{ type: 'compact', total: 10, available: 5, occupied: 5 }]
    let breakdown = [];
    if (Array.isArray(data)) {
      breakdown = data;
    } else if (Array.isArray(data.breakdown)) {
      breakdown = data.breakdown;
    } else if (Array.isArray(data.types)) {
      breakdown = data.types;
    } else if (typeof data === "object") {
      // Object mapping like { compact: { total: 10, available: 5, occupied: 5 }, ... }
      breakdown = Object.entries(data)
        .filter(([k]) => ["compact", "standard", "ev"].includes(k.toLowerCase()))
        .map(([type, stats]) => ({
          type,
          total: stats?.total ?? stats?.totalSpots ?? 0,
          available: stats?.available ?? stats?.availableSpots ?? 0,
          occupied: stats?.occupied ?? stats?.occupiedSpots ?? 0,
        }));
    }

    let total = data.total ?? data.totalSpots ?? 0;
    let available = data.available ?? data.availableSpots ?? 0;
    let occupied = data.occupied ?? data.occupiedSpots ?? 0;

    if (breakdown.length > 0) {
      total = breakdown.reduce((sum, b) => sum + (b.total ?? 0), 0);
      available = breakdown.reduce((sum, b) => sum + (b.available ?? 0), 0);
      occupied = breakdown.reduce((sum, b) => sum + (b.occupied ?? 0), 0);
    }

    const evSpot = breakdown.find((b) => (b.type || b.spotType || "").toLowerCase() === "ev") || {};

    return {
      total,
      available,
      occupied,
      evTotal: evSpot.total ?? 0,
      evAvailable: evSpot.available ?? 0,
      evOccupied: evSpot.occupied ?? 0,
      breakdown,
    };
  };

  const summary = getSummary();

  return (
    <DashboardLayout title="Operational Dashboard">
      <div className="space-y-8">
        {/* Quick Actions Bar */}
        <section aria-label="Quick Actions">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link
              to="/check-in"
              className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-4 font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <LogIn className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>CHECK IN</span>
            </Link>
            <Link
              to="/check-out"
              className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 font-semibold text-destructive transition-colors hover:bg-destructive/20"
            >
              <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>CHECK OUT</span>
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span>SEARCH VEHICLE</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <History className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span>VIEW HISTORY</span>
            </Link>
          </div>
        </section>

        {/* Loading / Error states */}
        {garagesLoading || loading ? (
          <LoadingSpinner label="Loading garage availability..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchAvailability} />
        ) : !garageId ? (
          <EmptyState
            title="No Garage Selected"
            description="Please create or select a parking garage to view availability."
          />
        ) : (
          <>
            {/* Overview Stats */}
            <section aria-label="Garage Overview Statistics">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Overview
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Total Spots"
                  value={summary.total}
                  hint="All parking bays in garage"
                  icon={CircleParking}
                  tone="default"
                />
                <StatCard
                  label="Available Spots"
                  value={summary.available}
                  hint="Ready for check-in"
                  icon={CheckCircle}
                  tone="success"
                />
                <StatCard
                  label="Occupied Spots"
                  value={summary.occupied}
                  hint="Currently parked"
                  icon={AlertTriangle}
                  tone="warning"
                />
                <StatCard
                  label="EV Availability"
                  value={`${summary.evAvailable} / ${summary.evTotal}`}
                  hint="EV Chargers Available"
                  icon={Zap}
                  tone="ev"
                />
              </div>
            </section>

            {/* Detailed Spot Breakdown */}
            <section aria-label="Spot Availability Breakdown">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Spot Availability by Type
              </h2>

              {summary.breakdown.length === 0 ? (
                <EmptyState
                  title="No Spots Configured"
                  description="No spot availability data was returned for this garage."
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {summary.breakdown.map((item, idx) => (
                    <AvailabilityCard
                      key={item.type || item.spotType || idx}
                      type={item.type || item.spotType || "Standard"}
                      total={item.total ?? 0}
                      available={item.available ?? 0}
                      occupied={item.occupied ?? 0}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
