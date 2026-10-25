import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import FloatingScrollbar from "./components/FloatingScrollbar";
import SearchModal from "./components/SearchModal";
import { ProductTransitionProvider } from "./context/ProductTransitionContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plus-jakarta",
	weight: ["300", "400", "500", "600", "700", "800"],
	display: "swap",
	style: ["normal", "italic"],
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Ruskin Chemipharm | Precision Chemistry. Global Standards.",
	description:
		"WHO-GMP & ISO 9001:2015 Certified Manufacturing Partner for High-Yield Synthesis, APIs, Intermediates, Dossiers & Fine Chemicals Sourcing.",
	keywords: [
		"Pharma Sourcing",
		"APIs",
		"Chemical Synthesis",
		"WHO-GMP",
		"ISO 9001:2015",
		"Ruskin Chemipharm",
		"Regulatory Dossiers",
		"USDMF",
		"CEP",
	],
	icons: {
		icon: "/logoonly-gold.svg",
		apple: "/logoonly-gold.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${plusJakartaSans.variable} ${inter.variable}`}
		>
			<body
				suppressHydrationWarning
				className="bg-[#FAF7F2] text-[#5A7A8E] antialiased min-h-screen selection:bg-[#C79A4B] selection:text-white"
			>
				<SearchModal />
				<FloatingScrollbar />
				<Navbar />
				<ProductTransitionProvider>
					{children}
				</ProductTransitionProvider>
				<BackToTop />
			</body>
		</html>
	);
}
