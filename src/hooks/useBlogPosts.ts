
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearch } from "@/services/search/searchService";
import { BlogPost } from "@/types/blog";
import { getAllPosts } from "@/services/posts/blogPostsService";
import { featuredPosts } from "@/services/posts/blogPostsData";

export const useBlogPosts = (initialCategory: string = "all", postsPerPage: number = 6) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm, setSearchTerm, searchResults, isSearching, performSearch } = useSearch();
  const { toast } = useToast();

  // Get posts for active category
  const filteredPosts = searchResults.length > 0 
    ? searchResults 
    : getAllPosts().filter(post => 
        activeCategory === "all" ? true : post.category === activeCategory
      );
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset page when changing category
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    performSearch(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    performSearch("");
    toast({
      title: "Búsqueda reiniciada",
      description: "Mostrando todos los artículos nuevamente",
    });
  };

  return {
    activeCategory,
    setActiveCategory,
    currentPage,
    setCurrentPage,
    searchTerm,
    searchResults,
    isSearching,
    filteredPosts,
    currentPosts,
    totalPages,
    featuredPosts,
    handleSearch,
    clearSearch
  };
};
