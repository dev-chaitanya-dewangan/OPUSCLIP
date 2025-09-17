import { NextResponse } from 'next/server'

// Enhanced middleware without onboarding check
export function middleware() {
  // Allow the request to proceed
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}