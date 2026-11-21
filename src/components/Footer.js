import { Link } from "react-router";
import Logo from "./ui/Logo";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About us" },
      { to: "/contact", label: "Contact us" },
      { to: "/contact", label: "Help & Support" },
    ],
  },
  {
    title: "Explore",
    links: [
      { to: "/", label: "Restaurants" },
      { to: "/grocery", label: "Grocery" },
      { to: "/cart", label: "Your cart" },
    ],
  },
  {
    title: "We deliver to",
    links: [
      { to: "/", label: "Bandra" },
      { to: "/", label: "Khar" },
      { to: "/", label: "Juhu" },
      { to: "/", label: "Dadar" },
    ],
  },
];

const Footer = () => (
  <footer className="mt-16 bg-gray-50 text-ink-muted">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Logo />
        <p className="mt-3 text-sm">
          Hot food from your favourite restaurants, delivered fast.
        </p>
        <p className="mt-6 text-sm">© {new Date().getFullYear()} FeastFly</p>
      </div>

      {COLUMNS.map((col) => (
        <div key={col.title}>
          <h3 className="mb-4 font-bold text-ink">{col.title}</h3>
          <ul className="space-y-3 text-sm">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="transition-colors hover:text-brand-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

export default Footer;
