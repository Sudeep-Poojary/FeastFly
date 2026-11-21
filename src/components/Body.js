import { useMemo, useState } from "react";
import { Link } from "react-router";
import RestaurantCard from "./RestaurantCard";
import Shimmer, { CardSkeleton } from "./Shimmer";
import Carousel from "./ui/Carousel";
import Button from "./ui/Button";
import CuisineCarousel from "./home/CuisineCarousel";
import FilterBar from "./home/FilterBar";
import useRestaurantList from "../utils/useRestaurantList";
import useInfiniteScroll from "../utils/useInfiniteScroll";
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
  const {
    restaurants,
    firstPage,
    loading,
    error,
    hasMore,
    loadingMore,
    loadMoreError,
    loadMore,
  } = useRestaurantList();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState(null);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("relevance");

  const cuisines = useMemo(() => getTopCuisines(firstPage), [firstPage]);
  const topRated = useMemo(
    () => applyFilters(firstPage, { sort: "rating" }).slice(0, 8),
    [firstPage]
  );
  const visible = useMemo(
    () => applyFilters(restaurants, { query, cuisine, filters, sort }),
    [restaurants, query, cuisine, filters, sort]
  );

  const sentinelRef = useInfiniteScroll(loadMore, {
    enabled: hasMore && !loadingMore && !loadMoreError,
  });

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
        !loadingMore && (
          <div className="py-16 text-center">
            <p className="text-6xl" aria-hidden="true">🔍</p>
            <h3 className="mt-4 text-xl font-extrabold">No restaurants match your filters</h3>
            <p className="mt-2 text-ink-muted">
              {hasMore
                ? "Load more restaurants, or try removing a filter."
                : "Try removing a filter or searching for something else."}
            </p>
            <Button variant="secondary" className="mt-6" onClick={clearAll}>
              Clear all filters
            </Button>
          </div>
        )
      )}

      {/* Infinite scroll: skeletons while a page loads, then the sentinel. */}
      {loadingMore && (
        <div
          role="status"
          aria-label="Loading more restaurants"
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} data-testid="scrollSentinel" aria-hidden="true" />

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        {loadMoreError ? (
          <>
            <p className="text-ink-muted">Couldn't load more restaurants.</p>
            <Button variant="secondary" onClick={loadMore}>
              Retry
            </Button>
          </>
        ) : hasMore ? (
          !loadingMore && (
            <Button variant="secondary" onClick={loadMore}>
              Show more restaurants
            </Button>
          )
        ) : (
          <p className="text-sm font-semibold text-ink-subtle">
            You've seen all {restaurants.length} restaurants 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default Body;
