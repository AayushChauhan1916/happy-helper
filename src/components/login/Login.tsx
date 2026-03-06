import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import {
  Building2,
  Mail,
  Lock,
  Home,
  Key,
  Users,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { loginSchema, type LoginForm } from '@/schemas/login.schema';

import { UserRole } from '@/redux/features/auth/auth.api';

type Props = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onSubmit: (data: LoginForm) => void;
  onGoogleLogin: () => void;
  isGoogleLoading: boolean;
  sessionExpired?: boolean;
};

const Login = ({
  role,
  setRole,
  onSubmit,
  onGoogleLogin,
  isGoogleLoading,
  sessionExpired,
}: Props) => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isTenant = role === UserRole.TENANT;

  return (
    <div className="flex min-h-screen">
      <div
        className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-colors duration-500 ${
          isTenant
            ? 'bg-gradient-to-br from-primary/90 via-primary to-primary/80'
            : 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500'
        }`}
      >
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-16 text-white">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            {isTenant ? (
              <Home className="h-10 w-10 text-white" />
            ) : (
              <Key className="h-10 w-10 text-white" />
            )}
          </div>

          <h2 className="mb-4 text-3xl font-bold text-center">
            {isTenant ? 'Welcome Home' : 'Manage Your Properties'}
          </h2>

          <p className="text-center text-white/70 max-w-sm">
            {isTenant
              ? 'Access your room details, rent payments, and announcements.'
              : 'Manage tenants, track rent payments, and control your PG.'}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          {/* Logo */}

          <Link to="/" className="mb-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>

            <span className="text-lg font-bold">StayEase</span>
          </Link>

          {/* Session Expired Message */}

          {sessionExpired && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertTriangle className="h-5 w-5 mt-0.5" />

              <div className="text-sm">
                <p className="font-medium">Session expired</p>
                <p className="text-red-600/80">
                  Your session expired. Please login again.
                </p>
              </div>
            </div>
          )}

          <h1 className="text-2xl font-bold">Sign in to your account</h1>

          {/* Role Switch */}

          <div className="mt-6 flex rounded-xl border bg-muted/50 p-1">
            <button
              onClick={() => setRole(UserRole.TENANT)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm ${
                isTenant
                  ? 'bg-card shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-4 w-4" />
              Tenant
            </button>

            <button
              onClick={() => setRole(UserRole.PROPERTY_ADMIN)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm ${
                !isTenant
                  ? 'bg-card shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Key className="h-4 w-4" />
              Property Admin
            </button>
          </div>

          {/* EMAIL LOGIN */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input className="pl-10" {...field} />
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
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-11 gap-2">
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </Form>

          {/* DIVIDER */}

          <div className="relative my-6">
            <Separator />

            <span className="absolute left-1/2 top-1/2 bg-background px-3 text-xs -translate-x-1/2 -translate-y-1/2">
              or
            </span>
          </div>

          {/* GOOGLE LOGIN */}

          <Button
            variant="outline"
            className="w-full gap-2"
            size="lg"
            onClick={onGoogleLogin}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
