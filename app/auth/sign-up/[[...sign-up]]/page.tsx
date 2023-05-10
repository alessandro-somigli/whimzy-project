import { SignUp } from "@clerk/nextjs";

import style from "@/styles/pages/auth.module.scss"

export default async function Page() {
  return (
    <main className={style.auth}>
      <SignUp />
    </main>
  );
}
