export default function Pagination({ page, totalPages, onChange }) {
  const pages = Math.max(1, totalPages || 1);
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        Previous
      </button>
      <p className="text-sm font-medium text-muted-foreground">
        Page {page} of {pages}
      </p>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pages}
        className="rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
