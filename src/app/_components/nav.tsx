import Link from "next/link";

import { cn } from "~/utils/utils";
export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    ></nav>
  );
}
