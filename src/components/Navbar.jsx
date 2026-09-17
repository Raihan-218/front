import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Menu, X, LogOut as LogOutIcon, Building2 } from "lucide-react";
import { NavLinks } from "./Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useGarages } from "../context/GarageContext";

export default function Navbar({ title }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { garages, garageId, selectGarage } = useGarages();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <h1 className="flex-1 truncate text-base font-semibold sm:text-lg">{title}</h1>

        {garages.length > 0 && (
          <div className="hidden items-center gap-2 sm:flex">
            <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="garage-select" className="sr-only">
              Select garage
            </label>
            <select
              id="garage-select"
              value={garageId ?? ""}
              onChange={(e) => selectGarage(e.target.value)}
              className="rounded-md border border-input bg-background px-2.5 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {garages.map((g) => (
                <option key={g._id ?? g.id} value={g._id ?? g.id}>
                  {g.name ?? "Garage"}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          {user?.name && (
            <span className="hidden text-sm font-medium text-muted-foreground md:inline">
              {user.name}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-input px-2.5 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <LogOutIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-sidebar px-4 py-3 lg:hidden">
          <NavLinks onNavigate={() => setOpen(false)} />
          {garages.length > 0 && (
            <select
              aria-label="Select garage"
              value={garageId ?? ""}
              onChange={(e) => selectGarage(e.target.value)}
              className="mt-3 w-full rounded-md border border-sidebar-border bg-sidebar-accent px-2.5 py-2 text-sm font-medium text-sidebar-accent-foreground"
            >
              {garages.map((g) => (
                <option key={g._id ?? g.id} value={g._id ?? g.id}>
                  {g.name ?? "Garage"}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </header>
  );
}
