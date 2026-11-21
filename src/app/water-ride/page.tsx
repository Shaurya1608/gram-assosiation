"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map (client-only)
const WaterRideLeafletMap = dynamic(
  () => import("@/components/WaterRideLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] rounded-3xl bg-[#EFF4E8]/50 flex flex-col items-center justify-center gap-3 border border-[#1F2B1A]/10 shadow-inner">
        <span className="w-9 h-9 border-3 border-[#526639] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-serif italic text-[#526639]">
          Loading High-Resolution India Highway Map & GPS Telemetry...
        </span>
      </div>
    ),
  }
);

export default function WaterRidePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAF6] text-[#1B2418] flex flex-col antialiased selection:bg-[#A9B689]/30 selection:text-[#1F2B1A]">
      {/* ============================================================ */}
      {/* 1. FULL SITE STANDARD NAVBAR (Persistent & Glassmorphic)     */}
      {/* ============================================================ */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#F8FAF6]/95 backdrop-blur-md border-[#1F2B1A]/12 shadow-xs py-2.5 sm:py-3"
            : "bg-[#F8FAF6]/90 backdrop-blur-sm border-[#1F2B1A]/8 py-3.5 sm:py-4"
        } px-4 sm:px-8 md:px-12 lg:px-16`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs sm:text-[13px] font-medium tracking-wide">
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
              About
            </Link>
            <Link
              href="/#focus-areas"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Focus Areas
            </Link>
            <Link
              href="/programs"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Programs
            </Link>
            <Link
              href="/#impact"
              className="text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Impact
            </Link>

            {/* Active Current Page Indicator */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4E8] text-[#1F2B1A] font-bold text-xs border border-[#A9B689]/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526639] animate-pulse" />
              <span>Water Ride</span>
            </span>
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
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300"
            />
          </Link>

          {/* Right Navigation & Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            <button
              onClick={() => scrollToSection("interactive-map")}
              className="text-xs sm:text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Interactive Map
            </button>
            <button
              onClick={() => scrollToSection("field-journal")}
              className="text-xs sm:text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Field Journal
            </button>
            <Link
              href="/#contact"
              className="text-xs sm:text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Contact
            </Link>
            <Link
              href="/#contact"
              className="rounded-full px-4.5 py-1.5 sm:px-5 sm:py-2 text-[11px] font-bold tracking-wider uppercase shadow-2xs hover:shadow-xs transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] border border-[#829461]/30 ml-1"
            >
              Get In Touch
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => scrollToSection("interactive-map")}
              className="px-3 py-1 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-[11px] font-semibold border border-[#A9B689]/40 cursor-pointer"
            >
              Map
            </button>
            <Link
              href="/#contact"
              className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#2E3D27] text-white"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 rounded-full border border-[#1F2B1A]/20 bg-[#EFF4E8] text-[#1F2B1A] flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
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
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            About & Vision
          </Link>
          <Link
            href="/#focus-areas"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Focus Areas
          </Link>
          <Link
            href="/#programs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Key Programs
          </Link>
          <Link
            href="/#impact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Lasting Impact
          </Link>
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection("interactive-map")}
              className="text-sm font-bold py-1.5 text-[#A9B689] hover:text-white"
            >
              Interactive Highway Map
            </button>
            <button
              onClick={() => scrollToSection("field-journal")}
              className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
            >
              Field Journal & Discoveries
            </button>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 py-2 rounded-full bg-[#A9B689] text-[#1F2B1A] font-bold text-xs uppercase tracking-wider"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. SPACIOUS EDITORIAL HERO SECTION                           */}
      {/* ============================================================ */}
      <section className="relative w-full bg-[#F8FAF6] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-[#1F2B1A]/10 overflow-hidden">
        {/* Subtle Ambient Sage Glow */}
        <div className="pointer-events-none absolute -top-28 right-12 w-[420px] h-[420px] rounded-full bg-[#A9B689]/12 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 lg:gap-12">
          {/* Top Editorial Title Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/45">
                <span className="w-1.5 h-1.5 rounded-full bg-[#526639] animate-pulse" />
                <span>National Ecological Expedition</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-[#1F2B1A] leading-[1.12]">
                7,200 KM Across India’s{" "}
                <span className="italic font-normal text-[#526639]">
                  Living Water Wisdom
                </span>
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start gap-5">
              <p className="text-sm sm:text-base text-[#5C6B55] leading-relaxed">
                A 64-day solo motorcycle expedition across 9 Indian states to unearth, GPS-map, and preserve centuries-old indigenous water harvesting architectures.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToSection("interactive-map")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:scale-102 active:scale-98 cursor-pointer"
                >
                  <span>Explore Route Cockpit</span>
                  <span>↓</span>
                </button>
                <button
                  onClick={() => scrollToSection("water-wisdom")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] border border-[#1F2B1A]/15 text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Water Architectures</span>
                </button>
              </div>
            </div>
          </div>

          {/* Spacious Bento Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Main Stage (7 cols): Clean Unobstructed Expedition Photo */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#1F2B1A] border border-[#1F2B1A]/12 shadow-md aspect-[16/10] min-h-[300px] group">
              <Image
                src="/images/water-ride-expedition.jpg"
                alt="The Water Ride Expedition Motorcycle overlooking river valley"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1A]/75 via-transparent to-transparent" />

              {/* Subtle Bottom-Left Telemetry Watermark */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div className="px-4 py-2.5 rounded-2xl bg-[#1F2B1A]/75 backdrop-blur-md border border-white/15 text-white">
                  <p className="text-[11px] font-mono tracking-wider text-[#A9B689] uppercase">
                    Tilonia, RJ → Dhanushkodi, TN → Bhubaneswar, OD
                  </p>
                  <p className="text-xs sm:text-sm font-serif text-white/95 mt-0.5">
                    Trans-India Highway & Village Trails
                  </p>
                </div>
              </div>
            </div>

            {/* Right Clean Card (5 cols): Airy Telemetry & Route Overview */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-9 border border-[#1F2B1A]/10 shadow-xs gap-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#6C7D51]">
                  Expedition Overview
                </span>
                <span className="px-3 py-1 rounded-full bg-[#EFF4E8] text-[11px] font-semibold text-[#2E3D27] border border-[#A9B689]/40">
                  Field Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] leading-none">
                    7,200 <span className="text-base font-normal text-[#6C7D51]">km</span>
                  </div>
                  <div className="text-xs text-[#5C6B55] mt-2">Total Distance</div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] leading-none">
                    64 <span className="text-base font-normal text-[#6C7D51]">days</span>
                  </div>
                  <div className="text-xs text-[#5C6B55] mt-2">On the Road</div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] leading-none">
                    30 <span className="text-base font-normal text-[#6C7D51]">hubs</span>
                  </div>
                  <div className="text-xs text-[#5C6B55] mt-2">Grassroots Stops</div>
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] leading-none">
                    9 <span className="text-base font-normal text-[#6C7D51]">states</span>
                  </div>
                  <div className="text-xs text-[#5C6B55] mt-2">Bioregions Mapped</div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F2B1A]/10 flex flex-col gap-4">
                <p className="text-xs text-[#5C6B55] leading-relaxed">
                  Rajasthan · Gujarat · Madhya Pradesh · Maharashtra · Karnataka · Kerala · Tamil Nadu · Andhra Pradesh · Odisha
                </p>
                <button
                  onClick={() => scrollToSection("interactive-map")}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#EFF4E8] hover:bg-[#2E3D27] text-[#1F2B1A] hover:text-white border border-[#A9B689]/40 text-xs font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer group"
                >
                  <span>Launch Interactive Highway Navigator</span>
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE HIGHWAY MAP COCKPIT SECTION                   */}
      {/* ============================================================ */}
      <section
        id="interactive-map"
        className="w-full scroll-mt-20 py-8 sm:py-12 px-3 sm:px-6 md:px-8 max-w-[1600px] mx-auto flex flex-col gap-4"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#526639]" />
            <span>Full Interactive Navigation System</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1F2B1A] tracking-tight">
            Expedition Route Navigator & Highway Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6B55] max-w-2xl leading-relaxed">
            Click any stop from the left itinerary to steer the motorcycle along the exact highway track, or click <strong>Play Tour</strong> to experience the continuous 7,200 km trans-India expedition.
          </p>
          <span className="px-3 py-1 rounded-full bg-white text-[#2E3D27] text-[11px] font-semibold border border-[#1F2B1A]/10 shadow-2xs">
            Esri Topo + Satellite Tiles Active
          </span>
        </div>

        {/* Leaflet Interactive Cockpit Container */}
        <div className="w-full">
          <WaterRideLeafletMap />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THE 4 PILLARS OF INDIGENOUS WATER WISDOM                  */}
      {/* ============================================================ */}
      <section
        id="water-wisdom"
        className="w-full scroll-mt-20 bg-white border-y border-[#1F2B1A]/10 py-14 sm:py-20 px-4 sm:px-8 md:px-12"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40">
              <span className="w-2 h-2 rounded-full bg-[#6C7D51]" />
              <span>Field Architectural Learnings</span>
            </div>
            <h2 className="mt-4 font-serif font-bold text-2xl sm:text-4xl text-[#1F2B1A] tracking-tight">
              Centuries-Old Water Wisdom Discovered on the Road
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5C6B55] leading-relaxed">
              Before industrial borewells drilled down hundreds of feet into fossil aquifers, India possessed sophisticated bioregional water stewardship architectures built around the micro-hydrology of each terrain.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 hover:border-[#829461]/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF4E8] text-[#2E3D27] flex items-center justify-center font-bold text-lg mb-4 border border-[#A9B689]/30">
                  01
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C7D51]">
                  Arid Fringes · Rajasthan & Gujarat
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1F2B1A] mt-1.5">
                  Baoris & Stepwells (Vavs)
                </h3>
                <p className="text-xs text-[#5C6B55] leading-relaxed mt-2.5">
                  Subterranean multi-tiered stone architecture carved down to deep groundwater tables. Shaded stone stairs dramatically reduce surface evaporation while providing cool sanctuary for desert travelers and pilgrims.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 text-[11px] font-semibold text-[#2E3D27] flex items-center justify-between">
                <span>45+ Structures Surveyed</span>
                <span className="text-[#829461]">✓ Active</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 hover:border-[#829461]/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF4E8] text-[#2E3D27] flex items-center justify-center font-bold text-lg mb-4 border border-[#A9B689]/30">
                  02
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C7D51]">
                  Desert Fringe · Thar & Shekhawati
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1F2B1A] mt-1.5">
                  Underground Kunds & Tankas
                </h3>
                <p className="text-xs text-[#5C6B55] leading-relaxed mt-2.5">
                  Circular lime-plastered subterranean cisterns with paved catchments collecting 100% of scarce monsoon rain. Supplies a family with sweet, pathogen-free potable drinking water across 8 rainless months without electricity.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 text-[11px] font-semibold text-[#2E3D27] flex items-center justify-between">
                <span>Tilonia & Barmer Hubs</span>
                <span className="text-[#829461]">✓ Active</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 hover:border-[#829461]/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF4E8] text-[#2E3D27] flex items-center justify-center font-bold text-lg mb-4 border border-[#A9B689]/30">
                  03
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C7D51]">
                  Deccan Plateau · Karnataka & Tamil Nadu
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1F2B1A] mt-1.5">
                  Interconnected Eri Cascades
                </h3>
                <p className="text-xs text-[#5C6B55] leading-relaxed mt-2.5">
                  Slope-aligned earthen reservoir chains created over 1,000 years ago during the Chola era. Surplus spillways flow into downstream tanks, capturing cloudbursts, preventing soil erosion, and recharging miles of shallow aquifers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 text-[11px] font-semibold text-[#2E3D27] flex items-center justify-between">
                <span>Hampi & Madurai Basins</span>
                <span className="text-[#829461]">✓ Active</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 hover:border-[#829461]/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#EFF4E8] text-[#2E3D27] flex items-center justify-center font-bold text-lg mb-4 border border-[#A9B689]/30">
                  04
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C7D51]">
                  Eastern Ghats & Coastal Plains
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1F2B1A] mt-1.5">
                  Perennial Dhars & Village Talabs
                </h3>
                <p className="text-xs text-[#5C6B55] leading-relaxed mt-2.5">
                  Gravity-fed mountain spring protections (Dhars) coupled with communal desilted village ponds (Talabs). These systems supply agricultural lifeblood, preserve wetland ecosystems, and protect coastal water tables against seawater intrusion.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 text-[11px] font-semibold text-[#2E3D27] flex items-center justify-between">
                <span>Odisha & Andhra Belt</span>
                <span className="text-[#829461]">✓ Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PHOTOGRAPHIC FIELD JOURNAL & RIDER LOGS                  */}
      {/* ============================================================ */}
      <section
        id="field-journal"
        className="w-full scroll-mt-20 py-14 sm:py-20 px-4 sm:px-8 md:px-12 bg-[#F8FAF6]"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#6C7D51]" />
                <span>Field Log & Photographic Diary</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#1F2B1A] tracking-tight">
                Dispatches From the 7,200 KM Highway
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5C6B55] max-w-md">
              Real excerpts recorded in village squares, highway dhaba stops, and conversations with rural elders across 64 days of motorcycle field travel.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[#1F2B1A]/10 shadow-2xs flex flex-col">
              <div className="relative h-60 w-full bg-[#1F2B1A]">
                <Image
                  src="/images/loader-motorcycle.jpg"
                  alt="Royal Enfield Bullet on the Water Ride"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider">
                  The Machine · Bullet 350
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C7D51]">
                    Day 1 · Jawaja-Beawar, Rajasthan
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1F2B1A] mt-1">
                    Solo Highway Preparation
                  </h4>
                  <p className="text-xs text-[#5C6B55] leading-relaxed mt-2 italic font-serif">
                    “The expedition begins where Gandhian rural self-reliance lives. Turning two wheels into a moving classroom for water wisdom across India’s heartland.”
                  </p>
                </div>
                <div className="text-[11px] text-[#2E3D27] font-semibold pt-2 border-t border-[#1F2B1A]/8">
                  Pit Stop: Barefoot Engineers Guild
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[#1F2B1A]/10 shadow-2xs flex flex-col">
              <div className="relative h-60 w-full bg-[#1F2B1A]">
                <Image
                  src="/images/section2-village-water.jpg"
                  alt="Rural village community gathering near water body"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider">
                  Day 17 · Hiware Bazar, Maharashtra
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C7D51]">
                    Watershed Revolution
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1F2B1A] mt-1">
                    Zero Borewells, Abundant Wells
                  </h4>
                  <p className="text-xs text-[#5C6B55] leading-relaxed mt-2 italic font-serif">
                    “Popatrao Pawar and the villagers showed that contour trenching and ban on private deep borewells brought water tables from 120 feet to 15 feet.”
                  </p>
                </div>
                <div className="text-[11px] text-[#2E3D27] font-semibold pt-2 border-t border-[#1F2B1A]/8">
                  Pit Stop: Village Panchayat Hall
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl overflow-hidden bg-white border border-[#1F2B1A]/10 shadow-2xs flex flex-col">
              <div className="relative h-60 w-full bg-[#1F2B1A]">
                <Image
                  src="/images/IMG_2883.JPG"
                  alt="Arid landscape with water recharge bunds"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider">
                  Day 36 · Dhanushkodi, Tamil Nadu
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C7D51]">
                    Southernmost Tip
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1F2B1A] mt-1">
                    Sweet Water on Ocean Sands
                  </h4>
                  <p className="text-xs text-[#5C6B55] leading-relaxed mt-2 italic font-serif">
                    “Digging barely two feet into the white sands between the Gulf of Mannar and Palk Strait yields crystal-clear sweet freshwater—the Ghyben-Herzberg coastal lens.”
                  </p>
                </div>
                <div className="text-[11px] text-[#2E3D27] font-semibold pt-2 border-t border-[#1F2B1A]/8">
                  Pit Stop: Coastal Fisherman Settlement
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. EXPEDITION SPECIFICATIONS & METHODOLOGY                   */}
      {/* ============================================================ */}
      <section className="w-full bg-[#1F2B1A] text-white py-14 sm:py-20 px-4 sm:px-8 md:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A9B689]">
                Behind The Journey
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white mt-1 tracking-tight">
                Expedition Rig & Field Methodology
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#EFF4E8]/70 max-w-md">
              Combining grassroots ethnography with modern GPS mapping to document the living geography of Indian water resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#A9B689] font-semibold">The Machine</span>
              <h4 className="font-serif font-bold text-lg text-white">Royal Enfield Bullet 350</h4>
              <p className="text-xs text-[#EFF4E8]/70 leading-relaxed mt-1">
                Air-cooled single cylinder motorcycle equipped with heavy-duty panniers, field spares, and water test kits capable of navigating muddy earthen bunds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#A9B689] font-semibold">Field Telemetry</span>
              <h4 className="font-serif font-bold text-lg text-white">GPS Coordinate Logging</h4>
              <p className="text-xs text-[#EFF4E8]/70 leading-relaxed mt-1">
                Every pit stop, traditional baori, desilted check dam, and village pond was geotagged with exact elevation, aquifer depth, and soil condition records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#A9B689] font-semibold">Grassroots Dialogues</span>
              <h4 className="font-serif font-bold text-lg text-white">85+ Elder & Activist Sessions</h4>
              <p className="text-xs text-[#EFF4E8]/70 leading-relaxed mt-1">
                Interviews with Barefoot engineers, women water committees, traditional well diggers (Chezvani), and village sarpanches across 9 states.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#A9B689] font-semibold">Open Heritage Data</span>
              <h4 className="font-serif font-bold text-lg text-white">Open-Access Water Map</h4>
              <p className="text-xs text-[#EFF4E8]/70 leading-relaxed mt-1">
                All 30 hubs and highway tracks are made publicly accessible on this digital cockpit to assist researchers, watershed practitioners, and students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. COLLABORATION & ACTION CTA BANNER                         */}
      {/* ============================================================ */}
      <section className="w-full bg-[#EFF4E8] py-14 sm:py-20 px-4 sm:px-8 border-t border-[#A9B689]/40">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#1F2B1A]/10 shadow-2xs">
            Join The Living Water Movement
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#1F2B1A] tracking-tight">
            Partner With GRAM on Regional Water Revival
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B55] max-w-2xl leading-relaxed">
            Are you a hydrologist, NGO worker, CSR leader, or student passionate about reviving stepwells, desilting ponds, and replenishing village aquifers? We invite you to join our ongoing fieldwork.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-102 active:scale-98 cursor-pointer"
            >
              Start a Conversation →
            </Link>
            <Link
              href="/"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F8FAF6] text-[#1F2B1A] border border-[#1F2B1A]/15 text-xs font-semibold tracking-wide transition-all shadow-2xs cursor-pointer"
            >
              Explore GRAM Association
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. COMPLETE STANDARD FOOTER (Matching Homepage)              */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#1F2B1A] text-white py-12 px-6 sm:px-10 md:px-14 border-t border-white/10">
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
              Groundwater & Reforestation Adaptive Management Association
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F8FAF6]/80">
            <Link href="/" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Home
            </Link>
            <Link href="/#about" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Vision & Mission
            </Link>
            <Link href="/#focus-areas" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Focus Areas
            </Link>
            <Link href="/#programs" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Programs
            </Link>
            <Link href="/#impact" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Impact
            </Link>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-[#A9B689] cursor-pointer transition-colors"
            >
              Back to Top ↑
            </button>
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
