"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

  const events = [
    {
      key: "cphi" as const,
      slide: cphiSlide,
      setSlide: setCphiSlide,
      title: "CPhI Worldwide 2026",
      location: "Fiera Milano, Milan, Italy",
      date: "October 6–8, 2026",
      badge: "Upcoming Expo",
      badgeColor: "#C79A4B",
    },
    {
      key: "pharmapack" as const,
      slide: pharmapackSlide,
      setSlide: setPharmapackSlide,
      title: "Pharmapack Europe 2027",
      location: "Paris Expo Porte de Versailles, France",
      date: "Jan 20–21, 2027",
      badge: "Confirmed Participation",
      badgeColor: "#12304A",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Gold accent line top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C79A4B]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 text-[#C79A4B] text-sm font-bold tracking-widest uppercase">
            <div className="w-8 h-[2px] bg-[#C79A4B]" />
            Global Events
          </span>
          <h2
            style={{ fontWeight: 800 }}
            className="text-3xl sm:text-4xl lg:text-[42px] text-[#12304A] leading-tight tracking-tight"
          >
            Meet Our Team <span className="text-[#C79A4B]">Worldwide</span>
          </h2>
          <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {events.map((event, idx) => (
            <motion.div
              key={event.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#12304A]/8 rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl hover:border-[#C79A4B]/25 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                {/* Image carousel */}
                <div className="md:col-span-7 h-[220px] sm:h-[260px] overflow-hidden relative group/slider">
                  <div
                    className="flex w-full h-full transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${event.slide * 100}%)` }}
                  >
                    {EVENT_SLIDES[event.key].map((src, i) => (
                      <div key={i} className="w-full h-full shrink-0">
                        <img src={src} alt={`${event.title} photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg z-10"
                    style={{ background: event.badgeColor }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.badge}</span>
                  </div>

                  {/* Prev/Next */}
                  <button onClick={() => prevSlide(event.key)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#12304A] flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-white z-10 shadow-md"
                    aria-label="Previous slide">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => nextSlide(event.key)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#12304A] flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover/slider:opacity-100 transition-opacity hover:bg-white z-10 shadow-md"
                    aria-label="Next slide">
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {EVENT_SLIDES[event.key].map((_, i) => (
                      <button key={i} onClick={() => event.setSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === event.slide ? "w-6 bg-[#C79A4B]" : "w-1.5 bg-white/60 hover:bg-white"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Event info */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#12304A] tracking-tight leading-snug group-hover:text-[#C79A4B] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#5A7A8E] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C79A4B] shrink-0" />
                      {event.location}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C79A4B]/10 border border-[#C79A4B]/25 text-[#C79A4B] text-xs font-bold self-start">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </div>

                  <button
                    onClick={() => onScheduleMeeting(`Schedule Meeting at ${event.title}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#12304A] text-white text-sm font-bold hover:bg-[#0E263B] transition-all shadow-md group/btn w-full sm:w-auto"
                  >
                    <span>Schedule a Meeting</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="bg-[#FAF7F2] border border-[#12304A]/8 rounded-[14px] px-6 py-4 text-sm text-[#5A7A8E] font-normal text-center">
          Connect with our technical and regulatory specialists at upcoming international trade exhibitions.
        </div>

      </div>
    </section>
  );
}
