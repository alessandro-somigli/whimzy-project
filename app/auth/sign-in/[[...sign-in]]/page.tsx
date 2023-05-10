import { SignIn } from "@clerk/nextjs";

import style from "@/styles/pages/auth.module.scss"

export default async function SignInPage() {
  return (
    <main className={style.auth}>
      <SignIn />
    </main>
  );
}
