import type { Metadata } from "next";
import "./globals.css"; // Assuming a global CSS file will be created

export const metadata: Metadata = {
  title: "Dharmagile AI",
  description: "Life Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
