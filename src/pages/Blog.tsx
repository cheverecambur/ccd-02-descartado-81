
import { useParams, useLocation } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { HeroSection } from "@/components/blog/HeroSection";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { SearchResultsNotice } from "@/components/blog/SearchResultsNotice";
import { FeaturedPostsSection } from "@/components/blog/FeaturedPostsSection";
import { PostsSection } from "@/components/blog/PostsSection";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { LoadingState } from "@/components/blog/LoadingState";
import BlogAdminLink from "@/components/admin/BlogAdminLink";
import { featuredPosts } from "@/services/posts/blogPostsData";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { categories } from "@/services/posts/categoriesService";
import { BlogSidebar } from "@/components/blog/BlogSidebar";

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
    handleSearch,
    clearSearch
  } = useBlogPosts(initialCategory);
  
  // Get title based on current filter
  const getTitle = () => {
    if (tagParam) return `Artículos con etiqueta: ${tagParam}`;
    if (isFeatured) return "Artículos Destacados";
    if (isRecent) return "Artículos Recientes";
    if (activeCategory !== "all") {
      const category = categories.find(cat => cat.id === activeCategory);
      return category ? category.name : "Blog de CCD Capacitación";
    }
    return "Blog de CCD Capacitación";
  };

  // Get first featured post for hero section
  const heroPost = featuredPosts[0];
  
  // Show featured posts only on main page with no filters
  const showFeatured = !isRecent && !isFeatured && !tagParam && activeCategory === "all" && !searchTerm;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {!tagParam && !isFeatured && !isRecent && (
        <BlogHeader />
      )}
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Link */}
        <div className="flex justify-end mb-6">
          <BlogAdminLink />
        </div>

        {/* Hero Section - Only show on main page or featured page */}
        {heroPost && !tagParam && !isRecent && (
          <HeroSection post={heroPost} />
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-2/3">
            <CategoryTabs 
              activeCategory={tagParam ? "all" : activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
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

            {/* Show featured posts section on main page or featured page */}
            {(showFeatured || isFeatured) && !isSearching && (
              <FeaturedPostsSection posts={featuredPosts} />
            )}

            {isSearching ? (
              <LoadingState isLoading={isSearching} />
            ) : (
              <>
                <PostsSection 
                  title={getTitle()}
                  posts={currentPosts} 
                  isSearchResults={searchTerm.length > 0}
                  showViewAllLink={!isSearching && !tagParam && activeCategory === "all" && !searchTerm && !isFeatured}
                  isLoading={false}
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
          
          {/* Blog Sidebar */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <BlogSidebar 
              relatedPosts={filteredPosts.slice(0, 3)} 
              onSearch={handleSearch} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
