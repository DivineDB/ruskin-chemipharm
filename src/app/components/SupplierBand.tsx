"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SupplierBrand {
	name: string;
	logo: React.ReactNode;
}

const SUPPLIERS: SupplierBrand[] = [
	{
		name: "Dongkook Pharmaceutical Co., Ltd.",
		logo: (
			<img
				src="/images/suppliers/dongkook.png"
				alt="Dongkook Pharmaceutical Co., Ltd."
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[210px] object-contain"
			/>
		),
	},
	{
		name: "Jiangsu Hengrui Pharmaceuticals Co., Ltd.",
		logo: (
			<img
				src="/images/suppliers/hengrui.png"
				alt="Jiangsu Hengrui Pharmaceuticals Co., Ltd."
				loading="eager"
				decoding="sync"
				className="h-11 sm:h-13 w-auto max-w-[160px] sm:max-w-[190px] object-contain"
			/>
		),
	},
	{
		name: "CSPC Zhongnuo Pharmaceutical Co. Ltd",
		logo: (
			<img
				src="/images/suppliers/cspc.png"
				alt="CSPC Zhongnuo Pharmaceutical Co. Ltd"
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[180px] sm:max-w-[210px] object-contain"
			/>
		),
	},
	{
		name: "Reyon Pharmaceutical Co. Ltd.",
		logo: (
			<img
				src="/images/suppliers/reyon.png"
				alt="Reyon Pharmaceutical Co. Ltd."
				loading="eager"
				decoding="sync"
				className="h-7 sm:h-8 w-auto max-w-[160px] sm:max-w-[180px] object-contain"
			/>
		),
	},
	{
		name: "North China Pharmaceutical Huasheng Co. Ltd.",
		logo: (
			<svg viewBox="0 0 135 28" className="h-9 sm:h-11 w-auto" aria-label="North China Pharmaceutical Huasheng">
				{/* NCPC signature double ring & cross in Medical Green */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="#00B050" strokeWidth="2.4" />
				<circle cx="19" cy="14" r="7" fill="none" stroke="#00B050" strokeWidth="1.6" strokeDasharray="2.5 1.5" />
				<path d="M9 14h10M14 9v10" stroke="#00B050" strokeWidth="2" strokeLinecap="round" />
				<text x="33" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.4" fill="#FFFFFF">
					NCPC
				</text>
				<text x="33" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					HUASHENG
				</text>
			</svg>
		),
	},
	{
		name: "Zhejiang Jinhua Conba BioPharma Co., Ltd",
		logo: (
			<img
				src="/images/suppliers/conba.svg"
				alt="Zhejiang Jinhua Conba BioPharma Co., Ltd"
				loading="eager"
				decoding="sync"
				className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[210px] object-contain"
			/>
		),
	},
	{
		name: "Jiangxi Tianxin Pharmaceutical Co., Ltd.",
		logo: (
			<img
				src="/images/suppliers/tianxin.png"
				alt="Jiangxi Tianxin Pharmaceutical Co., Ltd."
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
			/>
		),
	},
	{
		name: "Guilin Pharmaceutical",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Guilin Pharmaceutical">
				{/* Guilin sun-flower cross in Crimson Red */}
				<polygon points="14,4 17,11 24,14 17,17 14,24 11,17 4,14 11,11" fill="#EF4444" />
				<circle cx="14" cy="14" r="2.8" fill="#0B1E2E" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.3" fill="#FFFFFF">
					GUILIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Anhui Biochem Pharmaceutical Co., Ltd",
		logo: (
			<svg viewBox="0 0 165 28" className="h-9 sm:h-11 w-auto" aria-label="Anhui Biochem Pharmaceutical">
				{/* Anhui Biochem bio-helix in Royal Blue */}
				<circle cx="13" cy="14" r="10" fill="none" stroke="#0088EE" strokeWidth="2.2" />
				<path d="M8 8.5h6a3 3 0 0 1 0 6H8zm0 5.5h6.5a3.5 3.5 0 0 1 0 7H8z" fill="none" stroke="#0088EE" strokeWidth="1.8" />
				<circle cx="13" cy="14" r="2" fill="#38BDF8" />
				<text x="30" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="900" letterSpacing="1.2" fill="#FFFFFF">
					ANHUI BIOCHEM
				</text>
				<text x="30" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.5" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
		logo: (
			<img
				src="/images/suppliers/yutian.png"
				alt="Jiangsu Yutian Pharmaceutical Co., Ltd."
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
			/>
		),
	},
	{
		name: "Hebei Yipin Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Hebei Yipin Pharmaceutical">
				{/* Yipin crest in Cyan & Blue */}
				<polygon points="14,3 23,8 23,20 14,25 5,20 5,8" fill="none" stroke="#3B82F6" strokeWidth="2.2" />
				<path d="M10 9l4 4.5v6.5M18 9l-4 4.5" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4" fill="#FFFFFF">
					YIPIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Heilongjiang Dino Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Heilongjiang Dino Pharmaceutical">
				{/* Dino D-wave in Sapphire Blue */}
				<path d="M6 5h8a9 9 0 0 1 0 18H6V5z" fill="none" stroke="#3B82F6" strokeWidth="2.4" />
				<path d="M12 9.5a4.5 4.5 0 0 1 0 9" stroke="#60A5FA" strokeWidth="2" />
				<circle cx="19" cy="14" r="2.2" fill="#3B82F6" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="900" letterSpacing="1.5" fill="#FFFFFF">
					DINO
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Qinhuangdao Zizhu Pharmaceutical",
		logo: (
			<img
				src="/images/suppliers/zizhu.png"
				alt="Qinhuangdao Zizhu Pharmaceutical"
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-[230px] object-contain"
			/>
		),
	},
	{
		name: "Chengdu Sino-Strong Pharmaceutical Co. Ltd.",
		logo: (
			<img
				src="/images/suppliers/sino-strong.png"
				alt="Chengdu Sino-Strong Pharmaceutical Co. Ltd."
				loading="eager"
				decoding="sync"
				className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[210px] object-contain"
			/>
		),
	},
	{
		name: "Shenzhou Biology & Technology Co. Ltd.",
		logo: (
			<svg viewBox="0 0 160 28" className="h-9 sm:h-11 w-auto" aria-label="Shenzhou Biology & Technology">
				{/* Shenzhou Bio orbit in Blue & Amber */}
				<circle cx="14" cy="14" r="5.5" fill="#3B82F6" />
				<ellipse cx="14" cy="14" rx="10.5" ry="4" transform="rotate(-30 14 14)" fill="none" stroke="#F59E0B" strokeWidth="1.8" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.3" fill="#FFFFFF">
					SHENZHOU BIO
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					&amp; TECHNOLOGY
				</text>
			</svg>
		),
	},
	{
		name: "Kunming Guiyan Pharmaceutical Co. Ltd",
		logo: (
			<img
				src="/images/suppliers/guiyan.png"
				alt="Kunming Guiyan Pharmaceutical Co. Ltd"
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[160px] sm:max-w-[180px] object-contain"
			/>
		),
	},
	{
		name: "Shanghai Hengrui Pharmaceutical Co. Ltd.",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Shanghai Hengrui Pharmaceutical">
				{/* Hengrui lozenge in Red */}
				<polygon points="14,3 24,14 14,25 4,14" fill="none" stroke="#D9252B" strokeWidth="2.4" />
				<polygon points="14,8.5 19.5,14 14,19.5 8.5,14" fill="#D9252B" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.2" fill="#D9252B">
					SHANGHAI
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.5" fill="#94A3B8">
					HENGRUI PHARMA
				</text>
			</svg>
		),
	},
	{
		name: "Wuxi Fortune Pharmaceutical Co. Ltd.",
		logo: (
			<img
				src="/images/suppliers/wuxi-fortune.png"
				alt="Wuxi Fortune Pharmaceutical Co. Ltd."
				loading="eager"
				decoding="sync"
				className="h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-[230px] object-contain"
			/>
		),
	},
	{
		name: "Shenyang Antibiotic Manufacturer",
		logo: (
			<svg viewBox="0 0 148 28" className="h-9 sm:h-11 w-auto" aria-label="Shenyang Antibiotic Manufacturer">
				{/* Industrial star in Blue & Red */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="#3B82F6" strokeWidth="2.2" />
				<polygon points="14,6 16.5,11.5 22,14 16.5,16.5 14,22 11.5,16.5 6,14 11.5,11.5" fill="#EF4444" />
				<circle cx="14" cy="14" r="2" fill="#0B1E2E" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.3" fill="#FFFFFF">
					SHENYANG
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					ANTIBIOTIC MFG
				</text>
			</svg>
		),
	},
	{
		name: "Shanxi Baoxin Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Shanxi Baoxin Pharmaceutical">
				{/* Baoxin shield in Blue */}
				<polygon points="14,3 23,8 23,20 14,25 5,20 5,8" fill="none" stroke="#3B82F6" strokeWidth="2.2" />
				<path d="M10 8h4.5a3 3 0 0 1 0 6H10zm0 6h5a3 3 0 0 1 0 6H10z" fill="none" stroke="#3B82F6" strokeWidth="1.8" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4" fill="#FFFFFF">
					BAOXIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Jiangxi Yuehua Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 145 28" className="h-9 sm:h-11 w-auto" aria-label="Jiangxi Yuehua Pharmaceutical">
				{/* Yuehua wings in Teal */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="#06B6D4" strokeWidth="2.2" />
				<path d="M7 17c3-5 7-7 7-11 0 4 4 6 7 11-4-2-7-2-14 0z" fill="#06B6D4" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4" fill="#FFFFFF">
					YUEHUA
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" fill="#94A3B8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
];

export default function SupplierBand() {
	const trackRef = useRef<HTMLDivElement>(null);
	const tweenRef = useRef<gsap.core.Tween | null>(null);
	const isHoveredRef = useRef(false);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) return;

		const ctx = gsap.context(() => {
			gsap.ticker.lagSmoothing(0);

			// Mathematically continuous 60fps marquee loop via 3D GPU transform
			// Translating by exact -50% with two identical width child blocks prevents any loop jitter or jump
			gsap.set(track, { xPercent: 0, force3D: true });
			const tween = gsap.to(track, {
				xPercent: -50,
				ease: "none",
				duration: 50,
				repeat: -1,
				force3D: true,
			});
			tweenRef.current = tween;

			// Reactive scroll velocity acceleration via Lenis (debounced reset to prevent tween fighting)
			let resetTimeout: ReturnType<typeof setTimeout> | null = null;
			const checkLenis = () => {
				const lenis = (window as any).__lenis;
				if (!lenis) return;

				const handleScroll = (e: any) => {
					if (!tweenRef.current) return;
					const vel = Math.abs(e.velocity || 0);
					if (vel > 0.05) {
						const boost = Math.min(2.5, 1 + vel * 0.18);
						gsap.to(tweenRef.current, {
							timeScale: boost,
							duration: 0.25,
							ease: "power2.out",
							overwrite: "auto",
						});
						if (resetTimeout) clearTimeout(resetTimeout);
						resetTimeout = setTimeout(() => {
							if (!tweenRef.current) return;
							gsap.to(tweenRef.current, {
								timeScale: isHoveredRef.current ? 0.25 : 1,
								duration: 0.7,
								ease: "power2.out",
								overwrite: "auto",
							});
						}, 140);
					}
				};

				lenis.on("scroll", handleScroll);
				return () => {
					lenis.off("scroll", handleScroll);
					if (resetTimeout) clearTimeout(resetTimeout);
				};
			};

			const unbindLenis = checkLenis();
			return () => {
				if (unbindLenis) unbindLenis();
			};
		});

		return () => ctx.revert();
	}, []);

	const handleMouseEnter = () => {
		isHoveredRef.current = true;
		if (tweenRef.current) {
			gsap.to(tweenRef.current, { timeScale: 0.25, duration: 0.5, ease: "power2.out" });
		}
	};

	const handleMouseLeave = () => {
		isHoveredRef.current = false;
		if (tweenRef.current) {
			gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: "power2.out" });
		}
	};

	return (
		<div className="relative w-full pt-1 pb-4 sm:pb-5 overflow-hidden select-none">
			{/* Minimalist Micro Label */}
			<div className="max-w-7xl mx-auto px-4 text-center mb-5 sm:mb-6">
				<p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-slate-400/90 font-medium">
					Our Global Suppliers
				</p>
			</div>

			{/* Full bleed marquee with seamless CSS linear gradient mask */}
			<div 
				className="w-full overflow-hidden"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					transform: "translateZ(0)",
				}}
			>
				{/* The container translates by -50%. Two identical children each with pr-12 sm:pr-16 guarantee 100% gap parity and ZERO jitter on loop */}
				<div 
					ref={trackRef}
					className="flex w-max items-center py-1 will-change-transform"
				>
					{/* Group 1 */}
					<div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16 shrink-0">
						{SUPPLIERS.map((s, idx) => (
							<div
								key={`sup-1-${idx}`}
								className="hover:scale-105 transition-transform duration-300 cursor-default shrink-0 flex items-center justify-center gpu-smooth opacity-90 hover:opacity-100"
								title={s.name}
							>
								{s.logo}
							</div>
						))}
					</div>

					{/* Group 2 (Identical Clone for 100% seamless infinite loop) */}
					<div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16 shrink-0" aria-hidden="true">
						{SUPPLIERS.map((s, idx) => (
							<div
								key={`sup-2-${idx}`}
								className="hover:scale-105 transition-transform duration-300 cursor-default shrink-0 flex items-center justify-center gpu-smooth opacity-90 hover:opacity-100"
								title={s.name}
							>
								{s.logo}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
