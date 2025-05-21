
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BlogPost } from "@/types/blog";
import { getPostById } from "@/services/posts/blogPostsService";
import { useBlogAdmin } from "@/hooks/useBlogAdmin";
import { categories } from "@/services/posts/categoriesService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  excerpt: z.string().min(10, "El extracto debe tener al menos 10 caracteres"),
  content: z.string().optional(),
  category: z.string(),
  image: z.string().url("Ingrese una URL de imagen válida"),
  date: z.string(),
  readTime: z.string(),
  tags: z.string(),
  author: z.string(),
  authorAvatar: z.string().url("Ingrese una URL válida para la imagen del autor").optional(),
  authorBio: z.string().optional(),
  authorPosition: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface PostEditorProps {
  postId: string | null;
  onSaveSuccess: () => void;
}

const PostEditor = ({ postId, onSaveSuccess }: PostEditorProps) => {
  const [isLoading, setIsLoading] = useState(!!postId);
  const { savePost } = useBlogAdmin();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "tendencias",
      image: "",
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      readTime: "5 min",
      tags: "",
      author: "CCD Capacitación",
      authorAvatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      authorBio: "",
      authorPosition: ""
    }
  });

  // Load post data if editing existing post
  useEffect(() => {
    if (postId) {
      setIsLoading(true);
      try {
        const post = getPostById(postId);
        if (post) {
          const authorName = typeof post.author === "string" ? post.author : post.author.name;
          const authorAvatar = typeof post.author === "string" ? "" : post.author.avatar;
          const authorBio = typeof post.author === "string" ? "" : post.author.bio || "";
          const authorPosition = typeof post.author === "string" ? "" : post.author.position || "";
          
          form.reset({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content || "",
            category: post.category,
            image: post.image,
            date: post.date,
            readTime: post.readTime,
            tags: post.tags ? post.tags.join(", ") : "",
            author: authorName,
            authorAvatar,
            authorBio,
            authorPosition
          });
        }
      } catch (error) {
        console.error("Error loading post data", error);
        toast({
          title: "Error al cargar datos",
          description: "No se pudo cargar la información del artículo",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  }, [postId, form, toast]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Create author object
      const author = values.authorAvatar || values.authorBio || values.authorPosition
        ? {
            name: values.author,
            avatar: values.authorAvatar || "https://randomuser.me/api/portraits/lego/1.jpg",
            bio: values.authorBio || undefined,
            position: values.authorPosition || undefined
          }
        : values.author;

      const postData: BlogPost = {
        id: postId || `post-${Date.now()}`,
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        category: values.category,
        image: values.image,
        author: author,
        date: values.date,
        readTime: values.readTime,
        comments: 0,
        tags: values.tags.split(",").map(tag => tag.trim()),
      };
      
      await savePost(postData);
      toast({
        title: postId ? "Artículo actualizado" : "Artículo creado",
        description: `El artículo ha sido ${postId ? "actualizado" : "creado"} exitosamente.`
      });
      onSaveSuccess();
    } catch (error) {
      console.error("Error saving post", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el artículo",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} />
              Volver
            </Button>
            <Button 
              type="submit" 
              size="sm" 
              className="gap-1"
              disabled={isLoading}
            >
              <Save size={16} />
              {isLoading ? "Guardando..." : "Guardar Artículo"}
            </Button>
          </div>

          <Card className="p-6">
            <Tabs defaultValue="basic">
              <TabsList className="mb-6">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="content">Contenido</TabsTrigger>
                <TabsTrigger value="author">Autor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Artículo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el título" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extracto</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Breve descripción del artículo" 
                          {...field}
                          rows={3} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories
                              .filter(cat => cat.id !== "all")
                              .map(category => (
                                <SelectItem 
                                  key={category.id} 
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de la Imagen</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com/imagen.jpg" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiempo de Lectura</FormLabel>
                        <FormControl>
                          <Input placeholder="5 min" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etiquetas (separadas por comas)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="BIM, Construcción, Ingeniería" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="content">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contenido del Artículo</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Contenido HTML del artículo..." 
                          {...field}
                          rows={20} 
                          className="font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Puedes usar etiquetas HTML para dar formato al contenido.
                      </p>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="author" className="space-y-6">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Autor</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del autor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="authorAvatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de la Foto del Autor</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/avatar.jpg" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="authorPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo del Autor</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Coordinador Académico" 
                          {...field} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="authorBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografía del Autor</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Breve biografía del autor" 
                          {...field}
                          rows={4} 
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default PostEditor;
