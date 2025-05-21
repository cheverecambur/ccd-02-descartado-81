
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CommentItem, { Comment } from "./CommentItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock comments data - in a real app, this would come from an API
const MOCK_COMMENTS: Comment[] = [
  {
    id: "comment-1",
    postId: "modelador-bim-peru",
    postTitle: "Modelador BIM en Perú: La Revolución Digital en la Construcción y la Ingeniería",
    authorName: "Carlos Mendoza",
    content: "Excelente artículo. ¿Tienen cursos específicos para Revit MEP? Me interesa especializarme en ese ámbito.",
    date: "19 May, 2025",
    status: "pending"
  },
  {
    id: "comment-2",
    postId: "mineria-sostenible",
    postTitle: "Minería Sostenible: Equilibrando Productividad y Responsabilidad Ambiental",
    authorName: "Lucía Rodríguez",
    content: "Me gustaría saber más sobre las tecnologías de mitigación de impacto mencionadas en el artículo. ¿Tienen algún curso relacionado?",
    date: "18 May, 2025",
    status: "approved"
  },
  {
    id: "comment-3",
    postId: "supervisor-ssoma-peru",
    postTitle: "Supervisor SSOMA en Perú: La Profesión con Mayor Demanda en Seguridad Laboral y Medio Ambiente",
    authorName: "Miguel Torres",
    content: "Estoy interesado en el curso de Especialista SSOMA. ¿Cuál es la duración del programa y el costo?",
    date: "20 May, 2025",
    status: "pending"
  },
  {
    id: "comment-4",
    postId: "bim-valorizacion",
    postTitle: "BIM para Valorización de Obras: Maximizando Eficiencia y Precisión",
    authorName: "Ana Suárez",
    content: "¿Estos cursos son válidos para la certificación PMP? Estoy buscando sumar PDUs para mantener mi certificación.",
    date: "17 May, 2025",
    status: "rejected"
  },
];

const CommentsManager = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [activeTab, setActiveTab] = useState("all");

  const handleApproveComment = (commentId: string) => {
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
  };

  const handleRejectComment = (commentId: string) => {
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
  };

  const handleViewPost = (postId: string) => {
    window.open(`/blog/${postId}`, '_blank');
  };

  const filteredComments = activeTab === "all" 
    ? comments 
    : comments.filter(comment => comment.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comentarios</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Total</span>
            <span className="bg-primary/10 text-primary ml-1 px-1.5 py-0.5 rounded text-xs">
              {comments.length}
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
              Todos ({comments.length})
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Pendientes ({comments.filter(c => c.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Aprobados ({comments.filter(c => c.status === "approved").length})
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Rechazados ({comments.filter(c => c.status === "rejected").length})
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
