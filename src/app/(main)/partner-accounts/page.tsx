"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function Accounts() {
  const router = useRouter();
  const {data: accounts, isLoading} = api.partnerAccountRouter.getPartnerAccounts.useQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleRowClick = (accountId: number) => {
    router.push(`/partner-accounts/${accountId}`);
  };
  // remove accounts folder and list accounts under [id]

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
          <div className="flex justify-start">
            <Link href="/">
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      </div>
  );
}

// add pagination component
// https://www.youtube.com/watch?v=x8dszJTm_RQ
// https://ui.shadcn.com/docs/components/pagination
