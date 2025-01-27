"use client";

import Image from "next/image";
import IBranche from "app/types/braches";
import { useToggle } from "@uidotdev/usehooks";
import classNames from "classnames";
import { Button } from "app/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


type ListBranchesItemProps = {
  branch: IBranche;
  image: string;
};

export default function ListBranchesItem({
  branch,
  image,
}: ListBranchesItemProps) {
  const [expanded, toggleExpanded] = useToggle(false);
  const router = useRouter();

  router


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <Image
          src={image}
          alt={branch.nombre}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
          style={{ aspectRatio: "600/400", objectFit: "cover" }}
        />
        <div className="p-4 space-y-2">
          <Link href={`branch/${branch.id}`}><h3 className="text-xl font-semibold capitalize">{branch.nombre}</h3></Link>
          <div className="flex flex-col">
            <div className="flex flex-col space-y-1.5 items-end">
              <p
                className={classNames("text-sm text-muted-foreground", {
                  "line-clamp-3": !expanded,
                })}
              >
                {branch.descripcion}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleExpanded()}
              >
                {expanded ? "Read less..." : "Read more..."}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap">
            <span className="text-lg capitalize">
              {/* <MapPin size={24} /> */}
              {branch.direccion} , {branch.ciudad}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
