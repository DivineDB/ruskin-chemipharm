"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import CtaBanner from "../components/CtaBanner";

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

function AnimatedNumber({
  value,
  startFrom = 0,
  duration = 1.4,
  delay = 0.2,
  suffix = "",
}: {
  value: number;
  startFrom?: number;
  duration?: number;
  delay?: number;
  suffix?: React.ReactNode;
}) {
  const [count, setCount] = useState(startFrom);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startFrom + (value - startFrom) * ease);
        setCount(current);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, startFrom, duration, delay]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ribbonProgressRef = useRef<SVGPathElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenQuoteEvent = () => setQuoteModalOpen(true);
    window.addEventListener("ruskin:open-quote", handleOpenQuoteEvent);
    return () => window.removeEventListener("ruskin:open-quote", handleOpenQuoteEvent);
  }, []);

  // ── Inspiration Section Refs ──
  const inspirationRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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

  // ── Inspiration Section Stagger Sequence: Photo -> Left Text -> Right Text ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = inspirationRef.current;
    const photo = photoRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !photo || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Photo enters first: frame rises smoothly while photo settles
      tl.fromTo(
        photo,
        { opacity: 0, y: 65, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "power4.out" }
      );

      const photoImg = photo.querySelector("img");
      if (photoImg) {
        tl.fromTo(
          photoImg,
          { scale: 1.1 },
          { scale: 1, duration: 1.35, ease: "power3.out" },
          0
        );
      }

      // 2. Left column: Starts at 0.4s while photo settles
      const leftEyebrow = leftCol.querySelector(".insp-left-eyebrow");
      const leftHeading = leftCol.querySelector(".insp-left-heading");
      const leftBar = leftCol.querySelector(".insp-left-bar");
      const leftTexts = leftCol.querySelectorAll(".insp-left-p");

      tl.fromTo(
        [leftEyebrow, leftHeading],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
        0.4
      )
      .fromTo(
        leftBar,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.7, ease: "power3.out" },
        0.55
      )
      .fromTo(
        leftTexts,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.12 },
        0.65
      );

      // 3. Right column: Starts at 0.8s
      const rightP1 = rightCol.querySelector(".insp-right-p1");
      const quoteLine = rightCol.querySelector(".insp-quote-line");
      const quoteText = rightCol.querySelector(".insp-quote-text");
      const rightP2 = rightCol.querySelector(".insp-right-p2");

      tl.fromTo(
        rightP1,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.8
      )
      .fromTo(
        quoteLine,
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 0.6, ease: "power2.out" },
        0.92
      )
      .fromTo(
        quoteText,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power3.out" },
        0.98
      )
      .fromTo(
        rightP2,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        1.08
      );
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

              {/* Structured Minimalist Stats Row with Staggered Intro & Counting Animation */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.14,
                      delayChildren: 0.2,
                    },
                  },
                }}
                className="relative max-w-xl mx-auto pt-8 border-t border-[#12304A]/10 text-center"
              >
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight">
                      <AnimatedNumber
                        value={40}
                        startFrom={0}
                        duration={1.2}
                        delay={0.25}
                        suffix={<span className="text-[#C79A4B]">+</span>}
                      />
                    </div>
                    <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                      Years Experience
                    </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="border-l border-[#12304A]/10 pl-4 sm:pl-8"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C79A4B] tracking-tight">
                      <AnimatedNumber
                        value={1984}
                        startFrom={1940}
                        duration={1.5}
                        delay={0.38}
                      />
                    </div>
                    <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                      Founded in Mumbai
                    </div>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="border-l border-[#12304A]/10 pl-4 sm:pl-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, letterSpacing: "0.15em" }}
                      whileInView={{ opacity: 1, letterSpacing: "-0.025em" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="text-3xl sm:text-4xl font-extrabold font-mono text-[#12304A] tracking-tight"
                    >
                      DCGI
                    </motion.div>
                    <div className="text-xs text-[#5A7A8E] font-medium mt-1">
                      Registered Portfolio
                    </div>
                  </motion.div>
                </div>
              </motion.div>
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
        <section
          id="our-inspiration"
          ref={inspirationRef}
          className="min-h-[100vh] lg:h-[100vh] lg:max-h-screen flex flex-col justify-center relative overflow-hidden bg-[#FAF7F2] border-t border-[#12304A]/8 py-12 lg:py-6"
        >
          <div className="max-w-[1400px] xl:max-w-[1480px] 2xl:max-w-[1540px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full my-auto">
            {/* ─── 3-Column Art-Directed Layout: Left (Top-Aligned) · Center Photo · Right (Bottom-Aligned) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-stretch">
              {/* ── Left Column: Top-Aligned with Top of Photo Frame (4 cols) ── */}
              <div
                ref={leftColRef}
                className="lg:col-span-4 flex flex-col justify-start space-y-3.5 sm:space-y-4 text-left lg:translate-x-6 xl:translate-x-8 2xl:translate-x-10"
              >
                {/* 1. Category Eyebrow with Gold Prefix Line */}
                <span className="insp-left-eyebrow inline-flex items-center gap-2.5 text-xs sm:text-[12.5px] font-bold tracking-[0.22em] uppercase font-sans text-[#C79A4B]">
                  <div className="w-8 h-[2px] bg-[#C79A4B] shrink-0" />
                  <span>OUR INSPIRATION</span>
                </span>

                {/* 2. Main Heading with Gold Span Highlight */}
                <h2 className="insp-left-heading text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-extrabold leading-[1.12] tracking-tight font-sans text-[#12304A]">
                  Guided by <span className="text-[#C79A4B]">Timeless Values</span>
                </h2>

                {/* 3. SIGNATURE GOLD ACCENT BAR */}
                <div className="insp-left-bar w-16 h-[3px] rounded-full bg-[#C79A4B]" />

                {/* 4. Foundational Philosophy */}
                <div className="space-y-3.5 pt-1 font-body text-[14px] sm:text-[14.5px] lg:text-[15px] xl:text-[15.5px] leading-[1.65] font-normal text-[#3E586D]">
                  <p className="insp-left-p">
                    At <strong className="font-bold text-[#12304A]">Ruskin Chemipharm</strong>, business is not only about transactions. It is about how we conduct ourselves in every one of them.
                  </p>
                  <p className="insp-left-p font-medium text-[#12304A]">
                    These principles are not separate from how we do business. They are the foundation of it.
                  </p>
                  <p className="insp-left-p text-[13.5px] sm:text-[14px] lg:text-[14.5px] leading-[1.65] text-[#556F83]">
                    Pujya Gurudevshri&apos;s teachings center on inner transformation, integrity, compassion, and selfless service. He teaches that true progress, in life and in work, comes not from what we achieve, but from how we achieve it.
                  </p>
                </div>
              </div>

              {/* ── Center Column: Classic Fine Line Picture Frame + Caption (4 cols) ── */}
              <div
                ref={photoRef}
                className="lg:col-span-4 flex flex-col items-center justify-start relative"
              >
                {/* Minimal Fine Line Picture Frame */}
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] xl:max-w-[420px] p-2.5 sm:p-3 border border-[#12304A]/15 bg-white/75 shadow-[0_6px_28px_rgba(18,48,74,0.06)]">
                  <div className="aspect-[4/4.85] relative w-full overflow-hidden">
                    <Image
                      src="/images/pujya-gurudevshri.jpg"
                      alt="Pujya Gurudevshri Rakeshji - Spiritual Master & Visionary"
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                </div>

                {/* Caption (Plus Jakarta Sans - font-sans, font-semibold) */}
                <div className="pt-3 text-center">
                  <span className="font-sans text-sm sm:text-[14.5px] font-semibold tracking-wide text-[#12304A]">
                    Pujya Gurudevshri Rakeshji
                  </span>
                </div>
              </div>

              {/* ── Right Column: Bottom-Aligned to Bottom of Photo Frame (4 cols) ── */}
              <div
                ref={rightColRef}
                className="lg:col-span-4 flex flex-col justify-end lg:pb-7 xl:pb-8 space-y-3.5 sm:space-y-4 text-left lg:-translate-x-2 xl:-translate-x-3 2xl:-translate-x-4"
              >
                {/* Global Mission & Spiritual Lineage */}
                <div className="insp-right-p1 font-body text-[14px] sm:text-[14.5px] lg:text-[15px] xl:text-[15.5px] leading-[1.65] font-normal text-[#3E586D]">
                  <p>
                    Our work is guided by the teachings of{" "}
                    <strong className="font-bold text-[#12304A]">Pujya Gurudevshri Rakeshji</strong>, an enlightened spiritual master, visionary, and the founder of Shrimad Rajchandra Mission Dharampur (www.srmd.org), a global spiritual organization with over 206 centers across six continents.
                  </p>
                </div>

                {/* Editorial Quote: Clean Line */}
                <div className="insp-quote-line relative pl-5 sm:pl-6 border-l-[3px] border-[#C79A4B] py-2 sm:py-2.5 my-1.5 sm:my-2">
                  <p className="insp-quote-text font-body text-[15.5px] sm:text-[16.5px] lg:text-[17.5px] font-normal italic leading-relaxed text-[#12304A]">
                    &ldquo;The way you conduct yourself in every interaction is a reflection of your inner values.&rdquo;
                  </p>
                </div>

                {/* Closing Ruskin Commitment */}
                <p className="insp-right-p2 font-body text-[14px] sm:text-[14.5px] lg:text-[15px] xl:text-[15.5px] leading-[1.65] font-normal text-[#3E586D]">
                  At <strong className="font-bold text-[#12304A]">Ruskin Chemipharm</strong>, this translates into the way we treat our clients, our suppliers, and our partners, with honesty, accountability, and a genuine commitment to their success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. OUR STORY ──────────────────────────────────────────────── */}
        <section
          id="our-story"
          className="py-16 sm:py-20 lg:py-28 bg-white text-[#3E586D] relative border-t border-[#12304A]/8 overflow-hidden"
        >
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start"
            >
              {/* ── Left Column: Narrative Copy (7 cols) ── */}
              <div className="lg:col-span-7 space-y-7 text-left lg:translate-x-4 xl:translate-x-6">
                {/* 1. Section Header */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="space-y-3"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#12304A] leading-tight tracking-tight font-sans">
                    Our <span className="text-[#C79A4B]">Story</span>
                  </h2>

                  {/* Signature Ruskin Gold Accent Bar */}
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0, opacity: 0 },
                      visible: {
                        scaleX: 1,
                        opacity: 1,
                        transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                    className="w-14 h-[3px] rounded-full bg-[#C79A4B] origin-left"
                  />
                </motion.div>

                {/* 2. Founding & Vision Narrative */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="font-body text-[15.5px] sm:text-base lg:text-[16.5px] leading-[1.75] text-[#3E586D]"
                >
                  <p>
                    Founded in <strong className="text-[#12304A] font-bold">1984 by Kiran Premchand Shah</strong> in Mumbai, Ruskin Chemipharm began with a bold vision: pioneering API imports from China while building a robust nationwide domestic distribution network. What started as an ambitious import operation quickly evolved into a leading international pharmaceutical indenting powerhouse. From Supplier to End-User, we are experts in end-to-end distribution of raw materials.
                  </p>
                </motion.div>

                {/* 3. Strategic Growth Milestones */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="space-y-3 font-body text-[15.5px] sm:text-base lg:text-[16.5px] leading-[1.75] text-[#3E586D]"
                >
                  <p className="font-semibold text-[#12304A]">
                    For over four decades, our growth has been driven by strategic leadership, regulatory rigour, and on-the-ground execution:
                  </p>

                  <div className="space-y-2.5">
                    <p>
                      In <strong className="text-[#12304A] font-bold">1997</strong>, <strong className="text-[#12304A] font-bold">Krishna Kumar Iyer</strong> joined as General Manager alongside Kiran Shah, accelerating our commercial scale.
                    </p>
                    <p>
                      In <strong className="text-[#12304A] font-bold">2014</strong>, <strong className="text-[#12304A] font-bold">Yash Jhaveri</strong> joined as Head of Marketing &amp; Operations to modernize local sales and operational workflows alongside Krishna Kumar Iyer.
                    </p>
                    <p>
                      In <strong className="text-[#12304A] font-bold">2024</strong>, <strong className="text-[#12304A] font-bold">Atman Ajmera</strong> joined to lead business development, driving strategic outreach and new institutional partnerships.
                    </p>
                  </div>
                </motion.div>

                {/* 4. Today & Founding Values */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="space-y-4 font-body text-[15.5px] sm:text-base lg:text-[16.5px] leading-[1.75] text-[#3E586D] pt-3"
                >
                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#12304A] leading-tight tracking-tight font-sans">
                      Today
                    </h3>

                    {/* Signature Ruskin Gold Accent Bar */}
                    <div className="w-14 h-[3px] rounded-full bg-[#C79A4B]" />
                  </div>

                  <p>
                    Ruskin Chemipharm stands as a multigenerational partner operating at the intersection of regulatory trust, global sourcing mastery, and modern market development. We remain committed to our founding values:
                  </p>

                  <div className="space-y-2.5">
                    <p>
                      <strong className="text-[#12304A] font-bold">Regulatory Excellence</strong>: Ensuring end-to-end compliance and securing direct approvals with top-tier international manufacturers.
                    </p>
                    <p>
                      <strong className="text-[#12304A] font-bold">Direct Sourcing Integrity</strong>: Leveraging long-term, audited supplier relationships to deliver pricing advantages and uninterrupted supply chains.
                    </p>
                    <p>
                      <strong className="text-[#12304A] font-bold">Enduring Relationships</strong>: Fostering transparent, decades-long partnerships with synthesizers and formulation leaders worldwide.
                    </p>
                  </div>

                  {/* Action CTA Row at the end of Our Story */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuoteModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#12304A] hover:bg-[#C79A4B] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                    >
                      <span>Request Sourcing Consultation</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C79A4B] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>
                    <Link
                      href="/products"
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#C79A4B] text-[#12304A] hover:text-white border border-[#12304A]/15 hover:border-[#C79A4B] font-bold text-xs sm:text-sm tracking-wide shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <span>Explore Active Products</span>
                      <ArrowRight className="w-4 h-4 text-[#C79A4B] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* ── Right Column: Photo Frame with Premium Animation (5 cols) ── */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 30, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      duration: 0.85,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start lg:sticky lg:top-20 lg:-mt-3 lg:-translate-x-6 xl:-translate-x-8 2xl:-translate-x-10"
              >
                <div className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[315px] p-2 sm:p-2.5 bg-[#FAF7F2] border border-[#12304A]/15 space-y-2.5">
                  <div className="aspect-[3/3.75] relative w-full overflow-hidden bg-[#071521]">
                    <Image
                      src="/images/kiran-shah.jpg"
                      alt="Kiran Premchand Shah - Founder of Ruskin Chemipharm, Est. 1984"
                      fill
                      sizes="(max-width: 768px) 100vw, 315px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>

                  <div className="px-2 pb-1 text-center">
                    <div className="text-sm font-bold text-[#12304A] font-sans">
                      Kiran Premchand Shah
                    </div>
                    <div className="text-xs text-[#C79A4B] font-semibold font-sans mt-0.5">
                      Founder · Est. 1984
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── 5. CALL TO ACTION BANNER ─────────────────────────────────────────── */}
        <CtaBanner onRequestQuote={() => setQuoteModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCatalog={() => (window.location.href = "/products")} />

      {/* ─── REQUEST QUOTE MODAL ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#12304A]/50 backdrop-blur-sm"
              onClick={() => setQuoteModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-10 w-[min(480px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white shadow-2xl border border-[#12304A]/10 text-left p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-4 right-4 text-[#5A7A8E] hover:text-[#12304A] p-1.5 rounded-full hover:bg-[#12304A]/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#C79A4B] tracking-widest mb-1">
                    CONNECT WITH RUSKIN CHEMIPHARM
                  </div>
                  <h3 className="text-xl font-extrabold text-[#12304A]">
                    Schedule a Sourcing Consultation
                  </h3>
                  <p className="text-xs text-[#5A7A8E] mt-1">
                    Our commercial and regulatory sourcing team responds within 4 business hours.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you. Your consultation request has been dispatched to our commercial desk.");
                    setQuoteModalOpen(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Dr. Sarah Jenkins"
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Corporate Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="s.jenkins@pharmalabs.com"
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#12304A] mb-1">
                      Target Active Ingredient / Inquiry Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Specify API molecule, grade (USP/EP/IP), and estimated commercial volume..."
                      className="w-full bg-[#FAF7F2] border border-[#12304A]/10 focus:border-[#C79A4B] rounded-xl px-4 py-2.5 text-xs text-[#12304A] placeholder-[#5A7A8E]/60 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#12304A] hover:bg-[#0B1E2E] text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Transmit Sourcing Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
