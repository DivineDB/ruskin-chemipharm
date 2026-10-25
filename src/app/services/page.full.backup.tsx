"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	motion,
	AnimatePresence,
	useInView,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";
import {
	MolecularDecoration,
	HexBadge,
	HexIcon,
	hexPoints,
} from "../components/Hex";
import {
	Globe,
	FileCheck,
	ShieldCheck,
	Truck,
	Check,
	ArrowRight,
	ArrowUpRight,
	ChevronDown,
	Building2,
	FlaskConical,
	Award,
	X,
	CheckCircle2,
	Copy,
	Send,
	Loader2,
	MessageCircle,
	Sparkles,
	Clock,
	Layers,
	ThermometerSnowflake,
} from "lucide-react";

// ─── Floating Geometric Hexagon (Hero Cursor Parallax) ─────────────────────────
function FloatingHex({
	size,
	color,
	opacity,
	strokeWidth = 1.5,
	hasInner = false,
	hasDot = false,
	className = "",
}: {
	size: number;
	color: string;
	opacity: number;
	strokeWidth?: number;
	hasInner?: boolean;
	hasDot?: boolean;
	className?: string;
}) {
	const cx = size / 2;
	const cy = size / 2;
	const r = (size - 4) / 2;
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className={className}
			style={{ opacity }}
			fill="none"
			aria-hidden="true"
		>
			<polygon
				points={hexPoints(cx, cy, r)}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinejoin="round"
			/>
			{hasInner && (
				<polygon
					points={hexPoints(cx, cy, r * 0.52)}
					stroke={color}
					strokeWidth={strokeWidth * 0.8}
					fill="none"
					strokeLinejoin="round"
					opacity="0.7"
				/>
			)}
			{hasDot && <circle cx={cx} cy={cy} r="2" fill={color} opacity="0.8" />}
		</svg>
	);
}

// ─── Direct DOM Animated Counter (Smooth Zero-Rerender) ──────────────────────
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

// ─── The 4 Core Service Pillars (Directly Aligned with Google Doc) ────────────
const CORE_PILLARS = [
	{
		id: "sourcing",
		num: 1,
		numberStr: "01.",
		title: "Global Sourcing & Synthesis Auditing",
		shortTitle: "Global Sourcing & Audits",
		tag: "Direct Reactor Access & Vendor Qualification",
		headline: "Direct-From-Reactor Volume Contracts with 250+ Audited cGMP Synthesizers",
		desc: "Direct bilateral agreements with primary API and key starting material (KSM) synthesizers across India, China, Europe, and Japan. Eliminates multi-tier trading markups, guarantees batch integrity, and secures dedicated reactor capacity.",
		img: "/images/sourcing.webp",
		icon: Globe,
		metric: { val: "250+", label: "Audited cGMP Synthesizers" },
		overview:
			"With nearly four decades of on-the-ground manufacturing reconnaissance since 1984, Ruskin conducts physical plant audits evaluating reactor metallurgy, cleanrooms, water loops, waste treatment, and analytical capabilities before onboarding any manufacturer.",
		deliverables: [
			{
				title: "Direct Reactor Volume Contracts",
				desc: "Long-term bilateral contracts directly with factory owners and primary synthesis houses, securing dedicated capacity and transparent factory pricing.",
			},
			{
				title: "Physical cGMP Site Audits",
				desc: "Comprehensive technical qualification verifying cleanrooms, reactor metallurgy, water systems, and HVAC under WHO-GMP & PIC/S guidelines.",
			},
			{
				title: "KSM & Raw Material Traceability",
				desc: "End-to-end transparency on Key Starting Materials (KSMs), synthesis pathways, catalyst usage, and environmental compliance.",
			},
			{
				title: "Annual Supply Agreements (ASA)",
				desc: "Strategic safety buffer stock management insulating formulation pipelines against raw material volatility and global chemical shocks.",
			},
		],
		specs: ["WHO-GMP Audited", "PIC/S Standards", "Direct Factory Price", "Full Batch Traceability"],
	},
	{
		id: "registration",
		num: 2,
		numberStr: "02.",
		title: "Regulatory Affairs & CDSCO / DCGI Registrations",
		shortTitle: "CDSCO & DCGI Registrations",
		tag: "Statutory Import Licensing & Authorized Representation",
		headline: "Turnkey Form 41 & Form 10 Approvals as Designated Indian Authorized Agent",
		desc: "Acting as the official Indian Authorized Agent for overseas bulk chemical manufacturers under the Drugs and Cosmetics Act. Turnkey management of technical dossiers, authority queries, and laboratory validations.",
		img: "/images/registration.webp",
		icon: FileCheck,
		metric: { val: "50+", label: "Active DCGI Approvals" },
		overview:
			"Operating as the designated Indian Authorized Agent (Form 40 / Form 41 / Form 10), Ruskin Chemipharm oversees dossier compilation, technical query defense, and sample testing at central drug laboratories, ensuring compliant, uninterrupted market access.",
		deliverables: [
			{
				title: "Form 41 & Form 10 Turnkey Licensing",
				desc: "Turnkey management of foreign manufacturing site registration certificates and import licenses under the Drugs and Cosmetics Act.",
			},
			{
				title: "Official Indian Authorized Agent",
				desc: "Full legal and statutory representation for overseas chemical conglomerates, managing pharmacovigilance, renewals, and compliance notices.",
			},
			{
				title: "New Drug Applications (NDA) & SEC Defense",
				desc: "Expert representation for first-in-India molecule filings, SEC committee presentations, and expert clinical evaluations.",
			},
			{
				title: "Technical Query Resolution Desk",
				desc: "Rapid technical clearance with validated chromatographic data to resolve CDSCO queries without timeline slippage.",
			},
		],
		specs: ["Form 41 Specialists", "Form 10 Licensing", "SEC Defense", "Zero-Friction Renewals"],
	},
	{
		id: "quality",
		num: 3,
		numberStr: "03.",
		title: "Quality Assurance, USDMF & Technical Dossiers",
		shortTitle: "USDMF & Technical Dossiers",
		tag: "Complete Monograph & Impurity Validation",
		headline: "Open-Part USDMF, EDQM CEP & Comprehensive Analytical COA Packages",
		desc: "Zero-friction regulatory documentation packages enabling Indian and global formulation laboratories to pass domestic and stringent export audits (USFDA, EDQM, MHRA, TGA).",
		img: "/images/quality.webp",
		icon: ShieldCheck,
		metric: { val: "99.8%", label: "Chromatographic Purity" },
		overview:
			"Every molecule delivered through Ruskin Chemipharm is backed by comprehensive regulatory packages. We bridge the communication gap between synthesizer analytical laboratories and formulation regulatory teams, providing complete transparency into purity profiles and potential impurities.",
		deliverables: [
			{
				title: "USDMF & EDQM CEP Open-Part Access",
				desc: "Complete Drug Master Files (Type II) and European Certificates of Suitability supporting ANDA and international market dossiers.",
			},
			{
				title: "Nitrosamines & Genotoxic Profiling",
				desc: "Calculated risk assessments for NDMA, NDEA, and related nitrosamines in strict adherence to USFDA and EMA safety thresholds.",
			},
			{
				title: "ICH Q3D & Residual Solvents Analysis",
				desc: "Elemental impurity assessments and USP <467> residual solvent profiling via GC-MS and ICP-MS methodology.",
			},
			{
				title: "Dual Batch-to-Batch COA Verification",
				desc: "Dual-check certificate of analysis verification matching synthesizer releases with independent third-party laboratory re-testing.",
			},
		],
		specs: ["USDMF Type II", "EDQM CEP Open-Part", "ICH Q3D Impurities", "Nitrosamine Screened"],
	},
	{
		id: "logistics",
		num: 4,
		numberStr: "04.",
		title: "Temperature-Controlled Cold-Chain & Global Logistics",
		shortTitle: "Cold-Chain Logistics",
		tag: "GDP-Compliant Freight & Customs Clearance",
		headline: "Validated 2–8°C Cold-Chain Air & Sea Freight to 30+ Nations Worldwide",
		desc: "End-to-end unbroken temperature custody for sensitive biologicals, APIs, and specialty intermediates from international manufacturing ports to destination warehouse staging.",
		img: "/images/export.webp",
		icon: Truck,
		metric: { val: "30+", label: "Export Destinations" },
		overview:
			"Active pharmaceutical ingredients demand unbroken environmental custody. Ruskin maintains validated temperature-controlled logistics corridors, from refrigerated reefers at primary synthesis plants through customs bonded clearance to destination warehouse staging.",
		deliverables: [
			{
				title: "Validated Temperature-Controlled Packaging",
				desc: "Qualified active and passive thermal shippers maintaining strict 2°C to 8°C and -20°C deep freeze conditions throughout transit.",
			},
			{
				title: "Continuous Cellular GPS Telemetry",
				desc: "Real-time and USB data loggers providing tamper-evident temperature excursion records accompanying every batch.",
			},
			{
				title: "Advance Licence & SEZ Compliance",
				desc: "Complete documentation stewardship for duty exemption schemes, Advance Authorisation, SEZ clearances, and EOU dispatch protocols.",
			},
			{
				title: "Expedited Customs & Bonded Warehousing",
				desc: "Priority green-channel customs clearance at air cargo terminals and seaports with access to climate-controlled bonded storage.",
			},
		],
		specs: ["2°C to 8°C Cold-Chain", "-20°C Deep Freeze", "GPS Live Telemetry", "Advance Licence / SEZ"],
	},
];

// ─── 5-Step Sourcing & Delivery Protocol ──────────────────────────────────────
const PROTOCOL_STEPS = [
	{
		step: "01",
		title: "Primary Sourcing & Site cGMP Audit",
		desc: "Direct evaluation of overseas reactor metallurgy, capacities, environmental approvals, and plant financial stability.",
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
		desc: "Chromatographic purity assay confirmation, nitrosamine evaluation, and open-part DMF access for formulators.",
		icon: FlaskConical,
	},
	{
		step: "04",
		title: "GDP Cold-Chain Freight & Clearance",
		desc: "Temperature-controlled freight dispatch with continuous thermal logging, customs brokerage, and buffer warehouse staging.",
		icon: Truck,
	},
	{
		step: "05",
		title: "Formulation Cleanroom Delivery",
		desc: "Seamless dock delivery with dual-verified release documentation and complete batch traceability for commercial production.",
		icon: Award,
	},
];

// ─── Why Ruskin Chemipharm Value Pillars (From Google Doc) ─────────────────────
const VALUE_PILLARS = [
	{
		title: "40+ Years Direct Plant Access",
		desc: "Established in 1984, eliminating broker markups through multi-decade direct alliances with primary synthesizer owners across India, China, Europe, and Japan.",
		badge: "Direct Reactor Sourcing",
		icon: Clock,
	},
	{
		title: "Authorized Indian Agent Leadership",
		desc: "Decades of proven legal representation under the Drugs and Cosmetics Act, managing complete Form 41 site registrations and Form 10 import approvals.",
		badge: "Statutory Representation",
		icon: FileCheck,
	},
	{
		title: "Rigorous Impurity Characterization",
		desc: "Every molecule accompanied by USFDA/EMA-aligned nitrosamine screening, ICH Q3D elemental impurity data, and USP <467> residual solvent profiling.",
		badge: "Purity Transparency",
		icon: ShieldCheck,
	},
	{
		title: "Unbroken Cold-Chain Stewardship",
		desc: "GDP-validated temperature-controlled logistics maintaining strict 2°C to 8°C and -20°C integrity with tamper-evident cellular telemetry.",
		badge: "Temperature Custody",
		icon: ThermometerSnowflake,
	},
];

// ─── Compliance Standards Matrix ──────────────────────────────────────────────
const COMPLIANCE_ITEMS = [
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
		title: "ISO 9001:2015 Quality Systems",
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
];

// ─── Frequently Asked Questions (From Google Doc) ─────────────────────────────
const FAQS = [
	{
		q: "How does Ruskin Chemipharm qualify and audit international manufacturing sites?",
		a: "Our technical audit team conducts physical on-ground inspections of overseas chemical synthesis plants. We evaluate plant cGMP compliance, quality control instrumentation (HPLC, GC, MS), water purification loops, air handling (HVAC), and environmental waste management before executing exclusive indenting contracts.",
	},
	{
		q: "Can Ruskin act as the Authorized Indian Agent for our foreign synthesis facility?",
		a: "Yes. Ruskin Chemipharm has over two decades of experience serving as the legal Authorized Indian Agent for major overseas chemical manufacturers. We handle complete Form 41 site registrations, Form 10 import licenses, and CDSCO query management under the Drugs and Cosmetics Act.",
	},
	{
		q: "What regulatory documentation is included with each commercial API delivery?",
		a: "Every batch is accompanied by the manufacturer's Certificate of Analysis (COA), Ruskin's batch verification report, BSE/TSE declaration, residual solvents statement (USP <467>), elemental impurity risk evaluation (ICH Q3D), and open-part USDMF / EDQM CEP access for formulation filings.",
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

export default function ServicesPage() {
	// Active Service Pillar Selection State
	const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
	const activePillar = CORE_PILLARS[activePillarIndex];

	// FAQ Accordion State
	const [openFaq, setOpenFaq] = useState<number | null>(0);

	// Consultation Modal State
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>(
		"Comprehensive Sourcing & Regulatory Consultation"
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [refId, setRefId] = useState("");
	const [copied, setCopied] = useState(false);

	// Form inputs
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [phone, setPhone] = useState("");
	const [requirements, setRequirements] = useState("");

	// ─── Subtle Banner Cursor Parallax Tracking (Exact Match with Products Page) ───
	const bannerRef = useRef<HTMLElement>(null);
	const bannerMouseX = useMotionValue(0);
	const bannerMouseY = useMotionValue(0);

	const springConfig = { damping: 36, stiffness: 65, mass: 0.6 };
	const smoothBannerX = useSpring(bannerMouseX, springConfig);
	const smoothBannerY = useSpring(bannerMouseY, springConfig);

	const layerDeepX = useTransform(smoothBannerX, [-0.5, 0.5], [-8, 8]);
	const layerDeepY = useTransform(smoothBannerY, [-0.5, 0.5], [-6, 6]);
	const layerMidX = useTransform(smoothBannerX, [-0.5, 0.5], [10, -10]);
	const layerMidY = useTransform(smoothBannerY, [-0.5, 0.5], [7, -7]);
	const layerForeX = useTransform(smoothBannerX, [-0.5, 0.5], [-14, 14]);
	const layerForeY = useTransform(smoothBannerY, [-0.5, 0.5], [-10, 10]);

	const handleBannerMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (!bannerRef.current) return;
		const rect = bannerRef.current.getBoundingClientRect();
		const normX = (e.clientX - rect.left) / rect.width - 0.5;
		const normY = (e.clientY - rect.top) / rect.height - 0.5;
		bannerMouseX.set(normX);
		bannerMouseY.set(normY);
	};

	const handleBannerMouseLeave = () => {
		bannerMouseX.set(0);
		bannerMouseY.set(0);
	};

	const handleOpenModal = (serviceTitle: string) => {
		setSelectedServiceTitle(serviceTitle);
		setModalOpen(true);
		setFormSubmitted(false);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const randomNum = Math.floor(1000 + Math.random() * 9000);
		const newId = `RUS-SRV-${randomNum}`;

		setTimeout(() => {
			setIsSubmitting(false);
			setRefId(newId);
			setFormSubmitted(true);
		}, 550);
	};

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Global event listener for quote modal
	useEffect(() => {
		const handleGlobalQuote = () => {
			handleOpenModal("General Sourcing & Regulatory Consultation");
		};
		window.addEventListener("ruskin:open-quote", handleGlobalQuote);
		return () => window.removeEventListener("ruskin:open-quote", handleGlobalQuote);
	}, []);

	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
			
			{/* ═════════════════════════════════════════════════════════════════
          1. HERO HEADER — Deep Navy Banner with Wave & Signature Ruskin Stack
          Aligned with Google Doc: "Precision Pharmaceutical Sourcing & Stewardship"
          ═════════════════════════════════════════════════════════════════ */}
			<section
				ref={bannerRef}
				onMouseMove={handleBannerMouseMove}
				onMouseLeave={handleBannerMouseLeave}
				className="relative bg-[#0B1E2E] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
			>
				{/* Floating Molecular Lattice & Hex Geometry (Cursor Parallax matching Products page) */}
				<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
					{/* Layer 1: Molecular Cluster (Bottom Right) */}
					<motion.div
						style={{ x: layerDeepX, y: layerDeepY }}
						className="absolute -right-6 sm:right-0 bottom-2 sm:bottom-4 lg:bottom-6 w-[200px] sm:w-[240px] lg:w-[270px] hidden md:block will-change-transform"
					>
						<div className="animate-float-tilt-1">
							<MolecularDecoration color="#C79A4B" opacity={0.16} className="w-full h-auto" />
						</div>
					</motion.div>

					{/* Layer 2: Counter-Motion Cluster (Top Left) */}
					<motion.div
						style={{ x: layerMidX, y: layerMidY }}
						className="absolute left-2 sm:left-6 -top-4 sm:top-2 w-[140px] sm:w-[170px] hidden sm:block will-change-transform"
					>
						<div className="animate-float-tilt-2">
							<MolecularDecoration color="#FFFFFF" opacity={0.12} className="w-full h-auto" />
						</div>
					</motion.div>

					{/* Layer 3: Floating Micro-Hexagons */}
					<motion.div
						style={{ x: layerForeX, y: layerForeY }}
						className="absolute top-14 right-[16%] hidden lg:block will-change-transform"
					>
						<div className="animate-float-hex-1">
							<FloatingHex size={26} color="#C79A4B" opacity={0.25} strokeWidth={1.2} hasDot />
						</div>
					</motion.div>

					<motion.div
						style={{ x: layerMidX, y: layerMidY }}
						className="absolute bottom-12 left-[12%] hidden sm:block will-change-transform"
					>
						<div className="animate-float-hex-2" style={{ animationDelay: "-4s" }}>
							<FloatingHex size={22} color="#FFFFFF" opacity={0.18} strokeWidth={1} />
						</div>
					</motion.div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center sm:text-left">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
						
						{/* Left Column: Heading & Value Proposition (From Google Doc) */}
						<div className="lg:col-span-7 space-y-5 text-left">
							{/* 1. Category Eyebrow with Gold Prefix Line */}
							<motion.div
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
							>
								<span className="inline-flex items-center gap-2.5 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
									<motion.div
										initial={{ width: 0, opacity: 0 }}
										animate={{ width: "2rem", opacity: 1 }}
										transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
										className="h-[2px] bg-[#C79A4B] rounded-full shrink-0"
									/>
									<motion.span
										initial={{ opacity: 0, x: -6 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.5, delay: 0.12 }}
									>
										Precision Pharmaceutical Sourcing &amp; Stewardship
									</motion.span>
								</span>
							</motion.div>

							{/* 2. Main Heading with Gold Span Highlight */}
							<motion.h1
								initial={{ opacity: 0, y: 22 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
								className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight"
							>
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.16 }}
									className="inline-block"
								>
									End-to-End API Indenting,
								</motion.span>
								<br />
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.22 }}
									className="inline-block text-[#C79A4B]"
								>
									Regulatory Registrations &amp; Cold Chain
								</motion.span>
							</motion.h1>

							{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
							<motion.div
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: "4rem", opacity: 1 }}
								transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
								className="h-[3px] rounded-full bg-[#C79A4B]"
							/>

							{/* 4. Descriptive Subtitle (From Google Doc) */}
							<motion.p
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
								className="text-base text-slate-300 font-normal leading-relaxed max-w-2xl"
							>
								From physical reactor audits across global synthesis houses to Form 41 CDSCO clearances and temperature-guarded delivery to Indian formulation cleanrooms.
							</motion.p>

							{/* Action Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
								className="flex flex-col sm:flex-row items-center gap-4 pt-2"
							>
								<motion.button
									whileHover={{ scale: 1.025, y: -2 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleOpenModal("Comprehensive Capabilities Consultation")}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C79A4B] text-white font-bold text-sm shadow-xl hover:bg-[#B58A3E] transition-all cursor-pointer"
								>
									<span>Discuss Sourcing Scope</span>
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
										<span>Explore 46+ Approved APIs</span>
										<ArrowUpRight className="w-4 h-4 text-[#C79A4B]" />
									</Link>
								</motion.div>
							</motion.div>
						</div>

						{/* Right Column: Key Operational Metrics Anchored to 1984 */}
						<div className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-7 pl-0 lg:pl-8 lg:border-l lg:border-white/10 text-left">
							{[
								{ val: 40, suffix: "+", label: "Years Experience", sub: "Founded in 1984" },
								{ val: 250, suffix: "+", label: "Audited Facilities", sub: "Global cGMP Sites" },
								{ val: 50, suffix: "+", label: "DCGI Registrations", sub: "Form 41 & Form 10" },
								{ val: 30, suffix: "+", label: "Export Corridors", sub: "Worldwide Network" },
							].map((stat, idx) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 24, scale: 0.94 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.6, delay: 0.22 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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

				{/* Bottom Wave Transition to Light Canvas (#FAF7F2) */}
				<div className="absolute bottom-0 inset-x-0 -mb-px pointer-events-none overflow-hidden h-[40px] sm:h-[60px]">
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

			{/* ═════════════════════════════════════════════════════════════════
          2. THE 4 CORE SERVICE PILLARS (Executive Master-Detail Studio)
          ═════════════════════════════════════════════════════════════════ */}
			<section className="py-14 sm:py-20 lg:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
					
					{/* Standardized 4-Part Section Header */}
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
						<div className="space-y-3 text-left">
							{/* 1. Category Eyebrow with Gold Prefix Line */}
							<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
								<div className="w-8 h-[2px] bg-[#C79A4B]" />
								Our Core Capabilities
							</span>

							{/* 2. Main Heading with Gold Span Highlight */}
							<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
								Four Core Pillars of <span className="text-[#C79A4B]">Pharmaceutical Stewardship</span>
							</h2>

							{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
							<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />

							{/* 4. Descriptive Subtitle */}
							<p className="text-base text-[#5A7A8E] font-normal max-w-2xl leading-relaxed">
								Bridging global chemical synthesis reactors with India&apos;s leading formulation enterprises — fully compliant, documented, and reliably delivered.
							</p>
						</div>

						{/* Quick Action Button */}
						<div className="self-start md:self-end">
							<button
								onClick={() => handleOpenModal("Custom Project Scope Consultation")}
								className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C79A4B] text-xs font-bold text-[#C79A4B] hover:bg-[#C79A4B] hover:text-white transition-all cursor-pointer shadow-xs"
							>
								<span>Request Sourcing Scope</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</button>
						</div>
					</div>

					{/* ─── DESKTOP MASTER-DETAIL STUDIO (4 Pillars) ─── */}
					<div className="hidden lg:grid grid-cols-12 gap-8 items-start">
						
						{/* Left Rail: 4 Service Selector Cards */}
						<div className="col-span-5 space-y-3">
							{CORE_PILLARS.map((pillar, index) => {
								const isSelected = activePillarIndex === index;
								const PillarIcon = pillar.icon;

								return (
									<button
										key={pillar.id}
										onClick={() => setActivePillarIndex(index)}
										className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex items-start gap-4 border cursor-pointer ${
											isSelected
												? "bg-white border-[#C79A4B] shadow-[0_8px_25px_-5px_rgba(18,48,74,0.08)] ring-1 ring-[#C79A4B]/20"
												: "bg-white/60 border-[#12304A]/8 hover:bg-white hover:border-[#12304A]/15 shadow-xs"
										}`}
									>
										{/* Number Indicator */}
										<div
											className={`text-sm font-extrabold transition-colors mt-0.5 shrink-0 ${
												isSelected ? "text-[#C79A4B]" : "text-[#94A3B8]"
											}`}
										>
											{pillar.numberStr}
										</div>

										{/* Content */}
										<div className="flex-1 min-w-0 space-y-1">
											<div className="flex items-center justify-between gap-2">
												<h3
													className={`text-sm sm:text-base font-bold tracking-tight truncate transition-colors ${
														isSelected ? "text-[#12304A]" : "text-[#12304A]/80"
													}`}
												>
													{pillar.shortTitle}
												</h3>
												<PillarIcon
													className={`w-4 h-4 shrink-0 transition-colors ${
														isSelected ? "text-[#C79A4B]" : "text-[#94A3B8]"
													}`}
												/>
											</div>
											<p className="text-xs text-[#5A7A8E] line-clamp-1">
												{pillar.tag}
											</p>
										</div>

										{/* Chevron Indicator */}
										<ArrowRight
											className={`w-4 h-4 shrink-0 mt-1 transition-transform duration-200 ${
												isSelected
													? "text-[#C79A4B] translate-x-1"
													: "text-transparent -translate-x-1"
											}`}
										/>
									</button>
								);
							})}
						</div>

						{/* Right Showcase: Selected Pillar Detail Card */}
						<div className="col-span-7">
							<AnimatePresence mode="wait">
								<motion.div
									key={activePillar.id}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -12 }}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									className="bg-white rounded-[28px] border border-[#12304A]/10 p-7 sm:p-9 shadow-[0_12px_40px_rgb(18,48,74,0.06)] space-y-6 text-left"
								>
									{/* Top Image Banner with Photo Vignette */}
									<div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#12304A]/10 bg-[#0B1E2E]">
										<Image
											src={activePillar.img}
											alt={activePillar.title}
											fill
											sizes="(max-width: 1200px) 100vw, 50vw"
											className="object-cover"
											priority
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-[#071521] via-[#071521]/60 via-40% to-transparent" />
										
										{/* Metric badge anchored to bottom right */}
										<div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md flex items-center gap-2">
											<div className="text-base font-extrabold text-[#12304A]">
												{activePillar.metric.val}
											</div>
											<div className="text-[10px] font-bold text-[#5A7A8E] uppercase tracking-wider">
												{activePillar.metric.label}
											</div>
										</div>

										{/* Category Tag anchored top left */}
										<div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#12304A]/80 backdrop-blur-md text-[11px] font-bold text-[#C79A4B] border border-white/10 uppercase tracking-wider">
											{activePillar.tag}
										</div>
									</div>

									{/* Title & Headline */}
									<div className="space-y-2">
										<h3 className="text-xl sm:text-2xl font-extrabold text-[#12304A] tracking-tight">
											{activePillar.title}
										</h3>
										<p className="text-sm font-semibold text-[#C79A4B]">
											{activePillar.headline}
										</p>
									</div>

									{/* Overview Text */}
									<p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed">
										{activePillar.overview}
									</p>

									{/* Deliverables Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
										{activePillar.deliverables.map((item) => (
											<div
												key={item.title}
												className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#12304A]/8 space-y-1 hover:border-[#C79A4B]/40 transition-colors"
											>
												<div className="flex items-center gap-2">
													<HexIcon size={18} bg="#C79A4B" className="text-white shrink-0">
														<Check className="w-2.5 h-2.5 stroke-[3]" />
													</HexIcon>
													<h4 className="text-xs font-bold text-[#12304A] tracking-tight">
														{item.title}
													</h4>
												</div>
												<p className="text-[11px] text-[#5A7A8E] leading-relaxed pl-6">
													{item.desc}
												</p>
											</div>
										))}
									</div>

									{/* Specs Pills + Action Row */}
									<div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#12304A]/8">
										<div className="flex flex-wrap gap-1.5">
											{activePillar.specs.map((spec) => (
												<span
													key={spec}
													className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[10px] font-bold text-[#12304A]"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
													{spec}
												</span>
											))}
										</div>

										<button
											onClick={() => handleOpenModal(`Service Inquiry: ${activePillar.title}`)}
											className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#12304A] hover:bg-[#0B1E2E] text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm shrink-0"
										>
											<span>Inquire About Pillar</span>
											<ArrowRight className="w-3.5 h-3.5 text-[#C79A4B]" />
										</button>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

					</div>

					{/* ─── MOBILE ACCORDION (4 Pillars) ─── */}
					<div className="lg:hidden space-y-3">
						{CORE_PILLARS.map((pillar, index) => {
							const isOpen = activePillarIndex === index;
							const PillarIcon = pillar.icon;

							return (
								<div
									key={pillar.id}
									className="rounded-2xl bg-white border border-[#12304A]/10 overflow-hidden shadow-xs transition-colors"
								>
									<button
										onClick={() => setActivePillarIndex(isOpen ? -1 : index)}
										className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer"
									>
										<div className="flex items-center gap-3">
											<span className="text-xs font-bold text-[#C79A4B]">
												{pillar.numberStr}
											</span>
											<div>
												<h3 className="text-sm font-bold text-[#12304A]">
													{pillar.shortTitle}
												</h3>
												<p className="text-[11px] text-[#5A7A8E]">{pillar.tag}</p>
											</div>
										</div>
										<ChevronDown
											className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 ${
												isOpen ? "rotate-180 text-[#C79A4B]" : ""
											}`}
										/>
									</button>

									<AnimatePresence initial={false}>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
												className="overflow-hidden border-t border-[#12304A]/8 p-4 sm:p-5 space-y-4 bg-[#FAF7F2]/40"
											>
												<p className="text-xs text-[#5A7A8E] leading-relaxed">
													{pillar.overview}
												</p>

												<div className="space-y-2">
													{pillar.deliverables.map((item) => (
														<div
															key={item.title}
															className="p-3 rounded-xl bg-white border border-[#12304A]/8 space-y-0.5"
														>
															<div className="flex items-center gap-2">
																<HexIcon size={16} bg="#C79A4B" className="text-white shrink-0">
																	<Check className="w-2 h-2 stroke-[3]" />
																</HexIcon>
																<h4 className="text-xs font-bold text-[#12304A]">
																	{item.title}
																</h4>
															</div>
															<p className="text-[11px] text-[#5A7A8E] pl-6 leading-relaxed">
																{item.desc}
															</p>
														</div>
													))}
												</div>

												<button
													onClick={() => handleOpenModal(`Service Inquiry: ${pillar.title}`)}
													className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#12304A] text-white font-bold text-xs"
												>
													<span>Inquire About This Service</span>
													<ArrowRight className="w-3.5 h-3.5 text-[#C79A4B]" />
												</button>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							);
						})}
					</div>

				</div>
			</section>

			{/* ═════════════════════════════════════════════════════════════════
          3. WHY RUSKIN CHEMIPHARM? (Core Value Proposition from Doc)
          ═════════════════════════════════════════════════════════════════ */}
			<section className="py-16 sm:py-20 bg-white border-y border-[#12304A]/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					
					{/* Standardized 4-Part Section Header (Centered) */}
					<div className="space-y-3 text-center max-w-3xl mx-auto">
						{/* 1. Category Eyebrow with Gold Prefix Line */}
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Institutional Advantage
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>

						{/* 2. Main Heading with Gold Span Highlight */}
						<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Why Formulators Trust <span className="text-[#C79A4B]">Ruskin Chemipharm</span>
						</h2>

						{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />

						{/* 4. Descriptive Subtitle */}
						<p className="text-base text-[#5A7A8E] font-normal leading-relaxed">
							Four decades of direct reactor access, regulatory stewardship, and analytical integrity delivering uncompromised supply security.
						</p>
					</div>

					{/* 4 Value Cards Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
						{VALUE_PILLARS.map((item, idx) => {
							const ItemIcon = item.icon;
							return (
								<motion.div
									key={item.title}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.45, delay: idx * 0.08 }}
									className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/10 space-y-3 text-left hover:border-[#C79A4B]/40 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
								>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="inline-block px-2.5 py-0.5 rounded-md bg-[#12304A]/5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
												{item.badge}
											</span>
											<div className="w-8 h-8 rounded-full bg-[#12304A] flex items-center justify-center text-[#C79A4B]">
												<ItemIcon className="w-4 h-4" />
											</div>
										</div>
										<h3 className="text-base font-bold text-[#12304A] tracking-tight">
											{item.title}
										</h3>
										<p className="text-xs text-[#5A7A8E] leading-relaxed">
											{item.desc}
										</p>
									</div>

									<div className="pt-3 border-t border-[#12304A]/8 flex items-center gap-1.5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
										<CheckCircle2 className="w-3.5 h-3.5" />
										<span>Audited Standard</span>
									</div>
								</motion.div>
							);
						})}
					</div>

				</div>
			</section>

			{/* ═════════════════════════════════════════════════════════════════
          4. THE 5-STEP SOURCING LIFECYCLE (From Google Doc)
          ═════════════════════════════════════════════════════════════════ */}
			<section className="py-16 sm:py-20 bg-[#12304A] text-white relative overflow-hidden border-y border-white/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
					
					{/* Section Header (Centered Stack) */}
					<div className="space-y-3 text-center max-w-3xl mx-auto">
						{/* 1. Category Eyebrow with Gold Prefix Line */}
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Sourcing Lifecycle
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>

						{/* 2. Main Heading with Gold Span Highlight */}
						<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight">
							From Synthesizer Reactor to <span className="text-[#C79A4B]">Cleanroom Dock</span>
						</h2>

						{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />

						{/* 4. Descriptive Subtitle */}
						<p className="text-base text-slate-300 font-normal leading-relaxed">
							A rigorous, audited 5-stage pipeline ensuring uncompromising batch purity, complete regulatory clearance under the Drugs and Cosmetics Act, and unbroken cold-chain temperature preservation.
						</p>
					</div>

					{/* 5-Step Cards Grid */}
					<div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
						{PROTOCOL_STEPS.map((step, idx) => {
							const StepIcon = step.icon;
							return (
								<motion.div
									key={step.step}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.45, delay: idx * 0.08 }}
									className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C79A4B]/50 transition-all text-left flex flex-col justify-between group"
								>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-xs font-black text-[#C79A4B] bg-[#C79A4B]/15 px-2.5 py-1 rounded-md">
												{step.step}
											</span>
											<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
												<StepIcon className="w-4 h-4" />
											</div>
										</div>
										<h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
											{step.title}
										</h3>
										<p className="text-xs text-slate-300/80 leading-relaxed font-normal">
											{step.desc}
										</p>
									</div>

									<div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
										<CheckCircle2 className="w-3.5 h-3.5" />
										<span>Stage Verified</span>
									</div>
								</motion.div>
							);
						})}
					</div>

				</div>
			</section>

			{/* ═════════════════════════════════════════════════════════════════
          5. COMPLIANCE & PHARMACOPOEIAL STANDARDS MATRIX
          ═════════════════════════════════════════════════════════════════ */}
			<section className="py-16 sm:py-20 bg-white border-b border-[#12304A]/10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
					
					{/* Section Header (Centered Stack) */}
					<div className="space-y-3 text-center max-w-3xl mx-auto">
						{/* 1. Category Eyebrow with Gold Prefix Line */}
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Statutory Quality Framework
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>

						{/* 2. Main Heading with Gold Span Highlight */}
						<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Uncompromising <span className="text-[#C79A4B]">Regulatory Compliance</span>
						</h2>

						{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />

						{/* 4. Descriptive Subtitle */}
						<p className="text-base text-[#5A7A8E] font-normal leading-relaxed">
							Every bulk active ingredient, intermediate, and indenting contract governed through Ruskin Chemipharm adheres strictly to recognized international monographs and government statutory bodies.
						</p>
					</div>

					{/* Compliance Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{COMPLIANCE_ITEMS.map((item) => (
							<div
								key={item.title}
								className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/10 space-y-2.5 text-left hover:border-[#C79A4B]/40 hover:bg-white transition-all shadow-xs"
							>
								<div className="inline-block px-2.5 py-0.5 rounded-md bg-[#12304A]/5 text-[10px] font-bold text-[#C79A4B] uppercase tracking-wider">
									{item.badge}
								</div>
								<h3 className="text-base font-bold text-[#12304A] tracking-tight">
									{item.title}
								</h3>
								<p className="text-xs text-[#5A7A8E] leading-relaxed">
									{item.desc}
								</p>
							</div>
						))}
					</div>

				</div>
			</section>

			{/* ═════════════════════════════════════════════════════════════════
          6. FREQUENTLY ASKED QUESTIONS (Accordion from Google Doc)
          ═════════════════════════════════════════════════════════════════ */}
			<section className="py-16 sm:py-20 bg-[#FAF7F2]">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
					
					{/* Section Header (Centered Stack) */}
					<div className="space-y-3 text-center max-w-3xl mx-auto">
						{/* 1. Category Eyebrow with Gold Prefix Line */}
						<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
							Formulator &amp; Supplier Inquiries
							<div className="w-8 h-[2px] bg-[#C79A4B]" />
						</span>

						{/* 2. Main Heading with Gold Span Highlight */}
						<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
							Frequently Asked <span className="text-[#C79A4B]">Questions</span>
						</h2>

						{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
						<div className="w-16 h-[3px] rounded-full bg-[#C79A4B] mx-auto" />

						{/* 4. Descriptive Subtitle */}
						<p className="text-base text-[#5A7A8E] font-normal leading-relaxed">
							Common inquiries regarding foreign manufacturer representation, analytical dossier clearance, R&amp;D sample dispatch, and cold-chain temperature monitoring.
						</p>
					</div>

					{/* Accordion List */}
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
											className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform duration-300 ${
												isOpen ? "rotate-180 text-[#C79A4B]" : ""
											}`}
										/>
									</button>
									<AnimatePresence initial={false}>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
												className="overflow-hidden border-t border-[#12304A]/6 bg-[#FAF7F2]/50"
											>
												<p className="p-5 text-xs sm:text-sm text-[#5A7A8E] leading-relaxed font-normal">
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

			{/* ═════════════════════════════════════════════════════════════════
          7. BOTTOM CTA BANNER & FOOTER
          ═════════════════════════════════════════════════════════════════ */}
			<CtaBanner
				onRequestQuote={() =>
					handleOpenModal("Comprehensive Sourcing & Regulatory Consultation")
				}
			/>

			<Footer onOpenCatalog={() => (window.location.href = "/products")} />

			{/* ═════════════════════════════════════════════════════════════════
          8. INTERACTIVE CONSULTATION / QUOTE MODAL
          ═════════════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{modalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setModalOpen(false)}
							className="absolute inset-0 bg-black/60 backdrop-blur-xs"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.96, y: 12 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.96, y: 12 }}
							transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
							className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#12304A]/10 text-left z-10 overflow-hidden"
						>
							<div className="flex items-center justify-between pb-4 border-b border-[#12304A]/8">
								<div>
									<span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
										Direct Commercial &amp; Regulatory Desk
									</span>
									<h3 className="text-xl font-extrabold text-[#12304A]">
										Service Sourcing Consultation
									</h3>
								</div>
								<button
									onClick={() => setModalOpen(false)}
									className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#12304A]/5 flex items-center justify-center text-[#5A7A8E] transition-colors cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							{formSubmitted ? (
								<div className="py-8 text-center space-y-4">
									<div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
										<CheckCircle2 className="w-7 h-7" />
									</div>
									<div className="space-y-1">
										<h4 className="text-lg font-bold text-[#12304A]">
											Inquiry Successfully Assigned
										</h4>
										<p className="text-xs sm:text-sm text-[#5A7A8E] max-w-md mx-auto leading-relaxed">
											Thank you, <strong className="text-[#12304A]">{name || "Partner"}</strong>. Your technical scope inquiry for <strong>{selectedServiceTitle}</strong> has been routed to our Mumbai desk.
										</p>
									</div>

									{/* Tracking reference card */}
									<div className="bg-[#FAF7F2] border border-[#12304A]/10 rounded-xl p-3 max-w-sm mx-auto text-left space-y-1">
										<div className="flex items-center justify-between text-xs text-[#5A7A8E]">
											<span>Tracking Reference:</span>
											<button
												type="button"
												onClick={() => handleCopy(refId)}
												className="inline-flex items-center gap-1 font-bold text-[#C79A4B] hover:underline cursor-pointer"
											>
												{copied ? (
													<>
														<Check className="w-3 h-3 text-emerald-500" />
														<span className="text-emerald-500">Copied</span>
													</>
												) : (
													<>
														<Copy className="w-3 h-3" />
														<span>Copy</span>
													</>
												)}
											</button>
										</div>
										<div className="font-mono text-xs font-bold text-[#12304A] bg-white px-3 py-1.5 rounded-lg border border-[#12304A]/10">
											{refId}
										</div>
									</div>

									<div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
										<a
											href={`https://wa.me/919322226307?text=${encodeURIComponent(
												`Hello Ruskin Chemipharm Desk, I submitted an inquiry with Reference ID: ${refId}.`
											)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
										>
											<MessageCircle className="w-3.5 h-3.5" />
											<span>Instant WhatsApp Follow-up</span>
										</a>
										<button
											onClick={() => setModalOpen(false)}
											className="px-5 py-2 rounded-full bg-[#12304A] text-white font-bold text-xs cursor-pointer"
										>
											Close
										</button>
									</div>
								</div>
							) : (
								<form onSubmit={handleFormSubmit} className="space-y-3.5 pt-4">
									<div>
										<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
											Service Scope / Area of Interest
										</label>
										<input
											type="text"
											readOnly
											value={selectedServiceTitle}
											className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#12304A]/10 text-xs font-semibold text-[#12304A] focus:outline-none"
										/>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div>
											<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
												Your Name *
											</label>
											<input
												type="text"
												required
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder="Dr. Rajesh Patel"
												className="w-full px-3.5 py-2 rounded-xl border border-[#12304A]/15 text-xs text-[#12304A] placeholder-[#94A3B8] focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
												Corporate Email *
											</label>
											<input
												type="email"
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="name@pharma.com"
												className="w-full px-3.5 py-2 rounded-xl border border-[#12304A]/15 text-xs text-[#12304A] placeholder-[#94A3B8] focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div>
											<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
												Company / Organization *
											</label>
											<input
												type="text"
												required
												value={company}
												onChange={(e) => setCompany(e.target.value)}
												placeholder="e.g. Formulation Lab / Synthesizer"
												className="w-full px-3.5 py-2 rounded-xl border border-[#12304A]/15 text-xs text-[#12304A] placeholder-[#94A3B8] focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
												Phone / WhatsApp
											</label>
											<input
												type="tel"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												placeholder="+91 98200 XXXXX"
												className="w-full px-3.5 py-2 rounded-xl border border-[#12304A]/15 text-xs text-[#12304A] placeholder-[#94A3B8] focus:border-[#C79A4B] focus:outline-none"
											/>
										</div>
									</div>

									<div>
										<label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
											Regulatory or Sourcing Requirements
										</label>
										<textarea
											rows={3}
											value={requirements}
											onChange={(e) => setRequirements(e.target.value)}
											placeholder="Specify molecule requirements, annual target volumes, pharmacopoeial monograph (IP/USP/EP), or specific DCGI approval needs..."
											className="w-full px-3.5 py-2 rounded-xl border border-[#12304A]/15 text-xs text-[#12304A] placeholder-[#94A3B8] focus:border-[#C79A4B] focus:outline-none resize-none"
										/>
									</div>

									<div className="pt-2 flex items-center justify-end gap-3">
										<button
											type="button"
											onClick={() => setModalOpen(false)}
											className="px-4 py-2 rounded-full text-xs font-bold text-[#5A7A8E] hover:text-[#12304A] cursor-pointer"
										>
											Cancel
										</button>
										<button
											type="submit"
											disabled={isSubmitting}
											className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C79A4B] hover:bg-[#B58A3E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-75 shadow-sm"
										>
											{isSubmitting ? (
												<>
													<Loader2 className="w-3.5 h-3.5 animate-spin" />
													<span>Assigning...</span>
												</>
											) : (
												<>
													<Send className="w-3.5 h-3.5" />
													<span>Submit Inquiry</span>
												</>
											)}
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
