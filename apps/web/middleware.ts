import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr"; // Re-using createServerClient

// Helper function to create a Supabase client instance specifically for middleware
// This is because middleware has a slightly different way of handling cookies (request and response)
// compared to Server Components or Route Handlers.
// Alternatively, @supabase/ssr provides createMiddlewareClient, but createServerClient can be adapted.
const createSupabaseMiddlewareClient = (req: NextRequest, res: NextResponse) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // In middleware, cookies are set on the response object
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );
};


export async function middleware(request: NextRequest) {
  const response = NextResponse.next(); // Create a response object to potentially set cookies on
  const supabase = createSupabaseMiddlewareClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup", "/auth/callback", "/auth/auth-code-error"];

  // If user is not authenticated and trying to access a protected path
  if (!session && !publicPaths.includes(pathname) && !pathname.startsWith("/_next/")) {
    // Construct the login URL with a 'next' query parameter to redirect back after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname); // Store the intended path
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and tries to access login or signup, redirect to dashboard
  if (session && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Refresh session if user is authenticated
  // This is important to keep the session alive
  // getSession() itself handles refreshing the session if needed and updates the cookie via the set() method in createSupabaseMiddlewareClient
  
  return response; // Return the response, which may have new cookies set by Supabase
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (if you have a public/images folder)
     * - files (if you have a public/files folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|files).*)",
  ],
};
