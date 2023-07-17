"use client"
import AuthButton from "@/components/auth-button"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { dataUser } from "@/lib/session"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import akaliIcon from "@/assets/imgs/aklai.png"
import Image from "next/image"

export default function Home() {

  const rotas = useRouter()
  const session = useSession()

  
  const { toast } = useToast()
  

  return (
    <>
    {!session?.data ? (
      <div className="flex flex-col items-center justify-evenly h-screen px-36">
        <div >
      <ToastAction altText="fazer Login" className="  bg-rose-600 hover:bg-rose-600"><p className="text-zinc-50">vc precisa estar logado para acessar o conteudo desta pagina</p></ToastAction>
      </div>
      <div>
        <Image alt="akaliIcon" height={200} width={300} src={akaliIcon}/>
      </div>
      <div className="flex gap-20">
      <Button onClick={()=>rotas.push("/login")} className="bg-rose-500">Fazer Login</Button>
      <Button onClick={()=>rotas.push("/register")} className="bg-rose-500">Fazer Registro</Button>
      </div>
      </div>
    ) : (
      <div className='m-12'>
      <h1>Seja Bem vinda: {(session.data.user?.name)}</h1>
      <AuthButton page="home"/>
    </div>
    ) }
   </>
  )
}