import { followRow } from "@/database/schema";
import { connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export type getFollowedRow = followRow;
export type getFollowedResponse = Array<getFollowedRow>;

export async function POST(request: NextRequest, response: NextResponse) {
  const filter = (await request.json()).filter as { follower: string };
  
  const planetscale = connect(config);

  const followed = (await planetscale.execute(`
  SELECT * FROM Follow
  WHERE Follow.followers = ${filter.follower};
  `)).rows as getFollowedResponse

  return NextResponse.json(followed);
}
