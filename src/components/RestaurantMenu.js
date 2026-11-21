import { useMemo, useState } from "react";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { filterMenu } from "../utils/menuFilters";
import useDocumentTitle from "../utils/useDocumentTitle";
import RestaurantCategory from "./RestaurantCategory";
import MenuHeader from "./menu/MenuHeader";
import DealsCarousel from "./menu/DealsCarousel";
import ViewCartBar from "./menu/ViewCartBar";
import MenuSkeleton from "./menu/MenuSkeleton";
import Button from "./ui/Button";
import { SearchIcon } from "./ui/Icons";

const VegToggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex shrink-0 items-center gap-2 text-sm font-bold text-ink"
  >
    <span
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-veg" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-1 size-4 rounded-full bg-white shadow transition-all ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </span>
    Veg only
  </button>
);

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { menu, loading, error } = useRestaurantMenu(resId);
  useDocumentTitle(menu?.info?.name ?? (loading ? "Loading menu" : "Restaurant not found"));

  // One category open at a time; the first one starts open.
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const categories = useMemo(
    () => filterMenu(menu?.categories ?? [], { query, vegOnly }),
    [menu, query, vegOnly]
  );

  if (loading) return <MenuSkeleton />;

  if (error || !menu) {
    return (
      <div className="py-24 text-center">
        <p className="text-6xl" aria-hidden="true">🍽️</p>
        <h1 className="mt-4 text-2xl font-extrabold">We couldn't find this restaurant</h1>
        <p className="mt-2 text-ink-muted">It may have closed, or the link might be wrong.</p>
        <Button to="/" className="mt-6">
          See all restaurants
        </Button>
      </div>
    );
  }

  const { info } = menu;
  const isSearching = Boolean(query.trim()) || vegOnly;

  return (
    <div className="mx-auto max-w-3xl pb-8">
      <MenuHeader info={info} />

      <DealsCarousel offer={info.aggregatedDiscountInfoV3} />

      <p className="py-2 text-center text-xs font-bold tracking-[0.3em] text-ink-muted">
        ✦ MENU ✦
      </p>

      <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 pt-2">
        <label className="relative flex-1">
          <span className="sr-only">Search for dishes</span>
          <input
            type="search"
            data-testid="menuSearch"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for dishes"
            className="w-full rounded-xl bg-gray-100 py-3 pl-4 pr-10 text-center text-sm font-semibold text-ink placeholder:text-ink-subtle focus:bg-white focus:outline-brand-500"
          />
          <SearchIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-subtle" />
        </label>
        <VegToggle checked={vegOnly} onChange={setVegOnly} />
      </div>

      {categories.length > 0 ? (
        categories.map((category, index) => (
          <RestaurantCategory
            key={category.title}
            data={category}
            restaurant={info}
            // While searching/filtering, show every matching section.
            isOpen={isSearching || index === openIndex}
            onToggle={() => setOpenIndex(index === openIndex ? null : index)}
          />
        ))
      ) : (
        <p className="py-16 text-center text-ink-muted">
          No dishes match{query.trim() ? ` "${query.trim()}"` : ""}
          {vegOnly ? " in veg" : ""}.
        </p>
      )}

      <ViewCartBar />
    </div>
  );
};

export default RestaurantMenu;
