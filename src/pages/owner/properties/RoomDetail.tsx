import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BedDouble, Plus, Pencil, Zap, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import FoodPlanSelector from '@/components/property/FoodPlanSelector';
import AmenitiesSelector from '@/components/property/AmenitiesSelector';
import BedCard from '@/components/property/BedCard';
import type { Room, Bed, FoodPlan } from '@/types/property.types';
import { FOOD_PLAN_LABELS, AMENITY_OPTIONS } from '@/types/property.types';
import {
  MOCK_ROOMS,
  formatRupee,
  generateId,
  nextBedLabel,
} from '@/data/mock-properties';

export default function RoomDetailPage() {
  const { propertyId, roomId } = useParams<{
    propertyId: string;
    roomId: string;
  }>();
  const navigate = useNavigate();

  const initialRoom = MOCK_ROOMS.find(
    (r) => r.id === roomId && r.propertyId === propertyId,
  );
  const [room, setRoom] = useState<Room | null>(initialRoom ?? null);
  const [isEditing, setIsEditing] = useState(false);

  /* Editing state for single rooms */
  const [editRent, setEditRent] = useState('');
  const [editDeposit, setEditDeposit] = useState('');
  const [editFoodPlan, setEditFoodPlan] = useState<FoodPlan>('none');
  const [editElectricity, setEditElectricity] = useState(false);
  const [editAmenities, setEditAmenities] = useState<string[]>([]);

  /* Bed editing */
  const [editingBedId, setEditingBedId] = useState<string | null>(null);
  const [bedEditRent, setBedEditRent] = useState('');
  const [bedEditDeposit, setBedEditDeposit] = useState('');
  const [bedEditFoodPlan, setBedEditFoodPlan] = useState<FoodPlan>('none');
  const [bedEditElectricity, setBedEditElectricity] = useState(false);
  const [bedEditAmenities, setBedEditAmenities] = useState<string[]>([]);

  if (!room) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <BedDouble className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h2 className="text-lg font-semibold text-foreground">
          Room not found
        </h2>
        <Button
          variant="outline"
          onClick={() => navigate(`/owner/properties/${propertyId}/details`)}
          className="mt-4 gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Rooms
        </Button>
      </div>
    );
  }

  /* ── Single room edit ── */
  const startEditing = () => {
    setEditRent(String(room.rent ?? 0));
    setEditDeposit(String(room.securityDeposit ?? 0));
    setEditFoodPlan(room.foodPlan ?? 'none');
    setEditElectricity(room.electricityIncluded ?? false);
    setEditAmenities(room.amenities ?? []);
    setIsEditing(true);
  };

  const saveRoomEdit = () => {
    setRoom({
      ...room,
      rent: parseInt(editRent, 10) || 0,
      securityDeposit: parseInt(editDeposit, 10) || 0,
      foodPlan: editFoodPlan,
      electricityIncluded: editElectricity,
      amenities: editAmenities,
    });
    setIsEditing(false);
  };

  const toggleEditAmenity = (id: string) =>
    setEditAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  /* ── Bed ops ── */
  const addBed = () => {
    const newBed: Bed = {
      id: generateId(),
      label: nextBedLabel(room.beds),
      rent: 0,
      securityDeposit: 0,
      foodPlan: 'none',
      electricityIncluded: false,
      amenities: [],
      occupied: false,
    };
    setRoom({ ...room, beds: [...room.beds, newBed] });
  };

  const deleteBed = (bedId: string) => {
    setRoom({ ...room, beds: room.beds.filter((b) => b.id !== bedId) });
  };

  const startBedEdit = (bed: Bed) => {
    setEditingBedId(bed.id);
    setBedEditRent(String(bed.rent));
    setBedEditDeposit(String(bed.securityDeposit));
    setBedEditFoodPlan(bed.foodPlan);
    setBedEditElectricity(bed.electricityIncluded);
    setBedEditAmenities([...bed.amenities]);
  };

  const saveBedEdit = () => {
    if (!editingBedId) return;
    setRoom({
      ...room,
      beds: room.beds.map((b) =>
        b.id === editingBedId
          ? {
              ...b,
              rent: parseInt(bedEditRent, 10) || 0,
              securityDeposit: parseInt(bedEditDeposit, 10) || 0,
              foodPlan: bedEditFoodPlan,
              electricityIncluded: bedEditElectricity,
              amenities: bedEditAmenities,
            }
          : b,
      ),
    });
    setEditingBedId(null);
  };

  const toggleBedEditAmenity = (id: string) =>
    setBedEditAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 -ml-2 text-muted-foreground"
        onClick={() => navigate(`/owner/properties/${propertyId}/details`)}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Rooms
      </Button>

      {/* Room Header */}
      <section className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <div
          className={`h-1.5 w-full ${
            room.type === 'single'
              ? 'bg-gradient-to-r from-blue-400 to-blue-300'
              : 'bg-gradient-to-r from-primary to-primary/50'
          }`}
        />
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BedDouble className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Room {room.roomNumber}
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium uppercase"
                  >
                    {room.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Floor {room.floorNumber}
                  </span>
                </div>
              </div>
            </div>

            {room.type === 'single' && !isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-xl"
                onClick={startEditing}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit Configuration
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── SINGLE ROOM ── */}
      {room.type === 'single' && !isEditing && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-border/70 bg-card p-6 space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Room Configuration
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <InfoTile
              label="Monthly Rent"
              value={formatRupee(room.rent ?? 0)}
            />
            <InfoTile
              label="Security Deposit"
              value={formatRupee(room.securityDeposit ?? 0)}
            />
            <InfoTile
              label="Food Plan"
              value={FOOD_PLAN_LABELS[room.foodPlan ?? 'none']}
            />
            <InfoTile
              label="Electricity"
              value={room.electricityIncluded ? 'Included' : 'Not included'}
            />
          </div>

          {room.amenities && room.amenities.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((a) => {
                  const am = AMENITY_OPTIONS.find((x) => x.id === a);
                  return am ? (
                    <span
                      key={a}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {am.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </motion.section>
      )}

      {/* Single room editing */}
      {room.type === 'single' && isEditing && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-primary/30 bg-card p-6 space-y-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Edit Configuration
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Monthly Rent (₹)</Label>
              <Input
                value={editRent}
                onChange={(e) => setEditRent(e.target.value.replace(/\D/g, ''))}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Security Deposit (₹)</Label>
              <Input
                value={editDeposit}
                onChange={(e) =>
                  setEditDeposit(e.target.value.replace(/\D/g, ''))
                }
                className="h-10"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-border/60 px-4 py-3 hover:bg-muted/30">
            <Checkbox
              checked={editElectricity}
              onCheckedChange={(v) => setEditElectricity(!!v)}
            />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">
                Electricity included
              </span>
            </div>
          </label>

          <FoodPlanSelector value={editFoodPlan} onChange={setEditFoodPlan} />
          <AmenitiesSelector
            selected={editAmenities}
            onToggle={toggleEditAmenity}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={saveRoomEdit}
              className="gap-2 rounded-xl shadow-md shadow-primary/20"
            >
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </motion.section>
      )}

      {/* ── SHARING ROOM — BEDS ── */}
      {room.type === 'sharing' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Beds ({room.beds.length})
              </h2>
              <p className="text-xs text-muted-foreground">
                Configure pricing and amenities for each bed
              </p>
            </div>
            <Button onClick={addBed} className="gap-2 rounded-xl" size="sm">
              <Plus className="h-3.5 w-3.5" /> Add Bed
            </Button>
          </div>

          {room.beds.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/70 bg-muted/10 py-14 text-center">
              <div className="mb-3 rounded-2xl bg-primary/10 p-4 text-primary">
                <BedDouble className="h-8 w-8" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No beds configured
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add beds to start configuring this room
              </p>
              <Button
                onClick={addBed}
                variant="outline"
                size="sm"
                className="mt-4 gap-2 rounded-xl"
              >
                <Plus className="h-3.5 w-3.5" /> Add First Bed
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Bed cards grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {room.beds.map((bed) => (
                  <BedCard
                    key={bed.id}
                    bed={bed}
                    onEdit={() => startBedEdit(bed)}
                    onDelete={() => deleteBed(bed.id)}
                  />
                ))}
              </div>

              {/* Inline bed editing */}
              {editingBedId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border-2 border-primary/30 bg-card p-6 space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Editing Bed{' '}
                      {room.beds.find((b) => b.id === editingBedId)?.label}
                    </p>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setEditingBedId(null)}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Monthly Rent (₹)</Label>
                      <Input
                        value={bedEditRent}
                        onChange={(e) =>
                          setBedEditRent(e.target.value.replace(/\D/g, ''))
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Security Deposit (₹)</Label>
                      <Input
                        value={bedEditDeposit}
                        onChange={(e) =>
                          setBedEditDeposit(e.target.value.replace(/\D/g, ''))
                        }
                        className="h-10"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-border/60 px-4 py-3 hover:bg-muted/30">
                    <Checkbox
                      checked={bedEditElectricity}
                      onCheckedChange={(v) => setBedEditElectricity(!!v)}
                    />
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium text-foreground">
                        Electricity included
                      </span>
                    </div>
                  </label>

                  <FoodPlanSelector
                    value={bedEditFoodPlan}
                    onChange={setBedEditFoodPlan}
                  />
                  <AmenitiesSelector
                    selected={bedEditAmenities}
                    onToggle={toggleBedEditAmenity}
                  />

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={saveBedEdit}
                      className="gap-2 rounded-xl shadow-md shadow-primary/20"
                    >
                      <Save className="h-4 w-4" /> Save Bed
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

/* ── Info Tile ── */

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
