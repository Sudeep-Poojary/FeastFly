import { Link } from "react-router";
import RatingBadge from "../ui/RatingBadge";

const MenuHeader = ({ info }) => {
  const {
    name,
    avgRatingString,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    costForTwo,
    cuisines = [],
    areaName,
    locality,
    sla,
  } = info;

  return (
    <header className="pt-6">
      <nav aria-label="Breadcrumb" className="text-xs text-ink-subtle">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span className="mx-1.5">/</span>
        <span>Mumbai</span>
        <span className="mx-1.5">/</span>
        <span className="text-ink-muted">{name}</span>
      </nav>

      <h1 className="mt-6 text-2xl font-extrabold text-ink sm:text-3xl">{name}</h1>

      <div className="mt-4 rounded-[1.75rem] bg-linear-to-b from-white to-gray-200 px-4 pb-4">
        <div className="space-y-2 rounded-3xl border border-gray-200 bg-white p-4 shadow-card">
          <p className="flex flex-wrap items-center gap-x-2 font-bold text-ink">
            <RatingBadge rating={avgRatingString ?? avgRating} />
            {totalRatingsString && <span>({totalRatingsString})</span>}
            <span className="text-ink-subtle" aria-hidden="true">•</span>
            <span>{costForTwoMessage ?? costForTwo}</span>
          </p>

          <p className="text-sm font-bold text-brand-500 underline underline-offset-2">
            {cuisines.join(", ")}
          </p>

          <div className="flex gap-3 pt-1 text-sm">
            <div className="flex flex-col items-center pt-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-gray-300" />
              <span className="h-6 w-px bg-gray-300" />
              <span className="size-2 rounded-full bg-gray-300" />
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-bold text-ink">Outlet</span>
                <span className="ml-3 text-ink-muted">{areaName || locality}</span>
              </p>
              <p className="font-bold text-ink">{sla?.slaString}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuHeader;
