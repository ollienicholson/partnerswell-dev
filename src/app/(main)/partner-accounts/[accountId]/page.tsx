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
import { useMemo, useState } from "react";
import { callTranscriptHeader } from "~/lib/call-transcript-header";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

export function DeleteAlertBox({ children }: { children: React.ReactNode }) {
  const { accountId: partnerAccountId } = useParams();
  const router = useRouter();

  // delete mutation
  const [accountIdToDelete, setAccountIdToDelete] = useState(
    partnerAccountId ? Number(partnerAccountId) : null,
  );
  const partnerAccountMutation =
    api.partnerAccountRouter.deletePartnerAccount.useMutation({
      onSuccess: () => {
        // Redirect back to the partner accounts list after deletion
        router.push("/partner-accounts");
      },
      onError: (error) => {
        console.log("Error deleting partner account:", error);
      },
    });

  const handlePartnerAccountDelete = async () => {
    if (!accountIdToDelete) {
      console.log("Account ID is missing or invalid");
      return;
    }
    try {
      await partnerAccountMutation.mutateAsync({
        partnerAccountId: Number(accountIdToDelete),
      });
      //rediret back to list
    } catch (error) {
      console.log("Error during deletion:", error);
    }
  };
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
          <AlertDialogAction asChild>
            <Button
              // variant="destructive"
              type="button"
              onClick={handlePartnerAccountDelete}
            >
              Delete
            </Button>
          </AlertDialogAction>
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
  // const openDialog = () => setIsOpen(true);
  const openDialog = () => {
    setaccountNameToUpdate(accountName);
    setcontactToUpdate(accountContact);
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);
  const queryClient = useQueryClient();

  const { accountId } = useParams();

  const [accountIdToUpdate, setAccountIdToUpdate] = useState(
    accountId ? Number(accountId) : null,
  );
  const [accountNameToUpdate, setaccountNameToUpdate] = useState("");
  const [contactToUpdate, setcontactToUpdate] = useState("");
  const [createdByToUpdate, setcreatedByToUpdate] = useState("");

  // update partner account
  const updatePartnerAccountMutation =
    api.partnerAccountRouter.updatePartnerAccount.useMutation({
      onSuccess: () => {
        console.log("updatePartnerAccountMutation");
        // Invalidate and refetch the data for the updated account
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        console.error("Error updating partner account:", error);
      },
    });

  const handleUpdatePartnerAccountMutation = async () => {
    if (!accountIdToUpdate) {
      console.log("Account ID is missing or invalid");
      return;
    }
    try {
      await updatePartnerAccountMutation.mutateAsync({
        partnerAccountId: Number(accountIdToUpdate),
        accountName: accountNameToUpdate,
        contactName: contactToUpdate,
        createdBy: createdByToUpdate,
      });
      setaccountNameToUpdate(accountNameToUpdate);
      setcontactToUpdate(contactToUpdate);
    } catch (error) {
      console.log("Error updating partner account:", error);
    }
  };

  return (
    <>
      <Button onClick={openDialog}>Edit Account</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {accountName}'s account</DialogTitle>
            <DialogDescription>
              Click Save Changes to update. Click Delete to delete the account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountName" className="text-right">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={accountNameToUpdate}
                onChange={(e) => setaccountNameToUpdate(e.target.value)}
                placeholder="Partner account name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactName" className="text-right">
                Primary Contact
              </Label>
              <Input
                id="contactName"
                value={contactToUpdate}
                onChange={(e) => setcontactToUpdate(e.target.value)}
                placeholder="Contact full name"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="secondary" type="button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleUpdatePartnerAccountMutation();
                closeDialog();
              }}
            >
              Save Changes
            </Button>
            <DeleteAlertBox>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">
                  Delete Account
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
// TODO: separate client and server components
// TODO: move imported transcripts to call transcripts flow

export default function AccountPage() {
  // pagination for call transcripts
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  //get account id
  const { accountId } = useParams();
  console.log("Getting data for AccountId:", accountId);

  //get account details
  const { data: account, isLoading } = api.partnerAccountRouter.getOne.useQuery(
    {
      partnerAccountId: Number(accountId),
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
            <TableRow key={account.partnerAccountId} className="hover:bg-white">
              <TableCell>{account.accountName}</TableCell>
              <TableCell>{account.contactName}</TableCell>
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
            <TableRow key={account.partnerAccountId} className="hover:bg-white">
              <TableCell>{account.createdAt.toString()}</TableCell>
              <TableCell>{account.createdBy}</TableCell>
            </TableRow>
          </TableBody>
          <div className="justify-right flex p-4">
            <EditAccountButton
              accountName={account.accountName}
              accountContact={account.contactName}
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
