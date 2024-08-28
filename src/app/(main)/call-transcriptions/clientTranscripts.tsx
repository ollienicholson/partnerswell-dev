"use client"; // Indicate that this is a client-side component

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

// TODO: relocate this to a types file
type Transcript = {
  id: string;
  title: string;
  duration: string;
  dateString: string;
  speakers: {
    name: string;
  }[];
};

type ClientTranscriptsProps = {
  transcripts: Transcript[];
  partnerAccounts: { accountName: string; contact: string }[];
};

export default function ClientTranscripts({
  transcripts,
  partnerAccounts,
}: ClientTranscriptsProps) {
  const [selectedAccount, setSelectedAccount] = useState<
    Record<string, string | null>
  >({});
  const [selectedContact, setSelectedContact] = useState<
    Record<string, string | null>
  >({});

  const handleAccountChange = (transcriptId: string, accountName: string) => {
    setSelectedAccount((prev) => ({ ...prev, [transcriptId]: accountName }));

    const account = partnerAccounts.find(
      (partnerAccount) => partnerAccount.accountName === accountName,
    );

    if (account) {
      setSelectedContact((prev) => ({
        ...prev,
        [transcriptId]: account.contact,
      }));
    }
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
                  <Checkbox />
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
                          selectedAccount[transcript.id] || "Select an account"
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
                              value={partnerAccount.contact}
                              disabled={
                                partnerAccount.accountName !==
                                selectedAccount[transcript.id]
                              }
                            >
                              {partnerAccount.contact}
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
  );
}
