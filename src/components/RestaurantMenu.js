import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const { menu, loading, error } = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  if (loading) return <Shimmer />;

  if (error || !menu) {
    return (
      <h1 className="m-8 text-center text-xl font-bold">
        Sorry, we couldn't find this restaurant's menu.
      </h1>
    );
  }

  const { name, cuisines = [], costForTwoMessage } = menu.info;

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* Category Accordions */}
      {menu.categories.map((category, index) => (
        // Controlled Component
        <RestaurantCategory
          key={category.title}
          data={category}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index)}
          setShowIndexClose={() => setShowIndex(null)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
