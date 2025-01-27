import { Suspense } from "react"
import ListCardSkeleton from "app/components/list-card-skeleton"
import ListBranches from "app/components/branches/list-branches";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<ListCardSkeleton />}>
      <ListBranches />
      </Suspense>
    </div>
  );
}





