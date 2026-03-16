import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { AddressFields } from '@/components/property/AddProperty';
import PropertyAddressForm from '@/components/property/AddProperty';

type Step = 'details' | 'success';

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('details');

  /* form state */
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState<AddressFields>({
    houseNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const isValid =
    name.trim() &&
    address.houseNumber.trim() &&
    address.street.trim() &&
    address.city.trim() &&
    address.state.trim() &&
    address.pincode.trim();

  const handleSave = () => {
    if (!isValid) return;
    // TODO: API call to create property
    setStep('success');
  };

  /* ── Success screen ── */
  if (step === 'success') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Property Added Successfully!
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Your property <strong className="text-foreground">{name}</strong>{' '}
            has been created. Would you like to configure rooms now?
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/owner/properties')}
              className="gap-2 rounded-xl"
            >
              Maybe Later
            </Button>
            <Button
              onClick={() =>
                /* use a dummy id for now */
                navigate('/owner/properties/p1/rooms/add')
              }
              className="gap-2 rounded-xl shadow-md shadow-primary/20"
            >
              <Building2 className="h-4 w-4" /> Configure Rooms Now
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back + Title */}
      <div className="space-y-1">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 -ml-2 text-muted-foreground"
          onClick={() => navigate('/owner/properties')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Add New Property
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details for your new PG property.
        </p>
      </div>

      {/* Form Card */}
      <div className="space-y-6 rounded-2xl border border-border/70 bg-card p-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Basic Information
          </p>

          <div className="space-y-1.5">
            <Label>Property Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Green View PG"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Contact Number</Label>
            <Input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="+91 9876543210"
              className="h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Description (Optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your property..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/60" />

        {/* Address */}
        <PropertyAddressForm value={address} onChange={setAddress} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/owner/properties')}
          className="gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isValid}
          className="gap-2 rounded-xl px-6 shadow-md shadow-primary/20"
        >
          <Building2 className="h-4 w-4" /> Save Property
        </Button>
      </div>
    </div>
  );
}
