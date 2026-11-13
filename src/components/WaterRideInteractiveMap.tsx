"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { EXPEDITION_STOPS, ROUTE_SPLINE_PATH, ExpeditionStop } from "./waterRideData";

export default function WaterRideInteractiveMap() {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [targetStopIndex, setTargetStopIndex] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredStop, setHoveredStop] = useState<ExpeditionStop | null>(null);
  const [liveKm, setLiveKm] = useState<number>(0);

  // Map Framing & View Modes:
  // "focused" = tight crop around India highway corridor (fills left & right edge-to-edge)
  // "subcontinent" = full India and surrounding borders
  const [mapViewMode, setMapViewMode] = useState<"focused" | "subcontinent">("focused");
  const [isTheaterExpanded, setIsTheaterExpanded] = useState<boolean>(false);

  // Vehicle position & heading angle (degrees)
  const [vehiclePos, setVehiclePos] = useState<{ x: number; y: number; angle: number }>({
    x: EXPEDITION_STOPS[0].x,
    y: EXPEDITION_STOPS[0].y,
    angle: 50,
  });

  // Spline measurement state
  const pathRef = useRef<SVGPathElement | null>(null);
  const [stopPathDistances, setStopPathDistances] = useState<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState<number>(1000);
  const [currentDistanceAlongPath, setCurrentDistanceAlongPath] = useState<number>(0);

  // References for animation
  const animFrameRef = useRef<number | null>(null);
  const activeStopRef = useRef<number>(0);
  activeStopRef.current = activeStopIndex;
  const isPlayingTourRef = useRef<boolean>(false);
  isPlayingTourRef.current = isPlayingTour;
  const tourTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sidebar item list ref for auto-scrolling
  const stopListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Unique states for filter chips
  const states = useMemo(() => {
    const s = Array.from(new Set(EXPEDITION_STOPS.map((st) => st.state)));
    return ["All", ...s];
  }, []);

  // Filtered stops for sidebar
  const filteredStops = useMemo(() => {
    return EXPEDITION_STOPS.filter((st) => {
      const matchState = selectedStateFilter === "All" || st.state === selectedStateFilter;
      const matchSearch =
        searchQuery.trim() === "" ||
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.pitStops.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchSearch;
    });
  }, [selectedStateFilter, searchQuery]);

  // Calibrate stop distances along SVG spline once path mounts
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    try {
      const totalLen = path.getTotalLength();
      setTotalPathLength(totalLen);

      // Map each stop to closest distance along the road spline
      const distances: number[] = [];
      const SAMPLES = 1200;
      const samplePoints: { dist: number; x: number; y: number }[] = [];

      for (let i = 0; i <= SAMPLES; i++) {
        const d = (i / SAMPLES) * totalLen;
        const pt = path.getPointAtLength(d);
        samplePoints.push({ dist: d, x: pt.x, y: pt.y });
      }

      EXPEDITION_STOPS.forEach((stop, idx) => {
        if (idx === 0) {
          distances.push(0);
          return;
        }
        if (idx === EXPEDITION_STOPS.length - 1) {
          distances.push(totalLen);
          return;
        }

        let bestDist = 0;
        let bestDistSq = Infinity;
        for (const sp of samplePoints) {
          const dx = sp.x - stop.x;
          const dy = sp.y - stop.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < bestDistSq) {
            bestDistSq = distSq;
            bestDist = sp.dist;
          }
        }
        distances.push(bestDist);
      });

      // Ensure monotonic strictly increasing order
      for (let i = 1; i < distances.length; i++) {
        if (distances[i] <= distances[i - 1]) {
          distances[i] = distances[i - 1] + (totalLen - distances[i - 1]) / (distances.length - i);
        }
      }

      setStopPathDistances(distances);

      // Initial vehicle position
      const p0 = path.getPointAtLength(0);
      const p1 = path.getPointAtLength(2);
      const initialAngle = Math.atan2(p1.y - p0.y, p1.x - p0.x) * (180 / Math.PI);
      setVehiclePos({ x: p0.x, y: p0.y, angle: initialAngle });
      setCurrentDistanceAlongPath(0);
      setLiveKm(EXPEDITION_STOPS[0].cumulativeKm);
    } catch {
      // Fallback if SVG getPointAtLength unavailable
    }
  }, []);

  // Smooth easeInOutQuad easing function
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Navigate to stop with road-following animation
  const navigateToStop = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= EXPEDITION_STOPS.length) return;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (tourTimeoutRef.current) {
        clearTimeout(tourTimeoutRef.current);
      }

      const path = pathRef.current;
      if (!path || stopPathDistances.length === 0) {
        setActiveStopIndex(targetIndex);
        setTargetStopIndex(targetIndex);
        setLiveKm(EXPEDITION_STOPS[targetIndex].cumulativeKm);
        return;
      }

      const startIndex = activeStopRef.current;
      if (startIndex === targetIndex) {
        // Already at stop
        setActiveStopIndex(targetIndex);
        setTargetStopIndex(targetIndex);
        setLiveKm(EXPEDITION_STOPS[targetIndex].cumulativeKm);
        return;
      }

      const startDist = stopPathDistances[startIndex] ?? 0;
      const targetDist = stopPathDistances[targetIndex] ?? 0;
      const startKm = EXPEDITION_STOPS[startIndex].cumulativeKm;
      const targetKm = EXPEDITION_STOPS[targetIndex].cumulativeKm;

      setIsMoving(true);
      setTargetStopIndex(targetIndex);

      // Calculate dynamic duration based on road distance and speed multiplier
      const distDelta = Math.abs(targetDist - startDist);
      const baseDurationMs = Math.max(1200, Math.min(3800, (distDelta / totalPathLength) * 4500));
      const durationMs = baseDurationMs / speedMultiplier;

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / durationMs);
        const progress = easeInOutQuad(rawProgress);

        const currentDist = startDist + (targetDist - startDist) * progress;
        setCurrentDistanceAlongPath(currentDist);

        // Calculate vehicle coordinate and heading tangent
        const pt = path.getPointAtLength(currentDist);
        const lookAheadDist = targetDist >= startDist ? 2.5 : -2.5;
        const aheadPt = path.getPointAtLength(
          Math.max(0, Math.min(totalPathLength, currentDist + lookAheadDist))
        );
        const angle =
          targetDist >= startDist
            ? Math.atan2(aheadPt.y - pt.y, aheadPt.x - pt.x) * (180 / Math.PI)
            : Math.atan2(pt.y - aheadPt.y, pt.x - aheadPt.x) * (180 / Math.PI) + 180;

        setVehiclePos({ x: pt.x, y: pt.y, angle });

        // Update live odometer smoothly
        const interpolatedKm = Math.round(startKm + (targetKm - startKm) * progress);
        setLiveKm(interpolatedKm);

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Arrived at destination
          setIsMoving(false);
          setActiveStopIndex(targetIndex);
          activeStopRef.current = targetIndex;
          setLiveKm(targetKm);

          // If auto-touring is active, advance to next destination after pause
          if (isPlayingTourRef.current) {
            tourTimeoutRef.current = setTimeout(() => {
              if (!isPlayingTourRef.current) return;
              const nextIdx = (targetIndex + 1) % EXPEDITION_STOPS.length;
              navigateToStop(nextIdx);
            }, 2600);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [stopPathDistances, totalPathLength, speedMultiplier]
  );

  // Auto-scroll sidebar list to keep active stop visible
  useEffect(() => {
    const el = stopListRefs.current[activeStopIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeStopIndex]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
    };
  }, []);

  // Play / Pause expedition tour
  const togglePlayTour = () => {
    if (isPlayingTour) {
      setIsPlayingTour(false);
      isPlayingTourRef.current = false;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
    } else {
      setIsPlayingTour(true);
      isPlayingTourRef.current = true;
      const nextIdx = (activeStopIndex + 1) % EXPEDITION_STOPS.length;
      navigateToStop(nextIdx);
    }
  };

  const activeStop = EXPEDITION_STOPS[activeStopIndex] || EXPEDITION_STOPS[0];

  // Dynamic ViewBox:
  // "focused" trims out outer Pakistan / China / empty ocean margins so India fills the left & right edge-to-edge!
  const isFocused = mapViewMode === "focused";
  const activeViewBox = isFocused ? "315 240 375 480" : "0 0 1024 724";

  return (
    <div className="w-full flex flex-col gap-8">
      {/* 1. Header with Lora Serif & Editorial Tone */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-[#1F2B1A]/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF4E8] text-[#526639] text-xs font-bold tracking-wide uppercase border border-[#A9B689]/40 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#6C7D51] animate-pulse" />
            <span>Interactive Highway Navigation · 64-Day Journal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1F2B1A] tracking-tight">
            The Water Ride Expedition Map
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5C6B55] leading-relaxed font-normal">
            A continuous road navigation across 9 Indian states. The vehicle tracks actual highway curves, turns, and ghat passes—surveying centuries-old stepwells, rural aquifers, and living grassroots wisdom.
          </p>
        </div>

        {/* Expedition Statistics & Highway Metric Badges */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-xs flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#738260]">
              Excel Field Record
            </span>
            <span className="text-lg font-serif font-bold text-[#1F2B1A]">
              7,200 KM
            </span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-[#EFF4E8]/80 border border-[#A9B689]/40 shadow-xs flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#526639]">
              Live Road Odometer
            </span>
            <span className="text-lg font-serif font-bold text-[#2E3D27]">
              {liveKm.toLocaleString()} KM
            </span>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-xs flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#738260]">
              Current Stop
            </span>
            <span className="text-lg font-serif font-bold text-[#1F2B1A]">
              {activeStopIndex + 1} / {EXPEDITION_STOPS.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-xs">
        {/* Play Tour & Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={togglePlayTour}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-xs ${
              isPlayingTour
                ? "bg-[#8A5559] text-white hover:bg-[#724548]"
                : "bg-[#2E3D27] text-[#F8FAF6] hover:bg-[#1F2B1A]"
            }`}
          >
            {isPlayingTour ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Pause Tour
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Continuous Tour
              </>
            )}
          </button>

          <button
            onClick={() => navigateToStop((activeStopIndex - 1 + EXPEDITION_STOPS.length) % EXPEDITION_STOPS.length)}
            disabled={isMoving}
            className="px-3.5 py-2 rounded-full bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] border border-[#1F2B1A]/10 text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
            title="Previous Destination"
          >
            ← Previous
          </button>

          <button
            onClick={() => navigateToStop((activeStopIndex + 1) % EXPEDITION_STOPS.length)}
            disabled={isMoving}
            className="px-4 py-2 rounded-full bg-[#526639] hover:bg-[#3F502B] text-white border border-[#526639] text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
            title="Next Destination"
          >
            Next Destination →
          </button>

          {/* Speed Selection */}
          <div className="flex items-center gap-1 ml-1 pl-2 border-l border-[#1F2B1A]/10">
            <span className="text-[11px] font-bold uppercase text-[#738260] mr-1 hidden sm:inline">
              Speed:
            </span>
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  speedMultiplier === spd
                    ? "bg-[#2E3D27] text-white shadow-xs"
                    : "bg-white text-[#5C6B55] hover:bg-[#EFF4E8]"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* State Quick-Filter Chips & Framing Toggles */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold uppercase text-[#738260] mr-1 hidden md:inline">
            Filter:
          </span>
          {states.slice(0, 6).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStateFilter(st)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedStateFilter === st
                  ? "bg-[#6C7D51] text-white font-semibold shadow-xs"
                  : "bg-white text-[#5C6B55] hover:bg-[#EFF4E8] border border-[#1F2B1A]/10"
              }`}
            >
              {st}
            </button>
          ))}
          {states.length > 6 && (
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="px-2.5 py-1 rounded-full text-xs bg-white text-[#5C6B55] border border-[#1F2B1A]/10 font-medium cursor-pointer"
            >
              <option value="All">All States (9)</option>
              {states.filter((s) => s !== "All").map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          )}

          {/* Theater Mode Toggle */}
          <button
            onClick={() => setIsTheaterExpanded(!isTheaterExpanded)}
            className="ml-2 px-3 py-1 rounded-full bg-white hover:bg-[#EFF4E8] text-[#2E3D27] border border-[#A9B689]/60 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-2xs"
            title={isTheaterExpanded ? "Switch to 3-column view" : "Expand map full width"}
          >
            {isTheaterExpanded ? "⤢ Standard Layout" : "⛶ Maximize Map"}
          </button>
        </div>
      </div>

      {/* 3. Main Experience Grid: Sidebar + SVG Map + Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* A. LEFT SIDEBAR: Expedition Itinerary                      */}
        {/* ========================================================= */}
        <div
          className={`flex flex-col rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-sm overflow-hidden ${
            isTheaterExpanded
              ? "lg:col-span-6 order-2 h-[480px]"
              : "lg:col-span-3 order-1 h-[680px]"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 bg-[#EFF4E8]/90 border-b border-[#1F2B1A]/10 flex flex-col gap-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#526639]">
                Expedition Itinerary
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#2E3D27] border border-[#A9B689]/40">
                {filteredStops.length} Destinations
              </span>
            </div>

            {/* Quick Search */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search city, pit stop, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 pl-8 rounded-xl bg-white border border-[#1F2B1A]/10 text-xs text-[#1F2B1A] placeholder-[#738260]/60 focus:outline-none focus:border-[#6C7D51]"
              />
              <svg
                className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#738260]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1.5 text-xs text-[#738260] hover:text-[#1F2B1A]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Destinations List */}
          <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1.5 divide-y divide-[#1F2B1A]/5">
            {filteredStops.map((stop) => {
              const isActive = stop.index === activeStopIndex;
              const isVisited = stop.index <= activeStopIndex;
              const isTarget = stop.index === targetStopIndex && isMoving;

              return (
                <button
                  key={stop.id}
                  ref={(el) => {
                    stopListRefs.current[stop.index] = el;
                  }}
                  onClick={() => navigateToStop(stop.index)}
                  className={`w-full text-left p-3 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 pt-2.5 ${
                    isActive
                      ? "bg-white border-2 border-[#6C7D51] shadow-sm ring-2 ring-[#6C7D51]/15"
                      : isTarget
                      ? "bg-[#EFF4E8] border border-[#6C7D51] animate-pulse"
                      : "hover:bg-white/70 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Status Code Badge */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isActive
                          ? "bg-[#2E3D27] text-white shadow-xs"
                          : isVisited
                          ? "bg-[#EFF4E8] text-[#526639] border border-[#A9B689]/60"
                          : "bg-white text-[#738260] border border-[#1F2B1A]/10"
                      }`}
                    >
                      {stop.code}
                    </div>

                    <div className="min-w-0 flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-sm text-[#1F2B1A] truncate">
                          {stop.name}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#6C7D51] animate-ping shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#738260] truncate">
                        {stop.day.replace(/\s*\([^)]*\)/, "")} · {stop.legKm > 0 ? `${stop.legKm} km` : "Origin"}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#EFF4E8] text-[#526639]">
                    {stop.state}
                  </span>
                </button>
              );
            })}

            {filteredStops.length === 0 && (
              <div className="p-8 text-center text-xs text-[#738260]">
                No destinations match your search.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. CENTER VIEWPORT: Large Edge-to-Edge Highway Map         */}
        {/* ========================================================= */}
        <div
          className={`flex flex-col gap-3 ${
            isTheaterExpanded
              ? "lg:col-span-12 order-1"
              : "lg:col-span-6 order-2"
          }`}
        >
          <div className="relative w-full rounded-3xl overflow-hidden border border-[#1F2B1A]/10 bg-[#EAF2F4] shadow-md group">
            
            {/* Top-Right Map Framing Controller */}
            <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#1F2B1A]/10 shadow-xs">
              <button
                onClick={() => setMapViewMode("focused")}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  isFocused
                    ? "bg-[#2E3D27] text-white shadow-2xs"
                    : "text-[#5C6B55] hover:text-[#1F2B1A]"
                }`}
                title="Zoom into India route corridor to fill left and right"
              >
                Route Focus (Edge-to-Edge)
              </button>
              <button
                onClick={() => setMapViewMode("subcontinent")}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  !isFocused
                    ? "bg-[#2E3D27] text-white shadow-2xs"
                    : "text-[#5C6B55] hover:text-[#1F2B1A]"
                }`}
                title="Pan-India Subcontinent View"
              >
                Subcontinent
              </button>
            </div>

            {/* SVG Interactive Canvas: ViewBox dynamically adjusts to fill left and right */}
            <svg
              viewBox={activeViewBox}
              className="w-full h-auto block select-none transition-all duration-500 ease-out"
              style={{
                height: isTheaterExpanded ? "760px" : "680px",
                width: "100%",
                maxHeight: isTheaterExpanded ? "820px" : "720px",
              }}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow Filter for Active Traveled Route */}
                <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation={isFocused ? 1.5 : 3} result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Vehicle Radial Beacon Headlight */}
                <radialGradient id="headlightBeam" cx="0%" cy="50%" r="90%">
                  <stop offset="0%" stopColor="#FFF9D2" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#A9B689" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#A9B689" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Underlying Georeferenced Highway Route Map Image */}
              <image
                href="/images/water-ride-route-map.jpg"
                x="0"
                y="0"
                width="1024"
                height="724"
                preserveAspectRatio="xMidYMid slice"
                className="brightness-[0.98] contrast-[1.03]"
              />

              {/* Soft editorial color wash over ocean/land for Sage coherence */}
              <rect
                x="0"
                y="0"
                width="1024"
                height="724"
                fill="#EFF4E8"
                fillOpacity="0.04"
                pointerEvents="none"
              />

              {/* 2. Hidden Road Spline Path for getPointAtLength measurement */}
              <path
                ref={pathRef}
                d={ROUTE_SPLINE_PATH}
                fill="none"
                stroke="transparent"
                strokeWidth="1"
              />

              {/* 3. Base Highway Corridor Line (Dashed subtle guide) */}
              <path
                d={ROUTE_SPLINE_PATH}
                fill="none"
                stroke="#6C7D51"
                strokeWidth={isFocused ? "2" : "3.5"}
                strokeDasharray={isFocused ? "3 3" : "5 4"}
                strokeOpacity="0.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. Traveled Highway Route (Illuminated in Sage Green up to Vehicle) */}
              {totalPathLength > 0 && currentDistanceAlongPath > 0 && (
                <path
                  d={ROUTE_SPLINE_PATH}
                  fill="none"
                  stroke="#2E3D27"
                  strokeWidth={isFocused ? "3.2" : "4.5"}
                  strokeDasharray={`${currentDistanceAlongPath} ${totalPathLength}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#routeGlow)"
                  className="transition-all"
                />
              )}

              {/* 5. Destination City Markers (All 30 Stations) */}
              {EXPEDITION_STOPS.map((stop) => {
                const isActive = stop.index === activeStopIndex;
                const isVisited = stop.index <= activeStopIndex;
                const isTarget = stop.index === targetStopIndex && isMoving;

                // Scaled radii based on zoom mode
                const baseR = isFocused ? (isActive ? 5.5 : 4) : (isActive ? 9 : 6.5);
                const pingR = isFocused ? 13 : 18;
                const targetR = isFocused ? 12 : 18;
                const dotR = isFocused ? (isActive ? 2.4 : 1.4) : (isActive ? 3.5 : 2);

                return (
                  <g
                    key={stop.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => navigateToStop(stop.index)}
                    onMouseEnter={() => setHoveredStop(stop)}
                    onMouseLeave={() => setHoveredStop(null)}
                  >
                    {/* Ripple Ping for Active Destination */}
                    {isActive && (
                      <>
                        <circle
                          cx={stop.x}
                          cy={stop.y}
                          r={pingR}
                          fill="none"
                          stroke="#6C7D51"
                          strokeWidth={isFocused ? "1.5" : "2"}
                          strokeOpacity="0.7"
                          className="animate-ping"
                        />
                        <circle
                          cx={stop.x}
                          cy={stop.y}
                          r={pingR * 1.3}
                          fill="#A9B689"
                          fillOpacity="0.18"
                        />
                      </>
                    )}

                    {/* Outer Target Pulsing Ring */}
                    {isTarget && (
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={targetR}
                        fill="none"
                        stroke="#8A5559"
                        strokeWidth={isFocused ? "1.8" : "2.5"}
                        strokeDasharray="3 2"
                        className="animate-spin"
                      />
                    )}

                    {/* Marker Pin Base Circle */}
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={baseR}
                      fill={isActive ? "#1F2B1A" : isVisited ? "#526639" : "#FFFFFF"}
                      stroke={isActive ? "#FFFFFF" : isVisited ? "#EFF4E8" : "#526639"}
                      strokeWidth={isFocused ? 1.4 : 1.8}
                      className="shadow-sm transition-all"
                    />

                    {/* Center Core Dot */}
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={dotR}
                      fill={isActive ? "#A9B689" : isVisited ? "#FFFFFF" : "#526639"}
                    />

                    {/* State Stop Label (Key Stops Only for Visual Clarity) */}
                    {(isActive || stop.index % 3 === 0 || stop.index === EXPEDITION_STOPS.length - 1) && (
                      <text
                        x={stop.x + (isFocused ? 8 : 12)}
                        y={stop.y + (isFocused ? 2.5 : 3.5)}
                        fontSize={isFocused ? "7.5" : "10"}
                        fontFamily="var(--font-lora), serif"
                        fontWeight={isActive ? "700" : "600"}
                        fill={isActive ? "#1F2B1A" : "#2E3D27"}
                        className="pointer-events-none drop-shadow-xs select-none"
                      >
                        {stop.name.split(" ")[0]}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* 6. The Vehicle: Royal Enfield Motorcycle Token */}
              <g
                transform={`translate(${vehiclePos.x}, ${vehiclePos.y}) rotate(${vehiclePos.angle})`}
                className="pointer-events-none transition-transform duration-75"
              >
                {/* Projected Headlight Beam */}
                <polygon
                  points={isFocused ? "9,0 26,-8 26,8" : "14,0 42,-14 42,14"}
                  fill="url(#headlightBeam)"
                  className="pointer-events-none"
                />

                {/* Vehicle Background Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r={isFocused ? 9 : 13}
                  fill="#F8FAF6"
                  stroke="#2E3D27"
                  strokeWidth={isFocused ? 1.5 : 2}
                  filter="drop-shadow(0 2px 4px rgba(31,43,26,0.3))"
                />

                {/* Vector Motorcycle Silhouette */}
                <g transform={isFocused ? "translate(-6, -4.5) scale(0.52)" : "translate(-8, -6) scale(0.68)"}>
                  {/* Rear Wheel */}
                  <circle cx="5" cy="13" r="4" fill="none" stroke="#1F2B1A" strokeWidth="2" />
                  <circle cx="5" cy="13" r="1.5" fill="#1F2B1A" />
                  {/* Front Wheel */}
                  <circle cx="19" cy="13" r="4" fill="none" stroke="#1F2B1A" strokeWidth="2" />
                  <circle cx="19" cy="13" r="1.5" fill="#1F2B1A" />
                  {/* Frame & Engine */}
                  <path
                    d="M5 13 L10 8 L16 8 L19 13 M10 8 L12 13 L16 13 M11 6 L15 6"
                    stroke="#1F2B1A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Fuel Tank (Sage / Classic Bullet green) */}
                  <path
                    d="M10 6 C11 5, 14 5, 15 6 C15 7, 12 7, 10 6 Z"
                    fill="#6C7D51"
                  />
                  {/* Rider Silhouette */}
                  <circle cx="11.5" cy="3" r="2" fill="#1F2B1A" />
                  <path
                    d="M11 5 L9.5 8 L12 9"
                    stroke="#1F2B1A"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </g>
              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredStop && (
              <div
                className="absolute pointer-events-none px-3.5 py-2 rounded-xl bg-[#1F2B1A]/95 text-white text-xs shadow-lg backdrop-blur-md flex flex-col gap-0.5 z-30"
                style={{
                  left: isFocused
                    ? `${((hoveredStop.x - 315) / 375) * 100}%`
                    : `${(hoveredStop.x / 1024) * 100}%`,
                  top: isFocused
                    ? `${Math.max(8, ((hoveredStop.y - 240) / 480) * 100 - 8)}%`
                    : `${Math.max(10, (hoveredStop.y / 724) * 100 - 10)}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="flex items-center gap-1.5 font-serif font-bold text-sm text-[#EFF4E8]">
                  <span>{hoveredStop.name}</span>
                  <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-[#A9B689] text-[#1F2B1A]">
                    {hoveredStop.code}
                  </span>
                </div>
                <span className="text-[11px] text-[#EFF4E8]/80">
                  {hoveredStop.day} · {hoveredStop.legKm > 0 ? `${hoveredStop.legKm} km leg` : "Flag-off Point"}
                </span>
                <span className="text-[10px] text-[#A9B689] mt-0.5">
                  Click to ride here →
                </span>
              </div>
            )}

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#1F2B1A]/10 text-[#5C6B55] shadow-xs z-20">
              <span className="truncate">
                📍 {activeStop.name}, {activeStop.state}
              </span>
              <span className="shrink-0 font-medium text-[#2E3D27]">
                {isMoving ? "🏍 Highway Navigation in progress..." : "✓ Marker Active"}
              </span>
            </div>
          </div>

          {/* Technical Note Pill (from user requirements) */}
          <p className="text-[11px] text-[#738260] leading-relaxed italic px-2">
            * Note: The 7,200 km figure comes from the recorded Excel log and includes intensive local village cluster transit; the road route calculates highway navigation distance.
          </p>
        </div>

        {/* ========================================================= */}
        {/* C. RIGHT DOSSIER: Verified Field Log Card                  */}
        {/* ========================================================= */}
        <div
          className={`flex flex-col rounded-3xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-sm p-6 sm:p-7 gap-5 overflow-y-auto ${
            isTheaterExpanded
              ? "lg:col-span-6 order-3 h-[480px]"
              : "lg:col-span-3 order-3 h-[680px]"
          }`}
        >
          {/* Dossier Top Badge */}
          <div className="flex items-center justify-between border-b border-[#1F2B1A]/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2E3D27] text-white text-[10px] font-bold tracking-widest uppercase">
                {activeStop.code}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#738260]">
                {activeStop.state}
              </span>
            </div>
            <span className="text-xs font-serif italic text-[#5C6B55]">
              Stop {activeStop.index + 1} of 30
            </span>
          </div>

          {/* Destination Title & Date */}
          <div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1F2B1A] tracking-tight">
              {activeStop.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/30">
                📅 {activeStop.day}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/30">
                🛣️ {activeStop.legKm > 0 ? `${activeStop.legKm} KM Leg` : "Starting Base"}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#2E3D27] font-semibold border border-[#1F2B1A]/10">
                📊 {activeStop.cumulativeKm.toLocaleString()} KM Total
              </span>
            </div>
          </div>

          {/* Pit Stop & Organizations Met */}
          {(activeStop.pitStops !== "-" || activeStop.met) && (
            <div className="p-4 rounded-2xl bg-white border border-[#1F2B1A]/10 shadow-2xs flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#526639]">
                📍 Pit Stops & Organizations Met
              </span>
              {activeStop.pitStops !== "-" && (
                <p className="text-xs text-[#1F2B1A] font-medium">
                  <strong className="text-[#526639]">Pit Stop:</strong> {activeStop.pitStops}
                </p>
              )}
              {activeStop.met && (
                <p className="text-xs text-[#5C6B55]">
                  <strong className="text-[#526639]">Met:</strong> {activeStop.met}
                </p>
              )}
            </div>
          )}

          {/* Traditional Water Wisdom Documented */}
          {activeStop.waterWisdom && (
            <div className="p-4 rounded-2xl bg-[#EFF4E8]/60 border border-[#A9B689]/40 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🏺</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E3D27]">
                  Traditional Water Wisdom
                </span>
              </div>
              <p className="text-xs text-[#2E3D27] leading-relaxed whitespace-pre-line font-normal">
                {activeStop.waterWisdom.trim()}
              </p>
            </div>
          )}

          {/* Water Issues Observed */}
          {activeStop.waterIssues && (
            <div className="p-4 rounded-2xl bg-white border border-[#1F2B1A]/10 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-base">💧</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A5559]">
                  Groundwater & Ecological Challenges
                </span>
              </div>
              <p className="text-xs text-[#5C6B55] leading-relaxed font-normal">
                {activeStop.waterIssues.trim()}
              </p>
            </div>
          )}

          {/* Authentic Rider's Reflection Quote */}
          {activeStop.reflections && (
            <div className="p-4 rounded-2xl bg-[#2E3D27] text-white flex flex-col gap-2 shadow-xs mt-auto">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#A9B689]">
                Rider&apos;s Field Journal
              </span>
              <p className="font-serif italic text-xs sm:text-sm text-[#EFF4E8] leading-relaxed">
                &ldquo;{activeStop.reflections}&rdquo;
              </p>
            </div>
          )}

          {/* Bottom Action: Next Stop */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={() => navigateToStop((activeStopIndex - 1 + EXPEDITION_STOPS.length) % EXPEDITION_STOPS.length)}
              disabled={activeStopIndex === 0 || isMoving}
              className="flex-1 py-2 rounded-xl bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] border border-[#1F2B1A]/10 text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer text-center"
            >
              ← Previous Stop
            </button>
            <button
              onClick={() => navigateToStop((activeStopIndex + 1) % EXPEDITION_STOPS.length)}
              disabled={activeStopIndex === EXPEDITION_STOPS.length - 1 || isMoving}
              className="flex-1 py-2 rounded-xl bg-[#2E3D27] hover:bg-[#1F2B1A] text-white text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer text-center shadow-xs"
            >
              Next Destination →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
