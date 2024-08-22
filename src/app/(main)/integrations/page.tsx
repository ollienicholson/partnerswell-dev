import * as React from "react"

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import Link from "next/link";

export default function Integrations() {
  return (
    <div className="relative min-h-screen p-6">
      <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
        Integrations
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Fireflies</CardTitle>
            <CardDescription>Connected</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between mt-4">
            <Link
            href="/integrations/fireflies"
            >
            <Button 
            >Configure</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Add Integration</CardTitle>
            <CardDescription>Connect your favourite tools</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between mt-4">
            <Button>Connect</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// add cards component
// https://ui.shadcn.com/docs/components/card