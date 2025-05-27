
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearch } from "@/services/search/searchService";
import { BlogPost } from "@/types/blog";
import { getAllPosts, getPostsByCategory } from "@/services/posts/blogPostsService";

export const useBlogPosts = (initialCategory: string = "all", postsPerPage: number = 6) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const { searchTerm, setSearchTerm, searchResults, isSearching, performSearch } = useSearch();
  const { toast } = useToast();

  // Load posts when component mounts or category changes
  useEffect(() => {
    const loadPosts = () => {
      const posts = activeCategory === "all" 
        ? getAllPosts() 
        : getPostsByCategory(activeCategory);
      setAllPosts(posts);
    };
    
    loadPosts();
  }, [activeCategory]);

  // Get filtered posts (search results or category filtered)
  const filteredPosts = searchResults.length > 0 
    ? searchResults 
    : allPosts;
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get featured posts (first 3 posts)
  const featuredPosts = allPosts.slice(0, 3);

  // Reset page when changing category or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Handle search
  const handleSearch = (query: string) => {
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
