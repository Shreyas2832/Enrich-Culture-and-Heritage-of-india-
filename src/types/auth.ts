export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  travelMode: 'solo' | 'group';
  avatarInitials: string;
  nationality?: string;
  bloodGroup?: string;
  joinedDate: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (profile: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}
