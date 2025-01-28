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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "app/components/ui/alert-dialog";
import { MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { deleteBranch } from "app/app/actions/branches.action";

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
  const [isDialogOpen, setDialogOpen] = useState(false);

  // -- Handlers
  const handleEdit = useCallback(() => {}, []);

  const handleDelete = useCallback(async (id: number) => {
    const branch = await deleteBranch(id);
    if (branch) router.refresh();
    setDialogOpen(false);
  }, [router]);

  // -- Render
  return (
    <>
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
                  <DropdownMenuItem onClick={() => setDialogOpen(true)}>
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleExpanded()}
            >
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
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected branche and remove the whole data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(branch.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
