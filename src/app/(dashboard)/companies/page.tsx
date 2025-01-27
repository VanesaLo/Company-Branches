
import HeaderDescription from "app/components/header-description"
import ListCompanies from "app/components/companies/list-companies"
import { Suspense } from "react"
import ListCardSkeleton from "app/components/list-card-skeleton"

export default function Companies() {
  return (
    <div className="flex flex-1 flex-col space-y-8">
      <HeaderDescription title="Companies" description="Centralize the information of all your companies" />
      <Suspense fallback={<ListCardSkeleton />}>
        <ListCompanies />
      </Suspense>
    </div>
  )
}
