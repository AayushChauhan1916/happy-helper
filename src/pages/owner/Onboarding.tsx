import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ChevronsUpDown,
  Loader2,
  MapPin,
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

const OwnerOnboardingPage = () => {
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handlePropertySubmit = async (data: OnboardingPropertyFormData) => {
    setSubmitError('');

    try {
      const response = await createProperty({
        name: data.name.trim(),
        description: data.description?.trim() || undefined,
        address: {
          houseNumber: data.address.houseNumber.trim(),
          street: data.address.street?.trim(),
          landmark: data.address.landmark?.trim() || undefined,
          city: data.address.city.trim(),
          state: data.address.state.trim(),
          pincode: data.address.pincode.trim(),
          country: INDIA_COUNTRY,
        },
      }).unwrap();

      if (response.data === null) {
        setSubmitted(true);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, 'Failed to create property. Please try again.'),
      );
    }
  };

  if (submitted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-36 items-end justify-center gap-2 opacity-70">
          <span className="h-24 w-2 animate-[rise_1.1s_ease-in-out_infinite] rounded-full bg-primary/25" />
          <span className="h-32 w-2 animate-[rise_1.4s_ease-in-out_infinite] rounded-full bg-primary/20 [animation-delay:0.15s]" />
          <span className="h-20 w-2 animate-[rise_1s_ease-in-out_infinite] rounded-full bg-primary/25 [animation-delay:0.25s]" />
          <span className="h-28 w-2 animate-[rise_1.3s_ease-in-out_infinite] rounded-full bg-primary/20 [animation-delay:0.35s]" />
          <span className="h-16 w-2 animate-[rise_1.15s_ease-in-out_infinite] rounded-full bg-primary/25 [animation-delay:0.45s]" />
        </div>

        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Onboarding Completed Successfully
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Our team will verify your details and get back to you within
            24-48 hours. Meanwhile, you can manage your property from the owner
            dashboard.
          </p>
          <Button
            onClick={() => window.location.replace('/owner')}
            className="mt-8 gap-2 px-7"
            size="lg"
          >
            Go to Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              StayEase
            </span>
          </Link>
          <p className="text-xs font-medium text-muted-foreground">
            Owner Onboarding
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-[26px] font-bold tracking-tight text-foreground">
          Add your property
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Fill your core property details to complete onboarding.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePropertySubmit)}
            className="mt-8 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px]">Property Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Sunrise Residency"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Property Address</p>
              </div>

              <FormField
                control={form.control}
                name="address.houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">House Number</FormLabel>
                    <FormControl>
                      <Input placeholder="42A" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">
                      Street (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MG Road"
                        className="h-11"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">
                      Landmark (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Near City Mall"
                        className="h-11"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bengaluru"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Pincode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="560001"
                          className="h-11"
                          maxLength={6}
                          {...field}
                          onChange={(event) =>
                            field.onChange(
                              event.target.value.replace(/\D/g, '').slice(0, 6),
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">State</FormLabel>
                    <Popover open={stateOpen} onOpenChange={setStateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-11 w-full justify-between font-normal"
                        >
                          <span className="truncate">
                            {field.value || 'Select state'}
                          </span>
                          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-2">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[12px]">Country</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 bg-muted/30"
                        readOnly
                        {...field}
                        value={INDIA_COUNTRY}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px]">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add short description about your property"
                      className="min-h-[90px] resize-none"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="h-11 w-full gap-2">
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
            {submitError && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {submitError}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OwnerOnboardingPage;
