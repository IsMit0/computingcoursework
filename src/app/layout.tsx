import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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

const navigationLinks = [
  { label: "Home", href: "/homepage" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/homepage" },
  { label: "Admin Dashboard", href: "/admindashboard" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <header className="border-b-2 border-border bg-secondary">
          <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link
              href="/homepage"
              className="text-2xl font-bold tracking-tight"
            >
              Vinovia
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap items-center gap-2">
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href + link.label}>
                    <NavigationMenuLink
                      render={<Link href={link.href} />}
                      className="rounded-md px-3 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>

        <footer className="border-t-2 border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm">
            <p className="font-semibold">Vinovia</p>
            <p className="mt-1 opacity-75">
              A Minecraft community built together.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
