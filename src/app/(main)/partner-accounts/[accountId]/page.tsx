"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/app/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/app/components/ui/pagination";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { api } from "~/trpc/react";
import { useEffect, useMemo, useState } from "react";
import { callTranscriptHeader } from "~/lib/call-transcript-header";
import { useRouter } from "next/navigation";

export function DeleteAlertBox({ children }: { children: React.ReactNode }) {
  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4 flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditAccountButton({
  accountName,
  accountContact,
}: {
  accountName: string;
  accountContact: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <Button onClick={openDialog}>Edit Account</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit account</DialogTitle>
            <DialogDescription>
              Edit {accountName}'s account. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Account Name
              </Label>
              <Input
                id="name"
                defaultValue={accountName}
                placeholder="Partner account name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Primary Contact
              </Label>
              <Input
                id="username"
                defaultValue={accountContact}
                placeholder="Contact full name"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" type="submit" onClick={closeDialog}>
              Cancel
            </Button>
            <Button type="submit" onClick={closeDialog}>
              Save
            </Button>
            <DeleteAlertBox>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="submit">
                  Delete
                </Button>
              </AlertDialogTrigger>
            </DeleteAlertBox>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// TODO: handle incorrect acccount id
export default function AccountPage() {
  const [accountId, setAccountId] = useState<number | null>(null);
  // pagination
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); // Grab the last segment of the path
    if (id && !isNaN(Number(id))) {
      setAccountId(Number(id));
    }
  }, []);

  const { data: account, isLoading } =
    api.partnerAccountRouter.getPartnerAccountById.useQuery(
      { id: accountId ?? 0 },
      {
        enabled: !!accountId, // Only fetch if accountId is valid
      },
    );

  const pagintedTranscripts = useMemo(() => {
    return callTranscriptHeader.slice(startIndex, endIndex);
  }, [callTranscriptHeader, startIndex, endIndex]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="loader-container">
        <div className=" flex flex-col items-center justify-center gap-6">
          <div>Account not found</div>
          <Link href="/partner-accounts">
            <Button>Back to Partner Accounts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const router = useRouter();
  const handleRowClick = (meetingId: number) => {
    router.push(`/partner-accounts/${accountId}/${meetingId}`);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account.accountName}
      </div>
      <div className="rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
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
          <div className="justify-right flex p-4">
            <EditAccountButton
              accountName={account.accountName}
              accountContact={account.contact}
            />
          </div>
        </Table>
      </div>
      <div className="py-4"></div>
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        {account.accountName} Meetings
      </div>
      <div className="rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Title</TableHead>
              <TableHead>Meeting Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Attendees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagintedTranscripts.map((call) => (
              <>
                <TableRow
                  key={call.callTranscriptId}
                  onClick={() => handleRowClick(call.callTranscriptId)}
                  className="border-0"
                >
                  <TableCell>{call.callTranscriptTitle}</TableCell>
                  <TableCell>
                    {new Date(call.dateString).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{call.callDuration} mins</TableCell>
                  <TableCell className="">
                    {call.callAttendees.map((attendee, index) => (
                      <li key={index}>{attendee.speakers}</li>
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow className="text-gray-300 hover:bg-transparent">
                  <TableCell colSpan={4} align="left">
                    {call.callSummary.length > 190
                      ? `${call.callSummary.substring(0, 190)}...`
                      : call.callSummary}
                  </TableCell>
                </TableRow>
              </>
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
                  endIndex === callTranscriptHeader?.length
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
          <Link href="/partner-accounts">
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
