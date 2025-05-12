
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { categories, featuredPosts, getPostsByCategory, useSearch } from "@/services/blogService";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { searchQuery, setSearchQuery, searchResults, isSearching, handleSearch } = useSearch();
  const { toast } = useToast();

  const postsPerPage = 6;
  
  // Obtener posts para la categoría activa
  const filteredPosts = searchResults.length > 0 
    ? searchResults 
    : getPostsByCategory(activeCategory);
  
  // Calcular la paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Resetear la página al cambiar de categoría
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Manejar la búsqueda desde la barra lateral
  const handleSidebarSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(new Event('submit') as any);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-mining-700 to-engineering-800 text-white py-16 md:py-24">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Blog EduMining
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  Artículos, investigaciones y noticias sobre ingeniería, minería y gestión 
                  de proyectos mineros escritos por expertos de la industria.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
                    <img src="https://randomuser.me/api/portraits/men/86.jpg" className="w-8 h-8 rounded-full border-2 border-white" alt="Author" />
                  </div>
                  <span className="text-sm text-white/80">
                    Escrito por nuestros expertos en ingeniería y minería
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                {/* Categories Tabs */}
                <Tabs defaultValue="all" className="mb-10">
                  <TabsList className="mb-4 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-100 dark:border-gray-700">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          // Limpiar resultados de búsqueda al cambiar categoría
                          if (searchResults.length > 0) {
                            setSearchQuery("");
                            // No more setSearchResults, we'll use handleSearch with empty query
                            handleSearch(new Event('submit') as any);
                          }
                        }}
                        className="data-[state=active]:bg-mining-100 dark:data-[state=active]:bg-mining-900/30 data-[state=active]:text-mining-700 dark:data-[state=active]:text-mining-400"
                      >
                        {category.name} ({category.count})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    {/* Search Results Notice */}
                    {searchResults.length > 0 && (
                      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">Resultados para: <span className="text-mining-600 dark:text-mining-400">"{searchQuery}"</span></h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Se encontraron {searchResults.length} artículos</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSearchQuery("");
                              // No more setSearchResults, we'll use handleSearch with empty query
                              handleSearch(new Event('submit') as any);
                              toast({
                                title: "Búsqueda reiniciada",
                                description: "Mostrando todos los artículos nuevamente",
                              });
                            }}
                          >
                            Limpiar búsqueda
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* Featured Posts - Only show when not searching */}
                    {activeCategory === "all" && searchResults.length === 0 && (
                      <div className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-bold">Artículos Destacados</h2>
                          <Link to="/blog/featured" className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1">
                            Ver todos
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {featuredPosts.map(post => (
                            <PostCard key={post.id} post={post} variant="featured" />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Current Posts */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                          {searchResults.length > 0 
                            ? "Resultados de Búsqueda" 
                            : activeCategory === "all" 
                              ? "Artículos Recientes" 
                              : categories.find(cat => cat.id === activeCategory)?.name}
                        </h2>
                        {activeCategory === "all" && searchResults.length === 0 && (
                          <Link to="/blog/recent" className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1">
                            Ver todos
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      
                      {currentPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {currentPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                          <p className="text-gray-600 dark:text-gray-400">No se encontraron artículos para esta categoría</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  {/* These TabsContent components are handled by the filtering logic above */}
                  <TabsContent value="tendencias" className="mt-0"></TabsContent>
                  <TabsContent value="mejores-practicas" className="mt-0"></TabsContent>
                  <TabsContent value="investigacion" className="mt-0"></TabsContent>
                </Tabs>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      >
                        Anterior
                      </Button>
                      
                      {[...Array(totalPages)].map((_, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className={`
                            ${currentPage === idx + 1 ? 
                              "bg-mining-50 dark:bg-mining-900/30 text-mining-700 dark:text-mining-300" : 
                              ""
                            }
                          `}
                          onClick={() => setCurrentPage(idx + 1)}
                        >
                          {idx + 1}
                        </Button>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <BlogSidebar onSearch={handleSidebarSearch} />
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
