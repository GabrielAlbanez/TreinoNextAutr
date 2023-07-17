"use client"

import { cn } from "@/lib/utils";
import { useState } from "react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {useRouter} from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
//fazemos isso para poder passar a classname de umad div como props e para isso 
//tem que tipar  desse jeito

interface dataInput {
  name: string;
  email: string;
  password: string;
}


export default function RegisterForm({ className, ...props }: UserAuthFormProps) {

  const { toast } = useToast()

  const rotas = useRouter()

  const [data, setData] = useState<dataInput>({
    name: "",
    email: "",
    password: "",
  })

  const [emCarregamento, setemCarregamento] = useState<boolean>(false)

  async function handlleSubmit(evento: React.SyntheticEvent) {
    evento.preventDefault()
    setemCarregamento(true)

    // setTimeout(() => {
    //   setemCarregamento(false)
    // }, 500);

    //para cadastrar nossos usuarios vamos ter que fazer um requisão a nossa api
    //e cair na rota users e assim vai executar um metodo post vai criar e depois devolver
    //os dados 



    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "applicaition/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    console.log("USER REGISTER FORM", response)



    if (!request.ok) {
      toast({
        title: "oppsssss...",
        variant: "destructive",
        action: (
          <ToastAction altText="tente novamente" >Tente Novamente</ToastAction>
        )



      })
    } else if(response !== "usuario cadastrado") {
      toast({
        variant: response !== "usuario cadastrado"?"destructive" : "default",
        action: (
          <ToastAction altText="Cadastro Realizado">{response}</ToastAction>
        )
      })
      setemCarregamento(false)
    } else{
      rotas.push("/login")
    }

    setData({
      name: "",
      email: "",
      password: "",
    })

  }

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setData((valueInserido) => {
      return {
        ...valueInserido, [evento.target.name]: evento.target.value,
        //isso server para ele ja targeta o valor  de acordo com o name do input
        //tipo se for name email vai targeta para data.email e vice versa
      }
    })
  }



  return (
    //nessa div usamos o taiwind murg porque essa mesam div pode receber o classname como props ai usamos esse tipo de taiwind para diferenciar

    //ai esse clansname a gente pode customizar pepla a props do componente pai
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handlleSubmit}>
        <div className="grid gap-10">

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="nome"
              type="text"
              disabled={emCarregamento}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>



          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={emCarregamento}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={emCarregamento}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={emCarregamento} className="bg-rose-500 hover:bg-rose-500">
            {emCarregamento && (
              <div className="mr-2 h-4 w-4 animate spin">...</div>
            )}
            {!emCarregamento && (
              <p>Registrar</p>
            )}

          </Button>
        </div>
      </form>
    </div>
  )
}
