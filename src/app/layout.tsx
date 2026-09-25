import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ruskin Chemipharm | Precision Chemistry. Global Standards.",
  description: "WHO-GMP & ISO 9001:2015 Certified Manufacturing Partner for High-Yield Synthesis, APIs, Intermediates, Dossiers & Fine Chemicals Sourcing.",
  keywords: ["Pharma Sourcing", "APIs", "Chemical Synthesis", "WHO-GMP", "ISO 9001:2015", "Ruskin Chemipharm", "Regulatory Dossiers", "USDMF", "CEP"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakartaSans.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#19314C] text-[#CBD5E1] antialiased min-h-screen selection:bg-[#C59942] selection:text-[#19314C]">
        {children}
      </body>
    </html>
  );
}
