
import { useState, useEffect } from "react";
import { BlogPost, CategoryInfo } from "@/types/blog";
import { getAllPosts, getPostById } from "@/services/posts/blogPostsService";
import { categories, popularTags } from "@/services/posts/categoriesService";
import { useToast } from "@/hooks/use-toast";

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
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const posts = getAllPosts();
        setAllPosts(posts);
        
        // Count posts per category
        const categoryPostCounts: { [key: string]: number } = {};
        categories.forEach(cat => {
          categoryPostCounts[cat.id] = posts.filter(post => post.category === cat.id).length;
        });
        
        // Get top 5 tags
        const tagCounts: { [key: string]: number } = {};
        posts.forEach(post => {
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
        const recentPosts = [...posts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);
        
        setStats({
          totalPosts: posts.length,
          postsPerCategory: categoryPostCounts,
          topTags,
          recentPosts
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las estadísticas del blog",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const savePost = async (post: BlogPost): Promise<BlogPost> => {
    // This would connect to a real backend API in a production app
    // For now, we're using a mock implementation that simulates saving
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Saving post:", post);
        
        // If this is a new post or edited post, update our local state
        setAllPosts(prev => {
          const index = prev.findIndex(p => p.id === post.id);
          if (index >= 0) {
            // Update existing post
            const updatedPosts = [...prev];
            updatedPosts[index] = post;
            return updatedPosts;
          } else {
            // Add new post
            return [...prev, post];
          }
        });
        
        resolve(post);
      }, 800);
    });
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    // This would connect to a real backend API in a production app
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Deleting post:", postId);
        
        // Update our local state to remove the post
        setAllPosts(prev => prev.filter(post => post.id.toString() !== postId));
        
        resolve(true);
      }, 800);
    });
  };

  const updateCategory = async (category: CategoryInfo): Promise<CategoryInfo> => {
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
    allPosts,
    savePost,
    deletePost,
    updateCategory,
    categories,
    popularTags,
    refreshStats: () => {
      const fetchStats = async () => {
        setIsLoading(true);
        try {
          const posts = getAllPosts();
          
          // Count posts per category
          const categoryPostCounts: { [key: string]: number } = {};
          categories.forEach(cat => {
            categoryPostCounts[cat.id] = posts.filter(post => post.category === cat.id).length;
          });
          
          // Get top 5 tags
          const tagCounts: { [key: string]: number } = {};
          posts.forEach(post => {
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
          const recentPosts = [...posts]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
          
          setStats({
            totalPosts: posts.length,
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
    }
  };
};
