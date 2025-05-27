
import { useState, useEffect } from "react";
import { BlogPost, CategoryInfo } from "@/types/blog";
import { storageService } from "@/services/storage/localStorageService";
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
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const { toast } = useToast();

  const refreshStats = () => {
    setIsLoading(true);
    try {
      const posts = storageService.getAllPosts();
      const categoriesData = storageService.getAllCategories();
      const statsData = storageService.getPostsStats();
      
      setAllPosts(posts);
      setCategories(categoriesData);
      setStats(statsData);
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

  useEffect(() => {
    refreshStats();
  }, [toast]);

  const savePost = async (post: BlogPost): Promise<BlogPost> => {
    try {
      const savedPost = await storageService.savePost(post);
      refreshStats(); // Refresh data after saving
      toast({
        title: "Artículo guardado",
        description: "El artículo ha sido guardado exitosamente."
      });
      return savedPost;
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el artículo",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deletePost = async (postId: string): Promise<boolean> => {
    try {
      const success = await storageService.deletePost(postId);
      if (success) {
        refreshStats(); // Refresh data after deletion
        toast({
          title: "Artículo eliminado",
          description: "El artículo ha sido eliminado exitosamente."
        });
      }
      return success;
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el artículo",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateCategory = async (category: CategoryInfo): Promise<CategoryInfo> => {
    try {
      const savedCategory = await storageService.saveCategory(category);
      refreshStats(); // Refresh data after updating
      toast({
        title: "Categoría guardada",
        description: "La categoría ha sido guardada exitosamente."
      });
      return savedCategory;
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la categoría",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    isLoading,
    stats,
    allPosts,
    categories,
    savePost,
    deletePost,
    updateCategory,
    refreshStats
  };
};
