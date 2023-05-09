import Image from "next/image"

import style from "@/styles/components/navbar.module.scss"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {

  return (
    <nav className={style.navbar}>
      <div className={style.logo}>
        <Image src="/logo.svg" alt="logo image" 
          width={50} height={50} 
          priority={true} 
          className={style.logo_image}/>
        <span className={style.logo_text}>
          <span>Wh</span><br />
          <span>&nbsp;Im</span><br />
          <span>Zy</span>
        </span>
      </div>

      <div className={style.user}>
        <UserButton />
      </div>
    </nav>
  )
}
