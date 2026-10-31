import { useState } from 'react';
import { User, MapPin, Compass, Sparkles, CheckCircle, Clock, Navigation, Award, ChevronRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SOLO_TRAVELER_DATA } from '../data/travelerData';
import { SmartTravelTipsSection } from './SmartTravelTipsSection';

interface SoloTravellerPageProps {
  onBack: () => void;
}

export function SoloTravellerPage({ onBack }: SoloTravellerPageProps) {
  const traveler = SOLO_TRAVELER_DATA;
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>(traveler.checkpoints[1].id);

  const activeCheckpoint = traveler.checkpoints.find(c => c.id === selectedCheckpoint) || traveler.checkpoints[0];

  return (
    <div className="w-full pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center space-x-3 text-xs uppercase tracking-widest font-sans">
        <button
          onClick={onBack}
          type="button"
          className="text-[#B05B3B] hover:text-[#2D2A26] flex items-center space-x-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
        <span className="text-[#2D2A26]/30">/</span>
        <span className="text-[#5A5A5A]">Traveler Pathway</span>
        <span className="text-[#2D2A26]/30">/</span>
        <span className="text-[#2D2A26] font-bold">Solo Traveller</span>
      </div>

      {/* Header & Traveler Information Profile */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2D2A26]/10">
          <div className="flex items-start sm:items-center space-x-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#D4C3A3]/40 border-2 border-[#B05B3B] flex items-center justify-center text-[#B05B3B] font-serif text-3xl italic shadow-inner flex-shrink-0">
              {traveler.avatarInitials}
            </div>
            <div>
              <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-sans font-bold bg-[#B05B3B]/10 text-[#B05B3B] mb-1">
                Verified Solo Wanderer
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#2D2A26]">
                {traveler.name}
              </h1>
              <p className="text-xs uppercase tracking-wider font-sans text-[#5A5A5A]">
                {traveler.role}
              </p>
              <p className="text-xs font-serif italic text-[#4A453F] mt-2 max-w-xl">
                "{traveler.bio}"
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans">
            <div className="px-3 py-2 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Travel Style</div>
              <div className="font-bold text-[#2D2A26]">Slow Heritage & Rail</div>
            </div>
            <div className="px-3 py-2 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded text-center">
              <div className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Current Expedition</div>
              <div className="font-bold text-[#B05B3B]">Ganga Heritage Corridor</div>
            </div>
            <a
              href="#smart-travel-tips-section"
              className="px-3 py-2 bg-[#B05B3B]/10 hover:bg-[#B05B3B] text-[#B05B3B] hover:text-white border border-[#B05B3B]/30 rounded text-center transition-colors cursor-pointer"
            >
              <div className="text-[10px] uppercase tracking-wider font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Smart Tips</span>
              </div>
              <div className="font-bold text-[11px]">Search Grounded</div>
            </a>
          </div>
        </div>

        {/* REQUIRED COLUMN: Total no. of places travelled and how many hidden gems he has discovered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Stat 1: Total Places Travelled */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#2D2A26] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#5A5A5A] font-bold">
                Column Stat 01
              </span>
              <Compass className="w-4 h-4 text-[#2D2A26]" />
            </div>
            <div className="text-4xl font-serif italic text-[#2D2A26] my-1">
              {traveler.placesTravelled}
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              Total Places Travelled
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Historic cities, ancient river ghats, and UNESCO monuments logged.
            </p>
          </div>

          {/* Stat 2: Hidden Gems Discovered */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#B05B3B] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B05B3B] font-bold">
                Column Stat 02
              </span>
              <Sparkles className="w-4 h-4 text-[#B05B3B]" />
            </div>
            <div className="text-4xl font-serif italic text-[#B05B3B] my-1">
              0{traveler.hiddenGemsDiscovered}
            </div>
            <div className="text-xs font-sans font-bold text-[#B05B3B]">
              Hidden Gems Discovered
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Off-circuit caves, forgotten stepwells, and canyon sanctuaries.
            </p>
          </div>

          {/* Stat 3: Expedition Mileage */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#D4C3A3] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#5A5A5A] font-bold">
                Track Distance
              </span>
              <Navigation className="w-4 h-4 text-[#5A5A5A]" />
            </div>
            <div className="text-4xl font-serif italic text-[#2D2A26] my-1">
              {traveler.totalDistanceKm} <span className="text-sm font-sans font-normal">km</span>
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              Total Route Distance
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Varanasi Assi Ghat to Bodh Gaya Mahabodhi.
            </p>
          </div>

          {/* Stat 4: Journey Progress */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-emerald-700 border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-emerald-800 font-bold">
                Track Completion
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-4xl font-serif italic text-emerald-800 my-1">
              {traveler.currentProgressPct}%
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              4 of 6 Waypoints Reached
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Currently advancing towards Barabar granite caves.
            </p>
          </div>
        </div>
      </section>

      {/* REQUIRED MAP SECTION: Show Starting Point and Track Journey till End Point */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2D2A26]/10 gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Active Solo Expedition Map
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
              {traveler.expeditionName}
            </h2>
          </div>

          <div className="flex items-center space-x-2 bg-[#FDFBF7] px-3 py-1.5 border border-[#2D2A26]/10 rounded text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[#5A5A5A]">Start: <strong className="text-[#2D2A26]">Varanasi</strong></span>
            <span className="text-[#B05B3B] font-bold">→</span>
            <span className="text-[#5A5A5A]">End: <strong className="text-[#2D2A26]">Bodh Gaya</strong></span>
          </div>
        </div>

        {/* Visual Interactive Map & Route Waypoints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map Canvas / Route Projection */}
          <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#2D2A26]/15 p-6 relative rounded-xs min-h-[380px] flex flex-col justify-between overflow-hidden">
            {/* Map Topographical Canvas Background Graphic */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B05B3B_1px,transparent_1px)] bg-[size:16px_16px]"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold bg-[#2D2A26] text-white px-2 py-0.5 rounded">
                  GPS Route Track • Indian Heritage Grid
                </span>
                <p className="text-xs font-serif italic text-[#5A5A5A] mt-1">
                  Tracing ancient trade & monastic tracks through Uttar Pradesh into Bihar
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-sans font-bold text-[#B05B3B]">260 Kilometers</span>
                <div className="text-[10px] font-sans text-[#5A5A5A]">6 Cultural Checkpoints</div>
              </div>
            </div>

            {/* Interactive SVG Route Representation */}
            <div className="relative z-10 my-8 py-4">
              <svg className="w-full h-32" viewBox="0 0 600 120" fill="none">
                {/* Background Route Path */}
                <path
                  d="M 50 60 Q 150 20 270 70 T 550 50"
                  stroke="#D4C3A3"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                {/* Completed Traveled Path */}
                <path
                  d="M 50 60 Q 150 20 270 70 T 420 58"
                  stroke="#B05B3B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Waypoint 1: Start */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-1")}>
                  <circle cx="50" cy="60" r="10" fill="#2D2A26" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="50" cy="60" r="4" fill="#FFFFFF" />
                  <text x="50" y="95" textAnchor="middle" fill="#2D2A26" fontSize="10" fontFamily="serif" fontWeight="bold">
                    START: Varanasi
                  </text>
                </g>

                {/* Waypoint 2: Sarnath */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-2")}>
                  <circle cx="150" cy="38" r="8" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="150" y="20" textAnchor="middle" fill="#2D2A26" fontSize="9" fontFamily="sans-serif">
                    Sarnath (14km)
                  </text>
                </g>

                {/* Waypoint 3: Chunar */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-3")}>
                  <circle cx="270" cy="70" r="8" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="270" y="100" textAnchor="middle" fill="#2D2A26" fontSize="9" fontFamily="sans-serif">
                    Chunar Fort
                  </text>
                </g>

                {/* Waypoint 4: Sasaram */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-4")}>
                  <circle cx="420" cy="58" r="8" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="420" y="80" textAnchor="middle" fill="#2D2A26" fontSize="9" fontFamily="sans-serif">
                    Sasaram
                  </text>
                </g>

                {/* Waypoint 5: Barabar Caves */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-5")}>
                  <circle cx="490" cy="48" r="7" fill="#FFFFFF" stroke="#D4C3A3" strokeWidth="3" />
                  <text x="490" y="28" textAnchor="middle" fill="#888888" fontSize="8" fontFamily="sans-serif">
                    Barabar
                  </text>
                </g>

                {/* Waypoint 6: End Point Bodh Gaya */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("cp-6")}>
                  <circle cx="550" cy="50" r="10" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="550" cy="50" r="4" fill="#FDFBF7" />
                  <text x="550" y="85" textAnchor="middle" fill="#B05B3B" fontSize="10" fontFamily="serif" fontWeight="bold">
                    END: Bodh Gaya
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Status bar */}
            <div className="relative z-10 bg-white/90 backdrop-blur p-3 border border-[#2D2A26]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-sans">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Selected Node:</span>
                <span className="font-bold text-[#2D2A26] ml-1.5">{activeCheckpoint.name}</span>
              </div>
              <div className="text-[11px] text-[#B05B3B] font-medium">
                {activeCheckpoint.completed ? 'Checkpoint Verified & Documented' : 'Upcoming Route Waypoint'}
              </div>
            </div>
          </div>

          {/* Checkpoint Details & Itinerary List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-[#FDFBF7] p-5 border border-[#2D2A26]/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                  Node Dossier
                </span>
                <span className="text-xs font-sans text-[#5A5A5A]">
                  +{activeCheckpoint.distanceKm} km from Assi Ghat
                </span>
              </div>

              <h3 className="text-xl font-serif text-[#2D2A26]">
                {activeCheckpoint.name}
              </h3>
              <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed">
                {activeCheckpoint.notes}
              </p>

              {activeCheckpoint.gemBadge && (
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#D4C3A3]/20 border border-[#D4C3A3] rounded text-[11px] font-sans text-[#2D2A26]">
                  <Sparkles className="w-3.5 h-3.5 text-[#B05B3B]" />
                  <span>{activeCheckpoint.gemBadge}</span>
                </div>
              )}

              <div className="text-[11px] font-sans text-[#5A5A5A] pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
                <span>Coordinates: {activeCheckpoint.coordinates[0].toFixed(3)}° N, {activeCheckpoint.coordinates[1].toFixed(3)}° E</span>
                <span className={`font-bold ${activeCheckpoint.completed ? 'text-emerald-700' : 'text-[#B05B3B]'}`}>
                  {activeCheckpoint.completed ? 'Traveled' : 'En Route'}
                </span>
              </div>
            </div>

            {/* Checkpoint Selection Buttons */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#5A5A5A]">
                Journey Waypoints
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {traveler.checkpoints.map((cp, idx) => (
                  <button
                    key={cp.id}
                    onClick={() => setSelectedCheckpoint(cp.id)}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-xs font-sans flex items-center justify-between border transition-all cursor-pointer ${
                      selectedCheckpoint === cp.id
                        ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                        : 'bg-white hover:bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-[10px] opacity-60">0{idx + 1}</span>
                      <span className="font-medium truncate">{cp.name}</span>
                    </span>
                    <span className="text-[10px] opacity-70 ml-2">{cp.distanceKm} km</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART TRAVEL TIPS SECTION: Search Grounded Safety and Local Etiquette Advice */}
      <SmartTravelTipsSection currentCheckpointName={activeCheckpoint.name} />

      {/* Discovered Hidden Gems Catalog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Rare Expeditions
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
              6 Hidden Gems Discovered by Solo Wanderer
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {traveler.discoveredGemsList.map((gem, idx) => (
            <div key={idx} className="bg-white p-5 border border-[#2D2A26]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                    {gem.category}
                  </span>
                  <span className="text-[10px] font-sans text-[#5A5A5A]">{gem.location}</span>
                </div>
                <h3 className="text-lg font-serif italic text-[#2D2A26] mb-2">
                  {gem.name}
                </h3>
                <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-4">
                  {gem.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#2D2A26]/10 text-[10px] uppercase font-sans tracking-wider text-[#B05B3B] font-bold">
                Logged in Personal Field Archive
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
