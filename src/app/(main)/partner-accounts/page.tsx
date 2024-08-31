import PartnerAccountsTable from "~/app/components/PartnerAccountsTable";
import { api } from "src/trpc/server";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default async function PartnerAccountsPage() {
  try {
    const accounts = await api.partnerAccountRouter.getAll();

    // console.log("ACCOUNT[0]", accounts[0]);
    return (
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Partner Accounts
        </div>
        <Suspense fallback={<div>Loading accounts...</div>}>
          <PartnerAccountsTable accounts={accounts} />
        </Suspense>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="relative min-h-screen p-6">
        <div className="mb-4 w-full gap-4 border-b pb-2 text-lg font-semibold md:text-2xl">
          Partner Accounts
        </div>
        <div className="error-container">
          <div>Error loading accounts: {error.message}</div>
          <Link href="/">
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    );
  }
}
