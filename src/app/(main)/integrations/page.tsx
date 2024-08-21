import * as React from "react"

import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";

import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";

export default function Integrations() {
  return (
    <div>
    <div className="border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
      Integrations
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Fireflies</CardTitle>
            <CardDescription>Connected</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button >Edit</Button>
            <Button className="hover:bg-red-500 bg-red-300">Disconnect</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Gong</CardTitle>
            <CardDescription>Connected</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button >Edit</Button>
            <Button className="hover:bg-red-500 bg-red-300">Disconnect</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Otter.ai</CardTitle>
            <CardDescription>Connected</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Button >Edit</Button>
            <Button className="hover:bg-red-500 bg-red-300">Disconnect</Button>
          </CardFooter>
        </Card>
        
        <Card className="w-[350px] h-[200]">
          <CardHeader>
            <CardTitle>Add Integration</CardTitle>
            <CardDescription>Connect with your favourite tools</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button>Connect</Button>
          </CardFooter>
        </Card>
        </div>
        </div>
  );
}

// add cards component
// https://ui.shadcn.com/docs/components/card