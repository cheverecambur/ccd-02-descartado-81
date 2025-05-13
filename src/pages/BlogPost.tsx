
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { CommentSection } from "@/components/blog/CommentSection";
import { HeroSection } from "@/components/blog/HeroSection";
import { PostContent } from "@/components/blog/PostContent";
import { CallToAction } from "@/components/blog/CallToAction";
import { LoadingState } from "@/components/blog/LoadingState";
import { usePostShare } from "@/hooks/usePostShare";
import { useToast } from "@/hooks/use-toast";
import { 
  getPostById, 
  getRelatedPosts
} from "@/services/blogService";
import { usePostInteractions } from "@/services/interactions/userInteractions";
import { BlogPost } from "@/types/blog";

const BlogPostPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleShare } = usePostShare();
  
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

  // Load post data
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
        
        // Load related posts
        const related = getRelatedPosts(id, 3);
        setRelatedPosts(related);
        
        // Load user interactions (likes, bookmarks)
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          {/* Loading and Error States */}
          {loading || !post ? (
            <LoadingState isLoading={loading} error={!loading && !post} />
          ) : (
            <>
              {/* Hero Section */}
              <HeroSection post={post} />
              
              {/* Content Section */}
              <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Main Content */}
                  <div className="lg:w-2/3">
                    <Card className="border-0 shadow-lg overflow-hidden">
                      <div className="p-8">
                        <PostContent 
                          post={post} 
                          liked={liked} 
                          bookmarked={bookmarked}
                          likeCount={likeCount}
                          toggleLike={toggleLike}
                          toggleBookmark={toggleBookmark}
                          handleShare={handleShare}
                        />
                        
                        {/* Comment Section */}
                        <CommentSection postId={post.id} />
                      </div>
                    </Card>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="lg:w-1/3">
                    <BlogSidebar relatedPosts={relatedPosts} />
                  </div>
                </div>
                
                {/* Bottom Call to Action */}
                <CallToAction />
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
