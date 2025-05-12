
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, ArrowRight, User, MessageSquare, Clock } from "lucide-react";

const Blog = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const featuredPosts = [
    {
      id: 1,
      title: "Innovaciones en Técnicas de Extracción Sostenible",
      excerpt: "Descubre las últimas tecnologías que están revolucionando la minería sostenible y reduciendo el impacto ambiental.",
      category: "tendencias",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
      author: "María González",
      date: "12 May, 2025",
      readTime: "8 min",
      comments: 24
    },
    {
      id: 2,
      title: "Gestión de Seguridad en Minas Subterráneas",
      excerpt: "Análisis detallado de las mejores prácticas para garantizar la seguridad en operaciones mineras bajo tierra.",
      category: "mejores-practicas",
      image: "https://images.unsplash.com/photo-1582584001264-d8efbf406ab6?auto=format&fit=crop&w=800&q=80",
      author: "Carlos Ramírez",
      date: "8 May, 2025",
      readTime: "12 min",
      comments: 18
    },
    {
      id: 3,
      title: "Avances en Materiales para Equipos de Perforación",
      excerpt: "Investigación sobre nuevos materiales compuestos que extienden la vida útil de los equipos mineros.",
      category: "investigacion",
      image: "https://images.unsplash.com/photo-1579265413518-c7e41bc8e963?auto=format&fit=crop&w=800&q=80",
      author: "Laura Méndez",
      date: "5 May, 2025",
      readTime: "10 min",
      comments: 12
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: "El Impacto de la IA en la Planificación de Operaciones Mineras",
      excerpt: "Cómo la inteligencia artificial está transformando la forma de planificar y optimizar las operaciones en el sector minero.",
      category: "tendencias",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      author: "Ricardo Fuentes",
      date: "3 May, 2025",
      readTime: "7 min",
      comments: 8
    },
    {
      id: 5,
      title: "Gestión del Agua en Proyectos Mineros",
      excerpt: "Estrategias efectivas para la conservación y tratamiento del agua en zonas de explotación minera.",
      category: "mejores-practicas",
      image: "https://images.unsplash.com/photo-1608550032759-a2f8be3c136f?auto=format&fit=crop&w=800&q=80",
      author: "Ana Torres",
      date: "1 May, 2025",
      readTime: "9 min",
      comments: 15
    },
    {
      id: 6,
      title: "Minería Espacial: Perspectivas y Desafíos",
      excerpt: "Un análisis de las posibilidades y retos técnicos que presenta la minería de asteroides.",
      category: "investigacion",
      image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80",
      author: "Miguel Ángel Vega",
      date: "28 Apr, 2025",
      readTime: "14 min",
      comments: 22
    },
    {
      id: 7,
      title: "Normativas Ambientales en la Minería Global",
      excerpt: "Revisión comparativa de las regulaciones ambientales mineras en diferentes regiones del mundo.",
      category: "mejores-practicas",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
      author: "Elena Martínez",
      date: "25 Apr, 2025",
      readTime: "11 min",
      comments: 9
    },
    {
      id: 8,
      title: "Digitalización de Procesos en la Industria Minera",
      excerpt: "Cómo la transformación digital está mejorando la eficiencia operativa y reduciendo costos en minería.",
      category: "tendencias",
      image: "https://images.unsplash.com/photo-1593106410288-caf65aea7ff8?auto=format&fit=crop&w=800&q=80",
      author: "Gabriel Suárez",
      date: "22 Apr, 2025",
      readTime: "8 min",
      comments: 14
    }
  ];

  const popularTags = [
    "Minería Sostenible", 
    "Seguridad", 
    "Innovación", 
    "Ingeniería", 
    "Medio Ambiente",
    "Tecnología", 
    "Extracción", 
    "Procesamiento", 
    "Normativas", 
    "Certificaciones"
  ];

  const categories = [
    { id: "all", name: "Todos los Artículos", count: 18 },
    { id: "tendencias", name: "Tendencias del Sector", count: 6 },
    { id: "mejores-practicas", name: "Mejores Prácticas", count: 8 },
    { id: "investigacion", name: "Investigación y Desarrollo", count: 4 }
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory === "all" 
    ? [...featuredPosts, ...recentPosts]
    : [...featuredPosts, ...recentPosts].filter(post => post.category === activeCategory);

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
                        onClick={() => setActiveCategory(category.id)}
                        className="data-[state=active]:bg-mining-100 dark:data-[state=active]:bg-mining-900/30 data-[state=active]:text-mining-700 dark:data-[state=active]:text-mining-400"
                      >
                        {category.name} ({category.count})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    {/* Featured Posts */}
                    {activeCategory === "all" && (
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
                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                              <div className="h-48 overflow-hidden">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                              </div>
                              <CardHeader className="py-4">
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                  <span className="px-2 py-1 bg-mining-100 dark:bg-mining-900/30 text-mining-700 dark:text-mining-400 rounded-full capitalize">
                                    {post.category.replace("-", " ")}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {post.readTime}
                                  </span>
                                </div>
                                <Link to={`/blog/${post.id}`} className="group">
                                  <h3 className="text-lg font-bold group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors line-clamp-2">
                                    {post.title}
                                  </h3>
                                </Link>
                              </CardHeader>
                              <CardContent className="py-0">
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                  {post.excerpt}
                                </p>
                              </CardContent>
                              <CardFooter className="pt-4 flex items-center justify-between">
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <User className="h-3 w-3 mr-1" />
                                  <span>{post.author}</span>
                                  <span className="mx-1">•</span>
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  <span>{post.comments}</span>
                                </div>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Recent Posts */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Artículos Recientes</h2>
                        {activeCategory === "all" && (
                          <Link to="/blog/recent" className="text-mining-600 dark:text-mining-400 hover:text-mining-700 dark:hover:text-mining-300 flex items-center gap-1">
                            Ver todos
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.map(post => (
                          <Card key={post.id} className="overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                            </div>
                            <div className="md:w-2/3 flex flex-col p-4">
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                <span className="px-2 py-1 bg-mining-100 dark:bg-mining-900/30 text-mining-700 dark:text-mining-400 rounded-full capitalize">
                                  {post.category.replace("-", " ")}
                                </span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {post.readTime}
                                </span>
                              </div>
                              <Link to={`/blog/${post.id}`} className="group mb-2">
                                <h3 className="text-lg font-bold group-hover:text-mining-600 dark:group-hover:text-mining-400 transition-colors">
                                  {post.title}
                                </h3>
                              </Link>
                              <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  <span>{post.author}</span>
                                  <span className="mx-1">•</span>
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{post.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tendencias" className="mt-0">
                    {/* Content for tendencias tab - Will be auto-populated by the filter */}
                  </TabsContent>
                  
                  <TabsContent value="mejores-practicas" className="mt-0">
                    {/* Content for mejores-practicas tab - Will be auto-populated by the filter */}
                  </TabsContent>
                  
                  <TabsContent value="investigacion" className="mt-0">
                    {/* Content for investigacion tab - Will be auto-populated by the filter */}
                  </TabsContent>
                </Tabs>
                
                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" className="bg-mining-50 dark:bg-mining-900/30 text-mining-700 dark:text-mining-300">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Search Box */}
                <Card className="mb-8 border-0 shadow">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Buscar</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <input
                        type="search"
                        placeholder="Buscar artículos..."
                        className="w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent"
                      />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter */}
                <Card className="mb-8 border-0 shadow bg-gradient-to-br from-mining-50 to-engineering-50 dark:from-mining-900/20 dark:to-engineering-900/20">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Suscríbete al Newsletter</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Recibe los últimos artículos y noticias sobre ingeniería y minería directamente en tu correo.
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent"
                      />
                      <Button className="w-full bg-mining-600 hover:bg-mining-700 text-white">
                        Suscribirse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Tags */}
                <Card className="mb-8 border-0 shadow">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Etiquetas Populares</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag, index) => (
                        <Link
                          key={index}
                          to={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Featured Resources */}
                <Card className="border-0 shadow">
                  <CardHeader className="pb-2">
                    <h3 className="text-lg font-bold">Recursos Destacados</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-engineering-100 dark:bg-engineering-900/30 rounded flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-engineering-600 dark:text-engineering-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Guía de Seguridad Minera</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Manual completo con protocolos de seguridad
                        </p>
                        <Link to="/resources/safety-guide" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                          Descargar PDF
                        </Link>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-mining-100 dark:bg-mining-900/30 rounded flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-mining-600 dark:text-mining-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Informe de Sostenibilidad</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Prácticas sostenibles en minería moderna
                        </p>
                        <Link to="/resources/sustainability-report" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                          Leer Informe
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
