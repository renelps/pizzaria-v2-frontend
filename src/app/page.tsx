import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home(){

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === "") return;

    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token) return;

      console.log(response)

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookiesStore = await cookies();

      cookiesStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"

      })
    }
    catch(err){
      console.log(err)
      return;
    }

    redirect("/dashboard")
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div
        className="w-full max-w-xl pb-20 px-10 bg-[var(--dark-900)] md:px-18 md:border border-slate-400 flex items-center flex-col rounded-xl">
        <div className="mb-30">
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
            action={handleLogin}  
            className="flex flex-col gap-4 w-full">
            <input 
              type="email"
              name="email" 
              required
              className="border-1 border-slate-400 py-3 px-2 rounded-sm outline-none"
              placeholder="Digite seu email"
            />
            <input 
              type="password" 
              name="password"
              required
              className="border-1 border-slate-400 py-3 px-2 rounded-sm outline-none" 
              placeholder="Digite sua senha"
            />

            <button 
              type="submit" 
              className="mt-10 border border-slate-400 py-3 hover:border-slate-600 duration-300 rounded-md"
            >
              Acessar
            </button>
          </form>

          <div className="text-center mt-7">
            <Link
              href="/signup"
              className="border-b-1 text-slate-300"
            >
              Não tem conta? Crie a sua agora mesmo!
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}