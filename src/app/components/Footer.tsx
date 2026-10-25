"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MolecularDecoration, FloatingHex, HEX_CLIP } from "./Hex";

interface FooterProps {
  onOpenCatalog: () => void;
}

export default function Footer({ onOpenCatalog }: FooterProps) {
  // ─── Subtle Banner Cursor Parallax Tracking (Zero React Re-renders, 120 FPS GPU) ───
  const footerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth, high damping spring for liquid subtle response
  const springConfig = { damping: 36, stiffness: 65, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Micro-amplitude parallax translations (identical physics to Product page banner)
  const layerDeepX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const layerDeepY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const layerMidX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const layerMidY = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  const layerForeX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const layerForeY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Dedicated watermark cursor parallax (lively, noticeable response to mouse movement)
  const watermarkX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const watermarkY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const watermarkRotate = useTransform(smoothX, [-0.5, 0.5], [-3.5, 3.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-[#071521] text-white pt-16 pb-10 relative overflow-hidden border-t border-white/10 contain-section"
    >
      {/* ── Live Floating Hex & Molecular Lattice Background (Interactive Cursor Parallax) ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Layer 1: Scaled-down Big Molecular Cluster with Deep Layer Parallax & Tilt */}
        <motion.div
          style={{ x: layerDeepX, y: layerDeepY }}
          className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-[160px] sm:w-[200px] lg:w-[240px] will-change-transform"
        >
          <div className="animate-float-tilt-1">
            <MolecularDecoration color="#C79A4B" opacity={0.16} className="w-full h-auto" />
          </div>
        </motion.div>

        {/* Layer 2: Micro-Hex 1: Delicate Gold Ring with Inner Atom (Mid-Left Float) */}
        <motion.div
          style={{ x: layerForeX, y: layerForeY }}
          className="absolute bottom-28 left-[17%] sm:left-[21%] hidden sm:block will-change-transform"
        >
          <div className="animate-float-hex-1">
            <FloatingHex size={24} color="#C79A4B" opacity={0.28} strokeWidth={1.2} hasInner hasDot />
          </div>
        </motion.div>

        {/* Layer 3: Micro-Hex 2: Delicate Ice-White Hexagon (Upper-Mid Left Float) */}
        <motion.div
          style={{ x: layerMidX, y: layerMidY }}
          className="absolute bottom-40 left-[8%] sm:left-[11%] hidden md:block will-change-transform"
        >
          <div className="animate-float-hex-2" style={{ animationDelay: "-3s" }}>
            <FloatingHex size={20} color="#FFFFFF" opacity={0.18} strokeWidth={1} />
          </div>
        </motion.div>

        {/* Layer 4: Micro-Hex 3: Delicate Small Gold Hexagon (Ground Accent Float) */}
        <motion.div
          style={{ x: layerDeepX, y: layerDeepY }}
          className="absolute bottom-12 left-[27%] sm:left-[30%] hidden lg:block will-change-transform"
        >
          <div className="animate-float-tilt-2" style={{ animationDelay: "-5s" }}>
            <FloatingHex size={16} color="#C79A4B" opacity={0.22} strokeWidth={1} />
          </div>
        </motion.div>

        {/* Ruskin emblem watermark positioned elegantly above bottom bar and reacting to cursor parallax */}
        <motion.div
          style={{ x: watermarkX, y: watermarkY, rotate: watermarkRotate }}
          className="absolute bottom-14 sm:bottom-16 lg:bottom-20 right-8 sm:right-12 lg:right-20 w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 pointer-events-none select-none will-change-transform opacity-[0.045]"
        >
          <Image
            src="/logoonly.svg"
            alt="Ruskin Chemipharm Emblem"
            width={176}
            height={176}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Top layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start text-left">

          {/* Brand Column — aligned with Quick Links title */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[260px] shrink-0 space-y-7"
          >
            <div className="-mt-3.5 sm:-mt-4 lg:-mt-[18px]">
              <Image
                src="/logolong.svg"
                alt="Ruskin Chemipharm Logo"
                width={220}
                height={68}
                className="h-12 sm:h-14 lg:h-[56px] w-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Contact info with hex icons */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start group">
                <div
                  className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
                  style={{ clipPath: HEX_CLIP }}
                >
                  <span className="w-2 h-2.5 bg-white" style={{ clipPath: HEX_CLIP }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Mumbai, India</p>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    4/A, Bhangwadi Shopping Arcade,
                    <br />
                    Kalbadevi Road, Mumbai – 400 002.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start group">
                <div
                  className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
                  style={{ clipPath: HEX_CLIP }}
                >
                  <span className="w-2 h-2.5 bg-white" style={{ clipPath: HEX_CLIP }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Phone</p>
                  <div className="flex flex-col text-xs text-slate-300 mt-0.5 leading-relaxed">
                    <a href="tel:+912222059494" className="hover:text-[#C79A4B] transition-colors py-0.5">+91 22 22059494</a>
                    <a href="tel:+912222068330" className="hover:text-[#C79A4B] transition-colors py-0.5">+91 22 22068330</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start group">
                <div
                  className="w-7 h-8 flex-shrink-0 flex items-center justify-center mt-0.5 bg-[#C79A4B] shadow-sm group-hover:scale-105 transition-transform"
                  style={{ clipPath: HEX_CLIP }}
                >
                  <span className="w-2 h-2.5 bg-white" style={{ clipPath: HEX_CLIP }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <div className="flex flex-col text-xs text-slate-300 mt-0.5 leading-relaxed">
                    <a href="mailto:sourcing@ruskinchemipharm.in" className="hover:text-[#C79A4B] transition-colors py-0.5">sourcing@ruskinchemipharm.in</a>
                    <a href="mailto:sales@ruskinchemipharm.in" className="hover:text-[#C79A4B] transition-colors py-0.5">sales@ruskinchemipharm.in</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Cert logos without box containers */}
            <div className="flex items-center gap-4 flex-wrap pt-2 opacity-85 hover:opacity-100 transition-opacity">
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform cursor-pointer">
                <Image src="/images/cert (1).svg" alt="ISO 9001:2015" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-11 w-auto object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform cursor-pointer">
                <Image src="/images/cert (2).svg" alt="WHO-GMP" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-11 w-auto object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform cursor-pointer">
                <Image src="/images/cert (3).svg" alt="ISO 14001" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-11 w-auto object-contain" />
              </motion.div>
            </div>
          </motion.div>

          {/* Nav Columns: 4 well-balanced columns filling the full width */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button onClick={onOpenCatalog} className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 text-left cursor-pointer inline-block">
                    Products Directory
                  </button>
                </li>
                <li><Link href="/services" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Services</Link></li>
                <li><Link href="/services#regulatory" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Regulatory Specs</Link></li>
                <li><Link href="/about" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Contact &amp; Offices</Link></li>
              </ul>
            </motion.div>

            {/* API Portfolios */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Key Portfolios</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li><Link href="/products?category=Cardiovascular" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Cardiovascular APIs</Link></li>
                <li><Link href="/products?category=Anti-Infective" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Anti-Infectives</Link></li>
                <li><Link href="/products?category=Anti-Diabetic" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Anti-Diabetic Agents</Link></li>
                <li><Link href="/products?category=CNS%20Agents" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">CNS &amp; Neuro Chemistry</Link></li>
                <li><Link href="/products?category=Gastrointestinal" className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 inline-block">Gastrointestinal APIs</Link></li>
              </ul>
            </motion.div>

            {/* Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Compliance</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li><span className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 cursor-pointer inline-block">WHO-GMP Standard</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 cursor-pointer inline-block">ISO 9001:2015 Audit</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 cursor-pointer inline-block">CoA &amp; TDS Verification</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 cursor-pointer inline-block">Safety Data Sheets (SDS)</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-0.5 transition-all duration-200 cursor-pointer inline-block">US-DMF / CEP Dossiers</span></li>
              </ul>
            </motion.div>

            {/* Reach Us */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Reach Us</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-400 text-[11px] uppercase tracking-wide mb-1">Direct Contacts</p>
                  <div className="space-y-1">
                    <p>
                      <span className="text-slate-400">Krishnakumar:</span>{" "}
                      <a href="tel:+919322226307" className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium">+91 93222 26307</a>
                    </p>
                    <p>
                      <span className="text-slate-400">Yash:</span>{" "}
                      <a href="tel:+919819826611" className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium">+91 98198 26611</a>
                    </p>
                    <p>
                      <span className="text-slate-400">Atman:</span>{" "}
                      <a href="tel:+919967155543" className="text-slate-200 hover:text-[#C79A4B] transition-colors font-medium">+91 99671 55543</a>
                    </p>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-slate-400 text-[11px] uppercase tracking-wide mb-1">Official Portal</p>
                  <a href="https://www.ruskinchemipharm.in" target="_blank" rel="noopener noreferrer" className="text-[#C79A4B] hover:text-[#E5C378] text-xs font-semibold hover:underline inline-flex items-center gap-1 transition-colors">
                    <span>www.ruskinchemipharm.in</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="space-y-1">
            <p className="font-bold text-slate-200 text-sm">Ruskin Chemipharm · Est. 1984 · Mumbai, India</p>
            <p>&copy; {new Date().getFullYear()} Ruskin Chemipharm. All rights reserved.</p>
            <p className="text-[10px] text-slate-400 max-w-2xl leading-normal">
              Disclaimer: API/Substances covered by patent are not offered to countries where patent law is in force. Final responsibility lies with the customer.
            </p>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-medium shrink-0">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            <span className="text-slate-600">·</span>
            <span className="hover:text-white cursor-pointer transition-colors">FAQ</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
