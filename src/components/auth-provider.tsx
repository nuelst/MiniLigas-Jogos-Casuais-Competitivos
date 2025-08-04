'use client'

import { useAuthStore } from '@/store/auth'
import { WithChildren } from '@/types/common'
import { useEffect } from 'react'

export function AuthProvider({ children }: WithChildren) {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}