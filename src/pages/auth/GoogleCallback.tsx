import { useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Loader2 } from 'lucide-react';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import { useGoogleLoginMutation } from '@/redux/features/auth/auth.api';
import { UserRole } from '@/types/common/roles';

export default function GoogleCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [googleAuth] = useGoogleLoginMutation();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) {
      return;
    }
    hasCalled.current = true;
    const code = searchParams.get('code');
    if (!code) {
      navigate('/login?reason=google-cancelled');
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        const data = await googleAuth({
          code,
          role: UserRole.TENANT,
        }).unwrap();

        localStorage.setItem('accessToken', data.data.accessToken);
        navigate('/');
      } catch (error) {
        console.error('Google callback authentication error:', error);
        navigate('/login?reason=google-auth-failed');
      }
    };

    void completeGoogleLogin();
  }, [googleAuth, navigate, searchParams]);

  return (
    <AuthSplitLayout role={UserRole.TENANT} mode="login">
      <div className="w-full max-w-[380px]">
        <Link to="/" className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">StayEase</span>
        </Link>

        <div className="flex flex-col items-center py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h1 className="mt-5 text-2xl font-bold text-foreground">
            Completing Google sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please wait while we verify your account.
          </p>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
