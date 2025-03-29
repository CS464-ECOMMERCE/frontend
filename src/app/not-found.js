"use client";

import dynamic from "next/dynamic";

const Lottie404 = dynamic(() => import("@/components/Lottie404"), {
  ssr: false,
});

export default function NotFound() {
  return <Lottie404 />;
}
