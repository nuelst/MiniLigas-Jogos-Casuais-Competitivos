import { NextRequest, NextResponse } from 'next/server'

export interface AuthCookieData {
  userId: string
  role: 'admin' | 'player'
  email: string
  username: string
  name: string
  timestamp: number
}

const COOKIE_NAME = 'auth-data'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 d
const COOKIE_VALID_HOURS = 24 //24 h antes de revalidar


export function setAuthCookies(
  response: NextResponse,
  userData: Omit<AuthCookieData, 'timestamp'>
) {
  const cookieData: AuthCookieData = {
    ...userData,
    timestamp: Date.now()
  }

  response.cookies.set(COOKIE_NAME, JSON.stringify(cookieData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })

  response.cookies.set('user-role', userData.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
}


export function setAuthCookiesClient(userData: Omit<AuthCookieData, 'timestamp'>) {
  if (typeof document === 'undefined') return

  const cookieData: AuthCookieData = {
    ...userData,
    timestamp: Date.now()
  }

  const cookieOptions = `path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''
    }`

  document.cookie = `${COOKIE_NAME}=${JSON.stringify(cookieData)}; ${cookieOptions}`
  document.cookie = `user-role=${userData.role}; ${cookieOptions}`
}


export function getAuthCookies(request: NextRequest): AuthCookieData | null {
  try {
    const cookieValue = request.cookies.get(COOKIE_NAME)?.value
    if (!cookieValue) return null

    const data: AuthCookieData = JSON.parse(cookieValue)

    const hoursSinceCreation = (Date.now() - data.timestamp) / (1000 * 60 * 60)
    if (hoursSinceCreation > COOKIE_VALID_HOURS) {
      return null
    }

    return data
  } catch {
    return null
  }
}


export function clearAuthCookies(response: NextResponse) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0
  }

  response.cookies.set(COOKIE_NAME, '', cookieOptions)
  response.cookies.set('user-role', '', cookieOptions)
}


export function clearAuthCookiesClient() {
  if (typeof document === 'undefined') return

  const expireDate = 'expires=Thu, 01 Jan 1970 00:00:01 GMT'
  document.cookie = `${COOKIE_NAME}=; path=/; ${expireDate}`
  document.cookie = `user-role=; path=/; ${expireDate}`
}


export function isAdminFromCookies(request: NextRequest): boolean {
  const authData = getAuthCookies(request)
  return authData?.role === 'admin'
}

export function isAuthenticatedFromCookies(request: NextRequest): boolean {
  return getAuthCookies(request) !== null
}