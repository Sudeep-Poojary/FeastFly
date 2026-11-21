import FoodImage from "./FoodImage";
import VegIcon from "./ui/VegIcon";
import AddToCartButton from "./menu/AddToCartButton";
import { itemPrice } from "../utils/cartSlice";

const MenuItem = ({ item, restaurant }) => (
  <li
    data-testid="foodItems"
    className="flex gap-4 border-b border-gray-200 py-6 last:border-b-0 sm:gap-8"
  >
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <VegIcon isVeg={item.isVeg === 1} />
        {item.bestseller && (
          <span className="text-xs font-bold text-orange-500">★ Bestseller</span>
        )}
      </div>
      <h4 className="mt-1 text-lg font-bold text-ink">{item.name}</h4>
      <p className="font-semibold text-ink">₹{itemPrice(item)}</p>
      {item.description && (
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{item.description}</p>
      )}
    </div>

    <div className="relative shrink-0 self-start pb-5">
      <FoodImage
        label={item.name}
        hints={[item.category]}
        className="h-32 w-36 rounded-2xl sm:h-36 sm:w-40"
        emojiClassName="text-6xl"
      />
      <AddToCartButton
        item={item}
        restaurant={restaurant}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      />
    </div>
  </li>
);

const ItemList = ({ items, restaurant }) => (
  <ul>
    {items.map((item) => (
      <MenuItem key={item.id} item={item} restaurant={restaurant} />
    ))}
  </ul>
);

export default ItemList;
