"use client";

import { getPostsResponse } from "@/app/api/posts/route";
import { post } from "@/database/schema";
import { useEffect, useState } from "react";
import ScrollPost from "@/components/scrollPost";
import style from "@/styles/components/scroll.module.scss";
import Spinner from "@/components/spinner";

const getPosts = async (filter: { posts: number[], users?: string[], date: number|undefined }) => {
  const response = await fetch("/api/posts", {
    body: JSON.stringify({ filter }),
    method: 'POST'
  });
  const json = await response.json() as getPostsResponse;
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
        user_image: row.user_image,
        username: row.username
    });
  });

  return posts;
};

type ScrollProps = {
  users?: string[],
  date?: boolean
}

export default function Scroll(props: ScrollProps) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([] as Array<post>);
  const [empty, setEmpty] = useState(false);

  const scroll = () => {
    const postsId = posts.map(post => post.post_id);

    getPosts({
      posts: postsId, 
      users: props.users,
      date: props.date? undefined : -1
    }).then(posts => {
      setLoading(false);

      if (posts.length) setPosts(prev => [...prev, ...posts]);
        else setEmpty(true);
      
    });
  }

  useEffect(() => scroll(), []);

  return (
    <section className={style.scroll}>
      {loading? <Spinner /> : 
      posts.map((post, index) =>
        <ScrollPost key={post.post_id}
          post={post} onIntersect={() => scroll()}
          last={index === posts.length - 1} />)}

      {empty? <span>no more posts to view!</span>:null}
    </section>
  );
}
