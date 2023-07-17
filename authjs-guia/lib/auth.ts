// esse arquivo vai ficar resposnavel de definir quais credentials do input que vai ser passada para o authjs
//esse arquivo ele fai configura o a atenticação e passar essa cofig la para o nextauth no arquivo routes

import {NextAuthOptions} from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import GoogleProvider from "next-auth/providers/google";
import { db as prisma } from "@/lib/db"
import bcrypt from "bcrypt"


export const authOptions : NextAuthOptions = {
  // essa  variavel db vai ficar resposnavel em guardar a conexao do mogdb com prisma para se conectar com o nextauth
  adapter: PrismaAdapter(db) as any,
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID!,
      clientSecret: process.env.GOOGLE_CLIENTSECRET!
    }),
    //esse credentialProvider sera encarregado de capitura as inf do nosso formulario
    //agora o provedor do google ja tem essa logica de baixo pronta
    CredentialProvider({
      name:"credentials",
      credentials:{
        perfil : {label:"Perfil",type:"file",placeholder:"insira uma foto de perfil"},
        email:{ label:"Email",type:"text",placeholder:"digite seu nome" },
        password:{abel:"Password",type:"Password"},
        username:{label:"Name",type:"text",placeholder:"isira um nickname"},
      },

      //essa function asyn server para fazer uma autorização que quando chamar essa function ela vai pegar os credentials vai fazer um req e vai devolvar algo em foram de promisse aq abaixo esta retornanado a variavel user
      async authorize(credentials,req) : Promise<any>{
        console.log("metodo de autiorização ativado",credentials)

        //esse if é para verificar se tem dados nas credentials do input para quando o usuario for
        //fazer login
      
         if(!credentials?.email || !credentials.password){
          throw new Error("dados de login invalidos")
         }

           //esse const user é para fazer a verificação se o email digitado nas credencials que
           //ta sendo pego pelo o form bate com a do banco
         
         const user = await prisma.user.findUnique({
          where : {
            email : credentials.email
          }
         })
  
       //vai fazer a validção do email de acordo com a constante user e o haspassword aq 
       //é para valdar se ele tem password ou n ou seja se ele logo por credentials ou por outros
       //provedores que n usa hashed password


         if(!user || !user.hashedPassword) throw new Error("Usuario nao registrado")
         

         //se ele passo por esse que dizer que ele tem um hashedpassword e ai sim precisa bater com o do banco
         
         //essa função do bcrypt vai fazer a comparação entre a senha das credentias e a senha salva no banco
         //pode ver que credentials.password e da credentias e user eli é a table user do banco com o campo
         //hashed password

         const verificarPassword = await bcrypt.compare(credentials.password,user.hashedPassword)
           
         if(!verificarPassword) throw new Error("Senha ivalida")

         return user
      }
    })
    
  ],
  session:{
    strategy:"jwt"
  },
  //essa strategia de token vai gerenciar a sessao de autenticaçao do usuario atraves de um token


  secret:process.env.SECRET,

  //esse secret é usado para definir uma chave secreta(secret key) necessaria para fazer a validação dos tokens da sessão e essa chave secreta é definida no arquivo .env

  debug : process.env.NODE_ENV == "development",
  //a propriedade debug é definida com base no valor da variável de ambiente NODE_ENV. Se NODE_ENV for igual a "development", o modo de depuração será ativado (debug será true). Caso contrário, o modo de depuração será desativado (debug será false).

  //Quando o modo de depuração está ativado, o NextAuth pode fornecer informações detalhadas sobre o processo de autenticação e autorização, exibindo mensagens de log e informações de depuração no console.

  //Ter o modo de depuração ativado pode ser útil durante o desenvolvimento da aplicação, pois fornece informações detalhadas para ajudar a identificar e corrigir possíveis problemas relacionados à autenticação.
  pages : {
    signIn : "/login"
  }

}


