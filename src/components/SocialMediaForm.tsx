"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SocialMediaHandles } from "@/types";

interface SocialMediaFormProps {
  onSubmit: (handles: SocialMediaHandles, manualInterests: string, location: string) => void;
  isProcessing: boolean;
}

export function SocialMediaForm({ onSubmit, isProcessing }: SocialMediaFormProps) {
  const [handles, setHandles] = useState<SocialMediaHandles>({
    instagram: "",
    linkedin: "",
  });
  const [manualInterests, setManualInterests] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<Partial<SocialMediaHandles>>({});

  const validateHandles = () => {
    const newErrors: Partial<SocialMediaHandles> = {};
    
    if (!handles.instagram && !handles.linkedin) {
      newErrors.instagram = "Please provide at least one social media handle";
    }

    if (handles.instagram && !handles.instagram.startsWith("@")) {
      newErrors.instagram = "Instagram handle should start with @";
    }

    if (handles.linkedin && !handles.linkedin.includes("linkedin.com/in/")) {
      newErrors.linkedin = "Please provide a valid LinkedIn profile URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateHandles()) {
      onSubmit(handles, manualInterests, location);
    }
  };

  const handleInputChange = (field: keyof SocialMediaHandles, value: string) => {
    setHandles(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Connect Your Profiles
        </CardTitle>
        <CardDescription className="text-center">
          Provide your social media handles so we can analyze your interests and find 
          events that match your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input
              id="instagram"
              type="text"
              placeholder="@yourusername"
              value={handles.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              disabled={isProcessing}
              className={errors.instagram ? "border-red-500" : ""}
            />
            {errors.instagram && (
              <p className="text-sm text-red-500">{errors.instagram}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={handles.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              disabled={isProcessing}
              className={errors.linkedin ? "border-red-500" : ""}
            />
            {errors.linkedin && (
              <p className="text-sm text-red-500">{errors.linkedin}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Additional Interests (Optional)</Label>
            <Textarea
              id="interests"
              placeholder="Tell us about your interests, hobbies, or topics you&apos;re passionate about. For example: &apos;I love machine learning, photography, and hiking. I&apos;m interested in tech startups and sustainable living.&apos;"
              value={manualInterests}
              onChange={(e) => setManualInterests(e.target.value)}
              disabled={isProcessing}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              This helps us provide more accurate event recommendations alongside your social media analysis.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isProcessing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your location</option>
              <option value="New York, NY">New York, NY</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
              <option value="Chicago, IL">Chicago, IL</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="Boston, MA">Boston, MA</option>
              <option value="Denver, CO">Denver, CO</option>
              <option value="Miami, FL">Miami, FL</option>
              <option value="Nashville, TN">Nashville, TN</option>
              <option value="Other">Other</option>
            </select>
            <p className="text-xs text-gray-500">
              We&apos;ll use this to find events near you.
            </p>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Analyzing your profiles...</span>
                <span>This may take a few minutes</span>
              </div>
              <Progress value={undefined} className="w-full" />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Analyze My Interests"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">What we analyze:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Posts and captions you engage with</li>
            <li>• Professional connections and interests</li>
            <li>• Topics and hashtags you follow</li>
            <li>• Your professional background</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 