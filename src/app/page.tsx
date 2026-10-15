"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";
import GlobalEvents from "./components/GlobalEvents";
import Navbar from "./components/Navbar";
import CustomSelect from "./components/CustomSelect";
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
	TrendingUp,
	Award,
} from "lucide-react";

// ─── Animated counter ──────────────────────────────────────────────────────────
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
	const inView = useInView(ref, { once: true });
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const steps = 45;
		let step = 0;
		const timer = setInterval(() => {
			step++;
			setCount(Math.round((end * step) / steps));
			if (step >= steps) clearInterval(timer);
		}, (duration * 1000) / steps);
		return () => clearInterval(timer);
	}, [inView, end, duration]);

	return (
		<span ref={ref} className="stat-num">
			{count}
			{suffix}
		</span>
	);
}

// ─── Category Icon Mapping ────────────────────────────────────────────────────
const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
	"Contrast Media": FlaskConical,
	"Anesthetics": Syringe,
	"Antibacterials": ShieldCheck,
	"Antivirals": TestTube2,
	"Oncology": Layers,
	"Hormones": HeartPulse,
	"Vitamins & Keto-Acids": Pill,
};

// ─── 5 Core Ruskin Services ───────────────────────────────────────────────────
const SERVICES = [
	{
		num: 1,
		title: "Sourcing of APIs",
		tag: "Global Procurement",
		desc: "Sourcing of APIs, Intermediates, and specialty pharma materials from audited, world-leading cGMP manufacturers across India, China, Europe, and Japan.",
		points: [
			"250+ audited & qualified partner facilities",
			"Physical site quality inspections & vendor qualification",
			"Transparent volume pricing & direct manufacturer contracts",
		],
		metric: { val: "250+", label: "Audited Facilities" },
		icon: Globe,
		img: "/images/sourcing.jpg",
	},
	{
		num: 2,
		title: "Registration & DCGI Approvals",
		tag: "Regulatory Affairs",
		desc: "End-to-end registration of APIs & New Drug approvals with the Indian Drug Authority (CDSCO / DCGI) and international health regulatory bodies.",
		points: [
			"Form 41 & Form 10 import registration dossier management",
			"New Drug application filing & expert CDSCO query resolution",
			"Complete local agent representation for global bulk manufacturers",
		],
		metric: { val: "50+", label: "Active Registrations" },
		icon: FileCheck,
		img: "/images/registration.jpg",
	},
	{
		num: 3,
		title: "Technical Dossier & Quality Docs",
		tag: "Quality & Compliance",
		desc: "Full regulatory documentation backup — USDMF, CEP open-parts, batch COAs, and stability data ensuring zero friction in formulation filings.",
		points: [
			"Full USDMF, EDQM CEP & Tech Pack open-part access",
			"Batch-to-batch HPLC / GC purity certificate verification",
			"Nitrosamine risk evaluations, residual solvents & elemental data",
		],
		metric: { val: "99.8%", label: "Average Purity" },
		icon: ShieldCheck,
		img: "/images/quality.jpg",
	},
	{
		num: 4,
		title: "Strategic Marketing & Distribution",
		tag: "Market Access",
		desc: "Targeted marketing of active ingredients across leading Indian pharmaceutical formulation companies, CMOs, and institutional hospital networks.",
		points: [
			"Established relationships with 200+ Indian formulation giants",
			"Dedicated technical sales force with deep molecule expertise",
			"Long-term annual supply agreements & strategic safety stocks",
		],
		metric: { val: "36+", label: "Years in Market" },
		icon: TrendingUp,
		img: "/images/strategic.jpg",
	},
	{
		num: 5,
		title: "Export & Cold-Chain Logistics",
		tag: "Global Logistics",
		desc: "Full-service pharmaceutical export logistics handling advance licenses, SEZ/EOU dispatches, and temperature-controlled air & sea freight to 30+ countries.",
		points: [
			"Advance Licence, SEZ & EOU export compliance expertise",
			"Validated temperature-controlled cold-chain packaging (2–8°C / -20°C)",
			"Door-to-door bonded shipping with live GPS temperature tracking",
		],
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
	const [activeService, setActiveService] = useState(1);

	// Scroll spy for services section — strictly reflects which card is in the focal viewport
	useEffect(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const focalY = window.innerHeight * 0.42;
					let bestId = 1;
					let minDistance = Infinity;

					for (const s of SERVICES) {
						const el = document.getElementById(`service-${s.num}`);
						if (!el) continue;
						const rect = el.getBoundingClientRect();
						
						// If card covers focal zone, it's definitely the active card
						if (rect.top <= focalY && rect.bottom >= focalY) {
							bestId = s.num;
							minDistance = 0;
							break;
						}
						
						// Otherwise find the card closest to the focal zone
						const cardCenter = (rect.top + rect.bottom) / 2;
						const dist = Math.abs(cardCenter - focalY);
						if (dist < minDistance) {
							minDistance = dist;
							bestId = s.num;
						}
					}

					setActiveService(bestId);
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Initial check on mount
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleOpenCatalog = (category?: string) => {
		if (category) {
			setSelectedCategoryFilter(category);
		}
		setCatalogModalOpen(true);
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

	// Filtered catalog list for modal from real 46 ALL_PRODUCTS
	const filteredCatalog = ALL_PRODUCTS.filter((p) => {
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

	return (
		<div className="min-h-screen bg-white text-[#3E5C72] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
			<Navbar
				onOpenSearch={() => handleOpenCatalog()}
				onOpenQuote={() => handleOpenQuote("General Technical Inquiry")}
			/>

			{/* ══════════════════════════════════════════════════════════
          1. HERO — Light Cream background with Framed Hexagons
          ══════════════════════════════════════════════════════════ */}
			<section
				id="hero"
				className="relative overflow-hidden bg-[#FAF7F2] min-h-[90vh] flex flex-col justify-between pt-6"
			>
				{/* Bottom-left molecular hex decoration — sits away from text */}
				<div className="absolute bottom-28 -left-12 w-[240px] pointer-events-none select-none hidden md:block">
					<MolecularDecoration color="#12304A" opacity={0.08} />
				</div>

				{/* Top-right subtle glow */}
				<div className="absolute -top-24 right-0 w-[450px] h-[450px] rounded-full bg-[#C79A4B]/10 blur-[120px] pointer-events-none" />

				{/* Center hero content */}
				<div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-10">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl w-full mx-auto">
						
						{/* Left: Headline & Actions */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
							className="lg:col-span-7 space-y-6 text-left"
						>
							{/* Certification Pill Badge */}
							<div>
								<span className="inline-flex items-center gap-2.5 bg-white border border-[#C79A4B]/35 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase text-[#0B1E2E] shadow-sm">
									<span className="w-2 h-2 rounded-full bg-[#C79A4B] animate-pulse" />
									<ShieldCheck className="w-4 h-4 text-[#C79A4B]" />
									WHO-GMP &amp; ISO 9001:2015 Certified Partner
								</span>
							</div>

							{/* Headline Stack */}
							<div className="space-y-1">
								<h1 className="text-5xl sm:text-6xl lg:text-[68px] font-extrabold text-[#0B1E2E] leading-[1.05] tracking-tight">
									Precision
									<br />
									<span className="text-[#C79A4B]">Chemistry.</span>
								</h1>
								<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-slate-700 leading-[1.12] tracking-tight pt-1">
									Global Standards<span className="text-[#C79A4B] font-bold">.</span>
								</h2>
							</div>

							{/* Body Paragraph */}
							<p className="text-base sm:text-lg text-[#5A7A8E] leading-relaxed max-w-xl font-normal pt-1">
								Connecting India’s formulation leaders to the world’s foremost API
								manufacturers. Full DCGI registration support, batch COA verification,
								and end-to-end dossier compliance from synthesis to delivery.
							</p>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push("/products")}
									className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C79A4B] text-white font-bold text-sm shadow-lg shadow-[#C79A4B]/20 hover:bg-[#B58A3E] transition-all group w-full sm:w-auto"
								>
									<span>Explore 46+ DCGI APIs</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleOpenQuote("General Technical Inquiry")}
									className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white border border-[#12304A]/15 text-[#12304A] font-bold text-sm hover:bg-slate-50 transition-all shadow-sm w-full sm:w-auto"
								>
									<span>Request Quote &amp; COA</span>
								</motion.button>
							</div>

							{/* Instant COA Download Trigger */}
							<div className="pt-1">
								<button
									onClick={handleDownloadPdf}
									className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-600 hover:text-[#12304A] transition-colors group"
								>
									<div className="w-5 h-5 rounded-full bg-[#C79A4B]/15 flex items-center justify-center flex-shrink-0">
										<Check className="w-3 h-3 text-[#C79A4B] stroke-[3]" />
									</div>
									<span>Instant COA &amp; TDS Technical Downloads Available</span>
									<Download className="w-3.5 h-3.5 text-[#C79A4B] group-hover:translate-y-0.5 transition-transform" />
								</button>
							</div>
						</motion.div>

						{/* Right: Floating Mathematically Regular Hex Cluster */}
						<motion.div
							initial={{ opacity: 0, x: 25 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
							className="lg:col-span-5 relative flex items-center justify-center"
						>
							<motion.div
								animate={{ y: [0, -8, 0] }}
								transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
								className="relative w-[320px] h-[370px] sm:w-[380px] sm:h-[440px]"
							>
								{/* Main Central Hexagon */}
								<div className="absolute inset-0 flex items-center justify-center">
									<HexImage
										src="/images/hero-image.jpg"
										alt="Pharmaceutical Synthesis Laboratory"
										width={290}
										frame="#FFFFFF"
										frameWidth={5}
										className="transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Top-Right Accent Hexagon */}
								<div className="absolute top-0 right-1">
									<HexImage
										src="/images/quality.jpg"
										alt="GMP Purity Testing"
										width={125}
										frame="#C79A4B"
										frameWidth={3}
										className="transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Bottom-Right Accent Hexagon */}
								<div className="absolute bottom-2 right-2">
									<HexImage
										src="/images/export.jpg"
										alt="Global Export Logistics"
										width={115}
										frame="#FFFFFF"
										frameWidth={3}
										className="transition-transform duration-500 hover:scale-105"
									/>
								</div>

								{/* Floating Dynamic Chip: Active DCGI Molecules */}
								<motion.div
									animate={{ y: [0, -6, 0] }}
									transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
									className="absolute -left-5 top-1/3 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_15px_35px_rgba(18,48,74,0.12)] border border-[#12304A]/10 text-left"
								>
									<div className="stat-num text-2xl font-black text-[#12304A]">46+</div>
									<div className="text-[11px] text-[#C79A4B] font-bold tracking-wider uppercase">
										DCGI Active APIs
									</div>
								</motion.div>

								{/* Floating Dynamic Chip: Global Sourcing Network */}
								<motion.div
									animate={{ y: [0, 6, 0] }}
									transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
									className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_15px_35px_rgba(18,48,74,0.12)] border border-[#12304A]/10 flex items-center gap-3 whitespace-nowrap"
								>
									<div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
									<span className="text-xs font-bold text-[#12304A]">
										Global Sourcing Network Active
									</span>
								</motion.div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Bottom Wave Transition to Deep Navy Section */}
				<div className="relative -mb-px">
					<svg
						viewBox="0 0 1440 90"
						className="w-full h-[50px] sm:h-[80px]"
						preserveAspectRatio="none"
						fill="none"
					>
						<path d="M0,0 C360,80 1080,0 1440,50 L1440,90 L0,90 Z" fill="#0B1E2E" />
						<path
							d="M0,0 C360,80 1080,0 1440,50"
							stroke="#C79A4B"
							strokeWidth="2"
							fill="none"
							opacity="0.8"
						/>
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          2. OUR SERVICES & KEY STATS — Deep Navy background
          ══════════════════════════════════════════════════════════ */}
			<section
				id="services"
				className="relative bg-[#0B1E2E] pb-28 sm:pb-36"
			>
				{/* Ambient background glows */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[#C79A4B]/[0.08] blur-[120px]" />
					<div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#12304A] blur-[140px]" />
				</div>

				{/* Top Stats Deck — Seamlessly integrated with section background */}
				<div className="relative z-10 border-b border-white/[0.08] py-10 mb-12 sm:mb-16 bg-transparent">
					<div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
						{[
							{ val: 36, suffix: "+", label: "Years Industry Expertise" },
							{ val: 250, suffix: "+", label: "Audited Partner Facilities" },
							{ val: 46, suffix: "+", label: "Registered / In-Pipeline APIs" },
							{ val: 7, suffix: "", label: "Therapeutic Categories" },
						].map((s) => (
							<div key={s.label} className="text-center group">
								<div className="stat-num text-3xl sm:text-4xl text-[#C79A4B] font-extrabold group-hover:text-white transition-colors">
									<CountUp end={s.val} suffix={s.suffix} />
								</div>
								<div className="text-[11px] sm:text-xs text-slate-300 font-semibold tracking-wider mt-1.5 uppercase">
									{s.label}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
						
						{/* Left: Sticky Navigation & Section Intro — Stays pinned until last card */}
						<div className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
							<span className="section-pill-light">What We Do</span>
							<h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.08] tracking-tight">
								Our <span className="text-[#C79A4B]">Services</span>
							</h2>
							<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
							<p className="text-slate-300/85 leading-relaxed text-sm sm:text-base">
								Five specialized capabilities connecting bulk API reactors with
								India’s advanced pharmaceutical formulation facilities — fully
								compliant, documented, and reliably delivered.
							</p>

							{/* Interactive Scroll Spy Jump Index with fluid spring indicator */}
							<nav className="hidden lg:block space-y-1 pt-2 border-l border-white/10 relative" aria-label="Services List">
								{SERVICES.map((s) => {
									const isActive = activeService === s.num;
									return (
										<div key={s.num} className="relative">
											{isActive && (
												<motion.div
													layoutId="services-nav-active"
													className="absolute inset-0 bg-white/10 rounded-r-lg border-l-2 border-[#C79A4B]"
													transition={{ type: "spring", stiffness: 450, damping: 35 }}
												/>
											)}
											<button
												onClick={() => {
													const el = document.getElementById(`service-${s.num}`);
													if (el) {
														el.scrollIntoView({ behavior: "smooth", block: "center" });
													}
												}}
												className={`w-full group flex items-center gap-3 pl-5 py-2.5 -ml-px text-left transition-colors relative z-10 ${
													isActive
														? "text-white font-bold"
														: "text-slate-400 hover:text-slate-200"
												}`}
											>
												<span
													className={`stat-num text-xs transition-colors ${
														isActive ? "text-[#C79A4B] font-extrabold" : "text-slate-500 group-hover:text-slate-400"
													}`}
												>
													{String(s.num).padStart(2, "0")}
												</span>
												<span className="text-sm font-semibold truncate">{s.title}</span>
											</button>
										</div>
									);
								})}
							</nav>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => handleOpenQuote("Comprehensive Service Sourcing Inquiry")}
								className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C79A4B] text-white font-bold text-sm shadow-xl hover:bg-[#B58A3E] transition-all group w-full sm:w-auto"
							>
								<span>Discuss Your Sourcing Needs</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</motion.button>

							<div className="hidden lg:block w-[180px] pt-4 opacity-30">
								<MolecularDecoration color="#C79A4B" opacity={0.6} />
							</div>
						</div>

						{/* Right: Detailed 5 Service Cards */}
						<div className="lg:col-span-8 space-y-10 pb-8">
							{SERVICES.map((svc) => {
								const Icon = svc.icon;
								const isActive = activeService === svc.num;

								return (
									<article
										id={`service-${svc.num}`}
										key={svc.num}
										className={`service-card group scroll-mt-28 overflow-hidden transition-all duration-500 ${
											isActive
												? "border-white/25 shadow-2xl opacity-100"
												: "border-white/10 opacity-80 hover:opacity-100 hover:border-white/20"
										}`}
									>
										<div className="grid grid-cols-1 md:grid-cols-5">
											{/* Image with sleek overlay & seamless metric tag */}
											<div className="relative md:col-span-2 h-56 md:h-auto min-h-[250px] overflow-hidden">
												<img
													src={svc.img}
													alt={svc.title}
													className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2E]/95 via-[#0B1E2E]/30 to-transparent" />
												<div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B1E2E]/40" />
												
												{/* Metric Badge — Blends seamlessly with dark luxury theme */}
												<div className="absolute bottom-4 left-4 bg-[#0B1E2E]/85 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-2xl border border-white/15">
													<div className="stat-num text-xl sm:text-2xl font-bold text-white leading-none">
														{svc.metric.val}
													</div>
													<div className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B] mt-1">
														{svc.metric.label}
													</div>
												</div>
											</div>

											{/* Content */}
											<div className="md:col-span-3 p-7 sm:p-8 space-y-4 text-left">
												<div className="flex items-center justify-between gap-4">
													<div className="flex items-center gap-3">
														<HexBadge num={svc.num} active={isActive} />
														<span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C79A4B]">
															{svc.tag}
														</span>
													</div>
													<div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C79A4B] transition-colors">
														<Icon className="w-5 h-5 text-[#C79A4B] group-hover:text-white transition-colors" />
													</div>
												</div>

												<h3 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
													{svc.title}
												</h3>
												
												<p className="text-sm text-slate-300/85 leading-relaxed">
													{svc.desc}
												</p>

												<ul className="space-y-2 pt-1">
													{svc.points.map((pt) => (
														<li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
															<HexIcon size={18} bg="rgba(199,154,75,0.2)" className="mt-0.5">
																<Check className="w-2.5 h-2.5 text-[#C79A4B] stroke-[3]" />
															</HexIcon>
															<span>{pt}</span>
														</li>
													))}
												</ul>

												<div className="pt-2">
													<button
														onClick={() => handleOpenQuote(`Service Sourcing Inquiry: ${svc.title}`)}
														className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C79A4B] hover:text-white transition-colors group/link"
													>
														<span>Enquire about {svc.title}</span>
														<ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
													</button>
												</div>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</div>

				{/* Wave out back to White */}
				<div className="absolute bottom-0 inset-x-0 -mb-px">
					<svg
						viewBox="0 0 1440 80"
						className="w-full h-[50px] sm:h-[80px]"
						preserveAspectRatio="none"
					>
						<path d="M0,80 C480,0 960,80 1440,20 L1440,80 L0,80 Z" fill="white" />
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          3. ABOUT US — Clean White Card Layout
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				id="about"
				className="py-20 sm:py-28 bg-white relative overflow-hidden"
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
								<div className="stat-num text-2xl sm:text-3xl font-black text-[#12304A]">Est. 1990</div>
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
								].map((item) => (
									<div key={item} className="flex items-center gap-3 text-sm text-[#3E5C72] font-medium">
										<HexIcon size={24} bg="#12304A">
											<Check className="w-3.5 h-3.5 text-white stroke-[3]" />
										</HexIcon>
										<span>{item}</span>
									</div>
								))}
							</div>

							{/* Stat Cards Row */}
							<div className="grid grid-cols-2 gap-4 pt-2">
								{[
									{ val: 36, suffix: "+", label: "Years Experience", color: "#C79A4B" },
									{ val: 250, suffix: "+", label: "Global Partners", color: "#12304A" },
									{ val: 50, suffix: "+", label: "API Registrations", color: "#C79A4B" },
									{ val: 20, suffix: "+", label: "Regulatory Experts", color: "#12304A" },
								].map((s) => (
									<div
										key={s.label}
										className="bg-white border border-[#12304A]/8 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all text-left"
									>
										<div className="stat-num text-2xl sm:text-3xl font-black text-[#12304A]">
											<CountUp end={s.val} suffix={s.suffix} />
										</div>
										<div className="text-[11px] font-bold tracking-wide mt-1" style={{ color: s.color }}>
											{s.label}
										</div>
									</div>
								))}
							</div>

							<div className="pt-2">
								<button
									onClick={() => router.push("/products")}
									className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#12304A] text-white font-bold text-sm shadow-xl hover:bg-[#0E263B] transition-all group"
								>
									<span>View Full API Catalog</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</button>
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
				className="py-20 sm:py-28 relative overflow-hidden"
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
							Therapeutic Portfolio &amp; Active Categories
						</h2>
						<p className="text-base text-[#5A7A8E] font-normal max-w-xl mx-auto">
							46+ DCGI-approved and registered APIs, contrast media, oncology agents, and pharmaceutical ingredients.
						</p>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />
					</div>

					{/* 7 Dynamic Category Cards from real catalog */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
						{PRODUCT_CATEGORIES.map((cat, i) => {
							const Icon = CATEGORY_ICON_MAP[cat.name] || Pill;
							const isGold = i % 2 === 0;

							return (
								<motion.div
									key={cat.name}
									initial={{ opacity: 0, y: 18 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.05 }}
									whileHover={{ y: -5 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => router.push(`/products?category=${encodeURIComponent(cat.name)}`)}
									className="bg-white border border-[#12304A]/8 rounded-[22px] p-6 cursor-pointer group shadow-md hover:shadow-xl hover:border-[#C79A4B]/40 transition-all flex flex-col justify-between min-h-[175px] text-left"
								>
									<div className="flex justify-between items-start">
										<HexIcon size={46} bg={isGold ? "rgba(199,154,75,0.12)" : "rgba(18,48,74,0.08)"}>
											<Icon className="w-5 h-5" style={{ color: isGold ? "#C79A4B" : "#12304A" }} />
										</HexIcon>
										<div className="w-7 h-7 rounded-full flex items-center justify-center bg-[#12304A]/5 group-hover:bg-[#C79A4B] transition-colors">
											<ArrowUpRight className="w-3.5 h-3.5 text-[#12304A] group-hover:text-white stroke-[2.5]" />
										</div>
									</div>

									<div className="space-y-1 pt-4">
										<h3 className="text-sm sm:text-base font-bold leading-snug text-[#12304A] group-hover:text-[#C79A4B] transition-colors">
											{cat.name}
										</h3>
										<div className="flex items-center gap-1.5">
											<span className="stat-num text-xs font-bold text-[#C79A4B]">
												{cat.count}
											</span>
											<span className="text-xs text-[#7A93A8]">Active Products</span>
										</div>
									</div>
								</motion.div>
							);
						})}

						{/* 8th Card: All Catalog card */}
						<motion.div
							whileHover={{ y: -5 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => router.push("/products")}
							className="bg-[#12304A] text-white rounded-[22px] p-6 cursor-pointer group shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between min-h-[175px] text-left"
						>
							<div className="flex justify-between items-start">
								<HexIcon size={46} bg="rgba(199,154,75,0.25)">
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
						<button
							onClick={() => router.push("/products")}
							className="flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#12304A] text-white font-bold text-sm shadow-xl hover:bg-[#0E263B] transition-all group"
						>
							<span>Explore Entire Product Directory</span>
							<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</button>
					</div>
				</div>
			</motion.section>

			{/* ══════════════════════════════════════════════════════════
          5. GLOBAL REACH — World Map with Live Pulse Pins
          ══════════════════════════════════════════════════════════ */}
			<section className="relative bg-[#12304A] py-20 sm:py-28 overflow-hidden">
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
					<div className="text-center space-y-3">
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Global Reach
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white leading-tight tracking-tight">
							Ruskin’s <span className="text-[#C79A4B]">Global Sourcing Network</span>
						</h2>
						<p className="text-base text-slate-300 font-normal max-w-xl mx-auto">
							Supplying pharmaceutical formulators in 30+ countries across 5 continents with certified, compliant APIs.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						{/* Interactive Map */}
						<div className="lg:col-span-8">
							<div className="bg-white/5 border border-white/10 rounded-[24px] p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
								<div className="relative w-full" style={{ paddingBottom: "52%" }}>
									<img
										src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
										alt="World Sourcing Map"
										className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
										style={{ filter: "invert(1) opacity(0.2)" }}
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
												className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0B1E2E] border border-[#C79A4B] text-white px-3.5 py-1.5 rounded-xl whitespace-nowrap shadow-2xl z-30 flex flex-col items-center pointer-events-none transition-all duration-200 ${
													hoveredPin === pin.id ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 pointer-events-none"
												}`}
											>
												<span className="text-[#C79A4B] font-bold text-xs">{pin.label}</span>
												{pin.desc && <span className="text-[10px] text-slate-300 font-normal">{pin.desc}</span>}
												<div className="w-2 h-2 bg-[#0B1E2E] border-r border-b border-[#C79A4B] rotate-45 -mb-2 mt-0.5" />
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
														<span className="absolute w-4 h-4 rounded-full bg-white/20 group-hover:scale-150 transition-transform" />
														<div className="w-2.5 h-2.5 rounded-full bg-white group-hover:bg-[#C79A4B] border border-white shadow transition-colors relative z-10" />
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
						</div>

						{/* Infographic Stat Cards */}
						<div className="lg:col-span-4 space-y-3.5">
							{[
								{ icon: Globe, label: "Export Destinations", value: "30+", color: "#C79A4B" },
								{ icon: Building2, label: "Partner Facilities", value: "250+", color: "#FFFFFF" },
								{ icon: FlaskConical, label: "DCGI Molecules", value: "46+", color: "#C79A4B" },
								{ icon: Award, label: "Compliance Benchmark", value: "WHO-GMP", color: "#FFFFFF" },
								{ icon: TrendingUp, label: "Annual Supply Volume", value: "500+ MT", color: "#C79A4B" },
							].map((s) => (
								<div
									key={s.label}
									className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center gap-4 hover:border-[#C79A4B]/40 hover:bg-white/10 transition-all text-left"
								>
									<div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/10">
										<s.icon className="w-5 h-5" style={{ color: s.color }} />
									</div>
									<div>
										<div className="text-[11px] text-slate-400 font-semibold">{s.label}</div>
										<div className="stat-num text-xl font-bold" style={{ color: s.color }}>
											{s.value}
										</div>
									</div>
								</div>
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
			</section>

			{/* ══════════════════════════════════════════════════════════
          6. WHY RUSKIN — Bento Grid
          ══════════════════════════════════════════════════════════ */}
			<motion.section
				initial={{ opacity: 0, y: 25 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.6 }}
				className="py-20 sm:py-28 bg-white relative overflow-hidden text-left"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					<div className="space-y-3">
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Why Ruskin Chemipharm
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Why pharmaceutical leaders <span className="text-[#C79A4B]">trust Ruskin</span>
						</h2>
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
						<p className="text-base text-[#5A7A8E] font-normal max-w-2xl leading-relaxed">
							Connecting audited global API manufacturing with swift CDSCO drug authority approvals, validated cold-chain shipping, and batch-by-batch certified purity.
						</p>
					</div>

					{/* Bento Grid */}
					<div className="grid grid-cols-1 md:grid-cols-12 gap-5">
						{[
							{
								img: "/images/quality.jpg",
								title: "Uncompromising Quality & Compliance",
								desc: "Full batch-to-batch documentation, analytical purity verification, and cGMP compliance standard across every global shipment.",
								span: "md:col-span-7",
								h: "h-[300px]",
							},
							{
								img: "/images/supply.jpg",
								title: "Supply Chain Reliability",
								desc: "Continuous stock availability with strategic warehousing in Mumbai to shield your formulation pipeline from shortages.",
								span: "md:col-span-5",
								h: "h-[300px]",
							},
							{
								img: "/images/sourcing.jpg",
								title: "Direct Global Sourcing",
								desc: "Established relationships with top audited manufacturers in Europe, Japan, China, and India.",
								span: "md:col-span-4",
								h: "h-[250px]",
							},
							{
								img: "/images/regulatory.avif",
								title: "Regulatory Excellence",
								desc: "End-to-end dossier support, CDSCO import registrations, DMF submissions, and customs clearance.",
								span: "md:col-span-4",
								h: "h-[250px]",
							},
							{
								img: "/images/strategic.jpg",
								title: "Strategic Partnerships",
								desc: "Long-term collaboration backed by 36+ years of industry credibility and deep supply chain visibility.",
								span: "md:col-span-4",
								h: "h-[250px]",
							},
						].map((card) => (
							<motion.div
								key={card.title}
								whileHover={{ y: -5 }}
								className={`${card.span} relative rounded-[24px] overflow-hidden ${card.h} group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300`}
							>
								<img
									src={card.img}
									alt={card.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/90 via-[#12304A]/40 to-transparent" />
								<div className="absolute bottom-0 left-0 p-6 space-y-2 text-left">
									<HexIcon size={28} bg="#C79A4B">
										<Check className="w-3.5 h-3.5 text-white stroke-[3]" />
									</HexIcon>
									<h3 className="text-xl font-bold text-white tracking-tight">{card.title}</h3>
									<p className="text-xs text-slate-200/90 font-normal leading-relaxed">{card.desc}</p>
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
							initial={{ opacity: 0, scale: 0.95, y: -8 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -8 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
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
									className="p-1 rounded-full text-[#7A93A8] hover:text-[#12304A] hover:bg-[#12304A]/5 transition-colors shrink-0"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Search & Filter Bar */}
							<div className="px-5 py-3 border-b border-[#12304A]/8 flex gap-2.5 shrink-0 bg-[#FAF7F2]">
								<div className="relative flex-1">
									<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A93A8]" />
									<input
										type="text"
										placeholder="Search by API compound name or CAS No..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="w-full pl-9 pr-3 py-2 rounded-xl text-[#12304A] placeholder-[#B0C4D4] focus:outline-none text-xs bg-white border border-[#12304A]/10 focus:border-[#C79A4B]"
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
											className="rounded-2xl p-4 border border-[#12304A]/8 bg-white hover:border-[#C79A4B]/40 hover:shadow-md transition-all flex flex-col gap-2"
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
												<div className="text-[11px] text-[#7A93A8] mt-0.5 font-mono">
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
							className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(480px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-[0_25px_70px_rgba(18,48,74,0.35)] border border-[#12304A]/10 text-left"
						>
							<button
								onClick={() => setQuoteModalOpen(false)}
								className="absolute top-4 right-4 text-[#7A93A8] hover:text-[#12304A] p-1.5 rounded-full hover:bg-[#12304A]/5 z-10 transition-colors"
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
										<p className="text-xs text-[#7A93A8] mt-1">
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
												className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#B0C4D4] border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
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
													className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#B0C4D4] border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
												/>
											</div>
											<div>
												<label className="block text-[11px] font-bold text-[#12304A] mb-1">
													Estimated Quantity
												</label>
												<input
													type="text"
													placeholder="e.g. 500 Kg / 1 MT"
													className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#B0C4D4] border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
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
												className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none resize-none placeholder-[#B0C4D4] border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2]"
											/>
										</div>

										<motion.button
											whileHover={{ scale: 1.01 }}
											whileTap={{ scale: 0.98 }}
											type="submit"
											disabled={isSubmitting}
											className="w-full bg-[#12304A] hover:bg-[#0E263B] disabled:bg-[#12304A]/80 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
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
											className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-full text-xs font-bold transition-all shadow-md"
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
