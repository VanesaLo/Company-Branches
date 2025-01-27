import { BranchDetail } from "app/components/branches/detail-branch";



export default async function BranchDetailHome({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <BranchDetail id={id} />;
}
