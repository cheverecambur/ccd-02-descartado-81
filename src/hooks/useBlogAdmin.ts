
import { useState, useEffect } from "react";
import { BlogPost, CategoryInfo } from "@/types/blog";
import { getAllPosts, getPostById } from "@/services/posts/blogPostsService";
import { categories, popularTags } from "@/services/posts/categoriesService";

interface AdminStats {
  totalPosts: number;
  postsPerCategory: { [key: string]: number };
  topTags: { name: string; count: number }[];
  recentPosts: BlogPost[];
}

export const useBlogAdmin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<AdminStats>({
    totalPosts: 0,
    postsPerCategory: {},
    topTags: [],
    recentPosts: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const allPosts = getAllPosts();
        
        // Count posts per category
        const categoryPostCounts: { [key: string]: number } = {};
        categories.forEach(cat => {
          categoryPostCounts[cat.id] = allPosts.filter(post => post.category === cat.id).length;
        });
        
        // Get top 5 tags
        const tagCounts: { [key: string]: number } = {};
        allPosts.forEach(post => {
          if (post.tags) {
            post.tags.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        });
        
        const topTags = Object.entries(tagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        // Get 5 most recent posts
        const recentPosts = [...allPosts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        
        setStats({
          totalPosts: allPosts.length,
          postsPerCategory: categoryPostCounts,
          topTags,
          recentPosts
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const savePost = (post: BlogPost): Promise<BlogPost> => {
    // This would connect to a real backend API in a production app
    // For now, we're using a mock implementation that simulates saving
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Saving post:", post);
        resolve(post);
      }, 800);
    });
  };

  const deletePost = (postId: string): Promise<boolean> => {
    // This would connect to a real backend API in a production app
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Deleting post:", postId);
        resolve(true);
      }, 800);
    });
  };

  const updateCategory = (category: CategoryInfo): Promise<CategoryInfo> => {
    // This would connect to a real backend API in a production app
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Updating category:", category);
        resolve(category);
      }, 800);
    });
  };

  return {
    isLoading,
    stats,
    savePost,
    deletePost,
    updateCategory,
    categories,
    popularTags
  };
};
