"use client";

import React, { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";
import CustomSelect from "../components/CustomSelect";
import Navbar from "../components/Navbar";
import { MolecularDecoration } from "../components/Hex";
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, ApiProduct } from "@/lib/products";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  FlaskConical,
  Copy,
  Check,
} from "lucide-react";

const INQUIRY_OPTIONS = [
  { value: "Product Enquiry", label: "Product Enquiry" },
  { value: "Custom Synthesis", label: "Custom Synthesis" },
  { value: "Regulatory Dossier", label: "Regulatory Dossier (USDMF / CEP)" },
  { value: "Sample Request", label: "Sample Request & COA" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (searchParams.get("focusSearch") === "true" || searchParams.get("search") === "focus") {
      searchInputRef.current?.focus();
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    return [
      { name: "All", count: ALL_PRODUCTS.length },
      ...PRODUCT_CATEGORIES,
    ];
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryType, setInquiryType] = useState("Product Enquiry");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      if (selectedLetter && !product.name.toUpperCase().startsWith(selectedLetter)) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          product.casNumber.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedLetter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    ALL_PRODUCTS.forEach((p) => set.add(p.name.charAt(0).toUpperCase()));
    return set;
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };
  const handleLetterChange = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
    setCurrentPage(1);
  };
  const handleOpenQuote = (productName?: string) => {
    setQuoteProduct(productName || null);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  const [copiedCas, setCopiedCas] = useState<string | null>(null);

  const handleCopyCas = (e: React.MouseEvent, cas: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(cas);
    setCopiedCas(cas);
    setTimeout(() => setCopiedCas(null), 2000);
  };

  // Body scroll lock & Escape key handling for open modals
  useEffect(() => {
    const isModalOpen = quoteModalOpen || selectedProduct !== null;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuoteModalOpen(false);
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quoteModalOpen, selectedProduct]);

  return (
    <div className="min-h-screen bg-white text-[#3E5C72] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />

      {/* ══════════════════════════════════════════════════════
      {/* ══════════════════════════════════════════════════════
          HERO HEADER — Deep Navy with Hexagons & Molecular Deco
          ══════════════════════════════════════════════════════ */}
      <div className="relative bg-[#12304A] overflow-hidden">
        {/* Hexagon and molecular decorative elements in banner */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full bg-[#C79A4B]/10 blur-[110px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#0B1E2E] blur-[100px]" />
          {/* Hexagonal molecular decorations with subtle floating micro-animation */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -bottom-12 w-[280px] opacity-20 hidden md:block"
          >
            <MolecularDecoration color="#C79A4B" opacity={0.8} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-6 w-[180px] opacity-15 hidden lg:block"
          >
            <MolecularDecoration color="#FFFFFF" opacity={0.6} />
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5 text-left">
              <motion.span
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="section-pill-light"
              >
                Product Directory
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontWeight: 800 }}
                className="text-4xl sm:text-5xl lg:text-[56px] text-white leading-tight tracking-tight"
              >
                DCGI-Approved &amp;<br /><span className="text-[#C79A4B]">Registered API Directory</span>
              </motion.h1>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "4rem", opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="h-[3px] rounded-full bg-[#C79A4B]"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                className="text-base text-slate-300/85 leading-relaxed font-normal max-w-xl"
              >
                Explore our catalog of 46+ high-purity APIs sourced directly from global manufacturing partners with full WHO-GMP compliance, COA verification, and regulatory support.
              </motion.p>
            </div>

            {/* Stats row with spring physics micro-interactions */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "46+", label: "API Products" },
                { val: "WHO-GMP", label: "Certified" },
                { val: "30+", label: "Countries" },
              ].map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 22, stiffness: 280, delay: 0.15 + idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(199,154,75,0.4)" }}
                  className="bg-white/5 border border-white/10 backdrop-blur rounded-2xl p-5 text-center transition-[border-color,background-color] duration-200 cursor-default gpu-smooth"
                >
                  <div className="stat-num text-xl sm:text-2xl text-[#C79A4B] font-extrabold">{s.val}</div>
                  <div className="text-[11px] text-slate-300 font-semibold tracking-wide mt-1 uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">

        {/* Search + Filters with staggered entrance */}
        <div className="space-y-5">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-full"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A93A8]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by API Name, CAS No., or Manufacturer..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border-2 border-[#12304A]/10 focus:border-[#C79A4B] rounded-full py-4 pl-14 pr-24 text-[#12304A] text-sm placeholder-[#B0C4D4] focus:outline-none transition-all shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#7A93A8] hover:text-[#12304A] hover:bg-[#12304A]/5 transition-colors"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
              style={{ clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)", background: "#C79A4B" }}>
              <Search className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
          </motion.div>

          {/* Category pills — staggered floating tags */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2.5"
          >
            {categories.map((cat, catIdx) => {
              const isActive = selectedCategory === cat.name;
              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.36 + catIdx * 0.02 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-[#12304A] text-white border-[#12304A] shadow-md"
                      : "bg-white text-[#5A7A8E] border-[#12304A]/10 hover:border-[#C79A4B]/50 hover:text-[#12304A]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`stat-num text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-[#C79A4B] text-white" : "bg-[#12304A]/6 text-[#7A93A8]"
                  }`}>{cat.count}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* A-Z Filter — fills the entire pill from left to right */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-[#12304A]/10 rounded-full px-5 py-2.5 flex items-center shadow-[0_4px_20px_-6px_rgba(18,48,74,0.12)] w-full overflow-x-auto"
          >
            <span className="text-[11px] font-bold text-[#12304A] uppercase tracking-widest pr-3 shrink-0">A–Z</span>
            <div className="w-px h-6 bg-[#12304A]/10 mr-3 shrink-0" />
            <div className="flex items-center justify-between flex-1 min-w-[620px] gap-0.5 sm:gap-1">
              {ALPHABET.map((letter) => {
                const isAvailable = availableLetters.has(letter);
                const isSelected = selectedLetter === letter;
                return (
                  <motion.button
                    key={letter}
                    whileHover={isAvailable ? { scale: 1.15 } : undefined}
                    whileTap={isAvailable ? { scale: 0.9 } : undefined}
                    onClick={() => isAvailable && handleLetterChange(letter)}
                    disabled={!isAvailable}
                    className={`flex-1 aspect-square max-w-[34px] rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-[#12304A] text-white shadow-md font-bold"
                        : isAvailable
                        ? "text-[#3E5C72] hover:text-[#12304A] hover:bg-[#12304A]/8"
                        : "text-[#D0DAE2] cursor-not-allowed"
                    }`}
                  >
                    {letter}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Active Filter Chips & Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.46 }}
            className="space-y-2 pt-1"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7A93A8] font-medium">
                Showing <span className="text-[#12304A] font-bold">{filteredProducts.length}</span> products
                {selectedCategory !== "All" && <span> in <span className="text-[#C79A4B] font-bold">{selectedCategory}</span></span>}
                {selectedLetter && <span> starting with <span className="text-[#C79A4B] font-bold">"{selectedLetter}"</span></span>}
              </p>
              {(selectedCategory !== "All" || selectedLetter || searchQuery) && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setSelectedCategory("All"); setSelectedLetter(null); setSearchQuery(""); }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12304A]/6 hover:bg-[#12304A]/10 text-[#12304A] text-xs font-bold transition-all"
                >
                  <X className="w-3.5 h-3.5 text-[#C79A4B]" />
                  <span>Reset All</span>
                </motion.button>
              )}
            </div>

            {/* Removable Active Chips */}
            {(selectedCategory !== "All" || selectedLetter || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-[#7A93A8]">Filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[#12304A] text-xs font-semibold shadow-xs">
                    Category: <span className="text-[#C79A4B] font-bold">{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory("All")} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedLetter && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[#12304A] text-xs font-semibold shadow-xs">
                    Letter: <span className="text-[#C79A4B] font-bold">"{selectedLetter}"</span>
                    <button onClick={() => setSelectedLetter(null)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[#12304A] text-xs font-semibold shadow-xs">
                    Query: <span className="text-[#C79A4B] font-bold">"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery("")} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* ══ PRODUCT CARDS — Staggered & Butter-Smooth ══ */}
        {paginatedProducts.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedLetter || "all"}-${currentPage}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="relative bg-[#12304A] border border-white/8 hover:border-[#C79A4B]/50 rounded-[22px] overflow-hidden shadow-[0_8px_25px_-10px_rgba(18,48,74,0.4)] hover:shadow-[0_18px_38px_-10px_rgba(18,48,74,0.65)] transition-[border-color,box-shadow] duration-300 group cursor-pointer flex flex-col gpu-smooth"
                >
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#C79A4B]/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Link href={`/products/${product.slug}`} className="relative flex flex-col flex-1 p-5">
                    {/* Category pill & Desktop Quick Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#E5C378] bg-[#C79A4B]/15 border border-[#C79A4B]/25 px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenQuote(product.name);
                          }}
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-bold text-white bg-[#C79A4B] hover:bg-[#B88B3C] px-2.5 py-1 rounded-full shadow-sm cursor-pointer"
                          title="Instant Quote Request"
                        >
                          Quote
                        </button>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#C79A4B] transition-all duration-300 group-hover:scale-110">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C79A4B] group-hover:text-white stroke-[2.5] transition-colors" />
                        </div>
                      </div>
                    </div>

                    {/* Product name */}
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight group-hover:text-[#E5C378] transition-colors flex-1">
                      {product.name}
                    </h3>

                    {/* CAS + purity + 1-Click Copy */}
                    <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 font-mono">CAS: <span className="text-slate-100 font-semibold">{product.casNumber}</span></span>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={(e) => handleCopyCas(e, product.casNumber)}
                          className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-[#C79A4B] transition-colors px-1.5 py-0.5 rounded hover:bg-white/5 cursor-pointer"
                          title="Copy CAS to clipboard"
                        >
                          {copiedCas === product.casNumber ? (
                            <motion.span
                              initial={{ scale: 0.7 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />
                              <span className="text-emerald-400 font-medium text-[9px]">Copied</span>
                            </motion.span>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span className="text-[9px]">Copy</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-slate-400">Purity: <span className="stat-num text-emerald-400 font-bold">{product.purity}</span></span>
                        <span className="text-[10px] font-semibold text-slate-300/80">{product.dmfStatus}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-white border border-[#12304A]/8 rounded-2xl p-12 text-center space-y-3 shadow-md">
            <div className="w-16 h-16 mx-auto flex items-center justify-center"
              style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)", background: "#12304A" }}>
              <FlaskConical className="w-7 h-7 text-white" />
            </div>
            <p className="text-lg font-bold text-[#12304A]">No products found</p>
            <p className="text-xs text-[#7A93A8]">Try searching for a different CAS number or clear filters.</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedLetter(null); }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C79A4B] text-white text-xs font-bold hover:bg-[#B58A3E] transition-colors mt-2">
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination with smooth spring interactions */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={currentPage !== 1 ? { scale: 1.08 } : undefined}
              whileTap={currentPage !== 1 ? { scale: 0.92 } : undefined}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-11 h-11 flex items-center justify-center rounded-full font-extrabold transition-all shadow-md ${
                currentPage === 1 ? "bg-[#12304A]/15 text-[#12304A]/30 cursor-not-allowed" : "bg-[#12304A] text-white hover:bg-[#0E263B]"
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </motion.button>

            <div className="bg-white border border-[#12304A]/10 rounded-full px-8 py-2 text-sm font-bold text-[#12304A] shadow-sm">
              {currentPage} / {totalPages}
            </div>

            <motion.button
              whileHover={currentPage !== totalPages ? { scale: 1.08 } : undefined}
              whileTap={currentPage !== totalPages ? { scale: 0.92 } : undefined}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-11 h-11 flex items-center justify-center rounded-full font-extrabold transition-all shadow-md ${
                currentPage === totalPages ? "bg-[#12304A]/15 text-[#12304A]/30 cursor-not-allowed" : "bg-[#C79A4B] text-white hover:bg-[#B58A3E]"
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        )}

        {/* ══ CUSTOM INQUIRY FORM ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl"
          style={{ background: "linear-gradient(135deg, #F5F0E8 0%, #FAF7F2 100%)", border: "1.5px solid rgba(18,48,74,0.08)" }}
        >

          <div className="relative p-6 sm:p-10 lg:p-12 space-y-8 text-left">

            <div className="space-y-3 border-b border-[#12304A]/8 pb-6">
              <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
                Custom Sourcing Request
              </span>
              <h2 style={{ fontWeight: 800 }}
                className="text-2xl sm:text-3xl text-[#12304A] tracking-tight">
                Can't find what you need?
              </h2>
              <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
              <p className="text-sm text-[#5A7A8E] leading-relaxed max-w-2xl font-normal">
                We source beyond our listed products. Tell us what you're looking for and we'll find it.
              </p>
            </div>

            {!inquirySubmitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSubmittingInquiry(true);
                  setTimeout(() => {
                    setIsSubmittingInquiry(false);
                    setInquirySubmitted(true);
                  }, 650);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Full Name <span className="text-[#C79A4B]">*</span></label>
                    <input required type="text" placeholder="Enter your name..."
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Company Name</label>
                    <input type="text" placeholder="Company Name"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Email Address <span className="text-[#C79A4B]">*</span></label>
                    <input required type="email" placeholder="Email Address"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Phone Number <span className="text-[#C79A4B]">*</span></label>
                    <input required type="tel" placeholder="Phone Number"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Country</label>
                    <input type="text" placeholder="Country"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                  </div>
                  <CustomSelect label="Inquiry Type" required variant="light" options={INQUIRY_OPTIONS} value={inquiryType} onChange={(val) => setInquiryType(val)} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5">Product / Ingredient you're looking for <span className="text-[#C79A4B]">*</span></label>
                  <input required type="text" placeholder="Enter compound name, CAS number, or specification..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5">Additional Details</label>
                  <textarea rows={4} placeholder="Provide estimated volume, target compliance specs, or target timeline..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors resize-none shadow-sm" />
                </div>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmittingInquiry}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] disabled:bg-[#C79A4B]/80 text-white font-extrabold text-sm px-10 py-4 rounded-full transition-colors shadow-lg shadow-[#C79A4B]/20 w-full sm:w-auto cursor-pointer gpu-smooth"
                  >
                    {isSubmittingInquiry ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Custom Request...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 24, stiffness: 350 }}
                className="bg-white border border-[#12304A]/8 rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-xl pt-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-16 mx-auto flex items-center justify-center"
                  style={{ clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)", background: "#12304A" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-[#C79A4B] stroke-[2]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#12304A] tracking-tight">Custom Enquiry Submitted Successfully</h3>
                <p className="text-sm text-[#5A7A8E] max-w-lg mx-auto leading-relaxed">
                  Thank you. Your custom chemical sourcing request has been assigned to our procurement specialists. You will receive certified COA availability within 2 business hours.
                </p>
                <div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between border-b border-[#12304A]/8 pb-1.5">
                    <span className="text-[#7A93A8]">Inquiry Type:</span>
                    <span className="text-[#12304A] font-semibold">{inquiryType}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#12304A]/8 pb-1.5">
                    <span className="text-[#7A93A8]">Sourcing Desk:</span>
                    <span className="text-[#C79A4B] font-semibold">Ruskin Mumbai HQ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A93A8]">Response SLA:</span>
                    <span className="text-emerald-600 font-semibold">Under 2 Hours</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setInquirySubmitted(false)}
                  className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
                >
                  Submit Another Request
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>

      {/* ══ PRODUCT DETAILS MODAL ══ */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/30 backdrop-blur-[2px]"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2 }}
              className="bg-white border border-[#C79A4B]/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-5 right-5 text-[#7A93A8] hover:text-[#12304A] p-1 rounded-full hover:bg-[#12304A]/5">
                <X className="w-5 h-5" />
              </button>
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#C79A4B]/10 text-[#C79A4B] border border-[#C79A4B]/25 uppercase tracking-wider">{selectedProduct.category}</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight pt-1">{selectedProduct.name}</h3>
                <p className="text-xs text-[#7A93A8] font-mono">CAS: <span className="text-[#12304A] font-semibold">{selectedProduct.casNumber}</span></p>
              </div>
              <div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-2xl p-4 space-y-2.5 text-xs">
                {[
                  { label: "Purity Specification:", val: selectedProduct.purity, color: "text-emerald-600" },
                  { label: "Standard Grade:", val: selectedProduct.grade, color: "text-[#12304A]" },
                  { label: "Regulatory Dossier:", val: selectedProduct.dmfStatus, color: "text-[#C79A4B]" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between border-b border-[#12304A]/6 pb-2 last:border-0 last:pb-0">
                    <span className="text-[#7A93A8]">{row.label}</span>
                    <span className={`font-bold ${row.color}`}>{row.val}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5A7A8E] leading-relaxed">{selectedProduct.description}</p>
              <div className="flex gap-3">
                <button onClick={() => { const n = selectedProduct.name; setSelectedProduct(null); handleOpenQuote(n); }}
                  className="flex-1 bg-[#C79A4B] hover:bg-[#B58A3E] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
                  Request Dossier &amp; Quote <ArrowUpRight className="w-4 h-4" />
                </button>
                <button onClick={() => setSelectedProduct(null)}
                  className="px-5 py-3 rounded-xl border border-[#12304A]/10 text-[#12304A] text-xs font-semibold hover:bg-[#12304A]/5 transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══ QUOTE MODAL ══ */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/30 backdrop-blur-[2px]"
            onClick={() => setQuoteModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 380 }}
              className="bg-white border border-[#C79A4B]/25 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_25px_70px_rgba(18,48,74,0.35)] text-left space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setQuoteModalOpen(false)} className="absolute top-5 right-5 text-[#7A93A8] hover:text-[#12304A] p-1 rounded-full hover:bg-[#12304A]/5">
                <X className="w-5 h-5" />
              </button>
              {!formSubmitted ? (
                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase font-bold text-[#C79A4B] tracking-widest mb-1">REQUEST QUOTE &amp; TECHNICAL DOSSIER</div>
                    <h3 className="text-2xl font-bold text-[#12304A]">{quoteProduct ? `Quote for ${quoteProduct}` : "Chemical Sourcing Inquiry"}</h3>
                    <div className="w-12 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSubmittingQuote(true);
                      setTimeout(() => {
                        setIsSubmittingQuote(false);
                        setFormSubmitted(true);
                      }, 650);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Full Name &amp; Designation</label>
                      <input required type="text" placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1">Corporate Email</label>
                        <input required type="email" placeholder="s.jenkins@pharma.com"
                          className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1">Estimated Quantity</label>
                        <input type="text" placeholder="e.g. 500 Kg"
                          className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Requirement Details</label>
                      <textarea rows={3} defaultValue={quoteProduct ? `Inquiry for ${quoteProduct}.` : ""}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none transition-colors resize-none" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="w-full bg-[#12304A] hover:bg-[#0E263B] disabled:bg-[#12304A]/80 text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer gpu-smooth"
                    >
                      {isSubmittingQuote ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Transmitting Dossier Request...</span>
                        </span>
                      ) : (
                        <>
                          <span>Submit Inquiry to Ruskin Team</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 24, stiffness: 350 }}
                  className="py-6 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-16 h-16 mx-auto flex items-center justify-center"
                    style={{ clipPath: "polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)", background: "#12304A" }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-[#C79A4B] stroke-[2.2]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#12304A]">Inquiry Submitted</h3>
                  <p className="text-xs text-[#5A7A8E] max-w-xs mx-auto">Our technical team will respond with full COA specifications within 2 business hours.</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setQuoteModalOpen(false)}
                    className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-full text-sm font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
                  >
                    Close Window
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Banner */}
      <CtaBanner
        onRequestQuote={() => handleOpenQuote()}
      />

      <Footer onOpenCatalog={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductsContent />
    </Suspense>
  );
}
