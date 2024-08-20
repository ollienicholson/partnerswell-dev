import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/app/components/ui/button";
import Link from "next/link";

const invoices = [
  {
    id: 1,
    account: "Accenture",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 2,
    account: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 3,
    account: "Accenture",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 4,
    account: "AWS",
    contact: "Reid Hoffman",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 5,
    account: "AWS",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 6,
    account: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    id: 7,
    account: "Google",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
]

interface Invoice {
  id: number;
  account: string;
  contact: string;
  createdBy: string;
  createdAt: string; // or number, depending on your data type
}


export default function PartnersAccount() {
  return (
      <div className="relative min-h-screen">
        <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
          Partner Accounts
        </div>
        <div className="w-full rounded-xl border-1 shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.account}</TableCell>
                  <TableCell>{invoice.contact}</TableCell>
                  <TableCell>{invoice.createdAt}</TableCell>
                  <TableCell className="text-right">{invoice.createdBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 pt-12">
          <div className="flex justify-start">
            <Link href="/dashboard">
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
