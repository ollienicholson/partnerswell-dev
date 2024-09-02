"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/app/components/ui/alert-dialog";
import { Button } from "~/app/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState } from "react";

export function DeleteAlertBox({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accountId: partnerAccountId } = useParams();
  const [accountIdToDelete] = useState(
    partnerAccountId ? Number(partnerAccountId) : null,
  );

  // delete partner account mutation
  const partnerAccountMutation =
    api.partnerAccountRouter.deletePartnerAccount.useMutation({
      onSuccess: () => {
        router.push("/partner-accounts");
        router.refresh();
      },
      onError: (error) => {
        console.error("Error deleting partner account:", error);
      },
    });

  const handleAccountDelete = async () => {
    if (!accountIdToDelete)
      return console.warn("Account ID is missing or invalid");

    try {
      await partnerAccountMutation.mutateAsync({
        partnerAccountId: Number(accountIdToDelete),
      });
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4 flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={handleAccountDelete}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
