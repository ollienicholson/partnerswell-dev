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
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { react_api } from "~/trpc/react";
import toast from "react-hot-toast";
import { Loading } from "~/app/components/Loading";

const FormSchema = z.object({
  api_key: z.string().min(30, {
    message: "Key must be at least 30 characters.",
  }),
});

export function InputForm() {
  const [status, setStatus] = useState<string | null>(null);
  const { data: firefliesApiKey, isLoading } =
    react_api.integrationRouter.getFireFliesKey.useQuery();
  const upsertApiKey = react_api.integrationRouter.upsertApiKey.useMutation({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      api_key: firefliesApiKey ?? "",
    },
  });
  useEffect(() => {
    if (firefliesApiKey) {
      form.setValue("api_key", firefliesApiKey);
    }
  }, [firefliesApiKey, form]);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await toast.promise(
      upsertApiKey.mutateAsync({
        api_key: data.api_key,
      }),
      {
        loading: "Saving API key...",
        success: "Successfully saved API key",
        error: "Error saving API key",
      },
    );
  }

  console.log(firefliesApiKey);
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
                <div>
                  {!isLoading && (
                    <Input
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      {...field}
                    />
                  )}
                  {isLoading && <Loading />}
                </div>
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
