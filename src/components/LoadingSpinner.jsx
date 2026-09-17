import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading...", className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 py-10 text-muted-foreground ${className}`}
    >
      <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
