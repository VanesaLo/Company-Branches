"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "app/components/ui/dialog";
import { IBranch } from "app/types/branch";
import FormBranch from "./form-branch";

type DialogFormBranchProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  branch?: IBranch;
};
export default function DialogFormBranch({
  open,
  setOpen,
  title,
  description,
  branch,
}: DialogFormBranchProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent className="sm:max-w-2xl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>

          <FormBranch branch={branch} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
