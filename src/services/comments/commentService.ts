
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "@/types/blog";

// Hook for managing comments
export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  // Load comments
  const loadComments = async () => {
    setLoading(true);
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: "c1",
        postId,
        authorName: "Juan Pérez",
        authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        content: "Excelente artículo, muy informativo. Me gustaría ver más contenido sobre tecnologías específicas para la minería subterránea.",
        date: "8 May, 2025",
        likes: 4,
        replies: [
          {
            id: "r1c1",
            postId,
            authorName: "María González",
            authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "Gracias por tu comentario, Juan. Estamos preparando un artículo específico sobre ese tema que publicaremos próximamente.",
            date: "9 May, 2025",
            likes: 2
          }
        ]
      },
      {
        id: "c2",
        postId,
        authorName: "Ana Silva",
        authorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
        content: "¿Hay algún curso que profundice en estos temas? Me interesa especialmente la parte de optimización energética.",
        date: "7 May, 2025",
        likes: 1
      }
    ];
    
    setComments(mockComments);
    setLoading(false);
  };

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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new comment
    const comment: Comment = {
      id: `c${Date.now()}`,
      postId,
      authorName: "Usuario",
      authorAvatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      content: newComment,
      date: "Justo ahora",
      likes: 0
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment("");
    toast({
      title: "Comentario publicado",
      description: "Tu comentario ha sido publicado exitosamente",
    });
  };

  // Like a comment
  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {...c, likes: c.likes + 1};
      }
      
      // Check if it's a reply
      if (c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => 
            r.id === commentId ? {...r, likes: r.likes + 1} : r
          )
        };
      }
      
      return c;
    }));
  };

  return {
    comments,
    loading,
    newComment,
    setNewComment,
    loadComments,
    addComment,
    likeComment
  };
};
