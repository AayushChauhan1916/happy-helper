import { useParams, useNavigate } from "react-router-dom";
import { mockProperties, getPropertyRooms, getRoomOccupancy } from "@/data/mock-properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BedDouble, Users } from "lucide-react";

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.id === propertyId);

  if (!property) {
    return <div className="text-muted-foreground">Property not found</div>;
  }

  const rooms = getPropertyRooms(property.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{property.name}</h1>
          <p className="text-sm text-muted-foreground">{property.address}, {property.city}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => {
          const occ = getRoomOccupancy(room.id);
          const isFull = occ.vacant === 0;

          return (
            <Card
              key={room.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => navigate(`/properties/${property.id}/rooms/${room.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{room.name}</CardTitle>
                  <Badge variant="outline" className="text-xs capitalize">
                    {room.roomType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Floor {room.floor}</span>
                    <span className="font-medium">₹{room.rent.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{occ.occupied}/{occ.total}</span>
                    </div>
                    <Badge
                      className="gap-1 text-xs"
                      variant={isFull ? "destructive" : "secondary"}
                    >
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: isFull ? "hsl(var(--status-occupied))" : "hsl(var(--status-vacant))" }}
                      />
                      {isFull ? "Full" : `${occ.vacant} vacant`}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {room.foodPlan.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyDetail;
