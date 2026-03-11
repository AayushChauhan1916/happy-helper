import { useState } from 'react';
import {
  Building2,
  Building,
  Wifi,
  Wind,
  Bath,
  Landmark,
  Shirt,
  Car,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  onboardingPropertySchema,
  type OnboardingPropertyFormData,
} from '@/schemas/owner/onboarding.schema';

const amenitiesList = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'ac', label: 'AC Rooms', icon: Wind },
  { id: 'attached_bath', label: 'Attached Bath', icon: Bath },
  { id: 'balcony', label: 'Balcony', icon: Landmark },
  { id: 'laundry', label: 'Laundry', icon: Shirt },
  { id: 'parking', label: 'Parking', icon: Car },
];

const propertyTypes = [
  { value: 'mens', label: "Men's PG" },
  { value: 'womens', label: "Women's PG" },
  { value: 'coliving', label: 'Co-living' },
  { value: 'hostel', label: 'Hostel' },
];

const steps = [
  { number: 1, label: 'Property Details' },
  { number: 2, label: 'Confirmation' },
];

const OwnerOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [rentRange, setRentRange] = useState({ min: '', max: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<OnboardingPropertyFormData>({
    resolver: zodResolver(onboardingPropertySchema),
    defaultValues: {
      propertyName: '',
      propertyType: '',
      houseNumber: '',
      address: '',
      landmark: '',
      pincode: '',
      city: '',
      description: '',
    },
  });

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const handlePropertySubmit = async (_data: OnboardingPropertyFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(2);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-background sticky top-0 z-20">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              StayEase
            </span>
          </Link>

          {/* Step pills */}
          <div className="flex items-center gap-1.5">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center gap-1.5">
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    currentStep > step.number
                      ? 'bg-success/10 text-success'
                      : currentStep === step.number
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span className="h-4 w-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                      {step.number}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-6 h-px ${currentStep > step.number ? 'bg-success/40' : 'bg-border'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-6 py-10">
        {/* Step 1: Property Details */}
        {currentStep === 1 && (
          <div>
            <h1 className="text-[26px] font-bold text-foreground tracking-tight">
              Add your property
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground mb-8">
              Tell us about your PG — we'll get you set up in minutes.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePropertySubmit)}
                className="space-y-6"
              >
                {/* Property Name */}
                <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Property Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                          <Input
                            placeholder="e.g. Sunrise PG for Men"
                            className="pl-11 h-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Property Type
                      </FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              form.setValue('propertyType', type.value, {
                                shouldValidate: true,
                              })
                            }
                            className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                              field.value === type.value
                                ? 'border-primary/40 bg-primary/5 text-primary'
                                : 'border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Section */}
                <div className="space-y-4">
                  <p className="text-[13px] font-medium text-foreground">
                    Property Address
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] text-muted-foreground">
                            House / Bldg No.
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="42-A"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[11px] text-muted-foreground">
                              Street Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MG Road, Koramangala"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] text-muted-foreground">
                          Landmark{' '}
                          <span className="text-muted-foreground/50">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Near Forum Mall"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] text-muted-foreground">
                            Pincode
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="560095"
                              maxLength={6}
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] text-muted-foreground">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bangalore"
                              className="h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Rent Range */}
                <div>
                  <p className="text-[13px] font-medium text-foreground mb-3">
                    Monthly Rent Range
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-muted-foreground mb-1.5 block">
                        From
                      </label>
                      <Input
                        placeholder="₹ 5,000"
                        value={rentRange.min}
                        onChange={(e) =>
                          setRentRange((prev) => ({
                            ...prev,
                            min: e.target.value,
                          }))
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground mb-1.5 block">
                        To
                      </label>
                      <Input
                        placeholder="₹ 12,000"
                        value={rentRange.max}
                        onChange={(e) =>
                          setRentRange((prev) => ({
                            ...prev,
                            max: e.target.value,
                          }))
                        }
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities - highlight only, no tick */}
                <div>
                  <p className="text-[13px] font-medium text-foreground mb-1">
                    Amenities
                  </p>
                  <p className="text-[11px] text-muted-foreground mb-3">
                    Select all that your property offers
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {amenitiesList.map((amenity) => {
                      const selected = selectedAmenities.includes(amenity.id);
                      return (
                        <button
                          key={amenity.id}
                          type="button"
                          onClick={() => toggleAmenity(amenity.id)}
                          className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 ${
                            selected
                              ? 'border-primary bg-primary/8 text-primary shadow-sm shadow-primary/10'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/20 hover:text-foreground'
                          }`}
                        >
                          <amenity.icon
                            className={`h-5 w-5 ${selected ? 'text-primary' : ''}`}
                          />
                          <span className="text-xs font-medium">
                            {amenity.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[13px]">
                        Description{' '}
                        <span className="text-muted-foreground/50 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell tenants what makes your PG special..."
                          className="min-h-[80px] rounded-xl resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/15"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Property <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}

        {/* Step 2: Submitted — redirect to pending verification */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center text-center max-w-md mx-auto pt-8">
            <div className="relative inline-flex mb-8">
              <div className="h-24 w-24 rounded-3xl bg-success/10 flex items-center justify-center border border-success/20">
                <Check className="h-12 w-12 text-success" />
              </div>
            </div>

            <h1 className="text-[28px] font-bold text-foreground tracking-tight mb-3">
              Property Submitted! 🎉
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Your property{' '}
              <span className="font-semibold text-foreground">
                {form.getValues('propertyName') || 'property'}
              </span>{' '}
              has been submitted successfully. You'll be redirected to your
              dashboard.
            </p>

            <Button
              onClick={() => navigate('/owner')}
              className="w-full h-12 gap-2 rounded-xl shadow-lg shadow-primary/15 font-semibold"
              size="lg"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerOnboardingPage;
