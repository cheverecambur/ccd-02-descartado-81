
import { useState } from "react";
import { BlogPost } from "@/types/blog";
import { storageService } from "../storage/localStorageService";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchTerm("");
      return;
    }

    setIsSearching(true);
    setSearchTerm(query);

    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = storageService.searchPosts(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error performing search:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    performSearch,
    clearSearch
  };
};
