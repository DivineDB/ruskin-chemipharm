"use client";

import React, { useState, useMemo, useDeferredValue, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import {
  Search,
  X,
  Check,
  Copy,
  ArrowRight,
  Pill,
  HeartPulse,
  Sparkles,
  FlaskConical,
  Bug,
  Wheat,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CtaBanner from "../components/CtaBanner";
import {
  FINISHED_PRODUCTS,
  FORMULATION_CATEGORIES,
  FinishedProduct,
  FormulationDivisionId,
} from "@/data/finished-formulations";

const DIVISION_ICONS: Record<FormulationDivisionId, React.ElementType> = {
  "human-pharma": Pill,
  "human-nutra": Sparkles,
  "vet-pharma": HeartPulse,
  "vet-supplements": Wheat,
  ectoparasiticides: Bug,
};

const DOSAGE_FORM_FILTERS = [
  "All",
  "Tablet",
  "Capsule",
  "Injection",
  "Oral Liquid",
  "Bolus",
  "Powder",
  "Pour-on",
  "Softgel",
  "Spray",
];

// ─── Stat CountUp (Direct DOM animation via GSAP + InView) ─────────
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

const STATS_DATA = [
  {
    label: "Products",
    val: 35,
    suffix: "+",
    desc: "Formulations Ready for Sourcing",
  },
  {
    label: "Divisions",
    val: 5,
    suffix: "",
    desc: "Human & Veterinary Segments",
  },
  {
    label: "Export Footprint",
    val: 40,
    suffix: "+",
    desc: "Global Trade Corridors",
  },
  {
    label: "Quality Standards",
    textVal: "GMP",
    desc: "BP, USP, IP & EP Formulations",
  },
];

export default function FinishedFormulationsPage() {
  const [selectedSegment, setSelectedSegment] = useState<"All" | "Human Healthcare" | "Animal Healthcare">("All");
  const [selectedDivision, setSelectedDivision] = useState<FormulationDivisionId | "all">("all");
  const [selectedDosageForm, setSelectedDosageForm] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredSearch = useDeferredValue(searchQuery);

  // Copy feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenQuote = (product?: FinishedProduct) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ruskin:open-quote", {
          detail: {
            product: product ? `${product.name} (${product.category})` : "Finished Formulations",
            note: product
              ? `Inquiry for ${product.name} (${product.composition}). Form: ${product.form}. Standard: ${product.standard}.`
              : "Finished Formulations commercial inquiry.",
          },
        })
      );
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return FINISHED_PRODUCTS.filter((product) => {
      // 1. Segment filter
      if (selectedSegment === "Human Healthcare") {
        if (product.division !== "human-pharma" && product.division !== "human-nutra") return false;
      } else if (selectedSegment === "Animal Healthcare") {
        if (
          product.division !== "vet-pharma" &&
          product.division !== "vet-supplements" &&
          product.division !== "ectoparasiticides"
        )
          return false;
      }

      // 2. Category / Division filter
      if (selectedDivision !== "all" && product.division !== selectedDivision) {
        return false;
      }

      // 3. Dosage Form filter
      if (selectedDosageForm !== "All") {
        if (!product.form.toLowerCase().includes(selectedDosageForm.toLowerCase())) {
          return false;
        }
      }

      // 4. Search query
      if (deferredSearch.trim()) {
        const query = deferredSearch.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesComp = product.composition.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesForm = product.form.toLowerCase().includes(query);
        const matchesSpecies = product.targetSpecies?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesComp && !matchesCat && !matchesDesc && !matchesForm && !matchesSpecies) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSegment, selectedDivision, selectedDosageForm, deferredSearch]);

  const clearFilters = () => {
    setSelectedSegment("All");
    setSelectedDivision("all");
    setSelectedDosageForm("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
      <main className="flex-grow py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-14">

          {/* ─── 1. SECTION HEADER (MANDATORY 4-PART RULE WITH INTRO ANIMATION) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pb-2 border-b border-[#12304A]/8"
          >
            <SectionHeader
              as="h1"
              eyebrow="Commercial Formulation Portfolio"
              lead="Finished Formulations &"
              highlight="Therapeutic Divisions"
              description="Consolidated WHO-GMP finished formulations portfolio across Human Pharmaceuticals, Supplements, Veterinary Therapeutics, Animal Feed Supplements, and Ectoparasiticides for global healthcare corridors."
            />
          </motion.div>

          {/* ─── 2. VALUE PROPOSITION STRIP (ANIMATED STATS) ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-5 border border-[#12304A]/8 shadow-xs hover:shadow-md hover:border-[#C79A4B]/30 transition-all flex flex-col justify-between group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C79A4B]">
                  {stat.label}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#12304A] mt-2 group-hover:text-[#C79A4B] transition-colors">
                  {stat.val !== undefined ? (
                    <StatCountUp end={stat.val} suffix={stat.suffix} />
                  ) : (
                    stat.textVal
                  )}
                </div>
                <p className="text-xs text-[#5A7A8E] mt-1">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ─── 3. INTERACTIVE FILTERING & DISCOVERY CONTROLS ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#12304A]/10 p-5 sm:p-7 shadow-[0_12px_45px_rgb(18,48,74,0.05)] space-y-6"
          >

            {/* Row 1: Segment Switcher & Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Segment Toggle */}
              <div className="inline-flex p-1 rounded-2xl bg-[#FAF7F2] border border-[#12304A]/8 w-full sm:w-auto">
                {(["All", "Human Healthcare", "Animal Healthcare"] as const).map((seg) => {
                  const isActive = selectedSegment === seg;
                  return (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => {
                        setSelectedSegment(seg);
                        if (seg === "Human Healthcare" && (selectedDivision === "vet-pharma" || selectedDivision === "vet-supplements" || selectedDivision === "ectoparasiticides")) {
                          setSelectedDivision("all");
                        }
                        if (seg === "Animal Healthcare" && (selectedDivision === "human-pharma" || selectedDivision === "human-nutra")) {
                          setSelectedDivision("all");
                        }
                      }}
                      className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#12304A] text-white shadow-sm"
                          : "text-[#5A7A8E] hover:text-[#12304A]"
                      }`}
                    >
                      {seg === "All" ? "All Portfolios" : seg}
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <Search className="w-4 h-4 text-[#C79A4B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product, active composition, indication, or form..."
                  className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#12304A] p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Category Division Tabs (The 5 Target Divisions) */}
            <div className="space-y-3 pt-1 border-t border-[#12304A]/8">
              <div className="text-xs font-bold text-[#12304A]">
                <span className="text-[11px] uppercase tracking-wider text-[#C79A4B]">5 Target Categories</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDivision("all")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDivision === "all"
                      ? "bg-[#C79A4B] text-white shadow-sm"
                      : "bg-[#FAF7F2] text-[#5A7A8E] hover:text-[#12304A] border border-[#12304A]/8 hover:border-[#C79A4B]/40"
                  }`}
                >
                  All Categories ({FINISHED_PRODUCTS.length})
                </button>

                {FORMULATION_CATEGORIES.map((cat) => {
                  const Icon = DIVISION_ICONS[cat.id];
                  const isActive = selectedDivision === cat.id;
                  const count = FINISHED_PRODUCTS.filter((p) => p.division === cat.id).length;

                  // Dim or hide if segment doesn't match
                  const isVisible =
                    selectedSegment === "All" ||
                    (selectedSegment === "Human Healthcare" && cat.segment === "Human Healthcare") ||
                    (selectedSegment === "Animal Healthcare" && cat.segment === "Animal Healthcare");

                  if (!isVisible) return null;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedDivision(cat.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#12304A] text-white shadow-sm"
                          : "bg-[#FAF7F2] text-[#5A7A8E] hover:text-[#12304A] border border-[#12304A]/8 hover:border-[#C79A4B]/40"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C79A4B]" : "text-[#5A7A8E]"}`} />
                      <span>{cat.title}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-white/20 text-white" : "bg-white text-[#12304A] border border-[#12304A]/10"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Dosage Form Chips & Showing Products Counter */}
            <div className="flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4 pt-2.5 border-t border-[#12304A]/6 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#5A7A8E] uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-[#C79A4B]" />
                  <span>Format:</span>
                </span>
                {DOSAGE_FORM_FILTERS.map((form) => {
                  const isActive = selectedDosageForm === form;
                  return (
                    <button
                      key={form}
                      type="button"
                      onClick={() => setSelectedDosageForm(form)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap text-[11px] ${
                        isActive
                          ? "bg-[#12304A]/10 text-[#12304A] border border-[#12304A]/20 font-bold"
                          : "text-[#5A7A8E] hover:text-[#12304A] hover:bg-[#FAF7F2]"
                      }`}
                    >
                      {form}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-auto">
                <span className="text-xs font-bold text-[#12304A] whitespace-nowrap">
                  Showing {filteredProducts.length} of {FINISHED_PRODUCTS.length} products
                </span>
                {(selectedDivision !== "all" || selectedDosageForm !== "All" || searchQuery || selectedSegment !== "All") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-[#C79A4B] font-bold hover:underline cursor-pointer shrink-0"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* ─── 4. PRODUCT GRID SYSTEM (SMOOTH ANIMATED TRANSITIONS) ─── */}
          {filteredProducts.length > 0 ? (
            <motion.div
              layout="position"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const Icon = DIVISION_ICONS[product.division];
                  const isVet =
                    product.division === "vet-pharma" ||
                    product.division === "vet-supplements" ||
                    product.division === "ectoparasiticides";

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="bg-white rounded-[24px] border border-[#12304A]/10 p-6 sm:p-7 shadow-[0_8px_30px_rgb(18,48,74,0.04)] hover:shadow-[0_16px_40px_rgb(18,48,74,0.08)] transition-[border-color,box-shadow] flex flex-col justify-between group hover:border-[#C79A4B]/40 will-change-transform"
                    >
                      <div className="space-y-4">
                        {/* Card Header: Category & Form Pills (Responsive Wrap & No-Break Badges) */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#12304A] bg-[#FAF7F2] border border-[#12304A]/8 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                            <Icon className="w-3.5 h-3.5 text-[#C79A4B] shrink-0" />
                            <span>
                              {product.division === "human-pharma" && "Human Pharma"}
                              {product.division === "human-nutra" && "Supplement"}
                              {product.division === "vet-pharma" && "Veterinary"}
                              {product.division === "vet-supplements" && "Feed Supp."}
                              {product.division === "ectoparasiticides" && "Ectoparasiticide"}
                            </span>
                          </span>

                          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                            {product.standard && (
                              <span className="text-[10px] font-extrabold text-[#C79A4B] bg-[#C79A4B]/10 border border-[#C79A4B]/20 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                                {product.standard}
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-[#5A7A8E] bg-slate-100 border border-slate-200/60 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                              {product.form}
                            </span>
                          </div>
                        </div>

                        {/* Title & Therapeutic Category */}
                        <div>
                          <h3 className="text-xl font-extrabold text-[#12304A] tracking-tight group-hover:text-[#C79A4B] transition-colors break-words">
                            {product.name}
                          </h3>
                          <p className="text-xs font-semibold text-[#C79A4B] mt-0.5">
                            {product.category}
                          </p>
                        </div>

                        {/* Composition Container */}
                        <div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-xl p-3 relative space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A7A8E]">
                              Active Formula / Composition
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(product.composition, product.id)}
                              className="text-[#5A7A8E] hover:text-[#12304A] p-0.5 rounded transition-colors"
                              title="Copy Composition"
                            >
                              {copiedId === product.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <p className="text-xs font-medium text-[#12304A] leading-relaxed break-words">
                            {product.composition}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#5A7A8E] leading-relaxed line-clamp-3">
                          {product.description}
                        </p>

                        {/* Meta: Pack Size & Species (Responsive multi-line wrapping without awkward ellipsis truncation) */}
                        <div className="space-y-2 pt-2.5 border-t border-[#12304A]/6 text-xs">
                          <div className="flex items-start gap-2 text-slate-500">
                            <Package className="w-3.5 h-3.5 text-[#C79A4B] shrink-0 mt-0.5" />
                            <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
                              <span className="text-[#12304A] font-bold shrink-0">Packaging:</span>
                              <span className="text-[#5A7A8E] leading-relaxed break-words">{product.packSize}</span>
                            </div>
                          </div>
                          {isVet && product.targetSpecies && (
                            <div className="flex items-start gap-2 text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B] shrink-0 ml-1 mt-1.5" />
                              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
                                <span className="text-[#12304A] font-bold shrink-0">Target Species:</span>
                                <span className="text-[#5A7A8E] leading-relaxed break-words">{product.targetSpecies}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-5 mt-5 border-t border-[#12304A]/8 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenQuote(product)}
                          className="flex-1 bg-[#12304A] hover:bg-[#0B1E2E] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer group/btn"
                        >
                          <span>Request Quote &amp; Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-[24px] border border-[#12304A]/10 p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 flex items-center justify-center mx-auto text-[#C79A4B]">
                <FlaskConical className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#12304A]">No Formulations Match Your Filter</h3>
              <p className="text-xs text-[#5A7A8E] leading-relaxed">
                We manufacture and source custom formulations beyond our listed portfolio. Try resetting your search or submit your formulation requirement directly to our Mumbai commercial desk.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#12304A] text-white text-xs font-bold hover:bg-[#0B1E2E] transition-colors cursor-pointer"
              >
                Reset Filter Settings
              </button>
            </div>
          )}

          {/* ─── 5. THERAPEUTIC CAPABILITIES SPOTLIGHT (BENTO GRID) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 pt-4"
          >
            <SectionHeader
              eyebrow="Formulation Divisions"
              lead="Specialized Infrastructure Across"
              highlight="Human & Animal Health"
              description="Dedicated manufacturing and supply corridors engineered to comply with target regulatory markets across Africa, Middle East, Southeast Asia, CIS, and Latin America."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Human Healthcare Bento Box */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[28px] border border-[#12304A]/10 p-7 sm:p-9 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C79A4B] bg-[#FAF7F2] border border-[#12304A]/8 px-3 py-1 rounded-full uppercase tracking-wider">
                    <Pill className="w-3.5 h-3.5" />
                    <span>Human Healthcare Portfolio</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#12304A] tracking-tight">
                    Human Pharmaceuticals &amp; Nutra Supplements
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed">
                    Our human formulations include essential antibiotics (Amoxicillin, Azithromycin, Ciprofloxacin), daily analgesics (Paracetamol, Diclofenac), proton-pump inhibitors (Omeprazole, Pantoprazole), cardiovascular statins, and advanced antidiabetics. Complementing these are bioavailable multivitamins, marine omega-3 softgels, CoQ10, and collagen joint matrices.
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#12304A]/6">
                      <span className="font-bold text-[#12304A] block">WHO-GMP Assured</span>
                      <span className="text-[11px] text-[#5A7A8E]">Solid oral dosage forms</span>
                    </div>
                    <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#12304A]/6">
                      <span className="font-bold text-[#12304A] block">ACTD / CTD Ready</span>
                      <span className="text-[11px] text-[#5A7A8E]">Complete dossier support</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#12304A]/8 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#12304A]">17 Human Formulations Listed</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSegment("Human Healthcare");
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className="font-bold text-[#C79A4B] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View Human Range</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>

              {/* Animal Healthcare Bento Box */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#0B1E2E] text-white rounded-[28px] border border-white/10 p-7 sm:p-9 shadow-xl space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C79A4B] bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Animal Healthcare Portfolio</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Veterinary Pharma, Feed Supplements &amp; Ectoparasiticides
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Designed to maximize herd vitality, control parasitic infestations, and drastically boost dairy and poultry productivity. Features high-potency endectocides (Ivermectin 1%), sustained long-acting oxytetracyclines, ceftiofur sodium, chelated mineral pre-mixes, high-yield liquid calcium, and acaricides (Amitraz, Cypermethrin, Deltamethrin pour-ons).
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-slate-300">
                      <span className="font-bold text-white block">Livestock &amp; Dairy</span>
                      <span className="text-[11px] text-slate-400">High bioavailability</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-slate-300">
                      <span className="font-bold text-white block">Acaricide Specialist</span>
                      <span className="text-[11px] text-slate-400">Pour-ons, ECs &amp; sprays</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">18 Veterinary Formulations Listed</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSegment("Animal Healthcare");
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className="font-bold text-[#C79A4B] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View Veterinary Range</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* ─── GLOBAL CTA BANNER ─── */}
      <CtaBanner
        onRequestQuote={() => handleOpenQuote()}
        title={
          <>
            Ready to Secure High-Purity<br className="hidden sm:inline" /> Finished Formulations?
          </>
        }
        subtitle="Request custom pricing, CTD / ACTD regulatory dossiers, or schedule a technical consultation with our formulations team."
        buttonText="Request Formulation Quote"
      />

      <Footer onOpenCatalog={() => handleOpenQuote()} />
    </div>
  );
}

