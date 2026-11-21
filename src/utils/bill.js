// Bill rules (display only — there is no payment backend).
export const FREE_DELIVERY_ABOVE = 199; // matches the "Free delivery" deal
export const DELIVERY_FEE = 40;
export const PLATFORM_FEE = 5;
export const GST_RATE = 0.05; // GST & restaurant charges on the item total

const round2 = (n) => Math.round(n * 100) / 100;

/** Itemised bill for an item total in rupees. Empty cart → all zeros. */
export const computeBill = (itemTotal) => {
  if (itemTotal <= 0) {
    return { itemTotal: 0, deliveryFee: 0, platformFee: 0, gst: 0, toPay: 0, freeDelivery: false };
  }
  const freeDelivery = itemTotal >= FREE_DELIVERY_ABOVE;
  const deliveryFee = freeDelivery ? 0 : DELIVERY_FEE;
  const gst = round2(itemTotal * GST_RATE);
  return {
    itemTotal: round2(itemTotal),
    deliveryFee,
    platformFee: PLATFORM_FEE,
    gst,
    toPay: round2(itemTotal + deliveryFee + PLATFORM_FEE + gst),
    freeDelivery,
  };
};

const rupees = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

/** 1234.5 → "₹1,234.5", 299 → "₹299" */
export const formatRupees = (amount) => `₹${rupees.format(amount)}`;
