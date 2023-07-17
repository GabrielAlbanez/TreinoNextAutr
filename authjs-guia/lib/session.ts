import {getServerSession} from "next-auth"

import { authOptions } from "@/lib/auth"

//vamos pegar o valor da sessao por um componente react-server-components
//por isso vamos precisar do authoption ou seja o arquivo de config do nextAuth
//e como o componente é voltado para o servidor tem que ser utilzado um function async

export async function dataUser(){
  const sessaoUser = await getServerSession(authOptions)
  // aq a gente ta pegando a session la pelo o arquivo authOption onde tem toda a config de auth que tem
  
  return sessaoUser?.user
  //a estrategia de jtw da session e atraves desse token pegamos os valores que são retornados pela auth
}


