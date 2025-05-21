
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useBlogAdmin } from "@/hooks/useBlogAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PostsManager from "@/components/admin/PostsManager";
import PostEditor from "@/components/admin/PostEditor";
import CategoriesManager from "@/components/admin/CategoriesManager";
import CommentsManager from "@/components/admin/CommentsManager";
import AnalyticsSection from "@/components/admin/AnalyticsSection";

const BlogAdmin = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { isLoading, stats } = useBlogAdmin();

  // Synchronize the active view with the URL path
  useEffect(() => {
    const path = location.pathname.replace("/blog-admin/", "");
    
    if (path.startsWith("edit-post/")) {
      const postId = path.replace("edit-post/", "");
      setSelectedPostId(postId);
      setActiveView("edit-post");
    } else if (path === "new-post") {
      setSelectedPostId(null);
      setActiveView("edit-post");
    } else if (path === "posts" || path === "categories" || path === "comments" || path === "dashboard" || path === "analytics") {
      setActiveView(path);
    } else if (path === "" || path === "/") {
      setActiveView("dashboard");
    }
  }, [location.pathname]);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    
    if (view === "dashboard") {
      navigate("/blog-admin");
    } else {
      navigate(`/blog-admin/${view}`);
    }
    
    if (view !== "edit-post") {
      setSelectedPostId(null);
    }
  };

  const handleEditPost = (postId: string) => {
    setSelectedPostId(postId);
    navigate(`/blog-admin/edit-post/${postId}`);
  };

  const handleCreatePost = () => {
    setSelectedPostId(null);
    navigate("/blog-admin/new-post");
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboard stats={stats} isLoading={isLoading} />;
      case "posts":
        return <PostsManager onEditPost={handleEditPost} onCreatePost={handleCreatePost} />;
      case "edit-post":
        return <PostEditor postId={selectedPostId} onSaveSuccess={() => {
          toast({
            title: selectedPostId ? "Post actualizado" : "Post creado",
            description: `El artículo ha sido ${selectedPostId ? "actualizado" : "creado"} exitosamente.`
          });
          navigate("/blog-admin/posts");
        }} />;
      case "categories":
        return <CategoriesManager />;
      case "comments":
        return <CommentsManager />;
      case "analytics":
        return <AnalyticsSection />;
      default:
        return <AdminDashboard stats={stats} isLoading={isLoading} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar activeView={activeView} onViewChange={handleViewChange} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader title={
          activeView === "dashboard" ? "Panel de Control" :
          activeView === "posts" ? "Administrar Artículos" :
          activeView === "edit-post" ? (selectedPostId ? "Editar Artículo" : "Crear Artículo") :
          activeView === "categories" ? "Administrar Categorías" :
          activeView === "comments" ? "Administrar Comentarios" : 
          activeView === "analytics" ? "Análisis y Estadísticas" : "Administración del Blog"
        } />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={renderActiveView()} />
            <Route path="dashboard" element={<AdminDashboard stats={stats} isLoading={isLoading} />} />
            <Route path="posts" element={<PostsManager onEditPost={handleEditPost} onCreatePost={handleCreatePost} />} />
            <Route path="new-post" element={
              <PostEditor 
                postId={null} 
                onSaveSuccess={() => {
                  toast({
                    title: "Artículo creado",
                    description: "El artículo ha sido creado exitosamente."
                  });
                  navigate("/blog-admin/posts");
                }} 
              />
            } />
            <Route path="edit-post/:id" element={
              <PostEditor 
                postId={selectedPostId} 
                onSaveSuccess={() => {
                  toast({
                    title: "Artículo actualizado",
                    description: "El artículo ha sido actualizado exitosamente."
                  });
                  navigate("/blog-admin/posts");
                }} 
              />
            } />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="comments" element={<CommentsManager />} />
            <Route path="analytics" element={<AnalyticsSection />} />
            <Route path="*" element={<AdminDashboard stats={stats} isLoading={isLoading} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default BlogAdmin;
