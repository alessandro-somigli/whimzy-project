import { post } from "@/database/schema";
import style from "@/styles/components/post.module.scss";

type PostProps = {
  post: post
}
  
export default function ScrollPost(props: PostProps) {

  return (
    <div className={style.post}>
      <span className={style.author}>@{props.post.post_user}</span> <br />
      <span className={style.title}>{props.post.post_title}</span> <br />

      <span>{props.post.post_text}</span>
      {props.post.contributions.map(contribution => 
        <span key={contribution.cont_user}> {contribution.cont_text}</span>)}
    </div>
  );
}