"use client";

import dynamic from "next/dynamic";

const PaymentFailed = dynamic(
  () => import("@/components/lotties/PaymentFailed"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PaymentFailed />;
}
