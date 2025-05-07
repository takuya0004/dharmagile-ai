import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  // const cookieStore = cookies(); // No longer need to assign to a variable here for set/remove

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // cookies() from next/headers is a singleton, safe to call multiple times.
          return cookies().get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookies().set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            // console.error("Failed to set cookie in Server Component context", error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            // To remove a cookie, set its value to empty and expiration to a past date
            cookies().set({ name, value: "", ...options, maxAge: 0 });
          } catch (error) {
            // The `delete` (or set for removal) method was called from a Server Component.
            // console.error("Failed to remove cookie in Server Component context", error);
          }
        },
      },
    }
  );
}
