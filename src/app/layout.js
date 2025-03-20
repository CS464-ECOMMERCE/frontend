import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppWrapper from "./_app";
import { auth } from "./api/auth/auth";

export const metadata = {
  title: "CS464 Ecommerce",
  description: "Shop till you drop!",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className="root-layout">
        <ThemeProvider theme={theme}>
          <AppWrapper children={children} session={session} />
        </ThemeProvider>
      </body>
    </html>
  );
}
