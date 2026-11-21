import { RESTAURANTS } from "../../data/restaurants";
import { MORE_RESTAURANTS } from "../../data/moreRestaurants";
import useGithubUser from "../../utils/useGithubUser";
import useDocumentTitle from "../../utils/useDocumentTitle";
import Skeleton from "../ui/Skeleton";
import { LogoMark } from "../ui/Logo";

const GITHUB_USERNAME = "Sudeep-Poojary";

const ALL_RESTAURANTS = [...RESTAURANTS, ...MORE_RESTAURANTS];
const STATS = [
  [ALL_RESTAURANTS.length, "Restaurants"],
  [new Set(ALL_RESTAURANTS.flatMap((r) => r.cuisines)).size, "Cuisines"],
  [new Set(ALL_RESTAURANTS.map((r) => r.areaName)).size, "Neighbourhoods"],
];

const TECH = ["React 18", "React Router 7", "Redux Toolkit", "Tailwind CSS 4", "Parcel", "Jest & RTL"];

const CreatorCard = () => {
  const { user, loading, error } = useGithubUser(GITHUB_USERNAME);

  if (loading) {
    return (
      <div className="flex items-center gap-5" role="status" aria-label="Loading profile">
        <Skeleton className="size-24 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
    );
  }

  const profileUrl = user?.html_url ?? `https://github.com/${GITHUB_USERNAME}`;

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {user?.avatar_url ? (
        <img
          src={user.avatar_url}
          loading="lazy"
          width="96"
          height="96"
          alt={`${user.name ?? GITHUB_USERNAME}'s avatar`}
          className="size-24 rounded-2xl object-cover shadow-card"
        />
      ) : (
        <span className="grid size-24 place-items-center rounded-2xl bg-gray-100 text-4xl" aria-hidden="true">
          👨‍💻
        </span>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-extrabold text-ink">{user?.name ?? GITHUB_USERNAME}</h3>
        {user?.bio && <p className="mt-1 text-ink-muted">{user.bio}</p>}
        {user?.location && <p className="mt-1 text-sm text-ink-subtle">📍 {user.location}</p>}
        {error && (
          <p className="mt-1 text-sm text-ink-subtle">Couldn't load the GitHub profile right now.</p>
        )}
      </div>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-gray-300 hover:bg-gray-50"
      >
        View on GitHub ↗
      </a>
    </div>
  );
};

const About = () => {
  useDocumentTitle("About");
  return (
    <div className="mx-auto max-w-4xl py-10">
      <section className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <LogoMark className="size-20 shrink-0" />
        <div>
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">About FeastFly</h1>
          <p className="mt-2 text-lg text-ink-muted">
            Hot food from your favourite neighbourhood restaurants, delivered fast.
          </p>
        </div>
      </section>

      <section className="mt-10 space-y-4 text-ink-muted">
        <p>
          FeastFly started as a learning project and grew into a full food-ordering experience:
          browse restaurants, filter by cuisine, rating or price, explore menus, and build a cart
          with a live bill — all in a fast, responsive interface.
        </p>
        <p>
          Restaurant and menu data comes from a Swiggy-style dummy API, with a bundled
          dataset as a fallback so the app always works.
        </p>
      </section>

      <dl className="mt-10 grid grid-cols-3 gap-4">
        {STATS.map(([value, label]) => (
          <div key={label} className="rounded-2xl bg-brand-50 p-5 text-center">
            <dt className="text-sm font-semibold text-ink-muted">{label}</dt>
            <dd className="text-3xl font-extrabold text-brand-600">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-xl font-extrabold text-ink">Built with</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {TECH.map((t) => (
            <li key={t} className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-semibold text-ink">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-3xl border border-gray-100 p-6 shadow-card" aria-labelledby="creator-heading">
        <h2 id="creator-heading" className="mb-5 text-xl font-extrabold text-ink">Made by</h2>
        <CreatorCard />
      </section>
    </div>
  );
};

export default About;
