import { useState } from 'react';
import {
  Building2,
  Mail,
  Lock,
  Home,
  Key,
  Users,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGoogleLogin } from '@react-oauth/google';
import {
  useGoogleLoginMutation,
  UserRole,
} from '@/redux/features/auth/auth.api';
import { loginSchema, type LoginForm } from '@/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
  // const navigate = useNavigate();

  const [googleAuth, { isLoading }] = useGoogleLoginMutation();

  const [role, setRole] = useState<UserRole>(UserRole.TENANT);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const isTenant = role === UserRole.TENANT;

  const onSubmit = (data: LoginForm) => {
    console.log('Email login:', { ...data, role });
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',

    onSuccess: async (response) => {
      try {
        const data = await googleAuth({
          code: response.code,
          role,
        }).unwrap();
        localStorage.setItem('accessToken', data.data.accessToken);
      } catch (error) {
        console.error('Google authentication error:', error);
      }
    },

    onError: () => {
      console.error('Google login failed');
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
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
            {isTenant ? 'Welcome Home' : 'Manage Your Empire'}
          </h2>

          <p className="mb-10 text-center text-white/70 max-w-sm">
            {isTenant
              ? 'Access your room details, pay rent, and stay connected with your PG.'
              : 'Track properties, manage tenants, and grow your PG business.'}
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">StayEase</span>
          </Link>

          <h1 className="text-2xl font-bold">Sign in to your account</h1>

          {/* Role toggle */}
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

          {/* Email Login */}
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

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 bg-background px-3 text-xs -translate-x-1/2 -translate-y-1/2">
              or
            </span>
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full gap-2"
            size="lg"
            onClick={() => googleLogin()}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Continue with Google'}
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
