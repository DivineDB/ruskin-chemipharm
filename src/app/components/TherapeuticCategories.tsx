"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
	Pill,
	ShieldCheck,
	HeartPulse,
	Droplet,
	Target,
	Wind,
	Brain,
	Sparkles,
	Activity,
	Layers,
	Apple,
	Flower2,
	Filter,
	Sun,
	Leaf,
	Microscope,
	ArrowUpRight,
	type LucideIcon,
} from "lucide-react";
import { HexIcon } from "./Hex";

// ─── 4 Clinical Domains & 16 Therapeutic Categories ───────────────────────────
export interface TherapeuticCategory {
	id: string;
	name: string;
	domain: "critical" | "cardiometabolic" | "neuro" | "bionutrition";
	tag: string;
	searchQuery: string;
	icon: LucideIcon;
}

export const THERAPEUTIC_CATEGORIES: TherapeuticCategory[] = [
	// ─── 1. Critical Care & Oncology ───
	{
		id: "antibiotics",
		name: "Antibiotics",
		domain: "critical",
		tag: "Beta-Lactams & Macrolides",
		searchQuery: "Antibiotic",
		icon: Pill,
	},
	{
		id: "anti-infectives",
		name: "Anti-Infectives",
		domain: "critical",
		tag: "Broad-Spectrum Antimicrobials",
		searchQuery: "Infective",
		icon: ShieldCheck,
	},
	{
		id: "antifungals",
		name: "Antifungals",
		domain: "critical",
		tag: "Triazoles & Topicals",
		searchQuery: "Fungal",
		icon: Sparkles,
	},
	{
		id: "oncology",
		name: "Oncology",
		domain: "critical",
		tag: "Cytotoxic Actives",
		searchQuery: "Oncology",
		icon: Target,
	},

	// ─── 2. Cardiometabolic & Systemic ───
	{
		id: "cardiovascular",
		name: "Cardiovascular",
		domain: "cardiometabolic",
		tag: "Hypertension & Statins",
		searchQuery: "Cardiovascular",
		icon: HeartPulse,
	},
	{
		id: "antidiabetics",
		name: "Antidiabetics",
		domain: "cardiometabolic",
		tag: "Oral Hypoglycemic Agents",
		searchQuery: "Diabetic",
		icon: Droplet,
	},
	{
		id: "respiratory",
		name: "Respiratory",
		domain: "cardiometabolic",
		tag: "Bronchodilators & Inhalants",
		searchQuery: "Respiratory",
		icon: Wind,
	},
	{
		id: "gastrointestinal",
		name: "Gastrointestinal",
		domain: "cardiometabolic",
		tag: "PPIs & Antispasmodics",
		searchQuery: "Gastro",
		icon: Apple,
	},

	// ─── 3. Neuro & Specialized Therapies ───
	{
		id: "cns",
		name: "Central Nervous System",
		domain: "neuro",
		tag: "Neuro & Psychiatric",
		searchQuery: "Central Nervous System",
		icon: Brain,
	},
	{
		id: "analgesics",
		name: "Analgesics & NSAIDs",
		domain: "neuro",
		tag: "Anti-Inflammatory & Pain",
		searchQuery: "Analgesic",
		icon: Layers,
	},
	{
		id: "antihistamines",
		name: "Antihistamines",
		domain: "neuro",
		tag: "Allergy & H1 Blockers",
		searchQuery: "Histamine",
		icon: Flower2,
	},
	{
		id: "urology",
		name: "Urology",
		domain: "neuro",
		tag: "Renal Care & Blockers",
		searchQuery: "Urology",
		icon: Filter,
	},

	// ─── 4. Bio-Nutraceuticals & Natural Actives ───
	{
		id: "erectile-dysfunction",
		name: "Erectile Dysfunction",
		domain: "bionutrition",
		tag: "PDE5 Inhibitors",
		searchQuery: "Erectile",
		icon: Activity,
	},
	{
		id: "vitamins",
		name: "Vitamins & Minerals",
		domain: "bionutrition",
		tag: "Bioactive Nutrients",
		searchQuery: "Vitamin",
		icon: Sun,
	},
	{
		id: "plant-extracts",
		name: "Plant Extracts",
		domain: "bionutrition",
		tag: "Standardized Botanicals",
		searchQuery: "Extract",
		icon: Leaf,
	},
	{
		id: "probiotics",
		name: "Probiotics",
		domain: "bionutrition",
		tag: "Verified Strains",
		searchQuery: "Probiotic",
		icon: Microscope,
	},
];

export default function TherapeuticCategoriesGrid() {
	const router = useRouter();

	const handleCategoryClick = (cat: TherapeuticCategory) => {
		router.push(`/products?search=${encodeURIComponent(cat.searchQuery)}`);
	};

	return (
		<div className="w-full">
			{/* ─── Desaturated Architectural Cards (Spacious, No Truncations) ─── */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
				{THERAPEUTIC_CATEGORIES.map((cat, idx) => {
					const Icon = cat.icon;

					return (
						<motion.div
							key={cat.id}
							initial={{ opacity: 0, y: 14 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.3, delay: idx * 0.02 }}
							whileHover={{ y: -2.5 }}
							whileTap={{ scale: 0.985 }}
							onClick={() => handleCategoryClick(cat)}
							className="group relative bg-white rounded-2xl p-4 sm:p-4.5 cursor-pointer border border-slate-200/80 hover:border-[#C79A4B] shadow-[0_1px_3px_rgba(18,48,74,0.03)] hover:shadow-[0_10px_24px_-6px_rgba(18,48,74,0.08)] transition-[border-color,box-shadow] duration-250 flex items-center gap-3.5 text-left will-change-transform"
						>
							{/* Left: Desaturated Clean Navy HexIcon */}
							<div className="shrink-0 flex items-center justify-center">
								<HexIcon
									size={42}
									bg="rgba(18,48,74,0.04)"
									className="group-hover:scale-105 transition-transform duration-200"
								>
									<Icon
										className="w-4.5 h-4.5 text-[#12304A] group-hover:text-[#C79A4B] transition-colors duration-200"
									/>
								</HexIcon>
							</div>

							{/* Center: Title & Pharmaceutical Subtitle (Zero Truncation) */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center justify-between gap-1">
									<h4 className="text-[13.5px] sm:text-[14px] font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors duration-200 leading-snug">
										{cat.name}
									</h4>
									<ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#C79A4B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-1" />
								</div>
								<p className="text-[11.5px] font-normal text-[#5A7A8E] leading-tight mt-0.5">
									{cat.tag}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
