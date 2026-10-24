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
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { MolecularDecoration, HexIcon } from "./Hex";

const EVENT_SLIDES: Record<string, string[]> = {
  cphi: [
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  ],
  pharmapack: [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  ],
};

interface GlobalEventsProps {
  onScheduleMeeting: (meetingName: string) => void;
}

export default function GlobalEvents({ onScheduleMeeting }: GlobalEventsProps) {
  const [cphiSlide, setCphiSlide] = useState(0);
  const [pharmapackSlide, setPharmapackSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setCphiSlide((s) => (s + 1) % EVENT_SLIDES.cphi.length);
      setPharmapackSlide((s) => (s + 1) % EVENT_SLIDES.pharmapack.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isInView]);

  const nextSlide = (key: "cphi" | "pharmapack") => {
    if (key === "cphi") setCphiSlide((s) => (s + 1) % EVENT_SLIDES.cphi.length);
    else setPharmapackSlide((s) => (s + 1) % EVENT_SLIDES.pharmapack.length);
  };
  const prevSlide = (key: "cphi" | "pharmapack") => {
    if (key === "cphi") setCphiSlide((s) => (s - 1 + EVENT_SLIDES.cphi.length) % EVENT_SLIDES.cphi.length);
    else setPharmapackSlide((s) => (s - 1 + EVENT_SLIDES.pharmapack.length) % EVENT_SLIDES.pharmapack.length);
  };

  const events = [
    {
      key: "cphi" as const,
      slide: cphiSlide,
      setSlide: setCphiSlide,
      title: "CPhI Worldwide 2026",
      location: "Fiera Milano, Milan, Italy",
      date: "October 6–8, 2026",
      hall: "Hall 4 — Stand 4D12",
      zone: "APIs & Intermediates Pavilion",
      badge: "Flagship Global Expo",
      badgeColor: "#C79A4B",
      agenda: [
        "Commercial API Procurement Contracts",
        "DCGI & CDSCO Import Registrations",
        "Custom Chemical Synthesis Partnerships",
      ],
    },
    {
      key: "pharmapack" as const,
      slide: pharmapackSlide,
      setSlide: setPharmapackSlide,
      title: "Pharmapack Europe 2027",
      location: "Paris Expo Porte de Versailles, France",
      date: "Jan 20–21, 2027",
      hall: "Hall 7.2 — Stand J48",
      zone: "Drug Delivery & Formulation Hub",
      badge: "Confirmed Delegation",
      badgeColor: "#071521",
      agenda: [
        "Sterile Formulation Excipients",
        "Cold-Chain Logistics Protocols (2°C–8°C)",
        "European CEP/EDQM Dossier Alignment",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-t border-[#12304A]/8 contain-section">
      {/* Top subtle gold accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C79A4B]/35 to-transparent" />

      {/* Ambient background molecular watermarks */}
      <div className="absolute -top-12 -right-12 w-[340px] pointer-events-none select-none opacity-[0.035]">
        <MolecularDecoration color="#12304A" opacity={1} className="w-full h-auto" />
      </div>
      <div className="absolute -bottom-16 -left-16 w-[320px] pointer-events-none select-none opacity-[0.03]">
        <MolecularDecoration color="#C79A4B" opacity={1} className="w-full h-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Section Header */}
        <div className="space-y-3 text-left">
          <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
            <div className="w-8 h-[2px] bg-[#C79A4B]" />
            Global Exhibitions &amp; Industry Summits
          </span>
          <h2
            style={{ fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-[44px] text-[#12304A] leading-tight tracking-tight"
          >
            Meet Our Leadership &amp; Technical Team <span className="text-[#C79A4B]">Worldwide</span>
          </h2>
          <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
          <p className="text-base text-[#5A7A8E] font-normal max-w-2xl leading-relaxed">
            Ruskin Chemipharm regularly anchors official delegations at the world&apos;s leading pharmaceutical expos. Pre-book a dedicated technical session with our regulatory and commercial leadership.
          </p>
        </div>

        {/* Event Cards (Matte Luxury Navy Surfaces) */}
        <div className="space-y-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="bg-[#0B1E2E] border border-white/10 rounded-[28px] overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-[border-color,box-shadow] duration-300 group gpu-smooth text-left"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image carousel (7 cols on large) */}
                <div className="lg:col-span-7 h-[280px] sm:h-[340px] lg:h-full min-h-[300px] overflow-hidden relative group/slider">
                  <div
                    className="flex w-full h-full transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${event.slide * 100}%)` }}
                  >
                    {EVENT_SLIDES[event.key].map((src, i) => (
                      <div key={i} className="w-full h-full shrink-0 relative">
                        <img
                          src={src}
                          alt={`${event.title} exhibition view ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Gentle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2E] via-transparent to-[#071521]/40" />

                  {/* Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
                    <div
                      className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md pointer-events-auto border border-white/15"
                      style={{ background: event.badgeColor }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.badge}</span>
                    </div>

                    <div className="px-3 py-1.5 rounded-full bg-[#071521]/80 backdrop-blur-md border border-white/15 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#C79A4B]" />
                      <span>{event.location.split(",")[0]}</span>
                    </div>
                  </div>

                  {/* Bottom Stand Info on Image */}
                  <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071521]/85 backdrop-blur-md border border-white/15 text-white text-xs font-mono">
                      <Building2 className="w-3.5 h-3.5 text-[#C79A4B]" />
                      {event.hall}
                    </span>
                  </div>

                  {/* Prev/Next Controls */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => prevSlide(event.key)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071521]/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-[#071521] z-10 shadow-md cursor-pointer"
                    aria-label="Previous exhibition photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => nextSlide(event.key)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#071521]/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-[#071521] z-10 shadow-md cursor-pointer"
                    aria-label="Next exhibition photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  {/* Slide Indicator Dots */}
                  <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
                    {EVENT_SLIDES[event.key].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => event.setSlide(i)}
                        aria-label={`Jump to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === event.slide ? "w-6 bg-[#C79A4B]" : "w-1.5 bg-white/50 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Event Information Panel (5 cols on large) */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 text-white">
                  <div className="space-y-4">
                    {/* Stand & Zone Pill */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C79A4B]/15 border border-[#C79A4B]/30 text-[#E5C378] text-xs font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-[#C79A4B]" />
                        {event.hall}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        {event.zone}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-[#E5C378] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-2">
                        <MapPin className="w-4 h-4 text-[#C79A4B] shrink-0" />
                        {event.location}
                      </p>
                    </div>

                    {/* Date Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#C79A4B]" />
                      {event.date}
                    </div>

                    {/* Agenda Highlights */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Delegation Focus &amp; Consultations:
                      </div>
                      <div className="space-y-1.5">
                        {event.agenda.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onScheduleMeeting(`Schedule Meeting at ${event.title} (${event.hall})`)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C79A4B] text-white text-sm font-bold hover:bg-[#B58A3E] transition-colors shadow-lg group/btn w-full cursor-pointer"
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
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#12304A] text-white text-xs font-bold hover:bg-[#0B1E2E] transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C79A4B]" />
            <span>Book Virtual Dossier Meeting</span>
          </motion.button>
        </div>

      </div>
    </section>
  );
}
