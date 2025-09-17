import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { safeLocalStorageGet } from '@/lib/utils'

// Enhanced middleware with onboarding check
export function middleware(request: NextRequest) {
  // Get the onboarding status from localStorage (in a real app, this would come from a cookie or session)
  // For this example, we'll check if the user has completed onboarding
  
  // List of paths that require onboarding completion
  const protectedPaths = ['/dashboard', '/editor', '/projects']
  
  // Check if the current path requires onboarding
  const requiresOnboarding = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  // For demonstration purposes, we'll use a simple check
  // In a real application, this would check actual user session/authentication
  const onboardingCompleted = request.cookies.get('onboardingCompleted')?.value === 'true'
  
  // If the user hasn't completed onboarding and is trying to access a protected path,
  // redirect them to the onboarding page
  if (requiresOnboarding && !onboardingCompleted) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }
  
  // Allow the request to proceed
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}