import { INDIA_COUNTRY } from '@/constants/india-address';
import type { AddressFields } from '@/components/property/AddProperty';
import PropertyAddressForm from '@/components/property/AddProperty';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';

export interface PropertyFormValues {
  name: string;
  contactNumber: string;
  description: string;
  address: AddressFields;
}

export interface PropertyFormErrors {
  name?: string;
  contactNumber?: string;
  description?: string;
  address?: Partial<Record<keyof AddressFields, string>>;
}

interface PropertyDetailsFormProps {
  value: PropertyFormValues;
  onChange: (value: PropertyFormValues) => void;
  errors?: PropertyFormErrors;
  heading?: string;
  description?: string;
}

export default function PropertyDetailsForm({
  value,
  onChange,
  errors,
  heading = 'Add Your Property',
  description = 'Enter your property details to continue.',
}: PropertyDetailsFormProps) {
  const update = <K extends keyof PropertyFormValues>(
    key: K,
    fieldValue: PropertyFormValues[K],
  ) => {
    onChange({ ...value, [key]: fieldValue });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {heading}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-1">
        <Label>Property Name</Label>
        <Input
          value={value.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="Green View PG"
          className="h-10"
        />
        <div className="h-4">
          <p className="text-[11px] leading-4 text-destructive">
            {errors?.name ?? ''}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Contact Number</Label>
        <PhoneInput
          className="h-12"
          classNames={{
            root: 'border-border/70 shadow-none',
            countryButton: 'bg-muted/25 text-foreground hover:bg-muted/40',
            input: 'text-sm',
          }}
          value={value.contactNumber}
          onChange={(phone) => update('contactNumber', phone)}
          placeholder="9876543210"
        />
        <div className="h-4">
          <p className="text-[11px] leading-4 text-destructive">
            {errors?.contactNumber ?? ''}
          </p>
        </div>
      </div>

      <PropertyAddressForm
        value={value.address}
        onChange={(address) => update('address', address)}
        errors={errors?.address}
      />

      <div className="space-y-1">
        <Label>Country</Label>
        <Input
          className="h-10 bg-muted/30"
          readOnly
          value={value.address.country ?? INDIA_COUNTRY}
        />
      </div>

      <div className="space-y-1">
        <Label>Description (Optional)</Label>
        <Textarea
          value={value.description}
          onChange={(event) => update('description', event.target.value)}
          placeholder="Near metro station"
          className="min-h-[86px] resize-none"
        />
        <div className="h-4">
          <p className="text-[11px] leading-4 text-destructive">
            {errors?.description ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
}
