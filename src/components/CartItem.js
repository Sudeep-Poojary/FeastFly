import FoodImage from "./FoodImage";

const CartItem = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div
          data-testid="cartItems"
          key={`${item.id}-${index}`}
          className="p-2 m-2 border-gray-200 border-b-1 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.name} </span>
              <span>- ₹{(item.price ?? item.defaultPrice) / 100}</span>
            </div>
            <p className="text-xs">{item.description}</p>
          </div>

          <div className="w-3/12 p-4">
            <FoodImage
              label={item.name}
              hints={[item.category]}
              className="w-full h-40 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
