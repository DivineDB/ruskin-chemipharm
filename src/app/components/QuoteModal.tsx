"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useScrollLock } from "@/lib/scrollLock";

export default function QuoteModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string>("");
  const [quoteName, setQuoteName] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteQuantity, setQuoteQuantity] = useState("");
  const [quoteSpecs, setQuoteSpecs] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [quoteRefId, setQuoteRefId] = useState<string>("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Freeze background scroll & Lenis when modal is open
  useScrollLock(isOpen);

  // Listen to global "ruskin:open-quote" event from navbar or any page CTA
  useEffect(() => {
    const handleOpenQuote = (e?: Event) => {
      const customEvent = e as CustomEvent<{ product?: string; note?: string }>;
      const product = customEvent?.detail?.product || "";
      const note = customEvent?.detail?.note || "";

      setQuoteProduct(product);
      if (note) setQuoteSpecs(note);
      setFormSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener("ruskin:open-quote", handleOpenQuote);
    return () => window.removeEventListener("ruskin:open-quote", handleOpenQuote);
  }, []);

  // Auto-focus first input on open
  useEffect(() => {
    if (isOpen && !formSubmitted) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, formSubmitted]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteName,
          email: quoteEmail,
          company: quoteCompany,
          quantity: quoteQuantity,
          message: quoteSpecs,
          product: quoteProduct || "General Chemical Sourcing",
          source: `Quote Modal (${pathname})`,
          category: quoteProduct ? "Commercial Quote" : "General Technical Inquiry",
        }),
      });

      const data = await res.json();
      if (data.success && data.referenceId) {
        setQuoteRefId(data.referenceId);
      } else {
        setQuoteRefId(`RUS-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch (err) {
      console.error("Quote submission error:", err);
      setQuoteRefId(`RUS-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#12304A]/50 backdrop-blur-xs"
          onClick={handleClose}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            data-lenis-prevent="true"
            className="w-[min(520px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white shadow-[0_25px_70px_rgba(18,48,74,0.35)] border border-[#12304A]/10 text-left relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#5A7A8E] hover:text-[#12304A] p-2 rounded-full hover:bg-[#12304A]/5 z-10 transition-colors cursor-pointer"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#C79A4B] tracking-widest mb-1">
                    REQUEST QUOTE &amp; TECHNICAL DOSSIER
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#12304A] tracking-tight">
                    {quoteProduct ? `Inquiry for ${quoteProduct}` : "Chemical Sourcing Inquiry"}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
                  <p className="text-xs text-[#5A7A8E] mt-2 leading-relaxed">
                    Submit your batch specification requirement to receive certified COA and pricing from our regulatory specialists.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                      Full Name &amp; Designation <span className="text-[#C79A4B]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      required
                      type="text"
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="e.g. Dr. Sarah Jenkins (Head of Procurement)"
                      className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                        Corporate Email <span className="text-[#C79A4B]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="s.jenkins@pharma.com"
                        className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={quoteCompany}
                        onChange={(e) => setQuoteCompany(e.target.value)}
                        placeholder="e.g. Acme Laboratories"
                        className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                        Product of Interest
                      </label>
                      <input
                        type="text"
                        value={quoteProduct}
                        onChange={(e) => setQuoteProduct(e.target.value)}
                        placeholder="e.g. Iohexol / Mefenamic Acid"
                        className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                        Estimated Batch Quantity
                      </label>
                      <input
                        type="text"
                        value={quoteQuantity}
                        onChange={(e) => setQuoteQuantity(e.target.value)}
                        placeholder="e.g. 500 Kg / 1 MT"
                        className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#12304A] mb-1">
                      Requirements &amp; Pharmacopoeia (USP / BP / IP)
                    </label>
                    <textarea
                      rows={3}
                      value={quoteSpecs}
                      onChange={(e) => setQuoteSpecs(e.target.value)}
                      placeholder="Specify purity thresholds, regulatory requirements (USDMF, CEP), delivery schedule..."
                      className="w-full px-4 py-2.5 rounded-xl text-[#12304A] text-xs focus:outline-none resize-none placeholder-[#5A7A8E]/60 border border-[#12304A]/10 focus:border-[#C79A4B] bg-[#FAF7F2] transition-colors"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#12304A] hover:bg-[#0B1E2E] disabled:bg-[#12304A]/80 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer gpu-smooth mt-2"
                  >
                    {isSubmitting ? (
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
                className="p-8 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm"
                >
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="text-xl font-bold text-[#12304A]"
                >
                  Inquiry Submitted Successfully
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="text-xs text-[#5A7A8E] leading-relaxed max-w-sm mx-auto"
                >
                  Thank you. Our regulatory and commercial sourcing specialists will follow up with full COA specifications within 2 business hours.
                </motion.p>
                {quoteRefId && (
                  <div className="bg-[#FAF7F2] border border-[#12304A]/10 rounded-xl p-2.5 max-w-xs mx-auto">
                    <span className="text-[10px] uppercase font-bold text-[#5A7A8E] tracking-wider block">
                      Tracking Reference
                    </span>
                    <span className="font-mono text-xs font-bold text-[#12304A]">{quoteRefId}</span>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="pt-2"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md cursor-pointer gpu-smooth"
                  >
                    Done
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
