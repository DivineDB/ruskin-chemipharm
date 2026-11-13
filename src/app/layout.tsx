import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import { ProductTransitionProvider } from "./context/ProductTransitionContext";
import "./globals.css";

// Deferred non-critical client UI overlays
const SearchModal = dynamic(() => import("./components/SearchModal"));
const QuoteModal = dynamic(() => import("./components/QuoteModal"));
const FloatingScrollbar = dynamic(() => import("./components/FloatingScrollbar"));
const BackToTop = dynamic(() => import("./components/BackToTop"));

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
		"Specialized Global Sourcing Partner for High-Yield Synthesis, APIs, Intermediates, Regulatory Dossiers & Fine Chemicals Distribution.",
	keywords: [
		"Pharma Sourcing",
		"APIs",
		"Chemical Synthesis",
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
				<SmoothScroll>
					<SearchModal />
					<QuoteModal />
					<FloatingScrollbar />
					<Navbar />
					<ProductTransitionProvider>
						{children}
					</ProductTransitionProvider>
					<BackToTop />
				</SmoothScroll>
			</body>
		</html>
	);
}
