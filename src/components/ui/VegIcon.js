// Indian food-labelling mark: green square + dot (veg), red square + triangle (non-veg).
const VegIcon = ({ isVeg, className = "size-4" }) => (
  <span
    role="img"
    aria-label={isVeg ? "Veg" : "Non-veg"}
    title={isVeg ? "Veg" : "Non-veg"}
    className={`inline-grid shrink-0 place-items-center rounded-[3px] border-[1.5px] ${
      isVeg ? "border-veg" : "border-nonveg"
    } ${className}`}
  >
    {isVeg ? (
      <span className="size-[55%] rounded-full bg-veg" />
    ) : (
      <span className="size-0 border-x-[4px] border-b-[7px] border-x-transparent border-b-nonveg" />
    )}
  </span>
);

export default VegIcon;
