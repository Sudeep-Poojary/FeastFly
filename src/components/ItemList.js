import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import FoodImage from "./FoodImage";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.id}
          className="p-2 m-2 border-gray-200 border-b-1 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.name} </span>
              <span>- ₹{(item.price ?? item.defaultPrice) / 100}</span>
            </div>
            <p className="text-xs">{item.description}</p>
          </div>

          <div className="w-3/12 p-4 relative">
            <FoodImage
              label={item.name}
              hints={[item.category]}
              className="w-full h-30 rounded-lg"
              emojiClassName="text-5xl"
            />
            <button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 px-8 py-2 bg-white text-green-600 hover:bg-green-600 hover:text-white font-bold shadow-lg rounded-lg"
              onClick={() => handleAddItem(item)}
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
