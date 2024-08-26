"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { toast } from "~/app/components/ui/use-toast";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import Link from "next/link";
import { useState } from "react";

const FormSchema = z.object({
  api_key: z.string().min(30, {
    message: "Key must be at least 30 characters.",
  }),
});

export function InputForm() {
  console.log("fireflies frontend page.ts InputForm");
  const [status, setStatus] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      api_key: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("fireflies frontend page.ts onSubmit");
    try {
      const response = await fetch("/api/fireflies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // TODO: add correct toast component
      const result = await response.json();
      if (response.ok) {
        setStatus("SUCCESS: API key is valid !!");
        toast({
          title: "Success",
          description: "API key is valid",
          variant: "default",
        });
      } else {
        setStatus("ERROR: API key is invalid");
        toast({
          title: "Error",
          description: result.message || "API key is invalid",
          variant: "default",
        });
      }
    } catch (error) {
      setStatus("ERR: An error occurred while validating your API key");
      toast({
        title: "Error",
        description: "An error occurred while validating your API key",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="api_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your API Key</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                <div className="items-left pt-2">
                  <div style={{ marginBottom: "10px" }}>
                    Access meetings, contacts and team data with the Fireflies
                    API.
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    Usage beyond 50 api calls per day requires a Business
                    account. Contact support@fireflies.ai with questions.
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    GraphQL API Endpoint:{" "}
                    <Link
                      className="text-blue-500"
                      href="https://api.fireflies.ai/graphql"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://api.fireflies.ai/graphql
                    </Link>
                  </div>
                  <div style={{ marginBottom: "50px" }}>
                    Copy your API key from Fireflies.ai and paste it in the
                    authorisation box above before clicking connect.
                  </div>
                </div>
              </FormDescription>
              <FormMessage />
              {<div className="text-sm">{status}</div>}
            </FormItem>
          )}
        />
        <div className="flex justify-start gap-4">
          <Button type="submit">Connect</Button>
          <Button variant="secondary">Edit API key</Button>
        </div>
      </form>
    </Form>
  );
}

export default function Fireflies() {
  return (
    <div className="relative min-h-screen p-6">
      <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
        Fireflies Integration
      </div>
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Fireflies</CardTitle>
          <div className="items-left">
            <CardDescription>
              Connect your Fireflies account to get access to your call
              transcription data.
            </CardDescription>
          </div>
        </CardHeader>

        <div className="px-6">
          <InputForm />
        </div>
        <CardFooter className="mt-6 flex justify-between pt-6">
          <Link href="/integrations">
            <Button>Back</Button>
          </Link>
          <Link
            href="https://app.fireflies.ai/integrations/custom/fireflies"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Get your API Key</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
