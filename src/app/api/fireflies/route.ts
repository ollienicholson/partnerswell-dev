import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { api_key } = await req.json();
  console.log("api>fireflies>route.ts");

  try {
    const response = await fetch("https://api.fireflies.ai/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Users {
            users {
                user_id
                email
                name
            }
          }`,
      }),
    });
    if (response.ok) {
      // store API key securely in session or db
      // e.g. safeApikey(api_key)
      return NextResponse.json(
        { message: "API key is valid ! !" },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ message: "Invalid API key" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// Handling GET and PUT requests:
// export async function GET(req: NextRequest) {
//   return NextResponse.json({ message: "This is a GET request" }, { status: 200 });
// }

// export async function PUT(req: NextRequest) {
//   return NextResponse.json({ message: "This is a PUT request" }, { status: 200 });
// }

// etc etc
