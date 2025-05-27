
import { BlogPost, CategoryInfo } from "@/types/blog";

const STORAGE_KEYS = {
  POSTS: 'blog_posts',
  CATEGORIES: 'blog_categories',
  SETTINGS: 'blog_settings'
} as const;

// Initialize default data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    // Import default posts
    import("../posts/blogPostsData").then(({ featuredPosts, recentPosts }) => {
      const allPosts = [...featuredPosts, ...recentPosts];
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(allPosts));
    });
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    import("../posts/categoriesService").then(({ categories }) => {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    });
  }
};

// Initialize on module load
initializeStorage();

export const storageService = {
  // Posts management
  getAllPosts: (): BlogPost[] => {
    const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
    return posts ? JSON.parse(posts) : [];
  },

  savePost: (post: BlogPost): Promise<BlogPost> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = storageService.getAllPosts();
        const existingIndex = posts.findIndex(p => p.id === post.id);
        
        if (existingIndex >= 0) {
          posts[existingIndex] = post;
        } else {
          posts.unshift(post); // Add new posts to the beginning
        }
        
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        resolve(post);
      }, 500); // Simulate API delay
    });
  },

  deletePost: (postId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = storageService.getAllPosts();
        const filteredPosts = posts.filter(p => p.id.toString() !== postId);
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filteredPosts));
        resolve(true);
      }, 300);
    });
  },

  getPostById: (id: string): BlogPost | undefined => {
    const posts = storageService.getAllPosts();
    return posts.find(post => post.id.toString() === id);
  },

  // Categories management
  getAllCategories: (): CategoryInfo[] => {
    const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return categories ? JSON.parse(categories) : [];
  },

  saveCategory: (category: CategoryInfo): Promise<CategoryInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = storageService.getAllCategories();
        const existingIndex = categories.findIndex(c => c.id === category.id);
        
        if (existingIndex >= 0) {
          categories[existingIndex] = category;
        } else {
          categories.push(category);
        }
        
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
        resolve(category);
      }, 300);
    });
  },

  // Search functionality
  searchPosts: (query: string): BlogPost[] => {
    const posts = storageService.getAllPosts();
    if (!query.trim()) return posts;
    
    const searchTerm = query.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  },

  // Statistics
  getPostsStats: () => {
    const posts = storageService.getAllPosts();
    const categories = storageService.getAllCategories();
    
    const postsPerCategory: { [key: string]: number } = {};
    categories.forEach(cat => {
      postsPerCategory[cat.id] = posts.filter(post => post.category === cat.id).length;
    });
    
    const tagCounts: { [key: string]: number } = {};
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    const topTags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return {
      totalPosts: posts.length,
      postsPerCategory,
      topTags,
      recentPosts: posts.slice(0, 5)
    };
  }
};
