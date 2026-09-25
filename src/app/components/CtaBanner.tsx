"use client";

import { ShieldCheck, ArrowUpRight, Download } from "lucide-react";

interface CtaBannerProps {
  onRequestQuote: () => void;
  onDownloadPdf: () => void;
}

export default function CtaBanner({ onRequestQuote, onDownloadPdf }: CtaBannerProps) {
  return (
    <section className="py-16 bg-[#12304A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div className="bg-[#0F2336] border border-white/10 rounded-[28px] sm:rounded-[36px] p-10 sm:p-14 relative overflow-hidden">

          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#C79A4B]/8 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#147D82]/8 blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 space-y-8 max-w-3xl">

            {/* Gold certification pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C79A4B]/15 border border-[#C79A4B]/35 text-[#C79A4B] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              cGMP &amp; ISO 9001:2015 CERTIFIED
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="heading-section">
                Ready to Secure High-Purity APIs &amp; Intermediates?
              </h2>
              <p className="text-sm sm:text-base text-slate-300/90 font-normal leading-relaxed max-w-2xl">
                Request custom pricing, COA verification, or schedule a technical consultation with our team.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={onRequestQuote}
                className="btn-text bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-3.5 rounded-full text-sm flex items-center gap-2.5 transition-all group transform-gpu active:scale-95"
              >
                <span>Request API Quote</span>
                <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
              </button>

              <button
                onClick={onDownloadPdf}
                className="btn-text bg-[#147D82] hover:bg-[#10686C] text-white px-8 py-3.5 rounded-full text-sm flex items-center gap-2.5 transition-all group transform-gpu active:scale-95"
              >
                <span>Download Product Catalog (PDF)</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
