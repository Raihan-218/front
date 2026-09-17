import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Search,
  History,
  CircleParking,
} from "lucide-react";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/check-in", label: "Check In", icon: LogIn },
  { to: "/check-out", label: "Check Out", icon: LogOut },
  { to: "/search", label: "Search Vehicle", icon: Search },
  { to: "/history", label: "Parking History", icon: History },
];

export function NavLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className:
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold bg-sidebar-accent text-sidebar-accent-foreground",
          }}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
      <Link to="/" className="mb-6 flex items-center gap-2.5 px-2 py-1">
        <span className="rounded-md bg-primary p-1.5">
          <CircleParking className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold leading-tight text-sidebar-accent-foreground">
          Parking
          <br />
          Management
        </span>
      </Link>
      <NavLinks />
    </aside>
  );
}
