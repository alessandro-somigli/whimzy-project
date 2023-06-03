import { post } from "@/database/schema";
import style from "@/styles/components/post.module.scss";
import Image from "next/image";

type PostProps = {
  post: post
}
  
export default function ScrollPost(props: PostProps) {

  return (
    <div className={style.post}>
      <Image src={props.post.user_image} alt="img" width={64} height={64}/>
      <span className={style.author}>@{props.post.username}</span> <br />
      <span className={style.title}>{props.post.post_title}</span> <br />

      <span>{props.post.post_text}</span>
      {props.post.contributions.map(contribution => 
        <span key={contribution.cont_user}> {contribution.cont_text}</span>)}
    </div>
  );
}