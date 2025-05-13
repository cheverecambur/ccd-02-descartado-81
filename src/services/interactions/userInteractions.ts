
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getPostById } from "../posts/blogPostsService";

// Hook for handling user interactions with posts (likes, bookmarks)
export const usePostInteractions = (postId: string) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { toast } = useToast();
  
  // Load user interactions
  const loadInteractions = () => {
    // In a real app, this would load data from an API
    // For now, simulate with localStorage
    try {
      const storedLikes = localStorage.getItem('blog_likes');
      const storedBookmarks = localStorage.getItem('blog_bookmarks');
      
      if (storedLikes) {
        const likes = JSON.parse(storedLikes);
        setLiked(likes.includes(postId));
      }
      
      if (storedBookmarks) {
        const bookmarks = JSON.parse(storedBookmarks);
        setBookmarked(bookmarks.includes(postId));
      }
      
      // Simulate like count
      const post = getPostById(String(postId));
      setLikeCount(post?.likes || Math.floor(Math.random() * 50));
    } catch (error) {
      console.error('Error loading interactions', error);
    }
  };
  
  // Toggle like
  const toggleLike = () => {
    try {
      let likes: string[] = [];
      const storedLikes = localStorage.getItem('blog_likes');
      
      if (storedLikes) {
        likes = JSON.parse(storedLikes);
      }
      
      if (liked) {
        likes = likes.filter(id => id !== postId);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        likes.push(postId);
        setLikeCount(prev => prev + 1);
        toast({
          title: "Post añadido a tus favoritos",
          description: "Puedes encontrar tus artículos favoritos en tu perfil",
        });
      }
      
      localStorage.setItem('blog_likes', JSON.stringify(likes));
      setLiked(!liked);
    } catch (error) {
      console.error('Error toggling like', error);
    }
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    try {
      let bookmarks: string[] = [];
      const storedBookmarks = localStorage.getItem('blog_bookmarks');
      
      if (storedBookmarks) {
        bookmarks = JSON.parse(storedBookmarks);
      }
      
      if (bookmarked) {
        bookmarks = bookmarks.filter(id => id !== postId);
      } else {
        bookmarks.push(postId);
        toast({
          title: "Artículo guardado",
          description: "Puedes encontrar tus artículos guardados en tu perfil",
        });
      }
      
      localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks));
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark', error);
    }
  };
  
  return {
    liked,
    bookmarked,
    likeCount,
    loadInteractions,
    toggleLike,
    toggleBookmark
  };
};
