"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { InterestCard } from "@/components/InterestCard";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialMediaHandles, UserInterest, Event } from "@/types";

// Mock data for demonstration
const mockInterests: UserInterest[] = [
  {
    id: "1",
    category: "Technology",
    name: "Machine Learning",
    confidence: 0.92,
    description: "Strong interest in AI and machine learning technologies"
  },
  {
    id: "2",
    category: "Technology",
    name: "Web Development",
    confidence: 0.85,
    description: "Active engagement with frontend and backend development"
  },
  {
    id: "3",
    category: "Business",
    name: "Startup Culture",
    confidence: 0.78,
    description: "Interest in entrepreneurship and startup ecosystem"
  },
  {
    id: "4",
    category: "Design",
    name: "UI/UX Design",
    confidence: 0.72,
    description: "Appreciation for good design and user experience"
  },
  {
    id: "5",
    category: "Networking",
    name: "Professional Networking",
    confidence: 0.88,
    description: "Active participation in professional communities"
  },
  {
    id: "6",
    category: "Innovation",
    name: "Emerging Technologies",
    confidence: 0.81,
    description: "Interest in cutting-edge technology trends"
  }
];

const mockEvents: Event[] = [
  {
    eventId: "308405959",
    eventName: "Patterns Seattle: An event for digital production and design system leaders",
    eventDescription: "Patterns is a Knapsack-hosted summit for senior product, design, and engineering leaders and we'd love for you to be part of it. It's free to attend, with lunch and happy hour covered.",
    eventType: "PHYSICAL",
    date: "2025-09-18T11:00:00-07:00",
    address: "TBD in Seattle, Seattle, WA, us",
    eventUrl: "https://www.meetup.com/design-systems-community/events/308405959/",
    organizedByGroup: "Knapsack Design Systems Leadership Community",
    maxAttendees: null,
    actualAttendees: 2,
    relevanceScore: 0.95
  },
  {
    eventId: "308405960",
    eventName: "AI & Machine Learning Summit 2024",
    eventDescription: "Join industry leaders and researchers for a comprehensive exploration of the latest developments in AI and machine learning.",
    eventType: "PHYSICAL",
    date: "2024-03-15T09:00:00-08:00",
    address: "San Francisco Convention Center, San Francisco, CA, us",
    eventUrl: "https://ai-summit-2024.com",
    organizedByGroup: "AI Research Foundation",
    maxAttendees: 500,
    actualAttendees: 450,
    relevanceScore: 0.92
  },
  {
    eventId: "308405961",
    eventName: "Startup Networking Mixer",
    eventDescription: "Connect with fellow entrepreneurs, investors, and startup enthusiasts in an intimate networking setting.",
    eventType: "PHYSICAL",
    date: "2024-03-20T18:00:00-05:00",
    address: "WeWork, New York, NY, us",
    eventUrl: "https://startup-mixer-nyc.com",
    organizedByGroup: "NYC Startup Community",
    maxAttendees: 100,
    actualAttendees: 85,
    relevanceScore: 0.87
  },
  {
    eventId: "308405962",
    eventName: "Web Development Conference",
    eventDescription: "Learn about the latest trends in web development, from React to serverless architectures.",
    eventType: "PHYSICAL",
    date: "2024-03-25T10:00:00-06:00",
    address: "Austin Convention Center, Austin, TX, us",
    eventUrl: "https://webdev-conf-austin.com",
    organizedByGroup: "Web Dev Community",
    maxAttendees: 300,
    actualAttendees: 275,
    relevanceScore: 0.82
  },
  {
    eventId: "308405963",
    eventName: "Design Thinking Workshop",
    eventDescription: "Master the principles of design thinking and user-centered design methodologies.",
    eventType: "PHYSICAL",
    date: "2024-04-01T09:00:00-08:00",
    address: "Seattle Design Center, Seattle, WA, us",
    eventUrl: "https://design-workshop-seattle.com",
    organizedByGroup: "Design Innovation Lab",
    maxAttendees: 50,
    actualAttendees: 45,
    relevanceScore: 0.76
  },
  {
    eventId: "308405964",
    eventName: "Tech Innovation Meetup",
    eventDescription: "Monthly meetup for tech enthusiasts to discuss emerging technologies and industry trends.",
    eventType: "PHYSICAL",
    date: "2024-03-28T19:00:00-05:00",
    address: "Cambridge Innovation Center, Boston, MA, us",
    eventUrl: "https://tech-meetup-boston.com",
    organizedByGroup: "Boston Tech Community",
    maxAttendees: 75,
    actualAttendees: 68,
    relevanceScore: 0.84
  }
];

export default function DashboardPage() {
  const [handles, setHandles] = useState<SocialMediaHandles | null>(null);
  const [manualInterests, setManualInterests] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"interests" | "events">("interests");

  useEffect(() => {
    // Load handles from localStorage
    const storedHandles = localStorage.getItem("eventMeshHandles");
    if (storedHandles) {
      setHandles(JSON.parse(storedHandles));
    }
    
    // Load manual interests from localStorage
    const storedInterests = localStorage.getItem("eventMeshManualInterests");
    if (storedInterests) {
      setManualInterests(storedInterests);
    }
    
    // Load location from localStorage
    const storedLocation = localStorage.getItem("eventMeshLocation");
    if (storedLocation) {
      setLocation(storedLocation);
    }
  }, []);

  if (!handles) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              No Profile Found
            </h1>
            <p className="text-gray-600 mb-8">
              Please set up your profile first to view your personalized dashboard.
            </p>
            <Button onClick={() => window.location.href = "/setup"}>
              Set Up Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">
            Your Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Based on your social media analysis.
          </p>
          
          {/* Social Media Handles Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {handles.instagram && (
              <a
                href={`https://instagram.com/${handles.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
                  📷 {handles.instagram}
                </Badge>
              </a>
            )}
            {handles.linkedin && (
              <a
                href={handles.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
                  💼 {handles.linkedin}
                </Badge>
              </a>
            )}
          </div>

          {/* Location Display */}
          {location && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Location:</span>
              <span className="text-sm text-gray-600">📍 {location}</span>
            </div>
          )}

          {/* Manual Interests Display */}
          {manualInterests && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Additional Interests:</span>
              <span className="text-sm text-gray-600">{manualInterests}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-12">
          <Button
            variant={activeTab === "interests" ? "default" : "outline"}
            onClick={() => setActiveTab("interests")}
            className="font-medium"
          >
            Interests ({mockInterests.length})
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => setActiveTab("events")}
            className="font-medium"
          >
            Events ({mockEvents.length})
          </Button>
        </div>

        {/* Content */}
        {activeTab === "interests" && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8">
              Your Interests
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockInterests.map((interest) => (
                <InterestCard key={interest.id} interest={interest} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8">
              Recommended Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockEvents.map((event) => (
                <EventCard key={event.eventId} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 