import style from "@/styles/pages/feed.module.scss"
import Scroll from "@/components/scroll";

export default async function Page() {

  return (
    <main className={style.feed}>
      <Scroll /> 
    </main>
  );
}
