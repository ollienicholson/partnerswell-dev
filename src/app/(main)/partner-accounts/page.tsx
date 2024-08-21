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


const accounts = [
  {
    id: 1,
    accountName: "Accenture",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 2,
    accountName: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 3,
    accountName: "Accenture",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 4,
    accountName: "AWS",
    contact: "Reid Hoffman",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 5,
    accountName: "AWS",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 6,
    accountName: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 7,
    accountName: "Google",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
]


export default function PartnerAccounts() {
  const router = useRouter();
  const handleRowClick = (id: number) => {
    router.push(`/partner-accounts/account/${id}`);
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
              {accounts.map((account) => (
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
