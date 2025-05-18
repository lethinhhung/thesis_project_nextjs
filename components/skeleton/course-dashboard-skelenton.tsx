import { Skeleton } from "../ui/skeleton";

export default function CourseDashboardSkeleton() {
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4">
      <div className="w-full flex flex-col gap-2 sticky top-16">
        <Skeleton className="w-30 h-8" />
        <Skeleton className="w-full h-5" />
      </div>
      <div className="w-full sm:p-4 flex grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index: number) => (
          <Skeleton key={index} className="col-span-1 h-38" />
        ))}
      </div>
    </div>
  );
}
