import { useCallback, useEffect, useRef, useState } from "react";
import { getMoreRestaurants, getRestaurants } from "./api";

// Append without duplicates (by id), keeping first occurrence.
const mergeUnique = (current, incoming) => {
  const seen = new Set(current.map((r) => r.id));
  return [...current, ...incoming.filter((r) => !seen.has(r.id) && seen.add(r.id))];
};

/**
 * First page from the API (live or local fallback), then more pages on demand.
 * `loadMore` is safe to call repeatedly: it ignores calls while a page is in
 * flight or when there is nothing left.
 */
const useRestaurantList = () => {
  const [state, setState] = useState({
    restaurants: [],
    firstPage: [],
    loading: true,
    error: null,
    source: null,
    nextOffset: null,
    loadingMore: false,
    loadMoreError: null,
  });

  const inFlight = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    getRestaurants()
      .then(({ data, source }) => {
        if (mounted.current)
          setState((s) => ({
            ...s,
            restaurants: data,
            firstPage: data,
            loading: false,
            source,
            nextOffset: 0,
          }));
      })
      .catch((error) => {
        if (mounted.current) setState((s) => ({ ...s, loading: false, error }));
      });

    return () => {
      mounted.current = false;
    };
  }, []);

  const { nextOffset, loading } = state;

  const loadMore = useCallback(async () => {
    if (loading || inFlight.current || nextOffset === null) return;

    inFlight.current = true;
    setState((s) => ({ ...s, loadingMore: true, loadMoreError: null }));

    try {
      const page = await getMoreRestaurants(nextOffset);
      if (mounted.current)
        setState((s) => ({
          ...s,
          restaurants: mergeUnique(s.restaurants, page.restaurants),
          nextOffset: page.nextOffset,
          loadingMore: false,
        }));
    } catch (loadMoreError) {
      if (mounted.current) setState((s) => ({ ...s, loadingMore: false, loadMoreError }));
    } finally {
      inFlight.current = false;
    }
  }, [loading, nextOffset]);

  return {
    restaurants: state.restaurants,
    // The API's own page; stable while more pages load (used for carousels).
    firstPage: state.firstPage,
    loading: state.loading,
    error: state.error,
    source: state.source,
    hasMore: !state.loading && !state.error && state.nextOffset !== null,
    loadingMore: state.loadingMore,
    loadMoreError: state.loadMoreError,
    loadMore,
  };
};

export default useRestaurantList;
