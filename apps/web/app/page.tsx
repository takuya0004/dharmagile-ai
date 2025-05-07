import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Dharmagile AI</h1>
      <p>Your Life Intelligence Platform.</p>
      <div style={{ marginTop: "30px" }}>
        <Link href="/login" style={{ marginRight: "10px", padding: "10px 15px", border: "1px solid #ccc", textDecoration: "none" }}>
          Login
        </Link>
        <Link href="/signup" style={{ padding: "10px 15px", border: "1px solid #ccc", textDecoration: "none" }}>
          Sign Up
        </Link>
        {/* Add a link to a protected dashboard page later */}
        {/* <Link href="/dashboard" style={{ marginLeft: "10px", padding: "10px 15px", border: "1px solid #ccc", textDecoration: "none" }}>
          Dashboard
        </Link> */}
      </div>
    </main>
  );
}
