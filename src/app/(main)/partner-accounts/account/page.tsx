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

const invoice =
  {
    id: 1,
    account: "Accenture",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  }

export default function Account() {
  return (
    <div>
      <div className="gap-4 border-b pb-2 mb-4 w-full text-lg font-semibold md:text-2xl">
        Partner Account: Accenture
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
              <TableRow key={invoice.id} className="hover:bg-white">
                <TableCell>{invoice.account}</TableCell>
                <TableCell>{invoice.contact}</TableCell>
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
              <TableRow key={invoice.id} className="hover:bg-white">
                <TableCell>{invoice.createdAt}</TableCell>
                <TableCell>{invoice.createdBy}</TableCell>
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