"use client"

import { OrderProps } from "@/lib/order.type"
import { FiRefreshCw } from "react-icons/fi"
import { ModalOrder } from "../../components/modal";
import { useContext, useState } from "react";
import { OrderModalContext } from "@/context";
import { useRouter } from "next/navigation";
interface Props {
  orders: OrderProps[];
}

export function Orders({ orders }: Props){
  const { isOpen, onRequestOpen } = useContext(OrderModalContext)
  const router = useRouter();
  async function handleDetailOrder(order_id: string){
    await onRequestOpen(order_id);
  }

  function handleReflesh(){ 
    router.refresh();
  }

  return (
    <>
      <main className="flex items-center justify-center">
        <div className="max-w-4xl w-full mt-20">
          <section className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ultimos Pedidos</h1>
            <button className="pr-3" onClick={handleReflesh}>
              <FiRefreshCw size={24} color="#fff"/>
            </button>
          </section>
          <section className="w-full flex flex-col mt-2 rounded-md gap-2">
          {orders.length === 0 && (
            <span className="text-center py-2">Não tem pedido em aberto</span>
          )}

          {orders && orders.map((item) => (
            <button onClick={ () => handleDetailOrder(item.id)} key={item.id} className="flex border border-slate-500 py-3 px-2 rounded-md bg-[var(--dark-900)] hover:brightness-150 transition-all duration-75">
              <span>Mesa: {item.table}</span>
            </button>
          ))}
          </section>
        </div>
      </main>

      {isOpen && <ModalOrder />}
    </>
  )
}