"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["MyFont", "Inter", "sans-serif"].join(","),
    h1: {
      fontSize: "3.5rem",
      fontWeight: 900,
    },
    h2: {
      fontSize: "3.25rem",
      fontWeight: 800,
    },
    h3: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "2.75rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "2.25rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
  },
});

export default theme;
