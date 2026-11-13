// ARCHIVED: 3D Curved Card Transition Hero Component
// Preserved for future reuse.

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

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

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2100; // 2.1s
    let rafId: number;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Hold for 350ms at 100%, then slide up curtain
        const timer1 = setTimeout(() => {
          setIsLeaving(true);
          const timer2 = setTimeout(() => {
            onComplete();
          }, 750);
          return () => clearTimeout(timer2);
        }, 350);
        return () => clearTimeout(timer1);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

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
      className={`fixed inset-0 z-[9999] bg-[#FAF6EC] flex flex-col justify-between items-center transition-transform duration-700 select-none overflow-hidden ${
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
          onClick={onSkip}
          className="px-3.5 py-1.5 rounded-full bg-[#E6F1EA] hover:bg-[#d8e8de] text-[#0E3B33] border border-[#0E3B33]/15 text-xs font-semibold tracking-wider transition-colors cursor-pointer"
        >
          SKIP →
        </button>
      </div>

      {/* Center Word & Stadium Pill */}
      <div className="relative flex flex-col items-center justify-center my-auto px-4">
        <div
          className="flex items-center justify-center font-extrabold text-[#0E3B33] tracking-[-0.045em] leading-[0.8]"
          style={{
            fontSize: "min(19.6vh, 13.2vw)",
            gap: `${gapEm}em`,
          }}
        >
          <span className="inline-block leading-[0.8] select-none">GR</span>

          {/* Stadium Pill with Image */}
          <div
            className="relative overflow-hidden bg-[#d8d3cf] rounded-full flex-shrink-0 shadow-sm"
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
              className="absolute inset-0 bg-[#a9a9a6] pointer-events-none"
              style={{ opacity: overlayOpacity }}
            />
          </div>

          <span className="inline-block leading-[0.8] select-none">AM</span>
        </div>

        {/* Minimalist Loading Bar & Counter in Marigold & Terracotta */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2.5">
          <div className="w-40 sm:w-56 h-1.5 bg-[#0E3B33]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F4A62A] transition-all duration-75 rounded-full shadow-[0_0_10px_rgba(244,166,42,0.6)]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-[#5A6B65]">
            HARVESTING THE HEAVEN · <span className="text-[#C2562F] font-bold">{percent}%</span>
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 py-4 sm:px-12 flex items-center justify-between text-[11px] text-[#5A6B65] tracking-wider font-medium">
        <span>THE WATER RIDE EXPEDITION</span>
        <span>BUILDING SELF-RELIANT VILLAGES</span>
      </div>
    </div>
  );
}

export default function Home() {
  // Website Loading Screen ("Wild Pill" Preloader)
  const [showPreloader, setShowPreloader] = useState(true);

  // 'hero' = single-screen 100vh hero with curved transition
  // 'content' = normal continuous vertical scrolling for the rest of the website
  const [viewMode, setViewMode] = useState<"hero" | "content">("hero");
  const [transitionStage, setTransitionStage] = useState<
    | "idle"
    | "collapsing"
    | "sliding"
    | "expanding"
    | "reverse-start"
    | "reverse-collapsing"
    | "reverse-sliding"
    | "reverse-expanding"
  >("idle");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Vision & Mission slide indexes
  const [visionSlide, setVisionSlide] = useState(0);
  const [missionSlide, setMissionSlide] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [selectedWaterRideTab, setSelectedWaterRideTab] = useState(0);
  const [contactInterest, setContactInterest] = useState("Water Rejuvenation");
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

  // Auto-advance hero slides every 5 seconds when in hero mode
  useEffect(() => {
    if (viewMode !== "hero") return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [viewMode]);

  const isTransitioningRef = useRef(false);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const lastAtTopTime = useRef(0);

  // Vision statements from user content
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

  // 3-Stage Curved Transition: Hero -> Content (Normal Scroll)
  const triggerCurveToContent = useCallback(() => {
    if (isTransitioningRef.current || viewMode !== "hero") return;
    isTransitioningRef.current = true;

    // Stage 1: Hero collapses back & curves inner edges (500ms)
    setTransitionStage("collapsing");

    // Stage 2: Glides into Section 1 (1100ms)
    setTimeout(() => {
      setTransitionStage("sliding");
    }, 500);

    // Stage 3: Expands to full 100vh (450ms)
    setTimeout(() => {
      setTransitionStage("expanding");
    }, 1600);

    // Done: Switch to normal continuous scrolling mode
    setTimeout(() => {
      setViewMode("content");
      setTransitionStage("idle");
      isTransitioningRef.current = false;
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 2050);
  }, [viewMode]);

  // 3-Stage Curved Transition: Content -> Hero (Reverse Scroll Back to Landing)
  const triggerCurveToHero = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    // Reset window scroll position to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // Step 1: Switch to 'hero' view with Section 1 flat on screen and Hero offscreen left
    setViewMode("hero");
    setTransitionStage("reverse-start");

    // Step 2: Next frame, collapse Section 1 into concave curved card (450ms)
    setTimeout(() => {
      setTransitionStage("reverse-collapsing");
    }, 40);

    // Step 3: Slide Section 1 right (+110%) and Hero card in from left (-110% to 0%) (1100ms)
    setTimeout(() => {
      setTransitionStage("reverse-sliding");
    }, 490);

    // Step 4: Expand Hero card from curved scale(0.82) to full flat scale(1) (450ms)
    setTimeout(() => {
      setTransitionStage("reverse-expanding");
    }, 1590);

    // Step 5: Finished, resting in idle
    setTimeout(() => {
      setTransitionStage("idle");
      isTransitioningRef.current = false;
    }, 2050);
  }, []);

  // Return to Hero view triggers reverse curve animation
  const returnToHero = useCallback(() => {
    triggerCurveToHero();
  }, [triggerCurveToHero]);

  // Optimized wheel listener: zero blocking when scrolling down content
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      if (viewMode === "hero") {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTime.current < 2050) return;

        if (e.deltaY > 15) {
          lastScrollTime.current = now;
          triggerCurveToContent();
        }
      } else if (viewMode === "content") {
        // Fast-path for normal scrolling: immediately let the browser scroll without delays
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 5) return;

        // Only intercept when user is at the very top of Section 1 and deliberately scrolls UP
        if (e.deltaY < -15) {
          const now = Date.now();
          if (now - lastScrollTime.current < 1000) return;
          lastScrollTime.current = now;
          e.preventDefault();
          triggerCurveToHero();
        }
      }
    },
    [viewMode, triggerCurveToContent, triggerCurveToHero]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;
      if (viewMode === "hero") {
        if (["ArrowDown", "PageDown", " "].includes(e.key)) {
          e.preventDefault();
          triggerCurveToContent();
        }
      } else if (viewMode === "content") {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY <= 5 && ["ArrowUp", "PageUp"].includes(e.key)) {
          e.preventDefault();
          triggerCurveToHero();
        }
      }
    },
    [viewMode, triggerCurveToContent, triggerCurveToHero]
  );

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent | TouchEvent) => {
    if ("touches" in e && e.touches[0]) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | TouchEvent) => {
    if (isTransitioningRef.current) return;
    const touchEndY = "changedTouches" in e && e.changedTouches[0] ? e.changedTouches[0].clientY : 0;
    const diff = touchStartY.current - touchEndY; // positive = swipe up (scroll down), negative = swipe down (scroll up)

    if (viewMode === "hero") {
      if (diff > 40) {
        triggerCurveToContent();
      }
    } else if (viewMode === "content") {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY <= 5 && diff < -40) {
        triggerCurveToHero();
      }
    }
  };

  useEffect(() => {
    const wheelListener = (e: WheelEvent) => handleWheel(e);
    window.addEventListener("wheel", wheelListener, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    const onTouchStart = (e: TouchEvent) => handleTouchStart(e);
    const onTouchEnd = (e: TouchEvent) => handleTouchEnd(e);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", wheelListener);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleWheel, handleKeyDown]);

  // Smooth scroll helper for navbar in content mode
  const scrollToAnchor = (id: string) => {
    if (viewMode === "hero") {
      triggerCurveToContent();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 2100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Compute curved animation style during Hero <-> Content transitions
  const getHeroSlideStyle = () => {
    switch (transitionStage) {
      case "idle":
        return {
          transform: "translateX(0%) scale(1)",
          clipPath: FLAT_POLYGON,
          borderRadius: "0px",
          transition: "transform 450ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 450ms, border-radius 450ms",
        };
      case "collapsing":
        return {
          transform: "translateX(0%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 500ms, border-radius 500ms",
        };
      case "sliding":
      case "expanding":
        return {
          transform: "translateX(-110%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: transitionStage === "sliding" ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        };
      case "reverse-start":
      case "reverse-collapsing":
        return {
          transform: "translateX(-110%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "none",
        };
      case "reverse-sliding":
        return {
          transform: "translateX(0%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
        };
      case "reverse-expanding":
        return {
          transform: "translateX(0%) scale(1)",
          clipPath: FLAT_POLYGON,
          borderRadius: "0px",
          transition: "transform 450ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 450ms, border-radius 450ms",
        };
    }
  };

  const getContentIntroStyle = () => {
    switch (transitionStage) {
      case "idle":
      case "collapsing":
        return {
          transform: "translateX(110%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "none",
        };
      case "sliding":
        return {
          transform: "translateX(0%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
        };
      case "expanding":
        return {
          transform: "translateX(0%) scale(1)",
          clipPath: FLAT_POLYGON,
          borderRadius: "0px",
          transition: "transform 450ms cubic-bezier(0.16, 1, 0.3, 1), clip-path 450ms, border-radius 450ms",
        };
      case "reverse-start":
        return {
          transform: "translateX(0%) scale(1)",
          clipPath: FLAT_POLYGON,
          borderRadius: "0px",
          transition: "none",
        };
      case "reverse-collapsing":
        return {
          transform: "translateX(0%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 450ms, border-radius 450ms",
        };
      case "reverse-sliding":
      case "reverse-expanding":
        return {
          transform: "translateX(110%) scale(0.82)",
          clipPath: CURVED_POLYGON,
          borderRadius: "36px",
          transition: transitionStage === "reverse-sliding" ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        };
    }
  };

  const isHeroCurved =
    transitionStage === "collapsing" ||
    transitionStage === "sliding" ||
    transitionStage === "reverse-collapsing" ||
    transitionStage === "reverse-sliding";

  const isContentCurved =
    transitionStage === "sliding" ||
    transitionStage === "reverse-collapsing" ||
    transitionStage === "reverse-sliding";

  // Section 1: Exactly matching user reference design (About Us + Bento Cards + Story Subsection)
  const renderWhatDrivesUsContent = (isInsideHeroCard = false) => (
    <div
      className={`max-w-7xl mx-auto flex flex-col justify-between w-full ${
        isInsideHeroCard
          ? "h-full pt-16 sm:pt-20 pb-5 sm:pb-7 gap-4 sm:gap-5"
          : "gap-10 sm:gap-14"
      }`}
    >
      {/* 1. TOP HEADER ROW: Left Pill + Right Strong Headline */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-8">
        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#0E3B33]/15 text-[#0E3B33] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#1F7A5A]" />
            <span>About us</span>
          </div>
        </div>

        <h2
          className={`font-serif text-[#0E3B33] font-medium leading-[1.28] tracking-tight max-w-2xl md:text-right ${
            isInsideHeroCard
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-2xl sm:text-3xl lg:text-[34px]"
          }`}
        >
          From basic healthcare to quality education support for underprivileged
          communities to breaking the cycle of generational poverty
        </h2>
      </div>

      {/* 2. FOUR-COLUMN HORIZONTAL STATS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-4 sm:py-6 border-y border-[#0E3B33]/10">
        <div className="sm:border-r border-[#0E3B33]/10 pr-2 sm:pr-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B33]">23+</div>
          <div className="text-xs sm:text-[13px] text-[#5A6B65] mt-1 font-medium">Local volunteers</div>
        </div>
        <div className="sm:border-r border-[#0E3B33]/10 sm:px-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B33]">25+</div>
          <div className="text-xs sm:text-[13px] text-[#5A6B65] mt-1 font-medium">Years of trust</div>
        </div>
        <div className="sm:border-r border-[#0E3B33]/10 sm:px-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B33]">100%</div>
          <div className="text-xs sm:text-[13px] text-[#5A6B65] mt-1 font-medium">Safety compliance record</div>
        </div>
        <div className="sm:pl-4">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B33]">240+</div>
          <div className="text-xs sm:text-[13px] text-[#5A6B65] mt-1 font-medium">Lives transformed</div>
        </div>
      </div>

      {/* 3. THREE BENTO CARDS (Water Blue, Center Photo, Green Livelihood) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Card 1 (Left): Light Blue Mist Tint */}
        <div className="bg-[#E3F0F5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#1B6A8A]/15 shadow-xs min-h-[260px] sm:min-h-[290px]">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#1B6A8A]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#0E3B33] tracking-tight">
              3.5M lbs
            </div>
          </div>

          <div className="mt-6 pt-4">
            <div className="text-xs font-semibold text-[#1B6A8A]">
              + 40% more families reached
            </div>
            <p className="text-xs sm:text-[13px] text-[#17211E]/80 leading-relaxed font-normal mt-1">
              Up to 90% of donations go directly to aid.
            </p>
          </div>
        </div>

        {/* Card 2 (Middle): Image Bento Card */}
        <div className="relative overflow-hidden rounded-3xl min-h-[260px] sm:min-h-[290px] flex flex-col justify-between p-6 shadow-md text-white">
          <Image
            src="/images/section2-village-water.jpg"
            alt="Rural community child"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold border border-white/25">
              <span>★</span>
              <span>Trusted by 500+ donors</span>
            </span>
          </div>

          <div className="relative z-10 mt-auto pt-6">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              25,000
            </div>
            <div className="text-xs sm:text-[13px] text-white/90 font-medium mt-0.5">
              Students educated
            </div>
          </div>
        </div>

        {/* Card 3 (Right): Light Green Sprout Tint */}
        <div className="bg-[#E6F1EA] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#1F7A5A]/15 shadow-xs min-h-[260px] sm:min-h-[290px]">
          <div className="flex items-center justify-between">
            <div className="text-2xl sm:text-3xl font-bold text-[#0E3B33] tracking-tight">
              85%
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#1F7A5A]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-[#0E3B33]">
              Community health
            </h3>
            <p className="text-xs text-[#5A6B65] mt-1 font-medium">
              + 120 communities served
            </p>

            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => scrollToAnchor("programs")}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#0E3B33] text-xs font-semibold shadow-xs border border-[#0E3B33]/10 hover:bg-[#FAF6EC] transition-colors cursor-pointer"
              >
                View health
              </button>
              <button
                onClick={() => scrollToAnchor("programs")}
                className="px-3.5 py-1.5 rounded-full bg-[#1F7A5A] text-white text-xs font-semibold shadow-xs hover:bg-[#165e45] transition-colors cursor-pointer"
              >
                initiatives
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SECOND STORY SUBSECTION (Overlapping Images + Narrative Copy) */}
      {!isInsideHeroCard && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mt-6 sm:mt-10 pt-8 sm:pt-12 border-t border-[#0E3B33]/10">
          {/* Left: Overlapping Photos */}
          <div className="lg:col-span-6 relative w-full max-w-md mx-auto">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl bg-slate-100">
              <Image
                src="/images/IMG_2883.JPG"
                alt="Rural village child smiling"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Overlapping Secondary Photo */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-[#FAF6EC] shadow-2xl bg-white">
              <Image
                src="/images/IMG_3468.JPG"
                alt="Village education and health activities"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 144px, 192px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Narrative + Get in touch + Huge 25+ Stat */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#0E3B33] leading-[1.22] tracking-tight">
                From rural healthcare access to modern classroom for inclusive
                social development
              </h3>

              <p className="text-sm sm:text-base text-[#5A6B65] leading-relaxed mt-4 max-w-lg font-normal">
                Connecting healthcare and education to uplift rural communities
                and create inclusive, long-term social transformation worldwide.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => scrollToAnchor("contact")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E6F1EA] hover:bg-[#d8e8de] text-[#0E3B33] border border-[#0E3B33]/15 text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  <span>Get in touch</span>
                  <span className="text-sm">↗</span>
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between mt-10 pt-6 border-t border-[#0E3B33]/10">
              <button
                onClick={() => scrollToAnchor("about")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E3B33] hover:text-[#1F7A5A] transition-colors cursor-pointer pb-1"
              >
                <span>Community support</span>
                <span>→</span>
              </button>

              <div className="text-right">
                <div className="text-5xl sm:text-6xl font-extrabold text-[#0E3B33] tracking-tight leading-none">
                  25+
                </div>
                <div className="text-xs text-[#5A6B65] mt-1 font-medium">
                  Years of proven experience
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ============================================================
  // VIEW MODE 1: HERO VIEW (100vh Landing with Curved Intro)
  // ============================================================
  if (viewMode === "hero") {
    const isHeroNav =
      transitionStage === "idle" ||
      transitionStage === "collapsing" ||
      transitionStage === "reverse-expanding";

    return (
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-screen h-[100dvh] max-h-screen w-full overflow-hidden bg-[#E8F5D8] font-sans select-none"
        style={{ perspective: "1400px" }}
      >
        {/* Preloader Screen */}
        {showPreloader && (
          <GramPillLoader
            onComplete={() => setShowPreloader(false)}
            onSkip={() => setShowPreloader(false)}
          />
        )}

        {/* Refined, Responsive Glass Navbar */}
        <header
          className={`fixed top-0 inset-x-0 z-50 w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-3.5 backdrop-blur-md transition-all duration-300 border-b ${
            isHeroNav
              ? "bg-black/20 border-white/10 text-white"
              : "bg-[#FAF6EC]/95 border-[#0E3B33]/15 text-[#0E3B33] shadow-xs"
          }`}
        >
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* Left Nav Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-[13px] font-medium tracking-wide">
              <button
                onClick={returnToHero}
                className={`transition-colors cursor-pointer ${
                  isHeroNav
                    ? "text-white font-semibold"
                    : "text-[#5A6B65] hover:text-[#0E3B33]"
                }`}
              >
                Home
              </button>
              <button
                onClick={triggerCurveToContent}
                className={`transition-colors cursor-pointer ${
                  !isHeroNav
                    ? "font-bold text-[#0E3B33]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToAnchor("programs")}
                className={`transition-colors cursor-pointer ${
                  isHeroNav
                    ? "text-white/80 hover:text-white"
                    : "text-[#5A6B65] hover:text-[#0E3B33]"
                }`}
              >
                Programs
              </button>
              <button
                onClick={() => scrollToAnchor("water-ride")}
                className={`transition-colors cursor-pointer ${
                  isHeroNav
                    ? "text-white/80 hover:text-white"
                    : "text-[#5A6B65] hover:text-[#0E3B33]"
                }`}
              >
                Water Ride
              </button>
            </nav>

            {/* Center Brand Logo / Wordmark */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src={isHeroNav ? "/images/gram-logo-white.png" : "/images/gram-logo.png"}
                alt="GRAM Association"
                width={150}
                height={50}
                priority
                className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300"
              />
            </Link>

            {/* Right Nav Links & Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => scrollToAnchor("water-ride")}
                className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                  isHeroNav
                    ? "text-white/80 hover:text-white"
                    : "text-[#5A6B65] hover:text-[#0E3B33]"
                }`}
              >
                Expedition
              </button>
              <button
                onClick={() => scrollToAnchor("contact")}
                className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer ${
                  isHeroNav
                    ? "text-white/80 hover:text-white"
                    : "text-[#5A6B65] hover:text-[#0E3B33]"
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => setShowPreloader(true)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                  isHeroNav
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-[#E6F1EA] hover:bg-[#d8e8de] text-[#0E3B33] border border-[#0E3B33]/20"
                }`}
                title="Replay Wild Pill Website Loading Screen"
              >
                <span>↺</span>
                <span>LOADER</span>
              </button>
              <button
                onClick={() => scrollToAnchor("contact")}
                className="rounded-full px-4.5 py-1.5 sm:px-5 sm:py-2 text-[11px] font-bold tracking-wider uppercase shadow-sm hover:shadow transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer bg-[#F4A62A] hover:bg-[#f6b244] text-[#17211E]"
              >
                GET IN TOUCH
              </button>
            </div>

            {/* Mobile / Tablet Hamburger & Actions */}
            <div className="lg:hidden flex items-center gap-2.5">
              <button
                onClick={() => scrollToAnchor("contact")}
                className="rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase bg-[#F4A62A] text-[#17211E]"
              >
                CONTACT
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-transform active:scale-95 ${
                  isHeroNav
                    ? "bg-white/15 text-white border-white/20"
                    : "bg-[#E6F1EA] text-[#0E3B33] border-[#0E3B33]/20"
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

        {/* Mobile Navigation Drawer on Hero */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-4 right-4 z-50 p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col gap-3 text-center text-white">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                returnToHero();
              }}
              className="text-sm font-semibold py-1.5 text-white/90 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerCurveToContent();
              }}
              className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
            >
              About & Vision
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
              className="mt-2 rounded-full bg-[#F4A62A] text-[#17211E] py-2.5 text-xs font-bold tracking-wider uppercase shadow-md"
            >
              GET IN TOUCH
            </button>
          </div>
        )}

        {/* HERO CARD (Redesigned like Naturely: clean photo, balanced typography, no green smoke) */}
        <section
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform flex flex-col justify-between shadow-[0_20px_60px_rgba(14,59,51,0.22)] z-20"
          style={{
            ...getHeroSlideStyle(),
            transformOrigin: "center center",
            filter: isHeroCurved
              ? "drop-shadow(0 20px 50px rgba(14,59,51,0.3))"
              : "none",
          }}
        >
          <div
            className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 rounded-[36px] ${
              isHeroCurved ? "opacity-100 ring-1 ring-white/20" : "opacity-0"
            }`}
          />

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
                  className="object-cover object-center"
                />
              </div>
            ))}
            {/* Subtle natural dark gradient for text legibility without muddy green haze */}
            <div className="absolute inset-0 bg-black/25 z-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none z-20" />
          </div>

          {/* Main Hero Content: Left elements moved further left, description moved further right */}
          <div className="relative z-30 flex-1 flex flex-col justify-between pt-24 sm:pt-28 md:pt-30 pb-6 sm:pb-8 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1600px] mx-auto w-full">
            {/* Top Left: Headline & Button shifted outward to the left */}
            <div className="max-w-md sm:max-w-lg lg:max-w-xl text-left mt-3 sm:mt-5 lg:mt-7 transition-all duration-700">
              <h1 className="font-sans font-normal text-white text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.12] tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                <span>{heroSlides[currentHeroSlide].title}</span>
                <br />
                <span>{heroSlides[currentHeroSlide].highlight}</span>
                <br />
                <span>{heroSlides[currentHeroSlide].sub}</span>
              </h1>

              {/* Stadium White Pill Button */}
              <div className="mt-4 sm:mt-5">
                <button
                  onClick={() => scrollToAnchor("contact")}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#FAF6EC] hover:bg-white text-[#17211E] text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:scale-103 active:scale-97 cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <span className="text-xs font-bold">↗</span>
                </button>
              </div>
            </div>

            {/* Bottom Area: Narrative Paragraph + Controls & Filter Pills */}
            <div className="w-full flex flex-col gap-4 sm:gap-5 mt-auto">
              {/* Right-Aligned Narrative Paragraph shifted outward to the right */}
              <div className="max-w-sm sm:max-w-md lg:max-w-lg ml-auto mr-0 text-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-700">
                <p className="text-[11px] sm:text-xs md:text-[13px] text-white/90 leading-relaxed font-normal">
                  {heroSlides[currentHeroSlide].desc}
                </p>
              </div>

              {/* Bottom Controls Row: Translucent Pills on the right */}
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

        {/* SECTION 1 (Curves and slides in from right with EXACT SAME content) */}
        <section
          className="absolute inset-0 w-full h-full overflow-hidden will-change-transform bg-white text-[#17211E] flex flex-col justify-between shadow-[0_20px_60px_rgba(14,59,51,0.18)] z-10 px-5 sm:px-8 md:px-12"
          style={{
            ...getContentIntroStyle(),
            transformOrigin: "center center",
            filter: isContentCurved
              ? "drop-shadow(0 20px 50px rgba(14,59,51,0.22))"
              : "none",
          }}
        >
          <div
            className={`absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 rounded-[36px] ${
              isContentCurved ? "opacity-100 ring-1 ring-[#0E3B33]/20" : "opacity-0"
            }`}
          />
          {renderWhatDrivesUsContent(true)}
        </section>

        {/* Bunker Roy Quote Modal */}
        {showQuoteModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowQuoteModal(false)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl bg-white p-7 sm:p-9 shadow-2xl text-left border border-[#0E3B33]/15"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQuoteModal(false)}
                className="absolute top-5 right-5 text-[#5A6B65] hover:text-[#0E3B33] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#E6F1EA] transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="w-10 h-10 rounded-xl bg-[#E6F1EA] text-[#0E3B33] flex items-center justify-center text-xl font-serif mb-3">
                “
              </div>
              <p className="text-lg sm:text-xl font-serif text-[#0E3B33] leading-relaxed tracking-tight">
                Listen to the people on the ground. They have all the solutions if
                you have the patience to hear.
              </p>
              <div className="mt-6 pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0E3B33] text-sm">
                    Sanjit Bunker Roy
                  </p>
                  <p className="text-xs text-[#5A6B65]">
                    Founder, Barefoot College (Tilonia, Rajasthan)
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAF6EC] text-[#1F7A5A] border border-[#1F7A5A]/25">
                  GRAM Philosophy
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================
  // VIEW MODE 2: NORMAL CONTINUOUS VERTICAL SCROLLING
  // "After this section make it normal scroll no that curve one"
  // ============================================================
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full min-h-screen bg-[#FAF6EC] font-sans text-[#17211E] relative"
    >
      {/* Preloader Screen */}
      {showPreloader && (
        <GramPillLoader
          onComplete={() => setShowPreloader(false)}
          onSkip={() => setShowPreloader(false)}
        />
      )}

      {/* Sticky Header in Content View */}
      <header className="sticky top-0 inset-x-0 z-50 w-full px-6 py-3.5 sm:px-10 md:px-14 backdrop-blur-md bg-[#FAF6EC]/90 border-b border-[#0E3B33]/15 text-[#0E3B33] shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={returnToHero}
            className="group flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/gram-logo.png"
              alt="GRAM Association"
              width={160}
              height={55}
              priority
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8 lg:gap-11">
            <button
              onClick={returnToHero}
              className="text-[13px] lg:text-sm font-medium text-[#5A6B65] hover:text-[#0E3B33] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToAnchor("about")}
              className="text-[13px] lg:text-sm font-bold text-[#0E3B33] border-b-2 border-[#1F7A5A] pb-0.5 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToAnchor("programs")}
              className="text-[13px] lg:text-sm font-medium text-[#5A6B65] hover:text-[#0E3B33] transition-colors cursor-pointer"
            >
              Programs
            </button>
            <button
              onClick={() => scrollToAnchor("water-ride")}
              className="text-[13px] lg:text-sm font-medium text-[#5A6B65] hover:text-[#0E3B33] transition-colors cursor-pointer"
            >
              Water Ride
            </button>
            <button
              onClick={() => scrollToAnchor("contact")}
              className="text-[13px] lg:text-sm font-medium text-[#5A6B65] hover:text-[#0E3B33] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setShowPreloader(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer bg-[#E6F1EA] hover:bg-[#d8e8de] text-[#0E3B33] border border-[#0E3B33]/20"
              title="Replay Wild Pill Website Loading Screen"
            >
              <span>↺</span>
              <span>LOADER</span>
            </button>
            <button
              onClick={returnToHero}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0E3B33] hover:text-[#081a17] bg-[#E6F1EA] hover:bg-[#d8e8de] border border-[#0E3B33]/20 transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Return to Landing Hero"
            >
              <span>↑</span>
              <span>Landing</span>
            </button>
            <button
              onClick={() => scrollToAnchor("contact")}
              className="rounded-full bg-[#F4A62A] hover:bg-[#f6b244] text-[#17211E] px-5 py-2 text-[11px] font-bold tracking-wider uppercase shadow-sm hover:shadow transition-all duration-200 hover:scale-102 active:scale-98 cursor-pointer"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#E6F1EA] text-[#0E3B33] border border-[#0E3B33]/20 transition-transform active:scale-95"
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
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-5 right-5 z-50 p-5 rounded-2xl bg-[#FAF6EC]/95 backdrop-blur-xl border border-[#0E3B33]/20 shadow-2xl flex flex-col gap-3 text-center">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              returnToHero();
            }}
            className="text-sm font-medium py-1.5 text-[#5A6B65] hover:text-[#0E3B33]"
          >
            Home (Hero)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("about");
            }}
            className="text-sm font-bold py-1.5 text-[#0E3B33]"
          >
            About & Vision
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("programs");
            }}
            className="text-sm font-medium py-1.5 text-[#5A6B65] hover:text-[#0E3B33]"
          >
            Our Programs
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("water-ride");
            }}
            className="text-sm font-medium py-1.5 text-[#5A6B65] hover:text-[#0E3B33]"
          >
            The Water Ride
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToAnchor("contact");
            }}
            className="mt-1 rounded-full bg-[#F4A62A] text-[#17211E] py-2.5 text-xs font-bold tracking-wider uppercase shadow-md"
          >
            GET IN TOUCH
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 1: ABOUT US (Exact Bento Layout Matching Reference)  */}
      {/* ============================================================ */}
      <section
        id="about"
        className="w-full bg-white py-16 sm:py-24 px-5 sm:px-8 md:px-12 border-b border-[#0E3B33]/10"
      >
        {renderWhatDrivesUsContent(false)}
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: OUR PROGRAMS (Clean, Lightweight 4-Card Grid)     */}
      {/* ============================================================ */}
      <section id="programs" className="w-full bg-white py-16 sm:py-24 px-5 sm:px-8 md:px-12 border-b border-[#0E3B33]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F1EA] text-[#0E3B33] text-xs font-semibold tracking-wide border border-[#1F7A5A]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A5A]" />
              <span>Grassroots Action</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-[#0E3B33] tracking-tight">
              Our Core Programs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5A6B65] font-normal leading-relaxed">
              Turning indigenous wisdom into scalable water, ecological, and livelihood resilience across Eastern India.
            </p>
          </div>

          {/* Clean, Lightweight 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {programs.map((p, idx) => (
              <div
                key={p.id}
                className="group rounded-2xl bg-white border border-[#0E3B33]/10 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#1F7A5A]/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Thumbnail */}
                <div className="relative w-full h-44 overflow-hidden bg-[#0E3B33]/5">
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
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 text-[#0E3B33] shadow-xs backdrop-blur-md">
                      📍 {p.location}
                    </span>
                  </div>

                  {/* Impact Stat */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#F4A62A] text-[#17211E] shadow-xs">
                      {p.stat}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F7A5A]">
                      0{idx + 1} · {p.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#0E3B33] group-hover:text-[#1F7A5A] transition-colors leading-snug mt-1">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5A6B65] leading-relaxed line-clamp-3">
                      {p.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-[#0E3B33]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#5A6B65]">Community-led</span>
                    <button
                      onClick={() => {
                        setContactInterest(p.title);
                        scrollToAnchor("contact");
                      }}
                      className="text-xs font-bold text-[#1F7A5A] hover:text-[#0E3B33] flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
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
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF6EC] border border-[#0E3B33]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#0E3B33]">
                Looking to support all four programs through institutional CSR?
              </p>
              <p className="text-xs text-[#5A6B65] mt-0.5">
                We partner with foundations and corporations on multi-village watershed and livelihood endowments.
              </p>
            </div>
            <button
              onClick={() => {
                setContactInterest("CSR Partnership");
                scrollToAnchor("contact");
              }}
              className="px-5 py-2 rounded-full bg-[#F4A62A] hover:bg-[#e0951f] text-[#17211E] text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs shrink-0"
            >
              Partner With Us →
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: THE WATER RIDE (Pure White Background)            */}
      {/* ============================================================ */}
      <section id="water-ride" className="w-full bg-white py-20 sm:py-28 px-5 sm:px-8 md:px-12 border-b border-[#0E3B33]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3F0F5] text-[#1B6A8A] text-xs font-semibold tracking-wide border border-[#1B6A8A]/25">
              <span className="w-2 h-2 rounded-full bg-[#1B6A8A] animate-pulse" />
              <span>National Water Movement · Solitary Expedition</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0E3B33] tracking-tight">
              8,000 Kilometers for Living Water
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A6B65] max-w-2xl font-normal leading-relaxed">
              A solitary Royal Enfield motorcycle expedition traversing 13 Indian states—turning two wheels into a roving field laboratory to document dying heritage stepwells and spark community water literacy.
            </p>
          </div>

          {/* Panoramic Visual Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-[#0E3B33]/10 shadow-md group bg-[#0E3B33]">
            <div className="relative w-full h-80 sm:h-[420px] md:h-[480px]">
              <Image
                src="/images/water-ride-expedition.jpg"
                alt="The Water Ride Royal Enfield Motorbike Expedition"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3B33]/90 via-[#0E3B33]/25 to-black/20" />

              {/* Floating Route Pill */}
              <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/95 text-[#0E3B33] shadow-md backdrop-blur-md">
                  📍 Route: Western Ghats → Deccan → Eastern Ghats → Himalayas
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F4A62A] text-[#17211E] shadow-md">
                  8,000+ KM · 13 Indian States
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#E3F0F5]/80">
                    The Expedition Log
                  </span>
                  <p className="mt-1 font-serif text-lg sm:text-xl md:text-2xl italic text-[#FAF6EC] leading-snug drop-shadow-sm">
                    &ldquo;Carrying portable test kits and paper maps to turn roadside tea stalls and village chaupals into open water classrooms.&rdquo;
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setContactInterest("The Water Ride Expedition");
                      scrollToAnchor("contact");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#F4A62A] hover:bg-[#e0951f] text-[#17211E] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
                  >
                    Join Movement →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Spacious Minimal Story Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4">
            
            {/* Pillar 1 */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF6EC]/40 border border-[#0E3B33]/10 shadow-xs hover:shadow-md hover:border-[#1F7A5A]/30 transition-all duration-300">
              <div>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#0E3B33]/10 bg-[#0E3B33]/5">
                  <Image
                    src="/images/water-ride-expedition.jpg"
                    alt="Documenting Living Baolis"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    01 · Heritage
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1B6A8A] uppercase tracking-wider">
                    Ancient Baolis & Kunds
                  </span>
                  <span className="text-xs font-bold text-[#C2562F]">
                    45+ Mapped
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E3B33] leading-snug">
                  Reviving Heritage Water Architecture
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#5A6B65] leading-relaxed font-normal">
                  Traversing desert fringes and Ghat corridors to identify and map centuries-old stepwells and earthen Johads before modern deep-bore extraction completely erases them.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between text-xs font-medium text-[#1F7A5A]">
                <span>13 States Surveyed</span>
                <span>Historic Architecture →</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF6EC]/40 border border-[#0E3B33]/10 shadow-xs hover:shadow-md hover:border-[#1F7A5A]/30 transition-all duration-300">
              <div>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#0E3B33]/10 bg-[#0E3B33]/5">
                  <Image
                    src="/images/loader-motorcycle.jpg"
                    alt="Mobile Village Chaupal Classrooms"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    02 · Community
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1F7A5A] uppercase tracking-wider">
                    Open-Air Classrooms
                  </span>
                  <span className="text-xs font-bold text-[#C2562F]">
                    100+ Villages
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E3B33] leading-snug">
                  Spontaneous Village Water Literacy
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#5A6B65] leading-relaxed font-normal">
                  Halting at roadside tea stalls, schools, and panchayat squares with testing strips to engage over 12,000 children and farmers in understanding their own drinking water.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between text-xs font-medium text-[#1F7A5A]">
                <span>12,000+ Youth Engaged</span>
                <span>Testing Kits →</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF6EC]/40 border border-[#0E3B33]/10 shadow-xs hover:shadow-md hover:border-[#1F7A5A]/30 transition-all duration-300">
              <div>
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#0E3B33]/10 bg-[#0E3B33]/5">
                  <Image
                    src="/images/hero/hero-slide-1.jpg"
                    alt="Himalayan Springshed Mapping"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    03 · Phase II
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1B6A8A] uppercase tracking-wider">
                    Himalayan Springs
                  </span>
                  <span className="text-xs font-bold text-[#C2562F]">
                    High Altitude
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E3B33] leading-snug">
                  High-Altitude Mountain Springsheds
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[#5A6B65] leading-relaxed font-normal">
                  Ascending into high mountain basins to study climate-induced spring depletion and co-create contour recharge trenches with hill communities to keep mountain streams flowing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between text-xs font-medium text-[#1F7A5A]">
                <span>Perennial Headwaters</span>
                <span>Springshed Code →</span>
              </div>
            </div>

          </div>

          {/* Minimal Route Corridor Timeline */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF6EC]/50 border border-[#0E3B33]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B6A8A]">
                National Transit Corridor
              </span>
              <p className="text-sm font-semibold text-[#0E3B33] mt-0.5">
                Connecting 13 States from Arid Dunes to Glacial Valleys
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#5A6B65]">
              <span className="px-3 py-1 rounded-full bg-white border border-[#0E3B33]/10">Thar Desert (RJ)</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#0E3B33]/10">Aravalli Hills</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#0E3B33]/10">Western Ghats</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#0E3B33]/10">Deccan Plateau</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#0E3B33]/10">Himalayas</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: GET IN TOUCH & COLLABORATE (Modern Partnership)   */}
      {/* ============================================================ */}
      <section id="contact" className="w-full bg-white py-20 sm:py-28 px-5 sm:px-8 md:px-12 border-b border-[#0E3B33]/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F1EA] text-[#0E3B33] text-xs font-semibold tracking-wide border border-[#1F7A5A]/25">
              <span className="w-2 h-2 rounded-full bg-[#1F7A5A] animate-pulse" />
              <span>Partnership & Fellowship Hub</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0E3B33] tracking-tight">
              Start a Conversation with GRAM
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A6B65] max-w-2xl font-normal leading-relaxed">
              Whether you represent an institutional CSR foundation, a rural fellowship applicant, a hydrological researcher, or a village sarpanch—we welcome lasting, values-aligned partnerships.
            </p>
          </div>

          {/* 3 Interactive Pathway Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            
            {/* Pathway 1 */}
            <div
              onClick={() => setContactInterest("CSR Partnership")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                contactInterest === "CSR Partnership"
                  ? "bg-[#E6F1EA]/80 border-[#1F7A5A] shadow-md ring-2 ring-[#1F7A5A]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#FAF6EC]/60 border-[#0E3B33]/10 hover:border-[#1F7A5A]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-[#E6F1EA] text-[#0E3B33] flex items-center justify-center text-lg font-bold">
                    🤝
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F7A5A] px-2.5 py-0.5 rounded-full bg-white border border-[#1F7A5A]/20">
                    Institutional
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E3B33]">
                  CSR & Corporate Alliances
                </h3>
                <p className="mt-2 text-xs text-[#5A6B65] leading-relaxed">
                  Adopt dried waterbodies, fund gravity spring pipelines, or sponsor women’s Sal leaf micro-enterprises.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#0E3B33]/10 text-xs font-bold text-[#1F7A5A]">
                <span>{contactInterest === "CSR Partnership" ? "● Selected" : "Select Topic"}</span>
                <span>→</span>
              </div>
            </div>

            {/* Pathway 2 */}
            <div
              onClick={() => setContactInterest("Rural Fellowship")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                contactInterest === "Rural Fellowship"
                  ? "bg-[#E3F0F5]/80 border-[#1B6A8A] shadow-md ring-2 ring-[#1B6A8A]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#FAF6EC]/60 border-[#0E3B33]/10 hover:border-[#1B6A8A]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-[#E3F0F5] text-[#1B6A8A] flex items-center justify-center text-lg font-bold">
                    🎒
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B6A8A] px-2.5 py-0.5 rounded-full bg-white border border-[#1B6A8A]/20">
                    On-The-Ground
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E3B33]">
                  Fellowships & Volunteering
                </h3>
                <p className="mt-2 text-xs text-[#5A6B65] leading-relaxed">
                  Spend 6–12 months on the ground in Rajasthan or Jharkhand working alongside barefoot engineers.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#0E3B33]/10 text-xs font-bold text-[#1B6A8A]">
                <span>{contactInterest === "Rural Fellowship" ? "● Selected" : "Select Topic"}</span>
                <span>→</span>
              </div>
            </div>

            {/* Pathway 3 */}
            <div
              onClick={() => setContactInterest("Water Rejuvenation")}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 ${
                contactInterest === "Water Rejuvenation"
                  ? "bg-[#FAF6EC] border-[#C2562F] shadow-md ring-2 ring-[#C2562F]/20 scale-[1.01]"
                  : "bg-white hover:bg-[#FAF6EC]/60 border-[#0E3B33]/10 hover:border-[#C2562F]/30 shadow-2xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-[#FAF6EC] text-[#C2562F] border border-[#C2562F]/20 flex items-center justify-center text-lg font-bold">
                    💧
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2562F] px-2.5 py-0.5 rounded-full bg-white border border-[#C2562F]/20">
                    Open Research
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E3B33]">
                  Hydrology & Policy Research
                </h3>
                <p className="mt-2 text-xs text-[#5A6B65] leading-relaxed">
                  Collaborate on open groundwater mapping, traditional stepwell revival, and community water rights.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#0E3B33]/10 text-xs font-bold text-[#C2562F]">
                <span>{contactInterest === "Water Rejuvenation" ? "● Selected" : "Select Topic"}</span>
                <span>→</span>
              </div>
            </div>

          </div>

          {/* Unified Split: Trust Hub + Streamlined Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
            
            {/* Left 5 Columns: Visual Trust & Credentials */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#FAF6EC]/50 border border-[#0E3B33]/10 p-6 sm:p-7 overflow-hidden shadow-xs">
              <div className="flex flex-col gap-5">
                {/* Fellowship Team Photo */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#0E3B33]/10 shadow-xs bg-[#0E3B33]/5">
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
                    <p className="text-[11px] text-[#E6F1EA]/80">
                      Co-creating rural institutions in Jharkhand & Rajasthan
                    </p>
                  </div>
                </div>

                {/* Direct Contact Points */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#1F7A5A] border border-[#0E3B33]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      ✉️
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5A6B65]">Direct Email</p>
                      <a href="mailto:contact@gramassociation.org" className="text-sm font-bold text-[#0E3B33] hover:text-[#1F7A5A] transition-colors underline decoration-[#1F7A5A]/30">
                        contact@gramassociation.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#1B6A8A] border border-[#0E3B33]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      📍
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5A6B65]">Field Operations</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#0E3B33]">
                        Jaipur (Rajasthan) & Ranchi (Jharkhand), India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white text-[#C2562F] border border-[#0E3B33]/10 flex items-center justify-center text-sm shrink-0 shadow-2xs">
                      ⏱️
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#5A6B65]">Response Time</p>
                      <p className="text-xs text-[#5A6B65]">
                        All messages are answered personally within 24–48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credibility Seal */}
              <div className="mt-6 pt-4 border-t border-[#0E3B33]/10 flex items-center gap-2 text-xs text-[#5A6B65]">
                <span className="w-2 h-2 rounded-full bg-[#1F7A5A]" />
                <span>Registered Public Charitable Trust · 80G & 12A Certified · Aligned with UN SDGs</span>
              </div>
            </div>

            {/* Right 7 Columns: Streamlined, Frictionless Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#0E3B33]/15 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-serif font-bold text-[#0E3B33]">
                    Send Us a Message
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E6F1EA] text-[#0E3B33]">
                    Active: {contactInterest}
                  </span>
                </div>
                <p className="text-xs text-[#5A6B65] mt-1">
                  Choose a focus area below and tell us how we can collaborate.
                </p>

                {/* Focus Area Filter Chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Water Rejuvenation",
                    "Women Livelihood",
                    "The Water Ride Expedition",
                    "CSR Partnership",
                    "Rural Fellowship",
                  ].map((interest) => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => setContactInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                        contactInterest === interest
                          ? "bg-[#1F7A5A] text-white shadow-xs"
                          : "bg-[#FAF6EC] text-[#5A6B65] hover:bg-[#E6F1EA] hover:text-[#0E3B33] border border-[#0E3B33]/10"
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
                      <label className="block text-xs font-semibold text-[#0E3B33] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EC]/50 border border-[#0E3B33]/15 text-xs sm:text-sm text-[#17211E] placeholder:text-[#5A6B65]/50 focus:outline-none focus:ring-2 focus:ring-[#1F7A5A] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0E3B33] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. ramesh@example.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EC]/50 border border-[#0E3B33]/15 text-xs sm:text-sm text-[#17211E] placeholder:text-[#5A6B65]/50 focus:outline-none focus:ring-2 focus:ring-[#1F7A5A] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E3B33] mb-1.5">
                      Organization or City (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Foundation, University, or Village Council"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EC]/50 border border-[#0E3B33]/15 text-xs sm:text-sm text-[#17211E] placeholder:text-[#5A6B65]/50 focus:outline-none focus:ring-2 focus:ring-[#1F7A5A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E3B33] mb-1.5">
                      Your Message or Collaboration Idea *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share how you'd like to partner, volunteer, or support..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6EC]/50 border border-[#0E3B33]/15 text-xs sm:text-sm text-[#17211E] placeholder:text-[#5A6B65]/50 focus:outline-none focus:ring-2 focus:ring-[#1F7A5A] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] text-[#5A6B65] flex items-center gap-1.5">
                      <span>🔒</span>
                      <span>We respect your privacy and never share contact details.</span>
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#F4A62A] hover:bg-[#e0951f] text-[#17211E] text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:scale-102 active:scale-98"
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
      <footer className="w-full bg-[#0E3B33] text-white py-12 px-6 sm:px-10 md:px-14">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <Image
              src="/images/gram-logo-white.png"
              alt="GRAM Association"
              width={160}
              height={55}
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <span className="text-[#E6F1EA]/70 text-xs sm:text-sm border-t sm:border-t-0 sm:border-l border-[#E6F1EA]/20 pt-2 sm:pt-0 sm:pl-4">
              Groundwater & Reforestation Adaptive Management Association
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#FAF6EC]/80">
            <button onClick={returnToHero} className="hover:text-[#F4A62A] cursor-pointer transition-colors">
              Back to Hero ↑
            </button>
            <button onClick={() => scrollToAnchor("about")} className="hover:text-[#F4A62A] cursor-pointer transition-colors">
              Vision & Mission
            </button>
            <button onClick={() => scrollToAnchor("programs")} className="hover:text-[#F4A62A] cursor-pointer transition-colors">
              Programs
            </button>
            <button onClick={() => scrollToAnchor("water-ride")} className="hover:text-[#F4A62A] cursor-pointer transition-colors">
              Water Ride
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E6F1EA]/60 gap-3">
          <p>© 2026 GRAM Association. All Rights Reserved.</p>
          <p className="italic font-serif">“The soul of India lives in its villages” — Mahatma Gandhi</p>
        </div>
      </footer>
    </div>
  );
}