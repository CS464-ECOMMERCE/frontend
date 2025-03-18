import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppWrapper from "./_app";

export const metadata = {
  title: "CS464 Ecommerce",
  description: "Shop till you drop!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="root-layout">
        <ThemeProvider theme={theme}>
          <AppWrapper children={children} />
        </ThemeProvider>
      </body>
    </html>
  );
}
