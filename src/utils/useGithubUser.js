import { useEffect, useState } from "react";

// Public GitHub profile for `username` (unauthenticated API, rate-limited).
const useGithubUser = (username) => {
  const [state, setState] = useState({ user: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ user: null, loading: true, error: null });

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((user) => !cancelled && setState({ user, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ user: null, loading: false, error }));

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
};

export default useGithubUser;
