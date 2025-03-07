"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["MyFont", "Inter", "sans-serif"].join(","),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

export default theme;
