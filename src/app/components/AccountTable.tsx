"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { EditAccountButton } from "~/app/components/EditAccountButton";

import { TPartnerAccount } from "~/lib/types";

// TODO: handle error UI for incorrect acccount id
export function AccountTable({ account }: { account: TPartnerAccount }) {
  return (
    <div className="rounded-xl border shadow">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Account</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={account.partnerAccountId} className="hover:bg-white">
            <TableCell>{account.accountName}</TableCell>
            <TableCell>{account.contactName}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader className="p-2">
          <TableRow className="bg-slate-50">
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={account.partnerAccountId} className="hover:bg-white">
            {/* Understand the new Date */}
            <TableCell>
              {new Date(account.createdAt).toLocaleString("en-AU")}
            </TableCell>
            <TableCell>{account.createdBy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-end p-4">
        <EditAccountButton
          accountName={account.accountName}
          accountContact={account.contactName}
        />
      </div>
    </div>
  );
}
