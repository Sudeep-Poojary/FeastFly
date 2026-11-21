import { useMemo, useState } from "react";
import { Link } from "react-router";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import Carousel from "./ui/Carousel";
import Button from "./ui/Button";
import CuisineCarousel from "./home/CuisineCarousel";
import FilterBar from "./home/FilterBar";
import useRestaurantList from "../utils/useRestaurantList";
import { applyFilters, getTopCuisines } from "../utils/restaurantFilters";

const RestaurantLink = ({ restaurant, className = "" }) => (
  <Link
    to={"/restaurants/" + restaurant.id}
    className={`rounded-card ${className}`}
  >
    <RestaurantCard resData={restaurant} />
  </Link>
);

const Body = () => {
  const { restaurants, loading, error } = useRestaurantList();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState(null);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("relevance");

  const cuisines = useMemo(() => getTopCuisines(restaurants), [restaurants]);
  const topRated = useMemo(
    () => applyFilters(restaurants, { sort: "rating" }).slice(0, 8),
    [restaurants]
  );
  const visible = useMemo(
    () => applyFilters(restaurants, { query, cuisine, filters, sort }),
    [restaurants, query, cuisine, filters, sort]
  );

  const toggleFilter = (id) =>
    setFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const isFiltered = Boolean(query || cuisine || filters.length || sort !== "relevance");
  const clearAll = () => {
    setQuery("");
    setCuisine(null);
    setFilters([]);
    setSort("relevance");
  };

  if (loading) return <Shimmer />;

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-6xl" aria-hidden="true">😕</p>
        <h1 className="mt-4 text-2xl font-extrabold">Couldn't load restaurants</h1>
        <p className="mt-2 text-ink-muted">Please check your connection and try again.</p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <CuisineCarousel cuisines={cuisines} selected={cuisine} onSelect={setCuisine} />

      <hr className="border-gray-100" />

      <Carousel title="Top rated near you" className="py-8">
        {topRated.map((r) => (
          <RestaurantLink key={r.id} restaurant={r} className="w-64 shrink-0 snap-start sm:w-72" />
        ))}
      </Carousel>

      <hr className="border-gray-100" />

      <h2 className="pb-2 pt-8 text-xl font-extrabold text-ink sm:text-2xl">
        Restaurants with online food delivery in Mumbai
      </h2>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        activeFilters={filters}
        onToggleFilter={toggleFilter}
        canClear={isFiltered}
        onClear={clearAll}
      />

      {cuisine && (
        <p className="mt-2 text-sm text-ink-muted">
          Showing <span className="font-bold text-ink">{cuisine}</span> restaurants
        </p>
      )}

      {visible.length > 0 ? (
        <div
          data-testid="restaurantGrid"
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {visible.map((r) => (
            <RestaurantLink key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-6xl" aria-hidden="true">🔍</p>
          <h3 className="mt-4 text-xl font-extrabold">No restaurants match your filters</h3>
          <p className="mt-2 text-ink-muted">Try removing a filter or searching for something else.</p>
          <Button variant="secondary" className="mt-6" onClick={clearAll}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Body;
