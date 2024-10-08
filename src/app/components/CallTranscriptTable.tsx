"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "~/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
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
import { Button } from "~/app/components/ui/button";
import { allTranscripts } from "~/lib/types";
import { useRouter } from "next/navigation";

type CallTranscriptsTableProps = {
  transcripts: allTranscripts[];
  partnerAccounts: { accountName: string }[];
};

export default function CallTranscriptsTable({
  transcripts,
  partnerAccounts,
}: CallTranscriptsTableProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleAccountSelect = (accountName: string, transcriptId: string) => {
    setSelectedAccount(accountName);
    setSelectedRow(transcriptId);
  };

  const handleRowClick = (transcriptId: string, accountName: string) => {
    router.push(
      `/call-transcriptions/${transcriptId}?account=${encodeURIComponent(
        accountName,
      )}`,
    );
  };

  const renderEmptyTranscripts = () => (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={5} className="text-center">
        No transcripts found.
      </TableCell>
    </TableRow>
  );
  console.log("Rendering CallTranscriptsTable");
  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Call Title</TableHead>
            <TableHead>Partner Account</TableHead>
            <TableHead>Call Duration</TableHead>
            <TableHead>Call Date</TableHead>
            <TableHead>Attendees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transcripts.length > 0
            ? transcripts.map((transcript) => (
                <TableRow
                  key={transcript.id}
                  className={selectedRow === transcript.id ? "" : "opacity-60"}
                >
                  <TableCell>{transcript.title}</TableCell>
                  <TableCell>
                    <Select
                      value={
                        selectedRow === transcript.id
                          ? (selectedAccount ?? "")
                          : ""
                      }
                      onValueChange={(value) =>
                        handleAccountSelect(value, transcript.id)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {partnerAccounts.map((partnerAccount, index) => (
                            <SelectItem
                              key={index}
                              value={partnerAccount.accountName}
                            >
                              {partnerAccount.accountName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{transcript.duration} mins</TableCell>
                  <TableCell>
                    {new Date(transcript.dateString).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {transcript.speakers && transcript.speakers.length > 0 ? (
                      <ul>
                        {transcript.speakers.map((speaker, index) => (
                          <li key={index}>{speaker.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <div>No speakers available</div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            : renderEmptyTranscripts()}
        </TableBody>
      </Table>
      <div className="m-2 mt-4 flex justify-center rounded-xl bg-slate-50 p-4">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="pswellPrimary" disabled={!selectedAccount}>
              Import Selected Transcript
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Import Transcript</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to import{" "}
                {
                  transcripts.find(
                    (transcript) => transcript.id === selectedRow,
                  )?.title
                }{" "}
                to {selectedAccount}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            {/* <div className="mt-4 flex justify-between" > */}
            <AlertDialogAction
              className="bg-pswellPrimary text-white"
              onClick={() => {
                if (selectedRow && selectedAccount) {
                  handleRowClick(selectedRow, selectedAccount);
                  handleDialogClose();
                }
              }}
            >
              Import
            </AlertDialogAction>
            <AlertDialogCancel onClick={handleDialogClose}>
              Cancel
            </AlertDialogCancel>
            {/* </div> */}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
