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
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState } from "react";


export function CreateAccountButton({}) {
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
            <Button variant="outline" type="submit" onClick={closeDialog}>Cancel</Button>
            <Button type="submit" onClick={closeDialog}>Create</Button>
        </div>

      </DialogContent>
    </Dialog>
    </>
  )
}

export default function Accounts() {

  // get accounts
  const router = useRouter();
  const {data: accounts, isLoading} = api.partnerAccountRouter.getPartnerAccounts.useQuery();
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  };
  const handleRowClick = (accountId: number) => {
    router.push(`/partner-accounts/${accountId}`);
  };

  return (
      <div className="relative min-h-screen p-2">
        <div className="gap-4 border-b mb-4 pb-2 w-full text-lg font-semibold md:text-2xl">
          Partner Accounts
        </div>
        <div className="w-full rounded-xl border-1 shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Account Name</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Created By</TableHead >
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts?.map((account) => (
                <TableRow 
                key={account.id}
                onClick={() => handleRowClick(account.id)}
                >
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell>{account.contact}</TableCell>
                  <TableCell>{account.createdAt}</TableCell>
                  <TableCell className="text-right">{account.createdBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 pt-12">
          <div className="flex justify-between">
            <Link href="/">
              <Button>Back</Button>
            </Link>
              <CreateAccountButton/>
          </div>
        </div>
      </div>
  );
}

// add pagination component
// https://www.youtube.com/watch?v=x8dszJTm_RQ
// https://ui.shadcn.com/docs/components/pagination
