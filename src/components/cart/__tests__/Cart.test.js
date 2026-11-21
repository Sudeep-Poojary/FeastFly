import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import RestaurantMenu from "../../menu/RestaurantMenu";
import Header from "../../layout/Header";
import Cart from "../Cart";
import { makeStore } from "../../../utils/appStore";
import { buildMenuResponse, MENUS, RESTAURANTS } from "../../../data/restaurants";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(buildMenuResponse("123456")) })
  );
});

const renderAt = async (path, preloadedState) => {
  const store = makeStore(preloadedState);
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <Header />
          <Routes>
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  return store;
};

const burgerHub = RESTAURANTS.find((r) => r.id === "234567");
const aloo = MENUS["234567"][0].itemCards[1].card.info; // Aloo Tikki Burger, ₹99
const margherita = MENUS["123456"][0].itemCards[0].card.info; // ₹299
const pepperoni = MENUS["123456"][0].itemCards[1].card.info; // ₹399

const cartWith = (restaurant, lines) => ({
  cart: {
    restaurant: { id: restaurant.id, name: restaurant.name, areaName: restaurant.areaName },
    items: lines.map(([info, qty]) => ({ info, qty })),
  },
});

describe("Cart page", () => {
  it("shows an empty state with a link home", async () => {
    await renderAt("/cart");

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see restaurants near you/i })).toHaveAttribute("href", "/");
  });

  it("lists items with quantities, line totals and the restaurant", async () => {
    await renderAt("/cart", cartWith(RESTAURANTS[0], [[margherita, 2], [pepperoni, 1]]));

    const lines = screen.getAllByTestId("cartItems");
    expect(lines).toHaveLength(2);
    expect(within(lines[0]).getByTestId("itemQty")).toHaveTextContent("2");
    expect(within(lines[0]).getByTestId("lineTotal")).toHaveTextContent("₹598");
    expect(screen.getByRole("link", { name: /Pizza Paradise/ })).toHaveAttribute("href", "/restaurants/123456");
  });

  it("computes the bill (free delivery above ₹199)", async () => {
    await renderAt("/cart", cartWith(RESTAURANTS[0], [[margherita, 2], [pepperoni, 1]]));

    // 997 + 0 delivery + 5 platform + 49.85 GST
    expect(screen.getByText("FREE")).toBeInTheDocument();
    expect(screen.getByTestId("toPay")).toHaveTextContent("₹1,051.85");
    expect(screen.getByRole("button", { name: /Proceed to pay · ₹1,051.85/ })).toBeDisabled();
  });

  it("charges delivery on small orders and says how much more is needed", async () => {
    await renderAt("/cart", cartWith(burgerHub, [[aloo, 1]]));

    // 99 + 40 delivery + 5 platform + 4.95 GST
    expect(screen.getByText("Add ₹100 more for free delivery")).toBeInTheDocument();
    expect(screen.getByTestId("toPay")).toHaveTextContent("₹148.95");
  });

  it("updates quantities, removes lines and clears the cart", async () => {
    await renderAt("/cart", cartWith(RESTAURANTS[0], [[margherita, 1], [pepperoni, 1]]));

    fireEvent.click(screen.getByRole("button", { name: "Add one more Margherita Pizza" }));
    expect(screen.getByRole("link", { name: "Cart, 3 items" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Remove Pepperoni Pizza from cart" }));
    expect(screen.getAllByTestId("cartItems")).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Clear cart" }));
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
  });
});

describe("One restaurant per cart", () => {
  it("asks before replacing a cart from another restaurant", async () => {
    const store = await renderAt("/restaurants/123456", cartWith(burgerHub, [[aloo, 2]]));

    fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));
    const dialog = screen.getByRole("dialog", { name: "Items already in cart" });
    expect(dialog).toHaveTextContent("Your cart contains items from Burger Hub");
    expect(dialog).toHaveTextContent("adding items from Pizza Paradise");

    // "No" keeps the existing cart
    fireEvent.click(within(dialog).getByRole("button", { name: "No" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(store.getState().cart.restaurant.name).toBe("Burger Hub");

    // "Yes" starts a new cart with just this item
    fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));
    fireEvent.click(screen.getByRole("button", { name: "Yes, start afresh" }));

    expect(store.getState().cart.restaurant.name).toBe("Pizza Paradise");
    expect(store.getState().cart.items).toEqual([{ info: margherita, qty: 1 }]);
    expect(screen.getByRole("link", { name: "Cart, 1 item" })).toBeInTheDocument();
  });

  it("closes the dialog with Escape", async () => {
    await renderAt("/restaurants/123456", cartWith(burgerHub, [[aloo, 1]]));

    fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
