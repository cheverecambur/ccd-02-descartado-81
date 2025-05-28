
import { BlogPost } from "@/types/blog";
import { storageService } from "../storage/localStorageService";

// Function to normalize author data to ensure consistency
const normalizeAuthor = (author: any): BlogPost['author'] => {
  if (typeof author === 'string') {
    return {
      name: author,
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
    };
  }
  return {
    name: author.name || "Autor Desconocido",
    avatar: author.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
    bio: author.bio,
    position: author.position,
    publications: author.publications,
    linkedin: author.linkedin
  };
};

// Function to get all posts from storage
export const getAllPosts = (): BlogPost[] => {
  try {
    const posts = storageService.getAllPosts();
    return posts.map(post => ({
      ...post,
      author: normalizeAuthor(post.author)
    }));
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
};

// Function to get posts by category
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  if (categoryId === 'all') {
    return getAllPosts();
  }
  try {
    return getAllPosts().filter(post => post.category === categoryId);
  } catch (error) {
    console.error("Error filtering posts by category:", error);
    return [];
  }
};

// Function to get post by ID
export const getPostById = (id: string): BlogPost | undefined => {
  try {
    const post = storageService.getPostById(id);
    if (!post) return undefined;
    
    return {
      ...post,
      author: normalizeAuthor(post.author)
    };
  } catch (error) {
    console.error("Error loading post by ID:", error);
    return undefined;
  }
};

// Function to get related posts
export const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
  try {
    const post = getPostById(postId);
    if (!post) return [];
    
    // Get posts from the same category, excluding the current post
    return getAllPosts()
      .filter(p => p.id !== postId && p.category === post.category)
      .slice(0, limit);
  } catch (error) {
    console.error("Error loading related posts:", error);
    return [];
  }
};

// Function to save a post
export const savePost = async (post: BlogPost): Promise<BlogPost> => {
  try {
    const normalizedPost = {
      ...post,
      author: normalizeAuthor(post.author)
    };
    return storageService.savePost(normalizedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    throw new Error("No se pudo guardar el artículo");
  }
};

// Function to delete a post
export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    return storageService.deletePost(postId);
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};

// Function to search posts
export const searchPosts = (query: string): BlogPost[] => {
  try {
    const results = storageService.searchPosts(query);
    return results.map(post => ({
      ...post,
      author: normalizeAuthor(post.author)
    }));
  } catch (error) {
    console.error("Error searching posts:", error);
    return [];
  }
};
