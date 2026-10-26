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
	type Variants,
} from "framer-motion";
import gsap from "gsap";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	FileCheck2,
	Globe2,
	Ship,
	Truck,
	Factory,
	Building2,
	LayoutList,
	LayoutGrid,
	Columns,
	type LucideIcon,
} from "lucide-react";
import Footer from "../components/Footer";
import { HexIcon, HexBadge, MolecularDecoration, hexPoints } from "../components/Hex";
import SectionHeader from "../components/SectionHeader";

/* ───────────────────────────────────────────────────────────────────────────
   DATA
   NOTE: Service names, descriptions and claims are proposed copy and must be
   confirmed by Ruskin before going live.
   ─────────────────────────────────────────────────────────────────────────── */

interface Service {
	id: string;
	title: string;
	short: string;
	category: string;
	badge: string;
	description: string;
	points: string[];
	scope: string[];
	deliverables: string[];
	clientProfile: string;
	highlight: string;
	ctaText: string;
	image: string;
	icon: LucideIcon;
}

const SERVICES: Service[] = [
	{
		id: "cdsco-registration",
		title: "Registration with CDSCO",
		short: "Regulatory access",
		category: "Regulatory Advisory",
		badge: "Form 40 / 41",
		description:
			"End-to-end regulatory support and official CDSCO liaison for foreign bulk drug manufacturers and medical device innovators entering the Indian market.",
		points: [
			"Import registration & licensing support (Form 40/41)",
			"Authorized Indian Agent representation & legal liaison",
			"Dossier review & technical query management",
		],
		scope: [
			"Import registration & licensing support (Form 40/41)",
			"Authorized Indian Agent representation & legal liaison",
			"CTD/ACTD dossier compilation & query management",
		],
		deliverables: [
			"Approved CDSCO Registration Certificate (RC)",
			"Import License (Form 10) Procurement",
			"CTD / ACTD Technical Dossier Filing",
		],
		clientProfile:
			"Overseas API manufacturers, chemical synthesis innovators, and global medical device companies seeking direct entry to India.",
		highlight: "100% CDSCO Compliant",
		ctaText: "Consult on CDSCO Registration",
		image: "/images/registration.webp",
		icon: FileCheck2,
	},
	{
		id: "indenting-sourcing",
		title: "Indenting & Global Sourcing",
		short: "Manufacturer network",
		category: "Direct Sourcing",
		badge: "Factory Direct",
		description:
			"Connecting Indian formulation leaders directly with audited international synthesis plants through transparent indenting contracts and sample validation.",
		points: [
			"Representation of vetted overseas bulk drug manufacturers",
			"Supplier identification, cGMP verification & audit support",
			"Commercial negotiation and contract follow-up",
		],
		scope: [
			"Representation of vetted overseas bulk drug manufacturers",
			"Supplier cGMP qualification, DMF review & audit support",
			"Commercial contract structuring with direct factory pricing",
		],
		deliverables: [
			"Audited Manufacturer DMF & Regulatory Pack",
			"Commercial Indenting Contracts with Fixed Terms",
			"Pre-Shipment Validation Lots with Original COAs",
		],
		clientProfile:
			"Formulation R&D directors, corporate procurement heads, and contract manufacturing organizations (CDMOs).",
		highlight: "45+ Source Jurisdictions",
		ctaText: "Inquire About Sourcing Contracts",
		image: "/images/sourcing.webp",
		icon: Globe2,
	},
	{
		id: "trading-distribution",
		title: "Trading & Distribution",
		short: "Market delivery",
		category: "Buffer Warehousing",
		badge: "Stock-and-Sell",
		description:
			"Strategic ready-stock trading and pan-India distribution of critical APIs, excipients, and specialty chemicals to ensure continuous formulation manufacturing.",
		points: [
			"Stock-and-sell trading of APIs & excipients",
			"Reliable supply to formulation companies",
			"Responsive, need-based order fulfilment",
		],
		scope: [
			"Stock-and-sell inventory staging in major pharma corridors",
			"GDP-compliant warehousing with continuous climate control",
			"Flexible lot sizing tailored for pilot trials or full production",
		],
		deliverables: [
			"Same-Week Local Warehouse Dispatch",
			"Batch-Specific Analytical Test Reports (COA)",
			"GST Commercial Invoicing & Lot Traceability",
		],
		clientProfile:
			"Commercial formulation facilities, pilot plants, and production units requiring immediate buffer availability.",
		highlight: "24-48h Regional Dispatch",
		ctaText: "Inquire About Ready Stock",
		image: "/images/distribution.webp",
		icon: Truck,
	},
	{
		id: "import-export",
		title: "Import & Export",
		short: "Cross-border trade",
		category: "Cross-Border Trade",
		badge: "Major Ports & Air Cargo",
		description:
			"Cross-border pharmaceutical trade facilitation, air/ocean freight coordination, cold-chain temperature assurance, and bonded customs clearance.",
		points: [
			"Shipment coordination and multi-modal logistics",
			"Customs and trade documentation end-to-end",
			"Cold-chain assurance (2°C to 8°C / 15°C to 25°C)",
		],
		scope: [
			"Pharma customs clearance at Nhava Sheva (JNPT) & Air Cargo",
			"Temperature-controlled freight (2°C to 8°C / 15°C to 25°C)",
			"HS tariff classification, ADC / CDSCO port NOC facilitation",
		],
		deliverables: [
			"Cleared Bill of Entry & ADC NOC Endorsements",
			"Continuous Temperature Datalogger Verification",
			"End-to-End Chain-of-Custody Documentation",
		],
		clientProfile:
			"International bulk drug exporters, domestic formulation importers, and global trading houses.",
		highlight: "Zero Demurrage Focus",
		ctaText: "Plan Cross-Border Logistics",
		image: "/images/export.webp",
		icon: Ship,
	},
];

/* Order in which services connect along the supply chain */
const FLOW = [
	{ service: SERVICES[0], verb: "Enable", caption: "Secure regulatory approval for market entry." },
	{ service: SERVICES[1], verb: "Source", caption: "Match approved manufacturers with client demand." },
	{ service: SERVICES[3], verb: "Move", caption: "Ship compliantly across borders." },
	{ service: SERVICES[2], verb: "Deliver", caption: "Distribute to formulation companies on time." },
];

/* ───────────────────────────────────────────────────────────────────────────
   MOTION
   ─────────────────────────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: (i: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
	}),
};

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

// ─── Lightweight GPU-Accelerated Hex Badge for Background Floating Parallax ──
function FloatingHex({
	size = 48,
	color = "#C79A4B",
	strokeWidth = 1.5,
	opacity = 0.25,
	hasInner = false,
	hasDot = false,
	className = "",
}: {
	size?: number;
	color?: string;
	strokeWidth?: number;
	opacity?: number;
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



/* ───────────────────────────────────────────────────────────────────────────
   SERVICE SHOWCASE CARD (Spacious, high-white-space enterprise card)
   ─────────────────────────────────────────────────────────────────────────── */
function ServiceShowcaseCard({ service, index }: { service: Service; index: number }) {
	const isReversed = index % 2 === 1;

	return (
		<motion.article
			id={service.id}
			initial={{ opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
			className="group scroll-mt-28 bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 border border-[#12304A]/[0.08] hover:border-[#C79A4B]/40 transition-[border-color,box-shadow] duration-300 shadow-[0_4px_24px_-8px_rgba(18,48,74,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(18,48,74,0.12)]"
		>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
				{/* Visual Media Column */}
				<div
					className={`relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[360px] rounded-2xl sm:rounded-[22px] overflow-hidden ${
						isReversed ? "lg:col-span-5 lg:order-2" : "lg:col-span-5 lg:order-1"
					}`}
				>
					<Image
						src={service.image}
						alt={service.title}
						fill
						sizes="(min-width: 1024px) 42vw, 100vw"
						className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#071521]/60 via-[#071521]/15 to-transparent" />

					{/* Discreet corner benchmark pill */}
					<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
						<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#12304A]/90 text-white backdrop-blur-md border border-white/10 shadow-sm">
							<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
							{service.highlight}
						</span>
						<span className="stat-num text-white/80 text-xs font-bold tracking-widest bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
							0{index + 1} / 04
						</span>
					</div>
				</div>

				{/* Content Column */}
				<div
					className={`flex flex-col justify-between py-1 lg:py-2 ${
						isReversed ? "lg:col-span-7 lg:order-1" : "lg:col-span-7 lg:order-2"
					}`}
				>
					<div>
						{/* Category & Index Eyebrow */}
						<div className="flex items-center gap-2.5 mb-2.5">
							<span className="stat-num text-sm sm:text-base font-extrabold text-[#C79A4B] tracking-wider">
								0{index + 1}
							</span>
							<div className="w-6 h-[1.5px] bg-[#C79A4B]/40" />
							<span className="text-xs font-bold uppercase tracking-wider text-[#5A7A8E]">
								{service.category}
							</span>
						</div>

						{/* Title */}
						<h3 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight leading-snug">
							{service.title}
						</h3>

						{/* Description */}
						<p className="mt-3 text-sm sm:text-[15px] text-[#5A7A8E] leading-relaxed max-w-2xl">
							{service.description}
						</p>

						{/* Two Structured Columns: Scope & Deliverables */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 mt-6 border-t border-[#12304A]/[0.07]">
							{/* Scope of Work */}
							<div className="space-y-3">
								<h4 className="text-[11px] font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
									Scope of Work
								</h4>
								<ul className="space-y-2.5">
									{service.scope.slice(0, 3).map((item) => (
										<li
											key={item}
											className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#12304A] font-medium leading-snug"
										>
											<HexIcon size={16} bg="#C79A4B" className="text-white shrink-0 mt-0.5">
												<Check className="w-2 h-2 stroke-[3]" />
											</HexIcon>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Key Deliverables */}
							<div className="space-y-3">
								<h4 className="text-[11px] font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-[#12304A]" />
									Verified Deliverables
								</h4>
								<ul className="space-y-2.5">
									{service.deliverables.slice(0, 3).map((item) => (
										<li
											key={item}
											className="flex items-start gap-2 text-xs sm:text-[13px] text-[#5A7A8E] leading-snug"
										>
											<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B] shrink-0 mt-1.5" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Footer Action Row */}
					<div className="pt-6 mt-6 border-t border-[#12304A]/[0.07] flex flex-wrap items-center justify-between gap-4">
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 text-sm font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors group/cta"
						>
							<span>{service.ctaText}</span>
							<ArrowRight className="w-4 h-4 text-[#C79A4B] transition-transform duration-200 group-hover/cta:translate-x-1" />
						</Link>

						<span className="text-xs text-[#94A3B8] font-medium">
							40+ Years Pharma Expertise
						</span>
					</div>
				</div>
			</div>
		</motion.article>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   VARIATION 2: 2×2 BENTO CARD (Balanced executive grid)
   ─────────────────────────────────────────────────────────────────────────── */
function ServiceBentoCard({ service, index }: { service: Service; index: number }) {
	return (
		<motion.article
			id={`bento-${service.id}`}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE }}
			className="group bg-white rounded-[28px] sm:rounded-[32px] border border-[#12304A]/[0.08] hover:border-[#C79A4B]/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_24px_-8px_rgba(18,48,74,0.06)] hover:shadow-[0_24px_56px_-18px_rgba(18,48,74,0.14)] overflow-hidden flex flex-col"
		>
			{/* Top Image Banner */}
			<div className="relative aspect-[16/9.5] overflow-hidden">
				<Image
					src={service.image}
					alt={service.title}
					fill
					sizes="(min-width: 768px) 50vw, 100vw"
					className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#071521]/70 via-[#071521]/20 to-transparent" />

				{/* Bottom corner subtle transparent glass highlight pill */}
				<div className="absolute bottom-4 left-5 flex items-center">
					<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-white/15 text-white/90 backdrop-blur-md border border-white/20 shadow-xs">
						<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
						{service.highlight}
					</span>
				</div>
			</div>

			{/* Content Body */}
			<div className="p-7 sm:p-8 lg:p-9 flex flex-col flex-1 justify-between gap-6">
				<div className="space-y-4">
					{/* Category Eyebrow */}
					<div className="flex items-center pb-0.5">
						<span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79A4B]">
							<span className="w-5 h-[2px] bg-[#C79A4B]" />
							{service.category}
						</span>
					</div>

					<h3 className="text-2xl sm:text-[26px] font-extrabold text-[#12304A] tracking-tight leading-snug group-hover:text-[#C79A4B] transition-colors duration-200">
						{service.title}
					</h3>
					<p className="text-sm sm:text-[15px] text-[#5A7A8E] leading-relaxed">
						{service.description}
					</p>

					{/* Scope of Work Points */}
					<div className="pt-5 border-t border-[#12304A]/[0.08] space-y-3">
						<h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
							Core Scope
						</h4>
						<ul className="space-y-2.5">
							{service.scope.slice(0, 3).map((item) => (
								<li
									key={item}
									className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#12304A] font-medium leading-relaxed"
								>
									<HexIcon size={16} bg="#C79A4B" className="text-white shrink-0 mt-0.5">
										<Check className="w-2.5 h-2.5 stroke-[3]" />
									</HexIcon>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Deliverables Tags */}
					<div className="pt-4 space-y-2.5">
						<h4 className="text-xs font-bold uppercase tracking-wider text-[#5A7A8E] flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-[#12304A]" />
							Verified Deliverables
						</h4>
						<div className="flex flex-wrap gap-2">
							{service.deliverables.slice(0, 3).map((item) => (
								<span
									key={item}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#12304A]/[0.08] hover:border-[#C79A4B]/40 text-xs font-semibold text-[#12304A] transition-colors"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
									{item}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Card Footer CTA Bar */}
				<Link
					href="/contact"
					className="pt-5 mt-2 border-t border-[#12304A]/[0.08] flex items-center justify-between group/bcta cursor-pointer"
				>
					<span className="text-sm font-bold text-[#12304A] group-hover/bcta:text-[#C79A4B] transition-colors flex items-center gap-2">
						{service.ctaText}
					</span>
					<div className="w-9 h-9 rounded-full bg-[#FAF7F2] group-hover/bcta:bg-[#C79A4B] group-hover/bcta:text-white transition-all duration-300 flex items-center justify-center text-[#12304A]/60 shadow-xs">
						<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/bcta:translate-x-0.5" />
					</div>
				</Link>
			</div>
		</motion.article>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   VARIATION 3: SPLIT SPOTLIGHT STAGE (Interactive hero selection)
   ─────────────────────────────────────────────────────────────────────────── */
function ServiceSpotlightStage({
	services,
	selectedId,
	onSelect,
}: {
	services: Service[];
	selectedId: string;
	onSelect: (id: string) => void;
}) {
	const activeService = services.find((s) => s.id === selectedId) || services[0];
	const activeIndex = services.findIndex((s) => s.id === activeService.id);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
			{/* Left Column: Vertical Selection Cards */}
			<div className="lg:col-span-5 flex flex-col gap-3.5">
				{services.map((s, i) => {
					const isSelected = s.id === activeService.id;
					return (
						<button
							key={s.id}
							type="button"
							onClick={() => onSelect(s.id)}
							className={`text-left p-5 sm:p-6 rounded-[22px] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-3 ${
								isSelected
									? "bg-[#12304A] text-white border-[#12304A] shadow-md"
									: "bg-white text-[#12304A] border-[#12304A]/[0.08] hover:border-[#C79A4B]/40 hover:bg-[#FAF7F2]/60"
							}`}
						>
							{isSelected && (
								<div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#C79A4B]" />
							)}

							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-2">
									<span
										className={`stat-num text-xs font-bold tracking-widest ${
											isSelected ? "text-[#C79A4B]" : "text-[#5A7A8E]"
										}`}
									>
										0{i + 1}
									</span>
									<span
										className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
											isSelected
												? "bg-white/10 text-white"
												: "bg-[#12304A]/[0.05] text-[#5A7A8E]"
										}`}
									>
										{s.category}
									</span>
								</div>
								<span
									className={`text-[11px] font-semibold transition-colors ${
										isSelected ? "text-[#C79A4B]" : "text-[#94A3B8]"
									}`}
								>
									{s.highlight}
								</span>
							</div>

							<div className="space-y-1">
								<h3
									className={`text-base sm:text-lg font-extrabold tracking-tight leading-snug ${
										isSelected ? "text-white" : "text-[#12304A]"
									}`}
								>
									{s.title}
								</h3>
								<p
									className={`text-xs line-clamp-2 leading-relaxed ${
										isSelected ? "text-slate-300" : "text-[#5A7A8E]"
									}`}
								>
									{s.description}
								</p>
							</div>

							<div
								className={`flex items-center justify-between pt-2 border-t text-xs font-bold ${
									isSelected
										? "border-white/10 text-[#C79A4B]"
										: "border-[#12304A]/[0.06] text-[#5A7A8E]"
								}`}
							>
								<span>View Capability Details</span>
								<ArrowRight
									className={`w-3.5 h-3.5 transition-transform duration-200 ${
										isSelected ? "translate-x-1 text-[#C79A4B]" : "text-[#94A3B8]"
									}`}
								/>
							</div>
						</button>
					);
				})}
			</div>

			{/* Right Column: Hero Spotlight Details Card */}
			<div className="lg:col-span-7">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeService.id}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.45, ease: EASE }}
						className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 border border-[#12304A]/[0.08] shadow-[0_4px_30px_-10px_rgba(18,48,74,0.08)] h-full flex flex-col justify-between"
					>
						{/* Media Banner */}
						<div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
							<Image
								src={activeService.image}
								alt={activeService.title}
								fill
								sizes="(min-width: 1024px) 50vw, 100vw"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#071521]/70 via-[#071521]/15 to-transparent" />

							<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
								<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#12304A]/90 text-white backdrop-blur-md border border-white/10 shadow-sm">
									<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
									{activeService.highlight}
								</span>
								<span className="stat-num text-white/80 text-xs font-bold tracking-widest bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
									0{activeIndex + 1} / 04
								</span>
							</div>
						</div>

						{/* Content Details */}
						<div className="space-y-6">
							<div>
								<div className="flex items-center gap-2.5 mb-2">
									<span className="stat-num text-sm font-extrabold text-[#C79A4B] tracking-wider">
										0{activeIndex + 1}
									</span>
									<div className="w-6 h-[1.5px] bg-[#C79A4B]/40" />
									<span className="text-xs font-bold uppercase tracking-wider text-[#5A7A8E]">
										{activeService.category}
									</span>
								</div>

								<h3 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight leading-snug">
									{activeService.title}
								</h3>

								<p className="mt-3 text-sm sm:text-[15px] text-[#5A7A8E] leading-relaxed">
									{activeService.description}
								</p>
							</div>

							{/* Two Sub-Columns: Scope and Deliverables */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#12304A]/[0.07]">
								<div className="space-y-3">
									<h4 className="text-[11px] font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
										Scope of Work
									</h4>
									<ul className="space-y-2.5">
										{activeService.scope.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#12304A] font-medium leading-snug"
											>
												<HexIcon size={16} bg="#C79A4B" className="text-white shrink-0 mt-0.5">
													<Check className="w-2 h-2 stroke-[3]" />
												</HexIcon>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>

								<div className="space-y-3">
									<h4 className="text-[11px] font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full bg-[#12304A]" />
										Verified Deliverables
									</h4>
									<ul className="space-y-2.5">
										{activeService.deliverables.map((item) => (
											<li
												key={item}
												className="flex items-start gap-2 text-xs sm:text-[13px] text-[#5A7A8E] leading-snug"
											>
												<span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B] shrink-0 mt-1.5" />
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{/* Footer CTA */}
						<div className="pt-6 mt-6 border-t border-[#12304A]/[0.07] flex flex-wrap items-center justify-between gap-4">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 text-sm font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors group/scta"
							>
								<span>{activeService.ctaText}</span>
								<ArrowRight className="w-4 h-4 text-[#C79A4B] transition-transform duration-200 group-hover/scta:translate-x-1" />
							</Link>

							<span className="text-xs text-[#94A3B8] font-medium">
								40+ Years Pharma Expertise
							</span>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE
   ─────────────────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
	const [activeStep, setActiveStep] = useState(0);

	// ─── Subtle Banner Cursor Parallax Tracking (Zero React Re-renders, 120 FPS GPU) ───
	const bannerRef = useRef<HTMLElement>(null);
	const bannerMouseX = useMotionValue(0);
	const bannerMouseY = useMotionValue(0);

	// Ultra-smooth, high damping spring for liquid subtle response
	const springConfig = { damping: 36, stiffness: 65, mass: 0.6 };
	const smoothBannerX = useSpring(bannerMouseX, springConfig);
	const smoothBannerY = useSpring(bannerMouseY, springConfig);

	// Gentle, micro-amplitude parallax translations (±8px to ±14px)
	const layerDeepX = useTransform(smoothBannerX, [-0.5, 0.5], [-8, 8]);
	const layerDeepY = useTransform(smoothBannerY, [-0.5, 0.5], [-6, 6]);

	const layerMidX = useTransform(smoothBannerX, [-0.5, 0.5], [10, -10]);
	const layerMidY = useTransform(smoothBannerY, [-0.5, 0.5], [7, -7]);

	const layerForeX = useTransform(smoothBannerX, [-0.5, 0.5], [-14, 14]);
	const layerForeY = useTransform(smoothBannerY, [-0.5, 0.5], [-10, 10]);

	const handleBannerMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const rect = bannerRef.current?.getBoundingClientRect();
		if (!rect) return;
		const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
		const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
		bannerMouseX.set(relativeX);
		bannerMouseY.set(relativeY);
	};

	const handleBannerMouseLeave = () => {
		bannerMouseX.set(0);
		bannerMouseY.set(0);
	};

	// Ambient biochemical molecular floating drift
	useEffect(() => {
		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const ctx = gsap.context(() => {
			gsap.to(".services-ambient-float-1", {
				y: -14,
				rotation: 3,
				duration: 5.5,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".services-ambient-float-2", {
				y: 12,
				rotation: -3.5,
				duration: 6.2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".services-ambient-float-hex-1", {
				y: -10,
				x: 6,
				rotation: 6,
				duration: 4.8,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".services-ambient-float-hex-2", {
				y: 8,
				x: -5,
				rotation: -5,
				duration: 5.2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
		});

		return () => ctx.revert();
	}, []);

	// 0.5s per step: 0 -> 1 -> 2 -> 3 (0.5s each), hold on step 3 for 1s, then cycle
	useEffect(() => {
		let current = 0;
		const interval = setInterval(() => {
			current = (current + 1) % 6; // 0, 1, 2, 3, 4, 5 (4 & 5 hold at completion)
			setActiveStep(Math.min(current, 3));
		}, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
			<main className="flex-grow">
				{/* ════════════════ 1. SERVICE OVERVIEW (HERO BANNER) ════════════════ */}
				<section
					ref={bannerRef}
					onMouseMove={handleBannerMouseMove}
					onMouseLeave={handleBannerMouseLeave}
					className="relative bg-[#0B1E2E] text-white pt-24 sm:pt-28 lg:pt-32 pb-18 sm:pb-22 lg:pb-24 overflow-hidden min-h-[460px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-center"
				>
					{/* ── Live Floating Hex & Molecular Lattice Background (Subtle Cursor Parallax) ── */}
					<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
						{/* Layer 1: Subtle Small Molecular Cluster (Bottom Right) */}
						<motion.div
							style={{ x: layerDeepX, y: layerDeepY }}
							className="absolute -right-6 sm:right-0 bottom-2 sm:bottom-4 lg:bottom-6 w-[200px] sm:w-[240px] lg:w-[270px] hidden md:block will-change-transform"
						>
							<div className="services-ambient-float-1 will-change-transform">
								<MolecularDecoration
									color="#C79A4B"
									opacity={0.16}
									className="w-full h-auto"
								/>
							</div>
						</motion.div>

						{/* Layer 2: Subtle Small Counter-Motion Cluster (Top Left) */}
						<motion.div
							style={{ x: layerMidX, y: layerMidY }}
							className="absolute left-2 sm:left-6 -top-4 sm:top-2 w-[140px] sm:w-[170px] hidden sm:block will-change-transform"
						>
							<div className="services-ambient-float-2 will-change-transform">
								<MolecularDecoration
									color="#FFFFFF"
									opacity={0.12}
									className="w-full h-auto"
								/>
							</div>
						</motion.div>

						{/* Layer 3: Two Delicate Floating Geometric Hexagons with Soft Drift & Physics Parallax */}
						<motion.div
							style={{ x: layerForeX, y: layerForeY }}
							className="absolute top-14 right-[16%] hidden lg:block will-change-transform"
						>
							<div className="services-ambient-float-hex-1 will-change-transform">
								<FloatingHex size={26} color="#C79A4B" opacity={0.25} strokeWidth={1.2} hasDot />
							</div>
						</motion.div>

						<motion.div
							style={{ x: layerMidX, y: layerMidY }}
							className="absolute bottom-12 left-[12%] hidden sm:block will-change-transform"
						>
							<div className="services-ambient-float-hex-2 will-change-transform">
								<FloatingHex size={22} color="#FFFFFF" opacity={0.18} strokeWidth={1} />
							</div>
						</motion.div>
					</div>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center sm:text-left">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
							{/* Left Column: Heading & Value Proposition */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
								style={{ transform: "translateZ(0)" }}
								className="lg:col-span-7 space-y-5 text-left gpu-smooth"
							>
								<SectionHeader
									as="h1"
									dark
									eyebrow="Specialized Capabilities"
									lead="Full-Lifecycle"
									highlight="Global Sourcing & Pharmaceutical Solutions"
									description="Bridging vetted global chemical synthesis plants with India's formulation leaders — streamlining CDSCO regulatory registration, direct factory indenting, temperature-controlled distribution, and custom synthesis."
								/>
							</motion.div>

							{/* Right Column: Key Operational Metrics with Exact Products Page Sizes */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
								style={{ transform: "translateZ(0)" }}
								className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-7 pl-0 lg:pl-8 lg:border-l lg:border-white/10 text-left gpu-smooth"
							>
								{[
									{
										val: 40,
										suffix: "+",
										label: "Years in Market",
										sub: "Founded in 1984",
									},
									{
										val: 4,
										suffix: "",
										label: "Core Capabilities",
										sub: "Integrated Solutions",
									},
									{
										val: 100,
										suffix: "%",
										label: "CDSCO Compliant",
										sub: "Form 40 / 41 Licensing",
									},
									{
										val: 45,
										suffix: "+",
										label: "Global Sourcing Hubs",
										sub: "Direct Representation",
									},
								].map((stat) => (
									<div
										key={stat.label}
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
									</div>
								))}
							</motion.div>
						</div>
					</div>

					{/* Bottom Wave Transition to Light Canvas (Exact Products Page Wave) */}
					<div className="absolute bottom-0 inset-x-0 -mb-px pointer-events-none overflow-hidden h-[40px] sm:h-[60px]">
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

				{/* ════════════════ 2. HOW SERVICES WORK TOGETHER (INTEGRATED MODEL) ════════════════ */}
				<section className="relative bg-[#FAF7F2] overflow-hidden py-18 sm:py-24">
					<MolecularDecoration
						color="#C79A4B"
						opacity={0.05}
						className="absolute -bottom-10 -left-10 w-[260px] pointer-events-none"
					/>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
						<SectionHeader
							centered
							eyebrow="Integrated Model"
							lead="How Our Services"
							highlight="Work Together"
							description="Each service hands off seamlessly to the next — giving manufacturers a clear route into India and giving clients a single, accountable partner."
						/>

						{/* Endpoints */}
						<div className="flex items-center gap-3 sm:gap-5">
							<Endpoint icon={Factory} label="Global Manufacturers" />
							<div className="relative flex-1 h-px bg-[#12304A]/15 overflow-hidden">
								<motion.div
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 1.4, ease: EASE }}
									className="absolute inset-0 origin-left bg-gradient-to-r from-[#C79A4B]/0 via-[#C79A4B] to-[#C79A4B]/0"
								/>
							</div>
							<Endpoint icon={Building2} label="Pharma Clients" align="right" />
						</div>

						{/* Steps */}
						<ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
							{/* desktop connector progress bar: advances 0.5s per step */}
							<div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-[#12304A]/10 overflow-hidden">
								<motion.div
									className="h-full bg-[#C79A4B]"
									animate={{ width: `${(activeStep / (FLOW.length - 1)) * 100}%` }}
									transition={{
										duration: activeStep === 0 ? 0.3 : 0.5,
										ease: "easeInOut",
									}}
								/>
							</div>

							{FLOW.map(({ service, verb, caption }, i) => (
								<motion.li
									key={service.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-60px" }}
									transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: EASE }}
									className="relative flex flex-col items-center text-center gap-5"
								>
									<div className="relative z-10 bg-[#FAF7F2] px-2">
										<HexBadge num={i + 1} active={i <= activeStep} />
									</div>

									<a
										href={`#${service.id}`}
										className="group w-full flex-1 rounded-[24px] bg-white border border-[#12304A]/[0.08] hover:border-[#C79A4B]/40 hover:bg-white p-6 flex flex-col items-center gap-3 transition-all duration-300 shadow-[0_4px_24px_-8px_rgba(18,48,74,0.06)] hover:shadow-[0_12px_36px_-12px_rgba(18,48,74,0.1)]"
									>
										<span className="text-[11px] font-bold tracking-widest uppercase text-[#C79A4B]">
											{verb}
										</span>
										<h3 className="text-lg font-bold text-[#12304A] tracking-tight leading-snug">
											{service.title}
										</h3>
										<p className="text-sm text-[#5A7A8E] leading-relaxed">{caption}</p>
										<ArrowRight className="w-4 h-4 text-[#12304A]/30 group-hover:text-[#C79A4B] group-hover:translate-x-0.5 transition-all duration-200 mt-auto" />
									</a>
								</motion.li>
							))}
						</ol>
					</div>
				</section>

				{/* ════════════════ 3. SERVICE CAPABILITIES ════════════════ */}
				<section id="capabilities" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-10 sm:space-y-12">
						{/* Section Header */}
						<SectionHeader
							eyebrow="Service Capabilities"
							lead="How We Support"
							highlight="Pharma Clients"
							description="Four focused capabilities, each designed to remove friction from a different stage of bringing pharmaceutical materials to market."
						/>

						{/* Locked 2×2 Bento Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
							{SERVICES.map((s, i) => (
								<ServiceBentoCard key={s.id} service={s} index={i} />
							))}
						</div>
					</div>
				</section>

				{/* ════════════════ 4. SERVICE ENQUIRY (CTA) ════════════════ */}
				<section className="relative overflow-hidden bg-white border-t border-[#12304A]/[0.06]">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-9">
						<SectionHeader
							centered
							eyebrow="Service Enquiry"
							lead="Let's Discuss Your"
							highlight="Requirements"
							description="Tell us about your registration, sourcing or distribution needs and our team will respond with the right next steps."
						/>

						<motion.div
							initial={{ opacity: 0, y: 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
							className="flex flex-col sm:flex-row items-center justify-center gap-3"
						>
							<Link
								href="/contact"
								className="group inline-flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-4 rounded-full text-sm font-bold transition-colors w-full sm:w-auto shadow-[0_14px_30px_-12px_rgba(199,154,75,0.6)]"
							>
								Send an Enquiry
								<ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
							<Link
								href="/products"
								className="inline-flex items-center justify-center gap-2 text-[#12304A] hover:text-[#C79A4B] px-6 py-4 text-sm font-bold transition-colors"
							>
								Browse Product Catalogue
								<ArrowRight className="w-4 h-4" />
							</Link>
						</motion.div>
					</div>
				</section>
			</main>

			<Footer onOpenCatalog={() => (window.location.href = "/products")} />
		</div>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   Endpoint pill used in the ecosystem diagram
   ─────────────────────────────────────────────────────────────────────────── */
function Endpoint({
	icon: Icon,
	label,
	align = "left",
}: {
	icon: LucideIcon;
	label: string;
	align?: "left" | "right";
}) {
	return (
		<div
			className={`inline-flex items-center gap-2.5 shrink-0 px-3.5 sm:px-4 py-2 rounded-full bg-white border border-[#12304A]/10 shadow-xs ${
				align === "right" ? "flex-row-reverse" : ""
			}`}
		>
			<HexIcon size={22} bg="#C79A4B" className="text-white">
				<Icon className="w-3 h-3" />
			</HexIcon>
			<span className="text-xs sm:text-sm font-semibold text-[#12304A] whitespace-nowrap">{label}</span>
		</div>
	);
}
