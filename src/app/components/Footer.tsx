"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MolecularDecoration, HEX_CLIP } from "./Hex";

interface FooterProps {
  onOpenCatalog: () => void;
}

export default function Footer({ onOpenCatalog }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#071521] text-white pt-16 pb-10 relative overflow-hidden border-t border-white/10 contain-section">
      {/* Subtle gold molecular deco bottom left */}
      <div className="absolute -bottom-10 -left-12 w-[300px] sm:w-[380px] pointer-events-none select-none opacity-10">
        <MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Top layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start text-left">

          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[260px] shrink-0 space-y-6"
          >
            <div>
              <Image
                src="/images/logo.svg"
                alt="Ruskin Chemipharm Logo"
                width={150}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>

            {/* Tagline with gold right-pill bar */}
            <div
              className="bg-[#C79A4B] rounded-r-full py-3.5 -ml-4 sm:-ml-6 lg:-ml-0"
              style={{ paddingLeft: "16px", paddingRight: "32px" }}
            >
              <p className="text-white leading-snug font-bold text-sm">Precision Chemistry.</p>
              <p className="text-white leading-snug font-normal italic text-sm">Global Standards.</p>
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

            {/* Cert logos */}
            <div className="flex items-center gap-3 flex-wrap opacity-90">
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform">
                <Image src="/images/cert (1).svg" alt="ISO 9001:2015" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-12 w-12 object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform">
                <Image src="/images/cert (2).svg" alt="WHO-GMP" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-12 w-12 object-contain" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} className="transition-transform">
                <Image src="/images/cert (3).svg" alt="ISO 14001" width={48} height={48} style={{ width: "auto", height: "auto" }} className="h-12 w-12 object-contain" />
              </motion.div>
            </div>
          </motion.div>

          {/* Nav Columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">

            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div>
                <h4 className="text-base font-bold text-white">Quick Links</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <button onClick={onOpenCatalog} className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 text-left cursor-pointer inline-block">
                    Products Directory
                  </button>
                </li>
                <li><Link href="/services" className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block">Services</Link></li>
                <li><Link href="/services#regulatory" className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block">Regulatory Specs</Link></li>
                <li><Link href="/about" className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 inline-block">Contact &amp; Offices</Link></li>
              </ul>
            </motion.div>

            {/* Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div>
                <h4 className="text-base font-bold text-white">Compliance</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li><span className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 cursor-pointer inline-block">WHO-GMP</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 cursor-pointer inline-block">ISO 9001:2015</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 cursor-pointer inline-block">CoA Verification</span></li>
                <li><span className="hover:text-[#C79A4B] hover:translate-x-1 transition-all duration-200 cursor-pointer inline-block">Safety Data Sheets</span></li>
              </ul>
            </motion.div>

            {/* Reach Us */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <div>
                <h4 className="text-base font-bold text-white">Reach Us</h4>
                <div className="w-8 h-[2px] bg-[#C79A4B] mt-2 rounded-full" />
              </div>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <div>
                  <p className="font-semibold text-white text-xs">Direct Contacts:</p>
                  <p className="mt-1">
                    Mr. Krishnakumar — <a href="tel:+919322226307" className="text-slate-200 hover:text-[#C79A4B] transition-colors">+91 9322226307</a>
                  </p>
                  <p>
                    Mr. Yash — <a href="tel:+919819826611" className="text-slate-200 hover:text-[#C79A4B] transition-colors">+91 9819826611</a>
                  </p>
                  <p>
                    Mr. Atman — <a href="tel:+919967155543" className="text-slate-200 hover:text-[#C79A4B] transition-colors">+91 9967155543</a>
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white text-xs">Website:</p>
                  <a href="https://www.ruskinchemipharm.in" target="_blank" rel="noopener noreferrer" className="text-[#C79A4B] hover:underline inline-block">
                    www.ruskinchemipharm.in
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
