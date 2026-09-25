"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import CustomSelect from "../components/CustomSelect";
import Navbar from "../components/Navbar";
import { ALL_PRODUCTS, ApiProduct } from "@/lib/products";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  Download,
} from "lucide-react";

const CATEGORIES = [
  { name: "All", count: 46 },
  { name: "Contrast Media", count: 7 },
  { name: "Anesthetics", count: 5 },
  { name: "Antibacterials", count: 11 },
  { name: "Antivirals", count: 2 },
  { name: "Oncology", count: 4 },
  { name: "Hormones", count: 3 },
  { name: "Vitamins & Keto-Acids", count: 14 },
];

const INQUIRY_OPTIONS = [
  { value: "Product Enquiry", label: "Product Enquiry" },
  { value: "Custom Synthesis", label: "Custom Synthesis" },
  { value: "Regulatory Dossier", label: "Regulatory Dossier (USDMF / CEP)" },
  { value: "Sample Request", label: "Sample Request & COA" },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  // Selected product modal state
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Custom inquiry form state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Product Enquiry");

  // Filter products based on search, category pill, and A-Z letter
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }
      // Letter filter
      if (selectedLetter && !product.name.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }
      // Search query filter
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

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  
  // Current page items
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Set of letters present in the dataset to highlight active/available letters
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    ALL_PRODUCTS.forEach((p) => {
      set.add(p.name.charAt(0).toUpperCase());
    });
    return set;
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleLetterChange = (letter: string) => {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
    setCurrentPage(1);
  };

  const handleOpenQuote = (productName?: string) => {
    setQuoteProduct(productName || null);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#112436] text-[#CBD5E1] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-[#112436]">
      
      {/* ================= 1. HEADER (Unified Component) ================= */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* ================= 2. DCGI-APPROVED & REGISTERED API DIRECTORY ================= */}
      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Header Block matching Figma screenshot */}
        <div className="text-left space-y-3 max-w-3xl">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            DCGI-Approved &amp; Registered API Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
            Explore our catalog of 46+ high-purity APIs sourced directly from global manufacturing partners with full WHO-GMP compliance, Certificate of Analysis (COA) verification, and regulatory support.
          </p>
        </div>

        {/* Search Bar + Category Pills + A-Z Filter Bar */}
        <div className="space-y-6">
          
          {/* Search Input Bar with Gold Search Button Icon inside */}
          <div className="relative max-w-full">
            <input
              type="text"
              placeholder="Search by API Name, CAS No., or Manufacturer..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#18344E]/80 border border-white/15 rounded-full py-3.5 pl-6 pr-14 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-all shadow-inner"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#C79A4B] hover:bg-[#B58A3E] text-white flex items-center justify-center font-bold transition-transform active:scale-95 shadow-md"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Category Filter Pills (matching Figma counts & active gold pill) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm ${
                    isActive
                      ? "bg-[#C79A4B] text-white font-bold shadow-md shadow-[#C79A4B]/20"
                      : "bg-[#18344E]/60 text-slate-200 border border-white/10 hover:border-white/30 hover:bg-[#1E3E5B]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white font-bold" : "text-slate-400"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* A-Z Alphabet Filter Strip (matching Figma rounded outline bar) */}
          <div className="bg-[#18344E]/50 border border-white/15 rounded-2xl sm:rounded-full p-2.5 sm:px-6 flex items-center justify-between overflow-x-auto no-scrollbar gap-1 text-xs font-bold text-slate-300">
            {ALPHABET.map((letter) => {
              const isAvailable = availableLetters.has(letter);
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => isAvailable && handleLetterChange(letter)}
                  disabled={!isAvailable}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#C79A4B] text-white font-extrabold scale-110 shadow-md"
                      : isAvailable
                      ? "text-slate-200 hover:text-[#C79A4B] hover:bg-white/10"
                      : "text-slate-600/40 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="ml-2 px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20 text-[11px] font-semibold shrink-0"
              >
                Clear A-Z
              </button>
            )}
          </div>

        </div>

        {/* 4x4 Grid of API Product Cards (16 per page as shown in Figma) */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {paginatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-[#18344E]/60 border border-white/12 rounded-[20px] h-[110px] sm:h-[120px] p-5 flex items-center justify-center text-center cursor-pointer hover:border-[#C79A4B]/60 hover:bg-[#1C3E5E] transition-all transform-gpu hover:-translate-y-1 shadow-lg group relative overflow-hidden"
              >
                {/* Product Name (Centered Bold Text matching Figma screenshot) */}
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#E5C378] transition-colors leading-snug">
                  {product.name}
                </h3>
                
                {/* Subtle top right indicator */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C79A4B]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#18344E]/40 border border-white/10 rounded-2xl p-12 text-center space-y-3">
            <p className="text-lg font-bold text-white">No products found matching your filter</p>
            <p className="text-xs text-slate-400">Try searching for a different CAS number or clear letter/category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLetter(null);
              }}
              className="gold-btn px-6 py-2 rounded-full text-xs font-bold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Bar (matching Figma gold arrow circles and 1/2 indicator) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold transition-all shadow-md ${
                currentPage === 1
                  ? "bg-[#C79A4B]/40 text-white/50 cursor-not-allowed"
                  : "bg-[#C79A4B] text-white hover:bg-[#B58A3E] active:scale-95"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3]" />
            </button>

            {/* Pill Page Indicator */}
            <div className="bg-[#18344E]/80 border border-white/20 rounded-full px-8 py-2 text-sm font-bold text-white tracking-wider">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold transition-all shadow-md ${
                currentPage === totalPages
                  ? "bg-[#C79A4B]/40 text-white/50 cursor-not-allowed"
                  : "bg-[#C79A4B] text-white hover:bg-[#B58A3E] active:scale-95"
              }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        )}

        {/* ================= 3. "CAN'T FIND WHAT YOU NEED?" CUSTOM INQUIRY FORM ================= */}
        <div className="bg-[#162D42] border border-slate-700/60 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-left">
          
          <div className="space-y-2 border-b border-slate-700/50 pb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#12273B] border border-slate-700/80 text-[#C79A4B] text-[11px] font-bold uppercase tracking-wider mb-1">
              Custom Sourcing Request
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Can’t find what you need?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-2xl font-normal">
              We source beyond our listed products. If you’re looking for a specific API, intermediate, or ingredient not listed here, tell us and we’ll find it.
            </p>
          </div>

          {!inquirySubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInquirySubmitted(true);
              }}
              className="space-y-5"
            >
              {/* Row 1: Name | Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Full Name <span className="text-[#C79A4B]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email | Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Email Address <span className="text-[#C79A4B]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Phone Number <span className="text-[#C79A4B]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Country | Inquiry Type (Custom Select Dropdown) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                  />
                </div>
                <div>
                  <CustomSelect
                    label="Inquiry Type"
                    required
                    options={INQUIRY_OPTIONS}
                    value={inquiryType}
                    onChange={(val) => setInquiryType(val)}
                  />
                </div>
              </div>

              {/* Row 4: Product / Ingredient looking for */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Product / Ingredient you're looking for <span className="text-[#C79A4B]">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter compound name, CAS number, or specification..."
                  className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                />
              </div>

              {/* Row 5: Additional Details */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Additional Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide estimated volume, target compliance specs (e.g. USDMF/CEP), or target timeline..."
                  className="w-full bg-[#112436] border border-slate-700/70 rounded-xl px-4 py-3 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#C79A4B] transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white font-extrabold text-xs sm:text-sm px-9 py-3.5 rounded-xl transition-colors shadow-md active:scale-95"
                >
                  Submit Enquiry
                </button>
              </div>

            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#112436] border border-slate-700/80 rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-xl relative overflow-hidden"
            >
              {/* Top status bar */}
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  STATUS: LOGGED &amp; VERIFIED
                </span>
                <span>REF: REF-2026-{(Math.floor(Math.random() * 9000) + 1000)}</span>
              </div>

              {/* Checkmark badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Custom Enquiry Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Thank you. Your custom chemical sourcing request has been assigned to our procurement specialists. You will receive certified COA availability within 2 business hours.
                </p>
              </div>

              {/* Details summary */}
              <div className="bg-[#162D42] border border-slate-700/60 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                  <span className="text-slate-400">Inquiry Type:</span>
                  <span className="text-white font-semibold">{inquiryType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                  <span className="text-slate-400">Sourcing Desk:</span>
                  <span className="text-[#C79A4B] font-semibold">Ruskin Mumbai HQ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Response SLA:</span>
                  <span className="text-emerald-400 font-semibold">Under 2 Hours</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3 rounded-full text-xs font-extrabold transition-all shadow-md active:scale-95"
                >
                  Submit Another Sourcing Request
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </main>

      {/* ================= 4. PRODUCT DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0F2336] border border-[#C79A4B]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left space-y-6"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#C79A4B]/20 text-[#E5C378] border border-[#C79A4B]/40 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  CAS: <span className="text-white font-semibold">{selectedProduct.casNumber}</span>
                </p>
              </div>

              <div className="bg-[#162D42] border border-white/10 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Purity Specification:</span>
                  <span className="text-emerald-400 font-bold">{selectedProduct.purity}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Standard Grade:</span>
                  <span className="text-white font-semibold">{selectedProduct.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Regulatory Dossier:</span>
                  <span className="text-[#C79A4B] font-semibold">{selectedProduct.dmfStatus}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    const name = selectedProduct.name;
                    setSelectedProduct(null);
                    handleOpenQuote(name);
                  }}
                  className="flex-1 gold-btn py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5"
                >
                  <span>Request Dossier &amp; Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-3 rounded-xl border border-white/20 text-white text-xs font-semibold hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 5. REQUEST QUOTE MODAL ================= */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0F2336] border border-[#C79A4B]/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left space-y-6"
            >
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {!formSubmitted ? (
                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase font-bold text-[#C79A4B] tracking-wider mb-1">
                      REQUEST QUOTE &amp; TECHNICAL DOSSIER
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {quoteProduct ? `Quote for ${quoteProduct}` : "Chemical Sourcing Inquiry"}
                    </h3>
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
                        placeholder="e.g. Dr. Sarah Jenkins"
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
                          placeholder="e.g. 500 Kg"
                          className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Requirement Details
                      </label>
                      <textarea
                        rows={3}
                        defaultValue={quoteProduct ? `Inquiry for ${quoteProduct}. Please send specifications and USDMF status.` : ""}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gold-btn py-3.5 rounded-xl text-sm font-bold"
                    >
                      Submit Inquiry to Ruskin Team
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Submitted</h3>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Our technical team will respond with full COA specifications within 2 business hours.
                  </p>
                  <button
                    onClick={() => setQuoteModalOpen(false)}
                    className="gold-btn px-6 py-2 rounded-full text-xs font-bold"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 6. FOOTER ================= */}
      <Footer onOpenCatalog={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

    </div>
  );
}
