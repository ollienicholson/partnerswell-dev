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
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "~/app/components/ui/sheet";

export default function MobileSideNav() {
  return (
    <header className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
              <Image src="/favicon.png" alt="logo" width={35} height={35} />
              <span className="sr-only">Partnerswell</span>
          <nav className="grid gap-2 text-sm font-medium">
            <SheetClose asChild>
              <Link
                href="/"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Home className="h-4 w-4"/>
                Dashboard
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/partner-accounts"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Users className="h-4 w-4"/>
                Partner Accounts
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/integrations"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Blocks className="h-4 w-4"/>
                Integrations
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/call-transcriptions"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <ScrollText className="h-4 w-4"/>
                Call Transcriptions
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/options"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Ellipsis className="h-4 w-4"/>
                Options
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </header>

  );  
}