import { OrderDetailProps } from "@/lib/orderDetail.type";

export function calculateTotalOrder(orders: OrderDetailProps[]){
  return orders.reduce((total, item) => {
    const itemTotal = parseFloat(item.product.price) * item.amount

    return total + itemTotal;
  }, 0)

}