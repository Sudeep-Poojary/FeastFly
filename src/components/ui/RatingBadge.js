const StarIcon = () => (
  <svg viewBox="0 0 20 20" className="size-3 fill-white" aria-hidden="true">
    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
  </svg>
);

// Green circle with a white star, followed by the rating value.
const RatingBadge = ({ rating, className = "" }) => (
  <span className={`inline-flex items-center gap-1 font-bold text-ink ${className}`}>
    <span className="grid size-5 place-items-center rounded-full bg-rating">
      <StarIcon />
    </span>
    <span aria-label={`Rated ${rating} out of 5`}>{rating ?? "--"}</span>
  </span>
);

export default RatingBadge;
