import { useState, useEffect, useRef } from 'react';
import { 
  AlertOctagon, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Share2, 
  Copy, 
  Check, 
  ShieldAlert, 
  ShieldCheck, 
  HeartHandshake, 
  User, 
  ExternalLink, 
  Compass, 
  Radio, 
  Info,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SosScreenProps {
  onNavigateHome: () => void;
}

export function SosScreen({ onNavigateHome }: SosScreenProps) {
  const { user, isLoggedIn } = useAuth();

  // Audio Siren State via Web Audio API
  const [isSirenActive, setIsSirenActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  // Geolocation State
  const [location, setLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  // Emergency Contacts state
  const [customContactName, setCustomContactName] = useState(user?.emergencyContactName || 'Family Contact');
  const [customContactPhone, setCustomContactPhone] = useState(user?.emergencyContactPhone || '+91 98200 99999');
  const [isEditingContact, setIsEditingContact] = useState(false);

  // Fetch Geolocation on load
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: parseFloat(pos.coords.latitude.toFixed(6)),
          lng: parseFloat(pos.coords.longitude.toFixed(6)),
          accuracy: Math.round(pos.coords.accuracy),
        });
        setIsLocating(false);
      },
      (err) => {
        setLocationError(`Location unavailable: ${err.message}. Using default monument region.`);
        // Fallback default coordinates (e.g. New Delhi India Gate / central point)
        setLocation({ lat: 28.6129, lng: 77.2295, accuracy: 25 });
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  useEffect(() => {
    fetchLocation();
    return () => {
      stopSiren();
    };
  }, []);

  // Web Audio Siren Generator
  const startSiren = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setIsSirenActive(true);

      // Alternating two-tone siren modulation
      let highTone = false;
      sirenIntervalRef.current = window.setInterval(() => {
        if (!oscillatorRef.current || !audioCtxRef.current) return;
        const targetFreq = highTone ? 800 : 1100;
        oscillatorRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.08);
        highTone = !highTone;
      }, 350);
    } catch (e) {
      console.error('Audio siren could not start', e);
    }
  };

  const stopSiren = () => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch {}
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
    setIsSirenActive(false);
  };

  const toggleSiren = () => {
    if (isSirenActive) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  // Copy GPS coords
  const handleCopyCoords = () => {
    if (!location) return;
    const text = `${location.lat}, ${location.lng} (Accuracy: ~${location.accuracy}m)`;
    navigator.clipboard.writeText(text);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  // Emergency Share Dispatch
  const googleMapsUrl = location ? `https://maps.google.com/?q=${location.lat},${location.lng}` : 'https://maps.google.com';
  const emergencyMessage = `EMERGENCY ALERT: I am travelling in India and require urgent assistance! My current location is: ${googleMapsUrl}${location ? ` (Lat: ${location.lat}, Lng: ${location.lng})` : ''}. Sent via Heritec SOS.`;

  const emergencyHelplines = [
    {
      number: '112',
      title: 'National Emergency Helpline',
      desc: 'Pan-India 24/7 Police, Fire, and Emergency Response',
      badge: 'Immediate Response',
      color: 'bg-red-600 hover:bg-red-700 text-white',
    },
    {
      number: '1363',
      title: 'Incredible India Tourist Helpline',
      desc: 'Ministry of Tourism • 24/7 Multi-Lingual (12 Languages)',
      badge: 'Tourist Support',
      color: 'bg-[#B05B3B] hover:bg-[#96472A] text-white',
    },
    {
      number: '1091',
      title: 'Women Distress & Safety Helpline',
      desc: 'National Commission for Women • 24/7 Rapid Assistance',
      badge: 'Women Safety',
      color: 'bg-rose-700 hover:bg-rose-800 text-white',
    },
    {
      number: '108',
      title: 'Medical Ambulance & First Aid',
      desc: 'Government Emergency Medical Disaster Dispatch',
      badge: 'Medical',
      color: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    },
    {
      number: '139',
      title: 'Railway Protection Force (RPF)',
      desc: 'Indian Railways Security & Onboard Passenger Distress',
      badge: 'Transit',
      color: 'bg-slate-800 hover:bg-slate-900 text-white',
    },
    {
      number: '1077',
      title: 'Disaster Calamity Relief',
      desc: 'District Disaster Management (Floods, Landslides, Extreme Weather)',
      badge: 'Disaster',
      color: 'bg-amber-700 hover:bg-amber-800 text-white',
    },
  ];

  return (
    <div className="w-full pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8 font-sans">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          type="button"
          className="text-[#B05B3B] hover:text-[#2D2A26] flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 text-xs font-bold uppercase tracking-widest animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          <span>Emergency SOS Active Portal</span>
        </div>
      </div>

      {/* Main Red Alert Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle background radar circles */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-white/5 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4" />
              <span>Traveller Emergency Response System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              SOS Emergency Assistance
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-sans">
              Instant access to Indian national helplines, Ministry of Tourism support, live GPS coordinates dispatch, and audible distress sirens for immediate intervention across all heritage territories.
            </p>
          </div>

          {/* Piercing Emergency Siren Button */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <button
              type="button"
              onClick={toggleSiren}
              className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xl ${
                isSirenActive
                  ? 'bg-white text-red-600 border-white animate-bounce ring-8 ring-white/40'
                  : 'bg-black/30 hover:bg-black/40 text-white border-white/60 hover:scale-105'
              }`}
            >
              {isSirenActive ? (
                <>
                  <VolumeX className="w-8 h-8 mb-1" />
                  <span className="text-[11px] font-black uppercase tracking-wider">Stop Siren</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-8 h-8 mb-1" />
                  <span className="text-[11px] font-black uppercase tracking-wider">Sound Siren</span>
                  <span className="text-[9px] opacity-80">Loud Alarm</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-white/80 mt-2 uppercase tracking-wider font-semibold">
              {isSirenActive ? 'Siren Blaring (Two-tone)' : 'Click for High-decibel Alarm'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 1. Live GPS Beacon & 2. Emergency Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Location & Quick Dispatch (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live GPS Coordinates Card */}
          <div className="bg-white border-2 border-red-600/30 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
              <div className="flex items-center space-x-2 text-red-600">
                <MapPin className="w-5 h-5" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#2D2A26]">
                  Live GPS Beacon
                </h3>
              </div>
              <button
                type="button"
                onClick={fetchLocation}
                disabled={isLocating}
                className="text-[11px] text-[#B05B3B] hover:underline font-semibold cursor-pointer"
              >
                {isLocating ? 'Locating...' : 'Refresh GPS'}
              </button>
            </div>

            {location ? (
              <div className="space-y-3">
                <div className="bg-[#FDFBF7] p-3 rounded border border-[#2D2A26]/10 space-y-1 text-xs">
                  <div className="flex justify-between text-[#5A5A5A]">
                    <span>Latitude:</span>
                    <span className="font-mono font-bold text-[#2D2A26]">{location.lat}° N</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A5A]">
                    <span>Longitude:</span>
                    <span className="font-mono font-bold text-[#2D2A26]">{location.lng}° E</span>
                  </div>
                  <div className="flex justify-between text-[#5A5A5A]">
                    <span>Accuracy:</span>
                    <span className="font-semibold text-emerald-700">~{location.accuracy} meters</span>
                  </div>
                </div>

                {/* Copy and Dispatch Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    className="py-2 px-3 bg-[#FAF7F0] hover:bg-white text-[#2D2A26] border border-[#2D2A26]/20 rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedCoords ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#5A5A5A]" />
                        <span>Copy Coordinates</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(emergencyMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp SOS</span>
                  </a>
                </div>

                <a
                  href={`sms:?body=${encodeURIComponent(emergencyMessage)}`}
                  className="w-full py-2 px-3 bg-[#2D2A26] hover:bg-black text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Send Emergency SMS Broadcast</span>
                </a>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#5A5A5A]">
                {locationError || 'Acquiring high-precision satellite telemetry...'}
              </div>
            )}
          </div>

          {/* Personal Emergency Contact Card */}
          <div className="bg-white border border-[#2D2A26]/15 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#2D2A26]/10 pb-3">
              <div className="flex items-center space-x-2 text-[#2D2A26]">
                <User className="w-4 h-4 text-[#B05B3B]" />
                <h3 className="font-bold text-xs uppercase tracking-wider">
                  Personal Emergency Contact
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingContact(!isEditingContact)}
                className="text-[10px] text-[#B05B3B] hover:underline font-semibold cursor-pointer"
              >
                {isEditingContact ? 'Done' : 'Edit'}
              </button>
            </div>

            {isEditingContact ? (
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  value={customContactName}
                  onChange={(e) => setCustomContactName(e.target.value)}
                  placeholder="Contact Name (e.g. Guardian / Friend)"
                  className="w-full p-2 bg-[#FDFBF7] border border-[#2D2A26]/20 rounded text-xs"
                />
                <input
                  type="tel"
                  value={customContactPhone}
                  onChange={(e) => setCustomContactPhone(e.target.value)}
                  placeholder="Phone Number (+91...)"
                  className="w-full p-2 bg-[#FDFBF7] border border-[#2D2A26]/20 rounded text-xs"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[#FDFBF7] p-3 rounded border border-[#2D2A26]/10">
                <div>
                  <div className="font-bold text-xs text-[#2D2A26]">{customContactName}</div>
                  <div className="text-[11px] text-[#5A5A5A] font-mono">{customContactPhone}</div>
                </div>
                <a
                  href={`tel:${customContactPhone}`}
                  className="py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            )}
            <p className="text-[10px] text-[#5A5A5A] leading-tight">
              {isLoggedIn
                ? `Synced with explorer account (${user?.name}).`
                : 'Pro tip: Log in to permanently sync your designated guardian contact.'}
            </p>
          </div>

          {/* ASI Monument Security Information */}
          <div className="bg-[#FAF7F0] border border-[#2D2A26]/15 rounded-lg p-4 text-xs space-y-2">
            <div className="font-bold text-[#2D2A26] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#1B6B47]" />
              <span>ASI & Tourist Police Presence</span>
            </div>
            <p className="text-[#5A5A5A] leading-relaxed text-[11px]">
              Major UNESCO sites (such as the Taj Mahal, Hampi, Qutb Complex, and Ajanta Caves) maintain dedicated on-site <strong>Tourist Police Desks</strong> and CISF / ASI security pavilions at monument entry gates.
            </p>
          </div>
        </div>

        {/* Right Column: Emergency Helpline Direct Dials (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-[#2D2A26] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span>Direct Emergency Helplines (Pan-India Toll-Free)</span>
            </h2>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A5A]">
              1-Click Call
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {emergencyHelplines.map((item) => (
              <div
                key={item.number}
                className="bg-white border border-[#2D2A26]/15 hover:border-red-600/40 rounded-lg p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#2D2A26]/5 text-[#2D2A26]">
                      {item.badge}
                    </span>
                    <span className="text-xl font-mono font-black text-red-600">
                      {item.number}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#2D2A26] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#5A5A5A] mt-1 leading-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#2D2A26]/10">
                  <a
                    href={`tel:${item.number}`}
                    className={`flex-1 py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${item.color}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call {item.number}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(item.number);
                    }}
                    title="Copy Number"
                    className="p-2 bg-[#FDFBF7] hover:bg-[#FAF7F0] border border-[#2D2A26]/20 rounded text-[#5A5A5A] cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Offline Safety Instructions */}
          <div className="bg-white border border-[#2D2A26]/15 rounded-lg p-5 space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#2D2A26] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#B05B3B]" />
              <span>Critical Field Safety Protocols for Heritage Travellers</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5A5A5A]">
              <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded space-y-1">
                <div className="font-bold text-[#2D2A26]">1. Lost in Massive Forts / Ruins</div>
                <p>Stay along designated ASI walking stone pathways. Keep mobile data off to conserve battery and climb to higher stone bastions where cell tower signal is strongest.</p>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded space-y-1">
                <div className="font-bold text-[#2D2A26]">2. Medical Heat Exhaustion</div>
                <p>Monuments in Rajasthan and Deccan plateau reach 42°C+. Immediately seek shaded temple pillared mandapas, consume oral rehydration solution (ORS), and dial 108.</p>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded space-y-1">
                <div className="font-bold text-[#2D2A26]">3. Harassment or Unofficial Touts</div>
                <p>Do not engage. Look for government-approved badges with holograms. Reach out to the ASI ticket counter or dial 1363 (Tourist Police).</p>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded space-y-1">
                <div className="font-bold text-[#2D2A26]">4. Emergency Siren Usage</div>
                <p>In isolated trails or during medical distress, trigger the piercing siren above. Sound travels through stone corridors and alerts nearby CISF personnel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
