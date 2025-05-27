
import React from "react";
import { Check, X, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StoredComment } from "@/services/comments/commentStorageService";

interface CommentItemProps {
  comment: StoredComment;
  onApprove: (commentId: string) => void;
  onReject: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onViewPost: (postId: string) => void;
}

const CommentItem = ({ comment, onApprove, onReject, onDelete, onViewPost }: CommentItemProps) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">{comment.authorName}</h3>
            {getStatusBadge(comment.status)}
            <span className="text-xs text-gray-500">
              {comment.likes} me gusta
            </span>
          </div>
          
          {comment.authorEmail && (
            <p className="text-xs text-gray-500 mb-2">{comment.authorEmail}</p>
          )}
          
          <p className="text-sm mb-3">{comment.content}</p>
          
          <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500 dark:text-gray-400">
            <span>{formatDate(comment.createdAt)}</span>
            <span>•</span>
            <button
              onClick={() => onViewPost(comment.postId)}
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
                onClick={() => onApprove(comment.id)}
                title="Aprobar comentario"
              >
                <Check size={16} className="text-green-600" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onReject(comment.id)}
                title="Rechazar comentario"
              >
                <X size={16} className="text-red-600" />
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onDelete(comment.id)}
            title="Eliminar comentario"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
