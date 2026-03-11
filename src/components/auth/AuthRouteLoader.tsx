import { Loader2 } from 'lucide-react';

interface AuthRouteLoaderProps {
  message?: string;
}

export default function AuthRouteLoader({
  message = 'Loading your dashboard...',
}: AuthRouteLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
