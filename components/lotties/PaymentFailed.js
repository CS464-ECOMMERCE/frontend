"use client";
import { use, useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  CancelCheckoutSession,
} from "@/src/app/api/stripe";

export default function PaymentFailed() {
  const [loading, setLoading] = useState(true);
  const animationContainer = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      router.push("/shop");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const res = await CancelCheckoutSession(sessionId);
      if (res.status !== 200) {
        router.push("/404");
        return;
      }
      setLoading(false); // Ensure loading is set to false in all cases
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !animationContainer.current) return;

    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/failed.json",
    });

    return () => animation.destroy();
  }, [loading]);

  return (
    <>
      {loading ? null : (
        <div className="h-[80vh]" ref={animationContainer}></div>
      )}
    </>
  );
}
