import { StoredComment } from "@/services/comments/commentStorageService";
import { BlogPost } from "@/types/blog";
import { storageService } from "@/services/storage/localStorageService";
import { commentStorageService } from "@/services/comments/commentStorageService";

export interface AnalyticsData {
  // Comment Analytics
  commentStats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    dailyComments: { date: string; count: number }[];
    commentsByPost: { name: string; count: number }[];
  };
  
  // Post Analytics
  postStats: {
    totalPosts: number;
    postsByCategory: { name: string; count: number }[];
    postsByMonth: { month: string; count: number }[];
    popularTags: { name: string; count: number }[];
  };
  
  // User Engagement
  userEngagement: {
    totalLikes: number;
    avgCommentsPerPost: number;
    mostActiveUsers: { name: string; count: number }[];
    engagementTrend: { period: string; comments: number; likes: number }[];
  };
}

class AnalyticsService {
  
  getCommentAnalytics(): AnalyticsData['commentStats'] {
    const comments = commentStorageService.getAllComments();
    const posts = storageService.getAllPosts();
    
    // Basic stats
    const stats = commentStorageService.getCommentStats();
    
    // Daily comments for last 30 days
    const dailyComments = this.getDailyComments(comments);
    
    // Comments by post
    const commentsByPost = this.getCommentsByPost(comments, posts);
    
    return {
      total: stats.total,
      pending: stats.pending,
      approved: stats.approved,
      rejected: stats.rejected,
      dailyComments,
      commentsByPost
    };
  }
  
  getPostAnalytics(): AnalyticsData['postStats'] {
    const posts = storageService.getAllPosts();
    const categories = storageService.getAllCategories();
    
    // Posts by category
    const postsByCategory = categories.map(cat => ({
      name: cat.name,
      count: posts.filter(post => post.category === cat.id).length
    })).filter(item => item.count > 0);
    
    // Posts by month (last 12 months)
    const postsByMonth = this.getPostsByMonth(posts);
    
    // Popular tags
    const popularTags = this.getPopularTags(posts);
    
    return {
      totalPosts: posts.length,
      postsByCategory,
      postsByMonth,
      popularTags
    };
  }
  
  getUserEngagement(): AnalyticsData['userEngagement'] {
    const comments = commentStorageService.getAllComments();
    const posts = storageService.getAllPosts();
    
    // Total likes from comments
    const totalLikes = comments.reduce((sum, comment) => sum + comment.likes, 0);
    
    // Average comments per post
    const avgCommentsPerPost = comments.length > 0 ? 
      Math.round((comments.filter(c => c.status === 'approved').length / posts.length) * 10) / 10 : 0;
    
    // Most active users (by comment count)
    const mostActiveUsers = this.getMostActiveUsers(comments);
    
    // Engagement trend (last 6 months)
    const engagementTrend = this.getEngagementTrend(comments);
    
    return {
      totalLikes,
      avgCommentsPerPost,
      mostActiveUsers,
      engagementTrend
    };
  }
  
  private getDailyComments(comments: StoredComment[]): { date: string; count: number }[] {
    const last30Days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = comments.filter(comment => {
        const commentDate = new Date(comment.createdAt).toISOString().split('T')[0];
        return commentDate === dateStr;
      }).length;
      
      last30Days.push({
        date: date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
        count
      });
    }
    
    return last30Days;
  }
  
  private getCommentsByPost(comments: StoredComment[], posts: BlogPost[]): { name: string; count: number }[] {
    const postCommentCounts = new Map<string, { name: string; count: number }>();
    
    comments.forEach(comment => {
      const post = posts.find(p => p.id.toString() === comment.postId);
      if (post) {
        const existing = postCommentCounts.get(comment.postId) || { name: post.title, count: 0 };
        postCommentCounts.set(comment.postId, { ...existing, count: existing.count + 1 });
      }
    });
    
    return Array.from(postCommentCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
  
  private getPostsByMonth(posts: BlogPost[]): { month: string; count: number }[] {
    const monthCounts = new Map<string, number>();
    const last12Months = [];
    const today = new Date();
    
    // Generate last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
      
      last12Months.push({ month: monthLabel, count: 0 });
      monthCounts.set(monthKey, 0);
    }
    
    // Count posts by month
    posts.forEach(post => {
      const postDate = new Date(post.date);
      const monthKey = `${postDate.getFullYear()}-${String(postDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthCounts.has(monthKey)) {
        monthCounts.set(monthKey, monthCounts.get(monthKey)! + 1);
      }
    });
    
    // Update counts
    let index = 0;
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      last12Months[index].count = monthCounts.get(monthKey) || 0;
      index++;
    }
    
    return last12Months;
  }
  
  private getPopularTags(posts: BlogPost[]): { name: string; count: number }[] {
    const tagCounts = new Map<string, number>();
    
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      }
    });
    
    return Array.from(tagCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
  
  private getMostActiveUsers(comments: StoredComment[]): { name: string; count: number }[] {
    const userCounts = new Map<string, number>();
    
    comments.forEach(comment => {
      userCounts.set(comment.authorName, (userCounts.get(comment.authorName) || 0) + 1);
    });
    
    return Array.from(userCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
  
  private getEngagementTrend(comments: StoredComment[]): { period: string; comments: number; likes: number }[] {
    const last6Months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      
      const monthComments = comments.filter(comment => {
        const commentDate = new Date(comment.createdAt);
        const commentMonthKey = `${commentDate.getFullYear()}-${String(commentDate.getMonth() + 1).padStart(2, '0')}`;
        return commentMonthKey === monthKey;
      });
      
      const totalLikes = monthComments.reduce((sum, comment) => sum + comment.likes, 0);
      
      last6Months.push({
        period: monthLabel,
        comments: monthComments.length,
        likes: totalLikes
      });
    }
    
    return last6Months;
  }
  
  getAllAnalytics(): AnalyticsData {
    return {
      commentStats: this.getCommentAnalytics(),
      postStats: this.getPostAnalytics(),
      userEngagement: this.getUserEngagement()
    };
  }
}

export const analyticsService = new AnalyticsService();
