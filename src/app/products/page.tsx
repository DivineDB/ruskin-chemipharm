"use client";

import React, { useState, useMemo, useEffect, useRef, useDeferredValue, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";
import CustomSelect from "../components/CustomSelect";
import { MolecularDecoration, hexPoints } from "../components/Hex";
import SectionHeader from "../components/SectionHeader";
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, ApiProduct } from "@/lib/products";
import { FINISHED_PRODUCTS } from "@/data/finished-formulations";
import { useScrollLock } from "@/lib/scrollLock";
import { useProductTransition } from "../context/ProductTransitionContext";
import {
	Search,
	ChevronLeft,
	ChevronRight,
	X,
	CheckCircle2,
	ArrowUpRight,
	ArrowRight,
	FlaskConical,
	Copy,
	Check,
} from "lucide-react";

const DIVISION_TITLE_MAP: Record<string, string> = {
	"human-pharma": "Human Pharmaceuticals",
	"human-nutra": "Human Supplements",
	"vet-pharma": "Veterinary Pharmaceuticals",
	"vet-supplements": "Veterinary Feed Supplements",
	ectoparasiticides: "Ectoparasiticides",
};

const DIVISION_SHORT_MAP: Record<string, string> = {
	"human-pharma": "Human Pharma",
	"human-nutra": "Nutraceutical",
	"vet-pharma": "Vet Pharma",
	"vet-supplements": "Vet Feed",
	ectoparasiticides: "Parasiticide",
};

function formatStandard(standard?: string): string {
	if (!standard) return "WHO-GMP";
	if (standard.includes("Feed")) return "Feed Grade";
	if (standard === "Nutraceutical") return "Nutra";
	return standard;
}

export type UnifiedProduct =
	| ({
			kind: "api";
	  } & ApiProduct)
	| {
			kind: "formulation";
			id: string;
			slug: string;
			name: string;
			composition: string;
			category: string;
			division: string;
			divisionTitle: string;
			shortDivision: string;
			form: string;
			packSize: string;
			description: string;
			standard?: string;
			targetSpecies?: string;
	  };

const UNIFIED_CATALOG_PRODUCTS: UnifiedProduct[] = [
	...ALL_PRODUCTS.map((p) => ({
		...p,
		kind: "api" as const,
	})),
	...FINISHED_PRODUCTS.map((f) => ({
		kind: "formulation" as const,
		id: f.id,
		slug: f.id,
		name: f.name,
		composition: f.composition,
		category: f.category,
		division: f.division,
		divisionTitle: DIVISION_TITLE_MAP[f.division] || f.division,
		shortDivision: DIVISION_SHORT_MAP[f.division] || f.division,
		form: f.form,
		packSize: f.packSize,
		description: f.description,
		standard: f.standard,
		targetSpecies: f.targetSpecies,
	})),
];

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

const INQUIRY_OPTIONS = [
	{ value: "Product Enquiry", label: "Product Enquiry" },
	{ value: "Custom Synthesis", label: "Custom Synthesis" },
	{ value: "Regulatory Dossier", label: "Regulatory Dossier (USDMF / CEP)" },
	{ value: "Sample Request", label: "Sample Request & COA" },
];

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

function ProductsContent() {
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get("category");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { startTransition, isTransitioningFor } = useProductTransition();

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

	const bannerRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
	const bannerRafRef = useRef<number | null>(null);

	const updateBannerRect = () => {
		if (bannerRef.current) {
			const r = bannerRef.current.getBoundingClientRect();
			bannerRectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
		}
	};

	const handleBannerMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (!bannerRectRef.current) updateBannerRect();
		const rect = bannerRectRef.current;
		if (!rect || rect.width === 0 || rect.height === 0) return;
		const clientX = e.clientX;
		const clientY = e.clientY;
		if (!bannerRafRef.current) {
			bannerRafRef.current = requestAnimationFrame(() => {
				const normX = (clientX - rect.left) / rect.width - 0.5;
				const normY = (clientY - rect.top) / rect.height - 0.5;
				bannerMouseX.set(normX);
				bannerMouseY.set(normY);
				bannerRafRef.current = null;
			});
		}
	};

	const handleBannerMouseLeave = () => {
		if (bannerRafRef.current) {
			cancelAnimationFrame(bannerRafRef.current);
			bannerRafRef.current = null;
		}
		bannerMouseX.set(0);
		bannerMouseY.set(0);
	};

	const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialSearch);
	const [typeFilter, setTypeFilter] = useState<"all" | "api" | "formulation">("all");
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 16;

	// ─── Sync with Incoming URL Query Parameters (?type=formulation, ?category=human-pharmaceuticals, etc.) ───
	useEffect(() => {
		const t = searchParams.get("type")?.toLowerCase();
		const catParam = searchParams.get("category");

		let resolvedType: "all" | "api" | "formulation" = "all";
		let resolvedCat: string = "All";

		if (t === "formulation" || t === "formulations") {
			resolvedType = "formulation";
		} else if (t === "api" || t === "apis") {
			resolvedType = "api";
		}

		if (catParam) {
			const lowerCat = catParam.toLowerCase();
			if (lowerCat === "human-pharmaceuticals" || lowerCat === "human-pharma") {
				resolvedType = "formulation";
				resolvedCat = "Human Pharmaceuticals";
			} else if (
				lowerCat === "human-supplements" ||
				lowerCat === "human-nutra" ||
				lowerCat === "nutraceuticals"
			) {
				resolvedType = "formulation";
				resolvedCat = "Human Supplements";
			} else if (
				lowerCat === "veterinary-pharmaceuticals" ||
				lowerCat === "vet-pharma"
			) {
				resolvedType = "formulation";
				resolvedCat = "Veterinary Pharmaceuticals";
			} else if (
				lowerCat === "veterinary-feed-supplements" ||
				lowerCat === "vet-supplements"
			) {
				resolvedType = "formulation";
				resolvedCat = "Veterinary Feed Supplements";
			} else if (lowerCat === "ectoparasiticides") {
				resolvedType = "formulation";
				resolvedCat = "Ectoparasiticides";
			} else {
				const apiMatch = PRODUCT_CATEGORIES.find(
					(c) => c.name.toLowerCase() === lowerCat
				);
				if (apiMatch) {
					resolvedType = "api";
					resolvedCat = apiMatch.name;
				} else {
					resolvedCat = catParam;
				}
			}
		} else if (initialCategory) {
			const lowerInitial = initialCategory.toLowerCase();
			if (lowerInitial.includes("pharma") && lowerInitial.includes("human")) {
				resolvedType = "formulation";
				resolvedCat = "Human Pharmaceuticals";
			} else if (lowerInitial.includes("supplement") || lowerInitial.includes("nutra")) {
				resolvedType = "formulation";
				resolvedCat = "Human Supplements";
			} else if (lowerInitial.includes("vet") && lowerInitial.includes("feed")) {
				resolvedType = "formulation";
				resolvedCat = "Veterinary Feed Supplements";
			} else if (lowerInitial.includes("vet")) {
				resolvedType = "formulation";
				resolvedCat = "Veterinary Pharmaceuticals";
			} else if (lowerInitial.includes("ecto")) {
				resolvedType = "formulation";
				resolvedCat = "Ectoparasiticides";
			} else {
				resolvedCat = initialCategory;
			}
		}

		setTypeFilter(resolvedType);
		if (resolvedCat !== "All") {
			setSelectedCategory(resolvedCat);
		}
		setCurrentPage(1);

		if (t || catParam || initialCategory) {
			const timer = setTimeout(() => {
				const el = document.getElementById("catalog-content");
				if (el) {
					if (typeof window !== "undefined" && (window as any).__lenis) {
						(window as any).__lenis.scrollTo(el, { offset: -90 });
					} else {
						el.scrollIntoView({ behavior: "smooth" });
					}
				}
			}, 120);
			return () => clearTimeout(timer);
		}
	}, [searchParams, initialCategory]);

	useEffect(() => {
		const handleSelectCategory = (e: any) => {
			const cat = e.detail?.category;
			if (cat) {
				setSelectedCategory(cat);
				setSearchQuery("");
				setCurrentPage(1);
				const el = document.getElementById("catalog-content");
				if (el) {
					if (typeof window !== "undefined" && (window as any).__lenis) {
						(window as any).__lenis.scrollTo(el, { offset: -90 });
					} else {
						el.scrollIntoView({ behavior: "smooth" });
					}
				}
			}
		};
		window.addEventListener("ruskin:select-category", handleSelectCategory);
		return () =>
			window.removeEventListener("ruskin:select-category", handleSelectCategory);
	}, []);

	useEffect(() => {
		const s = searchParams.get("search") || searchParams.get("q");
		if (s) {
			setSearchQuery(s);
		}
	}, [searchParams]);

	useEffect(() => {
		if (
			searchParams.get("focusSearch") === "true" ||
			searchParams.get("search") === "focus"
		) {
			searchInputRef.current?.focus();
		}
	}, [searchParams]);

	// ─── Dynamic Categories by Type Filter ───
	const categories = useMemo(() => {
		if (typeFilter === "api") {
			return [
				{ name: "All", count: ALL_PRODUCTS.length },
				...PRODUCT_CATEGORIES,
			];
		}

		if (typeFilter === "formulation") {
			return [
				{ name: "All", count: FINISHED_PRODUCTS.length },
				{
					name: "Human Pharmaceuticals",
					count: FINISHED_PRODUCTS.filter((p) => p.division === "human-pharma").length,
				},
				{
					name: "Human Supplements",
					count: FINISHED_PRODUCTS.filter((p) => p.division === "human-nutra").length,
				},
				{
					name: "Veterinary Pharmaceuticals",
					count: FINISHED_PRODUCTS.filter((p) => p.division === "vet-pharma").length,
				},
				{
					name: "Veterinary Feed Supplements",
					count: FINISHED_PRODUCTS.filter((p) => p.division === "vet-supplements").length,
				},
				{
					name: "Ectoparasiticides",
					count: FINISHED_PRODUCTS.filter((p) => p.division === "ectoparasiticides").length,
				},
			];
		}

		// typeFilter === "all"
		return [
			{ name: "All", count: UNIFIED_CATALOG_PRODUCTS.length },
			{ name: "APIs", count: ALL_PRODUCTS.length },
			{
				name: "Human Pharmaceuticals",
				count: FINISHED_PRODUCTS.filter((p) => p.division === "human-pharma").length,
			},
			{
				name: "Human Supplements",
				count: FINISHED_PRODUCTS.filter((p) => p.division === "human-nutra").length,
			},
			{
				name: "Veterinary Pharmaceuticals",
				count: FINISHED_PRODUCTS.filter((p) => p.division === "vet-pharma").length,
			},
			{
				name: "Veterinary Feed Supplements",
				count: FINISHED_PRODUCTS.filter((p) => p.division === "vet-supplements").length,
			},
			{
				name: "Ectoparasiticides",
				count: FINISHED_PRODUCTS.filter((p) => p.division === "ectoparasiticides").length,
			},
		];
	}, [typeFilter]);

	const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(
		null,
	);
	const [inquirySubmitted, setInquirySubmitted] = useState(false);
	const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
	const [inquiryType, setInquiryType] = useState("Product Enquiry");

	const deferredSearchQuery = useDeferredValue(searchQuery);

	const filteredProducts = useMemo(() => {
		return UNIFIED_CATALOG_PRODUCTS.filter((product) => {
			// 1. Type Filter
			if (typeFilter === "api" && product.kind !== "api") return false;
			if (typeFilter === "formulation" && product.kind !== "formulation") return false;

			// 2. Category Filter
			if (selectedCategory !== "All") {
				if (selectedCategory === "APIs") {
					if (product.kind !== "api") return false;
				} else if (selectedCategory === "Formulations") {
					if (product.kind !== "formulation") return false;
				} else if (product.kind === "api") {
					if (product.category !== selectedCategory) return false;
				} else if (product.kind === "formulation") {
					if (
						product.divisionTitle !== selectedCategory &&
						product.category !== selectedCategory
					) {
						return false;
					}
				}
			}

			// 3. Search Query
			if (deferredSearchQuery.trim() !== "") {
				const q = deferredSearchQuery.toLowerCase();
				if (product.kind === "api") {
					return (
						product.name.toLowerCase().includes(q) ||
						product.casNumber.toLowerCase().includes(q) ||
						product.category.toLowerCase().includes(q) ||
						product.manufacturer.toLowerCase().includes(q) ||
						product.description.toLowerCase().includes(q)
					);
				} else {
					return (
						product.name.toLowerCase().includes(q) ||
						product.composition.toLowerCase().includes(q) ||
						product.category.toLowerCase().includes(q) ||
						product.divisionTitle.toLowerCase().includes(q) ||
						product.form.toLowerCase().includes(q) ||
						(product.standard && product.standard.toLowerCase().includes(q)) ||
						(product.targetSpecies && product.targetSpecies.toLowerCase().includes(q)) ||
						product.description.toLowerCase().includes(q)
					);
				}
			}

			return true;
		});
	}, [typeFilter, selectedCategory, deferredSearchQuery]);

	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
	const paginatedProducts = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return filteredProducts.slice(start, start + pageSize);
	}, [filteredProducts, currentPage, pageSize]);

	const handleTypeFilterChange = (type: "all" | "api" | "formulation") => {
		setTypeFilter(type);
		setSelectedCategory("All");
		setCurrentPage(1);

		if (typeof window !== "undefined") {
			const url = new URL(window.location.href);
			if (type === "all") {
				url.searchParams.delete("type");
			} else {
				url.searchParams.set("type", type);
			}
			url.searchParams.delete("category");
			window.history.replaceState(null, "", url.toString());
		}
	};

	const handleCategoryChange = (cat: string) => {
		setSelectedCategory(cat);
		setCurrentPage(1);

		if (typeof window !== "undefined") {
			const url = new URL(window.location.href);
			if (cat === "All") {
				url.searchParams.delete("category");
			} else {
				const reverseDivision = Object.entries(DIVISION_TITLE_MAP).find(
					([, title]) => title === cat
				);
				if (reverseDivision) {
					const slugMap: Record<string, string> = {
						"human-pharma": "human-pharmaceuticals",
						"human-nutra": "human-supplements",
						"vet-pharma": "veterinary-pharmaceuticals",
						"vet-supplements": "veterinary-feed-supplements",
						ectoparasiticides: "ectoparasiticides",
					};
					url.searchParams.set(
						"category",
						slugMap[reverseDivision[0]] || reverseDivision[0]
					);
				} else {
					url.searchParams.set("category", cat);
				}
			}
			window.history.replaceState(null, "", url.toString());
		}
	};

	const handleOpenQuote = (
		productName?: string,
		note?: string,
		description?: string,
		composition?: string
	) => {
		if (typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("ruskin:open-quote", {
					detail: {
						product: productName || "",
						note:
							note ||
							(productName
								? `Inquiry for ${productName}. Please provide batch COA and commercial quote.`
								: "Commercial inquiry for Ruskin Chemipharm products portfolio."),
						description: description || "",
						composition: composition || "",
					},
				})
			);
		}
	};

	const [copiedCas, setCopiedCas] = useState<string | null>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	// Ambient biochemical molecular floating drift
	useEffect(() => {
		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const ctx = gsap.context(() => {
			gsap.to(".ambient-float-1", {
				y: -14,
				rotation: 3,
				duration: 5.5,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".ambient-float-2", {
				y: 12,
				rotation: -3.5,
				duration: 6.2,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".ambient-float-hex-1", {
				y: -10,
				x: 6,
				rotation: 6,
				duration: 4.8,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});
			gsap.to(".ambient-float-hex-2", {
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

	// Zero-lag GPU batch card stagger on category & search filter changes
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const cards = grid.querySelectorAll(".product-catalog-card");
		if (!cards.length) return;

		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		gsap.fromTo(
			cards,
			{ opacity: 0, y: 16, scale: 0.98 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.35,
				stagger: {
					amount: 0.16,
					from: "start",
				},
				ease: "power2.out",
				overwrite: "auto",
			}
		);
	}, [selectedCategory, currentPage, deferredSearchQuery]);

	const handleCopyCas = (e: React.MouseEvent, cas: string) => {
		e.preventDefault();
		e.stopPropagation();
		navigator.clipboard.writeText(cas);
		setCopiedCas(cas);
		setTimeout(() => setCopiedCas(null), 2000);
	};

	// Freeze background scroll & Lenis when detail modal is open
	useScrollLock(selectedProduct !== null);

	// Escape key handling for open modals
	useEffect(() => {
		if (!selectedProduct) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setSelectedProduct(null);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedProduct]);

	useEffect(() => {
		const handleSearch = () => {
			searchInputRef.current?.focus();
			if (typeof window !== "undefined" && (window as any).__lenis && searchInputRef.current) {
				(window as any).__lenis.scrollTo(searchInputRef.current, { offset: -120 });
			} else {
				searchInputRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		};
		window.addEventListener("ruskin:open-search", handleSearch);
		return () => {
			window.removeEventListener("ruskin:open-search", handleSearch);
		};
	}, []);

	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
			{/* ══════════════════════════════════════════════════════
          HERO HEADER — Deep Navy Banner with Wave & Services-Style Stats
          ══════════════════════════════════════════════════════ */}
			<section
				ref={bannerRef}
				onMouseMove={handleBannerMouseMove}
				onMouseLeave={handleBannerMouseLeave}
				className="relative bg-[#0B1E2E] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden"
			>
				{/* ── Live Floating Hex & Molecular Lattice Background (Subtle Cursor Parallax) ── */}
				<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
					{/* Layer 1: Subtle Small Molecular Cluster (Bottom Right) */}
					<motion.div
						style={{ x: layerDeepX, y: layerDeepY }}
						className="absolute -right-6 sm:right-0 bottom-2 sm:bottom-4 lg:bottom-6 w-[200px] sm:w-[240px] lg:w-[270px] hidden md:block will-change-transform"
					>
						<div className="ambient-float-1 will-change-transform">
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
						<div className="ambient-float-2 will-change-transform">
							<MolecularDecoration
								color="#FFFFFF"
								opacity={0.12}
								className="w-full h-auto"
							/>
						</div>
					</motion.div>

					{/* Layer 3: Two Delicate Floating Geometric Hexagons with Soft Drift & Physics Parallax */}
					{/* Micro-Hex 1: Delicate Gold Ring with Atom Center (Upper Right) */}
					<motion.div
						style={{ x: layerForeX, y: layerForeY }}
						className="absolute top-14 right-[16%] hidden lg:block will-change-transform"
					>
						<div className="ambient-float-hex-1 will-change-transform">
							<FloatingHex size={26} color="#C79A4B" opacity={0.25} strokeWidth={1.2} hasDot />
						</div>
					</motion.div>

					{/* Micro-Hex 2: Delicate Ice-White Hexagon (Lower Mid Left) */}
					<motion.div
						style={{ x: layerMidX, y: layerMidY }}
						className="absolute bottom-12 left-[12%] hidden sm:block will-change-transform"
					>
						<div className="ambient-float-hex-2 will-change-transform">
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
								eyebrow="Commercial Sourcing Catalog"
								lead="APIs & Finished"
								highlight="Dosage Formulations"
								description={`Explore our comprehensive catalog of ${UNIFIED_CATALOG_PRODUCTS.length}+ high-purity APIs, veterinary actives, finished dosage formulations, and specialty intermediates sourced directly from audited global manufacturing partners.`}
							/>

							{/* Hero CTA Buttons */}
							<div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
								<motion.button
									id="banner-cta-catalog"
									whileHover={{ scale: 1.02, y: -1 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										setCurrentPage(1);
										const el = document.getElementById("catalog-content");
										if (el) {
											if (typeof window !== "undefined" && (window as any).__lenis) {
												(window as any).__lenis.scrollTo(el, { offset: -90 });
											} else {
												el.scrollIntoView({ behavior: "smooth" });
											}
										}
									}}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-colors cursor-pointer bg-[#C79A4B] border border-[#C79A4B] text-white hover:bg-[#B58A3E] hover:border-[#B58A3E] shadow-sm"
								>
									<FlaskConical className="w-4 h-4" />
									<span>Explore Product Catalog</span>
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.02, y: -1 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleOpenQuote()}
									className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer border border-white/20 text-white hover:bg-white/10 hover:border-white/30 active:scale-[0.98]"
								>
									<span>Request Commercial Quote</span>
									<ArrowRight className="w-4 h-4 text-[#C79A4B]" />
								</motion.button>
							</div>
						</motion.div>

						{/* Right Column: Key Operational Metrics with Elegant Vertical Anchor */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
							style={{ transform: "translateZ(0)" }}
							className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-7 pl-0 lg:pl-8 lg:border-l lg:border-white/10 text-left gpu-smooth"
						>
							{[
								{
									val: ALL_PRODUCTS.length,
									suffix: "+",
									label: "Registered Products",
									sub: "Active DCGI Catalog",
								},
								{
									val: 250,
									suffix: "+",
									label: "Audited Facilities",
									sub: "Global cGMP Sites",
								},
								{
									val: 30,
									suffix: "+",
									label: "Export Markets",
									sub: "Worldwide Network",
								},
								{
									val: 40,
									suffix: "+",
									label: "Years in Market",
									sub: "Founded in 1984",
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

				{/* Bottom Wave Transition to Light Canvas */}
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

			{/* ══════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
			<main id="catalog-content" className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 sm:space-y-7">
				{/* Search Bar on the top */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.45,
						delay: 0.22,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="relative max-w-full"
				>
					<Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A7A8E]" />
					<input
						ref={searchInputRef}
						type="text"
						placeholder={
							typeFilter === "formulation"
								? "Search by formulation name, composition, indication, or form..."
								: typeFilter === "api"
								? "Search by API Name, CAS No., or Manufacturer..."
								: "Search by Product Name, Active Composition, CAS No., or Category..."
						}
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setCurrentPage(1);
						}}
						className="w-full bg-white border-2 border-[#12304A]/10 focus:border-[#C79A4B] rounded-full py-4 pl-14 pr-24 text-[#12304A] text-sm placeholder-[#5A7A8E]/60 focus:outline-none transition-all shadow-sm font-medium"
					/>
					{searchQuery && (
						<button
							type="button"
							onClick={() => {
								setSearchQuery("");
								setCurrentPage(1);
							}}
							className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#5A7A8E] hover:text-[#12304A] hover:bg-[#12304A]/5 transition-colors"
							title="Clear Search"
						>
							<X className="w-4 h-4" />
						</button>
					)}
					<div
						className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
						style={{
							clipPath:
								"polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
							background: "#C79A4B",
						}}
					>
						<Search className="w-4 h-4 text-white stroke-[2.5]" />
					</div>
				</motion.div>

				{/* ══ TOOLBAR ROW: Segmented Control Tabs (Left) & Results Counter + Reset (Right) ══ */}
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
					className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 pt-1"
				>
					{/* Segmented Control Tabs: [ All Products | APIs | Formulations ] */}
					<div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#12304A]/10 shadow-xs max-w-full overflow-x-auto custom-scrollbar">
						{[
							{ id: "all", label: "All Products", count: UNIFIED_CATALOG_PRODUCTS.length },
							{ id: "api", label: "APIs", count: ALL_PRODUCTS.length },
							{ id: "formulation", label: "Formulations", count: FINISHED_PRODUCTS.length },
						].map((tab) => {
							const isActive = typeFilter === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => handleTypeFilterChange(tab.id as "all" | "api" | "formulation")}
									className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
										isActive
											? "bg-[#12304A] text-white shadow-sm"
											: "text-[#5A7A8E] hover:text-[#12304A] hover:bg-[#FAF7F2]"
									}`}
								>
									<span>{tab.label}</span>
									<span
										className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
											isActive
												? "bg-[#C79A4B] text-white"
												: "bg-[#12304A]/6 text-[#5A7A8E]"
										}`}
									>
										{tab.count}
									</span>
								</button>
							);
						})}
					</div>

					{/* Clean Live Results Counter & Reset Action */}
					<div className="flex items-center gap-3 justify-between sm:justify-end">
						<p className="text-xs sm:text-sm text-[#5A7A8E] font-medium">
							Showing{" "}
							<span className="text-[#12304A] font-bold">
								{filteredProducts.length}
							</span>{" "}
							{typeFilter === "all"
								? "products"
								: typeFilter === "api"
								? "API products"
								: "formulations"}
							{selectedCategory !== "All" && (
								<span className="hidden md:inline">
									{" "}in{" "}
									<span className="text-[#C79A4B] font-bold">
										{selectedCategory}
									</span>
								</span>
							)}
						</p>
						{(selectedCategory !== "All" || searchQuery) && (
							<motion.button
								whileHover={{ scale: 1.04 }}
								whileTap={{ scale: 0.96 }}
								onClick={() => {
									setSelectedCategory("All");
									setSearchQuery("");
									if (typeof window !== "undefined") {
										const url = new URL(window.location.href);
										url.searchParams.delete("category");
										url.searchParams.delete("search");
										url.searchParams.delete("q");
										window.history.replaceState(null, "", url.toString());
									}
								}}
								className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#12304A]/10 hover:border-[#C79A4B]/40 text-[#12304A] text-xs font-bold transition-all shadow-xs cursor-pointer"
								title="Reset active category & search query"
							>
								<X className="w-3 h-3 text-[#C79A4B]" />
								<span>Reset</span>
							</motion.button>
						)}
					</div>
				</motion.div>

				{/* ══ CATEGORY SUB-NAVIGATION PILLS ══ */}
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.45,
						delay: 0.34,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="flex flex-wrap items-center gap-2 pt-0.5"
				>
					{categories.map((cat, catIdx) => {
						const isActive = selectedCategory === cat.name;
						return (
							<motion.button
								key={cat.name}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3, delay: 0.36 + catIdx * 0.02 }}
								whileHover={{ scale: 1.04 }}
								whileTap={{ scale: 0.96 }}
								onClick={() => handleCategoryChange(cat.name)}
								className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-[background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-2 border cursor-pointer ${
									isActive
										? "bg-[#12304A] text-white border-[#12304A] shadow-md"
										: "bg-white text-[#5A7A8E] border-[#12304A]/10 hover:border-[#C79A4B]/50 hover:text-[#12304A]"
								}`}
							>
								<span>{cat.name}</span>
								<span
									className={`stat-num text-[10px] px-1.5 py-0.5 rounded-full ${
										isActive
											? "bg-[#C79A4B] text-white"
											: "bg-[#12304A]/6 text-[#5A7A8E]"
									}`}
								>
									{cat.count}
								</span>
							</motion.button>
						);
					})}
				</motion.div>

				{/* ══ ACTIVE FILTER DRILL-DOWN CHIPS (Only when sub-filtering by search or category) ══ */}
				{(selectedCategory !== "All" || searchQuery) && (
					<motion.div
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="flex flex-wrap items-center gap-2 pt-1 pb-1 text-xs"
					>
						<span className="font-bold text-[#5A7A8E] text-[11px] uppercase tracking-wider">
							Active Filters:
						</span>
						{selectedCategory !== "All" && (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#12304A]/10 text-[#12304A] font-semibold shadow-2xs">
								Category:{" "}
								<span className="text-[#C79A4B] font-bold">
									{selectedCategory}
								</span>
								<button
									onClick={() => handleCategoryChange("All")}
									className="hover:text-[#C79A4B] transition-colors cursor-pointer"
									title="Clear category filter"
								>
									<X className="w-3 h-3" />
								</button>
							</span>
						)}
						{searchQuery && (
							<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#12304A]/10 text-[#12304A] font-semibold shadow-2xs">
								Query:{" "}
								<span className="text-[#C79A4B] font-bold">
									&quot;{searchQuery}&quot;
								</span>
								<button
									onClick={() => setSearchQuery("")}
									className="hover:text-[#C79A4B] transition-colors cursor-pointer"
									title="Clear search query"
								>
									<X className="w-3 h-3" />
								</button>
							</span>
						)}
					</motion.div>
				)}

				{/* ══ PRODUCT CARDS — Premium Fluid Stagger & Micro-Interactions ══ */}
				{paginatedProducts.length > 0 ? (
					<AnimatePresence mode="wait">
						<motion.div
							key={`${typeFilter}-${selectedCategory}-${currentPage}-${deferredSearchQuery}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.12, ease: "easeOut" }}
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
							ref={gridRef}
						>
							{paginatedProducts.map((product) => {
								if (product.kind === "api") {
									const isTransitioning = isTransitioningFor(product.name);
									return (
										<motion.div
											key={product.id}
											whileHover={{
												y: -4,
												transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
											}}
											className="product-catalog-card relative bg-[#0B1E2E] border border-white/[0.08] hover:border-[#C79A4B]/35 rounded-[22px] overflow-hidden shadow-sm hover:shadow-[0_16px_36px_-8px_rgba(7,21,33,0.5)] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer flex flex-col gpu-smooth"
										>
											<Link
												href={`/products/${product.slug}`}
												prefetch={true}
												onClick={(e) => {
													if (
														e.metaKey ||
														e.ctrlKey ||
														e.shiftKey ||
														e.altKey ||
														e.button !== 0
													) {
														return;
													}
													e.preventDefault();
													const headingEl = e.currentTarget.querySelector("h3");
													if (headingEl) {
														startTransition(
															product,
															headingEl,
															e.currentTarget.parentElement
														);
													}
												}}
												className="relative flex flex-col flex-1 p-5"
											>
												{/* Top Row: Discreet micro category tag & Quick Actions */}
												<div className="flex items-center justify-between mb-3.5">
													<div className="flex items-center gap-1.5">
														<span className="text-[9.5px] font-medium text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full uppercase tracking-widest">
															{product.category}
														</span>
														<span className="text-[9px] font-bold text-[#C79A4B] bg-[#C79A4B]/10 border border-[#C79A4B]/20 px-2 py-0.5 rounded-full">
															API
														</span>
													</div>
													<div className="flex items-center gap-1.5">
														<motion.button
															type="button"
															whileHover={{ scale: 1.05 }}
															whileTap={{ scale: 0.95 }}
															onClick={(e) => {
																e.preventDefault();
																e.stopPropagation();
																handleOpenQuote(product.name);
															}}
															className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-semibold text-slate-200 hover:text-white bg-white/10 hover:bg-[#C79A4B] px-2.5 py-0.5 rounded-full cursor-pointer"
															title="Instant Quote Request"
														>
															Quote
														</motion.button>
														<div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.04] group-hover:bg-[#C79A4B] text-slate-400 group-hover:text-white transition-[background-color,color] duration-200">
															<ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
														</div>
													</div>
												</div>

												{/* Primary Focus: Prominent Product Name */}
												<div className="flex-1 flex flex-col justify-start mb-4">
													<h3
														className={`text-base sm:text-[17px] font-bold text-white leading-snug tracking-tight group-hover:text-[#E5C378] transition-colors duration-200 ${
															isTransitioning ? "opacity-0 select-none" : "opacity-100"
														}`}
													>
														{product.name}
													</h3>
												</div>

												{/* Bottom Row: Technical Specs & CAS */}
												<div className="pt-3 border-t border-white/[0.08] space-y-1.5 text-xs">
													<div className="flex justify-between items-center text-[11px]">
														<span className="text-slate-400 font-mono">
															CAS:{" "}
															<span className="text-slate-200 font-medium">
																{product.casNumber}
															</span>
														</span>
														<motion.button
															type="button"
															whileHover={{ scale: 1.08 }}
															whileTap={{ scale: 0.92 }}
															onClick={(e) => handleCopyCas(e, product.casNumber)}
															className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200 transition-colors px-1.5 py-0.5 rounded hover:bg-white/5 cursor-pointer"
															title="Copy CAS to clipboard"
														>
															{copiedCas === product.casNumber ? (
																<motion.span
																	initial={{ scale: 0.7 }}
																	animate={{ scale: 1 }}
																	className="inline-flex items-center gap-1"
																>
																	<Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
																	<span className="text-emerald-400 font-medium text-[9px]">
																		Copied
																	</span>
																</motion.span>
															) : (
																<>
																	<Copy className="w-3 h-3 text-slate-400" />
																	<span className="text-[9px]">Copy</span>
																</>
															)}
														</motion.button>
													</div>
													<div className="flex justify-between items-center text-[11px]">
														<span className="text-slate-400">
															Purity:{" "}
															<span className="stat-num text-slate-200 font-semibold">
																{product.purity}
															</span>
														</span>
														<span className="text-[10px] font-medium text-slate-400">
															{product.dmfStatus}
														</span>
													</div>
												</div>
											</Link>
										</motion.div>
									);
								}

								// Formulation product card
								return (
									<motion.div
										key={product.id}
										whileHover={{
											y: -4,
											transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
										}}
										onClick={() =>
											handleOpenQuote(
												product.name,
												`Inquiry for ${product.name} (${product.composition}). Dosage form: ${product.form}. Packaging: ${product.packSize}. Standard: ${product.standard || "WHO-GMP"}.`,
												product.description,
												product.composition
											)
										}
										className="product-catalog-card relative bg-[#0B1E2E] border border-white/[0.08] hover:border-[#C79A4B]/40 rounded-[22px] overflow-hidden shadow-sm hover:shadow-[0_16px_36px_-8px_rgba(7,21,33,0.5)] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group cursor-pointer flex flex-col p-5 gpu-smooth"
									>
										{/* Top Row: Discreet micro category tag & Quick Actions */}
										<div className="flex items-center justify-between gap-2 mb-3.5">
											<div className="flex items-center gap-1.5 min-w-0">
												<span className="text-[9.5px] font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
													{product.shortDivision}
												</span>
												<span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
													FORMULATION
												</span>
											</div>
											<div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/[0.04] group-hover:bg-[#C79A4B] text-slate-400 group-hover:text-white transition-[background-color,color] duration-200 shrink-0">
												<ArrowUpRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
											</div>
										</div>

										{/* Primary Focus: Prominent Product Name */}
										<div className="flex-1 flex flex-col justify-start mb-4">
											<h3 className="text-base sm:text-[17px] font-bold text-white leading-snug tracking-tight group-hover:text-[#E5C378] transition-colors duration-200">
												{product.name}
											</h3>
										</div>

										{/* Bottom Row: Technical Specs */}
										<div className="pt-3 border-t border-white/[0.08] space-y-1.5 text-xs">
											<div className="flex justify-between items-center text-[11px]">
												<span className="text-slate-400">
													Form:{" "}
													<span className="text-slate-200 font-medium">
														{product.form}
													</span>
												</span>
												<span className="text-[10px] font-semibold text-[#C79A4B] bg-[#C79A4B]/10 border border-[#C79A4B]/20 px-1.5 py-0.5 rounded tracking-wide">
													{formatStandard(product.standard)}
												</span>
											</div>
											<div className="flex justify-between items-center text-[11px] gap-2">
												<span
													className="text-slate-400 truncate max-w-[155px]"
													title={product.packSize}
												>
													Pack: <span className="text-slate-300 font-medium">{product.packSize}</span>
												</span>
												<span
													className="text-[10px] text-slate-400 font-medium truncate max-w-[110px] text-right"
													title={product.targetSpecies ? `Target: ${product.targetSpecies}` : "Human Grade"}
												>
													{product.targetSpecies ? `Target: ${product.targetSpecies.split(",")[0].trim()}` : "Human Care"}
												</span>
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					</AnimatePresence>
				) : (
					<div className="bg-white border border-[#12304A]/8 rounded-2xl p-12 text-center space-y-3 shadow-md">
						<div
							className="w-16 h-16 mx-auto flex items-center justify-center"
							style={{
								clipPath:
									"polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
								background: "#12304A",
							}}
						>
							<FlaskConical className="w-7 h-7 text-white" />
						</div>
						<p className="text-lg font-bold text-[#12304A]">
							No products found
						</p>
						<p className="text-xs text-[#5A7A8E]">
							Try searching for a different CAS number or clear filters.
						</p>
						<button
							onClick={() => {
								setSearchQuery("");
								setSelectedCategory("All");
							}}
							className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C79A4B] text-white text-xs font-bold hover:bg-[#B58A3E] transition-colors mt-2"
						>
							Reset All Filters
						</button>
					</div>
				)}

				{/* Pagination with smooth spring interactions */}
				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-4 pt-2">
						<motion.button
							whileHover={currentPage !== 1 ? { scale: 1.08 } : undefined}
							whileTap={currentPage !== 1 ? { scale: 0.92 } : undefined}
							onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
							disabled={currentPage === 1}
							className={`w-11 h-11 flex items-center justify-center rounded-full font-extrabold transition-all shadow-md ${
								currentPage === 1
									? "bg-[#12304A]/15 text-[#12304A]/30 cursor-not-allowed"
									: "bg-[#12304A] text-white hover:bg-[#0B1E2E]"
							}`}
						>
							<ChevronLeft className="w-5 h-5 stroke-[2.5]" />
						</motion.button>

						<div className="bg-white border border-[#12304A]/10 rounded-full px-8 py-2 text-sm font-bold text-[#12304A] shadow-sm">
							{currentPage} / {totalPages}
						</div>

						<motion.button
							whileHover={
								currentPage !== totalPages ? { scale: 1.08 } : undefined
							}
							whileTap={
								currentPage !== totalPages ? { scale: 0.92 } : undefined
							}
							onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
							disabled={currentPage === totalPages}
							className={`w-11 h-11 flex items-center justify-center rounded-full font-extrabold transition-all shadow-md ${
								currentPage === totalPages
									? "bg-[#12304A]/15 text-[#12304A]/30 cursor-not-allowed"
									: "bg-[#C79A4B] text-white hover:bg-[#B58A3E]"
							}`}
						>
							<ChevronRight className="w-5 h-5 stroke-[2.5]" />
						</motion.button>
					</div>
				)}

				{/* ══ CUSTOM INQUIRY FORM ══ */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-60px" }}
					transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
					className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl"
					style={{
						background: "linear-gradient(135deg, #F5F0E8 0%, #FAF7F2 100%)",
						border: "1.5px solid rgba(18,48,74,0.08)",
					}}
				>
					<div className="relative p-8 sm:p-12 space-y-8 text-left">
						<div className="space-y-3 border-b border-[#12304A]/8 pb-6">
							<span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
								<div className="w-8 h-[2px] bg-[#C79A4B]" />
								Custom Sourcing Request
							</span>
							<h2
								style={{ fontWeight: 800 }}
								className="text-2xl sm:text-3xl text-[#12304A] tracking-tight"
							>
								Can't find what you need?
							</h2>
							<div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
							<p className="text-sm text-[#5A7A8E] leading-relaxed max-w-2xl font-normal">
								We source beyond our listed products. Tell us what you're
								looking for and we'll find it.
							</p>
						</div>

						{!inquirySubmitted ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setIsSubmittingInquiry(true);
									setTimeout(() => {
										setIsSubmittingInquiry(false);
										setInquirySubmitted(true);
									}, 650);
								}}
								className="space-y-5"
							>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-xs font-bold text-[#12304A] mb-1.5">
											Full Name <span className="text-[#C79A4B]">*</span>
										</label>
										<input
											required
											type="text"
											placeholder="Enter your name..."
											className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-[#12304A] mb-1.5">
											Company Name
										</label>
										<input
											type="text"
											placeholder="Company Name"
											className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
										/>
									</div>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
									<div>
										<label className="block text-xs font-bold text-[#12304A] mb-1.5">
											Email Address <span className="text-[#C79A4B]">*</span>
										</label>
										<input
											required
											type="email"
											placeholder="Email Address"
											className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-[#12304A] mb-1.5">
											Phone Number <span className="text-[#C79A4B]">*</span>
										</label>
										<input
											required
											type="tel"
											placeholder="Phone Number"
											className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
										/>
									</div>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
									<div>
										<label className="block text-xs font-bold text-[#12304A] mb-1.5">
											Country
										</label>
										<input
											type="text"
											placeholder="Country"
											className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
										/>
									</div>
									<CustomSelect
										label="Inquiry Type"
										required
										variant="light"
										options={INQUIRY_OPTIONS}
										value={inquiryType}
										onChange={(val) => setInquiryType(val)}
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#12304A] mb-1.5">
										Product / Ingredient you're looking for{" "}
										<span className="text-[#C79A4B]">*</span>
									</label>
									<input
										required
										type="text"
										placeholder="Enter compound name, CAS number, or specification..."
										className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-[#12304A] mb-1.5">
										Additional Details
									</label>
									<textarea
										rows={4}
										placeholder="Provide estimated volume, target compliance specs, or target timeline..."
										className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors resize-none shadow-sm"
									/>
								</div>
								<div className="pt-2">
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										type="submit"
										disabled={isSubmittingInquiry}
										className="inline-flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] disabled:bg-[#C79A4B]/80 text-white font-extrabold text-sm px-10 py-4 rounded-xl transition-colors shadow-lg shadow-[#C79A4B]/20 w-full sm:w-auto cursor-pointer gpu-smooth"
									>
										{isSubmittingInquiry ? (
											<span className="inline-flex items-center gap-2">
												<span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
												<span>Transmitting Custom Request...</span>
											</span>
										) : (
											<>
												<span>Submit Enquiry</span>
												<ArrowRight className="w-4 h-4" />
											</>
										)}
									</motion.button>
								</div>
							</form>
						) : (
							<motion.div
								initial={{ opacity: 0, y: 12, scale: 0.94 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ type: "spring", damping: 24, stiffness: 350 }}
								className="bg-white border border-[#12304A]/8 rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-xl pt-10"
							>
								<motion.div
									initial={{ scale: 0, rotate: -25 }}
									animate={{ scale: [0, 1.2, 1], rotate: 0 }}
									transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
									className="w-16 h-16 mx-auto flex items-center justify-center"
									style={{
										clipPath:
											"polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)",
										background: "#12304A",
									}}
								>
									<CheckCircle2 className="w-8 h-8 text-[#C79A4B] stroke-[2]" />
								</motion.div>
								<h3 className="text-2xl font-bold text-[#12304A] tracking-tight">
									Custom Enquiry Submitted Successfully
								</h3>
								<p className="text-sm text-[#5A7A8E] max-w-lg mx-auto leading-relaxed">
									Thank you. Your custom chemical sourcing request has been
									assigned to our procurement specialists. You will receive
									certified COA availability within 2 business hours.
								</p>
								<div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
									<div className="flex justify-between border-b border-[#12304A]/8 pb-1.5">
										<span className="text-[#5A7A8E]">Inquiry Type:</span>
										<span className="text-[#12304A] font-semibold">
											{inquiryType}
										</span>
									</div>
									<div className="flex justify-between border-b border-[#12304A]/8 pb-1.5">
										<span className="text-[#5A7A8E]">Sourcing Desk:</span>
										<span className="text-[#C79A4B] font-semibold">
											Ruskin Mumbai HQ
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-[#5A7A8E]">Response SLA:</span>
										<span className="text-emerald-600 font-semibold">
											Under 2 Hours
										</span>
									</div>
								</div>
								<motion.button
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
									onClick={() => setInquirySubmitted(false)}
									className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
								>
									Submit Another Request
								</motion.button>
							</motion.div>
						)}
					</div>
				</motion.div>
			</main>

			{/* ══ PRODUCT DETAILS MODAL ══ */}
			<AnimatePresence>
				{selectedProduct && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/30 backdrop-blur-[2px]"
						onClick={() => setSelectedProduct(null)}
						onTouchMove={(e) => e.stopPropagation()}
						onWheel={(e) => e.stopPropagation()}
					>
						<motion.div
							onClick={(e) => e.stopPropagation()}
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{ duration: 0.2 }}
							data-lenis-prevent="true"
							className="bg-white border border-[#C79A4B]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar"
						>
							<button
								onClick={() => setSelectedProduct(null)}
								className="absolute top-5 right-5 text-[#5A7A8E] hover:text-[#12304A] p-1 rounded-full hover:bg-[#12304A]/5"
							>
								<X className="w-5 h-5" />
							</button>
							<div className="space-y-2">
								<span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#C79A4B]/10 text-[#C79A4B] border border-[#C79A4B]/25 uppercase tracking-wider">
									{selectedProduct.category}
								</span>
								<h3 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight pt-1">
									{selectedProduct.name}
								</h3>
								<p className="text-xs text-[#5A7A8E] font-mono">
									CAS:{" "}
									<span className="text-[#12304A] font-semibold">
										{selectedProduct.casNumber}
									</span>
								</p>
							</div>
							<div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-2xl p-4 space-y-2.5 text-xs">
								{[
									{
										label: "Purity Specification:",
										val: selectedProduct.purity,
										color: "text-emerald-600",
									},
									{
										label: "Standard Grade:",
										val: selectedProduct.grade,
										color: "text-[#12304A]",
									},
									{
										label: "Regulatory Dossier:",
										val: selectedProduct.dmfStatus,
										color: "text-[#C79A4B]",
									},
								].map((row) => (
									<div
										key={row.label}
										className="flex justify-between border-b border-[#12304A]/6 pb-2 last:border-0 last:pb-0"
									>
										<span className="text-[#5A7A8E]">{row.label}</span>
										<span className={`font-bold ${row.color}`}>{row.val}</span>
									</div>
								))}
							</div>
							<p className="text-xs text-[#5A7A8E] leading-relaxed">
								{selectedProduct.description}
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => {
										const n = selectedProduct.name;
										setSelectedProduct(null);
										handleOpenQuote(n);
									}}
									className="flex-1 bg-[#C79A4B] hover:bg-[#B58A3E] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
								>
									Request Dossier &amp; Quote{" "}
									<ArrowUpRight className="w-4 h-4" />
								</button>
								<button
									onClick={() => setSelectedProduct(null)}
									className="px-5 py-3 rounded-xl border border-[#12304A]/10 text-[#12304A] text-xs font-semibold hover:bg-[#12304A]/5 transition-colors"
								>
									Close
								</button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* CTA Banner */}
			<CtaBanner onRequestQuote={() => handleOpenQuote()} />

			<Footer
				onOpenCatalog={() => {
					if (typeof window !== "undefined" && (window as any).__lenis) {
						(window as any).__lenis.scrollTo(0, { duration: 1.2 });
					} else {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}
				}}
			/>
		</div>
	);
}

export default function ProductsPage() {
	return (
		<Suspense fallback={<div className="min-h-screen bg-white" />}>
			<ProductsContent />
		</Suspense>
	);
}
