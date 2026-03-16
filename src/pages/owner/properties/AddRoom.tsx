import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BedDouble, Plus, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import FoodPlanSelector from '@/components/property/FoodPlanSelector';
import AmenitiesSelector from '@/components/property/AmenitiesSelector';
import type { RoomType, FoodPlan, Bed } from '@/types/property.types';
import { generateId, nextBedLabel } from '@/data/mock-properties';

export default function AddRoomPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();

  const [roomNumber, setRoomNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('single');

  /* Single room config */
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [foodPlan, setFoodPlan] = useState<FoodPlan>('none');
  const [electricityIncluded, setElectricityIncluded] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);

  /* Sharing room — beds */
  const [beds, setBeds] = useState<Bed[]>([]);

  const toggleAmenity = (id: string) =>
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );

  const handleAddBed = () => {
    setBeds((prev) => [
      ...prev,
      {
        id: generateId(),
        label: nextBedLabel(prev),
        rent: 0,
        securityDeposit: 0,
        foodPlan: 'none',
        electricityIncluded: false,
        amenities: [],
        occupied: false,
      },
    ]);
  };

  const updateBed = (bedId: string, updates: Partial<Bed>) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === bedId ? { ...b, ...updates } : b)),
    );
  };

  const removeBed = (bedId: string) => {
    setBeds((prev) => prev.filter((b) => b.id !== bedId));
  };

  const toggleBedAmenity = (bedId: string, amenityId: string) => {
    setBeds((prev) =>
      prev.map((b) => {
        if (b.id !== bedId) return b;
        const has = b.amenities.includes(amenityId);
        return {
          ...b,
          amenities: has
            ? b.amenities.filter((a) => a !== amenityId)
            : [...b.amenities, amenityId],
        };
      }),
    );
  };

  const isValid = roomNumber.trim() && floorNumber.trim();

  const handleSave = () => {
    if (!isValid) return;
    // TODO: API call
    navigate(`/owner/properties/${propertyId}/details`);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 -ml-2 text-muted-foreground"
        onClick={() => navigate(`/owner/properties/${propertyId}/details`)}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Rooms
      </Button>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Add New Room
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure room type, pricing, and amenities.
        </p>
      </div>

      {/* Step 1: Basic Info */}
      <section className="rounded-2xl border border-border/70 bg-card p-6 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Room Details
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Room Number / Name *</Label>
            <Input
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="101"
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Floor Number *</Label>
            <Input
              value={floorNumber}
              onChange={(e) =>
                setFloorNumber(e.target.value.replace(/\D/g, ''))
              }
              placeholder="1"
              className="h-10"
            />
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Room Type *
          </Label>
          <RadioGroup
            value={roomType}
            onValueChange={(v) => setRoomType(v as RoomType)}
            className="grid grid-cols-2 gap-3"
          >
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-4 transition-all ${
                roomType === 'single'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border/60 hover:border-border'
              }`}
            >
              <RadioGroupItem value="single" />
              <div>
                <span className="text-sm font-semibold text-foreground">
                  Single
                </span>
                <p className="text-[11px] text-muted-foreground">
                  One tenant per room
                </p>
              </div>
            </label>
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-4 transition-all ${
                roomType === 'sharing'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border/60 hover:border-border'
              }`}
            >
              <RadioGroupItem value="sharing" />
              <div>
                <span className="text-sm font-semibold text-foreground">
                  Sharing
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Multiple beds per room
                </p>
              </div>
            </label>
          </RadioGroup>
        </div>
      </section>

      {/* Step 2: Configuration */}
      {roomType === 'single' ? (
        <motion.section
          key="single-config"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/70 bg-card p-6 space-y-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Room Configuration
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Monthly Rent (₹) *</Label>
              <Input
                value={rent}
                onChange={(e) => setRent(e.target.value.replace(/\D/g, ''))}
                placeholder="8000"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Security Deposit (₹)</Label>
              <Input
                value={deposit}
                onChange={(e) => setDeposit(e.target.value.replace(/\D/g, ''))}
                placeholder="8000"
                className="h-10"
              />
            </div>
          </div>

          {/* Electricity */}
          <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-border/60 px-4 py-3 transition-all hover:bg-muted/30">
            <Checkbox
              checked={electricityIncluded}
              onCheckedChange={(v) => setElectricityIncluded(!!v)}
            />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">
                Electricity included in rent
              </span>
            </div>
          </label>

          <FoodPlanSelector value={foodPlan} onChange={setFoodPlan} />
          <AmenitiesSelector selected={amenities} onToggle={toggleAmenity} />
        </motion.section>
      ) : (
        <motion.section
          key="sharing-config"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Beds Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Beds Configuration
              </h2>
              <p className="text-xs text-muted-foreground">
                Add beds and configure pricing for each bed
              </p>
            </div>
            <Button
              onClick={handleAddBed}
              className="gap-2 rounded-xl"
              size="sm"
            >
              <Plus className="h-3.5 w-3.5" /> Add Bed
            </Button>
          </div>

          {beds.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/70 bg-muted/10 py-14 text-center">
              <div className="mb-3 rounded-2xl bg-primary/10 p-4 text-primary">
                <BedDouble className="h-8 w-8" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No beds added yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click "Add Bed" to start configuring beds for this room
              </p>
              <Button
                onClick={handleAddBed}
                variant="outline"
                className="mt-4 gap-2 rounded-xl"
                size="sm"
              >
                <Plus className="h-3.5 w-3.5" /> Add First Bed
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {beds.map((bed, idx) => (
                <BedConfigCard
                  key={bed.id}
                  bed={bed}
                  index={idx}
                  onUpdate={(updates) => updateBed(bed.id, updates)}
                  onRemove={() => removeBed(bed.id)}
                  onToggleAmenity={(amenityId) =>
                    toggleBedAmenity(bed.id, amenityId)
                  }
                />
              ))}
            </div>
          )}
        </motion.section>
      )}

      {/* Save */}
      <div className="flex items-center justify-between pb-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/owner/properties/${propertyId}/details`)}
          className="gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isValid}
          className="gap-2 rounded-xl px-6 shadow-md shadow-primary/20"
        >
          Save Room
        </Button>
      </div>
    </div>
  );
}

/* ── Bed Config Card ── */

function BedConfigCard({
  bed,
  index,
  onUpdate,
  onRemove,
  onToggleAmenity,
}: {
  bed: Bed;
  index: number;
  onUpdate: (updates: Partial<Bed>) => void;
  onRemove: () => void;
  onToggleAmenity: (amenityId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-border/70 bg-card"
    >
      {/* Bed header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/20 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
            {bed.label}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Bed {bed.label}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Click to {expanded ? 'collapse' : 'expand'} configuration
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          className="text-destructive hover:bg-destructive/10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Button>
      </div>

      {/* Bed config */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="border-t border-border/60 px-5 py-5 space-y-5"
        >
          {/* Pricing */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Monthly Rent (₹) *</Label>
              <Input
                value={bed.rent || ''}
                onChange={(e) =>
                  onUpdate({
                    rent: parseInt(e.target.value.replace(/\D/g, ''), 10) || 0,
                  })
                }
                placeholder="6000"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Security Deposit (₹)</Label>
              <Input
                value={bed.securityDeposit || ''}
                onChange={(e) =>
                  onUpdate({
                    securityDeposit:
                      parseInt(e.target.value.replace(/\D/g, ''), 10) || 0,
                  })
                }
                placeholder="6000"
                className="h-10"
              />
            </div>
          </div>

          {/* Electricity */}
          <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-border/60 px-4 py-3 transition-all hover:bg-muted/30">
            <Checkbox
              checked={bed.electricityIncluded}
              onCheckedChange={(v) => onUpdate({ electricityIncluded: !!v })}
            />
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-foreground">
                Electricity included
              </span>
            </div>
          </label>

          {/* Food Plan */}
          <FoodPlanSelector
            value={bed.foodPlan}
            onChange={(v) => onUpdate({ foodPlan: v })}
          />

          {/* Amenities */}
          <AmenitiesSelector
            selected={bed.amenities}
            onToggle={onToggleAmenity}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
