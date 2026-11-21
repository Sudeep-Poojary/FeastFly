import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import useDocumentTitle from "../utils/useDocumentTitle";

// Rendered by the router outside AppLayout (no header/footer), so it carries
// its own minimal branding.
const Error = () => {
  const err = useRouteError();
  const notFound = isRouteErrorResponse(err) && err.status === 404;
  useDocumentTitle(notFound ? "Page not found" : "Something went wrong");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Link to="/" aria-label="FeastFly home" className="mb-10">
        <Logo />
      </Link>

      <p className="text-7xl" aria-hidden="true">
        {notFound ? "🍽️" : "😵"}
      </p>
      <h1 className="mt-6 text-3xl font-extrabold text-ink">
        {notFound ? "This page isn't on the menu" : "Something went wrong"}
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        {notFound
          ? "The page you're looking for doesn't exist or has moved."
          : "An unexpected error occurred. Please try again."}
      </p>
      {isRouteErrorResponse(err) && (
        <p className="mt-2 text-sm text-ink-subtle">
          {err.status} {err.statusText}
        </p>
      )}

      <Button to="/" size="lg" className="mt-8">
        Back to home
      </Button>
    </main>
  );
};

export default Error;
