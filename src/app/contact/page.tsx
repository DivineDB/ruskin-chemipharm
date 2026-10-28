"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { HexIcon } from "../components/Hex";
import SectionHeader from "../components/SectionHeader";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Send,
  MessageCircle,
  Loader2,
  ShieldCheck,
  Building2,
  Navigation,
} from "lucide-react";

export default function ContactPage() {
  // Simple Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Copy Feedback State
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRefId = `RUS-${randomNum}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setReferenceId(newRefId);
      setFormSubmitted(true);
    }, 550);
  };

  const resetForm = () => {
    setFormSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
    setReferenceId("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-14">
          
          {/* ─── 1. SECTION HEADER (MANDATORY 4-PART RULE WITH LUXURY SCROLL-REVEAL) ─── */}
          <SectionHeader
            as="h1"
            eyebrow="Get In Touch"
            lead="Connect with Our"
            highlight="Commercial Desk"
            description="Direct access to Ruskin Chemipharm's Mumbai headquarters. Send your API requirements, regulatory dossier inquiries, or custom synthesis specifications below."
          />

          {/* ─── 2. BALANCED 2-COLUMN MAIN MODULE (EQUAL HEIGHT, CLEAN ARCHITECTURE) ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* ── LEFT COLUMN: MUMBAI HEADQUARTERS & MAP (LOCKED TO LIGHT THEME) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 bg-white text-[#12304A] rounded-[24px] sm:rounded-[28px] border border-[#12304A]/10 p-7 sm:p-8 lg:p-9 shadow-[0_12px_45px_rgb(18,48,74,0.06)] flex flex-col justify-between"
            >
              <div className="space-y-5 sm:space-y-6">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#12304A]/8">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#12304A] tracking-tight flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C79A4B]" />
                      Mumbai Corporate Office
                    </h2>
                    <p className="text-xs text-[#5A7A8E] mt-0.5">
                      Commercial Sourcing &amp; Regulatory Liaison
                    </p>
                  </div>
                  
                  <span className="text-[11px] font-bold text-[#C79A4B] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#12304A]/10 shrink-0">
                    Est. 1984
                  </span>
                </div>

                {/* Simplified Physical Location */}
                <div className="flex items-start gap-3.5">
                  <HexIcon size={28} bg="#C79A4B" className="text-white mt-0.5 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </HexIcon>
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm leading-relaxed font-medium text-[#12304A]">
                      4/A, Bhangwadi Shopping Arcade, Kalbadevi Road, Marine Lines East, Mumbai – 400 002, Maharashtra, India.
                    </p>
                    <div className="flex items-center gap-3 text-xs pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            "4/A, Bhangwadi Shopping Arcade, Kalbadevi Road, Mumbai – 400 002, Maharashtra, India",
                            "address"
                          )
                        }
                        className="inline-flex items-center gap-1 font-semibold text-[#C79A4B] hover:text-[#12304A] transition-colors cursor-pointer"
                      >
                        {copiedField === "address" ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>
                      <span className="opacity-30 text-[#12304A]">·</span>
                      <a
                        href="https://maps.google.com/?q=Bhangwadi+Shopping+Arcade+Kalbadevi+Road+Mumbai+400002"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#C79A4B] hover:text-[#12304A] transition-colors"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Clean, Simple Map Iframe with bottom attribution clipped */}
                <div className="relative w-full h-[240px] sm:h-[260px] rounded-2xl overflow-hidden border border-[#12304A]/10 shadow-inner bg-slate-100">
                  <iframe
                    title="Ruskin Chemipharm Headquarters Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.8210%2C18.9370%2C72.8340%2C18.9485&amp;layer=mapnik&amp;marker=18.9427%2C72.8274"
                    className="w-full h-[calc(100%+42px)] border-0"
                    loading="lazy"
                  />
                  
                  {/* Subtle Map Overlay Badge — placed top-left to avoid OSM zoom controls on top-right */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#12304A] px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-xs border border-[#12304A]/10 flex items-center gap-1.5 pointer-events-none">
                    <Navigation className="w-3 h-3 text-[#C79A4B]" />
                    <span>Kalbadevi / Marine Lines</span>
                  </div>
                </div>

                {/* Streamlined Proximity Transit Strip */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center text-xs pt-1">
                  <div className="rounded-xl p-3 border bg-[#FAF7F2] border-[#12304A]/8 text-[#5A7A8E]">
                    <div className="font-bold text-xs sm:text-sm text-[#C79A4B]">650 m</div>
                    <div className="text-[10px] mt-0.5">Marine Lines</div>
                  </div>
                  <div className="rounded-xl p-3 border bg-[#FAF7F2] border-[#12304A]/8 text-[#5A7A8E]">
                    <div className="font-bold text-xs sm:text-sm text-[#C79A4B]">1.8 km</div>
                    <div className="text-[10px] mt-0.5">CSMT Station</div>
                  </div>
                  <div className="rounded-xl p-3 border bg-[#FAF7F2] border-[#12304A]/8 text-[#5A7A8E]">
                    <div className="font-bold text-xs sm:text-sm text-[#C79A4B]">21 km</div>
                    <div className="text-[10px] mt-0.5">BOM Air Cargo</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: INQUIRY FORM (LOCKED TO NAVY THEME) ── */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-[#0B1E2E] text-white rounded-[24px] sm:rounded-[28px] border border-white/10 p-7 sm:p-9 lg:p-10 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="space-y-1.5 pb-5 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    Send an Inquiry
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    Complete the form below. Our team will review your chemical requirements and respond within 4 business hours.
                  </p>
                </div>

                {/* Form Content / Success Confirmation */}
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="inquiry-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="mt-6 space-y-4 sm:space-y-5"
                    >
                      {/* Row 1: Full Name & Work Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold mb-1.5 text-slate-200">
                            Full Name <span className="text-[#C79A4B]">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Dr. Rajesh Mehta"
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:bg-white/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-xs sm:text-[13px] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1.5 text-slate-200">
                            Work Email <span className="text-[#C79A4B]">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="r.mehta@pharmalabs.com"
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:bg-white/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-xs sm:text-[13px] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 2: Company & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label className="block text-xs font-bold mb-1.5 text-slate-200">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Formulations Ltd."
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:bg-white/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-xs sm:text-[13px] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1.5 text-slate-200">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98... / +1..."
                            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:bg-white/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-xs sm:text-[13px] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Row 3: Message / Scope */}
                      <div>
                        <label className="block text-xs font-bold mb-1.5 text-slate-200">
                          Requirements &amp; Specifications <span className="text-[#C79A4B]">*</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Specify target molecule, CAS #, estimated volumes, pharmacopoeial standard (USP/BP/EP/IP), or required documentation..."
                          className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:bg-white/10 focus:border-[#C79A4B] rounded-xl px-4 py-3 text-xs sm:text-[13px] focus:outline-none resize-none transition-colors leading-relaxed"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C79A4B] hover:bg-[#B58A3E] text-white font-bold py-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 group"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2.5">
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Routing to Mumbai Desk...</span>
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-white" />
                            <span>Send Commercial Inquiry</span>
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-xs text-center pt-1.5 text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C79A4B]" />
                        <span>Protected under pharmaceutical client confidentiality. No third-party data sharing.</span>
                      </div>
                    </motion.form>
                  ) : (
                    /* ── SUCCESS STATE CARD ── */
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 350 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                      </div>

                      <div className="space-y-1.5 max-w-md mx-auto">
                        <h3 className="text-xl font-extrabold text-white">
                          Inquiry Received
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Thank you, <strong className="text-white">{fullName || "Partner"}</strong>. Your technical inquiry has been assigned to our Mumbai Commercial &amp; Regulatory Desk.
                        </p>
                      </div>

                      {/* Reference ID Pill */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 max-w-sm mx-auto text-left space-y-1 shadow-xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">Tracking Reference:</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(referenceId, "refId")}
                            className="inline-flex items-center gap-1 text-[#C79A4B] font-bold hover:underline cursor-pointer"
                          >
                            {copiedField === "refId" ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="font-mono text-sm font-bold text-white bg-[#12304A] px-3 py-1.5 rounded-lg border border-white/10">
                          {referenceId}
                        </div>
                      </div>

                      {/* WhatsApp Follow-up & Reset */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={`https://wa.me/919322226307?text=${encodeURIComponent(
                            `Hello Ruskin Chemipharm Desk, I submitted an inquiry with Reference ID: ${referenceId}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Instant WhatsApp Follow-up</span>
                        </a>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white text-xs font-bold hover:bg-white/20 transition-colors cursor-pointer"
                        >
                          <span>Submit Another Inquiry</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>

          {/* ─── 3. SIMPLIFIED QUICK-CONTACT CARDS (AIRY & CLEAN BELOW MAIN SECTION) ─── */}
          <div className="pt-2 sm:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              
              {/* Card 1: Reception PBX */}
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                href="tel:+912222059494"
                className="bg-white rounded-2xl p-5 border border-[#12304A]/10 hover:border-[#C79A4B]/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 flex items-center gap-4 group cursor-pointer"
              >
                <HexIcon size={34} bg="#C79A4B" className="text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </HexIcon>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
                    Reception &amp; PBX
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors truncate">
                    +91 22 22059494
                  </div>
                  <div className="text-[11px] text-[#5A7A8E]">
                    Alt: +91 9322226307
                  </div>
                </div>
              </motion.a>

              {/* Card 2: Commercial Email */}
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                href="mailto:sales@ruskinchemipharm.in"
                className="bg-white rounded-2xl p-5 border border-[#12304A]/10 hover:border-[#C79A4B]/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 flex items-center gap-4 group cursor-pointer"
              >
                <HexIcon size={34} bg="#C79A4B" className="text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </HexIcon>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
                    Commercial Email
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors truncate">
                    sales@ruskinchemipharm.in
                  </div>
                  <div className="text-[11px] text-[#5A7A8E]">
                    Quotations &amp; Dossiers
                  </div>
                </div>
              </motion.a>

              {/* Card 3: Working Hours & SLA */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-5 border border-[#12304A]/10 hover:border-[#C79A4B]/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200 flex items-center gap-4 cursor-default"
              >
                <HexIcon size={34} bg="#C79A4B" className="text-white shrink-0">
                  <Clock className="w-4 h-4" />
                </HexIcon>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C79A4B]">
                    Working Hours
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#12304A] truncate">
                    Mon–Fri: 9:30 AM – 6:30 PM
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Response SLA: &le; 4 hrs</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: WhatsApp Commercial Desk */}
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                href="https://wa.me/919322226307?text=Hello%20Ruskin%20Chemipharm%20Commercial%20Desk,%20I%20would%20like%20to%20inquire%20about%20API%20sourcing."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-sm transition-[border-color,box-shadow] duration-200 flex items-center gap-4 group bg-gradient-to-br from-white to-emerald-50/20 cursor-pointer"
              >
                <HexIcon size={34} bg="#10B981" className="text-white shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </HexIcon>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    WhatsApp Desk
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#12304A] group-hover:text-emerald-700 transition-colors truncate">
                    +91 9322226307
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">
                    Instant Commercial Chat &rarr;
                  </div>
                </div>
              </motion.a>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer onOpenCatalog={() => (window.location.href = "/products")} />
    </div>
  );
}
