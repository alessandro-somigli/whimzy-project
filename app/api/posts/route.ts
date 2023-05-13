import { contributionRow, postRow } from "@/database/schema";
import { connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

export type getPostsRow = postRow & contributionRow
export type getPostsResponse = Array<getPostsRow>

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json() as { discriminant: number[] };
  const planetscale = connect(config);

  // select 20 new posts and all its contributions
  const posts = (await planetscale.execute(`
  SELECT * FROM (
    SELECT DISTINCT * FROM Posts
    WHERE Posts.post_publish_date > (NOW() - INTERVAL 1 DAY)
    ${body.discriminant.length? ` AND Posts.post_id NOT IN (${body.discriminant}) ` : ""}
    ORDER BY RAND() LIMIT 20
  ) AS Posts
  LEFT JOIN Contributions ON Posts.post_id = Contributions.cont_post
  ORDER BY Posts.post_publish_date, Contributions.cont_publish_date;  
  `)).rows as getPostsResponse;

  return NextResponse.json(posts);
}
