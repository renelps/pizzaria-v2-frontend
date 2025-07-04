import { api } from "@/services/api";
import { Button } from "../components/button";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category(){

  async function handleRegisterCategory(formData: FormData){
    "use server"

    const name = formData.get("name");

    if(!name) return;

    const data = {
      name: name,
    }

    const token = await getCookieServer();

    await api.post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((err) => {
      console.log(err)
      return
    })
  
    redirect("/dashboard")
  }


  return (
    <main className="flex items-center justify-center flex-col mt-10">
      <h2 className="text-2xl font-bold pb-5">Nova Categoria</h2>
      <form 
        action={handleRegisterCategory}
        className="flex items-center max-w-4xl w-full gap-2 px-5"
      >

        <input 
          type="text"
          name="name"
          placeholder="Qual é a o nome da categoria, ex: Pizza de Calabresa..."
          required
          className="w-full outline-none border-1 border-slate-300 py-3 px-2 rounded-sm"  
        />
        <Button name="cadastrar" className="w-[20%]" />
      </form>
    </main>
  )
}