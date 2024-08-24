"use client";

import "~/styles/globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Blocks, Ellipsis, Home, ScrollText, Users } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Partner Accounts", href: "/partner-accounts", icon: Users },
  { name: "Integrations", href: "/integrations", icon: Blocks },
  { name: "Call Transcripts", href: "/call-transcriptions", icon: ScrollText },
  { name: "Options", href: "/options", icon: Ellipsis },
];

export default function SideNav() {
  const pathname = usePathname();
  const isActive = (link: string) => {
    return pathname === link;
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex-1">
        <nav className="grid items-start p-2 text-sm font-medium lg:px-4">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 rounded-md px-3 py-2 ${
                  isActive(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <LinkIcon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
