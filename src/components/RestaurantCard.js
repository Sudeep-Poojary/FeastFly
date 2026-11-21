import FoodImage from "./FoodImage";
import RatingBadge from "./ui/RatingBadge";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines = [],
    areaName,
    avgRating,
    sla,
    veg,
    aggregatedDiscountInfoV3: offer,
  } = resData;

  return (
    <article
      data-testid="resCard"
      className="group w-full transition-transform duration-200 hover:scale-[0.96]"
    >
      <div className="relative overflow-hidden rounded-card shadow-card">
        <FoodImage
          label={name}
          hints={cuisines}
          className="aspect-[4/3] w-full"
          emojiClassName="text-7xl transition-transform duration-300 group-hover:scale-110"
        />
        {offer && (
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pb-2 pt-10">
            <p className="text-lg font-extrabold uppercase tracking-tight text-white">
              {offer.header} {offer.subHeader}
            </p>
          </div>
        )}
        {veg && (
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-xs font-bold text-veg shadow-sm">
            Pure Veg
          </span>
        )}
      </div>

      <div className="px-2 pt-3">
        <h3 className="truncate text-lg font-bold text-ink">{name}</h3>
        <p className="flex items-center gap-1.5 text-base">
          <RatingBadge rating={avgRating} />
          <span className="text-ink" aria-hidden="true">•</span>
          <span className="font-bold text-ink">{sla?.slaString}</span>
        </p>
        <p className="truncate text-ink-muted">{cuisines.join(", ")}</p>
        <p className="truncate text-ink-muted">{areaName}</p>
      </div>
    </article>
  );
};

export default RestaurantCard;
