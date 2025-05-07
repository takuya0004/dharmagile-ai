"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const errorMessage = searchParams.get("message") || "An unknown error occurred during authentication.";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Authentication Error</h2>
      <p style={{ color: "red", marginBottom: "20px" }}>{decodeURIComponent(errorMessage)}</p>
      <p>Please try a different login method or return to the homepage.</p>
      <div style={{ marginTop: "30px" }}>
        <Link href="/login" style={{ marginRight: "10px", padding: "10px 15px", border: "1px solid #ccc", textDecoration: "none" }}>
          Try Login
        </Link>
        <Link href="/" style={{ padding: "10px 15px", border: "1px solid #ccc", textDecoration: "none" }}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
