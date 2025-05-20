
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useBlogAdmin } from "@/hooks/useBlogAdmin";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PostsManager from "@/components/admin/PostsManager";
import PostEditor from "@/components/admin/PostEditor";
import CategoriesManager from "@/components/admin/CategoriesManager";
import CommentsManager from "@/components/admin/CommentsManager";

const BlogAdmin = () => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const { isLoading, stats } = useBlogAdmin();

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedPostId(null);
  };

  const handleEditPost = (postId: string) => {
    setSelectedPostId(postId);
    setActiveView("edit-post");
  };

  const handleCreatePost = () => {
    setSelectedPostId(null);
    setActiveView("edit-post");
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
          setActiveView("posts");
        }} />;
      case "categories":
        return <CategoriesManager />;
      case "comments":
        return <CommentsManager />;
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
          activeView === "comments" ? "Administrar Comentarios" : "Administración del Blog"
        } />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default BlogAdmin;
