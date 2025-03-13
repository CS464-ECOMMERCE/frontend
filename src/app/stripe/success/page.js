"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchSessionStatus = async () => {
    const sessionId = searchParams.get("session_id");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE}/api/v1/retrieve-session?session_id=${sessionId}`
    );
    const data = await res.json();
    setCustomerEmail(data.customer_email);
  };

  useEffect(() => {
    fetchSessionStatus();
    setLoading(false);
  }, []);

  if (!loading && !customerEmail) {
    return <>Unable to process</>;
  }

  return (
    <section id="success">
      <p>
        We appreciate your business! A confirmation email will be sent to{" "}
        {customerEmail}. If you have any questions, please email{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
      <button onClick={() => router.push("/")}>Go to Home</button>
    </section>
  );
}
