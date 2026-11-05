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
  ChevronDown,
  ArrowRight,
  Pill,
  HeartPulse,
  Layers,
  FlaskConical,
  Brain,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useScrollLock } from "@/lib/scrollLock";

const INDUSTRY_CATEGORIES = [
  {
    name: "Pharma",
    href: "/products?category=Pharma",
    count: "18+ APIs",
    subtitle: "Contrast Media, Anesthetics & Oncology",
    icon: Pill,
  },
  {
    name: "Animal Care",
    href: "/products?category=Animal%20Care",
    count: "8+ Actives",
    subtitle: "Veterinary Actives & Herd Health",
    icon: HeartPulse,
  },
  {
    name: "Excipients",
    href: "/products?category=Excipients",
    count: "6+ Polymers",
    subtitle: "Binders, Disintegrants & Polymers",
    icon: Layers,
  },
  {
    name: "Food & Nutrition",
    href: "/products?category=Food%20%26%20Nutrition",
    count: "8+ Nutrients",
    subtitle: "CoQ10, Nutrients & Dietary Vitamins",
    icon: FlaskConical,
  },
  {
    name: "Nootropics",
    href: "/products?category=Nootropics",
    count: "6+ Actives",
    subtitle: "Cognitive Enhancers & Neuro-Actives",
    icon: Brain,
  },
];

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
  const isServices = pathname.startsWith("/services");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const industriesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const industriesDropdownRef = useRef<HTMLDivElement>(null);

  const handleIndustriesMouseEnter = () => {
    if (industriesTimerRef.current) clearTimeout(industriesTimerRef.current);
    setIndustriesOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    industriesTimerRef.current = setTimeout(() => {
      setIndustriesOpen(false);
    }, 220);
  };

  const handleIndustrySelect = (catName: string) => {
    setIndustriesOpen(false);
    if (pathname === "/products") {
      window.dispatchEvent(
        new CustomEvent("ruskin:select-category", {
          detail: { category: catName },
        })
      );
    }
  };

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        industriesDropdownRef.current &&
        !industriesDropdownRef.current.contains(e.target as Node)
      ) {
        setIndustriesOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { id: "home", href: "/", label: "Home", subtitle: "Overview & Sourcing Hub", active: isHome },
    { id: "products", href: "/products", label: "Products", subtitle: "46+ DCGI APIs & Intermediates", active: isProducts },
    { id: "industries", href: "/products", label: "Industries", subtitle: "5 Therapeutic Segments", isDropdown: true, active: false },
    { id: "services", href: "/services", label: "Services", subtitle: "CDMO & Regulatory Dossiers", active: isServices },
    { id: "about", href: "/about", label: "About", subtitle: "40+ Years Heritage & Credibility", active: isAbout },
    { id: "contact", href: "/contact", label: "Contact", subtitle: "Direct Inquiries & Support", active: isContact },
  ];

  const currentActiveKey = navLinks.find((link) => link.active)?.id || "home";
  const [activeTab, setActiveTab] = useState(currentActiveKey);
  const linkRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [indicator, setIndicator] = useState<{ x: number; width: number; top: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const updateIndicator = useCallback((targetTab?: string) => {
    const tabToUse = targetTab || activeTab;
    const el = linkRefs.current[tabToUse];
    if (el) {
      setIndicator({
        x: el.offsetLeft + 14,
        width: Math.max(0, el.offsetWidth - 28),
        top: el.offsetTop + el.offsetHeight,
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
    if (pathname === "/contact") {
      const formEl = document.getElementById("contact-form");
      if (formEl) {
        if (typeof window !== "undefined" && (window as any).__lenis) {
          (window as any).__lenis.scrollTo(formEl, { offset: -90 });
        } else {
          formEl.scrollIntoView({ behavior: "smooth" });
        }
      }
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
            <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 relative py-2">
              {navLinks.map((link) => {
                const linkKey = link.id || link.href;
                const isCurrentActive = activeTab === linkKey;

                if (link.id === "industries") {
                  return (
                    <div
                      key={linkKey}
                      ref={industriesDropdownRef}
                      className="relative"
                      onMouseEnter={handleIndustriesMouseEnter}
                      onMouseLeave={handleIndustriesMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setIndustriesOpen((prev) => !prev);
                        }}
                        aria-expanded={industriesOpen}
                        className="relative px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 select-none inline-flex items-center gap-1 text-[#5A7A8E] hover:text-[#12304A] cursor-pointer"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-250 ease-out ${
                            industriesOpen ? "rotate-180 text-[#C79A4B]" : "text-[#5A7A8E]"
                          }`}
                        />
                      </button>

                      {/* Desktop Industries Dropdown */}
                      <AnimatePresence>
                        {industriesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.985 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.985 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[430px] z-50 pointer-events-auto"
                          >
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(18,48,74,0.16),0_0_0_1px_rgba(18,48,74,0.08)] p-2.5 overflow-hidden">
                              <div className="px-3.5 pt-2.5 pb-2 border-b border-[#12304A]/6 flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C79A4B] flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C79A4B]" />
                                  Therapeutic Segments
                                </span>
                                <span className="text-[11px] font-semibold text-[#5A7A8E]">
                                  5 Categories
                                </span>
                              </div>
                              <div className="py-1.5 space-y-1">
                                {INDUSTRY_CATEGORIES.map((cat) => {
                                  const Icon = cat.icon;
                                  return (
                                    <Link
                                      key={cat.name}
                                      href={cat.href}
                                      onClick={() => handleIndustrySelect(cat.name)}
                                      className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl hover:bg-[#FAF7F2] transition-colors group text-left"
                                    >
                                      <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#12304A]/8 group-hover:border-[#C79A4B]/40 group-hover:bg-[#C79A4B]/10 flex items-center justify-center shrink-0 transition-colors">
                                        <Icon className="w-4 h-4 text-[#12304A] group-hover:text-[#C79A4B] transition-colors" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors leading-tight">
                                          {cat.name}
                                        </div>
                                        <p className="text-xs text-[#5A7A8E] group-hover:text-[#12304A]/70 truncate mt-0.5 leading-normal">
                                          {cat.subtitle}
                                        </p>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#C79A4B] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-auto opacity-0 group-hover:opacity-100" />
                                    </Link>
                                  );
                                })}
                              </div>
                              <div className="pt-2 border-t border-[#12304A]/6 px-1">
                                <Link
                                  href="/products"
                                  onClick={() => handleIndustrySelect("All")}
                                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] text-xs font-bold text-[#12304A] hover:text-[#C79A4B] transition-colors group"
                                >
                                  <span className="flex items-center gap-2">
                                    <FlaskConical className="w-3.5 h-3.5 text-[#C79A4B]" />
                                    <span>Browse All 66+ DCGI Products</span>
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#C79A4B] group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={linkKey}
                    ref={(el) => {
                      linkRefs.current[linkKey] = el;
                    }}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(linkKey);
                      updateIndicator(linkKey);
                    }}
                    className={`relative px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 select-none ${
                      isCurrentActive
                        ? "text-[#12304A]"
                        : "text-[#5A7A8E] hover:text-[#12304A]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {!isMounted && isCurrentActive && (
                      <div className="absolute -bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#C79A4B] rounded-full pointer-events-none" />
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
              className="hidden sm:flex items-center justify-center bg-[#12304A] text-white px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0B1E2E] transition-colors shadow-sm cursor-pointer gpu-smooth"
            >
              Request Quote
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
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
            className="md:hidden fixed inset-x-0 bottom-0 top-[72px] sm:top-[76px] bg-[#071521]/40 backdrop-blur-xs z-40"
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
            className="md:hidden relative z-50 overflow-hidden border-t border-[#12304A]/10 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[calc(100vh-76px)] overflow-y-auto"
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
                  if (link.id === "industries") {
                    return (
                      <div key="mobile-industries" className="rounded-xl overflow-hidden border border-[#12304A]/8 bg-white/70">
                        <button
                          type="button"
                          onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                          className="w-full flex items-center justify-between px-3.5 py-3 text-left hover:bg-[#FAF7F2] transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#12304A]">
                              {link.label}
                            </span>
                            <span className="text-[11px] text-[#5A7A8E]">
                              {link.subtitle}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${
                              mobileIndustriesOpen ? "rotate-180 text-[#C79A4B]" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileIndustriesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-[#FAF7F2]/70 px-2.5 py-2 space-y-1 border-t border-[#12304A]/6"
                            >
                              {INDUSTRY_CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                  <Link
                                    key={cat.name}
                                    href={cat.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white transition-colors group"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#12304A]/8 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-[#C79A4B]" />
                                      </div>
                                      <div className="truncate">
                                        <div className="text-xs font-bold text-[#12304A] group-hover:text-[#C79A4B] transition-colors">{cat.name}</div>
                                        <div className="text-[11px] text-[#5A7A8E] truncate">{cat.subtitle}</div>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#C79A4B] shrink-0 ml-2 transition-colors" />
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

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
                        <span className={`text-sm font-bold ${link.active ? "text-white" : "text-[#12304A]"}`}>
                          {link.label}
                        </span>
                        <span className={`text-[11px] ${link.active ? "text-slate-300" : "text-[#5A7A8E]"}`}>
                          {link.subtitle}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${link.active ? "text-white/80" : "text-[#94A3B8]"}`} />
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
