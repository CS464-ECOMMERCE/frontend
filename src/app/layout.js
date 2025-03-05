import localFont from "next/font/local";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "@/components/Navbar";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CS464 Ecommerce",
  description: "Shop till you drop!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CssBaseline />
        <Navbar />
        <Toolbar />
        <Box component="main" sx={{ p: 3 }}>
          {children}
        </Box>
      </body>
    </html>
  );
}
