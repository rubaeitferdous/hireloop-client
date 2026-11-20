import { NextResponse, type NextRequest } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

/**
 * Route Protection Proxy / Middleware for HireLoop
 * Intercepts incoming requests to private pages (e.g., /dashboard and subroutes)
 * and redirects unauthenticated users to the login page (/sign-in).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Inspect Better-Auth session tokens from cookies
  const sessionToken =
    getSessionCookie(request) ||
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value

  const isAuth = Boolean(sessionToken)

  // Protected paths that require an active session
  const isProtectedPath = pathname.startsWith("/dashboard")

  // Authentication pages (sign-in / sign-up)
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up"

  // 1. Unauthenticated user trying to access protected dashboard routes
  if (isProtectedPath && !isAuth) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(signInUrl)
  }

  // 2. Already logged in user navigating to /sign-in or /sign-up
  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const middleware = proxy

export const config = {
  matcher: [
    /*
     * Match all request paths for private dashboard suites and auth pages.
     */
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
}
