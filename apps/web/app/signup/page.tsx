"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
// Assuming shadcn/ui components are available, e.g., Button, Input, Label
// For now, using basic HTML elements. User can integrate shadcn/ui later.

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // emailRedirectTo is optional, but recommended for email confirmation flow
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // Check if user object exists and if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        // This case might indicate an issue or a specific auth flow like unverified user
        setMessage("Sign up successful, but please check your email for further instructions or contact support if you don't receive a confirmation.");
      } else if (data.session === null && data.user) {
         // This typically means email confirmation is required
        setMessage("Sign up successful! Please check your email to confirm your account.");
      }
       else {
        setMessage("Sign up successful! Redirecting...");
        // router.refresh() is needed to update server components that might depend on auth state
        router.refresh();
        // Redirect to a protected route or dashboard, or login page
        router.push("/dashboard"); // Or router.push("/login") if immediate login after signup isn't desired
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "20px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>Error: {error}</p>}
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
