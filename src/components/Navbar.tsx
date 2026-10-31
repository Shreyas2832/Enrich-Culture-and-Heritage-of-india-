import { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  User,
  Users,
  Database
} from 'lucide-react';
import { AppTab } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenLoginModal: () => void;
  onOpenDatabaseModal?: () => void;
}

export function Navbar({ currentTab, onSelectTab, onOpenLoginModal, onOpenDatabaseModal }: NavbarProps) {
  const { user, isLoggedIn, logout } = useAuth();
  const [isTravelerDropdownOpen, setIsTravelerDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const travelerDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        travelerDropdownRef.current &&
        !travelerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTravelerDropdownOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTravelerActive = currentTab === 'solo-traveler' || currentTab === 'group-traveler';

  return (
    <header className="w-full bg-[#FDFBF7] border-b border-[#2D2A26]/10 sticky top-0 z-30 transition-all backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div 
          onClick={() => onSelectTab('home')}
          className="cursor-pointer group flex items-center space-x-3 flex-shrink-0"
          title="Heritec Home"
        >
          <div className="w-9 h-9 rounded-full border border-[#B05B3B] bg-[#B05B3B]/10 flex items-center justify-center text-[#B05B3B] font-serif font-bold text-lg group-hover:bg-[#B05B3B] group-hover:text-white transition-all">
            HT
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold tracking-tight uppercase italic text-[#2D2A26] flex items-center gap-1.5">
              <span>Heritec</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B05B3B]"></span>
            </div>
            <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5A5A5A] hidden sm:block">
              Cultural & Heritage Sanctuary of India
            </p>
          </div>
        </div>

        {/* Usual Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-xs uppercase tracking-widest font-sans font-semibold text-[#2D2A26]/80">
          <button
            onClick={() => onSelectTab('home')}
            type="button"
            className={`py-1 cursor-pointer transition-all ${
              currentTab === 'home'
                ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                : 'hover:text-[#2D2A26]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onSelectTab('culture')}
            type="button"
            className={`py-1 cursor-pointer transition-all ${
              currentTab === 'culture'
                ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                : 'hover:text-[#2D2A26]'
            }`}
          >
            Culture
          </button>

          <button
            onClick={() => onSelectTab('heritage')}
            type="button"
            className={`py-1 cursor-pointer transition-all ${
              currentTab === 'heritage'
                ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                : 'hover:text-[#2D2A26]'
            }`}
          >
            Heritage
          </button>

          <button
            onClick={() => onSelectTab('maps-calendar')}
            type="button"
            className={`py-1 cursor-pointer transition-all ${
              currentTab === 'maps-calendar'
                ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                : 'hover:text-[#2D2A26]'
            }`}
          >
            Map & Calendar
          </button>

          <button
            onClick={() => onSelectTab('report')}
            type="button"
            className={`py-1 cursor-pointer transition-all ${
              currentTab === 'report'
                ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                : 'hover:text-[#2D2A26]'
            }`}
          >
            Report
          </button>

          {/* Solo & Group Traveller Dropdown Part */}
          <div className="relative" ref={travelerDropdownRef}>
            <button
              type="button"
              onClick={() => setIsTravelerDropdownOpen(!isTravelerDropdownOpen)}
              className={`py-1 flex items-center space-x-1 cursor-pointer transition-all ${
                isTravelerActive
                  ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]'
                  : 'hover:text-[#2D2A26]'
              }`}
            >
              <span>
                {currentTab === 'solo-traveler'
                  ? 'Solo Traveler'
                  : currentTab === 'group-traveler'
                  ? 'Group Traveler'
                  : 'Traveler'}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isTravelerDropdownOpen ? 'rotate-180 text-[#B05B3B]' : 'text-[#2D2A26]/60'}`} />
            </button>

            {/* Small dropdown menu for Solo & Group */}
            {isTravelerDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#2D2A26]/15 rounded shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 font-sans normal-case">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTab('solo-traveler');
                    setIsTravelerDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    currentTab === 'solo-traveler'
                      ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold'
                      : 'text-[#2D2A26] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#B05B3B] flex-shrink-0" />
                  <span>Solo Traveler</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTab('group-traveler');
                    setIsTravelerDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2.5 transition-colors cursor-pointer ${
                    currentTab === 'group-traveler'
                      ? 'bg-[#1B6B47]/10 text-[#1B6B47] font-bold'
                      : 'text-[#2D2A26] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-[#1B6B47] flex-shrink-0" />
                  <span>Group Traveler</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Area: Database & Login & Logout */}
        <div className="flex items-center space-x-2 sm:space-x-3">


          {isLoggedIn && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 py-1 px-2.5 bg-white hover:bg-[#FAF7F0] border border-[#2D2A26]/15 rounded-full text-xs font-sans transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#B05B3B] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.avatarInitials}
                </div>
                <span className="font-bold text-[#2D2A26] max-w-[100px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-[#5A5A5A]" />
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#2D2A26]/15 rounded shadow-xl p-3 z-50 font-sans animate-in fade-in slide-in-from-top-1">
                  <div className="border-b border-[#2D2A26]/10 pb-2 mb-2">
                    <div className="font-bold text-xs text-[#2D2A26]">{user.name}</div>
                    <div className="text-[11px] text-[#5A5A5A] truncate">{user.email}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full py-1.5 px-2.5 text-red-600 hover:bg-red-50 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="py-1.5 px-3 bg-[#2D2A26] hover:bg-black text-white rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-[#2D2A26] hover:bg-black/5 rounded cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#2D2A26]/10 bg-[#FDFBF7] px-4 py-4 space-y-2 font-sans text-xs">
          <button
            onClick={() => { onSelectTab('home'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${currentTab === 'home' ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold' : 'text-[#2D2A26] hover:bg-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => { onSelectTab('culture'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${currentTab === 'culture' ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold' : 'text-[#2D2A26] hover:bg-white'}`}
          >
            Culture
          </button>
          <button
            onClick={() => { onSelectTab('heritage'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${currentTab === 'heritage' ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold' : 'text-[#2D2A26] hover:bg-white'}`}
          >
            Heritage
          </button>
          <button
            onClick={() => { onSelectTab('maps-calendar'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${currentTab === 'maps-calendar' ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold' : 'text-[#2D2A26] hover:bg-white'}`}
          >
            Map & Calendar
          </button>
          <button
            onClick={() => { onSelectTab('report'); setIsMobileMenuOpen(false); }}
            className={`w-full text-left py-2 px-3 rounded font-semibold ${currentTab === 'report' ? 'bg-[#B05B3B]/10 text-[#B05B3B] font-bold' : 'text-[#2D2A26] hover:bg-white'}`}
          >
            Report
          </button>

          {/* Solo and Group in Mobile Drawer */}
          <div className="pt-2 pb-1 border-t border-[#2D2A26]/10">
            <div className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-bold px-3 mb-1">
              Travel Mode
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onSelectTab('solo-traveler');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded font-bold flex items-center justify-center gap-1.5 border ${
                  currentTab === 'solo-traveler'
                    ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                    : 'bg-white text-[#2D2A26] border-[#2D2A26]/15'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Solo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectTab('group-traveler');
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded font-bold flex items-center justify-center gap-1.5 border ${
                  currentTab === 'group-traveler'
                    ? 'bg-[#1B6B47] text-white border-[#1B6B47]'
                    : 'bg-white text-[#2D2A26] border-[#2D2A26]/15'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Group</span>
              </button>
            </div>
          </div>

          {/* Database / Supabase Option in Mobile Drawer */}
          {onOpenDatabaseModal && (
            <button
              type="button"
              onClick={() => {
                onOpenDatabaseModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 flex items-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-700" />
              <span>Database & Supabase Gateway</span>
            </button>
          )}

          {/* User Auth in Mobile Menu */}
          <div className="pt-2 border-t border-[#2D2A26]/10 flex items-center justify-between">
            {isLoggedIn && user ? (
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-bold text-[#2D2A26]">{user.name}</div>
                  <div className="text-[10px] text-[#5A5A5A]">{user.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-1 px-3 bg-red-50 text-red-600 border border-red-200 rounded font-bold text-xs"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenLoginModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-[#2D2A26] text-white rounded font-bold text-xs text-center"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
