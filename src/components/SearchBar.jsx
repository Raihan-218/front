import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder = "Search vehicle by plate number (e.g. RJ14)",
  buttonLabel = "Search",
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="plate-search" className="sr-only">
          {placeholder}
        </label>
        <input
          id="plate-search"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder={placeholder}
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 font-mono text-sm uppercase tracking-wide placeholder:font-sans placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Searching..." : buttonLabel}
      </button>
    </form>
  );
}
