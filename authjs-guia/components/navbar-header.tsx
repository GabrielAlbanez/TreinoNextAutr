"use client"

import logo from "@/assets/imgs/lolLogo.jpg"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import AuthButton from "./auth-button"

export default function Navbar(){
  const rotas = useRouter()
  const session = useSession()
  return(
    <header className="w-full h-full bg-white flex items-center justify-between px-14 p-10">
      <figure><Image src={logo} height={80} width={80} alt="logo lOl" className="rounded-sm"/></figure>
      <div><p className="text-2xl font-bold">sobre o jogo</p></div>
      <div><p className="text-2xl font-bold">pacht</p></div>
      <div className="flex items-center gap-7">
        {!session.data ? (
          <>
          <div><Button className="bg-rose-500 w-40" onClick={()=>rotas.push("/login")}><p>Logar</p></Button></div>
          <div><Button className="bg-rose-500 w-40" onClick={()=>rotas.push("/register")}><p>Registrar</p></Button></div>
        </>
        ) : (
          <>
            <AuthButton page="/abertura"/>
          </>
        )}
        
      </div>
    </header>
  )
}