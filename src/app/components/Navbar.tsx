"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useScrollLock } from "@/lib/scrollLock";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenQuote?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenQuote }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Freeze background scroll when mobile menu is open
  useScrollLock(mobileOpen);

  const isHome = pathname === "/";
  const isProducts = pathname === "/products";
  const isFormulations =
    pathname.startsWith("/formulations") ||
    pathname.startsWith("/finished-formulations");
  const isServices = pathname.startsWith("/services");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const navLinks = [
    {
      id: "home",
      href: "/",
      label: "Home",
      subtitle: "Overview & Sourcing Hub",
      active: isHome,
    },
    {
      id: "products",
      href: "/products",
      label: "Products",
      subtitle: "46+ DCGI APIs & Intermediates",
      active: isProducts,
    },
    {
      id: "formulations",
      href: "/formulations",
      label: "Formulations",
      subtitle: "Finished Formulations & Therapeutic Divisions",
      active: isFormulations,
      badge: "New",
    },
    {
      id: "services",
      href: "/services",
      label: "Services",
      subtitle: "CDMO & Regulatory Dossiers",
      active: isServices,
    },
    {
      id: "about",
      href: "/about",
      label: "About",
      subtitle: "40+ Years Heritage & Credibility",
      active: isAbout,
    },
    {
      id: "contact",
      href: "/contact",
      label: "Contact",
      subtitle: "Direct Inquiries & Support",
      active: isContact,
    },
  ];

  const currentActiveKey = navLinks.find((link) => link.active)?.id || "home";
  const [activeTab, setActiveTab] = useState(currentActiveKey);
  const navRef = useRef<HTMLElement>(null);
  const labelRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [indicator, setIndicator] = useState<{ x: number; width: number; top: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const updateIndicator = useCallback((targetTab?: string) => {
    const tabToUse = targetTab || activeTab;
    const labelEl = labelRefs.current[tabToUse];
    const navEl = navRef.current;
    if (labelEl && navEl) {
      const labelRect = labelEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      setIndicator({
        x: labelRect.left - navRect.left,
        width: labelRect.width,
        top: navRect.height - 2,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(currentActiveKey);
  }, [currentActiveKey]);

  useEffect(() => {
    setIsMounted(true);
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  const handleQuoteClick = useCallback(() => {
    if (onOpenQuote) {
      onOpenQuote();
      return;
    }
    window.dispatchEvent(new CustomEvent("ruskin:open-quote"));
  }, [onOpenQuote]);

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

    const onScrollPosition = (currentY: number) => {
      const next = currentY > 15;
      if (next !== lastScrolled) {
        lastScrolled = next;
        setScrolled(next);
      }
    };

    // Synchronize with Lenis if active, otherwise native scroll
    const lenis = (window as any).__lenis;
    if (lenis) {
      const handleLenisScroll = (e: any) => {
        onScrollPosition(e.scroll);
      };
      lenis.on("scroll", handleLenisScroll);
      return () => {
        lenis.off("scroll", handleLenisScroll);
      };
    } else {
      const handleNativeScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            onScrollPosition(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };
      handleNativeScroll();
      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleNativeScroll);
    }
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
      className={`sticky top-0 z-50 w-full backdrop-blur-md will-change-[background-color,border-color,box-shadow] transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled || mobileOpen
          ? "bg-white/95 shadow-[0_4px_25px_-5px_rgba(18,48,74,0.08)] border-b border-[#12304A]/10"
          : isHome
          ? "bg-[#FAF7F2]/90 border-b border-[#12304A]/6"
          : "bg-white/90 border-b border-[#12304A]/6"
      }`}
    >
      {/* Top Navbar Row */}
      <div className="h-[72px] sm:h-[76px] flex items-center w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#C79A4B] rounded-lg shrink-0"
            aria-label="Ruskin Chemipharm Home"
          >
            <Image
              src="/logoline.svg"
              alt="Ruskin Chemipharm Logo"
              width={240}
              height={42}
              priority
              loading="eager"
              className="h-[30px] sm:h-[36px] lg:h-[40px] w-auto object-contain"
            />
          </Link>

          {/* Desktop nav with physics-aware continuous active underline */}
          <LayoutGroup id="desktop-nav">
            <nav ref={navRef} className="hidden lg:flex items-center space-x-1 xl:space-x-2.5 relative py-2">
              {navLinks.map((link) => {
                const linkKey = link.id || link.href;
                const isCurrentActive = activeTab === linkKey;

                return (
                  <Link
                    key={linkKey}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(linkKey);
                      updateIndicator(linkKey);
                    }}
                    className={`relative px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold transition-colors duration-150 select-none whitespace-nowrap inline-flex items-center gap-1.5 ${
                      isCurrentActive
                        ? "text-[#12304A]"
                        : "text-[#5A7A8E] hover:text-[#12304A]"
                    }`}
                  >
                    <span
                      ref={(el) => {
                        labelRefs.current[linkKey] = el;
                      }}
                      className="relative inline-block"
                    >
                      {link.label}
                      {!isMounted && isCurrentActive && (
                        <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#C79A4B] rounded-full pointer-events-none" />
                      )}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 leading-none shadow-xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Persistent physics-aware underline */}
              {isMounted && indicator && (
                <motion.div
                  className="absolute left-0 h-[2px] bg-[#C79A4B] rounded-full pointer-events-none"
                  style={{ top: indicator.top }}
                  initial={false}
                  animate={{
                    x: indicator.x,
                    width: indicator.width,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}
            </nav>
          </LayoutGroup>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
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

            {/* Request Quote - Desktop & Tablet */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleQuoteClick}
              className="hidden sm:flex items-center justify-center bg-[#12304A] text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold hover:bg-[#0B1E2E] transition-colors shadow-sm cursor-pointer gpu-smooth"
            >
              Request Quote
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                mobileOpen
                  ? "bg-[#12304A] text-white shadow-sm"
                  : "bg-[#12304A]/5 text-[#12304A] hover:bg-[#C79A4B]/10 hover:text-[#C79A4B] border border-[#12304A]/8"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-x-0 bottom-0 top-[72px] sm:top-[76px] bg-[#071521]/40 backdrop-blur-xs z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden relative z-50 overflow-hidden border-t border-[#12304A]/10 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto"
          >
            <div className="px-4 sm:px-6 py-4 space-y-3">
              {/* Brand Eyebrow strip */}
              <div className="flex items-center gap-2 pb-2.5 pt-0.5 border-b border-[#12304A]/8">
                <Image
                  src="/logoonly-navy.svg"
                  alt="Ruskin"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs font-bold text-[#12304A] tracking-wider uppercase">
                  Navigation
                </span>
              </div>

              {/* Mobile Quick Search Bar */}
              <div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSearchClick();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#12304A]/10 text-xs font-semibold text-[#5A7A8E] hover:border-[#C79A4B]/40 active:bg-white transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-[#C79A4B] shrink-0" />
                  <span className="truncate">Search 46+ DCGI APIs &amp; CAS...</span>
                </button>
              </div>

              {/* Nav links list */}
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  return (
                    <Link
                      key={link.id || link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 ${
                        link.active
                          ? "bg-[#12304A] text-white shadow-sm"
                          : "text-[#12304A] hover:bg-[#FAF7F2] active:bg-[#12304A]/5"
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${
                              link.active ? "text-white" : "text-[#12304A]"
                            }`}
                          >
                            {link.label}
                          </span>
                          {link.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 leading-none shadow-xs">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[11px] ${
                            link.active ? "text-slate-300" : "text-[#5A7A8E]"
                          }`}
                        >
                          {link.subtitle}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          link.active ? "text-white/80" : "text-[#94A3B8]"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="pt-2 pb-1">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleQuoteClick();
                  }}
                  className="w-full bg-gradient-to-r from-[#C79A4B] to-[#B58A3E] hover:from-[#B58A3E] hover:to-[#A37B34] text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Request Commercial Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
