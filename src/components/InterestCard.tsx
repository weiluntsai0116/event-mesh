import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserInterest } from "@/types";

interface InterestCardProps {
  interest: UserInterest;
}

export function InterestCard({ interest }: InterestCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "bg-green-100 text-green-800";
    if (confidence >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.6) return "Medium";
    return "Low";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{interest.name}</CardTitle>
          <Badge className={getConfidenceColor(interest.confidence)}>
            {getConfidenceText(interest.confidence)} Confidence
          </Badge>
        </div>
        <Badge variant="secondary" className="text-xs">
          {interest.category}
        </Badge>
      </CardHeader>
      <CardContent>
        {interest.description && (
          <p className="text-sm text-gray-600">{interest.description}</p>
        )}
        <div className="mt-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${interest.confidence * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(interest.confidence * 100)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 