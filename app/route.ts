import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.redirect(new URL("/feed", request.url));
}
