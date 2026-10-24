"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenQuote?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenQuote }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products");
  const isServices = pathname.startsWith("/services");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const navLinks = [
    { href: "/", label: "Home", active: isHome },
    { href: "/products", label: "Products", active: isProducts },
    { href: "/services", label: "Services", active: isServices },
    { href: "/about", label: "About", active: isAbout },
    { href: "/contact", label: "Contact", active: isContact },
  ];

  const handleQuoteClick = useCallback(() => {
    if (onOpenQuote) {
      onOpenQuote();
      return;
    }
    window.dispatchEvent(new CustomEvent("ruskin:open-quote"));
    if (pathname === "/contact") {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onOpenQuote, pathname]);

  const handleSearchClick = useCallback(() => {
    if (onOpenSearch) {
      onOpenSearch();
      return;
    }
    window.dispatchEvent(new CustomEvent("ruskin:open-search"));
  }, [onOpenSearch]);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 15;
          if (next !== lastScrolled) {
            lastScrolled = next;
            setScrolled(next);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Global Ctrl+K / Cmd+K Search Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleSearchClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSearchClick]);

  return (
    <header
      className={`sticky top-0 z-50 h-[72px] sm:h-[76px] flex items-center transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_25px_-5px_rgba(18,48,74,0.08)] border-b border-[#12304A]/10"
          : isHome
          ? "bg-[#FAF7F2]/90 backdrop-blur-sm border-b border-[#12304A]/6"
          : "bg-white/90 backdrop-blur-sm border-b border-[#12304A]/6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">

        {/* Logo */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Ruskin Chemipharm Logo"
              width={110}
              height={30}
              priority
              loading="eager"
              style={{ width: "auto", height: "auto" }}
              className="h-[21px] sm:h-[23px] w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop nav with layoutId spring-physics continuous active underline */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 relative py-2">
          {navLinks.map((link) => {
            const isCurrentActive = link.active;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 select-none ${
                  isCurrentActive
                    ? "text-[#12304A]"
                    : "text-[#5A7A8E] hover:text-[#12304A]"
                }`}
              >
                <span>{link.label}</span>
                {isCurrentActive && (
                  <div className="absolute -bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#C79A4B] rounded-full pointer-events-none" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions — shifted inward to the left */}
        <div className="flex items-center gap-3 mr-3 sm:mr-6 lg:mr-8">
          {/* Search Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearchClick}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#12304A] hover:text-[#C79A4B] bg-[#12304A]/5 hover:bg-[#C79A4B]/10 border border-[#12304A]/8 hover:border-[#C79A4B]/40 transition-[color,background-color,border-color] duration-200 shadow-xs cursor-pointer gpu-smooth"
            title="Search Catalog (Ctrl+K)"
            aria-label="Search Catalog"
          >
            <Search className="w-4 h-4 stroke-[2.2]" />
          </motion.button>

          {/* Request Quote */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleQuoteClick}
            className="hidden sm:flex items-center justify-center bg-[#12304A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0B1E2E] transition-colors shadow-sm cursor-pointer gpu-smooth"
          >
            Request Quote
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#12304A] rounded-lg hover:bg-[#12304A]/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-[#12304A]/10 bg-white/98 backdrop-blur-lg shadow-xl"
          >
            <div className="px-5 py-4 space-y-2">
              {/* Mobile Quick Search Bar */}
              <div className="pb-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSearchClick();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#12304A]/10 text-xs font-semibold text-[#5A7A8E] hover:border-[#C79A4B]/40 transition-colors"
                >
                  <Search className="w-4 h-4 text-[#C79A4B]" />
                  <span>Search 46+ DCGI APIs &amp; CAS...</span>
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors min-h-[46px] ${
                    link.active
                      ? "bg-[#12304A] text-white shadow-sm"
                      : "text-[#12304A] hover:bg-[#12304A]/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.active && <span className="w-2 h-2 rounded-full bg-[#C79A4B]" />}
                </Link>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    if (onOpenQuote) onOpenQuote();
                    else window.location.href = "/#contact";
                  }}
                  className="w-full bg-[#C79A4B] hover:bg-[#B58A3E] text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Commercial Quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
