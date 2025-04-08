import OrderList from "@/components/order/OrderList";

export default function AdminOrder() {
  return (
    <div>
      <OrderList isAdmin={true} />
    </div>
  );
}
