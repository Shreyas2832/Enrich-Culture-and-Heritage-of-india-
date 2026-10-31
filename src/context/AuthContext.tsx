import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, AuthContextType } from '../types/auth';

const STORAGE_KEY = 'heritec_auth_user';

// Default initial profile for quick demo / fallback
const DEFAULT_EXPLORER: UserProfile = {
  id: 'usr_01',
  name: 'Shreyas Dorugade',
  email: 'shreyasdorugade0105@gmail.com',
  phone: '+91 98200 12345',
  emergencyContactName: 'Family / Guardian',
  emergencyContactPhone: '+91 98200 99999',
  travelMode: 'solo',
  avatarInitials: 'SD',
  nationality: 'Indian',
  bloodGroup: 'O+',
  joinedDate: 'September 2026',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fall back
    }
    // Default logged-in user so the user can test Logout and Login right away
    return DEFAULT_EXPLORER;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  const login = (profileData: Partial<UserProfile>) => {
    const name = profileData.name || 'Heritage Explorer';
    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'HE';

    const newUser: UserProfile = {
      id: profileData.id || `usr_${Date.now()}`,
      name,
      email: profileData.email || 'explorer@heritec.org',
      phone: profileData.phone || '+91 98000 00000',
      emergencyContactName: profileData.emergencyContactName || 'Emergency Contact',
      emergencyContactPhone: profileData.emergencyContactPhone || '112',
      travelMode: profileData.travelMode || 'solo',
      avatarInitials: initials,
      nationality: profileData.nationality || 'Indian',
      bloodGroup: profileData.bloodGroup || 'B+',
      joinedDate: profileData.joinedDate || 'September 2026',
    };

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
