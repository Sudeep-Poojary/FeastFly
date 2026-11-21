import Skeleton from "../ui/Skeleton";

export const CardSkeleton = () => (
  <div data-testid="cardSkeleton">
    <Skeleton className="aspect-[4/3] w-full rounded-card" />
    <div className="space-y-2 px-2 pt-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

export const CardGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: count }, (_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Full home-page placeholder: cuisine circles + card grid.
const Shimmer = () => (
  <div className="py-8" role="status" aria-label="Loading restaurants">
    <Skeleton className="mb-6 h-7 w-64" />
    <div className="mb-12 flex gap-6 overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex shrink-0 flex-col items-center gap-3">
          <Skeleton className="size-28 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
    <Skeleton className="mb-6 h-7 w-80" />
    <CardGridSkeleton />
  </div>
);

export default Shimmer;
