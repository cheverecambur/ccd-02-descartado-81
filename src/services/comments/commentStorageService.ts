
import { Comment } from "@/types/blog";

const STORAGE_KEY = 'blog_comments';

export interface StoredComment extends Comment {
  status: "pending" | "approved" | "rejected";
  postTitle?: string;
  authorEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export const commentStorageService = {
  // Get all comments
  getAllComments: (): StoredComment[] => {
    const comments = localStorage.getItem(STORAGE_KEY);
    return comments ? JSON.parse(comments) : [];
  },

  // Get comments by post ID
  getCommentsByPost: (postId: string): StoredComment[] => {
    const allComments = commentStorageService.getAllComments();
    return allComments.filter(comment => 
      comment.postId === postId && comment.status === "approved"
    );
  },

  // Get comments for admin (all statuses)
  getCommentsForAdmin: (): StoredComment[] => {
    return commentStorageService.getAllComments();
  },

  // Add new comment
  addComment: (commentData: Omit<StoredComment, 'id' | 'createdAt' | 'updatedAt' | 'status'>): StoredComment => {
    const comments = commentStorageService.getAllComments();
    const newComment: StoredComment = {
      ...commentData,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    comments.unshift(newComment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    return newComment;
  },

  // Update comment status
  updateCommentStatus: (commentId: string, status: "approved" | "rejected"): boolean => {
    const comments = commentStorageService.getAllComments();
    const commentIndex = comments.findIndex(c => c.id === commentId);
    
    if (commentIndex === -1) return false;
    
    comments[commentIndex] = {
      ...comments[commentIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    return true;
  },

  // Delete comment
  deleteComment: (commentId: string): boolean => {
    const comments = commentStorageService.getAllComments();
    const filteredComments = comments.filter(c => c.id !== commentId);
    
    if (filteredComments.length === comments.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredComments));
    return true;
  },

  // Like comment
  likeComment: (commentId: string): boolean => {
    const comments = commentStorageService.getAllComments();
    const commentIndex = comments.findIndex(c => c.id === commentId);
    
    if (commentIndex === -1) return false;
    
    comments[commentIndex] = {
      ...comments[commentIndex],
      likes: comments[commentIndex].likes + 1,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    return true;
  },

  // Get stats for admin
  getCommentStats: () => {
    const comments = commentStorageService.getAllComments();
    return {
      total: comments.length,
      pending: comments.filter(c => c.status === "pending").length,
      approved: comments.filter(c => c.status === "approved").length,
      rejected: comments.filter(c => c.status === "rejected").length,
    };
  }
};
