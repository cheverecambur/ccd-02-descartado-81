
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { 
  BookOpen, Calendar, ArrowRight, User, MessageSquare, Clock, 
  Share2, BookmarkPlus, ThumbsUp, Facebook, Twitter, Linkedin, 
  Download, CheckCircle
} from "lucide-react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { CommentSection } from "@/components/blog/CommentSection";
import { useToast } from "@/hooks/use-toast";
import { 
  getPostById, 
  getRelatedPosts, 
  usePostInteractions,
  BlogPost
} from "@/services/blogService";

const BlogPostPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { 
    liked, 
    bookmarked, 
    likeCount, 
    loadInteractions, 
    toggleLike, 
    toggleBookmark 
  } = usePostInteractions(id || "1");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sharing
  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post?.title || "")}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post?.title || "")}`;
        break;
      default:
        // Compartir nativo si está disponible
        if (navigator.share) {
          navigator.share({
            title: post?.title,
            text: post?.excerpt,
            url: url,
          })
          .catch((error) => console.log('Error sharing', error));
          return;
        }
        
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(url);
        toast({
          title: "Enlace copiado",
          description: "El enlace ha sido copiado al portapapeles",
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Cargar datos del post
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        if (!id) {
          navigate("/blog");
          return;
        }
        
        const postData = getPostById(id);
        
        if (!postData) {
          toast({
            title: "Error",
            description: "El artículo solicitado no existe",
            variant: "destructive"
          });
          navigate("/blog");
          return;
        }
        
        setPost(postData);
        
        // Cargar posts relacionados
        const related = getRelatedPosts(id, 3);
        setRelatedPosts(related);
        
        // Cargar interacciones del usuario (likes, guardados)
        loadInteractions();
        
      } catch (error) {
        console.error("Error fetching post data", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el artículo. Intente nuevamente.",
          variant: "destructive"
        });
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [id, navigate, toast, loadInteractions]);

  // Cuando no hay post o está cargando
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mining-600 mb-4"></div>
            <p>Cargando artículo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
            <p className="mb-6">El artículo que estás buscando no existe o ha sido removido.</p>
            <Button asChild>
              <Link to="/blog">Volver al blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determinar información del autor
  const authorData = typeof post.author === 'object' 
    ? post.author 
    : { name: post.author as string, avatar: "" };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-mining-700 to-engineering-800 text-white py-16">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" 
              style={{backgroundImage: `url(${post.image})`}}
            ></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Link to="/blog" className="text-mining-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                  <span>/</span>
                  <Link to={`/blog/category/${post.category}`} className="text-mining-300 hover:text-white transition-colors capitalize">
                    {post.category.replace("-", " ")}
                  </Link>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <Avatar className="h-10 w-10 border-2 border-white">
                    <AvatarImage src={authorData.avatar} alt={authorData.name} />
                    <AvatarFallback>{authorData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{authorData.name}</span>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="p-8">
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none" 
                      dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
                    ></div>
                    
                    {/* Related Courses Section */}
                    {post.relatedCourses && post.relatedCourses.length > 0 && (
                      <div className="mt-10 bg-mining-50 dark:bg-mining-900/20 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 text-mining-700 dark:text-mining-300">Cursos Relacionados con este Tema</h3>
                        <p className="text-mining-600 dark:text-mining-400 mb-6">
                          Profundiza tus conocimientos con estos cursos especializados que complementan perfectamente el contenido de este artículo.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.relatedCourses.map((course) => (
                            <Link key={course.id} to={`/courses/${course.id}`}>
                              <div className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                                <div className="w-20 h-20 flex-shrink-0">
                                  <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded" />
                                </div>
                                <div className="flex flex-col justify-center">
                                  <h4 className="font-medium text-mining-700 dark:text-mining-300 line-clamp-2">{course.title}</h4>
                                  <div className="mt-2">
                                    <span className="text-xs px-2 py-1 bg-mining-100 dark:bg-mining-900/50 text-mining-700 dark:text-mining-300 rounded-full">
                                      Ver detalles
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="flex justify-center mt-6">
                          <Button className="bg-mining-600 hover:bg-mining-700" asChild>
                            <Link to="/courses">
                              Ver todos los cursos
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-10">
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {post.tags.map((tag, index) => (
                            <Link
                              key={index}
                              to={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      <div className="border-t border-b py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`gap-2 ${liked ? 'bg-mining-50 text-mining-600 dark:bg-mining-900/30 dark:text-mining-400' : ''}`}
                            onClick={toggleLike}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{liked ? 'Me gusta' : 'Me gusta'}</span>
                            {likeCount > 0 && <span className="ml-1">({likeCount})</span>}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`gap-2 ${bookmarked ? 'bg-mining-50 text-mining-600 dark:bg-mining-900/30 dark:text-mining-400' : ''}`}
                            onClick={toggleBookmark}
                          >
                            <BookmarkPlus className="h-4 w-4" />
                            <span>{bookmarked ? 'Guardado' : 'Guardar'}</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleShare('default')}
                          >
                            <Share2 className="h-4 w-4" />
                            <span>Compartir</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Compartir en:</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-full p-2 h-auto"
                            onClick={() => handleShare('facebook')}
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-full p-2 h-auto"
                            onClick={() => handleShare('twitter')}
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-full p-2 h-auto"
                            onClick={() => handleShare('linkedin')}
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {typeof post.author === 'object' && post.author.bio && (
                        <div className="mt-10">
                          <h3 className="text-2xl font-bold mb-4">Sobre el autor</h3>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-lg font-medium">{post.author.name}</h4>
                              {post.author.position && (
                                <p className="text-sm text-mining-600 dark:text-mining-400 mb-1">{post.author.position}</p>
                              )}
                              <p className="text-gray-600 dark:text-gray-400 my-2">{post.author.bio}</p>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={post.author.linkedin || "#"} target="_blank">Ver perfil</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Comment Section */}
                      <CommentSection postId={post.id} />
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-1/3">
                <BlogSidebar relatedPosts={relatedPosts} />
              </div>
            </div>
            
            {/* Bottom Call to Action */}
            <div className="mt-16 bg-gradient-to-r from-mining-600 to-engineering-600 rounded-xl text-white p-8 shadow-lg">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Amplía tus conocimientos en minería sostenible</h2>
                <p className="mb-6">
                  EduMining ofrece cursos especializados en tecnologías de extracción sostenible y 
                  mejores prácticas ambientales para impulsar tu carrera en la industria minera.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-white/20 rounded-full p-2">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">Instructores Expertos</h3>
                    <p className="text-sm text-white/80">Aprende de profesionales con amplia experiencia en el sector</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-white/20 rounded-full p-2">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">Certificaciones Reconocidas</h3>
                    <p className="text-sm text-white/80">Obtén certificados valorados por las principales empresas mineras</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex justify-center mb-3">
                      <div className="bg-white/20 rounded-full p-2">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">Contenido Actualizado</h3>
                    <p className="text-sm text-white/80">Material educativo basado en las últimas tendencias e innovaciones</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-mining-700 hover:bg-gray-100" asChild>
                    <Link to="/courses">Explorar cursos</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Ver certificaciones
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
