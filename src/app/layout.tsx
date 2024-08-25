import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { CookiesProvider } from 'next-client-cookies/server'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <div className="mx-auto flex h-screen max-w-[94%] flex-col">
            <Navbar />
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
