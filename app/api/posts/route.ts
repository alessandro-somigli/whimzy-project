import { contributionRow, postRow } from "@/database/schema";
import { connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";

export const runtime = "edge";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

export type getPostsRow = postRow & contributionRow & { username: string, user_image: string }
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

  const user_ids = posts.map(post => post.post_user);
  const users_data = await clerkClient.users.getUserList({ userId: user_ids, limit: 20 });

  const response = posts.map((post) => { 
    const user = users_data.find(user => post.post_user === user.id);

    return { 
      ...post, 
      user_image: user?.profileImageUrl, 
      username: `${user?.firstName} ${user?.lastName}` }
  })

  return NextResponse.json(response);
}
