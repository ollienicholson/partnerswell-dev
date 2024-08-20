import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import TopNav from "./components/top-nav";

import Link from "next/link";

import {
  Blocks,
  Ellipsis,
  Home,
  Menu,
  ScrollText,
  Users,
} from "lucide-react";

import Image from "next/image";

import { Button } from "~/app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/app/components/ui/sheet";

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
          <TopNav />
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex-1">
                  <nav className="grid items-start p-2 text-sm font-medium lg:px-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <Home className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/partner-accounts"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <Users className="h-4 w-4" />
                      Partner Accounts
                    </Link>
                    <Link
                      href="/integrations"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <Blocks className="h-4 w-4" />
                      Integrations{" "}
                    </Link>
                    <Link
                      href="/call-transcriptions"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <ScrollText className="h-4 w-4" />
                      Call Transcriptions
                    </Link>
                    <Link
                      href="/options"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                    >
                      <Ellipsis className="h-4 w-4" />
                      Options
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                        <Image src="/favicon.png" alt="logo" width={40} height={40} />
                        <span className="sr-only">Partnerswell</span>
                    <nav className="grid gap-2 text-lg font-medium">
                      <Link
                        href="/dashboard"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="/partner-accounts"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Users className="h-5 w-5" />
                        Partner Accounts
                      </Link>
                      <Link
                        href="/integrations"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Blocks className="h-5 w-5" />
                        Integrations
                      </Link>
                      <Link
                        href="/call-transcriptions"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <ScrollText className="h-5 w-5" />
                        Call Transcriptions
                      </Link>
                      <Link
                        href="/options"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <Ellipsis className="h-5 w-5" />
                        Options
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
              </header>
              <main className="p-4">
                  <div className="text-lg font-semibold md:text-2xl">
                    <TRPCReactProvider>{children}</TRPCReactProvider>
                  </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
