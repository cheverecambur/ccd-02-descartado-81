
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare, User } from "lucide-react";
import { BlogPost } from "@/services/blogService";

interface PostCardProps {
  post: BlogPost;
  variant?: "featured" | "regular" | "compact";
}

export const PostCard = ({ post, variant = "regular" }: PostCardProps) => {
  // Determinar si el autor es un string o un objeto
  const authorName = typeof post.author === 'object' ? post.author.name : post.author;
  const authorAvatar = typeof post.author === 'object' ? post.author.avatar : "";
  const authorInitial = authorName.charAt(0);

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow">
        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardHeader className="py-4">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="px-2 py-1 bg-mining-100 dark:bg-mining-900/30 text-mining-700 dark:text-mining-400 rounded-full capitalize">
              {post.category.replace("-", " ")}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime}
            </span>
          </div>
          <Link to={`/blog/${post.id}`} className="group">
            <h3 className="text-lg font-bold group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="py-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="pt-4 flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Avatar className="h-5 w-5 mr-2">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
            <span>{authorName}</span>
            <span className="mx-1">•</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>{post.comments}</span>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <Link to={`/blog/${post.id}`} className="group">
            <h4 className="font-semibold line-clamp-2 group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors">
              {post.title}
            </h4>
          </Link>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime}</span>
            <span className="mx-1">•</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default regular variant
  return (
    <Card className="overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300 border-0 shadow">
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="md:w-2/3 flex flex-col p-4">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="px-2 py-1 bg-mining-100 dark:bg-mining-900/30 text-mining-700 dark:text-mining-400 rounded-full capitalize">
            {post.category.replace("-", " ")}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>
        <Link to={`/blog/${post.id}`} className="group mb-2">
          <h3 className="text-lg font-bold group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
            <span>{authorName}</span>
            <span className="mx-1">•</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
