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
import { ArrowRight } from "lucide-react";
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
		image: { src: "/images/hero-image.webp", alt: "Pharmaceutical Synthesis Laboratory" },
	},
	{
		id: "sourcing-supply",
		eyebrow: "End-to-End Sourcing & Supply",
		lead: "Seamless procurement",
		highlight: "tailored to production demands",
		copy: "Over four decades of expertise delivering high-grade APIs, Intermediates, and Raw Materials across global and domestic markets.",
		cta: { label: "View Our Products", href: "/products" },
		image: { src: "/images/export.webp", alt: "Global Export Logistics" },
	},
	{
		id: "compliance-quality",
		eyebrow: "Regulatory Compliance & Quality",
		lead: "Guaranteed batch quality",
		highlight: "& regulatory confidence",
		copy: "Complete DCGI registration support, technical dossiers, and strict batch-wise COA validation for every shipment.",
		cta: { label: "Learn About Compliance", href: "/services" },
		image: { src: "/images/quality.webp", alt: "GMP Purity Testing" },
	},
	{
		id: "global-distribution",
		eyebrow: "Global Network & Reach",
		lead: "Worldwide distribution network",
		highlight: "across 25+ countries",
		copy: "Reliable international supply corridors connecting audited manufacturers with pharmaceutical leaders across four continents.",
		cta: { label: "Explore Global Reach", href: "/about" },
		image: { src: "/images/distribution.webp", alt: "Global Pharmaceutical Distribution" },
	},
	{
		id: "strategic-partnerships",
		eyebrow: "Audited Synthesis Alliances",
		lead: "Direct factory indenting",
		highlight: "& strategic manufacturer ties",
		copy: "Long-standing partnerships with world-class bulk drug producers, ensuring consistent raw material availability and pricing stability.",
		cta: { label: "Discover Alliances", href: "/about" },
		image: { src: "/images/partnership.webp", alt: "Strategic Pharmaceutical Partnerships" },
	},
];

const SLIDE_DURATION_MS = 3000;
const HEX_TRANSITION_DURATION = 0.75;
const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
const EASE_HEX = [0.16, 1, 0.3, 1] as const;

/* ───────────────────────────────────────────────────────────────────────────
   Hex slot anchors (% of the 380 × 440 cluster container)
   Slot 0 = Main enlarged hero hex with signature gold focus ring
   Slot 1 = Top-right accent hex (crisp white frame)
   Slot 2 = Bottom-right accent hex (crisp white frame)
   ─────────────────────────────────────────────────────────────────────────── */
const HEX_SLOTS = [
	{
		left: "1%",
		top: "2%",
		width: "94%",
		frame: "#C79A4B",
		frameWidth: 5,
		glow: false,
	},
	{
		left: "68%",
		top: "-3%",
		width: "34%",
		frame: "#FFFFFF",
		frameWidth: 3,
		glow: false,
	},
	{
		left: "69%",
		top: "63%",
		width: "33%",
		frame: "#FFFFFF",
		frameWidth: 3,
		glow: false,
	},
] as const;



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

	// Pause autoplay while tab is in the background
	useEffect(() => {
		const onVis = () => setTabHidden(document.visibilityState === "hidden");
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);

	// Pause autoplay when scrolled offscreen (saves CPU & maintains buttery scrolling)
	const containerRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(true);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				setInView(entry.isIntersecting);
			},
			{ threshold: 0.05 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	// Drives 3-second autoplay + indicator fill
	useAnimationFrame((_, delta) => {
		if (paused || tabHidden || reduceMotion || !inView) return;
		elapsedRef.current += delta;
		const p = Math.min(elapsedRef.current / SLIDE_DURATION_MS, 1);
		progress.set(p);
		if (p >= 1) {
			goTo(activeRef.current + 1);
		}
	});

	const slide = SLIDES[active];

	return (
		<div
			ref={containerRef}
			className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
		>
			{/* ── Left: Headline & Actions ── */}
			<motion.div
				initial="hidden"
				animate="visible"
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.1,
							delayChildren: 0.04,
						},
					},
				}}
				className="lg:col-span-7 space-y-6 text-left"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocusCapture={() => setPaused(true)}
				onBlurCapture={() => setPaused(false)}
				aria-roledescription="carousel"
				aria-label="Ruskin Chemipharm highlights"
			>
				{/* Slide Eyebrow with Cinematic Soft Blur Transition */}
				<motion.div
					variants={{
						hidden: { opacity: 0, x: -16 },
						visible: {
							opacity: 1,
							x: 0,
							transition: { duration: 0.6, ease: EASE_PREMIUM },
						},
					}}
					className="h-5 relative overflow-hidden"
				>
					<AnimatePresence mode="wait" initial={false}>
						<motion.span
							key={slide.id}
							initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
							animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
							transition={{ duration: 0.35, ease: EASE_PREMIUM }}
							className="absolute inset-0 inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase"
						>
							<span className="w-8 h-[2px] bg-[#C79A4B]" />
							{slide.eyebrow}
						</motion.span>
					</AnimatePresence>
				</motion.div>

				{/* Unified Headline & Sub-copy with Cinematic Blur & Smooth Easing */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 22 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.7, ease: EASE_PREMIUM },
						},
					}}
					className="relative min-h-[190px] sm:min-h-[185px] lg:min-h-[195px] grid grid-cols-1 grid-rows-1 items-start"
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={slide.id}
							initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
							transition={{ duration: 0.45, ease: EASE_PREMIUM }}
							className="col-start-1 row-start-1 space-y-3"
						>
							<h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-extrabold text-[#12304A] leading-[1.16] tracking-tight pb-1">
								<span className="block">{slide.lead}</span>
								<span className="text-[#C79A4B] block">{slide.highlight}</span>
							</h1>
							<p className="text-base sm:text-lg text-[#5A7A8E] leading-relaxed max-w-xl font-normal pb-1">
								{slide.copy}
							</p>
						</motion.div>
					</AnimatePresence>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 18 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.65, ease: EASE_PREMIUM },
						},
					}}
					className="flex flex-col sm:flex-row gap-4 pt-1 w-full sm:w-auto"
				>
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
								initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
								animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
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
				</motion.div>
			</motion.div>

			{/* ── Right: Rotating Hex Cluster (Original Fluid Motion) ── */}
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
						// relative index: 0 = Main active, 1 = Next (top-right), 2 = Next+1 (bottom-right)
						const relIndex = (i - active + SLIDES.length) % SLIDES.length;
						const isVisible = relIndex < 3;
						const isMain = relIndex === 0;

						// Target positioning:
						// Visible slots: 0 -> Main, 1 -> Top-Right, 2 -> Bottom-Right
						// Offstage/hidden slots: gently tucked behind bottom-right accent hex with opacity 0 and scale 0.8
						const targetSlot = isVisible
							? HEX_SLOTS[relIndex]
							: {
									left: "70%",
									top: "70%",
									width: "25%",
									frame: "#FFFFFF",
									frameWidth: 2,
									glow: false,
							  };

						// Layering: The hex moving to Main rises on top (zIndex 30).
						// The outgoing Main gracefully slides underneath (zIndex 18).
						// Accent hex 1 is zIndex 12, accent hex 2 is zIndex 10.
						// Hidden slides remain at zIndex 0.
						let zIndex = 0;
						if (isMain) {
							zIndex = isTransitioning ? 30 : 20;
						} else if (isTransitioning && i === prevActive) {
							zIndex = 16;
						} else if (relIndex === 1) {
							zIndex = 12;
						} else if (relIndex === 2) {
							zIndex = 10;
						}

						return (
							<motion.button
								key={s.id}
								type="button"
								id={`hero-hex-${s.id}`}
								aria-label={isMain ? s.image.alt : `Switch to: ${s.eyebrow}`}
								aria-hidden={!isVisible}
								tabIndex={isVisible && !isMain ? 0 : -1}
								onClick={() => isVisible && !isMain && goTo(i)}
								whileHover={isVisible && !isMain ? { scale: 1.035, opacity: 1 } : undefined}
								whileTap={isVisible && !isMain ? { scale: 0.98 } : undefined}
								initial={false}
								animate={{
									left: targetSlot.left,
									top: targetSlot.top,
									width: targetSlot.width,
									opacity: isMain ? 1 : isVisible ? 0.84 : 0,
									scale: isVisible ? 1 : 0.85,
									pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
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
									willChange: "left, top, width, opacity, transform",
									transform: "translateZ(0)",
								}}
								className={`absolute block outline-none focus-visible:ring-2 focus-visible:ring-[#C79A4B] rounded-3xl will-change-transform ${
									isMain
										? "cursor-default"
										: isVisible
										? "cursor-pointer group"
										: "pointer-events-none"
								}`}
							>
								<HexImage
									src={s.image.src}
									alt={s.image.alt}
									frame={targetSlot.frame}
									frameWidth={targetSlot.frameWidth}
									glow={targetSlot.glow}
									priority={i === 0}
									className="w-full h-full !transition-none"
									imgClassName={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
										isMain ? "scale-105" : "scale-100"
									}`}
								/>
							</motion.button>
						);
					})}
				</motion.div>
			</motion.div>
		</div>
	);
}
