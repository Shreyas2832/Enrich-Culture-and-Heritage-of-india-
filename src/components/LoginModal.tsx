import { useState } from 'react';
import { X, User, Mail, Lock, Phone, ShieldCheck, Users, CheckCircle, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [travelMode, setTravelMode] = useState<'solo' | 'group'>('solo');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please provide a valid email address');
        return;
      }
    } else {
      if (!email.trim()) {
        setError('Please provide your registered email');
        return;
      }
    }

    login({
      name: name.trim() || email.split('@')[0] || 'Heritage Explorer',
      email: email.trim(),
      phone: phone.trim() || '+91 98200 12345',
      travelMode,
      emergencyContactPhone: emergencyPhone.trim() || '112',
    });

    onClose();
    if (onSuccess) onSuccess();
  };

  const handleQuickDemoLogin = (type: 'shreyas' | 'group_lead') => {
    if (type === 'shreyas') {
      login({
        name: 'Shreyas Dorugade',
        email: 'shreyasdorugade0105@gmail.com',
        phone: '+91 98200 12345',
        travelMode: 'solo',
        emergencyContactName: 'Family Guardian',
        emergencyContactPhone: '+91 98200 99999',
        nationality: 'Indian',
      });
    } else {
      login({
        name: 'Priya & Squad',
        email: 'priya.expeditions@heritec.org',
        phone: '+91 98333 44556',
        travelMode: 'group',
        emergencyContactName: 'Lead Liaison Office',
        emergencyContactPhone: '+91 98333 99999',
        nationality: 'Indian',
      });
    }
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FDFBF7] border border-[#2D2A26]/20 rounded shadow-2xl p-6 sm:p-8 font-sans overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 text-[#2D2A26]/50 hover:text-[#2D2A26] rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#B05B3B]/10 border border-[#B05B3B] flex items-center justify-center text-[#B05B3B] font-serif font-bold text-xl mb-3">
            HT
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2D2A26]">
            {mode === 'login' ? 'Sign In to Heritec' : 'Create Explorer Account'}
          </h2>
          <p className="text-xs text-[#5A5A5A] mt-1 font-sans">
            Access personalized travel pathways, SOS emergency contacts & expedition journals
          </p>
        </div>

        {/* Fast 1-Click Demo Logins */}
        <div className="mb-6 p-3 bg-white border border-[#2D2A26]/10 rounded">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#5A5A5A] mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#B05B3B]" />
            <span>Fast 1-Click Sign In:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('shreyas')}
              className="px-2.5 py-2 text-left bg-[#FDFBF7] hover:bg-[#B05B3B]/5 border border-[#2D2A26]/15 hover:border-[#B05B3B] rounded text-xs transition-colors cursor-pointer"
            >
              <div className="font-bold text-[#2D2A26] truncate">Shreyas Dorugade</div>
              <div className="text-[10px] text-[#B05B3B] font-medium flex items-center gap-1">
                <User className="w-2.5 h-2.5" /> Solo Explorer
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('group_lead')}
              className="px-2.5 py-2 text-left bg-[#FDFBF7] hover:bg-[#B05B3B]/5 border border-[#2D2A26]/15 hover:border-[#B05B3B] rounded text-xs transition-colors cursor-pointer"
            >
              <div className="font-bold text-[#2D2A26] truncate">Priya Sharma</div>
              <div className="text-[10px] text-[#1B6B47] font-medium flex items-center gap-1">
                <Users className="w-2.5 h-2.5" /> Group Leader
              </div>
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#2D2A26]/10 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 pb-2 transition-colors cursor-pointer ${
              mode === 'login' ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]' : 'text-[#5A5A5A] hover:text-[#2D2A26]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 pb-2 transition-colors cursor-pointer ${
              mode === 'register' ? 'text-[#B05B3B] border-b-2 border-[#B05B3B]' : 'text-[#5A5A5A] hover:text-[#2D2A26]'
            }`}
          >
            New Registration
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-[#2D2A26] uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#5A5A5A] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Shreyas Dorugade"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#2D2A26]/20 rounded text-xs text-[#2D2A26] focus:outline-none focus:border-[#B05B3B]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#2D2A26] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#5A5A5A] absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="explorer@domain.com"
                required
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#2D2A26]/20 rounded text-xs text-[#2D2A26] focus:outline-none focus:border-[#B05B3B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#2D2A26] uppercase tracking-wider mb-1">
              Password / Passcode
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#5A5A5A] absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#2D2A26]/20 rounded text-xs text-[#2D2A26] focus:outline-none focus:border-[#B05B3B]"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-[#2D2A26] uppercase tracking-wider mb-1">
                  Primary Travel Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTravelMode('solo')}
                    className={`p-2 border rounded text-center transition-colors cursor-pointer ${
                      travelMode === 'solo'
                        ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                        : 'bg-white text-[#2D2A26] border-[#2D2A26]/20 hover:border-[#B05B3B]'
                    }`}
                  >
                    Solo Explorer
                  </button>
                  <button
                    type="button"
                    onClick={() => setTravelMode('group')}
                    className={`p-2 border rounded text-center transition-colors cursor-pointer ${
                      travelMode === 'group'
                        ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                        : 'bg-white text-[#2D2A26] border-[#2D2A26]/20 hover:border-[#B05B3B]'
                    }`}
                  >
                    Group Explorer
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2D2A26] uppercase tracking-wider mb-1">
                  Emergency Contact Phone (for SOS)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#5A5A5A] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#2D2A26]/20 rounded text-xs text-[#2D2A26] focus:outline-none focus:border-[#B05B3B]"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-2.5 bg-[#B05B3B] hover:bg-[#96472A] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[#2D2A26]/10 text-center text-[11px] text-[#5A5A5A]">
          <span className="flex items-center justify-center gap-1 text-[#1B6B47] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safe Heritage Network & Emergency SOS Enabled</span>
          </span>
        </div>
      </div>
    </div>
  );
}
