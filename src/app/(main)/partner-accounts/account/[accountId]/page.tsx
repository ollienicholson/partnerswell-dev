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

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const fetchAccountData = async (id: number) => {
  return   {
    id,
    accountName: "Accenture",
    contactName: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  };
};

export default function Account() {
  const { accountId } = useParams();
  console.log(accountId);
  const [accountData, setAccount] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accountId) {
      const fetchData = async () => {
        const data = await fetchAccountData(parseInt(accountId as string));
        setAccount(data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [accountId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!accountData) {
    return <div>Error: ${accountId} is not a valid account ID.</div>;
  }

  return (
    <div>
      <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
        Partner Account {accountData.accountName}
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
              <TableRow key={accountData.id} className="hover:bg-white">
                <TableCell>{accountData.accountName}</TableCell>
                <TableCell>{accountData.contactName}</TableCell>
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
              <TableRow key={accountData.id} className="hover:bg-white">
                <TableCell>{accountData.createdAt}</TableCell>
                <TableCell>{accountData.createdBy}</TableCell>
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