"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const TEAM_BASE =
  "/images/GRAM_photos -20261121T180535Z-1-001/GRAM_photos/Photos/Team Photos Passport";
const ADVISOR_BASE =
  "/images/GRAM_photos -20261121T180535Z-1-001/GRAM_photos/Photos/Advisor Photos";

const TEAM_MEMBERS: {
  name: string;
  role: string;
  file?: string;
  objectPosition?: string;
}[] = [
  {
    name: "Shashank",
    role: "Founder - Executive Director",
    file: "Shashank Singh- Founder- Director .jpeg",
  },
  {
    name: "Arunima",
    role: "Chief Executive Officer - Implementation, Strategy & Advocacy",
    file: "Chief Executive Officer - Implementation, Strategy & Advocacy .jpg",
  },
  {
    name: "Vikas",
    role: "Senior Consultant - Organisational Development",
    file: "Vikas Shukla - Senior Consultant - Organisational Development.jpeg",
  },
  {
    name: "Samrat",
    role: "Consultant - Program Design",
    file: "Rao Samrat – Consultant – Program Design & Community Development.jpeg",
  },
  {
    name: "Karthik",
    role: "Technical Consultant - Environmental & Water Management",
    file: "Karthick Sakthivel- Technical Consultant – Environmental & Water Resource Management .jpg",
    objectPosition: "object-[50%_38%]",
  },
  {
    name: "Anmol",
    role: "Policy Research Associate",
    file: "Policy Research Associate - Public Policy Analysis.png",
  },
  {
    name: "Arsh",
    role: "Architect - Sustainable Design & Planning",
    file: "Arsh Saluja - Architect - Sustainable Design & Planning .jpeg",
  },
  {
    name: "Pratyasha",
    role: "Senior Technical Consultant – Geoenvironmental Engineering & Environmental Impact",
    file: "Dr. Pratyasha Singh- Senior Technical Consultant – Geoenvironmental Engineering & Sustainable Solutions .png",
  },
  {
    name: "Yuvraj",
    role: "Project Coordinator - Community Tourism & Sustainable Livelihoods",
    file: "Yuvraj Seth- Project Coordinator – Community Tourism & Sustainable Livelihoods .jpeg",
  },
  {
    name: "Rudraksh",
    role: "Program Associate - Field & Community Support",
    file: "Rudraksh Singh Deo- Program Associate – Field & Community Support .jpeg",
  },
  {
    name: "Roshan",
    role: "Program Associate - Field & Community Support",
    file: "Roshan Kumar- Program Associate - Field & Community Support .jpg",
  },
  {
    name: "Devesh",
    role: "Associate - Administration & Operations",
    file: "Devesh Singh- Associate – Administration & Operations .JPG",
  },
  {
    name: "Ajay",
    role: "Finance & Compliance Specialist (ACMA)",
    file: "Ajay Kumar- Finance & Compliance Specialist (ACMA) .jpeg",
  },
  {
    name: "Ankita",
    role: "Legal Advisor - Legal Compliance",
    file: "Ankita- Legal Advisor - Legal Compliance.jpeg",
  },
  {
    name: "Paritosh",
    role: "Communications & Social Media Specialist",
  },
  {
    name: "Archit",
    role: "Volunteer - Field Operation and Community Outreach",
    file: "Archit- Volunteer – Field Operations & Community Outreach .jpg",
  },
];

const ADVISORS: { name: string; role: string; file: string }[] = [
  {
    name: "Bunker Roy",
    role: "Founder - Barefoot College",
    file: "Bunker Roy- Founder - Barefoot College .jpg",
  },
  {
    name: "Dr. Sudheer Krishna",
    role: "Co Founder - MACS",
    file: "Dr. Sudheer Krishna Co_Founder- MACS- .jpeg",
  },
  {
    name: "Mrs Tripat Parmar",
    role: "Founder - DEEKSHA NGO",
    file: "Mrs Tripat Parmar- Founder- DEEKSHA NGO.jpg",
  },
  {
    name: "Sri Ravindra Nath",
    role: "Founder - Rural Volunteer Centre (RVC)",
    file: "Sri Ravindra Nath- Founder -Rural Volunteer Centre (RVC).jpg",
  },
];

export default function AboutUsPage() {
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF4E8] text-[#1F2B1A] font-semibold text-xs border border-[#A9B689]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526639]" />
              <span>About Us</span>
            </span>
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
            <button
              onClick={() => scrollToSection("our-logo")}
              className="text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Our Logo
            </button>
            <button
              onClick={() => scrollToSection("our-team")}
              className="text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("our-advisors")}
              className="text-[13px] font-medium text-[#5C6B55] hover:text-[#1F2B1A] transition-colors cursor-pointer"
            >
              Advisors
            </button>
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
          <span className="text-sm font-bold py-1.5 text-[#A9B689]">About Us</span>
          <button
            onClick={() => scrollToSection("our-logo")}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            About GRAM Logo
          </button>
          <button
            onClick={() => scrollToSection("our-team")}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Team
          </button>
          <button
            onClick={() => scrollToSection("our-advisors")}
            className="text-sm font-medium py-1.5 text-white/80 hover:text-white"
          >
            Our Advisors
          </button>
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
      {/* 2. OUR STORY — PART 1 (Founder's Journey & Tilonia)          */}
      {/* ============================================================ */}
      <section className="w-full bg-[#F8FAF6] py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
          {/* Minimal Editorial Header */}
          <div className="max-w-3xl flex flex-col items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C7D51]">
              About Us · Est. 2019
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F2B1A] leading-[1.08]">
              Our Story
            </h1>
          </div>

          {/* Story Block 1: Narrative + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6 text-[15px] sm:text-base text-[#42503B] leading-[1.75]">
              <p>
                Words are a powerful mode of communication at the same time language is for communication and 10 words echoed in the mind of our founder. Shashank’s journey started as a Fellow with SBI Fellowship placed with Barefoot College Tilonia, Rajasthan. In the initial days of the Fellowship when he was trying to understand how he could make himself useful to the cause he met the community and was trying to understand the ground realities. When he met a woman who said “Agar kuch karna hi hai, to paani ke liye karo” those 10 words etched in his mind and those simple yet powerful words became his motivation to keep going. Post his Fellowship, the urge to do more stayed strong.
              </p>

              {/* Pull Quote */}
              <blockquote className="pl-5 border-l-2 border-[#A9B689] py-1">
                <p className="font-serif italic text-lg sm:text-xl text-[#1F2B1A] leading-snug">
                  “Agar kuch karna hi hai, to paani ke liye karo”
                </p>
              </blockquote>

              <p>
                This powerful conviction raised curiosity in Shashank to commence an epic journey on his motorcycle, traversing 13 states on a mission he named <strong className="font-semibold text-[#1F2B1A]">“Harvesting the Heaven.”</strong> He visited villages, schools, NGOs, and civil societies; learning from the wisdom of the community and enforcing the common idea of the importance of rainwater harvesting as one of the solutions to water issues scarcity across geographies. The journey tested him, challenged him, and ultimately shaped his dream: to bring sustainable water management to every corner of the nation. Which led to the birth of <strong className="font-semibold text-[#1F2B1A]">GRAM (Groundwater &amp; Reforestation Adaptive Management) Association, 2019</strong> with a simple idea that real change starts within the community.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden bg-[#EFF4E8] ring-1 ring-[#1F2B1A]/10 shadow-sm aspect-[4/3]">
                <Image
                  src="/images/drive-download-20261110T180217Z-1-001/Fellowship 1.JPG"
                  alt="Community desilting and water conservation work in Tilonia, Rajasthan"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="w-full h-px bg-[#1F2B1A]/10" />

          {/* Story Block 2: Image + Holistic Evolution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-[#EFF4E8] ring-1 ring-[#1F2B1A]/10 shadow-sm aspect-[4/3]">
                <Image
                  src="/images/drive-download-20261110T180217Z-1-001/Fellowship.JPG"
                  alt="Founder Shashank with village elders beside a community water body"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-5 text-[15px] sm:text-base text-[#42503B] leading-[1.75]">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2B1A] tracking-tight leading-snug">
                A Cross-Cutting Tapestry of Community Well-Being
              </h2>
              <p>
                GRAM started as an organisation focused on water and environment conservation. However, as GRAM grew and its roots deepened within various communities, a vital truth became abundantly clear, the development sector is not a collection of isolated issues, but a cross cutting tapestry. Water scarcity, for instance, isn&apos;t just an environmental problem; it impacts women who walk miles to fetch it, children whose education suffers due to waterborne illnesses, and livelihoods dependent on agriculture.
              </p>
              <p>
                Over the years, as passionate individuals with diverse expertise joined hands with Shashank, GRAM&apos;s vision naturally expanded. What started as a dedicated effort in water and environmental conservation has organically evolved into a more holistic approach to community well-being. This growth wasn&apos;t a deviation from our core, but rather a realization that true, sustainable impact requires addressing the interconnected needs of a community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. ABOUT GRAM LOGO (Clean Minimal Emblem Breakdown)          */}
      {/* ============================================================ */}
      <section
        id="our-logo"
        className="w-full scroll-mt-20 bg-white py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-y border-[#1F2B1A]/8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Clean Architectural Logo Canvas */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#F8FAF6] p-8 sm:p-10 ring-1 ring-[#1F2B1A]/8 flex flex-col items-center gap-8">
              {/* Unified Emblem */}
              <div className="py-2 flex flex-col items-center gap-3">
                <Image
                  src="/images/gram-logo.png"
                  alt="GRAM Association Logo"
                  width={200}
                  height={76}
                  className="h-14 sm:h-16 w-auto object-contain"
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6C7D51]">
                  Unified Emblem
                </span>
              </div>

              {/* Clean 4-Pillar Strip */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1F2B1A]/10 text-center">
                {[
                  {
                    label: "Sustainable Living",
                    icon: (
                      <svg className="w-5 h-5 text-[#1F2B1A]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9.5V20h14V9.5M9.5 20v-5.5h5V20" />
                      </svg>
                    ),
                  },
                  {
                    label: "Reforestation",
                    icon: (
                      <svg className="w-5 h-5 text-[#2E5238]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l-5 6h3l-4 5h4l-3 4h10l-3-4h4l-4-5h3l-5-6zM12 18v3" />
                      </svg>
                    ),
                  },
                  {
                    label: "Water Conservation",
                    icon: (
                      <svg className="w-5 h-5 text-[#1F2B1A]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 14c2.5-2 5.5-2 8 0s5.5 2 8 0M3 18c2.5-2 5.5-2 8 0s5.5 2 8 0M12 3c0 0-4.5 5-4.5 7.5a4.5 4.5 0 009 0C16.5 8 12 3 12 3z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Rural Welfare",
                    icon: (
                      <svg className="w-5 h-5 text-[#6E473B]" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c4-3 8-3 12 0M6 20c3.5-2.5 7-2.5 10.5 0M14 11c2.5-2 5.5-2 7 0" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white ring-1 ring-[#1F2B1A]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-[#1F2B1A] leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Clean Explanation */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C7D51]">
              About GRAM Logo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] tracking-tight">
              GRAM Association Logo
            </h2>
            <p className="text-[15px] sm:text-base text-[#42503B] leading-[1.75]">
              This logo visually represents a comprehensive approach to environmental and social sustainability. The four individual icons symbolize key areas: Sustainable Living, Reforestation, Rural Welfare, and Water Conservation. When combined, these elements form a unified emblem, illustrating that these interconnected initiatives contribute to a holistic and thriving future.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR TEAM (Clean Borderless Portrait Grid)                 */}
      {/* ============================================================ */}
      <section
        id="our-team"
        className="w-full scroll-mt-20 bg-[#F8FAF6] py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1F2B1A]/10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C7D51]">
                Our Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] tracking-tight">
                The People Behind GRAM
              </h2>
            </div>
            <p className="text-sm text-[#5C6B55] max-w-md">
              A multidisciplinary collective of field organizers, engineers, policy researchers, and community builders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="flex flex-col gap-3.5 group">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFF4E8] ring-1 ring-[#1F2B1A]/8">
                  {member.file ? (
                    <Image
                      src={encodeURI(`${TEAM_BASE}/${member.file}`)}
                      alt={member.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={`object-cover ${member.objectPosition ?? "object-top"} transition-transform duration-500 group-hover:scale-103`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EFF4E8] text-[#2E3D27] font-serif text-4xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 px-0.5">
                  <h3 className="font-serif font-semibold text-lg text-[#1F2B1A] leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#5C6B55] leading-relaxed">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. OUR ADVISORS (Clean Portrait Grid on White Band)          */}
      {/* ============================================================ */}
      <section
        id="our-advisors"
        className="w-full scroll-mt-20 bg-white py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-[#1F2B1A]/8"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1F2B1A]/10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6C7D51]">
                Our Advisors
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F2B1A] tracking-tight">
                Guiding Voices &amp; Mentors
              </h2>
            </div>
            <p className="text-sm text-[#5C6B55] max-w-md">
              Pioneering grassroots leaders and social innovators shaping GRAM’s long-term vision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {ADVISORS.map((advisor) => (
              <article key={advisor.name} className="flex flex-col gap-3.5 group">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFF4E8] ring-1 ring-[#1F2B1A]/8">
                  <Image
                    src={encodeURI(`${ADVISOR_BASE}/${advisor.file}`)}
                    alt={advisor.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="flex flex-col gap-1 px-0.5">
                  <h3 className="font-serif font-semibold text-lg text-[#1F2B1A] leading-snug">
                    {advisor.name}
                  </h3>
                  <p className="text-xs text-[#5C6B55] leading-relaxed">
                    {advisor.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COMPLETE STANDARD FOOTER (Matching Homepage)              */}
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
            <Link href="/#focus-areas" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Focus Areas
            </Link>
            <Link href="/#programs" className="hover:text-[#A9B689] cursor-pointer transition-colors">
              Programs
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
