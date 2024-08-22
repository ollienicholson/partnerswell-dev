"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/app/components/ui/alert-dialog"
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";

export function AlertBox( {children}: {children: React.ReactNode}) {
  return (
  <AlertDialog>
    {children}
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
        <div className="flex justify-between mt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete</AlertDialogAction>
        </div>
    </AlertDialogContent>
  </AlertDialog>
  );
}

export function EditAccountButton({accountName, accountContact}: {accountName: string, accountContact: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  
  return (
    <>
    <Button onClick={openDialog}>Edit Account</Button>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription>
            Edit {accountName}'s account. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Account Name
            </Label>
            <Input
              id="name"
              defaultValue={accountName}
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
              defaultValue={accountContact}
              placeholder="Contact full name"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" type="submit" onClick={closeDialog}>Cancel</Button>
          <Button type="submit" onClick={closeDialog}>Save</Button>
          <AlertBox>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" type="submit">Delete</Button>
            </AlertDialogTrigger>
          </AlertBox>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}

export default function Account() {
  const [accountId, setAccountId] = useState<number | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); // Grab the last segment of the path
    if (id && !isNaN(Number(id))) {
      setAccountId(Number(id));
    }
  }, []);

  const { data: account, isLoading } = api.partnerAccountRouter.getPartnerAccountById.useQuery(
    { id: accountId ?? 0 },
    {
      enabled: !!accountId, // Only fetch if accountId is valid
    }
  );

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  };

  if (!account) {
    return (
      <div className="loader-container">
      <div className="loader"></div>
      <div>Account not found?</div>;
    </div>
    )
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
        Partner Account: {account.accountName}
      </div>
      <div className="rounded-xl border-1 shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead>Account</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={account.id} className="hover:bg-white">
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.contact}</TableCell>
            </TableRow>
          </TableBody>
          <div className="p-2" />
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead>Created At</TableHead>
              <TableHead>Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={account.id} className="hover:bg-white">
              <TableCell>{account.createdAt}</TableCell>
              <TableCell>{account.createdBy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 pt-12">
        <div className="flex justify-between">
          <Link href="/partner-accounts">
            <Button>Back</Button>
          </Link>
          <EditAccountButton accountName={account.accountName} accountContact={account.contact}/>
        </div>
      </div>
    </div>
  );
}
