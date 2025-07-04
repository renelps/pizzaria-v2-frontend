import { getCookieServer } from "@/lib/cookieServer";
import { ProductForm } from "./components/form";
import { api } from "@/services/api";


export default async function Product(){

  const token = await getCookieServer();

  const response = await api.get("/category", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <>
      <ProductForm categories={response.data} />
    </>
  )
}