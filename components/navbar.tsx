import Image from "next/image"

import style from "@/styles/components/navbar.module.scss"
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {

  return (
    <nav>
      <div className={style.logo}>
        <Image src="" alt="logo image" 
          width={64} height={64} 
          className={style.logo_image}/>
        <span className={style.logo_text}>Whimzy</span>
      </div>

      <div className={style.user}>
        <UserButton />
      </div>
    </nav>
  )
}
