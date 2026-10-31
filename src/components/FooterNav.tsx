import { Home, Landmark, MapPin, Calendar, AlertTriangle, BookOpen, ShieldAlert } from 'lucide-react';
import { AppTab } from '../types/navigation';

interface FooterNavProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

export function FooterNav({ currentTab, onSelectTab }: FooterNavProps) {
  const isHomeActive = currentTab === 'home' || currentTab === 'solo-traveler' || currentTab === 'group-traveler';

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#2D2A26]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-5xl mx-auto grid grid-cols-6 h-16 sm:h-18">
        {/* 1) Home */}
        <button
          onClick={() => onSelectTab('home')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            isHomeActive
              ? 'text-[#B05B3B] bg-[#FDFBF7]'
              : 'text-[#2D2A26]/50 hover:text-[#2D2A26] hover:bg-[#FDFBF7]'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-sans font-bold">
            Home
          </span>
        </button>

        {/* 2) Culture */}
        <button
          onClick={() => onSelectTab('culture')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            currentTab === 'culture'
              ? 'text-[#B05B3B] bg-[#FDFBF7]'
              : 'text-[#2D2A26]/50 hover:text-[#2D2A26] hover:bg-[#FDFBF7]'
          }`}
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-sans font-bold">
            Culture
          </span>
        </button>

        {/* 3) Heritage */}
        <button
          onClick={() => onSelectTab('heritage')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            currentTab === 'heritage'
              ? 'text-[#B05B3B] bg-[#FDFBF7]'
              : 'text-[#2D2A26]/50 hover:text-[#2D2A26] hover:bg-[#FDFBF7]'
          }`}
        >
          <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-sans font-bold">
            Heritage
          </span>
        </button>

        {/* 4) Maps & Calendar */}
        <button
          onClick={() => onSelectTab('maps-calendar')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            currentTab === 'maps-calendar'
              ? 'text-[#B05B3B] bg-[#FDFBF7]'
              : 'text-[#2D2A26]/50 hover:text-[#2D2A26] hover:bg-[#FDFBF7]'
          }`}
        >
          <div className="flex items-center -space-x-1">
            <MapPin className="w-3.5 h-3.5" />
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-sans font-bold text-center leading-none">
            Map & Cal
          </span>
        </button>

        {/* 5) Report */}
        <button
          onClick={() => onSelectTab('report')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
            currentTab === 'report'
              ? 'text-[#B05B3B] bg-[#B05B3B]/10 font-bold'
              : 'text-[#2D2A26]/50 hover:text-[#B05B3B] hover:bg-[#FDFBF7]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] font-sans font-bold">
            Report
          </span>
        </button>

        {/* 6) SOS (Red Color) */}
        <button
          onClick={() => onSelectTab('sos')}
          type="button"
          className={`flex flex-col items-center justify-center space-y-0.5 transition-all border-l border-red-200/60 cursor-pointer relative ${
            currentTab === 'sos'
              ? 'bg-red-600 text-white shadow-inner font-black'
              : 'text-red-600 bg-red-50/70 hover:bg-red-100/80 hover:text-red-700'
          }`}
          title="Emergency SOS Assistance & Helplines"
        >
          <div className="relative">
            <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${currentTab === 'sos' ? 'bg-white' : 'bg-red-600'} animate-ping`}></span>
            <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${currentTab === 'sos' ? 'bg-white' : 'bg-red-600'}`}></span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-sans font-black">
            SOS
          </span>
        </button>
      </div>
    </footer>
  );
}
