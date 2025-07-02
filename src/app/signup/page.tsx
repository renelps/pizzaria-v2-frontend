import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup(){

  async function handleRegister(formData: FormData){
    "use server"

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if(name === "" || email === "" || password === "") return;


    try {
      await api.post("/users", {
        name,
        email,
        password
      })

    }catch(err){
      console.log(err)
      return;
    }

    redirect("/")
  }



  return (
    <main className="flex items-center justify-center h-screen">
      <div
        className="w-full max-w-xl pb-20 px-10 md:px-18 flex items-center flex-col rounded-xl shadow-none md:shadow-[0_6px_25px_rgba(111,78,55,0.5)]">
        <div>
          <Image
            src={logo}
            alt="logo"
            quality={100}
            priority={true}
            width={350}
            height={350}
          />
        </div>

        <section className="w-full">
          <form 
            action={handleRegister}
            className="flex flex-col gap-4 w-full"
          >
            <input 
              type="text" 
              name="name"
              required
              className="border-1 border-[#5D4037] py-3 px-2 rounded-sm outline-none" 
              placeholder="Digite seu Nome"
            />

            <input 
              type="email"
              name="email" 
              required
              className="border-1 border-[#5D4037] py-3 px-2 rounded-sm outline-none"
              placeholder="Digite seu Email"
            />
            <input 
              type="password" 
              name="password"
              required
              className="border-1 border-[#5D4037] py-3 px-2 rounded-sm outline-none" 
              placeholder="Digite sua Senha"
            />

            <button 
              type="submit" 
              className="mt-10 border-1 border-[#5D4037] py-3 hover:border-slate-600 duration-300"
            >
              Acessar
            </button>
          </form>

          <div className="text-center mt-7">
            <Link
              href="/"
              className="border-b-1 text-slate-300"
            >
              Já possui conta? click aqui!
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}