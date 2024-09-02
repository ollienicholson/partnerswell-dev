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

// TODO: relocate this to a types file
type CallTranscript = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
  }[];
};

type CallTranscriptsTableProps = {
  transcripts: CallTranscript[];
  partnerAccounts: { accountName: string; contactName: string }[];
};

export default function CallTranscriptsTable({
  transcripts,
  partnerAccounts,
}: CallTranscriptsTableProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // control dialog visibility
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null); // state to handle selected account
  const [enabledRow, setEnabledRow] = useState<string | null>(null); // state to handle enabled row

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // handler for account select
  const handleAccountSelect = (accountName: string, transcriptId: string) => {
    setSelectedAccount(accountName);
    setEnabledRow(transcriptId); // enable the row with this transcript id
  };

  const emptyTranscripts = () => {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center">
          No transcripts found. Please import transcripts to display data.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>Partner Account</TableHead>
            <TableHead>Call Title</TableHead>
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
                  // add class for enabled row
                  className={enabledRow === transcript.id ? "" : "opacity-50"}
                >
                  <TableCell>
                    <Select
                      // add handler on change for disabling all other rows
                      onValueChange={(value) =>
                        handleAccountSelect(value, transcript.id)
                      }
                      disabled={
                        enabledRow !== null && enabledRow !== transcript.id
                      } // disable all other rows when a row is enabled
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
                  <TableCell>{transcript.title}</TableCell>
                  <TableCell>{transcript.duration} mins</TableCell>
                  <TableCell>
                    {new Date(transcript.dateString).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {transcript.speakers.map((speaker, index) => (
                      <li key={index}>{speaker.name}</li>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            : emptyTranscripts()}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-start p-4">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="default"
              // add disabled handler
              disabled={!selectedAccount} // disable button when no account is selected
            >
              Import Transcript
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>Import account</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="mt-4 flex justify-between">
              <AlertDialogCancel onClick={handleDialogClose}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>Import</AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
