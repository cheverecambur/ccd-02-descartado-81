
import { BlogPost } from "@/types/blog";
import { storageService } from "../storage/localStorageService";

// Function to get all posts from storage
export const getAllPosts = (): BlogPost[] => {
  return storageService.getAllPosts();
};

// Function to get posts by category
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  if (categoryId === 'all') {
    return getAllPosts();
  }
  return getAllPosts().filter(post => post.category === categoryId);
};

// Function to get post by ID
export const getPostById = (id: string): BlogPost | undefined => {
  return storageService.getPostById(id);
};

// Function to get related posts
export const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
  const post = getPostById(postId);
  if (!post) return [];
  
  // Get posts from the same category, excluding the current post
  return getAllPosts()
    .filter(p => p.id !== postId && p.category === post.category)
    .slice(0, limit);
};

// Function to save a post
export const savePost = async (post: BlogPost): Promise<BlogPost> => {
  return storageService.savePost(post);
};

// Function to delete a post
export const deletePost = async (postId: string): Promise<boolean> => {
  return storageService.deletePost(postId);
};

// Function to search posts
export const searchPosts = (query: string): BlogPost[] => {
  return storageService.searchPosts(query);
};
