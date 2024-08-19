import "~/styles/globals.css";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <Image src="/logo.png" alt="logo" width={171} height={40} />
              <div className="ml-auto flex items-center space-x-4">
                <div className="rounded-full shadow">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </div>
  );
}
