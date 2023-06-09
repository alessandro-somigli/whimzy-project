import { connect } from "@planetscale/database";
import { NextRequest, NextResponse } from "next/server";
import { getPostsResponse } from "@/app/api/posts/route";
import { contributionRow } from "@/database/schema";
import { post } from "@/database/schema";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/dist/server/getAuth";

export const runtime = "edge";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

const parseResponse = async (response: getPostsResponse): Promise<post> => {
  console.log(response[0].post_user);
  let user = undefined
  try {
    user = await clerkClient.users.getUser(response[0].post_user);
  } catch {}

  const post = {
    post_title: response[0].post_title,
    post_text: response[0].post_text,
    post_publish_date: response[0].post_publish_date,
    post_id: response[0].post_id,
    post_user: response[0].post_user,
    contributions: [] as contributionRow[],
    user_image: user?.profileImageUrl, 
    username: `${user?.firstName} ${user?.lastName}`,
  }
  
  response.forEach(row => {
    post.contributions.push({
      cont_text: row.cont_text,
      cont_publish_date: row.cont_publish_date,
      cont_post: row.cont_post,
      cont_user: row.cont_user,
    });
  });

  return post;
}

export async function GET(request: NextRequest, context: { params: { id: number } } ) {
  const planetscale = connect(config);

  const response = (await planetscale.execute(`
  SELECT * FROM Posts 
  LEFT JOIN Contributions ON Posts.post_id = Contributions.cont_post
  WHERE Posts.post_id = ${context.params.id}
  ORDER BY Contributions.cont_publish_date ASC;
  `)).rows as getPostsResponse;

  return response.length? 
    NextResponse.json(await parseResponse(response)) : 
    NextResponse.json({ error: "NO_POST_ID" });
}

export async function POST(request: NextRequest, context: { params: { id: number } } ) {
  const contribution = (await request.json()).contribution as string;
  const { userId } = getAuth(request);
  const planetscale = connect(config);

  planetscale.execute(`
  INSERT INTO Contributions (cont_post, cont_user, cont_text, cont_publish_date) VALUES (
    ${context.params.id},
    '${userId}',
    '${contribution}',
    NOW()
  );
  `)

  return NextResponse.json({ msg: "hello world!" })
}