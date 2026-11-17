import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'


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
  description: "Developed by Polygon",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body className="p-4">
        <div className="bg-secondary h-20 rounded-md">
          <div className="grid grid-cols-5 gap-3 items-center">
            <div className="col-start-2 col-span-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>Link</NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="col-start-5">
              <ClerkProvider>
                <header className="flex justify-center items-center p-4 gap-4">
                  <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton>
                      <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </header>
              </ClerkProvider>
            </div>
          </div>
        </div>



        <main className="pt-16">
          {children}
        </main>

      </body>


    </html>

  );
}

<ClerkProvider>
  <header className="">

    <Show when="signed-out">
      <SignInButton />
      <SignUpButton>
        <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
          Sign Up
        </button>
      </SignUpButton>
    </Show>

    <Show when="signed-in">
      <UserButton />
    </Show>

  </header>
</ClerkProvider>