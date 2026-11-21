import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

// Accessible dialog: rendered in a portal, closes on Escape or backdrop click,
// moves focus into the dialog and restores it on close, and locks page scroll.
const Modal = ({ open, onClose, title, children }) => {
  const titleId = useId();
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const focusable = panelRef.current?.querySelector("button, [href], input, textarea, select");
    (focusable ?? panelRef.current)?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      >
        <h2 id={titleId} className="text-xl font-extrabold text-ink">
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
