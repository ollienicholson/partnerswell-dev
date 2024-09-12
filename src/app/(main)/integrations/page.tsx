import * as React from "react";

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
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Integrations
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Card className="h-[200] w-[350px]">
          <CardHeader>
            <CardTitle>Fireflies</CardTitle>
            <CardDescription>Connected</CardDescription>
          </CardHeader>
          <CardFooter className="mt-4 flex justify-between">
            <Link href="/integrations/fireflies">
              <Button>Configure</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="h-[200] w-[350px]">
          <CardHeader>
            <CardTitle>Add Integration</CardTitle>
            <CardDescription>Connect to your favourite tools</CardDescription>
          </CardHeader>
          <CardFooter className="mt-4 flex justify-between">
            <Button>Connect</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// add cards component
// https://ui.shadcn.com/docs/components/card
