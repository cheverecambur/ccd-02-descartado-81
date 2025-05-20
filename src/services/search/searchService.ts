
import { useState } from "react";
import { BlogPost } from "@/types/blog";
import { getAllPosts } from "../posts/blogPostsService";

// Hook for search functionality
export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const lowerTerm = term.toLowerCase();
      const results = getAllPosts().filter(post => {
        // Search in title
        if (post.title.toLowerCase().includes(lowerTerm)) return true;
        
        // Search in excerpt
        if (post.excerpt.toLowerCase().includes(lowerTerm)) return true;
        
        // Search in content if available
        if (post.content && post.content.toLowerCase().includes(lowerTerm)) return true;
        
        // Search in category
        if (typeof post.category === 'string' && post.category.toLowerCase().includes(lowerTerm)) return true;
        
        // Search in tags
        if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerTerm))) return true;
        
        // Search in author name
        if (typeof post.author === 'object' && post.author.name.toLowerCase().includes(lowerTerm)) return true;
        if (typeof post.author === 'string' && post.author.toLowerCase().includes(lowerTerm)) return true;
        
        return false;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    performSearch
  };
};
