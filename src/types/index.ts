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
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventType: string;
  date: string;
  address: string;
  eventUrl: string;
  organizedByGroup: string;
  maxAttendees?: number | null;
  actualAttendees?: number | null;
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