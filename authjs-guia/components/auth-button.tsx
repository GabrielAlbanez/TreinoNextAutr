"use client"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"


export default function AuthButton({ page }: { page: string }) {

  const { data: session, status } = useSession()

  //para conseguirmos capturar informações do lado do servidor em  comoponentes clientes usamos o rook useSession
  //mas para isso se tornar possitvel temois que criar um provedor dele envolver toda a aplicação conforme fizemos no arquivo
  //auth-provider

  const estaAutenticado = status === "authenticated"

  return (
    <>
      {!estaAutenticado ? (
        <Link href={page === "register" ? "/login" : "register"} className={cn(buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
        >
          {page === "register" ? "entrar" : "Criar Conta"}
        </Link>
      ) : (
        <Button onClick={()=> signOut({callbackUrl : "/abertura"} )} className={cn(buttonVariants({variant : "ghost"}),
        "absolute right-4 top-4 md:right-8 md:top-8"
        )}>
            Sair
        </Button>
      )}
    </>

  )

}