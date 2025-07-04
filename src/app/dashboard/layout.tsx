import OrderModalProvider from "@/context";
import { Header } from "./components/header";


export default function DashboardLayout({ children }: { children: React.ReactNode }){
  

  return (
    <>
      <OrderModalProvider>
        <Header />
        {children}
      </OrderModalProvider>
    </>
  )
}