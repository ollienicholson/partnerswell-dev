import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const invoices = [
  {
    account: "Accenture",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "Accenture",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "AWS",
    contact: "Reid Hoffman",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "AWS",
    contact: "Bruce Wayne",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "Capgemini",
    contact: "Peter Parker",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
  {
    account: "Google",
    contact: "Steve Jobs",
    createdBy: "Cam Tickell",
    createdAt: "12/01/2024 6:40PM",
  },
]

export default function CallTranscriptions() {
  return (
    <div>
      <div className="flex flex-col gap-4 border-b pb-2 mb-4 w-full">
        Hello Call Transcriptions
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Account</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Created By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.account}>
              <TableCell className="font-medium">{invoice.account}</TableCell>
              <TableCell>{invoice.contact}</TableCell>
              <TableCell>{invoice.createdAt}</TableCell>
              <TableCell className="text-right">{invoice.createdBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
// add pagination component
// https://www.youtube.com/watch?v=x8dszJTm_RQ
// https://ui.shadcn.com/docs/components/pagination
