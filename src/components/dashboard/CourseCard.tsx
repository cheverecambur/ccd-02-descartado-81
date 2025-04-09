
import { Link } from "react-router-dom";
import { ExternalLink, Clock, Users, Star, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: "engineering" | "mining" | "management";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  enrolled: number;
  rating: number;
  image: string;
  progress?: number;
  isLive?: boolean;
  liveDate?: string;
  featured?: boolean;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  category,
  level,
  duration,
  enrolled,
  rating,
  image,
  progress = 0,
  isLive = false,
  liveDate,
  featured = false,
}: CourseCardProps) => {
  const categoryLabel = {
    engineering: "Ingeniería",
    mining: "Minería",
    management: "Gestión",
  };

  const levelLabel = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover-card-effect h-full flex flex-col group",
      featured ? "border-primary/30 dark:border-primary/40 shadow-md" : "",
      isLive ? "ring-1 ring-red-500" : ""
    )}>
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-all duration-500"
        />
        {isLive && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
            <span className="animate-pulse relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            EN VIVO
          </div>
        )}
        
        {liveDate && !isLive && (
          <div className="absolute top-3 right-3 bg-gray-800/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
            <Clock className="h-3 w-3 mr-1 inline-block" />
            {liveDate}
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={`badge-category badge-category-${category}`}>
            {categoryLabel[category]}
          </span>
          <span className={`badge-level badge-level-${level}`}>
            {levelLabel[level]}
          </span>
        </div>
        
        {/* Overlay with quick action button */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {isLive ? (
            <Button variant="cta" size="sm" className="transform scale-90 group-hover:scale-100 transition-transform">
              <PlayCircle className="h-4 w-4 mr-1" />
              Unirme ahora
            </Button>
          ) : (
            <Button variant="view" size="sm" className="transform scale-90 group-hover:scale-100 transition-transform">
              <PlayCircle className="h-4 w-4 mr-1" />
              Vista previa
            </Button>
          )}
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            {featured && (
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium px-2 py-0.5 rounded-full">
                Destacado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <p className="text-sm font-medium">Instructor: {instructor}</p>
          
          {progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progreso</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{enrolled}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link
          to={`/course/${id}`}
          className="group"
        >
          <Button 
            variant="view" 
            size="sm" 
            className="flex items-center gap-1 transform group-hover:translate-x-0.5 transition-transform"
          >
            <span>Ver curso</span>
            <ExternalLink className="h-3.5 w-3.5 group-hover:animate-pulse" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
