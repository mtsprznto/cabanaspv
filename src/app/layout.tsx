import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quickSand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CabañasPV - Puerto Varas",
  description: "Arriendo en puerto varas | Cabañas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={quickSand.className}>{children}</body>
    </html>
  );
}
