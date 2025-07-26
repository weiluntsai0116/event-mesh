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
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg font-medium">{interest.name}</CardTitle>
          <Badge className={getConfidenceColor(interest.confidence)}>
            {getConfidenceText(interest.confidence)}
          </Badge>
        </div>
        <Badge variant="secondary" className="text-xs">
          {interest.category}
        </Badge>
      </CardHeader>
      <CardContent>
        {interest.description && (
          <p className="text-sm text-gray-600 mb-4">{interest.description}</p>
        )}
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${interest.confidence * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {Math.round(interest.confidence * 100)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
} 