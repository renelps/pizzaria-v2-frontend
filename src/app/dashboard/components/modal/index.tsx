"use client"

import { OrderModalContext } from "@/context";
import { calculateTotalOrder } from "@/utils/helper";
import { useContext } from "react";
import { FiX } from "react-icons/fi";

export function ModalOrder() {

  const { onRequestClose, order, finishOrder } = useContext(OrderModalContext)

  
  async function handleFinishOrder(){
    await finishOrder(order[0].order.id)
  }

  return (
    <div className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-white">
        
        <button onClick={onRequestClose} className="absolute top-4 right-4 text-white/80 hover:text-red-500 transition">
          <FiX size={28} />
        </button>

        <h2 className="text-3xl font-extrabold mb-6">Detalhes do Pedido</h2>

        <p className="text-lg mb-6">
          <span className="text-white/70">Mesa:</span>{" "}
          <span className="font-bold pr-3">{order[0].order.table}</span>
          {order[0].order?.name !== null && (
           <>
            <span className="text-white/70">Nome do client</span>{" "}
            <span className="font-bold">{order[0].order.name}</span>
           </>
          )}
        </p>

        <div className="space-y-4 mb-8 max-h-72 overflow-y-auto pr-1 custom-scroll">
          {order.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-inner">
              <span className="block font-medium text-lg">
                {item.amount}x {item.product.name} - R$ {parseFloat(item.product.price) * item.amount}
              </span>
              <span className="text-sm text-white/70">
                {item.product.description}
              </span>
            </div>
          ))}
        </div>

        <p className="py-2">Valor total: R$ {calculateTotalOrder(order)}</p>

        <button 
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-3 rounded-xl shadow-lg transition hover:shadow-green-500/40"
          onClick={handleFinishOrder}
        >
          Concluir Pedido
        </button>
      </div>
    </div>
  );
}