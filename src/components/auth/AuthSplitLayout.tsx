import type { ReactNode } from 'react';

import AuthSidePanel from '@/components/auth/AuthSidePanel';
import { UserRole } from '@/types/common/roles';

type AuthSplitLayoutProps = {
  role: UserRole;
  mode: 'login' | 'signup';
  children: ReactNode;
};

const AuthSplitLayout = ({ role, mode, children }: AuthSplitLayoutProps) => {
  return (
    <div className="min-h-screen bg-background lg:grid lg:h-screen lg:grid-cols-2 lg:overflow-hidden">
      <AuthSidePanel role={role} mode={mode} />

      <main className="flex min-h-screen items-start justify-center overflow-y-auto px-6 py-10 md:px-10 lg:h-screen lg:px-12">
        <div className="w-full max-w-[460px] py-2 lg:my-auto">{children}</div>
      </main>
    </div>
  );
};

export default AuthSplitLayout;
