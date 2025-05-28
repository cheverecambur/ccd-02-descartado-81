
// Common types for the blog
export interface BlogPost {
  id: string | number;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  keywords?: string[];
  content?: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
    position?: string;
    publications?: number;
    linkedin?: string;
  };
  date: string;
  readTime: string;
  comments: number;
  likes?: number;
  shares?: number;
  tags?: string[];
  relatedCourses?: {
    id: string;
    title: string;
    image: string;
  }[];
}

export interface Comment {
  id: string;
  postId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
}

export interface TagInfo {
  name: string;
  count: number;
}
