import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import OtpVerification from '@/components/auth/OtpVerification';
import {
  useLoginMutation,
  useVerifyOtpMutation,
} from '@/redux/features/auth/auth.api';
import type { LoginForm as LoginFormValues } from '@/schemas/auth/login.schema';
import { UserRole } from '@/types/common/roles';
import LoginForm from '@/components/login/LoginForm';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { OtpPurpose } from '@/types/requests/auth/auth.requests';
import { useGoogleAuthRedirect } from '@/hooks/use-google-auth-redirect';
import { getDashboardPathByRole } from '@/lib/auth';

type Step = 'form' | 'otp';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reason = searchParams.get('reason');
  const [step, setStep] = useState<Step>('form');
  const [loginRole, setLoginRole] = useState<string>(UserRole.TENANT);
  const [emailForOtp, setEmailForOtp] = useState('');
  const [login] = useLoginMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const { startGoogleAuth, isStartingGoogleAuth } = useGoogleAuthRedirect({
    failRedirectPath: '/login',
  });

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
    navigate(getDashboardPathByRole(loginRole));
  };

  return (
    <AuthSplitLayout role={UserRole.TENANT} mode="login">
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
            onGoogleLogin={startGoogleAuth}
            isGoogleLoading={isStartingGoogleAuth}
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
