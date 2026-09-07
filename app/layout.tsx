import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moné Gardens · En alianza con MIACASA",
  description:
    "Moné Gardens: 32 casas de diseño superior, accesible y exclusivo en Tumbaco. Presentado en alianza con MIACASA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={archivo.variable}>
      <body style={{ fontFamily: "var(--font-archivo), Archivo, system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
