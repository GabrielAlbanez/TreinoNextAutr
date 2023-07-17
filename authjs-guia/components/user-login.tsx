"use client"

import { cn } from "@/lib/utils";
import {useState} from "react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
import {signIn} from "next-auth/react"
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {useRouter} from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }
//fazemos isso para poder passar a classname de umad div como props e para isso 
//tem que tipar  desse jeito

interface dataInput{
  email : string;
  password : string;
}


export default function LoginForm({className,...props}: UserAuthFormProps) {

 const [data,setData] = useState<dataInput>({
  email : "",
  password : ""
 })

 const { toast } = useToast()

 const rotas = useRouter()

 const [emCarregamento,setemCarregamento] = useState<boolean>(false)

 async function handlleSubmit(evento : React.SyntheticEvent){
  evento.preventDefault()
  setemCarregamento(true)
  setData({
    email : "",
    password : ""
  })


  // setTimeout(()=>{
  //   setemCarregamento(false)
  // },500)

  const res = await signIn<"credentials">("credentials",{
    ...data, //dados do user
    redirect: false,
  })
  
  if(res?.error){
    toast({
      title : "Opsss",
      description : res.error,
      variant : "destructive",
      action : (
        <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
      )
    })
    setemCarregamento(false)
  }else{
    setemCarregamento(false)
   rotas.push("/home")
  }

   
 }

 const handleChange = (evento : React.ChangeEvent<HTMLInputElement>) =>{
    setData((valueInserido)=>{
      return{
        ...valueInserido, [evento.target.name]:evento.target.value,
        //isso server para ele ja targeta o valor  de acordo com o name do input
        //tipo se for name email vai targeta para data.email e vice versa
      }
    })
 }

 

  return (
    //nessa div usamos o taiwind murg porque essa mesam div pode receber o classname como props ai usamos esse tipo de taiwind para diferenciar

    //ai esse clansname a gente pode customizar pepla a props do componente pai
    <div className={cn("grid gap-6",className)} {...props}>
      <form onSubmit={handlleSubmit}>
            <div className="grid gap-10">
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
                  <div className = "mr-2 h-4 w-4 animate spin">...</div>
                )}
                {!emCarregamento && (
                  <p>Entrar</p>
                )}
                
              </Button>
            </div>
      </form>
    </div>
  )
}
