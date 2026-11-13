"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Pill,
  HeartPulse,
  Sparkles,
  Wheat,
  Bug,
  Check,
  Layers,
  FileCheck2,
} from "lucide-react";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CtaBanner from "../components/CtaBanner";
import { HexIcon } from "../components/Hex";
import { FINISHED_PRODUCTS } from "@/data/finished-formulations";

// ─── Stat CountUp (GSAP + InView for zero-rerender smooth animation) ───
function StatCountUp({
  end,
  suffix = "",
  duration = 1.6,
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
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

// Actual formulations count from the verified catalog database
const ACTUAL_FORMULATIONS_COUNT = FINISHED_PRODUCTS.length;

// Clean Human Healthcare Formulations
const HUMAN_CARDS = [
  {
    id: "human-pharma",
    tag: "Human Care",
    badge: "Solid & Liquid Orals",
    title: "Human Pharmaceuticals",
    description:
      "Essential prescription medicines including oral antibiotics, pain relievers, diabetes treatments, and heart medications. Available in high-quality tablets, capsules, and liquid syrups.",
    highlights: [
      "Tablets, Capsules & Liquid Syrups",
      "Broad-Spectrum Antibiotics & Pain Care",
      "Moisture-Barrier Alu-Alu Blister Packaging",
      "Complete Bioequivalence & Stability Reports",
    ],
    href: "/products?category=human-pharmaceuticals",
    icon: Pill,
  },
  {
    id: "human-supplements",
    tag: "Wellness & Nutrition",
    badge: "Softgels & Powders",
    title: "Human Nutraceuticals & Supplements",
    description:
      "Daily wellness supplements to support immunity, bone health, and joint care. Includes multivitamin complexes, mineral tablets, and premium omega fish-oil softgels.",
    highlights: [
      "Omega-3 Marine Lipid Softgels",
      "Chelated Multivitamins & Mineral Complexes",
      "Joint Mobility & Bone Health Formulas",
      "Sugar-Free Liquid Tonics & Powders",
    ],
    href: "/products?category=human-supplements",
    icon: Sparkles,
  },
];

// Clean Veterinary Healthcare Formulations
const VETERINARY_CARDS = [
  {
    id: "vet-pharma",
    tag: "Animal Health",
    badge: "Boluses & Injections",
    title: "Veterinary Pharmaceuticals",
    description:
      "Proven animal health medicines for livestock and pets. Includes broad-spectrum deworming boluses, anti-infectives, and injectable treatments to protect herd health.",
    highlights: [
      "Broad-Spectrum Deworming Boluses",
      "Sterile Injectables & Liquid Antibiotics",
      "Anti-Inflammatory & Pain Relief Care",
      "Targeted Bovine, Equine & Poultry Range",
    ],
    href: "/products?category=veterinary-pharmaceuticals",
    icon: HeartPulse,
  },
  {
    id: "vet-supplements",
    tag: "Animal Nutrition",
    badge: "Feed Mill Grade",
    title: "Veterinary Feed Supplements",
    description:
      "Nutritional supplements designed to improve dairy milk yield and poultry growth. Includes high-absorption calcium liquids, mineral mixtures, and energy supplements.",
    highlights: [
      "Oral Calcium, Phosphorus & Minerals",
      "Lactation Boosters for Dairy Cattle",
      "Anti-Heat Stress Electrolyte Premixes",
      "Feed Conversion (FCR) Growth Boosters",
    ],
    href: "/products?category=veterinary-feed-supplements",
    icon: Wheat,
  },
  {
    id: "ectoparasiticides",
    tag: "Specialty Block",
    badge: "Pour-on & Sprays",
    title: "Ectoparasiticides",
    description:
      "Dedicated chemical facility producing topical sprays and pour-on solutions. Effectively controls and eliminates ticks, lice, mites, and scabies in farm animals.",
    highlights: [
      "Dedicated Standalone Formulation Block",
      "Amitraz, Cypermethrin & Deltamethrin",
      "Topical Pour-on, Dip & Animal Sprays",
      "Complete Tick, Mite, Scabies & Lice Care",
    ],
    href: "/products?category=ectoparasiticides",
    icon: Bug,
  },
];

export default function FormulationsPage() {
  const handleOpenQuote = (divisionName?: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ruskin:open-quote", {
          detail: {
            product: divisionName
              ? `Formulations Inquiry: ${divisionName}`
              : "Commercial Finished Formulations",
            note: divisionName
              ? `Inquiry regarding ${divisionName} commercial formulation range. Please provide regulatory dossier index and export pricing.`
              : "Inquiry regarding commercial finished formulations portfolio.",
          },
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white relative">
      {/* ══════════════════════════════════════════════════════
          1. EXECUTIVE INTRO SECTION
          (Exact visual structure from about page with CTAs below stats)
          ══════════════════════════════════════════════════════ */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 border-b border-[#12304A]/8 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <SectionHeader
              centered
              as="h1"
              eyebrow="Commercial Formulation Portfolio"
              lead="Commercial Finished Formulations &"
              highlight="Therapeutic Divisions"
              hideAccentBar
              description={`Explore Ruskin Chemipharm's portfolio of ${ACTUAL_FORMULATIONS_COUNT}+ commercial formulations across human pharmaceuticals, wellness supplements, veterinary therapeutics, feed supplements, and specialized ectoparasiticide blocks.`}
            />

            {/* Structured Minimalist Stats Row (Exactly as in About page, no background) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.14,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="relative max-w-xl mx-auto pt-8 border-t border-[#12304A]/10 text-center"
            >
              <div className="grid grid-cols-3 gap-4 sm:gap-8">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight">
                    <StatCountUp
                      end={ACTUAL_FORMULATIONS_COUNT}
                      suffix="+"
                    />
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Formulations
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="border-l border-[#12304A]/10 pl-4 sm:pl-8"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C79A4B] tracking-tight">
                    <StatCountUp end={5} />
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Divisions
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="border-l border-[#12304A]/10 pl-4 sm:pl-8"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight">
                    <StatCountUp end={40} suffix="+" />
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Export Markets
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Centered Dual Action CTAs (Positioned Below Stats) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/products?type=formulation"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm bg-[#C79A4B] hover:bg-[#B58A3E] text-white shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-[0.98]"
              >
                <Layers className="w-4 h-4 text-white" />
                <span>Explore {ACTUAL_FORMULATIONS_COUNT}+ Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                type="button"
                onClick={() => handleOpenQuote("Commercial Formulations Portfolio")}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-[#12304A] hover:bg-[#0B1E2E] text-white shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
              >
                <FileCheck2 className="w-4 h-4 text-[#C79A4B]" />
                <span>Request Commercial Quote</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT AREA (SPACIOUS, EDITORIAL LAYOUT)
          ══════════════════════════════════════════════════════ */}
      <main className="flex-grow py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 lg:space-y-40">

          {/* ══════════════════════════════════════════════════════
              SECTION 1: HUMAN HEALTHCARE FORMULATIONS
              ══════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-10 sm:space-y-12"
          >
            {/* Dedicated Section Header for Human Healthcare */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#12304A]/10">
              <SectionHeader
                eyebrow="Human Healthcare"
                lead="Finished Formulations for"
                highlight="Patient Care &amp; Wellness"
                description="Essential solid and liquid oral pharmaceuticals alongside daily wellness nutraceuticals developed for clinical effectiveness and international distribution."
              />

              <Link
                href="/products?type=formulation"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C79A4B] hover:text-[#B58A3E] transition-colors group cursor-pointer shrink-0 pb-2"
              >
                <span>Browse Human Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Spacious 2-Column Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {HUMAN_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#12304A]/[0.08] hover:border-[#C79A4B]/50 p-8 sm:p-10 shadow-[0_2px_16px_rgba(18,48,74,0.03)] hover:shadow-[0_16px_40px_-12px_rgba(18,48,74,0.1)] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-6">
                      {/* Top Header Row with HexIcon and Minimal Labels */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <HexIcon size={46} bg="rgba(199,154,75,0.08)" className="group-hover:scale-105 transition-transform duration-200">
                            <Icon className="w-5 h-5 text-[#C79A4B]" />
                          </HexIcon>
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#C79A4B]">
                            {card.tag}
                          </span>
                        </div>

                        <span className="text-xs font-medium text-[#5A7A8E] bg-[#12304A]/[0.03] px-2.5 py-0.5 rounded-md shrink-0">
                          {card.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#12304A] tracking-tight group-hover:text-[#C79A4B] transition-colors duration-200">
                        {card.title}
                      </h3>

                      {/* Description (Natural language, no truncation) */}
                      <p className="text-sm sm:text-base text-[#5A7A8E] leading-relaxed">
                        {card.description}
                      </p>

                      {/* Highlights Box with Generous Padding */}
                      <div className="bg-[#FAF7F2] border border-[#12304A]/6 rounded-2xl p-5 sm:p-6 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#12304A] block">
                          Key Capabilities &amp; Formats
                        </span>
                        <ul className="space-y-2.5">
                          {card.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-[#12304A]"
                            >
                              <div className="w-4 h-4 rounded-full bg-[#C79A4B]/15 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 text-[#C79A4B] stroke-[3]" />
                              </div>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer with Generous Spacing */}
                    <div className="pt-8 mt-8 border-t border-[#12304A]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <Link
                        href={card.href}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#12304A] hover:bg-[#C79A4B] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm group/btn cursor-pointer"
                      >
                        <span>View Products</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-white" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenQuote(card.title)}
                        className="text-xs sm:text-sm font-bold text-[#C79A4B] hover:text-[#B58A3E] transition-colors py-2 px-2 text-center cursor-pointer hover:underline"
                      >
                        Request Technical Dossier
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* ══════════════════════════════════════════════════════
              SECTION 2: VETERINARY & ANIMAL HEALTHCARE
              ══════════════════════════════════════════════════════ */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-10 sm:space-y-12"
          >
            {/* Dedicated Section Header for Veterinary Healthcare */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#12304A]/10">
              <SectionHeader
                eyebrow="Animal Healthcare &amp; Nutrition"
                lead="Therapeutics &amp; Supplements for"
                highlight="Livestock &amp; Herd Health"
                description="Specialized veterinary medicines, high-absorption dairy and poultry feed supplements, and dedicated ectoparasiticide acaricide solutions."
              />

              <Link
                href="/products?type=formulation"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C79A4B] hover:text-[#B58A3E] transition-colors group cursor-pointer shrink-0 pb-2"
              >
                <span>Browse Veterinary Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3-Column Grid Fitted with Generous Proportions and Breathing Room */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6 xl:gap-8 items-stretch">
              {VETERINARY_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#12304A]/[0.08] hover:border-[#C79A4B]/50 p-6 sm:p-7 xl:p-8 shadow-[0_2px_16px_rgba(18,48,74,0.03)] hover:shadow-[0_16px_40px_-12px_rgba(18,48,74,0.1)] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-5">
                      {/* Top Header Row with HexIcon and Minimal Labels (No Dot) */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <HexIcon size={44} bg="rgba(199,154,75,0.08)" className="group-hover:scale-105 transition-transform duration-200">
                            <Icon className="w-5 h-5 text-[#C79A4B]" />
                          </HexIcon>
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#C79A4B]">
                            {card.tag}
                          </span>
                        </div>

                        <span className="text-xs font-medium text-[#5A7A8E] bg-[#12304A]/[0.03] px-2.5 py-0.5 rounded-md shrink-0">
                          {card.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-[22px] font-extrabold text-[#12304A] tracking-tight group-hover:text-[#C79A4B] transition-colors duration-200 leading-snug">
                        {card.title}
                      </h3>

                      {/* Description (Natural language, no truncation) */}
                      <p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed">
                        {card.description}
                      </p>

                      {/* Highlights List */}
                      <div className="bg-[#FAF7F2] border border-[#12304A]/6 rounded-2xl p-4 sm:p-5 space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#12304A] block">
                          Core Highlights
                        </span>
                        <ul className="space-y-2">
                          {card.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] font-semibold text-[#12304A]"
                            >
                              <div className="w-4 h-4 rounded-full bg-[#C79A4B]/15 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 text-[#C79A4B] stroke-[3]" />
                              </div>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer with Generous Spacing */}
                    <div className="pt-6 mt-6 border-t border-[#12304A]/8 space-y-2.5">
                      <Link
                        href={card.href}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#12304A] hover:bg-[#C79A4B] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm group/btn cursor-pointer"
                      >
                        <span>View Products</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-white" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenQuote(card.title)}
                        className="w-full text-center text-xs font-bold text-[#C79A4B] hover:text-[#B58A3E] transition-colors py-1 cursor-pointer hover:underline"
                      >
                        Request Technical Dossier
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

        </div>
      </main>

      {/* ══════════════════════════════════════════════════════
          GLOBAL BRAND CTA BANNER
          ══════════════════════════════════════════════════════ */}
      <CtaBanner
        onRequestQuote={() =>
          handleOpenQuote("Finished Formulations Commercial Sourcing Inquiry")
        }
      />

      <Footer onOpenCatalog={() => handleOpenQuote()} />
    </div>
  );
}
