// Extended local catalogue — 30 more restaurants beyond the 10 the API
// returns, so the home page can page through results (infinite scroll).
// These only exist locally. Menus are generated from cuisine templates.

// [name, description, price (paise), isVeg, bestseller?]
const TEMPLATES = {
  pizza: {
    Recommended: [
      ["Farmhouse Pizza", "Onion, capsicum, tomato and mushroom on a cheesy base.", 34900, true, true],
      ["Chicken Tikka Pizza", "Tandoori chicken tikka with onion and mint mayo.", 42900, false, true],
      ["Cheese Burst Margherita", "Molten cheese-filled crust with classic margherita.", 37900, true],
    ],
    Sides: [
      ["Stuffed Garlic Bread", "Garlic bread stuffed with cheese, corn and jalapeños.", 17900, true],
      ["Choco Lava Cake", "Warm chocolate cake with a gooey centre.", 10900, true],
    ],
    Beverages: [["Pepsi (500ml)", "Chilled Pepsi.", 6000, true]],
  },
  burger: {
    Recommended: [
      ["Crispy Veg Burger", "Crunchy veg patty, lettuce and tangy sauce.", 12900, true, true],
      ["Chicken Zinger Burger", "Spicy fried chicken fillet with mayo.", 19900, false, true],
      ["Lamb Burger", "Juicy lamb patty, caramelised onions and cheddar.", 29900, false],
    ],
    Sides: [
      ["Loaded Cheese Fries", "Fries smothered in cheese sauce and jalapeños.", 15900, true],
      ["Chicken Wings (6 pcs)", "Buffalo-glazed wings with ranch dip.", 22900, false],
    ],
    Beverages: [["Cold Coffee", "Thick, creamy cold coffee.", 12900, true]],
  },
  healthy: {
    Bowls: [
      ["Mediterranean Bowl", "Hummus, falafel, couscous and pickled veggies.", 29900, true, true],
      ["Teriyaki Chicken Bowl", "Grilled chicken, brown rice and teriyaki glaze.", 32900, false],
      ["Burrito Bowl", "Mexican rice, beans, salsa, corn and sour cream.", 27900, true],
    ],
    Salads: [
      ["Kale Caesar Salad", "Kale, parmesan, croutons and Caesar dressing.", 24900, true],
      ["Watermelon Feta Salad", "Watermelon, feta, mint and balsamic glaze.", 22900, true],
    ],
    Drinks: [
      ["Cold Pressed Orange Juice", "Freshly cold-pressed oranges.", 14900, true],
      ["Ginger Kombucha", "Lightly fizzy fermented tea with ginger.", 16900, true],
    ],
  },
  northIndian: {
    Recommended: [
      ["Dal Tadka", "Yellow lentils tempered with ghee, cumin and garlic.", 17900, true, true],
      ["Kadai Paneer", "Paneer and peppers in a spicy kadai masala.", 25900, true],
      ["Chicken Curry", "Home-style chicken curry.", 27900, false, true],
    ],
    Breads: [
      ["Tandoori Roti", "Whole-wheat roti from the tandoor.", 3500, true],
      ["Lachha Paratha", "Flaky, layered paratha.", 5500, true],
    ],
    Rice: [
      ["Jeera Rice", "Basmati rice tempered with cumin.", 14900, true],
      ["Veg Pulao", "Fragrant rice with vegetables.", 17900, true],
    ],
  },
  biryani: {
    Biryani: [
      ["Hyderabadi Chicken Biryani", "Spicy dum biryani with tender chicken.", 32900, false, true],
      ["Lucknowi Mutton Biryani", "Mildly spiced, saffron-scented mutton biryani.", 39900, false],
      ["Paneer Biryani", "Paneer tikka layered with basmati rice.", 27900, true],
    ],
    Kebabs: [
      ["Chicken 65", "Spicy, deep-fried chicken bites.", 24900, false, true],
      ["Hara Bhara Kebab", "Spinach and peas patties.", 19900, true],
    ],
    Sides: [
      ["Boondi Raita", "Yogurt with crispy boondi.", 6900, true],
      ["Mirchi Ka Salan", "Chillies in a tangy peanut-sesame gravy.", 8900, true],
    ],
  },
  chinese: {
    Starters: [
      ["Chilli Paneer", "Paneer tossed with peppers in chilli sauce.", 22900, true, true],
      ["Crispy Corn", "Fried corn kernels with salt and pepper.", 17900, true],
      ["Chicken Lollipop", "Frenched wings in a spicy batter.", 25900, false],
    ],
    "Noodles & Rice": [
      ["Burnt Garlic Fried Rice", "Wok-fried rice with smoky burnt garlic.", 19900, true, true],
      ["Chicken Chow Mein", "Stir-fried noodles with chicken and veggies.", 22900, false],
    ],
    "Dim Sum": [
      ["Veg Crystal Dumplings", "Steamed translucent veg dumplings.", 18900, true],
      ["Chicken Momos", "Steamed chicken momos with red chutney.", 16900, false],
    ],
  },
  dessert: {
    "Ice Creams": [
      ["Belgian Chocolate Scoop", "Rich Belgian chocolate ice cream.", 11900, true, true],
      ["Butterscotch Sundae", "Butterscotch ice cream, caramel and nuts.", 16900, true],
    ],
    Cakes: [
      ["Tiramisu", "Coffee-soaked layers with mascarpone.", 19900, true, true],
      ["Chocolate Truffle Pastry", "Dense chocolate truffle pastry.", 12900, true],
      ["Baked New York Cheesecake", "Classic baked cheesecake.", 21900, true],
    ],
    Shakes: [["Oreo Shake", "Cookies and cream thick shake.", 15900, true]],
  },
  japanese: {
    Sushi: [
      ["Salmon Avocado Roll", "Salmon and avocado uramaki, 8 pieces.", 42900, false, true],
      ["Cucumber Maki", "Classic cucumber maki, 6 pieces.", 22900, true],
      ["Dragon Roll", "Prawn tempura topped with avocado, 8 pieces.", 49900, false],
    ],
    Ramen: [
      ["Tonkotsu Ramen", "Creamy pork-bone broth, chashu and egg.", 47900, false, true],
      ["Veg Shoyu Ramen", "Soy broth, mushrooms, bok choy and corn.", 36900, true],
    ],
    "Small Plates": [
      ["Edamame", "Steamed soybeans with sea salt.", 18900, true],
      ["Chicken Gyoza", "Pan-fried chicken dumplings, 5 pieces.", 27900, false],
    ],
  },
  southIndian: {
    Dosa: [
      ["Ghee Roast Dosa", "Crisp dosa roasted in ghee.", 13900, true, true],
      ["Paper Masala Dosa", "Extra-long, paper-thin masala dosa.", 15900, true],
      ["Set Dosa (3 pcs)", "Soft, spongy dosas with sagu.", 11900, true],
    ],
    "Idli & Vada": [
      ["Medu Vada (2 pcs)", "Crispy lentil doughnuts with sambar.", 8900, true, true],
      ["Ghee Podi Idli", "Mini idlis tossed in ghee and gunpowder.", 10900, true],
    ],
    Beverages: [
      ["Filter Coffee", "Traditional South Indian filter coffee.", 4900, true],
      ["Spiced Buttermilk", "Chilled buttermilk with curry leaves.", 4900, true],
    ],
  },
  italian: {
    Pasta: [
      ["Spaghetti Aglio Olio", "Garlic, chilli flakes and olive oil.", 26900, true, true],
      ["Pink Sauce Penne", "Penne in a creamy tomato sauce.", 27900, true],
      ["Chicken Pesto Fusilli", "Fusilli in basil pesto with grilled chicken.", 32900, false],
    ],
    Risotto: [["Wild Mushroom Risotto", "Creamy arborio rice with mushrooms.", 34900, true]],
    Starters: [
      ["Garlic Butter Prawns", "Prawns sautéed in garlic butter.", 38900, false, true],
      ["Caprese Salad", "Tomato, mozzarella, basil and olive oil.", 24900, true],
    ],
  },
  bbq: {
    "From the Grill": [
      ["Chicken Malai Tikka", "Creamy, mildly spiced grilled chicken.", 29900, false, true],
      ["Fish Tikka", "Basa fillets in a tandoori marinade.", 34900, false],
      ["Paneer Achari Tikka", "Paneer in a tangy pickle marinade.", 26900, true],
    ],
    Mains: [
      ["Butter Chicken", "Tandoori chicken in a velvety tomato gravy.", 32900, false, true],
      ["Dal Makhani", "Slow-cooked black lentils with butter.", 22900, true],
    ],
    Breads: [["Butter Naan", "Soft naan brushed with butter.", 6500, true]],
  },
  cafe: {
    "All Day Breakfast": [
      ["Eggs Benedict", "Poached eggs, hollandaise on an English muffin.", 29900, false, true],
      ["Avocado Toast", "Smashed avocado on sourdough with chilli flakes.", 27900, true, true],
      ["Pancake Stack", "Fluffy pancakes with maple syrup and berries.", 24900, true],
    ],
    Sandwiches: [
      ["Club Sandwich", "Triple-decker with chicken, egg and cheese.", 26900, false],
      ["Pesto Paneer Panini", "Grilled panini with pesto and paneer.", 23900, true],
    ],
    Coffee: [
      ["Cappuccino", "Double shot espresso with steamed milk.", 18900, true],
      ["Iced Latte", "Espresso over ice with cold milk.", 19900, true],
    ],
  },
  rolls: {
    Rolls: [
      ["Chicken Kathi Roll", "Spicy chicken tikka wrapped in a paratha.", 16900, false, true],
      ["Paneer Kathi Roll", "Paneer tikka, onions and mint chutney.", 14900, true, true],
      ["Egg Kathi Roll", "Double egg paratha with onions and sauces.", 11900, false],
    ],
    Wraps: [
      ["Falafel Wrap", "Falafel, hummus and salad in pita.", 17900, true],
      ["Chicken Shawarma Wrap", "Lebanese chicken shawarma with garlic toum.", 18900, false],
    ],
    Drinks: [["Fresh Lime Soda", "Sweet or salted lime soda.", 7900, true]],
  },
  thai: {
    Curries: [
      ["Thai Green Curry (Veg)", "Coconut green curry with vegetables and basil.", 29900, true, true],
      ["Thai Red Curry (Chicken)", "Spicy red curry with chicken.", 33900, false],
    ],
    "Noodles & Rice": [
      ["Chicken Pad Thai", "Rice noodles, peanuts, tamarind and chicken.", 31900, false, true],
      ["Thai Basil Fried Rice", "Jasmine rice with holy basil and chilli.", 24900, true],
    ],
    Soups: [["Tom Yum Soup", "Hot and sour lemongrass soup.", 18900, true]],
  },
};

// [id, name, cuisines, locality, areaName, cost, rating, ratings, minutes, veg, offer, template]
const ROWS = [
  ["100001", "Oven Story Pizza", ["Pizza", "Fast Food"], "Hill Road", "Bandra West", 400, 4.2, "6K+", 30, false, ["40% OFF", "UPTO ₹80"], "pizza"],
  ["100002", "The Burger Joint", ["Burgers", "American"], "Juhu Tara Road", "Juhu", 350, 4.3, "4K+", 25, false, ["₹100 OFF", "ABOVE ₹299"], "burger"],
  ["100003", "Bowl Theory", ["Healthy Food", "Salads"], "Waterfield Road", "Bandra West", 450, 4.5, "1K+", 25, false, ["15% OFF", "UPTO ₹60"], "healthy"],
  ["100004", "Punjab Grill House", ["North Indian", "Punjabi"], "Linking Road", "Khar West", 550, 4.4, "9K+", 35, false, ["ITEMS", "AT ₹199"], "northIndian"],
  ["100005", "Biryani Blues", ["Biryani", "Hyderabadi"], "SV Road", "Andheri West", 450, 4.3, "25K+", 35, false, ["50% OFF", "UPTO ₹100"], "biryani"],
  ["100006", "Wok Express", ["Chinese", "Asian"], "Lokhandwala", "Andheri West", 300, 4.0, "11K+", 30, false, ["₹75 OFF", "ABOVE ₹199"], "chinese"],
  ["100007", "Scoops & Slices", ["Desserts", "Ice Cream"], "Carter Road", "Bandra West", 250, 4.6, "5K+", 20, true, ["BUY 1", "GET 1 FREE"], "dessert"],
  ["100008", "Tokyo Bento", ["Japanese", "Sushi"], "Powai Plaza", "Powai", 900, 4.5, "2K+", 45, false, null, "japanese"],
  ["100009", "Udupi Café", ["South Indian", "Dosa"], "Matunga Road", "Matunga", 200, 4.6, "18K+", 20, true, ["₹50 OFF", "ABOVE ₹149"], "southIndian"],
  ["100010", "Trattoria Roma", ["Italian", "Pasta"], "Colaba Causeway", "Colaba", 700, 4.4, "3K+", 45, false, ["20% OFF", "UPTO ₹150"], "italian"],
  ["100011", "Tandoor Tales", ["BBQ", "North Indian", "Kebabs"], "Veera Desai Road", "Andheri West", 500, 4.2, "7K+", 40, false, ["30% OFF", "UPTO ₹90"], "bbq"],
  ["100012", "Sunday Brunch Café", ["Cafe", "Breakfast", "Continental"], "Pali Naka", "Bandra West", 600, 4.5, "4K+", 30, false, ["FREE", "COFFEE ABOVE ₹499"], "cafe"],
  ["100013", "Kathi Junction", ["Rolls & Wraps", "Fast Food"], "Station Road", "Santacruz West", 200, 4.1, "10K+", 20, false, ["₹60 OFF", "ABOVE ₹179"], "rolls"],
  ["100014", "Bangkok Street", ["Thai", "Asian"], "Hiranandani", "Powai", 650, 4.3, "1K+", 40, false, ["10% OFF", "UPTO ₹100"], "thai"],
  ["100015", "Slice of Napoli", ["Pizza", "Italian"], "Lower Parel", "Lower Parel", 600, 4.4, "3K+", 40, false, null, "pizza"],
  ["100016", "Green Leaf Kitchen", ["Healthy Food", "Vegan"], "Khar Danda", "Khar West", 400, 4.2, "900+", 25, true, ["20% OFF", "UPTO ₹70"], "healthy"],
  ["100017", "Dilli Darbar", ["North Indian", "Mughlai"], "Mohammed Ali Road", "Bhendi Bazaar", 400, 4.3, "30K+", 45, false, ["ITEMS", "AT ₹149"], "northIndian"],
  ["100018", "Paradise Biryani", ["Biryani", "Kebabs"], "Lokhandwala", "Andheri West", 500, 4.1, "14K+", 40, false, ["₹125 OFF", "ABOVE ₹349"], "biryani"],
  ["100019", "Dragon Bowl", ["Chinese", "Momos"], "Chembur Naka", "Chembur", 300, 3.9, "6K+", 35, false, ["40% OFF", "UPTO ₹80"], "chinese"],
  ["100020", "Sugar Rush Bakery", ["Desserts", "Bakery"], "Hill Road", "Bandra West", 300, 4.7, "2K+", 25, true, ["15% OFF", "UPTO ₹50"], "dessert"],
  ["100021", "Sakura Sushi Bar", ["Japanese", "Asian"], "BKC", "Bandra Kurla Complex", 1200, 4.6, "800+", 50, false, ["20% OFF", "UPTO ₹200"], "japanese"],
  ["100022", "Mysore Mess", ["South Indian", "Idli"], "Dadar TT", "Dadar East", 180, 4.4, "8K+", 25, true, null, "southIndian"],
  ["100023", "Pasta La Vista", ["Italian", "Continental"], "Phoenix Mills", "Lower Parel", 650, 4.0, "1K+", 40, false, ["₹100 OFF", "ABOVE ₹499"], "italian"],
  ["100024", "Smoke House Grill", ["BBQ", "Grilled"], "Juhu Beach Road", "Juhu", 800, 4.5, "5K+", 50, false, ["30% OFF", "UPTO ₹150"], "bbq"],
  ["100025", "Bean There Café", ["Cafe", "Beverages"], "Hiranandani", "Powai", 450, 4.3, "2K+", 30, true, ["₹50 OFF", "ABOVE ₹249"], "cafe"],
  ["100026", "Shawarma Street", ["Rolls & Wraps", "Lebanese"], "Linking Road", "Bandra West", 250, 4.2, "12K+", 25, false, ["50% OFF", "UPTO ₹100"], "rolls"],
  ["100027", "Siam Kitchen", ["Thai", "Pan-Asian"], "Kemps Corner", "Malabar Hill", 750, 4.4, "1K+", 45, false, null, "thai"],
  ["100028", "Burger Barn", ["Burgers", "Fast Food"], "Chembur Station", "Chembur", 250, 3.8, "3K+", 30, false, ["₹75 OFF", "ABOVE ₹199"], "burger"],
  ["100029", "Rajdhani Rasoi", ["North Indian", "Thali"], "Ghatkopar East", "Ghatkopar", 350, 4.5, "16K+", 35, true, ["20% OFF", "UPTO ₹80"], "northIndian"],
  ["100030", "Frozen Fantasies", ["Ice Cream", "Desserts"], "Marine Drive", "Churchgate", 200, 4.6, "4K+", 20, true, ["FLAT", "₹40 OFF"], "dessert"],
];

const slaString = (mins) => `${mins - 5}-${mins} mins`;

export const MORE_RESTAURANTS = ROWS.map(
  ([id, name, cuisines, locality, areaName, cost, rating, ratings, mins, veg, offer]) => ({
    id,
    name,
    cloudinaryImageId: `rng/md/carousel/production/${id}`,
    locality,
    areaName,
    costForTwo: `₹${cost} for two`,
    cuisines,
    avgRating: rating,
    avgRatingString: rating.toFixed(1),
    totalRatingsString: `${ratings} ratings`,
    veg,
    sla: { deliveryTime: mins, lastMileTravel: Number((mins / 9).toFixed(1)), slaString: slaString(mins) },
    ...(offer && { aggregatedDiscountInfoV3: { header: offer[0], subHeader: offer[1] } }),
  })
);

const TEMPLATE_BY_ID = Object.fromEntries(ROWS.map((row) => [row[0], row[11]]));

// Build menu categories ({ title, itemCards }) in the API shape.
// Pure-veg restaurants only get the veg dishes from their template.
export const buildMoreMenu = (resId) => {
  const template = TEMPLATES[TEMPLATE_BY_ID[resId]];
  if (!template) return null;
  const isVegOnly = MORE_RESTAURANTS.find((r) => r.id === resId)?.veg;

  let n = 0;
  return Object.entries(template)
    .map(([title, dishes]) => ({
      title,
      itemCards: dishes
        .filter(([, , , isVeg]) => !isVegOnly || isVeg)
        .map(([name, description, price, isVeg, bestseller]) => ({
          card: {
            info: {
              id: `${resId}_${++n}`,
              name,
              category: title,
              description,
              imageId: `${resId}_${n}_img`,
              price,
              defaultPrice: price,
              isVeg: isVeg ? 1 : 0,
              ...(bestseller && { bestseller: true }),
            },
          },
        })),
    }))
    .filter((category) => category.itemCards.length > 0);
};
