import "./globals.css";
import Navbar from "../../components/Navbar";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme";

export const metadata = {
  title: "CS464 Ecommerce",
  description: "Shop till you drop!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box component="main" sx={{ p: 3 }} className="display-screen">
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
