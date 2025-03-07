import "./globals.css";
import Navbar from "../../components/Navbar";
import theme from "@/theme";
import { Box, ThemeProvider } from "@mui/material";

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
          <Box component="main" sx={{ p: 3 }}>
            <div className="display-screen">{children}</div>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
