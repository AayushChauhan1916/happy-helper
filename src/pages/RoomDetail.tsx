import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  mockRooms, getRoomBeds, getBedStay, getRoomStay,
  getUserById, isVacatingSoon,
} from "@/data/mock-properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, BedDouble, User } from "lucide-react";
import { CreateStayDialog } from "@/components/stay/CreateStayDialog";
import { StayDetailsSheet } from "@/components/stay/StayDetailsSheet";
import type { Stay } from "@/types/property.types";

const RoomDetail = () => {
  const { propertyId, roomId } = useParams();
  const navigate = useNavigate();
  const room = mockRooms.find((r) => r.id === roomId);
  const [createStayOpen, setCreateStayOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [preselectedBedId, setPreselectedBedId] = useState<string | undefined>();

  if (!room) {
    return <div className="text-muted-foreground">Room not found</div>;
  }

  // Single room
  if (room.roomType === "single") {
    const stay = getRoomStay(room.id);
    const user = stay ? getUserById(stay.userId) : null;
    const vacating = stay ? isVacatingSoon(stay.endDate) : false;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/properties/${propertyId}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{room.name}</h1>
            <p className="text-sm text-muted-foreground">Single Room · Floor {room.floor}</p>
          </div>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Occupancy</CardTitle>
              {stay ? (
                <Badge
                  className="gap-1"
                  variant={vacating ? "outline" : "destructive"}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: vacating ? "hsl(var(--status-vacating))" : "hsl(var(--status-occupied))" }}
                  />
                  {vacating ? "Vacating Soon" : "Occupied"}
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-status-vacant" />
                  Vacant
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {stay && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Since: {new Date(stay.startDate).toLocaleDateString()}</p>
                  {stay.endDate && <p>Until: {new Date(stay.endDate).toLocaleDateString()}</p>}
                  {stay.notes && <p className="mt-1 italic">"{stay.notes}"</p>}
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedStay(stay)}>
                  View Details
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-3">This room is vacant</p>
                <Button
                  onClick={() => {
                    setPreselectedBedId(undefined);
                    setCreateStayOpen(true);
                  }}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Create Stay
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <CreateStayDialog
          open={createStayOpen}
          onOpenChange={setCreateStayOpen}
          preselectedPropertyId={propertyId}
          preselectedRoomId={roomId}
        />
        <StayDetailsSheet stay={selectedStay} onClose={() => setSelectedStay(null)} />
      </div>
    );
  }

  // Shared room - bed grid
  const beds = getRoomBeds(room.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/properties/${propertyId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{room.name}</h1>
          <p className="text-sm text-muted-foreground">Shared Room · Floor {room.floor} · {beds.length} beds</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beds.map((bed) => {
          const stay = getBedStay(bed.id);
          const user = stay ? getUserById(stay.userId) : null;
          const vacating = stay ? isVacatingSoon(stay.endDate) : false;

          return (
            <Card
              key={bed.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => {
                if (stay) {
                  setSelectedStay(stay);
                } else {
                  setPreselectedBedId(bed.id);
                  setCreateStayOpen(true);
                }
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">{bed.label}</CardTitle>
                  </div>
                  {stay ? (
                    <Badge
                      variant={vacating ? "outline" : "destructive"}
                      className="gap-1 text-xs"
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: vacating ? "hsl(var(--status-vacating))" : "hsl(var(--status-occupied))" }}
                      />
                      {vacating ? "Vacating" : "Occupied"}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <span className="inline-block h-2 w-2 rounded-full bg-status-vacant" />
                      Vacant
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {stay && user ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      Since {new Date(stay.startDate).toLocaleDateString()}
                    </p>
                    {stay.endDate && (
                      <Badge variant="outline" className="text-xs mt-1" style={{ borderColor: "hsl(var(--status-vacating))", color: "hsl(var(--status-vacating))" }}>
                        Vacating {new Date(stay.endDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Plus className="h-3.5 w-3.5" />
                    <span>Click to create stay</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CreateStayDialog
        open={createStayOpen}
        onOpenChange={setCreateStayOpen}
        preselectedPropertyId={propertyId}
        preselectedRoomId={roomId}
        preselectedBedId={preselectedBedId}
      />
      <StayDetailsSheet stay={selectedStay} onClose={() => setSelectedStay(null)} />
    </div>
  );
};

export default RoomDetail;
