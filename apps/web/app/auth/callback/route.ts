import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server"; // Using the server client

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Successfully exchanged code for session, redirect to the 'next' URL or homepage
      // Ensure the 'next' URL is a relative path to prevent open redirect vulnerabilities
      const redirectUrl = (next.startsWith("/") ? next : "/");
      return NextResponse.redirect(`${origin}${redirectUrl}`);
    } else {
      console.error("Error exchanging code for session:", error.message);
      // Redirect to an error page or display an error message
      return NextResponse.redirect(`${origin}/auth/auth-code-error?message=${encodeURIComponent(error.message)}`);
    }
  }

  // Redirect to an error page or homepage if no code is present
  console.error("No code found in auth callback request");
  return NextResponse.redirect(`${origin}/auth/auth-code-error?message=Authorization%20code%20not%20found.`);
}
