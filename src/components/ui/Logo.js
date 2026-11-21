// FeastFly brand mark: a berry tile with a wing-shaped "flying dish" glyph,
// plus the wordmark. `compact` renders the mark only.

export const LogoMark = ({ className = "size-10" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="14" className="fill-brand-500" />
    <path
      d="M14 30c0 0 4-14 20-16-3 4-4 9-11 12 4 0 7-1 9-3-2 5-8 8-18 7z"
      fill="#fff"
    />
    <circle cx="17" cy="33" r="2.5" fill="#fff" />
  </svg>
);

const Logo = ({ compact = false, className = "" }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <LogoMark />
    {!compact && (
      <span className="text-2xl font-extrabold tracking-tight text-ink">
        Feast<span className="text-brand-500">Fly</span>
      </span>
    )}
  </span>
);

export default Logo;
