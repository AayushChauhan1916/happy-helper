import { useNavigate } from "react-router-dom";
import { mockProperties, getPropertyOccupancy, getPropertyRooms } from "@/data/mock-properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, BedDouble } from "lucide-react";

const PropertiesList = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Properties</h1>
        <p className="text-muted-foreground">Manage your PG properties and rooms</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.map((property) => {
          const occupancy = getPropertyOccupancy(property.id);
          const rooms = getPropertyRooms(property.id);
          const occupancyPercent = occupancy.totalBeds > 0
            ? Math.round((occupancy.occupiedBeds / occupancy.totalBeds) * 100)
            : 0;

          return (
            <Card
              key={property.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{property.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {property.address}, {property.city}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{rooms.length} Rooms</span>
                    <span className="text-muted-foreground">{occupancy.totalBeds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={occupancy.vacantBeds > 0 ? "secondary" : "destructive"} className="gap-1">
                      <BedDouble className="h-3 w-3" />
                      {occupancy.vacantBeds} vacant
                    </Badge>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Occupancy</span>
                    <span>{occupancyPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${occupancyPercent}%` }}
                    />
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

export default PropertiesList;
