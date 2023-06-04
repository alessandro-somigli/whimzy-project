"use client";

import Post from "@/components/post";
import useSWR from "swr";
import { post } from "@/database/schema";
import { useUser } from "@clerk/nextjs";
import Spinner from "@/components/spinner";
import { ChangeEvent, useState } from "react";

type ReactivePostProps = {
  postId: number
}

export default function RectivePost(props: ReactivePostProps) {
  const { user } = useUser();
  const [contribution, setContribution] = useState("");

  const maxChars = 50;

  const { data, error, isLoading } = useSWR(
    `/api/posts/${props.postId}`, 
    async (...args) => fetch(...args).then(res => res.json()), 
    { refreshInterval: 20000 });

  const post = data as post;

  const onSendContribution = async () => {
    const response = await fetch(`/api/posts/${props.postId}`, {
      body: JSON.stringify({ contribution }),
      method: 'POST'
    });

    const json = await response.json();
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.target.value.length <= maxChars? setContribution(evt.target.value) : null
  }

  return (
    <>
      { isLoading? <Spinner /> : 
        error? <div>error: {JSON.stringify(error)}</div> :
        <div>
          <Post post={post} />
          {post.contributions?.find(row => row.cont_user === user?.id) || post.post_user === user?.id? 
            <></> : 
            <div>
              <button onClick={() => onSendContribution()}>post</button>
              <input type="text" value={contribution} onChange={(evt) => handleInputChange(evt)} />
            </div>}
            <span>characters left: {maxChars - contribution.length}</span>
        </div> }
    </>
  );  
}
