"use client";

import dynamic from "next/dynamic";

const PaymentSuccess = dynamic(
  () => import("@/components/lotties/PaymentSuccess"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PaymentSuccess />;
}
