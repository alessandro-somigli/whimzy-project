"use client";

import { post } from "@/database/schema";
import { useEffect, useRef } from "react";
import Post from "@/components/post";

type ScrollPostProps = {
  post: post,
  last: boolean,
  onIntersect: () => void
}

export default function ScrollPost(props: ScrollPostProps) {
  const postRef = useRef(null)

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
      <Post post={props.post} />
    </div>
  );
}