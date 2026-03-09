import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Building2 } from 'lucide-react';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import OtpVerification from '@/components/auth/OtpVerification';
import {
  useGoogleLoginMutation,
  useLoginMutation,
  useVerifyOtpMutation,
} from '@/redux/features/auth/auth.api';
import type { LoginForm as LoginFormValues } from '@/schemas/auth/login.schema';
import { UserRole } from '@/types/common/roles';
import LoginForm from '@/components/login/LoginForm';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { OtpPurpose } from '@/types/requests/auth/auth.requests';

type Step = 'form' | 'otp';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reason = searchParams.get('reason');
  const [step, setStep] = useState<Step>('form');
  const defaultRole = UserRole.TENANT;
  const [loginRole, setLoginRole] = useState<string>(defaultRole);
  const [emailForOtp, setEmailForOtp] = useState('');
  const [googleAuth, { isLoading }] = useGoogleLoginMutation();
  const [login] = useLoginMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const sessionExpired = reason === 'session-expired';
  const authNotice =
    reason === 'google-auth-failed'
      ? 'Google sign-in failed. Please try again.'
      : reason === 'google-cancelled'
        ? 'Google sign-in was cancelled.'
        : undefined;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login({
        email: data.email.trim(),
        password: data.password,
      }).unwrap();

      setEmailForOtp(response.data.email);
      setLoginRole(response.data.role);
      setStep('otp');
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, 'Login failed. Please try again.'),
      );
    }
  };

  const handleVerifyLoginOtp = async (otp: string) => {
    const response = await verifyOtp({
      otp,
      email: emailForOtp,
      purpose: OtpPurpose.LOGIN_VERIFICATION,
    }).unwrap();

    if (!response.data.accessToken) {
      throw new Error('Access token was not returned by verify OTP.');
    }

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem(
      'user',
      JSON.stringify({ email: emailForOtp, role: loginRole }),
    );
    navigate('/');
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    onSuccess: async (response) => {
      try {
        const data = await googleAuth({
          code: response.code,
          role: defaultRole,
        }).unwrap();

        localStorage.setItem('accessToken', data.data.accessToken);
        navigate('/');
      } catch (error) {
        console.error('Google authentication error:', error);
      }
    },
    onError: () => {
      navigate('/login?reason=google-auth-failed');
    },
  });

  return (
    <AuthSplitLayout role={defaultRole} mode="login">
      <div className="w-full max-w-[380px]">
        <Link to="/" className="mb-10 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">StayEase</span>
        </Link>

        {step === 'form' ? (
          <LoginForm
            onSubmit={onSubmit}
            onGoogleLogin={googleLogin}
            isGoogleLoading={isLoading}
            sessionExpired={sessionExpired}
            authNotice={authNotice}
          />
        ) : (
          <OtpVerification
            purpose="login"
            destination={emailForOtp}
            onBack={() => setStep('form')}
            onVerify={handleVerifyLoginOtp}
            verifyButtonLabel="Verify & Login"
          />
        )}
      </div>
    </AuthSplitLayout>
  );
}
