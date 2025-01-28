"use client";

import Image from "next/image";
import { IBranch } from "app/types/branch";
import { useToggle } from "@uidotdev/usehooks";
import { Button } from "app/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "app/components/ui/dropdown-menu";
import { MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useCallback } from "react";
import classNames from "classnames";
import { useSession } from "next-auth/react";

type ListBranchesItemProps = {
  branch: IBranch;
  imageUrl: string;
};

export default function ListBranchesItem({
  branch,
  imageUrl,
}: ListBranchesItemProps) {
  // -- Hooks
  const { data: session } = useSession();
  const router = useRouter();

  // -- States
  const [expanded, toggleExpanded] = useToggle(false);

  // -- Handlers
  const handleEdit = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {}, []);

  // -- Render
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="relative p-0">
        <Image
          src={imageUrl}
          alt={branch.nombre}
          width={384}
          height={256}
          layout="responsive"
          className="object-cover"
        />
        {session?.user ? (
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white bg-opacity-50 hover:bg-opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="p-4">
        {/* Title */}
        <CardTitle className="text-xl font-bold mb-2">
          {branch.nombre}
        </CardTitle>

        {/* Description */}
        <div className="flex flex-col space-y-1.5 items-end">
          <p
            className={classNames("text-sm text-muted-foreground", {
              "line-clamp-3": !expanded,
            })}
          >
            {branch.descripcion}
          </p>
          <Button variant="outline" size="sm" onClick={() => toggleExpanded()}>
            {expanded ? "Read less..." : "Read more..."}
          </Button>
        </div>

        {/* Direction */}
        <div className="flex items-start space-x-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <p>{branch.direccion}</p>
            <p>
              {branch.ciudad}, {branch.estado}, {branch.pais}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
