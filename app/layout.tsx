import type { Metadata, Viewport } from "next";
import { bebas, dmSans, jetbrains } from "./fonts";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";
import WaitlistPopup from "@/components/WaitlistPopup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nodelevel.ar"),
  title: "NODE LEVEL — Filtramos hype. Validamos todo.",
  description:
    "Plataforma de cultura urbana argentina. Verificación, mercado tipo bolsa y comunidad cerrada. Sneakers, apparel y objetos de alto valor simbólico — Verified by Node.",
  keywords: [
    "node level",
    "sneakers argentina",
    "marketplace cultura urbana",
    "stockx argentina",
    "verificación sneakers",
    "reventa premium",
  ],
  openGraph: {
    title: "NODE LEVEL — Filtramos hype",
    description:
      "Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.",
    url: "https://nodelevel.ar",
    siteName: "NODE LEVEL",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NODE LEVEL — Filtramos hype",
    description: "Verified by Node — Argentina / LATAM",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${bebas.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <LenisProvider>
          <Cursor />
          <WaitlistPopup />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
