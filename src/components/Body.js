import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useRestaurantList from "../utils/useRestaurantList";

const Body = () => {
  const { restaurants, loading, error } = useRestaurantList();
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredRestaurant(restaurants);
  }, [restaurants]);

  if (loading) return <Shimmer />;

  if (error) {
    return (
      <h1 className="m-8 text-center text-xl font-bold">
        Couldn't load restaurants. Please try again later.
      </h1>
    );
  }

  return (
    <div className="body">
      <div className="filter flex justify-center">
        <div className="search m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid border-black p-2 m-4 rounded-lg"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 mx-1 my-4 bg-green-100 rounded-lg"
            onClick={() => {
              const filtered = restaurants.filter((res) =>
                res.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filtered);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4">
          <button
            className="px-4 py-2 m-4 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = restaurants.filter(
                (res) => res.avgRating > 4.3
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly">
        {filteredRestaurant.map((restaurant) => (
          <Link key={restaurant.id} to={"/restaurants/" + restaurant.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
