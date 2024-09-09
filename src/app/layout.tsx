import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import TopNav from "./components/top-nav";
import SideNav from "~/app/components/side-nav";
import MobileSideNav from "~/app/components/mobile-sidenav";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Partnerswell",
  description: "Partnerswell WebApp",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <Toaster />
          <TRPCReactProvider>
            <TopNav />
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <div className="hidden border-r bg-muted/40 md:block">
                <SideNav />
              </div>
              <div>
                <MobileSideNav />
                {children}
              </div>
            </div>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
