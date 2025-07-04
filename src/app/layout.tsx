import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🍕 Pizzaria Oliveira v2 | Sabor e qualidade de verdade!",
  description: "Descubra a melhor pizzaria da região com pizzas artesanais, ingredientes selecionados e atendimento de primeira. Peça online e aproveite o sabor irresistível da Pizzaria Oliveira!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "#f1f1f1",
              color: "#131313",
              borderColor: "rgba(255, 255, 255, 0.5)"
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
