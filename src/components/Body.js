import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";

const Body = () => {
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn">Top Rated Restaurants</button>
      </div>

      <div className="res-container">
        {/* Using .map() function to loop through the array of restaurants.
    Always make use of key, it is very important and also use a unique key and not index */}

        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
