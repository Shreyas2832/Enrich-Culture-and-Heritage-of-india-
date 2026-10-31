import { ArrowRight, Sparkles, Shield, User, Users, MapPin, Volume2 } from 'lucide-react';
import { AudioGuideBar } from './AudioGuideBar';
import { CULTURE_OF_INDIA_SUMMARY, HERITAGE_OF_INDIA_SUMMARY } from '../data/culturalRegions';
import { UNESCO_HERITAGE_SITES, HeritageSite } from '../data/heritageSites';

import { AppTab } from '../types/navigation';

interface MainScreenProps {
  onNavigate: (tab: AppTab) => void;
  onOpenSiteDetails: (site: HeritageSite) => void;
}

export function MainScreen({ onNavigate, onOpenSiteDetails }: MainScreenProps) {
  const introNarrationText = `India is not merely a geographic boundary; it is a profound five-millennia philosophy of continuity, pluralism, and architectural daring. From the Vedic chants of the North and sacred Ghats of Varanasi to the soaring granite Dravidian temples of the South, Indian cultural heritage is a living sanctuary of art, craft, and spirituality. Home to 45 UNESCO World Heritage sites, India seamlessly bridges ancient metaphysical inquiry with tangible monuments of world history.`;

  // Two most popular sites requested by user
  const tajMahal = UNESCO_HERITAGE_SITES.find(s => s.id === 4) || UNESCO_HERITAGE_SITES[0];
  const hampi = UNESCO_HERITAGE_SITES.find(s => s.id === 12) || UNESCO_HERITAGE_SITES[1];

  return (
    <div className="w-full pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
      {/* 1. Main Introduction: Description of Culture & Heritage of India */}
      <section className="border-b border-[#2D2A26]/15 pb-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#B05B3B] mb-3">
            <span>Student Innovation Initiative • Heritec</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-[#2D2A26] mb-6 tracking-tight">
            A Tapestry of <br className="hidden sm:inline" />
            <span className="italic text-[#B05B3B] font-normal">Civilizational Continuity & Sacred Art</span>
          </h1>

          <p className="text-base sm:text-lg font-serif text-[#4A453F] leading-relaxed mb-6">
            India is not just a geography; it is a profound philosophy of continuity. From the Vedic chants of the North to the rhythmic temple traditions of the South, our heritage is a living museum of human civilization, spanning over five millennia of art, architecture, and spiritual devotion.
          </p>

          {/* Voice Narration of the Cultural & Heritage Description */}
          <AudioGuideBar 
            textToSpeak={introNarrationText}
            label="Voice Guide: Civilizational Overview"
            className="mb-8"
          />
        </div>

        {/* 2. Two Options: Solo Traveller and Group Traveller */}
        <div className="pt-2">
          <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#5A5A5A] mb-4">
            Select Traveler Expedition Pathway
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Option A: Solo Traveller */}
            <div
              onClick={() => onNavigate('solo-traveler')}
              className="group cursor-pointer border border-[#2D2A26]/20 bg-white p-6 hover:border-[#2D2A26] hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2D2A26] group-hover:bg-[#B05B3B] transition-colors"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#B05B3B] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Independent Voyage
                </span>
                <span className="text-xs font-sans text-[#5A5A5A]">14 Places • 6 Gems</span>
              </div>
              <h3 className="text-2xl font-serif italic text-[#2D2A26] group-hover:text-[#B05B3B] transition-colors mb-2">
                Solo Traveller
              </h3>
              <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-4">
                Explore solitary journeys with live route tracking from start to destination, discovering offbeat hidden gems and personal expedition statistics.
              </p>
              <div className="flex items-center text-xs font-sans font-bold uppercase tracking-wider text-[#2D2A26] group-hover:translate-x-1 transition-transform">
                <span>View Solo Journey & Route Map</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>

            {/* Option B: Group Traveller */}
            <div
              onClick={() => onNavigate('group-traveler')}
              className="group cursor-pointer border border-[#2D2A26]/20 bg-white p-6 hover:border-[#B05B3B] hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#B05B3B] transition-colors"></div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#B05B3B] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Safe Heritage Corridors
                </span>
                <span className="text-xs font-sans text-[#5A5A5A]">9.8 / 10 Safety Index</span>
              </div>
              <h3 className="text-2xl font-serif italic text-[#2D2A26] group-hover:text-[#B05B3B] transition-colors mb-2">
                Group Traveller
              </h3>
              <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-4">
                Verified secure routes specially audited for groups with women travelers, featuring pink police booths, verified guides, well-lit circuits, and emergency links.
              </p>
              <div className="flex items-center text-xs font-sans font-bold uppercase tracking-wider text-[#B05B3B] group-hover:translate-x-1 transition-transform">
                <span>Explore Safe Group Corridors</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Boxes: 1) Culture of India & 2) Heritage of India */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#5A5A5A]">
            Core Civilizational Pillars
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Culture of India */}
          <div className="bg-white p-6 sm:p-8 border border-[#2D2A26]/15 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                  Pillar 01
                </span>
                <span className="text-[10px] uppercase font-sans text-[#5A5A5A] tracking-wider">
                  5 Regions • 22 Tongues
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#2D2A26] mb-3 pb-2 border-b border-[#B05B3B]/30">
                Culture of India
              </h2>
              <p className="font-sans text-sm leading-relaxed text-[#5A5A5A] mb-4">
                {CULTURE_OF_INDIA_SUMMARY.shortNote}
              </p>
              <div className="p-3 bg-[#FDFBF7] rounded border border-[#2D2A26]/10 text-xs font-serif italic text-[#4A453F] mb-6">
                "Vasudhaiva Kutumbakam — The World is One Family. Expressed through classical ragas, temple dances, vibrant harvest festivals, and sacred hospitality."
              </div>
            </div>

            <button
              onClick={() => onNavigate('culture')}
              type="button"
              className="w-full py-2.5 px-4 bg-[#2D2A26] hover:bg-[#B05B3B] text-white text-xs uppercase tracking-widest font-sans font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Explore 5 Cultural Regions & Audio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Box 2: Heritage of India */}
          <div className="bg-white p-6 sm:p-8 border border-[#2D2A26]/15 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                  Pillar 02
                </span>
                <span className="text-[10px] uppercase font-sans text-[#5A5A5A] tracking-wider">
                  45 UNESCO Sites Inscribed
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif italic text-[#2D2A26] mb-3 pb-2 border-b border-[#B05B3B]/30">
                Heritage of India
              </h2>
              <p className="font-sans text-sm leading-relaxed text-[#5A5A5A] mb-4">
                {HERITAGE_OF_INDIA_SUMMARY.shortNote}
              </p>
              <div className="p-3 bg-[#FDFBF7] rounded border border-[#2D2A26]/10 text-xs font-serif italic text-[#4A453F] mb-6">
                "Spanning 34 Cultural sanctuaries, 10 Natural biosphere preserves, and 1 Mixed UNESCO marvel (Khangchendzonga), documented with exact ASI addresses."
              </div>
            </div>

            <button
              onClick={() => onNavigate('heritage')}
              type="button"
              className="w-full py-2.5 px-4 bg-[#B05B3B] hover:bg-[#8f452a] text-white text-xs uppercase tracking-widest font-sans font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>View All 45 Heritage Sites & Voice Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Two Most Popular Sites of Culture and Heritage */}
      <section className="space-y-6 pt-4 border-t border-[#2D2A26]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Curated World Wonders
            </div>
            <h2 className="text-3xl font-serif text-[#2D2A26]">
              The Two Most Popular Sites of Culture & Heritage
            </h2>
          </div>
          <button
            onClick={() => onNavigate('heritage')}
            type="button"
            className="text-xs uppercase tracking-widest font-sans font-bold text-[#B05B3B] hover:text-[#2D2A26] transition-colors inline-flex items-center space-x-1 cursor-pointer"
          >
            <span>See all 45 sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Site 1: Taj Mahal Complex */}
          <div 
            onClick={() => onOpenSiteDetails(tajMahal)}
            className="group cursor-pointer bg-white border border-[#2D2A26]/15 hover:border-[#2D2A26] rounded-xl overflow-hidden transition-all relative flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              {/* [HERITAGE IMAGE] above site information */}
              <div className="relative w-full h-52 overflow-hidden bg-[#2D2A26]/5">
                <img
                  src={tajMahal.image}
                  alt={tajMahal.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/images/heritage/site-4.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 bg-[#B05B3B] text-white font-bold rounded-full">
                    UNESCO Site #04 • Cultural
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-sans font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B05B3B]" />
                    <span>{tajMahal.location} | {tajMahal.country}</span>
                  </p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-serif italic text-[#2D2A26] group-hover:text-[#B05B3B] transition-colors mb-1">
                  {tajMahal.name}
                </h3>
                <div className="text-[10px] font-sans uppercase tracking-wider text-[#B05B3B] font-semibold mb-2">
                  UNESCO Inscription Year: {tajMahal.year} • Type: {tajMahal.type}
                </div>
                <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-3 line-clamp-2">
                  {tajMahal.description}
                </p>
                <div className="text-[11px] font-sans text-[#2D2A26]/80 bg-[#FDFBF7] p-2.5 rounded-md border border-[#2D2A26]/5">
                  <span className="font-bold">Key Fact:</span> {tajMahal.facts[0]}
                </div>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-[#2D2A26]/10 flex items-center justify-between text-xs font-sans bg-[#FAF8F5]">
              <span className="font-serif italic text-[#B05B3B] flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>10 Languages Audio Available</span>
              </span>
              <span className="uppercase font-bold tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center text-[#2D2A26]">
                Explore Full Dossier <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>

          {/* Popular Site 2: Vijayanagara Ruins at Hampi */}
          <div 
            onClick={() => onOpenSiteDetails(hampi)}
            className="group cursor-pointer bg-white border border-[#2D2A26]/15 hover:border-[#2D2A26] rounded-xl overflow-hidden transition-all relative flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              {/* [HERITAGE IMAGE] above site information */}
              <div className="relative w-full h-52 overflow-hidden bg-[#2D2A26]/5">
                <img
                  src={hampi.image}
                  alt={hampi.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/images/heritage/site-12.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest px-2.5 py-0.5 bg-[#B05B3B] text-white font-bold rounded-full">
                    UNESCO Site #12 • Cultural
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="text-xs font-sans font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B05B3B]" />
                    <span>{hampi.location} | {hampi.country}</span>
                  </p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-serif italic text-[#2D2A26] group-hover:text-[#B05B3B] transition-colors mb-1">
                  {hampi.name}
                </h3>
                <div className="text-[10px] font-sans uppercase tracking-wider text-[#B05B3B] font-semibold mb-2">
                  UNESCO Inscription Year: {hampi.year} • Type: {hampi.type}
                </div>
                <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-3 line-clamp-2">
                  {hampi.description}
                </p>
                <div className="text-[11px] font-sans text-[#2D2A26]/80 bg-[#FDFBF7] p-2.5 rounded-md border border-[#2D2A26]/5">
                  <span className="font-bold">Key Fact:</span> {hampi.facts[0]}
                </div>
              </div>
            </div>

            <div className="p-4 pt-3 border-t border-[#2D2A26]/10 flex items-center justify-between text-xs font-sans bg-[#FAF8F5]">
              <span className="font-serif italic text-[#B05B3B] flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span>10 Languages Audio Available</span>
              </span>
              <span className="uppercase font-bold tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center text-[#2D2A26]">
                Explore Full Dossier <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UNESCO Census Overview Strip */}
      <section className="bg-[#2D2A26] text-white p-6 sm:p-8 rounded-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#D4C3A3]">
              Official UNESCO Census of India
            </div>
            <div className="text-2xl font-serif italic">Preserving 45 Tangible Civilizational Landmarks</div>
          </div>
          <div className="text-xs font-sans text-white/60">Updated Inscriptions 2024</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="border-l border-white/15 pl-4">
            <div className="text-4xl font-serif italic text-[#D4C3A3]">45</div>
            <div className="text-[10px] uppercase tracking-widest font-sans text-white/70">Total UNESCO Sites</div>
          </div>
          <div className="border-l border-white/15 pl-4">
            <div className="text-4xl font-serif italic">34</div>
            <div className="text-[10px] uppercase tracking-widest font-sans text-white/70">Cultural Monuments</div>
          </div>
          <div className="border-l border-white/15 pl-4">
            <div className="text-4xl font-serif italic">10</div>
            <div className="text-[10px] uppercase tracking-widest font-sans text-white/70">Natural Sanctuaries</div>
          </div>
          <div className="border-l border-white/15 pl-4">
            <div className="text-4xl font-serif italic text-[#B05B3B]">01</div>
            <div className="text-[10px] uppercase tracking-widest font-sans text-white/70">Mixed Marvel (Sikkim)</div>
          </div>
        </div>
      </section>
    </div>
  );
}
