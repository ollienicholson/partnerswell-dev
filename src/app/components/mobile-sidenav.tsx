"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Blocks, Ellipsis, Home, Menu, ScrollText, Users } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/app/components/ui/sheet";

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Partner Accounts", href: "/partner-accounts", icon: Users },
  { name: "Integrations", href: "/integrations", icon: Blocks },
  { name: "Call Transcripts", href: "/call-transcriptions", icon: ScrollText },
  // { name: "Options", href: "/options", icon: Ellipsis },
];

export default function MobileSideNav() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="flex items-center p-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Image src="/icon.png" alt="logo" width={35} height={35} />
          <span className="sr-only">Partnerswell</span>
          <nav className="grid gap-2 text-sm font-medium">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <SheetClose asChild key={link.name}>
                  <Link
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 ${
                      isActive(link.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <LinkIcon className="h-4 w-4" />
                    {link.name}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
