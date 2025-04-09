"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const FloatingCartButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 600); // Adjust breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Show button when items are added
  useEffect(() => {
    // Always hide if there's a session
    if (session) {
      setIsVisible(false);
      return;
    }

    // Only show for non-logged in mobile users with items
    setIsVisible(isMobile && cartItems.length > 0);
  }, [session, isMobile, cartItems.length]);

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-5 right-5 h-[60px] w-[60px] rounded-full shadow-lg z-50 p-0 flex items-center justify-center"
      onClick={() => router.push("/cart")}
      size="icon"
    >
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </Button>
  );
};

export default FloatingCartButton;
