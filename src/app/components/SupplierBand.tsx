"use client";

import React from "react";

interface SupplierBrand {
	name: string;
	logo: React.ReactNode;
}

const SUPPLIERS: SupplierBrand[] = [
	{
		name: "Merck KGaA",
		logo: (
			<svg viewBox="0 0 120 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Merck">
				<path d="M5 14c0-5 4-9 9-9s9 4 9 9-4 9-9 9H5z" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<circle cx="14" cy="14" r="3.4" fill="currentColor" />
				<text x="32" y="20" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="900" letterSpacing="1.8">
					MERCK
				</text>
			</svg>
		),
	},
	{
		name: "BASF Pharma",
		logo: (
			<svg viewBox="0 0 108 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="BASF">
				<path d="M4 4h20v20H4z M13 13h11v11H13z" fillRule="evenodd" fill="currentColor" />
				<text x="32" y="20.5" fontFamily="Inter, system-ui, sans-serif" fontSize="17.5" fontWeight="900" letterSpacing="1.2">
					BASF
				</text>
			</svg>
		),
	},
	{
		name: "Fresenius Kabi",
		logo: (
			<svg viewBox="0 0 160 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Fresenius Kabi">
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M14 6v16M6 14h16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
				<text x="34" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="900" letterSpacing="1">
					FRESENIUS
				</text>
				<text x="34" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="800" letterSpacing="2.2">
					KABI
				</text>
			</svg>
		),
	},
	{
		name: "Centrient Pharmaceuticals",
		logo: (
			<svg viewBox="0 0 150 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Centrient">
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 2.5" />
				<circle cx="14" cy="14" r="4" fill="currentColor" />
				<text x="34" y="19.5" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.2">
					CENTRIENT
				</text>
			</svg>
		),
	},
	{
		name: "Jiangsu Hengrui Pharmaceuticals",
		logo: (
			<svg viewBox="0 0 140 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Hengrui">
				<polygon points="14,3 24,14 14,25 4,14" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<polygon points="14,8.5 19.5,14 14,19.5 8.5,14" fill="currentColor" />
				<text x="32" y="19.5" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="900" letterSpacing="1.5">
					HENGRUI
				</text>
			</svg>
		),
	},
	{
		name: "North China Pharmaceutical Co.",
		logo: (
			<svg viewBox="0 0 110 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="NCPC">
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<circle cx="19" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.5 1.5" />
				<path d="M9 14h10M14 9v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="36" y="20.5" fontFamily="Inter, system-ui, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.4">
					NCPC
				</text>
			</svg>
		),
	},
	{
		name: "CSPC Pharmaceutical Group",
		logo: (
			<svg viewBox="0 0 110 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="CSPC">
				<rect x="4" y="4" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M9.5 14l4.5-4.5 4.5 4.5M9.5 18.5l4.5-4.5 4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
				<text x="32" y="20.5" fontFamily="Inter, system-ui, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.6">
					CSPC
				</text>
			</svg>
		),
	},
	{
		name: "Zhejiang Hisun Pharmaceutical",
		logo: (
			<svg viewBox="0 0 120 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="HISUN">
				<polygon points="14,3 24,8.5 24,19.5 14,25 4,19.5 4,8.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<circle cx="14" cy="14" r="3.8" fill="currentColor" />
				<text x="32" y="20" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="900" letterSpacing="1.4">
					HISUN
				</text>
			</svg>
		),
	},
	{
		name: "DSM Nutritional Products",
		logo: (
			<svg viewBox="0 0 100 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="DSM">
				<circle cx="8" cy="14" r="4.5" fill="currentColor" />
				<circle cx="16" cy="9" r="4.5" fill="currentColor" opacity="0.85" />
				<circle cx="16" cy="19" r="4.5" fill="currentColor" opacity="0.7" />
				<text x="30" y="20.5" fontFamily="Inter, system-ui, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.4">
					DSM
				</text>
			</svg>
		),
	},
	{
		name: "Kyowa Hakko Bio",
		logo: (
			<svg viewBox="0 0 165 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Kyowa Hakko Bio">
				<circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M7.5 16c2.5-4.5 7-4.5 13 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="32" y="15.5" fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="900" letterSpacing="1">
					KYOWA HAKKO
				</text>
				<text x="32" y="24.5" fontFamily="Inter, system-ui, sans-serif" fontSize="8" fontWeight="800" letterSpacing="2.2">
					BIO CO. LTD.
				</text>
			</svg>
		),
	},
	{
		name: "Star Lake Bioscience",
		logo: (
			<svg viewBox="0 0 145 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Star Lake">
				<polygon points="14,4 16.5,10.5 23,10.5 17.5,15 19.5,21.5 14,17.5 8.5,21.5 10.5,15 5,10.5 11.5,10.5" fill="currentColor" />
				<circle cx="14" cy="14" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
				<text x="32" y="19.5" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.4">
					STAR LAKE
				</text>
			</svg>
		),
	},
	{
		name: "Zhejiang Medicine Co.",
		logo: (
			<svg viewBox="0 0 100 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="ZMC">
				<rect x="4" y="5" width="20" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M7.5 9.5h13M7.5 14h9M7.5 18.5h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="32" y="20.5" fontFamily="Inter, system-ui, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1.6">
					ZMC
				</text>
			</svg>
		),
	},
	{
		name: "Heraeus Precious Metals",
		logo: (
			<svg viewBox="0 0 135 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Heraeus">
				<polygon points="14,3 24,9.5 24,19.5 14,25 4,19.5 4,9.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M4 9.5l10 5.5 10-5.5M14 15v10" stroke="currentColor" strokeWidth="2" />
				<text x="32" y="20" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="900" letterSpacing="1.3">
					HERAEUS
				</text>
			</svg>
		),
	},
	{
		name: "Shandong Lukang Pharmaceutical",
		logo: (
			<svg viewBox="0 0 125 28" className="h-7 sm:h-8 w-auto fill-current" aria-label="Lukang">
				<circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
				<path d="M8.5 14h11M14 8.5v11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
				<text x="32" y="20" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="900" letterSpacing="1.4">
					LUKANG
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
				<div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-14 sm:gap-20 py-1">
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
