import { WithChildren } from '@/types/common';

export default function AuthLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4 relative">
      {/* Gradient overlay com cores do tema */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />

      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
} 