import Carousel from "../ui/Carousel";
import FoodImage from "../FoodImage";

// "What's on your mind?" — round cuisine tiles. Clicking one filters the
// restaurant grid; clicking the active one clears it.
const CuisineCarousel = ({ cuisines, selected, onSelect }) => (
  <Carousel title="What's on your mind?" className="py-8">
    {cuisines.map((cuisine) => {
      const isActive = selected === cuisine;
      return (
        <button
          key={cuisine}
          type="button"
          onClick={() => onSelect(isActive ? null : cuisine)}
          aria-pressed={isActive}
          className="group flex w-28 shrink-0 snap-start flex-col items-center gap-2 sm:w-32"
        >
          <FoodImage
            label={cuisine}
            className={`size-24 rounded-full ring-offset-2 transition-all sm:size-28 ${
              isActive ? "ring-4 ring-brand-500" : "group-hover:ring-2 group-hover:ring-gray-200"
            }`}
            emojiClassName="text-5xl transition-transform group-hover:scale-110"
          />
          <span
            className={`text-sm font-semibold ${isActive ? "text-brand-500" : "text-ink-muted"}`}
          >
            {cuisine}
          </span>
        </button>
      );
    })}
  </Carousel>
);

export default CuisineCarousel;
