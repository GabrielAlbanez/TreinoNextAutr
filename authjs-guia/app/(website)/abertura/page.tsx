
import Footer from "@/components/footer-abertura";
import Main from "@/components/main-abertura";
import Navbar from "@/components/navbar-header";
import { dataUser } from "@/lib/session";


export default async function Abertura() {
 
  const user = await dataUser() 

  return (
   <div className="h-full w-full">
    {/* <h1>inf : {JSON.stringify(user)}</h1> */}
     
     <Navbar/>
    <Main/>
    <Footer/>
   </div>
  )
}