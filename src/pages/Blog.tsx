
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { 
    activeCategory,
    setActiveCategory,
    currentPage,
    setCurrentPage,
    searchTerm,
    searchResults,
    isSearching,
    currentPosts,
    totalPages,
    featuredPosts,
    handleSearch,
    clearSearch
  } = useBlogPosts();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <BlogHeader />
          
          {/* Content Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <BlogContent 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchTerm={searchTerm}
                searchResults={searchResults}
                featuredPosts={featuredPosts}
                currentPosts={currentPosts}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                clearSearch={clearSearch}
                isSearching={isSearching}
              />
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <BlogSidebar onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
