import "~/styles/globals.css";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Image src="/favicon.png" alt="logo" width={35} height={35} />
        <div className="ml-auto space-x-4">
          <div className="rounded-full shadow">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
