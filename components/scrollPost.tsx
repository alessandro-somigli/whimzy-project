"use client";

import { post } from "@/database/schema";
import { useEffect, useRef } from "react";
import Post from "@/components/post";
import { useRouter } from "next/navigation";

type ScrollPostProps = {
  post: post,
  last: boolean,
  onIntersect: () => void
}

export default function ScrollPost(props: ScrollPostProps) {
  const postRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!postRef?.current) return;
  
    const observer = new IntersectionObserver(([entry]) => {
      if (props.last && entry.isIntersecting) {
        props.onIntersect();
        observer.unobserve(entry.target);
      }
    });
  
    observer.observe(postRef.current);
  }, [props]);

  return (
    <div ref={postRef}>
      <div onClick={() => router.push(`/posts/${props.post.post_id}`)}>
        <Post post={props.post} />
      </div>
    </div>
  );
}