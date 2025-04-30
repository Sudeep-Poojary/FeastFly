import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  console.log(resData);

  const { cloudinaryImageId, name, cuisines, costForTwo, avgRating, sla } =
    resData?.info;

  return (
    <div className="p-4 m-4 w-[300px] rounded-lg bg-gray-100 hover:bg-gray-300">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold pt-4 pb-2 text-lg">{name}</h3>
      <h4 className="pb-2 text-md">
        ⭐ {avgRating} • {sla?.slaString}
      </h4>
      <h4 className="pb-2 text-sm text-gray-600">{cuisines.join(", ")}</h4>
      <h4 className="font-bold pb-2 text-sm">{costForTwo}</h4>
    </div>
  );
};

// Higher Order Component

// Input (RestaurantCard) ==>> Output (RestaurantCardPromoted)

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-red-400 text-white m-2 p-2 rounded-lg">
          one Free delivery
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
