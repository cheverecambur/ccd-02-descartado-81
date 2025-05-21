
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostCard } from "./PostCard";
import { BlogPost, TagInfo } from "@/types/blog";
import { popularTags } from "@/services/posts/categoriesService";
import { useNewsletter } from "@/services/newsletter/newsletterService";

interface BlogSidebarProps {
  relatedPosts?: BlogPost[];
  onSearch?: (query: string) => void;
}

export const BlogSidebar = ({ relatedPosts, onSearch }: BlogSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { email, setEmail, loading, subscribe } = useNewsletter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <Card className="border-0 shadow">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold">Buscar</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Buscar artículos..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Newsletter */}
      <Card className="border-0 shadow bg-gradient-to-br from-mining-50 to-engineering-50 dark:from-mining-900/20 dark:to-engineering-900/20">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold">Suscríbete al Newsletter</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Recibe los últimos artículos y noticias sobre ingeniería y minería directamente en tu correo.
          </p>
          <form onSubmit={subscribe} className="space-y-4">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit"
              className="w-full bg-mining-600 hover:bg-mining-700 text-white"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Suscribirse"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Popular Tags */}
      <Card className="border-0 shadow">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold">Etiquetas Populares</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag: TagInfo, index) => (
              <Link
                key={index}
                to={`/blog/tag/${tag.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Related Posts if provided */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Card className="border-0 shadow">
          <CardHeader className="pb-2">
            <h3 className="text-lg font-bold">Artículos Relacionados</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {relatedPosts.map(post => (
                <PostCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Featured Resources */}
      <Card className="border-0 shadow">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-bold">Recursos Destacados</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-shrink-0 w-16 h-16 bg-engineering-100 dark:bg-engineering-900/30 rounded flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-engineering-600 dark:text-engineering-400" />
            </div>
            <div>
              <h4 className="font-semibold">Guía de Seguridad Minera</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manual completo con protocolos de seguridad
              </p>
              <Link to="/resources/safety-guide" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                Descargar PDF
              </Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex-shrink-0 w-16 h-16 bg-mining-100 dark:bg-mining-900/30 rounded flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-mining-600 dark:text-mining-400" />
            </div>
            <div>
              <h4 className="font-semibold">Informe de Sostenibilidad</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prácticas sostenibles en minería moderna
              </p>
              <Link to="/resources/sustainability-report" className="text-xs text-mining-600 dark:text-mining-400 hover:underline">
                Leer Informe
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
