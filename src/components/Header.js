import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";
import Logo from "./ui/Logo";
import {
  BasketIcon,
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  HelpIcon,
  InfoIcon,
  MenuIcon,
  PinIcon,
  UserIcon,
  WifiOffIcon,
} from "./ui/Icons";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const NAV_LINKS = [
  { to: "/grocery", label: "Grocery", Icon: BasketIcon },
  { to: "/about", label: "About", Icon: InfoIcon },
  { to: "/contact", label: "Help", Icon: HelpIcon },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 font-semibold transition-colors hover:text-brand-500 ${
    isActive ? "text-brand-500" : "text-ink"
  }`;

const CartLink = ({ count }) => (
  <NavLink to="/cart" className={navLinkClass} aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}>
    <span className="relative">
      <CartIcon className="size-6" />
      <span
        data-testid="cartCount"
        className={`absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold leading-5 ${
          count > 0 ? "bg-brand-500 text-white" : "bg-gray-200 text-ink-muted"
        }`}
      >
        {count}
      </span>
    </span>
    <span>Cart</span>
  </NavLink>
);

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartCount = useSelector((store) => store.cart.items.length);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const signInButton = (
    <button
      type="button"
      onClick={() => setIsSignedIn((v) => !v)}
      className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-ink transition-colors hover:text-brand-500"
      title={isSignedIn ? "Sign out" : "Sign in"}
    >
      <UserIcon />
      <span>{isSignedIn ? loggedInUser : "Sign In"}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-header">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-6 px-4">
        <Link to="/" aria-label="FeastFly home" className="shrink-0 transition-transform hover:scale-105">
          <Logo />
        </Link>

        <button
          type="button"
          className="group hidden items-center gap-1 text-sm sm:flex"
          title="Delivery location"
        >
          <PinIcon className="size-4 text-brand-500" />
          <span className="font-bold text-ink underline decoration-2 underline-offset-4 group-hover:text-brand-500">
            Bandra West
          </span>
          <span className="max-w-40 truncate text-ink-muted">Mumbai, Maharashtra</span>
          <ChevronDownIcon className="size-4 text-brand-500" />
        </button>

        {/* Desktop nav */}
        <nav className="ml-auto hidden items-center gap-2 md:flex" aria-label="Main">
          {NAV_LINKS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
          {signInButton}
        </nav>

        {/* Cart (all sizes) + mobile menu toggle */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <CartLink count={cartCount} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-ink hover:bg-gray-100 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="border-t border-gray-100 px-4 py-2 md:hidden" aria-label="Mobile">
          {NAV_LINKS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
          {signInButton}
        </nav>
      )}

      {!onlineStatus && (
        <div
          role="status"
          className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-sm font-semibold text-white"
        >
          <WifiOffIcon className="size-4" />
          You're offline. Some things may not load until you reconnect.
        </div>
      )}
    </header>
  );
};

export default Header;
