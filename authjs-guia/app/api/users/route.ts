import { db as prisma } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server"
import bcypt from "bcrypt"

export async function POST(request: NextRequest){

  const data = await request.json()
  const { name , email, password} = data 
  console.log("Route Handler",data)

  if(!name || !email || !password){
    return NextResponse.json("dados invalidos")
  }

  const usuariojaExiste = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if(usuariojaExiste){
    return NextResponse.json("E-mail ja existente")
  }
  
  const hashedPassword = await bcypt.hash(password, 10)

  const user = await prisma.user.create({
    data:{
      name,
      email,
      hashedPassword,
    }
  })

  return NextResponse.json("usuario cadastrado")
   
}