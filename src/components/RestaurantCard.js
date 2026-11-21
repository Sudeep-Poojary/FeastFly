import FoodImage from "./FoodImage";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines = [],
    costForTwo,
    avgRating,
    sla,
    aggregatedDiscountInfoV3: offer,
  } = resData;

  return (
    <div
      data-testid="resCard"
      className="p-4 m-4 w-[300px] rounded-lg bg-gray-100 hover:bg-gray-300"
    >
      <FoodImage
        label={name}
        hints={cuisines}
        className="relative h-44 rounded-lg"
      />
      <h3 className="font-bold pt-4 pb-2 text-lg">{name}</h3>
      <h4 className="pb-2 text-md">
        ⭐ {avgRating} • {sla?.slaString}
      </h4>
      <h4 className="pb-2 text-sm text-gray-600">{cuisines.join(", ")}</h4>
      <h4 className="font-bold pb-2 text-sm">{costForTwo}</h4>
      {offer && (
        <h4 className="text-sm font-bold text-orange-600">
          {offer.header} {offer.subHeader}
        </h4>
      )}
    </div>
  );
};

export default RestaurantCard;
