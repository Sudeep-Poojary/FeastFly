import Carousel from "../ui/Carousel";

// FeastFly-wide coupons shown on every menu (display only for now).
const APP_DEALS = [
  { header: "Flat ₹50 off", subHeader: "USE FEAST50", icon: "🏷️" },
  { header: "20% off upto ₹100", subHeader: "USE FLY20 · ABOVE ₹399", icon: "💸" },
  { header: "Free delivery", subHeader: "ON ORDERS ABOVE ₹199", icon: "🛵" },
];

const DealCard = ({ header, subHeader, icon }) => (
  <div className="flex w-72 shrink-0 snap-start items-center gap-3 rounded-2xl border border-gray-200 p-3">
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-50 text-2xl" aria-hidden="true">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="truncate font-extrabold text-ink">{header}</p>
      <p className="truncate text-xs font-bold text-ink-subtle">{subHeader}</p>
    </div>
  </div>
);

const DealsCarousel = ({ offer }) => {
  const deals = offer
    ? [{ header: `${offer.header} ${offer.subHeader}`.toLowerCase(), subHeader: "RESTAURANT OFFER", icon: "🎉" }, ...APP_DEALS]
    : APP_DEALS;

  return (
    <Carousel title="Deals for you" className="py-6">
      {deals.map((deal) => (
        <DealCard key={deal.header} {...deal} />
      ))}
    </Carousel>
  );
};

export default DealsCarousel;
