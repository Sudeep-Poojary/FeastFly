import { computeBill, formatRupees, DELIVERY_FEE, PLATFORM_FEE } from "../bill";

it("returns zeros for an empty cart", () => {
  expect(computeBill(0)).toEqual({
    itemTotal: 0,
    deliveryFee: 0,
    platformFee: 0,
    gst: 0,
    toPay: 0,
    freeDelivery: false,
  });
});

it("charges delivery below the free-delivery threshold", () => {
  const bill = computeBill(150);
  expect(bill.freeDelivery).toBe(false);
  expect(bill.deliveryFee).toBe(DELIVERY_FEE);
  expect(bill.gst).toBe(7.5);
  expect(bill.toPay).toBe(150 + DELIVERY_FEE + PLATFORM_FEE + 7.5);
});

it("waives delivery from ₹199 up", () => {
  const bill = computeBill(199);
  expect(bill.freeDelivery).toBe(true);
  expect(bill.deliveryFee).toBe(0);
  expect(bill.toPay).toBe(199 + PLATFORM_FEE + 9.95);
});

it("rounds to paise", () => {
  expect(computeBill(997).gst).toBe(49.85);
  expect(computeBill(333.33).toPay).toBe(355); // 333.33 + 5 + 16.67
});

it("formats rupees in the Indian style", () => {
  expect(formatRupees(299)).toBe("₹299");
  expect(formatRupees(1051.85)).toBe("₹1,051.85");
  expect(formatRupees(123456)).toBe("₹1,23,456");
});
