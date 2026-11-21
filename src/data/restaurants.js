// Local copy of the FeastFly dummy dataset.
//
// Mirrors the NamasteDev dummy API (see README) restaurant list from its docs.
// Used as a fallback when the live API is unreachable (offline, blocked by
// Cloudflare, CORS, timeouts) so the app always has data — including on Vercel.
// `cloudinaryImageId` / `imageId` are dummy ids, as in the API: the UI renders
// generated placeholder art instead of loading them.

import { MORE_RESTAURANTS, buildMoreMenu } from "./moreRestaurants";

const item = (id, name, category, description, price, isVeg, extra = {}) => ({
  card: {
    info: {
      id,
      name,
      category,
      description,
      imageId: `${id}_img`,
      price,
      defaultPrice: price,
      isVeg: isVeg ? 1 : 0,
      ...extra,
    },
  },
});

export const RESTAURANTS = [
  {
    id: "123456",
    name: "Pizza Paradise",
    cloudinaryImageId: "rng/md/carousel/production/pizza123",
    locality: "MG Road",
    areaName: "Central District",
    costForTwo: "₹400 for two",
    cuisines: ["Pizza", "Italian", "Fast Food"],
    avgRating: 4.3,
    avgRatingString: "4.3",
    totalRatingsString: "10K+ ratings",
    veg: false,
    sla: { deliveryTime: 30, lastMileTravel: 3.5, slaString: "30 mins" },
    aggregatedDiscountInfoV3: { header: "50% OFF", subHeader: "UPTO ₹100" },
  },
  {
    id: "234567",
    name: "Burger Hub",
    cloudinaryImageId: "rng/md/carousel/production/burger234",
    locality: "Linking Road",
    areaName: "Bandra West",
    costForTwo: "₹300 for two",
    cuisines: ["Burgers", "American", "Fast Food"],
    avgRating: 4.1,
    avgRatingString: "4.1",
    totalRatingsString: "5K+ ratings",
    veg: false,
    sla: { deliveryTime: 25, lastMileTravel: 2.1, slaString: "20-25 mins" },
    aggregatedDiscountInfoV3: { header: "₹125 OFF", subHeader: "ABOVE ₹249" },
  },
  {
    id: "345678",
    name: "Green Bites",
    cloudinaryImageId: "rng/md/carousel/production/green345",
    locality: "Hill Road",
    areaName: "Bandra West",
    costForTwo: "₹250 for two",
    cuisines: ["Healthy Food", "Salads", "Juices"],
    avgRating: 4.6,
    avgRatingString: "4.6",
    totalRatingsString: "2K+ ratings",
    veg: true,
    sla: { deliveryTime: 20, lastMileTravel: 1.4, slaString: "15-20 mins" },
    aggregatedDiscountInfoV3: { header: "20% OFF", subHeader: "UPTO ₹50" },
  },
  {
    id: "456789",
    name: "Spice Kingdom",
    cloudinaryImageId: "rng/md/carousel/production/spice456",
    locality: "SV Road",
    areaName: "Santacruz West",
    costForTwo: "₹500 for two",
    cuisines: ["North Indian", "Biryani", "Mughlai"],
    avgRating: 4.5,
    avgRatingString: "4.5",
    totalRatingsString: "20K+ ratings",
    veg: false,
    sla: { deliveryTime: 40, lastMileTravel: 4.8, slaString: "35-40 mins" },
    aggregatedDiscountInfoV3: { header: "ITEMS", subHeader: "AT ₹179" },
  },
  {
    id: "567890",
    name: "Chinese Dragon",
    cloudinaryImageId: "rng/md/carousel/production/dragon567",
    locality: "Turner Road",
    areaName: "Bandra West",
    costForTwo: "₹350 for two",
    cuisines: ["Chinese", "Asian", "Thai"],
    avgRating: 4.0,
    avgRatingString: "4.0",
    totalRatingsString: "8K+ ratings",
    veg: false,
    sla: { deliveryTime: 35, lastMileTravel: 3.9, slaString: "30-35 mins" },
    aggregatedDiscountInfoV3: { header: "40% OFF", subHeader: "UPTO ₹80" },
  },
  {
    id: "678901",
    name: "Dessert Delight",
    cloudinaryImageId: "rng/md/carousel/production/dessert678",
    locality: "Carter Road",
    areaName: "Khar West",
    costForTwo: "₹200 for two",
    cuisines: ["Desserts", "Ice Cream", "Bakery"],
    avgRating: 4.7,
    avgRatingString: "4.7",
    totalRatingsString: "3K+ ratings",
    veg: true,
    sla: { deliveryTime: 20, lastMileTravel: 1.8, slaString: "15-20 mins" },
    aggregatedDiscountInfoV3: { header: "BUY 1", subHeader: "GET 1 FREE" },
  },
  {
    id: "789012",
    name: "Sushi Station",
    cloudinaryImageId: "rng/md/carousel/production/sushi789",
    locality: "Waterfield Road",
    areaName: "Bandra West",
    costForTwo: "₹800 for two",
    cuisines: ["Japanese", "Sushi", "Asian"],
    avgRating: 4.4,
    avgRatingString: "4.4",
    totalRatingsString: "1K+ ratings",
    veg: false,
    sla: { deliveryTime: 45, lastMileTravel: 5.6, slaString: "40-45 mins" },
    aggregatedDiscountInfoV3: { header: "10% OFF", subHeader: "UPTO ₹150" },
  },
  {
    id: "890123",
    name: "South Spice",
    cloudinaryImageId: "rng/md/carousel/production/south890",
    locality: "Dadar TT",
    areaName: "Dadar East",
    costForTwo: "₹300 for two",
    cuisines: ["South Indian", "Dosa", "Idli"],
    avgRating: 4.2,
    avgRatingString: "4.2",
    totalRatingsString: "12K+ ratings",
    veg: true,
    sla: { deliveryTime: 30, lastMileTravel: 3.2, slaString: "25-30 mins" },
    aggregatedDiscountInfoV3: { header: "₹75 OFF", subHeader: "ABOVE ₹199" },
  },
  {
    id: "901234",
    name: "Pasta Palace",
    cloudinaryImageId: "rng/md/carousel/production/pasta901",
    locality: "Pali Hill",
    areaName: "Bandra West",
    costForTwo: "₹450 for two",
    cuisines: ["Italian", "Pasta", "Continental"],
    avgRating: 3.9,
    avgRatingString: "3.9",
    totalRatingsString: "900+ ratings",
    veg: false,
    sla: { deliveryTime: 35, lastMileTravel: 4.1, slaString: "30-35 mins" },
  },
  {
    id: "012345",
    name: "BBQ Nation",
    cloudinaryImageId: "rng/md/carousel/production/bbq012",
    locality: "Juhu Tara Road",
    areaName: "Juhu",
    costForTwo: "₹600 for two",
    cuisines: ["BBQ", "Grilled", "North Indian"],
    avgRating: 4.4,
    avgRatingString: "4.4",
    totalRatingsString: "15K+ ratings",
    veg: false,
    sla: { deliveryTime: 50, lastMileTravel: 6.3, slaString: "45-50 mins" },
    aggregatedDiscountInfoV3: { header: "30% OFF", subHeader: "UPTO ₹120" },
  },
];

// Menu categories per restaurant id. Prices are in paise, as in the API.
export const MENUS = {
  123456: [
    {
      title: "Recommended",
      itemCards: [
        item("item_001", "Margherita Pizza", "Pizza", "Classic delight with 100% real mozzarella cheese and fresh basil.", 29900, true, { bestseller: true }),
        item("item_002", "Pepperoni Pizza", "Pizza", "American classic with spicy pepperoni and loads of cheese.", 39900, false, { bestseller: true }),
        item("item_003", "Veggie Supreme", "Pizza", "Loaded with fresh vegetables, olives, jalapeños and sweet corn.", 34900, true),
      ],
    },
    {
      title: "Specialty Pizzas",
      itemCards: [
        item("item_004", "BBQ Chicken Pizza", "Pizza", "Grilled chicken with onions, smoky BBQ sauce and cheese.", 44900, false),
        item("item_005", "Hawaiian Pizza", "Pizza", "Tropical delight with ham and pineapple.", 42900, false),
        item("item_007", "Paneer Tikka Pizza", "Pizza", "Tandoori paneer, capsicum and onion on a cheesy base.", 41900, true),
      ],
    },
    {
      title: "Sides",
      itemCards: [
        item("item_008", "Garlic Breadsticks", "Sides", "Freshly baked breadsticks brushed with garlic butter.", 14900, true),
        item("item_009", "Cheesy Dip", "Sides", "Creamy, gooey cheese dip.", 4900, true),
      ],
    },
    {
      title: "Beverages",
      itemCards: [
        item("item_006", "Coca Cola", "Beverages", "Chilled 500ml Coca Cola.", 5900, true),
      ],
    },
  ],
  234567: [
    {
      title: "Recommended",
      itemCards: [
        item("bh_001", "Classic Chicken Burger", "Burgers", "Crispy chicken patty, lettuce, mayo in a toasted bun.", 18900, false, { bestseller: true }),
        item("bh_002", "Aloo Tikki Burger", "Burgers", "Spiced potato patty with tangy tomato mayo.", 9900, true, { bestseller: true }),
        item("bh_003", "Double Cheese Smash", "Burgers", "Two smashed patties, double cheddar, pickles.", 27900, false),
      ],
    },
    {
      title: "Fries & Sides",
      itemCards: [
        item("bh_004", "Peri Peri Fries", "Sides", "Crispy fries tossed in fiery peri peri spice.", 12900, true),
        item("bh_005", "Chicken Nuggets (6 pcs)", "Sides", "Golden fried nuggets with a dip of your choice.", 15900, false),
        item("bh_006", "Onion Rings", "Sides", "Beer-battered onion rings.", 11900, true),
      ],
    },
    {
      title: "Shakes",
      itemCards: [
        item("bh_007", "Chocolate Shake", "Beverages", "Thick chocolate shake topped with cream.", 14900, true),
        item("bh_008", "Strawberry Shake", "Beverages", "Fresh strawberry shake.", 14900, true),
      ],
    },
  ],
  345678: [
    {
      title: "Recommended",
      itemCards: [
        item("gb_001", "Quinoa Power Bowl", "Bowls", "Quinoa, chickpeas, roasted veggies and tahini dressing.", 27900, true, { bestseller: true }),
        item("gb_002", "Caesar Salad", "Salads", "Romaine, parmesan, croutons and classic Caesar dressing.", 22900, true),
      ],
    },
    {
      title: "Salads",
      itemCards: [
        item("gb_003", "Greek Salad", "Salads", "Cucumber, tomato, olives and feta with oregano dressing.", 21900, true),
        item("gb_004", "Sprouts Chaat Salad", "Salads", "Moong sprouts, onion, tomato, lemon and chaat masala.", 14900, true),
        item("gb_005", "Thai Peanut Salad", "Salads", "Crunchy veggies tossed in a sweet peanut dressing.", 23900, true),
      ],
    },
    {
      title: "Juices & Smoothies",
      itemCards: [
        item("gb_006", "Green Detox Juice", "Juices", "Spinach, cucumber, apple and lemon.", 12900, true),
        item("gb_007", "Berry Blast Smoothie", "Juices", "Mixed berries, banana and yogurt.", 15900, true),
      ],
    },
  ],
  456789: [
    {
      title: "Recommended",
      itemCards: [
        item("sk_001", "Chicken Dum Biryani", "Biryani", "Slow-cooked basmati rice layered with tender chicken.", 32900, false, { bestseller: true }),
        item("sk_002", "Paneer Butter Masala", "Main Course", "Cottage cheese in a rich, buttery tomato gravy.", 27900, true, { bestseller: true }),
        item("sk_003", "Mutton Rogan Josh", "Main Course", "Kashmiri-style mutton curry with aromatic spices.", 38900, false),
      ],
    },
    {
      title: "Biryani",
      itemCards: [
        item("sk_004", "Veg Dum Biryani", "Biryani", "Fragrant rice with garden vegetables and saffron.", 24900, true),
        item("sk_005", "Mutton Biryani", "Biryani", "Hyderabadi-style mutton biryani with raita.", 39900, false),
      ],
    },
    {
      title: "Breads",
      itemCards: [
        item("sk_006", "Butter Naan", "Breads", "Soft tandoor-baked naan with butter.", 5900, true),
        item("sk_007", "Garlic Naan", "Breads", "Naan topped with garlic and coriander.", 6900, true),
      ],
    },
  ],
  567890: [
    {
      title: "Recommended",
      itemCards: [
        item("cd_001", "Veg Hakka Noodles", "Noodles", "Wok-tossed noodles with crunchy vegetables.", 17900, true, { bestseller: true }),
        item("cd_002", "Chilli Chicken (Dry)", "Starters", "Crispy chicken tossed with peppers in chilli sauce.", 24900, false, { bestseller: true }),
      ],
    },
    {
      title: "Starters",
      itemCards: [
        item("cd_003", "Veg Manchurian", "Starters", "Vegetable dumplings in a tangy Manchurian sauce.", 18900, true),
        item("cd_004", "Crispy Honey Chilli Potato", "Starters", "Crispy potato fingers glazed with honey and chilli.", 16900, true),
        item("cd_005", "Dragon Prawns", "Starters", "Spicy, saucy wok-fried prawns.", 32900, false),
      ],
    },
    {
      title: "Rice & Noodles",
      itemCards: [
        item("cd_006", "Chicken Fried Rice", "Rice", "Classic fried rice with egg and chicken.", 21900, false),
        item("cd_007", "Schezwan Noodles", "Noodles", "Spicy Schezwan sauce noodles.", 18900, true),
      ],
    },
  ],
  678901: [
    {
      title: "Recommended",
      itemCards: [
        item("dd_001", "Chocolate Lava Cake", "Cakes", "Warm chocolate cake with a molten centre.", 14900, true, { bestseller: true }),
        item("dd_002", "Belgian Waffle", "Waffles", "Crisp waffle with chocolate drizzle.", 17900, true),
      ],
    },
    {
      title: "Ice Creams",
      itemCards: [
        item("dd_003", "Death by Chocolate Sundae", "Ice Cream", "Three scoops, brownie, fudge and nuts.", 22900, true, { bestseller: true }),
        item("dd_004", "Mango Alphonso Scoop", "Ice Cream", "Seasonal Alphonso mango ice cream.", 9900, true),
        item("dd_005", "Sizzling Brownie", "Desserts", "Hot brownie with vanilla ice cream on a sizzler plate.", 19900, true),
      ],
    },
    {
      title: "Cakes & Pastries",
      itemCards: [
        item("dd_006", "Red Velvet Pastry", "Cakes", "Moist red velvet with cream cheese frosting.", 11900, true),
        item("dd_007", "Blueberry Cheesecake", "Cakes", "Baked cheesecake with blueberry compote.", 16900, true),
      ],
    },
  ],
  789012: [
    {
      title: "Recommended",
      itemCards: [
        item("ss_001", "Salmon Nigiri (2 pcs)", "Sushi", "Fresh salmon over seasoned rice.", 34900, false, { bestseller: true }),
        item("ss_002", "Avocado Maki Roll", "Sushi", "Avocado and cucumber roll, 8 pieces.", 29900, true),
      ],
    },
    {
      title: "Sushi Rolls",
      itemCards: [
        item("ss_003", "California Roll", "Sushi", "Crab stick, avocado and cucumber, 8 pieces.", 39900, false),
        item("ss_004", "Spicy Tuna Roll", "Sushi", "Tuna with spicy mayo, 8 pieces.", 44900, false),
        item("ss_005", "Tempura Veg Roll", "Sushi", "Crispy tempura vegetables, 8 pieces.", 31900, true),
      ],
    },
    {
      title: "Ramen & Bowls",
      itemCards: [
        item("ss_006", "Chicken Ramen", "Ramen", "Rich broth, noodles, chicken and soft egg.", 42900, false),
        item("ss_007", "Miso Soup", "Soups", "Classic miso with tofu and seaweed.", 14900, true),
      ],
    },
  ],
  890123: [
    {
      title: "Recommended",
      itemCards: [
        item("sp_001", "Masala Dosa", "Dosa", "Crisp dosa with spiced potato filling, sambar and chutney.", 11900, true, { bestseller: true }),
        item("sp_002", "Idli Sambar (2 pcs)", "Idli", "Steamed rice cakes with sambar and chutney.", 7900, true, { bestseller: true }),
      ],
    },
    {
      title: "Dosas",
      itemCards: [
        item("sp_003", "Mysore Masala Dosa", "Dosa", "Dosa with spicy red chutney and potato filling.", 13900, true),
        item("sp_004", "Rava Onion Dosa", "Dosa", "Crispy semolina dosa with onions.", 12900, true),
        item("sp_005", "Cheese Dosa", "Dosa", "Dosa loaded with cheese.", 14900, true),
      ],
    },
    {
      title: "Beverages",
      itemCards: [
        item("sp_006", "Filter Coffee", "Beverages", "Traditional South Indian filter coffee.", 4900, true),
      ],
    },
  ],
  901234: [
    {
      title: "Recommended",
      itemCards: [
        item("pp_001", "Penne Arrabbiata", "Pasta", "Penne in a spicy tomato and garlic sauce.", 26900, true, { bestseller: true }),
        item("pp_002", "Chicken Alfredo", "Pasta", "Fettuccine in creamy parmesan sauce with chicken.", 32900, false),
      ],
    },
    {
      title: "Pasta",
      itemCards: [
        item("pp_003", "Pesto Spaghetti", "Pasta", "Spaghetti tossed in basil pesto with pine nuts.", 28900, true),
        item("pp_004", "Lasagna Bolognese", "Pasta", "Layered pasta with meat sauce and béchamel.", 35900, false),
        item("pp_005", "Mac & Cheese", "Pasta", "Baked macaroni in three-cheese sauce.", 24900, true),
      ],
    },
    {
      title: "Starters",
      itemCards: [
        item("pp_006", "Bruschetta", "Starters", "Toasted bread with tomato, basil and olive oil.", 16900, true),
      ],
    },
  ],
  "012345": [
    {
      title: "Recommended",
      itemCards: [
        item("bn_001", "Chicken Tikka", "Grill", "Char-grilled chicken marinated in yogurt and spices.", 29900, false, { bestseller: true }),
        item("bn_002", "Paneer Tikka", "Grill", "Smoky grilled paneer with peppers and onion.", 25900, true, { bestseller: true }),
      ],
    },
    {
      title: "From the Grill",
      itemCards: [
        item("bn_003", "Mutton Seekh Kebab", "Grill", "Minced mutton skewers with herbs.", 34900, false),
        item("bn_004", "Tandoori Prawns", "Grill", "Jumbo prawns in tandoori marinade.", 44900, false),
        item("bn_005", "Grilled Mushrooms", "Grill", "Stuffed mushrooms grilled with cheese.", 22900, true),
      ],
    },
    {
      title: "Mains",
      itemCards: [
        item("bn_006", "Dal Makhani", "Main Course", "Slow-cooked black lentils with butter and cream.", 21900, true),
        item("bn_007", "Butter Chicken", "Main Course", "Tandoori chicken in a velvety tomato gravy.", 31900, false),
      ],
    },
  ],
};

const CATEGORY_TYPE =
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";

// Build responses in exactly the shape the live API returns (see README).
export const buildListResponse = () => ({
  success: true,
  message: "Restaurant List fetched successfully",
  data: {
    data: {
      cards: [
        {},
        {
          card: {
            card: {
              gridElements: {
                infoWithStyle: {
                  restaurants: RESTAURANTS.map((info) => ({ info })),
                },
              },
            },
          },
        },
      ],
    },
  },
});

// Local-only "next pages" after the API's first page. Mirrors a typical
// cursor API: returns a slice plus the offset to ask for next (null = end).
export const getMoreRestaurantsPage = (offset = 0, limit = 8) => {
  const restaurants = MORE_RESTAURANTS.slice(offset, offset + limit);
  const next = offset + restaurants.length;
  return {
    restaurants,
    nextOffset: next < MORE_RESTAURANTS.length ? next : null,
  };
};

export const buildMenuResponse = (resId) => {
  const id = String(resId);
  const info =
    RESTAURANTS.find((r) => r.id === id) ?? MORE_RESTAURANTS.find((r) => r.id === id);
  if (!info) return { success: false, message: "Restaurant menu not found" };
  const categories = MENUS[id] ?? buildMoreMenu(id) ?? [];

  return {
    status: true,
    message: "Restaurant Menu fetched successfully",
    data: {
      cards: [
        {},
        {},
        { card: { card: { info: { ...info, costForTwoMessage: info.costForTwo } } } },
        {},
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: [
                  {},
                  ...categories.map((category) => ({
                    card: { card: { "@type": CATEGORY_TYPE, ...category } },
                  })),
                ],
              },
            },
          },
        },
      ],
    },
  };
};
