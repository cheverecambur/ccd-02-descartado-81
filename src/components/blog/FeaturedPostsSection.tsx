
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { BlogPost } from "@/types/blog";

interface FeaturedPostsSectionProps {
  posts: BlogPost[];
}

export const FeaturedPostsSection = ({ posts }: FeaturedPostsSectionProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Artículos Destacados</h2>
        <Link to="/blog/featured" className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1">
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} variant="featured" />
        ))}
      </div>
    </div>
  );
};
