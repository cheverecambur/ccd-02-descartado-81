
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
    
    // Simulate search delay
    setTimeout(() => {
      const results = getAllPosts().filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(term.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
      );
      
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
