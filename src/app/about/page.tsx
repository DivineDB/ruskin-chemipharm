"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Quote,
  ArrowRight,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

// ─── Inline LinkedIn Icon Component ──────────────────────────────────────────
function LinkedInIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// ─── High-End Executive Placeholder Frame (Sharp corners, studio aesthetic) ───
function ExecutivePortraitPlaceholder({
  initials,
  name,
  role,
}: {
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0b1e2e] via-[#071521] to-[#040e16] flex flex-col items-center justify-center overflow-hidden p-6 select-none rounded-none">
      {/* Precision architectural dot grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C79A4B 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      />

      {/* Ambient studio spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(199,154,75,0.18)_0%,transparent_70%)]" />

      {/* Monogram Badge */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none border border-[#C79A4B]/40 bg-[#12304A]/70 backdrop-blur-xs flex items-center justify-center relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-[#C79A4B] transition-colors duration-500">
          {/* Subtle gold corner marks */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C79A4B]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C79A4B]" />

          <span className="text-2xl sm:text-3xl font-sans font-extrabold tracking-wider text-[#C79A4B]">
            {initials}
          </span>
        </div>

        {/* Studio Lighting Vignette Line */}
        <div className="mt-4 flex items-center gap-2">
          <div className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#C79A4B]/60" />
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#C79A4B]/80 font-bold">
            Executive Desk
          </span>
          <div className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#C79A4B]/60" />
        </div>
      </div>

      {/* Bottom vignette gradient */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#071521] to-transparent pointer-events-none" />
    </div>
  );
}

interface ExecutiveMember {
  name: string;
  role: string;
  tier: "senior" | "functional";
  image?: string;
  initials: string;
  linkedin: string;
  description: string;
}

const LEADERSHIP_MEMBERS: ExecutiveMember[] = [
  {
    name: "Krishna Kumar Iyer",
    role: "GENERAL MANAGER",
    tier: "senior",
    initials: "KI",
    linkedin: "https://linkedin.com/in/krishna-kumar-iyer",
    description: "Joined in 1997 to anchor operational scalability, global principal alliances, and cross-border logistics excellence.",
  },
  {
    name: "Yash Jhaveri",
    role: "HEAD OF MARKETING & OPERATIONS",
    tier: "senior",
    initials: "YJ",
    linkedin: "https://linkedin.com/in/yash-jhaveri",
    description: "Driving commercial expansion, international indenting partnerships, and strategic pipelines since 2014.",
  },
  {
    name: "Atman Ajmera",
    role: "BUSINESS DEVELOPMENT LEAD",
    tier: "functional",
    initials: "AA",
    linkedin: "https://linkedin.com/in/atman-ajmera",
    description: "Driving next-generation API sourcing programs, strategic outreach, and institutional buyer partnerships.",
  },
];

const SRLC_SLIDES = [
  {
    image: "/srlc-hospital-banner.jpg",
    alt: "Shrimad Rajchandra Love and Care - Hospital and Healthcare Initiatives",
    tag: "HEALTHCARE INITIATIVES · DHARAMPUR, GUJARAT",
    title: "Multispeciality Hospital & Research Centre",
    description:
      "Providing world-class, charitable medical care to underserved tribal communities in South Gujarat across 10 holistic care pillars.",
  },
  {
    image: "/srlc-hero-banner.jpg",
    alt: "Shrimad Rajchandra Love and Care - Holistic Care Programmes",
    tag: "HOLISTIC CARE PROGRAMMES · GLOBAL OUTREACH",
    title: "Empowering Lives Across 10 Care Pillars",
    description:
      "Impacting over 21 million lives worldwide through humanitarian relief, education, women empowerment, and environmental preservation.",
  },
  {
    image: "/srlc-tmm-banner.png",
    alt: "Shrimad Rajchandra Love and Care - Tata Mumbai Marathon",
    tag: "COMMUNITY ENGAGEMENT · TATA MUMBAI MARATHON",
    title: "13× Highest Fundraising NGO",
    description:
      "Recognized repeatedly as the highest fundraising NGO at the Tata Mumbai Marathon, powered by unwavering selfless volunteerism.",
  },
  {
    image: "/srlc-banner-bapa.jpg",
    alt: "Shrimad Rajchandra Love and Care - Compassionate Humanitarian Relief",
    tag: "COMPASSION IN ACTION · GLOBAL REACH",
    title: "Service With Empathy & Integrity",
    description:
      "A global movement inspired by Shrimad Rajchandraji and guided by Pujya Gurudevshri Rakeshji, serving all living beings selflessly.",
  },
];

const SRLC_METRICS = [
  { value: "21M+", label: "Lives Touched Globally" },
  { value: "10", label: "Holistic Care Categories" },
  { value: "UN ECOSOC", label: "Special Consultative Status" },
  { value: "13×", label: "Highest Fundraising NGO at Tata Mumbai Marathon" },
];

export default function AboutPage() {
  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const ribbonProgressRef = useRef<SVGPathElement>(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [currentSrlcSlide, setCurrentSrlcSlide] = useState(0);
  const [isSrlcPaused, setIsSrlcPaused] = useState(false);

  useEffect(() => {
    if (isSrlcPaused) return;
    const interval = setInterval(() => {
      setCurrentSrlcSlide((prev) => (prev + 1) % SRLC_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isSrlcPaused]);

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
                  From pioneering API imports in 1984 to direct factory indenting, landmark DCGI approvals, and enduring global synthesizer alliances.
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

                {/* Caption (Plus Jakarta Sans - font-sans, larger & signature gold) */}
                <div className="pt-3 text-center">
                  <span className="font-sans text-base sm:text-lg font-bold tracking-wide text-[#C79A4B]">
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

        {/* ─── 5. LEADERSHIP: THE FACES OF RUSKIN CHEMIPHARM ───────────────────── */}
        <section
          id="leadership"
          className="py-24 sm:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-[#12304A]/10 text-left"
        >
          {/* Subtle Ambient Vignettes */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Standard Ruskin 4-Part Header Stack */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="space-y-3 text-left mb-14 sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase">
                <div className="w-8 h-[2px] bg-[#C79A4B]" />
                LEADERSHIP & EXECUTIVE TEAM
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#12304A] leading-tight tracking-tight">
                The Faces of <span className="text-[#C79A4B]">Ruskin Chemipharm</span>
              </h2>

              <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />

              <p className="text-base sm:text-lg text-[#5A7A8E] font-normal max-w-2xl lg:max-w-3xl leading-relaxed">
                Four decades of trust, scientific precision, and enduring global partnerships—built by people who care.
              </p>
            </motion.div>

            {/* ── 3 Primary Leaders: Krishna, Yash, and Atman ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            >
              {LEADERSHIP_MEMBERS.map((member) => (
                <motion.div
                  key={member.name}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white border border-[#12304A]/15 rounded-none shadow-[0_4px_20px_rgba(18,48,74,0.04)] hover:shadow-[0_20px_40px_rgba(18,48,74,0.12)] hover:border-[#C79A4B] transition-all duration-500 flex flex-col overflow-hidden"
                >
                  {/* Photo Frame (Strictly square corners - rounded-none) */}
                  <div className="aspect-[3/3.6] w-full relative overflow-hidden bg-[#071521] rounded-none">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out rounded-none"
                      />
                    ) : (
                      <ExecutivePortraitPlaceholder
                        initials={member.initials}
                        name={member.name}
                        role={member.role}
                      />
                    )}

                    {/* Subtle Corner Architectural Accent */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C79A4B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Caption & Leadership Details */}
                  <div className="p-6 bg-white flex flex-col justify-between flex-1 border-t border-[#12304A]/10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#12304A] font-sans group-hover:text-[#C79A4B] transition-colors leading-snug">
                        {member.name}
                      </h3>
                      <div className="text-[11px] font-bold text-[#C79A4B] tracking-wider uppercase mt-1">
                        {member.role}
                      </div>
                      <p className="text-xs text-[#5A7A8E] mt-2.5 leading-relaxed">
                        {member.description}
                      </p>
                    </div>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A7A8E] hover:text-[#0A66C2] transition-colors mt-5 pt-3.5 border-t border-[#12304A]/10 w-full group/link"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <div className="w-5 h-5 bg-[#0A66C2] text-white flex items-center justify-center rounded-none shadow-xs group-hover/link:brightness-110 transition-all">
                        <LinkedInIcon className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-[11px] tracking-wide font-medium">LinkedIn Profile</span>
                      <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all text-[#0A66C2]" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 6. GIVING BACK: A COMMITMENT TO CARE (SRLC 10-FOLD PROGRAMME) ────── */}
        <section
          id="giving-back"
          className="pt-20 sm:pt-28 pb-0 bg-[#FAF7F2] relative overflow-hidden border-t border-[#12304A]/10 text-left"
        >
          {/* Subtle Ambient Background Hairline Texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#12304A 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* ── Editorial Top Grid: Header Stack + Narrative Split ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start"
            >
              {/* Left Column: Mandatory 4-Part Left-Aligned Header Stack with SRLC Logo above heading */}
              <div className="lg:col-span-6 space-y-3.5">
                <span className="inline-flex items-center gap-2 text-[#C79A4B] text-xs sm:text-sm font-bold tracking-widest uppercase font-mono">
                  <div className="w-8 h-[2px] bg-[#C79A4B]" />
                  GIVING BACK & SOCIAL RESPONSIBILITY
                </span>

                {/* SRLC Logo moved to top of heading */}
                <div className="pt-1 pb-0.5">
                  <img
                    src="/srlc-logo.png"
                    alt="Shrimad Rajchandra Love and Care"
                    className="h-10 sm:h-12 w-auto object-contain opacity-95"
                  />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[44px] font-extrabold text-[#12304A] font-sans leading-[1.14] tracking-tight">
                  A Commitment to <span className="text-[#C79A4B]">Community & Care</span>
                </h2>

                <div className="w-16 h-[3px] rounded-full bg-[#C79A4B]" />
              </div>

              {/* Right Column: Editorial Narrative (Exact requested copy) */}
              <div className="lg:col-span-6 space-y-4 text-sm sm:text-[15px] text-[#5A7A8E] font-sans leading-relaxed lg:pt-3">
                <p>
                  At Ruskin Chemipharm, our responsibility extends beyond supply chains and market leadership. We are privileged to support <strong className="text-[#12304A] font-semibold">Shrimad Rajchandra Love and Care (SRLC)</strong>, a global humanitarian movement inspired by Shrimad Rajchandraji and guided by <strong className="text-[#12304A] font-semibold">Pujya Gurudevshri Rakeshji</strong>.
                </p>
                <p>
                  Operating across ten comprehensive care categories—ranging from healthcare and education to environmental care and animal welfare—SRLC has impacted over 21 million lives worldwide. The organization’s operational scale, transparency, and relentless commitment to service reflect the core values we hold at Ruskin.
                </p>
                <p className="text-[#12304A] font-medium pt-1">
                  Our association with SRLC is driven by a shared belief in sustainable impact, institutional integrity, and meaningful service to society.
                </p>

                <div className="pt-2">
                  <a
                    href="https://loveandcare.srmd.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase text-[#12304A] hover:text-[#C79A4B] transition-colors group cursor-pointer"
                  >
                    <span>Explore SRLC Global Work</span>
                    <div className="w-6 h-[1.5px] bg-[#C79A4B] group-hover:w-10 transition-all duration-300" />
                    <ArrowUpRight className="w-4 h-4 text-[#C79A4B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Middle: SRLC Interactive Carousel Banner ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              onMouseEnter={() => setIsSrlcPaused(true)}
              onMouseLeave={() => setIsSrlcPaused(false)}
              className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden border border-[#12304A]/12 group shadow-xl bg-[#071521]"
            >
              {/* Carousel Slides */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSrlcSlide}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={SRLC_SLIDES[currentSrlcSlide].image}
                    alt={SRLC_SLIDES[currentSrlcSlide].alt}
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient Vignette: anchored to bottom ~45% so top stays bright & visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071521] via-[#071521]/70 via-42% to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071521]/80 via-transparent to-transparent pointer-events-none hidden sm:block" />

              {/* Top Right: Official SRLC White Logo Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 bg-[#0B1E2E]/85 backdrop-blur-md px-4 py-2.5 border border-white/15 flex items-center gap-3">
                <img
                  src="/srlc-logo-white.png"
                  alt="Shrimad Rajchandra Love and Care Official Logo"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>

              {/* Carousel Navigation Arrows */}
              <button
                type="button"
                onClick={() =>
                  setCurrentSrlcSlide(
                    (prev) => (prev - 1 + SRLC_SLIDES.length) % SRLC_SLIDES.length
                  )
                }
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#071521]/70 hover:bg-[#C79A4B] text-white border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentSrlcSlide((prev) => (prev + 1) % SRLC_SLIDES.length)
                }
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#071521]/70 hover:bg-[#C79A4B] text-white border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg backdrop-blur-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-2 max-w-2xl text-left">
                  <span className="inline-flex items-center gap-2 text-[#E5C378] text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase">
                    <div className="w-5 h-[1.5px] bg-[#E5C378]" />
                    {SRLC_SLIDES[currentSrlcSlide].tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-sans tracking-tight leading-snug">
                    {SRLC_SLIDES[currentSrlcSlide].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {SRLC_SLIDES[currentSrlcSlide].description}
                  </p>

                  {/* Slide Progress / Indicators */}
                  <div className="flex items-center gap-2 pt-2">
                    {SRLC_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSrlcSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                          currentSrlcSlide === idx
                            ? "w-8 bg-[#C79A4B]"
                            : "w-2.5 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <a
                  href="https://loveandcare.srmd.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#C79A4B] hover:bg-[#B58A3E] text-white text-xs font-bold font-mono tracking-wider uppercase transition-colors shrink-0 cursor-pointer shadow-lg"
                >
                  <span>Visit Official SRLC Portal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Lower: Full-Width Edge-to-Edge Impact Ribbon (No Shadow, Filled Left to Right) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="w-full bg-[#C79A4B] py-8 sm:py-10 mt-12 sm:mt-16 mb-0 relative z-10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {SRLC_METRICS.map((metric, idx) => (
                <motion.div
                  key={metric.value}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={`space-y-1.5 ${
                    idx !== 0 ? "lg:border-l lg:border-white/25 lg:pl-8" : ""
                  }`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white font-sans tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-sans leading-snug">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── 7. CALL TO ACTION BANNER ─────────────────────────────────────────── */}
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
