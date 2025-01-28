import { Suspense } from "react"
import ListCardSkeleton from "app/components/list-card-skeleton"
import HeaderDescription from "app/components/header-description";
import Branches from "app/components/branches/branches";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col space-y-8">
      <HeaderDescription title="Branches" description="View all your branches" />
      <Suspense fallback={<ListCardSkeleton />}>
        <Branches />
      </Suspense>
    </div>
  );
}





