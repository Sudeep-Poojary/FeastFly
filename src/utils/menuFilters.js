// Filter menu categories by a dish search and a veg-only toggle.
// Categories left with no items are dropped.
export const filterMenu = (categories, { query = "", vegOnly = false } = {}) => {
  const q = query.trim().toLowerCase();
  if (!q && !vegOnly) return categories;

  return categories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          (!vegOnly || item.isVeg === 1) &&
          (!q ||
            item.name?.toLowerCase().includes(q) ||
            item.description?.toLowerCase().includes(q))
      ),
    }))
    .filter((category) => category.items.length > 0);
};
