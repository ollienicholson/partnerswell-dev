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
import { api } from "~/trpc/react";
// import { useRouter } from "next/navigation"; // Correct hook for navigation in app directory
import { useEffect, useState } from "react";

export default function Account() {
  // const router = useRouter();
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
    return <div>Loading...</div>;
  }

  if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div>
      <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
        Partner Account {account.accountName}
      </div>
      <div className="w-full rounded-xl border-1 shadow-md py-2">
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
          <Link href="">
            <Button>Delete Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
