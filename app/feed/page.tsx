import style from "@/styles/pages/feed.module.scss"
import Scroll from "@/components/scroll";
import { auth } from "@clerk/nextjs";

export default async function Page() {
  const { user, userId } = auth();

  return (
    <main className={style.feed}>
      <Scroll />

      {userId? <button>+</button> : null}   
    </main>
  );
}
