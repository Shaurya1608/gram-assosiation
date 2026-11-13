"use client";

import Image from "next/image";
import { useState } from "react";

interface FocusPillar {
  id: string;
  title: string;
  description: string;
  sdg: string;
  metric: string;
  accentColor: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  anchor: string;
  svgIcon: React.ReactNode;
}

const PILLARS: FocusPillar[] = [
  {
    id: "water",
    title: "Water & Ecological Security",
    description: "Perennial spring protection & gravity pipeline grids",
    sdg: "SDG 6",
    metric: "2,500+ L/Day",
    accentColor: "#4E7882", // Mineral Mist Blue-Sage
    iconBg: "#EBF2F4",
    iconBorder: "#D0DFE3",
    iconColor: "#4E7882",
    anchor: "programs",
    svgIcon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: "governance",
    title: "Enhanced Governance",
    description: "100% community-led Gram Panchayats & Jal Samitis",
    sdg: "SDG 16",
    metric: "100% Community-Led",
    accentColor: "#6E824F", // iPhone 17 Botanical Sage
    iconBg: "#EFF4E8",
    iconBorder: "#D5E0C6",
    iconColor: "#6E824F",
    anchor: "programs",
    svgIcon: (
      <svg className="w-5 h-5 fill-none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    id: "livelihood",
    title: "Sustainable Livelihood",
    description: "Tribal women's SHGs & biodegradable Sal tableware",
    sdg: "SDG 8",
    metric: "3x Household Income",
    accentColor: "#8A7340", // Warm Anodized Earth Sage
    iconBg: "#F7F3E9",
    iconBorder: "#E7DFC9",
    iconColor: "#8A7340",
    anchor: "programs",
    svgIcon: (
      <svg className="w-5 h-5 fill-none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Zero fluorosis initiative & village preventative health camps",
    sdg: "SDG 3",
    metric: "Zero Fluorosis Target",
    accentColor: "#8A5559", // Apple Rose-Terracotta Sage
    iconBg: "#F7EDEE",
    iconBorder: "#E6D3D5",
    iconColor: "#8A5559",
    anchor: "programs",
    svgIcon: (
      <svg className="w-5 h-5 fill-none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    id: "education",
    title: "Education",
    description: "Mobile Chaupal classrooms & youth water literacy labs",
    sdg: "SDG 4",
    metric: "12,000+ Students",
    accentColor: "#487A4F", // Deep Meadow Sage
    iconBg: "#ECF4EE",
    iconBorder: "#D1E3D5",
    iconColor: "#487A4F",
    anchor: "water-ride",
    svgIcon: (
      <svg className="w-5 h-5 fill-none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

// Exact Geometric Coordinates:
// Circle center: (cx: 240, cy: 250), radius R = 210
// Vertical Y positions for 5 items: 60, 155, 250, 345, 440
const GEOMETRY = [
  { arcX: 329.4, arcY: 60, itemTop: 36 },
  { arcX: 427.3, arcY: 155, itemTop: 131 },
  { arcX: 450.0, arcY: 250, itemTop: 226 },
  { arcX: 427.3, arcY: 345, itemTop: 321 },
  { arcX: 329.4, arcY: 440, itemTop: 416 },
];

const CONNECTOR_END_X = 510; // Exactly touches the left edge of each icon card

export default function FocusAreasRadial({
  onNavigate,
}: {
  onNavigate?: (id: string) => void;
}) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelect = (idx: number, anchor: string) => {
    setActiveIdx(idx);
    if (onNavigate) {
      onNavigate(anchor);
    } else {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentPillar = PILLARS[activeIdx];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14 bg-transparent">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#829461]" />
          <span>Our Focus Areas</span>
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-[#1F2B1A] tracking-tight">
          Holistic Pillars of Village Self-Reliance
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#5C6B55] max-w-lg font-normal leading-relaxed">
          At the core of every GRAM initiative is the rural family and land, surrounded by five interconnected pathways to lifelong dignity.
        </p>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP VIEW (lg+): Precision Radial Arc Diagram        */}
      {/* ======================================================== */}
      <div className="hidden lg:block relative w-full h-[500px] mx-auto select-none">
        
        {/* SVG Drawing Layer: Circular Arc, Connector Lines & Node Dots */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 960 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Ambient Radial Glow behind the Mother & Child */}
          <circle
            cx="240"
            cy="250"
            r="195"
            fill="url(#iphoneSageGlow)"
            opacity="0.85"
          />

          {/* Full Subtle Outer Circular Orbit Boundary */}
          <circle
            cx="240"
            cy="250"
            r="210"
            stroke="#1F2B1A"
            strokeOpacity="0.08"
            strokeWidth="1.5"
          />

          {/* Inner Decorative Dashed Ring */}
          <circle
            cx="240"
            cy="250"
            r="175"
            stroke="#1F2B1A"
            strokeOpacity="0.05"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Precision Circular Arc connecting the 5 Nodes:
              From (329.4, 60) through (450, 250) to (329.4, 440) */}
          <path
            d="M 329.4 60 A 210 210 0 0 1 329.4 440"
            stroke="#DDE5D4"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Active Highlight Arc segment */}
          <path
            d="M 329.4 60 A 210 210 0 0 1 329.4 440"
            stroke={currentPillar.accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="90 500"
            strokeDashoffset={-activeIdx * 85}
            className="transition-all duration-500 ease-out"
          />

          {/* 5 Precision Horizontal Connector Lines & Node Dots */}
          {PILLARS.map((p, idx) => {
            const geo = GEOMETRY[idx];
            const isActive = activeIdx === idx;
            return (
              <g key={`geo-${p.id}`} className="transition-all duration-300">
                {/* Horizontal Connector Line from Arc directly to the Icon Card */}
                <line
                  x1={geo.arcX}
                  y1={geo.arcY}
                  x2={CONNECTOR_END_X}
                  y2={geo.arcY}
                  stroke={isActive ? p.accentColor : "#DDE5D4"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  strokeDasharray={isActive ? "none" : "3 3"}
                  className="transition-all duration-300"
                />

                {/* Node Dot on the Arc */}
                <circle
                  cx={geo.arcX}
                  cy={geo.arcY}
                  r={isActive ? 6 : 4}
                  fill={isActive ? p.accentColor : "#A9B689"}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  className="transition-all duration-300 drop-shadow-xs"
                />

                {/* Pulsing Aura on Active Node */}
                {isActive && (
                  <circle
                    cx={geo.arcX}
                    cy={geo.arcY}
                    r={11}
                    stroke={p.accentColor}
                    strokeOpacity={0.35}
                    strokeWidth={2}
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          <defs>
            <radialGradient
              id="iphoneSageGlow"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#EFF4E8" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#F5F8F0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F8FAF6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Central Family Cutout Graphic in the Left Circle */}
        <div
          className="absolute left-[45px] top-[55px] w-[390px] h-[390px] rounded-full overflow-hidden flex items-center justify-center pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(239,244,232,0.9) 0%, rgba(248,250,246,0.6) 65%, transparent 100%)",
          }}
        >
          <div className="relative w-[320px] h-[320px] select-none">
            <Image
              src="/images/focus-areas-family.png"
              alt="Rural Mother & Child — Heart of GRAM Community Development"
              fill
              sizes="340px"
              className="object-contain object-bottom transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>

          {/* Floating Quality Badge at bottom-center */}
          <div className="absolute bottom-5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#DDE5D4] shadow-xs text-[11px] font-semibold text-[#1F2B1A] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#829461]" />
            <span>The Human Core · 100+ Hamlets</span>
          </div>
        </div>

        {/* Right Column: 5 Precision Aligned Items */}
        {PILLARS.map((pillar, idx) => {
          const geo = GEOMETRY[idx];
          const isActive = activeIdx === idx;
          return (
            <div
              key={pillar.id}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => handleSelect(idx, pillar.anchor)}
              className={`absolute w-[440px] h-[48px] flex items-center gap-3.5 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-white border-2 shadow-sm"
                  : "bg-white/90 border border-[#DDE5D4] hover:border-[#A9B689]/60 hover:bg-white"
              }`}
              style={{
                top: `${geo.itemTop}px`,
                left: `${CONNECTOR_END_X}px`,
                borderColor: isActive ? pillar.accentColor : undefined,
                boxShadow: isActive ? `0 4px 14px -2px ${pillar.accentColor}25` : undefined,
              }}
            >
              {/* Icon Circle */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: pillar.iconBg,
                  borderColor: pillar.iconBorder,
                  borderWidth: 1,
                  color: pillar.iconColor,
                }}
              >
                {pillar.svgIcon}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-sm font-serif font-bold transition-colors truncate ${
                      isActive ? "text-[#1F2B1A]" : "text-[#1F2B1A]/90"
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  {isActive && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: pillar.iconBg,
                        color: pillar.accentColor,
                        border: `1px solid ${pillar.iconBorder}`,
                      }}
                    >
                      {pillar.metric}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#5C6B55] truncate leading-tight">
                  {pillar.description}
                </p>
              </div>

              {/* Subtle Indicator */}
              <span
                className={`text-xs transition-all duration-200 ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-1"
                }`}
                style={{ color: pillar.accentColor }}
              >
                →
              </span>
            </div>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* MOBILE & TABLET VIEW (< lg): Fluid Responsive Stack      */}
      {/* ======================================================== */}
      <div className="lg:hidden flex flex-col gap-6">
        {/* Central Circular Emblem on Crisp Frosted Off-White */}
        <div className="relative w-64 h-64 mx-auto rounded-full bg-gradient-to-b from-[#EFF4E8] to-white border border-[#DDE5D4] shadow-sm p-4 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/images/focus-areas-family.png"
              alt="Rural Mother & Child — Heart of GRAM Community Development"
              fill
              sizes="256px"
              className="object-contain object-bottom"
              priority
            />
          </div>
          <div className="absolute bottom-3 px-3 py-1 rounded-full bg-white border border-[#DDE5D4] shadow-xs text-[10px] font-semibold text-[#1F2B1A]">
            ● The Human Core
          </div>
        </div>

        {/* 5 Stacked Cards on Crisp White with iPhone Sage accents */}
        <div className="flex flex-col gap-2.5">
          {PILLARS.map((pillar, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={pillar.id}
                onClick={() => handleSelect(idx, pillar.anchor)}
                className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center gap-3 bg-white ${
                  isActive
                    ? "border-2 shadow-sm"
                    : "border-[#DDE5D4] hover:border-[#A9B689]/60"
                }`}
                style={{
                  borderColor: isActive ? pillar.accentColor : undefined,
                  boxShadow: isActive ? `0 2px 10px -1px ${pillar.accentColor}25` : undefined,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: pillar.iconBg,
                    borderColor: pillar.iconBorder,
                    borderWidth: 1,
                    color: pillar.iconColor,
                  }}
                >
                  {pillar.svgIcon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-serif font-bold text-[#1F2B1A] truncate">
                      {pillar.title}
                    </h3>
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: pillar.iconBg,
                        color: pillar.accentColor,
                        border: `1px solid ${pillar.iconBorder}`,
                      }}
                    >
                      {pillar.metric}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5C6B55] truncate leading-tight">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
