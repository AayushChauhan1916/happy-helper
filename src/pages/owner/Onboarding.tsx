import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import PropertyDetailsForm from '@/components/property/PropertyDetailsForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { INDIA_COUNTRY } from '@/constants/india-address';
import {
  ownerOnboardingSchema,
  type OwnerOnboardingFormData,
} from '@/schemas/owner/onboarding.schema';
import { useSubmitOwnerOnboardingMutation } from '@/redux/services/onboarding/onboarding.api';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { APP_NAME } from '@/constants/app';
import type { RootState } from '@/redux/app/store';

type OnboardingStep = 'personal' | 'property' | 'review' | 'success';

const stepList: Array<{ id: Exclude<OnboardingStep, 'success'>; label: string }> = [
  { id: 'personal', label: 'Personal Details' },
  { id: 'property', label: 'Property Details' },
  { id: 'review', label: 'Review' },
];

const OwnerOnboardingPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [step, setStep] = useState<OnboardingStep>('personal');
  const [submitError, setSubmitError] = useState('');
  const [submitOwnerOnboarding, { isLoading: isSubmitting }] =
    useSubmitOwnerOnboardingMutation();

  const form = useForm<OwnerOnboardingFormData>({
    resolver: zodResolver(ownerOnboardingSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      property: {
        name: '',
        contactNumber: '',
        description: '',
        address: {
          houseNumber: '',
          street: '',
          landmark: '',
          city: '',
          state: '',
          pincode: '',
          country: INDIA_COUNTRY,
        },
      },
    },
  });

  useEffect(() => {
    if (user?.fullName?.trim()) {
      form.setValue('fullName', user.fullName.trim(), {
        shouldDirty: false,
      });
    }
    if (user?.phoneNumber?.trim()) {
      form.setValue('phoneNumber', user.phoneNumber.trim(), {
        shouldDirty: false,
      });
    }
  }, [form, user?.fullName, user?.phoneNumber]);

  const values = form.watch();
  const watchedPhoneNumber = values.phoneNumber;

  useEffect(() => {
    const personalPhone = form.getValues('phoneNumber');
    const propertyContact = form.getValues('property.contactNumber');

    if (personalPhone.trim() && !propertyContact.trim()) {
      form.setValue('property.contactNumber', personalPhone.trim(), {
        shouldDirty: false,
      });
    }
  }, [form, watchedPhoneNumber]);

  const gotoPropertyStep = async () => {
    const isValid = await form.trigger(['fullName', 'phoneNumber']);
    if (isValid) {
      setStep('property');
    }
  };

  const gotoReview = async () => {
    const isValid = await form.trigger('property');
    if (isValid) {
      setStep('review');
    }
  };

  const submitOnboarding = async () => {
    setSubmitError('');
    const data = form.getValues();

    try {
      await submitOwnerOnboarding({
        fullName: data.fullName.trim(),
        phoneNumber: data.phoneNumber.trim(),
        property: {
          name: data.property.name.trim(),
          contactNumber: data.property.contactNumber.trim(),
          description: data.property.description?.trim() || undefined,
          address: {
            houseNumber: data.property.address.houseNumber.trim(),
            street: data.property.address.street.trim(),
            landmark: data.property.address.landmark?.trim() || undefined,
            city: data.property.address.city.trim(),
            state: data.property.address.state.trim(),
            pincode: data.property.address.pincode.trim(),
            country: INDIA_COUNTRY,
          },
        },
      }).unwrap();
      setStep('success');
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, 'Failed to submit onboarding. Please try again.'),
      );
    }
  };

  if (step === 'success') {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,hsl(var(--accent)/0.45),white_58%)] px-6">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Onboarding Completed Successfully
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Our team will verify your details and get back to you within
            24-48 hours. Meanwhile, you can manage your property from the owner
            dashboard.
          </p>
          <Button
            onClick={() => window.location.replace('/owner')}
            className="mt-9 gap-2 px-8 shadow-lg shadow-primary/20"
            size="lg"
          >
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-border/70 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              {APP_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {stepList.map((item, index) => {
              const currentIndex = stepList.findIndex((entry) => entry.id === step);
              const itemIndex = stepList.findIndex((entry) => entry.id === item.id);
              const active = item.id === step;
              const complete = currentIndex > itemIndex;

              return (
                <div key={item.id} className="flex items-center gap-2">
                  <div
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : complete
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </div>
                  {index < stepList.length - 1 && (
                    <span className="h-px w-4 bg-border" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        <Form {...form}>
          {step === 'personal' && (
            <form className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Add Personal Details
                </h1>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll use these details for your owner onboarding profile.
                </p>
              </div>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                        <Input
                          className="h-10 pl-10"
                          placeholder="Rahul Sharma"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-[11px] leading-4" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          className="h-12"
                          classNames={{
                            root: 'border-border/70 shadow-none',
                            countryButton:
                              'bg-muted/25 text-foreground hover:bg-muted/40',
                            input: 'text-sm',
                          }}
                          placeholder="+919876543210"
                          {...field}
                        />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button type="button" onClick={gotoPropertyStep} className="gap-2 px-6">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {step === 'property' && (
            <form className="space-y-4">
              <PropertyDetailsForm
                value={{
                  name: values.property.name,
                  contactNumber: values.property.contactNumber,
                  description: values.property.description ?? '',
                  address: {
                    ...values.property.address,
                    landmark: values.property.address.landmark ?? '',
                    country: values.property.address.country ?? INDIA_COUNTRY,
                  },
                }}
                onChange={(propertyValue) => {
                  form.setValue('property.name', propertyValue.name, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  form.setValue('property.contactNumber', propertyValue.contactNumber, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  form.setValue('property.description', propertyValue.description, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                  form.setValue('property.address', propertyValue.address, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                description="Enter your property details to continue onboarding."
                errors={{
                  name: form.formState.errors.property?.name?.message,
                  contactNumber:
                    form.formState.errors.property?.contactNumber?.message,
                  description:
                    form.formState.errors.property?.description?.message,
                  address: {
                    houseNumber:
                      form.formState.errors.property?.address?.houseNumber
                        ?.message,
                    street:
                      form.formState.errors.property?.address?.street?.message,
                    landmark:
                      form.formState.errors.property?.address?.landmark
                        ?.message,
                    city:
                      form.formState.errors.property?.address?.city?.message,
                    state:
                      form.formState.errors.property?.address?.state?.message,
                    pincode:
                      form.formState.errors.property?.address?.pincode?.message,
                    country:
                      form.formState.errors.property?.address?.country?.message,
                  },
                }}
              />

              <div className="flex items-center justify-between pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('personal')}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button type="button" onClick={gotoReview} className="gap-2 px-6">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Review Your Details
                </h1>
                <p className="text-sm text-muted-foreground">
                  Confirm the details before final submission.
                </p>
              </div>

              <div className="grid gap-4 rounded-xl border border-border/70 bg-card p-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mobile Number</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Property Name</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contact Number</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.contactNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">House Number</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.houseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Street</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.street}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Landmark</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.landmark || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.city}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">State</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.state}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pincode</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.pincode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.address.country}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {values.property.description || '-'}
                  </p>
                </div>
              </div>

              {submitError && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {submitError}
                </p>
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep('property')}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Edit Details
                </Button>
                <Button onClick={submitOnboarding} disabled={isSubmitting} className="gap-2 px-6">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Onboarding <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default OwnerOnboardingPage;
