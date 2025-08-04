'use client'

import { useAuthStore } from '@/store/auth'
import { WithChildren } from '@/types/common'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function AuthProvider({ children }: Readonly<WithChildren>) {
  const { initialize, loading } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      await initialize()
      setIsInitialized(true)
    }

    initAuth()
  }, [initialize])

  // Mostra loading inicial apenas uma vez durante a inicialização
  if (!isInitialized && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando aplicação...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}