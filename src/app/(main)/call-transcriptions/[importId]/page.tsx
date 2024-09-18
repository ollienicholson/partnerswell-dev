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
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { react_api } from "~/trpc/react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import MeetingHeaderTable from "~/app/components/MeetingHeaderTable";
import { TGPTOutput } from "~/lib/types";
import CreateCallTranscriptButton from "~/app/components/createCallTranscriptButton";

export default function ImportedTranscriptPage() {
  const [selectedToggle, setSelectedToggle] = useState<string>("");
  const [selectedIndicator, setSelectedIndicator] = useState<string>("");
  const [capabilityButtonClicked, setCapabilityButtonClicked] = useState(false);
  const [resetButton, setResetButton] = useState(false);
  const [capabilityData, setCapabilityData] = useState(false);
  const [gPTOutput, setGPTOutput] = useState<TGPTOutput[]>([]);
  
  // working
  const { importId: importTranscriptId } = useParams();
  // console.log("Imported Transcript ID: ", importTranscriptId);
  
  // working
  const {
    data: transcriptData,
    isLoading: transcriptLoading,
    error: transcriptError,
  } = react_api.transcriptRouter.getById.useQuery({
    id: typeof importTranscriptId === "string" ? importTranscriptId : "",
  });
  // transcriptData sentences is calling correct
  // console.log("src/app/(main)/call-transcriptions/[importId]/page.tsx >> transcriptData.id:", transcriptData?.id);

  const {
    data: getCapabilityData,
    isLoading: gptOutputLoading,
    refetch,
  } = react_api.transcriptRouter.getCapabilityData.useQuery(
    {
      type: selectedToggle,
      // ONLY IF SELECTED: need to pass in the influence indicator - currently hardcoded to return the first one
      indicator: selectedIndicator,
      id: typeof importTranscriptId === "string" ? importTranscriptId : "",
    },
    {
      enabled: false,
    },
  );
  // console.log("Selected Toggle: ", selectedToggle);
  // console.log("Selected Indicator: ", selectedIndicator);
  // console.log("ChatgptData:", getCapabilityData);

  let accountName: string | null = "";

  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    accountName = searchParams.get("account");
  }
  const {
    data: account,
    isLoading: accountLoading,
    error: accountError,
  } = react_api.partnerAccountRouter.getAccountByName.useQuery({
    partnerAccountName: accountName || "",
  });

  useEffect(() => {
    if (getCapabilityData) {
    try {
    // Clean the string by removing unwanted backticks
    const cleanedJsonString = getCapabilityData.replace(/`/g, "");
      // parse string as JSON
      const parsedData = JSON.parse(cleanedJsonString);
      setGPTOutput(parsedData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    }
  }, [getCapabilityData]);

  //handler for when toggle changes
  const handleToggleChange = (value: string) => {
    setSelectedToggle(value);

    // reset selectedIndicator if the toggle is not influence indicator
    if (value !== "influenceIndicator") {
      setSelectedIndicator("");
    }
  };

  // handler for when selected value changes
  const handleIndicatorChange = (value: string) => {
    setSelectedIndicator(value);
    // pass the selected indicator to the API
    console.log("Selected Influence Indicator: ", value);
  }

  // console.log("src/app/(main)/call-transcriptions/[importId]/page.tsx gPTOutput >> : ", gPTOutput);

  if (accountLoading || transcriptLoading || gptOutputLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (accountError || transcriptError) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-red-500">
          {accountError?.message || transcriptError?.message}
        </div>
        <Link href="/call-transcriptions">
          <Button>Back</Button>
        </Link>
      </div>
    );
  }
  const renderGPTOutput = () => {
    return gPTOutput.map((item: TGPTOutput, index) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.phase_name}</TableCell>
        <TableCell className="mb-2 flex flex-col gap-2">
          {item.description}
        </TableCell>
      </TableRow>
    ));
  };

  const renderInInOutput = () => {
    return gPTOutput.map((item: TGPTOutput, index) => (
      <TableRow key={index} className="hover:bg-transparent">
        <TableCell className="font-semibold">{item.phase_name}</TableCell>
        <TableCell className="mb-2 flex flex-col gap-2">
          {item.description}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Call Transcript: {transcriptData?.title}.
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
            <TableRow className="bg-slate-50">
              <TableHead>Select Maturtiy Map or Influence Indicator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="flex justify-start p-2 py-4 hover:bg-transparent">
              <ToggleGroup
                className="gap-2 p-4"
                type="single"
                value={selectedToggle}
                onValueChange={handleToggleChange}
              >
                <ToggleGroupItem
                  variant="outline"
                  value="maturityMap"
                  disabled={capabilityButtonClicked}
                  className={`rounded px-4 py-2 ${
                    selectedToggle === "maturityMap"
                      ? "border-2 border-pswellPrimary"
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
                      ? "border-2 border-pswellPrimary"
                      : null
                  }`}
                >
                  Influence Indicator
                </ToggleGroupItem>
                {selectedToggle === "influenceIndicator" ? (
                  <Select 
                  disabled={capabilityButtonClicked}
                  value={selectedIndicator}
                  onValueChange={handleIndicatorChange}
                  >
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
            <TableRow className="bg-slate-50">
              <TableHead>Get insights based on capability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="flex justify-between gap-2 p-6 hover:bg-transparent">
              <Button
                variant="pswellPrimary"
                disabled={
                  capabilityButtonClicked ||
                  resetButton ||
                  (selectedToggle !== "maturityMap" &&
                    selectedToggle !== "influenceIndicator")
                }
                onClick={() => {
                  refetch();

                  // setCapabilityData(true);
                  // setCapabilityButtonClicked(true);
                  // setResetButton(true);
                }}
                className={`${
                  selectedToggle === "maturityMap" ||
                  selectedToggle === "influenceIndicator"
                    ? "bg-pswellPrimary text-white"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                Get Capability Data
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
              <CreateCallTranscriptButton
                accountId={account?.partnerAccountId ?? 0}
                transcriptData={transcriptData}
                gptOutput={gPTOutput}
              />
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 rounded-xl border shadow">
        {getCapabilityData ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Capability</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedToggle === "maturityMap"
                ? renderGPTOutput()
                : renderInInOutput()}
            </TableBody>
          </Table>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center p-6 text-center text-xl text-gray-300">
            No data available.
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <Link href="/call-transcriptions">
          <Button>Back</Button>
        </Link>
      </div>
    </div>
  );
}
