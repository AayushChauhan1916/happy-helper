import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Key,
  Lock,
  Mail,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  onGoogleLogin: () => void;
  isGoogleLoading: boolean;
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

const SignupForm = ({
  role,
  setRole,
  onSubmit,
  onGoogleLogin,
  isGoogleLoading,
  isSubmitting,
  submitError,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchPassword = useWatch({
    control: form.control,
    name: 'password',
  });
  const isTenant = role === UserRole.TENANT;

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Create your account
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Join as a tenant or PG owner and get started in minutes with a simple
        signup process.
      </p>

      <div className="mt-8 space-y-2">
        <p className="text-sm font-medium text-foreground">I am joining as</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setRole(UserRole.PROPERTY_ADMIN)}
            className={`rounded-2xl border-2 p-4 text-left transition-all ${
              !isTenant
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Key className="h-4 w-4" />
              Property Owner
            </div>
            <div className="mt-1 text-xs leading-5 text-muted-foreground">
              List, manage, and track your property operations.
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole(UserRole.TENANT)}
            className={`rounded-2xl border-2 p-4 text-left transition-all ${
              isTenant
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Users className="h-4 w-4" />
              Tenant
            </div>
            <div className="mt-1 text-xs leading-5 text-muted-foreground">
              Find stays, track rent, and manage your account easily.
            </div>
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {submitError && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {submitError}
            </p>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                    <Input
                      placeholder="you@example.com"
                      className="h-12 rounded-xl border-border/70 pl-11"
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
            name="password"
            render={({ field }) => {
              const completedChecks = passwordChecks.filter((check) =>
                watchPassword ? check.test(watchPassword) : false,
              ).length;

              return (
                <FormItem>
                  <div className="flex items-center justify-between gap-3">
                    <FormLabel>Password</FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {completedChecks}/{passwordChecks.length} rules met
                    </span>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        className="h-12 rounded-xl border-border/70 pl-11 pr-11"
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

                  <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                    {passwordChecks.map((check) => {
                      const passed = watchPassword
                        ? check.test(watchPassword)
                        : false;

                      return (
                        <div
                          key={check.label}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                            passed
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-border bg-muted/30 text-muted-foreground'
                          }`}
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full ${
                              passed ? 'bg-emerald-600 text-white' : 'bg-muted'
                            }`}
                          >
                            {passed && <Check className="h-2.5 w-2.5" />}
                          </div>
                          <span>{check.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full gap-2 rounded-xl shadow-sm"
            size="lg"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-[11px] uppercase tracking-widest text-muted-foreground/50">
          or
        </span>
      </div>

      <GoogleAuthButton
        onClick={onGoogleLogin}
        disabled={isGoogleLoading}
        label="Sign up with Google"
      />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground/60">
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
