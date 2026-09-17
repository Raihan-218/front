import { Link } from "@tanstack/react-router";
import {
  CircleParking,
  Zap,
  Clock,
  ShieldCheck,
  Search,
  History,
  Building2,
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="rounded-lg bg-primary p-2 text-primary-foreground">
              <CircleParking className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight">Parking Management System</span>
          </Link>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg border border-input px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Designed for Multi-Level Garages & Attendants
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Simplifying Parking Operations for Busy Garage Attendants
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Streamline vehicle check-in, ensure exact EV and standard spot compatibility, prevent double-parking, and automatically apply precise tiered parking rates.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Open Dashboard
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-input bg-card px-6 py-3.5 text-base font-semibold hover:bg-muted transition-colors"
                >
                  Attendant Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="border-b border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">What the System Does</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Our Parking Management System provides a real-time operational dashboard built specifically for garage attendants managing busy multi-level facilities. From tracking available EV chargers to managing tiered rates and daily fee caps, everything is managed accurately in one place.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="border-b border-border bg-card/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Key Features</h2>
            <p className="mt-2 text-muted-foreground">Built to handle every step of the attendant's daily workflow</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="surface p-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <Clock className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Fast Vehicle Check-In</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Instantly check in compact, standard, and EV vehicles with quick license plate entry.
              </p>
            </div>

            <div className="surface p-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Automatic Spot Allocation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Assign available spots automatically based on vehicle size and charger compatibility.
              </p>
            </div>

            <div className="surface p-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <CircleParking className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Accurate Fee Calculation</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Eliminate math errors with backend-calculated tiered rates, part-hour rounding, and daily caps.
              </p>
            </div>

            <div className="surface p-6">
              <div className="rounded-lg bg-ev/12 p-3 text-ev w-fit">
                <Zap className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">EV Spot Availability</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Real-time tracking of EV charging spots so attendants can instantly answer driver inquiries.
              </p>
            </div>

            <div className="surface p-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <Search className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Vehicle Search</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Rapidly search active and completed sessions by license plate number.
              </p>
            </div>

            <div className="surface p-6">
              <div className="rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <History className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Parking History</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comprehensive audit logs with server-side pagination, sorting, and status filtering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="border-b border-border px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider">
              <Users className="h-4 w-4" aria-hidden="true" />
              Target Audience
            </div>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Designed Specifically For Operations</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether managing a single multi-floor facility or a network of city-centre parking garages, this tool empowers staff with total operational visibility.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                Parking Garage Attendants
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                Parking Garage Operators & Managers
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle className="h-5 w-5 text-success shrink-0" aria-hidden="true" />
                Multi-level City-Centre Parking Facilities
              </li>
            </ul>
          </div>

          <div className="surface p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-bold">Multi-Garage Ready</h3>
                <p className="text-xs text-muted-foreground">Switch garages seamlessly from the top navigation bar</p>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold">How It Helps:</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Prevents double parking by enforcing real-time spot occupancy</li>
                <li>• Ensures compatible spot allocation for Compact, Standard, and EV cars</li>
                <li>• Calculates precise parking fees automatically on checkout</li>
                <li>• Makes vehicle lookup instantaneous by plate search</li>
                <li>• Maintains detailed parking session history for audits</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Features Section */}
      <section className="border-b border-border bg-card/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            Roadmap
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Coming Next</h2>
          <p className="mt-2 text-sm text-muted-foreground">Upcoming features currently on our product roadmap</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="surface p-6 relative">
              <span className="absolute top-3 right-3 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                Coming Next
              </span>
              <h3 className="font-bold text-base mt-2">1. Online Payments</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Digital payment integration for contactless driver checkouts and online receipts.
              </p>
            </div>

            <div className="surface p-6 relative">
              <span className="absolute top-3 right-3 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                Coming Next
              </span>
              <h3 className="font-bold text-base mt-2">2. Advanced Analytics</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Peak usage reporting, revenue trends, and floor occupancy analytics over time.
              </p>
            </div>

            <div className="surface p-6 relative">
              <span className="absolute top-3 right-3 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                Coming Next
              </span>
              <h3 className="font-bold text-base mt-2">3. Automated Notifications</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                SMS and email alerts for drivers regarding session duration and fee thresholds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Parking Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
