import PartnerAccountsTable from "~/app/components/PartnerAccountsTable";
import { server_api } from "src/trpc/server";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";

export default async function PartnerAccountsPage() {
  try {
    const accounts = await server_api.partnerAccountRouter.getAll();

    return (
      <>
        <PartnerAccountsTable accounts={accounts} />
      </>
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
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }
}
