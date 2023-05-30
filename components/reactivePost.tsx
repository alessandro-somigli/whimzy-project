"use client";

import Post from "@/components/post";
import useSWR from "swr";
import { post } from "@/database/schema";
import { useUser } from "@clerk/nextjs";
import Spinner from "@/components/spinner";

type ReactivePostProps = {
  postId: number
}

export default function RectivePost(props: ReactivePostProps) {
  const { user } = useUser();

  const { data, error, isLoading } = useSWR(
    `/api/posts/${props.postId}`, 
    async (...args) => fetch(...args).then(res => res.json()), 
    { refreshInterval: 20000 });

  const post = data as post;

  return (
    <>
      { isLoading? <Spinner /> : 
        error? <div>error: {JSON.stringify(error)}</div> :
        <div>
          <Post post={post} />
          {post.contributions?.find(row => row.cont_user === user?.id)? 
            <></> : 
            <div>
              <button>post</button>
              <input type="text" />
            </div>}
        </div> }
    </>
  );  
}
