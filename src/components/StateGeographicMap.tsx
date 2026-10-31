import { useState } from 'react';
import { INDIA_STATES, IndiaState } from '../data/indiaStates';
import { HeritageSite } from '../data/heritageSites';
import { Landmark, MapPin, Compass, Sparkles, Check, ChevronRight, Info } from 'lucide-react';

interface StateGeographicMapProps {
  sites: HeritageSite[];
  selectedSite: HeritageSite | null;
  onSelectSite: (site: HeritageSite) => void;
  selectedState: IndiaState | null;
  onSelectState: (state: IndiaState | null) => void;
  showStateNames: boolean;
  onToggleStateNames: (val: boolean) => void;
}

export function StateGeographicMap({
  sites,
  selectedSite,
  onSelectSite,
  selectedState,
  onSelectState,
  showStateNames,
  onToggleStateNames,
}: StateGeographicMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [hoveredState, setHoveredState] = useState<IndiaState | null>(null);

  // Exact geographic projection mapping India's coordinates to SVG viewBox (0 0 620 680)
  // Latitude: 37.5°N (Indira Col / Siachen / Karakoram) down to 7.5°N (Kanyakumari / Cape Comorin)
  // Longitude: 68.0°E (Ghuar Mota, Kutch, Gujarat) across to 97.5°E (Kibithu, Arunachal Pradesh)
  const projectCoords = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 97.5;
    const minLat = 7.5;
    const maxLat = 37.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 510 + 45;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 580 + 35;
    return { x, y };
  };

  const filteredStates = INDIA_STATES.filter((st) => {
    if (selectedRegion === 'All') return true;
    return st.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Top Filter and Region Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs text-xs font-sans">
        <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
          <span className="font-bold text-[#5A5A5A] uppercase tracking-wider text-[10px]">Territory:</span>
          {['All', 'North', 'South', 'West', 'East', 'Central', 'North-East'].map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-[#B05B3B] text-white shadow-xs'
                  : 'text-[#5A5A5A] hover:bg-white hover:text-[#2D2A26]'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1.5 text-[11px] font-sans text-[#2D2A26] cursor-pointer">
            <input
              type="checkbox"
              checked={showStateNames}
              onChange={(e) => onToggleStateNames(e.target.checked)}
              className="accent-[#B05B3B] rounded cursor-pointer"
            />
            <span className="font-semibold">Labels on Map</span>
          </label>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="bg-[#FAF7F0] border border-[#2D2A26]/15 rounded p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2D2A26_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Floating Instruction / State Info Badge */}
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur px-3 py-1.5 rounded border border-[#2D2A26]/15 text-[11px] font-sans shadow-xs flex items-center space-x-2">
          <Compass className="w-3.5 h-3.5 text-[#B05B3B]" />
          <span>
            {hoveredState ? (
              <span><strong>{hoveredState.name}</strong> • Capital: {hoveredState.capital}</span>
            ) : selectedState ? (
              <span>Focused: <strong>{selectedState.name}</strong> ({selectedState.capital})</span>
            ) : (
              <span>Click any <strong>State Center</strong> or <strong>Site Pin</strong></span>
            )}
          </span>
        </div>

        <svg
          className="w-full max-w-[620px] h-[550px] select-none"
          viewBox="0 0 620 660"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle ocean texture label */}
          <text x="75" y="470" fill="#2D2A26" fillOpacity="0.15" fontSize="13" fontStyle="italic" fontFamily="serif" letterSpacing="3">
            ARABIAN SEA
          </text>
          <text x="375" y="470" fill="#2D2A26" fillOpacity="0.15" fontSize="13" fontStyle="italic" fontFamily="serif" letterSpacing="3">
            BAY OF BENGAL
          </text>
          <text x="210" y="645" fill="#2D2A26" fillOpacity="0.15" fontSize="11" fontStyle="italic" fontFamily="serif" letterSpacing="2">
            INDIAN OCEAN
          </text>

          {/* Proper, geographically authentic boundary path of the Republic of India */}
          {/* Traces Northern Crown (Ladakh/Kashmir), Himalayas, North-East (Siliguri corridor, Assam, Arunachal bend, Nagaland, Manipur, Mizoram, Tripura, Meghalaya), East Coast, Southern Peninsula (Kanyakumari), West Coast, and Gujarat (Kutch & Kathiawar) */}
          <path
            d="
              M 175 42
              C 185 36, 198 32, 212 36
              C 225 40, 238 52, 246 68
              C 252 82, 248 98, 244 112
              C 240 126, 245 142, 252 155
              C 260 170, 275 182, 292 195
              C 315 210, 342 225, 368 236
              C 378 240, 385 232, 388 222
              C 392 210, 398 222, 404 235
              C 416 238, 432 236, 448 238
              C 462 230, 475 215, 492 202
              C 512 188, 530 196, 545 212
              C 548 222, 538 235, 532 245
              C 525 258, 514 272, 506 288
              C 498 304, 485 322, 476 338
              C 468 335, 458 320, 452 308
              C 445 296, 438 300, 435 308
              C 432 316, 428 304, 425 292
              C 428 278, 438 270, 448 272
              C 440 262, 422 264, 412 260
              C 398 252, 388 250, 378 260
              C 370 274, 375 295, 380 315
              C 385 330, 396 342, 388 350
              C 376 354, 362 368, 350 382
              C 338 398, 324 416, 312 432
              C 298 448, 282 465, 268 485
              C 255 505, 250 528, 246 548
              C 242 568, 238 584, 226 596
              C 216 605, 208 610, 202 612
              C 194 606, 186 588, 180 568
              C 174 548, 166 525, 158 502
              C 150 478, 144 456, 136 432
              C 128 408, 122 386, 120 365
              C 118 352, 110 348, 100 354
              C 86 362, 72 358, 62 344
              C 54 332, 60 320, 72 315
              C 84 310, 88 302, 78 296
              C 62 296, 50 304, 48 290
              C 48 276, 68 268, 86 264
              C 102 258, 116 242, 128 224
              C 138 206, 148 184, 156 164
              C 162 144, 155 125, 150 106
              C 146 88, 152 68, 160 52
              Z
            "
            fill="#EFE9DD"
            stroke="#D4C3A3"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="filter drop-shadow-xs transition-colors"
          />

          {/* Lakshadweep Archipelago (Arabian Sea) */}
          <g>
            <circle cx="118" cy="520" r="3.5" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <circle cx="121" cy="535" r="3" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <circle cx="123" cy="552" r="3.5" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <circle cx="128" cy="580" r="3" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <text x="135" y="542" fill="#5A5A5A" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              Lakshadweep
            </text>
          </g>

          {/* Andaman & Nicobar Archipelago (Bay of Bengal) */}
          <g>
            <ellipse cx="460" cy="510" rx="3.5" ry="7" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <ellipse cx="463" cy="532" rx="3.5" ry="9" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <circle cx="466" cy="555" r="4" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <ellipse cx="470" cy="580" rx="3" ry="6" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <ellipse cx="474" cy="605" rx="3.5" ry="7" fill="#D4C3A3" stroke="#B05B3B" strokeWidth="1" />
            <text x="478" y="555" fill="#5A5A5A" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              Andaman & Nicobar
            </text>
          </g>

          {/* Regional demarcation guidelines */}
          <path
            d="M 120 365 Q 220 350 380 345"
            stroke="#2D2A26"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.2"
          />
          <path
            d="M 140 460 Q 230 460 280 480"
            stroke="#2D2A26"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.2"
          />
          <path
            d="M 370 240 Q 400 245 425 240"
            stroke="#2D2A26"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.25"
          />

          {/* 1. STATE NAMES & CENTERS ON THE MAP */}
          {filteredStates.map((st) => {
            const { x, y } = projectCoords(st.lat, st.lng);
            const isSelected = selectedState?.id === st.id;
            const isHovered = hoveredState?.id === st.id;

            return (
              <g
                key={st.id}
                className="cursor-pointer transition-transform group"
                onClick={() => onSelectState(isSelected ? null : st)}
                onMouseEnter={() => setHoveredState(st)}
                onMouseLeave={() => setHoveredState(null)}
              >
                {/* State halo ring if selected or hovered */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "18" : "14"}
                    fill="#B05B3B"
                    fillOpacity={isSelected ? "0.25" : "0.15"}
                    stroke="#B05B3B"
                    strokeWidth="1.5"
                    className={isSelected ? "animate-pulse" : ""}
                  />
                )}

                {/* State center pin dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "5" : isHovered ? "4" : "3"}
                  fill={isSelected ? "#B05B3B" : isHovered ? "#96472A" : "#2D2A26"}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* State Name Label Tag */}
                {showStateNames && (
                  <g transform={`translate(${x}, ${y - 8})`}>
                    <rect
                      x={-st.name.length * 3.4 - 4}
                      y="-12"
                      width={st.name.length * 6.8 + 8}
                      height="15"
                      rx="3"
                      fill={isSelected ? "#B05B3B" : isHovered ? "#2D2A26" : "#FFFFFF"}
                      fillOpacity={isSelected || isHovered ? "1" : "0.94"}
                      stroke={isSelected ? "#FFFFFF" : "#2D2A26"}
                      strokeWidth={isSelected ? "1.5" : "0.75"}
                      strokeOpacity="0.4"
                    />
                    <text
                      x="0"
                      y="-2"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      fill={isSelected || isHovered ? "#FFFFFF" : "#2D2A26"}
                    >
                      {st.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 2. UNESCO SITES PINS */}
          {sites.map((site) => {
            const { x, y } = projectCoords(site.latitude, site.longitude);
            const isSelected = selectedSite?.id === site.id;
            const matchesState = selectedState && site.state.toLowerCase().includes(selectedState.name.toLowerCase());

            return (
              <g
                key={`site-${site.id}`}
                className="cursor-pointer group"
                onClick={() => onSelectSite(site)}
              >
                {/* Highlight ring if matching selected state or clicked */}
                {(isSelected || matchesState) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "12" : "9"}
                    fill="none"
                    stroke="#B05B3B"
                    strokeWidth={isSelected ? "2" : "1.5"}
                    strokeDasharray={isSelected ? undefined : "2 2"}
                    className={isSelected ? "animate-ping opacity-75" : ""}
                  />
                )}

                {/* Outer Site Pin */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "6.5" : "4.5"}
                  fill={
                    isSelected 
                      ? "#B05B3B" 
                      : site.type === 'Cultural' 
                      ? '#2D2A26' 
                      : '#1B6B47'
                  }
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />

                {/* Inner center dot */}
                <circle cx={x} cy={y} r="1.5" fill="#FFFFFF" />
              </g>
            );
          })}
        </svg>

        {/* Bottom Legend */}
        <div className="w-full flex flex-wrap items-center justify-between text-[10px] uppercase tracking-wider font-sans text-[#5A5A5A] pt-3 border-t border-[#2D2A26]/10">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A26] border border-white"></span>
              <span>Cultural Sites ({sites.filter(s => s.type === 'Cultural').length})</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B6B47] border border-white"></span>
              <span>Natural Sites ({sites.filter(s => s.type === 'Natural').length})</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B05B3B] border border-white"></span>
              <span>Active Selection</span>
            </span>
          </div>
          <div className="text-[11px] font-sans font-bold text-[#2D2A26]">
            {INDIA_STATES.length} States & Territories Represented
          </div>
        </div>
      </div>

      {/* State Quick-Selector Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-sans font-bold text-[#5A5A5A] flex items-center space-x-1">
            <Landmark className="w-3.5 h-3.5 text-[#B05B3B]" />
            <span>Select State / Union Territory to Focus:</span>
          </span>
          {selectedState && (
            <button
              type="button"
              onClick={() => onSelectState(null)}
              className="text-[11px] text-[#B05B3B] hover:underline font-medium cursor-pointer"
            >
              Clear Selection
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-1.5 max-h-48 overflow-y-auto p-1 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs">
          {INDIA_STATES.map((st) => {
            const isSelected = selectedState?.id === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectState(isSelected ? null : st)}
                className={`p-1.5 rounded-xs text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#B05B3B] text-white border-[#B05B3B] shadow-xs'
                    : 'bg-white text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#B05B3B]/50'
                }`}
              >
                <div className="text-[11px] font-sans font-bold truncate">{st.name}</div>
                <div className={`text-[9px] flex items-center justify-between ${isSelected ? 'text-white/80' : 'text-[#5A5A5A]'}`}>
                  <span>{st.capital}</span>
                  {st.unescoSitesCount > 0 && (
                    <span className={`px-1 rounded font-mono ${isSelected ? 'bg-white/20' : 'bg-black/5 text-[#B05B3B] font-bold'}`}>
                      {st.unescoSitesCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
