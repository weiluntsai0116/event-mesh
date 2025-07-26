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
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {event.category}
            </Badge>
          </div>
          <Badge className={getRelevanceColor(event.relevanceScore)}>
            {getRelevanceText(event.relevanceScore)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">📍</span>
            <span>{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${event.relevanceScore * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(event.relevanceScore * 100)}% match
            </span>
          </div>
          <Button size="sm" variant="outline">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 