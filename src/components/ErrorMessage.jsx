import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-medium text-destructive">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-semibold text-destructive underline underline-offset-4"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
