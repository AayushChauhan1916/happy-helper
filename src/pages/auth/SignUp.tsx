import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthSplitLayout from '@/components/auth/AuthSplitLayout';
import OtpVerification from '@/components/auth/OtpVerification';
import SignupForm from '@/components/signup/SignupForm';
import { useSignUpMutation, useVerifyOtpMutation } from '@/redux/features/auth/auth.api';
import type { SignupFormData } from '@/schemas/auth/signup.schema';
import { UserRole } from '@/types/common/roles';
import { OtpPurpose, type SignUpRequest } from '@/types/requests/auth/auth.requests';
import { getApiErrorMessage } from '@/lib/get-api-error-message';
import { useGoogleAuthRedirect } from '@/hooks/use-google-auth-redirect';
import { completeAuthSession } from '@/redux/features/auth/complete-auth-session';
import type { AppDispatch } from '@/redux/app/store';

type Step = 'form' | 'otp';

export const SignUpPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [role, setRole] = useState<UserRole>(UserRole.TENANT);
  const [step, setStep] = useState<Step>('form');
  const [submitError, setSubmitError] = useState('');
  const [contactEmail, setContactEmail] = useState('your email');

  const navigate = useNavigate();
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const { startGoogleAuth, isStartingGoogleAuth } = useGoogleAuthRedirect({
    failRedirectPath: '/signup',
  });

  const handleSignupSubmit = async (data: SignupFormData) => {
    setSubmitError('');

    const payload: SignUpRequest = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phoneNumber: `${data.countryCode}${data.phoneNumber.trim()}`,
      password: data.password,
      role,
    };

    try {
      await signUp(payload).unwrap();
      setContactEmail(payload.email);
      setStep('otp');
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, 'Unable to create account. Please try again.'),
      );
    }
  };

  const handleOtpVerify = async (otp: string) => {
    const response = await verifyOtp({
      email: contactEmail,
      otp,
      purpose: OtpPurpose.SIGNUP_VERIFICATION,
    }).unwrap();

    if (response.data.accessToken) {
      const redirectPath = await completeAuthSession(
        response.data.accessToken,
        dispatch,
      );
      navigate(redirectPath);
      return;
    }

    navigate('/login');
  };

  const handleOtpResend = async () => {
    return;
  };

  return (
    <AuthSplitLayout role={role} mode="signup">
      <div className="w-full max-w-[400px]">
        <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Building2 className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">StayEase</span>
        </Link>

        {step === 'form' ? (
          <SignupForm
            role={role}
            setRole={setRole}
            onSubmit={handleSignupSubmit}
            onGoogleLogin={startGoogleAuth}
            isGoogleLoading={isStartingGoogleAuth}
            isSubmitting={isSigningUp}
            submitError={submitError}
          />
        ) : (
          <OtpVerification
            purpose="email"
            destination={contactEmail}
            onBack={() => setStep('form')}
            onResend={handleOtpResend}
            onVerify={handleOtpVerify}
            verifyButtonLabel="Verify & Continue"
          />
        )}
      </div>
    </AuthSplitLayout>
  );
};
