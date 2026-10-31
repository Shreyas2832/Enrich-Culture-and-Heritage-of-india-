import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { HeritageSite } from '../data/heritageSites';
import { INDIA_STATES, IndiaState } from '../data/indiaStates';
import { 
  Sparkles, 
  MapPin, 
  Layers, 
  Eye, 
  EyeOff, 
  RotateCcw, 
  Volume2, 
  ExternalLink,
  Landmark,
  Compass
} from 'lucide-react';
import { speechManager } from '../utils/speech';
import { isValidGoogleMapsKey } from '../utils/mapUtils';

interface GoogleMapsViewProps {
  apiKey: string;
  sites: HeritageSite[];
  selectedSite: HeritageSite | null;
  onSelectSite: (site: HeritageSite) => void;
  selectedState: IndiaState | null;
  onSelectState: (state: IndiaState | null) => void;
  showStateNames: boolean;
  onToggleStateNames: (val: boolean) => void;
  onOpenSiteDetails?: (site: HeritageSite) => void;
  onError?: (errorMessage: string) => void;
  onSwitchToCartographic?: () => void;
}

// Controller component to smoothly pan/zoom to selected site or state
function MapViewController({
  selectedSite,
  selectedState,
}: {
  selectedSite: HeritageSite | null;
  selectedState: IndiaState | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (selectedSite) {
      map.panTo({ lat: selectedSite.latitude, lng: selectedSite.longitude });
      map.setZoom(8);
    } else if (selectedState) {
      map.panTo({ lat: selectedState.lat, lng: selectedState.lng });
      map.setZoom(6);
    }
  }, [map, selectedSite, selectedState]);

  return null;
}

export function GoogleMapsView({
  apiKey,
  sites,
  selectedSite,
  onSelectSite,
  selectedState,
  onSelectState,
  showStateNames,
  onToggleStateNames,
  onOpenSiteDetails,
  onError,
  onSwitchToCartographic,
}: GoogleMapsViewProps) {
  const [activeSiteInfo, setActiveSiteInfo] = useState<HeritageSite | null>(selectedSite);
  const [activeStateInfo, setActiveStateInfo] = useState<IndiaState | null>(null);
  const [mapType, setMapType] = useState<google.maps.MapTypeId | 'roadmap' | 'satellite' | 'terrain' | 'hybrid'>('roadmap');

  // Intercept Google Maps API authentication notices without breaking UI
  useEffect(() => {
    const prevAuthFailure = (window as any).gm_authFailure;
    (window as any).gm_authFailure = () => {
      console.warn('Google Maps authentication notice.');
      if (typeof prevAuthFailure === 'function') {
        try {
          prevAuthFailure();
        } catch {}
      }
    };

    return () => {
      (window as any).gm_authFailure = prevAuthFailure;
    };
  }, []);

  // Sync active site info when parent selection changes
  useEffect(() => {
    if (selectedSite) {
      setActiveSiteInfo(selectedSite);
      setActiveStateInfo(null);
    }
  }, [selectedSite]);

  const handleResetView = useCallback((mapInstance?: google.maps.Map | null) => {
    if (mapInstance) {
      mapInstance.panTo({ lat: 22.9734, lng: 78.6569 });
      mapInstance.setZoom(5);
    }
    onSelectSite(null as any);
    onSelectState(null);
    setActiveSiteInfo(null);
    setActiveStateInfo(null);
  }, [onSelectSite, onSelectState]);

  // If the key is not available, invalid, or blocked, display a helpful diagnostic card
  if (!isValidGoogleMapsKey(apiKey)) {
    return (
      <div className="w-full h-full min-h-[540px] flex flex-col items-center justify-center bg-[#FAF7F0] p-6 text-center border border-[#2D2A26]/15 rounded-lg space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
          <Layers className="w-6 h-6" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="font-serif text-xl font-bold text-[#2D2A26]">Google Maps Key Notice</h3>
          <p className="text-xs text-[#5A5A5A] leading-relaxed">
            A Google Maps Platform API key (starts with <code className="bg-black/5 px-1 py-0.5 rounded font-mono text-[11px]">AIzaSy...</code>) with the <strong>Maps JavaScript API</strong> enabled is required for Google Maps. Antigravity or Gemini AI Studio keys (<code className="bg-black/5 px-1 py-0.5 rounded font-mono text-[11px]">AQ....</code>) cannot authenticate on Google Maps JS.
          </p>
          <div className="p-3 bg-white border border-emerald-300 rounded-md text-emerald-900 text-xs text-left">
            <strong className="block text-emerald-800 font-bold mb-1">Recommended Solution:</strong>
            Use the built-in <strong>Street, Terrain & Live Map</strong> — it requires zero API keys, provides high-resolution street, terrain, and satellite layers, and supports live GPS location tracking.
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onSwitchToCartographic && (
            <button
              type="button"
              onClick={onSwitchToCartographic}
              className="px-4 py-2 bg-[#B05B3B] hover:bg-[#8f452a] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-white" />
              <span>Switch to Active Map Views</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[540px] relative rounded overflow-hidden flex flex-col">
      <APIProvider
        apiKey={apiKey}
        onError={(err) => {
          console.warn('Google Maps APIProvider error:', err);
          if (onError) {
            onError('Google Maps failed to load tiles (InvalidKeyMapError).');
          }
        }}
      >
        {/* Top Floating Controls Bar */}
        <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Map Style Switcher */}
          <div className="bg-white/95 backdrop-blur shadow-md rounded-xs border border-[#2D2A26]/15 p-1 flex items-center space-x-1 pointer-events-auto text-xs font-sans">
            {(['roadmap', 'satellite', 'terrain'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setMapType(type)}
                className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-bold transition-colors cursor-pointer ${
                  mapType === type
                    ? 'bg-[#B05B3B] text-white'
                    : 'text-[#5A5A5A] hover:bg-[#FDFBF7] hover:text-[#2D2A26]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Layer Controls */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              type="button"
              onClick={() => onToggleStateNames(!showStateNames)}
              className={`px-3 py-1.5 rounded-xs text-xs font-sans font-medium border shadow-md flex items-center space-x-1.5 transition-colors cursor-pointer ${
                showStateNames
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                  : 'bg-white/95 text-[#2D2A26] border-[#2D2A26]/20 hover:bg-white'
              }`}
            >
              {showStateNames ? <Eye className="w-3.5 h-3.5 text-[#D4C3A3]" /> : <EyeOff className="w-3.5 h-3.5 text-[#5A5A5A]" />}
              <span>{showStateNames ? 'Hide State Names' : 'Show State Names'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleResetView()}
              title="Reset India Center View"
              className="px-2.5 py-1.5 bg-white/95 hover:bg-white text-[#2D2A26] border border-[#2D2A26]/20 shadow-md rounded-xs text-xs font-sans flex items-center space-x-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B05B3B]" />
              <span className="hidden sm:inline">Reset Center</span>
            </button>
          </div>
        </div>

        {/* Google Map Canvas */}
        <Map
          defaultCenter={{ lat: 22.9734, lng: 78.6569 }}
          defaultZoom={5}
          mapId="DEMO_MAP_ID"
          mapTypeId={mapType}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '540px' }}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        >
          <MapViewController selectedSite={selectedSite} selectedState={selectedState} />

          {/* 1. STATE NAMES & CENTERS LAYER */}
          {showStateNames &&
            INDIA_STATES.map((state) => {
              const isSelected = selectedState?.id === state.id;
              return (
                <AdvancedMarker
                  key={`state-${state.id}`}
                  position={{ lat: state.lat, lng: state.lng }}
                  onClick={() => {
                    onSelectState(state);
                    setActiveStateInfo(state);
                    setActiveSiteInfo(null);
                  }}
                  title={`${state.name} (${state.unescoSitesCount} UNESCO Sites)`}
                >
                  <div
                    className={`px-2 py-0.5 rounded shadow-md border text-[11px] font-sans font-bold flex items-center space-x-1 whitespace-nowrap cursor-pointer transition-transform hover:scale-110 ${
                      isSelected
                        ? 'bg-[#B05B3B] text-white border-white ring-2 ring-[#B05B3B]'
                        : 'bg-white/90 text-[#2D2A26] border-[#2D2A26]/30 hover:bg-[#2D2A26] hover:text-white'
                    }`}
                  >
                    <Landmark className="w-2.5 h-2.5 text-[#B05B3B] flex-shrink-0" />
                    <span>{state.name}</span>
                    {state.unescoSitesCount > 0 && (
                      <span className="text-[9px] px-1 rounded bg-[#B05B3B]/20 text-[#B05B3B] font-mono">
                        {state.unescoSitesCount}
                      </span>
                    )}
                  </div>
                </AdvancedMarker>
              );
            })}

          {/* 2. UNESCO HERITAGE SITES ADVANCED MARKERS */}
          {sites.map((site) => {
            const isSelected = selectedSite?.id === site.id;
            const isCultural = site.type === 'Cultural';
            const isNatural = site.type === 'Natural';

            return (
              <AdvancedMarker
                key={`site-${site.id}`}
                position={{ lat: site.latitude, lng: site.longitude }}
                onClick={() => {
                  onSelectSite(site);
                  setActiveSiteInfo(site);
                  setActiveStateInfo(null);
                }}
                title={`${site.name} — ${site.location}`}
              >
                <Pin
                  background={isSelected ? '#B05B3B' : isCultural ? '#2D2A26' : isNatural ? '#1B6B47' : '#8A5B2D'}
                  borderColor="#FFFFFF"
                  glyphColor="#FFFFFF"
                  scale={isSelected ? 1.3 : 1.0}
                />
              </AdvancedMarker>
            );
          })}

          {/* 3. SITE INFOWINDOW */}
          {activeSiteInfo && (
            <InfoWindow
              position={{ lat: activeSiteInfo.latitude, lng: activeSiteInfo.longitude }}
              onCloseClick={() => setActiveSiteInfo(null)}
              maxWidth={320}
            >
              <div className="p-1 space-y-2 font-sans text-[#2D2A26]">
                <div className="relative rounded overflow-hidden h-28 w-full bg-[#FAF7F0]">
                  <img
                    src={activeSiteInfo.image}
                    alt={activeSiteInfo.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-[#2D2A26]/90 text-white text-[9px] uppercase px-1.5 py-0.5 rounded font-bold">
                    {activeSiteInfo.type} Site • {activeSiteInfo.year}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-serif font-bold text-[#2D2A26] leading-tight">
                    {activeSiteInfo.name}
                  </h3>
                  <div className="text-[11px] text-[#5A5A5A] flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#B05B3B] flex-shrink-0" />
                    <span className="truncate">{activeSiteInfo.state}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#4A453F] line-clamp-2 leading-relaxed">
                  {activeSiteInfo.shortNote}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-[#2D2A26]/10">
                  <button
                    type="button"
                    onClick={() => speechManager.speak(`${activeSiteInfo.name}. ${activeSiteInfo.shortNote}`, 'en-IN')}
                    className="text-[10px] text-[#B05B3B] font-bold flex items-center space-x-1 hover:underline cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Pronounce</span>
                  </button>

                  {onOpenSiteDetails && (
                    <button
                      type="button"
                      onClick={() => onOpenSiteDetails(activeSiteInfo)}
                      className="px-2 py-1 bg-[#2D2A26] text-white text-[10px] font-bold rounded-xs hover:bg-[#B05B3B] transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Explore Dossier</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}

          {/* 4. STATE INFOWINDOW */}
          {activeStateInfo && (
            <InfoWindow
              position={{ lat: activeStateInfo.lat, lng: activeStateInfo.lng }}
              onCloseClick={() => setActiveStateInfo(null)}
              maxWidth={300}
            >
              <div className="p-1 space-y-2 font-sans text-[#2D2A26]">
                <div className="border-b border-[#2D2A26]/10 pb-1.5">
                  <div className="text-[9px] uppercase tracking-wider text-[#B05B3B] font-bold">
                    {activeStateInfo.region} India
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#2D2A26]">
                    {activeStateInfo.name}
                  </h3>
                  <div className="text-[11px] text-[#5A5A5A]">
                    Capital: <strong className="text-[#2D2A26]">{activeStateInfo.capital}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-[#4A453F]">
                  <div className="font-semibold text-[#2D2A26] mb-0.5">Renowned Cultural Heritage:</div>
                  <p className="leading-relaxed italic">{activeStateInfo.famousFor}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#2D2A26]/10 text-[10px]">
                  <span className="font-bold text-[#B05B3B]">
                    {activeStateInfo.unescoSitesCount} UNESCO Monument{activeStateInfo.unescoSitesCount === 1 ? '' : 's'}
                  </span>
                  <span className="text-[#5A5A5A]">Code: {activeStateInfo.shortCode}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
