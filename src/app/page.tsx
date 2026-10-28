"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";
import GlobalEvents from "./components/GlobalEvents";
import Navbar from "./components/Navbar";
import CustomSelect from "./components/CustomSelect";
import InteractiveHexNetwork from "./components/InteractiveHexNetwork";
import SupplierBand from "./components/SupplierBand";
import HeroCarousel from "./components/HeroCarousel";
import SectionHeader from "./components/SectionHeader";
import TherapeuticCategoriesGrid from "./components/TherapeuticCategories";
import {
	HexImage,
	HexBadge,
	HexIcon,
	MolecularDecoration,
	HEX_CLIP,
} from "./components/Hex";
import {
	ALL_PRODUCTS,
	PRODUCT_CATEGORIES,
	ApiProduct,
} from "@/lib/products";
import { useScrollLock } from "@/lib/scrollLock";
import {
	Search,
	ArrowRight,
	ArrowUpRight,
	ArrowDown,
	ShieldCheck,
	FileCheck,
	Truck,
	FlaskConical,
	Download,
	X,
	CheckCircle2,
	Globe,
	Building2,
	TestTube2,
	Check,
	HeartPulse,
	Pill,
	Syringe,
	Layers,
	Brain,
	TrendingUp,
	Award,
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	ChevronUp,
	FileText,
	ExternalLink,
} from "lucide-react";


// ─── Animated counter (Optimized zero-rerender direct DOM animation via GSAP) ─────────
function CountUp({
	end,
	suffix = "",
	duration = 1.8,
}: {
	end: number;
	suffix?: string;
	duration?: number;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

	useEffect(() => {
		if (!inView || !ref.current) return;
		const node = ref.current;
		const obj = { val: 0 };

		const tween = gsap.to(obj, {
			val: end,
			duration,
			ease: "power2.out",
			onUpdate: () => {
				node.textContent = `${Math.round(obj.val)}${suffix}`;
			},
		});

		return () => {
			tween.kill();
		};
	}, [inView, end, suffix, duration]);

	return (
		<span ref={ref} className="stat-num tabular-nums">
			0{suffix}
		</span>
	);
}

// ─── Category Icon Mapping ────────────────────────────────────────────────────
const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
	"Pharma": Pill,
	"Animal Care": HeartPulse,
	"Excipients": Layers,
	"Food & Nutrition": FlaskConical,
	"Nootropics": Brain,
};

// ─── 4 Core Ruskin Services ───────────────────────────────────────────────────
const SERVICES = [
	{
		num: 1,
		id: "sourcing",
		numberStr: "01.",
		title: "End-to-End Sourcing",
		shortTitle: "End-to-End Sourcing",
		tag: "Global Procurement",
		ctaLabel: "Inquire Sourcing",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Audited cGMP Synthesizers",
			"Vendor Qualification Directorate",
			"Direct Factory Pricing",
		],
		desc: "Complete procurement and reliable supply chain management tailored to your production demands.",
		points: [
			"250+ audited & qualified partner facilities",
			"Physical site quality inspections & vendor qualification",
			"Transparent volume pricing & direct manufacturer contracts",
		],
		specs: ["cGMP Qualified", "250+ Facilities", "Direct Factory Price", "Batch Traceability"],
		metric: { val: "250+", label: "Audited Facilities" },
		icon: Globe,
		img: "/images/sourcing.webp",
	},
	{
		num: 2,
		id: "registration",
		numberStr: "02.",
		title: "Regulatory & Documentation Support",
		shortTitle: "Regulatory & Documentation Support",
		tag: "Regulatory Affairs",
		ctaLabel: "Dossier & Registration",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"CDSCO Regulatory Directorate",
			"Form 41 & Form 10 Specialists",
			"Authorized Indian Representation",
		],
		desc: "Full assistance with DCGI registration processes, technical dossiers, and compliance requirements.",
		points: [
			"Form 41 & Form 10 import registration dossier management",
			"New Drug application filing & expert CDSCO query resolution",
			"Complete local agent representation for global bulk manufacturers",
		],
		specs: ["Form 41 & Form 10", "50+ Registrations", "SEC Presentations", "Official Local Agent"],
		metric: { val: "50+", label: "Active Registrations" },
		icon: FileCheck,
		img: "/images/registration.webp",
	},
	{
		num: 3,
		id: "quality",
		numberStr: "03.",
		title: "Batch COA Verification",
		shortTitle: "Batch COA Verification",
		tag: "Quality & Compliance",
		ctaLabel: "Verify COA & DMF",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Quality Assurance Directorate",
			"ICH & EDQM Compliance Team",
			"Analytical Dossier Specialists",
		],
		desc: "Strict quality checks and batch-wise Certificate of Analysis (COA) validation for every shipment.",
		points: [
			"Full USDMF, EDQM CEP & Tech Pack open-part access",
			"Batch-to-batch HPLC / GC purity certificate verification",
			"Nitrosamine risk evaluations, residual solvents & elemental data",
		],
		specs: ["USDMF / EDQM CEP", "99.8% Avg Purity", "Nitrosamine Profiling", "ICH Q3D Elemental"],
		metric: { val: "99.8%", label: "Average Purity" },
		icon: ShieldCheck,
		img: "/images/quality.webp",
	},
	{
		num: 4,
		id: "distribution",
		numberStr: "04.",
		title: "Global & Domestic Footprint",
		shortTitle: "Global & Domestic Footprint",
		tag: "Market Access",
		ctaLabel: "Supply Network",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Institutional Sales Network",
			"Key Account Management",
			"Formulation Technical Sales",
		],
		desc: "Connecting certified global suppliers with top-tier healthcare manufacturers in India and worldwide.",
		points: [
			"Established relationships with 200+ Indian formulation giants",
			"Dedicated technical sales force with deep molecule expertise",
			"Long-term annual supply agreements & strategic safety stocks",
		],
		specs: ["200+ Formulators", "40+ Years in Market", "Worldwide Reach", "Strategic Safety Stocks"],
		metric: { val: "40+", label: "Years in Market" },
		icon: TrendingUp,
		img: "/images/strategic.webp",
	},
];


// ─── Global World Pins & Supply Route Arcs (Equirectangular System) ─────────
const TRADE_ROUTES = [
	{ d: "M 680 218 Q 445 100 210 182", id: "route-usa" },
	{ d: "M 680 218 Q 580 130 480 135", id: "route-uk" },
	{ d: "M 680 218 Q 595 145 510 140", id: "route-germany" },
	{ d: "M 680 218 Q 645 195 610 208", id: "route-uae" },
	{ d: "M 680 218 Q 720 185 760 187", id: "route-china" },
	{ d: "M 680 218 Q 765 150 850 177", id: "route-japan" },
	{ d: "M 680 218 Q 725 240 770 265", id: "route-singapore" },
	{ d: "M 680 218 Q 770 290 850 374", id: "route-australia" },
	{ d: "M 680 218 Q 500 280 320 348", id: "route-brazil" },
];

const WORLD_PINS = [
	{ id: "india", label: "Mumbai HQ", top: "42%", left: "68%", primary: true, desc: "Global Headquarters & Central Distribution Hub" },
	{ id: "usa", label: "USA", top: "35%", left: "21%", primary: false, desc: "Formulation Partners & CDSCO Import Network" },
	{ id: "uk", label: "UK", top: "26%", left: "48%", primary: false, desc: "European Regulatory & CEP Compliance Link" },
	{ id: "germany", label: "Germany", top: "27%", left: "51%", primary: false, desc: "Specialty Intermediate & Synthesis Sourcing" },
	{ id: "uae", label: "UAE", top: "40%", left: "61%", primary: false, desc: "Middle East Logistics & Transshipment" },
	{ id: "china", label: "China", top: "36%", left: "76%", primary: false, desc: "Audited Reactor Partner Manufacturing" },
	{ id: "japan", label: "Japan", top: "34%", left: "85%", primary: false, desc: "High-Purity Oncology & Contrast Media Partners" },
	{ id: "brazil", label: "Brazil", top: "67%", left: "32%", primary: false, desc: "LATAM Pharmaceutical Export Operations" },
	{ id: "australia", label: "Australia", top: "72%", left: "85%", primary: false, desc: "Oceania Hospital & Bulk Formulation Supply" },
	{ id: "singapore", label: "Singapore", top: "51%", left: "77%", primary: false, desc: "Southeast Asia Cold-Chain Transshipment Hub" },
];

export default function HomePage() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
	const [quoteModalOpen, setQuoteModalOpen] = useState(false);
	const [catalogModalOpen, setCatalogModalOpen] = useState(false);
	const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hoveredPin, setHoveredPin] = useState<string | null>(null);
	const [hoveredServiceCard, setHoveredServiceCard] = useState<number | null>(null);

	// Premium Parallax Interaction for Hero cluster
	const heroMouseX = useMotionValue(0);
	const heroMouseY = useMotionValue(0);
	const smoothHeroX = useSpring(heroMouseX, { damping: 28, stiffness: 85 });
	const smoothHeroY = useSpring(heroMouseY, { damping: 28, stiffness: 85 });

	const clusterRotateX = useTransform(smoothHeroY, [-0.5, 0.5], [3.5, -3.5]);
	const clusterRotateY = useTransform(smoothHeroX, [-0.5, 0.5], [-4, 4]);
	const clusterTranslateX = useTransform(smoothHeroX, [-0.5, 0.5], [-10, 10]);
	const clusterTranslateY = useTransform(smoothHeroY, [-0.5, 0.5], [-7, 7]);

	const heroBoundsRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
	const heroRafRef = useRef<number | null>(null);
	const updateHeroBounds = (el: HTMLElement) => {
		const r = el.getBoundingClientRect();
		heroBoundsRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
	};


	const isScrollingRef = useRef(false);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			isScrollingRef.current = true;
			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
			scrollTimeoutRef.current = setTimeout(() => {
				isScrollingRef.current = false;
				heroBoundsRef.current = null;
			}, 100);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		};
	}, []);


	const handleOpenCatalog = () => {
		window.dispatchEvent(new CustomEvent("ruskin:open-search"));
	};

	const handleOpenQuote = (productOrService?: string) => {
		setQuoteProduct(productOrService || null);
		setQuoteModalOpen(true);
		setFormSubmitted(false);
	};

	// Freeze background scroll & Lenis when any modal is open
	useScrollLock(quoteModalOpen || catalogModalOpen);

	// Escape key handling for open modals
	useEffect(() => {
		const isAnyModalOpen = quoteModalOpen || catalogModalOpen;
		if (!isAnyModalOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setQuoteModalOpen(false);
				setCatalogModalOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [quoteModalOpen, catalogModalOpen]);

	const handleDownloadPdf = () => {
		alert("Downloading Ruskin Chemipharm 2026 Technical Product Directory (PDF)...");
	};

	// Memoized filtered catalog list for modal from real 46 ALL_PRODUCTS
	const filteredCatalog = React.useMemo(() => {
		return ALL_PRODUCTS.filter((p) => {
			if (selectedCategoryFilter !== "All" && p.category !== selectedCategoryFilter) {
				return false;
			}
			if (searchQuery.trim() !== "") {
				const q = searchQuery.toLowerCase();
				return (
					p.name.toLowerCase().includes(q) ||
					p.casNumber.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q)
				);
			}
			return true;
		});
	}, [selectedCategoryFilter, searchQuery]);

	React.useEffect(() => {
		const handleOpenQuoteEvent = (e?: Event) => {
			const customEvent = e as CustomEvent<{ product?: string }>;
			handleOpenQuote(customEvent?.detail?.product || "General Technical Inquiry");
		};
		window.addEventListener("ruskin:open-quote", handleOpenQuoteEvent);
		return () => {
			window.removeEventListener("ruskin:open-quote", handleOpenQuoteEvent);
		};
	}, []);

	return (
		<div className="min-h-screen bg-white text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">

			{/* ══════════════════════════════════════════════════════════
          1. HERO — Light Cream background with Framed Hexagons
          ══════════════════════════════════════════════════════════ */}
			<section
				id="hero"
				onMouseEnter={(e) => {
					if (isScrollingRef.current) return;
					updateHeroBounds(e.currentTarget);
				}}
				onMouseMove={(e) => {
					if (isScrollingRef.current) return;
					if (!heroBoundsRef.current) updateHeroBounds(e.currentTarget);
					const r = heroBoundsRef.current;
					if (r && r.width > 0 && r.height > 0) {
						const clientX = e.clientX;
						const clientY = e.clientY;
						if (!heroRafRef.current) {
							heroRafRef.current = requestAnimationFrame(() => {
								const nx = (clientX - r.left) / r.width - 0.5;
								const ny = (clientY - r.top) / r.height - 0.5;
								heroMouseX.set(nx);
								heroMouseY.set(ny);
								heroRafRef.current = null;
							});
						}
					}
				}}
				onMouseLeave={() => {
					if (heroRafRef.current) {
						cancelAnimationFrame(heroRafRef.current);
						heroRafRef.current = null;
					}
					heroMouseX.set(0);
					heroMouseY.set(0);
				}}
				className="relative overflow-hidden bg-[#FAF7F2] min-h-[92vh] flex flex-col justify-between pt-6"
			>
				{/* Interactive Constellation / Molecular Hexagon Network (Mouse-reactive canvas with multi-plane parallax) */}
				<InteractiveHexNetwork className="z-0" />

				{/* Center hero content */}
				<div className="relative z-10 flex-1 flex items-center justify-center pt-6 pb-12">
					<HeroCarousel
						clusterRotateX={clusterRotateX}
						clusterRotateY={clusterRotateY}
						clusterTranslateX={clusterTranslateX}
						clusterTranslateY={clusterTranslateY}
						onRequestQuote={() => handleOpenQuote("General Technical Inquiry")}
						onDownloadPdf={handleDownloadPdf}
					/>
				</div>

				{/* Symmetrical Gentle Horizon Transition */}
				<div className="relative -mb-px">
					<svg
						viewBox="0 0 1440 60"
						className="w-full h-[40px] sm:h-[60px]"
						preserveAspectRatio="none"
						fill="none"
					>
						<path d="M0,0 Q720,38 1440,0 L1440,60 L0,60 Z" fill="#0B1E2E" />
						<path
							d="M0,0 Q720,38 1440,0"
							stroke="#C79A4B"
							strokeWidth="1.5"
							opacity="0.35"
							fill="none"
						/>
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          2. STRATEGIC SOURCING PARTNERS & KEY STATS — Deep Navy Canvas
          ══════════════════════════════════════════════════════════ */}
			<section className="relative bg-[#0B1E2E] overflow-hidden">
				{/* ─── Strategic Sourcing Partners Ribbon ─── */}
				<div className="relative z-10 w-full pt-5 sm:pt-6 pb-6 sm:pb-7">
					<SupplierBand />
				</div>

				{/* ─── 4-Column Minimalist Stats Row ─── */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
						{[
							{ val: 40, suffix: "+", label: "Years Industry Expertise" },
							{ val: 250, suffix: "+", label: "Global Sourcing Partners" },
							{ val: 46, suffix: "+", label: "DCGI Approved APIs" },
							{ val: 200, suffix: "+", label: "Formulator Network" },
						].map((s, idx) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: idx * 0.08 }}
								className="text-left sm:text-center group cursor-default"
							>
								<div className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-white group-hover:text-[#C79A4B] transition-colors duration-300 font-sans">
									<CountUp end={s.val} />
									<span className="text-[#C79A4B] font-extrabold ml-1">{s.suffix}</span>
								</div>
								<div className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.16em] text-slate-300 mt-2">
									{s.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Horizon Transition down into Pure White Services Section */}
				<div className="relative -mb-px">
					<svg
						viewBox="0 0 1440 60"
						className="w-full h-[40px] sm:h-[60px]"
						preserveAspectRatio="none"
						fill="none"
					>
						<path d="M0,0 Q720,38 1440,0 L1440,60 L0,60 Z" fill="#F8FAFC" />
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          3. PRODUCT RANGE — Crisp Porcelain Desaturated Canvas
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				id="product-range"
				className="py-20 sm:py-28 relative overflow-hidden bg-[#F8FAFC]"
			>
				<div className="absolute top-0 left-0 w-[200px] opacity-[0.06] pointer-events-none">
					<MolecularDecoration color="#12304A" opacity={1} />
				</div>
				<div className="absolute bottom-0 right-0 w-[200px] opacity-[0.06] pointer-events-none" style={{ transform: "scale(-1,-1)" }}>
					<MolecularDecoration color="#C79A4B" opacity={1} />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					{/* Header with luxury scroll reveal */}
					<SectionHeader
						centered
						eyebrow="API Portfolio"
						lead="Active Molecules &"
						highlight="Therapeutic Categories"
						description="Direct factory indenting across 16 core therapeutic segments — high-purity APIs, approved dossiers, and certified global supply corridors."
					/>

					{/* 16 Therapeutic Categories Grid (4x4 Responsive Bento) */}
					<div className="pt-2">
						<TherapeuticCategoriesGrid />
					</div>

					{/* Action CTA Row */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
						<motion.button
							whileHover={{ scale: 1.025, y: -2 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push("/products")}
							className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#12304A] hover:bg-[#0B1E2E] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all group cursor-pointer gpu-smooth"
						>
							<span>Explore All 66+ APIs</span>
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
						</motion.button>
					</div>
				</div>
			</motion.section>

			{/* ══════════════════════════════════════════════════════════
          4. SERVICES WE OFFER — 4-Card Feature Layout (Design Spec)
          ══════════════════════════════════════════════════════════ */}
			<section
				id="services"
				className="py-16 sm:py-20 bg-white relative overflow-hidden border-t border-[#12304A]/6"
			>
				{/* Ambient Decorative Accents */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 0.04, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: "easeOut" }}
					className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none"
				>
					<MolecularDecoration color="#C79A4B" />
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 0.03, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
					className="absolute -bottom-10 -left-10 w-44 h-44 pointer-events-none -scale-x-100"
				>
					<MolecularDecoration color="#12304A" />
				</motion.div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Centered Section Header Stack matching AGENTS.md design tokens */}
					<motion.div
						initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
						whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
						className="text-center max-w-3xl mx-auto space-y-3 pb-2"
					>
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase justify-center">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Services We Offer
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Comprehensive Pharma Services <br className="hidden sm:inline" />
							<span className="text-[#C79A4B]">Tailored to Your Pipeline</span>
						</h2>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />
						<p className="text-base text-[#5A7A8E] font-normal max-w-2xl mx-auto leading-relaxed">
							Four specialized capabilities connecting bulk API reactors with leading formulation facilities — fully compliant, documented, and reliably delivered.
						</p>
					</motion.div>

					{/* Centered 2x2 Square-Like Feature Cards Grid with Staggered Intro Reveal */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-40px" }}
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.12,
									delayChildren: 0.1,
								},
							},
						}}
						className="max-w-5xl mx-auto mt-8 sm:mt-10"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
							{SERVICES.map((svc) => {
								const Icon = svc.icon;

								return (
									<motion.div
										key={svc.num}
										variants={{
											hidden: { opacity: 0, y: 20 },
											visible: {
												opacity: 1,
												y: 0,
												transition: {
													duration: 0.5,
													ease: [0.16, 1, 0.3, 1],
												},
											},
										}}
										whileHover={{
											y: -3,
											transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
										}}
										className="group rounded-[24px] p-7 sm:p-8 flex flex-col justify-between bg-white border border-[#12304A]/8 hover:border-[#C79A4B]/50 shadow-[0_2px_12px_rgba(18,48,74,0.03)] hover:shadow-[0_12px_32px_-8px_rgba(18,48,74,0.08)] transition-all duration-300"
									>
										{/* Header Row: Hex Icon & Top-Right Ruskin Brand Logo */}
										<div className="flex items-center justify-between gap-4 mb-6">
											<HexIcon size={44} bg="rgba(18,48,74,0.04)" className="group-hover:scale-105 transition-transform duration-200">
												<Icon className="w-5 h-5 text-[#12304A] group-hover:text-[#C79A4B] transition-colors duration-200" />
											</HexIcon>

											<div className="w-7 h-7 relative opacity-40 group-hover:opacity-100 transition-opacity duration-300">
												<Image
													src="/logoonly-navy.svg"
													alt="Ruskin Emblem"
													fill
													className="object-contain"
												/>
											</div>
										</div>

										{/* Content Stack */}
										<div className="space-y-3">
											<h3 className="text-xl sm:text-[22px] font-extrabold tracking-tight text-[#12304A] leading-snug group-hover:text-[#C79A4B] transition-colors duration-200">
												{svc.title}
											</h3>

											<p className="text-[14px] leading-relaxed font-normal text-[#5A7A8E]">
												{svc.desc}
											</p>

											{/* Subtle bullet points */}
											<div className="pt-2 space-y-1.5">
												{svc.points.slice(0, 2).map((pt, i) => (
													<div key={i} className="flex items-center gap-2 text-xs text-[#5A7A8E]">
														<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
														<span>{pt}</span>
													</div>
												))}
											</div>
										</div>

										{/* Bottom Metric Bar */}
										<div className="pt-5 mt-6 border-t border-[#12304A]/6 flex items-center justify-between text-xs">
											<span className="text-[#94A3B8] font-medium tracking-wide">
												{svc.tag}
											</span>

											<div className="flex items-baseline gap-1.5">
												<span className="stat-num text-sm sm:text-base font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors duration-200">
													{svc.metric.val}
												</span>
												<span className="text-[11px] text-[#5A7A8E]">{svc.metric.label}</span>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>

						{/* Centered Explore All Services Action Pill Button with Intro Fade */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
							className="mt-8 sm:mt-10 text-center"
						>
							<Link
								href="/services"
								className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#12304A] hover:bg-[#C79A4B] text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl shrink-0 cursor-pointer gpu-smooth group"
							>
								<span>Explore All Services</span>
								<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          5. GLOBAL REACH — World Map with Live Pulse Pins
          ══════════════════════════════════════════════════════════ */}
			<section
				id="global-network"
				className="relative bg-[#0B1E2E] py-20 sm:py-28 overflow-hidden"
			>
				{/* Wave in */}
				<div className="absolute top-0 inset-x-0 -mt-px">
					<svg
						viewBox="0 0 1440 80"
						className="w-full h-[50px] sm:h-[80px]"
						preserveAspectRatio="none"
					>
						<path d="M0,0 C480,80 960,0 1440,60 L1440,0 L0,0 Z" fill="#FFFFFF" />
					</svg>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8">
					<SectionHeader
						centered
						dark
						eyebrow="Global Reach"
						lead="Ruskin’s"
						highlight="Global Sourcing Network"
						description="Supplying pharmaceutical formulators in 30+ countries across 5 continents with certified, compliant APIs."
					/>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
						{/* Interactive Map Console */}
						<div className="lg:col-span-8 bg-[#071521] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
							{/* Console Header Bar */}
							<div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono tracking-wider text-slate-400">
								<span className="text-white font-bold uppercase tracking-[0.18em]">Global Distribution Corridors</span>
								<div className="text-slate-400 hidden sm:block">
									MUMBAI CENTRAL HUB · 18.9220° N, 72.8347° E
								</div>
							</div>

							{/* Map Visual Container */}
							<div className="relative w-full my-auto" style={{ paddingBottom: "52%" }}>
								{/* Map Base Graphic (Local SVG, White fill, zero filter computation) */}
								<img
									src="/images/world-map.svg"
									alt="World Sourcing Map"
									className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none opacity-25"
									loading="lazy"
									decoding="async"
								/>

								{/* Trade Corridors SVG Overlay */}
								<svg
									className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
									viewBox="0 0 1000 520"
									fill="none"
								>
									{/* Static ambient dashed tracks */}
									{TRADE_ROUTES.map((route) => (
										<path
											key={`track-${route.id}`}
											d={route.d}
											stroke="rgba(199, 154, 75, 0.35)"
											strokeWidth="1.2"
											strokeDasharray="4 4"
											strokeLinecap="round"
										/>
									))}
								</svg>

								{/* World Pins */}
								{WORLD_PINS.map((pin) => (
									<div
										key={pin.id}
										className="absolute cursor-pointer z-20 group"
										style={{
											top: pin.top,
											left: pin.left,
											transform: "translate(-50%, -50%)",
										}}
										onMouseEnter={() => setHoveredPin(pin.id)}
										onMouseLeave={() => setHoveredPin(null)}
									>
										{/* Tooltip */}
										<div
											className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-[#071521] border border-[#C79A4B]/60 text-white px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-30 flex flex-col items-center pointer-events-none transition-[opacity,transform] duration-200 ${
												hoveredPin === pin.id ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 pointer-events-none"
											}`}
										>
											<span className="text-[#C79A4B] font-bold text-xs leading-tight">{pin.label}</span>
											{pin.desc && <span className="text-[10px] text-slate-300 font-normal leading-tight mt-0.5">{pin.desc}</span>}
											<div className="w-2 h-2 bg-[#071521] border-r border-b border-[#C79A4B]/60 rotate-45 -mb-2 mt-0.5" />
										</div>

										{/* Pin Marker */}
										{pin.primary ? (
											<div className="relative flex items-center justify-center">
												<div className="w-3.5 h-3.5 rounded-full bg-[#C79A4B] border-2 border-white shadow-lg relative z-10 ring-4 ring-[#C79A4B]/20" />
												<span className="absolute -bottom-4.5 left-1/2 -translate-x-1/2 bg-[#C79A4B] text-[#071521] text-[8px] font-black tracking-wider px-1 py-0.5 rounded uppercase whitespace-nowrap shadow-xs">
													HQ
												</span>
											</div>
										) : (
											<div className="relative flex items-center justify-center">
												<span className="absolute w-3.5 h-3.5 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-200 pointer-events-none" />
												<div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#C79A4B] border border-white/80 shadow-xs transition-colors duration-200 relative z-10" />
											</div>
										)}
									</div>
								))}
							</div>

							{/* Bottom Legend */}
							<div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs">
								<div className="flex items-center gap-5">
									<div className="flex items-center gap-2 text-slate-300">
										<div className="w-2.5 h-2.5 rounded-full bg-[#C79A4B] ring-2 ring-[#C79A4B]/40" />
										<span className="font-semibold text-xs text-white">Mumbai HQ</span>
									</div>
									<div className="flex items-center gap-2 text-slate-400">
										<div className="w-2 h-2 rounded-full bg-slate-300" />
										<span className="text-xs">Partner Export Hubs</span>
									</div>
								</div>
								<span className="text-xs font-bold text-[#C79A4B]">
									30+ Countries Served
								</span>
							</div>
						</div>

						{/* Unified Operational Metrics Console */}
						<div className="lg:col-span-4 bg-[#071521] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
							{/* Top Console Header */}
							<div className="flex items-center justify-between pb-3 border-b border-white/10">
								<span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#C79A4B]">
									Operational Capacity
								</span>
								<span className="text-[10px] font-mono text-slate-400">
									AUDITED 2026
								</span>
							</div>

							{/* Unified Metrics List with Hairline Dividers */}
							<div className="divide-y divide-white/10 my-auto">
								{[
									{ label: "Export Destinations", value: "30+", sub: "Verified Global Corridors" },
									{ label: "Partner Facilities", value: "250+", sub: "Audited Synthesis Reactors" },
									{ label: "DCGI Molecules", value: "46+", sub: "Form 41 & Form 10 Approved" },
									{ label: "Quality Standard", value: "cGMP", sub: "COA & Batch Verification" },
									{ label: "Annual Supply Volume", value: "500+ MT", sub: "Bulk API & Intermediates" },
								].map((s) => (
									<div
										key={s.label}
										className="py-3.5 first:pt-2.5 last:pb-2.5 flex items-center justify-between gap-4 group"
									>
										<div className="min-w-0">
											<div className="text-xs sm:text-sm font-semibold text-white tracking-tight">
												{s.label}
											</div>
											<div className="text-[11px] text-slate-400">
												{s.sub}
											</div>
										</div>

										<div className="stat-num text-sm sm:text-base font-bold text-[#C79A4B] shrink-0 text-right">
											{s.value}
										</div>
									</div>
								))}
							</div>

							{/* Bottom Verification Note */}
							<div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
								<span>Standard Dispatch: Air &amp; Sea Cargo</span>
								<span className="text-[#C79A4B] font-semibold text-[10px] font-mono">100% TRACEABLE</span>
							</div>
						</div>
					</div>
				</div>

				{/* Wave out to White */}
				<div className="absolute bottom-0 inset-x-0 -mb-px">
					<svg
						viewBox="0 0 1440 80"
						className="w-full h-[50px] sm:h-[80px]"
						preserveAspectRatio="none"
					>
						<path d="M0,80 C480,0 960,80 1440,20 L1440,80 L0,80 Z" fill="#FAF7F2" />
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          7. GLOBAL EVENTS
          ══════════════════════════════════════════════════════════ */}
			<GlobalEvents onScheduleMeeting={handleOpenQuote} />

			{/* ══════════════════════════════════════════════════════════
          8. CTA BANNER
          ══════════════════════════════════════════════════════════ */}
			<CtaBanner
				onRequestQuote={() => handleOpenQuote("Commercial API Procurement Inquiry")}
			/>

			{/* ══════════════════════════════════════════════════════════
          9. FOOTER
          ══════════════════════════════════════════════════════════ */}
			<Footer onOpenCatalog={() => handleOpenCatalog()} />

			{/* ══════════════════════════════════════════════════════════
          TECHNICAL CATALOG MODAL (Searches all 46 real ALL_PRODUCTS)
          ══════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{catalogModalOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 bg-[#12304A]/35 backdrop-blur-[3px]"
							onClick={() => setCatalogModalOpen(false)}
							onTouchMove={(e) => e.stopPropagation()}
							onWheel={(e) => e.stopPropagation()}
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.94, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 12 }}
							transition={{ type: "spring", damping: 28, stiffness: 380 }}
							data-lenis-prevent="true"
							className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(620px,calc(100vw-32px))] flex flex-col rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#12304A]/10 max-h-[85vh]"
						>
							{/* Header */}
							<div className="px-6 pt-6 pb-4 border-b border-[#12304A]/8 flex items-start justify-between shrink-0 text-left">
								<div>
									<div className="text-[10px] font-bold text-[#C79A4B] uppercase tracking-widest mb-0.5">
										TECHNICAL PRODUCT DIRECTORY
									</div>
									<h3 className="text-lg font-bold text-[#12304A] leading-snug">
										Search Specifications &amp; Regulatory Status
									</h3>
								</div>
								<button
									onClick={() => setCatalogModalOpen(false)}
									className="p-1 rounded-full text-[#5A7A8E] hover:text-[#12304A] hover:bg-[#12304A]/5 transition-colors shrink-0"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Search & Filter Bar */}
							<div className="px-5 py-3 border-b border-[#12304A]/8 flex gap-2.5 shrink-0 bg-[#FAF7F2]">
								<div className="relative flex-1">
									<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A7A8E]" />
									<input
										type="text"
										placeholder="Search by API compound name or CAS No..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-9 pr-3 py-2 rounded-xl text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none text-xs bg-white border border-[#12304A]/10 focus:border-[#C79A4B]"
									/>
								</div>
								<CustomSelect
									variant="light"
									size="sm"
									value={selectedCategoryFilter}
									onChange={(val) => setSelectedCategoryFilter(val)}
									options={[
										{ value: "All", label: `All Categories (${ALL_PRODUCTS.length})` },
										...PRODUCT_CATEGORIES.map((c) => ({
											value: c.name,
											label: `${c.name} (${c.count})`,
										})),
									]}
									className="w-[190px] shrink-0"
								/>
							</div>

							{/* Results List */}
							<div
								data-lenis-prevent="true"
								className="p-5 overflow-y-auto flex-1 space-y-3 custom-scrollbar text-left"
							>
								{filteredCatalog.length > 0 ? (
									filteredCatalog.map((product) => (
										<div
											key={product.id}
											className="rounded-2xl p-4 border border-[#12304A]/8 bg-white hover:border-[#C79A4B]/40 hover:shadow-md transition-[border-color,box-shadow] duration-200 flex flex-col gap-2"
										>
											<div className="flex items-center justify-between">
												<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C79A4B]/15 text-[#C79A4B] uppercase tracking-wide">
													{product.category}
												</span>
												<span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
													{product.dmfStatus}
												</span>
											</div>
											<div>
												<h4 className="text-sm font-bold text-[#12304A]">{product.name}</h4>
												<div className="text-[11px] text-[#5A7A8E] mt-0.5 font-mono">
													CAS: <span className="text-[#12304A] font-semibold">{product.casNumber}</span>
													{" · "}
													Purity: <span className="stat-num text-emerald-600 font-bold">{product.purity}</span>
													{" · "}
													Grade: <span className="text-slate-600">{product.grade}</span>
												</div>
											</div>
											<p className="text-[11px] text-[#5A7A8E] line-clamp-2 leading-relaxed">
												{product.description}
											</p>
											<div className="flex items-center justify-between pt-2 border-t border-[#12304A]/6">
												<Link
													href={`/products/${product.slug}`}
													onClick={() => setCatalogModalOpen(false)}
													className="text-[11px] font-bold text-[#12304A] hover:text-[#C79A4B] flex items-center gap-1 transition-colors"
												>
													View Molecule Details <ArrowUpRight className="w-3 h-3" />
												</Link>
												<button
													onClick={() => {
														setCatalogModalOpen(false);
														handleOpenQuote(product.name);
													}}
													className="gold-btn px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1"
												>
													Request COA &amp; Quote
												</button>
											</div>
										</div>
									))
								) : (
									<div className="py-12 text-center text-slate-500 text-xs">
										No products found matching your search.
									</div>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* ══════════════════════════════════════════════════════════
          QUOTE & TECHNICAL DOSSIER MODAL
          ══════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{quoteModalOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 bg-[#12304A]/35 backdrop-blur-[3px]"
							onClick={() => setQuoteModalOpen(false)}
							onTouchMove={(e) => e.stopPropagation()}
							onWheel={(e) => e.stopPropagation()}
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 12 }}
							transition={{ type: "spring", damping: 26, stiffness: 380 }}
							data-lenis-prevent="true"
							className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(480px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white shadow-[0_25px_70px_rgba(18,48,74,0.35)] border border-[#12304A]/10 text-left"
						>
							<button
								onClick={() => setQuoteModalOpen(false)}
								className="absolute top-4 right-4 text-[#5A7A8E] hover:text-[#12304A] p-1.5 rounded-full hover:bg-[#12304A]/5 z-10 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>

							{!formSubmitted ? (
								<div className="p-6 sm:p-8 space-y-5">
									<div>
										<div className="text-[10px] uppercase font-bold text-[#C79A4B] tracking-widest mb-1">
											REQUEST QUOTE &amp; TECHNICAL DOSSIER
										</div>
										<h3 className="text-xl font-extrabold text-[#12304A]">
											{quoteProduct ? `Inquiry for ${quoteProduct}` : "Chemical Sourcing Inquiry"}
										</h3>
										<p className="text-xs text-[#5A7A8E] mt-1">
											Submit your batch specification requirement to receive certified COA and pricing.
										</p>
									</div>

									<form
										onSubmit={(e) => {
											e.preventDefault();
											setIsSubmitting(true);
											setTimeout(() => {
												setIsSubmitting(false);
												setFormSubmitted(true);
											}, 650);
										}}
										className="space-y-3.5"
									>
										<div>
											<label className="block text-[11px] font-bold text-[#12304A] mb-1">
												Full Name &amp; Designation <span className="text-[#C79A4B]">*</span>
											</label>
											<input
												required
												type="text"
												placeholder="e.g. Dr. Sarah Jenkins (Head of Procurement)"
												className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
											/>
										</div>

										<div className="grid grid-cols-2 gap-3">
											<div>
												<label className="block text-[11px] font-bold text-[#12304A] mb-1">
													Corporate Email <span className="text-[#C79A4B]">*</span>
												</label>
												<input
													required
													type="email"
													placeholder="s.jenkins@pharma.com"
													className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
												/>
											</div>
											<div>
												<label className="block text-[11px] font-bold text-[#12304A] mb-1">
													Estimated Quantity
												</label>
												<input
													type="text"
													placeholder="e.g. 500 Kg / 1 MT"
													className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
												/>
											</div>
										</div>

										<div>
											<label className="block text-[11px] font-bold text-[#12304A] mb-1">
												Requirements &amp; Pharmacopoeia (USP / BP / IP)
											</label>
											<textarea
												rows={3}
												defaultValue={
													quoteProduct
														? `Inquiry for ${quoteProduct}. Please provide batch COA and commercial quote.`
														: ""
												}
												placeholder="Specify purity thresholds, regulatory requirements (USDMF, CEP), delivery schedule..."
												className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none resize-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
											/>
										</div>

										<motion.button
											whileHover={{ scale: 1.01 }}
											whileTap={{ scale: 0.98 }}
											type="submit"
											disabled={isSubmitting}
											className="w-full bg-[#12304A] hover:bg-[#0B1E2E] disabled:bg-[#12304A]/80 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer gpu-smooth"
										>
											{isSubmitting ? (
												<span className="inline-flex items-center gap-2">
													<span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
													<span>Transmitting Dossier Request...</span>
												</span>
											) : (
												<>
													<span>Submit Inquiry to Ruskin Team</span>
													<ArrowRight className="w-4 h-4" />
												</>
											)}
										</motion.button>
									</form>
								</div>
							) : (
								<motion.div
									initial={{ opacity: 0, scale: 0.92 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ type: "spring", damping: 24, stiffness: 350 }}
									className="p-8 text-center space-y-4"
								>
									<motion.div
										initial={{ scale: 0, rotate: -25 }}
										animate={{ scale: [0, 1.2, 1], rotate: 0 }}
										transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
										className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm"
									>
										<CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
									</motion.div>
									<motion.h3
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.12 }}
										className="text-xl font-bold text-[#12304A]"
									>
										Inquiry Submitted Successfully
									</motion.h3>
									<motion.p
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.18 }}
										className="text-xs text-[#5A7A8E] leading-relaxed max-w-sm mx-auto"
									>
										Thank you. Our regulatory and commercial sourcing specialists will follow up with full COA specifications within 2 business hours.
									</motion.p>
									<motion.div
										initial={{ opacity: 0, y: 6 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.24 }}
									>
										<motion.button
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.97 }}
											onClick={() => setQuoteModalOpen(false)}
											className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
										>
											Done
										</motion.button>
									</motion.div>
								</motion.div>
							)}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
