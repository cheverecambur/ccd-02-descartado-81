
import { BlogPost } from "@/types/blog";
import { featuredPosts, recentPosts } from "./blogPostsData";

// Function to get all posts
export const getAllPosts = (): BlogPost[] => {
  return [...featuredPosts, ...recentPosts];
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
  return getAllPosts().find(post => post.id === id);
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
