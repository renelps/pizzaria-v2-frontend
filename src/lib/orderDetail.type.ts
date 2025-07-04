export interface OrderDetailProps{
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    created_at: string;
    update_at: string;
    category_id: string;
  },
  order: {
    id: string;
    table: number;
    status: Boolean;
    draft: boolean;
    name: string | null;
    created_at: string;
    update_at: string;
  }

}