
import React, { useState, useEffect } from "react";
import { MessageSquare, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CommentItem from "./CommentItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commentStorageService, StoredComment } from "@/services/comments/commentStorageService";

const CommentsManager = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const loadComments = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const allComments = commentStorageService.getCommentsForAdmin();
      setComments(allComments);
    } catch (error) {
      console.error("Error loading comments:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los comentarios",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleApproveComment = async (commentId: string) => {
    const success = commentStorageService.updateCommentStatus(commentId, "approved");
    if (success) {
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, status: "approved" } 
            : comment
        )
      );
      
      toast({
        title: "Comentario aprobado",
        description: "El comentario ha sido aprobado y publicado."
      });
    }
  };

  const handleRejectComment = async (commentId: string) => {
    const success = commentStorageService.updateCommentStatus(commentId, "rejected");
    if (success) {
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, status: "rejected" } 
            : comment
        )
      );
      
      toast({
        title: "Comentario rechazado",
        description: "El comentario ha sido rechazado y no será publicado."
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const success = commentStorageService.deleteComment(commentId);
    if (success) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      
      toast({
        title: "Comentario eliminado",
        description: "El comentario ha sido eliminado permanentemente."
      });
    }
  };

  const handleViewPost = (postId: string) => {
    window.open(`/blog/${postId}`, '_blank');
  };

  const filteredComments = activeTab === "all" 
    ? comments 
    : comments.filter(comment => comment.status === activeTab);

  const stats = commentStorageService.getCommentStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Comentarios</h2>
        </div>
        <Card className="p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p>Cargando comentarios...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comentarios</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadComments}
            className="gap-1"
          >
            <RefreshCw size={16} />
            Actualizar
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Total</span>
            <span className="bg-primary/10 text-primary ml-1 px-1.5 py-0.5 rounded text-xs">
              {stats.total}
            </span>
          </Button>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full border-b p-0 h-auto">
            <TabsTrigger 
              value="all" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Todos ({stats.total})
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Pendientes ({stats.pending})
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Aprobados ({stats.approved})
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Rechazados ({stats.rejected})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onApprove={handleApproveComment}
                  onReject={handleRejectComment}
                  onDelete={handleDeleteComment}
                  onViewPost={handleViewPost}
                />
              ))}

              {filteredComments.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">No hay comentarios</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hay comentarios para mostrar en esta sección.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onApprove={handleApproveComment}
                  onReject={handleRejectComment}
                  onDelete={handleDeleteComment}
                  onViewPost={handleViewPost}
                />
              ))}

              {filteredComments.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">No hay comentarios pendientes</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hay comentarios pendientes de moderación.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="approved" className="m-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onApprove={handleApproveComment}
                  onReject={handleRejectComment}
                  onDelete={handleDeleteComment}
                  onViewPost={handleViewPost}
                />
              ))}

              {filteredComments.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">No hay comentarios aprobados</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hay comentarios aprobados para mostrar.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected" className="m-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onApprove={handleApproveComment}
                  onReject={handleRejectComment}
                  onDelete={handleDeleteComment}
                  onViewPost={handleViewPost}
                />
              ))}

              {filteredComments.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">No hay comentarios rechazados</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No hay comentarios rechazados para mostrar.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CommentsManager;
