"use client";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/material";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import { fetchCart } from "@/store/cartSlice";

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
    </>
  );
}

export default function AppWrapper(props) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}
