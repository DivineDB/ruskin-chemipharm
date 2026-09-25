"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCphiSlide((s) => (s + 1) % EVENT_SLIDES.cphi.length);
      setPharmapackSlide((s) => (s + 1) % EVENT_SLIDES.pharmapack.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (key: "cphi" | "pharmapack") => {
    if (key === "cphi") setCphiSlide((s) => (s + 1) % EVENT_SLIDES.cphi.length);
    else setPharmapackSlide((s) => (s + 1) % EVENT_SLIDES.pharmapack.length);
  };

  const prevSlide = (key: "cphi" | "pharmapack") => {
    if (key === "cphi") setCphiSlide((s) => (s - 1 + EVENT_SLIDES.cphi.length) % EVENT_SLIDES.cphi.length);
    else setPharmapackSlide((s) => (s - 1 + EVENT_SLIDES.pharmapack.length) % EVENT_SLIDES.pharmapack.length);
  };

  return (
    <section className="py-20 bg-[#12304A] relative border-b border-white/5 contain-layout">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Header */}
        <div className="space-y-4">
          <span className="section-pill">Global Events</span>
          <h2 className="heading-section">Meet Our Team Worldwide</h2>
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {/* Event 1: CPhI Worldwide 2026 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#0F2336]/70 border border-white/10 hover:border-[#C79A4B]/40 transition-all duration-300 rounded-[24px] overflow-hidden shadow-2xl group">
            {/* Sliding Image Carousel */}
            <div className="md:col-span-7 h-[220px] sm:h-[260px] overflow-hidden relative shrink-0 group/slider">
              <div
                className="flex w-full h-full transition-transform duration-700 ease-out transform-gpu"
                style={{ transform: `translateX(-${cphiSlide * 100}%)` }}
              >
                {EVENT_SLIDES.cphi.map((src, i) => (
                  <div key={i} className="w-full h-full shrink-0 relative">
                    <img
                      src={src}
                      alt={`CPhI Worldwide 2026 — photo ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Event Badge */}
              <div className="absolute top-4 left-4 bg-[#12304A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-semibold text-[#C79A4B] flex items-center gap-1.5 shadow-lg z-10">
                <Calendar className="w-3.5 h-3.5 text-[#C79A4B]" />
                <span>Upcoming Expo</span>
              </div>

              {/* Left/Right Arrow Controls */}
              <button
                onClick={() => prevSlide("cphi")}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-[#C79A4B] hover:text-[#12304A] z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => nextSlide("cphi")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-[#C79A4B] hover:text-[#12304A] z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {EVENT_SLIDES.cphi.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCphiSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === cphiSlide ? "bg-[#C79A4B] w-6" : "bg-white/40 w-2 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Event Info */}
            <div className="md:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#E5C378] transition-colors">
                  CPhI Worldwide 2026
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#147D82] shrink-0" />
                  Fiera Milano, Milan, Italy
                </p>
              </div>

              <div className="inline-block bg-[#C79A4B]/15 border border-[#C79A4B]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#C79A4B]">
                October 6–8, 2026
              </div>

              <div>
                <button
                  onClick={() => onScheduleMeeting("Schedule Meeting at CPhI Worldwide 2026")}
                  className="btn-text text-xs sm:text-sm bg-[#147D82] hover:bg-[#10686C] text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md group/btn"
                >
                  <span>Schedule a Meeting</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Event 2: Pharmapack Europe 2027 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#0F2336]/70 border border-white/10 hover:border-[#C79A4B]/40 transition-all duration-300 rounded-[24px] overflow-hidden shadow-2xl group">
            {/* Sliding Image Carousel */}
            <div className="md:col-span-7 h-[220px] sm:h-[260px] overflow-hidden relative shrink-0 group/slider">
              <div
                className="flex w-full h-full transition-transform duration-700 ease-out transform-gpu"
                style={{ transform: `translateX(-${pharmapackSlide * 100}%)` }}
              >
                {EVENT_SLIDES.pharmapack.map((src, i) => (
                  <div key={i} className="w-full h-full shrink-0 relative">
                    <img
                      src={src}
                      alt={`Pharmapack Europe 2027 — photo ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Event Badge */}
              <div className="absolute top-4 left-4 bg-[#12304A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-semibold text-[#147D82] flex items-center gap-1.5 shadow-lg z-10">
                <Calendar className="w-3.5 h-3.5 text-[#147D82]" />
                <span>Confirmed Participation</span>
              </div>

              {/* Left/Right Arrow Controls */}
              <button
                onClick={() => prevSlide("pharmapack")}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-[#C79A4B] hover:text-[#12304A] z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => nextSlide("pharmapack")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-[#C79A4B] hover:text-[#12304A] z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {EVENT_SLIDES.pharmapack.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPharmapackSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === pharmapackSlide ? "bg-[#C79A4B] w-6" : "bg-white/40 w-2 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Event Info */}
            <div className="md:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#E5C378] transition-colors">
                  Pharmapack Europe 2027
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#147D82] shrink-0" />
                  Paris Expo Porte de Versailles, France
                </p>
              </div>

              <div className="inline-block bg-[#C79A4B]/15 border border-[#C79A4B]/30 px-4 py-1.5 rounded-full text-xs font-semibold text-[#C79A4B]">
                Jan 20–21, 2027
              </div>

              <div>
                <button
                  onClick={() => onScheduleMeeting("Schedule Meeting at Pharmapack Europe 2027")}
                  className="btn-text text-xs sm:text-sm bg-[#147D82] hover:bg-[#10686C] text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-md group/btn"
                >
                  <span>Schedule a Meeting</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note Bar */}
        <div className="bg-white/[0.06] border border-white/10 rounded-[14px] px-6 py-4 text-sm text-slate-300 font-normal text-center backdrop-blur-sm">
          Connect with our technical and regulatory specialists at upcoming international trade exhibitions.
        </div>
      </div>
    </section>
  );
}
