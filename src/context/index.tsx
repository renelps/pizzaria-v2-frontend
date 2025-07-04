"use client"

import { OrderDetailProps } from "@/lib/orderDetail.type";
import { api } from "@/services/api";
import { createContext, ReactNode, useState } from "react";
import { getCookieClient } from "../lib/cookieClient"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OrderContextData {
  isOpen: boolean;
  order: OrderDetailProps[];
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  finishOrder: (order_id: string) => Promise<void>;
}
interface OrderProviderProps {
  children: ReactNode;
}

export const OrderModalContext = createContext({} as OrderContextData);

function OrderModalProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderDetailProps[]>([])
  const router = useRouter();

  async function onRequestOpen(order_id: string){
    console.log(order_id)
    try {
      const token = await getCookieClient();

      const response = await api.get("/order/detail", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          order_id: order_id
        }
      })
      setOrder(response.data)
      setIsOpen(true)
    }catch(err){
      console.log(err)
      return;
    }
  }

  function onRequestClose(){
    setIsOpen(false)
  }

  async function finishOrder(order_id: string){

    const token = await getCookieClient();
    const data = {
      order_id: order_id
    }
    try {

      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success("Pedido Finalizado!!!")
      setIsOpen(false)
    }catch(err) {
      console.log(err)
      toast.success("Algo deu errado ao tentar finalizar o pedido")
      return;
    }

    router.refresh()
  } 



  return (
    <OrderModalContext.Provider
      value={{
        isOpen,
        order,
        onRequestOpen,
        onRequestClose,
        finishOrder
      }}
    >
      {children}
    </OrderModalContext.Provider>
  );
}

export default OrderModalProvider;
