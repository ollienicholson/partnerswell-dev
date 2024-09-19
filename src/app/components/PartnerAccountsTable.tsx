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

import { TPartnerAccount } from "~/lib/types";

type TProps = {
  accounts: TPartnerAccount[];
};


export default function PartnerAccountsTable({ accounts }: TProps) {
  // pagination set at 10 rows per page
  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  const pagintedAccounts = useMemo(() => {
    return accounts.slice(startIndex, startIndex + rowsPerPage);
  }, [accounts, startIndex, rowsPerPage]);

  const firstPage = startIndex === 0;
  const lastPage = startIndex + rowsPerPage >= accounts.length;

  const handleRowClick = (accountId: number) => {
    router.push(`/partner-accounts/${accountId}`);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Accounts
      </div>
      <div className="rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
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
        <Pagination className="my-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  firstPage ? "pointer-events-none opacity-50" : "no-select"
                }
                onClick={() => {
                  if (!firstPage) {
                    setStartIndex(startIndex - rowsPerPage);
                  }
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={
                  lastPage ? "pointer-events-none opacity-50" : "no-select"
                }
                onClick={() => {
                  if (!lastPage) {
                    setStartIndex(startIndex + rowsPerPage);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="pt-12">
        <div className="flex justify-between">
          <Link href="/">
            <Button variant="default">Back</Button>
          </Link>
          <CreateAccountButton />
        </div>
      </div>
    </div>
  );
}
