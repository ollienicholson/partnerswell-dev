// /app/api/partner-accounts/route.ts
import { NextResponse } from "next/server";
import { server_api } from "~/trpc/server";

export async function GET() {
  try {
    const accounts = await server_api.partnerAccountRouter.getAll();
    const partnerAccounts = accounts.map((account: any) => ({
      accountName: account.accountName,
    }));
    return NextResponse.json(partnerAccounts);
  } catch (error: any) {
    console.error("Error fetching partner accounts:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch partner accounts" },
      { status: 500 },
    );
  }
}
