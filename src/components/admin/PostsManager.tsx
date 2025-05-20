
import { useEffect, useState } from "react";
import { FileText, Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { getAllPosts } from "@/services/posts/blogPostsService";
import { useBlogAdmin } from "@/hooks/useBlogAdmin";
import { categories } from "@/services/posts/categoriesService";

interface PostsManagerProps {
  onEditPost: (postId: string) => void;
  onCreatePost: () => void;
}

const PostsManager = ({ onEditPost, onCreatePost }: PostsManagerProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  
  const { deletePost } = useBlogAdmin();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id.toString()));
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id.toString() !== postId));
      toast({
        title: "Artículo eliminado",
        description: "El artículo ha sido eliminado exitosamente."
      });
    } catch (error) {
      console.error("Error deleting post", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el artículo.",
        variant: "destructive"
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-64 md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar artículos..."
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={16} />
            Filtrar
          </Button>
          <Button size="sm" onClick={onCreatePost} className="gap-1">
            <Plus size={16} />
            Nuevo Artículo
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="w-10 px-4 py-3 text-left">
                  <Checkbox 
                    checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0} 
                    onCheckedChange={handleSelectAll} 
                  />
                </th>
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Autor</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Fecha</th>
                <th className="w-20 px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPosts.map((post) => (
                <tr 
                  key={post.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-4 py-3">
                    <Checkbox 
                      checked={selectedPosts.includes(post.id.toString())} 
                      onCheckedChange={() => handleSelectPost(post.id.toString())} 
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-md w-10 h-10 flex items-center justify-center mr-3">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[200px] md:max-w-[300px]">
                          {post.title}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs truncate max-w-[200px] md:max-w-[300px]">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="capitalize">{getCategoryName(post.category)}</Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {typeof post.author === 'string' 
                      ? post.author 
                      : post.author.name}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">{post.date}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEditPost(post.id.toString())}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => window.open(`/blog/${post.id}`, '_blank')}>
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onSelect={() => handleDeletePost(post.id.toString())}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm ? "No se encontraron artículos que coincidan con la búsqueda" : "No hay artículos disponibles"}
              </p>
            </div>
          )}
          
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Cargando artículos...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostsManager;
