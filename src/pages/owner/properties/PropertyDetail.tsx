import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BedDouble,
  Building2,
  MapPin,
  Phone,
  Plus,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MOCK_PROPERTIES,
  MOCK_ROOMS,
  formatRupee,
} from '@/data/mock-properties';
import type { Room } from '@/types/property.types';
import { FOOD_PLAN_LABELS, AMENITY_OPTIONS } from '@/types/property.types';

export default function PropertyDetailsPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
  const [rooms] = useState<Room[]>(
    MOCK_ROOMS.filter((r) => r.propertyId === propertyId),
  );

  if (!property) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <Building2 className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold text-foreground">
          Property not found
        </h2>
        <Button
          variant="outline"
          onClick={() => navigate('/owner/properties')}
          className="mt-4 gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 -ml-2 text-muted-foreground"
        onClick={() => navigate('/owner/properties')}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Properties
      </Button>

      {/* Property Info */}
      <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <div className="h-1.5 bg-gradient-to-r from-primary to-primary/50" />
        <div className="p-6 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {property.name}
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.address.houseNumber}, {property.address.street},{' '}
                  {property.address.city} - {property.address.pincode}
                </span>
                {property.contactNumber && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    {property.contactNumber}
                  </span>
                )}
              </div>
              {property.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {property.description}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
              <Pencil className="h-3.5 w-3.5" /> Edit Property
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="rounded-xl bg-muted/40 px-4 py-2">
              <span className="text-xs text-muted-foreground">Rooms</span>
              <p className="text-lg font-bold text-foreground">
                {rooms.length}
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 px-4 py-2">
              <span className="text-xs text-muted-foreground">Total Beds</span>
              <p className="text-lg font-bold text-foreground">
                {property.totalBeds}
              </p>
            </div>
            <div className="rounded-xl bg-muted/40 px-4 py-2">
              <span className="text-xs text-muted-foreground">Occupied</span>
              <p className="text-lg font-bold text-foreground">
                {property.occupiedBeds}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Rooms</h2>
          <p className="text-sm text-muted-foreground">
            {rooms.length} room{rooms.length !== 1 ? 's' : ''} in{' '}
            {property.name}
          </p>
        </div>
        <Button
          onClick={() => navigate(`/owner/properties/${propertyId}/rooms/add`)}
          className="gap-2 rounded-xl shadow-md shadow-primary/20"
        >
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      {/* Room List */}
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 py-16 text-center">
          <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
            <BedDouble className="h-8 w-8" />
          </div>
          <p className="text-sm font-medium text-foreground">No rooms yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Add your first room to this property
          </p>
          <Button
            onClick={() =>
              navigate(`/owner/properties/${propertyId}/rooms/add`)
            }
            className="mt-4 gap-2 rounded-xl"
            size="sm"
          >
            <Plus className="h-4 w-4" /> Add Room
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence>
            {rooms.map((room, idx) => (
              <RoomCard
                key={room.id}
                room={room}
                index={idx}
                onViewDetails={() =>
                  navigate(`/owner/properties/${propertyId}/rooms/${room.id}`)
                }
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ── Room Card ── */

function RoomCard({
  room,
  index,
  onViewDetails,
}: {
  room: Room;
  index: number;
  onViewDetails: () => void;
}) {
  const totalBeds = room.type === 'sharing' ? room.beds.length : 1;
  const occupiedBeds =
    room.type === 'sharing' ? room.beds.filter((b) => b.occupied).length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30 cursor-pointer"
      onClick={onViewDetails}
    >
      <div
        className={`h-1 w-full ${
          room.type === 'single'
            ? 'bg-gradient-to-r from-blue-400 to-blue-300'
            : 'bg-gradient-to-r from-primary to-primary/50'
        }`}
      />

      <div className="p-5 space-y-3">
        {/* Room header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BedDouble className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Room {room.roomNumber}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge
                  variant="secondary"
                  className="text-[10px] font-medium uppercase"
                >
                  {room.type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Floor {room.floorNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing / Beds */}
        {room.type === 'single' ? (
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">
                {formatRupee(room.rent ?? 0)}
              </span>
              <span className="text-xs text-muted-foreground">/month</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
              <span>Deposit: {formatRupee(room.securityDeposit ?? 0)}</span>
              <span>·</span>
              <span>{FOOD_PLAN_LABELS[room.foodPlan ?? 'none']}</span>
            </div>
            {room.amenities && room.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {room.amenities.map((a) => {
                  const am = AMENITY_OPTIONS.find((x) => x.id === a);
                  return am ? (
                    <span
                      key={a}
                      className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {am.label}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {totalBeds} bed{totalBeds !== 1 ? 's' : ''}
              </span>
              <Badge
                variant="secondary"
                className={`text-[10px] ${
                  occupiedBeds === totalBeds
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {occupiedBeds}/{totalBeds} occupied
              </Badge>
            </div>
            {/* Mini bed indicators */}
            <div className="flex gap-1.5">
              {room.beds.map((bed) => (
                <div
                  key={bed.id}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    bed.occupied
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  title={`Bed ${bed.label} - ${bed.occupied ? 'Occupied' : 'Available'}`}
                >
                  {bed.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View details */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 rounded-xl text-xs mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        >
          View Details & Configure
        </Button>
      </div>
    </motion.div>
  );
}
