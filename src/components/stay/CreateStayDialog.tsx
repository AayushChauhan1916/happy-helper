import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { CreateStayWizard } from "@/components/stay/CreateStayWizard";

interface CreateStayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedPropertyId?: string;
  preselectedRoomId?: string;
  preselectedBedId?: string;
}

export function CreateStayDialog({
  open,
  onOpenChange,
  preselectedPropertyId,
  preselectedRoomId,
  preselectedBedId,
}: CreateStayDialogProps) {
  const hasContext = !!(preselectedPropertyId && preselectedRoomId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Stay</DialogTitle>
          <DialogDescription>
            Add a new tenant to {hasContext ? "this room" : "a property"}
          </DialogDescription>
        </DialogHeader>
        <CreateStayWizard
          skipLocationStep={hasContext}
          preselectedPropertyId={preselectedPropertyId}
          preselectedRoomId={preselectedRoomId}
          preselectedBedId={preselectedBedId}
          onComplete={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
