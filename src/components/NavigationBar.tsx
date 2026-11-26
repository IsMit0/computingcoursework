"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationLinks = [
  { label: "Home", href: "/homepage", section: "home" },
  { label: "Gallery", href: "/homepage#gallery", section: "gallery" },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/homepage") {
      setActiveSection("");
      return;
    }

    const updateActiveSection = () => {
      const gallery = document.getElementById("gallery");

      if (!gallery) {
        setActiveSection("home");
        return;
      }

      const currentSection =
        gallery.getBoundingClientRect().top <= window.innerHeight * 0.45
          ? "gallery"
          : "home";

      setActiveSection(currentSection);

      const newUrl =
        currentSection === "gallery" ? "/homepage#gallery" : "/homepage";

      const currentUrl = window.location.pathname + window.location.hash;

      if (currentUrl !== newUrl) {
        window.history.replaceState(window.history.state, "", newUrl);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      const navbar = navbarRef.current;
      const activeLink = navbar?.querySelector<HTMLElement>(
        `[data-section="${activeSection}"]`,
      );

      if (!navbar || !activeLink || pathname !== "/homepage") {
        setIndicator({ left: 0, width: 0 });
        return;
      }

      const navbarRect = navbar.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicator({
        left: linkRect.left - navbarRect.left,
        width: linkRect.width,
      });
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection, pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        ref={navbarRef}
        className="relative mx-auto grid min-h-16 max-w-7xl grid-cols-[auto_1fr] items-center gap-2 rounded-2xl border border-border/50 bg-foreground/90 px-3 py-3 text-background shadow-lg backdrop-blur-xl sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-8"
      >
        {/* Branding */}
        <Link
          href="/homepage"
          className="flex w-fit items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
        >
          <Image
            src="/vinovialogo.svg"
            alt="Vinovia logo"
            width={40}
            height={40}
            priority
            className="h-8 w-8 object-contain sm:h-10 sm:w-10"
          />

          <span className="text-lg font-bold tracking-tight sm:text-2xl">
            Vinovia
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu className="justify-self-end sm:justify-self-center">
          <NavigationMenuList className="flex h-full items-center gap-0 sm:gap-4">
            {navigationLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink
                  data-section={link.section}
                  render={<Link href={link.href} />}
                  className="relative rounded-lg px-2 py-2 text-xs font-medium text-background/80 transition-colors hover:text-background sm:px-6 sm:text-base"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden sm:block" />

        {/* Moving indicator */}
        {pathname === "/homepage" && indicator.width > 0 && (
          <div
            className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-secondary transition-all duration-300"
            style={{
              left: indicator.left,
              width: indicator.width,
            }}
          />
        )}
      </div>
    </header>
  );
}
