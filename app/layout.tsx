import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";
import CartSidebar from "@/components/cart-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReLoop - Circular Economy Marketplace",
  description: "Buy, sell, and upcycle tech components and e-waste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <CompareProvider>
              <Navbar />
              <CartSidebar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </CompareProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
