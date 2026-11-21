// The API ships dummy image ids, so we render generated placeholder art:
// an emoji picked from the dish / cuisine name on a matching gradient.

const VISUALS = [
  [/pizza/i, "🍕", "from-orange-300 to-red-400"],
  [/burger|smash/i, "🍔", "from-amber-300 to-orange-500"],
  [/fries|potato|nugget|onion ring/i, "🍟", "from-yellow-300 to-amber-500"],
  [/salad|healthy|bowl|quinoa/i, "🥗", "from-lime-300 to-green-500"],
  [/juice|smoothie|detox/i, "🥤", "from-lime-200 to-emerald-400"],
  [/biryani|rice/i, "🍛", "from-amber-300 to-yellow-600"],
  [/curry|masala|makhani|rogan|indian|mughlai|butter chicken/i, "🍛", "from-orange-300 to-amber-600"],
  [/naan|bread|bruschetta/i, "🫓", "from-yellow-200 to-amber-400"],
  [/noodle|chinese|hakka|ramen/i, "🍜", "from-red-300 to-orange-500"],
  [/dumpling|manchurian|asian|thai/i, "🥟", "from-rose-300 to-red-400"],
  [/sushi|maki|nigiri|roll|japanese/i, "🍣", "from-rose-200 to-pink-400"],
  [/soup|miso/i, "🍲", "from-amber-200 to-orange-400"],
  [/dosa|idli|south indian/i, "🥞", "from-yellow-200 to-orange-400"],
  [/coffee/i, "☕", "from-stone-300 to-amber-700"],
  [/ice cream|sundae|scoop/i, "🍨", "from-pink-200 to-fuchsia-400"],
  [/cake|pastry|cheesecake|bakery|brownie|waffle|dessert/i, "🍰", "from-pink-200 to-rose-400"],
  [/shake/i, "🥤", "from-pink-200 to-purple-400"],
  [/pasta|penne|spaghetti|lasagna|mac|fettuccine|alfredo|italian/i, "🍝", "from-yellow-200 to-orange-400"],
  [/bbq|grill|tikka|kebab|tandoori|prawn/i, "🍢", "from-orange-400 to-red-600"],
  [/chicken/i, "🍗", "from-orange-300 to-red-500"],
  [/cola|beverage|drink/i, "🥤", "from-sky-300 to-blue-500"],
];

const DEFAULT_VISUAL = ["🍽️", "from-gray-200 to-gray-400"];

export const getFoodVisual = (...texts) => {
  const text = texts.flat().filter(Boolean).join(" ");
  const match = VISUALS.find(([pattern]) => pattern.test(text));
  return match ? match.slice(1) : DEFAULT_VISUAL;
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
