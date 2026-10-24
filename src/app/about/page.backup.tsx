"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";
import { MolecularDecoration, HEX_CLIP } from "../components/Hex";
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Layers,
  FlaskConical,
  Truck,
  HeartHandshake,
  Check,
  X,
  Sparkles,
  Award,
  Globe,
  Building2,
  TrendingUp,
  Clock,
  Compass,
  Briefcase,
  UserCheck,
  Search,
  Filter,
} from "lucide-react";

// ─── Authentic Timeline Milestones (from copy.pdf) ───────────────────────────
const TIMELINE_MILESTONES = [
  {
    id: "1984",
    year: "1984",
    badge: "Founding & Early Imports",
    title: "Pioneering API Imports in Mumbai",
    summary:
      "Founded by Kiran Premchand Shah in Mumbai, pioneering API imports from China alongside nationwide domestic sales.",
    narrative:
      "In 1984, Kiran Premchand Shah recognized that Indian pharmaceutical formulators needed direct, dependable access to primary chemical synthesizers. Ruskin Chemipharm was established in Mumbai with an ambitious charter: break open new import corridors from China while establishing a reliable nationwide domestic distribution network.",
    highlights: [
      "Pioneered direct chemical & API imports from China into India",
      "Built initial domestic wholesale distribution footprint across Mumbai & Gujarat",
      "Established foundational commercial principles of strict batch verification",
    ],
    metric: { value: "1984", label: "Foundation Year" },
    tag: "Founding Era",
  },
  {
    id: "1994",
    year: "1994",
    badge: "Pioneering Indenting",
    title: "Transition to Direct International Indenting",
    summary:
      "Transitioned into direct international indenting, bridging global synthesizers with India's emerging formulation leaders.",
    narrative:
      "Recognizing the rapid modernization of Indian pharmaceutical manufacturing, Ruskin transitioned its business model into direct international indenting. This enabled Indian formulators to contract directly with primary overseas synthesis houses with full transparency on pricing, volumes, and regulatory documentation.",
    highlights: [
      "Formalized direct indenting agency agreements with global chemical houses",
      "Eliminated intermediary markups for Indian formulation laboratories",
      "Integrated regulatory document escrow and batch traceability protocols",
    ],
    metric: { value: "10 Years", label: "Commercial Indenting Track Record" },
    tag: "Business Model Evolution",
  },
  {
    id: "1997",
    year: "1997",
    badge: "Leadership Scale",
    title: "Executive Leadership Expansion",
    summary:
      "Krishna Kumar Iyer joined as General Manager, joining hands with Kiran Shah to accelerate commercial growth and scale operations.",
    narrative:
      "To keep pace with burgeoning demand and increasingly complex regulatory requirements, Krishna Kumar Iyer joined as General Manager. Working in close partnership with Kiran Shah, Iyer spearheaded operational professionalization, formalized vendor auditing, and dramatically scaled the client base across India.",
    highlights: [
      "Induction of Krishna Kumar Iyer to executive management",
      "Expansion of dedicated regulatory & logistics operations",
      "Multi-fold scale in institutional formulator account relationships",
    ],
    metric: { value: "2x Scale", label: "Operational Throughput" },
    tag: "Executive Leadership",
  },
  {
    id: "2002",
    year: "2002",
    badge: "Regulatory Landmarks",
    title: "DCGI Registrations & International Majors",
    summary:
      "Secured key DCGI registrations, establishing Ruskin as a primary indenting partner in India for international majors like NCPC and CSPC.",
    narrative:
      "A watershed moment for the firm: Ruskin secured vital import registrations with the Drug Controller General of India (DCGI / CDSCO). This regulatory authority cemented Ruskin Chemipharm as the exclusive and preferred Indian indenting partner for world-scale pharmaceutical conglomerates including NCPC and CSPC.",
    highlights: [
      "Secured core DCGI import licenses (Form 41 / Form 10)",
      "Appointed primary indenting partner for international giants NCPC and CSPC",
      "Introduced critical bulk antibiotics & anti-infectives to Indian market",
    ],
    metric: { value: "DCGI / CDSCO", label: "Regulatory Approvals Secured" },
    tag: "Regulatory Mastery",
  },
  {
    id: "2006",
    year: "2006",
    badge: "Direct Corridors",
    title: "On-Ground Procurement Expeditions",
    summary:
      "Began on-ground procurement expeditions to China, securing long-term manufacturer relationships, audited supply, and price advantages.",
    narrative:
      "Rather than relying on third-party trading agencies, Ruskin's leadership initiated regular on-ground technical audits across synthesis plants in China. By physically evaluating reactor vessels, cGMP records, and environmental controls, Ruskin established direct manufacturer relationships with significant pricing advantages.",
    highlights: [
      "Conducted physical reactor and cGMP audits across China's chemical corridors",
      "Negotiated long-term strategic supply agreements directly with factory owners",
      "Instituted rigorous pre-shipment COA testing and analytical verification",
    ],
    metric: { value: "Direct Factory", label: "Audit & Procurement Corridors" },
    tag: "Vendor Auditing",
  },
  {
    id: "2014",
    year: "2014",
    badge: "Operational Scale",
    title: "Marketing & Operational Workflow Scale",
    summary:
      "Yash Jhaveri joined the leadership team as Head of Marketing & Operations, modernizing local sales and operational workflows alongside Krishna Kumar Iyer.",
    narrative:
      "Yash Jhaveri joined the leadership team as Head of Marketing & Operations, infusing modern supply chain methodologies, CRM infrastructure, and data-driven client servicing. Working alongside Krishna Kumar Iyer, the team expanded Ruskin's reach into new therapeutic categories including contrast media and specialized anesthetics.",
    highlights: [
      "Yash Jhaveri appointed Head of Marketing & Operations",
      "Modernization of inventory visibility, quotation turnarounds, and client workflows",
      "Expansion into high-barrier therapeutic categories (Contrast Media, Anesthetics)",
    ],
    metric: { value: "100+", label: "Product Portfolio Scale" },
    tag: "Operational Scale",
  },
  {
    id: "2024",
    year: "2024",
    badge: "Next-Gen Growth",
    title: "Next-Gen Strategic Business Development",
    summary:
      "Atman Ajmera joined to lead business development, driving strategic outreach, new client acquisitions, and modern institutional partnerships.",
    narrative:
      "Atman Ajmera joined the management team to spearhead strategic business development. Focusing on next-generation institutional formulation partnerships, digital procurement interfaces, and expanding regulatory documentation dossiers, Ajmera drives Ruskin's aggressive forward-looking expansion.",
    highlights: [
      "Atman Ajmera appointed to lead Business Development",
      "Launch of strategic outreach for specialty formulation manufacturers",
      "Expansion of digital compliance documentation and global client access",
    ],
    metric: { value: "Next-Gen", label: "Institutional Partnerships" },
    tag: "Strategic Growth",
  },
  {
    id: "today",
    year: "Today",
    badge: "Multigenerational Clout",
    title: "Modern Global Indenting Powerhouse",
    summary:
      "A multigenerational pharma partner combining decades of sourcing mastery with forward-looking market development and complete regulatory trust.",
    narrative:
      "Today, Ruskin Chemipharm stands as an institutional pillar in pharmaceutical indenting and raw material distribution. Operating from Mumbai with nationwide reach and deep global manufacturing ties, we deliver end-to-end reliability from primary chemical synthesizer to final formulation floor.",
    highlights: [
      "Over four decades of uninterrupted pharmaceutical supply chain trust",
      "Direct relationships with primary audited cGMP manufacturers worldwide",
      "Full regulatory support: USDMF, CEP open-parts, COA verification & DCGI filings",
    ],
    metric: { value: "40+ Years", label: "Legacy of Uncompromising Trust" },
    tag: "Industry Leadership",
  },
];

// ─── Authentic Leadership Team (from copy.pdf) ───────────────────────────────
const LEADERSHIP_TEAM = [
  {
    name: "Kiran Premchand Shah",
    role: "Founder",
    tenure: "Founded in 1984",
    focus: "Strategic Vision & Global Indenting Pioneer",
    bio: "Pioneered API imports from China in 1984 and laid the foundation for Ruskin Chemipharm's four decades of commercial discipline, direct factory partnerships, and ethical stewardship.",
    photo: "/images/founder.jpg",
    hasPhoto: true,
    badges: ["Strategic Direction", "Primary Sourcing Alliances", "Founder Est. 1984"],
    deskContact: "Executive Management Desk",
  },
  {
    name: "Krishna Kumar Iyer",
    role: "General Manager",
    tenure: "Joined in 1997 · 27+ Years Leadership",
    focus: "Commercial Operations & Regulatory Governance",
    bio: "Joined hands with Kiran Shah in 1997 to scale operational workflows, establish landmark DCGI registrations, and cement long-term relationships with international manufacturing majors.",
    hasPhoto: false,
    initials: "KI",
    badges: ["DCGI Registrations", "Operational Scale", "Global Major Alliances"],
    deskContact: "Regulatory & Commercial Desk",
  },
  {
    name: "Yash Jhaveri",
    role: "Head of Marketing & Operations",
    tenure: "Joined in 2014 · 10+ Years Leadership",
    focus: "Domestic Sales & Operational Modernization",
    bio: "Joined in 2014 to modernize local sales and operational workflows alongside Krishna Kumar Iyer, driving portfolio expansion across contrast media, anesthetics, and specialty APIs.",
    hasPhoto: false,
    initials: "YJ",
    badges: ["Supply Chain Modernization", "Contrast Media", "Specialty APIs"],
    deskContact: "Marketing & Distribution Desk",
  },
  {
    name: "Atman Ajmera",
    role: "Business Development Manager",
    tenure: "Joined in 2024 · Strategic Expansion",
    focus: "Strategic Outreach & Institutional Partnerships",
    bio: "Joined in 2024 to accelerate institutional client acquisitions, modern formulation partnerships, and forward-looking market development across India and international corridors.",
    hasPhoto: false,
    initials: "AA",
    badges: ["Institutional Partnerships", "Market Development", "Digital Compliance"],
    deskContact: "Business Development Desk",
  },
];

// ─── Founding Core Values (from copy.pdf Page 4) ─────────────────────────────
const FOUNDING_VALUES = [
  {
    title: "Regulatory Excellence",
    subtitle: "End-to-End Compliance",
    description:
      "Ensuring rigorous compliance, Form 41 / Form 10 DCGI registrations, and securing direct approvals with top-tier international cGMP manufacturers.",
    icon: ShieldCheck,
  },
  {
    title: "Direct Sourcing Integrity",
    subtitle: "Audited Corridors",
    description:
      "Leveraging long-term, on-ground audited supplier relationships across global manufacturing hubs to deliver structural pricing advantages and uninterrupted supply.",
    icon: FlaskConical,
  },
  {
    title: "Enduring Relationships",
    subtitle: "Four Decades of Trust",
    description:
      "Fostering transparent, decades-long partnerships with raw material synthesizers and leading formulation innovators based on accountability and mutual growth.",
    icon: HeartHandshake,
  },
];

// ─── Therapeutic Spectrum (from copy.pdf Pages 5-7) ───────────────────────────
const PRODUCT_SPECTRUM = [
  {
    category: "Anti-Infectives & Antibiotics",
    icon: ShieldCheck,
    items: "Amphotericin B, Benzathine Penicillin, Benzylpenicillin Sodium, Procaine Penicillin, Rifampicin, Streptomycin, Teicoplanin",
    count: "12+ Molecules",
  },
  {
    category: "Anesthetics & Neuromuscular Blockers",
    icon: FlaskConical,
    items: "Rocuronium Bromide, Desflurane, Isoflurane, Sevoflurane EP/USP",
    count: "6+ High-Purity Actives",
  },
  {
    category: "Contrast Media",
    icon: Layers,
    items: "Iohexol, Iobitridol, Iodixanol, Iomeprol, Iopamidol, Iopromide, Ioversol",
    count: "7 Core Radiopaque Agents",
  },
  {
    category: "Immunosuppressants & Oncology",
    icon: Building2,
    items: "Mitomycin, Tacrolimus IP, Cyclosporine IP, Oxaliplatin IP",
    count: "High Potency APIs",
  },
  {
    category: "Nephrology & Keto Analogues",
    icon: TrendingUp,
    items: "D,L-α-Hydroxymethionine Calcium, α-Ketoisoleucine, α-Ketoleucine, α-Ketophenylalanine, α-Ketovaline Calcium",
    count: "Complete Renal Profile",
  },
  {
    category: "Vitamins, Nutrients & CNS",
    icon: Award,
    items: "Pyridoxine HCl (Vit B6), Thiamine HCl (Vit B1), Thiamine Mononitrate, Coenzyme Q10, Piracetam IP",
    count: "Essential Pharmacopoeials",
  },
];

export default function AboutPage() {
  const [activeEraIndex, setActiveEraIndex] = useState(0); // Default to founding year 1984
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedSpectrumFilter, setSelectedSpectrumFilter] = useState("All");

  const activeEra = TIMELINE_MILESTONES[activeEraIndex];

  const filteredSpectrum = PRODUCT_SPECTRUM.filter((item) => {
    if (selectedSpectrumFilter === "All") return true;
    return item.category === selectedSpectrumFilter;
  });

  useEffect(() => {
    const handleQuote = () => setQuoteModalOpen(true);
    window.addEventListener("ruskin:open-quote", handleQuote);
    return () => window.removeEventListener("ruskin:open-quote", handleQuote);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">

      <main className="flex-grow">
        {/* ─── 1. HERO SECTION: Light Luxury Editorial with Generous Breathing Room ─── */}
        <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#FAF7F2] to-[#FAF7F2] border-b border-[#12304A]/8">
          {/* Subtle background ambient molecular lattice */}
          <div className="absolute top-0 right-0 w-[580px] pointer-events-none select-none opacity-[0.05] translate-x-20 -translate-y-12">
            <MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
            {/* Top Breadcrumb & Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#12304A]/10 text-xs font-bold text-[#12304A] shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#C79A4B] animate-pulse" />
                <span>ESTABLISHED 1984 · MUMBAI, INDIA</span>
                <span className="text-[#12304A]/20">|</span>
                <span className="text-[#C79A4B]">FOUR DECADES OF INTEGRITY</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#5A7A8E]"
              >
                <ShieldCheck className="w-4 h-4 text-[#C79A4B]" />
                <span>CDSCO / DCGI Authorized Regulatory Liaison Desk</span>
              </motion.div>
            </div>

            {/* Display Headline & Editorial Positioning */}
            <div className="max-w-4xl space-y-6 text-left">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-[2.5px] bg-[#C79A4B] rounded-full" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                  Corporate Legacy &amp; Indenting Pedigree
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#12304A] tracking-tight leading-[1.12]"
              >
                Bridging Global Chemistry with Direct Sourcing &amp; Regulatory Trust.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="text-lg sm:text-xl text-[#5A7A8E] leading-relaxed max-w-3xl font-normal"
              >
                Founded in Mumbai in 1984, Ruskin Chemipharm pioneered direct API imports from China. Over four decades, we evolved into India&apos;s authoritative international indenting powerhouse—connecting primary global synthesis plants with formulation innovators through uncompromising regulatory stewardship.
              </motion.p>
            </div>

            {/* 4 Interactive Clinical Pedigree Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-4"
            >
              {[
                {
                  value: "40+ Years",
                  label: "Industry Leadership",
                  sub: "Founded in Mumbai, 1984",
                },
                {
                  value: "250+",
                  label: "Global Sourcing Partners",
                  sub: "Audited Primary Synthesizers",
                },
                {
                  value: "46+ APIs",
                  label: "DCGI Approved Molecules",
                  sub: "Verified Technical Dossiers",
                },
                {
                  value: "200+",
                  label: "Formulator Network",
                  sub: "Top Indian Pharma & CMO Clients",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#12304A]/8 hover:border-[#C79A4B]/50 hover:shadow-lg transition-all duration-300 text-left group shadow-xs"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#12304A] font-mono group-hover:text-[#C79A4B] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#12304A] mt-2">{stat.label}</div>
                  <div className="text-[11px] text-[#5A7A8E] mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 2. REPOSITIONED ABOVE: INTERACTIVE CHRONICLE TIMELINE ──────────── */}
        <section className="py-24 sm:py-32 bg-white text-[#5A7A8E] relative overflow-hidden border-b border-[#12304A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#12304A]/8">
              <div className="space-y-2 text-left max-w-2xl">
                <div className="inline-flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-[#C79A4B]" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                    CHRONICLE OF GROWTH · 1984 TO TODAY
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight">
                  Four Decades of Strategic Evolution
                </h2>
                <p className="text-sm sm:text-base text-[#5A7A8E]">
                  Explore key historical milestones, leadership appointments, and landmark DCGI import approvals across 40 years.
                </p>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveEraIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeEraIndex === 0}
                  className="px-4 py-2 rounded-full border border-[#12304A]/15 bg-[#FAF7F2] hover:bg-white disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-[#12304A] shadow-xs"
                  aria-label="Previous milestone"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-mono px-3 text-[#5A7A8E]">
                  <span className="text-[#C79A4B] font-bold">{activeEraIndex + 1}</span> / {TIMELINE_MILESTONES.length}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEraIndex((prev) => Math.min(TIMELINE_MILESTONES.length - 1, prev + 1))}
                  disabled={activeEraIndex === TIMELINE_MILESTONES.length - 1}
                  className="px-4 py-2 rounded-full border border-[#12304A]/15 bg-[#FAF7F2] hover:bg-white disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-[#12304A] shadow-xs"
                  aria-label="Next milestone"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Continuous Connected Timeline Rail (Scroll-safe on Mobile) ── */}
            <div className="relative pt-4 pb-2">
              {/* Connecting Horizontal Line Behind Nodes */}
              <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-[#12304A]/10 -translate-y-1/2 hidden lg:block" />
              
              {/* Active Golden Progress Segment */}
              <div
                className="absolute top-1/2 left-4 h-[2.5px] bg-[#C79A4B] -translate-y-1/2 transition-all duration-300 hidden lg:block"
                style={{
                  width: `${(activeEraIndex / (TIMELINE_MILESTONES.length - 1)) * 96}%`,
                }}
              />

              {/* Responsive Milestone Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
                {TIMELINE_MILESTONES.map((item, idx) => {
                  const isActive = idx === activeEraIndex;
                  const isPassed = idx <= activeEraIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveEraIndex(idx)}
                      className={`group relative p-3 sm:p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                        isActive
                          ? "bg-[#12304A] text-white border-[#12304A] shadow-lg shadow-[#12304A]/20 scale-102"
                          : isPassed
                          ? "bg-white border-[#C79A4B]/40 text-[#12304A] hover:border-[#12304A]"
                          : "bg-white/80 border-[#12304A]/10 text-[#5A7A8E] hover:border-[#C79A4B]/40 hover:bg-white"
                      }`}
                    >
                      {/* Top Node Pip */}
                      <div className="flex items-center justify-between w-full mb-2">
                        <span
                          className={`text-base sm:text-lg font-mono font-extrabold ${
                            isActive ? "text-white" : "text-[#12304A]"
                          }`}
                        >
                          {item.year}
                        </span>
                        
                        <div
                          className={`w-3.5 h-4 flex items-center justify-center transition-transform ${
                            isActive
                              ? "bg-[#C79A4B] text-[#12304A] scale-110"
                              : isPassed
                              ? "bg-[#12304A] text-white"
                              : "bg-[#12304A]/10 text-[#12304A]"
                          }`}
                          style={{ clipPath: HEX_CLIP }}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              isActive ? "bg-[#12304A]" : "bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Badge / Subtitle */}
                      <div
                        className={`text-[11px] truncate font-medium leading-tight ${
                          isActive ? "text-[#E5C378] font-bold" : "text-[#5A7A8E]"
                        }`}
                      >
                        {item.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Active Milestone Exhibition Showcase ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="bg-[#FAF7F2] rounded-3xl border border-[#12304A]/10 p-8 sm:p-12 lg:p-14 shadow-[0_12px_45px_rgb(18,48,74,0.06)] relative overflow-hidden text-left"
              >
                {/* Background Large Year Watermark */}
                <div className="absolute right-6 -bottom-6 font-mono font-black text-8xl sm:text-9xl text-[#12304A]/[0.04] select-none pointer-events-none">
                  {activeEra.year}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
                  {/* Left (7 cols): Chronicle Narrative & Highlights */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#12304A]/10 text-[#12304A] text-xs font-bold tracking-wide shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#C79A4B]" />
                      <span>{activeEra.year} · {activeEra.tag}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12304A] tracking-tight leading-tight">
                      {activeEra.title}
                    </h3>

                    <p className="text-base text-[#5A7A8E] leading-relaxed font-normal">
                      {activeEra.narrative}
                    </p>

                    <div className="pt-3 space-y-3">
                      <div className="text-xs uppercase font-extrabold tracking-wider text-[#C79A4B]">
                        Key Milestones &amp; Capabilities
                      </div>
                      <div className="space-y-2.5">
                        {activeEra.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#5A7A8E]">
                            <div
                              className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center bg-[#12304A]"
                              style={{ clipPath: HEX_CLIP }}
                            >
                              <Check className="w-2.5 h-2.5 text-[#C79A4B] stroke-[3]" />
                            </div>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right (5 cols): Era Impact Highlight Box */}
                  <div className="lg:col-span-5 bg-white rounded-2xl border border-[#12304A]/10 p-7 sm:p-9 space-y-5 shadow-sm">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#C79A4B]">
                      ERA IMPACT HIGHLIGHT
                    </div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] font-mono">
                      {activeEra.metric.value}
                    </div>
                    <div className="text-xs font-semibold text-[#5A7A8E]">
                      {activeEra.metric.label}
                    </div>
                    <div className="pt-3 border-t border-[#12304A]/8 text-xs text-[#5A7A8E] leading-relaxed">
                      {activeEra.summary}
                    </div>

                    {/* Milestone Progress Bar */}
                    <div className="pt-2 space-y-1.5">
                      <div className="flex justify-between text-[11px] text-[#5A7A8E]">
                        <span>Chronicle Progress</span>
                        <span className="font-mono text-[#12304A] font-bold">
                          {Math.round(((activeEraIndex + 1) / TIMELINE_MILESTONES.length) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-[#12304A]/8 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#C79A4B] h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${((activeEraIndex + 1) / TIMELINE_MILESTONES.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── 3. OUR FOUNDING STORY & STRATEGIC EXECUTION ─────────────────────── */}
        <section className="py-24 sm:py-32 bg-[#FAF7F2] text-[#5A7A8E] relative border-b border-[#12304A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Founder Showcase Card (5 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 space-y-6"
              >
                {/* Founder Portrait Card */}
                <div className="rounded-3xl overflow-hidden bg-white border border-[#12304A]/10 shadow-[0_12px_45px_rgb(18,48,74,0.06)] group hover:border-[#C79A4B]/50 transition-all duration-500">
                  <div className="aspect-[4/5] relative w-full overflow-hidden bg-[#0B1E2E]">
                    <Image
                      src="/images/founder.jpg"
                      alt="Kiran Premchand Shah - Founder of Ruskin Chemipharm, Est. 1984"
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2E]/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#C79A4B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        Founder · Est. 1984
                      </span>
                      <span className="text-xs text-white/90 font-medium">Mumbai, India</span>
                    </div>
                  </div>

                  <div className="p-7 space-y-3 text-left bg-white border-t border-[#12304A]/8">
                    <h3 className="text-2xl font-extrabold text-[#12304A]">
                      Kiran Premchand Shah
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed">
                      Pioneered direct chemical and API imports from China in 1984. Instituted four decades of commercial discipline, transparent indenting agreements, and long-standing manufacturing partnerships.
                    </p>

                    <div className="pt-3 border-t border-[#12304A]/8 flex items-center gap-2 text-xs text-[#C79A4B] font-semibold">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Four Decades of Direct Synthesizer Alliances</span>
                    </div>
                  </div>
                </div>

                {/* Sourcing Clout Card */}
                <div className="p-6 rounded-2xl bg-white border border-[#12304A]/8 text-left space-y-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-9 flex items-center justify-center bg-[#12304A] text-[#C79A4B]"
                      style={{ clipPath: HEX_CLIP }}
                    >
                      <FlaskConical className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-sm font-bold text-[#12304A]">
                      Direct Factory Audit Protocols
                    </span>
                  </div>
                  <p className="text-xs text-[#5A7A8E] leading-relaxed">
                    Physical on-ground technical audits across major manufacturing corridors ensure verified cGMP compliance, transparent volume pricing, and zero intermediary markups.
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Full Narrative & 3-Era Evolution Stack (7 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 space-y-8 text-left"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-[#C79A4B]" />
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                      OUR FOUNDING STORY
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight leading-tight">
                    Four Decades of Strategic Leadership &amp; On-the-Ground Execution.
                  </h2>
                </div>

                <div className="space-y-5 text-base sm:text-lg text-[#5A7A8E] leading-relaxed font-normal">
                  <p>
                    Founded in <strong className="text-[#12304A] font-semibold">1984 by Kiran Premchand Shah</strong> in Mumbai, Ruskin Chemipharm began with a bold vision: pioneering API imports from China while building a robust nationwide domestic distribution network. What started as an ambitious import operation quickly evolved into a leading international pharmaceutical indenting powerhouse.
                  </p>
                  <div className="p-5 rounded-2xl bg-white border-l-4 border-[#C79A4B] shadow-xs text-[#12304A] font-semibold text-sm sm:text-base leading-relaxed">
                    &ldquo;From Supplier to End-User, we are experts in end-to-end distribution of raw materials.&rdquo;
                  </div>
                  <p className="text-[#5A7A8E] text-sm sm:text-base">
                    For over four decades, our growth has been driven by strategic leadership, regulatory rigour, and on-the-ground execution:
                  </p>
                </div>

                {/* 3 Chronological Milestones Stack */}
                <div className="space-y-3.5 pt-1">
                  {[
                    {
                      year: "1997",
                      leader: "Krishna Kumar Iyer",
                      role: "General Manager",
                      text: "joined alongside Kiran Shah, accelerating our commercial scale and formalizing regulatory import operations.",
                    },
                    {
                      year: "2014",
                      leader: "Yash Jhaveri",
                      role: "Head of Marketing & Operations",
                      text: "joined to modernize local sales and operational workflows alongside Krishna Kumar Iyer.",
                    },
                    {
                      year: "2024",
                      leader: "Atman Ajmera",
                      role: "Business Development Manager",
                      text: "joined to lead business development, driving strategic outreach and new institutional partnerships.",
                    },
                  ].map((m, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 6, transition: { duration: 0.18 } }}
                      className="p-5 rounded-2xl bg-white border border-[#12304A]/8 shadow-xs flex items-start gap-4 transition-all hover:border-[#C79A4B]/50 hover:shadow-md"
                    >
                      <div className="text-xs font-mono font-extrabold text-[#12304A] bg-[#C79A4B]/20 border border-[#C79A4B]/40 px-3.5 py-1.5 rounded-lg shrink-0">
                        {m.year}
                      </div>
                      <div className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed">
                        In <strong className="text-[#12304A] font-bold">{m.year}</strong>,{" "}
                        <strong className="text-[#12304A]">{m.leader}</strong> ({m.role}) {m.text}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#5A7A8E] leading-relaxed pt-2">
                  Today Ruskin Chemipharm stands as a multigenerational partner operating at the intersection of regulatory trust, global sourcing mastery, and modern market development.
                </p>

                {/* 3 Founding Values */}
                <div className="pt-6 border-t border-[#12304A]/10 space-y-4">
                  <div className="text-xs uppercase font-extrabold tracking-wider text-[#12304A]">
                    We Remain Committed to Our Founding Values:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {FOUNDING_VALUES.map((val, idx) => {
                      const ValIcon = val.icon;
                      return (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-white border border-[#12304A]/8 shadow-xs space-y-2.5 text-left hover:border-[#C79A4B]/50 transition-all group"
                        >
                          <div
                            className="w-8 h-9 flex items-center justify-center bg-[#12304A] text-[#C79A4B] group-hover:bg-[#C79A4B] group-hover:text-white transition-colors"
                            style={{ clipPath: HEX_CLIP }}
                          >
                            <ValIcon className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <div className="text-xs font-bold text-[#12304A]">{val.title}</div>
                          <p className="text-[11px] text-[#5A7A8E] leading-relaxed">
                            {val.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 4. EXECUTIVE LEADERSHIP: Modern Corporate Dossier ────────────────── */}
        <section className="py-24 sm:py-32 bg-white text-[#5A7A8E] relative border-b border-[#12304A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 justify-center">
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                  LEADERSHIP &amp; GOVERNANCE
                </span>
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight">
                Executive Leadership
              </h2>
              <p className="text-base text-[#5A7A8E]">
                Four decades of pharmaceutical indenting mastery, on-the-ground execution, and client trust.
              </p>
            </div>

            {/* 4 Leaders from copy.pdf as Executive Dossier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEADERSHIP_TEAM.map((leader, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#12304A]/10 p-6 space-y-5 flex flex-col justify-between text-left hover:border-[#C79A4B]/50 hover:shadow-xl transition-all duration-300 group shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Visual: Real Photo or Architectural Executive Badge */}
                    {leader.hasPhoto && leader.photo ? (
                      <div className="aspect-square relative w-full rounded-2xl overflow-hidden bg-[#0B1E2E] border border-[#12304A]/10 shadow-sm">
                        <Image
                          src={leader.photo}
                          alt={`${leader.name}, ${leader.role}`}
                          fill
                          sizes="280px"
                          className="object-cover object-top group-hover:scale-104 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square w-full rounded-2xl bg-white border border-[#12304A]/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:border-[#C79A4B]/40 transition-colors shadow-xs">
                        <div
                          className="w-16 h-18 flex items-center justify-center bg-[#12304A] text-[#C79A4B] mb-2 shadow-xs"
                          style={{ clipPath: HEX_CLIP }}
                        >
                          <span className="text-2xl font-extrabold font-mono text-[#C79A4B]">
                            {leader.initials}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7A8E]">
                          Executive Director
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
                          {leader.role}
                        </span>
                        <span className="text-[10px] text-[#5A7A8E] font-medium">{leader.tenure}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors">
                        {leader.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#5A7A8E]">{leader.focus}</p>
                    </div>

                    <p className="text-xs text-[#5A7A8E] leading-relaxed pt-1">
                      {leader.bio}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-[#12304A]/8">
                    <div className="flex flex-wrap gap-1.5">
                      {leader.badges.map((b, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-white border border-[#12304A]/8 text-[#5A7A8E] font-medium"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors pt-1"
                    >
                      <span>Connect with {leader.deskContact}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. OUR INSPIRATION: Centerpiece Exhibit (Pujya Gurudevshri & SRLC) ── */}
        <section className="py-24 sm:py-32 bg-[#FAF7F2] text-[#5A7A8E] relative border-b border-[#12304A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 justify-center">
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                  OUR INSPIRATION
                </span>
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight">
                Guided by Timeless Values
              </h2>
              <p className="text-base text-[#5A7A8E]">
                True progress comes not merely from what we achieve, but from how we achieve it.
              </p>
            </div>

            {/* Exhibit Card in White Well */}
            <div className="bg-white rounded-[32px] sm:rounded-[36px] border border-[#12304A]/10 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-[0_12px_45px_rgb(18,48,74,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Spiritual Master Photo Column (4 cols) */}
                <div className="lg:col-span-4 flex flex-col items-center">
                  <div className="relative w-full max-w-xs rounded-3xl overflow-hidden bg-white border-2 border-[#C79A4B]/40 shadow-xl group">
                    <div className="aspect-[4/5] relative w-full overflow-hidden">
                      <Image
                        src="/images/pujya-gurudevshri.jpg"
                        alt="Pujya Gurudevshri Rakeshji - Spiritual Master & Visionary"
                        fill
                        sizes="(max-width: 768px) 100vw, 340px"
                        className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-5 bg-white text-center space-y-1.5 border-t border-[#12304A]/8">
                      <div className="text-lg font-bold text-[#12304A] tracking-tight">
                        Pujya Gurudevshri Rakeshji
                      </div>
                      <div className="text-xs text-[#C79A4B] font-semibold">
                        Enlightened Spiritual Master &amp; Visionary
                      </div>
                      <div className="text-[11px] text-[#5A7A8E]">
                        Founder, Shrimad Rajchandra Mission Dharampur
                      </div>
                      <div className="pt-2">
                        <a
                          href="https://www.srmd.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#C79A4B] hover:text-[#B58A3E] underline font-semibold transition-colors"
                        >
                          <span>Visit www.srmd.org</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Column (8 cols) */}
                <div className="lg:col-span-8 space-y-6 text-left">
                  <div className="space-y-4 text-base sm:text-lg text-[#5A7A8E] leading-[1.85] font-normal">
                    <p>
                      At <strong className="text-[#12304A] font-bold">Ruskin Chemipharm</strong>, business is not only about transactions. It is about how we conduct ourselves in every single one of them.
                    </p>
                    <p>
                      Our work is guided by the teachings of{" "}
                      <strong className="text-[#12304A] font-semibold">Pujya Gurudevshri Rakeshji</strong>, an enlightened spiritual master, visionary, and the founder of{" "}
                      <a
                        href="https://www.srmd.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C79A4B] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Shrimad Rajchandra Mission Dharampur
                        <ExternalLink className="w-3.5 h-3.5 inline" />
                      </a>
                      , a global spiritual organization with over 206 centers across six continents.
                    </p>
                    <p>
                      Pujya Gurudevshri&apos;s teachings center on inner transformation, integrity, compassion, and selfless service. He teaches that true progress, in life and in work, comes not from what we achieve, but from how we achieve it.
                    </p>
                    <p className="font-semibold text-[#12304A]">
                      These principles are not separate from how we do business. They are the foundation of it.
                    </p>
                  </div>

                  {/* Editorial Quote Box */}
                  <div className="p-6 rounded-2xl bg-[#FAF7F2] border-l-4 border-[#C79A4B] shadow-sm space-y-2">
                    <p className="text-xl sm:text-2xl font-bold text-[#12304A] italic font-serif leading-snug">
                      &ldquo;The way you conduct yourself in every interaction is a reflection of your inner values.&rdquo;
                    </p>
                    <div className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                      — Pujya Gurudevshri Rakeshji
                    </div>
                  </div>

                  {/* 4 Pillars of Guided Conduct */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {[
                      { title: "Inner Transformation", desc: "Conscious leadership" },
                      { title: "Selfless Service", desc: "Patient welfare priority" },
                      { title: "Uncompromising Integrity", desc: "Honesty in every batch" },
                      { title: "Genuine Accountability", desc: "Enduring partnerships" },
                    ].map((pill, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-[#FAF7F2] border border-[#12304A]/6 shadow-xs"
                      >
                        <div className="text-xs font-bold text-[#12304A]">{pill.title}</div>
                        <div className="text-[11px] text-[#5A7A8E] mt-0.5">{pill.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SRLC Humanitarian Block */}
              <div className="mt-12 pt-10 border-t border-[#12304A]/10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#12304A] bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-[#12304A]/10 shadow-xs">
                      <span>SHRIMAD RAJCHANDRA LOVE AND CARE (SRLC)</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#12304A]">
                      Extending Responsibility Beyond Commercial Supply Chains
                    </h3>

                    <p className="text-sm sm:text-base text-[#5A7A8E] leading-relaxed">
                      At Ruskin Chemipharm, our responsibility extends beyond commercial indenting. We are privileged to support <strong className="text-[#12304A]">Shrimad Rajchandra Love and Care (SRLC)</strong>, operating across ten comprehensive care categories—from healthcare and education to animal welfare and emergency relief.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex justify-center">
                    <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#12304A]/8 shadow-xs w-full max-w-sm">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src="/images/srlc-10fold.png"
                          alt="SRLC 10-Fold Programme"
                          fill
                          sizes="300px"
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center text-xs text-[#5A7A8E] mt-2 font-medium">
                        SRLC 10 Holistic Care Categories
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 SRLC Impact Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#12304A]/10 text-center">
                  {[
                    { value: "21M+", label: "Lives Touched Globally" },
                    { value: "10", label: "Holistic Care Categories" },
                    { value: "UN ECOSOC", label: "Special Consultative Status" },
                    { value: "13×", label: "Highest Fundraising NGO (TMM)" },
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/8 shadow-xs"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#12304A] font-mono">
                        {m.value}
                      </div>
                      <div className="text-xs font-semibold text-[#5A7A8E] mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. THERAPEUTIC SPECTRUM: Interactive Filterable Catalog Highlight ─ */}
        <section className="py-24 sm:py-32 bg-white text-[#5A7A8E] border-b border-[#12304A]/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-left space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C79A4B]">
                  THERAPEUTIC SPECTRUM
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A]">
                  Core Active Ingredients &amp; Indenting Categories
                </h2>
                <p className="text-sm text-[#5A7A8E]">
                  Select a category to view primary molecules backed by verified USDMF, CEP &amp; DCGI registrations.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#12304A] hover:bg-[#0B1E2E] text-white px-6 py-3.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <span>View Complete Product Catalog (46+ APIs)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#12304A]/8">
              {["All", ...PRODUCT_SPECTRUM.map((s) => s.category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSpectrumFilter(cat)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer border ${
                    selectedSpectrumFilter === cat
                      ? "bg-[#12304A] text-white border-[#12304A] shadow-xs"
                      : "bg-[#FAF7F2] text-[#5A7A8E] border-[#12304A]/10 hover:border-[#C79A4B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredSpectrum.map((spec, i) => {
                const SpecIcon = spec.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/8 shadow-xs hover:border-[#C79A4B]/50 hover:shadow-lg transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-9 flex items-center justify-center bg-[#12304A] text-[#C79A4B] group-hover:bg-[#C79A4B] group-hover:text-white transition-colors"
                          style={{ clipPath: HEX_CLIP }}
                        >
                          <SpecIcon className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div className="text-sm font-bold text-[#12304A]">{spec.category}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#C79A4B] bg-[#C79A4B]/15 px-2.5 py-0.5 rounded-full">
                        {spec.count}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A7A8E] leading-relaxed pl-11">
                      {spec.items}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── 7. CALL TO ACTION BANNER ─────────────────────────────────────────── */}
        <CtaBanner onRequestQuote={() => setQuoteModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCatalog={() => (window.location.href = "/products")} />

      {/* ─── REQUEST QUOTE MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#12304A]/50 backdrop-blur-sm"
              onClick={() => setQuoteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-[min(480px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white shadow-2xl border border-[#12304A]/10 text-left p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-4 right-4 text-[#5A7A8E] hover:text-[#12304A] p-1.5 rounded-full hover:bg-[#12304A]/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#C79A4B] tracking-widest mb-1">
                    CONNECT WITH RUSKIN CHEMIPHARM
                  </div>
                  <h3 className="text-xl font-extrabold text-[#12304A]">
                    Schedule a Sourcing Consultation
                  </h3>
                  <p className="text-xs text-[#5A7A8E] mt-1">
                    Our commercial and regulatory sourcing team responds within 4 business hours.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you. Your consultation request has been dispatched to our commercial desk.");
                    setQuoteModalOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Dr. Sarah Jenkins"
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Corporate Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="s.jenkins@pharmalabs.com"
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Target Active Ingredient / Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Specify API molecule, grade (USP/EP/IP), and estimated commercial volume..."
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#12304A] hover:bg-[#0B1E2E] text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Transmit Sourcing Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
