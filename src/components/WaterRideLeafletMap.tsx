"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { GEO_STOPS, ROUTE_LEGS, FULL_HIGHWAY_ROUTE, GeoStop } from "./waterRideGeoData";

// 100% Free, High-Resolution, No-API-Key Map Tile Providers
const TILE_PROVIDERS = {
  topo: {
    name: "Topographic Terrain",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Esri, USGS, NOAA",
    maxZoom: 19,
  },
  streets: {
    name: "Road & Cities",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors, Humanitarian OpenStreetMap Team",
    subdomains: "ab",
    maxZoom: 19,
  },
  satellite: {
    name: "Satellite Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
    maxZoom: 18,
  },
};

export default function WaterRideLeafletMap() {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);
  const [targetStopIndex, setTargetStopIndex] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isPlayingTour, setIsPlayingTour] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [liveKm, setLiveKm] = useState<number>(0);
  const [activeTileKey, setActiveTileKey] = useState<"topo" | "streets" | "satellite">("topo");

  // Map DOM container & Leaflet instance refs
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const bikeMarkerRef = useRef<any>(null);
  const fullPolylineRef = useRef<any>(null);
  const traveledPolylineRef = useRef<any>(null);
  const stopMarkersRef = useRef<any[]>([]);

  // Animation refs
  const animFrameRef = useRef<number | null>(null);
  const activeStopRef = useRef<number>(0);
  activeStopRef.current = activeStopIndex;
  const isPlayingTourRef = useRef<boolean>(false);
  isPlayingTourRef.current = isPlayingTour;
  const tourTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sidebar item list ref for auto-scrolling
  const stopListRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const sidebarContainerRef = useRef<HTMLDivElement | null>(null);
  const hasUserInteractedRef = useRef<boolean>(false);

  // Unique states for filter chips
  const states = useMemo(() => {
    const s = Array.from(new Set(GEO_STOPS.map((st) => st.state)));
    return ["All", ...s];
  }, []);

  // Filtered stops for sidebar
  const filteredStops = useMemo(() => {
    return GEO_STOPS.filter((st) => {
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

  // Map each stop index to its point index in FULL_HIGHWAY_ROUTE
  const stopRouteIndices = useMemo(() => {
    const indices: number[] = [0];
    let runningIdx = 0;
    for (const leg of ROUTE_LEGS) {
      runningIdx += leg.points.length;
      indices.push(Math.min(runningIdx - 1, FULL_HIGHWAY_ROUTE.length - 1));
    }
    return indices;
  }, []);

  // Calculate bearing angle between two LatLngs in degrees
  const getBearing = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const y = Math.sin(((lng2 - lng1) * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180);
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(((lng2 - lng1) * Math.PI) / 180);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  };

  // Initialize Leaflet Map on Client Mount (Robust StrictMode Guard)
  useEffect(() => {
    let isMounted = true;
    let map: any = null;

    async function initLeaflet() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const container = mapContainerRef.current;

      // Clean up previous Leaflet instance if present on container DOM node
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      const L = await import("leaflet");
      if (!isMounted || !mapContainerRef.current) return;

      // Create new Leaflet Map instance
      map = L.map(container, {
        center: [20.5937, 78.9629],
        zoom: 5.5,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
      });

      // Add Zoom Control at top-left
      L.control.zoom({ position: "topleft" }).addTo(map);

      // Add High-Resolution Topographic Tile Layer
      const initialProvider = TILE_PROVIDERS.topo;
      const tileLayer = L.tileLayer(initialProvider.url, {
        attribution: initialProvider.attribution,
        maxZoom: initialProvider.maxZoom,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Base Highway Corridor Polyline (Dashed Guide)
      const fullPolyline = L.polyline(FULL_HIGHWAY_ROUTE, {
        color: "#526639",
        weight: 3,
        opacity: 0.45,
        dashArray: "5, 5",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
      fullPolylineRef.current = fullPolyline;

      // Traveled Highway Route (Illuminated in Forest Sage)
      const traveledPolyline = L.polyline([FULL_HIGHWAY_ROUTE[0]], {
        color: "#2E3D27",
        weight: 4.5,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
      traveledPolylineRef.current = traveledPolyline;

      // Custom City Stop Markers
      const markers: any[] = [];
      GEO_STOPS.forEach((stop) => {
        const isStart = stop.index === 0;

        const iconHtml = `
          <div class="group relative flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md transition-transform duration-200 group-hover:scale-125 ${
              isStart
                ? "bg-[#1F2B1A] text-white ring-3 ring-[#97A877]/60"
                : "bg-white text-[#2E3D27] border-2 border-[#526639] group-hover:bg-[#2E3D27] group-hover:text-white"
            }">
              ${stop.code}
            </div>
            <div class="absolute -bottom-5 px-1.5 py-0.5 rounded bg-[#1F2B1A]/85 text-white text-[9px] font-serif whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              ${stop.name.split(" ")[0]}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: `stop-marker-${stop.index}`,
          html: iconHtml,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([stop.lat, stop.lng], { icon: customIcon }).addTo(map);

        marker.on("click", () => {
          navigateToStop(stop.index);
        });

        marker.bindTooltip(
          `
          <div class="p-2 text-xs font-sans">
            <div class="font-serif font-bold text-sm text-[#1F2B1A]">${stop.name}</div>
            <div class="text-[11px] text-[#526639] mt-0.5">${stop.day} · ${stop.legKm > 0 ? `${stop.legKm} km leg` : "Flag-off Base"}</div>
            <div class="text-[10px] text-[#829461] mt-1 font-semibold">Click to ride here →</div>
          </div>
        `,
          {
            direction: "top",
            offset: [0, -12],
            className: "sage-leaflet-tooltip",
          }
        );

        markers.push(marker);
      });
      stopMarkersRef.current = markers;

      // Moving Motorcycle Marker Token
      const initialPt = FULL_HIGHWAY_ROUTE[0];
      const bikeHtml = `
        <div id="vehicle-motorcycle" class="relative flex items-center justify-center pointer-events-none" style="transform: rotate(45deg); transition: transform 0.08s linear;">
          <!-- Headlight Beam -->
          <div style="position: absolute; right: -24px; width: 30px; height: 16px; background: radial-gradient(ellipse at left, rgba(255,249,210,0.9), rgba(169,182,137,0) 80%); clip-path: polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%);"></div>
          
          <!-- Outer Frosted Halo -->
          <div class="w-8 h-8 rounded-full bg-[#F8FAF6] border-2 border-[#1F2B1A] flex items-center justify-center shadow-lg">
            <svg class="w-4 h-4 text-[#1F2B1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h4" />
            </svg>
          </div>
        </div>
      `;

      const bikeIcon = L.divIcon({
        className: "motorcycle-leaflet-token",
        html: bikeHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const bikeMarker = L.marker(initialPt, { icon: bikeIcon, zIndexOffset: 1000 }).addTo(map);
      bikeMarkerRef.current = bikeMarker;

      mapInstanceRef.current = map;

      // Invalidate size and fit bounds smoothly once container settles
      setTimeout(() => {
        if (map && isMounted) {
          map.invalidateSize();
          map.fitBounds(L.latLngBounds(FULL_HIGHWAY_ROUTE), {
            padding: [25, 25],
            maxZoom: 6.8,
          });
        }
      }, 200);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  // Update Tile Layer when tile provider changes
  const switchTileProvider = (key: "topo" | "streets" | "satellite") => {
    setActiveTileKey(key);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    import("leaflet").then((L) => {
      const provider = TILE_PROVIDERS[key];
      const newLayer = L.tileLayer(provider.url, {
        attribution: provider.attribution,
        subdomains: (provider as any).subdomains || "abc",
        maxZoom: provider.maxZoom,
      }).addTo(map);
      tileLayerRef.current = newLayer;
    });
  };

  // Smooth easeInOutQuad easing function
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Navigate to target stop with road-following animation
  const navigateToStop = useCallback(
    (targetIndex: number) => {
      hasUserInteractedRef.current = true;
      if (targetIndex < 0 || targetIndex >= GEO_STOPS.length) return;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);

      const map = mapInstanceRef.current;
      const bikeMarker = bikeMarkerRef.current;
      const traveledPolyline = traveledPolylineRef.current;
      if (!map || !bikeMarker || !traveledPolyline) {
        setActiveStopIndex(targetIndex);
        setTargetStopIndex(targetIndex);
        setLiveKm(GEO_STOPS[targetIndex].cumulativeKm);
        return;
      }

      const startIndex = activeStopRef.current;
      if (startIndex === targetIndex) {
        setActiveStopIndex(targetIndex);
        setTargetStopIndex(targetIndex);
        setLiveKm(GEO_STOPS[targetIndex].cumulativeKm);
        return;
      }

      const startPtIdx = stopRouteIndices[startIndex] ?? 0;
      const targetPtIdx = stopRouteIndices[targetIndex] ?? 0;
      const startKm = GEO_STOPS[startIndex].cumulativeKm;
      const targetKm = GEO_STOPS[targetIndex].cumulativeKm;

      setIsMoving(true);
      setTargetStopIndex(targetIndex);

      // Pan/fit map camera to encompass travel corridor
      const fromPt = GEO_STOPS[startIndex];
      const toPt = GEO_STOPS[targetIndex];
      map.flyToBounds(
        [
          [fromPt.lat, fromPt.lng],
          [toPt.lat, toPt.lng],
        ],
        {
          padding: [50, 50],
          duration: 1.1,
        }
      );

      // Points along highway route between start and target
      const ptDelta = Math.abs(targetPtIdx - startPtIdx);
      const baseDurationMs = Math.max(1200, Math.min(3600, (ptDelta / FULL_HIGHWAY_ROUTE.length) * 4500));
      const durationMs = baseDurationMs / speedMultiplier;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / durationMs);
        const progress = easeInOutQuad(rawProgress);

        const currentPtFloat = startPtIdx + (targetPtIdx - startPtIdx) * progress;
        const currentPtIdx = Math.floor(currentPtFloat);
        const nextPtIdx = Math.min(FULL_HIGHWAY_ROUTE.length - 1, currentPtIdx + 1);

        const p1 = FULL_HIGHWAY_ROUTE[currentPtIdx];
        const p2 = FULL_HIGHWAY_ROUTE[nextPtIdx];
        const frac = currentPtFloat - currentPtIdx;

        // Sub-segment linear interpolation for 60fps smoothness
        const currentLat = p1[0] + (p2[0] - p1[0]) * frac;
        const currentLng = p1[1] + (p2[1] - p1[1]) * frac;

        // Calculate heading angle
        const angle = getBearing(p1[0], p1[1], p2[0], p2[1]);

        // Update bike marker position
        bikeMarker.setLatLng([currentLat, currentLng]);

        // Update bike rotation style
        const vehicleEl = document.getElementById("vehicle-motorcycle");
        if (vehicleEl) {
          vehicleEl.style.transform = `rotate(${angle}deg)`;
        }

        // Update traveled polyline
        const traveledSlice = FULL_HIGHWAY_ROUTE.slice(0, currentPtIdx + 1);
        traveledSlice.push([currentLat, currentLng]);
        traveledPolyline.setLatLngs(traveledSlice);

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

          // Update active marker styling
          stopMarkersRef.current.forEach((m, idx) => {
            const el = m.getElement();
            if (el) {
              const badge = el.querySelector("div > div");
              if (badge) {
                if (idx === targetIndex) {
                  badge.className =
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg bg-[#1F2B1A] text-white ring-3 ring-[#97A877] animate-pulse";
                } else if (idx <= targetIndex) {
                  badge.className =
                    "w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md bg-[#2E3D27] text-white";
                } else {
                  badge.className =
                    "w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md bg-white text-[#2E3D27] border-2 border-[#526639]";
                }
              }
            }
          });

          // If auto-touring is active, advance to next destination after pause
          if (isPlayingTourRef.current) {
            tourTimeoutRef.current = setTimeout(() => {
              if (!isPlayingTourRef.current) return;
              const nextIdx = (targetIndex + 1) % GEO_STOPS.length;
              navigateToStop(nextIdx);
            }, 2600);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [stopRouteIndices, speedMultiplier]
  );

  // Auto-scroll sidebar list to keep active stop visible (only inside its container, NEVER hijacking the window)
  useEffect(() => {
    if (!hasUserInteractedRef.current) return; // Never scroll on initial mount or page refresh
    const el = stopListRefs.current[activeStopIndex];
    const container = sidebarContainerRef.current;
    if (el && container) {
      const elOffsetTop = el.offsetTop - container.offsetTop;
      container.scrollTo({
        top: Math.max(0, elOffsetTop - 24),
        behavior: "smooth",
      });
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
    hasUserInteractedRef.current = true;
    if (isPlayingTour) {
      setIsPlayingTour(false);
      isPlayingTourRef.current = false;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
    } else {
      setIsPlayingTour(true);
      isPlayingTourRef.current = true;
      const nextIdx = (activeStopIndex + 1) % GEO_STOPS.length;
      navigateToStop(nextIdx);
    }
  };

  const activeStop = GEO_STOPS[activeStopIndex] || GEO_STOPS[0];

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* 1. Sleek Compact Header Bar (Fits on single screen) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-1 py-1">
        {/* Left: Section Title & Live Distance Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6C7D51] animate-pulse" />
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1F2B1A] tracking-tight">
              The Water Ride Expedition
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/40">
              64 Days · 9 States
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#2E3D27] font-semibold border border-[#1F2B1A]/10 shadow-2xs">
              7,200 KM Total · Odometer: {liveKm.toLocaleString()} KM
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#EFF4E8] text-[#526639] text-[11px] font-bold">
              Stop {activeStopIndex + 1} of {GEO_STOPS.length}
            </span>
          </div>
        </div>

        {/* Right: Consolidated Controls (Tour, Step, Speed, Tiles) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Play / Pause Tour Button */}
          <button
            onClick={togglePlayTour}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
              isPlayingTour
                ? "bg-[#8A5559] text-white hover:bg-[#724548]"
                : "bg-[#2E3D27] text-[#F8FAF6] hover:bg-[#1F2B1A]"
            }`}
          >
            {isPlayingTour ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Pause
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Tour
              </>
            )}
          </button>

          {/* Previous / Next Step Buttons */}
          <div className="flex items-center bg-white border border-[#1F2B1A]/10 rounded-full p-0.5 shadow-2xs">
            <button
              onClick={() => navigateToStop((activeStopIndex - 1 + GEO_STOPS.length) % GEO_STOPS.length)}
              disabled={isMoving}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#1F2B1A] hover:bg-[#EFF4E8] disabled:opacity-30 cursor-pointer"
              title="Previous Destination"
            >
              ←
            </button>
            <button
              onClick={() => navigateToStop((activeStopIndex + 1) % GEO_STOPS.length)}
              disabled={isMoving}
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-[#1F2B1A] hover:bg-[#EFF4E8] disabled:opacity-30 cursor-pointer"
              title="Next Destination"
            >
              →
            </button>
          </div>

          {/* Speed Selector */}
          <div className="hidden md:flex items-center bg-white border border-[#1F2B1A]/10 rounded-full p-0.5 text-[11px] font-bold text-[#5C6B55]">
            {[1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  speedMultiplier === spd ? "bg-[#2E3D27] text-white" : "hover:text-[#1F2B1A]"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Basemap Switcher */}
          <div className="flex items-center bg-white border border-[#1F2B1A]/10 rounded-full p-0.5 text-xs font-medium text-[#5C6B55] shadow-2xs">
            <button
              onClick={() => switchTileProvider("topo")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeTileKey === "topo" ? "bg-[#2E3D27] text-white font-semibold shadow-2xs" : "hover:text-[#1F2B1A]"
              }`}
            >
              Topo
            </button>
            <button
              onClick={() => switchTileProvider("streets")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeTileKey === "streets" ? "bg-[#2E3D27] text-white font-semibold shadow-2xs" : "hover:text-[#1F2B1A]"
              }`}
            >
              Cities
            </button>
            <button
              onClick={() => switchTileProvider("satellite")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                activeTileKey === "satellite" ? "bg-[#2E3D27] text-white font-semibold shadow-2xs" : "hover:text-[#1F2B1A]"
              }`}
            >
              Satellite
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Experience Grid (Calibrated height to fit in one screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch h-[calc(100vh-175px)] min-h-[460px] max-h-[580px]">
        
        {/* ========================================================= */}
        {/* A. LEFT SIDEBAR: Expedition Itinerary (3 cols)             */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-col rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-xs overflow-hidden h-full">
          {/* Sidebar Top: Search & State Filter */}
          <div className="p-2.5 bg-[#EFF4E8]/90 border-b border-[#1F2B1A]/10 flex flex-col gap-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#526639]">
                Itinerary ({filteredStops.length})
              </span>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="px-2 py-0.5 rounded-md text-[11px] bg-white text-[#526639] border border-[#1F2B1A]/10 font-medium cursor-pointer"
              >
                <option value="All">All States (9)</option>
                {states.filter((s) => s !== "All").map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Search */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2.5 py-1 pl-7 rounded-lg bg-white border border-[#1F2B1A]/10 text-xs text-[#1F2B1A] placeholder-[#738260]/60 focus:outline-none focus:border-[#6C7D51]"
              />
              <svg
                className="absolute left-2 top-1.5 w-3 h-3 text-[#738260]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1 text-xs text-[#738260] hover:text-[#1F2B1A]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Destinations List */}
          <div
            ref={sidebarContainerRef}
            className="flex-1 overflow-y-auto p-1.5 flex flex-col gap-1 divide-y divide-[#1F2B1A]/5"
          >
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
                  className={`w-full text-left p-2 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 pt-1.5 ${
                    isActive
                      ? "bg-white border-2 border-[#6C7D51] shadow-xs ring-1 ring-[#6C7D51]/20"
                      : isTarget
                      ? "bg-[#EFF4E8] border border-[#6C7D51] animate-pulse"
                      : "hover:bg-white/70 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${
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
                      <div className="flex items-center gap-1">
                        <span className="font-serif font-bold text-xs text-[#1F2B1A] truncate">
                          {stop.name}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6C7D51] animate-ping shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#738260] truncate">
                        {stop.day.replace(/\s*\([^)]*\)/, "")} · {stop.legKm > 0 ? `${stop.legKm} km` : "Origin"}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 text-[9px] font-semibold px-1.5 py-0.2 rounded bg-[#EFF4E8] text-[#526639]">
                    {stop.state}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* B. CENTER VIEWPORT: Full-Height Leaflet Highway Map (6 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl overflow-hidden border border-[#1F2B1A]/10 bg-[#EAF2F4] shadow-xs relative h-full">
          {/* Leaflet DOM container filling 100% height */}
          <div
            ref={mapContainerRef}
            className="w-full h-full z-10"
            style={{ background: "#EAF2F4" }}
          />

          {/* Bottom Floating Status Pill */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-[#1F2B1A]/10 text-[#5C6B55] shadow-xs z-20">
            <span className="truncate">
              📍 <strong>{activeStop.name}</strong>, {activeStop.state} ({activeStop.day})
            </span>
            <span className="shrink-0 font-medium text-[#2E3D27] text-[10px]">
              {isMoving ? "🏍 Navigating Highways..." : "✓ Destination Active"}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* C. RIGHT DOSSIER: Verified Field Log Card (3 cols)         */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-col rounded-2xl bg-[#F8FAF6] border border-[#1F2B1A]/10 shadow-xs p-3.5 sm:p-4 gap-3 h-full overflow-hidden">
          
          {/* Dossier Header */}
          <div className="flex items-center justify-between border-b border-[#1F2B1A]/10 pb-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.2 rounded-full bg-[#2E3D27] text-white text-[9px] font-bold tracking-wider uppercase">
                {activeStop.code}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#738260]">
                {activeStop.state}
              </span>
            </div>
            <span className="text-[11px] font-serif italic text-[#5C6B55]">
              Stop {activeStop.index + 1}/30
            </span>
          </div>

          {/* Stop Title & Metrics */}
          <div className="shrink-0">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1F2B1A] tracking-tight truncate">
              {activeStop.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="px-2 py-0.5 rounded-md bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/30">
                📅 {activeStop.day}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#EFF4E8] text-[#526639] font-medium border border-[#A9B689]/30">
                🛣️ {activeStop.legKm > 0 ? `${activeStop.legKm} KM` : "Base"}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white text-[#2E3D27] font-semibold border border-[#1F2B1A]/10">
                📊 {activeStop.cumulativeKm.toLocaleString()} KM Total
              </span>
            </div>
          </div>

          {/* Scrollable Journal Detail Content */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 text-xs">
            {/* Pit Stop & Organizations Met */}
            {(activeStop.pitStops !== "-" || activeStop.met) && (
              <div className="p-2.5 rounded-xl bg-white border border-[#1F2B1A]/10 shadow-2xs flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#526639]">
                  📍 Hub & Met
                </span>
                {activeStop.pitStops !== "-" && (
                  <p className="text-[11px] text-[#1F2B1A] font-medium">
                    <strong>Pit Stop:</strong> {activeStop.pitStops}
                  </p>
                )}
                {activeStop.met && (
                  <p className="text-[11px] text-[#5C6B55]">
                    <strong>Met:</strong> {activeStop.met}
                  </p>
                )}
              </div>
            )}

            {/* Traditional Water Wisdom */}
            {activeStop.waterWisdom && (
              <div className="p-2.5 rounded-xl bg-[#EFF4E8]/60 border border-[#A9B689]/40 flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#2E3D27] flex items-center gap-1">
                  🏺 Traditional Water Wisdom
                </span>
                <p className="text-[11px] text-[#2E3D27] leading-relaxed line-clamp-4">
                  {activeStop.waterWisdom.trim()}
                </p>
              </div>
            )}

            {/* Water Issues */}
            {activeStop.waterIssues && (
              <div className="p-2.5 rounded-xl bg-white border border-[#1F2B1A]/10 flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A5559] flex items-center gap-1">
                  💧 Groundwater Challenges
                </span>
                <p className="text-[11px] text-[#5C6B55] leading-relaxed line-clamp-3">
                  {activeStop.waterIssues.trim()}
                </p>
              </div>
            )}

            {/* Rider's Journal Quote */}
            {activeStop.reflections && (
              <div className="p-2.5 rounded-xl bg-[#2E3D27] text-white flex flex-col gap-1 shadow-2xs">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#A9B689]">
                  Rider&apos;s Journal
                </span>
                <p className="font-serif italic text-[11px] text-[#EFF4E8] leading-relaxed">
                  &ldquo;{activeStop.reflections}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Bottom Quick Actions (Pinned) */}
          <div className="pt-1.5 border-t border-[#1F2B1A]/10 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => navigateToStop((activeStopIndex - 1 + GEO_STOPS.length) % GEO_STOPS.length)}
              disabled={activeStopIndex === 0 || isMoving}
              className="flex-1 py-1.5 rounded-lg bg-white hover:bg-[#EFF4E8] text-[#1F2B1A] border border-[#1F2B1A]/10 text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer text-center"
            >
              ← Prev
            </button>
            <button
              onClick={() => navigateToStop((activeStopIndex + 1) % GEO_STOPS.length)}
              disabled={activeStopIndex === GEO_STOPS.length - 1 || isMoving}
              className="flex-1 py-1.5 rounded-lg bg-[#2E3D27] hover:bg-[#1F2B1A] text-white text-xs font-semibold disabled:opacity-30 transition-all cursor-pointer text-center shadow-2xs"
            >
              Next →
            </button>
          </div>
        </div>

      </div>

      {/* 3. Bottom One-Line Footnote */}
      <p className="text-[10px] text-[#738260] italic text-center sm:text-left px-1">
        * Note: 7,200 km field log includes local village cluster and watershed transit; road corridor displays highway navigation.
      </p>
    </div>
  );
}
