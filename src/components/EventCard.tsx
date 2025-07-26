import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getRelevanceColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 text-green-800";
    if (score >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getRelevanceText = (score: number) => {
    if (score >= 0.8) return "Perfect Match";
    if (score >= 0.6) return "Good Match";
    return "Relevant";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-medium mb-2">{event.eventName}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {event.eventType}
            </Badge>
          </div>
          <Badge className={getRelevanceColor(event.relevanceScore)}>
            {getRelevanceText(event.relevanceScore)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          {event.eventDescription}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">📍</span>
            <span>{event.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">👥</span>
            <span>{event.organizedByGroup}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5 w-20">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${event.relevanceScore * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(event.relevanceScore * 100)}% match
            </span>
          </div>
          <a
            href={event.eventUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
} 