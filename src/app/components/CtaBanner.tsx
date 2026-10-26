"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface CtaBannerProps {
  onRequestQuote: () => void;
}

export default function CtaBanner({ onRequestQuote }: CtaBannerProps) {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative bg-[#0B1E2E] border border-white/10 rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl"
        >
          {/* Large subtle Ruskin logo-only emblem watermark on the right */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-8 w-52 h-52 sm:w-72 sm:h-72 pointer-events-none select-none opacity-[0.04]">
            <Image
              src="/logoonly.svg"
              alt="Ruskin Chemipharm Emblem"
              width={288}
              height={288}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-left">

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

            {/* Primary Action CTA — solid clean button without glow */}
            <div className="shrink-0 pt-2 lg:pt-0 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRequestQuote}
                className="flex items-center justify-center gap-2.5 bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-full text-sm font-bold transition-colors group w-full sm:w-auto cursor-pointer"
              >
                <span>Request API Quote</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5] duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
