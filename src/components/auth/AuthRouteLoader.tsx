interface AuthRouteLoaderProps {
  message?: string;
}

export default function AuthRouteLoader({
  message = 'Loading...',
}: AuthRouteLoaderProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted-foreground/25 border-t-muted-foreground/70" />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
