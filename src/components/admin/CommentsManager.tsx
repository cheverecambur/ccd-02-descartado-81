
import { useEffect, useState } from "react";
import { MessageSquare, Clock, CheckCircle, XCircle, Filter, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CommentItem from "./CommentItem";
import { useAdminComments } from "@/services/comments/commentService";
import { StoredComment } from "@/services/comments/commentStorageService";

const CommentsManager = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [filteredComments, setFilteredComments] = useState<StoredComment[]>([]);
  
  const {
    comments,
    loading,
    loadAdminComments,
    approveComment,
    rejectComment,
    deleteComment,
    getStats
  } = useAdminComments();

  useEffect(() => {
    loadAdminComments();
  }, [loadAdminComments]);

  // Filter comments based on selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredComments(comments);
    } else {
      setFilteredComments(comments.filter(comment => comment.status === filter));
    }
  }, [comments, filter]);

  const handleViewPost = (postId: string) => {
    window.open(`/blog/${postId}`, '_blank');
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aprobados</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rechazados</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filter and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="rejected">Rechazados</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" onClick={() => window.open('/blog', '_blank')}>
          <Eye className="h-4 w-4 mr-2" />
          Ver Blog
        </Button>
      </div>

      {/* Comments List */}
      <Card>
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mining-600 mb-4"></div>
            <p>Cargando comentarios...</p>
          </div>
        ) : filteredComments.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onApprove={approveComment}
                onReject={rejectComment}
                onDelete={deleteComment}
                onViewPost={handleViewPost}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {filter === "all" 
                ? "No hay comentarios" 
                : `No hay comentarios ${
                    filter === "pending" ? "pendientes" :
                    filter === "approved" ? "aprobados" : "rechazados"
                  }`
              }
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === "pending" 
                ? "Los nuevos comentarios aparecerán aquí para moderación"
                : "Los comentarios aparecerán aquí cuando haya nuevos"
              }
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommentsManager;
