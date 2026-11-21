import { useCallback, useEffect, useRef, useState } from "react";

const Arrow = ({ direction, disabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    className="grid size-9 place-items-center rounded-full bg-gray-100 text-ink transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
  >
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  </button>
);

// Horizontally scrollable row with a title and prev/next arrows.
const Carousel = ({ title, children, className = "" }) => {
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update, children]);

  const scroll = (dir) => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    trackRef.current?.scrollBy({
      left: dir * trackRef.current.clientWidth * 0.8,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section className={className} aria-label={title}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{title}</h2>
        <div className="flex gap-2">
          <Arrow direction="left" disabled={!canScroll.left} onClick={() => scroll(-1)} />
          <Arrow direction="right" disabled={!canScroll.right} onClick={() => scroll(1)} />
        </div>
      </div>
      <div
        ref={trackRef}
        onScroll={update}
        className="flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </section>
  );
};

export default Carousel;
