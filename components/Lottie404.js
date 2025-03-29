"use client";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";

export default function Lottie404() {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !animationContainer.current) return;

    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/404.json",
    });

    return () => animation.destroy();
  }, []);

  return <div className="h-full" ref={animationContainer}></div>;
}
