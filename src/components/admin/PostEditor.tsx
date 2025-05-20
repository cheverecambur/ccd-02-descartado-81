
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
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save } from "lucide-react";

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
});

type FormValues = z.infer<typeof formSchema>;

interface PostEditorProps {
  postId: string | null;
  onSaveSuccess: () => void;
}

const PostEditor = ({ postId, onSaveSuccess }: PostEditorProps) => {
  const [isLoading, setIsLoading] = useState(!!postId);
  const { savePost } = useBlogAdmin();
  
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
      author: "CCD Capacitación"
    }
  });

  // Load post data if editing existing post
  useEffect(() => {
    if (postId) {
      setIsLoading(true);
      try {
        const post = getPostById(postId);
        if (post) {
          form.reset({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content || "",
            category: post.category,
            image: post.image,
            date: post.date,
            readTime: post.readTime,
            tags: post.tags ? post.tags.join(", ") : "",
            author: typeof post.author === "string" ? post.author : post.author.name
          });
        }
      } catch (error) {
        console.error("Error loading post data", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [postId, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const postData: BlogPost = {
        id: postId || `post-${Date.now()}`,
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        category: values.category,
        image: values.image,
        author: values.author,
        date: values.date,
        readTime: values.readTime,
        comments: 0,
        tags: values.tags.split(",").map(tag => tag.trim()),
      };
      
      await savePost(postData);
      onSaveSuccess();
    } catch (error) {
      console.error("Error saving post", error);
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
              Guardar Artículo
            </Button>
          </div>

          <Card className="p-6">
            <Tabs defaultValue="basic">
              <TabsList className="mb-6">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="content">Contenido</TabsTrigger>
                <TabsTrigger value="seo">SEO & Metadatos</TabsTrigger>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Autor</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del autor" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="seo">
                <div className="space-y-4 py-4 text-center">
                  <h3 className="text-lg font-medium">Configuración SEO</h3>
                  <p className="text-muted-foreground">
                    La configuración SEO estará disponible próximamente
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default PostEditor;
