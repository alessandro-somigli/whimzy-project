"use client";

import { post } from "@/database/schema";
import { useEffect, useRef } from "react";

type PostProps = {
  post: post,
  last: boolean,
  onIntersect: () => void
}

export default function Post(props: PostProps) {
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
      <span>{props.post.post_title}</span>  <br />
      <span>by: {props.post.post_user}</span>  <br />

      <span>{props.post.post_text}</span>
      {props.post.contributions.map(conttribution => 
        <span key={conttribution.cont_user}> {conttribution.cont_text}</span>)}
    </div>
  );
}