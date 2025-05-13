
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  BookmarkPlus, Facebook, Linkedin, Share2, ThumbsUp, Twitter
} from "lucide-react";
import { BlogPost } from "@/types/blog";

interface PostContentProps {
  post: BlogPost;
  liked: boolean;
  bookmarked: boolean;
  likeCount: number;
  toggleLike: () => void;
  toggleBookmark: () => void;
  handleShare: (platform: string) => void;
}

export const PostContent = ({
  post,
  liked,
  bookmarked,
  likeCount,
  toggleLike,
  toggleBookmark,
  handleShare
}: PostContentProps) => {
  // Determine information about the author
  const authorData = typeof post.author === 'object' 
    ? post.author 
    : { name: post.author as string, avatar: "" };

  return (
    <>
      <div 
        className="prose prose-lg dark:prose-invert max-w-none" 
        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
      />
      
      {/* Related Courses Section */}
      {post.relatedCourses && post.relatedCourses.length > 0 && (
        <div className="mt-10 bg-mining-50 dark:bg-mining-900/20 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-mining-700 dark:text-mining-300">Cursos Relacionados con este Tema</h3>
          <p className="text-mining-600 dark:text-mining-400 mb-6">
            Profundiza tus conocimientos con estos cursos especializados que complementan perfectamente el contenido de este artículo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.relatedCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`}>
                <div className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-medium text-mining-700 dark:text-mining-300 line-clamp-2">{course.title}</h4>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-mining-100 dark:bg-mining-900/50 text-mining-700 dark:text-mining-300 rounded-full">
                        Ver detalles
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button className="bg-mining-600 hover:bg-mining-700" asChild>
              <Link to="/courses">
                Ver todos los cursos
              </Link>
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-10">
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-mining-100 hover:text-mining-700 dark:hover:bg-mining-900/30 dark:hover:text-mining-300 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        <div className="border-t border-b py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-2 ${liked ? 'bg-mining-50 text-mining-600 dark:bg-mining-900/30 dark:text-mining-400' : ''}`}
              onClick={toggleLike}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{liked ? 'Me gusta' : 'Me gusta'}</span>
              {likeCount > 0 && <span className="ml-1">({likeCount})</span>}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`gap-2 ${bookmarked ? 'bg-mining-50 text-mining-600 dark:bg-mining-900/30 dark:text-mining-400' : ''}`}
              onClick={toggleBookmark}
            >
              <BookmarkPlus className="h-4 w-4" />
              <span>{bookmarked ? 'Guardado' : 'Guardar'}</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => handleShare('default')}
            >
              <Share2 className="h-4 w-4" />
              <span>Compartir</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Compartir en:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full p-2 h-auto"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full p-2 h-auto"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full p-2 h-auto"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {typeof post.author === 'object' && post.author.bio && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Sobre el autor</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-medium">{post.author.name}</h4>
                {post.author.position && (
                  <p className="text-sm text-mining-600 dark:text-mining-400 mb-1">{post.author.position}</p>
                )}
                <p className="text-gray-600 dark:text-gray-400 my-2">{post.author.bio}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={post.author.linkedin || "#"} target="_blank">Ver perfil</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
