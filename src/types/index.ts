export interface SocialMediaHandles {
  instagram?: string;
  linkedin?: string;
}

export interface UserInterest {
  id: string;
  category: string;
  name: string;
  confidence: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl?: string;
  relevanceScore: number;
}

export interface UserProfile {
  id: string;
  socialMediaHandles: SocialMediaHandles;
  interests: UserInterest[];
  events: Event[];
  isProcessing: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 