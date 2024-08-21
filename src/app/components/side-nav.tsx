import "~/styles/globals.css";


import Link from "next/link";

import {
  Blocks,
  Ellipsis,
  Home,
  ScrollText,
  Users,
} from "lucide-react";


export default function SideNav() {
  return (
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex-1">
          <nav className="grid items-start p-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Home className="h-4 w-4"/>
              Dashboard
            </Link>
            <Link
              href="/partner-accounts"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Users className="h-4 w-4" />
              Partner Accounts
            </Link>
            <Link
              href="/integrations"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Blocks className="h-4 w-4" />
              Integrations{" "}
            </Link>
            <Link
              href="/call-transcriptions"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <ScrollText className="h-4 w-4" />
              Call Transcriptions
            </Link>
            <Link
              href="/options"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Ellipsis className="h-4 w-4" />
              Options
            </Link>
          </nav>
        </div>    
      </div>
  );
}
