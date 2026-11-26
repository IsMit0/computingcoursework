import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/NavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinovia",
  description: "Vinovia Minecraft Community",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <NavigationBar />

        {/* Page content */}
        <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t-2 border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm">
            <p className="text-lg font-bold">Vinovia</p>
            <p className="mt-2 opacity-75">
              A Minecraft community built together.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
