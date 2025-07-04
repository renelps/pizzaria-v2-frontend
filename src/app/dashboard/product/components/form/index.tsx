"use client"

import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import Image from "next/image";
import { ChangeEvent, useState } from "react"
import { FaUpload } from "react-icons/fa"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: string;
  name: string
}

interface Props{
  categories: CategoryProps[];
} 

export function ProductForm({ categories }: Props){
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("")
  const router = useRouter();

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Esse formato de imagem não é permitido!")
        return;
      }


      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  async function handleRegisterProduct(formData: FormData){

    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");


    if(!categoryIndex || !name || !price || !description || !image) {
      toast.warning("Todos os campos são obrigatorios!!")
      return;
    }

    const token = await getCookieClient();

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id)
    data.append("file", image)

    await api.post("product", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch((err) => {
      toast.warning("Algo deu errado ao cadastrar");
      return;
    })

    toast.success("Produto cadastrado com sucesso!!");
    router.push("/dashboard");
  } 

  return (
    <main className="flex items-center justify-center mt-7">
      <div className="max-w-3xl w-full px-3">
        <h1 className="font-bold text-2xl py-3">Novo Produto</h1>

        <form className="w-full flex flex-col gap-3" action={handleRegisterProduct}>
          <div className="relative h-72 border border-slate-500 bg-[var(--dark-900)] flex flex-col items-center justify-center">
            <label htmlFor="fileInput" className="cursor-pointer z-10 text-white flex flex-col items-center gap-2">
              <FaUpload size={24} />
              <span>Escolher imagem</span>
            </label>

            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
              required
              className="hidden"
            />

            {previewImage && (
              <Image 
                src={previewImage}
                alt="preview"
                fill
                quality={100}
                priority
                className="object-cover"
              />
            )}
          </div>
          <select name="category" className="bg-[var(--dark-900)] p-2 outline-0 border border-slate-500 mt-5">
            {categories && categories.map((category, index) => (
              <option key={category.id} value={index}>
                {category.name}
              </option>
            ))}
          </select>

          <input 
            type="text" 
            name="name"
            required
            placeholder="Nome do Produto..."
            className="p-2 bg-[var(--dark-900)] border-1 border-slate-500"
          />

          <input 
            type="text" 
            name="price"
            required
            placeholder="Preço do Produto..."
            className="p-2 bg-[var(--dark-900)] border-1 border-slate-500"
          />

          <textarea 
            name="description"
            required
            placeholder="Descrição do produto..."
            className="border-1 resize-none border-slate-500 bg-[var(--dark-900)] p-2 outline-0 h-30"
            
          >
          </textarea>

          <Button name="Adicionar Produto" className="w-[100%]" />
        </form>
      </div>
    </main>
  )
}