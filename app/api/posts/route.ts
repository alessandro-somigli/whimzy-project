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

export async function POST(request: NextRequest, context: { params: {} }) {
  const filter = (await request.json()).filter as { 
    users?: string[],
    posts?: number[],
    date?: number
  };

  const dateFilter = filter.date !== -1? 
    ` Posts.post_publish_date > (NOW() - INTERVAL ${filter.date? filter.date : 1} DAY) ` : "";

  const usersFilter = filter.users? 
    ` ${dateFilter? "AND" : ""} Posts.post_user IN (
    ${filter.users.length? 
      `${filter.users.map(u => `"${u}"`)} `:
      "NULL" }) ` : "";
  
  const postsFilter = filter.posts?.length? 
    ` ${usersFilter || dateFilter? "AND" : ""} Posts.post_id NOT IN (${filter.posts}) ` : "";

  const planetscale = connect(config);

  console.log(`
  SELECT * FROM (
    SELECT DISTINCT * FROM Posts WHERE 
    ${dateFilter} ${usersFilter} ${postsFilter}
    ORDER BY RAND() LIMIT 20
  ) AS Posts
  LEFT JOIN Contributions ON Posts.post_id = Contributions.cont_post
  ORDER BY Posts.post_publish_date, Contributions.cont_publish_date;  
  `)

  // select 20 new posts and all its contributions
  const posts = (await planetscale.execute(`
  SELECT * FROM (
    SELECT DISTINCT * FROM Posts ${dateFilter||postsFilter||usersFilter? "WHERE" : ""}
    ${dateFilter} ${usersFilter} ${postsFilter}
    ORDER BY RAND() LIMIT 20
  ) AS Posts
  LEFT JOIN Contributions ON Posts.post_id = Contributions.cont_post
  ORDER BY Posts.post_publish_date, Contributions.cont_publish_date;  
  `)).rows as getPostsResponse;

  return NextResponse.json(posts);
}
