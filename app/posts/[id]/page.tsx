import { getPostsResponse } from "@/app/api/posts/route";
import ReactivePost from "@/components/reactivePost";
import { contributionRow } from "@/database/schema";
import { post } from "@/database/schema";
import { connect } from "@planetscale/database";

export const runtime = "edge";

export default async function Page({ params }: { params: { id: number } }) {
  
  return (
    <main>
      <ReactivePost postId={params.id} />
    </main>
  );
}