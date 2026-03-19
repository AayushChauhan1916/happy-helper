import { AlertCircle, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyPageStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'empty' | 'error';
}

export default function PropertyPageState({
  title,
  description,
  actionLabel,
  onAction,
  variant = 'empty',
}: PropertyPageStateProps) {
  const Icon = variant === 'error' ? AlertCircle : Building2;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 py-16 text-center">
      <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="mt-6 rounded-xl">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
