import ItemList from "./ItemList";
import { ChevronDownIcon } from "./ui/Icons";

// Accordion section. Open state is controlled by the parent (RestaurantMenu).
const RestaurantCategory = ({ data, restaurant, isOpen, onToggle }) => {
  const panelId = `category-${data.title.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <section className="border-b-[16px] border-gray-100 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between py-5 text-left"
        >
          <span className="text-lg font-extrabold text-ink">
            {data.title} ({data.items.length})
          </span>
          <ChevronDownIcon
            className={`size-6 text-ink transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </h3>

      {isOpen && (
        <div id={panelId}>
          <ItemList items={data.items} restaurant={restaurant} />
        </div>
      )}
    </section>
  );
};

export default RestaurantCategory;
