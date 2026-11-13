"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <section id="impact" className="w-full bg-[#F8FAF6] py-20 sm:py-28 px-5 sm:px-8 md:px-12 border-b border-[#1F2B1A]/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-24">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#2E3D27] text-xs font-semibold tracking-wide border border-[#A9B689]/40 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#829461]" />
            <span>On-The-Ground Case Studies</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F2B1A] tracking-tight">
            Making a Lasting Impact
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#5C6B55] max-w-2xl font-normal leading-relaxed">
            Real field interventions documented across Eastern India—where barefoot engineering, democratic Jal Samitis, and values-aligned alliances solved long-standing ecological crises.
          </p>
        </div>

        {/* Stories: Alternating Organic Editorial Split Layout */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {IMPACT_STORIES.map((story, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? "lg:col-start-7" : ""
                  }`}
                >
                  <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#DDE5D4] shadow-sm hover:shadow-md transition-all duration-500">
                    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

                      {/* Floating Location & Year Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#1F2B1A] shadow-xs">
                          📍 {story.location}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#A9B689] text-[#1F2B1A] shadow-xs">
                          Project Year: {story.year}
                        </span>
                      </div>

                      {/* Bottom Image Caption Pill */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[11px] font-medium text-white/90 drop-shadow-sm bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-xl block truncate">
                          {story.tagline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Text Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-between gap-5 sm:gap-6 ${
                    isReversed ? "lg:col-start-1" : ""
                  }`}
                >
                  {/* Partner Alliances Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#829461]">
                      Alliances:
                    </span>
                    {story.partners.map((partner) => (
                      <span
                        key={partner}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EFF4E8] text-[#2E3D27] border border-[#A9B689]/30"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2B1A] leading-[1.25] tracking-tight">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-[#829461]">
                      {story.tagline}
                    </p>
                  </div>

                  {/* Excerpt Narrative */}
                  <p className="text-sm sm:text-[15px] text-[#5C6B55] leading-relaxed font-normal">
                    {story.excerpt}
                  </p>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#DDE5D4]">
                    {story.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={mIdx < 2 ? "border-r border-[#DDE5D4] pr-2" : ""}
                      >
                        <div className="text-lg sm:text-xl font-bold text-[#1F2B1A]">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-[#5C6B55] leading-tight mt-0.5 font-medium">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-1">
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="px-5 py-2.5 rounded-full bg-[#2E3D27] hover:bg-[#1F2B1A] text-[#F8FAF6] text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Read Case Study</span>
                      <span className="text-sm">↗</span>
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
                      className="text-xs font-semibold text-[#829461] hover:text-[#1F2B1A] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Adopt Similar Hamlet</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

