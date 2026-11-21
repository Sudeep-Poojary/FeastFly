import { Link } from "react-router";

const VARIANTS = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
  secondary: "bg-white text-ink border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
  ghost: "text-ink hover:bg-gray-100",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

// Renders a <Link> when `to` is given, otherwise a <button>.
const Button = ({ variant = "primary", size = "md", to, className = "", ...props }) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  return to ? (
    <Link to={to} className={classes} {...props} />
  ) : (
    <button type="button" className={classes} {...props} />
  );
};

export default Button;
