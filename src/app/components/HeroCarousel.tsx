"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	motion,
	AnimatePresence,
	MotionValue,
	useAnimationFrame,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Download, ShieldCheck } from "lucide-react";
import { HexImage } from "./Hex";

/* ───────────────────────────────────────────────────────────────────────────
   Slide content
   ─────────────────────────────────────────────────────────────────────────── */
interface HeroSlide {
	id: string;
	eyebrow: string;
	lead: string;
	highlight: string;
	copy: string;
	cta: { label: string; href: string };
	image: { src: string; alt: string };
}

const SLIDES: HeroSlide[] = [
	{
		id: "brand-promise",
		eyebrow: "The Core Brand Promise",
		lead: "Your trusted partner in",
		highlight: "pharmaceutical raw materials",
		copy: "Sourcing and supplying high-quality active ingredients and raw materials for leading manufacturers in India and worldwide since 1984.",
		cta: { label: "Explore APIs & Ingredients", href: "/products" },
		image: { src: "/images/hero-image.jpg", alt: "Pharmaceutical Synthesis Laboratory" },
	},
	{
		id: "sourcing-supply",
		eyebrow: "End-to-End Sourcing & Supply",
		lead: "Seamless procurement",
		highlight: "tailored to production demands",
		copy: "Over four decades of expertise delivering high-grade APIs, Intermediates, and Raw Materials across global and domestic markets.",
		cta: { label: "View Our Products", href: "/products" },
		image: { src: "/images/export.jpg", alt: "Global Export Logistics" },
	},
	{
		id: "compliance-quality",
		eyebrow: "Regulatory Compliance & Quality",
		lead: "Guaranteed batch quality",
		highlight: "& regulatory confidence",
		copy: "Complete DCGI registration support, technical dossiers, and strict batch-wise COA validation for every shipment.",
		cta: { label: "Learn About Compliance", href: "/services" },
		image: { src: "/images/quality.jpg", alt: "GMP Purity Testing" },
	},
];

const SLIDE_DURATION_MS = 3000;
const HEX_TRANSITION_DURATION = 0.75;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const EASE_HEX = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────────────────────────────────
   Hex slot anchors (% of the 380 × 440 cluster container)
   Slot 0 = Main enlarged hero hex
   Slot 1 = Top-right accent hex (warm gold frame)
   Slot 2 = Bottom-right accent hex (crisp white frame)
   ─────────────────────────────────────────────────────────────────────────── */
const HEX_SLOTS = [
	{
		left: "4%",
		top: "6%",
		width: "86%",
		frame: "#FFFFFF",
		frameWidth: 5,
		glow: false,
	},
	{
		left: "64%",
		top: "-3%",
		width: "37%",
		frame: "#C79A4B",
		frameWidth: 3,
		glow: false,
	},
	{
		left: "65%",
		top: "62%",
		width: "35%",
		frame: "#FFFFFF",
		frameWidth: 3,
		glow: false,
	},
] as const;

/* ───────────────────────────────────────────────────────────────────────────
   Progress indicator (one per slide)
   ─────────────────────────────────────────────────────────────────────────── */
function SlideIndicator({
	index,
	active,
	progress,
	label,
	onSelect,
}: {
	index: number;
	active: boolean;
	progress: MotionValue<number>;
	label: string;
	onSelect: (i: number) => void;
}) {
	const scaleX = useTransform(progress, (p) => (active ? p : 0));
	return (
		<button
			id={`hero-slide-indicator-${index + 1}`}
			type="button"
			onClick={() => onSelect(index)}
			aria-label={`Go to slide ${index + 1}: ${label}`}
			aria-current={active ? "true" : undefined}
			className="group relative py-3 cursor-pointer"
		>
			<span
				className={`block h-[3px] rounded-full overflow-hidden transition-[width,background-color] duration-500 ease-out ${
					active ? "w-14 bg-[#12304A]/12" : "w-6 bg-[#12304A]/15 group-hover:bg-[#C79A4B]/50"
				}`}
			>
				<motion.span
					style={{ scaleX }}
					className="block h-full w-full origin-left rounded-full bg-[#C79A4B]"
				/>
			</span>
		</button>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   HeroCarousel
   ─────────────────────────────────────────────────────────────────────────── */
export default function HeroCarousel({
	clusterRotateX,
	clusterRotateY,
	clusterTranslateX,
	clusterTranslateY,
	onRequestQuote,
	onDownloadPdf,
}: {
	clusterRotateX: MotionValue<number>;
	clusterRotateY: MotionValue<number>;
	clusterTranslateX: MotionValue<number>;
	clusterTranslateY: MotionValue<number>;
	onRequestQuote: () => void;
	onDownloadPdf: () => void;
}) {
	const router = useRouter();
	const reduceMotion = useReducedMotion();
	const [active, setActive] = useState(0);
	const [prevActive, setPrevActive] = useState<number | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [paused, setPaused] = useState(false);
	const [tabHidden, setTabHidden] = useState(false);
	const progress = useMotionValue(0);
	const elapsedRef = useRef(0);
	const activeRef = useRef(0);

	const goTo = useCallback(
		(i: number) => {
			const next = ((i % SLIDES.length) + SLIDES.length) % SLIDES.length;
			if (next === activeRef.current) return;
			elapsedRef.current = 0;
			progress.set(0);
			setPrevActive(activeRef.current);
			setIsTransitioning(true);
			activeRef.current = next;
			setActive(next);
		},
		[progress],
	);

	// Pause autoplay while the tab is in the background
	useEffect(() => {
		const onVis = () => setTabHidden(document.visibilityState === "hidden");
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);

	// Drives autoplay + indicator fill
	useAnimationFrame((_, delta) => {
		if (paused || tabHidden || reduceMotion) return;
		elapsedRef.current += delta;
		const p = Math.min(elapsedRef.current / SLIDE_DURATION_MS, 1);
		progress.set(p);
		if (p >= 1) {
			goTo(activeRef.current + 1);
		}
	});

	const slide = SLIDES[active];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
			{/* ── Left: Headline & Actions ───────────────────────────── */}
			<div
				className="lg:col-span-7 space-y-6 text-left"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocusCapture={() => setPaused(true)}
				onBlurCapture={() => setPaused(false)}
				aria-roledescription="carousel"
				aria-label="Ruskin Chemipharm highlights"
			>
				{/* Certification Pill Badge */}
				<motion.div
					initial={{ opacity: 0, y: 14, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.5, ease: EASE_PREMIUM }}
				>
					<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#12304A]/10 text-[10px] font-semibold tracking-wider uppercase text-[#12304A]/80 hover:border-[#C79A4B]/40 transition-colors shadow-sm">
						<ShieldCheck className="w-3.5 h-3.5 text-[#C79A4B] shrink-0" />
						<span>WHO-GMP &amp; ISO 9001:2015 Certified</span>
					</span>
				</motion.div>

				{/* Slide Eyebrow */}
				<div className="h-5 relative overflow-hidden">
					<AnimatePresence mode="wait" initial={false}>
						<motion.span
							key={slide.id}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 10 }}
							transition={{ duration: 0.35, ease: EASE_PREMIUM }}
							className="absolute inset-0 inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase"
						>
							<span className="w-8 h-[2px] bg-[#C79A4B]" />
							{slide.eyebrow}
						</motion.span>
					</AnimatePresence>
				</div>

				{/* Unified Headline & Sub-copy Grid Overlay — perfectly stable height, zero CTA jitter */}
				<div className="relative min-h-[200px] sm:min-h-[190px] lg:min-h-[200px] grid grid-cols-1 grid-rows-1 items-start">
					<AnimatePresence initial={false}>
						<motion.div
							key={slide.id}
							initial="initial"
							animate="animate"
							exit="exit"
							variants={{
								initial: {},
								animate: {
									transition: {
										staggerChildren: 0.05,
										delayChildren: 0.02,
									},
								},
								exit: {
									transition: {
										staggerChildren: 0.02,
										staggerDirection: -1,
									},
								},
							}}
							className="col-start-1 row-start-1 space-y-3"
						>
							<h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-extrabold text-[#12304A] leading-[1.16] tracking-tight pb-1">
								<motion.span
									variants={{
										initial: { opacity: 0, y: 10 },
										animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_PREMIUM } },
										exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
									}}
									className="block"
								>
									{slide.lead}
								</motion.span>
								<motion.span
									variants={{
										initial: { opacity: 0, y: 10 },
										animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_PREMIUM } },
										exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
									}}
									className="text-[#C79A4B] block"
								>
									{slide.highlight}
								</motion.span>
							</h1>
							<motion.p
								variants={{
									initial: { opacity: 0, y: 8 },
									animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PREMIUM } },
									exit: { opacity: 0, y: -5, transition: { duration: 0.2 } },
								}}
								className="text-base sm:text-lg text-[#5A7A8E] leading-relaxed max-w-xl font-normal pb-1"
							>
								{slide.copy}
							</motion.p>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 pt-1 w-full sm:w-auto">
					<motion.button
						id="hero-primary-cta"
						whileHover={{ scale: 1.025, y: -2 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => router.push(slide.cta.href)}
						className="relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#C79A4B] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#C79A4B]/20 hover:bg-[#B58A3E] transition-colors group w-full sm:w-auto sm:min-w-[260px] cursor-pointer gpu-smooth"
					>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								key={slide.id}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.25, ease: EASE_PREMIUM }}
								className="inline-flex items-center gap-2.5"
							>
								<span>{slide.cta.label}</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</motion.span>
						</AnimatePresence>
					</motion.button>

					<motion.button
						id="hero-quote-cta"
						whileHover={{ scale: 1.025, y: -2 }}
						whileTap={{ scale: 0.98 }}
						onClick={onRequestQuote}
						className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white border border-[#12304A]/15 text-[#12304A] font-bold text-sm sm:text-base hover:bg-[#FAF7F2] hover:border-[#12304A]/30 transition-[background-color,border-color] shadow-sm w-full sm:w-auto cursor-pointer gpu-smooth"
					>
						<span>Request Quote &amp; COA</span>
					</motion.button>
				</div>

				{/* Slide controls + COA download */}
				<div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:gap-6 pt-1">
					<div className="flex items-center gap-3">
						<span className="stat-num text-xs font-bold text-[#12304A] tabular-nums w-5">
							{String(active + 1).padStart(2, "0")}
						</span>
						<div className="flex items-center gap-2">
							{SLIDES.map((s, i) => (
								<SlideIndicator
									key={s.id}
									index={i}
									active={i === active}
									progress={progress}
									label={s.eyebrow}
									onSelect={goTo}
								/>
							))}
						</div>
						<span className="stat-num text-xs font-semibold text-[#94A3B8] tabular-nums">
							{String(SLIDES.length).padStart(2, "0")}
						</span>
					</div>

					<span className="hidden sm:block w-px h-4 bg-[#12304A]/15" />

					<button
						id="hero-coa-download"
						onClick={onDownloadPdf}
						className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#5A7A8E] hover:text-[#12304A] transition-colors group cursor-pointer"
					>
						<div className="w-5 h-5 rounded-full bg-[#C79A4B]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C79A4B] transition-colors">
							<Check className="w-3 h-3 text-[#C79A4B] group-hover:text-white stroke-[3] transition-colors" />
						</div>
						<span>Instant COA &amp; TDS Downloads</span>
						<Download className="w-3.5 h-3.5 text-[#C79A4B] group-hover:translate-y-0.5 transition-transform duration-200" />
					</button>
				</div>
			</div>

			{/* ── Right: Rotating Hex Cluster ────────────────────────── */}
			<motion.div
				initial={{ opacity: 0, x: 25, scale: 0.96 }}
				animate={{ opacity: 1, x: 0, scale: 1 }}
				transition={{ duration: 0.85, delay: 0.15, ease: EASE_PREMIUM }}
				className="lg:col-span-5 relative flex items-center justify-center lg:justify-end py-6 lg:py-0 select-none"
			>
				<motion.div
					style={{
						rotateX: clusterRotateX,
						rotateY: clusterRotateY,
						x: clusterTranslateX,
						y: clusterTranslateY,
						transformPerspective: 1000,
					}}
					className="relative w-[300px] h-[360px] sm:w-[350px] sm:h-[410px] lg:w-[390px] lg:h-[450px] xl:w-[410px] xl:h-[470px] gpu-smooth"
				>
					{SLIDES.map((s, i) => {
						// slotIndex: 0 = Main, 1 = Top-Right, 2 = Bottom-Right
						const slotIndex = (i - active + SLIDES.length) % SLIDES.length;
						const slot = HEX_SLOTS[slotIndex];
						const isMain = slotIndex === 0;

						// Layering: The hex moving to Main rises on top (zIndex 30).
						// The outgoing Main gracefully slides underneath (zIndex 18).
						// The background accent hex remains at zIndex 10.
						let zIndex = 10;
						if (isMain) {
							zIndex = isTransitioning ? 30 : 20;
						} else if (isTransitioning && i === prevActive) {
							zIndex = 16;
						} else if (slotIndex === 1) {
							zIndex = 12;
						}

						return (
							<motion.button
								key={s.id}
								type="button"
								id={`hero-hex-${s.id}`}
								aria-label={isMain ? s.image.alt : `Switch to: ${s.eyebrow}`}
								tabIndex={isMain ? -1 : 0}
								onClick={() => !isMain && goTo(i)}
								whileHover={!isMain ? { scale: 1.035, opacity: 1 } : undefined}
								whileTap={!isMain ? { scale: 0.98 } : undefined}
								initial={false}
								animate={{
									left: slot.left,
									top: slot.top,
									width: slot.width,
									opacity: isMain ? 1 : 0.84,
								}}
								onAnimationComplete={() => {
									if (isMain) setIsTransitioning(false);
								}}
								transition={
									reduceMotion
										? { duration: 0 }
										: {
												duration: HEX_TRANSITION_DURATION,
												ease: EASE_HEX,
										  }
								}
								style={{
									zIndex,
									aspectRatio: "0.866025 / 1",
								}}
								className={`absolute block outline-none focus-visible:ring-2 focus-visible:ring-[#C79A4B] rounded-3xl will-change-transform ${
									isMain
										? "cursor-default"
										: "cursor-pointer group"
								}`}
							>
								<HexImage
									src={s.image.src}
									alt={s.image.alt}
									frame={slot.frame}
									frameWidth={slot.frameWidth}
									glow={slot.glow}
									priority={i === 0}
									className="w-full h-full !transition-none"
									imgClassName={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
										isMain ? "scale-105" : "scale-100"
									}`}
								/>
							</motion.button>
						);
					})}

					{/* Floating Dynamic Chip: DCGI Molecules */}
					<motion.div
						whileHover={{ scale: 1.04 }}
						className="animate-float-soft absolute -left-3 sm:-left-5 lg:-left-6 top-[32%] bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_12px_28px_rgba(18,48,74,0.12)] border border-[#12304A]/10 text-left cursor-default transition-shadow hover:shadow-[0_16px_32px_rgba(18,48,74,0.18)] z-30 pointer-events-auto"
					>
						<div className="stat-num text-xl sm:text-2xl font-black text-[#12304A]">46+</div>
						<div className="text-[10px] text-[#C79A4B] font-bold tracking-wider uppercase">
							DCGI Approved APIs
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
}
