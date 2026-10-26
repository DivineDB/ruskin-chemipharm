"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: (i: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
	}),
};

export interface SectionHeaderProps {
	eyebrow: string;
	lead: string;
	highlight: string;
	description?: string;
	centered?: boolean;
	dark?: boolean;
	as?: "h1" | "h2";
	className?: string;
}

/**
 * Standardized Ruskin Chemipharm 4-part Section Header with luxury scroll-reveal.
 * Strictly implements the AGENTS.md design tokens & mandatory signature gold accent bar.
 */
export default function SectionHeader({
	eyebrow,
	lead,
	highlight,
	description,
	centered = false,
	dark = false,
	as: Heading = "h2",
	className = "",
}: SectionHeaderProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
			className={`space-y-3 ${centered ? "text-center" : "text-left"} ${className}`}
		>
			{/* 1. Category Eyebrow with Gold Prefix Line */}
			<motion.span
				variants={fadeUp}
				custom={0}
				className={`inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase ${
					centered ? "justify-center" : ""
				}`}
			>
				<div className="w-8 h-[2px] bg-[#C79A4B] shrink-0" />
				<span>{eyebrow}</span>
				{centered && <div className="w-8 h-[2px] bg-[#C79A4B] shrink-0" />}
			</motion.span>

			{/* 2. Main Heading with Gold Span Highlight */}
			<motion.div variants={fadeUp} custom={1}>
				<Heading
					className={`text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight tracking-tight ${
						dark ? "text-white" : "text-[#12304A]"
					}`}
				>
					{lead} <span className="text-[#C79A4B]">{highlight}</span>
				</Heading>
			</motion.div>

			{/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE: NEVER OMIT) */}
			<motion.div
				variants={fadeUp}
				custom={2}
				className={`w-16 h-[3px] rounded-full bg-[#C79A4B] ${centered ? "mx-auto" : ""}`}
			/>

			{/* 4. Descriptive Subtitle */}
			{description && (
				<motion.p
					variants={fadeUp}
					custom={3}
					className={`text-base font-normal max-w-2xl lg:max-w-3xl leading-relaxed ${
						dark ? "text-slate-300" : "text-[#5A7A8E]"
					} ${centered ? "mx-auto" : ""}`}
				>
					{description}
				</motion.p>
			)}
		</motion.div>
	);
}
