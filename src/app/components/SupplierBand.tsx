"use client";

import React from "react";

interface SupplierBrand {
	name: string;
	logo: React.ReactNode;
}

const SUPPLIERS: SupplierBrand[] = [
	{
		name: "Dongkook Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 170 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Dongkook Pharmaceutical">
				{/* Dongkook signature Human Care Frame emblem */}
				<path d="M4 14L14 4l4.5 4.5-2.5 2.5L14 9 7.5 15.5 14 22l2 2-2 2z" fill="currentColor" />
				<path d="M24 14L14 24l-4.5-4.5 2.5-2.5L14 19l6.5-6.5L14 6l-2-2 2-2z" fill="currentColor" />
				<circle cx="14" cy="14" r="2.6" fill="currentColor" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="1.2">
					DONGKOOK
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.8" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Jiangsu Hengrui Pharmaceuticals Co., Ltd.",
		logo: (
			<svg viewBox="0 0 170 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Jiangsu Hengrui Pharmaceuticals">
				{/* Hengrui signature diamond kite / crystal lozenge */}
				<polygon points="14,3 24,14 14,25 4,14" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<polygon points="14,8.5 19.5,14 14,19.5 8.5,14" fill="currentColor" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					HENGRUI
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					JIANGSU PHARMA
				</text>
			</svg>
		),
	},
	{
		name: "CSPC Zhongnuo Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="CSPC Zhongnuo Pharmaceutical">
				{/* CSPC signature rounded square with double chevron incisions */}
				<rect x="4" y="4" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M9.5 14l4.5-4.5 4.5 4.5M9.5 18.5l4.5-4.5 4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.4">
					CSPC
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="1.8" opacity="0.8">
					ZHONGNUO
				</text>
			</svg>
		),
	},
	{
		name: "Reyon Pharmaceutical Co. Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Reyon Pharmaceutical">
				{/* Reyon signature geometric facet 'R' mark */}
				<path d="M5 5h10a5 5 0 0 1 5 5c0 3.2-2 4.6-4.5 4.9L21 23h-4l-5-7.5H9V23H5V5z" fill="currentColor" />
				<path d="M9 8.5v4h5.5a2 2 0 0 0 2-2 2 2 0 0 0-2-2H9z" fill="#0B1E2E" />
				<text x="29" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.5">
					REYON
				</text>
				<text x="29" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "North China Pharmaceutical Huasheng Co. Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="North China Pharmaceutical Huasheng">
				{/* NCPC signature double ring & cross */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<circle cx="19" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.5 1.5" />
				<path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="33" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.4">
					NCPC
				</text>
				<text x="33" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					HUASHENG
				</text>
			</svg>
		),
	},
	{
		name: "Zhejiang Jinhua Conba BioPharma Co., Ltd",
		logo: (
			<svg viewBox="0 0 155 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Conba BioPharma">
				{/* CONBA signature 4-leaf medical cross emblem */}
				<circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
				<path d="M14 6c-2 3-2 5 0 8 2-3 2-5 0-8zm0 16c-2-3-2-5 0-8 2 3 2 5 0 8zm-8-8c3-2 5-2 8 0-3 2-5 2-8 0zm16 0c-3-2-5-2-8 0 3 2 5 2 8 0z" fill="currentColor" />
				<text x="31" y="16" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="900" letterSpacing="1.8">
					CONBA
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					BIOPHARMA
				</text>
			</svg>
		),
	},
	{
		name: "Jiangxi Tianxin Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Jiangxi Tianxin Pharmaceutical">
				{/* Tianxin intertwined 'T' and 'X' wave arcs */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2" />
				<path d="M8 10h12M14 10v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
				<path d="M9.5 17l9-8M9.5 9l9 8" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					TIANXIN
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Guilin Pharmaceutical",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Guilin Pharmaceutical">
				{/* Guilin / Fosun Pharma diamond-sun flower cross */}
				<polygon points="14,4 17,11 24,14 17,17 14,24 11,17 4,14 11,11" fill="currentColor" />
				<circle cx="14" cy="14" r="2.8" fill="#0B1E2E" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.3">
					GUILIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Anhui Biochem Pharmaceutical Co., Ltd",
		logo: (
			<svg viewBox="0 0 175 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Anhui Biochem Pharmaceutical">
				{/* Anhui Biochem (Beck) bio-ring helix */}
				<circle cx="13" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<path d="M8 8.5h6a3 3 0 0 1 0 6H8zm0 5.5h6.5a3.5 3.5 0 0 1 0 7H8z" fill="none" stroke="currentColor" strokeWidth="1.8" />
				<circle cx="13" cy="14" r="2" fill="currentColor" />
				<text x="30" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="900" letterSpacing="1.2">
					ANHUI BIOCHEM
				</text>
				<text x="30" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.5" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Jiangsu Yutian Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Jiangsu Yutian Pharmaceutical">
				{/* Yutian stylized branching Y-leaf inside circular badge */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<path d="M8.5 8l5.5 6v7M19.5 8l-5.5 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="14" cy="7.5" r="2.2" fill="currentColor" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					YUTIAN
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Hebei Yipin Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Hebei Yipin Pharmaceutical">
				{/* Yipin hexagonal crest with YP monogram */}
				<polygon points="14,3 23,8 23,20 14,25 5,20 5,8" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<path d="M10 9l4 4.5v6.5M18 9l-4 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					YIPIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Heilongjiang Dino Pharmaceutical Co., Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Heilongjiang Dino Pharmaceutical">
				{/* Dino bold D with inhalation molecular wave */}
				<path d="M6 5h8a9 9 0 0 1 0 18H6V5z" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M12 9.5a4.5 4.5 0 0 1 0 9" stroke="currentColor" strokeWidth="2" />
				<circle cx="19" cy="14" r="2.2" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="900" letterSpacing="1.5">
					DINO
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Qinhuangdao Zizhu Pharmaceutical",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Qinhuangdao Zizhu Pharmaceutical">
				{/* CR Zizhu 4-quadrant geometric crystal diamond */}
				<rect x="6" y="6" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
				<rect x="15.5" y="6" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.8" />
				<rect x="6" y="15.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.8" />
				<rect x="15.5" y="15.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					ZIZHU
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Chengdu Sino-Strong Pharmaceutical Co. Ltd.",
		logo: (
			<svg viewBox="0 0 170 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Chengdu Sino-Strong Pharmaceutical">
				{/* Sino-Strong dual interlocking S-helix ribbon */}
				<path d="M19 8c-3-3-8-2-10 1s1 7 5 8 8 3 6 7-7 4-10 1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
				<circle cx="14" cy="14" r="2" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.3">
					SINO-STRONG
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Shenzhou Biology & Technology Co. Ltd.",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Shenzhou Biology & Technology">
				{/* Shenzhou Bio aerospace orbit around biological core */}
				<circle cx="14" cy="14" r="5.5" fill="currentColor" />
				<ellipse cx="14" cy="14" rx="10.5" ry="4" transform="rotate(-30 14 14)" fill="none" stroke="currentColor" strokeWidth="1.8" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.3">
					SHENZHOU BIO
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					& TECHNOLOGY
				</text>
			</svg>
		),
	},
	{
		name: "Kunming Guiyan Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Kunming Guiyan Pharmaceutical">
				{/* Guiyan precious platinum metal hexagon crystal */}
				<polygon points="14,3 23,8.5 23,19.5 14,25 5,19.5 5,8.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<polygon points="14,7 19.5,10.5 19.5,17.5 14,21 8.5,17.5 8.5,10.5" fill="currentColor" opacity="0.5" />
				<circle cx="14" cy="14" r="3" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					GUIYAN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Shanghai Hengrui Pharmaceutical Co. Ltd.",
		logo: (
			<svg viewBox="0 0 170 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Shanghai Hengrui Pharmaceutical">
				{/* Hengrui signature diamond lozenge */}
				<polygon points="14,3 24,14 14,25 4,14" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<polygon points="14,8.5 19.5,14 14,19.5 8.5,14" fill="currentColor" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.2">
					SHANGHAI
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.5" opacity="0.8">
					HENGRUI PHARMA
				</text>
			</svg>
		),
	},
	{
		name: "Wuxi Fortune Pharmaceutical Co. Ltd.",
		logo: (
			<svg viewBox="0 0 170 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Wuxi Fortune Pharmaceutical">
				{/* Wuxi Fortune 4-leaf clover / health cross seal */}
				<circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
				<path d="M14 6v16M6 14h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
				<circle cx="10" cy="10" r="2" fill="currentColor" />
				<circle cx="18" cy="10" r="2" fill="currentColor" />
				<circle cx="10" cy="18" r="2" fill="currentColor" />
				<circle cx="18" cy="18" r="2" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.2">
					WUXI FORTUNE
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Shenyang Antibiotic Manufacturer",
		logo: (
			<svg viewBox="0 0 175 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Shenyang Antibiotic Manufacturer">
				{/* Shenyang Antibiotic industrial shield & flask star */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<polygon points="14,6 16.5,11.5 22,14 16.5,16.5 14,22 11.5,16.5 6,14 11.5,11.5" fill="currentColor" />
				<circle cx="14" cy="14" r="2" fill="#0B1E2E" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="900" letterSpacing="1.3">
					SHENYANG
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					ANTIBIOTIC MFG
				</text>
			</svg>
		),
	},
	{
		name: "Shanxi Baoxin Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Shanxi Baoxin Pharmaceutical">
				{/* Baoxin crest with B-shield cross */}
				<polygon points="14,3 23,8 23,20 14,25 5,20 5,8" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<path d="M10 8h4.5a3 3 0 0 1 0 6H10zm0 6h5a3 3 0 0 1 0 6H10z" fill="none" stroke="currentColor" strokeWidth="1.8" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					BAOXIN
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
	{
		name: "Jiangxi Yuehua Pharmaceutical Co. Ltd",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Jiangxi Yuehua Pharmaceutical">
				{/* Yuehua rising wing crescents in ring */}
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
				<path d="M7 17c3-5 7-7 7-11 0 4 4 6 7 11-4-2-7-2-14 0z" fill="currentColor" />
				<text x="31" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					YUEHUA
				</text>
				<text x="31" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="7" fontWeight="700" letterSpacing="1.6" opacity="0.8">
					PHARMACEUTICAL
				</text>
			</svg>
		),
	},
];

export default function SupplierBand() {
	return (
		<div className="relative w-full pt-1 pb-4 sm:pb-5 overflow-hidden select-none">
			{/* Minimalist Micro Label - positioned slightly higher */}
			<div className="max-w-7xl mx-auto px-4 text-center mb-5 sm:mb-6">
				<p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-slate-400/90 font-medium">
					Our Global Suppliers
				</p>
			</div>

			{/* Full bleed marquee with seamless CSS linear gradient mask */}
			<div 
				className="w-full overflow-hidden"
				style={{
					maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
					transform: "translateZ(0)",
				}}
			>
				<div 
					className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-12 sm:gap-16 py-1"
					style={{ animationDuration: "55s" }}
				>
					{/* First set */}
					{SUPPLIERS.map((s, idx) => (
						<div
							key={`sup-1-${idx}`}
							className="text-slate-300/50 hover:text-white transition-[color,transform] duration-300 hover:scale-105 cursor-default shrink-0 flex items-center justify-center gpu-smooth"
							title={s.name}
						>
							{s.logo}
						</div>
					))}

					{/* Duplicate set for seamless continuous marquee loop */}
					{SUPPLIERS.map((s, idx) => (
						<div
							key={`sup-2-${idx}`}
							className="text-slate-300/50 hover:text-white transition-[color,transform] duration-300 hover:scale-105 cursor-default shrink-0 flex items-center justify-center gpu-smooth"
							title={s.name}
						>
							{s.logo}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

