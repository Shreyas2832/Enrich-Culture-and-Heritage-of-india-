import { useState, useRef, useMemo } from 'react';
import { 
  MapPin, 
  Calendar, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Volume2, 
  ArrowLeft, 
  Layers, 
  Compass, 
  Check, 
  Landmark, 
  Globe, 
  RotateCcw
} from 'lucide-react';
import { UNESCO_HERITAGE_SITES, HeritageSite } from '../data/heritageSites';
import { INDIAN_FESTIVALS, FestivalItem } from '../data/festivals';
import { INDIA_STATES, IndiaState, findStateByName } from '../data/indiaStates';
import { AudioGuideBar } from './AudioGuideBar';
import { GoogleMapsView } from './GoogleMapsView';
import { StateGeographicMap } from './StateGeographicMap';
import { LiveApiMapView } from './LiveApiMapView';
import { isValidGoogleMapsKey } from '../utils/mapUtils';

interface MapsAndCalendarScreenProps {
  onNavigateHome?: () => void;
  onOpenSiteDetails?: (site: HeritageSite) => void;
}

export function MapsAndCalendarScreen({ onNavigateHome, onOpenSiteDetails }: MapsAndCalendarScreenProps) {
  // Read Google Maps API key exclusively from environment if configured
  const rawEnvKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const envGoogleMapsKey = isValidGoogleMapsKey(rawEnvKey) ? rawEnvKey.trim() : '';

  // Active map view: default to live API map (Satellite & Street Tiles), with State Cartography
  const [activeMode, setActiveMode] = useState<'live-api' | 'cartographic' | 'google'>(
    envGoogleMapsKey ? 'google' : 'live-api'
  );

  const [activeTypeFilter, setActiveTypeFilter] = useState<'All' | 'Cultural' | 'Natural'>('All');
  const [selectedSitePin, setSelectedSitePin] = useState<HeritageSite | null>(UNESCO_HERITAGE_SITES[3]); // Taj Mahal default
  const [selectedState, setSelectedState] = useState<IndiaState | null>(null);
  const [showStateNames, setShowStateNames] = useState<boolean>(true);

  const [isCalendarPulledUp, setIsCalendarPulledUp] = useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem | null>(INDIAN_FESTIVALS[0]);
  const [filterFestivalsByState, setFilterFestivalsByState] = useState<boolean>(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Sync state selection when site pin is clicked
  const handleSelectSite = (site: HeritageSite) => {
    setSelectedSitePin(site);
    if (site) {
      const matchState = findStateByName(site.state);
      if (matchState) {
        setSelectedState(matchState);
      }
    }
  };

  const displayedSites = useMemo(() => {
    return UNESCO_HERITAGE_SITES.filter(s => {
      const matchesType = activeTypeFilter === 'All' || s.type === activeTypeFilter;
      const matchesState = !selectedState || s.state.toLowerCase().includes(selectedState.name.toLowerCase());
      return matchesType && matchesState;
    });
  }, [activeTypeFilter, selectedState]);

  // Sites belonging to selected state (unfiltered by type)
  const stateSites = useMemo(() => {
    if (!selectedState) return [];
    return UNESCO_HERITAGE_SITES.filter(s => 
      s.state.toLowerCase().includes(selectedState.name.toLowerCase())
    );
  }, [selectedState]);

  const filteredFestivals = useMemo(() => {
    return INDIAN_FESTIVALS.filter(f => {
      const matchesSeason = selectedSeason === 'All' || f.season.toLowerCase().includes(selectedSeason.toLowerCase());
      if (!matchesSeason) return false;
      if (filterFestivalsByState && selectedState) {
        const query = selectedState.name.toLowerCase();
        return (
          f.region.toLowerCase().includes(query) ||
          f.heritageSpot.toLowerCase().includes(query) ||
          f.regionalName.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedSeason, filterFestivalsByState, selectedState]);

  const handlePullUpCalendar = () => {
    setIsCalendarPulledUp(prev => {
      const next = !prev;
      if (next && calendarRef.current) {
        setTimeout(() => {
          calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return next;
    });
  };

  return (
    <div className="w-full pb-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
      {/* Header */}
      <div className="border-b border-[#2D2A26]/15 pb-6">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-sans text-[#B05B3B] font-bold mb-2">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              type="button"
              className="hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Home</span>
            </button>
          )}
          {onNavigateHome && <span>/</span>}
          <span>Cartographic & Temporal Sanctuary</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mb-3">
          Interactive Map of India & Festival Calendar
        </h1>
        <p className="text-sm sm:text-base font-serif italic text-[#5A5A5A] max-w-3xl leading-relaxed">
          Explore all 28 Indian States & 8 Union Territories with verified state names, inspect 45 UNESCO World Heritage sites, and pull up the living festival calendar.
        </p>
      </div>

      {/* MAP SECTION: Interactive Map of India showing States & Location Pins */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-6">
        {/* Section Header with Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2D2A26]/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              <Globe className="w-3.5 h-3.5" />
              <span>Geographic Territory & Monument Explorer</span>
            </div>
            <h2 className="text-2xl font-serif text-[#2D2A26] mt-0.5">
              {activeMode === 'google' && envGoogleMapsKey ? 'Satellite & Vector Geospatial Map' : 'State Geographic Cartography & Heritage Map'}
            </h2>
            <p className="text-xs font-sans text-[#5A5A5A] mt-0.5">
              Featuring all 28 Indian States & Union Territories with state names, capitals, and 45 UNESCO sites.
            </p>
          </div>

          {/* Filter Pills & View Switcher */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
            <div className="flex items-center bg-[#FDFBF7] border border-[#2D2A26]/15 rounded p-0.5 mr-2">
              <button
                type="button"
                onClick={() => setActiveMode('live-api')}
                className={`px-3 py-1 rounded-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  activeMode === 'live-api' ? 'bg-[#B05B3B] text-white shadow-xs' : 'text-[#5A5A5A] hover:text-[#2D2A26]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Street, Terrain & Live Map</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('cartographic')}
                className={`px-3 py-1 rounded-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  activeMode === 'cartographic' ? 'bg-[#2D2A26] text-white shadow-xs' : 'text-[#5A5A5A] hover:text-[#2D2A26]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>State Cartography</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('google')}
                className={`px-3 py-1 rounded-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  activeMode === 'google' ? 'bg-[#2D2A26] text-white shadow-xs' : 'text-[#5A5A5A] hover:text-[#2D2A26]'
                }`}
              >
                <span>Google Maps</span>
              </button>
            </div>

            <span className="text-[#5A5A5A] uppercase tracking-wider font-bold">Category:</span>
            {(['All', 'Cultural', 'Natural'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveTypeFilter(type)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTypeFilter === type
                    ? 'bg-[#2D2A26] text-white'
                    : 'bg-[#FDFBF7] text-[#5A5A5A] border border-[#2D2A26]/15 hover:border-[#2D2A26]'
                }`}
              >
                {type} Sites
              </button>
            ))}

            {selectedState && (
              <button
                type="button"
                onClick={() => setSelectedState(null)}
                className="px-2.5 py-1 bg-[#B05B3B]/10 hover:bg-[#B05B3B] text-[#B05B3B] hover:text-white border border-[#B05B3B]/30 rounded text-xs transition-colors flex items-center space-x-1 cursor-pointer font-medium"
              >
                <span>Clear State: {selectedState.name}</span>
                <span className="text-sm font-bold">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Map Canvas and Interactive Pinned Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Map View Column */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            {activeMode === 'live-api' ? (
              <LiveApiMapView
                sites={displayedSites}
                selectedSite={selectedSitePin}
                onSelectSite={handleSelectSite}
                selectedState={selectedState}
                onSelectState={setSelectedState}
                onOpenSiteDetails={onOpenSiteDetails}
              />
            ) : activeMode === 'google' ? (
              <GoogleMapsView
                apiKey={rawEnvKey}
                sites={displayedSites}
                selectedSite={selectedSitePin}
                onSelectSite={handleSelectSite}
                selectedState={selectedState}
                onSelectState={setSelectedState}
                showStateNames={showStateNames}
                onToggleStateNames={setShowStateNames}
                onOpenSiteDetails={onOpenSiteDetails}
                onSwitchToCartographic={() => setActiveMode('live-api')}
              />
            ) : (
              <StateGeographicMap
                sites={displayedSites}
                selectedSite={selectedSitePin}
                onSelectSite={handleSelectSite}
                selectedState={selectedState}
                onSelectState={setSelectedState}
                showStateNames={showStateNames}
                onToggleStateNames={setShowStateNames}
              />
            )}
          </div>

          {/* Right Column: Selected State Dossier & Site Inspector */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {/* 1. Selected State Profile Card (if state selected) */}
            {selectedState && (
              <div className="bg-[#FAF7F0] border-2 border-[#B05B3B]/40 p-4 rounded-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-sans font-bold px-1.5 py-0.5 bg-[#B05B3B] text-white rounded">
                      {selectedState.region} India • State Code: {selectedState.shortCode}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#2D2A26] mt-1">
                      {selectedState.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    className="text-xs text-[#5A5A5A] hover:text-[#B05B3B] cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="p-2 bg-white rounded border border-[#2D2A26]/10">
                    <span className="text-[9px] uppercase text-[#5A5A5A] block">State Capital</span>
                    <strong className="text-[#2D2A26]">{selectedState.capital}</strong>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#2D2A26]/10">
                    <span className="text-[9px] uppercase text-[#5A5A5A] block">UNESCO Sites</span>
                    <strong className="text-[#B05B3B]">{stateSites.length} Monuments</strong>
                  </div>
                </div>

                <div className="text-xs font-sans text-[#4A453F] leading-relaxed">
                  <span className="font-bold text-[#2D2A26]">Cultural Identity: </span>
                  <em>{selectedState.famousFor}</em>
                </div>

                {stateSites.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#5A5A5A] block">
                      UNESCO Sites in {selectedState.name}:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stateSites.map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedSitePin(s)}
                          className={`text-[11px] px-2 py-1 rounded border font-sans cursor-pointer transition-colors ${
                            selectedSitePin?.id === s.id
                              ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                              : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#B05B3B]'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Selected Site Inspector Card */}
            {selectedSitePin ? (
              <div className="bg-[#FDFBF7] border border-[#2D2A26]/15 p-5 space-y-4 rounded-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 bg-[#B05B3B] text-white rounded">
                      #{selectedSitePin.id} • {selectedSitePin.type}
                    </span>
                    <span className="text-xs font-sans text-[#5A5A5A]">{selectedSitePin.year}</span>
                  </div>
                  <h3 className="text-xl font-serif italic text-[#2D2A26] mt-2">
                    {selectedSitePin.name}
                  </h3>
                  <div className="text-xs font-sans text-[#B05B3B] font-medium flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedSitePin.state}, India</span>
                  </div>
                </div>

                {/* Voice narration for selected site */}
                <AudioGuideBar
                  textToSpeak={`${selectedSitePin.name}, located in ${selectedSitePin.state}. ${selectedSitePin.shortNote} Address: ${selectedSitePin.address}`}
                  label={`Voice: ${selectedSitePin.name}`}
                  compact={true}
                />

                <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed">
                  {selectedSitePin.shortNote}
                </p>

                <div className="p-3 bg-white rounded border border-[#2D2A26]/10 text-xs font-sans space-y-1">
                  <div className="font-bold text-[#2D2A26] text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B05B3B]" />
                    <span>Address & Coordinates:</span>
                  </div>
                  <div className="text-[#5A5A5A]">
                    {selectedSitePin.address}
                  </div>
                  <div className="text-[10px] font-mono text-[#5A5A5A] pt-1">
                    Lat: {selectedSitePin.latitude.toFixed(4)}°, Lng: {selectedSitePin.longitude.toFixed(4)}°
                  </div>
                </div>

                {onOpenSiteDetails && (
                  <button
                    onClick={() => onOpenSiteDetails(selectedSitePin)}
                    type="button"
                    className="w-full py-2 bg-[#2D2A26] hover:bg-[#B05B3B] text-white text-xs uppercase tracking-wider font-sans font-bold transition-colors cursor-pointer rounded-xs"
                  >
                    Open Complete 45-Site Monograph
                  </button>
                )}
              </div>
            ) : (
              <div className="p-6 bg-[#FDFBF7] text-center border border-[#2D2A26]/10 text-xs font-sans text-[#5A5A5A] rounded-xs">
                Click any pin or state name on the map to inspect its cultural dossier.
              </div>
            )}

            {/* Quick switcher of Iconic Heritage Sites */}
            <div className="p-4 bg-white border border-[#2D2A26]/10 space-y-2 rounded-xs">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#5A5A5A]">
                Iconic Heritage Quick Select
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[4, 12, 1, 5, 23, 7, 34, 15, 21].map((id) => {
                  const s = UNESCO_HERITAGE_SITES.find(site => site.id === id);
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => handleSelectSite(s)}
                      className={`px-2 py-1 text-[11px] font-sans border rounded-xs transition-colors cursor-pointer ${
                        selectedSitePin?.id === id
                          ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                          : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#2D2A26]'
                      }`}
                    >
                      {s.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FESTIVAL CALENDER PULL-UP OPTION */}
      <section ref={calendarRef} className="space-y-4">
        {/* The Pull-Up Trigger Bar */}
        <div
          onClick={handlePullUpCalendar}
          className="group cursor-pointer bg-[#2D2A26] hover:bg-[#3D3833] text-white p-5 sm:p-6 transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none rounded-xs"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#B05B3B] flex items-center justify-center text-white flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#D4C3A3]">
                Expandable Temporal Sanctuary
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-white flex items-center gap-2">
                <span>Festival Calendar</span>
                <span className="text-xs font-sans not-italic px-2 py-0.5 rounded bg-white/10 uppercase tracking-widest">
                  {isCalendarPulledUp ? 'Active & Open' : 'Click / Pull Up'}
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-sans font-bold text-[#D4C3A3] group-hover:text-white transition-colors">
            <span>{isCalendarPulledUp ? 'Pull Down to Collapse' : 'Pull Up to Reveal Calendar'}</span>
            {isCalendarPulledUp ? (
              <ChevronDown className="w-4 h-4 animate-bounce" />
            ) : (
              <ChevronUp className="w-4 h-4 animate-bounce" />
            )}
          </div>
        </div>

        {/* The Pulled-Up Calendar Option View */}
        {isCalendarPulledUp && (
          <div className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-8 animate-fadeIn shadow-sm rounded-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#2D2A26]/10">
              <div>
                <h3 className="text-2xl font-serif text-[#2D2A26]">
                  The Living Cycles of Indian Heritage Celebrations
                </h3>
                <p className="text-xs font-sans text-[#5A5A5A] mt-1">
                  Pan-Indian and regional festivals coordinated with solar solstices, lunar cycles, and seasonal harvests across India's states.
                </p>
              </div>

              {/* Season & State Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
                {selectedState && (
                  <button
                    type="button"
                    onClick={() => setFilterFestivalsByState(!filterFestivalsByState)}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer border ${
                      filterFestivalsByState
                        ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                        : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#B05B3B]'
                    }`}
                  >
                    {filterFestivalsByState ? `Showing ${selectedState.name}` : `Filter by ${selectedState.name}`}
                  </button>
                )}

                <span className="text-[#5A5A5A] uppercase font-bold">Season:</span>
                {['All', 'Autumn', 'Spring', 'Winter', 'Harvest'].map((sn) => (
                  <button
                    key={sn}
                    type="button"
                    onClick={() => setSelectedSeason(sn)}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      selectedSeason === sn
                        ? 'bg-[#B05B3B] text-white'
                        : 'bg-[#FDFBF7] text-[#5A5A5A] border border-[#2D2A26]/10'
                    }`}
                  >
                    {sn}
                  </button>
                ))}
              </div>
            </div>

            {/* Festival Calendar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFestivals.map((fest) => {
                const isSelected = selectedFestival?.id === fest.id;
                return (
                  <div
                    key={fest.id}
                    onClick={() => setSelectedFestival(fest)}
                    className={`p-5 border transition-all cursor-pointer flex flex-col justify-between rounded-xs ${
                      isSelected
                        ? 'bg-[#FDFBF7] border-2 border-[#B05B3B] shadow-sm'
                        : 'bg-white border-[#2D2A26]/15 hover:border-[#2D2A26]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                          {fest.season}
                        </span>
                        <span className="text-[11px] font-sans text-[#5A5A5A] font-medium">
                          {fest.approxMonth}
                        </span>
                      </div>

                      <h4 className="text-xl font-serif italic text-[#2D2A26] mb-1">
                        {fest.name}
                      </h4>
                      <div className="text-[11px] font-sans text-[#5A5A5A] mb-3">
                        {fest.regionalName} • {fest.region}
                      </div>

                      <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-4">
                        {fest.description}
                      </p>

                      <div className="p-2.5 bg-[#FAF7F0] rounded-xs border border-[#2D2A26]/10 text-[11px] font-sans space-y-1 mb-3">
                        <div className="font-bold text-[#2D2A26]">Prime Heritage Spot:</div>
                        <div className="text-[#B05B3B] font-medium">{fest.heritageSpot}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#2D2A26]/10">
                      <AudioGuideBar
                        textToSpeak={`${fest.name}, also known as ${fest.regionalName}. Celebrated during ${fest.season} in ${fest.approxMonth}. ${fest.culturalSignificance} Key heritage spot to witness this is ${fest.heritageSpot}.`}
                        label={`Listen: ${fest.name}`}
                        compact={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
