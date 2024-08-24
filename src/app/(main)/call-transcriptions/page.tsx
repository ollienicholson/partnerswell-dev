import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/components/ui/table";
import { Checkbox } from "~/app/components/ui/checkbox";

import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { getTranscripts } from "~/server/api/queries/getTranscripts";

export default async function TranscriptsPage(): Promise<JSX.Element> {
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
                {/* add dropdown for account */}
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
                  <TableCell>dropdown</TableCell>
                  <TableCell>dropdown</TableCell>
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
