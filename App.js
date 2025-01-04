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
];

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>

      <div className="res-container">
        <RestaurantCard resData={resList[0]} />
        <RestaurantCard resData={resList[1]} />
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
