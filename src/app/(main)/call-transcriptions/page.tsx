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

const invoices = [
  {
    id: 1,
    import: "",
    account: "",
    contact: "Bruce Wayne",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Bruce",
  },
  {
    id: 2,
    import: "",
    account: "",
    contact: "Peter Parker",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Peter",
  },
  {
    id: 3,
    import: "",
    account: "",
    contact: "Steve Jobs",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Steve",
  },
  {
    id: 4,
    import: "",
    account: "",
    contact: "Reid Hoffman",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Reid",
  },
  {
    id: 5,
    import: "",
    account: "",
    contact: "Bruce Wayne",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Bruce",
  },
  {
    id: 6,
    import: "",
    account: "",
    contact: "Peter Parker",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Peter",
  }, 
  {
    id: 7,
    import: "",
    account: "",
    contact: "Steve Jobs",
    createdAt: "12/01/2024 6:40PM",
    duration: "1hr 13mins",
    title: "Intro call with Steve",
  },
]


export default function CallTranscriptions() {
  return (
      <div className="relative min-h-screen p-6">
        <div className="gap-4 border-b mb-4 pb-2 w-full text-lg font-semibold md:text-2xl">
        Call Transcriptions
        </div>
        <div className="w-full rounded-xl border-1 shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Import</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Title</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.import}</TableCell>
                  <TableCell>{invoice.account}</TableCell>
                  <TableCell>{invoice.contact}</TableCell>
                  <TableCell>{invoice.createdAt}</TableCell>
                  <TableCell>{invoice.duration}</TableCell>
                  <TableCell className="text-right">{invoice.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="pt-12">
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
