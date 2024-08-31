"use client";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/app/components/ui/pagination";
import { useRouter } from "next/navigation";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { CreateAccountButton } from "~/app/components/CreateAccountButton";

type Account = {
  partnerAccountId: number;
  accountName: string;
  contactName: string;
  createdBy: string | null;
  createdAt: Date;
};

type Props = {
  accounts: Account[];
};

// TODO: fix date
// TODO: fix pagination

export default function PartnerAccountsTable({ accounts }: Props) {
  // pagination
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const router = useRouter();

  const pagintedAccounts = useMemo(() => {
    console.log("PagintedAccounts Component Rendered");
    return accounts.slice(startIndex, endIndex);
  }, [accounts, startIndex, endIndex]);

  const handleRowClick = (accountId: number) => {
    router.push(`/partner-accounts/${accountId}`);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Accounts
      </div>
      <div className="border-1 w-full rounded-xl shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead>Account Name</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagintedAccounts.map((account) => (
              <TableRow
                key={account.partnerAccountId}
                onClick={() => handleRowClick(account.partnerAccountId)}
              >
                <TableCell>{account.accountName}</TableCell>
                <TableCell>{account.contactName}</TableCell>
                <TableCell>
                  {account.createdAt.toLocaleString("en-AU")}
                </TableCell>
                <TableCell>{account.createdBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  startIndex === 0
                    ? "pointer-events-none opacity-50"
                    : "no-select"
                }
                onClick={() => {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  endIndex === accounts?.length
                    ? "pointer-events-none opacity-50"
                    : "no-select"
                }
                onClick={() => {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="mt-6 pt-12">
        <div className="flex justify-between">
          <Link href="/">
            <Button>Back</Button>
          </Link>
          <CreateAccountButton />
        </div>
      </div>
    </div>
  );
}
