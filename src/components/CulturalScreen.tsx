import { useState } from 'react';
import { Volume2, Music, Sparkles, MapPin, ArrowRight, ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { AudioGuideBar } from './AudioGuideBar';
import { CULTURAL_REGIONS, CULTURE_OF_INDIA_SUMMARY, CulturalRegion } from '../data/culturalRegions';

interface CulturalScreenProps {
  initialRegionId?: string;
  onNavigateHome?: () => void;
}

export function CulturalScreen({ initialRegionId, onNavigateHome }: CulturalScreenProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(initialRegionId || null);

  const selectedRegion = CULTURAL_REGIONS.find(r => r.id === selectedRegionId);

  return (
    <div className="w-full pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
      {/* 1. Cultural Screen Top Section: Brief Description of Culture of India */}
      <section className="border-b border-[#2D2A26]/15 pb-8">
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
          <span>Pillar of Identity</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mb-4">
          The Living Culture of India
        </h1>

        <p className="text-base sm:text-lg font-serif italic text-[#4A453F] leading-relaxed max-w-4xl mb-6">
          {CULTURE_OF_INDIA_SUMMARY.fullDescription}
        </p>

        {/* VOICE MESSAGE: exact narration of the description above */}
        <AudioGuideBar
          textToSpeak={CULTURE_OF_INDIA_SUMMARY.audioNarration}
          label="Voice Message: Culture of India"
          className="max-w-3xl mb-4"
        />
      </section>

      {/* 2. Heading "Regions" & 5 Types of Regions Selector */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-2 border-b border-[#2D2A26]/10 gap-2">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Geographic & Artistic Classification
            </div>
            <h2 className="text-3xl font-serif text-[#2D2A26]">
              Regions of India
            </h2>
          </div>
          <p className="text-xs font-sans text-[#5A5A5A]">
            Select any of the 5 regional traditions to access dedicated cultural pages with voice narration.
          </p>
        </div>

        {/* Regional Navigation Tabs / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CULTURAL_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                type="button"
                className={`p-4 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-sm'
                    : 'bg-white hover:bg-[#FDFBF7] text-[#2D2A26] border-[#2D2A26]/15'
                }`}
              >
                <div>
                  <span className={`text-[9px] uppercase tracking-widest font-sans font-bold ${
                    isSelected ? 'text-[#D4C3A3]' : 'text-[#B05B3B]'
                  }`}>
                    Region
                  </span>
                  <div className="text-base font-serif italic font-semibold mt-1">
                    {region.name}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-sans">
                  <span className="opacity-70">{region.danceForms[0]}</span>
                  <Volume2 className={`w-3 h-3 ${isSelected ? 'text-[#D4C3A3]' : 'text-[#B05B3B]'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Dedicated Regional Page & Voice Narration */}
      {selectedRegion ? (
        <section className="bg-white border border-[#2D2A26]/15 p-6 sm:p-10 space-y-8 animate-fadeIn">
          {/* Header of Dedicated Region Page */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#2D2A26]/10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-sans font-bold bg-[#B05B3B]/10 text-[#B05B3B] mb-2">
                <span>Dedicated Regional Dossier</span>
                <span>•</span>
                <span>{selectedRegion.name}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2A26] mb-2">
                {selectedRegion.title}
              </h2>
              <p className="text-xs uppercase tracking-wider font-sans text-[#5A5A5A]">
                {selectedRegion.tagline}
              </p>
            </div>

            <button
              onClick={() => setSelectedRegionId(null)}
              type="button"
              className="text-xs font-sans uppercase tracking-wider text-[#5A5A5A] hover:text-[#2D2A26] self-start cursor-pointer"
            >
              Close Dossier ✕
            </button>
          </div>

          {/* DEDICATED VOICE MESSAGE FOR THIS PARTICULAR TOPIC/REGION */}
          <div className="p-1 bg-[#FDFBF7] rounded border border-[#2D2A26]/10">
            <AudioGuideBar
              textToSpeak={selectedRegion.audioNarration}
              label={`Voice Message: ${selectedRegion.name} Cultural Narrative`}
            />
          </div>

          {/* Region Overview text */}
          <div className="space-y-2">
            <h3 className="text-sm uppercase tracking-widest font-sans font-bold text-[#2D2A26]">
              Cultural & Philosophical Overview
            </h3>
            <p className="text-sm sm:text-base font-serif text-[#4A453F] leading-relaxed">
              {selectedRegion.overview}
            </p>
          </div>

          {/* Cultural Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-[#2D2A26]/10">
            {/* Dance & Performing Arts */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Dance & Theater Traditions
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Classical & Folk Arts
              </div>
              <ul className="space-y-1 text-xs font-sans text-[#5A5A5A]">
                {selectedRegion.danceForms.map((dance, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#B05B3B]"></span>
                    <span>{dance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture & Temples */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Architectural Form
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Structural Heritage
              </div>
              <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed">
                {selectedRegion.architecture}
              </p>
            </div>

            {/* Textiles & Crafts */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Handloom & Craft
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Textile Weaving
              </div>
              <ul className="space-y-1 text-xs font-sans text-[#5A5A5A]">
                {selectedRegion.textiles.map((textile, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#B05B3B]"></span>
                    <span>{textile}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Living Festivals */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Celebrations & Fairs
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Festivals & Rituals
              </div>
              <ul className="space-y-1 text-xs font-sans text-[#5A5A5A]">
                {selectedRegion.festivals.map((fest, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#B05B3B]"></span>
                    <span>{fest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Culinary Heritage */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Gastronomy
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Culinary Philosophy
              </div>
              <ul className="space-y-1 text-xs font-sans text-[#5A5A5A]">
                {selectedRegion.cuisines.map((food, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#B05B3B]"></span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Constituent States */}
            <div className="p-4 bg-[#FDFBF7] border border-[#2D2A26]/10 space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                Constituent States & Territories
              </div>
              <div className="text-lg font-serif italic text-[#2D2A26]">
                Territorial Reach
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedRegion.states.map((st, i) => (
                  <span key={i} className="px-2 py-0.5 bg-white border border-[#2D2A26]/15 rounded text-[10px] font-sans text-[#2D2A26]">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Regional Overview Grid when no single region is full-opened */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CULTURAL_REGIONS.map((region) => (
            <div
              key={region.id}
              className="bg-white border border-[#2D2A26]/15 p-6 flex flex-col justify-between hover:border-[#2D2A26] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
                    {region.name}
                  </span>
                  <Volume2 className="w-4 h-4 text-[#B05B3B]" />
                </div>
                <h3 className="text-xl font-serif italic text-[#2D2A26] mb-2 group-hover:text-[#B05B3B] transition-colors">
                  {region.title}
                </h3>
                <p className="text-xs font-sans text-[#5A5A5A] leading-relaxed mb-4 line-clamp-3">
                  {region.overview}
                </p>

                <div className="text-[11px] font-sans text-[#4A453F] space-y-1 mb-4">
                  <div><strong>Key Dances:</strong> {region.danceForms.slice(0, 3).join(", ")}</div>
                  <div><strong>Textiles:</strong> {region.textiles.slice(0, 2).join(", ")}</div>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#2D2A26]/10">
                {/* Embedded compact audio play button for every region */}
                <AudioGuideBar
                  textToSpeak={region.audioNarration}
                  label={`Voice: ${region.name}`}
                  compact={true}
                />

                <button
                  onClick={() => setSelectedRegionId(region.id)}
                  type="button"
                  className="w-full py-2 bg-[#2D2A26] hover:bg-[#B05B3B] text-white text-[11px] uppercase tracking-widest font-sans font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Open Dedicated Region Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
