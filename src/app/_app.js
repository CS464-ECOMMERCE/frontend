"use client";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { fetchCart } from "@/store/cartSlice";
import { SessionProvider } from "next-auth/react";
import FloatingCartButton from "@/components/cart/FloatingCartButton";
import { Footer } from "@/components/Footer";

function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }} className="display-screen">
        {children}
      </Box>
      <Footer />
    </>
  );
}

export default function AppWrapper({ children, session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <App children={children} />
        <FloatingCartButton />
      </Provider>
    </SessionProvider>
  );
}
