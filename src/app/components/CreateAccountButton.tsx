"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/components/ui/dialog";
import { Button } from "~/app/components/ui/button";
import { Label } from "~/app/components/ui/label";
import { Input } from "~/app/components/ui/input";
import { react_api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateAccountButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [accountName, setaccountName] = useState("");
  const [contact, setcontact] = useState("");
  const [createdBy, setcreatedBy] = useState("");

  const createPartnerAccount =
    react_api.partnerAccountRouter.createPartnerAccount.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (error) => {
        console.error("Error deleting partner account:", error);
      },
    });

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  // define handlers
  const handlePartnerAccountCreation = async () => {
    try {
      await createPartnerAccount.mutateAsync({
        accountName: accountName,
        contactName: contact,
        createdBy: createdBy,
      });
      setaccountName("");
      setcontact("");
      setcreatedBy("");
    } catch (error) {
      console.error("Error during account creation:", error);
    }
  };


  return (
    <>
      <Button variant="pswellPrimary" onClick={openDialog}>
        Create Account
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create new account</DialogTitle>
            <DialogDescription>
              Create a new account here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Account Name
              </Label>
              <Input
                id="name"
                placeholder="Partner account name"
                className="col-span-3"
                value={accountName}
                onChange={(e) => setaccountName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Primary Contact
              </Label>
              <Input
                id="username"
                placeholder="Contact full name"
                className="col-span-3"
                value={contact}
                onChange={(e) => setcontact(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" type="submit" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                handlePartnerAccountCreation();
                closeDialog();
              }}
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
