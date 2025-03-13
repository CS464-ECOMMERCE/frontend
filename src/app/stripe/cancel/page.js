"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <section id="cancel">
      <p>Your payment was canceled. If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.</p>
      <button onClick={() => router.push("/")}>Go to Home</button>
    </section>
  );
}