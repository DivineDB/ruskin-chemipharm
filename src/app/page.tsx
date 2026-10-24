"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
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
import {
	HexImage,
	HexBadge,
	HexIcon,
	MolecularDecoration,
} from "./components/Hex";
import {
	ALL_PRODUCTS,
	PRODUCT_CATEGORIES,
	ApiProduct,
} from "@/lib/products";
import {
	Search,
	ArrowRight,
	ArrowUpRight,
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


// ─── Animated counter (Optimized zero-rerender direct DOM animation) ─────────
function CountUp({
	end,
	suffix = "",
	duration = 1.6,
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
		let startTimestamp: number | null = null;
		let rafId: number;

		const step = (timestamp: number) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
			// Smooth easeOutQuad
			const easeProgress = 1 - (1 - progress) * (1 - progress);
			const currentVal = Math.round(easeProgress * end);
			node.textContent = `${currentVal}${suffix}`;
			if (progress < 1) {
				rafId = requestAnimationFrame(step);
			}
		};

		rafId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafId);
	}, [inView, end, suffix, duration]);

	return (
		<span ref={ref} className="stat-num">
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

// ─── 5 Core Ruskin Services ───────────────────────────────────────────────────
const SERVICES = [
	{
		num: 1,
		id: "sourcing",
		numberStr: "01.",
		title: "Global Sourcing of APIs & Intermediates",
		shortTitle: "Global Sourcing of APIs",
		tag: "Global Procurement",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Audited cGMP Synthesizers",
			"Vendor Qualification Directorate",
			"Direct Factory Pricing",
		],
		desc: "Comprehensive sourcing of APIs, Intermediates, and specialty pharma materials from audited, world-leading cGMP manufacturers across India, China, Europe, and Japan.",
		points: [
			"250+ audited & qualified partner facilities",
			"Physical site quality inspections & vendor qualification",
			"Transparent volume pricing & direct manufacturer contracts",
		],
		specs: ["WHO-GMP Audited", "250+ Facilities", "Direct Factory Price", "Batch Traceability"],
		metric: { val: "250+", label: "Audited Facilities" },
		icon: Globe,
		img: "/images/sourcing.jpg",
	},
	{
		num: 2,
		id: "registration",
		numberStr: "02.",
		title: "Registration & DCGI / CDSCO Approvals",
		shortTitle: "Registration & DCGI Approvals",
		tag: "Regulatory Affairs",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"CDSCO Regulatory Directorate",
			"Form 41 & Form 10 Specialists",
			"Authorized Indian Representation",
		],
		desc: "End-to-end registration of APIs & New Drug approvals with the Indian Drug Authority (CDSCO / DCGI), Form 41 foreign site registrations, and Form 10 import licensing.",
		points: [
			"Form 41 & Form 10 import registration dossier management",
			"New Drug application filing & expert CDSCO query resolution",
			"Complete local agent representation for global bulk manufacturers",
		],
		specs: ["Form 41 & Form 10", "50+ Registrations", "SEC Presentations", "Official Local Agent"],
		metric: { val: "50+", label: "Active Registrations" },
		icon: FileCheck,
		img: "/images/registration.jpg",
	},
	{
		num: 3,
		id: "quality",
		numberStr: "03.",
		title: "Technical Dossiers & Quality Documentation",
		shortTitle: "Technical Dossiers & Quality Docs",
		tag: "Quality & Compliance",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Quality Assurance Directorate",
			"ICH & EDQM Compliance Team",
			"Analytical Dossier Specialists",
		],
		desc: "Full regulatory documentation backup — USDMF, CEP open-parts, batch COAs, and stability data ensuring zero friction in formulation filings and USFDA / EDQM audits.",
		points: [
			"Full USDMF, EDQM CEP & Tech Pack open-part access",
			"Batch-to-batch HPLC / GC purity certificate verification",
			"Nitrosamine risk evaluations, residual solvents & elemental data",
		],
		specs: ["USDMF / EDQM CEP", "99.8% Avg Purity", "Nitrosamine Profiling", "ICH Q3D Elemental"],
		metric: { val: "99.8%", label: "Average Purity" },
		icon: ShieldCheck,
		img: "/images/quality.jpg",
	},
	{
		num: 4,
		id: "distribution",
		numberStr: "04.",
		title: "Strategic Marketing & Distribution",
		shortTitle: "Strategic Marketing & Distribution",
		tag: "Market Access",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Institutional Sales Network",
			"Key Account Management",
			"Formulation Technical Sales",
		],
		desc: "Targeted marketing of active ingredients across leading Indian pharmaceutical formulation companies, CMOs, and institutional hospital networks.",
		points: [
			"Established relationships with 200+ Indian formulation giants",
			"Dedicated technical sales force with deep molecule expertise",
			"Long-term annual supply agreements & strategic safety stocks",
		],
		specs: ["200+ Formulators", "40+ Years in Market", "Dedicated Sales Force", "Strategic Safety Stocks"],
		metric: { val: "40+", label: "Years in Market" },
		icon: TrendingUp,
		img: "/images/strategic.jpg",
	},
	{
		num: 5,
		id: "logistics",
		numberStr: "05.",
		title: "Export & Cold-Chain Logistics",
		shortTitle: "Export & Cold-Chain Logistics",
		tag: "Global Logistics",
		handledByLabel: "HANDLED BY",
		handledBy: [
			"Cold-Chain Logistics Unit",
			"DG Shipping & Bonded Air",
			"SEZ & Advance Licence Team",
		],
		desc: "Full-service pharmaceutical export logistics handling advance licenses, SEZ/EOU dispatches, and temperature-controlled air & sea freight to 30+ countries.",
		points: [
			"Advance Licence, SEZ & EOU export compliance expertise",
			"Validated temperature-controlled cold-chain packaging (2–8°C / -20°C)",
			"Door-to-door bonded shipping with live GPS temperature tracking",
		],
		specs: ["Validated Cold Chain (2–8°C)", "30+ Export Nations", "SEZ & Advance Licence", "Real-Time GPS Tracking"],
		metric: { val: "30+", label: "Export Nations" },
		icon: Truck,
		img: "/images/export.jpg",
	},
];


// ─── Global World Pins (Accurate Equirectangular Coordinates) ───────────────────
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
	const [activeService, setActiveService] = useState<number | null>(null);
	const servicesContainerRef = useRef<HTMLDivElement>(null);

	// Close active service card when clicking outside the services section
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				servicesContainerRef.current &&
				!servicesContainerRef.current.contains(e.target as Node)
			) {
				setActiveService(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

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


	const handleOpenCatalog = () => {
		window.dispatchEvent(new CustomEvent("ruskin:open-search"));
	};

	const handleOpenQuote = (productOrService?: string) => {
		setQuoteProduct(productOrService || null);
		setQuoteModalOpen(true);
		setFormSubmitted(false);
	};

	// Body scroll lock & Escape key handling for open modals
	useEffect(() => {
		const isAnyModalOpen = quoteModalOpen || catalogModalOpen;
		if (isAnyModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setQuoteModalOpen(false);
				setCatalogModalOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
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
				onMouseEnter={(e) => updateHeroBounds(e.currentTarget)}
				onMouseMove={(e) => {
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
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
						
						{/* Left: Headline & Actions — Generous breathing room, never overpowered */}
						<div className="lg:col-span-7 space-y-6 text-left">
							{/* Certification Pill Badge */}
							<motion.div
								initial={{ opacity: 0, y: 14, scale: 0.96 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							>
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#12304A]/10 text-[10px] font-semibold tracking-wider uppercase text-[#12304A]/80 hover:border-[#C79A4B]/40 transition-colors shadow-sm">
									<ShieldCheck className="w-3.5 h-3.5 text-[#C79A4B] shrink-0" />
									<span>WHO-GMP &amp; ISO 9001:2015 Certified</span>
								</span>
							</motion.div>

							{/* Headline Stack */}
							<motion.div
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
								className="space-y-1"
							>
								<h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#12304A] leading-[1.12] tracking-tight">
									Your trusted partner in{" "}
									<span className="text-[#C79A4B]">pharmaceutical raw materials</span>
								</h1>
							</motion.div>

							{/* Subheadline */}
							<motion.p
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
								className="text-base sm:text-lg text-[#5A7A8E] leading-relaxed max-w-xl font-normal pt-1"
							>
								Ruskin Chemipharm, Mumbai founded in 1984. We provide seamless end-to-end sourcing and supply of high-quality active ingredients and raw materials for leading manufacturers in India and worldwide.
							</motion.p>

							{/* CTA Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
								className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto"
							>
								<motion.button
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push("/products")}
									className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C79A4B] text-white font-bold text-sm shadow-lg shadow-[#C79A4B]/20 hover:bg-[#B58A3E] transition-colors group w-full sm:w-auto cursor-pointer gpu-smooth"
								>
									<span>Explore 46+ DCGI APIs</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleOpenQuote("General Technical Inquiry")}
									className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white border border-[#12304A]/15 text-[#12304A] font-bold text-sm hover:bg-[#FAF7F2] hover:border-[#12304A]/30 transition-[background-color,border-color] shadow-sm w-full sm:w-auto cursor-pointer gpu-smooth"
								>
									<span>Request Quote &amp; COA</span>
								</motion.button>
							</motion.div>

							{/* Instant COA Download Trigger */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.32 }}
								className="pt-1"
							>
								<button
									onClick={handleDownloadPdf}
									className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#5A7A8E] hover:text-[#12304A] transition-colors group cursor-pointer"
								>
									<div className="w-5 h-5 rounded-full bg-[#C79A4B]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C79A4B] transition-colors">
										<Check className="w-3 h-3 text-[#C79A4B] group-hover:text-white stroke-[3] transition-colors" />
									</div>
									<span>Instant COA &amp; TDS Technical Downloads Available</span>
									<Download className="w-3.5 h-3.5 text-[#C79A4B] group-hover:translate-y-0.5 transition-transform duration-200" />
								</button>
							</motion.div>
						</div>

						{/* Right: Floating Hex Cluster — Tasteful, compact, positioned towards right side only */}
						<motion.div
							initial={{ opacity: 0, x: 25, scale: 0.96 }}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
							className="lg:col-span-5 relative flex items-center justify-center lg:justify-end py-6 lg:py-0"
						>
							<motion.div
								style={{
									rotateX: clusterRotateX,
									rotateY: clusterRotateY,
									x: clusterTranslateX,
									y: clusterTranslateY,
									transformPerspective: 1000,
								}}
								className="relative w-[300px] h-[360px] sm:w-[350px] sm:h-[410px] lg:w-[380px] lg:h-[440px] gpu-smooth flex items-center justify-center"
							>
								{/* Main Central Hexagon — Tasteful, balanced size */}
								<div className="absolute inset-0 flex items-center justify-center">
									<HexImage
										src="/images/hero-image.jpg"
										alt="Pharmaceutical Synthesis Laboratory"
										width={330}
										frame="#FFFFFF"
										frameWidth={5}
										priority={true}
										className="w-[260px] sm:w-[300px] lg:w-[330px] transition-transform duration-500 hover:scale-[1.03]"
									/>
								</div>

								{/* Top-Right Accent Hexagon */}
								<div className="absolute -top-2 right-0 sm:-top-3 sm:-right-2 lg:-top-4 lg:-right-3 z-10">
									<HexImage
										src="/images/quality.jpg"
										alt="GMP Purity Testing"
										width={140}
										frame="#C79A4B"
										frameWidth={3}
										className="w-[110px] sm:w-[125px] lg:w-[140px] transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Bottom-Right Accent Hexagon */}
								<div className="absolute bottom-1 right-0 sm:bottom-2 sm:-right-1 lg:bottom-2 lg:-right-2 z-10">
									<HexImage
										src="/images/export.jpg"
										alt="Global Export Logistics"
										width={130}
										frame="#FFFFFF"
										frameWidth={3}
										className="w-[100px] sm:w-[115px] lg:w-[130px] transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Floating Dynamic Chip: Active DCGI Molecules — Compact, neatly tucked */}
								<motion.div
									whileHover={{ scale: 1.04 }}
									className="animate-float-soft absolute -left-3 sm:-left-5 lg:-left-6 top-[32%] bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(18,48,74,0.12)] border border-[#12304A]/10 text-left cursor-default transition-shadow hover:shadow-[0_16px_32px_rgba(18,48,74,0.18)] z-20"
								>
									<div className="stat-num text-xl sm:text-2xl font-black text-[#12304A]">46+</div>
									<div className="text-[10px] text-[#C79A4B] font-bold tracking-wider uppercase">
										DCGI Active APIs
									</div>
								</motion.div>

								{/* Floating Dynamic Chip: Global Sourcing Network */}
								<motion.div
									whileHover={{ scale: 1.03 }}
									className="animate-float-soft-reverse absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-[0_12px_28px_rgba(18,48,74,0.12)] border border-[#12304A]/10 flex items-center gap-2.5 whitespace-nowrap cursor-default transition-shadow hover:shadow-[0_18px_32px_rgba(18,48,74,0.18)] z-20"
								>
									<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
									<span className="text-[11px] font-bold text-[#12304A]">
										Global Sourcing Network Active
									</span>
								</motion.div>
							</motion.div>
						</motion.div>
					</div>
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
						<path d="M0,0 Q720,38 1440,0 L1440,60 L0,60 Z" fill="#FFFFFF" />
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          3. OUR SERVICES — Editorial Interactive Accordion (Design Spec)
          ══════════════════════════════════════════════════════════ */}
			<section
				id="services"
				className="py-20 sm:py-28 bg-white relative overflow-hidden contain-section"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header Stack: Mandatory 4-part Ruskin Stack + Top-Right Circular Arrow (Matching Design Spec) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
						className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2"
					>
						<div className="space-y-3 text-left">
							{/* 1. Category Eyebrow with Gold Prefix Line */}
							<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
								<div className="w-8 h-[2px] bg-[#C79A4B]" />
								Our Services
							</span>

							{/* 2. Main Heading with Gold Span Highlight */}
							<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
								Comprehensive Pharma Services <br className="hidden sm:inline" />
								<span className="text-[#C79A4B]">Tailored to Your Pipeline</span>
							</h2>

							{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
							<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />

							{/* 4. Descriptive Subtitle */}
							<p className="text-base text-[#5A7A8E] font-normal max-w-2xl leading-relaxed">
								Five specialized capabilities connecting bulk API reactors with leading formulation facilities — fully compliant, documented, and reliably delivered.
							</p>
						</div>

						{/* Top-Right Circular Arrow directly matching the user's reference design */}
						<div className="self-start md:self-end">
							<Link
								href="/services"
								className="w-11 h-11 rounded-full border border-[#C79A4B] hover:bg-[#C79A4B] text-[#C79A4B] hover:text-white flex items-center justify-center transition-[background-color,color] duration-300 group shadow-xs cursor-pointer gpu-smooth"
								aria-label="Explore all services"
								title="Explore All Services"
							>
								<ArrowUpRight className="w-5 h-5 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</div>
					</motion.div>

					{/* Top Full-Width Divider Line */}
					<motion.div
						initial={{ opacity: 0, scaleX: 0.95 }}
						whileInView={{ opacity: 1, scaleX: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="border-t border-[#12304A]/15 w-full mt-10 sm:mt-12"
					/>

					{/* Interactive Services List with Staggered Intro Animations */}
					<div ref={servicesContainerRef} className="divide-y divide-[#12304A]/12">
						{SERVICES.map((svc, index) => {
							const isActive = activeService === svc.num;

							return (
								<motion.div
									key={svc.num}
									initial={{ opacity: 0, y: 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-40px" }}
									transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
									onClick={() => setActiveService(activeService === svc.num ? null : svc.num)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											setActiveService(activeService === svc.num ? null : svc.num);
										}
									}}
									role="button"
									tabIndex={0}
									aria-expanded={isActive}
									className={`group w-full text-left transition-[background-color,padding,border-radius] duration-300 outline-none cursor-pointer ${
										isActive
											? "py-8 sm:py-10 bg-[#FAF7F2]/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl shadow-xs"
											: "py-6 sm:py-7 hover:bg-[#FAF7F2]/60 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl"
									}`}
								>
									{/* Desktop & Tablet Layout (md and up) */}
									<div className="hidden md:flex items-start gap-8 lg:gap-12">
										{/* Column 1: Image Container */}
										<div className="w-44 sm:w-52 lg:w-56 shrink-0">
											<motion.div
												layout
												transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
												className={`relative rounded-2xl overflow-hidden border border-[#12304A]/10 transition-all duration-300 ${
													isActive
														? "h-[210px] sm:h-[230px] shadow-[0_12px_28px_rgba(18,48,74,0.12)] border-[#C79A4B]/30"
														: "h-[58px] sm:h-[64px] opacity-75 group-hover:opacity-100 shadow-sm group-hover:border-[#C79A4B]/30"
												}`}
											>
												<img
													src={svc.img}
													alt={svc.title}
													className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
												/>
												<div
													className={`absolute inset-0 bg-gradient-to-t from-[#0B1E2E]/40 to-transparent transition-opacity duration-300 ${
														isActive ? "opacity-100" : "opacity-30"
													}`}
												/>
											</motion.div>
										</div>

										{/* Column 2: Number + Handled By (matches reference image exactly) */}
										<div className="w-40 sm:w-48 lg:w-52 shrink-0">
											<div className="flex items-center gap-2">
												<span
													className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-200 ${
														isActive ? "text-[#C79A4B]" : "text-[#12304A]/70 group-hover:text-[#12304A]"
													}`}
												>
													{svc.numberStr}
												</span>
											</div>

											{/* Handled By Section — exclusively visible and animated when active */}
											<AnimatePresence initial={false}>
												{isActive && (
													<motion.div
														initial={{ opacity: 0, y: 10, height: 0 }}
														animate={{ opacity: 1, y: 0, height: "auto" }}
														exit={{ opacity: 0, y: -6, height: 0 }}
														transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
														className="pt-4 overflow-hidden"
													>
														<div className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
															{svc.handledByLabel}
														</div>
														<div className="space-y-1 pt-2">
															{svc.handledBy.map((item) => (
																<div
																	key={item}
																	className="text-xs font-medium text-[#5A7A8E] leading-tight"
																>
																	{item}
																</div>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>

										{/* Column 3: Title + Details + CTA Button */}
										<div className="flex-1 min-w-0 pr-2">
											<div className="flex items-center justify-between gap-4">
												<h3
													className={`font-extrabold tracking-tight transition-[color,transform] duration-200 ${
														isActive
															? "text-2xl sm:text-3xl text-[#12304A]"
															: "text-lg sm:text-xl text-[#12304A] group-hover:text-[#C79A4B] group-hover:translate-x-0.5"
													}`}
												>
													{svc.title}
												</h3>
												{!isActive && (
													<div className="w-9 h-9 rounded-full border border-[#C79A4B] group-hover:bg-[#C79A4B] text-[#C79A4B] group-hover:text-white flex items-center justify-center shrink-0 transition-[background-color,color] duration-300 shadow-xs">
														<ArrowUpRight className="w-4 h-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
													</div>
												)}
											</div>

											{/* Expanded Content with Smooth Framer Motion */}
											<AnimatePresence initial={false}>
												{isActive && (
													<motion.div
														initial={{ opacity: 0, y: 12, height: 0 }}
														animate={{
															opacity: 1,
															y: 0,
															height: "auto",
															transitionEnd: { overflow: "visible" },
														}}
														exit={{ opacity: 0, y: -8, height: 0, overflow: "hidden" }}
														transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
														className="space-y-5 pt-3 pb-6 overflow-hidden"
													>
														<p className="text-sm sm:text-base text-[#5A7A8E] leading-relaxed max-w-3xl font-normal">
															{svc.desc}
														</p>

														{/* Capability Specs Badges */}
														<div className="flex flex-wrap gap-2 pt-1">
															{svc.specs.map((spec) => (
																<span
																	key={spec}
																	className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#12304A]/10 text-[#12304A] shadow-xs hover:border-[#C79A4B]/40 transition-colors"
																>
																	<div className="w-1.5 h-1.5 rounded-full bg-[#C79A4B] mr-2" />
																	{spec}
																</span>
															))}
														</div>

														{/* Action Button & Link (Matching reference design "Get a Quote") */}
														<div className="flex flex-wrap items-center gap-4 pt-3 pb-3 px-1 -mx-1">
															<motion.button
																style={{ originX: 0 }}
																whileHover={{ scale: 1.03, y: -2 }}
																whileTap={{ scale: 0.98 }}
																onClick={(e) => {
																	e.stopPropagation();
																	handleOpenQuote(`Service Sourcing Inquiry: ${svc.title}`);
																}}
																className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#12304A] hover:bg-[#C79A4B] text-white font-bold text-xs uppercase tracking-wider transition-[background-color,box-shadow] duration-300 shadow-md hover:shadow-xl cursor-pointer"
															>
																<span>Get a Quote</span>
																<ArrowRight className="w-3.5 h-3.5" />
															</motion.button>

															<Link
																href={`/services#${svc.id}`}
																onClick={(e) => e.stopPropagation()}
																className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5A7A8E] hover:text-[#C79A4B] transition-colors py-2 px-1 group/spec"
															>
																<span>Detailed Specifications</span>
																<ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/spec:translate-x-0.5 group-hover/spec:-translate-y-0.5" />
															</Link>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									</div>

									{/* Mobile Layout (< md) */}
									<div className="block md:hidden">
										{!isActive ? (
											<div className="flex items-center gap-3.5">
												<div className="w-14 h-12 rounded-lg overflow-hidden shrink-0 border border-[#12304A]/10">
													<img
														src={svc.img}
														alt={svc.title}
														className="w-full h-full object-cover"
													/>
												</div>
												<span className="text-base font-bold text-[#C79A4B] shrink-0 font-sans">
													{svc.numberStr}
												</span>
												<span className="text-sm font-bold text-[#12304A] truncate flex-1">
													{svc.shortTitle}
												</span>
												<div className="w-7 h-7 rounded-full border border-[#C79A4B] group-hover:bg-[#C79A4B] text-[#C79A4B] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
													<ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
												</div>
											</div>
										) : (
											<div className="space-y-4">
												<div className="flex items-start gap-4">
													<div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-[#12304A]/10 shadow-sm">
														<img
															src={svc.img}
															alt={svc.title}
															className="w-full h-full object-cover"
														/>
													</div>
													<div className="flex-1">
														<div className="text-2xl font-extrabold text-[#C79A4B]">
															{svc.numberStr}
														</div>
														<div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8] mt-1">
															{svc.handledByLabel}
														</div>
														<div className="text-xs text-[#5A7A8E] space-y-0.5 mt-0.5">
															{svc.handledBy.map((item) => (
																<div key={item}>{item}</div>
															))}
														</div>
													</div>
												</div>

												<div>
													<h3 className="text-xl font-extrabold text-[#12304A]">
														{svc.title}
													</h3>
													<p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed mt-2">
														{svc.desc}
													</p>
												</div>

												<div className="flex flex-wrap gap-1.5 pt-1">
													{svc.specs.map((spec) => (
														<span
															key={spec}
															className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-[#12304A]/10 text-[#12304A]"
														>
															{spec}
														</span>
													))}
												</div>

												<div className="pt-2 pb-2 flex flex-col gap-2">
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleOpenQuote(`Service Sourcing Inquiry: ${svc.title}`);
														}}
														className="w-full py-3 rounded-full bg-[#12304A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
													>
														<span>Get a Quote</span>
														<ArrowRight className="w-3.5 h-3.5" />
													</button>
													<Link
														href={`/services#${svc.id}`}
														onClick={(e) => e.stopPropagation()}
														className="w-full py-2 text-center text-xs font-bold text-[#5A7A8E] hover:text-[#C79A4B]"
													>
														Detailed Specifications &rarr;
													</Link>
												</div>
											</div>
										)}
									</div>
								</motion.div>
							);
						})}
					</div>

					{/* ─── Bottom Action CTA: Explore All Services ─── */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
						className="flex items-center justify-center pt-10 sm:pt-14"
					>
						<motion.button
							whileHover={{ scale: 1.025, y: -2 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push("/services")}
							className="flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#12304A] text-white font-bold text-sm shadow-xl hover:bg-[#0B1E2E] transition-colors group cursor-pointer gpu-smooth"
						>
							<span>Explore All Comprehensive Services</span>
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
						</motion.button>
					</motion.div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          4. ABOUT US — Clean Warm Cream Background & White Cards
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				id="about"
				className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden contain-section border-t border-[#12304A]/6"
			>
				<div className="absolute bottom-0 right-0 w-[240px] opacity-10 pointer-events-none">
					<MolecularDecoration color="#12304A" opacity={1} />
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
						
						{/* Left: Building Image with Stat Card */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7 }}
							className="lg:col-span-5 relative"
						>
							<div className="relative rounded-[28px] overflow-hidden h-[380px] sm:h-[460px] lg:h-[500px] w-full shadow-2xl border border-[#12304A]/8">
								<Image
									src="/images/building.jpg"
									alt="Ruskin Chemipharm Headquarters"
									fill
									className="object-cover"
									sizes="(max-width: 1024px) 100vw, 42vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/40 to-transparent" />
							</div>

							{/* Floating Year Established */}
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.2 }}
								className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-4 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#12304A]/10 text-left"
							>
								<div className="stat-num text-2xl sm:text-3xl font-black text-[#12304A]">Est. 1984</div>
								<div className="text-[11px] text-[#C79A4B] font-bold tracking-wider mt-0.5 uppercase">
									Mumbai, India
								</div>
							</motion.div>
						</motion.div>

						{/* Right: Overview Content */}
						<div className="lg:col-span-7 space-y-6 text-left">
							<div className="space-y-3">
								<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
									<div className="w-8 h-[2px] bg-[#C79A4B]" />
									Company Overview
								</span>
								<h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#12304A] leading-tight tracking-tight">
									Bridging Global Compliance with{" "}
									<span className="text-[#C79A4B]">Precision Chemistry.</span>
								</h2>
								<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
							</div>

							<p className="text-base text-[#5A7A8E] leading-relaxed font-normal">
								Partnering with domestic and international formulation leaders to deliver
								high-yield APIs and regulatory solutions — from synthesis reactor to
								batch release, with unyielding adherence to cGMP.
							</p>

							{/* Checklist with Hex Icons */}
							<div className="space-y-3">
								{[
									"WHO–GMP & ISO 9001:2015 Certified Manufacturing Partners",
									"Complete USDMF, CEP & CDSCO Regulatory Filing Support",
									"Stringent HPLC, GC & Elemental Batch Purity Verification",
									"Temperature-Controlled, Fully Documented Global Export Supply Chain",
								].map((item, i) => (
									<motion.div
										key={item}
										initial={{ opacity: 0, x: 12 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
										className="flex items-center gap-3 text-sm text-[#12304A] font-medium"
									>
										<HexIcon size={24} bg="#12304A" className="shrink-0">
											<Check className="w-3.5 h-3.5 text-white stroke-[3]" />
										</HexIcon>
										<span>{item}</span>
									</motion.div>
								))}
							</div>

							{/* Stat Cards Row */}
							<div className="grid grid-cols-2 gap-4 pt-2">
								{[
									{ val: 40, suffix: "+", label: "Years Experience", color: "#C79A4B" },
									{ val: 250, suffix: "+", label: "Global Sourcing Partners", color: "#12304A" },
									{ val: 46, suffix: "+", label: "DCGI Approved APIs", color: "#C79A4B" },
									{ val: 200, suffix: "+", label: "Formulator Network", color: "#12304A" },
								].map((s, idx) => (
									<motion.div
										key={s.label}
										initial={{ opacity: 0, y: 16 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.45, delay: 0.2 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
										whileHover={{ y: -3, scale: 1.015 }}
										className="bg-white border border-[#12304A]/8 hover:border-[#C79A4B]/40 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-[border-color,box-shadow] duration-200 text-left cursor-default"
									>
										<div className="stat-num text-2xl sm:text-3xl font-black text-[#12304A]">
											<CountUp end={s.val} suffix={s.suffix} />
										</div>
										<div className="text-[11px] font-bold tracking-wide mt-1" style={{ color: s.color }}>
											{s.label}
										</div>
									</motion.div>
								))}
							</div>

							<div className="pt-2">
								<motion.button
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push("/about")}
									className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#12304A] text-white font-bold text-sm shadow-xl hover:bg-[#0B1E2E] transition-colors group cursor-pointer gpu-smooth"
								>
									<span>Learn More About Us</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
								</motion.button>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* ══════════════════════════════════════════════════════════
          4. PRODUCT RANGE — Cream background, Dynamic Categories
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				id="product-range"
				className="py-20 sm:py-28 relative overflow-hidden contain-section"
				style={{ background: "linear-gradient(135deg, #F5F0E8 0%, #FAF7F2 100%)" }}
			>
				<div className="absolute top-0 left-0 w-[200px] opacity-[0.06] pointer-events-none">
					<MolecularDecoration color="#12304A" opacity={1} />
				</div>
				<div className="absolute bottom-0 right-0 w-[200px] opacity-[0.06] pointer-events-none" style={{ transform: "scale(-1,-1)" }}>
					<MolecularDecoration color="#C79A4B" opacity={1} />
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					{/* Header */}
					<div className="text-center space-y-3">
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Product Range
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Product Portfolio &amp; <span className="text-[#C79A4B]">Core Categories</span>
						</h2>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />
						<p className="text-base text-[#5A7A8E] font-normal max-w-xl mx-auto">
							64+ high-purity APIs, veterinary actives, pharmaceutical excipients, dietary nutrients, and nootropics.
						</p>
					</div>

					{/* 5 Dynamic Category Cards + 1 Full Directory Card (2x3 Grid) */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{PRODUCT_CATEGORIES.map((cat, i) => {
							const Icon = CATEGORY_ICON_MAP[cat.name] || Pill;
							const isGold = i % 2 === 0;

							return (
								<motion.div
									key={cat.name}
									initial={{ opacity: 0, y: 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
									whileHover={{ y: -5 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push(`/products?category=${encodeURIComponent(cat.name)}`)}
									className="bg-white border border-[#12304A]/8 rounded-[22px] p-6 cursor-pointer group shadow-md hover:shadow-xl hover:border-[#C79A4B]/40 transition-[box-shadow,border-color] duration-300 flex flex-col justify-between min-h-[175px] text-left"
								>
									<div className="flex justify-between items-start">
										<HexIcon size={46} bg={isGold ? "rgba(199,154,75,0.12)" : "rgba(18,48,74,0.08)"} className="group-hover:scale-105 transition-transform duration-300">
											<Icon className="w-5 h-5" style={{ color: isGold ? "#C79A4B" : "#12304A" }} />
										</HexIcon>
										<div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#12304A]/5 group-hover:bg-[#C79A4B] transition-colors">
											<ArrowUpRight className="w-3.5 h-3.5 text-[#12304A] group-hover:text-white stroke-[2.5]" />
										</div>
									</div>

									<div className="space-y-1 pt-4">
										<h3 className="text-sm sm:text-base font-bold leading-snug text-[#12304A] group-hover:text-[#C79A4B] transition-colors duration-200">
											{cat.name}
										</h3>
										<div className="flex items-center gap-1.5">
											<span className="stat-num text-xs font-bold text-[#C79A4B]">
												{cat.count}
											</span>
											<span className="text-xs text-[#5A7A8E]">Active Products</span>
										</div>
									</div>
								</motion.div>
							);
						})}

						{/* 8th Card: All Catalog card */}
						<motion.div
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
							whileHover={{ y: -5 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push("/products")}
							className="bg-[#0B1E2E] text-white rounded-[22px] p-6 cursor-pointer group shadow-xl hover:shadow-2xl transition-[box-shadow,border-color] duration-300 flex flex-col justify-between min-h-[175px] text-left border border-white/10 hover:border-[#C79A4B]/40"
						>
							<div className="flex justify-between items-start">
								<HexIcon size={46} bg="rgba(199,154,75,0.25)" className="group-hover:scale-105 transition-transform duration-300">
									<Globe className="w-5 h-5 text-[#C79A4B]" />
								</HexIcon>
								<div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-[#C79A4B] transition-colors">
									<ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
								</div>
							</div>
							<div className="space-y-1 pt-4">
								<h3 className="text-sm sm:text-base font-bold leading-snug text-white">
									Complete Directory
								</h3>
								<div className="flex items-center gap-1.5 text-xs text-slate-300">
									<span className="stat-num font-bold text-[#C79A4B]">{ALL_PRODUCTS.length}</span>
									<span>Registered Molecules</span>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Action CTA */}
					<div className="flex items-center justify-center pt-2">
						<motion.button
							whileHover={{ scale: 1.025, y: -2 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push("/products")}
							className="flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#12304A] text-white font-bold text-sm shadow-xl hover:bg-[#0B1E2E] transition-colors group cursor-pointer gpu-smooth"
						>
							<span>Explore Entire Product Directory</span>
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
						</motion.button>
					</div>
				</div>
			</motion.section>

			{/* ══════════════════════════════════════════════════════════
          5. GLOBAL REACH — World Map with Live Pulse Pins
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
				className="relative bg-[#0B1E2E] py-20 sm:py-28 overflow-hidden contain-section"
			>
				{/* Wave in */}
				<div className="absolute top-0 inset-x-0 -mt-px">
					<svg
						viewBox="0 0 1440 80"
						className="w-full h-[50px] sm:h-[80px]"
						preserveAspectRatio="none"
					>
						<path d="M0,0 C480,80 960,0 1440,60 L1440,0 L0,0 Z" fill="#FAF7F2" />
					</svg>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
						className="text-center space-y-3"
					>
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Global Reach
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white leading-tight tracking-tight">
							Ruskin’s <span className="text-[#C79A4B]">Global Sourcing Network</span>
						</h2>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />
						<p className="text-base text-slate-300 font-normal max-w-xl mx-auto">
							Supplying pharmaceutical formulators in 30+ countries across 5 continents with certified, compliant APIs.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						{/* Interactive Map */}
						<motion.div
							initial={{ opacity: 0, scale: 0.98, y: 20 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
							className="lg:col-span-8"
						>
							<div className="bg-white/5 border border-white/10 rounded-[24px] p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl">
								<div className="relative w-full" style={{ paddingBottom: "52%" }}>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
										alt="World Sourcing Map"
										className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
										style={{ filter: "invert(1) opacity(0.2)" }}
										loading="lazy"
										decoding="async"
									/>

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
												className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-[#071521] border border-[#C79A4B] text-white px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xl z-30 flex flex-col items-center pointer-events-none transition-[opacity,transform] duration-200 ${
													hoveredPin === pin.id ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 pointer-events-none"
												}`}
											>
												<span className="text-[#C79A4B] font-bold text-xs">{pin.label}</span>
												{pin.desc && <span className="text-[10px] text-slate-300 font-normal">{pin.desc}</span>}
												<div className="w-2 h-2 bg-[#071521] border-r border-b border-[#C79A4B] rotate-45 -mb-2 mt-0.5" />
											</div>

											{/* Pin Marker */}
											<div className="relative flex items-center justify-center">
												{pin.primary ? (
													<>
														<span className="absolute w-8 h-8 rounded-full bg-[#C79A4B]/35 animate-ping" />
														<span className="absolute w-5 h-5 rounded-full bg-[#C79A4B]/60" />
														<div className="w-4 h-4 rounded-full bg-[#C79A4B] border-2 border-white shadow-xl relative z-10 flex items-center justify-center">
															<span className="w-1.5 h-1.5 rounded-full bg-white" />
														</div>
														<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#C79A4B] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow whitespace-nowrap z-10">
															HQ
														</div>
													</>
												) : (
													<>
														<span className="absolute w-4 h-4 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-200" />
														<div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#C79A4B] border border-white shadow transition-colors duration-200 relative z-10" />
													</>
												)}
											</div>
										</div>
									))}
								</div>

								{/* Legend */}
								<div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
									<div className="flex items-center gap-2 text-xs text-slate-300">
										<div className="w-3.5 h-3.5 rounded-full bg-[#C79A4B] border-2 border-white" />
										<span className="font-semibold">Mumbai HQ</span>
									</div>
									<div className="flex items-center gap-2 text-xs text-slate-300">
										<div className="w-2.5 h-2.5 rounded-full bg-white/75 border-2 border-white" />
										<span className="font-semibold">Partner Export Hubs</span>
									</div>
									<span className="ml-auto text-xs font-extrabold text-[#C79A4B]">
										30+ Countries Served
									</span>
								</div>
							</div>
						</motion.div>

						{/* Infographic Stat Cards */}
						<div className="lg:col-span-4 space-y-3.5">
							{[
								{ icon: Globe, label: "Export Destinations", value: "30+", color: "#C79A4B" },
								{ icon: Building2, label: "Partner Facilities", value: "250+", color: "#FFFFFF" },
								{ icon: FlaskConical, label: "DCGI Molecules", value: "46+", color: "#C79A4B" },
								{ icon: Award, label: "Compliance Benchmark", value: "WHO-GMP", color: "#FFFFFF" },
								{ icon: TrendingUp, label: "Annual Supply Volume", value: "500+ MT", color: "#C79A4B" },
							].map((s, idx) => (
								<motion.div
									key={s.label}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
									whileHover={{ x: 6 }}
									className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-4 hover:border-[#C79A4B]/40 hover:bg-white/10 transition-[border-color,background-color] duration-200 text-left cursor-default"
								>
									<div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/10 group-hover:scale-105 transition-transform">
										<s.icon className="w-5 h-5" style={{ color: s.color }} />
									</div>
									<div>
										<div className="text-[11px] text-slate-400 font-semibold">{s.label}</div>
										<div className="stat-num text-xl font-bold" style={{ color: s.color }}>
											{s.value}
										</div>
									</div>
								</motion.div>
							))}
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
						<path d="M0,80 C480,0 960,80 1440,20 L1440,80 L0,80 Z" fill="white" />
					</svg>
				</div>
			</motion.section>

			{/* ══════════════════════════════════════════════════════════
          6. WHY RUSKIN — Clinical Bento Grid
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				className="py-20 sm:py-28 bg-white relative overflow-hidden text-left contain-section"
			>
				{/* Ambient background molecular accents */}
				<div className="absolute top-0 right-0 w-[360px] pointer-events-none translate-x-12 -translate-y-10 select-none opacity-[0.035]">
					<MolecularDecoration color="#12304A" opacity={1} className="w-full h-auto" />
				</div>
				<div className="absolute bottom-0 left-0 w-[320px] pointer-events-none -translate-x-12 translate-y-10 select-none opacity-[0.03]">
					<MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
					<div className="space-y-3">
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Why Ruskin Chemipharm
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Why pharmaceutical leaders <span className="text-[#C79A4B]">trust Ruskin</span>
						</h2>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
						<p className="text-base text-[#5A7A8E] font-normal max-w-3xl lg:max-w-4xl leading-relaxed">
							Connecting audited global API manufacturing with swift CDSCO drug authority approvals, validated cold-chain shipping, and batch-by-batch certified purity.
						</p>
					</div>

					{/* Unified Luxury Photo Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
						{[
							{
								img: "/images/sourcing.jpg",
								title: "Sourcing Network",
								desc: "Direct procurement from 250+ audited API synthesizers across Europe, Japan, China & India with full supply traceability.",
								span: "md:col-span-12 lg:col-span-6",
								h: "min-h-[270px] sm:min-h-[290px] lg:h-[310px]",
							},
							{
								img: "/images/quality.jpg",
								title: "Compliance Process",
								desc: "WHO-GMP, ISO 9001:2015 & USFDA compliant facilities with 100% HPLC & GC batch analytical purity verification.",
								span: "md:col-span-12 lg:col-span-6",
								h: "min-h-[270px] sm:min-h-[290px] lg:h-[310px]",
							},
							{
								img: "/images/strategic.jpg",
								title: "Supply Flexibility",
								desc: "Low MOQ flexibility, custom chemical formulation, pilot-to-commercial batch scaling, and private labeling.",
								span: "md:col-span-12 lg:col-span-4",
								h: "min-h-[250px] sm:min-h-[270px] lg:h-[285px]",
							},
							{
								img: "/images/supply.jpg",
								title: "Turnaround & Dispatch",
								desc: "Under 4-hour quote response with strategic Mumbai warehousing and express cold-chain dispatch.",
								span: "md:col-span-12 lg:col-span-4",
								h: "min-h-[250px] sm:min-h-[270px] lg:h-[285px]",
							},
							{
								img: "/images/regulatory.avif",
								title: "Regulatory Support",
								desc: "Comprehensive CDSCO import filings, USDMF & CEP dossiers, and dedicated drug authority liaison.",
								span: "md:col-span-12 lg:col-span-4",
								h: "min-h-[250px] sm:min-h-[270px] lg:h-[285px]",
							},
						].map((card, idx) => (
							<motion.div
								key={card.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-40px" }}
								transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
								whileHover={{ y: -4 }}
								className={`${card.span} relative rounded-[24px] overflow-hidden ${card.h} group cursor-pointer shadow-md hover:shadow-2xl transition-[box-shadow,border-color,transform] duration-300 border border-black/5 hover:border-[#C79A4B]/40 flex flex-col justify-end p-5 sm:p-6 lg:p-7`}
							>
								<img
									src={card.img}
									alt={card.title}
									className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
									loading="lazy"
									decoding="async"
								/>
								{/* Enhanced bottom vignette for crisp text readability while keeping upper image open */}
								<div className="absolute inset-0 bg-gradient-to-t from-[#071521] via-[#071521]/70 via-42% to-transparent group-hover:via-[#071521]/75 transition-colors duration-500" />

								{/* Bottom content */}
								<div className="relative z-10 space-y-1.5 text-left">
									<div className="flex items-center gap-2.5">
										<HexIcon size={24} bg="#C79A4B">
											<Check className="w-3 h-3 text-white stroke-[3]" />
										</HexIcon>
										<h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
											{card.title}
										</h3>
									</div>
									<p className="text-xs sm:text-[13.5px] text-slate-200/90 font-normal leading-relaxed drop-shadow-sm max-w-lg">
										{card.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.section>

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
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.94, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 12 }}
							transition={{ type: "spring", damping: 28, stiffness: 380 }}
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
							<div className="p-5 overflow-y-auto flex-1 space-y-3 custom-scrollbar text-left">
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
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 12 }}
							transition={{ type: "spring", damping: 26, stiffness: 380 }}
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
											className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-full text-xs font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
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
