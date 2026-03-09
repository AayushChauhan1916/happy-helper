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
    <div className="flex h-screen overflow-hidden bg-card">
      <AuthSidePanel role={role} mode={mode} />

      <main className="h-screen flex-1 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center px-6 py-10 lg:items-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthSplitLayout;
