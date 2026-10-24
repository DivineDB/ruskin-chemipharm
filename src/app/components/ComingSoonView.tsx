"use client";

import React from "react";
import { motion } from "framer-motion";
import { MolecularDecoration } from "./Hex";

interface ComingSoonViewProps {
	category: string;
	titleLead: string;
	titleHighlight: string;
	subheading: string;
}

export default function ComingSoonView({
	category,
	titleLead,
	titleHighlight,
	subheading,
}: ComingSoonViewProps) {
	return (
		<div className="min-h-[calc(100vh-80px)] bg-[#FAF7F2] text-[#5A7A8E] flex flex-col items-center justify-center font-sans selection:bg-[#C79A4B] selection:text-white relative overflow-hidden px-4 sm:px-6 lg:px-8">
			{/* ─── Ambient Molecular Background Elements ─── */}
			<div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
				{/* Top-Right Floating Molecular Lattice */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 0.35, scale: 1 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
					className="animate-float-tilt-1 absolute -right-12 -top-16 w-[340px] hidden md:block"
				>
					<MolecularDecoration color="#C79A4B" opacity={0.6} />
				</motion.div>

				{/* Bottom-Left Floating Molecular Lattice */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 0.25, scale: 1 }}
					transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
					className="animate-float-tilt-2 absolute -left-16 -bottom-16 w-[280px] hidden lg:block"
				>
					<MolecularDecoration color="#12304A" opacity={0.4} />
				</motion.div>
			</div>

			{/* ─── Centered Title & Subheading Stack ─── */}
			<div className="relative z-10 max-w-2xl mx-auto text-center space-y-4 py-12">
				{/* 1. Category Eyebrow with Gold Prefix and Suffix Lines */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
				>
					<span className="inline-flex items-center gap-2.5 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase">
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "2rem", opacity: 1 }}
							transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
							className="h-[2px] bg-[#C79A4B] rounded-full shrink-0"
						/>
						<span>{category}</span>
						<motion.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: "2rem", opacity: 1 }}
							transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
							className="h-[2px] bg-[#C79A4B] rounded-full shrink-0"
						/>
					</span>
				</motion.div>

				{/* 2. Main Heading with Gold Span Highlight */}
				<motion.h1
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
					className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#12304A] leading-[1.15] tracking-tight"
				>
					{titleLead} <span className="text-[#C79A4B]">{titleHighlight}</span>
				</motion.h1>

				{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE, CENTERED) */}
				<motion.div
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: "4rem", opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
					className="h-[3px] rounded-full bg-[#C79A4B] mx-auto"
				/>

				{/* 4. Descriptive Subheading */}
				<motion.p
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
					className="text-base sm:text-lg text-[#5A7A8E] font-normal leading-relaxed max-w-xl mx-auto pt-1"
				>
					{subheading}
				</motion.p>
			</div>
		</div>
	);
}

