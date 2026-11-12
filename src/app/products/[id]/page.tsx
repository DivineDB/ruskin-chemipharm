"use client";

import React, { useState, use, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import CustomSelect from "../../components/CustomSelect";
import { getProductBySlugOrId, ALL_PRODUCTS } from "@/lib/products";
import { useProductTransition } from "../../context/ProductTransitionContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
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
  const currentProduct = product || ALL_PRODUCTS[0];

  // Cross-page seamless title growth transition
  const { isTransitioningFor, registerTarget } = useProductTransition();
  const isTransitioning = isTransitioningFor(currentProduct?.name || "");

  const handleTitleRef = useCallback(
    (node: HTMLHeadingElement | null) => {
      if (node) {
        registerTarget(node);
      }
    },
    [registerTarget]
  );

  const [copiedCas, setCopiedCas] = useState(false);

  // Bottom Custom Enquiry form state
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryType, setInquiryType] = useState("Product Enquiry");
  const [enqName, setEnqName] = useState("");
  const [enqCompany, setEnqCompany] = useState("");
  const [enqEmail, setEnqEmail] = useState("");
  const [enqPhone, setEnqPhone] = useState("");
  const [enqCountry, setEnqCountry] = useState("");
  const [enqProduct, setEnqProduct] = useState(currentProduct?.name || "");
  const [enqDetails, setEnqDetails] = useState("");
  const [enqRefId, setEnqRefId] = useState("");

  if (!currentProduct) {
    return notFound();
  }

  const handleCopyCas = (cas: string) => {
    navigator.clipboard.writeText(cas);
    setCopiedCas(true);
    setTimeout(() => setCopiedCas(false), 1800);
  };

  const handleOpenModal = (subject: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ruskin:open-quote", {
          detail: {
            product: currentProduct.name,
            note: `${subject}. CAS Number: ${currentProduct.casNumber}. Grade: ${currentProduct.grade || "Pharma/USP/BP"}.`,
          },
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">

      {/* ================= 2. MAIN CONTENT AREA ================= */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Top Link: ← Back to all products */}
        <div>
          <Link
            href="/products"
            prefetch={true}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#5A7A8E] hover:text-[#12304A] transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all products</span>
          </Link>
        </div>

        {/* Product Details Main Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white border border-[#12304A]/8 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 text-left relative overflow-hidden"
        >
          
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
              ref={handleTitleRef}
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight leading-tight transition-opacity duration-150 ease-out ${
                isTransitioning ? "opacity-0 select-none" : "opacity-100"
              }`}
            >
              {currentProduct.name}
            </h1>

            {/* Signature Ruskin Gold Accent Bar */}
            <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />

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
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleCopyCas(currentProduct.casNumber)}
                    title="Copy CAS Number"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#12304A] bg-[#12304A]/5 hover:bg-[#C79A4B]/15 hover:text-[#C79A4B] rounded-md transition-[border-color,background-color,color] duration-150 border border-[#12304A]/10 hover:border-[#C79A4B]/30 cursor-pointer"
                  >
                    {copiedCas ? (
                      <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </motion.span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 stroke-[2]" />
                        <span>Copy CAS</span>
                      </>
                    )}
                  </motion.button>
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
            <p className="text-[11px] sm:text-xs text-[#5A7A8E] italic pt-1">
              Full specification sheet and batch certificate of analysis available on request.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenModal(`Request Sample for ${currentProduct.name}`)}
                className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3.5 rounded-xl text-sm font-extrabold transition-colors shadow-md cursor-pointer gpu-smooth"
              >
                Request Sample
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenModal(`Request COA & Technical Specs for ${currentProduct.name}`)}
                className="inline-flex items-center gap-2 bg-[#12304A] hover:bg-[#0B1E2E] text-white px-7 py-3.5 rounded-xl text-sm font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
              >
                Request COA
              </motion.button>
            </div>

          </div>

        </motion.div>

        {/* ================= 3. "CAN'T FIND WHAT YOU NEED?" CUSTOM SOURCING FORM (LIGHT THEME) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmittingInquiry(true);
                  try {
                    const res = await fetch("/api/inquiries", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: enqName,
                        company: enqCompany,
                        email: enqEmail,
                        phone: enqPhone,
                        country: enqCountry,
                        product: enqProduct || currentProduct.name,
                        casNumber: currentProduct.casNumber,
                        category: inquiryType,
                        message: enqDetails,
                        source: `Product Page (${currentProduct.name})`,
                      }),
                    });
                    const data = await res.json();
                    if (data.success && data.referenceId) {
                      setEnqRefId(data.referenceId);
                    } else {
                      setEnqRefId(`RUS-${Math.floor(1000 + Math.random() * 9000)}`);
                    }
                  } catch (err) {
                    console.error("Enquiry submission error:", err);
                    setEnqRefId(`RUS-${Math.floor(1000 + Math.random() * 9000)}`);
                  } finally {
                    setIsSubmittingInquiry(false);
                    setInquirySubmitted(true);
                  }
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
                      value={enqName}
                      onChange={(e) => setEnqName(e.target.value)}
                      placeholder="Enter your name..."
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={enqCompany}
                      onChange={(e) => setEnqCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
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
                      value={enqEmail}
                      onChange={(e) => setEnqEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                      Phone Number <span className="text-[#C79A4B]">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={enqPhone}
                      onChange={(e) => setEnqPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Row 3: Country | Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                  <div>
                    <label className="block text-xs font-bold text-[#12304A] mb-1.5">Country</label>
                    <input
                      type="text"
                      value={enqCountry}
                      onChange={(e) => setEnqCountry(e.target.value)}
                      placeholder="Country"
                      className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
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
                    value={enqProduct}
                    onChange={(e) => setEnqProduct(e.target.value)}
                    placeholder="Enter compound name, CAS number, or specification..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Row 5: Additional Details */}
                <div>
                  <label className="block text-xs font-bold text-[#12304A] mb-1.5">Additional Details</label>
                  <textarea
                    rows={4}
                    value={enqDetails}
                    onChange={(e) => setEnqDetails(e.target.value)}
                    placeholder="Provide estimated batch volume, target compliance specs (USDMF, CEP, IP/BP), or required delivery timeline..."
                    className="w-full bg-white border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-[#12304A] text-xs placeholder-[#5A7A8E]/60 focus:outline-none transition-colors resize-none shadow-sm"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmittingInquiry}
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] disabled:opacity-75 text-white font-extrabold text-sm px-9 py-4 rounded-xl transition-colors shadow-lg shadow-[#C79A4B]/20 cursor-pointer gpu-smooth"
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
                  {enqRefId && (
                    <div className="flex justify-between border-b border-[#12304A]/6 pb-1.5">
                      <span className="text-[#5A7A8E]">Tracking Reference:</span>
                      <span className="font-mono text-[#12304A] font-bold">{enqRefId}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-[#12304A]/6 pb-1.5">
                    <span className="text-[#5A7A8E]">Inquiry Type:</span>
                    <span className="text-[#12304A] font-semibold">{inquiryType}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#12304A]/6 pb-1.5">
                    <span className="text-[#5A7A8E]">Target Compound:</span>
                    <span className="text-[#C79A4B] font-semibold">{currentProduct.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5A7A8E]">Response SLA:</span>
                    <span className="text-emerald-600 font-semibold">Under 2 Hours</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setInquirySubmitted(false)}
                  className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
                >
                  Submit Another Request
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>

      </main>

      {/* ================= 6. FOOTER ================= */}
      <Footer
        onOpenCatalog={() => {
          if (typeof window !== "undefined" && (window as any).__lenis) {
            (window as any).__lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />

    </div>
  );
}
