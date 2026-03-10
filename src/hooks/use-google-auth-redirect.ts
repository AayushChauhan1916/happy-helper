import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UseGoogleAuthRedirectOptions = {
  failRedirectPath?: string;
};

export const useGoogleAuthRedirect = ({
  failRedirectPath = '/login',
}: UseGoogleAuthRedirectOptions = {}) => {
  const navigate = useNavigate();
  const [isStartingGoogleAuth, setIsStartingGoogleAuth] = useState(false);

  const startGoogleAuth = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    onSuccess: () => {
      // Redirect flow handles completion in /auth/google/callback.
    },
    onError: () => {
      setIsStartingGoogleAuth(false);
      navigate(`${failRedirectPath}?reason=google-auth-failed`);
    },
  });

  return {
    isStartingGoogleAuth,
    startGoogleAuth: () => {
      setIsStartingGoogleAuth(true);
      startGoogleAuth();
    },
  };
};
