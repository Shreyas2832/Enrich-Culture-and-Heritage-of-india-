import { useState } from 'react';
import { Users, Shield, MapPin, PhoneCall, AlertCircle, CheckCircle, Navigation, Award, ArrowLeft, HeartHandshake } from 'lucide-react';
import { GROUP_TRAVELER_DATA } from '../data/travelerData';

interface GroupTravellerPageProps {
  onBack: () => void;
}

export function GroupTravellerPage({ onBack }: GroupTravellerPageProps) {
  const group = GROUP_TRAVELER_DATA;
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>(group.checkpoints[1].id);
  const [showSosAlert, setShowSosAlert] = useState<boolean>(false);

  const activeCheckpoint = group.checkpoints.find(c => c.id === selectedCheckpoint) || group.checkpoints[0];

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
        <span className="text-[#2D2A26] font-bold">Group Traveller (Safe for Women)</span>
      </div>

      {/* Header & Group Information Profile */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2D2A26]/10">
          <div className="flex items-start sm:items-center space-x-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#B05B3B]/10 border-2 border-[#B05B3B] flex items-center justify-center text-[#B05B3B] font-serif text-3xl italic shadow-inner flex-shrink-0">
              <Users className="w-10 h-10 stroke-[1.5]" />
            </div>
            <div>
              <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-sans font-bold bg-[#B05B3B] text-white mb-1">
                Women-Safety Audited Circuit
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#2D2A26]">
                {group.groupName}
              </h1>
              <p className="text-xs uppercase tracking-wider font-sans text-[#5A5A5A]">
                {group.groupType}
              </p>
              <p className="text-xs font-serif italic text-[#4A453F] mt-2 max-w-xl">
                "{group.bio}"
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setShowSosAlert(!showSosAlert)}
              type="button"
              className="px-4 py-2.5 bg-[#B05B3B] hover:bg-[#8f452a] text-white rounded text-xs font-sans font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Safety Hotlines & SOS</span>
            </button>
          </div>
        </div>

        {/* SOS Hotline Drawer if expanded */}
        {showSosAlert && (
          <div className="mt-6 p-4 bg-[#B05B3B]/10 border border-[#B05B3B]/30 rounded-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-sans font-bold text-[#B05B3B] flex items-center space-x-1.5">
                <Shield className="w-4 h-4" />
                <span>Immediate 24x7 Women & Tourist Helplines in India</span>
              </span>
              <button 
                onClick={() => setShowSosAlert(false)}
                className="text-xs font-sans text-[#5A5A5A] hover:text-[#2D2A26] cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {group.emergencyHelplines.map((hl, idx) => (
                <div key={idx} className="bg-white p-3 border border-[#2D2A26]/10 rounded">
                  <div className="text-[10px] uppercase font-sans text-[#5A5A5A]">{hl.name}</div>
                  <div className="text-xl font-serif font-bold text-[#B05B3B]">{hl.number}</div>
                  <div className="text-[10px] font-sans text-[#5A5A5A] mt-0.5">{hl.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Columns/Stats to Solo Traveler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Stat 1: Total Places Travelled */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#2D2A26] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#5A5A5A] font-bold">
                Column Stat 01
              </span>
              <Users className="w-4 h-4 text-[#2D2A26]" />
            </div>
            <div className="text-4xl font-serif italic text-[#2D2A26] my-1">
              {group.placesTravelled}
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              Total Places Travelled
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Heritage citadels and group circuits documented collectively.
            </p>
          </div>

          {/* Stat 2: Female Safety Score */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#B05B3B] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B05B3B] font-bold">
                Women Safety Index
              </span>
              <Shield className="w-4 h-4 text-[#B05B3B]" />
            </div>
            <div className="text-4xl font-serif italic text-[#B05B3B] my-1">
              {group.womenSafetyIndex} <span className="text-sm font-sans font-normal text-[#5A5A5A]">/ 10</span>
            </div>
            <div className="text-xs font-sans font-bold text-[#B05B3B]">
              Ladies Travel Safety Audit
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Illuminated streets, active tourism police & verified stays.
            </p>
          </div>

          {/* Stat 3: Safe Certified Places */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-emerald-700 border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-emerald-800 font-bold">
                Certified Safe Sites
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-4xl font-serif italic text-emerald-800 my-1">
              {group.safeCertifiedPlaces}
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              Verified for Mixed Groups
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              Places rigorously audited for female traveler comfort.
            </p>
          </div>

          {/* Stat 4: Track Distance */}
          <div className="p-5 bg-[#FDFBF7] border-l-4 border-[#D4C3A3] border border-[#2D2A26]/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#5A5A5A] font-bold">
                Active Corridor
              </span>
              <Navigation className="w-4 h-4 text-[#5A5A5A]" />
            </div>
            <div className="text-4xl font-serif italic text-[#2D2A26] my-1">
              {group.totalDistanceKm} <span className="text-sm font-sans font-normal">km</span>
            </div>
            <div className="text-xs font-sans font-bold text-[#2D2A26]">
              Jaipur to Udaipur Circuit
            </div>
            <p className="text-[11px] font-sans text-[#5A5A5A] mt-1">
              3 of 5 safe checkpoints completed.
            </p>
          </div>
        </div>
      </section>

      {/* MAP SECTION: Track Starting Point to End Point for Group */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#2D2A26]/10 gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Active Group Route Map
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
              {group.expeditionName}
            </h2>
          </div>

          <div className="flex items-center space-x-2 bg-[#FDFBF7] px-3 py-1.5 border border-[#2D2A26]/10 rounded text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-[#B05B3B] animate-ping"></span>
            <span className="text-[#5A5A5A]">Start: <strong className="text-[#2D2A26]">Jaipur Amber Fort</strong></span>
            <span className="text-[#B05B3B] font-bold">→</span>
            <span className="text-[#5A5A5A]">End: <strong className="text-[#2D2A26]">Udaipur City Palace</strong></span>
          </div>
        </div>

        {/* Visual Map Canvas & Checkpoint Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#2D2A26]/15 p-6 relative rounded-xs min-h-[380px] flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#B05B3B_1px,transparent_1px)] bg-[size:16px_16px]"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold bg-[#B05B3B] text-white px-2 py-0.5 rounded">
                  Safe Corridor Track • Rajasthan Tourism Grid
                </span>
                <p className="text-xs font-serif italic text-[#5A5A5A] mt-1">
                  100% verified route with dedicated Pink Police & verified night transit
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-sans font-bold text-emerald-800">9.8 Safety Index</span>
                <div className="text-[10px] font-sans text-[#5A5A5A]">5 Audited Checkpoints</div>
              </div>
            </div>

            {/* SVG Visual Route */}
            <div className="relative z-10 my-8 py-4">
              <svg className="w-full h-32" viewBox="0 0 600 120" fill="none">
                <path
                  d="M 50 40 Q 180 80 300 40 T 550 70"
                  stroke="#D4C3A3"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 50 40 Q 180 80 300 40 T 360 48"
                  stroke="#B05B3B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Checkpoint 1: Jaipur Amer Fort */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("grp-1")}>
                  <circle cx="50" cy="40" r="10" fill="#2D2A26" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="50" cy="40" r="4" fill="#FFFFFF" />
                  <text x="50" y="25" textAnchor="middle" fill="#2D2A26" fontSize="10" fontFamily="serif" fontWeight="bold">
                    START: Amer Fort
                  </text>
                </g>

                {/* Checkpoint 2: Jantar Mantar */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("grp-2")}>
                  <circle cx="160" cy="72" r="8" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="160" y="95" textAnchor="middle" fill="#2D2A26" fontSize="9" fontFamily="sans-serif">
                    Jaipur Pink City
                  </text>
                </g>

                {/* Checkpoint 3: Pushkar */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("grp-3")}>
                  <circle cx="300" cy="40" r="8" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="300" y="25" textAnchor="middle" fill="#2D2A26" fontSize="9" fontFamily="sans-serif">
                    Pushkar Lake
                  </text>
                </g>

                {/* Checkpoint 4: Chittorgarh */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("grp-4")}>
                  <circle cx="440" cy="56" r="7" fill="#FFFFFF" stroke="#D4C3A3" strokeWidth="3" />
                  <text x="440" y="80" textAnchor="middle" fill="#888888" fontSize="8" fontFamily="sans-serif">
                    Chittorgarh
                  </text>
                </g>

                {/* Checkpoint 5: End Udaipur */}
                <g className="cursor-pointer" onClick={() => setSelectedCheckpoint("grp-5")}>
                  <circle cx="550" cy="70" r="10" fill="#B05B3B" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="550" cy="70" r="4" fill="#FDFBF7" />
                  <text x="550" y="105" textAnchor="middle" fill="#B05B3B" fontSize="10" fontFamily="serif" fontWeight="bold">
                    END: Udaipur City Palace
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Safe Status */}
            <div className="relative z-10 bg-white/90 backdrop-blur p-3 border border-[#2D2A26]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-sans">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Selected Safe Node:</span>
                <span className="font-bold text-[#2D2A26] ml-1.5">{activeCheckpoint.name}</span>
              </div>
              <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Women Safety Rating: {activeCheckpoint.womenSafetyRating} / 10</span>
              </div>
            </div>
          </div>

          {/* Node Inspector & Checkpoint selector */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-[#FDFBF7] p-5 border border-[#2D2A26]/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                  Node Safety Audit
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[10px] font-bold">
                  {activeCheckpoint.womenSafetyRating} / 10 Safe
                </span>
              </div>

              <h3 className="text-xl font-serif text-[#2D2A26]">
                {activeCheckpoint.name}
              </h3>
              <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed">
                {activeCheckpoint.notes}
              </p>

              <div className="p-2.5 bg-white border border-[#2D2A26]/10 rounded text-[11px] font-sans text-[#4A453F] space-y-1">
                <div className="font-bold text-[#2D2A26]">Safety Protocol for Ladies:</div>
                <div>• Female security officer stationed at ticket counter</div>
                <div>• Verified prepaid taxi kiosk linked with district tourism patrol</div>
              </div>

              <div className="text-[11px] font-sans text-[#5A5A5A] pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
                <span>Location: {activeCheckpoint.location}</span>
                <span className={`font-bold ${activeCheckpoint.completed ? 'text-emerald-700' : 'text-[#B05B3B]'}`}>
                  {activeCheckpoint.completed ? 'Visited Safely' : 'Upcoming Leg'}
                </span>
              </div>
            </div>

            {/* Checkpoint buttons */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#5A5A5A]">
                Vetted Safe Stops
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {group.checkpoints.map((cp, idx) => (
                  <button
                    key={cp.id}
                    onClick={() => setSelectedCheckpoint(cp.id)}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-xs font-sans flex items-center justify-between border transition-all cursor-pointer ${
                      selectedCheckpoint === cp.id
                        ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                        : 'bg-white hover:bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-[10px] opacity-60">0{idx + 1}</span>
                      <span className="font-medium truncate">{cp.name}</span>
                    </span>
                    <span className="text-[10px] font-bold opacity-90 ml-2">{cp.womenSafetyRating}★</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Places & Curated Circuits for Group Travelers with Ladies */}
      <section className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
            Certified Corridors
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
            Top Safe Places for Group Travelers when Ladies are Travelling
          </h2>
          <p className="text-xs font-sans text-[#5A5A5A] mt-1">
            Audited circuits across India that offer verified infrastructure, female guide networks, and zero-tolerance grievance resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {group.safeCircuits.map((circuit) => (
            <div key={circuit.id} className="bg-white p-6 border border-[#2D2A26]/15 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 bg-emerald-50 text-emerald-900 rounded">
                    Score: {circuit.safetyScore}/10 Safe
                  </span>
                  <span className="text-xs font-sans text-[#5A5A5A]">{circuit.recommendedGroupSize}</span>
                </div>

                <h3 className="text-xl font-serif italic text-[#2D2A26] mb-1">
                  {circuit.title}
                </h3>
                <div className="text-xs font-sans text-[#B05B3B] font-medium mb-4">
                  {circuit.region}
                </div>

                <div className="space-y-2 mb-4 text-xs font-sans">
                  <div className="font-bold text-[#2D2A26] text-[11px] uppercase tracking-wider">
                    Ladies Safety Highlights:
                  </div>
                  {circuit.ladiesSafetyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start space-x-2 text-[#5A5A5A]">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded border border-[#2D2A26]/10 text-[11px] font-sans text-[#4A453F] space-y-1 mb-4">
                  <div><strong>Stay Protocol:</strong> {circuit.stayVerification}</div>
                  <div><strong>Police Response:</strong> {circuit.emergencySupport}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2D2A26]/10 text-[11px] font-sans flex items-center justify-between text-[#5A5A5A]">
                <span>Key Landmarks:</span>
                <span className="font-medium text-[#2D2A26] truncate max-w-[150px]">{circuit.keyStops.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
