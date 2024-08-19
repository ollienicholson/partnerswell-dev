import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";
import { MainNav } from "./_components/nav";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Partnerswell",
  description: "Partnerswell WebApp",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(`font-sans ${inter.variable}`)}>
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <div className="rounded-full shadow">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </div>
          <Toaster />

          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
