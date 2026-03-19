import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { INDIA_COUNTRY } from '@/constants/india-address';
import type { AddressFields } from '@/components/property/AddProperty';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';

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
    country: INDIA_COUNTRY,
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
    setStep('success');
  };

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
              onClick={() => navigate('/owner/properties/p1/rooms/add')}
              className="gap-2 rounded-xl shadow-md shadow-primary/20"
            >
              <Building2 className="h-4 w-4" /> Configure Rooms Now
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
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
      </div>

      <PropertyDetailsForm
        value={{
          name,
          contactNumber,
          description,
          address,
        }}
        onChange={(value) => {
          setName(value.name);
          setContactNumber(value.contactNumber);
          setDescription(value.description);
          setAddress(value.address);
        }}
        description="Enter your property details to continue."
      />

      {/* Actions */}
      <div className="flex items-center justify-between pb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/owner/properties')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid} className="gap-2 px-6">
          <Building2 className="h-4 w-4" /> Save Property
        </Button>
      </div>
    </div>
  );
}
