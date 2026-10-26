"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";

interface Milestone {
  step: string;
  year: string;
  category: string;
  title: string;
  description: string;
  nodeX: number;
  nodeY: number;
  isAbove: boolean;
}

// ─── Asymmetric Dynamic Ribbon Coordinates (Calibrated for 600px Track) ────────
const MILESTONES: Milestone[] = [
  {
    step: "01",
    year: "1984",
    category: "FOUNDING · API IMPORTS",
    title: "Founding & Early Imports",
    description:
      "Founded by Kiran Premchand Shah in Mumbai, pioneering API imports from China alongside nationwide domestic sales.",
    nodeX: 1050,
    nodeY: 325,
    isAbove: false,
  },
  {
    step: "02",
    year: "1994",
    category: "INDENTING PIONEER",
    title: "Pioneering Pharmaceutical Indenting",
    description:
      "Transitioned into direct international indenting, bridging global synthesizers with India's emerging formulation leaders.",
    nodeX: 1470,
    nodeY: 290,
    isAbove: true,
  },
  {
    step: "03",
    year: "1997",
    category: "EXECUTIVE EXPANSION",
    title: "Executive Leadership Expansion",
    description:
      "Krishna Kumar Iyer joined as General Manager, joining hands with Kiran Shah to accelerate commercial growth and scale operations.",
    nodeX: 1890,
    nodeY: 325,
    isAbove: false,
  },
  {
    step: "04",
    year: "2002",
    category: "REGULATORY & DCGI",
    title: "DCGI Approvals & Global Giants",
    description:
      "Secured key DCGI registrations, establishing Ruskin as a primary indenting partner in India for international majors like NCPC and CSPC.",
    nodeX: 2310,
    nodeY: 290,
    isAbove: true,
  },
  {
    step: "05",
    year: "2006",
    category: "DIRECT SOURCING",
    title: "Direct Sourcing Corridors",
    description:
      "Began on-ground procurement expeditions to China, securing long-term manufacturer relationships, audited supply, and price advantages.",
    nodeX: 2730,
    nodeY: 325,
    isAbove: false,
  },
  {
    step: "06",
    year: "2014",
    category: "MARKET MODERNIZATION",
    title: "Operational & Domestic Market Scale",
    description:
      "Yash Jhaveri joined the leadership team as Head of Marketing & Operations, modernizing local sales and operational workflows alongside Krishna Kumar Iyer.",
    nodeX: 3150,
    nodeY: 290,
    isAbove: true,
  },
  {
    step: "07",
    year: "2024",
    category: "NEXT-GEN STRATEGY",
    title: "Next-Gen Business Development",
    description:
      "Atman Ajmera joined as Manager, driving strategic outreach, new client acquisitions, and modern institutional partnerships.",
    nodeX: 3570,
    nodeY: 325,
    isAbove: false,
  },
  {
    step: "08",
    year: "Today",
    category: "GLOBAL POWERHOUSE",
    title: "Modern Global Indenting Powerhouse",
    description:
      "A multigenerational pharma partner combining decades of sourcing mastery with forward-looking market development and complete regulatory trust.",
    nodeX: 3990,
    nodeY: 290,
    isAbove: true,
  },
];

// ─── Individual Milestone Component: Expansive Luxury Cards (No bloom, crisp matte) ─
function TimelineMilestoneItem({
  milestone,
  isActive,
}: {
  milestone: Milestone;
  isActive: boolean;
}) {
  return (
    <div
      style={{
        left: `${milestone.nodeX}px`,
        top: `${milestone.nodeY}px`,
      }}
      className="absolute pointer-events-auto select-none"
    >
      <div
        className={`flex flex-col items-center -translate-x-1/2 ${
          milestone.isAbove ? "justify-end -translate-y-full pb-2" : "justify-start pt-2"
        }`}
      >
        {/* ── TOP MILESTONES: Floating Card -> Airy Gap -> Year -> Stem -> Hexagon Node ── */}
        {milestone.isAbove && (
          <>
            {/* 1. Sleek Boxy Dark Luxury Card (Crisp, zero bloom/glow) */}
            <div className="w-[280px] sm:w-[310px] mb-2">
              <div
                className={`relative rounded-[18px] bg-gradient-to-b from-[#0c253b] via-[#081b2a] to-[#05131f] transition-colors duration-500 p-5 text-left border ${
                  isActive
                    ? "border-[#C79A4B]/80"
                    : "border-white/[0.08]"
                }`}
              >
                {/* Category Monospace Eyebrow */}
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C79A4B] uppercase mb-1.5 flex items-center gap-1.5">
                  <span
                    className={`h-[1.5px] bg-[#C79A4B] transition-all duration-300 ${
                      isActive ? "w-3" : "w-1.5"
                    }`}
                  />
                  <span>{milestone.category}</span>
                </div>

                {/* Title */}
                <h3
                  className={`text-[17px] sm:text-[18px] font-extrabold leading-snug tracking-tight mb-2 transition-colors duration-300 ${
                    isActive ? "text-[#E5C378]" : "text-white"
                  }`}
                >
                  {milestone.title}
                </h3>

                {/* Signature Ruskin Gold Accent Line */}
                <div
                  className={`h-[2px] bg-[#C79A4B] rounded-full mb-2.5 transition-all duration-300 ${
                    isActive ? "w-10 bg-[#E5C378]" : "w-8"
                  }`}
                />

                {/* Description */}
                <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed font-normal">
                  {milestone.description}
                </p>
              </div>
            </div>

            {/* 2. Uncontained Year */}
            <div
              className={`font-extrabold font-mono tracking-tight text-transparent bg-clip-text leading-none py-0.5 select-none transition-colors duration-300 text-2xl sm:text-[34px] ${
                isActive
                  ? "bg-gradient-to-b from-[#FFF0BD] to-[#C79A4B]"
                  : "bg-gradient-to-b from-[#E5C378] to-[#C79A4B]"
              }`}
            >
              {milestone.year}
            </div>

            {/* 3. Single Anchor Stem connecting Year down to Spline Hexagon Node */}
            <div
              className={`w-[1.5px] h-2.5 shrink-0 transition-colors duration-300 ${
                isActive
                  ? "bg-[#E5C378]"
                  : "bg-gradient-to-b from-[#C79A4B] to-[#C79A4B]/50"
              }`}
            />
          </>
        )}

        {/* ── BOTTOM MILESTONES: Hexagon Node -> Stem -> Year -> Airy Gap -> Floating Card ── */}
        {!milestone.isAbove && (
          <>
            {/* 1. Single Anchor Stem connecting Year up to Spline Hexagon Node */}
            <div
              className={`w-[1.5px] h-2.5 shrink-0 transition-colors duration-300 ${
                isActive
                  ? "bg-[#E5C378]"
                  : "bg-gradient-to-b from-[#C79A4B]/50 to-[#C79A4B]"
              }`}
            />

            {/* 2. Uncontained Year */}
            <div
              className={`font-extrabold font-mono tracking-tight text-transparent bg-clip-text leading-none py-0.5 select-none transition-colors duration-300 text-2xl sm:text-[34px] ${
                isActive
                  ? "bg-gradient-to-b from-[#FFF0BD] to-[#C79A4B]"
                  : "bg-gradient-to-b from-[#E5C378] to-[#C79A4B]"
              }`}
            >
              {milestone.year}
            </div>

            {/* 3. Sleek Boxy Dark Luxury Card (Crisp, zero bloom/glow) */}
            <div className="w-[280px] sm:w-[310px] mt-2">
              <div
                className={`relative rounded-[18px] bg-gradient-to-b from-[#0c253b] via-[#081b2a] to-[#05131f] transition-colors duration-500 p-5 text-left border ${
                  isActive
                    ? "border-[#C79A4B]/80"
                    : "border-white/[0.08]"
                }`}
              >
                {/* Category Monospace Eyebrow */}
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C79A4B] uppercase mb-1.5 flex items-center gap-1.5">
                  <span
                    className={`h-[1.5px] bg-[#C79A4B] transition-all duration-300 ${
                      isActive ? "w-3" : "w-1.5"
                    }`}
                  />
                  <span>{milestone.category}</span>
                </div>

                {/* Title */}
                <h3
                  className={`text-[17px] sm:text-[18px] font-extrabold leading-snug tracking-tight mb-2 transition-colors duration-300 ${
                    isActive ? "text-[#E5C378]" : "text-white"
                  }`}
                >
                  {milestone.title}
                </h3>

                {/* Signature Ruskin Gold Accent Line */}
                <div
                  className={`h-[2px] bg-[#C79A4B] rounded-full mb-2.5 transition-all duration-300 ${
                    isActive ? "w-10 bg-[#E5C378]" : "w-8"
                  }`}
                />

                {/* Description */}
                <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed font-normal">
                  {milestone.description}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function AboutPage() {
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ribbonProgressRef = useRef<SVGPathElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = timelineSectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = 4400;
    const getScrollDistance = () => Math.max(0, totalWidth - window.innerWidth + 120);

    const ctx = gsap.context(() => {
      // Coordinated master timeline with calibrated inertial damping
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Calibrated inertial dampening to prevent rapid wheel whipping
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              MILESTONES.length - 1,
              Math.max(0, Math.round(self.progress * (MILESTONES.length - 1)))
            );
            setActiveMilestone(idx);
          },
        },
      });

      // 1. Entrance lead-in: headline gracefully settles & fades over first 15%
      if (journeyRef.current) {
        tl.to(
          journeyRef.current,
          {
            opacity: 0,
            x: -30,
            ease: "power1.out",
            duration: 0.15,
          },
          0
        );
      }

      // 2. Horizontal track linear translation (ease: "none" prevents mid-track speed surges)
      tl.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getScrollDistance(),
          ease: "none",
          duration: 0.95,
        },
        0.02
      );

      // 3. Molten Gold Laser progress line in sync with track
      if (ribbonProgressRef.current) {
        tl.fromTo(
          ribbonProgressRef.current,
          { strokeDashoffset: 3100 },
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 0.95,
          },
          0.02
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#5A7A8E] flex flex-col font-sans selection:bg-[#C79A4B] selection:text-white">
      <main className="flex-grow">
        {/* ─── 1. SIMPLIFIED EXECUTIVE INTRO SECTION ──────────────────────── */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 bg-gradient-to-b from-white via-[#FAF7F2] to-[#FAF7F2] border-b border-[#12304A]/8 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <SectionHeader
                centered
                as="h1"
                eyebrow="Company Legacy"
                lead="Four Decades of"
                highlight="Global Sourcing Excellence"
                description="Founded in Mumbai in 1984, Ruskin Chemipharm bridges global bulk drug synthesizers with India's formulation leaders through direct factory representation, landmark DCGI approvals, and uncompromised regulatory trust."
              />

              {/* Structured Minimalist Stats Row */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-[#12304A]/10 max-w-xl mx-auto text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight">
                    40<span className="text-[#C79A4B]">+</span>
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Years Experience
                  </div>
                </div>

                <div className="border-l border-[#12304A]/10 pl-4 sm:pl-8">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C79A4B] tracking-tight">
                    1984
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Founded in Mumbai
                  </div>
                </div>

                <div className="border-l border-[#12304A]/10 pl-4 sm:pl-8">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight">
                    DCGI
                  </div>
                  <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                    Registered Portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. STICKY PAGE-SCROLL HORIZONTAL TIMELINE ──────────────────────── */}
        {/* Height 340vh provides a comfortable, calm pacing eliminating motion sickness */}
        <section ref={timelineSectionRef} className="relative h-[340vh] bg-[#071521]">
          {/* Subtle Ambient Blueprint Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#C79A4B_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />

          {/* Smooth Section Transitions: Feathered top and bottom edges */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#071521] via-[#071521]/70 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#071521] via-[#071521]/70 to-transparent pointer-events-none z-20" />

          {/* Sticky Viewport (Padded cleanly below navbar with pure, unhindered dark canvas) */}
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-[76px] sm:pt-[82px] pb-6 z-10">
            {/* ── Pinned Centerpiece Headline: "Our Journey" ── */}
            <div
              ref={journeyRef}
              className="absolute left-6 sm:left-12 lg:left-20 top-24 sm:top-28 w-[380px] sm:w-[480px] pointer-events-none select-none z-20 will-change-[transform,opacity]"
            >
              <div className="space-y-3.5 text-left pointer-events-auto">
                {/* 1. Category Eyebrow with Gold Prefix Line */}
                <span className="inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase">
                  <div className="w-8 h-[2px] bg-[#C79A4B]" />
                  Company Timeline
                </span>

                {/* 2. Main Heading with Gold Span Highlight */}
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.06] tracking-tight">
                  Our <span className="text-[#C79A4B]">Journey</span>
                </h2>

                {/* 3. SIGNATURE GOLD ACCENT BAR (MANDATORY RULE) */}
                <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />

                {/* 4. Descriptive Subtitle */}
                <p className="text-[14px] sm:text-[15px] text-[#CBD5E1] font-normal leading-relaxed pt-0.5 max-w-md">
                  Four decades of global API sourcing excellence, landmark DCGI approvals, and direct primary manufacturer partnerships established since 1984.
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#C79A4B] font-semibold tracking-wider uppercase">
                  <span>Scroll to navigate timeline</span>
                  <span className="text-sm leading-none">→</span>
                </div>
              </div>
            </div>

            {/* Horizontal Pathway Track (600px Height - Fully Unclipped in All Viewports) */}
            <div className="relative w-full h-[600px] flex items-center overflow-visible my-auto">
              {/* Subtle Ambient Hexagonal Watermarks */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-[0.035]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="350,140 395,165 395,215 350,240 305,215 305,165"
                  stroke="#C79A4B"
                  strokeWidth="1.2"
                  fill="none"
                />
                <polygon
                  points="1450,380 1495,405 1495,455 1450,480 1405,455 1405,405"
                  stroke="#C79A4B"
                  strokeWidth="1.2"
                  fill="none"
                />
                <polygon
                  points="2550,130 2595,155 2595,205 2550,230 2505,205 2505,155"
                  stroke="#C79A4B"
                  strokeWidth="1.2"
                  fill="none"
                />
                <polygon
                  points="3650,390 3695,415 3695,465 3650,490 3605,465 3605,415"
                  stroke="#C79A4B"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>

              <div
                ref={trackRef}
                className="relative w-[4400px] h-[600px] shrink-0 will-change-transform"
              >
                {/* ── Continuous Architectural Spline Line (Dual: Base Guide + Active Molten Laser) ── */}
                <svg
                  viewBox="0 0 4400 600"
                  className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C79A4B" stopOpacity="0.85" />
                      <stop offset="35%" stopColor="#E5C378" stopOpacity="0.95" />
                      <stop offset="70%" stopColor="#C79A4B" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#E5C378" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* 1. Underlying Architectural Guide Track */}
                  <path
                    d="M 1050 325
                       C 1260 325, 1260 290, 1470 290
                       C 1680 290, 1680 325, 1890 325
                       C 2100 325, 2100 290, 2310 290
                       C 2520 290, 2520 325, 2730 325
                       C 2940 325, 2940 290, 3150 290
                       C 3360 290, 3360 325, 3570 325
                       C 3780 325, 3780 290, 3990 290"
                    stroke="rgba(199, 154, 75, 0.16)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* 2. Active Scrubbed Molten Gold Ribbon Beam */}
                  <path
                    ref={ribbonProgressRef}
                    d="M 1050 325
                       C 1260 325, 1260 290, 1470 290
                       C 1680 290, 1680 325, 1890 325
                       C 2100 325, 2100 290, 2310 290
                       C 2520 290, 2520 325, 2730 325
                       C 2940 325, 2940 290, 3150 290
                       C 3360 290, 3360 325, 3570 325
                       C 3780 325, 3780 290, 3990 290"
                    stroke="url(#goldRibbon)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeDasharray="3100"
                    strokeDashoffset="3100"
                  />

                  {/* 3. Jewel Precision Hexagon Nodes on the Line (Clean, zero bloom/glow) */}
                  {MILESTONES.map((m, idx) => {
                    const isPassed = activeMilestone >= idx;
                    return (
                      <g
                        key={`marker-${m.step}`}
                        transform={`translate(${m.nodeX}, ${m.nodeY})`}
                      >
                        {/* Outer Hexagon */}
                        <polygon
                          points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4"
                          fill={isPassed ? "#C79A4B" : "#071521"}
                          stroke={isPassed ? "#E5C378" : "#C79A4B"}
                          strokeWidth="1.6"
                          className="transition-colors duration-500"
                        />
                        {/* Inner Core Hexagon */}
                        <polygon
                          points="0,-3.5 3,-1.75 3,1.75 0,3.5 -3,1.75 -3,-1.75"
                          fill={isPassed ? "#071521" : "#E5C378"}
                          className="transition-colors duration-500"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* ── 8 Milestones: Zero-Overlap Flex Stacks with Luxury Cards ── */}
                {MILESTONES.map((milestone, idx) => (
                  <TimelineMilestoneItem
                    key={milestone.step}
                    milestone={milestone}
                    isActive={activeMilestone === idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
 
        {/* ─── 3. OUR INSPIRATION ────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#12304A]/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeader
              centered
              eyebrow="Our Inspiration"
              lead="Guiding Philosophy &"
              highlight="Ethical Foundations"
              description="Rooted in enduring principles of conscious leadership, selfless service, and uncompromising integrity in global healthcare."
            />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer onOpenCatalog={() => (window.location.href = "/products")} />
    </div>
  );
}
