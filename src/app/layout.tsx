import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#171412",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Helena & Gabriel — Celebrando o Nosso Amor | 25 de Outubro de 2025",
  description:
    "Com imensa alegria convidamos você para celebrar a nossa união na Villa Sansu. Detalhes da cerimônia, RSVP online, lista de presentes e dicas exclusivas.",
  keywords: ["casamento", "Helena e Gabriel", "convite digital", "Villa Sansu", "RSVP"],
  authors: [{ name: "Helena & Gabriel" }],
  openGraph: {
    title: "Helena & Gabriel — Celebrando o Nosso Amor",
    description: "25 de Outubro de 2025 • Villa Sansu • Confirme sua presença e celebre conosco.",
    url: "https://casamento.khdya3.easypanel.host",
    siteName: "Helena & Gabriel Wedding",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Helena & Gabriel — Celebração",
      },
    ],
    locale: "pt_BR",
    type: "website",
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
      className={`${serifFont.variable} ${displayFont.variable} ${sansFont.variable} scroll-smooth antialiased selection:bg-[#c5a059]/30 selection:text-[#2c221e]`}
    >
      <body className="min-h-screen bg-[#faf8f5] text-[#2c2420] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
