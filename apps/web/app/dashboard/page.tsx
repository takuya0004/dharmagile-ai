"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        // This client-side check is a fallback.
        // Middleware should ideally handle redirection for unauthenticated users.
        router.push("/login");
      }
    };
    getUser();
  }, [supabase, router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      // Optionally show an error message to the user
    } else {
      setUser(null); // Clear user state
      router.push("/login"); // Redirect to login page
      router.refresh(); // Ensure server components re-evaluate auth state
    }
  };

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
  }

  if (!user) {
    // This state should ideally not be reached if middleware is effective
    // or if the initial useEffect redirect works quickly.
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}!</p>
      <p>This is a protected page.</p>
      <button 
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}
