"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import FocusAreasRadial from "@/components/FocusAreasRadial";
import LastingImpactSection from "@/components/LastingImpactSection";

const WaterRideLeafletMap = dynamic(
  () => import("@/components/WaterRideLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] rounded-3xl bg-[#EFF4E8]/50 flex flex-col items-center justify-center gap-3 border border-[#1F2B1A]/10">
        <span className="w-7 h-7 border-2 border-[#526639] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-serif italic text-[#526639]">
          Loading High-Resolution India Highway Map...
        </span>
      </div>
    ),
  }
);

// 22-point polygon interpolations for smooth CSS clip-path morphing
const FLAT_POLYGON =
  "polygon(0% 0%, 10% 0%, 20% 0%, 30% 0%, 40% 0%, 50% 0%, 60% 0%, 70% 0%, 80% 0%, 90% 0%, 100% 0%, 100% 100%, 90% 100%, 80% 100%, 70% 100%, 60% 100%, 50% 100%, 40% 100%, 30% 100%, 20% 100%, 10% 100%, 0% 100%)";

// Concave curved screen matching the reference image (TalentElla inner curve)
const CURVED_POLYGON =
  "polygon(0% 3%, 10% 4.8%, 20% 6.4%, 30% 7.6%, 40% 8.4%, 50% 8.8%, 60% 8.4%, 70% 7.6%, 80% 6.4%, 90% 4.8%, 100% 3%, 100% 97%, 90% 95.2%, 80% 93.6%, 70% 92.4%, 60% 91.6%, 50% 91.2%, 40% 91.6%, 30% 92.4%, 20% 93.6%, 10% 95.2%, 0% 97%)";

// ============================================================
// GRAM PILL HERO - WEBSITE LOADING SCREEN PRELOADER
// ============================================================
function GramPillLoader({
  onComplete,
  onSkip,
}: {
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const onSkipRef = useRef(onSkip);
  onCompleteRef.current = onComplete;
  onSkipRef.current = onSkip;

  const handleSkip = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      onSkipRef.current();
    }, 400);
  }, []);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1800; // Snappy, smooth 1.8s load
    let rafId: number;
    let timer1: NodeJS.Timeout | null = null;
    let timer2: NodeJS.Timeout | null = null;
    let isFinished = false;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!isFinished) {
        isFinished = true;
        // Hold for 250ms at 100%, then slide up curtain smoothly
        timer1 = setTimeout(() => {
          setIsLeaving(true);
          timer2 = setTimeout(() => {
            onCompleteRef.current();
          }, 650);
        }, 250);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, []); // Strictly empty dependency array: runs ONCE, never loops or restarts 3 times!

  // Pill growth math
  const p = progress;
  let pillWidthEm = 0.012;
  if (p <= 0.14) {
    pillWidthEm = 0.012;
  } else if (p <= 0.30) {
    const seg = (p - 0.14) / 0.16;
    pillWidthEm = 0.012 + (0.16 - 0.012) * Math.pow(seg, 1.4);
  } else if (p <= 0.58) {
    const seg = (p - 0.30) / 0.28;
    pillWidthEm = 0.16 + (1.81 - 0.16) * Math.pow(seg, 1.2);
  } else {
    const seg = (p - 0.58) / 0.42;
    pillWidthEm = 1.81 + (3.62 - 1.81) * Math.pow(seg, 0.9);
  }

  // Pill vertical draw clip-path (0 to 14%)
  const clipY = p <= 0.14 ? 50 * (1 - p / 0.14) : 0;

  // Grey overlay opacity (1 holding to 14%, fading to 0 by 30%)
  const overlayOpacity = p <= 0.14 ? 1 : p <= 0.30 ? 1 - (p - 0.14) / 0.16 : 0;

  // Word gap expanding
  const gapEm =
    p <= 0.14
      ? 0.026
      : p <= 0.58
      ? 0.026 + (0.05 - 0.026) * ((p - 0.14) / 0.44)
      : 0.05 + (0.085 - 0.05) * ((p - 0.58) / 0.42);

  const percent = Math.min(100, Math.floor(p * 100));

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#F8FAF6] flex flex-col justify-between items-center transition-transform duration-700 select-none overflow-hidden ${
        isLeaving ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* Top Bar with Logo & Skip */}
      <div className="w-full px-6 py-4 sm:px-12 flex items-center justify-between">
        <Image
          src="/images/gram-logo.png"
          alt="GRAM Association"
          width={150}
          height={52}
          priority
          className="h-8 sm:h-9 w-auto object-contain"
        />
        <button
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full bg-[#EFF4E8] hover:bg-[#E4ECE0] text-[#1F2B1A] border border-[#1F2B1A]/15 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
        >
          SKIP →
        </button>
      </div>

      {/* Center Word & Stadium Pill */}
      <div className="relative flex flex-col items-center justify-center my-auto px-4">
        <div
          className="flex items-center justify-center font-extrabold text-[#1F2B1A] tracking-[-0.045em] leading-[0.8]"
          style={{
            fontSize: "min(19.6vh, 13.2vw)",
            gap: `${gapEm}em`,
          }}
        >
          <span className="inline-block leading-[0.8] select-none">GR</span>

          {/* Stadium Pill with Image */}
          <div
            className="relative overflow-hidden bg-[#DDE5D4] rounded-full flex-shrink-0 shadow-sm"
            style={{
              height: "1.81em",
              width: `${pillWidthEm}em`,
              clipPath: `inset(${clipY}% 0%)`,
            }}
          >
            <Image
              src="/images/loader-motorcycle.jpg"
              alt="GRAM The Water Ride Expedition Motorcycle"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center pointer-events-none select-none"
            />
            {/* Hairline overlay */}
            <div
              className="absolute inset-0 bg-[#C2CEB7] pointer-events-none"
              style={{ opacity: overlayOpacity }}
            />
          </div>

          <span className="inline-block leading-[0.8] select-none">AM</span>
        </div>

        {/* Minimalist Loading Bar & Counter in Marigold & Terracotta */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2.5">
          <div className="w-40 sm:w-56 h-1.5 bg-[#1F2B1A]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#829461] transition-all duration-75 rounded-full shadow-[0_0_10px_rgba(244,166,42,0.6)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#5C6B55]">
            HARVESTING THE HEAVEN · <span className="text-[#8A5559] font-bold">{percent}%</span>
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 py-4 sm:px-12 flex items-center justify-between text-[11px] text-[#5C6B55] tracking-wider font-medium">
        <span>THE WATER RIDE EXPEDITION</span>
        <span>BUILDING SELF-RELIANT VILLAGES</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Ensure the page always starts cleanly at top (0, 0) on load/refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  // Vision & Mission slide indexes
  const [visionSlide, setVisionSlide] = useState(0);
  const [missionSlide, setMissionSlide] = useState(0);
  const [selectedFocusArea, setSelectedFocusArea] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [selectedWaterRideTab, setSelectedWaterRideTab] = useState(0);
  const [contactInterest, setContactInterest] = useState("CSR Partnership");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Curated hero showcase slides from user's drive collection
  const heroSlides = [
    {
      image: "/images/hero/hero-slide-1.jpg",
      tag: "The Water Ride",
      title: "Discover an",
      highlight: "Amazing Nature",
      sub: "Adventure",
      desc: "Explore stunning landscapes and connect with nature on our guided adventures. Experience breathtaking vistas and immerse yourself in the wild, embracing community-led ecological stewardship.",
    },
    {
      image: "/images/hero/hero-slide-2.jpg",
      tag: "Gudibandha Talab",
      title: "Rejuvenating",
      highlight: "Water Reservoirs",
      sub: "& Aquifers",
      desc: "Restoring dried village ponds and tribal aquifers in Kherwatikra through community-led deep desilting, earthen bunds, and monsoon recharge trenches for multi-crop food security.",
    },
    {
      image: "/images/hero/hero-springs-waterfall.jpg",
      tag: "Rasabeda Springs",
      title: "Empowering",
      highlight: "Grassroots Wisdom",
      sub: "In Action",
      desc: "Perennial spring protection and participatory tribal governance in Rasabeda hamlets, providing zero-power gravity-fed clean water to over 100 mountain families.",
    },
    {
      image: "/images/hero/hero-slide-4.jpg",
      tag: "Rural Fellowship",
      title: "Cultivating",
      highlight: "Self-Reliant",
      sub: "Village Leaders",
      desc: "Training barefoot rural engineers and youth fellows across remote districts to co-create sustainable livelihood institutions and local community resilience.",
    },
  ];

  // Auto-advance hero slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track window scroll to switch navbar style and reading progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visionItems = [
    {
      subtitle: "Inclusive Rural Bedrock",
      text: "We envision an inclusive, equitable, and ecologically sustainable society where self-reliant villages are the true bedrock of national development. We believe that real, lasting change blossoms from within, which is why we focus on empowering self-governed, community-led institutions to foster thriving, sustainable rural ecosystems.",
    },
    {
      subtitle: "Gandhian Philosophy",
      text: "We draw deep inspiration from Mahatma Gandhi's profound conviction that \"the soul of India lives in its villages.\" Our commitment is to transform these rural communities into vibrant centers of resilience, dignity, and prosperity.",
    },
    {
      subtitle: "SDG Leadership",
      text: "GRAM is dedicated to enabling grassroots institutions and influencing policies through impactful interventions. We aspire to be a recognized leader across crucial development sectors: livelihoods, water, agriculture, health, and education. Every effort we make is strategically aligned with the Sustainable Development Goals (SDGs).",
    },
  ];

  // Mission pillars from user content
  const missionItems = [
    {
      subtitle: "Community Governance",
      text: "Enable self-governed, community-led institutions in rural areas, fostering self-reliance and sustainable development, establishing or strengthening local bodies (like self-help groups or community-based organizations) that have the authority and capacity to make decisions about their own affairs.",
    },
    {
      subtitle: "Integrated Interventions",
      text: "Implement integrated interventions across livelihoods, water, agriculture, health, and education, aligning with Sustainable Development Goals (SDGs). Emphasis is on active participation and leadership from within the community, facilitating local identification of needs and co-created strategies.",
    },
    {
      subtitle: "Ecologically Sound Policy",
      text: "Enable grassroots change and influence policy, contributing to an inclusive, equitable, and ecologically balanced society. All initiatives undertaken by these self-governed institutions should be environmentally sound, socially equitable, and economically viable, ensuring long-term benefits.",
    },
  ];

  // 5 Strategic Focus Areas (Holistic Grassroots Model)
  const focusAreas = [
    {
      id: "water",
      title: "Water & Ecological Security",
      tag: "SDG 6 · Clean Water",
      color: "#4E7882",
      bgLight: "#EFF4E8",
      shortDesc: "Rejuvenating traditional waterbodies, harvesting monsoon runoff, and building zero-power gravity spring pipelines.",
      impact: "2,500+ Liters / Day per village",
      scope: "Stepwells · Kunds · Mountain Springs · Aquifer Recharge",
    },
    {
      id: "governance",
      title: "Enhanced Governance",
      tag: "SDG 16 · Strong Institutions",
      color: "#829461",
      bgLight: "#EFF4E8",
      shortDesc: "Strengthening Gram Panchayats and nurturing community-led Jal Samitis so villagers independently govern their resources.",
      impact: "100% Community-Led Stewardship",
      scope: "Jal Samitis · Barefoot Engineers · Gram Sabhas",
    },
    {
      id: "livelihood",
      title: "Sustainable Livelihood",
      tag: "SDG 8 · Decent Work",
      color: "#829461",
      bgLight: "#F8FAF6",
      shortDesc: "Equipping tribal women's SHGs with leaf-press machinery to produce biodegradable dinnerware, eliminating distress migration.",
      impact: "3x Household Income Growth",
      scope: "Sal Leaf Micro-Enterprises · Climate-Resilient Agro",
    },
    {
      id: "healthcare",
      title: "Healthcare",
      tag: "SDG 3 · Good Health",
      color: "#8A5559",
      bgLight: "#F8FAF6",
      shortDesc: "Mitigating endemic dental and skeletal fluorosis with low-cost adsorption filters and village preventive health screening.",
      impact: "Zero Fluorosis Target in Birbhum",
      scope: "Fluoride Mitigation · Safe Water Testing · Health Camps",
    },
    {
      id: "education",
      title: "Education",
      tag: "SDG 4 · Quality Education",
      color: "#1F2B1A",
      bgLight: "#EFF4E8",
      shortDesc: "Conducting mobile Chaupal classrooms that teach water chemistry, soil hydrology, and ecological stewardship to children.",
      impact: "12,000+ Rural Students Engaged",
      scope: "Mobile Chaupals · Practical Water Labs · Youth Leadership",
    },
  ];

  // Programs details
  const programs = [
    {
      id: "rasabeda",
      title: "Rasabeda Spring Water Project",
      location: "Jharkhand",
      navLabel: "Spring Water",
      tag: "Gravity-Fed Clean Water",
      stat: "2,500+ Liters/Day",
      image: "/images/programs/rasabeda.jpg",
      desc: "Harnessing natural perennial mountain springs through community gravity-fed pipelines and storage tanks, solving acute drinking water scarcity across high-elevation tribal hamlets without electric pumps.",
      quote: "Before this gravity pipeline, our women spent three hours each morning climbing treacherous slopes. Today, pure mountain water flows directly into our village courtyard.",
      quoteAuthor: "Rasabeda Village Jal Samiti",
      partner: "Village Jal Samiti & Santhal Panchayats",
      metrics: [
        { label: "Daily Spring Water", val: "2,500+ L" },
        { label: "Tribal Families", val: "100+" },
        { label: "Grid Electricity", val: "0 kWh (Gravity)" },
      ],
    },
    {
      id: "gudibandh",
      title: "Gudibandh Talab Rejuvenation",
      location: "Kherwatikra",
      navLabel: "Pond Restoration",
      tag: "Aquifer & Pond Restoration",
      stat: "500+ Farmland Acres",
      image: "/images/programs/gudibandh.jpg",
      desc: "Community-led deep desilting, earthen embankment reinforcement, and catchment trenches to capture monsoon runoff, recharging dried borewells and securing multi-crop irrigation.",
      quote: "When the talab holds water through the peak summer heat, our cattle have water to drink, our wells stay alive, and our youth don't need to migrate for seasonal labor.",
      quoteAuthor: "Kherwatikra Farmers Collective",
      partner: "Kherwatikra Gram Panchayat & Farmers Collective",
      metrics: [
        { label: "Farmland Protected", val: "500+ Acres" },
        { label: "Borewells Recharged", val: "40+ Wells" },
        { label: "Water Storage", val: "3x Capacity" },
      ],
    },
    {
      id: "birbhum",
      title: "Birbhum Fluoride Mitigation",
      location: "West Bengal",
      navLabel: "Fluoride Safety",
      tag: "Safe Water & Health",
      stat: "Zero Fluorosis Target",
      image: "/images/programs/birbhum.jpg",
      desc: "Implementing community-managed low-cost adsorption filtration systems and grassroots health camps to prevent skeletal and dental fluorosis in severely affected rural regions.",
      quote: "Clean water isn't a luxury; it is the right of every child. By purifying drinking water at the source, we are preventing irreversible skeletal fluorosis in the next generation.",
      quoteAuthor: "Birbhum Rural Health Action Team",
      partner: "Local Health Workers & School Committees",
      metrics: [
        { label: "Safe Fluoride Level", val: "< 1.0 ppm" },
        { label: "School Centers", val: "18 Covered" },
        { label: "Children Protected", val: "3,200+" },
      ],
    },
    {
      id: "leafplate",
      title: "Sal Leaf Plate & Bowl Initiative",
      location: "Forest Fringe Villages",
      navLabel: "Women Livelihood",
      tag: "Women Livelihood",
      stat: "3x Household Income",
      image: "/images/programs/leafplate.jpg",
      desc: "Training tribal women's Self-Help Groups with semi-automated heat press machines to produce biodegradable leaf tableware, replacing single-use plastic while creating decentralized income.",
      quote: "Gathering and pressing Sal leaves was something we did for survival. Now, with our own cooperative machines, we manage orders, set prices, and run our own bank accounts.",
      quoteAuthor: "Forest SHG Cooperative Leader",
      partner: "Tribal Women Self-Help Groups & SHG Federations",
      metrics: [
        { label: "Household Income", val: "Up to 3x" },
        { label: "Plastic Displaced", val: "250K+ Units" },
        { label: "Women Artisans", val: "50+ Trained" },
      ],
    },
  ];

  // The Water Ride expedition pillars
  const waterRidePillars = [
    {
      id: "heritage",
      title: "Documenting Dying Stepwells & Sacred Kunds",
      tag: "Heritage Water Architecture",
      distance: "8,000+ KM",
      statLabel: "Across 13 States",
      navLabel: "Heritage Stepwells",
      image: "/images/water-ride-expedition.jpg",
      route: "Rajasthan · Maharashtra · Karnataka · Tamil Nadu · Odisha",
      desc: "Traversing remote desert fringes, ancient trade routes, and Ghat ranges to identify and digitally document historic stepwells (baolis), temple tanks, and earthen Johads that sustained communities for centuries before tube wells drained regional aquifers.",
      keyInsight: "Over 45 traditional stepwells surveyed and cataloged for community-led desilting and revival.",
      highlightStat: "45+ Baolis Mapped",
      riderLog: "“Sitting on a stone ledge of a 300-year-old stepwell in Bundi, you realize our ancestors didn’t fight water scarcity with cement—they welcomed the rain with devotion.”",
    },
    {
      id: "classrooms",
      title: "100+ Mobile Village Chaupal Classrooms",
      tag: "Water Literacy & Youth",
      distance: "100+ Villages",
      statLabel: "Open-Air Workshops",
      navLabel: "Village Classrooms",
      image: "/images/loader-motorcycle.jpg",
      route: "Rural schools, village chaupals, and agricultural cooperatives",
      desc: "Transforming the Royal Enfield Bullet into a mobile field laboratory. Spontaneously parking at rural squares with portable chemical and biological water testing kits, educating schoolchildren and village elders on safe drinking water, fluoride risks, and simple rooftop catchment.",
      keyInsight: "Engaged 12,000+ rural students and youth in hands-on water quality testing and conservation dialogues.",
      highlightStat: "12,000+ Youth Engaged",
      riderLog: "“When school kids test their own tube-well water and see the test strip change color, water is no longer an invisible subject in a textbook—it becomes their living reality.”",
    },
    {
      id: "himalayas",
      title: "Phase II: Himalayan Springshed Mapping",
      tag: "Mountain Ecosystems",
      distance: "High Altitude",
      statLabel: "Glacial & Spring Basins",
      navLabel: "Himalayan Springs",
      image: "/images/hero/hero-slide-1.jpg",
      route: "Uttarakhand · Himachal Pradesh · North-Eastern Watersheds",
      desc: "Ascending into fragile high-altitude mountain valleys to study climate-induced drying of perennial springs (dhars). Working with hillside panchayats to map subterranean recharge zones and build contour trenches that keep mountain streams alive through summer.",
      keyInsight: "Co-creating decentralized mountain springshed recharge protocols with Himalayan hill communities.",
      highlightStat: "100% Gravity-Fed",
      riderLog: "“As the Himalayan ridges dry up, hill villages face unprecedented distress. Reviving natural mountain springs is the only way to safeguard both ecology and mountain lives.”",
    },
  ];

  const renderWhatDrivesUsContent = (isInsideHeroCard = false) => (
    <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 w-full">
      {/* 1. BALANCED EDITORIAL HEADER ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Eyebrow + Strong Headline + Lead Text */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#6C7D51] animate-pulse" />
            <span>About GRAM Association</span>
          </div>

          <h2 className="mt-4 font-serif text-[#1F2B1A] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-[1.22] tracking-tight">
            Rooted in India&apos;s Villages.{" "}
            <span className="text-[#526639] font-normal italic">
              Empowering Self-Reliant Communities.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#5C6B55] leading-relaxed max-w-2xl font-normal">
            Inspired by Mahatma Gandhi&apos;s conviction that &ldquo;the soul of India lives in its villages,&rdquo; GRAM Association partners with tribal and marginalized communities to co-create decentralized water sovereignty, grassroots fellowships, and self-governed rural institutions.
          </p>
        </div>

        {/* Right Column: Frosted Gandhian Vision Card */}
        <div className="lg:col-span-5 h-full">
          <div className="h-full rounded-2xl p-6 sm:p-7 bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-2xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#526639]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#526639]" />
                Guiding Philosophy
              </span>
              <span className="text-[11px] font-mono text-[#5C6B55]">Est. 1999</span>
            </div>

            <blockquote className="font-serif italic text-base sm:text-[17px] text-[#1F2B1A] leading-relaxed">
              &ldquo;Real, lasting transformation cannot be delivered from above—it must blossom from within through community ownership, traditional wisdom, and dignity.&rdquo;
            </blockquote>

            <div className="flex items-center justify-between pt-3 border-t border-[#1F2B1A]/8 text-xs text-[#5C6B55]">
              <span className="font-medium text-[#1F2B1A]">Gandhian Self-Reliance</span>
              <span className="font-medium text-[#526639]">Chota Nagpur &amp; Beyond</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. REFINED FOUR-COLUMN METRIC TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        {[
          {
            value: "25+ Years",
            title: "Grassroots Trust",
            desc: "Continuous community leadership & institutional capacity",
          },
          {
            value: "7,200+ KM",
            title: "The Water Ride",
            desc: "Expedition mapping indigenous wisdom across 9 Indian states",
          },
          {
            value: "100%",
            title: "Community Owned",
            desc: "Zero-power, gravity-fed sustainable infrastructure",
          },
          {
            value: "15,000+",
            title: "Lives Empowered",
            desc: "Tribal families permanently protected from distress migration",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/8 hover:border-[#829461]/40 hover:bg-white transition-all duration-200 shadow-2xs group flex flex-col justify-between"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2B1A] tracking-tight group-hover:text-[#526639] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-[13px] font-bold text-[#2E3D27] mt-1">
                {stat.title}
              </div>
            </div>
            <p className="text-[11px] sm:text-xs text-[#5C6B55] mt-2 leading-relaxed">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 3. THREE SOPHISTICATED BENTO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Card 1: Water Sovereignty & Springs */}
        <div className="bg-[#F8FAF6] hover:bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#1F2B1A]/10 hover:border-[#829461]/40 shadow-2xs hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#1F2B1A]/10 shadow-2xs flex items-center justify-center text-[#4E7882]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EFF4E8] text-[#526639] border border-[#A9B689]/40">
                Water Sovereignty
              </span>
            </div>

            <div className="mt-6">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2B1A] tracking-tight">
                13,500 L
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#2E3D27] mt-1">
                Zero-Power Gravity Storage
              </div>
              <p className="text-xs sm:text-[13px] text-[#5C6B55] leading-relaxed mt-2.5">
                Reviving perennial mountain springs in Rasabeda and restoring silted tribal ponds like Gudibandh Talab to supply potable water without diesel or electricity.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#526639] bg-[#EFF4E8] px-2.5 py-0.5 rounded-md">
              40+ Wells Recharged
            </span>
            <button
              onClick={() => scrollToAnchor("water-ride")}
              className="text-xs font-semibold text-[#1F2B1A] hover:text-[#526639] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Explore Route</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Card 2: Centerpiece Village Photo Card */}
        <div className="relative overflow-hidden rounded-3xl min-h-[320px] flex flex-col justify-between p-6 sm:p-7 shadow-md text-white group">
          <Image
            src="/images/section2-village-water.jpg"
            alt="Rural community water council gathering under village tree"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25">
              <span>★</span>
              <span>Participatory Gram Sabha</span>
            </span>
          </div>

          <div className="relative z-10 mt-auto pt-6">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              38+ Hamlets
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white/95 mt-1">
              Distress Migration Ended
            </div>
            <p className="text-xs text-white/80 leading-relaxed mt-2">
              Empowering Santhal and Munda tribal families to manage water commons collaboratively and retain food sovereignty year-round.
            </p>
            <div className="mt-4 pt-3 border-t border-white/20">
              <button
                onClick={() => scrollToAnchor("impact")}
                className="text-xs font-semibold text-[#F8FAF6] hover:text-[#A9B689] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Read Verified Case Studies</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card 3: Sustainable Livelihood & Education */}
        <div className="bg-[#F8FAF6] hover:bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#1F2B1A]/10 hover:border-[#829461]/40 shadow-2xs hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#1F2B1A]/10 shadow-2xs flex items-center justify-center text-[#6C7D51]">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
                </svg>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EFF4E8] text-[#526639] border border-[#A9B689]/40">
                Green Livelihoods
              </span>
            </div>

            <div className="mt-6">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1F2B1A] tracking-tight">
                12,000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#2E3D27] mt-1">
                Youth &amp; Farmers Trained
              </div>
              <p className="text-xs sm:text-[13px] text-[#5C6B55] leading-relaxed mt-2.5">
                Incubating women-run sal-leaf plate micro-enterprises, organic multi-crop farming, and training youth barefoot water engineers to test and safeguard village aquifers.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1F2B1A]/8 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#526639] bg-[#EFF4E8] px-2.5 py-0.5 rounded-md">
              3x Household Income
            </span>
            <button
              onClick={() => scrollToAnchor("programs")}
              className="text-xs font-semibold text-[#1F2B1A] hover:text-[#526639] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Programs</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. GROUNDED PHILOSOPHY & GRASSROOTS CALL-TO-ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 sm:pt-12 border-t border-[#1F2B1A]/10">
        {/* Left: Overlapping Authentic Photos */}
        <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-lg border border-[#1F2B1A]/10 bg-[#EFF4E8]">
            <Image
              src="/images/IMG_2883.JPG"
              alt="Rural village child smiling"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          {/* Overlapping Secondary Photo */}
          <div className="absolute -bottom-5 -right-3 sm:-right-5 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white">
            <Image
              src="/images/IMG_3468.JPG"
              alt="Village education and health activities"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 144px, 176px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right: Narrative + Partnership CTA */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4E8] text-[#526639] text-xs font-semibold tracking-wide border border-[#A9B689]/30">
              <span>Change From Within</span>
            </div>

            <h3 className="mt-3 font-serif font-bold text-2xl sm:text-3xl lg:text-[34px] text-[#1F2B1A] leading-[1.25] tracking-tight">
              Building Self-Reliant Institutions That Outlast Any Single Project
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#5C6B55] leading-relaxed font-normal">
              Sustainable rural transformation cannot be imported or imposed from the outside. By establishing village-level water user committees, training local barefoot caretakers, and revitalizing indigenous water structures, GRAM ensures that communities maintain full stewardship and ownership of their ecological resources.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setContactInterest("CSR Partnership");
                  scrollToAnchor("contact");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Partner With GRAM</span>
                <span className="text-sm">↗</span>
              </button>

              <button
                onClick={() => scrollToAnchor("programs")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#EFF4E8] hover:bg-[#E4ECE0] text-[#1F2B1A] border border-[#1F2B1A]/15 text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                <span>Explore All Programs</span>
                <span>→</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1F2B1A]/8 flex items-center justify-between text-xs text-[#5C6B55]">
            <span className="font-medium">Direct Field Impact Across Jharkhand &amp; Odisha</span>
            <span className="font-semibold text-[#2E3D27]">100% Values-Aligned</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================
  

  return (
    <div className="w-full min-h-screen bg-[#F8FAF6] font-sans text-[#1B2418] relative">
      {/* Preloader Screen */}
      {showPreloader && (
        <GramPillLoader
          onComplete={handlePreloaderComplete}
          onSkip={handlePreloaderComplete}
        />
      )}

      {/* Precision Scroll Reading Progress Line at Top */}
      <div className="fixed top-0 inset-x-0 h-[2.5px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#829461] via-[#4E7882] to-[#829461] transition-all duration-75 shadow-[0_0_8px_rgba(31,122,90,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Refined, Responsive Glass Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-3.5 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#F8FAF6]/95 border-[#1F2B1A]/15 text-[#1F2B1A] shadow-xs"
            : "bg-black/25 border-white/10 text-white"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Left Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-[13px] font-medium tracking-wide">
            <button
              onClick={scrollToTop}
              className={`transition-colors cursor-pointer ${
                !isScrolled ? "text-white font-semibold" : "text-[#5C6B55] hover:text-[#1F2B1A]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToAnchor("about")}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToAnchor("focus-areas")}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Focus Areas
            </button>
            <button
              onClick={() => scrollToAnchor("programs")}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => scrollToAnchor("impact")}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Impact
            </button>
            <button
              onClick={() => scrollToAnchor("water-ride")}
              className={`transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Water Ride
            </button>
          </nav>

          {/* Center Brand Logo / Wordmark */}
          <button onClick={scrollToTop} className="group flex items-center gap-2 cursor-pointer transition-transform hover:scale-102">
            <Image
              src={isScrolled ? "/images/gram-logo.png" : "/images/gram-logo-white.png"}
              alt="GRAM Association"
              width={150}
              height={50}
              priority
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300"
            />
          </button>

          {/* Right Nav Links & Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => scrollToAnchor("water-ride")}
              className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Expedition
            </button>
            <button
              onClick={() => scrollToAnchor("contact")}
              className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                isScrolled ? "text-[#5C6B55] hover:text-[#1F2B1A]" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setShowPreloader(true)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                isScrolled
                  ? "bg-[#EFF4E8] hover:bg-[#E4ECE0] text-[#1F2B1A] border border-[#1F2B1A]/20"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
              title="Replay Loading Screen"
            >
              <span>↺</span>
              <span>LOADER</span>
            </button>
            <button
              onClick={() => scrollToAnchor("contact")}
              className="rounded-full px-4.5 py-1.5 sm:px-5 sm:py-2 text-[11px] font-bold tracking-wider uppercase shadow-sm hover:shadow transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] border border-[#829461]/30"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile / Tablet Hamburger & Actions */}
          <div className="lg:hidden flex items-center gap-2.5">
            <button
              onClick={() => scrollToAnchor("contact")}
              className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase bg-[#829461] text-white"
            >
              CONTACT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-transform active:scale-95 ${
                isScrolled
                  ? "bg-[#EFF4E8] text-[#1F2B1A] border-[#1F2B1A]/20"
                  : "bg-white/15 text-white border-white/20"
              }`}
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
        <div className="lg:hidden fixed top-16 left-4 right-4 z-50 p-5 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-3 text-center text-white">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToTop();
            }}
            className="text-sm font-semibold py-1.5 text-white/90 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("about");
            }}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            About & Vision
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("focus-areas");
            }}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Focus Areas
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("programs");
            }}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Programs
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("impact");
            }}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Lasting Impact
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("water-ride");
            }}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            The Water Ride
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("contact");
            }}
            className="mt-2 rounded-full bg-[#829461] text-white py-2.5 text-xs font-bold tracking-wider uppercase shadow-md"
          >
            GET IN TOUCH
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* HERO SECTION: Full-Height Clean Naturely Hero with Carousel */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_rgba(14,59,51,0.15)] z-20"
      >
        {/* Background Images: Smooth crossfading showcase from user's drive collection */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentHeroSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center brightness-105 saturate-110"
              />
            </div>
          ))}
          {/* Subtle, crystal-clear targeted vignettes (Zero heavy full-screen dark wash) */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/35 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none z-20" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-30 flex-1 flex flex-col justify-between pt-24 sm:pt-28 md:pt-30 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1600px] mx-auto w-full">
          {/* Top Left: Headline & Button */}
          <div className="max-w-md sm:max-w-lg lg:max-w-xl text-left mt-3 sm:mt-5 lg:mt-7 transition-all duration-700">
            <h1 className="font-serif font-medium text-white text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] xl:text-[56px] leading-[1.14] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
              <span>{heroSlides[currentHeroSlide].title}</span>
              <br />
              <span>{heroSlides[currentHeroSlide].highlight}</span>
              <br />
              <span>{heroSlides[currentHeroSlide].sub}</span>
            </h1>

            <div className="mt-4 sm:mt-5">
              <button
                onClick={() => scrollToAnchor("contact")}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#F8FAF6] hover:bg-white text-[#1B2418] text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:scale-103 active:scale-97 cursor-pointer"
              >
                <span>Get in Touch</span>
                <span className="text-xs font-bold">↗</span>
              </button>
            </div>
          </div>

          {/* Bottom Area: Narrative Paragraph + Frosted Glass Filter Chips */}
          <div className="w-full flex flex-col gap-4 sm:gap-5 mt-auto">
            <div className="max-w-sm sm:max-w-md lg:max-w-lg ml-auto mr-0 text-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-700">
              <p className="text-[11px] sm:text-xs md:text-[13px] text-white/90 leading-relaxed font-normal">
                {heroSlides[currentHeroSlide].desc}
              </p>
            </div>

            <div className="w-full flex items-center justify-end gap-2 pt-3.5 border-t border-white/20">
              <div className="flex flex-wrap items-center justify-end gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.tag}
                    onClick={() => setCurrentHeroSlide(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium backdrop-blur-md border transition-all cursor-pointer shadow-xs ${
                      currentHeroSlide === idx
                        ? "bg-white/40 text-white border-white/60 shadow-sm ring-1 ring-white/30"
                        : "bg-white/15 hover:bg-white/25 text-white/90 hover:text-white border-white/20"
                    }`}
                  >
                    {slide.tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT US (Exact Bento Layout Matching Reference)  */}
      {/* ============================================================ */}
      <section
        id="about"
        className="w-full bg-white py-16 sm:py-24 px-5 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10"
      >
        {renderWhatDrivesUsContent(false)}
      </section>

      {/* ============================================================ */}
      {/* SECTION: OUR FOCUS AREAS (5 Pillars Radial Arc Hub)          */}
      {/* ============================================================ */}
      <section
        id="focus-areas"
        className="w-full bg-white py-16 sm:py-24 px-5 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10"
      >
        <FocusAreasRadial onNavigate={scrollToAnchor} />
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: OUR PROGRAMS (Clean, Lightweight 4-Card Grid)     */}
      {/* ============================================================ */}
      <section id="programs" className="w-full bg-white py-16 sm:py-24 px-5 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF4E8] text-[#1F2B1A] text-xs font-semibold tracking-wide border border-[#829461]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#829461]" />
              <span>Grassroots Action</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-[#1F2B1A] tracking-tight">
              Our Core Programs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C6B55] font-normal leading-relaxed">
              Turning indigenous wisdom into scalable water, ecological, and livelihood resilience across Eastern India.
            </p>
          </div>

          {/* Clean, Lightweight 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {programs.map((p, idx) => (
              <div
                key={p.id}
                className="group rounded-2xl bg-white border border-[#1F2B1A]/10 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#829461]/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Thumbnail */}
                <div className="relative w-full h-44 overflow-hidden bg-[#1F2B1A]/5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Location Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-[#1F2B1A] shadow-xs backdrop-blur-md">
                      📍 {p.location}
                    </span>
                  </div>

                  {/* Impact Stat */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#829461] text-white shadow-xs">
                      {p.stat}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#829461]">
                      0{idx + 1} · {p.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#1F2B1A] group-hover:text-[#829461] transition-colors leading-snug mt-1">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5C6B55] leading-relaxed line-clamp-3">
                      {p.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-[#1F2B1A]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#5C6B55]">Community-led</span>
                    <button
                      onClick={() => {
                        setContactInterest(p.title);
                        scrollToAnchor("contact");
                      }}
                      className="text-xs font-bold text-[#829461] hover:text-[#1F2B1A] flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Partner</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Bottom Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#1F2B1A]">
                Looking to support all four programs through institutional CSR?
              </p>
              <p className="text-xs text-[#5C6B55] mt-0.5">
                We partner with foundations and corporations on multi-village watershed and livelihood endowments.
              </p>
            </div>
            <button
              onClick={() => {
                setContactInterest("CSR Partnership");
                scrollToAnchor("contact");
              }}
              className="px-5 py-2 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] border border-[#829461]/30 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs shrink-0"
            >
              Partner With Us →
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION: MAKING A LASTING IMPACT (Flagship Case Studies)     */}
      {/* ============================================================ */}
      <LastingImpactSection
        onPartnerClick={(title) => {
          setContactInterest(title);
          scrollToAnchor("contact");
        }}
      />

      {/* ============================================================ */}
      {/* SECTION 3: THE WATER RIDE (Interactive Expedition Map)       */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* SECTION 3: THE WATER RIDE (Single-Screen Interactive Map)    */}
      {/* ============================================================ */}
      <section id="water-ride" className="w-full bg-white py-4 sm:py-6 px-3 sm:px-6 md:px-8 border-b border-[#1F2B1A]/10">
        <div className="w-full max-w-[1580px] mx-auto flex flex-col gap-3">
          
          {/* Interactive Road Navigation System */}
          <WaterRideLeafletMap />

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: GET IN TOUCH & COLLABORATE (Modern Partnership)   */}
      {/* ============================================================ */}
      <section id="contact" className="w-full bg-white py-20 sm:py-28 px-5 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#1F2B1A] text-xs font-semibold tracking-wide border border-[#829461]/25">
              <span className="w-2 h-2 rounded-full bg-[#829461] animate-pulse" />
              <span>Partnership & Fellowship Hub</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F2B1A] tracking-tight">
              Start a Conversation with GRAM
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5C6B55] max-w-2xl font-normal leading-relaxed">
              Whether you represent an institutional CSR foundation, a rural fellowship applicant, a hydrological researcher, or a village sarpanch—we welcome lasting, values-aligned partnerships.
            </p>
          </div>

          {/* 3 Interactive Pathway Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Pathway 1 */}
            <div
              onClick={() => setContactInterest("CSR Partnership")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 h-full ${
                contactInterest === "CSR Partnership"
                  ? "bg-[#EFF4E8]/60 border-[#829461] shadow-md ring-2 ring-[#829461]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#F8FAF6]/60 border-[#1F2B1A]/12 hover:border-[#829461]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#829461] px-2.5 py-0.5 rounded-full bg-[#EFF4E8] border border-[#829461]/20">
                    CSR Alliance
                  </span>
                  <span className="text-[11px] font-medium text-[#5C6B55]">
                    Institutional
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F2B1A]">
                  CSR & Corporate Alliances
                </h3>
                <p className="mt-2 text-xs text-[#5C6B55] leading-relaxed">
                  Adopt dried waterbodies, fund gravity spring pipelines, or sponsor women’s Sal leaf micro-enterprises.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#1F2B1A]/10 text-xs font-semibold text-[#829461]">
                <span>{contactInterest === "CSR Partnership" ? "● Selected" : "Select Pathway"}</span>
                <span>→</span>
              </div>
            </div>

            {/* Pathway 2 */}
            <div
              onClick={() => setContactInterest("Rural Fellowship")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 h-full ${
                contactInterest === "Rural Fellowship"
                  ? "bg-[#EFF4E8]/60 border-[#829461] shadow-md ring-2 ring-[#829461]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#F8FAF6]/60 border-[#1F2B1A]/12 hover:border-[#829461]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#829461] px-2.5 py-0.5 rounded-full bg-[#EFF4E8] border border-[#829461]/20">
                    Fellowship
                  </span>
                  <span className="text-[11px] font-medium text-[#5C6B55]">
                    On-The-Ground
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F2B1A]">
                  Fellowships & Volunteering
                </h3>
                <p className="mt-2 text-xs text-[#5C6B55] leading-relaxed">
                  Spend 6–12 months on the ground in Rajasthan or Jharkhand working alongside barefoot engineers.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#1F2B1A]/10 text-xs font-semibold text-[#829461]">
                <span>{contactInterest === "Rural Fellowship" ? "● Selected" : "Select Pathway"}</span>
                <span>→</span>
              </div>
            </div>

            {/* Pathway 3 */}
            <div
              onClick={() => setContactInterest("Hydrology & Research")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 h-full ${
                contactInterest === "Hydrology & Research"
                  ? "bg-[#EFF4E8]/60 border-[#829461] shadow-md ring-2 ring-[#829461]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#F8FAF6]/60 border-[#1F2B1A]/12 hover:border-[#829461]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#829461] px-2.5 py-0.5 rounded-full bg-[#EFF4E8] border border-[#829461]/20">
                    Hydrology
                  </span>
                  <span className="text-[11px] font-medium text-[#5C6B55]">
                    Open Research
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1F2B1A]">
                  Hydrology & Policy Research
                </h3>
                <p className="mt-2 text-xs text-[#5C6B55] leading-relaxed">
                  Collaborate on open groundwater mapping, traditional stepwell revival, and community water rights.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#1F2B1A]/10 text-xs font-semibold text-[#829461]">
                <span>{contactInterest === "Hydrology & Research" ? "● Selected" : "Select Pathway"}</span>
                <span>→</span>
              </div>
            </div>

          </div>

          {/* Unified Split: Trust Hub + Streamlined Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
            
            {/* Left 5 Columns: Visual Trust & Credentials */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#F8FAF6]/50 border border-[#1F2B1A]/10 p-6 sm:p-7 overflow-hidden shadow-xs">
              <div className="flex flex-col gap-5">
                {/* Fellowship Team Photo */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#1F2B1A]/10 shadow-xs bg-[#1F2B1A]/5">
                  <Image
                    src="/images/fellowship-contact.jpg"
                    alt="GRAM Community Fellowship Team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold drop-shadow-sm">
                      Field Fellows & Barefoot Engineers
                    </p>
                    <p className="text-[11px] text-[#EFF4E8]/80">
                      Co-creating rural institutions in Jharkhand & Rajasthan
                    </p>
                  </div>
                </div>

                {/* Direct Contact Points */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#829461] border border-[#1F2B1A]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      ✉️
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5C6B55]">Direct Email</p>
                      <a href="mailto:contact@gramassociation.org" className="text-sm font-bold text-[#1F2B1A] hover:text-[#829461] transition-colors underline decoration-[#829461]/30">
                        contact@gramassociation.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#4E7882] border border-[#1F2B1A]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      📍
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5C6B55]">Field Operations</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#1F2B1A]">
                        Jaipur (Rajasthan) & Ranchi (Jharkhand), India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#8A5559] border border-[#1F2B1A]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      ⏱️
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5C6B55]">Response Time</p>
                      <p className="text-xs text-[#5C6B55]">
                        All messages are answered personally within 24–48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credibility Seal */}
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/10 flex items-center gap-2 text-xs text-[#5C6B55]">
                <span className="w-2 h-2 rounded-full bg-[#829461]" />
                <span>Registered Public Charitable Trust · 80G & 12A Certified · Aligned with UN SDGs</span>
              </div>
            </div>

            {/* Right 7 Columns: Streamlined, Frictionless Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#1F2B1A]/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-serif font-bold text-[#1F2B1A]">
                    Send Us a Message
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EFF4E8] text-[#1F2B1A]">
                    Active: {contactInterest}
                  </span>
                </div>
                <p className="text-xs text-[#5C6B55] mt-1">
                  Choose a focus area below and tell us how we can collaborate.
                </p>

                {/* Focus Area Filter Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "CSR Partnership",
                    "Rural Fellowship",
                    "Hydrology & Research",
                    "Water Rejuvenation",
                    "Women Livelihood",
                    "The Water Ride Expedition",
                  ].map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => setContactInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                        contactInterest === interest
                          ? "bg-[#829461] text-white shadow-xs"
                          : "bg-[#F8FAF6] text-[#5C6B55] hover:bg-[#EFF4E8] hover:text-[#1F2B1A] border border-[#1F2B1A]/10"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Thank you for reaching out regarding ${contactInterest}! The GRAM team will respond to your email shortly.`);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1F2B1A] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAF6]/50 border border-[#1F2B1A]/15 text-xs sm:text-sm text-[#1B2418] placeholder:text-[#5C6B55]/50 focus:outline-none focus:ring-2 focus:ring-[#829461] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1F2B1A] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ramesh@example.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAF6]/50 border border-[#1F2B1A]/15 text-xs sm:text-sm text-[#1B2418] placeholder:text-[#5C6B55]/50 focus:outline-none focus:ring-2 focus:ring-[#829461] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F2B1A] mb-1.5">
                      Organization or City (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Foundation, University, or Village Council"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAF6]/50 border border-[#1F2B1A]/15 text-xs sm:text-sm text-[#1B2418] placeholder:text-[#5C6B55]/50 focus:outline-none focus:ring-2 focus:ring-[#829461] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F2B1A] mb-1.5">
                      Your Message or Collaboration Idea *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share how you'd like to partner, volunteer, or support..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAF6]/50 border border-[#1F2B1A]/15 text-xs sm:text-sm text-[#1B2418] placeholder:text-[#5C6B55]/50 focus:outline-none focus:ring-2 focus:ring-[#829461] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-[#5C6B55] flex items-center gap-1.5">
                      <span>🔒</span>
                      <span>We respect your privacy and never share contact details.</span>
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] border border-[#829461]/30 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:scale-102 active:scale-98"
                    >
                      SEND MESSAGE →
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER (Deep Forest Background)                              */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#1F2B1A] text-white py-12 px-6 sm:px-10 md:px-14">
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

          <div className="flex items-center gap-6 text-xs text-[#F8FAF6]/80">
            <button onClick={scrollToTop} className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Back to Hero ↑
            </button>
            <button onClick={() => scrollToAnchor("about")} className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Vision & Mission
            </button>
            <button onClick={() => scrollToAnchor("programs")} className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Programs
            </button>
            <button onClick={() => scrollToAnchor("water-ride")} className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Water Ride
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFF4E8]/60 gap-3">
          <p>© 2026 GRAM Association. All Rights Reserved.</p>
          <p className="italic font-serif">“The soul of India lives in its villages” — Mahatma Gandhi</p>
        </div>
      </footer>

      {/* Bunker Roy Quote Modal */}
        {showQuoteModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowQuoteModal(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-7 sm:p-9 shadow-2xl text-left border border-[#1F2B1A]/15"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuoteModal(false)}
                className="absolute top-5 right-5 text-[#5C6B55] hover:text-[#1F2B1A] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#EFF4E8] transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="w-10 h-10 rounded-xl bg-[#EFF4E8] text-[#1F2B1A] flex items-center justify-center text-xl font-serif mb-3">
                “
              </div>
              <p className="text-lg sm:text-xl font-serif text-[#1F2B1A] leading-relaxed tracking-tight">
                Listen to the people on the ground. They have all the solutions if
                you have the patience to hear.
              </p>
              <div className="mt-6 pt-4 border-t border-[#1F2B1A]/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1F2B1A] text-sm">
                    Sanjit Bunker Roy
                  </p>
                  <p className="text-xs text-[#5C6B55]">
                    Founder, Barefoot College (Tilonia, Rajasthan)
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F8FAF6] text-[#829461] border border-[#829461]/25">
                  GRAM Philosophy
                </span>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}
