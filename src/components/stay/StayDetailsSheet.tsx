import { getUserById } from "@/data/mock-properties";
import type { Stay } from "@/types/property.types";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, FileText } from "lucide-react";

interface StayDetailsSheetProps {
  stay: Stay | null;
  onClose: () => void;
}

export function StayDetailsSheet({ stay, onClose }: StayDetailsSheetProps) {
  if (!stay) return null;
  const user = getUserById(stay.userId);

  return (
    <Sheet open={!!stay} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stay Details</SheetTitle>
          <SheetDescription>Current occupancy information</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Tenant */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <User className="h-4 w-4" /> Tenant
            </div>
            {user && (
              <div className="space-y-1">
                <p className="font-medium text-foreground">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
                <Badge variant="outline" className="text-xs capitalize mt-1">{user.gender}</Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="h-4 w-4" /> Duration
            </div>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">From:</span> {new Date(stay.startDate).toLocaleDateString()}</p>
              {stay.endDate ? (
                <p><span className="text-muted-foreground">Until:</span> {new Date(stay.endDate).toLocaleDateString()}</p>
              ) : (
                <p className="text-muted-foreground italic">No end date set</p>
              )}
            </div>
            <Badge
              variant={stay.status === "active" ? "default" : "secondary"}
              className="capitalize"
            >
              {stay.status}
            </Badge>
          </div>

          {stay.notes && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" /> Notes
                </div>
                <p className="text-sm text-foreground">{stay.notes}</p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
