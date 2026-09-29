import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const sansFont = Montserrat({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helena & Gabriel — Nosso Casamento",
  description: "Com imensa alegria convidamos você para celebrar o nosso amor e compartilhar esse momento inesquecível.",
  openGraph: {
    title: "Helena & Gabriel — Convite de Casamento",
    description: "Confira todos os detalhes da cerimônia, recepção, lista de presentes e confirme sua presença.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${serifFont.variable} ${sansFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#FAF8F5] text-[#2C2725] font-sans selection:bg-[#E2D5C3] selection:text-[#2C2725]">
        {children}
      </body>
    </html>
  );
}
