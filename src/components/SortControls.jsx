const SORT_FIELDS = [
  { value: "checkInTime", label: "Check-in time" },
  { value: "checkOutTime", label: "Check-out time" },
  { value: "plateNumber", label: "Plate" },
  { value: "fee", label: "Fee" },
  { value: "status", label: "Status" },
];

const selectClass =
  "rounded-md border border-input bg-card px-2.5 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring";

export default function SortControls({ sort, order, status, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="sort-field" className="text-sm text-muted-foreground">
          Sort by
        </label>
        <select
          id="sort-field"
          value={sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className={selectClass}
        >
          {SORT_FIELDS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-order" className="text-sm text-muted-foreground">
          Order
        </label>
        <select
          id="sort-order"
          value={order}
          onChange={(e) => onChange({ order: e.target.value })}
          className={selectClass}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-sm text-muted-foreground">
          Status
        </label>
        <select
          id="status-filter"
          value={status}
          onChange={(e) => onChange({ status: e.target.value })}
          className={selectClass}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
