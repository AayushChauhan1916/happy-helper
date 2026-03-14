import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronsUpDown,
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
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  INDIA_COUNTRY,
  INDIAN_STATES_AND_UTS,
} from '@/constants/india-address';
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
  const [stateSearch, setStateSearch] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
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

  const filteredStates = useMemo(
    () =>
      INDIAN_STATES_AND_UTS.filter((state) =>
        state.toLowerCase().includes(stateSearch.toLowerCase().trim()),
      ),
    [stateSearch],
  );

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
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Add Your Property
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your property details to continue onboarding.
                </p>
              </div>

              <FormField
                control={form.control}
                name="property.name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input className="h-10" placeholder="Green View PG" {...field} />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-[11px] leading-4" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="property.contactNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className="h-12"
                        classNames={{
                          root: 'border-border/70 shadow-none',
                          countryButton:
                            'bg-muted/25 text-foreground hover:bg-muted/40',
                          input: 'text-sm',
                        }}
                        placeholder="9876543210"
                        {...field}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-[11px] leading-4" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="property.address.houseNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>House Number</FormLabel>
                      <FormControl>
                        <Input className="h-10" placeholder="12A" {...field} />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property.address.street"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input className="h-10" placeholder="MG Road" {...field} />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="property.address.landmark"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10"
                        placeholder="Opposite City Mall"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-[11px] leading-4" />
                    </div>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="property.address.city"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input className="h-10" placeholder="Bengaluru" {...field} />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property.address.pincode"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="560001"
                          maxLength={6}
                          {...field}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value.replace(/\D/g, '').slice(0, 6),
                            )
                          }
                        />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="property.address.state"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>State</FormLabel>
                      <Popover open={stateOpen} onOpenChange={setStateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-10 w-full justify-between font-normal"
                          >
                            <span className="truncate">
                              {field.value || 'Select state'}
                            </span>
                            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          sideOffset={6}
                          className="w-[var(--radix-popover-trigger-width)] p-2"
                        >
                          <Input
                            placeholder="Search state..."
                            value={stateSearch}
                            onChange={(event) => setStateSearch(event.target.value)}
                            className="mb-2 h-9"
                          />
                          <div className="max-h-56 overflow-y-auto">
                            {filteredStates.map((state) => (
                              <button
                                key={state}
                                type="button"
                                onClick={() => {
                                  form.setValue('property.address.state', state, {
                                    shouldValidate: true,
                                  });
                                  setStateOpen(false);
                                  setStateSearch('');
                                }}
                                className="w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                              >
                                {state}
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
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="property.address.country"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-muted/30"
                          readOnly
                          {...field}
                          value={INDIA_COUNTRY}
                        />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="property.description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[86px] resize-none"
                        placeholder="Near metro station"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <div className="h-4">
                      <FormMessage className="text-[11px] leading-4" />
                    </div>
                  </FormItem>
                )}
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
