import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertTriangle, KeyRound, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema } from '@/schemas/auth/login.schema';
import type { LoginForm as LoginFormValues } from '@/schemas/auth/login.schema';
import { UserRole } from '@/types/common/roles';

type Props = {
  onSubmit: (data: LoginFormValues) => Promise<void> | void;
  onGoogleLogin: () => void;
  isGoogleLoading: boolean;
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  sessionExpired?: boolean;
  authNotice?: string;
};

const LoginForm = ({
  onSubmit,
  onGoogleLogin,
  isGoogleLoading,
  selectedRole,
  onRoleChange,
  sessionExpired,
  authNotice,
}: Props) => {
  const [submitError, setSubmitError] = useState('');
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <>
      {sessionExpired && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertTriangle className="mt-0.5 h-5 w-5" />
          <div className="text-sm">
            <p className="font-medium">Session expired</p>
            <p className="text-red-600/80">
              Your session expired. Please login again.
            </p>
          </div>
        </div>
      )}
      {authNotice && (
        <div className="mb-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          <AlertTriangle className="mt-0.5 h-5 w-5" />
          <p className="text-sm">{authNotice}</p>
        </div>
      )}

      <h1 className="text-[26px] font-bold">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Sign in to continue to your dashboard
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onRoleChange(UserRole.TENANT)}
          className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
            selectedRole === UserRole.TENANT
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="h-4 w-4" />
          Tenant
        </button>
        <button
          type="button"
          onClick={() => onRoleChange(UserRole.PROPERTY_ADMIN)}
          className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors ${
            selectedRole === UserRole.PROPERTY_ADMIN
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border bg-background text-muted-foreground hover:text-foreground'
          }`}
        >
          <KeyRound className="h-4 w-4" />
          PG Owner
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setSubmitError('');
            try {
              await onSubmit(data);
            } catch (error) {
              setSubmitError(
                error instanceof Error ? error.message : 'Unable to login.',
              );
            }
          })}
          className="mt-7 space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <Input
                      placeholder="you@example.com"
                      className="h-12 pl-11"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                    <Input
                      type="password"
                      placeholder="********"
                      className="h-12 pl-11"
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
            className="h-12 w-full gap-2 rounded-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </Button>
          {submitError && (
            <p className="text-sm font-medium text-destructive">
              {submitError}
            </p>
          )}
        </form>
      </Form>

      <div className="relative my-7">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-[11px] uppercase tracking-widest text-muted-foreground/50">
          or
        </span>
      </div>

      <GoogleAuthButton
        onClick={onGoogleLogin}
        disabled={isGoogleLoading}
      />

      <p className="mt-7 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
