
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Tipos para el blog
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
  } | string;
  date: string;
  readTime: string;
  comments: number;
  likes?: number;
  shares?: number;
  tags?: string[];
}

// Posts destacados
export const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "Innovaciones en Técnicas de Extracción Sostenible",
    excerpt: "Descubre las últimas tecnologías que están revolucionando la minería sostenible y reduciendo el impacto ambiental.",
    category: "tendencias",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "María González",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "12 May, 2025",
    readTime: "8 min",
    comments: 24
  },
  {
    id: "2",
    title: "Gestión de Seguridad en Minas Subterráneas",
    excerpt: "Análisis detallado de las mejores prácticas para garantizar la seguridad en operaciones mineras bajo tierra.",
    category: "mejores-practicas",
    image: "https://images.unsplash.com/photo-1582584001264-d8efbf406ab6?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Carlos Ramírez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    date: "8 May, 2025",
    readTime: "12 min",
    comments: 18
  },
  {
    id: "3",
    title: "Avances en Materiales para Equipos de Perforación",
    excerpt: "Investigación sobre nuevos materiales compuestos que extienden la vida útil de los equipos mineros.",
    category: "investigacion",
    image: "https://images.unsplash.com/photo-1579265413518-c7e41bc8e963?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Laura Méndez",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    date: "5 May, 2025",
    readTime: "10 min",
    comments: 12
  }
];

// Posts recientes
export const recentPosts: BlogPost[] = [
  {
    id: "4",
    title: "El Impacto de la IA en la Planificación de Operaciones Mineras",
    excerpt: "Cómo la inteligencia artificial está transformando la forma de planificar y optimizar las operaciones en el sector minero.",
    category: "tendencias",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ricardo Fuentes",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    date: "3 May, 2025",
    readTime: "7 min",
    comments: 8
  },
  {
    id: "5",
    title: "Gestión del Agua en Proyectos Mineros",
    excerpt: "Estrategias efectivas para la conservación y tratamiento del agua en zonas de explotación minera.",
    category: "mejores-practicas",
    image: "https://images.unsplash.com/photo-1608550032759-a2f8be3c136f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ana Torres",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    date: "1 May, 2025",
    readTime: "9 min",
    comments: 15
  },
  {
    id: "6",
    title: "Minería Espacial: Perspectivas y Desafíos",
    excerpt: "Un análisis de las posibilidades y retos técnicos que presenta la minería de asteroides.",
    category: "investigacion",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Miguel Ángel Vega",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    date: "28 Apr, 2025",
    readTime: "14 min",
    comments: 22
  },
  {
    id: "7",
    title: "Normativas Ambientales en la Minería Global",
    excerpt: "Revisión comparativa de las regulaciones ambientales mineras en diferentes regiones del mundo.",
    category: "mejores-practicas",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Elena Martínez",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    date: "25 Apr, 2025",
    readTime: "11 min",
    comments: 9
  },
  {
    id: "8",
    title: "Digitalización de Procesos en la Industria Minera",
    excerpt: "Cómo la transformación digital está mejorando la eficiencia operativa y reduciendo costos en minería.",
    category: "tendencias",
    image: "https://images.unsplash.com/photo-1593106410288-caf65aea7ff8?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Gabriel Suárez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    date: "22 Apr, 2025",
    readTime: "8 min",
    comments: 14
  }
];

// Categorías
export const categories = [
  { id: "all", name: "Todos los Artículos", count: 18 },
  { id: "tendencias", name: "Tendencias del Sector", count: 6 },
  { id: "mejores-practicas", name: "Mejores Prácticas", count: 8 },
  { id: "investigacion", name: "Investigación y Desarrollo", count: 4 }
];

// Tags populares
export const popularTags = [
  "Minería Sostenible", 
  "Seguridad", 
  "Innovación", 
  "Ingeniería", 
  "Medio Ambiente",
  "Tecnología", 
  "Extracción", 
  "Procesamiento", 
  "Normativas", 
  "Certificaciones"
];

// Obtener todos los posts
export const getAllPosts = (): BlogPost[] => {
  return [...featuredPosts, ...recentPosts];
};

// Obtener posts por categoría
export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  if (categoryId === "all") {
    return getAllPosts();
  }
  return getAllPosts().filter(post => post.category === categoryId);
};

// Obtener posts por tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  const normalizedTag = tag.toLowerCase();
  return getAllPosts().filter(post => 
    post.tags?.some(t => t.toLowerCase() === normalizedTag) ||
    post.title.toLowerCase().includes(normalizedTag) ||
    post.excerpt.toLowerCase().includes(normalizedTag)
  );
};

// Buscar posts
export const searchPosts = (query: string): BlogPost[] => {
  const normalizedQuery = query.toLowerCase();
  return getAllPosts().filter(post => 
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.excerpt.toLowerCase().includes(normalizedQuery) ||
    (post.content && post.content.toLowerCase().includes(normalizedQuery)) ||
    (typeof post.author === 'object' && post.author.name.toLowerCase().includes(normalizedQuery)) ||
    post.category.toLowerCase().includes(normalizedQuery) ||
    post.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
};

// Obtener un post por ID
export const getPostById = (id: string | number): BlogPost | undefined => {
  return getAllPosts().find(post => post.id.toString() === id.toString());
};

// Obtener posts relacionados
export const getRelatedPosts = (postId: string | number, limit: number = 3): BlogPost[] => {
  const currentPost = getPostById(postId);
  if (!currentPost) return [];
  
  // Primero intentamos encontrar posts con la misma categoría
  let relatedPosts = getAllPosts()
    .filter(post => post.id !== postId && post.category === currentPost.category)
    .slice(0, limit);
  
  // Si no hay suficientes, agregamos posts con tags similares
  if (relatedPosts.length < limit && currentPost.tags && currentPost.tags.length > 0) {
    const remainingNeeded = limit - relatedPosts.length;
    const postsWithSimilarTags = getAllPosts()
      .filter(post => 
        post.id !== postId && 
        post.category !== currentPost.category && 
        post.tags?.some(tag => currentPost.tags?.includes(tag))
      )
      .slice(0, remainingNeeded);
    
    relatedPosts = [...relatedPosts, ...postsWithSimilarTags];
  }
  
  // Si aún necesitamos más, agregamos posts recientes
  if (relatedPosts.length < limit) {
    const remainingNeeded = limit - relatedPosts.length;
    const recentPostsNotIncluded = getAllPosts()
      .filter(post => 
        post.id !== postId && 
        !relatedPosts.some(rp => rp.id === post.id)
      )
      .slice(0, remainingNeeded);
    
    relatedPosts = [...relatedPosts, ...recentPostsNotIncluded];
  }
  
  return relatedPosts;
};

// Hook personalizado para el newsletter
export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulación de envío a un API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro newsletter",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error al suscribirse",
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return { email, setEmail, loading, subscribe };
};

// Hook personalizado para comentarios
export interface Comment {
  id: string;
  postId: string | number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export const useComments = (postId: string | number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const fetchComments = async () => {
    setLoading(true);
    try {
      // Simulación de obtención de comentarios
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockComments: Comment[] = [
        {
          id: "1",
          postId,
          author: {
            name: "Juan Pérez",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg"
          },
          content: "Excelente artículo. Me gustaría saber más sobre la aplicación de estas técnicas en minas de carbón.",
          date: "10 May, 2025",
          likes: 5,
          replies: [
            {
              id: "1-1",
              postId,
              author: {
                name: "María González",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              content: "¡Gracias Juan! Estoy preparando un artículo específico sobre minas de carbón que publicaremos pronto.",
              date: "10 May, 2025",
              likes: 2
            }
          ]
        },
        {
          id: "2",
          postId,
          author: {
            name: "Ana Rodríguez",
            avatar: "https://randomuser.me/api/portraits/women/63.jpg"
          },
          content: "Muy interesante la parte sobre biominería. Sería útil profundizar en los aspectos regulatorios.",
          date: "9 May, 2025",
          likes: 3
        }
      ];
      
      setComments(mockComments);
    } catch (error) {
      toast({
        title: "Error al cargar comentarios",
        description: "No se pudieron cargar los comentarios. Intente nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const addComment = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Comentario vacío",
        description: "Por favor escribe un comentario antes de publicar",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      // Simulación de envío de comentario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCommentObj: Comment = {
        id: `${Date.now()}`,
        postId,
        author: {
          name: "Usuario",
          avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
        },
        content: newComment,
        date: new Date().toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }),
        likes: 0
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment("");
      
      toast({
        title: "Comentario publicado",
        description: "Tu comentario ha sido publicado exitosamente"
      });
    } catch (error) {
      toast({
        title: "Error al publicar comentario",
        description: "No se pudo publicar tu comentario. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    comments,
    newComment,
    setNewComment,
    loading,
    fetchComments,
    addComment
  };
};

// Hook personalizado para búsqueda
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const results = searchPosts(searchQuery);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "Sin resultados",
          description: `No se encontraron resultados para "${searchQuery}"`,
        });
      }
    } catch (error) {
      toast({
        title: "Error en la búsqueda",
        description: "Ha ocurrido un error al buscar. Intente nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    handleSearch
  };
};

// Hook personalizado para likes y marcadores
export const usePostInteractions = (postId: string | number) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { toast } = useToast();

  // Simulamos la carga de datos del post
  const loadInteractions = async () => {
    // Simular obtención de datos
    const post = getPostById(postId);
    if (post && post.likes) {
      setLikeCount(post.likes);
    }
    
    // Comprobar si el usuario ya ha dado like (podría venir de localStorage o una API)
    const storedLiked = localStorage.getItem(`post_${postId}_liked`);
    if (storedLiked === 'true') {
      setLiked(true);
    }
    
    // Comprobar si el usuario ya ha guardado el post
    const storedBookmarked = localStorage.getItem(`post_${postId}_bookmarked`);
    if (storedBookmarked === 'true') {
      setBookmarked(true);
    }
  };

  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Guardamos la preferencia en localStorage
    localStorage.setItem(`post_${postId}_liked`, newLikedState.toString());
    
    toast({
      title: newLikedState ? "¡Te ha gustado este artículo!" : "Has retirado tu 'me gusta'",
      description: newLikedState 
        ? "Gracias por tu valoración positiva" 
        : "Has retirado tu valoración positiva",
    });
  };

  const toggleBookmark = () => {
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);
    
    // Guardamos la preferencia en localStorage
    localStorage.setItem(`post_${postId}_bookmarked`, newBookmarkedState.toString());
    
    toast({
      title: newBookmarkedState ? "Artículo guardado" : "Artículo eliminado de guardados",
      description: newBookmarkedState 
        ? "Este artículo ha sido guardado en tus favoritos" 
        : "Este artículo ha sido eliminado de tus favoritos",
    });
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
