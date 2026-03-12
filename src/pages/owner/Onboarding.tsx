import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ChevronsUpDown,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  onboardingPropertySchema,
  type OnboardingPropertyFormData,
} from '@/schemas/owner/onboarding.schema';
import { useCreatePropertyMutation } from '@/redux/services/property/property.api';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { APP_NAME } from '@/constants/app';

type OnboardingStep = 'details' | 'review' | 'success';

const stepList: Array<{ id: OnboardingStep; label: string }> = [
  { id: 'details', label: 'Property Details' },
  { id: 'review', label: 'Review' },
  { id: 'success', label: 'Done' },
];

const OwnerOnboardingPage = () => {
  const [step, setStep] = useState<OnboardingStep>('details');
  const [submitError, setSubmitError] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [createProperty, { isLoading: isSubmitting }] = useCreatePropertyMutation();

  const form = useForm<OnboardingPropertyFormData>({
    resolver: zodResolver(onboardingPropertySchema),
    defaultValues: {
      name: '',
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
  });

  const filteredStates = useMemo(
    () =>
      INDIAN_STATES_AND_UTS.filter((state) =>
        state.toLowerCase().includes(stateSearch.toLowerCase().trim()),
      ),
    [stateSearch],
  );

  const values = form.getValues();

  const gotoReview = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }
    setStep('review');
  };

  const submitProperty = async () => {
    setSubmitError('');
    const data = form.getValues();

    try {
      await createProperty({
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
        address: {
          houseNumber: data.address.houseNumber.trim(),
          street: data.address.street.trim(),
          landmark: data.address.landmark?.trim() || undefined,
          city: data.address.city.trim(),
          state: data.address.state.trim(),
          pincode: data.address.pincode.trim(),
          country: INDIA_COUNTRY,
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden">
          <span className="absolute left-[4%] top-0 h-5 w-1 animate-[confetti_3.2s_ease-in-out_infinite] rounded-full bg-primary/65" />
          <span className="absolute left-[9%] top-0 h-4 w-1 animate-[confetti_3s_ease-in-out_infinite] rounded-full bg-emerald-400/75 [animation-delay:0.1s]" />
          <span className="absolute left-[14%] top-0 h-6 w-1 animate-[confetti_3.4s_ease-in-out_infinite] rounded-full bg-sky-400/65 [animation-delay:0.2s]" />
          <span className="absolute left-[19%] top-0 h-5 w-1 animate-[confetti_3.1s_ease-in-out_infinite] rounded-full bg-primary/55 [animation-delay:0.3s]" />
          <span className="absolute left-[24%] top-0 h-4 w-1 animate-[confetti_3.5s_ease-in-out_infinite] rounded-full bg-orange-300/70 [animation-delay:0.4s]" />
          <span className="absolute left-[29%] top-0 h-6 w-1 animate-[confetti_2.9s_ease-in-out_infinite] rounded-full bg-primary/65 [animation-delay:0.5s]" />
          <span className="absolute left-[34%] top-0 h-5 w-1 animate-[confetti_3.6s_ease-in-out_infinite] rounded-full bg-emerald-400/75 [animation-delay:0.6s]" />
          <span className="absolute left-[39%] top-0 h-4 w-1 animate-[confetti_3s_ease-in-out_infinite] rounded-full bg-sky-400/65 [animation-delay:0.7s]" />
          <span className="absolute left-[44%] top-0 h-6 w-1 animate-[confetti_3.3s_ease-in-out_infinite] rounded-full bg-primary/60 [animation-delay:0.25s]" />
          <span className="absolute left-[49%] top-0 h-5 w-1 animate-[confetti_2.8s_ease-in-out_infinite] rounded-full bg-orange-300/70 [animation-delay:0.35s]" />
          <span className="absolute left-[54%] top-0 h-4 w-1 animate-[confetti_3.4s_ease-in-out_infinite] rounded-full bg-primary/70 [animation-delay:0.45s]" />
          <span className="absolute left-[59%] top-0 h-6 w-1 animate-[confetti_3.1s_ease-in-out_infinite] rounded-full bg-emerald-400/75 [animation-delay:0.55s]" />
          <span className="absolute left-[64%] top-0 h-5 w-1 animate-[confetti_3.7s_ease-in-out_infinite] rounded-full bg-sky-400/65 [animation-delay:0.65s]" />
          <span className="absolute left-[69%] top-0 h-4 w-1 animate-[confetti_3.2s_ease-in-out_infinite] rounded-full bg-primary/60 [animation-delay:0.75s]" />
          <span className="absolute left-[74%] top-0 h-6 w-1 animate-[confetti_3s_ease-in-out_infinite] rounded-full bg-orange-300/70 [animation-delay:0.85s]" />
          <span className="absolute left-[79%] top-0 h-5 w-1 animate-[confetti_3.5s_ease-in-out_infinite] rounded-full bg-primary/65 [animation-delay:0.15s]" />
          <span className="absolute left-[84%] top-0 h-4 w-1 animate-[confetti_3.3s_ease-in-out_infinite] rounded-full bg-emerald-400/75 [animation-delay:0.25s]" />
          <span className="absolute left-[89%] top-0 h-6 w-1 animate-[confetti_2.9s_ease-in-out_infinite] rounded-full bg-sky-400/65 [animation-delay:0.35s]" />
          <span className="absolute left-[94%] top-0 h-5 w-1 animate-[confetti_3.4s_ease-in-out_infinite] rounded-full bg-primary/70 [animation-delay:0.45s]" />
          </div>

        <div className="w-full max-w-2xl text-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-2 rounded-full animate-[softPulse_2.4s_ease-in-out_infinite] bg-primary/10" />
            <span className="absolute inset-2 rounded-full border border-primary/25 animate-[ringReveal_1.2s_ease-out]" />
            <svg
              viewBox="0 0 52 52"
              className="relative z-10 h-16 w-16"
            >
              <circle
                cx="26"
                cy="26"
                r="20"
                fill="none"
                stroke="hsl(var(--primary) / 0.35)"
                strokeWidth="2.5"
              />
              <path
                d="M16 27.5l7 7L36 19.5"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[checkDrawLoop_3s_linear_infinite]"
                style={{ strokeDasharray: 40, strokeDashoffset: 40 }}
              />
            </svg>
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
            <span className="text-lg font-bold text-foreground tracking-tight">
              {APP_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {stepList.slice(0, 2).map((item, index) => {
              const active = item.id === step;
              const complete =
                step === 'review' && item.id === 'details';
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
                  {index === 0 && <span className="h-px w-4 bg-border" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-8">
        {step === 'details' && (
          <Form {...form}>
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
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input className="h-10" placeholder="Sunrise Residency" {...field} />
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
                  name="address.houseNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>House Number</FormLabel>
                      <FormControl>
                        <Input className="h-10" placeholder="42A" {...field} />
                      </FormControl>
                      <div className="h-4">
                        <FormMessage className="text-[11px] leading-4" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.street"
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
                name="address.landmark"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        className="h-10"
                        placeholder="Near City Mall"
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
                  name="address.city"
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
                  name="address.pincode"
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
                  name="address.state"
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
                                  form.setValue('address.state', state, {
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
                  name="address.country"
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
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[86px] resize-none"
                        placeholder="Add a short property description"
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

              <div className="flex justify-end pt-1">
                <Button type="button" onClick={gotoReview} className="gap-2 px-6">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
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
                <p className="text-xs text-muted-foreground">Property Name</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">House Number</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.houseNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Street</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.street}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Landmark</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {values.address.landmark || '-'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">City</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.city}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">State</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.state}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pincode</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.pincode}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="mt-1 text-sm font-medium text-foreground">{values.address.country}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {values.description || '-'}
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
                onClick={() => setStep('details')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Edit Details
              </Button>
              <Button onClick={submitProperty} disabled={isSubmitting} className="gap-2 px-6">
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
      </div>
    </div>
  );
};

export default OwnerOnboardingPage;
