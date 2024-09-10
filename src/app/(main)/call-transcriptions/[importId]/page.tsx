"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "~/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/app/components/ui/toggle-group";
import { influenceIndicators } from "~/lib/in-in-list";
import { useState } from "react";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import MeetingHeaderTable from "~/app/components/MeetingHeaderTable";
import {
  maturityMapOutput,
  MaturityMapOutput,
} from "~/lib/maturity-map-output";
import {
  influenceIndicatorOutput,
  InfluenceIndicatorOutput,
} from "~/lib/influence-indicator-output";
import { CallTranscriptForm } from "~/app/components/callTranscriptCrud";

export default function ImportedTranscriptPage() {
  // TODO: add loading screen

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [selectedToggle, setSelectedToggle] = useState<string>("");
  const [capabilityButtonClicked, setCapabilityButtonClicked] = useState(false);
  const [resetButton, setResetButton] = useState(false);
  const [capabilityData, setCapabilityData] = useState(false);

  const { importId: importTranscriptId } = useParams();

  const { data: transcriptData } = react_api.transcriptRouter.getById.useQuery({
    id: typeof importTranscriptId === "string" ? importTranscriptId : "",
  });

  let accountName: string | null = "";

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");
  }
  const { data: account } =
    react_api.partnerAccountRouter.getAccountByName.useQuery({
      partnerAccountName: accountName || "No account name",
    });

  // if ((accountName = "No account name")) {
  //   return (
  //     <div className=" flex flex-col items-center justify-center gap-6">
  //       <div>Account loading...</div>
  //       <Link href="/call-transcriptions">
  //         <Button>Back to Partner Accounts</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="loader-container">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-6">
  //       <div className="text-red-500">{error}</div>
  //       <Link href="/call-transcriptions">
  //         <Button>Back</Button>
  //       </Link>
  //     </div>
  //   );
  // }

  const renderMaturityMapOutput = () => {
    return maturityMapOutput.map((item: MaturityMapOutput, index: number) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.title}</TableCell>
        <TableCell>
          {item.details.map((detail, subIndex) => (
            <div key={subIndex} className="mb-2 flex flex-col gap-2">
              <strong>{detail.subTitle}:</strong>
              <ul>
                {detail.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </TableCell>
      </TableRow>
    ));
  };
  const renderInfluenceIndicatorOutput = () => {
    return influenceIndicatorOutput.map(
      (item: InfluenceIndicatorOutput, index: number) => (
        <TableRow key={index} className="hover:bg-transparent">
          <TableCell className="font-semibold">{item.title}</TableCell>
          <TableCell>
            {item.details.map((detail, subIndex) => (
              <div key={subIndex} className="mb-2 flex flex-col gap-2">
                <strong>{detail.subTitle}:</strong>
                <ul>
                  {detail.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </TableCell>
        </TableRow>
      ),
    );
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Partner Account: {account?.accountName}. {""}
        Call title: {transcriptData?.title}.
      </div>
      {transcriptData && (
        <MeetingHeaderTable
          accountName={account?.accountName}
          transcript={transcriptData}
        />
      )}
      <div className="mt-4 rounded-xl border shadow">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Select Maturtiy Map or Influence Indicator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="flex justify-start p-2 py-4 hover:bg-transparent">
              <ToggleGroup
                className="gap-2 p-4"
                type="single"
                value={selectedToggle}
                onValueChange={(value) => setSelectedToggle(value)}
              >
                <ToggleGroupItem
                  variant="outline"
                  value="maturityMap"
                  disabled={capabilityButtonClicked}
                  className={`rounded px-4 py-2 ${
                    selectedToggle === "maturityMap"
                      ? "border-2 border-green-300"
                      : null
                  }`}
                >
                  Maturity Map
                </ToggleGroupItem>
                <ToggleGroupItem
                  variant="outline"
                  value="influenceIndicator"
                  disabled={capabilityButtonClicked}
                  className={`rounded px-4 py-2 ${
                    selectedToggle === "influenceIndicator"
                      ? "border-2 border-green-300"
                      : null
                  }`}
                >
                  Influence Indicator
                </ToggleGroupItem>
                {selectedToggle === "influenceIndicator" ? (
                  <Select disabled={capabilityButtonClicked}>
                    <SelectTrigger className="w-[260px]">
                      <SelectValue placeholder="Select an indicator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {influenceIndicators.map((indicator) => (
                          <SelectItem key={indicator.id} value={indicator.name}>
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Select disabled>
                    <SelectTrigger className="w-[260px]">
                      <SelectValue placeholder="Select an indicator" />
                    </SelectTrigger>
                  </Select>
                )}
              </ToggleGroup>
            </TableRow>
          </TableBody>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Get capability data based on your selection</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="flex justify-between gap-2 p-6 hover:bg-transparent">
              <Button
                disabled={
                  capabilityButtonClicked ||
                  resetButton ||
                  (selectedToggle !== "maturityMap" &&
                    selectedToggle !== "influenceIndicator")
                }
                onClick={() => {
                  setCapabilityData(true);
                  setCapabilityButtonClicked(true);
                  setResetButton(true);
                }}
                className={`${
                  selectedToggle === "maturityMap" ||
                  selectedToggle === "influenceIndicator"
                    ? "bg-green-300 text-white"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                Get capability data
              </Button>
              <Button
                variant="outline"
                disabled={
                  selectedToggle !== "maturityMap" &&
                  selectedToggle !== "influenceIndicator"
                }
                onClick={() => {
                  setCapabilityData(false);
                  setCapabilityButtonClicked(false);
                  setResetButton(false);
                }}
              >
                Reset Data
              </Button>
              <Button variant="outline">Save Data to Partner Account</Button>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* TESTING BASIC FORM FOR CALL TRANSCRIPT CRUD */}
      <div className="mt-6 rounded-xl border shadow">
        <CallTranscriptForm
          partnerAccountId={account?.partnerAccountId ?? 0}
          duration={transcriptData?.duration ?? 0}
          meetingDate={transcriptData?.dateString ?? ""}
          speakers={transcriptData?.speakers ?? []}
        />
      </div>
      <div className="mt-6 rounded-xl border shadow">
        {capabilityData ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Capability</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedToggle === "maturityMap"
                ? renderMaturityMapOutput()
                : renderInfluenceIndicatorOutput()}
            </TableBody>
          </Table>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center p-6 text-center text-xl text-gray-300">
            Select your preference for Maturity Map or Influence Indicator
          </div>
        )}
      </div>
      <div className="py-4"></div>
      <div className="mt-6 flex justify-between pt-12">
        <Link href="/call-transcriptions">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
