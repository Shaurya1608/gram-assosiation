"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamic import for Leaflet map (client-only)
const WaterRideLeafletMap = dynamic(
  () => import("@/components/WaterRideLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[620px] rounded-3xl bg-[#EFF4E8]/50 flex flex-col items-center justify-center gap-3 border border-[#1F2B1A]/10">
        <span className="w-8 h-8 border-2 border-[#526639] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-serif italic text-[#526639]">
          Loading High-Resolution India Highway Map...
        </span>
      </div>
    ),
  }
);

export default function WaterRidePage() {
  return (
    <div className="w-full min-h-screen bg-[#F8FAF6] text-[#1B2418] flex flex-col">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#F8FAF6]/90 backdrop-blur-md border-b border-[#1F2B1A]/10 px-4 sm:px-8 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Back to Home link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#1F2B1A] border border-[#1F2B1A]/12 hover:border-[#829461]/40 hover:bg-[#EFF4E8] text-xs font-semibold tracking-wide transition-all shadow-2xs group cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Back to Home</span>
          </Link>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/gram-logo.png"
              alt="GRAM Association"
              width={140}
              height={46}
              priority
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Right: Quick Badges & Contact */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/40">
                64 Days · 9 States
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#2E3D27] font-semibold border border-[#1F2B1A]/10 shadow-2xs">
                7,200 KM Traversed
              </span>
            </div>

            <Link
              href="/#contact"
              className="rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] font-bold tracking-wider uppercase shadow-2xs transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] border border-[#829461]/30"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Single-Screen Interactive Map Experience */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 py-3 sm:py-5 flex flex-col justify-between">
        <WaterRideLeafletMap />
      </main>

      {/* 3. Expedition Highlights & Field Learnings */}
      <section className="w-full bg-white border-t border-[#1F2B1A]/10 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40">
              <span className="w-2 h-2 rounded-full bg-[#6C7D51]" />
              <span>National Water Documentation</span>
            </div>
            <h2 className="mt-4 font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1F2B1A] tracking-tight">
              Why We Rode 7,200 Kilometers
            </h2>
            <p className="mt-3 text-sm text-[#5C6B55] leading-relaxed">
              Before industrial groundwater depletion, India had centuries-old localized water stewardship systems suited to each bioregion. The Water Ride was a cross-country field exploration to document, learn from, and revive these living water heritage models.
            </p>
          </div>

          {/* 4 Pillars of Indigenous Water Wisdom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                region: "Rajasthan & Gujarat",
                structure: "Baoris & Stepwells (Vavs)",
                desc: "Deep, multi-storied architectural stepwells serving as community cooling sanctuaries and sacred drinking water collectors.",
              },
              {
                region: "Thar Desert Fringe",
                structure: "Underground Kunds & Tankas",
                desc: "Lime-plastered cisterns gathering pure rooftop rainwater to provide a family with safe potable water across 8 rainless months.",
              },
              {
                region: "Deccan & South India",
                structure: "Interconnected Tank Cascades",
                desc: "Centuries-old earthen lake chains capturing episodic monsoon cloudbursts and sequentially recharging downstream aquifers.",
              },
              {
                region: "Eastern Plateaus & Hills",
                structure: "Perennial Springs & Village Talabs",
                desc: "Gravity-fed mountain spring protections (Dhars) and communal village ponds securing both drinking water and multi-crop farming.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/8 hover:border-[#829461]/40 transition-all flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C7D51]">
                    {pillar.region}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#1F2B1A] mt-1">
                    {pillar.structure}
                  </h3>
                  <p className="text-xs text-[#5C6B55] leading-relaxed mt-2">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1F2B1A]/8 text-[11px] font-semibold text-[#2E3D27]">
                  Field Documented ✓
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Banner */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#EFF4E8] border border-[#A9B689]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1F2B1A]">
                Collaborate on Regional Watershed Initiatives
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6B55] mt-1">
                Partner with GRAM to document or revive water bodies in your district.
              </p>
            </div>
            <Link
              href="/#contact"
              className="px-6 py-2.5 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-2xs whitespace-nowrap cursor-pointer"
            >
              Start a Conversation →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Minimal Footer */}
      <footer className="w-full bg-[#1F2B1A] text-white/70 py-6 px-4 text-center text-xs border-t border-[#1F2B1A]/20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 GRAM Association. The Water Ride Expedition.</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
