import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-light text-gray-900 mb-8">
            Discover Events
            <br />
            <span className="text-blue-600">That Match You</span>
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect your social media profiles and let AI find events that align with your interests.
          </p>
          <div className="flex justify-center">
            <Link href="/setup">
              <Button size="lg" className="px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 my-16"></div>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Provide your Instagram and LinkedIn handles for analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Analyze</h3>
              <p className="text-gray-600 leading-relaxed">
                AI extracts your interests from social media activity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Discover</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized event recommendations tailored to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
