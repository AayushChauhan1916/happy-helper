import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import Login from '@/components/login/Login';

import {
  useGoogleLoginMutation,
  UserRole,
} from '@/redux/features/auth/auth.api';

import type { LoginForm } from '@/schemas/login.schema';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const reason = searchParams.get('reason');

  const [role, setRole] = useState<UserRole>(UserRole.TENANT);

  const [googleAuth, { isLoading }] = useGoogleLoginMutation();

  const sessionExpired = reason === 'session-expired';

  const onSubmit = async (data: LoginForm) => {
    try {
      console.log('Email login:', { ...data, role });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
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

        navigate('/');
      } catch (error) {
        console.error('Google authentication error:', error);
      }
    },

    onError: () => {
      console.error('Google login failed');
    },
  });

  return (
    <Login
      role={role}
      setRole={setRole}
      onSubmit={onSubmit}
      onGoogleLogin={googleLogin}
      isGoogleLoading={isLoading}
      sessionExpired={sessionExpired}
    />
  );
}
