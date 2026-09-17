import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";
import { GarageProvider } from "../context/GarageContext";

export default function DashboardLayout({ title, children }) {
  return (
    <ProtectedRoute>
      <GarageProvider>
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Navbar title={title} />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-6xl">{children}</div>
            </main>
          </div>
        </div>
      </GarageProvider>
    </ProtectedRoute>
  );
}
