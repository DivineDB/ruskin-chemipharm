"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";
import CustomSelect from "../../components/CustomSelect";
import Navbar from "../../components/Navbar";
import { getProductBySlugOrId, getRelatedProducts, ALL_PRODUCTS } from "@/lib/products";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

const INQUIRY_OPTIONS = [
  { value: "Product Enquiry", label: "Product Enquiry" },
  { value: "Custom Synthesis", label: "Custom Synthesis" },
  { value: "Regulatory Dossier", label: "Regulatory Dossier (USDMF / CEP)" },
  { value: "Sample Request", label: "Sample Request & COA" },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductBySlugOrId(resolvedParams.id);

  if (!product) {
    // If not found in dataset fallback to first product or 404
    const fallback = ALL_PRODUCTS[0];
    if (!fallback) return notFound();
  }

  const currentProduct = product || ALL_PRODUCTS[0];
  const relatedProducts = getRelatedProducts(currentProduct, 4);

  // Quote / Sample Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [copiedCas, setCopiedCas] = useState(false);

  // Bottom Custom Enquiry form state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryType, setInquiryType] = useState("Product Enquiry");

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    if (quoteModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setQuoteModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [quoteModalOpen]);

  const handleCopyCas = (cas: string) => {
    navigator.clipboard.writeText(cas);
    setCopiedCas(true);
    setTimeout(() => setCopiedCas(false), 1800);
  };

  const handleOpenModal = (subject: string) => {
    setQuoteSubject(subject);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#3E5C72] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
      
      {/* ================= 1. HEADER ================= */}
      <Navbar onOpenQuote={() => handleOpenModal(`Quote Inquiry for ${currentProduct.name}`)} />

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Top Link: ← Back to all products */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#5A7A8E] hover:text-[#12304A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all products</span>
          </Link>
        </div>

        {/* Product Details Main Card */}
        <div className="bg-white border border-[#12304A]/8 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 text-left relative overflow-hidden">
          
          {/* Header Info Block */}
          <div className="space-y-4">
            
            {/* Category Pill */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#C79A4B] bg-[#C79A4B]/10 border border-[#C79A4B]/25 rounded-full">
                {currentProduct.category}
              </span>
            </div>

            {/* Product Name Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight leading-tight"
              
            >
              {currentProduct.name}
            </h1>

            {/* Tagline Sub-heading */}
            <p className="text-sm sm:text-base text-[#12304A] font-bold leading-relaxed max-w-3xl">
              {currentProduct.tagline}
            </p>

            {/* Extended Description Paragraph */}
            <p className="text-xs sm:text-sm text-[#5A7A8E] leading-relaxed max-w-4xl font-normal">
              {currentProduct.description}
            </p>

          </div>

          {/* Specifications Sub-section */}
          <div className="space-y-4 pt-4 border-t border-[#12304A]/8">
            
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 text-[#12304A] text-[11px] font-bold tracking-wide">
              Specifications
            </div>

            {/* Key-Value Specifications Table */}
            <div className="border border-[#12304A]/8 rounded-xl overflow-hidden bg-[#FAF7F2] divide-y divide-[#12304A]/6 text-xs sm:text-sm">
              
              {/* Row 1: CAS number */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-[#12304A]">CAS number</div>
                <div className="sm:col-span-8 flex items-center gap-3 mt-1 sm:mt-0">
                  <span className="font-mono text-[#5A7A8E]">{currentProduct.casNumber}</span>
                  <button
                    onClick={() => handleCopyCas(currentProduct.casNumber)}
                    title="Copy CAS Number"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#12304A] bg-[#12304A]/5 hover:bg-[#C79A4B]/15 hover:text-[#C79A4B] rounded-md transition-all border border-[#12304A]/10 hover:border-[#C79A4B]/30"
                  >
                    {copiedCas ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 stroke-[2]" />
                        <span>Copy CAS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Row 2: Pharmacopoeial Grades */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-[#12304A]">Pharmacopoeial Grades</div>
                <div className="sm:col-span-8 text-[#5A7A8E] mt-1 sm:mt-0">{currentProduct.grade}</div>
              </div>

              {/* Row 3: Regulatory Status */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-[#12304A]">Regulatory Status</div>
                <div className="sm:col-span-8 text-[#C79A4B] font-bold mt-1 sm:mt-0">{currentProduct.dmfStatus}</div>
              </div>

              {/* Row 4: Primary Manufacturer */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-[#12304A]">Primary Manufacturer</div>
                <div className="sm:col-span-8 text-[#5A7A8E] mt-1 sm:mt-0">{currentProduct.manufacturer}</div>
              </div>

            </div>

            {/* Small Note */}
            <p className="text-[11px] sm:text-xs text-[#7A93A8] italic pt-1">
              Full specification sheet and batch certificate of analysis available on request.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenModal(`Request Sample for ${currentProduct.name}`)}
                className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3.5 rounded-full text-sm font-extrabold transition-all shadow-md"
              >
                Request Sample
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenModal(`Request COA & Technical Specs for ${currentProduct.name}`)}
                className="inline-flex items-center gap-2 bg-[#12304A] hover:bg-[#0E263B] text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Request COA
              </motion.button>
            </div>

          </div>

        </div>

        {/* ================= 3. RELATED PRODUCTS SECTION ================= */}
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
              <div className="w-8 h-[2px] bg-[#C79A4B]" />
              Related Products
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#12304A] tracking-tight">
              Related Compounds in {currentProduct.category}
            </h2>
            <div className="w-12 h-[2px] bg-[#C79A4B] rounded-full" />
          </div>

          {/* Grid of Related Product Cards — matching navy product cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <motion.div
                key={rel.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative bg-[#12304A] border border-white/10 rounded-[22px] overflow-hidden shadow-lg hover:border-[#C79A4B]/50 transition-all group flex flex-col justify-between p-5"
              >
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#C79A4B]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Link href={`/products/${rel.slug}`} className="relative flex flex-col flex-1 justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#E5C378] bg-[#C79A4B]/15 border border-[#C79A4B]/25 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      {rel.category}
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-[#C79A4B] transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C79A4B] group-hover:text-white stroke-[2.5]" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E5C378] transition-colors leading-snug">
                    {rel.name}
                  </h3>
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400 font-mono">
                    <span>CAS: <span className="text-slate-200">{rel.casNumber}</span></span>
                    <span className="text-emerald-400 font-semibold">{rel.purity}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* See all link */}
          <div className="pt-1">
            <Link
              href={`/products?category=${encodeURIComponent(currentProduct.category)}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A7A8E] hover:text-[#C79A4B] transition-colors group"
            >
              <span>Explore all {currentProduct.category} APIs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ================= 4. "CAN'T FIND WHAT YOU NEED?" CUSTOM SOURCING FORM (LIGHT THEME) ================= */}
        <div
          className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl"
          style={{
            background: "linear-gradient(135deg, #F5F0E8 0%, #FAF7F2 100%)",
            border: "1.5px solid rgba(18,48,74,0.08)",
          }}
        >
          <div className="relative p-6 sm:p-10 lg:p-12 space-y-8 text-left">
            <div className="space-y-3 border-b border-[#12304A]/8 pb-6">
              <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
                Custom Sourcing Request
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight">
                Can’t find what you need?
              </h2>
              <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
              <p className="text-sm text-[#5A7A8E] leading-relaxed max-w-2xl font-normal">
                We source beyond our listed products. If you’re looking for a specific API, intermediate, or specialty compound not in the active catalog, tell us and our sourcing desk will locate it.
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
                {/* Row 1: Name | Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                      Full Name <span className="text-[#C79A4B]">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Row 2: Email | Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                      Email Address <span className="text-[#C79A4B]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                      Phone Number <span className="text-[#C79A4B]">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Row 3: Country | Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Country</label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <CustomSelect
                      label="Inquiry Type"
                      required
                      variant="light"
                      options={INQUIRY_OPTIONS}
                      value={inquiryType}
                      onChange={(val) => setInquiryType(val)}
                    />
                  </div>
                </div>

                {/* Row 4: Product */}
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                    Product / Compound Sourcing Requirement <span className="text-[#C79A4B]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    defaultValue={currentProduct.name}
                    placeholder="Enter compound name, CAS number, or specification..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Row 5: Additional Details */}
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5">Additional Details</label>
                  <textarea
                    rows={4}
                    placeholder="Provide estimated batch volume, target compliance specs (USDMF, CEP, IP/BP), or required delivery timeline..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#B0C4D4] focus:outline-none transition-colors resize-none shadow-sm"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmittingInquiry}
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] disabled:opacity-75 text-white font-extrabold text-sm px-9 py-4 rounded-full transition-all shadow-lg shadow-[#C79A4B]/20 active:scale-95"
                  >
                    {isSubmittingInquiry ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Sourcing Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 24, stiffness: 350 }}
                className="bg-white border border-[#12304A]/8 rounded-2xl p-8 sm:p-10 text-center space-y-5 shadow-xl pt-10"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: [0, 1.2, 1], rotate: [-25, 5, 0] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-16 h-16 mx-auto flex items-center justify-center rounded-2xl bg-[#12304A] shadow-md shadow-[#12304A]/20"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#C79A4B] stroke-[2.5]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#12304A] tracking-tight">Enquiry Submitted Successfully</h3>
                <p className="text-xs sm:text-sm text-[#5A7A8E] max-w-lg mx-auto leading-relaxed">
                  Thank you. Your request for <span className="text-[#C79A4B] font-semibold">{currentProduct.name}</span> has been logged and assigned to our regulatory technical team.
                </p>
                <div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between border-b border-[#12304A]/6 pb-1.5">
                    <span className="text-[#7A93A8]">Inquiry Type:</span>
                    <span className="text-[#12304A] font-semibold">{inquiryType}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#12304A]/6 pb-1.5">
                    <span className="text-[#7A93A8]">Target Compound:</span>
                    <span className="text-[#C79A4B] font-semibold">{currentProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A93A8]">Response SLA:</span>
                    <span className="text-emerald-600 font-semibold">Under 2 Hours</span>
                  </div>
                </div>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </div>
        </div>

      </main>

      {/* ================= 5. REQUEST MODAL ================= */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/30 backdrop-blur-[2px]"
            onClick={() => setQuoteModalOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", damping: 26, stiffness: 380 }}
              className="bg-white border border-[#C79A4B]/25 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setQuoteModalOpen(false)}
                className="absolute top-5 right-5 text-[#7A93A8] hover:text-[#12304A] p-1 rounded-full hover:bg-[#12304A]/5">
                <X className="w-5 h-5" />
              </button>
              {!formSubmitted ? (
                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase font-bold text-[#C79A4B] tracking-widest mb-1">TECHNICAL DOSSIER REQUEST</div>
                    <h3 className="text-2xl font-bold text-[#12304A]">{quoteSubject || `Inquiry for ${currentProduct.name}`}</h3>
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
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1">Corporate Email</label>
                        <input required type="email" placeholder="s.jenkins@pharma.com"
                          className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1">Estimated Quantity</label>
                        <input type="text" placeholder="e.g. 500 Kg"
                          className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1">Requirement Details</label>
                      <textarea rows={3} defaultValue={`Inquiry for ${currentProduct.name} (CAS: ${currentProduct.casNumber}).`}
                        className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl text-[#12304A] text-xs focus:outline-none" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmittingQuote}
                      type="submit"
                      className="w-full bg-[#12304A] hover:bg-[#0E263B] disabled:opacity-75 text-white py-3.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#12304A]/20"
                    >
                      {isSubmittingQuote ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#C79A4B]" />
                          <span>Transmitting Dossier Request...</span>
                        </>
                      ) : (
                        <span>Submit Technical Request</span>
                      )}
                    </motion.button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 360 }}
                  className="py-6 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: [0, 1.25, 1], rotate: [-25, 5, 0] }}
                    transition={{ duration: 0.52, ease: "easeOut" }}
                    className="w-14 h-14 mx-auto flex items-center justify-center shadow-md shadow-[#12304A]/20"
                    style={{ clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)", background: "#12304A" }}
                  >
                    <CheckCircle2 className="w-7 h-7 text-[#C79A4B] stroke-[2.5]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#12304A]">Request Submitted</h3>
                  <p className="text-xs text-[#5A7A8E] max-w-xs mx-auto">Our regulatory team will provide batch COA and technical specifications within 2 business hours.</p>
                  <button onClick={() => setQuoteModalOpen(false)}
                    className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-full text-sm font-bold transition-colors">
                    Close Window
                  </button>
                </motion.div>
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
