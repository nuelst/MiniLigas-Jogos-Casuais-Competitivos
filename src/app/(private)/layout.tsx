'use client'

import { useAuthStore } from '@/store/auth'
import { WithChildren } from '@/types/common'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateLayout({ children }: Readonly<WithChildren>) {
  const { user, loading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground text-sm">Redirecionando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {children}
    </div>
  )
}