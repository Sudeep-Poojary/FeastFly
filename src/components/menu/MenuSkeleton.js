import Skeleton from "../ui/Skeleton";

const MenuSkeleton = () => (
  <div className="mx-auto max-w-3xl py-6" role="status" aria-label="Loading menu">
    <Skeleton className="h-3 w-48" />
    <Skeleton className="mt-6 h-8 w-64" />
    <Skeleton className="mt-4 h-36 w-full rounded-3xl" />
    <div className="mt-8 flex gap-4 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-16 w-72 shrink-0 rounded-2xl" />
      ))}
    </div>
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex gap-6 border-b border-gray-100 py-6">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-32 w-36 rounded-2xl" />
      </div>
    ))}
  </div>
);

export default MenuSkeleton;
