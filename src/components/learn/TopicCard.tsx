
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  imageUrl: string;
}

const TopicCard: React.FC<TopicCardProps> = ({ id, title, description, progress, imageUrl }) => {
  return (
    <Link to={`/learn/${id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <div className="w-full h-32 overflow-hidden rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              const target = e.target as HTMLImageElement;
              target.src = "/images/placeholder.svg";
            }}
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start pt-0">
          <div className="w-full mb-1 flex justify-between items-center">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full h-2 mb-2" />
          <div className="w-full flex justify-between items-center">
            <span className="text-xs text-primary font-medium">
              {progress === 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Start Learning'}
            </span>
            <ArrowRight className="h-4 w-4 text-primary" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TopicCard;
