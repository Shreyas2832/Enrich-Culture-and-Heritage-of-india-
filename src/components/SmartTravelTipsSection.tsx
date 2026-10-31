import { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  AlertCircle, 
  PhoneCall, 
  BookOpen, 
  CheckCircle2, 
  Globe, 
  Volume2, 
  VolumeX, 
  Info,
  MapPin
} from 'lucide-react';
import { speechManager } from '../utils/speech';

export interface SmartTravelTipsSectionProps {
  currentCheckpointName?: string;
}

interface GroundingSource {
  title: string;
  url: string;
}

interface TravelTipsData {
  destination: string;
  topic: string;
  adviceMarkdown: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  fetchedAt: string;
  isGrounded: boolean;
  status: 'live' | 'fallback' | 'error';
  errorMessage?: string;
}

const PRESET_DESTINATIONS = [
  'Varanasi Assi Ghat',
  'Sarnath Deer Park',
  'Chunar Fort',
  'Sasaram Tomb Complex',
  'Barabar Granite Caves',
  'Bodh Gaya Mahabodhi Temple',
];

const PRESET_TOPICS = [
  { id: 'all', label: 'Safety & Sacred Etiquette', query: 'overall solo safety, temple etiquette, and scams' },
  { id: 'scams', label: 'Scam Alerts & Night Transit', query: 'scam warnings, evening safety, and reliable transport' },
  { id: 'temple', label: 'Sacred Temple Dress & Protocol', query: 'temple dress code, photography rules, footwear and rituals' },
  { id: 'women', label: 'Solo Women Advisory', query: 'solo female travel safety, dedicated coaches, and precautions' },
  { id: 'transport', label: 'Auto & Rail Navigation', query: 'safe local transport, autorickshaws, and offline navigation' },
];

export function SmartTravelTipsSection({ currentCheckpointName }: SmartTravelTipsSectionProps) {
  const [selectedDestination, setSelectedDestination] = useState<string>(
    currentCheckpointName || PRESET_DESTINATIONS[0]
  );
  const [customDestination, setCustomDestination] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TravelTipsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Sync if currentCheckpointName changes from the route map
  useEffect(() => {
    if (currentCheckpointName) {
      const match = PRESET_DESTINATIONS.find(d => d.toLowerCase().includes(currentCheckpointName.toLowerCase()));
      if (match) {
        setSelectedDestination(match);
      } else {
        setSelectedDestination(currentCheckpointName);
      }
    }
  }, [currentCheckpointName]);

  const activeTopic = PRESET_TOPICS.find(t => t.id === selectedTopicId) || PRESET_TOPICS[0];

  const fetchTips = useCallback(async (destination: string, topicQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/travel-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          topic: topicQuery,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const json: TravelTipsData = await response.json();
      setData(json);
    } catch (err: any) {
      console.error('Failed to load travel tips:', err);
      setError(err?.message || 'Unable to fetch dynamic advice. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tips on initial load and when destination or topic changes
  useEffect(() => {
    fetchTips(selectedDestination, activeTopic.query);
  }, [selectedDestination, selectedTopicId, fetchTips, activeTopic.query]);

  // Audio speech handler
  const handleToggleNarration = () => {
    if (!data?.adviceMarkdown) return;

    if (isPlayingAudio) {
      speechManager.stop();
      setIsPlayingAudio(false);
    } else {
      // Clean up markdown markers for speech
      const spokenText = data.adviceMarkdown
        .replace(/#{1,6}\s*/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .slice(0, 700); // Read the core overview

      speechManager.speak(spokenText, 'en-IN');
      setIsPlayingAudio(true);
    }
  };

  // Sync audio status
  useEffect(() => {
    const unsubscribe = speechManager.subscribe((state) => {
      setIsPlayingAudio(state.isPlaying);
    });
    return () => unsubscribe();
  }, []);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDestination.trim()) {
      setSelectedDestination(customDestination.trim());
      setCustomDestination('');
    }
  };

  return (
    <section 
      id="smart-travel-tips-section" 
      className="bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-6 scroll-mt-6"
    >
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#2D2A26]/10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#B05B3B]" />
            <span>Search Grounded Intelligence</span>
            <span className="text-[#2D2A26]/20">•</span>
            <span className="flex items-center text-[10px] px-2 py-0.5 rounded bg-[#B05B3B]/10 text-[#B05B3B] font-semibold">
              <Globe className="w-3 h-3 mr-1" />
              Google Search Grounding
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
            Smart Travel Tips & Sacred Etiquette
          </h2>
          <p className="text-xs font-sans text-[#5A5A5A] mt-1 max-w-2xl leading-relaxed">
            Real-time verified safety protocols, sacred shrine codes, scam alerts, and regional advisories dynamically fetched with live web grounding for solo travelers.
          </p>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-2.5 flex-shrink-0">
          <button
            id="tips-audio-narration-btn"
            onClick={handleToggleNarration}
            type="button"
            disabled={!data?.adviceMarkdown || loading}
            title={isPlayingAudio ? "Stop reading tips" : "Listen to audio advice"}
            className={`px-3.5 py-2 border rounded text-xs font-sans flex items-center space-x-1.5 transition-colors cursor-pointer ${
              isPlayingAudio 
                ? 'bg-[#B05B3B] text-white border-[#B05B3B]' 
                : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#B05B3B]'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlayingAudio ? 'Stop Narration' : 'Listen Advice'}</span>
          </button>

          <button
            id="tips-refresh-btn"
            onClick={() => fetchTips(selectedDestination, activeTopic.query)}
            type="button"
            disabled={loading}
            className="px-3.5 py-2 bg-[#2D2A26] text-white hover:bg-[#B05B3B] transition-colors rounded text-xs font-sans flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Grounding...' : 'Refresh Advice'}</span>
          </button>
        </div>
      </div>

      {/* Destination Selector & Custom Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#5A5A5A] flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B05B3B]" />
            <span>Select Route Checkpoint or Search Any Indian Destination:</span>
          </div>
          {data?.fetchedAt && (
            <span className="text-[10px] font-sans text-[#5A5A5A]">
              Last verified: {new Date(data.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>

        {/* Quick Route Pills */}
        <div className="flex flex-wrap gap-2">
          {PRESET_DESTINATIONS.map((dest) => {
            const isSelected = selectedDestination.toLowerCase() === dest.toLowerCase();
            return (
              <button
                key={dest}
                type="button"
                onClick={() => setSelectedDestination(dest)}
                className={`px-3 py-1.5 text-xs font-sans rounded-xs border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#B05B3B] text-white border-[#B05B3B] font-medium shadow-xs'
                    : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/15 hover:border-[#2D2A26]/40'
                }`}
              >
                {dest}
              </button>
            );
          })}
        </div>

        {/* Custom Location Search Field */}
        <form onSubmit={handleCustomSubmit} className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A5A]" />
            <input
              type="text"
              value={customDestination}
              onChange={(e) => setCustomDestination(e.target.value)}
              placeholder="e.g. Hampi, Jaipur, Rishikesh, Madurai..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FDFBF7] border border-[#2D2A26]/20 rounded-xs text-[#2D2A26] focus:outline-hidden focus:border-[#B05B3B]"
            />
          </div>
          <button
            type="submit"
            disabled={!customDestination.trim()}
            className="px-3 py-1.5 bg-[#2D2A26] text-white text-xs font-sans rounded-xs hover:bg-[#B05B3B] transition-colors disabled:opacity-40 cursor-pointer"
          >
            Check Location
          </button>
        </form>
      </div>

      {/* Category / Topic Filters */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#2D2A26]/10">
        {PRESET_TOPICS.map((topic) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-2.5 py-1 text-[11px] font-sans rounded-full border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26] font-medium'
                  : 'bg-white text-[#5A5A5A] border-[#2D2A26]/10 hover:border-[#2D2A26]/30'
              }`}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      {/* Main Advice Display Container */}
      <div className="relative min-h-[260px] bg-[#FAF7F0] border border-[#2D2A26]/15 p-5 sm:p-6 rounded-xs">
        {loading && (
          <div className="absolute inset-0 bg-[#FAF7F0]/80 backdrop-blur-xs z-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#B05B3B] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-xs font-sans font-medium text-[#2D2A26] text-center">
              Fetching dynamic advice using Google Search Grounding for <span className="font-bold text-[#B05B3B]">{selectedDestination}</span>...
            </div>
            <div className="text-[11px] font-sans text-[#5A5A5A]">
              Checking latest advisories, temple protocols, and scam patterns
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-sans rounded-xs mb-4 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Error retrieving live intelligence</div>
              <p>{error}</p>
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Grounding Status Pill & Destination Highlight */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2D2A26]/10">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#2D2A26]">
                  Advisory Dossier:
                </span>
                <span className="text-sm font-serif italic font-bold text-[#B05B3B]">
                  {data.destination}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {data.isGrounded ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                    Web Search Grounded ({data.groundingSources.length} sources)
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                    <Info className="w-3 h-3 mr-1 text-amber-600" />
                    Heritage Safety Archive
                  </span>
                )}
              </div>
            </div>

            {/* Structured Advice Render */}
            <div className="prose prose-stone max-w-none text-xs font-sans leading-relaxed text-[#2D2A26]">
              {/* Parse headers and points for cleaner typographical hierarchy */}
              {data.adviceMarkdown.split('\n\n').map((paragraph, pIdx) => {
                // Main Section Headers
                if (paragraph.startsWith('###') || paragraph.startsWith('##')) {
                  const cleanHeading = paragraph.replace(/^#+\s*/, '');
                  return (
                    <h3 
                      key={pIdx} 
                      className="text-base sm:text-lg font-serif font-bold text-[#2D2A26] mt-4 mb-2 border-b border-[#2D2A26]/10 pb-1 flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#B05B3B]" />
                      <span>{cleanHeading}</span>
                    </h3>
                  );
                }

                // Sub-headers
                if (paragraph.startsWith('####')) {
                  const cleanHeading = paragraph.replace(/^#+\s*/, '');
                  return (
                    <h4 key={pIdx} className="text-xs uppercase tracking-wider font-bold text-[#B05B3B] mt-3 mb-1">
                      {cleanHeading}
                    </h4>
                  );
                }

                // Bullet Lists or Numbered Items
                if (paragraph.includes('\n- ') || paragraph.includes('\n* ') || /^\d+\.\s/.test(paragraph)) {
                  const lines = paragraph.split('\n');
                  return (
                    <ul key={pIdx} className="space-y-2 my-3 pl-1">
                      {lines.map((line, lIdx) => {
                        const cleanLine = line.replace(/^[\*\-\d\.]+\s*/, '');
                        if (!cleanLine.trim()) return null;

                        // Check if line starts with bold tag
                        const isBoldLead = cleanLine.includes('**');
                        return (
                          <li key={lIdx} className="flex items-start space-x-2 text-[#2D2A26]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B05B3B] mt-1.5 flex-shrink-0" />
                            <span 
                              className="text-xs leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2D2A26]">$1</strong>')
                              }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                // Regular Paragraph
                return (
                  <p 
                    key={pIdx} 
                    className="text-xs leading-relaxed text-[#4A453F] my-2"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#2D2A26]">$1</strong>')
                    }}
                  />
                );
              })}
            </div>

            {/* Verified Emergency Helplines Quick Access Bar */}
            <div className="bg-white border border-[#2D2A26]/10 p-4 rounded-xs">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B] flex items-center space-x-1.5 mb-2.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#B05B3B]" />
                <span>Verified Quick Emergency Contacts (India & Regional Corridor)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs">
                  <div className="text-[10px] uppercase text-[#5A5A5A]">National Emergency</div>
                  <a href="tel:112" className="text-base font-serif font-bold text-[#2D2A26] hover:text-[#B05B3B]">
                    112
                  </a>
                  <div className="text-[9px] text-[#5A5A5A]">Police, Fire, Medical</div>
                </div>

                <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs">
                  <div className="text-[10px] uppercase text-[#5A5A5A]">Tourist Helpline</div>
                  <a href="tel:1363" className="text-base font-serif font-bold text-[#B05B3B] hover:underline">
                    1363
                  </a>
                  <div className="text-[9px] text-[#5A5A5A]">24x7 Multi-lingual</div>
                </div>

                <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs">
                  <div className="text-[10px] uppercase text-[#5A5A5A]">Women In Distress</div>
                  <a href="tel:1090" className="text-base font-serif font-bold text-[#2D2A26] hover:text-[#B05B3B]">
                    1090 / 1091
                  </a>
                  <div className="text-[9px] text-[#5A5A5A]">Women Safety Helpline</div>
                </div>

                <div className="p-2.5 bg-[#FDFBF7] border border-[#2D2A26]/10 rounded-xs">
                  <div className="text-[10px] uppercase text-[#5A5A5A]">Railway Security</div>
                  <a href="tel:139" className="text-base font-serif font-bold text-[#2D2A26] hover:text-[#B05B3B]">
                    139
                  </a>
                  <div className="text-[9px] text-[#5A5A5A]">RPF Train Assistance</div>
                </div>
              </div>
            </div>

            {/* Google Search Grounding Sources & Search Query Breadcrumbs */}
            {data.groundingSources.length > 0 && (
              <div className="pt-4 border-t border-[#2D2A26]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#5A5A5A] flex items-center space-x-1.5">
                    <Globe className="w-3 h-3 text-[#B05B3B]" />
                    <span>Search Grounding Web Citations & Verification Sources:</span>
                  </span>
                  <span className="text-[10px] font-sans text-[#5A5A5A]">
                    {data.groundingSources.length} Verified Sources
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.groundingSources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-[#2D2A26]/15 hover:border-[#B05B3B] rounded-xs text-[11px] font-sans text-[#2D2A26] hover:text-[#B05B3B] transition-colors"
                    >
                      <span className="truncate max-w-[200px] sm:max-w-[260px]">{source.title}</span>
                      <ExternalLink className="w-3 h-3 text-[#5A5A5A] flex-shrink-0" />
                    </a>
                  ))}
                </div>

                {data.searchQueries && data.searchQueries.length > 0 && (
                  <div className="text-[10px] font-sans text-[#5A5A5A]/80 pt-1 flex items-center flex-wrap gap-1">
                    <span>Search queries executed:</span>
                    {data.searchQueries.map((q, qIdx) => (
                      <span key={qIdx} className="bg-black/5 px-1.5 py-0.5 rounded text-[9px] italic">
                        "{q}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
