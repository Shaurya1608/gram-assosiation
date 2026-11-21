"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface ImpactStory {
  id: string;
  year: string;
  title: string;
  tagline: string;
  location: string;
  partners: string[];
  excerpt: string;
  fullStory: string[];
  metrics: { value: string; label: string }[];
  quote: { text: string; author: string; role: string };
  image: string;
  imageAlt: string;
}

const IMPACT_STORIES: ImpactStory[] = [
  {
    id: "rasabeda",
    year: "2019",
    title: "Rasabeda Spring Water Management Project",
    tagline: "Ending Chronic Drinking Water Crisis in High-Altitude Tribal Hamlets",
    location: "Chota Nagpur Plateau, Jharkhand",
    partners: ["DEEKSHA NGO", "IBM Ranchi", "Unnat Bharat Abhiyan"],
    excerpt:
      "In the remote village of Rasabeda, nestled in the rugged terrain of the Chota Nagpur plateau, access to clean drinking water was once a harsh daily struggle. GRAM Association partnered with DEEKSHA NGO and IBM Ranchi under the Unnat Bharat Abhiyan to co-create a decentralized zero-power gravity spring network, permanently securing potable water for over 100 mountain families.",
    fullStory: [
      "For generations, women and young girls of Rasabeda spent over three hours every morning trekking down treacherous rock cliffs to fetch murky water from unprotected seepage pits. During the dry summer months, even these meager sources would dry up, causing severe seasonal dehydration and waterborne illnesses.",
      "In 2019, GRAM engineers, working side-by-side with Santhal community elders, mapped an untouched perennial mountain spring higher up the ridge. By constructing a stone-masonry catchment chamber and laying 1.8 kilometers of gravity-fed HDPE pipeline, pure mountain water now flows directly to communal standposts in the village courtyard with zero electrical pumps or grid dependency.",
      "A democratic village Jal Samiti was trained to handle basic pipe maintenance, chlorination, and equitable distribution, ensuring 100% community ownership that has operated without interruption for over five years.",
    ],
    metrics: [
      { value: "2,500+ L", label: "Clean Spring Water / Day" },
      { value: "100+ Families", label: "Santhal Tribal Households" },
      { value: "0 kWh", label: "Grid Power (100% Gravity)" },
    ],
    quote: {
      text: "Before this gravity pipeline, our mornings were consumed by fear and steep climbs. Today, pure mountain water flows right outside our front door, and our children are healthy.",
      author: "Somra Marandi",
      role: "Rasabeda Village Jal Samiti Leader",
    },
    image: "/images/programs/rasabeda-impact-wall.jpg",
    imageAlt: "Rasabeda Drinking Water Project village community standing before painted project wall",
  },
  {
    id: "kherwatikra",
    year: "2020",
    title: "Restoring Hope Through Water : Pond Rejuvenation",
    tagline: "Reviving Gudibandh Talab & Recharging Depleted Tribal Farmlands",
    location: "Kherwatikra, Ranchi District, Jharkhand",
    partners: ["Barefoot College, Tilonia", "Kherwatikra Gram Panchayat"],
    excerpt:
      "In 2020, amid the acute socio-economic disruptions of the COVID-19 pandemic, GRAM Association partnered with Barefoot College, Tilonia to bring new life to Kherwatikra. Despite heavy monsoon downpours, 38 Munda tribal families faced crippling summer droughts. GRAM revived the centuries-old silted Gudibandh Talab, recharging 40+ dried borewells and securing multi-crop food self-reliance.",
    fullStory: [
      "Kherwatikra is a peaceful tribal hamlet surrounded by sal and mahua forests, yet its sandy loam topsoil could not hold rainwater due to rampant runoff. The village's ancestral water reservoir, Gudibandh Talab, had fallen into utter disrepair over four decades—choked by dense silt, breached embankments, and incapable of holding water past February.",
      "Mobilizing village youth who had returned home during the 2020 lockdowns, GRAM led a community excavation effort. Over 18,000 cubic meters of fertile silt were desilted and spread across 60 acres of barren farmland as natural fertilizer. Earthen bunds were reinforced with vetiver grass, and spillways were re-engineered with local stone.",
      "Today, Gudibandh Talab holds water through peak May heat. Over 40 agricultural borewells across a 3-kilometer radius have seen water tables rise by 12 to 18 feet, enabling farmers to cultivate mustard, wheat, and seasonal vegetables after the kharif rice harvest.",
    ],
    metrics: [
      { value: "500+ Acres", label: "Farmland Protected" },
      { value: "40+ Wells", label: "Aquifer Recharged" },
      { value: "38 Families", label: "Distress Migration Ended" },
    ],
    quote: {
      text: "When our pond was empty, our young men were forced to leave for low-wage labor in brick kilns. Now that the talab is full year-round, our fields produce two crops and our families stay together.",
      author: "Budhram Munda",
      role: "Kherwatikra Elder & Gram Pradhan",
    },
    image: "/images/programs/kherwatikra-pond-full.jpg",
    imageAlt: "Gudibandh Talab peaceful green pond surrounded by trees in Kherwatikra",
  },
];

export default function LastingImpactSection({
  onPartnerClick,
}: {
  onPartnerClick?: (projectTitle: string) => void;
}) {
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? IMPACT_STORIES.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === IMPACT_STORIES.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Auto-advance slides every 5.5s unless hovered or modal is open
  useEffect(() => {
    if (isPaused || selectedStory) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, selectedStory, handleNext]);

  return (
    <section
      id="impact"
      className="w-full bg-[#F8FAF6] py-16 sm:py-24 px-4 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
        {/* Clean Centered Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C7D51]" />
            <span>On-The-Ground Case Studies</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F2B1A] tracking-tight">
            Making a Lasting Impact
          </h2>
          <p className="text-sm sm:text-base text-[#5C6B55] leading-relaxed">
            Real field interventions documented across Eastern India—where barefoot engineering and democratic Jal Samitis solved long-standing ecological crises.
          </p>
        </div>

        {/* Single-Row Unified Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#1F2B1A]/10 shadow-sm">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {IMPACT_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 items-stretch"
                >
                  {/* Left Photo Panel */}
                  <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[470px] bg-[#1F2B1A] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B1A]/75 via-transparent to-[#1F2B1A]/15" />

                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#1F2B1A] shadow-2xs">
                        {story.location}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#A9B689] text-[#1F2B1A] shadow-2xs">
                        {story.year}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs sm:text-sm font-medium text-white/95 drop-shadow-sm">
                        {story.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right Content Panel */}
                  <div className="lg:col-span-6 p-7 sm:p-10 lg:p-12 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6C7D51]">
                        Alliances · {story.partners.join(" · ")}
                      </p>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2B1A] leading-snug tracking-tight">
                        {story.title}
                      </h3>

                      <p className="text-sm sm:text-[15px] text-[#5C6B55] leading-[1.7]">
                        {story.excerpt}
                      </p>
                    </div>

                    {/* Hairline Metrics */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#1F2B1A]/10">
                      {story.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="font-serif text-lg sm:text-2xl font-bold text-[#1F2B1A]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[#5C6B55] leading-tight mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="px-5 py-2.5 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] text-xs font-bold tracking-wider uppercase transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>Read Case Study</span>
                        <span>↗</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onPartnerClick) {
                            onPartnerClick(story.title);
                          } else {
                            const el = document.getElementById("contact");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="text-xs font-semibold text-[#526639] hover:text-[#1F2B1A] transition-colors cursor-pointer"
                      >
                        Adopt Similar Hamlet →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Matched Bottom Controls (Prev Arrow · Indicator Dots · Next Arrow) */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous case study"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] ring-1 ring-[#1F2B1A]/12 hover:ring-[#526639]/40 flex items-center justify-center transition-all shadow-2xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#526639]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {IMPACT_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View ${story.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer outline-none ${
                    activeIndex === idx
                      ? "w-8 bg-[#2E3D27]"
                      : "w-2 bg-[#1F2B1A]/20 hover:bg-[#1F2B1A]/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next case study"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] ring-1 ring-[#1F2B1A]/12 hover:ring-[#526639]/40 flex items-center justify-center transition-all shadow-2xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#526639]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EDITORIAL CASE STUDY MODAL (Minimal, Non-Techy)          */}
      {/* ======================================================== */}
      {selectedStory && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DDE5D4] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-[#DDE5D4] bg-[#F8FAF6] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A9B689] text-[#1F2B1A]">
                    {selectedStory.year} Case Study
                  </span>
                  <span className="text-xs text-[#5C6B55]">
                    📍 {selectedStory.location}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2B1A] leading-snug">
                  {selectedStory.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#DDE5D4] flex items-center justify-center text-sm font-bold text-[#1F2B1A] hover:bg-[#EFF4E8] transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-sm sm:text-base text-[#5C6B55] leading-relaxed">
              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={selectedStory.image}
                  alt={selectedStory.imageAlt}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {selectedStory.fullStory.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {/* Verified Quote Box */}
              <div className="p-5 rounded-2xl bg-[#EFF4E8] border border-[#A9B689]/40 mt-4">
                <p className="font-serif italic text-sm sm:text-base text-[#1F2B1A] leading-relaxed">
                  &ldquo;{selectedStory.quote.text}&rdquo;
                </p>
                <div className="mt-3 text-xs font-semibold text-[#829461]">
                  — {selectedStory.quote.author},{" "}
                  <span className="text-[#5C6B55] font-normal">
                    {selectedStory.quote.role}
                  </span>
                </div>
              </div>

              {/* Partners Banner */}
              <div className="pt-4 border-t border-[#DDE5D4] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-[#1F2B1A]">
                  Institutional Partners:
                </span>
                <span className="text-[#5C6B55]">
                  {selectedStory.partners.join(" · ")}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-[#DDE5D4] bg-[#F8FAF6] flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedStory(null)}
                className="text-xs font-semibold text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
              >
                Close Case Study
              </button>

              <button
                onClick={() => {
                  const title = selectedStory.title;
                  setSelectedStory(null);
                  if (onPartnerClick) {
                    onPartnerClick(title);
                  } else {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
              >
                Sponsor Similar Hamlet →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

