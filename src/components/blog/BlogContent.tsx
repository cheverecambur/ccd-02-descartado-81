
import { FeaturedPostsSection } from "./FeaturedPostsSection";
import { PostsSection } from "./PostsSection";
import { SearchResultsNotice } from "./SearchResultsNotice";
import { CategoryTabs } from "./CategoryTabs";
import { BlogPagination } from "./BlogPagination";
import { BlogPost } from "@/types/blog";
import { categories } from "@/services/blogService";

interface BlogContentProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchTerm: string;
  searchResults: BlogPost[];
  featuredPosts: BlogPost[];
  currentPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clearSearch: () => void;
  isSearching: boolean;
}

export const BlogContent = ({
  activeCategory,
  setActiveCategory,
  searchTerm,
  searchResults,
  featuredPosts,
  currentPosts,
  totalPages,
  currentPage,
  setCurrentPage,
  clearSearch,
  isSearching
}: BlogContentProps) => {
  return (
    <div className="lg:w-2/3">
      {/* Categories Tabs */}
      <CategoryTabs 
        categories={categories} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        clearSearch={clearSearch}
        hasSearchResults={searchResults.length > 0}
      />
      
      {/* Search Results Notice */}
      {searchResults.length > 0 && (
        <SearchResultsNotice 
          searchTerm={searchTerm}
          resultsCount={searchResults.length}
          onClear={clearSearch}
        />
      )}
      
      {/* Featured Posts - Only show when not searching */}
      {activeCategory === "all" && searchResults.length === 0 && (
        <FeaturedPostsSection posts={featuredPosts} />
      )}
      
      {/* Current Posts */}
      <PostsSection 
        title={
          searchResults.length > 0 
            ? "Resultados de Búsqueda" 
            : activeCategory === "all" 
              ? "Artículos Recientes" 
              : categories.find(cat => cat.id === activeCategory)?.name || ""
        }
        posts={currentPosts}
        isSearchResults={searchResults.length > 0}
        showViewAllLink={activeCategory === "all" && searchResults.length === 0}
        isLoading={isSearching}
      />
      
      {/* Pagination */}
      <BlogPagination 
        currentPage={currentPage} 
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
