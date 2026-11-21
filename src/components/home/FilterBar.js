import { FILTERS, SORTS } from "../../utils/restaurantFilters";
import { CloseIcon, SearchIcon } from "../ui/Icons";

const chipClass = (active) =>
  `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
    active
      ? "border-ink bg-ink text-white"
      : "border-gray-200 bg-white text-ink hover:border-gray-300 hover:bg-gray-50"
  }`;

// Sticky search + sort + quick-filter chips under the header.
const FilterBar = ({
  query,
  onQueryChange,
  sort,
  onSortChange,
  activeFilters,
  onToggleFilter,
  canClear,
  onClear,
}) => (
  <div className="sticky top-20 z-30 -mx-4 flex flex-wrap items-center gap-3 bg-white/95 px-4 py-3 backdrop-blur">
    <label className="relative w-full sm:w-64">
      <span className="sr-only">Search restaurants or cuisines</span>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" />
      <input
        type="search"
        data-testid="searchInput"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search restaurants or cuisines"
        className="w-full rounded-full border border-gray-200 py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none"
      />
    </label>

    <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <label className={`${chipClass(sort !== "relevance")} cursor-pointer`}>
        <span className="sr-only">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="cursor-pointer bg-transparent font-semibold outline-none"
          aria-label="Sort by"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id} className="text-ink">
              {s.id === "relevance" ? "Sort by" : s.label}
            </option>
          ))}
        </select>
      </label>

      {FILTERS.map((f) => {
        const active = activeFilters.includes(f.id);
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggleFilter(f.id)}
            className={chipClass(active)}
          >
            {f.label}
            {active && <CloseIcon className="size-3.5" />}
          </button>
        );
      })}

      {canClear && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 px-2 text-sm font-bold text-brand-500 hover:text-brand-700"
        >
          Clear all
        </button>
      )}
    </div>
  </div>
);

export default FilterBar;
