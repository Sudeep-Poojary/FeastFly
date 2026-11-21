import { useState } from "react";
import Button from "./ui/Button";
import { ChevronDownIcon } from "./ui/Icons";

const FAQS = [
  [
    "Why can't I add items from two restaurants?",
    "Each order is cooked and delivered by one restaurant, so a cart holds items from a single restaurant. Adding from another one asks if you'd like to start a new cart.",
  ],
  [
    "When is delivery free?",
    "Delivery is free on orders with an item total of ₹199 or more. Below that, a ₹40 delivery fee applies.",
  ],
  [
    "Will my cart be saved?",
    "Yes. Your cart is saved on this device, so it's still there if you close the tab or reload the page.",
  ],
  [
    "Can I pay online?",
    "Not yet — payments are coming soon. You can still build your cart and see the full bill.",
  ],
];

const EMPTY = { name: "", email: "", message: "" };

export const validateContact = ({ name, email, message }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Please enter a valid email address.";
  if (message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
};

const Field = ({ id, label, error, multiline = false, ...props }) => {
  const Input = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 text-ink placeholder:text-ink-subtle focus:outline-brand-500 ${
          error ? "border-nonveg" : "border-gray-200"
        } ${multiline ? "min-h-32 resize-y" : ""}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-nonveg">
          {error}
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    // No backend yet — just confirm and reset.
    setSentTo(values.name.trim());
    setValues(EMPTY);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 py-10 lg:grid-cols-[1fr_1.1fr]">
      <section>
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Help &amp; Support</h1>
        <p className="mt-2 text-ink-muted">
          Questions about an order or feedback for us? Send a message and we'll get back to you.
        </p>

        <h2 className="mt-10 text-lg font-extrabold text-ink">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100">
          {FAQS.map(([question, answer]) => (
            <details key={question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDownIcon className="size-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm text-ink-muted">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="h-fit rounded-3xl border border-gray-100 p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-extrabold text-ink">Contact us</h2>

        {sentTo && (
          <div role="status" className="mt-4 flex items-start justify-between gap-3 rounded-2xl bg-green-50 p-4 text-sm text-ink">
            <p>
              <strong>Thanks, {sentTo}!</strong> Your message has been sent. We'll reply within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSentTo(null)}
              className="text-ink-subtle hover:text-ink"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          <Field id="name" label="Name" placeholder="Name" value={values.name} onChange={update} error={errors.name} autoComplete="name" />
          <Field id="email" label="Email" type="email" placeholder="you@example.com" value={values.email} onChange={update} error={errors.email} autoComplete="email" />
          <Field id="message" label="Message" placeholder="How can we help?" value={values.message} onChange={update} error={errors.message} multiline />
          <Button type="submit" size="lg" className="w-full">
            Send message
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
