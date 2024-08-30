"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Button } from "~/app/components/ui/button";
import { useState } from "react";

export function CreateAccountButton() {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Button onClick={openDialog}>Create Account</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create new account</DialogTitle>
            <DialogDescription>
              Create a new account here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Account Name
              </Label>
              <Input
                id="name"
                placeholder="Partner account name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Primary Contact
              </Label>
              <Input
                id="username"
                placeholder="Contact full name"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" type="submit" onClick={closeDialog}>
              Cancel
            </Button>
            <Button type="submit" onClick={closeDialog}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
