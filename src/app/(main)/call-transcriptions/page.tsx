import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { Checkbox } from "~/app/components/ui/checkbox";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";

import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { getTranscripts } from "~/server/api/queries/getTranscripts";

import { partnerAccounts } from "~/lib/partner-accounts";

export default async function TranscriptsPage() {
  // TODO: remove hardcoded limit

  // get list of transcripts
  const transcripts = await getTranscripts();

  return (
    <div>
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Call Transcripts
        </div>
        <div className="border-1 w-full rounded-xl shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white">
                {/* add heckbox for import */}
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
              {transcripts.map((transcript) => (
                <TableRow key={transcript.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Select>
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
                  <TableCell>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select an contact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {partnerAccounts.map((partnerAccount, index) => (
                            <SelectItem
                              key={index}
                              value={partnerAccount.contact}
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
    </div>
  );
}
