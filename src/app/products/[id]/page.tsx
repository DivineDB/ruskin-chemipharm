"use client";

import React, { useState, use } from "react";
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
  FileCheck,
  FlaskConical,
  ShieldCheck,
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

  // Bottom Custom Enquiry form state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("Product Enquiry");

  const handleOpenModal = (subject: string) => {
    setQuoteSubject(subject);
    setQuoteModalOpen(true);
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#112436] text-[#CBD5E1] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-[#112436]">
      
      {/* ================= 1. HEADER ================= */}
      <Navbar onOpenQuote={() => handleOpenModal(`Quote Inquiry for ${currentProduct.name}`)} />

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Top Link: ← Back to all products */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all products</span>
          </Link>
        </div>

        {/* Product Details Main Card (Matching Figma Screenshot 207-1095) */}
        <div className="bg-[#162D42] border border-slate-700/70 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8 text-left relative overflow-hidden">
          
          {/* Header Info Block */}
          <div className="space-y-4">
            
            {/* Category Pill */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C79A4B] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                {currentProduct.category}
              </span>
            </div>

            {/* Product Name Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {currentProduct.name}
            </h1>

            {/* Tagline Sub-heading */}
            <p className="text-sm sm:text-base text-white font-bold leading-relaxed max-w-3xl">
              {currentProduct.tagline}
            </p>

            {/* Extended Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-4xl font-normal">
              {currentProduct.description}
            </p>

          </div>

          {/* Specifications Sub-section */}
          <div className="space-y-4 pt-4 border-t border-slate-700/50">
            
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#112436] border border-slate-700/80 text-slate-200 text-[11px] font-semibold tracking-wide">
              Specifications
            </div>

            {/* Key-Value Specifications Table matching Figma screenshot */}
            <div className="border border-slate-700/60 rounded-xl overflow-hidden bg-[#112436]/80 divide-y divide-slate-700/60 text-xs sm:text-sm">
              
              {/* Row 1: CAS number */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-white">CAS number</div>
                <div className="sm:col-span-8 text-slate-300 font-mono mt-1 sm:mt-0">{currentProduct.casNumber}</div>
              </div>

              {/* Row 2: Pharmacopoeial Grades */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-white">Pharmacopoeial Grades</div>
                <div className="sm:col-span-8 text-slate-300 mt-1 sm:mt-0">{currentProduct.grade}</div>
              </div>

              {/* Row 3: Regulatory Status */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-white">Regulatory Status</div>
                <div className="sm:col-span-8 text-slate-300 mt-1 sm:mt-0 font-semibold">{currentProduct.dmfStatus}</div>
              </div>

              {/* Row 4: Primary Manufacturer */}
              <div className="grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-center">
                <div className="sm:col-span-4 font-bold text-white">Primary Manufacturer</div>
                <div className="sm:col-span-8 text-slate-300 mt-1 sm:mt-0">{currentProduct.manufacturer}</div>
              </div>

            </div>

            {/* Small Note */}
            <p className="text-[11px] sm:text-xs text-slate-400 italic pt-1">
              Full specification sheet and batch certificate of analysis available on request.
            </p>

            {/* CTA Action Buttons: Gold Request Sample & Teal Request COA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenModal(`Request Sample for ${currentProduct.name}`)}
                className="bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95"
              >
                Request Sample
              </button>

              <button
                onClick={() => handleOpenModal(`Request COA & Technical Specs for ${currentProduct.name}`)}
                className="bg-[#147D82] hover:bg-[#10686C] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
              >
                Request COA
              </button>
            </div>

          </div>

        </div>

        {/* ================= 3. RELATED PRODUCTS SECTION (Exact Match to Figma) ================= */}
        <div className="space-y-6 text-left">
          
          <h2
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Related Products
          </h2>

          {/* 2x2 Grid of Related Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="bg-[#18344E]/60 border border-slate-700/60 rounded-[20px] h-[110px] p-5 flex items-center justify-center text-center cursor-pointer hover:border-[#C79A4B]/60 hover:bg-[#1C3E5E] transition-all shadow-lg group relative"
              >
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E5C378] transition-colors">
                  {rel.name}
                </h3>
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C79A4B]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* See all Category Products → link */}
          <div className="pt-1">
            <Link
              href="/products"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-300 underline underline-offset-4 hover:text-[#C79A4B] transition-colors group"
            >
              <span>See all {currentProduct.category} Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* ================= 4. "CAN'T FIND WHAT YOU NEED?" CUSTOM SOURCING FORM ================= */}
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

              {/* Row 3: Country | Inquiry Type */}
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
                  Enquiry Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Thank you. Your request for <span className="text-[#C79A4B] font-semibold">{currentProduct.name}</span> has been assigned to our regulatory technical team. You will receive a certified response within 2 business hours.
                </p>
              </div>

              {/* Details card */}
              <div className="bg-[#162D42] border border-slate-700/60 rounded-xl p-4 max-w-md mx-auto text-xs text-left space-y-2">
                <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                  <span className="text-slate-400">Inquiry Type:</span>
                  <span className="text-white font-semibold">{inquiryType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-700/50 pb-1.5">
                  <span className="text-slate-400">Target Compound:</span>
                  <span className="text-[#C79A4B] font-semibold">{currentProduct.name} (CAS: {currentProduct.casNumber})</span>
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

      {/* ================= 5. REQUEST MODAL ================= */}
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
                      TECHNICAL DOSSIER &amp; SPECIFICATION REQUEST
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {quoteSubject || `Inquiry for ${currentProduct.name}`}
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
                        defaultValue={`Inquiry for ${currentProduct.name} (CAS: ${currentProduct.casNumber}). Please send specifications and COA.`}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C79A4B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gold-btn py-3.5 rounded-xl text-sm font-bold"
                    >
                      Submit Technical Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Request Submitted</h3>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Our regulatory team will provide batch COA and technical specifications within 2 business hours.
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
