// The API ships dummy image ids, so we render generated placeholder art:
// an emoji picked from the dish / cuisine name on a matching gradient.

// Order matters: the first matching pattern wins.
const VISUALS = [
  [/pizza|margherita/i, "🍕", "from-orange-300 to-red-400"],
  [/burger|smash|american/i, "🍔", "from-amber-300 to-orange-500"],
  [/kathi|shawarma|wrap|falafel|burrito|lebanese/i, "🌯", "from-amber-200 to-orange-400"],
  [/fries|potato|nugget|onion ring|fast food/i, "🍟", "from-yellow-300 to-amber-500"],
  [/dosa|idli|vada|south indian|udupi|mysore/i, "🥞", "from-yellow-200 to-orange-400"],
  [/caf[eé]|coffee|cappuccino|latte|espresso/i, "☕", "from-stone-300 to-amber-700"],
  [/\beggs?\b|benedict|toast|pancake|breakfast|brunch/i, "🍳", "from-yellow-100 to-amber-300"],
  [/sandwich|panini|club|continental/i, "🥪", "from-yellow-200 to-lime-400"],
  [/salad|healthy|quinoa|vegan|mediterranean/i, "🥗", "from-lime-300 to-green-500"],
  [/juice|smoothie|detox|kombucha|soda|buttermilk|pepsi|cola|beverage|drink/i, "🥤", "from-sky-300 to-blue-500"],
  [/shake/i, "🥤", "from-pink-200 to-purple-400"],
  [/biryani|hyderabadi|pulao|\brice\b/i, "🍛", "from-amber-300 to-yellow-600"],
  [/curry|masala|makhani|rogan|paneer|\bdal\b|kadai|salan|raita|thali|punjabi|indian|mughlai|butter chicken/i, "🍛", "from-orange-300 to-amber-600"],
  [/naan|bread|roti|paratha|bruschetta/i, "🫓", "from-yellow-200 to-amber-400"],
  [/risotto/i, "🍚", "from-stone-200 to-amber-300"],
  [/noodle|chow mein|chinese|hakka|ramen/i, "🍜", "from-red-300 to-orange-500"],
  [/sushi|maki|nigiri|\broll\b|japanese/i, "🍣", "from-rose-200 to-pink-400"],
  [/thai|pad thai/i, "🍜", "from-lime-300 to-emerald-500"],
  [/dumpling|momo|gyoza|manchurian|dim sum|asian/i, "🥟", "from-rose-300 to-red-400"],
  [/edamame/i, "🫛", "from-lime-200 to-green-400"],
  [/corn/i, "🌽", "from-yellow-200 to-yellow-500"],
  [/soup|miso/i, "🍲", "from-amber-200 to-orange-400"],
  [/ice cream|sundae|scoop|frozen/i, "🍨", "from-pink-200 to-fuchsia-400"],
  [/cake|pastry|cheesecake|tiramisu|bakery|brownie|waffle|dessert/i, "🍰", "from-pink-200 to-rose-400"],
  [/pasta|penne|spaghetti|fusilli|lasagna|mac|fettuccine|alfredo|italian/i, "🍝", "from-yellow-200 to-orange-400"],
  [/bbq|grill|tikka|kebab|tandoor|prawn/i, "🍢", "from-orange-400 to-red-600"],
  [/chicken|wings/i, "🍗", "from-orange-300 to-red-500"],
];

const DEFAULT_VISUAL = ["🍽️", "from-gray-200 to-gray-400"];

// Checks each text in order (the name first, then hints such as cuisines or
// the dish category), so a dish's own name beats its restaurant's cuisine.
export const getFoodVisual = (...texts) => {
  for (const text of texts.flat().filter(Boolean)) {
    const match = VISUALS.find(([pattern]) => pattern.test(text));
    if (match) return match.slice(1);
  }
  return DEFAULT_VISUAL;
};

const FoodImage = ({ label, hints = [], className = "", emojiClassName = "text-6xl" }) => {
  const [emoji, gradient] = getFoodVisual(label, hints);

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-linear-to-br ${gradient} ${className}`}
    >
      <span className={`drop-shadow-md select-none ${emojiClassName}`} aria-hidden="true">
        {emoji}
      </span>
    </div>
  );
};

export default FoodImage;
