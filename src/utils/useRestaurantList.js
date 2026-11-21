import { useEffect, useState } from "react";
import { getRestaurants } from "./api";

const useRestaurantList = () => {
  const [state, setState] = useState({
    restaurants: [],
    loading: true,
    error: null,
    source: null,
  });

  useEffect(() => {
    let cancelled = false;

    getRestaurants()
      .then(({ data, source }) => {
        if (!cancelled)
          setState({ restaurants: data, loading: false, error: null, source });
      })
      .catch((error) => {
        if (!cancelled)
          setState({ restaurants: [], loading: false, error, source: null });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};

export default useRestaurantList;
