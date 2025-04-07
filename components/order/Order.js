"use client";
import { useSearchParams } from "next/navigation";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";

export default function Order() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const orderEmail = searchParams.get("email");

  const renderDisplay = () => {
    if (orderId) {
      return <OrderList isEmail={false} orderId={orderId} />;
    } else if (orderEmail) {
      return <OrderList isEmail={true} orderEmail={orderEmail} />;
    }
    return <OrderForm />;
  };

  return <>{renderDisplay()}</>;
}
