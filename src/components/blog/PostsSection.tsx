
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPost } from "@/types/blog";
import { LoadingState } from "@/components/blog/LoadingState";

interface PostsSectionProps {
  title: string;
  posts: BlogPost[];
  isSearchResults: boolean;
  showViewAllLink?: boolean;
  viewAllLink?: string;
  isLoading?: boolean;
}

export const PostsSection = ({ 
  title, 
  posts, 
  isSearchResults, 
  showViewAllLink = false,
  viewAllLink = "/blog/recent",
  isLoading = false
}: PostsSectionProps) => {
  if (isLoading) {
    return <LoadingState isLoading={true} customMessage="Cargando artículos..." />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAllLink && !isSearchResults && (
          <Link to={viewAllLink} className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">No se encontraron artículos para esta categoría</p>
        </div>
      )}
    </div>
  );
};
