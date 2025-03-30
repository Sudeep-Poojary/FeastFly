import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  return (
    <div className="flex justify-between shadow-lg bg-orange-500">
      <div className="flex items-center">
        <img className="w-40 p-4 m-4 font-bold" src={LOGO_URL} />
      </div>

      <div className="flex items-center">
        <ul className="flex p-4 m-4 text-white font-bold">
          <li className="px-4">Online Status: {onlineStatus ? "✅" : "❎"}</li>
          <li className="px-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="px-4">
            <Link to={"/about"}>About Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
          <button
            className="login px-4"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4 font-extrabold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
