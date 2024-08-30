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
import { Checkbox } from "~/app/components/ui/checkbox";
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
  const [selectedAccount, setSelectedAccount] = useState<
    Record<string, string | null>
  >({});
  const [selectedContact, setSelectedContact] = useState<
    Record<string, string | null>
  >({});

  const [selectedRowsByAccount, setSelectedRowsByAccount] = useState<
    Record<string, Set<string>>
  >({});

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const handleAccountChange = (transcriptId: string, accountName: string) => {
    setSelectedAccount((prev) => ({ ...prev, [transcriptId]: accountName }));

    const account = partnerAccounts.find(
      (partnerAccount) => partnerAccount.accountName === accountName,
    );

    if (account) {
      setSelectedContact((prev) => ({
        ...prev,
        [transcriptId]: account.contactName,
      }));
    }
    // Update the selected rows by accountName
    setSelectedRowsByAccount((prev) => {
      const newSelectedRowsByAccount = { ...prev };

      // Initialize the set if it doesn't exist
      if (!newSelectedRowsByAccount[accountName]) {
        newSelectedRowsByAccount[accountName] = new Set();
      }

      newSelectedRowsByAccount[accountName].add(transcriptId);
      console.log("Updated selectedRowsByAccount:", newSelectedRowsByAccount); // Debug: Log updated state
      return newSelectedRowsByAccount;
    });
  };

  const handleCheckboxChange = (transcriptId: string, isChecked: boolean) => {
    const accountName = selectedAccount[transcriptId];
    if (!accountName) return; // Ensure accountName is selected

    setSelectedRowsByAccount((prev) => {
      const newSelectedRowsByAccount = { ...prev };

      if (!newSelectedRowsByAccount[accountName]) {
        newSelectedRowsByAccount[accountName] = new Set();
      }
      if (isChecked) {
        newSelectedRowsByAccount[accountName].add(transcriptId);
      } else {
        newSelectedRowsByAccount[accountName].delete(transcriptId);
      }
      console.log(
        "Checkbox changed, updated selectedRowsByAccount:",
        newSelectedRowsByAccount,
      ); // Debug: Log state after checkbox change
      return newSelectedRowsByAccount;
    });
  };

  const handleDialogOpen = () => {
    console.log("Selected accounts:", selectedRowsByAccount); // Debug: Log selected accounts
    console.log("Total selected rows count:", countSelectedRows()); // Debug: Log total count
    setIsDialogOpen(true); // Open dialog
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close dialog
  };

  const countSelectedRows = () => {
    const count = Object.values(selectedRowsByAccount).reduce(
      (total, set) => total + set.size,
      0,
    );
    console.log("Counting selected rows:", count); // Debug: Log count calculation
    return count;
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
            <TableHead>Import</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Attendees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transcripts.length > 0
            ? transcripts.map((transcript) => (
                <TableRow key={transcript.id}>
                  <TableCell>
                    <Checkbox
                      onChange={(e) =>
                        handleCheckboxChange(
                          transcript.id,
                          (e.target as HTMLInputElement).checked,
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value) =>
                        handleAccountChange(transcript.id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={
                            selectedAccount[transcript.id] ||
                            "Select an account"
                          }
                        />
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
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={"Select a contact"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {partnerAccounts
                            .filter(
                              (partnerAccount) =>
                                partnerAccount.accountName ===
                                selectedAccount[transcript.id],
                            )
                            .map((partnerAccount, index) => (
                              <SelectItem
                                key={index}
                                value={partnerAccount.contactName}
                                disabled={
                                  partnerAccount.accountName !==
                                  selectedAccount[transcript.id]
                                }
                              >
                                {partnerAccount.contactName}
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
            <Button variant="default" onClick={handleDialogOpen}>
              Import Transcripts
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Import {countSelectedRows()} accounts
              </AlertDialogDescription>
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
