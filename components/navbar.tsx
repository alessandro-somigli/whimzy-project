import Image from "next/image"

import style from "@/styles/components/navbar.module.scss"
import { SignedOut, UserButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs";
import NavLinks from "./navLinks";

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

      <div className={style.links}>
        <NavLinks />
      </div>

      <div className={style.dropdown}>
        <input id="textinput" type="checkbox" name="menu" className={style.dropdown_input} />
        <label htmlFor="textinput" className={`${style.tag} ${style.dropdown_label} ${style.hover_effect}`}>&nbsp;Menu</label>
        <div className={style.menu}>
          <NavLinks />
        </div>
      </div>

      <div className={style.user}>
        <UserButton />

        <SignedOut>
          <SignInButton><button className={style.signin_button}>sign in</button></SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}
