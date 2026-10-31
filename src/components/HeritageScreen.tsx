import { useState, useEffect } from 'react';
import { Landmark, Search, Filter, Volume2, MapPin, ArrowRight, ArrowLeft, Calendar, Tag, Info, Award, Lightbulb, Sparkles, CheckCircle2, Maximize2, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { UNESCO_HERITAGE_SITES, HeritageSite } from '../data/heritageSites';
import { AudioGuideBar } from './AudioGuideBar';
import { SUPPORTED_LANGUAGES, getHeritageNarration } from '../utils/heritageTranslations';

interface HeritageScreenProps {
  initialSiteId?: number;
  onNavigateHome?: () => void;
}

export function HeritageScreen({ initialSiteId, onNavigateHome }: HeritageScreenProps) {
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(initialSiteId || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'All' | 'Cultural' | 'Natural' | 'Mixed'>('All');
  const [filterState, setFilterState] = useState<string>('All');
  const [activeDetailLanguage, setActiveDetailLanguage] = useState<string>('en-IN');
  
  // Image gallery and lightbox state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  const selectedSite = UNESCO_HERITAGE_SITES.find(s => s.id === selectedSiteId);

  // Compute available perspectives/images for selected site
  const siteImages = selectedSite ? (() => {
    const list: Array<{ url: string; caption: string; label: string }> = [
      { 
        url: selectedSite.image, 
        caption: selectedSite.imageCaption || `Principal view of ${selectedSite.name}`, 
        label: "Primary View" 
      }
    ];
    if (selectedSite.gallery) {
      selectedSite.gallery.forEach((g) => {
        if (g.url !== selectedSite.image) {
          list.push({
            url: g.url,
            caption: g.caption,
            label: `Perspective ${list.length + 1}`
          });
        }
      });
    }
    return list;
  })() : [];

  // Reset image index when selected site changes
  useEffect(() => {
    setActiveImageIndex(0);
    setLightboxZoom(1);
    setIsLightboxOpen(false);
  }, [selectedSiteId]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && siteImages.length > 1) {
        setActiveImageIndex(prev => (prev + 1) % siteImages.length);
      } else if (e.key === 'ArrowLeft' && siteImages.length > 1) {
        setActiveImageIndex(prev => (prev - 1 + siteImages.length) % siteImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, siteImages.length]);

  // Stats calculation
  const totalCount = UNESCO_HERITAGE_SITES.length; // 45
  const culturalCount = UNESCO_HERITAGE_SITES.filter(s => s.type === 'Cultural').length; // 34
  const naturalCount = UNESCO_HERITAGE_SITES.filter(s => s.type === 'Natural').length; // 10
  const mixedCount = UNESCO_HERITAGE_SITES.filter(s => s.type === 'Mixed').length; // 1

  // Extract unique states for dropdown
  const statesList = Array.from(new Set(UNESCO_HERITAGE_SITES.map(s => s.state))).sort();

  // Filtered sites
  const filteredSites = UNESCO_HERITAGE_SITES.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.shortNote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || site.type === filterType;
    const matchesState = filterState === 'All' || site.state === filterState;
    return matchesSearch && matchesType && matchesState;
  });

  // Current localized translation for selected site
  const localizedData = selectedSite ? getHeritageNarration(selectedSite, activeDetailLanguage) : null;

  return (
    <div className="w-full pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
      {/* 1. Header & Navigation */}
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
          <span>UNESCO World Heritage Bureau of India</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mb-3">
          Heritage of India
        </h1>
        <p className="text-sm sm:text-base font-serif italic text-[#5A5A5A] max-w-3xl">
          Complete official registry of all 45 UNESCO World Heritage sites in India. Every site includes high-definition photography, verified locations, in-depth monographs, interesting facts, and multi-language spoken narration in 10 major Indian languages.
        </p>
      </div>

      {/* 2. CENSUS COLUMN: Total Sites & Breakdown (Cultural, Natural, Mixed) */}
      <section className="bg-white border border-[#2D2A26]/15 p-6 shadow-xs">
        <div className="text-[10px] uppercase font-sans tracking-[0.25em] font-bold text-[#B05B3B] mb-3">
          UNESCO Inscription Breakdown Columns
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Column 1: Total Sites */}
          <div 
            onClick={() => setFilterType('All')}
            className={`p-4 border transition-all cursor-pointer ${
              filterType === 'All' 
                ? 'bg-[#2D2A26] text-white border-[#2D2A26]' 
                : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#2D2A26]'
            }`}
          >
            <div className="text-[10px] uppercase font-sans tracking-widest opacity-70">
              Total Inscribed Sites
            </div>
            <div className="text-4xl font-serif italic my-1">
              {totalCount}
            </div>
            <div className="text-xs font-sans font-medium opacity-90">
              Pan-India Heritage
            </div>
          </div>

          {/* Column 2: Cultural Sites */}
          <div 
            onClick={() => setFilterType('Cultural')}
            className={`p-4 border transition-all cursor-pointer ${
              filterType === 'Cultural' 
                ? 'bg-[#B05B3B] text-white border-[#B05B3B]' 
                : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#B05B3B]'
            }`}
          >
            <div className="text-[10px] uppercase font-sans tracking-widest opacity-70">
              Cultural Sanctuaries
            </div>
            <div className="text-4xl font-serif italic my-1">
              {culturalCount}
            </div>
            <div className="text-xs font-sans font-medium opacity-90">
              Monuments & Architecture
            </div>
          </div>

          {/* Column 3: Natural Sites */}
          <div 
            onClick={() => setFilterType('Natural')}
            className={`p-4 border transition-all cursor-pointer ${
              filterType === 'Natural' 
                ? 'bg-[#1B6B47] text-white border-[#1B6B47]' 
                : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#1B6B47]'
            }`}
          >
            <div className="text-[10px] uppercase font-sans tracking-widest opacity-70">
              Natural Preserves
            </div>
            <div className="text-4xl font-serif italic my-1">
              {naturalCount}
            </div>
            <div className="text-xs font-sans font-medium opacity-90">
              Parks & Biospheres
            </div>
          </div>

          {/* Column 4: Mixed Sites */}
          <div 
            onClick={() => setFilterType('Mixed')}
            className={`p-4 border transition-all cursor-pointer ${
              filterType === 'Mixed' 
                ? 'bg-[#8F5A26] text-white border-[#8F5A26]' 
                : 'bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#8F5A26]'
            }`}
          >
            <div className="text-[10px] uppercase font-sans tracking-widest opacity-70">
              Mixed World Heritage
            </div>
            <div className="text-4xl font-serif italic my-1">
              {mixedCount}
            </div>
            <div className="text-xs font-sans font-medium opacity-90">
              Khangchendzonga Peak
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED HERITAGE SITE DETAIL VIEW (When clicked) */}
      {selectedSite ? (
        <section 
          id={`site-detail-${selectedSite.id}`}
          className="bg-white border-2 border-[#B05B3B] rounded-2xl p-6 sm:p-10 space-y-8 animate-fadeIn shadow-lg relative overflow-hidden"
        >
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2D2A26]/10">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold px-2.5 py-1 bg-[#B05B3B] text-white rounded-md">
                UNESCO Site #{selectedSite.id < 10 ? `0${selectedSite.id}` : selectedSite.id}
              </span>
              <span className="text-xs font-sans text-[#5A5A5A]">
                Comprehensive Heritage Dossier
              </span>
            </div>

            <button
              onClick={() => setSelectedSiteId(null)}
              type="button"
              className="px-3.5 py-1.5 bg-[#2D2A26] hover:bg-[#B05B3B] text-white text-xs uppercase tracking-wider font-sans font-bold rounded-md transition-colors cursor-pointer flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to 45 Sites Catalog</span>
            </button>
          </div>

          {/* EXACT REQUESTED LAYOUT:
              [HERITAGE IMAGE]
              Heritage Site Name
              Location | Country
              UNESCO Inscription Year
              Type: Cultural / Natural / Mixed
              About the Site
              Historical & Cultural Significance
              Interesting Facts
          */}

          {/* 1. [HERITAGE IMAGE] - Must appear ABOVE the site's information, with rounded corners & visually attractive styling */}
          {(() => {
            const currentImg = siteImages[activeImageIndex] || siteImages[0] || { url: selectedSite.image, caption: selectedSite.imageCaption || selectedSite.name, label: 'Primary Façade' };
            return (
              <div className="space-y-3">
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#2D2A26]/15 group bg-[#2D2A26]/5 cursor-pointer"
                >
                  <img
                    src={currentImg.url}
                    alt={`${selectedSite.name} - ${currentImg.caption}`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to local verified site image
                      e.currentTarget.src = `/images/heritage/site-${selectedSite.id}.jpg`;
                    }}
                    className="w-full h-72 sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Gradient Overlay for Text Legibility and Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none"></div>

                  {/* Top Badges & Lightbox trigger */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-[11px] uppercase tracking-wider font-sans font-bold px-3 py-1 rounded-full text-white shadow-sm backdrop-blur-md ${
                        selectedSite.type === 'Cultural'
                          ? 'bg-[#B05B3B]/90'
                          : selectedSite.type === 'Natural'
                          ? 'bg-[#1B6B47]/90'
                          : 'bg-[#8F5A26]/90'
                      }`}>
                        {selectedSite.type} Heritage
                      </span>
                      <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                        Inscribed {selectedSite.year}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 backdrop-blur-md">
                        <Camera className="w-3 h-3 text-emerald-400" />
                        <span>Verified UNESCO Archive</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      type="button"
                      className="px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white text-xs font-sans font-semibold rounded-lg backdrop-blur-md border border-white/20 transition-all flex items-center space-x-1.5 shadow-lg group-hover:scale-105 cursor-pointer"
                      title="Inspect High-Definition Photo in Fullscreen Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#E6AF2E]" />
                      <span className="hidden sm:inline">Inspect High-Res</span>
                    </button>
                  </div>

                  {/* Bottom Text Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <p className="text-xs font-sans tracking-wide text-white/80 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B05B3B]" />
                        <span>{selectedSite.location} | {selectedSite.country}</span>
                      </p>
                      <h3 className="text-xl sm:text-3xl font-serif font-bold text-white drop-shadow-sm mt-0.5">
                        {selectedSite.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-sans tracking-wider text-white/80 bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm self-start sm:self-auto border border-white/10">
                      Archaeological Survey of India & UNESCO Monograph
                    </span>
                  </div>
                </div>

                {/* Perspective Switcher & Image Caption Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 text-xs">
                  <div className="flex items-start sm:items-center gap-2 text-[#4A453F]">
                    <Camera className="w-4 h-4 text-[#B05B3B] shrink-0 mt-0.5 sm:mt-0" />
                    <span className="font-serif italic text-sm text-[#2D2A26]">
                      {currentImg.caption}
                    </span>
                  </div>

                  {siteImages.length > 1 && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#5A5A5A] mr-1">
                        Perspectives ({siteImages.length}):
                      </span>
                      {siteImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                            activeImageIndex === idx
                              ? 'bg-[#B05B3B] text-white shadow-xs'
                              : 'bg-white border border-[#2D2A26]/15 text-[#4A453F] hover:bg-[#2D2A26]/5'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* AUDIO LANGUAGE UPDATE: Clearly Visible Language Selector near the audio/play button */}
          <div className="bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10 p-1">
            <AudioGuideBar
              site={selectedSite}
              label={`Official Voice Guide: ${selectedSite.name}`}
              defaultLanguage={activeDetailLanguage}
              onLanguageChange={(newLang) => setActiveDetailLanguage(newLang)}
            />
          </div>

          {/* 2. Heritage Site Name, Location | Country, UNESCO Inscription Year, Type */}
          <div className="space-y-3 pb-6 border-b border-[#2D2A26]/10">
            {/* Heritage Site Name */}
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] tracking-tight">
              {localizedData?.title || selectedSite.name}
            </h2>

            {/* Location | Country */}
            <div className="text-sm sm:text-base font-sans font-medium text-[#5A5A5A] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B05B3B] shrink-0" />
              <span className="font-semibold text-[#2D2A26]">
                {selectedSite.location} | {selectedSite.country}
              </span>
            </div>

            {/* UNESCO Inscription Year and Type */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans pt-1">
              <div className="inline-flex items-center space-x-1 text-[#2D2A26]">
                <Calendar className="w-3.5 h-3.5 text-[#B05B3B]" />
                <span><strong>UNESCO Inscription Year:</strong> {selectedSite.year}</span>
              </div>
              <span className="text-[#2D2A26]/30">•</span>
              <div className="inline-flex items-center space-x-1 text-[#2D2A26]">
                <Tag className="w-3.5 h-3.5 text-[#B05B3B]" />
                <span><strong>Type:</strong> {selectedSite.type}</span>
              </div>
              <span className="text-[#2D2A26]/30">•</span>
              <div className="inline-flex items-center space-x-1 text-[#5A5A5A]">
                <Award className="w-3.5 h-3.5 text-[#B05B3B]" />
                <span>State of {selectedSite.state}</span>
              </div>
            </div>
          </div>

          {/* 3. About the Site */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#B05B3B]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D2A26]">
                {activeDetailLanguage === 'hi-IN' 
                  ? 'स्थल के बारे में' 
                  : activeDetailLanguage === 'mr-IN'
                  ? 'या वारसा स्थळाबद्दल सविस्तर माहिती'
                  : activeDetailLanguage === 'ml-IN'
                  ? 'ഈ പൈതൃക കേന്ദ്രത്തെക്കുറിച്ച്'
                  : activeDetailLanguage === 'ta-IN'
                  ? 'இத்தலத்தைப் பற்றி'
                  : activeDetailLanguage === 'te-IN'
                  ? 'ఈ చారిత్రక ప్రదేశం గురించి'
                  : activeDetailLanguage === 'kn-IN'
                  ? 'ಈ ತಾಣದ ಬಗ್ಗೆ ವಿವರಣೆ'
                  : activeDetailLanguage === 'bn-IN'
                  ? 'এই স্থান সম্পর্কে বিস্তারিত'
                  : 'About the Site'}
              </h3>
            </div>
            <p className="text-base sm:text-lg font-serif text-[#4A453F] leading-relaxed">
              {localizedData?.aboutText || selectedSite.description}
            </p>
          </div>

          {/* 4. Historical & Cultural Significance */}
          <div className="space-y-3 p-5 sm:p-6 bg-[#FAF8F5] rounded-xl border border-[#2D2A26]/10">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-[#B05B3B]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D2A26]">
                {activeDetailLanguage === 'hi-IN' 
                  ? 'ऐतिहासिक और सांस्कृतिक महत्व' 
                  : activeDetailLanguage === 'mr-IN'
                  ? 'ऐतिहासिक आणि सांस्कृतिक महत्त्व'
                  : activeDetailLanguage === 'ml-IN'
                  ? 'ചരിത്രപരവും സാംസ്കാരികവുമായ പ്രാധാന്യം'
                  : activeDetailLanguage === 'ta-IN'
                  ? 'வரலாற்று மற்றும் கலாச்சார முக்கியத்துவம்'
                  : activeDetailLanguage === 'te-IN'
                  ? 'చారిత్రక మరియు సాంస్కృతిక విశిష్టత'
                  : activeDetailLanguage === 'kn-IN'
                  ? 'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ'
                  : activeDetailLanguage === 'bn-IN'
                  ? 'ঐতিহাসিক ও সাংস্কৃতিক গুরুত্ব'
                  : 'Historical & Cultural Significance'}
              </h3>
            </div>
            <p className="text-sm sm:text-base font-serif italic text-[#2D2A26] leading-relaxed">
              "{localizedData?.significanceText || selectedSite.significance}"
            </p>
          </div>

          {/* 5. Interesting Facts - Presented in an easy-to-read format */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-[#B05B3B]" />
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2D2A26]">
                {activeDetailLanguage === 'hi-IN' 
                  ? 'रोचक तथ्य और विशेषताएं' 
                  : activeDetailLanguage === 'mr-IN'
                  ? 'रोचक तथ्ये आणि वैशिष्ट्ये'
                  : activeDetailLanguage === 'ml-IN'
                  ? 'രസകരമായ വസ്തുതകളും സവിശേഷതകളും'
                  : activeDetailLanguage === 'ta-IN'
                  ? 'சுவாரஸ்யமான உண்மைகள் மற்றும் சிறப்புகள்'
                  : activeDetailLanguage === 'te-IN'
                  ? 'ఆసక్తికరమైన వాస్తవాలు మరియు విశేషాలు'
                  : activeDetailLanguage === 'kn-IN'
                  ? 'ಕುತೂಹಲಕಾರಿ ಸಂಗತಿಗಳು ಮತ್ತು ವಿಶೇಷತೆಗಳು'
                  : activeDetailLanguage === 'bn-IN'
                  ? 'আকর্ষণীয় তথ্য ও বৈশিষ্ট্য'
                  : 'Interesting Facts'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(localizedData?.factsList || selectedSite.facts).map((fact, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white rounded-xl border border-[#2D2A26]/15 hover:border-[#B05B3B] transition-colors shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#B05B3B]/10 text-[#B05B3B] text-xs font-bold font-sans flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#B05B3B]">
                      {activeDetailLanguage === 'hi-IN' || activeDetailLanguage === 'mr-IN' 
                        ? `तथ्य #${index + 1}` 
                        : activeDetailLanguage === 'ml-IN'
                        ? `വസ്തുത #${index + 1}`
                        : activeDetailLanguage === 'ta-IN'
                        ? `உண்மை #${index + 1}`
                        : activeDetailLanguage === 'te-IN'
                        ? `వాస్తవం #${index + 1}`
                        : activeDetailLanguage === 'kn-IN'
                        ? `ಸಂಗತಿ #${index + 1}`
                        : activeDetailLanguage === 'bn-IN'
                        ? `তথ্য #${index + 1}`
                        : `Fact #${index + 1}`}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#4A453F] leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Official ASI Verified Address & Geographic Coordinates */}
          <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#2D2A26]/10 space-y-1">
            <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Official Archaeological Survey of India (ASI) Verified Address</span>
            </div>
            <div className="text-sm font-sans font-medium text-[#2D2A26]">
              {selectedSite.address}
            </div>
            <div className="text-[11px] font-sans text-[#5A5A5A]">
              Coordinates: {selectedSite.latitude.toFixed(4)}° N, {selectedSite.longitude.toFixed(4)}° E
            </div>
          </div>
        </section>
      ) : null}

      {/* 4. Search and Filter Bar for the 45 Columns */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#2D2A26]/10">
          <div>
            <h3 className="text-2xl font-serif text-[#2D2A26]">
              All 45 UNESCO World Heritage Columns
            </h3>
            <p className="text-xs font-sans text-[#5A5A5A]">
              Showing {filteredSites.length} of {UNESCO_HERITAGE_SITES.length} sites. Each site card features high-quality imagery, complete details, and multilingual voice guide.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#5A5A5A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by site, location, or state..."
              className="w-full pl-9 pr-3 py-2 text-xs font-sans bg-white border border-[#2D2A26]/20 rounded-md focus:outline-none focus:border-[#B05B3B]"
            />
          </div>
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-[11px] font-sans">
          <span className="text-[#5A5A5A] uppercase tracking-wider font-bold whitespace-nowrap">Filter State:</span>
          <button
            onClick={() => setFilterState('All')}
            className={`px-3 py-1 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
              filterState === 'All' ? 'bg-[#2D2A26] text-white font-bold' : 'bg-white text-[#5A5A5A] border border-[#2D2A26]/10 hover:border-[#2D2A26]'
            }`}
          >
            All States ({totalCount})
          </button>
          {statesList.map(st => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`px-3 py-1 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                filterState === st ? 'bg-[#B05B3B] text-white font-bold' : 'bg-white text-[#5A5A5A] border border-[#2D2A26]/10 hover:border-[#B05B3B]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* 5. 45 HERITAGE SITE CARDS - Structured with image on top, rounded corners, spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              onClick={() => {
                setSelectedSiteId(site.id);
                // Scroll smoothly to detail view
                const el = document.getElementById(`site-detail-${site.id}`) || document.querySelector('section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white border border-[#2D2A26]/15 hover:border-[#2D2A26] transition-all rounded-xl overflow-hidden group cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* [HERITAGE IMAGE] - Placed ABOVE site information with rounded corners */}
                <div className="relative w-full h-48 overflow-hidden bg-[#2D2A26]/5">
                  <img
                    src={site.image}
                    alt={site.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `/images/heritage/site-${site.id}.jpg`;
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className={`text-[9px] uppercase tracking-widest font-sans font-bold px-2 py-0.5 rounded-full text-white shadow-2xs backdrop-blur-sm ${
                      site.type === 'Cultural'
                        ? 'bg-[#B05B3B]/90'
                        : site.type === 'Natural'
                        ? 'bg-[#1B6B47]/90'
                        : 'bg-[#8F5A26]/90'
                    }`}>
                      #{site.id < 10 ? `0${site.id}` : site.id} • {site.type}
                    </span>

                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                      {site.year}
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Location */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between">
                    <p className="text-[11px] font-sans font-medium text-white/90 drop-shadow-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B05B3B]" />
                      <span>{site.location}</span>
                    </p>
                    <span className="text-[9px] font-sans font-medium bg-black/50 text-white/90 px-1.5 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5 text-[#E6AF2E]" />
                      <span>Archive Photo</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Below Image */}
                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="text-xl font-serif italic text-[#2D2A26] group-hover:text-[#B05B3B] transition-colors line-clamp-1">
                      {site.name}
                    </h4>
                    <div className="text-[10px] font-sans uppercase tracking-wider text-[#B05B3B] font-semibold mt-0.5">
                      UNESCO Inscription Year: {site.year} • Type: {site.type}
                    </div>
                  </div>

                  {/* About the Site Snippet */}
                  <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed line-clamp-2">
                    {site.shortNote}
                  </p>

                  {/* Interesting Fact Preview */}
                  {site.facts && site.facts[0] && (
                    <div className="p-2.5 bg-[#FAF8F5] rounded-md border border-[#2D2A26]/10 text-[11px] font-sans text-[#4A453F] flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#B05B3B] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{site.facts[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action Strip */}
              <div className="p-4 pt-3 border-t border-[#2D2A26]/10 flex items-center justify-between text-xs font-sans bg-[#FDFBF7]/50">
                <div className="flex items-center space-x-1 text-[#B05B3B] font-medium text-[11px]">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio Narration (10 Langs)</span>
                </div>
                <span className="text-[#2D2A26] font-bold uppercase tracking-wider text-[10px] group-hover:translate-x-1 transition-transform flex items-center">
                  <span>Explore Dossier</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN HIGH-DEFINITION PHOTO LIGHTBOX */}
      {isLightboxOpen && selectedSite && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-fadeIn p-3 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div 
            className="flex items-center justify-between text-white pb-3 border-b border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <span className={`text-[10px] uppercase font-sans font-bold px-2.5 py-0.5 rounded-full ${
                selectedSite.type === 'Cultural'
                  ? 'bg-[#B05B3B]'
                  : selectedSite.type === 'Natural'
                  ? 'bg-[#1B6B47]'
                  : 'bg-[#8F5A26]'
              }`}>
                {selectedSite.type} • #{selectedSite.id}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                  {selectedSite.name}
                </h3>
                <p className="text-xs font-sans text-white/70 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#E6AF2E]" />
                  <span>{selectedSite.location} | Inscribed {selectedSite.year}</span>
                </p>
              </div>
            </div>

            {/* Zoom & Close Controls */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center bg-white/10 rounded-lg p-1 border border-white/15">
                <button
                  type="button"
                  onClick={() => setLightboxZoom(prev => Math.max(0.6, prev - 0.25))}
                  className="p-1.5 hover:bg-white/20 rounded text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxZoom(1)}
                  className="px-2 py-0.5 text-xs font-sans font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(lightboxZoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxZoom(prev => Math.min(2.5, prev + 0.25))}
                  className="p-1.5 hover:bg-white/20 rounded text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/25 rounded-lg text-white transition-colors cursor-pointer border border-white/20"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image View */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Image Arrow */}
            {siteImages.length > 1 && (
              <button
                type="button"
                onClick={() => setActiveImageIndex(prev => (prev - 1 + siteImages.length) % siteImages.length)}
                className="absolute left-2 sm:left-4 z-10 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-xl"
                title="Previous Perspective (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* High-Resolution Image Canvas */}
            <div className="w-full h-full flex items-center justify-center p-2">
              <img
                src={siteImages[activeImageIndex]?.url || selectedSite.image}
                alt={siteImages[activeImageIndex]?.caption || selectedSite.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl transition-transform duration-200 select-none"
                style={{ transform: `scale(${lightboxZoom})` }}
                onError={(e) => {
                  e.currentTarget.src = `/images/heritage/site-${selectedSite.id}.jpg`;
                }}
              />
            </div>

            {/* Next Image Arrow */}
            {siteImages.length > 1 && (
              <button
                type="button"
                onClick={() => setActiveImageIndex(prev => (prev + 1) % siteImages.length)}
                className="absolute right-2 sm:right-4 z-10 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-xl"
                title="Next Perspective (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Footer Bar with Caption & Perspective Switcher */}
          <div 
            className="bg-black/60 backdrop-blur-md border border-white/15 rounded-xl p-3 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#E6AF2E] shrink-0" />
              <p className="text-xs sm:text-sm font-serif italic text-white/90">
                {siteImages[activeImageIndex]?.caption || selectedSite.name}
              </p>
            </div>

            {siteImages.length > 1 && (
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <span className="text-[10px] font-sans uppercase tracking-wider text-white/60">
                  Angle {activeImageIndex + 1} of {siteImages.length}:
                </span>
                {siteImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'bg-[#B05B3B] text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white/80'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
