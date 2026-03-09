import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Loader2, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

type OtpVerificationProps = {
  purpose: string;
  destination: string;
  onVerify: (otp: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  onBack?: () => void;
  initialCountdown?: number;
  testCodeHint?: string;
  verifyButtonLabel?: string;
};

const OtpVerification = ({
  purpose,
  destination,
  onVerify,
  onResend,
  onBack,
  initialCountdown = 30,
  testCodeHint,
  verifyButtonLabel = 'Verify and Continue',
}: OtpVerificationProps) => {
  const [otpValue, setOtpValue] = useState('');
  const [error, setError] = useState('');
  const [shakeOtp, setShakeOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(initialCountdown);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timeout = window.setTimeout(() => {
      setResendTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setShakeOtp(true);
      setTimeout(() => setShakeOtp(false), 400);
      return;
    }

    setError('');
    setIsVerifying(true);
    try {
      await onVerify(otpValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Try again.');
      setShakeOtp(true);
      setTimeout(() => setShakeOtp(false), 400);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError('');
    if (onResend) {
      await onResend();
    }
    setResendTimer(initialCountdown);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleVerify();
      }}
      className="flex w-full flex-col text-center"
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex w-fit items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}

      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Mail className="h-7 w-7 text-primary" />
      </div>

      <h1 className="text-[26px] font-bold tracking-tight text-foreground">
        Verify your {purpose}
      </h1>
      <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
        We sent a 6-digit code to{' '}
        <span className="font-medium text-foreground">{destination}</span>
      </p>

      <div
        className={`mx-auto mb-2 mt-8 transition-transform ${
          shakeOtp ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        <InputOTP
          maxLength={6}
          value={otpValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              void handleVerify();
            }
          }}
          onChange={(val) => {
            setOtpValue(val);
            setError('');
          }}
        >
          <InputOTPGroup className="gap-2.5 sm:gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={`h-12 w-10 rounded-xl border text-base font-semibold shadow-sm sm:h-14 sm:w-12 sm:text-lg ${
                  error
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border bg-background'
                }`}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="min-h-6">
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>

      {testCodeHint && (
        <p className="mb-6 mt-4 text-xs text-muted-foreground/60">
          Use code{' '}
          <span className="font-mono font-semibold text-foreground">
            {testCodeHint}
          </span>{' '}
          for testing
        </p>
      )}

      <div className="mt-1">
        <Button
          type="submit"
          onClick={handleVerify}
          disabled={isVerifying || otpValue.length !== 6}
          className="h-12 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/15"
          size="lg"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> {verifyButtonLabel}
            </>
          )}
        </Button>
      </div>

      <div className="mt-5 min-h-6 text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in{' '}
            <span className="font-semibold text-foreground">{resendTimer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </form>
  );
};

export default OtpVerification;
