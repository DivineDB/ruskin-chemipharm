"use client";

import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { MolecularDecoration, HEX_CLIP } from "./Hex";

interface CtaBannerProps {
  onRequestQuote: () => void;
}

export default function CtaBanner({ onRequestQuote }: CtaBannerProps) {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden contain-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative bg-[#0B1E2E] border border-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl"
        >
          {/* Subtle gold molecular decoration with gentle floating micro-animation */}
          <div
            className="animate-float-gentle-slow absolute top-0 right-0 w-[280px] sm:w-[360px] pointer-events-none translate-x-8 -translate-y-6 select-none opacity-10 gpu-smooth"
          >
            <MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
          </div>

          {/* Floating subtle geometric hex accent */}
          <div
            className="animate-hex-rotate-float absolute bottom-6 right-1/4 w-8 h-9 border border-[#C79A4B]/20 pointer-events-none hidden lg:block opacity-40 gpu-smooth"
            style={{ clipPath: HEX_CLIP }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              {/* Gold certification pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C79A4B]/15 border border-[#C79A4B]/30 text-[#C79A4B] text-xs font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B] animate-pulse" />
                <ShieldCheck className="w-3.5 h-3.5" />
                cGMP &amp; ISO 9001:2015 Certified
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Ready to Secure High-Purity<br className="hidden sm:inline" /> APIs &amp; Intermediates?
                </h2>
                <div className="w-14 h-[2.5px] rounded-full bg-[#C79A4B]" />
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-lg">
                Request custom pricing, COA verification, or schedule a technical consultation with our team.
              </p>
            </div>

            {/* Primary Action CTA — neatly spaced */}
            <div className="shrink-0 pt-2 lg:pt-0 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestQuote}
                className="flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-8 py-4 rounded-full text-sm font-bold transition-colors shadow-lg shadow-[#C79A4B]/25 group w-full sm:w-auto cursor-pointer"
              >
                <span>Request API Quote</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[2.5] duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
