"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import { AlertDialogTrigger } from "~/app/components/ui/alert-dialog";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Button } from "~/app/components/ui/button";
import { DeleteAlertBox } from "~/app/components/DeleteAlertBox";
import { react_api } from "~/trpc/react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function EditAccountButton({
  accountName,
  accountContact,
}: {
  accountName: string;
  accountContact: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { accountId } = useParams();

  const [accountNameToUpdate, setaccountNameToUpdate] = useState(accountName);
  const [contactToUpdate, setcontactToUpdate] = useState(accountContact);

  // update partner account
  const updatePartnerAccountMutation =
    react_api.partnerAccountRouter.updatePartnerAccount.useMutation({
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        console.error("Error updating partner account:", error);
      },
    });

  const handleAccountUpdate = async () => {
    if (!accountId) return console.warn("Account ID is missing or invalid");

    try {
      await updatePartnerAccountMutation.mutateAsync({
        partnerAccountId: Number(accountId),
        accountName: accountNameToUpdate,
        contactName: contactToUpdate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating partner account:", error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit Account</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {accountName}'s account</DialogTitle>
            <DialogDescription>
              Save Changes will update the account details. Selecting Delete
              Account will first ask you if you're 100% sure.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountName" className="text-right">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={accountNameToUpdate}
                onChange={(e) => setaccountNameToUpdate(e.target.value)}
                placeholder="Partner account name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactName" className="text-right">
                Primary Contact
              </Label>
              <Input
                id="contactName"
                value={contactToUpdate}
                onChange={(e) => setcontactToUpdate(e.target.value)}
                placeholder="Contact's full name"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="pswellPrimary"
              onClick={handleAccountUpdate}
            >
              Save Changes
            </Button>
            <DeleteAlertBox>
              <AlertDialogTrigger asChild>
                <Button variant="pswellDestructive" type="button">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
            </DeleteAlertBox>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
