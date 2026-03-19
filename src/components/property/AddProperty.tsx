import { useMemo, useState } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { INDIAN_STATES_AND_UTS } from '@/constants/india-address';

export interface AddressFields {
  houseNumber: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

interface Props {
  value: AddressFields;
  onChange: (v: AddressFields) => void;
  errors?: Partial<Record<keyof AddressFields, string>>;
}

export default function PropertyAddressForm({
  value,
  onChange,
  errors,
}: Props) {
  const [stateOpen, setStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');

  const filteredStates = useMemo(
    () =>
      INDIAN_STATES_AND_UTS.filter((s) =>
        s.toLowerCase().includes(stateSearch.toLowerCase().trim()),
      ),
    [stateSearch],
  );

  const update = (key: keyof AddressFields, val: string) =>
    onChange({ ...value, [key]: val });

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Address
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">House No. *</Label>
          <Input
            value={value.houseNumber}
            onChange={(e) => update('houseNumber', e.target.value)}
            placeholder="12A"
            className="h-10"
          />
          <div className="h-4">
            <p className="text-[11px] leading-4 text-destructive">
              {errors?.houseNumber ?? ''}
            </p>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Street *</Label>
          <Input
            value={value.street}
            onChange={(e) => update('street', e.target.value)}
            placeholder="MG Road"
            className="h-10"
          />
          <div className="h-4">
            <p className="text-[11px] leading-4 text-destructive">
              {errors?.street ?? ''}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Landmark</Label>
        <Input
          value={value.landmark}
          onChange={(e) => update('landmark', e.target.value)}
          placeholder="Near City Mall"
          className="h-10"
        />
        <div className="h-4">
          <p className="text-[11px] leading-4 text-destructive">
            {errors?.landmark ?? ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">City *</Label>
          <Input
            value={value.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder="Bengaluru"
            className="h-10"
          />
          <div className="h-4">
            <p className="text-[11px] leading-4 text-destructive">
              {errors?.city ?? ''}
            </p>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Pincode *</Label>
          <Input
            value={value.pincode}
            onChange={(e) =>
              update('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            placeholder="560001"
            maxLength={6}
            className="h-10"
          />
          <div className="h-4">
            <p className="text-[11px] leading-4 text-destructive">
              {errors?.pincode ?? ''}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">State *</Label>
        <Popover open={stateOpen} onOpenChange={setStateOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="h-10 w-full justify-between font-normal text-sm"
            >
              <span className="truncate">{value.state || 'Select state'}</span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="start">
            <div className="border-b border-border/60 p-2">
              <Input
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                placeholder="Search state..."
                className="h-8 text-xs"
              />
            </div>
            <div className="max-h-52 overflow-y-auto p-1">
              {filteredStates.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent/50 transition-colors"
                  onClick={() => {
                    update('state', s);
                    setStateOpen(false);
                    setStateSearch('');
                  }}
                >
                  {value.state === s && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                  <span className={value.state === s ? 'font-medium' : ''}>
                    {s}
                  </span>
                </button>
              ))}
              {filteredStates.length === 0 && (
                <p className="px-2 py-2 text-xs text-muted-foreground">
                  No state found
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="h-4">
          <p className="text-[11px] leading-4 text-destructive">
            {errors?.state ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
}
