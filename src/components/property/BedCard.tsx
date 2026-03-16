import { Pencil, Trash2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AMENITY_OPTIONS, FOOD_PLAN_LABELS, type Bed } from '@/types/property.types';
import { formatRupee } from '@/data/mock-properties';

interface BedCardProps {
  bed: Bed;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BedCard({ bed, onEdit, onDelete }: BedCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/30 hover:shadow-md">
      {/* Top accent */}
      <div
        className={`h-1 w-full ${bed.occupied ? 'bg-emerald-400' : 'bg-primary/40'}`}
      />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                bed.occupied
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {bed.label}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Bed {bed.label}
              </p>
              <Badge
                variant={bed.occupied ? 'default' : 'secondary'}
                className={`mt-0.5 text-[10px] ${
                  bed.occupied
                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                    : ''
                }`}
              >
                {bed.occupied ? 'Occupied' : 'Available'}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="icon-xs" onClick={onEdit}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-destructive hover:bg-destructive/10"
              onClick={onDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-foreground">
            {formatRupee(bed.rent)}
          </span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>

        {/* Details */}
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p>Deposit: {formatRupee(bed.securityDeposit)}</p>
          <p>Food: {FOOD_PLAN_LABELS[bed.foodPlan]}</p>
          {bed.electricityIncluded && (
            <p className="text-primary font-medium">⚡ Electricity included</p>
          )}
        </div>

        {/* Amenities */}
        {bed.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {bed.amenities.map((a) => {
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

        {/* Tenant */}
        {bed.occupied && bed.tenantName && (
          <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">
              {bed.tenantName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
