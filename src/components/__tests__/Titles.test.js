import { act, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Body from "../home/Body";
import RestaurantMenu from "../menu/RestaurantMenu";
import Cart from "../cart/Cart";
import Contact from "../contact/Contact";
import Grocery from "../grocery/Grocery";
import { makeStore } from "../../utils/appStore";
import { buildListResponse, buildMenuResponse } from "../../data/restaurants";

const renderRoute = async (path, element, response) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(response ?? {}) })
  );
  await act(async () => {
    render(
      <Provider store={makeStore()}>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/restaurants/:resId" element={element} />
            <Route path="*" element={element} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
};

it.each([
  ["/", <Body />, buildListResponse(), "Order food online in Mumbai | FeastFly"],
  ["/restaurants/890123", <RestaurantMenu />, buildMenuResponse("890123"), "South Spice | FeastFly"],
  ["/cart", <Cart />, null, "Cart | FeastFly"],
  ["/contact", <Contact />, null, "Help & Support | FeastFly"],
  ["/grocery", <Grocery />, null, "FeastFly Mart — coming soon | FeastFly"],
])("sets the page title on %s", async (path, element, response, title) => {
  await renderRoute(path, element, response);
  expect(document.title).toBe(title);
});
