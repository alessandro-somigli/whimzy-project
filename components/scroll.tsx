"use client";

import { getPostsResponse } from "@/app/api/posts/route";
import { post } from "@/database/schema";
import { useEffect, useState } from "react";
import Post from "./post";

const getPosts = async (endpoint: string, discriminant: number[]) => {
  const response = await fetch(endpoint, {
    body: JSON.stringify({ discriminant: discriminant }),
    method: 'POST'
  });
  const json = await response.json();
  return parseResponse(json);
}

const parseResponse = (response: getPostsResponse): Array<post> => {
  const posts = [] as Array<post>;
  response.forEach(row => {
    const post = posts.find((post) => post.post_id === row.post_id);
    const contribution = {
      cont_text: row.cont_text,
      cont_publish_date: row.cont_publish_date,
      cont_post: row.cont_post,
      cont_user: row.cont_user,
    };

    if (post) post.contributions.push(contribution);
    else posts.push({
        post_title: row.post_title,
        post_text: row.post_text,
        post_publish_date: row.post_publish_date,
        post_id: row.post_id,
        post_user: row.post_user,
        contributions: [contribution],
    });
  });

  return posts;
};

export default function Scroll() {
  const [posts, setPosts] = useState([] as Array<post>);

  const scroll = () => {
    const postsId = posts.map(post => post.post_id);

    getPosts("/api/posts", postsId).then(posts => {
      if (posts.length) setPosts(prev => [...prev, ...posts]); 
      else console.log("empty")
    });
  }

  useEffect(() => scroll(), []);

  return (
    <div>
      {posts.map((post, index) =>
        <Post key={post.post_id} 
          post={post} onIntersect={() => scroll()}
          last={index === posts.length - 1} />)}
    </div>
  );
}
