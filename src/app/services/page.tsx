"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	motion,
	useScroll,
	useTransform,
	useSpring,
	useMotionValue,
	useInView,
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
	type LucideIcon,
} from "lucide-react";
import Footer from "../components/Footer";
import { HexIcon, MolecularDecoration, hexPoints } from "../components/Hex";
import SectionHeader from "../components/SectionHeader";
import { useLenis } from "../components/SmoothScroll";

/* ───────────────────────────────────────────────────────────────────────────
   SERVICES DATA
   ─────────────────────────────────────────────────────────────────────────── */
interface Service {
	id: string;
	number: string;
	title: string;
	category: string;
	highlight: string;
	description: string;
	scope: string[];
	deliverables: string[];
	ctaText: string;
	image: string;
	icon: LucideIcon;
}

const SERVICES: Service[] = [
	{
		id: "cdsco-registration",
		number: "01",
		title: "Registration with CDSCO",
		category: "Regulatory Advisory",
		highlight: "100% CDSCO Compliant",
		description:
			"End-to-end regulatory facilitation and designated Indian Authorized Agent liaison for overseas bulk drug manufacturers and medical device innovators entering the Indian market.",
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
		ctaText: "Consult on CDSCO Registration",
		image: "/images/registration.webp",
		icon: FileCheck2,
	},
	{
		id: "indenting-sourcing",
		number: "02",
		title: "Indenting & Global Sourcing",
		category: "Direct Sourcing",
		highlight: "45+ Source Jurisdictions",
		description:
			"Connecting Indian formulation leaders directly with audited international chemical synthesis plants through transparent indenting contracts and multi-stage batch validation.",
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
		ctaText: "Inquire About Sourcing Contracts",
		image: "/images/sourcing.webp",
		icon: Globe2,
	},
	{
		id: "trading-distribution",
		number: "03",
		title: "Trading & Distribution",
		category: "Buffer Warehousing",
		highlight: "24-48h Regional Dispatch",
		description:
			"Strategic ready-stock trading and pan-India distribution of critical APIs, excipients, and specialty chemicals to guarantee continuous formulation manufacturing cycles.",
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
		ctaText: "Inquire About Ready Stock",
		image: "/images/distribution.webp",
		icon: Truck,
	},
	{
		id: "import-export",
		number: "04",
		title: "Import & Export Logistics",
		category: "Cross-Border Trade",
		highlight: "Zero Demurrage Focus",
		description:
			"Cross-border pharmaceutical trade facilitation, air and ocean freight coordination, temperature-controlled cold chain assurance, and customs port clearance.",
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
		ctaText: "Plan Cross-Border Logistics",
		image: "/images/export.webp",
		icon: Ship,
	},
];

/* ───────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER (Zero re-renders via GSAP)
   ─────────────────────────────────────────────────────────────────────────── */
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

/* ───────────────────────────────────────────────────────────────────────────
   LIGHTWEIGHT FLOATING HEXAGON
   ─────────────────────────────────────────────────────────────────────────── */
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
   MINIMAL SLEEK SCROLL-AWARE SERVICES SECTION
   - Sticky left sidebar with live continuous progress bar & service tabs
   - Right column stream of 4 premium minimal cards
   - Zero glows, zero shadows, zero heavy pills: pure editorial precision
   ─────────────────────────────────────────────────────────────────────────── */
function ScrollAwareServicesSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollTo } = useLenis();

	// Smooth scroll tracking across the whole section
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 35%", "end 80%"],
	});

	// Smooth continuous progress bar height
	const scaleY = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 28,
		restDelta: 0.001,
	});

	// Active index mapping for discrete tab highlighting
	const [activeIdx, setActiveIdx] = React.useState(0);

	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (latest) => {
			// 4 items: intervals around [0 - 0.25, 0.25 - 0.50, 0.50 - 0.75, 0.75 - 1.0]
			const idx = Math.min(3, Math.max(0, Math.floor(latest * 4)));
			setActiveIdx(idx);
		});
		return () => unsubscribe();
	}, [scrollYProgress]);

	const handleScrollToCard = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		if (scrollTo) {
			scrollTo(el, { offset: -100 });
		} else {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section
			ref={containerRef}
			id="capabilities"
			className="relative bg-[#FAF7F2] py-20 sm:py-28 lg:py-32 border-b border-[#12304A]/[0.08]"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header with standard mandatory 4-part stack */}
				<div className="mb-16 sm:mb-20 lg:mb-24">
					<SectionHeader
						eyebrow="Service Capabilities"
						lead="How We Support"
						highlight="Pharma Clients"
						description="Four focused capabilities, each designed to remove friction from a different stage of bringing pharmaceutical materials to market."
					/>
				</div>

				{/* 2-Column Layout: Left Sticky Progress Tracker + Right Scrolling Stream */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
					{/* ─── LEFT STICKY RAIL (Desktop Only) ─── */}
					<div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-8 select-none">
						{/* Progress Bar & Steps List */}
						<div className="relative pl-7 py-2">
							{/* Track line (Subtle neutral tone, no glow) */}
							<div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#12304A]/10 rounded-full" />

							{/* Active Progress Fill (Continuous scroll-aware spring) */}
							<motion.div
								style={{ scaleY }}
								className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#C79A4B] origin-top rounded-full"
							/>

							{/* Interactive Navigation Items */}
							<nav className="space-y-6" aria-label="Services Navigation">
								{SERVICES.map((s, idx) => {
									const isActive = activeIdx === idx;
									return (
										<button
											key={s.id}
											type="button"
											onClick={() => handleScrollToCard(s.id)}
											className="w-full text-left group flex flex-col items-start gap-1 cursor-pointer transition-colors"
										>
											<div className="flex items-center gap-2.5">
												<span
													className={`stat-num text-xs font-bold tracking-wider transition-colors duration-200 ${
														isActive ? "text-[#C79A4B]" : "text-[#94A3B8] group-hover:text-[#12304A]"
													}`}
												>
													{s.number}
												</span>
												<span
													className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${
														isActive ? "text-[#C79A4B]" : "text-[#94A3B8] group-hover:text-[#5A7A8E]"
													}`}
												>
													{s.category}
												</span>
											</div>

											<h4
												className={`text-base font-bold tracking-tight transition-colors duration-200 ${
													isActive
														? "text-[#12304A]"
														: "text-[#5A7A8E] group-hover:text-[#12304A]"
												}`}
											>
												{s.title}
											</h4>
										</button>
									);
								})}
							</nav>
						</div>

						{/* Minimal Callout Box */}
						<div className="pt-6 border-t border-[#12304A]/10">
							<p className="text-xs text-[#5A7A8E] leading-relaxed mb-3">
								Need guidance on custom supply arrangements or CDSCO authorized representation?
							</p>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 text-xs font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors group/cta"
							>
								<span>Speak with our technical team</span>
								<ArrowRight className="w-3.5 h-3.5 text-[#C79A4B] transition-transform duration-200 group-hover/cta:translate-x-1" />
							</Link>
						</div>
					</div>

					{/* ─── RIGHT CARDS STREAM (4 Sleek Minimal Cards) ─── */}
					<div className="lg:col-span-8 space-y-12 sm:space-y-16">
						{SERVICES.map((service, index) => (
							<article
								key={service.id}
								id={service.id}
								className="scroll-mt-28 bg-white rounded-2xl border border-[#12304A]/10 p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:border-[#12304A]/25"
							>
								{/* Card Header Row: Category & Headline */}
								<div className="flex flex-col gap-3 pb-6 border-b border-[#12304A]/[0.08]">
									<div className="flex items-center justify-between gap-4">
										<span className="text-xs font-bold uppercase tracking-wider text-[#C79A4B]">
											{service.category}
										</span>

										{/* Subtle crisp text indicator (no glow, no pill) */}
										<span className="text-xs font-semibold text-[#12304A]">
											{service.highlight}
										</span>
									</div>

									<h3 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight leading-snug">
										{service.title}
									</h3>
								</div>

								{/* Card Image: Clean 16:9 Aspect with subtle border and crisp gradient */}
								<div className="relative aspect-[16/8.5] w-full mt-6 rounded-xl overflow-hidden border border-[#12304A]/10">
									<Image
										src={service.image}
										alt={service.title}
										fill
										sizes="(min-width: 1024px) 55vw, 100vw"
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#071521]/60 via-transparent to-transparent" />
								</div>

								{/* Description */}
								<p className="mt-6 text-sm sm:text-base text-[#5A7A8E] leading-relaxed">
									{service.description}
								</p>

								{/* Two-Column Structured Scope & Deliverables */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 mt-6 border-t border-[#12304A]/[0.08]">
									{/* Column 1: Scope of Work */}
									<div className="space-y-3">
										<h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-2">
											<span className="w-1.5 h-1.5 bg-[#C79A4B] rounded-full" />
											Scope of Work
										</h4>
										<ul className="space-y-2.5">
											{service.scope.map((item) => (
												<li
													key={item}
													className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#12304A] font-medium leading-snug"
												>
													<HexIcon size={15} bg="#C79A4B" className="text-white shrink-0 mt-0.5">
														<Check className="w-2 h-2 stroke-[3]" />
													</HexIcon>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Column 2: Key Deliverables */}
									<div className="space-y-3">
										<h4 className="text-xs font-bold uppercase tracking-wider text-[#12304A] flex items-center gap-2">
											<span className="w-1.5 h-1.5 bg-[#12304A] rounded-full" />
											Verified Deliverables
										</h4>
										<ul className="space-y-2.5">
											{service.deliverables.map((item) => (
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

								{/* Footer Action Row */}
								<div className="pt-6 mt-6 border-t border-[#12304A]/[0.08] flex items-center justify-between gap-4">
									<Link
										href="/contact"
										className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors group/cta"
									>
										<span>{service.ctaText}</span>
										<ArrowRight className="w-4 h-4 text-[#C79A4B] transition-transform duration-200 group-hover/cta:translate-x-1" />
									</Link>

									<span className="text-[11px] sm:text-xs text-[#94A3B8] font-medium">
										Est. 1984 • 40+ Years Experience
									</span>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   MAIN SERVICES PAGE COMPONENT
   ─────────────────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
	// Subtle Banner Cursor Parallax Tracking (Zero React Re-renders, 120 FPS GPU)
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

	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
			<main className="flex-grow">
				{/* ════════════════ 1. SERVICE OVERVIEW (HERO BANNER - PRESERVED) ════════════════ */}
				<section
					ref={bannerRef}
					onMouseMove={handleBannerMouseMove}
					onMouseLeave={handleBannerMouseLeave}
					className="relative bg-[#0B1E2E] text-white pt-24 sm:pt-28 lg:pt-32 pb-18 sm:pb-22 lg:pb-24 overflow-hidden min-h-[460px] sm:min-h-[490px] lg:min-h-[520px] flex flex-col justify-center"
				>
					{/* Live Floating Hex & Molecular Lattice Background */}
					<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
						{/* Layer 1: Molecular Cluster (Bottom Right) */}
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

						{/* Layer 2: Counter-Motion Cluster (Top Left) */}
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

						{/* Layer 3: Floating Geometric Hexagons */}
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

							{/* Right Column: Key Operational Metrics */}
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
									<div key={stat.label} className="group cursor-default">
										<div className="text-2xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-white group-hover:text-[#C79A4B] transition-colors duration-300 font-sans">
											<CountUp end={stat.val} />
											<span className="text-[#C79A4B] font-extrabold ml-0.5">{stat.suffix}</span>
										</div>
										<div className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
											{stat.label}
										</div>
										<div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
									</div>
								))}
							</motion.div>
						</div>
					</div>

					{/* Bottom Wave Transition to Light Canvas */}
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

				{/* ════════════════ 2. VERTICAL SCROLL-AWARE SERVICES SECTION ════════════════ */}
				<ScrollAwareServicesSection />

				{/* ════════════════ 3. SERVICE ENQUIRY (CTA) ════════════════ */}
				<section className="relative overflow-hidden bg-white border-t border-[#12304A]/[0.08]">
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
							transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
							className="flex flex-col sm:flex-row items-center justify-center gap-4"
						>
							<Link
								href="/contact"
								className="group inline-flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-4 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto"
							>
								Send an Enquiry
								<ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
							<Link
								href="/products"
								className="inline-flex items-center justify-center gap-2 text-[#12304A] hover:text-[#C79A4B] px-6 py-4 text-sm font-bold transition-colors border border-[#12304A]/15 hover:border-[#C79A4B] rounded-xl w-full sm:w-auto"
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
