import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, formatRupees } from "../../utils/bill";

const Row = ({ label, value, hint, strike }) => (
  <div className="flex justify-between gap-4 py-1 text-sm text-ink-muted">
    <dt>
      {label}
      {hint && <span className="block text-xs text-ink-subtle">{hint}</span>}
    </dt>
    <dd className="text-right">
      {strike && <s className="mr-1.5 text-ink-subtle">{strike}</s>}
      {value}
    </dd>
  </div>
);

const BillDetails = ({ bill }) => {
  const remaining = FREE_DELIVERY_ABOVE - bill.itemTotal;

  return (
    <section aria-labelledby="bill-heading">
      <h3 id="bill-heading" className="mb-2 text-sm font-extrabold text-ink">
        Bill Details
      </h3>
      <dl>
        <Row label="Item Total" value={formatRupees(bill.itemTotal)} />
        <Row
          label="Delivery Fee"
          value={bill.freeDelivery ? <span className="font-bold text-rating">FREE</span> : formatRupees(bill.deliveryFee)}
          strike={bill.freeDelivery ? formatRupees(DELIVERY_FEE) : null}
          hint={bill.freeDelivery ? null : `Add ${formatRupees(remaining)} more for free delivery`}
        />
        <Row label="Platform Fee" value={formatRupees(bill.platformFee)} />
        <Row label="GST & Restaurant Charges" value={formatRupees(bill.gst)} />
      </dl>
      <div className="mt-3 flex justify-between border-t-2 border-ink py-3 font-extrabold text-ink">
        <span>TO PAY</span>
        <span data-testid="toPay">{formatRupees(bill.toPay)}</span>
      </div>
    </section>
  );
};

export default BillDetails;
