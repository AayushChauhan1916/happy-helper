import { UtensilsCrossed } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FOOD_PLAN_LABELS, type FoodPlan } from '@/types/property.types';

interface FoodPlanSelectorProps {
  value: FoodPlan;
  onChange: (v: FoodPlan) => void;
}

const options: FoodPlan[] = ['none', '1_meal', '2_meals', '3_meals'];

export default function FoodPlanSelector({
  value,
  onChange,
}: FoodPlanSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <UtensilsCrossed className="h-3.5 w-3.5" /> Food Plan
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as FoodPlan)}
        className="grid grid-cols-2 gap-2"
      >
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm transition-all ${
              value === opt
                ? 'border-primary bg-primary/5 text-foreground shadow-sm'
                : 'border-border/60 text-muted-foreground hover:border-border hover:bg-muted/30'
            }`}
          >
            <RadioGroupItem value={opt} className="shrink-0" />
            <span className="font-medium">{FOOD_PLAN_LABELS[opt]}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
