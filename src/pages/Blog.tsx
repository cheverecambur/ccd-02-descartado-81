
import { useParams, useLocation } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { HeroSection } from "@/components/blog/HeroSection";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { SearchResultsNotice } from "@/components/blog/SearchResultsNotice";
import { FeaturedPostsSection } from "@/components/blog/FeaturedPostsSection";
import { PostsSection } from "@/components/blog/PostsSection";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogContent } from "@/components/blog/BlogContent";
import { LoadingState } from "@/components/blog/LoadingState";
import BlogAdminLink from "@/components/admin/BlogAdminLink";

const Blog = () => {
  const params = useParams();
  const { pathname } = useLocation();
  
  // Get category from route param if it exists
  const categoryParam = params.category || "all";
  
  // Get tag from route param if it exists
  const tagParam = params.tag || "";
  
  // Check if we're on specific routes to filter by featured or recent
  const isFeatured = pathname.includes("/featured");
  const isRecent = pathname.includes("/recent");
  
  // Filter by tag if present, otherwise use the category
  const initialCategory = tagParam ? "all" : categoryParam;
  
  // Use the custom hook for blog posts filtering, search and pagination
  const {
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
  } = useBlogPosts(initialCategory);
  
  // Show featured posts only if we're on the featured route
  const showFeatured = isFeatured || (!isRecent && !tagParam && activeCategory === "all");
  
  // If searching, show only search results
  const showResults = searchTerm.length > 0 && searchResults.length > 0;
  
  // Get title based on current filter
  const getTitle = () => {
    if (tagParam) return `Artículos con etiqueta: ${tagParam}`;
    if (isFeatured) return "Artículos Destacados";
    if (isRecent) return "Artículos Recientes";
    return "Blog de CCD Capacitación";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <BlogContent>
        <div className="container mx-auto px-4 py-8">
          {/* Admin Link */}
          <div className="flex justify-end mb-6">
            <BlogAdminLink />
          </div>

          <HeroSection />

          <CategoryTabs 
            activeCategory={tagParam ? "all" : activeCategory}
            setActiveCategory={setActiveCategory}
            categories={[]}
            clearSearch={clearSearch}
            hasSearchResults={searchTerm.length > 0}
          />
          
          {searchTerm && (
            <SearchResultsNotice 
              searchTerm={searchTerm} 
              resultsCount={searchResults.length} 
              onClear={clearSearch} 
            />
          )}

          {showFeatured && !searchTerm && (
            <FeaturedPostsSection posts={featuredPosts} />
          )}

          {isSearching ? (
            <LoadingState isLoading={isSearching} />
          ) : (
            <>
              <PostsSection 
                posts={currentPosts} 
                category={activeCategory}
                searchTerm={searchTerm}
              />

              {filteredPosts.length > 0 && totalPages > 1 && (
                <BlogPagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              )}
            </>
          )}
        </div>
      </BlogContent>
    </div>
  );
};

export default Blog;
