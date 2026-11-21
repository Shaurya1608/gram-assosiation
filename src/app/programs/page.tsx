"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

type ProgramCategory =
  | "All Programs"
  | "Water Conservation"
  | "Livelihood"
  | "Education"
  | "Health"
  | "Community Engagement"
  | "Environment";

interface ProgramItem {
  id: string;
  title: string;
  category: Exclude<ProgramCategory, "All Programs">;
  year: string;
  location: string;
  summary: string;
  details: string;
  impact: string;
  image: string;
}

const PROG_BASE =
  "/images/GRAM_photos -20261121T180535Z-1-001/GRAM_photos/Photos/Program_Project Photos";

const CATEGORIES: ProgramCategory[] = [
  "All Programs",
  "Water Conservation",
  "Livelihood",
  "Education",
  "Health",
  "Community Engagement",
  "Environment",
];

const PROGRAMS: ProgramItem[] = [
  {
    id: "rasabeda-spring",
    title:
      "Rasabeda Spring Water Management Project (2019): Ending Water Crisis in Rasabeda Village, Jharkhand",
    category: "Water Conservation",
    year: "2019",
    location: "Rasabeda, Jharkhand",
    summary:
      "Harnessing natural perennial mountain springs through community-built gravity-fed pipelines and storage tanks without electric pumps.",
    details:
      "Working alongside the Rasabeda Village Jal Samiti and Santhal Panchayats, GRAM mapped natural hillside springs and engineered a zero-electricity gravity-fed distribution system. Over 2,500 liters of clean spring water now flow daily to village standposts, saving women hours of steep mountain climbs every morning.",
    impact: "2,500+ Liters/Day Gravity-Fed Clean Water",
    image: "/images/programs/rasabeda.jpg",
  },
  {
    id: "kherwatikra-pond",
    title:
      "Restoring Hope Through Water: Pond Rejuvenation in Kherwatikra, Jharkhand",
    category: "Water Conservation",
    year: "2020",
    location: "Kherwatikra, Jharkhand",
    summary:
      "In 2020, amid the challenges of the COVID-19 pandemic, GRAM led deep community desilting of Gudibandh Talab to restore village water security.",
    details:
      "Through participatory labor and watershed engineering, silted village ponds were deepened and strengthened with earthen bunds and monsoon recharge trenches. The restored Gudibandh Talab now retains water through peak summer months, recharging 40+ surrounding wells and protecting 500+ acres of farmland.",
    impact: "500+ Acres Farmland & 40+ Wells Recharged",
    image: "/images/programs/kherwatikra-pond-full.jpg",
  },
  {
    id: "birbhum-fluoride",
    title:
      "Laying the Groundwork for Safe Water Access: Birbhum Fluoride Mitigation Support Project (2020–2021)",
    category: "Water Conservation",
    year: "2020–2021",
    location: "Birbhum, West Bengal",
    summary:
      "Implementing grassroots water-quality testing, low-cost adsorption filtration, and community health screening to combat endemic fluorosis.",
    details:
      "In fluoride-affected villages of Birbhum, GRAM partnered with local health workers and school committees to test drinking water sources, install community-managed adsorption filters, and educate families on safe water practices to prevent irreversible dental and skeletal fluorosis.",
    impact: "Safe Drinking Water (< 1.0 ppm Fluoride)",
    image: "/images/programs/birbhum.jpg",
  },
  {
    id: "covid-relief",
    title: "Health Response: COVID Relief (2020)",
    category: "Health",
    year: "2020",
    location: "Ranchi District, Jharkhand",
    summary:
      "During the first wave of the pandemic, GRAM Association focused on supporting vulnerable communities in Ranchi district by delivering essential relief.",
    details:
      "Mobilizing local volunteers and community networks during strict lockdowns, GRAM distributed dry ration kits, hygiene supplies, masks, and verified public health guidance to daily-wage families and remote tribal hamlets across Ranchi district.",
    impact: "Emergency Ration & Hygiene Kits Delivered",
    image: encodeURI(`${PROG_BASE}/7. COVID Relief/IMG_4219.JPG`),
  },
  {
    id: "bridge-school",
    title: "Digital Bridge School Initiative (2020–21)",
    category: "Education",
    year: "2020–2021",
    location: "Rural Jharkhand",
    summary:
      "In many remote villages of Jharkhand, formal schooling remains out of reach for countless children. To bridge this gap, GRAM launched digital learning hubs.",
    details:
      "When pandemic school closures widened the rural-urban learning divide, GRAM set up community-hosted Digital Bridge Schools equipped with tablets, offline vernacular curricula, and local youth facilitators to keep foundational literacy and numeracy alive.",
    impact: "Continuous Rural Learning During Lockdowns",
    image: encodeURI(`${PROG_BASE}/8. Bridge School/photo_2020-12-01 14.57.05.jpeg`),
  },
  {
    id: "shodhyatra",
    title: "Shodhyatra 2.0 – Rural Immersion with IIM Ranchi (2021)",
    category: "Community Engagement",
    year: "2021",
    location: "Jharkhand",
    summary:
      "In March 2021, GRAM Association partnered with IIM Ranchi to host Shodhyatra 2.0, a hands-on rural immersion journey.",
    details:
      "Bringing management students directly into rural villages, Shodhyatra 2.0 fostered mutual learning between grassroots innovators, local farmers, and future policy leaders—documenting traditional ecological knowledge and community-led enterprises.",
    impact: "University–Village Knowledge Exchange",
    image: encodeURI(`${PROG_BASE}/9. Sodhyatra/171818783_817058088932443_6275411626574410706_n.jpg`),
  },
  {
    id: "food-forest",
    title: "Community Food Forest Initiative (2020)",
    category: "Environment",
    year: "2020",
    location: "Jharkhand",
    summary:
      "Cultivating multi-layered native food forests on degraded village commons to restore biodiversity, soil moisture, and nutritional security.",
    details:
      "By planting native fruit, fodder, and nitrogen-fixing species alongside contour moisture trenches, GRAM helped village communities transform barren patches into self-sustaining food forests that support both ecological regeneration and household nutrition.",
    impact: "Native Biodiversity & Soil Moisture Restored",
    image: encodeURI(`${PROG_BASE}/10. Food Forest/Shortlist 1.jpg`),
  },
  {
    id: "leaf-plate",
    title: "Sal Leaf Plate & Bowl Making Initiative",
    category: "Livelihood",
    year: "2021",
    location: "Forest Fringe Villages",
    summary:
      "Training tribal women's Self-Help Groups with heat-press machinery to produce biodegradable Sal leaf dinnerware and build collective income.",
    details:
      "In collaboration with IIM UBA and local SHG federations, GRAM equipped forest-fringe women collectives with semi-automated leaf-press machines, quality training, and market linkages—turning seasonal leaf gathering into dignified year-round micro-enterprises.",
    impact: "3x Household Income Growth for Women SHGs",
    image: "/images/programs/leafplate.jpg",
  },
  {
    id: "rasabeda-tourism",
    title: "Rasabeda & Dharampur Community Ecotourism",
    category: "Livelihood",
    year: "2021–2022",
    location: "Rasabeda & Dharampur",
    summary:
      "Developing community-owned rural homestays and nature trails that channel sustainable tourism revenue directly to village families.",
    details:
      "GRAM worked with local youth and panchayats in Rasabeda and Dharampur to design low-impact cultural and ecological tourism experiences, creating local hospitality livelihoods while incentivizing forest and spring conservation.",
    impact: "Community-Owned Ecotourism Livelihoods",
    image: encodeURI(`${PROG_BASE}/4. Rasabeda Tourism Project/DSC_0073.JPG`),
  },
  {
    id: "fpo-sahyog",
    title: "Farmer Producer Organization (FPO) & Sahyog Collectives",
    category: "Livelihood",
    year: "2022–2026",
    location: "Jharkhand",
    summary:
      "Strengthening smallholder farmer collectives through cluster leadership, NABARD linkages, and fair-market aggregation.",
    details:
      "Supporting farmer cluster leaders with institutional governance, input aggregation, and direct market access, GRAM helps smallholders move from distress selling to collective bargaining—earning recognition from NABARD for grassroots FPO leadership.",
    impact: "NABARD-Recognized Farmer Collectives",
    image: encodeURI(`${PROG_BASE}/12. FPO/FPC felicitated by chairman NABARD.jpeg`),
  },
  {
    id: "virksha",
    title: "VIRKSHA – Community Afforestation & Nursery Program",
    category: "Environment",
    year: "2025–2026",
    location: "Rural Jharkhand",
    summary:
      "Scaling community-managed sapling nurseries and native tree plantations to rebuild watershed green cover and rural climate resilience.",
    details:
      "Through VIRKSHA, local youth and women groups raise native saplings adapted to local soil and rainfall patterns, ensuring high survival rates and long-term stewardship of village watersheds.",
    impact: "Community-Led Native Reforestation",
    image: encodeURI(`${PROG_BASE}/13. VIRKSHA/WhatsApp Image 2026-04-24 at 10.46.29.jpeg`),
  },
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProgramCategory>("All Programs");
  const [activeProgram, setActiveProgram] = useState<ProgramItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === "All Programs") return PROGRAMS;
    return PROGRAMS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAF6] text-[#1B2418] flex flex-col antialiased selection:bg-[#A9B689]/30 selection:text-[#1F2B1A]">
      {/* ============================================================ */}
      {/* 1. FULL SITE STANDARD NAVBAR                                 */}
      {/* ============================================================ */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#F8FAF6]/95 backdrop-blur-md border-[#1F2B1A]/10 shadow-xs py-2.5 sm:py-3"
            : "bg-[#F8FAF6]/90 backdrop-blur-sm border-[#1F2B1A]/6 py-3.5 sm:py-4"
        } px-4 sm:px-8 md:px-12 lg:px-16`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium tracking-wide">
            <Link
              href="/"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              About Us
            </Link>
            <Link
              href="/#focus-areas"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Focus Areas
            </Link>

            {/* Active Current Page Indicator */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4E8] text-[#1F2B1A] font-semibold text-xs border border-[#A9B689]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526639]" />
              <span>Our Programs</span>
            </span>

            <Link
              href="/#impact"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Impact
            </Link>
            <Link
              href="/water-ride"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Water Ride
            </Link>
          </nav>

          {/* Center: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-102"
          >
            <Image
              src="/images/gram-logo.png"
              alt="GRAM Association"
              width={140}
              height={46}
              priority
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Right Navigation & Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/water-ride"
              className="text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Expedition Map
            </Link>
            <Link
              href="/#contact"
              className="text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Contact
            </Link>
            <Link
              href="/#contact"
              className="rounded-full px-5 py-2 text-[11px] font-bold tracking-wider uppercase transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6]"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/#contact"
              className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase bg-[#2E3D27] text-white"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#1F2B1A]/15 bg-[#EFF4E8] text-[#1F2B1A] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-3 right-3 z-50 p-5 rounded-2xl bg-[#1F2B1A] text-white shadow-2xl border border-white/15 flex flex-col gap-3 text-center">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold py-1.5 text-white/90 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            About Us
          </Link>
          <span className="text-sm font-bold py-1.5 text-[#A9B689]">Our Programs</span>
          <Link
            href="/#focus-areas"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Focus Areas
          </Link>
          <Link
            href="/#impact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Lasting Impact
          </Link>
          <Link
            href="/water-ride"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            The Water Ride
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 py-2.5 rounded-full bg-[#A9B689] text-[#1F2B1A] font-bold text-xs uppercase tracking-wider"
          >
            Get In Touch
          </Link>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. EDITORIAL HERO & CATEGORY FILTER BAR                      */}
      {/* ============================================================ */}
      <section className="w-full bg-[#F8FAF6] pt-14 pb-10 sm:pt-20 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/45">
            <span className="w-1.5 h-1.5 rounded-full bg-[#526639]" />
            <span>Our Programs</span>
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2B1A] leading-[1.1]">
            Making a Lasting Impact
          </h1>

          <p className="text-sm sm:text-base text-[#5C6B55] max-w-2xl leading-relaxed">
            Explore our diverse range of programs designed to create sustainable change and improve lives in rural communities across India.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1F2B1A] text-white shadow-sm"
                      : "bg-white text-[#42503B] hover:bg-[#EFF4E8] border border-[#1F2B1A]/12"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PROGRAMS 3-COLUMN GRID                                    */}
      {/* ============================================================ */}
      <section className="w-full flex-1 bg-[#F8FAF6] pb-20 pt-4 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPrograms.map((program) => (
              <article
                key={program.id}
                onClick={() => setActiveProgram(program)}
                className="rounded-3xl bg-white border border-[#1F2B1A]/10 hover:border-[#829461]/55 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Image Header */}
                <div className="relative w-full aspect-[16/10] bg-[#EFF4E8] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1F2B1A] text-[11px] font-semibold shadow-2xs">
                    {program.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-[#6C7D51]">
                      <span>{program.location}</span>
                      <span>{program.year}</span>
                    </div>
                    <h2 className="font-serif font-bold text-lg text-[#1F2B1A] leading-snug group-hover:text-[#2E3D27]">
                      {program.title}
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#5C6B55] leading-relaxed line-clamp-3">
                      {program.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1F2B1A]/8 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#2E3D27] group-hover:text-[#526639] inline-flex items-center gap-1.5">
                      <span>Learn More</span>
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. PROGRAM DETAIL MODAL                                      */}
      {/* ============================================================ */}
      {activeProgram && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveProgram(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-white overflow-hidden shadow-2xl border border-[#1F2B1A]/15 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={() => setActiveProgram(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1F2B1A] flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="relative w-full h-56 sm:h-72 bg-[#1F2B1A] shrink-0">
              <Image
                src={activeProgram.image}
                alt={activeProgram.title}
                fill
                unoptimized
                className="object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#1F2B1A] text-xs font-semibold">
                  {activeProgram.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1F2B1A]/85 text-white text-xs font-medium">
                  {activeProgram.location} · {activeProgram.year}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2B1A] leading-snug">
                {activeProgram.title}
              </h3>
              <p className="text-sm sm:text-[15px] text-[#42503B] leading-relaxed">
                {activeProgram.details}
              </p>
              <div className="p-4 rounded-2xl bg-[#EFF4E8] border border-[#A9B689]/40 flex items-center justify-between gap-3 mt-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6C7D51]">
                    Key Outcome
                  </span>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1F2B1A]">
                    {activeProgram.impact}
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="shrink-0 px-4 py-2 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-white text-[11px] font-bold uppercase tracking-wider"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. COMPLETE STANDARD FOOTER                                  */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#1F2B1A] text-white py-12 px-6 sm:px-10 md:px-14 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Image
              src="/images/gram-logo-white.png"
              alt="GRAM Association"
              width={160}
              height={55}
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <span className="text-[#EFF4E8]/70 text-xs sm:text-sm border-t sm:border-t-0 sm:border-l border-[#EFF4E8]/20 pt-2 sm:pt-0 sm:pl-4">
              Groundwater &amp; Reforestation Adaptive Management Association
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F8FAF6]/80">
            <Link href="/" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Home
            </Link>
            <Link href="/about-us" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              About Us
            </Link>
            <Link href="/#focus-areas" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Focus Areas
            </Link>
            <Link href="/#impact" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Impact
            </Link>
            <Link href="/water-ride" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Water Ride
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFF4E8]/60 gap-3">
          <p>© 2026 GRAM Association. All Rights Reserved.</p>
          <p className="italic font-serif">“The soul of India lives in its villages” — Mahatma Gandhi</p>
        </div>
      </footer>
    </div>
  );
}
