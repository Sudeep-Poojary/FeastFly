import { useEffect, useState } from "react";
import { getRestaurantMenu } from "./api";

const useRestaurantMenu = (resId) => {
  const [state, setState] = useState({
    menu: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ menu: null, loading: true, error: null });

    getRestaurantMenu(resId)
      .then(({ data }) => {
        if (!cancelled) setState({ menu: data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ menu: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [resId]);

  return state;
};

export default useRestaurantMenu;
