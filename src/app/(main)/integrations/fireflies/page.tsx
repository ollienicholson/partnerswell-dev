"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/app/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/components/ui/form"
import { Input } from "~/app/components/ui/input"
import { toast } from "~/app/components/ui/use-toast"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import Link from "next/link";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })



  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your API Key</FormLabel>
              <FormControl>
                <Input placeholder="xxxxxxxx - xxxx - xxxx - xxxx - xxxxxxxxxxxx" {...field} />
              </FormControl>
              <FormDescription>
              <div className="pt-2 items-left">
              <div style={{ marginBottom: '10px' }}>Access meetings, contacts and team data with the Fireflies API.</div>
              <div style={{ marginBottom: '10px' }}>Usage beyond 50 api calls per day requires a Business account. Contact support@fireflies.ai with questions.</div>
              <div style={{ marginBottom: '10px' }}>GraphQL API Endpoint: <Link className="text-blue-500" href="https://api.fireflies.ai/graphql" target="_blank" rel="noopener noreferrer">https://api.fireflies.ai/graphql</Link></div>
              <div style={{ marginBottom: '50px' }}>Copy your API Key and replace in the Authorization box above. </div>
              </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between ">
        <Button type="submit">Connect</Button>
        </div>
      </form>
    </Form>
  )
}




export default function Fireflies() {
  return (
    <div className="relative min-h-screen p-6">
      <div className="gap-4 border-b mb-4 pb-2 w-full text-lg font-semibold md:text-2xl">
        Fireflies Integration
      </div>
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Fireflies</CardTitle>
          <div className="items-left">
          <CardDescription>Connect your Fireflies account to get access to your call transcription data.</CardDescription>
          </div>
        </CardHeader>
        
        <div className="px-6">
          <InputForm />
        </div>
        <CardFooter className="flex justify-between mt-6 pt-6">
          <Link
          href="/integrations"
          >
          <Button 
          >Back</Button>
          </Link>
          <Link href="https://app.fireflies.ai/integrations/custom/fireflies" target="_blank" rel="noopener noreferrer">
        <Button >Get your API Key</Button>
        </Link>
        </CardFooter>
      </Card>
    </div>
  );
}