
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThumbsUp, Reply, Send } from "lucide-react";
import { useComments, Comment as CommentType } from "@/services/comments/commentService";

interface CommentProps {
  comment: CommentType;
  onLike: (commentId: string) => void;
  isReply?: boolean;
}

const Comment = ({ comment, onLike, isReply = false }: CommentProps) => (
  <div className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
        <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <h4 className="font-medium text-sm">{comment.authorName}</h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
        <div className="flex gap-4 mt-2">
          <button 
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-mining-600 dark:hover:text-mining-400 transition-colors"
            onClick={() => onLike(comment.id)}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>Me gusta ({comment.likes})</span>
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-mining-600 dark:hover:text-mining-400 transition-colors">
            <Reply className="h-3 w-3" />
            <span>Responder</span>
          </button>
        </div>
      </div>
    </div>
    
    {comment.replies && comment.replies.map(reply => (
      <Comment key={reply.id} comment={reply} onLike={onLike} isReply />
    ))}
  </div>
);

interface CommentSectionProps {
  postId: string | number;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const {
    comments,
    newComment,
    setNewComment,
    authorName,
    setAuthorName,
    authorEmail,
    setAuthorEmail,
    loading,
    loadComments,
    addComment,
    likeComment
  } = useComments(String(postId));

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    addComment();
  };

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-6">Comentarios ({comments.length})</h3>
      
      {/* New Comment Form */}
      <Card className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-8 border-0 shadow">
        <h4 className="font-medium mb-4">Deja tu comentario</h4>
        <form onSubmit={handleAddComment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName">Nombre *</Label>
              <Input
                id="authorName"
                placeholder="Tu nombre"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="authorEmail">Email (opcional)</Label>
              <Input
                id="authorEmail"
                type="email"
                placeholder="tu@email.com"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="relative">
            <Label htmlFor="comment">Comentario *</Label>
            <textarea
              id="comment"
              placeholder="Escribe tu comentario aquí..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent h-32 resize-none pr-12 mt-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <Button 
              type="submit"
              size="icon"
              className="absolute bottom-2 right-2 bg-mining-600 hover:bg-mining-700"
              disabled={loading || !newComment.trim() || !authorName.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Tu comentario será revisado antes de ser publicado.
          </p>
        </form>
      </Card>
      
      {/* Comments List */}
      {loading && comments.length === 0 ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mining-600 mb-4"></div>
          <p>Cargando comentarios...</p>
        </div>
      ) : comments.length > 0 ? (
        <div>
          {comments.map(comment => (
            <div key={comment.id}>
              <Comment comment={comment} onLike={likeComment} />
              {comment !== comments[comments.length - 1] && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <p className="mb-2 text-gray-600 dark:text-gray-400">No hay comentarios aún</p>
          <p className="text-sm">Sé el primero en comentar este artículo</p>
        </div>
      )}
    </div>
  );
};
