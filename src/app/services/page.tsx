"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	FileCheck2,
	Globe2,
	Ship,
	Truck,
	Factory,
	Building2,
	type LucideIcon,
} from "lucide-react";
import Footer from "../components/Footer";
import { HexIcon, HexBadge, MolecularDecoration } from "../components/Hex";

/* ───────────────────────────────────────────────────────────────────────────
   DATA
   NOTE: Service names, descriptions and claims are proposed copy and must be
   confirmed by Ruskin before going live.
   ─────────────────────────────────────────────────────────────────────────── */

interface Service {
	id: string;
	title: string;
	short: string;
	description: string;
	points: string[];
	image: string;
	icon: LucideIcon;
}

const SERVICES: Service[] = [
	{
		id: "cdsco-registration",
		title: "Registration with CDSCO",
		short: "Regulatory access",
		description:
			"Regulatory assistance and registration support with CDSCO for foreign manufacturers and pharma clients entering the Indian market.",
		points: [
			"Import registration & licensing support",
			"Documentation and dossier coordination",
			"Liaison through the approval process",
		],
		image: "/images/registration.webp",
		icon: FileCheck2,
	},
	{
		id: "indenting-sourcing",
		title: "Indenting & Global Sourcing",
		short: "Manufacturer network",
		description:
			"Connecting international manufacturers and formulation companies through reliable indenting and global sourcing.",
		points: [
			"Representation of overseas manufacturers",
			"Supplier identification and qualification",
			"Commercial negotiation and order follow-up",
		],
		image: "/images/sourcing.webp",
		icon: Globe2,
	},
	{
		id: "trading-distribution",
		title: "Trading & Distribution",
		short: "Market delivery",
		description:
			"Comprehensive trading services and an efficient distribution network for pharmaceutical products.",
		points: [
			"Stock-and-sell trading of APIs & excipients",
			"Reliable supply to formulation companies",
			"Responsive, need-based order fulfilment",
		],
		image: "/images/distribution.webp",
		icon: Truck,
	},
	{
		id: "import-export",
		title: "Import & Export",
		short: "Cross-border trade",
		description:
			"Cross-border trade facilitation, import/export logistics and compliance management.",
		points: [
			"Shipment coordination and logistics",
			"Customs and trade documentation",
			"Compliance management end-to-end",
		],
		image: "/images/export.webp",
		icon: Ship,
	},
];

/* Order in which services connect along the supply chain */
const FLOW = [
	{ service: SERVICES[0], verb: "Enable", caption: "Secure regulatory approval for market entry." },
	{ service: SERVICES[1], verb: "Source", caption: "Match approved manufacturers with client demand." },
	{ service: SERVICES[3], verb: "Move", caption: "Ship compliantly across borders." },
	{ service: SERVICES[2], verb: "Deliver", caption: "Distribute to formulation companies on time." },
];

/* ───────────────────────────────────────────────────────────────────────────
   MOTION
   ─────────────────────────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: (i: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
	}),
};

/* ───────────────────────────────────────────────────────────────────────────
   SECTION HEADER — mandatory 4-part stack
   ─────────────────────────────────────────────────────────────────────────── */
function SectionHeader({
	eyebrow,
	lead,
	highlight,
	description,
	centered = false,
	dark = false,
	as: Heading = "h2",
}: {
	eyebrow: string;
	lead: string;
	highlight: string;
	description: string;
	centered?: boolean;
	dark?: boolean;
	as?: "h1" | "h2";
}) {
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
			className={`space-y-3 ${centered ? "text-center" : "text-left"}`}
		>
			<motion.span
				variants={fadeUp}
				custom={0}
				className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase"
			>
				<div className="w-8 h-[2px] bg-[#C79A4B]" />
				{eyebrow}
				{centered && <div className="w-8 h-[2px] bg-[#C79A4B]" />}
			</motion.span>

			<motion.div variants={fadeUp} custom={1}>
				<Heading
					className={`text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight tracking-tight ${
						dark ? "text-white" : "text-[#12304A]"
					}`}
				>
					{lead} <span className="text-[#C79A4B]">{highlight}</span>
				</Heading>
			</motion.div>

			{/* SIGNATURE GOLD ACCENT BAR (CRITICAL: NEVER OMIT) */}
			<motion.div
				variants={fadeUp}
				custom={2}
				className={`w-16 h-[3px] rounded-full bg-[#C79A4B] ${centered ? "mx-auto" : ""}`}
			/>

			<motion.p
				variants={fadeUp}
				custom={3}
				className={`text-base font-normal max-w-2xl lg:max-w-3xl leading-relaxed ${
					dark ? "text-slate-300" : "text-[#5A7A8E]"
				} ${centered ? "mx-auto" : ""}`}
			>
				{description}
			</motion.p>
		</motion.div>
	);
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE
   ─────────────────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
	return (
		<div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col">
			<main className="flex-grow">
				{/* ════════════════ 1. HERO ════════════════ */}
				<section className="relative overflow-hidden">
					<MolecularDecoration
						className="absolute -top-6 right-[-60px] w-[320px] hidden lg:block pointer-events-none"
						opacity={0.06}
					/>

					<MolecularDecoration
						className="absolute bottom-[-40px] left-[-70px] w-[280px] hidden lg:block pointer-events-none -scale-x-100"
						opacity={0.05}
					/>

					<div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 text-center">
						{/* 4-part header (hero scale) */}
						<div className="space-y-4 sm:space-y-5">
							<motion.span
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: EASE }}
								className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase"
							>
								<div className="w-8 h-[2px] bg-[#C79A4B]" />
								Our Services
								<div className="w-8 h-[2px] bg-[#C79A4B]" />
							</motion.span>

							<motion.h1
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
								className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#12304A] leading-tight tracking-tight"
							>
								One Partner Across the
								<br className="hidden sm:block" />{" "}
								<span className="text-[#C79A4B]">Pharmaceutical Supply Chain</span>
							</motion.h1>

							{/* SIGNATURE GOLD ACCENT BAR (CRITICAL: NEVER OMIT) */}
							<motion.div
								initial={{ width: 0, opacity: 0 }}
								animate={{ width: "4rem", opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
								className="h-[3px] rounded-full bg-[#C79A4B] mx-auto"
							/>

							<motion.p
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
								className="text-sm sm:text-base text-[#5A7A8E] font-normal max-w-2xl mx-auto leading-relaxed"
							>
								From regulatory registration to final-mile distribution, Ruskin Chemipharm supports
								manufacturers and formulation companies at every step — backed by four decades of
								industry relationships since 1984.
							</motion.p>
						</div>

						{/* CTAs */}
						<motion.div
							initial={{ opacity: 0, y: 14 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
							className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
						>
							<a
								href="#capabilities"
								className="group inline-flex items-center justify-center gap-2 bg-[#12304A] hover:bg-[#0B1E2E] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto"
							>
								Explore Services
								<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
							</a>
							<Link
								href="/contact"
								className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-[#12304A]/[0.03] text-[#12304A] border border-[#12304A]/12 hover:border-[#C79A4B]/50 px-7 py-3.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto"
							>
								Send an Enquiry
								<ArrowUpRight className="w-4 h-4 text-[#C79A4B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</motion.div>

						{/* Service quick-links */}
						<motion.ul
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
							className="mt-14 sm:mt-16 pt-8 border-t border-[#12304A]/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3"
						>
							{SERVICES.map((s) => (
								<li key={s.id}>
									<a
										href={`#${s.id}`}
										className="group h-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-[#12304A]/[0.08] hover:border-[#C79A4B]/60 text-left transition-colors duration-200"
									>
										<HexIcon size={30} bg="#12304A" className="text-[#C79A4B]">
											<s.icon className="w-3.5 h-3.5" />
										</HexIcon>
										<span className="text-xs sm:text-sm font-semibold text-[#12304A] leading-snug">
											{s.title}
										</span>
									</a>
								</li>
							))}
						</motion.ul>
					</div>
				</section>

				{/* ════════════════ 2. SERVICE OVERVIEW ════════════════ */}
				<section className="bg-white border-y border-[#12304A]/[0.06]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
							<div className="lg:col-span-5">
								<SectionHeader
									eyebrow="Service Overview"
									lead="Beyond the"
									highlight="Product Catalogue"
									description="Ruskin's services bridge global manufacturers and Indian pharmaceutical companies — simplifying regulation, sourcing and logistics so clients can focus on formulation."
								/>
							</div>

							<motion.dl
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, margin: "-80px" }}
								className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#12304A]/[0.08] rounded-[24px] overflow-hidden border border-[#12304A]/[0.08]"
							>
								{[
									{ k: "1984", v: "Serving the pharmaceutical industry since" },
									{ k: "40+", v: "Years of manufacturer and client relationships" },
									{ k: "04", v: "Integrated services under one roof" },
								].map((stat, i) => (
									<motion.div
										key={stat.k}
										variants={fadeUp}
										custom={i}
										className="bg-white p-7 sm:p-8 flex flex-col gap-3"
									>
										<dt className="stat-num text-4xl lg:text-[44px] font-extrabold text-[#12304A] tracking-tight leading-none">
											{stat.k}
										</dt>
										<dd className="text-sm text-[#5A7A8E] leading-relaxed">{stat.v}</dd>
									</motion.div>
								))}
							</motion.dl>
						</div>
					</div>
				</section>

				{/* ════════════════ 3. SERVICE CAPABILITIES ════════════════ */}
				<section id="capabilities" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 space-y-12 sm:space-y-14">
						<SectionHeader
							eyebrow="Service Capabilities"
							lead="How We Support"
							highlight="Pharma Clients"
							description="Four focused capabilities, each designed to remove friction from a different stage of bringing pharmaceutical materials to market."
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
							{SERVICES.map((s, i) => (
								<motion.article
									key={s.id}
									id={s.id}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-60px" }}
									transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: EASE }}
									className="group scroll-mt-28 bg-white rounded-[28px] border border-[#12304A]/[0.08] overflow-hidden flex flex-col hover:border-[#C79A4B]/40 hover:shadow-[0_24px_60px_-24px_rgba(18,48,74,0.25)] transition-[border-color,box-shadow] duration-300"
								>
									{/* Image */}
									<div className="relative aspect-[16/9] overflow-hidden">
										<Image
											src={s.image}
											alt={s.title}
											fill
											sizes="(min-width: 768px) 50vw, 100vw"
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-[#071521]/70 via-[#071521]/10 to-transparent" />
										<span className="absolute bottom-4 left-5 stat-num text-white/90 text-sm font-bold tracking-widest">
											{String(i + 1).padStart(2, "0")}
											<span className="text-white/40"> / 04</span>
										</span>
									</div>

									{/* Body */}
									<div className="p-7 sm:p-8 flex flex-col gap-5 flex-1">
										<div className="flex items-start gap-4">
											<HexIcon size={44} bg="#12304A" className="text-[#C79A4B] mt-0.5">
												<s.icon className="w-[18px] h-[18px]" />
											</HexIcon>
											<div className="space-y-1.5">
												<h3 className="text-xl sm:text-[22px] font-extrabold text-[#12304A] tracking-tight leading-snug">
													{s.title}
												</h3>
												<p className="text-sm sm:text-[15px] text-[#5A7A8E] leading-relaxed">
													{s.description}
												</p>
											</div>
										</div>

										<ul className="space-y-2.5 pt-5 border-t border-[#12304A]/[0.07] mt-auto">
											{s.points.map((p) => (
												<li key={p} className="flex items-center gap-3 text-sm text-[#12304A] font-medium">
													<HexIcon size={18} bg="#C79A4B" className="text-white">
														<Check className="w-2.5 h-2.5 stroke-[3]" />
													</HexIcon>
													{p}
												</li>
											))}
										</ul>
									</div>
								</motion.article>
							))}
						</div>
					</div>
				</section>

				{/* ════════════════ 4. HOW SERVICES WORK TOGETHER ════════════════ */}
				<section className="relative bg-[#0B1E2E] overflow-hidden">
					<div
						className="absolute inset-0 opacity-[0.35] pointer-events-none"
						style={{
							background:
								"radial-gradient(60% 50% at 50% 0%, rgba(199,154,75,0.16) 0%, rgba(11,30,46,0) 70%)",
						}}
					/>
					<MolecularDecoration
						color="#C79A4B"
						opacity={0.07}
						className="absolute -bottom-10 -left-10 w-[260px] pointer-events-none"
					/>

					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 space-y-14">
						<SectionHeader
							centered
							dark
							eyebrow="Integrated Model"
							lead="How Our Services"
							highlight="Work Together"
							description="Each service hands off seamlessly to the next — giving manufacturers a clear route into India and giving clients a single, accountable partner."
						/>

						{/* Endpoints */}
						<div className="flex items-center gap-3 sm:gap-5">
							<Endpoint icon={Factory} label="Global Manufacturers" />
							<div className="relative flex-1 h-px bg-white/10 overflow-hidden">
								<motion.div
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 1.4, ease: EASE }}
									className="absolute inset-0 origin-left bg-gradient-to-r from-[#C79A4B]/0 via-[#C79A4B] to-[#C79A4B]/0"
								/>
							</div>
							<Endpoint icon={Building2} label="Pharma Clients" align="right" />
						</div>

						{/* Steps */}
						<ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
							{/* desktop connector line through the badges */}
							<div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-white/10">
								<motion.div
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									viewport={{ once: true, margin: "-80px" }}
									transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
									className="absolute inset-0 origin-left bg-[#C79A4B]/60"
								/>
							</div>

							{FLOW.map(({ service, verb, caption }, i) => (
								<motion.li
									key={service.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-60px" }}
									transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: EASE }}
									className="relative flex flex-col items-center text-center gap-5"
								>
									<div className="relative z-10 bg-[#0B1E2E] px-2">
										<HexBadge num={i + 1} active={i === FLOW.length - 1} />
									</div>

									<a
										href={`#${service.id}`}
										className="group w-full flex-1 rounded-[24px] bg-white/[0.05] border border-white/10 hover:border-[#C79A4B]/40 hover:bg-white/[0.07] p-6 flex flex-col items-center gap-3 transition-colors duration-300"
									>
										<span className="text-[11px] font-bold tracking-widest uppercase text-[#C79A4B]">
											{verb}
										</span>
										<h3 className="text-lg font-bold text-white tracking-tight leading-snug">
											{service.title}
										</h3>
										<p className="text-sm text-slate-400 leading-relaxed">{caption}</p>
										<ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#C79A4B] group-hover:translate-x-0.5 transition-all duration-200 mt-auto" />
									</a>
								</motion.li>
							))}
						</ol>
					</div>
				</section>

				{/* ════════════════ 5. FINAL CTA ════════════════ */}
				<section className="relative overflow-hidden">
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
							transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
							className="flex flex-col sm:flex-row items-center justify-center gap-3"
						>
							<Link
								href="/contact"
								className="group inline-flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-4 rounded-full text-sm font-bold transition-colors w-full sm:w-auto shadow-[0_14px_30px_-12px_rgba(199,154,75,0.6)]"
							>
								Send an Enquiry
								<ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
							<Link
								href="/products"
								className="inline-flex items-center justify-center gap-2 text-[#12304A] hover:text-[#C79A4B] px-6 py-4 text-sm font-bold transition-colors"
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

/* ───────────────────────────────────────────────────────────────────────────
   Endpoint pill used in the ecosystem diagram
   ─────────────────────────────────────────────────────────────────────────── */
function Endpoint({
	icon: Icon,
	label,
	align = "left",
}: {
	icon: LucideIcon;
	label: string;
	align?: "left" | "right";
}) {
	return (
		<div
			className={`inline-flex items-center gap-2.5 shrink-0 px-3.5 sm:px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 ${
				align === "right" ? "flex-row-reverse" : ""
			}`}
		>
			<HexIcon size={22} bg="#C79A4B" className="text-white">
				<Icon className="w-3 h-3" />
			</HexIcon>
			<span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">{label}</span>
		</div>
	);
}
