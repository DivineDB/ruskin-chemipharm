"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";
import GlobalEvents from "./components/GlobalEvents";
import Navbar from "./components/Navbar";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Globe,
  FileCheck,
  Truck,
  FlaskConical,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PhoneCall,
  X,
  CheckCircle2,
  SlidersHorizontal,
  Building2,
  Atom,
  Dna,
  TestTube2,
  Boxes,
  MapPin,
  Calendar,
  Check,
  FileSpreadsheet,
  BrainCircuit,
  HeartPulse,
  Pill,
  Syringe,
  Activity,
  Layers,
} from "lucide-react";

// Mock Product Catalog Data
interface Product {
  id: string;
  name: string;
  casNumber: string;
  category: string;
  grade: string;
  dmfStatus: string;
  purity: string;
  description: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: "p1",
    name: "Amoxicillin Trihydrate",
    casNumber: "61336-70-7",
    category: "Active Pharma Ingredients",
    grade: "Ph. Eur. / USP",
    dmfStatus: "USDMF Available",
    purity: "99.2%",
    description: "Broad-spectrum beta-lactam antibiotic active against Gram-positive & Gram-negative bacteria.",
  },
  {
    id: "p2",
    name: "Atorvastatin Calcium",
    casNumber: "134523-03-8",
    category: "Cardiovascular & Metabolic",
    grade: "USP / IP",
    dmfStatus: "CEP Certified",
    purity: "99.6%",
    description: "HMG-CoA reductase inhibitor used for lowering lipid & cholesterol levels.",
  },
  {
    id: "p3",
    name: "Ciprofloxacin Hydrochloride",
    casNumber: "86393-32-0",
    category: "Anti-Infectives & Antibiotics",
    grade: "USP / BP",
    dmfStatus: "USDMF Available",
    purity: "99.5%",
    description: "Second-generation fluoroquinolone antibacterial compound for severe infectious formulations.",
  },
  {
    id: "p4",
    name: "Metformin Hydrochloride",
    casNumber: "1115-70-4",
    category: "Cardiovascular & Metabolic",
    grade: "Ph. Eur. / USP / IP",
    dmfStatus: "CEP Certified",
    purity: "99.8%",
    description: "First-line biguanide antihyperglycemic agent for Type-2 Diabetes oral formulations.",
  },
  {
    id: "p5",
    name: "Omeprazole Magnesium",
    casNumber: "95382-33-5",
    category: "Active Pharma Ingredients",
    grade: "USP / Ph. Eur.",
    dmfStatus: "USDMF Available",
    purity: "99.4%",
    description: "Proton pump inhibitor utilized for acid suppression and gastrointestinal therapeutic products.",
  },
  {
    id: "p6",
    name: "Paracetamol (Acetaminophen)",
    casNumber: "103-90-2",
    category: "Analgesics & Anti-Inflammatory",
    grade: "DC-Grade / Micronized",
    dmfStatus: "CEP Certified",
    purity: "99.9%",
    description: "Analgesic and antipyretic active ingredient manufactured under GMP thermal specs.",
  },
  {
    id: "p7",
    name: "Paclitaxel (Semi-Synthetic)",
    casNumber: "33069-62-4",
    category: "Oncology & Specialty APIs",
    grade: "USP High Purity",
    dmfStatus: "USDMF Available",
    purity: "99.7%",
    description: "High-potency antineoplastic chemotherapy agent for advanced targeted oncology research.",
  },
  {
    id: "p8",
    name: "Sodium Starch Glycolate",
    casNumber: "9063-38-1",
    category: "Excipients & Fine Chemicals",
    grade: "Superdisintegrant USP",
    dmfStatus: "Tech Pack Ready",
    purity: "99.0%",
    description: "High-performance disintegrant facilitating rapid solid dosage form disintegration.",
  },
];

const CATEGORY_RANGES = [
  {
    id: "c1",
    title: "Active Pharma Ingredients",
    count: "18 Products",
    active: true,
    icon: Pill,
  },
  {
    id: "c2",
    title: "Cardiovascular & Metabolic",
    count: "5 Products",
    active: false,
    icon: HeartPulse,
  },
  {
    id: "c3",
    title: "Anti-Infectives & Antibiotics",
    count: "7 Products",
    active: false,
    icon: Syringe,
  },
  {
    id: "c4",
    title: "Oncology & Specialty APIs",
    count: "12 Products",
    active: false,
    icon: FlaskConical,
  },
  {
    id: "c5",
    title: "Central Nervous System",
    count: "6 Products",
    active: false,
    icon: BrainCircuit,
  },
  {
    id: "c6",
    title: "Respiratory & Allergy",
    count: "23 Products",
    active: false,
    icon: Activity,
  },
  {
    id: "c7",
    title: "Analgesics & Anti-Inflammatory",
    count: "5 Products",
    active: false,
    icon: TestTube2,
  },
  {
    id: "c8",
    title: "Excipients & Fine Chemicals",
    count: "3 Products",
    active: false,
    icon: Layers,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("Active Pharma Ingredients");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Event carousel images — 2 Unsplash pharma conference photos per event
  const EVENT_SLIDES: Record<string, string[]> = {
    cphi: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    ],
    pharmapack: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80",
    ],
  };
  const [cphiSlide, setCphiSlide] = useState(0);
  const [pharmapackSlide, setPharmapackSlide] = useState(0);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCphiSlide((s) => (s + 1) % EVENT_SLIDES.cphi.length);
      setPharmapackSlide((s) => (s + 1) % EVENT_SLIDES.pharmapack.length);
    }, 3500);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenQuote = (productName?: string) => {
    setQuoteProduct(productName || null);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  const handleDownloadPdf = () => {
    alert("Downloading official Ruskin Chemipharm Technical Product Catalog (PDF)...");
  };

  const filteredCatalog = PRODUCTS_DATA.filter(
    (p) =>
      p.category === selectedCategoryFilter ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.casNumber.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#12304A] text-[#CBD5E1] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-[#12304A]">
      
      {/* ================= 1. HEADER / NAVBAR ================= */}
      <Navbar
        onOpenSearch={() => setCatalogModalOpen(true)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* ================= 2. HERO SECTION (Exact Match to Brand Primitives) ================= */}
      <section id="hero" className="bg-[#12304A] py-14 sm:py-20 lg:py-24 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Main Headline */}
              <div className="space-y-1 text-left">
                <h1
                  className="text-4xl sm:text-5xl lg:text-[48px] tracking-tight text-white leading-[1.2]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  Precision Chemistry<span className="text-[#C79A4B] font-bold">.</span>
                </h1>
                <h2
                  className="text-4xl sm:text-5xl lg:text-[48px] tracking-tight text-white leading-[1.2]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, fontStyle: "italic" }}
                >
                  Global Standards<span className="text-[#C79A4B] font-bold">.</span>
                </h2>
              </div>

              {/* Teal Pill Badge - #147D82 Teal Accent */}
              <div>
                <span className="inline-block bg-[#147D82] text-white px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  WHO-GMP &amp; ISO 9001:2015 CERTIFIED MANUFACTURING
                </span>
              </div>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-xl font-normal">
                Engineered for high-yield synthesis, stringent purity profiles, and seamless regulatory compliance. Partnering with top-tier global formulations leaders from source to shipment.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3.5 rounded-full text-base font-semibold btn-text flex items-center space-x-2 transition-all shadow-md group"
                >
                  <span>Explore Products</span>
                  <span className="text-lg font-normal group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </button>

                <button
                  onClick={() => handleOpenQuote("General Inquiry")}
                  className="bg-transparent border border-white/40 hover:bg-white/10 hover:border-white/60 text-white px-8 py-3.5 rounded-full text-base font-semibold btn-text transition-all"
                >
                  Get in Touch
                </button>
              </div>

              {/* Underlined Footnote Link with Quick Action Modal */}
              <div className="pt-1 text-xs text-slate-300 font-medium">
                <button
                  onClick={() => handleDownloadPdf()}
                  className="underline underline-offset-4 hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                >
                  <span className="text-[#C79A4B] font-bold">✓</span> Instant COA &amp; TDS Technical Downloads Available
                  <Download className="w-3.5 h-3.5 text-[#C79A4B] opacity-80 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
                </button>
              </div>

            </div>

            {/* Right Column Uploaded Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#0F2338] h-[420px] sm:h-[540px] group">
                <img
                  src="/images/hero-image.jpg"
                  alt="Ruskin Chemipharm Precision Laboratory Pipette"
                  className="w-full h-full object-cover rounded-[28px] sm:rounded-[36px] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Bottom Overlay Pills matching screenshot */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex items-center justify-between text-white backdrop-blur-[1px]">
                  {/* Left Pill: 4+ Brands Approved */}
                  <div className="bg-[#161719]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2.5 shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-[#147D82]/30 border border-[#147D82] flex items-center justify-center text-[#147D82]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                      4+ Brands Approved
                    </span>
                  </div>

                  {/* Right Pill: 100% Quality Assurance (exact match to screenshot) */}
                  <div className="bg-[#161719]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2.5 shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-[#147D82]/30 border border-[#147D82] flex items-center justify-center text-[#147D82]">
                      <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                      100% Quality Assurance
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. END-TO-END PHARMA SOURCING SECTION ================= */}
      <section id="services" className="py-20 bg-[#12304A] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Row & Carousel Nav */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3 text-left">
              <h2 className="heading-section">
                Everything you need for End-to-End <br className="hidden sm:inline" />
                Pharma Sourcing—<span className="font-normal">in one place.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300/80 font-normal leading-relaxed max-w-2xl">
                Ruskin Chemipharm unifies chemical synthesis, quality control, regulatory dossiers, and global distribution into one seamless partner experience.
              </p>
            </div>

            {/* Carousel Arrow Controls matching Figma Screenshot */}
            <div className="flex items-center space-x-4 shrink-0">
              <button
                onClick={() => {
                  const container = document.getElementById("cards-carousel-container");
                  if (container) container.scrollBy({ left: -340, behavior: "smooth" });
                }}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-md group active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  const container = document.getElementById("cards-carousel-container");
                  if (container) container.scrollBy({ left: 340, behavior: "smooth" });
                }}
                className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-md group active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 5 Cards Container - Horizontal Scroll / Grid Layout (GPU Hardware Accelerated) */}
          <div
            id="cards-carousel-container"
            className="flex gap-5 overflow-x-auto no-scrollbar pb-3 pt-2 snap-x snap-mandatory scroll-smooth transform-gpu overscroll-x-contain contain-layout font-sans"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Card 1: Regulatory Registration */}
            <div className="w-[280px] sm:w-[310px] shrink-0 h-[440px] rounded-[24px] overflow-hidden relative group cursor-pointer border border-white/10 snap-start">
              <img
                src="/images/registration.jpg"
                alt="Regulatory Registration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gold Top-Right Arrow Circle */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#C79A4B] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              {/* Bottom Dark Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1E2E]/95 via-[#0B1E2E]/65 to-transparent p-6 space-y-2 text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Regulatory Registration
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  Complete USDMF, CEP, and regional regulatory dossier support to streamline multi-market approvals.
                </p>
              </div>
            </div>

            {/* Card 2: Global Distribution */}
            <div className="w-[280px] sm:w-[310px] shrink-0 h-[440px] rounded-[24px] overflow-hidden relative group cursor-pointer border border-white/10 snap-start">
              <img
                src="/images/distribution.jpg"
                alt="Global Distribution"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gold Top-Right Arrow Circle */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#C79A4B] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              {/* Bottom Dark Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1E2E]/95 via-[#0B1E2E]/65 to-transparent p-6 space-y-2 text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Global Distribution
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  Secure, temperature-controlled, and fully batch-tracked logistics network ensuring timely raw material delivery.
                </p>
              </div>
            </div>

            {/* Card 3: International Export */}
            <div className="w-[280px] sm:w-[310px] shrink-0 h-[440px] rounded-[24px] overflow-hidden relative group cursor-pointer border border-white/10 snap-start">
              <img
                src="/images/export.jpg"
                alt="International Export"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gold Top-Right Arrow Circle */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#C79A4B] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              {/* Bottom Dark Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1E2E]/95 via-[#0B1E2E]/65 to-transparent p-6 space-y-2 text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  International Export
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  Cross-border trade execution with end-to-end custom clearances, safety documentation, and CoA verifications.
                </p>
              </div>
            </div>

            {/* Card 4: Strategic Sourcing */}
            <div className="w-[280px] sm:w-[310px] shrink-0 h-[440px] rounded-[24px] overflow-hidden relative group cursor-pointer border border-white/10 snap-start">
              <img
                src="/images/sourcing.jpg"
                alt="Strategic Sourcing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gold Top-Right Arrow Circle */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#C79A4B] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              {/* Bottom Dark Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1E2E]/95 via-[#0B1E2E]/65 to-transparent p-6 space-y-2 text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Strategic Sourcing
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  Direct procurement access to audited global manufacturers for high-purity APIs, intermediates, and fine chemicals.
                </p>
              </div>
            </div>

            {/* Card 5: Custom Synthesis & Special Sourcing (EMPTY IMAGE CONTAINER as requested) */}
            <div className="w-[280px] sm:w-[310px] shrink-0 h-[440px] rounded-[24px] overflow-hidden relative group cursor-pointer border border-white/15 bg-gradient-to-b from-[#0F263C] via-[#0D2033] to-[#0A1826] shadow-2xl snap-start flex flex-col justify-between p-6">
              {/* Top Row with Empty Placeholder Glow & Gold Top-Right Arrow Circle */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C79A4B]">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C79A4B] flex items-center justify-center text-white font-extrabold shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="space-y-2 text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-[#147D82]/20 border border-[#147D82]/40 text-[#147D82] text-[10px] font-bold uppercase tracking-wider mb-1">
                  Custom Synthesis
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Custom Synthesis &amp; R&amp;D
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                  Tailored chemical synthesis, impurity profiling, and specialized R&amp;D batch scaling for proprietary pharma projects.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. ABOUT US / BRIDGING GLOBAL COMPLIANCE SECTION ================= */}
      <section id="about" className="relative min-h-screen w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Full Section Background Image: building.jpg (covers full viewport width & height) */}
        <img
          src="/images/building.jpg"
          alt="Ruskin Chemipharm Building Backdrop"
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform scale-100"
          loading="eager"
        />

        {/* Minimal dark overlay to maximize building backdrop visibility while maintaining WCAG contrast */}
        <div className="absolute inset-0 bg-[#0A1826]/20 backdrop-blur-[1px]" />

        {/* Giant Ultra-Sheer Glassmorphic Inner Container (5% translucent background for maximum image visibility) */}
        <div className="relative z-10 max-w-7xl w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-[36px] sm:rounded-[48px] p-6 sm:p-12 lg:p-16 shadow-2xl overflow-hidden transform-gpu transition-all duration-300">
          
          {/* Subtle vignette gradient for left text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1826]/40 via-transparent to-transparent pointer-events-none" />

          {/* Content Inner Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column Text Block */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* About Us Section Pill Badge */}
              <span className="section-pill">About Us</span>

              {/* Main Heading (Plus Jakarta Sans Bold 36px / Line Height: 162% / Fill: #F4F6F7) */}
              <h2 className="heading-section max-w-xl">
                Bridging Global Compliance with Precision Chemical Synthesis.
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal max-w-lg">
                Partnering with global formulation leaders to deliver high-yield APIs and regulatory solutions.
              </p>

              {/* Checkmarked Bullet List */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#C79A4B] text-[#12304A] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>WHO–GMP &amp; ISO 9001:2015 Certified Plants</span>
                </div>

                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#C79A4B] text-[#12304A] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Complete USDMF &amp; CEP Regulatory Support</span>
                </div>

                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#C79A4B] text-[#12304A] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Stringent HPLC &amp; GC Batch Purity Verification</span>
                </div>

                <div className="flex items-center space-x-3 text-xs sm:text-sm text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#C79A4B] text-[#12304A] flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Fully Tracked Global Export Supply Chain</span>
                </div>
              </div>

              {/* Gold Pill CTA Button with White Text & Larger Arrow */}
              <div className="pt-2">
                <button
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3.5 rounded-full text-sm btn-text flex items-center space-x-2.5 transition-all shadow-md group transform-gpu active:scale-95"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </button>
              </div>

            </div>

            {/* Right Column 4 Stat Cards (2x2 Grid with sheer 5% opacity background) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              {/* Stat 1: 36+ */}
              <div className="bg-[#1C3247]/50 backdrop-blur-md rounded-[20px] p-6 border border-white/15 text-left space-y-1.5 shadow-xl hover:border-[#C79A4B]/40 transition-all transform-gpu hover:-translate-y-1">
                <div className="text-3xl sm:text-[36px] font-semibold text-white leading-[1.62]">
                  36+
                </div>
                <div className="text-[11px] sm:text-xs text-[#C79A4B] font-medium tracking-wide">
                  Years of Experience
                </div>
              </div>

              {/* Stat 2: 250+ */}
              <div className="bg-[#1C3247]/50 backdrop-blur-md rounded-[20px] p-6 border border-white/15 text-left space-y-1.5 shadow-xl hover:border-[#C79A4B]/40 transition-all transform-gpu hover:-translate-y-1">
                <div className="text-3xl sm:text-[36px] font-semibold text-white leading-[1.62]">
                  250+
                </div>
                <div className="text-[11px] sm:text-xs text-[#C79A4B] font-medium tracking-wide">
                  Global Pharma Partners
                </div>
              </div>

              {/* Stat 3: 50+ */}
              <div className="bg-[#1C3247]/50 backdrop-blur-md rounded-[20px] p-6 border border-white/15 text-left space-y-1.5 shadow-xl hover:border-[#C79A4B]/40 transition-all transform-gpu hover:-translate-y-1">
                <div className="text-3xl sm:text-[36px] font-semibold text-white leading-[1.62]">
                  50+
                </div>
                <div className="text-[11px] sm:text-xs text-[#C79A4B] font-medium tracking-wide">
                  API Registrations
                </div>
              </div>

              {/* Stat 4: 20+ */}
              <div className="bg-[#1C3247]/50 backdrop-blur-md rounded-[20px] p-6 border border-white/10 text-left space-y-1.5 shadow-xl hover:border-[#C79A4B]/40 transition-all transform-gpu hover:-translate-y-1">
                <div className="text-3xl sm:text-[36px] font-semibold text-white leading-[1.62]">
                  20+
                </div>
                <div className="text-[11px] sm:text-xs text-[#C79A4B] font-medium tracking-wide">
                  Staff Members
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= 5. OUR PRODUCT RANGE SECTION (Exact Match to Figma Screenshot) ================= */}
      <section id="product-range" className="py-20 bg-[#12304A] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Enclosing Dark Glass Card Container */}
          <div className="bg-[#112436]/90 border border-white/10 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 space-y-10 shadow-2xl">
            
            {/* Header Text Block */}
            <div className="text-left space-y-2">
              <h2 className="heading-section">
                Our Product Range
              </h2>
              <p className="text-xs sm:text-sm text-slate-300/80 font-normal">
                50+ High-Purity APIs, Intermediates, and Excipients Sourced for Global Compliance
              </p>
            </div>

            {/* 8 Category Cards (4x2 Grid Layout) matching uploaded screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CATEGORY_RANGES.map((item) => {
                const IconComp = item.icon;
                const isSelected = item.title === selectedCategoryFilter;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCategoryFilter(item.title);
                      setCatalogModalOpen(true);
                    }}
                    className={`rounded-[20px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 group min-h-[150px] relative border ${
                      isSelected || item.active
                        ? "bg-[#C79A4B] text-[#12304A] border-[#C79A4B] shadow-lg shadow-[#C79A4B]/20 transform-gpu hover:-translate-y-1"
                        : "bg-[#18344E]/60 text-white border-white/10 hover:border-[#C79A4B]/50 hover:bg-[#1E3E5B]/80 transform-gpu hover:-translate-y-1"
                    }`}
                  >
                    {/* Top Row: Title & Top-Right Arrow ↗ */}
                    <div className="flex justify-between items-start space-x-2">
                      <h3 className={`text-base font-bold leading-snug transition-colors ${
                        isSelected || item.active ? "text-[#12304A]" : "text-white group-hover:text-[#E5C378]"
                      }`}>
                        {item.title}
                      </h3>
                      <ArrowUpRight className={`w-5 h-5 shrink-0 stroke-[2.5] ${
                        isSelected || item.active ? "text-[#12304A]" : "text-slate-300 group-hover:text-[#C79A4B]"
                      }`} />
                    </div>

                    {/* Bottom Row: Item Count & Category Icon */}
                    <div className="flex items-end justify-between pt-6">
                      <span className={`text-xs font-semibold ${
                        isSelected || item.active ? "text-[#12304A]/90" : "text-slate-400"
                      }`}>
                        {item.count}
                      </span>
                      <IconComp className={`w-5 h-5 stroke-[1.8] ${
                        isSelected || item.active ? "text-[#12304A]" : "text-slate-300 group-hover:text-[#C79A4B]"
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Pill Buttons (Gold View All Products & Teal Download Catalog PDF) */}
            <div className="flex flex-wrap items-center justify-start gap-4 pt-4">
              <button
                onClick={() => setCatalogModalOpen(true)}
                className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-4 rounded-full text-sm btn-text flex items-center space-x-2.5 transition-all shadow-md group transform-gpu active:scale-95"
              >
                <span>View All Products</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleDownloadPdf}
                className="bg-[#147D82] hover:bg-[#10686C] text-white px-8 py-4 rounded-full text-sm btn-text flex items-center space-x-2.5 transition-all shadow-md group transform-gpu active:scale-95"
              >
                <span>Download Product Catalog (PDF)</span>
                <span className="text-base font-normal group-hover:translate-y-0.5 transition-transform">↓</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 6. WHY PHARMA LEADERS TRUST RUSKIN (BENTO IMAGE GRID) ================= */}
      <section className="py-20 bg-[#EAF2F4] text-[#12304A] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          {/* Header */}
          <div className="space-y-3">
            <span className="section-pill">Why Ruskin</span>
            <h2 className="heading-section !text-[#12304A]">
              Why pharma leaders trust <span className="text-[#147D82]">Ruskin</span>
            </h2>
            <p className="text-sm text-slate-500 font-normal">
              Bridging high-purity API manufacturing with global regulatory compliance.
            </p>
          </div>

          {/* Bento Image Grid — 12-col asymmetric (7:5 top, 3-equal bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Card 1: Quality & Compliance — col-span-7 (wider left) */}
            <div className="md:col-span-7 relative rounded-[20px] overflow-hidden h-[300px] group cursor-pointer">
              <img
                src="/images/quality.jpg"
                alt="Quality & Compliance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826]/90 via-[#0A1826]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Quality &amp; Compliance</h3>
                <p className="text-xs text-slate-200/90 font-normal">Uncompromising cGMP Standards &amp; Full Batch Traceability</p>
              </div>
            </div>

            {/* Card 2: Supply Reliability — col-span-5 (narrower right) */}
            <div className="md:col-span-5 relative rounded-[20px] overflow-hidden h-[300px] group cursor-pointer">
              <img
                src="/images/supply.jpg"
                alt="Supply Reliability"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826]/90 via-[#0A1826]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">Supply Reliability</h3>
                <p className="text-xs text-slate-200/90 font-normal">Temperature-controlled pharma logistics</p>
              </div>
            </div>

            {/* Card 3: Strategic Sourcing — col-span-4 */}
            <div className="md:col-span-4 relative rounded-[20px] overflow-hidden h-[250px] group cursor-pointer">
              <img
                src="/images/sourcing.jpg"
                alt="Strategic Sourcing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826]/90 via-[#0A1826]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Strategic Sourcing</h3>
                <p className="text-xs text-slate-200/90 font-normal">High-purity API warehouse</p>
              </div>
            </div>

            {/* Card 4: Regulatory Support — col-span-4 */}
            <div className="md:col-span-4 relative rounded-[20px] overflow-hidden h-[250px] group cursor-pointer">
              <img
                src="/images/regulatory.avif"
                alt="Regulatory Support"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826]/90 via-[#0A1826]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Regulatory Support</h3>
                <p className="text-xs text-slate-200/90 font-normal">US DMF, CEP</p>
              </div>
            </div>

            {/* Card 5: Strategic Partnerships — col-span-4 */}
            <div className="md:col-span-4 relative rounded-[20px] overflow-hidden h-[250px] group cursor-pointer">
              <img
                src="/images/strategic.jpg"
                alt="Strategic Partnerships"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1826]/90 via-[#0A1826]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Strategic Partnerships</h3>
                <p className="text-xs text-slate-200/90 font-normal">Transparent pricing</p>
              </div>
            </div>

          </div>

          {/* Footer link matching screenshot */}
          <div className="pt-2 text-sm font-semibold text-[#12304A] flex items-center gap-1.5 cursor-pointer group">
            <span>Driven by purpose. Learn about <span className="text-[#147D82] underline underline-offset-4 group-hover:text-[#0E6368] transition-colors">our core values</span></span>
            <ArrowRight className="w-4 h-4 text-[#147D82] group-hover:translate-x-1 transition-transform" />
          </div>

        </div>
      </section>

      {/* ================= 7. GLOBAL EVENTS / MEET OUR TEAM WORLDWIDE ================= */}
      <GlobalEvents onScheduleMeeting={handleOpenQuote} />



      {/* ================= 8. CTA BANNER (reusable component) ================= */}
      <CtaBanner
        onRequestQuote={() => handleOpenQuote("API Procurement Request")}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* ================= 9. FOOTER (reusable component) ================= */}
      <Footer onOpenCatalog={() => setCatalogModalOpen(true)} />

      {/* ================= 10. PRODUCT DIRECTORY CATALOG MODAL ================= */}
      <AnimatePresence>
        {catalogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="glass-panel border border-[#C79A4B]/40 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl bg-[#071322]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#C79A4B] uppercase tracking-wider">
                    TECHNICAL PRODUCT DIRECTORY
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Pharmaceutical Specifications &amp; CAS Catalog
                  </h3>
                </div>
                <button
                  onClick={() => setCatalogModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-6 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search compound name or CAS Number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] text-xs"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 bg-[#0A182A] border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                >
                  {CATEGORY_RANGES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Modal Body Directory Table */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCatalog.map((product) => (
                    <div
                      key={product.id}
                      className="glass-card rounded-2xl p-5 border border-white/10 hover:border-[#C79A4B]/40 transition-all flex flex-col justify-between text-left"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#C79A4B]/15 text-[#E5C378] border border-[#C79A4B]/30 uppercase">
                            {product.category}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400">
                            {product.dmfStatus}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white">{product.name}</h4>
                          <div className="text-xs text-slate-400 mt-1 font-mono">
                            CAS: <span className="text-white">{product.casNumber}</span> | Purity: <span className="text-emerald-400">{product.purity}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <span className="text-[10px] text-slate-400">Grade: {product.grade}</span>
                        <button
                          onClick={() => {
                            setCatalogModalOpen(false);
                            handleOpenQuote(product.name);
                          }}
                          className="gold-btn px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1"
                        >
                          <span>Request Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 11. REQUEST QUOTE MODAL ================= */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="glass-panel border border-[#C79A4B]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl bg-[#071322]"
            >
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {!formSubmitted ? (
                <div className="space-y-6 text-left">
                  <div>
                    <div className="text-xs uppercase font-bold text-[#C79A4B] tracking-wider mb-1">
                      REQUEST QUOTE &amp; TECHNICAL DOSSIER
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {quoteProduct ? `Quote for ${quoteProduct}` : "Chemical Sourcing Inquiry"}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Fill out your requirement below to receive a certified COA sample &amp; pricing dossier.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name &amp; Designation
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Dr. Sarah Jenkins (Head of Procurement)"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Corporate Email
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="s.jenkins@pharma.com"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estimated Quantity
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 500 Kg / 5 MT"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Required Product / CAS / Regulatory Requirements
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={quoteProduct ? `Inquiry for ${quoteProduct}. Please send specifications and USDMF status.` : ""}
                        placeholder="Specify target CAS Number, purity threshold, or required DMF dossier type..."
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gold-btn py-3.5 rounded-xl text-sm font-bold flex items-center justify-center space-x-2"
                    >
                      <span>Submit Inquiry to Ruskin Team</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Submitted Successfully</h3>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Thank you. A Ruskin Chemipharm technical representative will respond within 2 business hours with full COA specifications.
                  </p>
                  <button
                    onClick={() => setQuoteModalOpen(false)}
                    className="gold-btn px-6 py-2 rounded-full text-xs font-bold mt-4"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
