"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building2,
  Video,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MolecularDecoration, HexIcon } from "./Hex";
import SectionHeader from "./SectionHeader";

interface EventSlide {
  image: string;
  title: string;
  location: string;
  date: string;
  hall: string;
  zone: string;
  badge: string;
  badgeColor: string;
  agenda: string[];
}

interface EventCardConfig {
  key: "cphi_india" | "cphi_china";
  slides: EventSlide[];
}

const CHINA_BASE = {
  title: "CPHI China 2027",
  location: "Shanghai New Int'l Expo Centre (SNIEC), China",
  date: "June 22–24, 2027",
  hall: "Hall 2 — Stand 2W16",
  zone: "Direct Bulk Synthesis Pavilion",
  badge: "Direct Manufacturer Summit",
  badgeColor: "#059669",
  agenda: [
    "Audited cGMP Synthesizer Sourcing",
    "High-Volume Indenting Contracts",
    "Bulk Price Stability Agreements",
  ],
};

const EVENTS: EventCardConfig[] = [
  {
    key: "cphi_india",
    slides: [
      {
        image: "/images/events/india-1.webp",
        title: "CPHI India 2026",
        location: "India Expo Centre, Greater Noida, Delhi NCR",
        date: "November 25–27, 2026",
        hall: "Hall 2 — Stand 2C24",
        zone: "Global & Indian API Pavilion",
        badge: "Flagship Indian & Global Expo",
        badgeColor: "#C79A4B",
        agenda: [
          "Global & Indian API Supply Contracts",
          "DCGI, CDSCO & USDMF/CEP Roadmaps",
          "Strategic Direct Factory Sourcing",
        ],
      },
      {
        image: "/images/events/india-2.webp",
        title: "CPHI India 2027",
        location: "India Expo Centre, Greater Noida, Delhi NCR",
        date: "November 2027",
        hall: "Hall & Stand TBA",
        zone: "Global & Indian API Pavilion",
        badge: "Upcoming 2027 Edition",
        badgeColor: "#C79A4B",
        agenda: [
          "Long-Term API Supply Partnerships",
          "2027 Regulatory & Dossier Pipeline",
          "Direct Factory Indenting Allocations",
        ],
      },
    ],
  },
  {
    key: "cphi_china",
    slides: [
      { image: "/images/events/china-1.webp", ...CHINA_BASE },
      { image: "/images/events/china-2.webp", ...CHINA_BASE },
      { image: "/images/events/china-3.webp", ...CHINA_BASE },
      { image: "/images/events/china-4.webp", ...CHINA_BASE },
    ],
  },
];

/* ─── Self-Contained Event Carousel Card (Optimized 120 FPS Performance) ─── */
function EventCard({
  event,
  idx,
  onScheduleMeeting,
}: {
  event: EventCardConfig;
  idx: number;
  onScheduleMeeting: (meetingName: string) => void;
}) {
  const [photoSlide, setPhotoSlide] = useState(0);
  const slides = event.slides;
  const activeSlide = slides[photoSlide] || slides[0];
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll activity so auto-rotations pause during user scrolling
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      // Pause slide transitions while user is actively scrolling
      if (isScrollingRef.current) return;
      setPhotoSlide((s) => (s + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isInView, slides.length]);

  const nextSlide = () => {
    setPhotoSlide((s) => (s + 1) % slides.length);
  };
  const prevSlide = () => {
    setPhotoSlide((s) => (s - 1 + slides.length) % slides.length);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#0B1E2E] border border-white/10 rounded-[28px] overflow-hidden shadow-xl text-left contain-paint"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "0 490px",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[490px]">
        {/* Image carousel (7 cols on large) — Fast, snappy zero-jank crossfade */}
        <div className="lg:col-span-7 h-[280px] sm:h-[340px] lg:h-full overflow-hidden relative group/slider">
          <div className="relative w-full h-full">
            {slides.map((slide, i) => {
              const isActive = i === photoSlide;
              return (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-350 ease-out ${
                    isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`${slide.title} exhibition view ${i + 1}`}
                    width={1080}
                    height={700}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 && i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>

          {/* Gentle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2E] via-transparent to-[#071521]/40" />

          {/* Top Badges */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
            <div
              className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md pointer-events-auto border border-white/15 transition-colors duration-300"
              style={{ background: activeSlide.badgeColor }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{activeSlide.badge}</span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-[#071521]/95 border border-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#C79A4B]" />
              <span>{activeSlide?.location ? activeSlide.location.split(",")[0] : ""}</span>
            </div>
          </div>

          {/* Bottom Stand Info on Image */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071521]/95 border border-white/15 text-white text-xs font-mono">
              <Building2 className="w-3.5 h-3.5 text-[#C79A4B]" />
              {activeSlide.hall}
            </span>
          </div>

          {/* Prev/Next Controls */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071521]/90 border border-white/20 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-[#071521] z-10 shadow-md cursor-pointer"
            aria-label="Previous exhibition photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071521]/90 border border-white/20 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-[#071521] z-10 shadow-md cursor-pointer"
            aria-label="Next exhibition photo"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoSlide(i)}
                aria-label={`Jump to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === photoSlide ? "w-6 bg-[#C79A4B]" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Event Information Panel (5 cols on large) */}
        <div className="lg:col-span-5 p-6 sm:p-7 lg:p-8 flex flex-col justify-between text-white lg:h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3.5 sm:space-y-4"
            >
              {/* Stand & Zone Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C79A4B]/15 border border-[#C79A4B]/30 text-[#E5C378] text-xs font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-[#C79A4B]" />
                  {activeSlide.hall}
                </span>
                <span className="text-xs text-slate-400 font-normal">
                  {activeSlide.zone}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {activeSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1.5">
                  <MapPin className="w-4 h-4 text-[#C79A4B] shrink-0" />
                  <span>{activeSlide.location}</span>
                </p>
              </div>

              {/* Date Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#C79A4B]" />
                {activeSlide.date}
              </div>

              {/* Agenda Highlights */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Delegation Focus &amp; Consultations:
                </div>
                <div className="space-y-1.5">
                  {activeSlide.agenda.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Area */}
          <div className="pt-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onScheduleMeeting(`Schedule Meeting at ${activeSlide.title} (${activeSlide.hall})`)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C79A4B] text-white text-sm font-bold hover:bg-[#B58A3E] transition-colors shadow-lg group/btn w-full cursor-pointer"
            >
              <span>Schedule Booth Meeting</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Dedicated 20-min slot with Regulatory &amp; Sourcing Directors
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface GlobalEventsProps {
  onScheduleMeeting: (meetingName: string) => void;
}

export default function GlobalEvents({ onScheduleMeeting }: GlobalEventsProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      {/* Ambient background molecular watermarks */}
      <div className="absolute -top-12 -right-12 w-[340px] pointer-events-none select-none opacity-[0.035]">
        <MolecularDecoration color="#12304A" opacity={1} className="w-full h-auto" />
      </div>
      <div className="absolute -bottom-16 -left-16 w-[320px] pointer-events-none select-none opacity-[0.03]">
        <MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Section Header with luxury scroll-reveal */}
        <SectionHeader
          eyebrow="Global Exhibitions & Industry Summits"
          lead={
            <>
              Meet Our Leadership &amp; <br className="hidden sm:inline" />
            </>
          }
          highlight="Technical Team Worldwide"
          description="Ruskin Chemipharm regularly anchors official delegations at the world's leading pharmaceutical expos. Pre-book a dedicated technical session with our regulatory and commercial leadership."
        />

        {/* ═══ 2 Event Carousel Cards Stacked Vertically ═══ */}
        <div className="space-y-8 sm:space-y-10">
          {EVENTS.map((event, idx) => (
            <EventCard
              key={event.key}
              event={event}
              idx={idx}
              onScheduleMeeting={onScheduleMeeting}
            />
          ))}
        </div>

        {/* Bottom Virtual Conference Callout */}
        <div className="bg-white border border-[#12304A]/10 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm text-left">
          <div className="flex items-center gap-4">
            <HexIcon size={34} bg="#12304A">
              <Video className="w-4 h-4 text-[#C79A4B]" />
            </HexIcon>
            <div>
              <h4 className="text-base font-bold text-[#12304A]">
                Can&apos;t attend international expos in person?
              </h4>
              <p className="text-xs sm:text-sm text-[#5A7A8E] mt-0.5">
                Connect directly via secure video conference with our Mumbai regulatory and technical specialists.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onScheduleMeeting("Virtual Technical Dossier & Sourcing Consultation")}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C79A4B] hover:text-[#B58A3E] transition-colors group cursor-pointer shrink-0"
          >
            <span>Book Virtual Dossier Meeting</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
