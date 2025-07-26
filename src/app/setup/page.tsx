"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { SocialMediaForm } from "@/components/SocialMediaForm";
import { SocialMediaHandles } from "@/types";

export default function SetupPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (handles: SocialMediaHandles, manualInterests: string, location: string) => {
    setIsProcessing(true);
    
    // Simulate API call to backend LLM
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Store the handles, manual interests, and location in localStorage for demo purposes
      localStorage.setItem("eventMeshHandles", JSON.stringify(handles));
      if (manualInterests.trim()) {
        localStorage.setItem("eventMeshManualInterests", manualInterests);
      }
      if (location) {
        localStorage.setItem("eventMeshLocation", location);
      }
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error processing handles:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Set Up Your Profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your social media profiles to help us understand your interests 
            and find events that match your preferences.
          </p>
        </div>

        <div className="flex justify-center">
          <SocialMediaForm 
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
          />
        </div>

        {isProcessing && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Analyzing your social media profiles...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 