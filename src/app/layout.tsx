import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";
import AuthProvider from "@/context/authProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} text-slate-950 dark:text-slate-100`}
      >
        <AuthProvider>
          <Navigation />
          <main className="my-8 w-11/12 max-w-7xl mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
