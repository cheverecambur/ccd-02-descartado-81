
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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

  // Synchronize the active view with the URL path
  useEffect(() => {
    const path = location.pathname.replace("/blog-admin/", "");
    if (path.startsWith("edit-post/")) {
      setActiveView("edit-post");
    } else if (path === "new-post") {
      setActiveView("edit-post");
    } else if (
      path === "posts" ||
      path === "categories" ||
      path === "comments" ||
      path === "dashboard" ||
      path === "analytics"
    ) {
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
  };

  const handleEditPost = (postId: string) => {
    navigate(`/blog-admin/edit-post/${postId}`);
  };

  const handleCreatePost = () => {
    navigate("/blog-admin/new-post");
  };

  const getTitle = () => {
    switch (activeView) {
      case "dashboard":
        return "Panel de Control";
      case "posts":
        return "Administrar Artículos";
      case "edit-post":
        return location.pathname.includes("/new-post") ? "Crear Artículo" : "Editar Artículo";
      case "categories":
        return "Administrar Categorías";
      case "comments":
        return "Administrar Comentarios";
      case "analytics":
        return "Análisis y Estadísticas";
      default:
        return "Administración del Blog";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar activeView={activeView} onViewChange={handleViewChange} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader title={getTitle()} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route
              path="posts"
              element={
                <PostsManager
                  onEditPost={handleEditPost}
                  onCreatePost={handleCreatePost}
                />
              }
            />
            <Route
              path="new-post"
              element={
                <PostEditorWrapper
                  isNew={true}
                  onSaveSuccess={() => {
                    toast({
                      title: "Artículo creado",
                      description: "El artículo ha sido creado exitosamente.",
                    });
                    navigate("/blog-admin/posts");
                  }}
                />
              }
            />
            <Route
              path="edit-post/:id"
              element={
                <PostEditorWrapper
                  isNew={false}
                  onSaveSuccess={() => {
                    toast({
                      title: "Artículo actualizado",
                      description: "El artículo ha sido actualizado exitosamente.",
                    });
                    navigate("/blog-admin/posts");
                  }}
                />
              }
            />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="comments" element={<CommentsManager />} />
            <Route path="analytics" element={<AnalyticsSection />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Wrapper component to handle postId from URL params
const PostEditorWrapper = ({ isNew, onSaveSuccess }: { isNew: boolean; onSaveSuccess: () => void }) => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <PostEditor
      postId={isNew ? null : id || null}
      onSaveSuccess={onSaveSuccess}
    />
  );
};

export default BlogAdmin;
