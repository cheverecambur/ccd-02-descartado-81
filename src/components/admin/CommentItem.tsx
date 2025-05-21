
import React from "react";
import { Check, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  content: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface CommentItemProps {
  comment: Comment;
  onApprove: (commentId: string) => void;
  onReject: (commentId: string) => void;
  onViewPost: (postId: string) => void;
}

const CommentItem = ({ comment, onApprove, onReject, onViewPost }: CommentItemProps) => {
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
    <div className="p-4">
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
              >
                <Check size={16} className="text-green-600" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => onReject(comment.id)}
              >
                <X size={16} className="text-red-600" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
