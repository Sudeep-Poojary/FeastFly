import { useState } from "react";
import Button from "./ui/Button";
import useDocumentTitle from "../utils/useDocumentTitle";

// Lazy-loaded route (see App.js): this file ships in its own bundle.

const AISLES = [
  ["🍎", "Fruits"],
  ["🥦", "Vegetables"],
  ["🥛", "Dairy & Eggs"],
  ["🍞", "Bakery"],
  ["🍫", "Snacks"],
  ["🥤", "Drinks"],
  ["🧴", "Personal Care"],
  ["🧽", "Household"],
];

const PERKS = [
  ["⚡", "Delivery in minutes", "From dark stores right in your neighbourhood."],
  ["🏷️", "Everyday low prices", "Daily deals on fresh produce and staples."],
  ["🌿", "Fresh, always", "Quality-checked before every dispatch."],
];

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const NotifyForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | invalid | done

  const submit = (e) => {
    e.preventDefault();
    setStatus(isEmail(email) ? "done" : "invalid");
  };

  if (status === "done") {
    return (
      <p role="status" className="mt-8 rounded-2xl bg-white/15 px-5 py-4 font-semibold text-white">
        🎉 You're on the list! We'll email <strong>{email.trim()}</strong> when FeastFly Mart opens.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "invalid") setStatus("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? "notify-error" : undefined}
          className="w-full rounded-xl px-4 py-3 text-ink placeholder:text-ink-subtle focus:outline-white"
        />
        {status === "invalid" && (
          <span id="notify-error" className="mt-1 block text-sm font-semibold text-white">
            Please enter a valid email address.
          </span>
        )}
      </label>
      <Button type="submit" variant="secondary" size="lg" className="h-fit">
        Notify me
      </Button>
    </form>
  );
};

const Grocery = () => {
  useDocumentTitle("FeastFly Mart — coming soon");
  return (
    <div className="py-8">
      <section className="overflow-hidden rounded-3xl bg-linear-to-br from-brand-500 to-brand-700 px-6 py-12 text-white sm:px-12">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-100">Coming soon</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">FeastFly Mart</h1>
        <p className="mt-4 max-w-xl text-lg text-brand-50">
          Groceries and daily essentials, delivered to your door in minutes. We're stocking
          the shelves — leave your email and be the first to know when we open.
        </p>
        <NotifyForm />
      </section>

      <section className="mt-12" aria-labelledby="aisles-heading">
        <h2 id="aisles-heading" className="text-xl font-extrabold text-ink sm:text-2xl">
          A sneak peek at the aisles
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {AISLES.map(([emoji, name]) => (
            <li
              key={name}
              className="flex flex-col items-center gap-3 rounded-2xl bg-gray-50 p-6 text-center"
            >
              <span className="text-5xl" aria-hidden="true">{emoji}</span>
              <span className="font-bold text-ink">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {PERKS.map(([emoji, title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-100 p-6 shadow-card">
            <span className="text-3xl" aria-hidden="true">{emoji}</span>
            <h3 className="mt-3 font-extrabold text-ink">{title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Grocery;
