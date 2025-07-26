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
    id: "1",
    title: "AI & Machine Learning Summit 2024",
    description: "Join industry leaders and researchers for a comprehensive exploration of the latest developments in AI and machine learning.",
    date: "2024-03-15",
    location: "San Francisco, CA",
    category: "Technology",
    relevanceScore: 0.95
  },
  {
    id: "2",
    title: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts in an intimate networking setting.",
    date: "2024-03-20",
    location: "New York, NY",
    category: "Business",
    relevanceScore: 0.87
  },
  {
    id: "3",
    title: "Web Development Conference",
    description: "Learn about the latest trends in web development, from React to serverless architectures.",
    date: "2024-03-25",
    location: "Austin, TX",
    category: "Technology",
    relevanceScore: 0.82
  },
  {
    id: "4",
    title: "Design Thinking Workshop",
    description: "Master the principles of design thinking and user-centered design methodologies.",
    date: "2024-04-01",
    location: "Seattle, WA",
    category: "Design",
    relevanceScore: 0.76
  },
  {
    id: "5",
    title: "Tech Innovation Meetup",
    description: "Monthly meetup for tech enthusiasts to discuss emerging technologies and industry trends.",
    date: "2024-03-28",
    location: "Boston, MA",
    category: "Innovation",
    relevanceScore: 0.84
  },
  {
    id: "6",
    title: "Professional Growth Summit",
    description: "Develop your professional skills and expand your network with industry experts.",
    date: "2024-04-05",
    location: "Chicago, IL",
    category: "Networking",
    relevanceScore: 0.89
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personalized Dashboard
          </h1>
          <p className="text-gray-600">
            Based on your social media analysis, here are your interests and recommended events.
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

          {/* Manual Interests Display */}
          {manualInterests && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Additional Interests:</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">{manualInterests}</p>
              </div>
            </div>
          )}

          {/* Location Display */}
          {location && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Location:</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">📍 {location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <Button
            variant={activeTab === "interests" ? "default" : "outline"}
            onClick={() => setActiveTab("interests")}
          >
            Your Interests ({mockInterests.length})
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => setActiveTab("events")}
          >
            Recommended Events ({mockEvents.length})
          </Button>
        </div>

        {/* Content */}
        {activeTab === "interests" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Interests Extracted from Your Profiles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockInterests.map((interest) => (
                <InterestCard key={interest.id} interest={interest} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Events Tailored to Your Interests
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 