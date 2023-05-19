"use client";

import { post } from "@/database/schema";
import Post from "./post";
import useSWR from "swr";

type ReactivePostProps = {
  postId: number
}

export default function RectivePost(props: ReactivePostProps) {
  const { data, error, isLoading } = useSWR(
    `/api/posts/${props.postId}`, 
    (...args) => fetch(...args).then(res => res.json()) );
  

  return (
    <div>
      { isLoading? <div>loading...</div> : 
        error? <div>error: {JSON.stringify(error)}</div> :
        <Post post={data} /> }
    </div>
  );  
}