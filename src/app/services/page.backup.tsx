"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";
import {
	MolecularDecoration,
	HexBadge,
	HexIcon,
	HEX_CLIP,
} from "../components/Hex";
import {
	Globe,
	FileCheck,
	ShieldCheck,
	TrendingUp,
	Truck,
	Check,
	ArrowRight,
	ArrowUpRight,
	ChevronDown,
	Building2,
	FlaskConical,
	Award,
	Download,
	X,
	CheckCircle2,
	Search,
	Layers,
	Clock,
	ThermometerSnowflake,
	ExternalLink,
	HelpCircle,
	Sparkles,
} from "lucide-react";

// ─── 5 Comprehensive Services Data ───────────────────────────────────────────
const DETAILED_SERVICES = [
	{
		id: "sourcing",
		num: 1,
		title: "Global Sourcing of APIs & Intermediates",
		tag: "Global Procurement & Vendor Auditing",
		headline:
			"Direct-From-Reactor Sourcing from 250+ Audited cGMP Synthesizers",
		desc: "We eliminate intermediary trading markups and supply volatility by connecting Indian and global pharmaceutical formulators directly with audited primary synthesis plants across India, China, Europe, and Japan.",
		img: "/images/sourcing.jpg",
		icon: Globe,
		metric: { val: "250+", label: "Audited Partner Facilities" },
		overview:
			"With nearly four decades of on-the-ground manufacturing reconnaissance, Ruskin conducts rigorous physical plant audits, evaluating reactor capacities, waste treatment protocols, environmental controls, and analytical instrumentation before onboarding any manufacturer into our network.",
		deliverables: [
			{
				title: "Direct Reactor Procurement",
				desc: "Long-term bilateral contracts directly with factory owners and primary synthesis houses, guaranteeing volume security and price advantages.",
			},
			{
				title: "Physical Site Audits & cGMP Inspection",
				desc: "Technical qualification verifying cleanrooms, reactor materials, water systems, and HVAC compliance under WHO-GMP & PIC/S guidelines.",
			},
			{
				title: "Raw Material Traceability",
				desc: "Full transparency on key starting materials (KSMs), synthetic routes, catalyst usage, and environmental compliance.",
			},
			{
				title: "Safety Stocks & Annual Volume Locking",
				desc: "Strategic annual supply agreements (ASA) with buffer stocks to insulate formulation schedules against global chemical shocks.",
			},
		],
		specs: [
			"WHO-GMP Audited",
			"PIC/S Standards",
			"Direct Factory Price",
			"Batch Traceability",
		],
	},
	{
		id: "registration",
		num: 2,
		title: "Registration & DCGI / CDSCO Approvals",
		tag: "Regulatory Affairs & Approvals",
		headline:
			"End-to-End Import Licensing & Local Agent Representation in India",
		desc: "Comprehensive navigation of the Central Drugs Standard Control Organization (CDSCO) and Drug Controller General of India (DCGI) regulatory landscape for foreign bulk drug manufacturers.",
		img: "/images/registration.jpg",
		icon: FileCheck,
		metric: { val: "50+", label: "Active DCGI Registrations" },
		overview:
			"Operating as the designated Indian Authorized Agent (Form 40 / Form 41 / Form 10), Ruskin Chemipharm oversees dossier compilation, technical query clearance, and testing at central government drug laboratories, ensuring foreign synthesizers gain compliant, uninterrupted market access.",
		deliverables: [
			{
				title: "Form 41 & Form 10 Import Registrations",
				desc: "Turnkey management of foreign manufacturing site registration certificates and import licenses under the Drugs and Cosmetics Act.",
			},
			{
				title: "New Drug Application (NDA) Filing",
				desc: "Expert representation for first-in-India molecule filings, SEC committee presentations, and expert clinical evaluations.",
			},
			{
				title: "Official Indian Authorized Agent",
				desc: "Full legal and regulatory representation for overseas chemical conglomerates, managing vigilance, renewals, and compliance notices.",
			},
			{
				title: "CDSCO Technical Query Resolution",
				desc: "Rapid technical responses with analytical validation data to eliminate regulatory stalling and compress approval timelines.",
			},
		],
		specs: [
			"Form 41 Specialist",
			"Form 10 Licensing",
			"SEC Presentations",
			"Zero-Friction Renewals",
		],
	},
	{
		id: "quality",
		num: 3,
		title: "Technical Dossiers & Quality Documentation",
		tag: "Quality Assurance & Compliance",
		headline:
			"Complete Regulatory Dossiers, Open-Part DMFs & Comprehensive Analytical COAs",
		desc: "Zero-friction regulatory documentation backup ensuring formulation laboratories clear domestic and stringent export audits (USFDA, EDQM, MHRA, TGA).",
		img: "/images/quality.jpg",
		icon: ShieldCheck,
		metric: { val: "99.8%", label: "Average Chromatographic Purity" },
		overview:
			"Every molecule delivered through Ruskin Chemipharm is accompanied by comprehensive regulatory packages. We bridge the communication gap between synthesizer analytical laboratories and formulation regulatory teams, providing complete transparency into purity profiles and potential impurities.",
		deliverables: [
			{
				title: "USDMF & EDQM CEP Open-Part Access",
				desc: "Complete Drug Master Files (Type II) and European Certificates of Suitability supporting ANDA and international regulatory filings.",
			},
			{
				title: "Nitrosamines & Genotoxic Impurity Profiling",
				desc: "Calculated risk assessments for NDMA, NDEA, and related nitrosamines in strict adherence to USFDA and EMA guidelines.",
			},
			{
				title: "Elemental Impurities & Residual Solvents",
				desc: "ICH Q3D elemental impurity reports and USP <467> residual solvent profiling via GC-MS / ICP-MS methodology.",
			},
			{
				title: "Batch-to-Batch COA Verification",
				desc: "Dual-check certificate of analysis verification matching synthesizer releases with independent third-party laboratory re-testing.",
			},
		],
		specs: [
			"USDMF Type II",
			"EDQM CEP Open-Parts",
			"ICH Q3D Impurities",
			"Nitrosamine Screened",
		],
	},
	{
		id: "distribution",
		num: 4,
		title: "Strategic Marketing & Formulation Distribution",
		tag: "Market Access & Institutional Sales",
		headline:
			"Deep Institutional Relationships with 200+ Indian Formulation Giants",
		desc: "Strategic placement of active ingredients across multinational formulation companies, contract manufacturing organizations (CMOs), and hospital supply chains.",
		img: "/images/strategic.jpg",
		icon: TrendingUp,
		metric: { val: "40+", label: "Years of Commercial Indenting" },
		overview:
			"Our sales and market development team consists of seasoned pharmaceutical professionals who understand therapeutic trends, formulation hurdles, and molecule life cycles. We do not simply sell bulk chemicals; we engineer long-term supply partnerships that drive market share for both manufacturers and formulators.",
		deliverables: [
			{
				title: "Tier-1 Formulator Penetration",
				desc: "Deep-rooted commercial access to India's top 50 pharmaceutical enterprises and specialized CMO formulations.",
			},
			{
				title: "Product Category Specialization",
				desc: "Dedicated molecule focus across Pharma, Animal Care, Excipients, Food & Nutrition, and Nootropics.",
			},
			{
				title: "Sample & Development Quantities",
				desc: "Rapid delivery of pre-launch pilot quantities and stability trial batches for R&D formulation development teams.",
			},
			{
				title: "Market Intelligence & Price Tracking",
				desc: "Actionable real-time forecasting on raw material pricing cycles, environmental shutdowns, and global capacity fluctuations.",
			},
		],
		specs: [
			"200+ Active Formulators",
			"R&D Pilot Samples",
			"Volume Forecasting",
			"Strategic Safety Stock",
		],
	},
	{
		id: "logistics",
		num: 5,
		title: "Export & Cold-Chain Pharmaceutical Logistics",
		tag: "Global Freight & Temperature Control",
		headline:
			"Validated 2–8°C Cold-Chain Air & Sea Freight to 30+ Nations Worldwide",
		desc: "Specialized pharmaceutical shipping infrastructure engineered for temperature-sensitive APIs, advance licenses, SEZ/EOU units, and expedited bonded clearance.",
		img: "/images/export.jpg",
		icon: Truck,
		metric: { val: "30+", label: "International Export Destinations" },
		overview:
			"Active pharmaceutical ingredients require strict environmental custody. Ruskin maintains validated temperature-controlled logistics corridors, from temperature-monitored refrigerated reefers at synthesis plants through customs bonded clearance to destination warehouse staging.",
		deliverables: [
			{
				title: "Validated Temperature-Controlled Packaging",
				desc: "Qualified active and passive thermal shippers maintaining strict 2°C to 8°C and -20°C deep freeze profiles throughout transit.",
			},
			{
				title: "Continuous Temperature & GPS Telemetry",
				desc: "Single-use and real-time cellular data loggers providing tamper-evident temperature excursion graphs with batch shipments.",
			},
			{
				title: "Advance Licence & SEZ/EOU Compliance",
				desc: "Full documentation support for duty exemption schemes, Advance Authorisation, SEZ clearances, and EOU dispatch protocols.",
			},
			{
				title: "Expedited Customs & Bonded Storage",
				desc: "Priority green-channel customs clearance at air cargo and sea ports with access to temperature-controlled bonded warehouses.",
			},
		],
		specs: [
			"2°C to 8°C Cold-Chain",
			"-20°C Deep Freeze",
			"GPS Live Data Logging",
			"Advance Licence SEZ",
		],
	},
];

// ─── 5-Step Ruskin Indenting Protocol Roadmap ─────────────────────────────────
const PROTOCOL_STEPS = [
	{
		step: "01",
		title: "Primary Sourcing & Site Audit",
		desc: "Direct evaluation of overseas reactor capacity, cGMP hygiene standards, environmental approvals, and manufacturer stability.",
		icon: Building2,
	},
	{
		step: "02",
		title: "CDSCO / DCGI Regulatory Filing",
		desc: "Preparation and submission of Form 41 / Form 10 import licensing dossiers with query representation before drug authorities.",
		icon: FileCheck,
	},
	{
		step: "03",
		title: "Analytical & Impurity Validation",
		desc: "Dossier review, batch chromatographic assay confirmation, nitrosamine evaluation, and open-part DMF access for formulators.",
		icon: FlaskConical,
	},
	{
		step: "04",
		title: "Bonded Cold-Chain Transit",
		desc: "Temperature-controlled freight dispatch with continuous thermal logging, customs brokerage, and buffer warehouse staging.",
		icon: Truck,
	},
	{
		step: "05",
		title: "Formulation Floor Delivery",
		desc: "Seamless dock delivery with comprehensive batch releases, ensuring zero friction in commercial formulation production.",
		icon: Award,
	},
];

// ─── Frequently Asked Questions ───────────────────────────────────────────────
const FAQS = [
	{
		q: "How does Ruskin Chemipharm qualify and audit international manufacturing sites?",
		a: "Our technical audit team conducts physical on-ground inspections of overseas chemical synthesis reactors. We evaluate plant cGMP compliance, quality control instrumentation (HPLC, GC, MS), water purification loops, air handling (HVAC), and environmental waste management before executing exclusive indenting contracts.",
	},
	{
		q: "Can Ruskin act as the Authorized Indian Agent for our foreign synthesis facility?",
		a: "Yes. Ruskin Chemipharm has over two decades of experience serving as the legal Authorized Indian Agent for major overseas chemical manufacturers (including NCPC, CSPC, and European synthesizers). We handle complete Form 41 site registrations, Form 10 import licenses, and regulatory query management under the CDSCO.",
	},
	{
		q: "What regulatory documentation is included with each commercial API delivery?",
		a: "Every batch is accompanied by the manufacturer's Certificate of Analysis (COA), Ruskin's batch verification, BSE/TSE declaration, residual solvents statement (USP <467>), elemental impurity risk evaluation (ICH Q3D), and open-part USDMF / EDQM CEP access for formulation filings.",
	},
	{
		q: "Can we request small pilot quantities for R&D stability and formulation trials?",
		a: "Yes. We regularly supply pre-launch research quantities (from grams to trial kilograms) complete with analytical COAs and working standards so formulation laboratories can conduct pilot development and accelerated stability testing.",
	},
	{
		q: "How are temperature-sensitive molecules protected during cross-border transit?",
		a: "We utilize validated thermal shippers with phase-change materials maintaining continuous 2°C to 8°C or -20°C profiles. Every cold-chain shipment includes calibrated USB / cellular data loggers that provide complete temperature history upon arrival.",
	},
];

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

export default function ServicesPage() {
	const [activeTab, setActiveTab] = useState<string>("sourcing");
	const [openFaq, setOpenFaq] = useState<number | null>(0);
	const [quoteModalOpen, setQuoteModalOpen] = useState(false);
	const [selectedServiceForQuote, setSelectedServiceForQuote] =
		useState<string>("Comprehensive Sourcing Inquiry");
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleOpenQuote = (serviceTitle: string) => {
		setSelectedServiceForQuote(serviceTitle);
		setQuoteModalOpen(true);
		setFormSubmitted(false);
	};

	const scrollToService = (id: string) => {
		setActiveTab(id);
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	useEffect(() => {
		const handleQuote = () =>
			handleOpenQuote("General Sourcing & Services Inquiry");
		window.addEventListener("ruskin:open-quote", handleQuote);
		return () => window.removeEventListener("ruskin:open-quote", handleQuote);
	}, []);

	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#12304A] selection:bg-[#C79A4B] selection:text-white font-sans">
			{/* ══════════════════════════════════════════════════════════
          1. HERO SECTION — Deep Navy with Gold Ambient Accents
          ══════════════════════════════════════════════════════════ */}
			<section className="relative bg-[#0B1E2E] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
				{/* Subtle background ambient molecular lattice (no glow) */}
				<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
					<div className="absolute top-10 right-1/4 w-[350px] h-[350px] opacity-10">
						<MolecularDecoration color="#C79A4B" opacity={1} />
					</div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center sm:text-left">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
						{/* Left Column: Heading & Value Proposition */}
						<div className="lg:col-span-7 space-y-5 text-left">
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							>
								<span className="inline-flex items-center gap-2.5 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
									<motion.div
										initial={{ width: 0, opacity: 0 }}
										animate={{ width: "2rem", opacity: 1 }}
										transition={{
											duration: 0.6,
											delay: 0.05,
											ease: [0.16, 1, 0.3, 1],
										}}
										className="h-[2px] bg-[#C79A4B] rounded-full shrink-0"
									/>
									<motion.span
										initial={{ opacity: 0, x: -6 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.12 }}
									>
										Core Capabilities &amp; Infrastructure
									</motion.span>
								</span>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 22 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.65,
									delay: 0.14,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight"
							>
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.16 }}
									className="inline-block"
								>
									World-Class API Sourcing,{" "}
								</motion.span>{" "}
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.22 }}
									className="inline-block text-[#C79A4B]"
								>
									DCGI Approvals
								</motion.span>{" "}
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.26 }}
									className="inline-block"
								>
									&amp; Cold Logistics
								</motion.span>
							</motion.h1>

							{/* Mandatory Signature Gold Accent Bar with Expansion Intro Animation */}
							<motion.div
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: "4rem", opacity: 1 }}
								transition={{
									duration: 0.75,
									delay: 0.28,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="h-[3px] rounded-full bg-[#C79A4B]"
							/>

							<motion.p
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.55,
									delay: 0.34,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="text-base text-slate-300 font-normal leading-relaxed max-w-2xl"
							>
								Bridging audited global chemical synthesis reactors with India’s leading formulation
								laboratories. Over 40 years of direct factory alliances, complete CDSCO regulatory stewardship,
								and validated cold-chain temperature preservation.
							</motion.p>

							{/* Hero CTA Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.55,
									delay: 0.4,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="flex flex-col sm:flex-row items-center gap-4 pt-2"
							>
								<motion.button
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onClick={() =>
										handleOpenQuote("Comprehensive Capabilities Consultation")
									}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C79A4B] text-white font-bold text-sm shadow-xl hover:bg-[#B58A3E] transition-all cursor-pointer"
								>
									<span>Discuss Your Sourcing Project</span>
									<ArrowRight className="w-4 h-4" />
								</motion.button>

								<motion.div
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									className="w-full sm:w-auto"
								>
									<Link
										href="/products"
										className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all cursor-pointer"
									>
										<span>Explore 46+ Registered APIs</span>
										<ArrowUpRight className="w-4 h-4 text-[#C79A4B]" />
									</Link>
								</motion.div>
							</motion.div>
						</div>

						{/* Right Column: Key Operational Metrics with Vertical Separator */}
						<div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-7 pl-0 lg:pl-8 lg:border-l lg:border-white/10 text-left">
							{[
								{ val: 40, suffix: "+", label: "Years Experience", sub: "Founded in 1984" },
								{
									val: 250,
									suffix: "+",
									label: "Global Sourcing Partners",
									sub: "Audited Synthesizers",
								},
								{
									val: 46,
									suffix: "+",
									label: "DCGI Approved APIs",
									sub: "Technical Dossiers",
								},
								{
									val: 200,
									suffix: "+",
									label: "Formulator Network",
									sub: "Top Pharma & CMO Clients",
								},
							].map((stat, idx) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 24, scale: 0.94 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									transition={{
										duration: 0.6,
										delay: 0.22 + idx * 0.1,
										ease: [0.16, 1, 0.3, 1],
									}}
									className="group cursor-default"
								>
									<div className="text-2xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-white group-hover:text-[#C79A4B] transition-colors duration-300 font-sans">
										<CountUp end={stat.val} />
										<span className="text-[#C79A4B] font-extrabold ml-0.5">{stat.suffix}</span>
									</div>
									<div className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
										{stat.label}
									</div>
									<div className="text-[11px] text-slate-400 mt-0.5">
										{stat.sub}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Bottom Wave Transition to Light Canvas with Smooth Fluid Animation */}
				<div className="absolute bottom-0 inset-x-0 -mb-px pointer-events-none overflow-hidden h-[40px] sm:h-[60px]">
					{/* Ambient fluid undulating back-wave */}
					<motion.svg
						viewBox="0 0 1440 60"
						className="absolute bottom-0 w-[110%] -left-[5%] h-full opacity-30"
						preserveAspectRatio="none"
						fill="none"
						animate={{
							x: [-15, 15, -15],
						}}
						transition={{
							repeat: Infinity,
							duration: 8,
							ease: "easeInOut",
						}}
					>
						<path
							d="M0,12 C400,48 880,8 1440,38 L1440,60 L0,60 Z"
							fill="#FAF7F2"
						/>
					</motion.svg>

					{/* Primary anchored crisp ground wave */}
					<svg
						viewBox="0 0 1440 60"
						className="relative w-full h-full"
						preserveAspectRatio="none"
						fill="none"
					>
						<path
							d="M0,0 C480,50 960,10 1440,40 L1440,60 L0,60 Z"
							fill="#FAF7F2"
						/>
					</svg>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          2. STICKY QUICK-JUMP FILTER NAV
          ══════════════════════════════════════════════════════════ */}
			<section className="sticky top-[72px] sm:top-[76px] z-40 bg-white/95 backdrop-blur-md border-b border-[#12304A]/10 py-3 shadow-xs">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
						<span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0 mr-2 hidden md:inline-block">
							Jump To:
						</span>
						{DETAILED_SERVICES.map((s) => {
							const isActive = activeTab === s.id;
							return (
								<button
									key={s.id}
									onClick={() => scrollToService(s.id)}
									className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
										isActive
											? "bg-[#12304A] text-white shadow-sm"
											: "bg-[#FAF7F2] text-[#5A7A8E] hover:bg-[#12304A]/5 hover:text-[#12304A]"
									}`}
								>
									<span
										className={`text-[10px] ${isActive ? "text-[#C79A4B]" : "text-slate-400"}`}
									>
										0{s.num}
									</span>
									<span>{s.title.split("&")[0].trim()}</span>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          3. COMPREHENSIVE SERVICE DEEP DIVES (5 Core Services)
          ══════════════════════════════════════════════════════════ */}
			<section className="py-16 sm:py-24 space-y-20 sm:space-y-32">
				{DETAILED_SERVICES.map((svc, sIdx) => {
					const Icon = svc.icon;
					const isEven = sIdx % 2 === 1;

					return (
						<article
							id={svc.id}
							key={svc.id}
							className="scroll-mt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
						>
							<div className="p-8 sm:p-12 lg:p-16 rounded-[32px] bg-white border border-[#12304A]/10 shadow-[0_12px_45px_-10px_rgba(18,48,74,0.07)] hover:border-[#C79A4B]/40 transition-all duration-300">
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
									{/* Visual Column */}
									<div
										className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
									>
										<div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-[#12304A]/10">
											<div className="aspect-[4/3] relative overflow-hidden bg-[#0B1E2E]">
												<img
													src={svc.img}
													alt={svc.title}
													className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
													loading="lazy"
													decoding="async"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2E]/80 via-transparent to-transparent" />
											</div>

											{/* Floating Stat Badge */}
											<div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between">
												<div>
													<div className="stat-num text-2xl font-black text-[#12304A]">
														{svc.metric.val}
													</div>
													<div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
														{svc.metric.label}
													</div>
												</div>
												<div className="w-10 h-10 rounded-full bg-[#12304A] flex items-center justify-center text-[#C79A4B]">
													<Icon className="w-5 h-5" />
												</div>
											</div>
										</div>

										{/* Pill Specs */}
										<div className="flex flex-wrap gap-2 mt-4">
											{svc.specs.map((spec) => (
												<span
													key={spec}
													className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[11px] font-bold text-[#12304A]"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
													{spec}
												</span>
											))}
										</div>
									</div>

									{/* Content Column */}
									<div
										className={`lg:col-span-7 space-y-6 text-left ${isEven ? "lg:order-1" : "lg:order-2"}`}
									>
										<div className="flex items-center gap-3">
											<HexBadge num={svc.num} active={true} />
											<span className="text-xs uppercase font-extrabold tracking-[0.16em] text-[#C79A4B]">
												{svc.tag}
											</span>
										</div>

										<div className="space-y-2">
											<h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight leading-tight">
												{svc.title}
											</h2>
											<p className="text-base font-semibold text-[#C79A4B]">
												{svc.headline}
											</p>
										</div>

										<p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
											{svc.overview}
										</p>

										{/* Key Deliverables Grid */}
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
											{svc.deliverables.map((item) => (
												<div
													key={item.title}
													className="p-4 rounded-xl bg-[#FAF7F2]/80 border border-[#12304A]/8 space-y-1.5 hover:bg-white hover:border-[#C79A4B]/40 transition-colors"
												>
													<div className="flex items-center gap-2">
														<HexIcon size={16} bg="#C79A4B">
															<Check className="w-2.5 h-2.5 text-white stroke-[3]" />
														</HexIcon>
														<h4 className="text-xs font-bold text-[#12304A] tracking-tight">
															{item.title}
														</h4>
													</div>
													<p className="text-[12px] text-slate-500 leading-relaxed pl-6">
														{item.desc}
													</p>
												</div>
											))}
										</div>

										{/* Action Link */}
										<div className="pt-3 flex flex-wrap items-center gap-4">
											<button
												onClick={() =>
													handleOpenQuote(`Service Consultation: ${svc.title}`)
												}
												className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#12304A] hover:bg-[#0B1E2E] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
											>
												<span>
													Request {svc.title.split(" ")[0]} Consultation
												</span>
												<ArrowRight className="w-4 h-4 text-[#C79A4B]" />
											</button>

											<Link
												href="/contact"
												className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C79A4B] hover:text-[#12304A] transition-colors"
											>
												<span>Speak to our technical team</span>
												<ArrowUpRight className="w-4 h-4" />
											</Link>
										</div>
									</div>
								</div>
							</div>
						</article>
					);
				})}
			</section>

			{/* ══════════════════════════════════════════════════════════
          4. THE RUSKIN INDENTING PROTOCOL — Workflow Pipeline
          ══════════════════════════════════════════════════════════ */}
			<section className="py-20 bg-[#12304A] text-white relative overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-[#C79A4B]">
							Seamless Delivery Protocol
						</span>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
							From Synthesizer Reactor to Formulation Cleanroom
						</h2>
						<p className="text-slate-300 text-sm sm:text-base leading-relaxed">
							A rigorous, audited 5-stage pipeline ensuring uncompromising batch
							purity, complete regulatory clearance, and seamless customs
							delivery.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
						{PROTOCOL_STEPS.map((s, idx) => {
							const StepIcon = s.icon;
							return (
								<motion.div
									key={s.step}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: idx * 0.1 }}
									className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#C79A4B]/50 transition-all text-left flex flex-col justify-between group"
								>
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<span className="stat-num text-xs font-black text-[#C79A4B] bg-[#C79A4B]/15 px-2.5 py-1 rounded-md">
												{s.step}
											</span>
											<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
												<StepIcon className="w-4 h-4" />
											</div>
										</div>
										<h3 className="text-base font-bold text-white tracking-tight">
											{s.title}
										</h3>
										<p className="text-xs text-slate-300/80 leading-relaxed">
											{s.desc}
										</p>
									</div>

									<div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
										<CheckCircle2 className="w-3 h-3" /> Verified Stage
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          5. COMPLIANCE & ACCREDITATIONS MATRIX
          ══════════════════════════════════════════════════════════ */}
			<section
				id="regulatory"
				className="py-20 bg-white border-b border-[#12304A]/10"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					<div className="text-center max-w-2xl mx-auto space-y-3">
						<span className="text-xs font-extrabold uppercase tracking-widest text-[#C79A4B]">
							Regulatory Certifications &amp; Standards
						</span>
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
							Uncompromising Compliance Infrastructure
						</h2>
						<p className="text-slate-600 text-sm sm:text-base">
							Every API, intermediate, and service provided through Ruskin
							adheres to recognized global pharmacopoeial monographs and
							authority standards.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "WHO-GMP & PIC/S Alignment",
								desc: "Partner synthesis facilities meet or exceed World Health Organization Good Manufacturing Practice standards with regular physical cGMP audits.",
								badge: "Manufacturing Standard",
							},
							{
								title: "CDSCO Form 41 & Form 10",
								desc: "Complete registration credentials under the Drugs and Cosmetics Act for foreign bulk drug manufacturers importing into the Republic of India.",
								badge: "Indian Statutory Approval",
							},
							{
								title: "USDMF (Type II) & EDQM CEP",
								desc: "Complete Drug Master File submissions and European Certificates of Suitability enabling formulators to clear USFDA and European filings.",
								badge: "Global Filing Readiness",
							},
							{
								title: "ISO 9001:2015 Quality Management",
								desc: "Certified quality management protocols covering batch documentation, supplier audits, COA validation, and escrow custody.",
								badge: "Certified Operations",
							},
							{
								title: "ICH Q3D & Nitrosamine Screening",
								desc: "Systematic impurity characterization including genotoxic nitrosamines, elemental impurities, and USP <467> residual solvents.",
								badge: "Analytical Purity",
							},
							{
								title: "GDP Validated Cold-Chain",
								desc: "Good Distribution Practice (GDP) compliant pharmaceutical freight with temperature sensors and tamper-evident packaging.",
								badge: "Logistics Protocol",
							},
						].map((item) => (
							<div
								key={item.title}
								className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/10 space-y-3 text-left hover:border-[#C79A4B]/40 hover:bg-white transition-all shadow-xs"
							>
								<div className="inline-block px-2.5 py-0.5 rounded-md bg-[#12304A]/5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
									{item.badge}
								</div>
								<h3 className="text-base font-bold text-[#12304A] tracking-tight">
									{item.title}
								</h3>
								<p className="text-xs text-slate-600 leading-relaxed">
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          6. FREQUENTLY ASKED QUESTIONS
          ══════════════════════════════════════════════════════════ */}
			<section className="py-20 bg-[#FAF7F2]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
					<div className="text-center space-y-3">
						<span className="text-xs font-extrabold uppercase tracking-widest text-[#C79A4B]">
							Formulator &amp; Supplier Inquiries
						</span>
						<h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight">
							Frequently Asked Questions
						</h2>
					</div>

					<div className="space-y-3">
						{FAQS.map((faq, idx) => {
							const isOpen = openFaq === idx;
							return (
								<div
									key={idx}
									className="rounded-2xl bg-white border border-[#12304A]/10 overflow-hidden shadow-xs transition-colors"
								>
									<button
										onClick={() => setOpenFaq(isOpen ? null : idx)}
										className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors cursor-pointer"
									>
										<span className="pr-4">{faq.q}</span>
										<ChevronDown
											className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
												isOpen ? "rotate-180 text-[#C79A4B]" : ""
											}`}
										/>
									</button>
									<AnimatePresence>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.25 }}
												className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
											>
												<p className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
													{faq.a}
												</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ══════════════════════════════════════════════════════════
          7. BOTTOM CTA BANNER
          ══════════════════════════════════════════════════════════ */}
			<CtaBanner
				onRequestQuote={() =>
					handleOpenQuote("Services Consultation & API Sourcing")
				}
			/>

			{/* Global Footer */}
			<Footer onOpenCatalog={() => (window.location.href = "/products")} />

			{/* ══════════════════════════════════════════════════════════
          8. INTERACTIVE CONSULTATION / QUOTE MODAL
          ══════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{quoteModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setQuoteModalOpen(false)}
							className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 15 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 15 }}
							className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#12304A]/10 text-left z-10 overflow-hidden"
						>
							<div className="flex items-center justify-between pb-4 border-b border-slate-100">
								<div>
									<span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
										Direct Technical Desk
									</span>
									<h3 className="text-xl font-extrabold text-[#12304A]">
										Service Sourcing Consultation
									</h3>
								</div>
								<button
									onClick={() => setQuoteModalOpen(false)}
									className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							{formSubmitted ? (
								<div className="py-10 text-center space-y-4">
									<div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
										<CheckCircle2 className="w-8 h-8" />
									</div>
									<h4 className="text-xl font-bold text-[#12304A]">
										Inquiry Successfully Dispatched
									</h4>
									<p className="text-sm text-slate-600 max-w-md mx-auto">
										Our regulatory affairs and global sourcing team has received
										your inquiry for <strong>{selectedServiceForQuote}</strong>.
										We will review your documentation requirements and contact
										you within 24 business hours.
									</p>
									<button
										onClick={() => setQuoteModalOpen(false)}
										className="px-6 py-2.5 rounded-full bg-[#12304A] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
									>
										Close
									</button>
								</div>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										setFormSubmitted(true);
									}}
									className="space-y-4 pt-4"
								>
									<div>
										<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
											Service / Area of Interest
										</label>
										<input
											type="text"
											readOnly
											value={selectedServiceForQuote}
											className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none"
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
												Your Name *
											</label>
											<input
												type="text"
												required
												placeholder="Dr. Rajesh Patel"
												className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
												Corporate Email *
											</label>
											<input
												type="email"
												required
												placeholder="r.patel@pharmaformulations.com"
												className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
												Company / Organization *
											</label>
											<input
												type="text"
												required
												placeholder="e.g. Zydus / Sun / Glenmark"
												className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
												Phone / WhatsApp
											</label>
											<input
												type="tel"
												placeholder="+91 98200 XXXXX"
												className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
									</div>

									<div>
										<label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
											Regulatory or Sourcing Requirements
										</label>
										<textarea
											rows={3}
											placeholder="Please describe molecule requirements, annual target volumes, target pharmacopoeia (IP/USP/EP), or specific DCGI approval needs..."
											className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-[#C79A4B] focus:outline-none resize-none"
										/>
									</div>

									<div className="pt-2 flex items-center justify-end gap-3">
										<button
											type="button"
											onClick={() => setQuoteModalOpen(false)}
											className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
										>
											Cancel
										</button>
										<button
											type="submit"
											className="px-7 py-3 rounded-full bg-[#C79A4B] hover:bg-[#B58A3E] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
										>
											Submit Inquiry
										</button>
									</div>
								</form>
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
