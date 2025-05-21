
import React from "react";
import { Check, X, MessageSquare, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const MOCK_COMMENTS = [
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

  const handleApproveComment = (commentId: string) => {
    toast({
      title: "Comentario aprobado",
      description: "El comentario ha sido aprobado y publicado."
    });
  };

  const handleRejectComment = (commentId: string) => {
    toast({
      title: "Comentario rechazado",
      description: "El comentario ha sido rechazado y no será publicado."
    });
  };

  const handleViewPost = (postId: string) => {
    window.open(`/blog/${postId}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Aprobado</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rechazado</Badge>;
      case "pending":
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-500 dark:border-yellow-800">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comentarios</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Todos</span>
            <span className="bg-primary/10 text-primary ml-1 px-1.5 py-0.5 rounded text-xs">
              {MOCK_COMMENTS.length}
            </span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            Pendientes
            <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 ml-1 px-1.5 py-0.5 rounded text-xs">
              {MOCK_COMMENTS.filter(c => c.status === "pending").length}
            </span>
          </Button>
        </div>
      </div>

      <Card>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {MOCK_COMMENTS.map((comment) => (
            <div key={comment.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{comment.authorName}</h3>
                    {getStatusBadge(comment.status)}
                  </div>
                  
                  <p className="text-sm mb-3">{comment.content}</p>
                  
                  <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{comment.date}</span>
                    <span>•</span>
                    <button
                      onClick={() => handleViewPost(comment.postId)}
                      className="flex items-center hover:text-primary"
                    >
                      <span className="truncate max-w-[200px] md:max-w-xs">
                        {comment.postTitle}
                      </span>
                      <ExternalLink size={12} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2 md:self-start">
                  {comment.status === "pending" && (
                    <>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleApproveComment(comment.id)}
                      >
                        <Check size={16} className="text-green-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleRejectComment(comment.id)}
                      >
                        <X size={16} className="text-red-600" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {MOCK_COMMENTS.length === 0 && (
            <div className="p-8 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold">No hay comentarios</h3>
              <p className="mt-1 text-sm text-gray-500">
                No hay comentarios para moderar en este momento.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommentsManager;
