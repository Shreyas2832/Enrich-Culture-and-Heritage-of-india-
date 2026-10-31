import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeritageSite } from '../data/heritageSites';
import { INDIA_STATES, IndiaState } from '../data/indiaStates';
import { 
  Layers, 
  MapPin, 
  Volume2, 
  ExternalLink, 
  Compass, 
  Navigation, 
  Locate, 
  LocateFixed, 
  Sparkles, 
  AlertCircle,
  X,
  Footprints,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { speechManager } from '../utils/speech';
import { findNearbyHeritageSites, NearbyHeritageSite } from '../utils/geoUtils';

interface LiveApiMapViewProps {
  sites: HeritageSite[];
  selectedSite: HeritageSite | null;
  onSelectSite: (site: HeritageSite) => void;
  selectedState: IndiaState | null;
  onSelectState: (state: IndiaState | null) => void;
  onOpenSiteDetails?: (site: HeritageSite) => void;
}

type TileLayerType = 'street' | 'terrain' | 'satellite' | 'heritage';

interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
}

export function LiveApiMapView({
  sites,
  selectedSite,
  onSelectSite,
  selectedState,
  onSelectState,
  onOpenSiteDetails,
}: LiveApiMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userLocationLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLayer, setActiveLayer] = useState<TileLayerType>('street');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showNearbyDrawer, setShowNearbyDrawer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Compute nearby sites if live location is available
  const nearbySites: NearbyHeritageSite[] = useMemo(() => {
    if (!userLocation) return [];
    return findNearbyHeritageSites(userLocation.lat, userLocation.lng, sites, 6);
  }, [userLocation, sites]);

  // Nearest site to current user
  const nearestSite = nearbySites.length > 0 ? nearbySites[0] : null;

  // Initialize Leaflet Map centered on India
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center of India with optimal initial zoom
    const map = L.map(mapContainerRef.current, {
      center: [22.9734, 78.6569],
      zoom: 5,
      minZoom: 3,
      maxZoom: 19,
      zoomControl: false, // We provide high-contrast custom controls
    });

    // High-visibility crisp OpenStreetMap Street layer
    const initialTile = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    tileLayerRef.current = initialTile;
    markersLayerRef.current = L.layerGroup().addTo(map);
    userLocationLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Invalidate size once container settles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when user switches style
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = '';
    let attribution = '';
    let maxZoom = 19;
    let subdomains: string | string[] = 'abc';

    if (activeLayer === 'terrain') {
      // Crisp OpenTopoMap with elevation and mountain relief
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = 'Map data: &copy; OpenStreetMap contributors, SRTM | Style: &copy; OpenTopoMap';
      maxZoom = 17;
    } else if (activeLayer === 'satellite') {
      // High-resolution Esri World Imagery
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; Esri, Maxar, Earthstar Geographics & the GIS User Community';
      maxZoom = 18;
    } else if (activeLayer === 'heritage') {
      // CARTO Voyager parchment style
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; CARTO & OpenStreetMap';
      maxZoom = 19;
    } else {
      // Standard High-Contrast OpenStreetMap Street
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
      maxZoom = 19;
    }

    const newTileLayer = L.tileLayer(url, {
      attribution,
      maxZoom,
      subdomains,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
    map.invalidateSize();
  }, [activeLayer]);

  // Request user's live geolocation
  const handleRequestLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude, accuracy } = position.coords;
        const coords: UserLocation = { lat: latitude, lng: longitude, accuracy };
        setUserLocation(coords);
        setShowNearbyDrawer(true);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 12, { animate: true });
          setTimeout(() => {
            mapInstanceRef.current?.invalidateSize();
          }, 200);
        }
      },
      (error) => {
        setIsLocating(false);
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please allow location access in your browser.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'The request to get your location timed out.';
        }
        setLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Render User Location Pulse & Accuracy Circle
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocationLayerRef.current) return;
    const userGroup = userLocationLayerRef.current;
    userGroup.clearLayers();

    if (!userLocation) return;

    // High visibility blue accuracy perimeter
    if (userLocation.accuracy) {
      const accuracyCircle = L.circle([userLocation.lat, userLocation.lng], {
        radius: Math.min(userLocation.accuracy, 2500),
        color: '#2563EB',
        fillColor: '#3B82F6',
        fillOpacity: 0.2,
        weight: 2,
      });
      userGroup.addLayer(accuracyCircle);
    }

    // High-contrast pulsing user beacon
    const userIcon = L.divIcon({
      className: 'user-live-location-beacon',
      html: `
        <div style="
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            position: absolute;
            inset: -8px;
            border-radius: 9999px;
            background-color: rgba(37, 99, 235, 0.45);
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            width: 20px;
            height: 20px;
            background-color: #1D4ED8;
            border: 3.5px solid #FFFFFF;
            border-radius: 9999px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 6px; height: 6px; background-color: #FFFFFF; border-radius: 9999px;"></div>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 });
    
    // Popup on user marker
    userMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; padding: 4px; min-width: 170px;">
        <div style="display: flex; align-items: center; gap: 5px; color: #1D4ED8; font-weight: 700; font-size: 13px;">
          <span>📍 Your Current Position</span>
        </div>
        <p style="margin: 6px 0 0 0; color: #4B5563; font-size: 11px;">
          <strong>Lat:</strong> ${userLocation.lat.toFixed(4)}°<br/>
          <strong>Lng:</strong> ${userLocation.lng.toFixed(4)}°
        </p>
        ${nearestSite ? `
          <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #E5E7EB; font-size: 11px;">
            <span style="color: #9A3412; font-weight: 700;">Nearest Site:</span><br/>
            <strong>${nearestSite.site.name}</strong> (${nearestSite.distanceKm} km away)
          </div>
        ` : ''}
      </div>
    `);

    userGroup.addLayer(userMarker);
  }, [userLocation, nearestSite]);

  // Update Markers for Heritage Sites with high-visibility styling and labels
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    sites.forEach((site) => {
      const isSelected = selectedSite?.id === site.id;
      const isCultural = site.type === 'Cultural';

      // Enhanced high-contrast styling so pins pop clearly against any terrain or satellite backdrop
      const pinColor = isSelected ? '#C2410C' : isCultural ? '#1E293B' : '#047857';
      const pinBorder = isSelected ? '#FFFFFF' : '#FFFFFF';
      const pinSize = isSelected ? 36 : 28;

      const customIcon = L.divIcon({
        className: 'custom-heritage-marker',
        html: `
          <div style="
            position: relative;
            width: ${pinSize}px;
            height: ${pinSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));
          ">
            ${isSelected ? `<div style="
              position: absolute;
              inset: -8px;
              border-radius: 9999px;
              border: 3px solid #EA580C;
              animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
              opacity: 0.85;
            "></div>` : ''}
            <div style="
              width: ${pinSize}px;
              height: ${pinSize}px;
              background-color: ${pinColor};
              border: 2.5px solid ${pinBorder};
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: transform 0.2s ease;
            ">
              <div style="
                transform: rotate(45deg);
                width: ${isSelected ? '10px' : '8px'};
                height: ${isSelected ? '10px' : '8px'};
                background-color: ${isSelected ? '#FEF08A' : '#FFFFFF'};
                border-radius: 9999px;
              "></div>
            </div>
          </div>
        `,
        iconSize: [pinSize, pinSize],
        iconAnchor: [pinSize / 2, pinSize],
        popupAnchor: [0, -pinSize],
      });

      const marker = L.marker([site.latitude, site.longitude], { icon: customIcon });

      // Add tooltip showing the site name clearly on hover
      marker.bindTooltip(`
        <div style="font-weight: 700; font-size: 11px; color: #1E293B; white-space: nowrap;">
          ${site.name}
        </div>
      `, {
        direction: 'top',
        offset: [0, -pinSize],
        opacity: 0.95,
      });

      // Build rich Popup HTML
      const popupContent = document.createElement('div');
      popupContent.className = 'font-sans text-xs max-w-[250px] p-1';
      popupContent.innerHTML = `
        <div style="overflow: hidden; border-radius: 6px; margin-bottom: 8px; border: 1px solid rgba(0,0,0,0.1);">
          <img 
            src="${site.image}" 
            alt="${site.name}" 
            style="width: 100%; height: 115px; object-fit: cover; display: block;"
            onerror="this.src='https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600'"
          />
        </div>
        <div style="font-weight: 800; font-size: 14px; color: #1E293B; line-height: 1.25; margin-bottom: 4px;">
          ${site.name}
        </div>
        <div style="font-size: 11px; color: #4B5563; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
          <span>📍 ${site.state}</span>
          <span>•</span>
          <span style="font-weight: 700; color: ${isCultural ? '#1E293B' : '#047857'};">${site.type}</span>
          <span>(${site.year})</span>
        </div>
        <div style="font-size: 11px; color: #4B5563; line-height: 1.45; margin-bottom: 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${site.significance}
        </div>
        <div style="display: flex; gap: 6px; margin-top: 6px;">
          <button id="popup-audio-btn-${site.id}" style="
            flex: 1;
            padding: 6px 10px;
            background: #C2410C;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
          ">
            <span>🔊 Audio Guide</span>
          </button>
          <button id="popup-detail-btn-${site.id}" style="
            padding: 6px 12px;
            background: #1E293B;
            color: #FFFFFF;
            border: none;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
          ">
            Details →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 270 });

      marker.on('click', () => {
        onSelectSite(site);
      });

      marker.on('popupopen', () => {
        const audioBtn = document.getElementById(`popup-audio-btn-${site.id}`);
        const detailBtn = document.getElementById(`popup-detail-btn-${site.id}`);

        if (audioBtn) {
          audioBtn.onclick = () => {
            speechManager.speak(
              `${site.name}, located in ${site.state}. UNESCO designation ${site.year}. ${site.description}`
            );
          };
        }

        if (detailBtn && onOpenSiteDetails) {
          detailBtn.onclick = () => {
            onOpenSiteDetails(site);
          };
        }
      });

      marker.addTo(markersGroup);
    });
  }, [sites, selectedSite, onSelectSite, onOpenSiteDetails]);

  // Pan to selected site when selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedSite) return;
    mapInstanceRef.current.panTo([selectedSite.latitude, selectedSite.longitude], {
      animate: true,
      duration: 0.8,
    });
  }, [selectedSite]);

  // Pan to selected state center if chosen
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedState) return;
    mapInstanceRef.current.setView([selectedState.lat, selectedState.lng], 7, {
      animate: true,
    });
  }, [selectedState]);

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([22.9734, 78.6569], 5, { animate: true });
    onSelectState(null);
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleFlyToUser = () => {
    if (!userLocation || !mapInstanceRef.current) {
      handleRequestLiveLocation();
      return;
    }
    mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
  };

  const handleFlyToSite = (site: HeritageSite) => {
    onSelectSite(site);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([site.latitude, site.longitude], 13, { animate: true });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);
  };

  return (
    <div className={`w-full flex flex-col space-y-3 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#FDFBF7] p-4' : ''}`}>
      {/* Map Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FDFBF7] border border-[#2D2A26]/15 rounded-lg text-xs font-sans shadow-2xs">
        {/* Layer Switcher with clear badges */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 font-bold text-[#2D2A26] uppercase tracking-wider text-[11px] whitespace-nowrap">
            <Layers className="w-4 h-4 text-[#B05B3B]" />
            <span>Map Style:</span>
          </div>
          <div className="flex items-center bg-white border border-[#2D2A26]/20 rounded-md p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveLayer('street')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'street' 
                  ? 'bg-[#2D2A26] text-white shadow-xs' 
                  : 'text-[#5A5A5A] hover:text-[#2D2A26] hover:bg-black/5'
              }`}
            >
              🗺️ Street
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('terrain')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'terrain' 
                  ? 'bg-[#1B6B47] text-white shadow-xs' 
                  : 'text-[#5A5A5A] hover:text-[#2D2A26] hover:bg-black/5'
              }`}
            >
              ⛰️ Terrain
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('satellite')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'satellite' 
                  ? 'bg-[#B05B3B] text-white shadow-xs' 
                  : 'text-[#5A5A5A] hover:text-[#2D2A26] hover:bg-black/5'
              }`}
            >
              🛰️ Satellite
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('heritage')}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'heritage' 
                  ? 'bg-[#854D0E] text-white shadow-xs' 
                  : 'text-[#5A5A5A] hover:text-[#2D2A26] hover:bg-black/5'
              }`}
            >
              📜 Parchment
            </button>
          </div>
        </div>

        {/* Action Controls & Live Location Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={userLocation ? handleFlyToUser : handleRequestLiveLocation}
            disabled={isLocating}
            className={`px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-all ${
              userLocation
                ? 'bg-blue-600 hover:bg-blue-700 text-white ring-2 ring-blue-300'
                : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-400 font-semibold'
            }`}
          >
            {userLocation ? (
              <LocateFixed className="w-4 h-4 text-white animate-pulse" />
            ) : (
              <Locate className={`w-4 h-4 text-blue-600 ${isLocating ? 'animate-spin' : ''}`} />
            )}
            <span>
              {isLocating
                ? 'Detecting GPS...'
                : userLocation
                ? 'My Location (Active)'
                : 'Enable Live Location'}
            </span>
          </button>

          {userLocation && (
            <button
              type="button"
              onClick={() => setShowNearbyDrawer((prev) => !prev)}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400 rounded-md text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-800" />
              <span>Nearby Sites ({nearbySites.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleResetView}
            className="px-3 py-1.5 bg-white hover:bg-[#FAF7F0] text-[#2D2A26] border border-[#2D2A26]/20 rounded-md text-xs font-medium flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#B05B3B]" />
            <span>Center India</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 bg-white hover:bg-[#FAF7F0] text-[#2D2A26] border border-[#2D2A26]/20 rounded-md cursor-pointer transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Geolocation Warning / Error Banner */}
      {locationError && (
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-md text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{locationError}</span>
          </div>
          <button
            type="button"
            onClick={() => setLocationError(null)}
            className="text-amber-800 hover:text-amber-950 font-bold ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Leaflet Map Stage */}
      <div className={`relative w-full rounded-xl border border-[#2D2A26]/20 overflow-hidden shadow-sm ${isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[560px]'}`}>
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Custom High-Contrast Zoom Controls */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col bg-white border border-[#2D2A26]/20 rounded-lg shadow-md overflow-hidden">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 hover:bg-[#FAF7F0] text-[#2D2A26] border-b border-[#2D2A26]/10 cursor-pointer transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 hover:bg-[#FAF7F0] text-[#2D2A26] cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Nearby Sites Floating Panel (Shown when live location is active) */}
        {userLocation && showNearbyDrawer && nearbySites.length > 0 && (
          <div className="absolute top-4 left-4 z-[400] max-w-xs w-80 bg-white/95 backdrop-blur-md rounded-xl border border-[#2D2A26]/25 shadow-2xl overflow-hidden text-xs font-sans animate-in fade-in slide-in-from-top-2">
            <div className="px-3.5 py-2.5 bg-[#2D2A26] text-white flex items-center justify-between">
              <div className="flex items-center space-x-1.5 font-bold text-xs">
                <Footprints className="w-4 h-4 text-amber-400" />
                <span>Nearby Heritage Sites to You</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNearbyDrawer(false)}
                className="text-white/70 hover:text-white cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 space-y-2 max-h-72 overflow-y-auto">
              {nearbySites.map(({ site, distanceKm }, idx) => (
                <div
                  key={site.id}
                  onClick={() => handleFlyToSite(site)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    selectedSite?.id === site.id
                      ? 'bg-amber-50 border-amber-400 shadow-xs'
                      : 'bg-white hover:bg-[#FAF7F0] border-[#2D2A26]/15'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[#2D2A26] text-xs truncate flex items-center gap-1.5">
                      {idx === 0 && (
                        <span className="px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] rounded font-mono font-bold">
                          Nearest
                        </span>
                      )}
                      <span className="truncate">{site.name}</span>
                    </div>
                    <div className="text-[11px] text-[#5A5A5A] truncate mt-0.5">
                      📍 {site.state} • <span className="font-semibold text-[#2D2A26]">{site.type}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-[#B05B3B] text-xs">
                      {distanceKm < 10 ? `${distanceKm} km` : `${Math.round(distanceKm)} km`}
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 hover:underline">Fly to →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Legend Overlay with high legibility */}
        <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-[#2D2A26]/20 shadow-lg text-[11px] font-sans space-y-1.5 max-w-[220px]">
          <div className="font-bold text-[#2D2A26] uppercase tracking-wider text-[10px] border-b border-[#2D2A26]/10 pb-1">
            Map Legend ({sites.length} Sites)
          </div>
          {userLocation && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></span>
              <span className="text-blue-800 font-bold">Your Live Position</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#1E293B] border border-white"></span>
            <span className="text-[#2D2A26] font-medium">Cultural Heritage</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#047857] border border-white"></span>
            <span className="text-[#2D2A26] font-medium">Natural Reserve</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#C2410C] border border-white"></span>
            <span className="text-[#2D2A26] font-medium">Selected Location</span>
          </div>
        </div>
      </div>

      {/* State Quick Navigation Strip */}
      <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/15 rounded-lg flex items-center space-x-2 overflow-x-auto text-xs font-sans">
        <span className="font-bold text-[#5A5A5A] whitespace-nowrap uppercase tracking-wider text-[10px]">
          Fly to State:
        </span>
        {INDIA_STATES.slice(0, 16).map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => onSelectState(st)}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer border text-[11px] font-medium ${
              selectedState?.id === st.id
                ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                : 'bg-white text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#B05B3B]'
            }`}
          >
            {st.name}
          </button>
        ))}
      </div>
    </div>
  );
}
