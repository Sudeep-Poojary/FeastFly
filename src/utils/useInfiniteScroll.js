import { useCallback, useEffect, useRef } from "react";

/**
 * Calls `onLoadMore` when the returned sentinel ref scrolls near the viewport.
 * Attach it to an element placed after the list: `<div ref={sentinelRef} />`.
 *
 * - `enabled: false` disconnects the observer (e.g. while loading or at the end).
 * - `rootMargin` starts loading before the user actually reaches the bottom.
 * - No-op where IntersectionObserver is unavailable; keep a manual
 *   "Show more" button as a fallback.
 */
const useInfiniteScroll = (onLoadMore, { enabled = true, rootMargin = "600px" } = {}) => {
  const observer = useRef(null);
  const callback = useRef(onLoadMore);
  callback.current = onLoadMore;

  const disconnect = () => {
    observer.current?.disconnect();
    observer.current = null;
  };

  const sentinelRef = useCallback(
    (node) => {
      disconnect();
      if (!node || !enabled || typeof IntersectionObserver === "undefined") return;

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) callback.current();
        },
        { rootMargin }
      );
      observer.current.observe(node);
    },
    [enabled, rootMargin]
  );

  useEffect(() => disconnect, []);

  return sentinelRef;
};

export default useInfiniteScroll;
