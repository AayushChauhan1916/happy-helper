import { Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AMENITY_OPTIONS } from '@/types/property.types';

interface AmenitiesSelectorProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function AmenitiesSelector({
  selected,
  onToggle,
}: AmenitiesSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5" /> Amenities
      </Label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {AMENITY_OPTIONS.map((am) => {
          const checked = selected.includes(am.id);
          return (
            <label
              key={am.id}
              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-all ${
                checked
                  ? 'border-primary bg-primary/5 text-foreground shadow-sm'
                  : 'border-border/60 text-muted-foreground hover:border-border hover:bg-muted/30'
              }`}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => onToggle(am.id)}
                className="shrink-0"
              />
              <span className="font-medium">{am.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
