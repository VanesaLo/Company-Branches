import { Skeleton } from "app/components/ui/skeleton"

export default function ListCardSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 sm:gap-4 md:grids-col-3 md:gap-4 lg:grid-cols-4 lg:gap-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={`skeleton_${index}`} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )

}
