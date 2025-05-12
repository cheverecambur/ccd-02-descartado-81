
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, Reply } from "lucide-react";
import { useComments, Comment as CommentType } from "@/services/blogService";
import { useEffect } from "react";

interface CommentProps {
  comment: CommentType;
  isReply?: boolean;
}

const Comment = ({ comment, isReply = false }: CommentProps) => (
  <div className={`${isReply ? "ml-12 mt-4" : "mb-6"}`}>
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <h4 className="font-medium text-sm">{comment.author.name}</h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
        <div className="flex gap-4 mt-2">
          <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-mining-600 dark:hover:text-mining-400 transition-colors">
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
      <Comment key={reply.id} comment={reply} isReply />
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
    loading,
    fetchComments,
    addComment
  } = useComments(postId);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-6">Comentarios ({comments.length})</h3>
      
      {/* New Comment Form */}
      <Card className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-8 border-0 shadow">
        <h4 className="font-medium mb-4">Deja tu comentario</h4>
        <textarea
          placeholder="Escribe tu comentario aquí..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-mining-500 dark:focus:ring-mining-400 focus:border-transparent h-32 resize-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <Button onClick={addComment} disabled={loading}>
            {loading ? "Publicando..." : "Publicar comentario"}
          </Button>
        </div>
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
              <Comment comment={comment} />
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
