import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://img.freepik.com/premium-vector/food-logo-vector-illustration_943898-19509.jpg?semt=ais_hybrid"
        />
      </div>

      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    restaurantImageId,
    name,
    cuisines,
    costForTwo,
    avgRating,
    deliveryTime,
  } = resData?.data;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/" +
          restaurantImageId
        }
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>₹{costForTwo} For Two</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{deliveryTime} Minutes</h4>
    </div>
  );
};

const resList = [
  {
    type: "restaurant",
    data: {
      id: "1",
      name: "KFC",
      restaurantImageId:
        "2024/12/9/ba126942-5212-440a-8978-c641a61dbe54_418298.JPG",
      cuisines: ["Burgers", "Fast Food", "Rolls & Wraps"],
      costForTwo: 400,
      deliveryTime: 20,
      avgRating: "4.4",
    },
    subtype: "basic",
  },
  {
    type: "restaurant",
    data: {
      id: "2",
      name: "McDonald's",
      restaurantImageId:
        "2024/9/18/bf1777b6-1023-479b-b191-5c6cd3e9bdc0_30243.jpg",
      cuisines: ["Burgers", "Beverage", "Cafe", "Desserts"],
      costForTwo: 400,
      deliveryTime: 20,
      avgRating: "4.5",
    },
    subtype: "basic",
  },
  {
    type: "restaurant",
    data: {
      id: "3",
      name: "Domino's Pizza",
      restaurantImageId:
        "2024/11/29/87b297a1-0dac-477e-8bb5-98c7e57b08da_24525.jpg",
      cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
      costForTwo: 400,
      deliveryTime: 20,
      avgRating: "4.0",
    },
    subtype: "basic",
  },
  {
    type: "restaurant",
    data: {
      id: "4",
      name: "Burger King",
      restaurantImageId:
        "2024/6/11/7f76a072-c1bc-4d74-ac56-33e0eea20c1e_15168.JPG",
      cuisines: ["Burgers", "American"],
      costForTwo: 400,
      deliveryTime: 20,
      avgRating: "4.3",
    },
    subtype: "basic",
  },
  {
    type: "restaurant",
    data: {
      id: "5",
      name: "Theobroma",
      restaurantImageId:
        "2025/1/2/10309c79-99ef-4bba-87cf-33262d0cf56b_378292.jpg",
      cuisines: ["Bakery", "Desserts"],
      costForTwo: 400,
      deliveryTime: 20,
      avgRating: "4.7",
    },
    subtype: "basic",
  },
];

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>

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

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
