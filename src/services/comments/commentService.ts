
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types/blog";
import { commentStorageService, StoredComment } from "./commentStorageService";
import { getPostById } from "@/services/posts/blogPostsService";

// Hook for managing comments
export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const { toast } = useToast();

  // Load comments from storage
  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedComments = commentStorageService.getCommentsByPost(postId);
      
      // Convert stored comments to display format
      const displayComments: Comment[] = storedComments.map(comment => ({
        id: comment.id,
        postId: comment.postId,
        authorName: comment.authorName,
        authorAvatar: comment.authorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorName}`,
        content: comment.content,
        date: new Date(comment.createdAt).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        likes: comment.likes,
        replies: comment.replies || []
      }));
      
      setComments(displayComments);
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
  }, [postId, toast]);

  // Add a new comment
  const addComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "El comentario no puede estar vacío",
        variant: "destructive"
      });
      return;
    }

    if (!authorName.trim()) {
      toast({
        title: "Error", 
        description: "Por favor ingresa tu nombre",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Get post title
      const post = getPostById(postId);
      const postTitle = post?.title || "Artículo desconocido";
      
      // Add comment to storage
      const savedComment = commentStorageService.addComment({
        postId,
        postTitle,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`,
        content: newComment.trim(),
        date: new Date().toLocaleDateString('es-ES'),
        likes: 0,
        replies: []
      });
      
      // Reset form
      setNewComment("");
      setAuthorName("");
      setAuthorEmail("");
      
      toast({
        title: "Comentario enviado",
        description: "Tu comentario está pendiente de moderación y será publicado pronto",
      });
      
      // Reload comments to show any approved ones
      loadComments();
      
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "No se pudo enviar el comentario",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Like a comment
  const likeComment = useCallback((commentId: string) => {
    const success = commentStorageService.likeComment(commentId);
    if (success) {
      setComments(prev => prev.map(c => {
        if (c.id === commentId) {
          return {...c, likes: c.likes + 1};
        }
        return c;
      }));
      
      toast({
        title: "¡Gracias!",
        description: "Tu 'me gusta' ha sido registrado",
      });
    }
  }, [toast]);

  return {
    comments,
    loading,
    newComment,
    setNewComment,
    authorName,
    setAuthorName,
    authorEmail,
    setAuthorEmail,
    loadComments,
    addComment,
    likeComment
  };
};
