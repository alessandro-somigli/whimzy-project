"use client";

import Link from "next/link";
import style from "@/styles/components/navbar.module.scss"
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function NavLinks() {
  const { user } = useUser();
  const path = usePathname();

  return (
    <>
      <Link href={"/feed"} className={`${style.hover_effect} ${style.tag}
        ${path.includes("/feed")?style.active:null}`}
        >&nbsp;feed</Link>
      {user? (<Link href={"/friends"} className={`${style.hover_effect} ${style.tag}
        ${path.includes("/friends")?style.active:null}`}
        >&nbsp;friends</Link>) : (<></>)}
      {user ? (<Link href={`/users/${user.id}`} className={`${style.hover_effect} ${style.tag}
        ${path.includes("/users")?style.active:null}`}
        >&nbsp;me</Link>) : (<></>)}
    </>
  );
}
