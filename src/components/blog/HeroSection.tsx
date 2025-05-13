
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface HeroSectionProps {
  post: BlogPost;
}

export const HeroSection = ({ post }: HeroSectionProps) => {
  // Determine information about the author
  const authorData = typeof post.author === 'object' 
    ? post.author 
    : { name: post.author as string, avatar: "" };
    
  return (
    <div className="relative bg-gradient-to-r from-mining-700 to-engineering-800 text-white py-16">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" 
        style={{backgroundImage: `url(${post.image})`}}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link to="/blog" className="text-mining-300 hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <Link to={`/blog/category/${post.category}`} className="text-mining-300 hover:text-white transition-colors capitalize">
              {post.category.replace("-", " ")}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={authorData.avatar} alt={authorData.name} />
              <AvatarFallback>{authorData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium">{authorData.name}</span>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Calendar className="h-3 w-3" />
                <span>{post.date}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>{post.readTime} de lectura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
