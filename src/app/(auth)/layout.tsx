import { WithChildren } from '@/types/common';

export default function AuthLayout({ children }: WithChildren) {
  return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {children}
    </div>
  </div>;
} 