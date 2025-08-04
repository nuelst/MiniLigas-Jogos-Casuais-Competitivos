"use client"

import { DinoGame } from '@/components/games/dino-game'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useAuthStore } from '@/store/auth'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface InactivityContextType {
  isIdle: boolean
  resetTimer: () => void
}

const InactivityContext = createContext<InactivityContextType | undefined>(undefined)

interface InactivityProviderProps {
  readonly children: React.ReactNode
  readonly idleTime?: number
}

export function InactivityProvider({
  children,
  idleTime = 2 * 60 * 1000 // 2  MIN
}: InactivityProviderProps) {
  const [isIdle, setIsIdle] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const { isPlayer, user } = useAuthStore()

  const resetTimer = useCallback(() => {
    setIsIdle(false)
    setShowDialog(false)
  }, [])

  useEffect(() => {

    if (!isPlayer || !user) {
      return
    }

    let timeoutId: NodeJS.Timeout

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ]

    const resetTimeout = () => {
      clearTimeout(timeoutId)
      setIsIdle(false)
      setShowDialog(false)

      timeoutId = setTimeout(() => {
        setIsIdle(true)
        setShowDialog(true)
      }, idleTime)
    }

    const eventHandler = () => {
      resetTimeout()
    }

    events.forEach(event => {
      document.addEventListener(event, eventHandler, true)
    })

    resetTimeout()

    return () => {
      clearTimeout(timeoutId)
      events.forEach(event => {
        document.removeEventListener(event, eventHandler, true)
      })
    }
  }, [isPlayer, user, idleTime])

  const handleCloseDialog = () => {
    setShowDialog(false)
    setIsIdle(false)
  }

  const contextValue = useMemo(() => ({
    isIdle,
    resetTimer
  }), [isIdle, resetTimer])

  return (
    <InactivityContext.Provider value={contextValue}>
      {children}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent
          className="max-w-2xl w-full h-[600px] flex flex-col"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Parece que você está ausente! 🦕
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              Que tal se divertir um pouco enquanto decide o que fazer?
            </p>
          </DialogHeader>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
              <DinoGame />
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={handleCloseDialog} variant="default" size="lg">
                Voltar para a aplicação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </InactivityContext.Provider>
  )
}

export function useInactivity() {
  const context = useContext(InactivityContext)
  if (context === undefined) {
    throw new Error('useInactivity must be used within an InactivityProvider')
  }
  return context
}