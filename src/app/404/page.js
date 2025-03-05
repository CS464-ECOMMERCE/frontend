"use client";
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";

export default function Custom404() {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      path: "/404.json",
    });

    return () => animation.destroy();
  }, []);

  return <div className="display-page" ref={animationContainer}></div>;
}
