import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ArrowRight,
  Check,
  ChevronsUpDown,
  Eye,
  EyeOff,
  HelpCircle,
  Key,
  Lock,
  Mail,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  signupSchema,
  type SignupFormData,
} from '@/schemas/auth/signup.schema';
import { UserRole } from '@/types/common/roles';

type SignupFormProps = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onSubmit: (data: SignupFormData) => void | Promise<void>;
  isSubmitting: boolean;
  submitError?: string;
};

const passwordChecks = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One number (0-9)', test: (p: string) => /\d/.test(p) },
  { label: 'One uppercase letter (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
  {
    label: 'One special character (!@#$...)',
    test: (p: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p),
  },
];

const countryOptions = [
  { name: 'India', code: '+91', flag: '\uD83C\uDDEE\uD83C\uDDF3' },
];

const SignupForm = ({
  role,
  setRole,
  onSubmit,
  isSubmitting,
  submitError,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+91',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchPassword = form.watch('password');
  const watchCountryCode = form.watch('countryCode');
  const isTenant = role === UserRole.TENANT;
  const selectedCountry =
    countryOptions.find((country) => country.code === watchCountryCode) ??
    countryOptions[0];
  const filteredCountries = countryOptions.filter((country) =>
    `${country.name} ${country.code}`
      .toLowerCase()
      .includes(countrySearch.toLowerCase().trim()),
  );

  return (
    <>
      <h1 className="text-[26px] font-bold tracking-tight text-foreground">
        Create your account
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Get started free - takes under a minute
      </p>

      <div className="mt-7 grid grid-cols-2 gap-2">
        <button
          onClick={() => setRole(UserRole.TENANT)}
          className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
            isTenant
              ? 'border-primary/30 bg-primary/5 text-primary shadow-sm'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4" />
          I'm a Tenant
        </button>
        <button
          onClick={() => setRole(UserRole.PROPERTY_ADMIN)}
          className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 ${
            !isTenant
              ? 'border-primary/30 bg-primary/5 text-primary shadow-sm'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          }`}
        >
          <Key className="h-4 w-4" />
          PG Owner
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-3.5"
        >
          {submitError && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {submitError}
            </p>
          )}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px]">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <Input
                      placeholder="John Doe"
                      className="h-11 pl-11"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px]">Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <Input
                      placeholder="you@example.com"
                      className="h-11 pl-11"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px]">Phone Number</FormLabel>
                <FormControl>
                  <div className="flex h-11 overflow-hidden rounded-md border border-input bg-background">
                    <Popover
                      open={isCountryOpen}
                      onOpenChange={setIsCountryOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex min-w-[130px] items-center justify-between gap-2 border-r border-input bg-muted/40 px-3 text-sm font-medium text-foreground hover:bg-muted/60"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base leading-none">
                              {selectedCountry.flag}
                            </span>
                            <span>{selectedCountry.code}</span>
                          </span>
                          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-[250px] p-2">
                        <Input
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search country or code"
                          className="mb-2 h-9"
                        />
                        <div className="max-h-56 overflow-y-auto">
                          {filteredCountries.length === 0 ? (
                            <p className="px-2 py-2 text-xs text-muted-foreground">
                              No country found
                            </p>
                          ) : (
                            filteredCountries.map((country) => (
                              <button
                                key={`${country.name}-${country.code}`}
                                type="button"
                                onClick={() => {
                                  form.setValue('countryCode', country.code, {
                                    shouldValidate: true,
                                  });
                                  setIsCountryOpen(false);
                                  setCountrySearch('');
                                }}
                                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                              >
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.name}</span>
                                </span>
                                <span className="text-muted-foreground">
                                  {country.code}
                                </span>
                              </button>
                            ))
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Mobile number"
                      className="h-full border-0 focus-visible:ring-0"
                      maxLength={14}
                      {...field}
                      onChange={(e) => {
                        const digitsOnly = e.target.value
                          .replace(/\D/g, '')
                          .slice(0, 14);
                        field.onChange(digitsOnly);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const allPassed = watchPassword
                ? passwordChecks.every((c) => c.test(watchPassword))
                : false;
              return (
                <FormItem>
                  <div className="flex items-center gap-1.5">
                    <FormLabel className="text-[13px]">Password</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => {
                            if (watchPassword && !allPassed) {
                              setShakePassword(true);
                              setTimeout(() => setShakePassword(false), 400);
                            }
                          }}
                          className={`transition-colors ${
                            !watchPassword
                              ? 'text-muted-foreground/30 hover:text-muted-foreground'
                              : allPassed
                                ? 'text-emerald-600'
                                : 'text-amber-500 hover:text-amber-400'
                          }`}
                        >
                          {allPassed ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <HelpCircle className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="top"
                        align="start"
                        className="w-64 p-3"
                      >
                        <p className="mb-2.5 text-xs font-semibold text-foreground">
                          Password requirements
                        </p>
                        <div className="space-y-2">
                          {passwordChecks.map((check) => {
                            const passed = watchPassword
                              ? check.test(watchPassword)
                              : false;
                            return (
                              <div
                                key={check.label}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                                    passed
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-muted'
                                  }`}
                                >
                                  {passed && <Check className="h-2.5 w-2.5" />}
                                </div>
                                <span
                                  className={`text-xs transition-colors ${
                                    passed
                                      ? 'font-medium text-emerald-600'
                                      : 'text-muted-foreground'
                                  }`}
                                >
                                  {check.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormControl>
                    <div
                      className={`relative transition-transform ${
                        shakePassword ? 'animate-[shake_0.4s_ease-in-out]' : ''
                      }`}
                    >
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        className={`h-11 pl-11 pr-11 transition-colors ${
                          allPassed
                            ? 'border-emerald-500/40 focus-visible:ring-emerald-500/30'
                            : ''
                        }`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 transition-colors hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px]">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      className="h-11 pl-11"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 h-11 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/15"
            size="lg"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Form>

      <div className="relative my-5">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-[11px] uppercase tracking-widest text-muted-foreground/50">
          or
        </span>
      </div>

      <Button
        variant="outline"
        className="h-11 w-full gap-2.5 rounded-xl"
        size="lg"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground/50">
        By signing up, you agree to our{' '}
        <a href="#" className="underline hover:text-foreground">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
      </p>
    </>
  );
};

export default SignupForm;
